/**
 * Point-in-polygon for the boundary datasets: plain ray casting over GeoJSON multipolygons,
 * with a bounding box to skip the polygons a point is nowhere near
 */
import type { MultiPolygon, Position, Ring } from './schemas/geometry'

export type BoundingBox = [minLon: number, minLat: number, maxLon: number, maxLat: number]

/** A point within a centimetre of an edge counts as on it (degrees; a metre is about 1e-5) */
const ON_EDGE = 1e-7

export function boundingBox(geometry: MultiPolygon): BoundingBox {
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

export function contains(geometry: MultiPolygon, lon: number, lat: number): boolean {
    return geometry.coordinates.some(
        ([exterior, ...holes]) =>
            exterior !== undefined &&
            inRing(exterior, lon, lat) &&
            !holes.some((hole) => inRing(hole, lon, lat)),
    )
}

/** Whether a point lies within a bounding box, edges included */
export function inBox(box: BoundingBox, lon: number, lat: number): boolean {
    return Math.max(box[0] - lon, lon - box[2], box[1] - lat, lat - box[3]) <= 0
}

/** Throws a `RangeError` for coordinates that aren't finite numbers */
export function requireCoordinates(longitude: number, latitude: number): void {
    if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
        throw new RangeError(
            `Expected a longitude and a latitude in decimal degrees, got ${longitude}, ${latitude}`,
        )
    }
}
