import boundariesData from '../data/canton-boundaries.json'
import type { Bilingual, SourceRef } from './common'
import type { CantonId } from './ids.generated'
import { getCanton, type Canton } from './territory'
import {
    applyingOn,
    pickVersion,
    versionsById,
    type Coverage,
    type OnDay,
    type Validity,
} from './time'

export type { Bilingual, SourceRef } from './common'
export type { CantonId } from './ids.generated'
export type { Canton } from './territory'
export type { Coverage, OnDay, Validity } from './time'

/** A GeoJSON position: longitude, then latitude, in decimal degrees (WGS 84) */
export type Position = [number, number]

/**
 * A GeoJSON linear ring: closed (the first position repeated last), so at least four positions
 * @minItems 4
 */
export type Ring = Position[]

/**
 * The rings of a GeoJSON polygon: the exterior ring first, counter-clockwise, then its holes,
 * clockwise (RFC 7946)
 * @minItems 1
 */
export type PolygonCoordinates = Ring[]

/** A GeoJSON MultiPolygon geometry (RFC 7946), in WGS 84 */
export interface MultiPolygon {
    type: 'MultiPolygon'
    /** @minItems 1 */
    coordinates: PolygonCoordinates[]
}

/**
 * The boundary of a judicial canton, as the National Geographic Institute (NGI) digitised it
 * from the annex to the Judicial Code. The legal text in the canton's `territory` is the law;
 * where the two disagree, the text wins.
 */
export interface CantonBoundary extends Validity {
    /** The canton's id: a canton has one boundary, which takes its key */
    id: CantonId
    /** The canton the boundary belongs to */
    canton: CantonId
    /**
     * The NGI's identifier of the object (its `tgid`), e.g. '{50412818-C0B7-4FEE-9E9B-DFFF0A768922}'
     * @pattern ^\{[0-9A-F]{8}(-[0-9A-F]{4}){3}-[0-9A-F]{12}\}$
     */
    ngiId: string
    /**
     * The canton code in the NGI's data, in Dutch and French: six digits, the same in both
     * ('248112' for Gent 1), with an 'N' or 'F' prefix per language in Brussels-Capital and in
     * Sint-Genesius-Rode ('N238104', 'F238104' for Brussel 1)
     */
    cantonCode: Bilingual
    /**
     * The boundary as the NGI publishes it, without simplification: WGS 84, longitude first,
     * coordinates rounded to 7 decimals (about a centimetre)
     */
    geometry: MultiPolygon
    sources: SourceRef[]
}

/**
 * The boundaries describe the situation from the day the NGI's file was first read. A boundary
 * the NGI changes replaces the previous one; a canton the NGI drops keeps its boundary with a
 * `validTo`. Lookups for an earlier day throw a `RangeError`.
 */
export const cantonBoundariesCoverage: Coverage = { from: '2026-10-21' }

// The data is validated against the JSON Schema generated from these types (test/schema.test.ts).
// TypeScript reads the file's positions as number[] rather than [number, number], hence unknown.
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
    for (const polygon of geometry.coordinates) {
        for (const [lon, lat] of polygon[0] ?? []) {
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
