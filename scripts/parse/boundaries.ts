/**
 * Builds the canton boundaries from the snapshot of the NGI's "Judicial cantons and
 * arrondissements" GeoPackage (geo.be, WGS 84). One record per canton of data/cantons.json,
 * keyed by its id; a canton the file doesn't name, or a feature no canton matches, is reported
 * and stops the build: that needs a person, not a guess.
 *
 * A feature matches a canton when its Dutch and its French name both give the canton's id
 * (`toId` of the name, with the ordinal as the number), and both agree. Otherwise CANTON_ALIASES
 * maps the feature's canton code to the id by hand.
 */
import { readFileSync } from 'node:fs'

import type { Canton } from '../../src/territory.ts'
import { toId } from '../id.ts'
import { NGI_CANTONS } from '../sources/catalog.ts'
import { Snapshots } from '../sources/store.ts'
import {
    queryGeoPackage,
    readGeoPackageGeometry,
    type MultiPolygonRings,
    type Position,
    type Ring,
} from './geopackage.ts'
import type { CantonBoundary, MultiPolygon } from './types.ts'
import { zipEntry } from './zip.ts'

export type { CantonBoundary } from './types.ts'

/**
 * The NGI's canton code (`cantoncodedut`) → our canton id, for a feature whose Dutch and French
 * names don't both give the id. The NGI names these seven by their local name in both
 * languages, where the annex to the Judicial Code uses an exonym in the other language.
 */
export const CANTON_ALIASES: Record<string, string> = {
    // 'Canton judiciaire de Halle': the annex says 'Hal'
    '238121': 'halle',
    // "Canton judiciaire d'Oudenaarde": the annex says 'Audenarde'
    '248120': 'oudenaarde',
    // 'Gerechtelijk kanton Eupen-Saint-Vith': the annex says 'Eupen-Sankt-Vith'
    '258101': 'eupen-sankt-vith-1',
    '258102': 'eupen-sankt-vith-2',
    // 'Gerechtelijk kanton Huy': the annex says 'Hoei'
    '258201': 'huy-1',
    '258202': 'huy-2',
    // 'Gerechtelijk kanton Gembloux': the annex says 'Gembloers'
    '258406': 'gembloux',
}

/** The ordinal that opens a numbered canton's name, per language */
const ORDINALS = {
    nl: ['eerste', 'tweede', 'derde', 'vierde', 'vijfde', 'zesde', 'zevende'],
    fr: ['premier', 'deuxième', 'troisième', 'quatrième', 'cinquième', 'sixième', 'septième'],
}

/**
 * The place and number in a feature's name: 'Eerste gerechtelijk kanton Aalst' →
 * { name: 'Aalst', number: 1 }, "Canton judiciaire d'Arlon" → { name: 'Arlon' }
 */
export function parseName(
    name: string,
    lang: 'nl' | 'fr',
): { name: string; number?: number } | undefined {
    const pattern =
        lang === 'nl' ?
            /^(?:(\S+) )?gerechtelijk kanton (.+)$/i
        :   /^(?:(\S+) )?canton judiciaire (?:d'|de |des )(.+)$/i
    const match = pattern.exec(name)
    if (!match) return undefined
    const [, ordinal, place = ''] = match
    if (ordinal === undefined) return { name: place }
    const number = ORDINALS[lang].indexOf(ordinal.toLowerCase()) + 1
    return number > 0 ? { name: place, number } : undefined
}

/** A feature of the NGI's judicialcanton table */
export interface Feature {
    tgid: string
    namedut: string
    namefre: string
    cantoncodedut: string
    cantoncodefre: string
}

/** Cantons by the id their Dutch name gives, and by the id their French name gives */
export function cantonIndex(cantons: readonly Canton[]) {
    const byName = { nl: new Map<string, Canton>(), fr: new Map<string, Canton>() }
    for (const canton of cantons) {
        byName.nl.set(toId(canton.name.nl, canton.number), canton)
        byName.fr.set(toId(canton.name.fr, canton.number), canton)
    }
    return byName
}

/** The canton a feature is the boundary of, or why none can be told */
export function matchCanton(
    feature: Feature,
    byName: ReturnType<typeof cantonIndex>,
    aliases: Record<string, string> = CANTON_ALIASES,
): { canton: Canton } | { problem: string } {
    const label = `${feature.namedut} / ${feature.namefre} (${feature.cantoncodedut})`
    const alias = aliases[feature.cantoncodedut]
    if (alias !== undefined) {
        const canton = [...byName.nl.values()].find((c) => c.id === alias)
        return canton ? { canton } : { problem: `${label}: alias to unknown canton "${alias}"` }
    }
    const nl = parseName(feature.namedut, 'nl')
    const fr = parseName(feature.namefre, 'fr')
    if (!nl || !fr) return { problem: `${label}: can't read the name` }
    const inNl = byName.nl.get(toId(nl.name, nl.number))
    const inFr = byName.fr.get(toId(fr.name, fr.number))
    if (inNl && inNl === inFr) return { canton: inNl }
    return {
        problem:
            `${label}: Dutch name gives ${inNl?.id ?? 'no canton'}, French name gives ` +
            `${inFr?.id ?? 'no canton'}; add it to CANTON_ALIASES`,
    }
}

/** Coordinates are kept to 7 decimals: about a centimetre, below the source's own precision */
const DECIMALS = 7
const round = (n: number) => Math.round(n * 10 ** DECIMALS) / 10 ** DECIMALS

/** Twice the signed area of a ring in coordinate units: positive when counter-clockwise */
export function signedArea(ring: Ring): number {
    let sum = 0
    let previous: Position | undefined
    for (const [bx, by] of ring) {
        if (previous) sum += previous[0] * by - bx * previous[1]
        previous = [bx, by]
    }
    return sum
}

/**
 * A ring as GeoJSON wants it: rounded, without consecutive repeats, closed, and wound
 * counter-clockwise for an exterior ring or clockwise for a hole. Vertices are never dropped
 * otherwise: the boundary stays the NGI's.
 */
export function toGeoJsonRing(ring: Ring, kind: 'exterior' | 'hole', label: string): Ring {
    const out: Ring = []
    for (const [x, y] of ring) {
        const position: Position = [round(x), round(y)]
        const last = out.at(-1)
        if (last?.[0] !== position[0] || last[1] !== position[1]) out.push(position)
    }
    const first = out[0]
    const last = out.at(-1)
    if (first?.[0] !== last?.[0] || first?.[1] !== last?.[1])
        throw new Error(`${label}: a ring isn't closed`)
    if (out.length < 4) throw new Error(`${label}: a ring has fewer than three distinct points`)
    const area = signedArea(out)
    if (area === 0) throw new Error(`${label}: a ring has no area`)
    const counterClockwise = area > 0
    return counterClockwise === (kind === 'exterior') ? out : out.reverse()
}

export function toGeoJson(polygons: MultiPolygonRings, label: string): MultiPolygon {
    if (polygons.length === 0) throw new Error(`${label}: no polygon`)
    return {
        type: 'MultiPolygon',
        coordinates: polygons.map(([exterior, ...holes]) => {
            if (!exterior) throw new Error(`${label}: a polygon without rings`)
            return [
                toGeoJsonRing(exterior, 'exterior', label),
                ...holes.map((hole) => toGeoJsonRing(hole, 'hole', label)),
            ]
        }),
    }
}

export interface BoundaryReport {
    /** Features no canton matches, with why */
    unmatched: string[]
    /** Cantons the file has no feature for */
    missing: string[]
}

const read = (path: string): unknown => JSON.parse(readFileSync(path, 'utf8'))

export function buildCantonBoundaries(
    root: string,
    dataDir = 'data',
): { boundaries: CantonBoundary[]; report: BoundaryReport } {
    const snapshots = new Snapshots(root, 'ngi')
    const entry = snapshots.entry(NGI_CANTONS)
    const path = snapshots.path(NGI_CANTONS)
    if (!entry || !path) throw new Error('No snapshot of the NGI canton boundaries')
    const cantons = read(`${dataDir}/cantons.json`) as Canton[]
    const byName = cantonIndex(cantons)
    const report: BoundaryReport = { unmatched: [], missing: [] }

    const geopackage = zipEntry(readFileSync(path), /\.gpkg$/)
    const features = queryGeoPackage(
        geopackage,
        'SELECT tgid, namedut, namefre, cantoncodedut, cantoncodefre, shape ' +
            'FROM judicialcanton ORDER BY cantoncodedut',
        (row) => ({
            tgid: String(row['tgid']),
            namedut: String(row['namedut']),
            namefre: String(row['namefre']),
            cantoncodedut: String(row['cantoncodedut']),
            cantoncodefre: String(row['cantoncodefre']),
            shape: row['shape'] as Uint8Array,
        }),
    )

    const boundaries = new Map<string, CantonBoundary>()
    for (const feature of features) {
        const match = matchCanton(feature, byName)
        if ('problem' in match) {
            report.unmatched.push(match.problem)
            continue
        }
        const { canton } = match
        const label = `${feature.namedut} (${feature.cantoncodedut})`
        if (boundaries.has(canton.id)) {
            report.unmatched.push(`${label}: a second feature for canton ${canton.id}`)
            continue
        }
        boundaries.set(canton.id, {
            id: canton.id,
            canton: canton.id,
            ngiId: feature.tgid,
            cantonCode: { nl: feature.cantoncodedut, fr: feature.cantoncodefre },
            geometry: toGeoJson(readGeoPackageGeometry(feature.shape), label),
            sources: [{ url: NGI_CANTONS, retrieved: entry.retrieved }],
        })
    }
    report.missing = cantons.filter((c) => !boundaries.has(c.id)).map((c) => c.id)
    return {
        boundaries: [...boundaries.values()].sort((a, b) => a.id.localeCompare(b.id)),
        report,
    }
}

/**
 * The file's JSON: records indented like the other data files, each ring of a geometry on one
 * line, so a diff shows which ring changed without running to millions of lines.
 */
export function stringifyBoundaries(boundaries: readonly CantonBoundary[]): string {
    const records = boundaries.map((boundary) => {
        const rings = boundary.geometry.coordinates
            .map(
                (polygon) =>
                    '        [\n' +
                    polygon.map((ring) => `          ${JSON.stringify(ring)}`).join(',\n') +
                    '\n        ]',
            )
            .join(',\n')
        const geometry = `{\n      "type": "MultiPolygon",\n      "coordinates": [\n${rings}\n      ]\n    }`
        return JSON.stringify({ ...boundary, geometry: '@geometry@' }, null, 2)
            .replace(/^/gm, '  ')
            .replace('"@geometry@"', geometry)
    })
    return `[\n${records.join(',\n')}\n]\n`
}
