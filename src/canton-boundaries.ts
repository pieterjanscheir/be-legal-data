// Not inlined by tsup: dist/ imports the file from data/ (tsup.config.ts)
import boundariesData from '../data/canton-boundaries.json' with { type: 'json' }
import type { CantonId } from './ids.generated'
import { boundingBox, contains, inBox, requireCoordinates, type BoundingBox } from './geometry'
import type { CantonBoundary } from './schemas/canton-boundaries'
import { getCanton, type Canton } from './territory'
import { applyingOn, pickVersion, versionsById, type Coverage, type OnDay } from './time'

export type { Bilingual, SourceRef } from './common'
export type { CantonId } from './ids.generated'
export type { Canton } from './territory'
export type { Coverage, OnDay, Validity } from './time'

export type {
    CantonBoundary,
    MultiPolygon,
    PolygonCoordinates,
    Position,
    Ring,
} from './schemas/canton-boundaries'

/**
 * The boundaries describe the situation from the day the NGI's file was first read. A boundary
 * the NGI changes replaces the previous one; a canton the NGI drops keeps its boundary with a
 * `validTo`. Lookups for an earlier day throw a `RangeError`.
 */
export const cantonBoundariesCoverage: Coverage = { from: '2026-10-21' }

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts). TypeScript
// reads the file's positions as number[] rather than [number, number], hence unknown.
/** Every record, every version */
export const cantonBoundaries = boundariesData as unknown as readonly CantonBoundary[]

const DATASET = 'canton boundaries'
const boundariesById = versionsById(cantonBoundaries)

/** The boundary of a canton, by canton id: today's version, or the one of a given day */
export function getCantonBoundary(id: CantonId): CantonBoundary
export function getCantonBoundary(id: string, options?: OnDay): CantonBoundary | undefined
export function getCantonBoundary(id: string, options?: OnDay): CantonBoundary | undefined {
    return pickVersion(boundariesById.get(id), options, cantonBoundariesCoverage, DATASET)
}

// The bounding boxes, computed once, on the first lookup rather than at import
let index: { boundary: CantonBoundary; box: BoundingBox }[] | undefined

/**
 * The cantons whose boundary holds a point, on a day (today by default). Longitude first, then
 * latitude, in decimal degrees (WGS 84), as GeoJSON orders them. One canton for a point in
 * Belgium; none outside it; two for a point on the line between two cantons. The boundary is
 * the NGI's digitisation of the annex to the Judicial Code: where a point lies close to a
 * boundary, the canton's `territory` text decides. Throws a `RangeError` for coordinates that
 * aren't finite numbers, or a day before the coverage.
 */
export function findCantonsAt(longitude: number, latitude: number, options: OnDay = {}): Canton[] {
    requireCoordinates(longitude, latitude)
    index ??= cantonBoundaries.map((boundary) => ({
        boundary,
        box: boundingBox(boundary.geometry),
    }))
    const applying = new Set(
        applyingOn(cantonBoundaries, options, cantonBoundariesCoverage, DATASET),
    )
    return index
        .filter(
            ({ boundary, box }) =>
                applying.has(boundary) &&
                inBox(box, longitude, latitude) &&
                contains(boundary.geometry, longitude, latitude),
        )
        .flatMap(({ boundary }) => {
            const canton = getCanton(boundary.canton, options)
            // Every boundary belongs to a canton that applies on the same days
            // (test/canton-boundaries.test.ts); the branch is there for the type
            /* v8 ignore start */
            if (!canton) return []
            /* v8 ignore stop */
            return [canton]
        })
}
