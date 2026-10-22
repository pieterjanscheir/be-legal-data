import boundariesData from '../data/arrondissement-boundaries.json'
import { boundingBox, contains, inBox, requireCoordinates, type BoundingBox } from './geometry'
import type { ArrondissementId } from './ids.generated'
import type { ArrondissementBoundary } from './schemas/arrondissement-boundaries'
import { getArrondissement, type Arrondissement } from './territory'
import { applyingOn, pickVersion, versionsById, type Coverage, type OnDay } from './time'

export type { SourceRef } from './common'
export type { ArrondissementId } from './ids.generated'
export type { Arrondissement } from './territory'
export type { Coverage, OnDay, Validity } from './time'

export type { ArrondissementBoundary } from './schemas/arrondissement-boundaries'
export type { MultiPolygon, PolygonCoordinates, Position, Ring } from './schemas/geometry'

/**
 * The boundaries describe the situation from the day the NGI's file was first read for them. A
 * boundary the NGI changes replaces the previous one; an arrondissement the NGI drops keeps its
 * boundary with a `validTo`. Lookups for an earlier day throw a `RangeError`.
 */
export const arrondissementBoundariesCoverage: Coverage = { from: '2026-10-21' }

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts). TypeScript
// reads the file's positions as number[] rather than [number, number], hence unknown.
/** Every record, every version */
export const arrondissementBoundaries =
    boundariesData as unknown as readonly ArrondissementBoundary[]

const DATASET = 'arrondissement boundaries'
const boundariesById = versionsById(arrondissementBoundaries)

/** The boundary of an arrondissement, by arrondissement id: today's version, or the one of a given day */
export function getArrondissementBoundary(id: ArrondissementId): ArrondissementBoundary
export function getArrondissementBoundary(
    id: string,
    options?: OnDay,
): ArrondissementBoundary | undefined
export function getArrondissementBoundary(
    id: string,
    options?: OnDay,
): ArrondissementBoundary | undefined {
    return pickVersion(boundariesById.get(id), options, arrondissementBoundariesCoverage, DATASET)
}

// The bounding boxes, computed once, on the first lookup rather than at import
let index: { boundary: ArrondissementBoundary; box: BoundingBox }[] | undefined

/**
 * The arrondissements whose boundary holds a point, on a day (today by default). Longitude
 * first, then latitude, in decimal degrees (WGS 84), as GeoJSON orders them. One arrondissement
 * for a point in Belgium; none outside it; two for a point on the line between two. Throws a
 * `RangeError` for coordinates that aren't finite numbers, or a day before the coverage.
 */
export function findArrondissementsAt(
    longitude: number,
    latitude: number,
    options: OnDay = {},
): Arrondissement[] {
    requireCoordinates(longitude, latitude)
    index ??= arrondissementBoundaries.map((boundary) => ({
        boundary,
        box: boundingBox(boundary.geometry),
    }))
    const applying = new Set(
        applyingOn(arrondissementBoundaries, options, arrondissementBoundariesCoverage, DATASET),
    )
    return index
        .filter(
            ({ boundary, box }) =>
                applying.has(boundary) &&
                inBox(box, longitude, latitude) &&
                contains(boundary.geometry, longitude, latitude),
        )
        .flatMap(({ boundary }) => {
            const arrondissement = getArrondissement(boundary.arrondissement, options)
            // Every boundary belongs to an arrondissement that applies on the same days
            // (test/arrondissement-boundaries.test.ts); the branch is there for the type
            /* v8 ignore start */
            if (!arrondissement) return []
            /* v8 ignore stop */
            return [arrondissement]
        })
}
