import boundariesData from '../data/canton-boundaries.json'
import type { CantonId } from './ids.generated'
import type { CantonBoundary, MultiPolygon, Position, Ring } from './schemas/canton-boundaries'
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

type BoundingBox = [minLon: number, minLat: number, maxLon: number, maxLat: number]

/** A point within a centimetre of an edge counts as on it (degrees; a metre is about 1e-5) */
const ON_EDGE = 1e-7

function boundingBox(geometry: MultiPolygon): BoundingBox {
    const box: BoundingBox = [Infinity, Infinity, -Infinity, -Infinity]
    // The holes lie within the exterior ring, so every ring may go in
    for (const ring of geometry.coordinates.flat()) {
        for (const [lon, lat] of ring) {
            box[0] = Math.min(box[0], lon)
            box[1] = Math.min(box[1], lat)
            box[2] = Math.max(box[2], lon)
            box[3] = Math.max(box[3], lat)
        }
    }
    return box
}

/** Whether a point lies on the segment from a to b, give or take ON_EDGE */
function onSegment(a: Position, b: Position, lon: number, lat: number): boolean {
    const outside = Math.max(
        Math.min(a[0], b[0]) - lon,
        lon - Math.max(a[0], b[0]),
        Math.min(a[1], b[1]) - lat,
        lat - Math.max(a[1], b[1]),
    )
    if (outside > ON_EDGE) return false
    const cross = (b[0] - a[0]) * (lat - a[1]) - (b[1] - a[1]) * (lon - a[0])
    return Math.abs(cross) <= ON_EDGE * Math.hypot(b[0] - a[0], b[1] - a[1])
}

/** Even-odd ray casting over a closed ring; a point on the ring counts as inside */
function inRing(ring: Ring, lon: number, lat: number): boolean {
    let inside = false
    let previous: Position | undefined
    for (const current of ring) {
        if (previous) {
            if (onSegment(previous, current, lon, lat)) return true
            const [ax, ay] = previous
            const [bx, by] = current
            if (ay > lat !== by > lat && lon < ((bx - ax) * (lat - ay)) / (by - ay) + ax)
                inside = !inside
        }
        previous = current
    }
    return inside
}

function contains(geometry: MultiPolygon, lon: number, lat: number): boolean {
    return geometry.coordinates.some(
        ([exterior, ...holes]) =>
            exterior !== undefined &&
            inRing(exterior, lon, lat) &&
            !holes.some((hole) => inRing(hole, lon, lat)),
    )
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
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        throw new RangeError(
            `Expected a longitude and a latitude in decimal degrees, got ${longitude}, ${latitude}`,
        )
    }
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
                Math.max(
                    box[0] - longitude,
                    longitude - box[2],
                    box[1] - latitude,
                    latitude - box[3],
                ) <= 0 &&
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
