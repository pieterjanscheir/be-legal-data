// What the address lookup reads in the browser, from the package: the canton boundaries at full
// precision, one file per canton under public/address/, and an index of their bounding boxes.
// The lookup fetches only the cantons whose box holds the address, a few hundred kB, not the
// 23 MB of the whole set; the simplified map (build-map.ts) is ~150 m off, too far for a street
// that is itself a boundary.
import { mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { cantonBoundaries } from 'belgica/canton-boundaries'
import {
    appliesOn,
    cantons,
    formatCourtName,
    getCourtsForCanton,
    getMunicipalitiesForPostalCode,
    getMunicipality,
    postalCodes,
    toDay,
    type Canton,
    type Locale,
} from 'belgica'

const today = toDay(new Date())
const locales: Locale[] = ['nl', 'fr', 'de']

// 'Gent 1 / Gand 1', as the site's lib/data.ts names a canton
function label(c: Canton): string {
    const n = c.number === undefined ? '' : ` ${c.number}`
    const [nl, fr] = [`${c.name.nl}${n}`, `${c.name.fr}${n}`]
    return nl === fr ? nl : `${nl} / ${fr}`
}

function box(rings: readonly (readonly (readonly number[])[])[]): number[] {
    const b = [Infinity, Infinity, -Infinity, -Infinity]
    for (const ring of rings)
        for (const [lon = 0, lat = 0] of ring) {
            b[0] = Math.min(b[0] ?? 0, lon)
            b[1] = Math.min(b[1] ?? 0, lat)
            b[2] = Math.max(b[2] ?? 0, lon)
            b[3] = Math.max(b[3] ?? 0, lat)
        }
    return b
}

const cantonById = new Map(cantons.filter((c) => appliesOn(c, today)).map((c) => [c.id, c]))
const dir = new URL('../public/address/', import.meta.url)
rmSync(dir, { recursive: true, force: true })
mkdirSync(dir, { recursive: true })

const index: { canton: string; box: number[] }[] = []
let bytes = 0
for (const boundary of cantonBoundaries.filter((b) => appliesOn(b, today))) {
    const canton = cantonById.get(boundary.canton)
    if (!canton) continue
    index.push({ canton: canton.id, box: box(boundary.geometry.coordinates.flat()) })
    const file = JSON.stringify({
        canton: canton.id,
        name: label(canton),
        territory: canton.territory,
        // The municipalities split over several cantons, whose part the address decides
        split: canton.municipalities
            .filter((m) => m.partial)
            .map((m) => getMunicipality(m.municipality).name),
        courts: getCourtsForCanton(canton.id, { on: today }).map((court) => ({
            id: court.id,
            type: court.type,
            name: Object.fromEntries(locales.map((l) => [l, formatCourtName(court, l)])),
            address: court.address,
        })),
        geometry: boundary.geometry.coordinates,
    })
    bytes += file.length
    writeFileSync(new URL(`${canton.id}.json`, dir), file)
}

// Each region keeps its own address register: the postal code says which to ask
const register = { '02000': 'flanders', '03000': 'wallonia', '04000': 'brussels' } as const
const regions = Object.fromEntries(
    [...new Set(postalCodes.filter((p) => appliesOn(p, today)).map((p) => p.postalCode))].map(
        (code) => {
            const region = getMunicipalitiesForPostalCode(code, { on: today })[0]?.region
            return [code, register[region as keyof typeof register]]
        },
    ),
)

writeFileSync(new URL('index.json', dir), JSON.stringify({ cantons: index, regions }))
console.log(
    `address lookup: ${index.length} cantons, ${Math.round(bytes / 1024 / index.length)} KB each on average`,
)
