// The postal code parser: the xlsx reader on a made-up workbook and on Statbel's table, the
// validity across tables, and the link from an address to its municipality
import { readFileSync } from 'node:fs'
import { deflateRawSync } from 'node:zlib'
import { describe, expect, it } from 'vitest'

import {
    buildPostalCodes,
    COVERAGE_FROM,
    linkMunicipalities,
    municipalityResolver,
    postalCodesFrom,
    readTable,
    tableDay,
    type Table,
} from '../../scripts/parse/postal-codes.ts'
import { columnIndex, decodeXml, readSheet, unzip } from '../../scripts/parse/xlsx.ts'
import { municipalities, postalCodesCoverage } from '../../src'

const root = 'test/fixtures/sources'
const TABLE =
    'test/fixtures/sources/postal-codes/statbel.fgov.be/sites/default/files/Over_Statbel_FR/Nomenclaturen/Conversion_Postal_code_Refnis_code_va01012025.xlsx'

/** A zip of text files, deflated or stored, as a spreadsheet application would write it */
function zip(files: Record<string, string>, { store = false } = {}): Buffer {
    const parts: Buffer[] = []
    const central: Buffer[] = []
    let offset = 0
    for (const [name, text] of Object.entries(files)) {
        const nameBuffer = Buffer.from(name)
        const raw = Buffer.from(text)
        const data = store ? raw : deflateRawSync(raw)
        const local = Buffer.alloc(30)
        local.writeUInt32LE(0x04034b50, 0)
        local.writeUInt16LE(store ? 0 : 8, 8)
        local.writeUInt32LE(data.length, 18)
        local.writeUInt32LE(raw.length, 22)
        local.writeUInt16LE(nameBuffer.length, 26)
        const entry = Buffer.alloc(46)
        entry.writeUInt32LE(0x02014b50, 0)
        entry.writeUInt16LE(store ? 0 : 8, 10)
        entry.writeUInt32LE(data.length, 20)
        entry.writeUInt32LE(raw.length, 24)
        entry.writeUInt16LE(nameBuffer.length, 28)
        entry.writeUInt32LE(offset, 42)
        parts.push(local, nameBuffer, data)
        central.push(entry, nameBuffer)
        offset += local.length + nameBuffer.length + data.length
    }
    const directory = Buffer.concat(central)
    const end = Buffer.alloc(22)
    end.writeUInt32LE(0x06054b50, 0)
    end.writeUInt16LE(Object.keys(files).length, 10)
    end.writeUInt32LE(directory.length, 12)
    end.writeUInt32LE(offset, 16)
    return Buffer.concat([...parts, directory, end])
}

const workbook = (sheet: string, strings: string[] = []) =>
    zip({
        'xl/sharedStrings.xml': `<sst>${strings.map((s) => `<si><t>${s}</t></si>`).join('')}</sst>`,
        'xl/worksheets/sheet1.xml': `<worksheet><sheetData>${sheet}</sheetData></worksheet>`,
    })

describe('xlsx', () => {
    it('reads shared strings, inline strings, numbers and empty cells', () => {
        const rows = readSheet(
            workbook(
                '<row r="1"><c r="A1" t="s"><v>0</v></c><c r="C1" t="inlineStr"><is><t>in</t><t>line</t></is></c></row>' +
                    '<row r="2"><c r="A2"><v>1000</v></c><c r="B2" t="n"><v>21004</v></c><c r="C2" t="str"><v>a &amp; b</v></c><c r="D2"/></row>' +
                    '<row r="3"><c r="A3" t="s"><v>1</v></c></row><row r="4"><c r="A4"/></row>',
                ['Postal code', 'Caf&#233;'],
            ),
        )
        expect(rows).toEqual([
            ['Postal code', '', 'inline'],
            ['1000', '21004', 'a & b', ''],
            ['Café'],
        ])
    })

    it('reads stored (uncompressed) entries too', () => {
        const files = unzip(zip({ 'a.txt': 'hello' }, { store: true }))
        expect(files.get('a.txt')?.toString()).toBe('hello')
    })

    it('refuses what it cannot read, rather than return half a table', () => {
        expect(() => readSheet(Buffer.from('not a zip'))).toThrow('Not a zip file')
        expect(() => readSheet(zip({ 'a.txt': 'x' }))).toThrow('No worksheet')
        expect(() => readSheet(workbook('<row><c r="A1" t="s"><v>7</v></c></row>'))).toThrow(
            'Unknown shared string 7',
        )
        expect(() => readSheet(workbook('<row><c r="A1" t="b"><v>1</v></c></row>'))).toThrow(
            "Unsupported cell type 'b'",
        )
        expect(() => readSheet(workbook('<row><c t="s"><v>0</v></c></row>', ['x']))).toThrow(
            'Cell without a reference',
        )
        // The central directory entry of the one file sits before the 22-byte end record
        const broken = zip({ 'a.txt': 'x' })
        const entry = broken.length - 22 - (46 + 'a.txt'.length)
        broken.writeUInt16LE(9, entry + 10) // an unknown compression method
        expect(() => unzip(broken)).toThrow('Unsupported compression method 9')
        const noDirectory = Buffer.from(broken)
        noDirectory.writeUInt32LE(0, entry)
        expect(() => unzip(noDirectory)).toThrow('Not a zip file')
    })

    it('decodes character references and column letters', () => {
        expect(decodeXml('&lt;a&gt; &quot;b&quot; &apos;c&apos; &#x41;&#66; &unknown;')).toBe(
            '<a> "b" \'c\' AB &unknown;',
        )
        expect(['A', 'Z', 'AA', 'AB'].map(columnIndex)).toEqual([0, 25, 26, 27])
    })

    it("reads Statbel's table", () => {
        const rows = readSheet(readFileSync(TABLE))
        expect(rows[0]).toEqual(['Postal code', 'Refnis code', 'Gemeentenaam', 'Nom commune'])
        expect(rows[1]).toEqual(['1000', '21004', 'Brussel', 'Bruxelles'])
        expect(rows).toHaveLength(1153)
    })
})

describe('readTable', () => {
    const table = (rows: string[][]) =>
        workbook(
            rows
                .map(
                    (row, r) =>
                        `<row>${row.map((v, c) => `<c r="${String.fromCharCode(65 + c)}${r + 1}" t="inlineStr"><is><t>${v}</t></is></c>`).join('')}</row>`,
                )
                .join(''),
        )
    const header = ['Postal code', 'Refnis code', 'Gemeentenaam', 'Nom commune']

    it('gives the pairs, skipping empty rows', () => {
        expect(
            readTable(table([header, ['9000', '44021', 'Gent', 'Gand'], ['', '', '', '']]), 't'),
        ).toEqual([['9000', '44021']])
    })

    it('refuses a table with other columns, or a value that is not a code', () => {
        expect(() => readTable(table([['Postcode', 'NIS']]), 't')).toThrow('expected the columns')
        expect(() => readTable(table([header, ['9000', 'Gent']]), 't')).toThrow(
            "t, row 2: cannot read '9000' / 'Gent'",
        )
    })

    it('reads the day a table applies from out of its name', () => {
        expect(tableDay('https://x/Conversion%20Postal%20code_Refnis%20code_va01012025.xlsx')).toBe(
            '2025-01-01',
        )
        expect(tableDay('https://x/other.xlsx')).toBeUndefined()
    })
})

describe('postalCodesFrom', () => {
    const known = new Set(['44021', '44088', '21004'])
    const t = (validFrom: string, pairs: [string, string][]): Table => ({ validFrom, pairs })

    it('starts the coverage with the last table published on or before its first day', () => {
        const { postalCodes, problems } = postalCodesFrom(
            [
                t('2019-01-01', [
                    ['9000', '44021'],
                    ['9820', '44088'],
                    ['1000', '21004'],
                ]),
            ],
            known,
        )
        expect(problems).toEqual([])
        expect(postalCodes).toEqual([
            { id: '1000-21004', postalCode: '1000', municipality: '21004' },
            { id: '9000-44021', postalCode: '9000', municipality: '44021' },
            { id: '9820-44088', postalCode: '9820', municipality: '44088' },
        ])
    })

    it('reads validity from the tables: a pair ends the day before the table that drops it', () => {
        const { postalCodes } = postalCodesFrom(
            [
                t('2025-01-01', [
                    ['9000', '44021'],
                    ['9820', '44088'],
                    ['1000', '21004'],
                ]),
                t('2027-01-01', [
                    ['9000', '44021'],
                    ['9821', '44088'],
                    ['1000', '21004'],
                ]),
                t('2029-01-01', [
                    ['9000', '44021'],
                    ['9820', '44088'],
                    ['9821', '44088'],
                    ['1000', '21004'],
                ]),
                t('2018-01-01', [['9000', '44021']]), // before the coverage: not applying
            ],
            known,
        )
        expect(postalCodes.filter((p) => p.municipality === '44088')).toEqual([
            { id: '9820-44088', validTo: '2026-12-31', postalCode: '9820', municipality: '44088' },
            {
                id: '9820-44088',
                validFrom: '2029-01-01',
                postalCode: '9820',
                municipality: '44088',
            },
            {
                id: '9821-44088',
                validFrom: '2027-01-01',
                postalCode: '9821',
                municipality: '44088',
            },
        ])
        expect(postalCodes.find((p) => p.id === '9000-44021')).toEqual({
            id: '9000-44021',
            postalCode: '9000',
            municipality: '44021',
        })
    })

    it('reports a REFNIS code that is no municipality, and a municipality without a code', () => {
        const { problems } = postalCodesFrom(
            [
                t('2025-01-01', [
                    ['9000', '44021'],
                    ['9999', '99999'],
                ]),
            ],
            known,
        )
        expect(problems).toEqual([
            "postal code 9999 points at REFNIS code 99999, which isn't in data/municipalities.json",
            'municipality 21004 has no postal code',
            'municipality 44088 has no postal code',
        ])
    })

    it('needs a table that applies to the coverage', () => {
        expect(() => postalCodesFrom([], known)).toThrow('No postal code table')
        expect(COVERAGE_FROM).toBe(postalCodesCoverage.from)
    })
})

describe('buildPostalCodes', () => {
    it("reads Statbel's table from the snapshots and checks it against the municipalities", () => {
        const { postalCodes, problems, tables } = buildPostalCodes(root, municipalities)
        expect(problems).toEqual([])
        expect(tables).toHaveLength(1)
        expect(postalCodes).toHaveLength(1152)
        expect(postalCodes.filter((p) => p.postalCode === '1040').map((p) => p.id)).toEqual([
            '1040-21004',
            '1040-21005',
        ])
        expect(() => buildPostalCodes('test/fixtures/no-such-dir', municipalities)).toThrow()
    })
})

describe('linking addresses to municipalities', () => {
    const resolve = municipalityResolver(
        [
            { id: '9000-44021', postalCode: '9000', municipality: '44021' },
            { id: '1040-21004', postalCode: '1040', municipality: '21004' },
            { id: '1040-21005', postalCode: '1040', municipality: '21005' },
            { id: '9999-44088', postalCode: '9999', municipality: '44088', validTo: '2025-12-31' },
        ],
        [
            { id: '44021', name: { nl: 'Gent', fr: 'Gand' } },
            { id: '21004', name: { nl: 'Brussel', fr: 'Bruxelles' } },
            { id: '21005', name: { nl: 'Etterbeek', fr: 'Etterbeek' } },
            { id: '44088', name: { nl: 'Merelbeke-Melle', fr: 'Merelbeke-Melle' } },
        ],
    )

    it('follows the postal code when it belongs to one municipality, whatever the city says', () => {
        expect(resolve({ postalCode: '9000', city: 'Gent' })).toBe('44021')
        expect(resolve({ postalCode: '9000', city: 'Sint-Amandsberg' })).toBe('44021')
    })

    it('lets the city line choose between the municipalities of a shared code, exactly', () => {
        expect(resolve({ postalCode: '1040', city: 'Etterbeek' })).toBe('21005')
        expect(resolve({ postalCode: '1040', city: 'BRUXELLES' })).toBe('21004')
        expect(resolve({ postalCode: '1040', city: 'Brussel (Etterbeek)' })).toBeUndefined()
        expect(resolve({ postalCode: '1040', city: 'Oudergem' })).toBeUndefined()
    })

    it('finds nothing for an unknown or retired code', () => {
        expect(resolve({ postalCode: '0000', city: 'Nowhere' })).toBeUndefined()
        expect(resolve({ postalCode: '9999', city: 'Merelbeke-Melle' })).toBeUndefined()
    })

    it('adds the link to the records it can, and reports the rest', () => {
        const { records, unresolved } = linkMunicipalities(
            [
                { id: 'a', address: { street: 'x 1', postalCode: '9000', city: 'Gent' } },
                {
                    id: 'b',
                    address: { street: 'y 2', postalCode: '1040', city: 'Brussel (Etterbeek)' },
                },
                { id: 'c' },
            ],
            resolve,
        )
        expect(records).toEqual([
            {
                id: 'a',
                address: { street: 'x 1', postalCode: '9000', city: 'Gent', municipality: '44021' },
            },
            {
                id: 'b',
                address: { street: 'y 2', postalCode: '1040', city: 'Brussel (Etterbeek)' },
            },
            { id: 'c' },
        ])
        expect(unresolved).toEqual(['b: no single municipality for 1040 Brussel (Etterbeek)'])
    })
})
