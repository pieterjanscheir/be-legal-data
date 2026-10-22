// Point-in-polygon and distance to a boundary, for the address lookup in the browser. `contains`
// is the package's own (src/geometry.ts), which findCantonsAt uses: the browser gets the
// boundaries as JSON files, not the package's 23 MB module, so it can't call findCantonsAt.

type Position = readonly number[]
type Ring = readonly Position[]
/** GeoJSON MultiPolygon coordinates: polygons of rings, the first exterior, the rest holes */
export type Polygons = readonly (readonly Ring[])[]

/** A point within a centimetre of an edge counts as on it (degrees; a metre is about 1e-5) */
const ON_EDGE = 1e-7

function onSegment(a: Position, b: Position, lon: number, lat: number): boolean {
    const [ax = 0, ay = 0] = a
    const [bx = 0, by = 0] = b
    const outside = Math.max(
        Math.min(ax, bx) - lon,
        lon - Math.max(ax, bx),
        Math.min(ay, by) - lat,
        lat - Math.max(ay, by),
    )
    if (outside > ON_EDGE) return false
    const cross = (bx - ax) * (lat - ay) - (by - ay) * (lon - ax)
    return Math.abs(cross) <= ON_EDGE * Math.hypot(bx - ax, by - ay)
}

/** Even-odd ray casting over a closed ring; a point on the ring counts as inside */
function inRing(ring: Ring, lon: number, lat: number): boolean {
    let inside = false
    let previous: Position | undefined
    for (const current of ring) {
        if (previous) {
            if (onSegment(previous, current, lon, lat)) return true
            const [ax = 0, ay = 0] = previous
            const [bx = 0, by = 0] = current
            if (ay > lat !== by > lat && lon < ((bx - ax) * (lat - ay)) / (by - ay) + ax)
                inside = !inside
        }
        previous = current
    }
    return inside
}

export function contains(polygons: Polygons, lon: number, lat: number): boolean {
    return polygons.some(
        ([exterior, ...holes]) =>
            exterior !== undefined &&
            inRing(exterior, lon, lat) &&
            !holes.some((hole) => inRing(hole, lon, lat)),
    )
}

/**
 * Metres from the point to the nearest edge, on a plane tangent at the point: plenty for tens
 * of metres. Infinity when no edge comes within about 100 m.
 */
export function distanceToEdge(polygons: Polygons, lon: number, lat: number): number {
    const k = Math.cos((lat * Math.PI) / 180)
    const toMetres = ([x = 0, y = 0]: Position): [number, number] => [
        (x - lon) * 111_320 * k,
        (y - lat) * 110_574,
    ]
    // About 100 m in degrees: a cheap first filter on each segment. Both ends on the same side,
    // not merely both far: a long straight edge passes the point with its ends far either side.
    const margin = 0.0015
    const far = (p: Position, q: Position, i: 0 | 1, at: number) =>
        Math.min(p[i] ?? 0, q[i] ?? 0) > at + margin || Math.max(p[i] ?? 0, q[i] ?? 0) < at - margin
    let best = Infinity
    for (const ring of polygons.flat()) {
        for (let i = 1; i < ring.length; i++) {
            const [p, q] = [ring[i - 1] ?? [], ring[i] ?? []]
            if (far(p, q, 0, lon) || far(p, q, 1, lat)) continue
            // The point is the origin
            const [a, b] = [toMetres(p), toMetres(q)]
            const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
            const length2 = dx * dx + dy * dy
            const t = length2 ? Math.max(0, Math.min(1, -(a[0] * dx + a[1] * dy) / length2)) : 0
            best = Math.min(best, Math.hypot(a[0] + t * dx, a[1] + t * dy))
        }
    }
    return best
}

/** Whether a point lies within a bounding box grown by `margin` degrees on every side */
export function nearBox(box: readonly number[], lon: number, lat: number, margin = 0): boolean {
    const [minLon = 0, minLat = 0, maxLon = 0, maxLat = 0] = box
    return (
        lon >= minLon - margin &&
        lon <= maxLon + margin &&
        lat >= minLat - margin &&
        lat <= maxLat + margin
    )
}
