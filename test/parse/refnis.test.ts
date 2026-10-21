// Statbel's REFNIS code list, on a trimmed copy of the real file in test/fixtures/sources
import { describe, expect, it } from 'vitest'

import {
    COVERAGE_FROM,
    buildRegionsAndProvinces,
    decodeWindows1252,
    parseRefnis,
    toDay,
    toRecords,
} from '../../scripts/parse/refnis.ts'
import { territoryCoverage } from '../../src/territory.ts'

const root = 'test/fixtures/sources'
const source = { url: 'https://example.org/TU_COM_REFNIS-20250101.zip', retrieved: '2026-10-20' }

describe('buildRegionsAndProvinces', () => {
    const { regions, provinces } = buildRegionsAndProvinces(root)

    it('reads the three regions and ten provinces, in three languages', () => {
        expect(regions.map((r) => r.id)).toEqual(['02000', '03000', '04000'])
        expect(regions[2]?.name).toEqual({
            nl: 'Brussels Hoofdstedelijk Gewest',
            fr: 'Région de Bruxelles-Capitale',
            de: 'Region Brüssel-Hauptstadt',
        })
        expect(provinces).toHaveLength(10)
        expect(provinces[0]).toEqual({
            id: '10000',
            name: { nl: 'Provincie Antwerpen', fr: 'Province d’Anvers', de: 'Provinz Antwerpen' },
            region: '02000',
            sources: [
                {
                    url: 'https://statbel.fgov.be/sites/default/files/files/opendata/REFNIS%20code/TU_COM_REFNIS-20250101.zip',
                    retrieved: '2026-10-20',
                },
            ],
        })
    })

    it('leaves out the province of Brabant, which ended before the coverage starts', () => {
        expect(provinces.some((p) => p.id === '20000')).toBe(false)
        expect(provinces.map((p) => p.region)).not.toContain(undefined)
    })

    it("starts where the territory data's coverage starts", () => {
        expect(COVERAGE_FROM).toBe(territoryCoverage.from)
    })

    it('fails without a snapshot of the list', () => {
        expect(() => buildRegionsAndProvinces('test/fixtures')).toThrow()
    })
})

describe('toRecords', () => {
    // Rows in the register's format. The ended province is made up: the real one (Brabant,
    // 20000) has no region, since it ended before the regions had provinces
    const rows = parseRefnis(
        [
            'LVL_REFNIS|CD_REFNIS|CD_SUP_REFNIS|TX_REFNIS_DE|TX_REFNIS_FR|TX_REFNIS_NL|DT_VLDT_START|DT_VLDT_END',
            '1|02000|-|Flämische Region|Région flamande|Vlaams Gewest|01/01/1970|31/12/9999',
            '2|20001|02000|Provinz Flämisch-Brabant|Province du Brabant flamand|Provincie Vlaams-Brabant|01/01/1995|31/12/9999',
            '2|20009|02000|Provinz Beispiel|Province Exemple|Provincie Voorbeeld|01/01/1970|31/12/1994',
            '3|24000|20001|Bezirk Löwen|Arrondissement de Louvain|Arrondissement Leuven|01/01/1995|31/12/9999',
        ].join('\r\n') + '\r\n',
    )

    it('takes validity from the register, within the coverage', () => {
        // Within a coverage that starts before 1995, the ended province is a retired record
        const { provinces } = toRecords(rows, source, '1990-01-01')
        expect(provinces.map((p) => [p.id, p.validFrom, p.validTo])).toEqual([
            ['20001', '1995-01-01', undefined],
            ['20009', undefined, '1994-12-31'],
        ])
    })

    it('says nothing the coverage already says', () => {
        const { regions, provinces } = toRecords(rows, source)
        expect(regions).toEqual([{ id: '02000', name: rows[0]?.name, sources: [source] }])
        expect(provinces).toEqual([
            { id: '20001', name: rows[1]?.name, region: '02000', sources: [source] },
        ])
    })

    it('refuses a province outside the regions it read, and a province without a region', () => {
        const [region, flemishBrabant] = rows
        if (!region || !flemishBrabant) throw new Error('rows')
        expect(() => toRecords([{ ...flemishBrabant, parent: '09000' }], source)).toThrow(
            /unknown region 09000/,
        )
        expect(() => toRecords([region, { ...flemishBrabant, parent: undefined }], source)).toThrow(
            /region of province 20001/,
        )
    })
})

describe('parseRefnis', () => {
    it('refuses a file without the columns it needs', () => {
        expect(() => parseRefnis('CD_REFNIS|TX_REFNIS_NL\n02000|Vlaams Gewest\n')).toThrow(/column/)
        expect(() => parseRefnis('')).toThrow(/header/)
    })

    it('converts dates and decodes the apostrophes', () => {
        expect(toDay('01/01/1995')).toBe('1995-01-01')
        expect(toDay('31/12/9999')).toBeUndefined()
        expect(() => toDay('1995-01-01')).toThrow(/date/)
        expect(decodeWindows1252(Buffer.from([0x64, 0x92, 0x41, 0xe9]))).toBe('d’Aé')
    })
})
