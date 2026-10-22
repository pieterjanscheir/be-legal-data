// Turns the canton boundaries (23 MB of GeoJSON) into SVG paths of under 200 kB for the map:
// projected to the plane and simplified to about 150 m, which is plenty on screen. Written to
// public/, so every page that shows the map loads the same cached file. The lookups on the site
// use the package itself; this is only the drawing.
import { mkdirSync, writeFileSync } from 'node:fs'
import { cantonBoundaries } from 'belgica/canton-boundaries'
import {
    appliesOn,
    cantons,
    formatCourtName,
    getJusticeOfThePeace,
    toDay,
    type Canton,
} from 'belgica'

type Point = [x: number, y: number]

// An equirectangular projection centred on Belgium: at 50.5° N a degree of longitude is
// cos(50.5°) as long as a degree of latitude
const LAT0 = 50.5
const KX = Math.cos((LAT0 * Math.PI) / 180)
const SCALE = 400 // SVG units per degree of latitude
const TOLERANCE = 0.0014 * SCALE // ≈ 150 m

const project = ([lon, lat]: readonly number[]): Point => [
    (lon ?? 0) * KX * SCALE,
    -(lat ?? 0) * SCALE,
]

function distanceToSegment([px, py]: Point, [ax, ay]: Point, [bx, by]: Point): number {
    const dx = bx - ax
    const dy = by - ay
    const length2 = dx * dx + dy * dy
    const t =
        length2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / length2))
    return Math.hypot(px - (ax + t * dx), py - (ay + t * dy))
}

// Douglas–Peucker, iterative so the long rings don't overflow the stack
function simplify(points: Point[]): Point[] {
    if (points.length < 4) return points
    const keep = new Uint8Array(points.length)
    keep[0] = keep[points.length - 1] = 1
    const stack: [number, number][] = [[0, points.length - 1]]
    while (stack.length) {
        const [first, last] = stack.pop() ?? [0, 0]
        const a = points[first] ?? [0, 0]
        const b = points[last] ?? [0, 0]
        let max = 0
        let index = 0
        for (let i = first + 1; i < last; i++) {
            const d = distanceToSegment(points[i] ?? a, a, b)
            if (d > max) [max, index] = [d, i]
        }
        if (max > TOLERANCE) {
            keep[index] = 1
            stack.push([first, index], [index, last])
        }
    }
    return points.filter((_, i) => keep[i])
}

const round = (n: number) => Math.round(n * 10) / 10
const today = toDay(new Date())
let minX = Infinity
let minY = Infinity
let maxX = -Infinity
let maxY = -Infinity

const shapes = cantonBoundaries
    .filter((b) => appliesOn(b, today))
    .map((boundary) => {
        const rings = boundary.geometry.coordinates
            .flat()
            .map((ring) => simplify(ring.map(project)))
            .filter((ring) => ring.length >= 4)
        for (const [x, y] of rings.flat()) {
            minX = Math.min(minX, x)
            minY = Math.min(minY, y)
            maxX = Math.max(maxX, x)
            maxY = Math.max(maxY, y)
        }
        return { canton: boundary.canton, rings }
    })

const cantonById = new Map<string, Canton>(
    cantons.filter((c) => appliesOn(c, today)).map((c) => [c.id, c]),
)
// 'Gent 1 / Gand 1', as the site's lib/data.ts names a canton
function label(id: string): string {
    const c = cantonById.get(id)
    if (!c) return id
    const n = c.number === undefined ? '' : ` ${c.number}`
    const [nl, fr] = [`${c.name.nl}${n}`, `${c.name.fr}${n}`]
    return nl === fr ? nl : `${nl} / ${fr}`
}
const map = {
    viewBox: [0, 0, round(maxX - minX), round(maxY - minY)],
    cantons: shapes.map(({ canton, rings }) => ({
        canton,
        name: label(canton),
        court: formatCourtName(getJusticeOfThePeace(canton), 'nl'),
        // One path per canton; the even-odd rule cuts the holes out
        d: rings
            .map(
                (ring) =>
                    'M' +
                    ring.map(([x, y]) => `${round(x - minX)} ${round(y - minY)}`).join('L') +
                    'Z',
            )
            .join(''),
    })),
}

mkdirSync(new URL('../public', import.meta.url), { recursive: true })
const out = new URL('../public/canton-map.json', import.meta.url)
writeFileSync(out, JSON.stringify(map))
console.log(
    `canton map: ${map.cantons.length} cantons, ${Math.round(JSON.stringify(map).length / 1024)} KB`,
)
