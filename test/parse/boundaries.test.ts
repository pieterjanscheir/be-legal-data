// The boundaries parser: on a trimmed copy of the NGI's GeoPackage (two cantons, the Eupen
// arrondissement, two peace courts) in test/fixtures/sources/ngi, and each reader on what it
// must accept and refuse
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import {
    area,
    buildArrondissementBoundaries,
    buildCantonBoundaries,
    cantonIndex,
    matchArrondissement,
    matchCanton,
    parseName,
    signedArea,
    stringifyBoundaries,
    toGeoJson,
    toGeoJsonRing,
    type Feature,
} from '../../scripts/parse/boundaries.ts'
import {
    readGeoPackageGeometry,
    readGeoPackagePoint,
    type MultiPolygonRings,
    type Ring,
} from '../../scripts/parse/geopackage.ts'
import { zipEntries, zipEntry } from '../../scripts/parse/zip.ts'
import { NGI_CANTONS } from '../../scripts/sources/catalog.ts'
import { cantonBoundaries } from '../../src/canton-boundaries'
import { arrondissements, cantons } from '../../src/territory'

const root = 'test/fixtures/sources'
const fixture =
    'test/fixtures/sources/ngi/ac.ngi.be/remoteclient-open/ngi-standard-open/Vectordata/' +
    'TerritorialDivisions/TerritorialDivisions-JudicialCanton/' +
    'e1f61c40-623a-11eb-9e7c-186571a04de3_geopackage_sqlite3_4326.zip'

describe('buildCantonBoundaries', () => {
    const { boundaries, report } = buildCantonBoundaries(root)

    it('gives each feature the canton its names give, keyed by the canton id', () => {
        expect(boundaries.map((b) => b.id)).toEqual(['anderlecht-1', 'antwerpen-1'])
        expect(boundaries[1]).toMatchObject({
            id: 'antwerpen-1',
            canton: 'antwerpen-1',
            ngiId: '{50412818-C0B7-4FEE-9E9B-DFFF0A768922}',
            cantonCode: { nl: '228101', fr: '228101' },
            geometry: { type: 'MultiPolygon' },
            sources: [{ url: NGI_CANTONS, retrieved: '2026-10-21' }],
        })
    })

    it('keeps the Dutch and the French canton code of a Brussels canton', () => {
        expect(boundaries[0]?.cantonCode).toEqual({ nl: 'N238101', fr: 'F238101' })
    })

    it('reports every canton the file has no feature for, and matches the rest', () => {
        expect(report.unmatched).toEqual([])
        expect(report.missing).toHaveLength(cantons.length - 2)
        expect(report.missing).toContain('gent-1')
        expect(report.missing).not.toContain('antwerpen-1')
    })

    it('writes closed rings, counter-clockwise, rounded to 7 decimals', () => {
        for (const boundary of boundaries) {
            for (const [exterior, ...holes] of boundary.geometry.coordinates) {
                expect(exterior?.[0]).toEqual(exterior?.at(-1))
                expect(signedArea(exterior ?? [])).toBeGreaterThan(0)
                for (const hole of holes) expect(signedArea(hole)).toBeLessThan(0)
                for (const [lon, lat] of exterior ?? []) {
                    expect(lon).toBe(Number(lon.toFixed(7)))
                    expect(lat).toBe(Number(lat.toFixed(7)))
                }
            }
        }
    })

    it('throws without a snapshot', () => {
        expect(() => buildCantonBoundaries('test/fixtures/nowhere')).toThrow()
    })
})

describe('buildArrondissementBoundaries', () => {
    const eupen = cantonBoundaries.filter(
        (b) => cantons.find((c) => c.id === b.canton)?.arrondissement === 'eupen',
    )

    it('gives the feature the arrondissement its name gives, when its cantons add up to it', () => {
        const { boundaries, report } = buildArrondissementBoundaries(root, eupen)
        expect(report.unmatched).toEqual([])
        expect(boundaries).toHaveLength(1)
        expect(boundaries[0]).toMatchObject({
            id: 'eupen',
            arrondissement: 'eupen',
            ngiId: '{8E0333F2-2156-4B5D-92E6-51A61591A579}',
            geometry: { type: 'MultiPolygon' },
            sources: [{ url: NGI_CANTONS, retrieved: '2026-10-21' }],
        })
        expect(report.missing).toHaveLength(arrondissements.length - 1)
        expect(report.missing).not.toContain('eupen')
    })

    it('refuses a feature whose area isn’t that of its cantons', () => {
        const { boundaries, report } = buildArrondissementBoundaries(root, eupen.slice(0, 1))
        expect(boundaries).toEqual([])
        expect(report.unmatched).toEqual([
            "Eupen: its area isn't that of the cantons of arrondissement eupen",
        ])
    })
})

describe('matchArrondissement', () => {
    it('matches the id, a name in any language, or an alias', () => {
        expect(matchArrondissement('Oost Vlaanderen', arrondissements)?.id).toBe('oost-vlaanderen')
        expect(matchArrondissement('Liège', arrondissements)?.id).toBe('liege')
        expect(matchArrondissement('Henegouwen', arrondissements)?.id).toBe('hainaut')
        expect(matchArrondissement('Vlaams Brabant', arrondissements)?.id).toBe('leuven')
        expect(matchArrondissement('Bruxelles - Brussel', arrondissements)?.id).toBe('brussel')
        expect(matchArrondissement('Atlantis', arrondissements)).toBeUndefined()
    })
})

describe('area', () => {
    it('takes the holes out', () => {
        const square = (size: number, clockwise: boolean): Ring => {
            const ring: Ring = [
                [0, 0],
                [size, 0],
                [size, size],
                [0, size],
                [0, 0],
            ]
            return clockwise ? ring.reverse() : ring
        }
        expect(area({ type: 'MultiPolygon', coordinates: [[square(2, false)]] })).toBe(4)
        expect(
            area({ type: 'MultiPolygon', coordinates: [[square(2, false), square(1, true)]] }),
        ).toBe(3)
    })
})

describe('parseName', () => {
    it('reads the place and the ordinal', () => {
        expect(parseName('Eerste gerechtelijk kanton Aalst', 'nl')).toEqual({
            name: 'Aalst',
            number: 1,
        })
        expect(parseName('Zevende gerechtelijk kanton Antwerpen', 'nl')).toEqual({
            name: 'Antwerpen',
            number: 7,
        })
        expect(parseName('Gerechtelijk kanton Beveren-Kruibeke-Zwijndrecht', 'nl')).toEqual({
            name: 'Beveren-Kruibeke-Zwijndrecht',
        })
        expect(parseName("Canton judiciaire d'Arlon", 'fr')).toEqual({ name: 'Arlon' })
        expect(parseName('Troisième canton judiciaire de Liege', 'fr')).toEqual({
            name: 'Liege',
            number: 3,
        })
    })

    it('refuses a name it can’t read', () => {
        expect(parseName('Kanton Aalst', 'nl')).toBeUndefined()
        expect(parseName('Achtste gerechtelijk kanton Aalst', 'nl')).toBeUndefined()
        expect(parseName('Canton judiciaire Arlon', 'fr')).toBeUndefined()
    })
})

describe('matchCanton', () => {
    const byName = cantonIndex(cantons)
    const feature = (namedut: string, namefre: string, code = '000000'): Feature => ({
        tgid: '{00000000-0000-0000-0000-000000000000}',
        namedut,
        namefre,
        cantoncodedut: code,
        cantoncodefre: code,
    })

    it('matches when both names give the same canton', () => {
        expect(
            matchCanton(
                feature('Eerste gerechtelijk kanton Gent', 'Premier canton judiciaire de Gand'),
                byName,
            ),
        ).toMatchObject({ canton: { id: 'gent-1' } })
    })

    it('refuses when only one name matches, or the names disagree', () => {
        expect(
            matchCanton(
                feature('Gerechtelijk kanton Halle', 'Canton judiciaire de Halle'),
                byName,
                {},
            ),
        ).toEqual({
            problem:
                'Gerechtelijk kanton Halle / Canton judiciaire de Halle (000000): Dutch name ' +
                'gives halle, French name gives no canton; add it to CANTON_ALIASES',
        })
        expect(
            matchCanton(
                feature('Eerste gerechtelijk kanton Gent', 'Deuxième canton judiciaire de Gand'),
                byName,
            ),
        ).toMatchObject({ problem: /gives gent-1, French name gives gent-2/ })
        expect(
            matchCanton(feature('Kanton Gent', 'Canton judiciaire de Gand'), byName),
        ).toMatchObject({ problem: /can't read the name/ })
    })

    it('follows an alias by canton code, and refuses an alias to nowhere', () => {
        expect(
            matchCanton(
                feature('Gerechtelijk kanton Halle', 'Canton judiciaire de Halle', '238121'),
                byName,
            ),
        ).toMatchObject({ canton: { id: 'halle' } })
        expect(
            matchCanton(feature('X', 'Y', '1'), byName, { '1': 'no-such-canton' }),
        ).toMatchObject({ problem: /alias to unknown canton "no-such-canton"/ })
    })
})

describe('toGeoJsonRing', () => {
    const square: Ring = [
        [4, 50],
        [4, 51],
        [5, 51],
        [5, 50],
        [4, 50],
    ]

    it('winds an exterior ring counter-clockwise and a hole clockwise', () => {
        expect(signedArea(square)).toBeLessThan(0)
        expect(toGeoJsonRing(square, 'exterior', 'x')).toEqual([...square].reverse())
        expect(toGeoJsonRing(square, 'hole', 'x')).toEqual(square)
    })

    it('rounds to 7 decimals and drops the repeats that creates', () => {
        const ring: Ring = [
            [4.123456789, 50.1],
            [4.123456781, 50.1],
            [4.5, 50.1],
            [4.5, 50.5],
            [4.123456789, 50.1],
        ]
        expect(toGeoJsonRing(ring, 'exterior', 'x')).toEqual([
            [4.1234568, 50.1],
            [4.5, 50.1],
            [4.5, 50.5],
            [4.1234568, 50.1],
        ])
    })

    it('refuses an open ring, a degenerate ring and an empty one', () => {
        expect(() => toGeoJsonRing(square.slice(0, 4), 'exterior', 'aalst-1')).toThrow(
            /aalst-1: a ring isn't closed/,
        )
        const line: Ring = [
            [4, 50],
            [5, 50],
            [4, 50],
        ]
        expect(() => toGeoJsonRing(line, 'exterior', 'x')).toThrow(/fewer than three/)
        const flat: Ring = [
            [4, 50],
            [5, 50],
            [6, 50],
            [4, 50],
        ]
        expect(() => toGeoJsonRing(flat, 'exterior', 'x')).toThrow(/no area/)
        expect(() => toGeoJsonRing([], 'exterior', 'x')).toThrow(/fewer than three/)
    })

    it('builds a MultiPolygon, and refuses one without polygons or rings', () => {
        expect(toGeoJson([[square]], 'x')).toEqual({
            type: 'MultiPolygon',
            coordinates: [[[...square].reverse()]],
        })
        expect(() => toGeoJson([], 'x')).toThrow(/no polygon/)
        expect(() => toGeoJson([[]] as MultiPolygonRings, 'x')).toThrow(/without rings/)
    })
})

describe('readGeoPackageGeometry', () => {
    /** A GeoPackage blob around WKB: header, then the geometry in the given byte order */
    function blob(wkb: (view: DataView, offset: number) => number, size: number, flags = 1) {
        const buffer = new ArrayBuffer(8 + size)
        const view = new DataView(buffer)
        view.setUint8(0, 0x47)
        view.setUint8(1, 0x50)
        view.setUint8(2, 0)
        view.setUint8(3, flags)
        view.setInt32(4, 4326, true)
        const end = wkb(view, 8)
        return new Uint8Array(buffer, 0, end)
    }
    /** A ring of four positions, each with a height of 100 when `type` has a Z */
    const polygon =
        (littleEndian: boolean, type = 3) =>
        (view: DataView, offset: number) => {
            view.setUint8(offset, littleEndian ? 1 : 0)
            view.setUint32(offset + 1, type, littleEndian)
            view.setUint32(offset + 5, 1, littleEndian)
            view.setUint32(offset + 9, 4, littleEndian)
            const points = [
                [4, 50],
                [5, 50],
                [5, 51],
                [4, 50],
            ]
            let at = offset + 13
            for (const [x, y] of points) {
                view.setFloat64(at, x ?? 0, littleEndian)
                view.setFloat64(at + 8, y ?? 0, littleEndian)
                at += 16
                if (type > 1000) {
                    view.setFloat64(at, 100, littleEndian)
                    at += 8
                }
            }
            return at
        }
    const size = 13 + 4 * 24
    const point =
        (littleEndian: boolean, type = 1) =>
        (view: DataView, offset: number) => {
            view.setUint8(offset, littleEndian ? 1 : 0)
            view.setUint32(offset + 1, type, littleEndian)
            view.setFloat64(offset + 5, 4.5, littleEndian)
            view.setFloat64(offset + 13, 50.5, littleEndian)
            if (type === 1001) view.setFloat64(offset + 21, 100, littleEndian)
            return offset + (type === 1001 ? 29 : 21)
        }

    it('reads a polygon in either byte order', () => {
        const expected = [
            [
                [
                    [4, 50],
                    [5, 50],
                    [5, 51],
                    [4, 50],
                ],
            ],
        ]
        expect(readGeoPackageGeometry(blob(polygon(true), size))).toEqual(expected)
        expect(readGeoPackageGeometry(blob(polygon(false), size))).toEqual(expected)
    })

    it('drops the Z of a polygon that has one', () => {
        expect(readGeoPackageGeometry(blob(polygon(true, 1003), size))).toEqual(
            readGeoPackageGeometry(blob(polygon(true), size)),
        )
    })

    it('reads a point, with or without a Z, in either byte order', () => {
        expect(readGeoPackagePoint(blob(point(true), 29))).toEqual([4.5, 50.5])
        expect(readGeoPackagePoint(blob(point(false, 1001), 29))).toEqual([4.5, 50.5])
        expect(() => readGeoPackagePoint(blob(polygon(true), size))).toThrow(/expected a point/)
        expect(() => readGeoPackageGeometry(blob(point(true), 29))).toThrow(/expected a polygon/)
    })

    it('reads a multipolygon from the fixture', () => {
        const [geometry] = buildCantonBoundaries(root).boundaries
        expect(geometry?.geometry.coordinates.length).toBeGreaterThan(0)
    })

    it('refuses what it can’t read', () => {
        expect(() => readGeoPackageGeometry(new Uint8Array([1, 2, 3]))).toThrow(/Not a GeoPackage/)
        expect(() => readGeoPackageGeometry(blob(polygon(true), size, 0x21))).toThrow(/empty/)
        expect(() => readGeoPackageGeometry(blob(polygon(true), size, 0x0b))).toThrow(
            /bad envelope/,
        )
        expect(() => readGeoPackageGeometry(blob(polygon(true, 2003), size))).toThrow(/with M/)
        expect(() => readGeoPackageGeometry(blob(polygon(true, 3003), size))).toThrow(/with M/)
        expect(() => readGeoPackageGeometry(blob(polygon(true, 1), size))).toThrow(
            /expected a polygon/,
        )
        const trailing = new Uint8Array([...blob(polygon(true), size), 0])
        expect(() => readGeoPackageGeometry(trailing)).toThrow(/trailing bytes/)
    })
})

describe('zip', () => {
    const archive = readFileSync(fixture)

    it('lists and reads the entries', () => {
        expect(zipEntries(archive).map((e) => e.name)).toEqual(['judicial_4326.gpkg'])
        expect(
            zipEntry(archive, /\.gpkg$/)
                .subarray(0, 15)
                .toString(),
        ).toBe('SQLite format 3')
    })

    it('refuses an archive without the entry, or that isn’t one', () => {
        expect(() => zipEntry(archive, /\.shp$/)).toThrow(/expected one entry/)
        expect(() => zipEntries(Buffer.alloc(100))).toThrow(/Not a ZIP archive/)
    })
})

describe('stringifyBoundaries', () => {
    it('puts each ring on one line and round-trips', () => {
        const { boundaries } = buildCantonBoundaries(root)
        const text = stringifyBoundaries(boundaries)
        expect(JSON.parse(text)).toEqual(boundaries)
        const lines = text.split('\n')
        expect(lines.filter((l) => l.startsWith('          [[')).length).toBe(
            boundaries.flatMap((b) => b.geometry.coordinates.flat()).length,
        )
        expect(lines[0]).toBe('[')
        expect(lines[1]).toBe('  {')
        expect(lines[2]).toBe('    "id": "anderlecht-1",')
    })
})
