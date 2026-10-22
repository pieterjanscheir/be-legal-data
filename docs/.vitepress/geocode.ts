import { getMunicipalitiesForPostalCode } from '../../src'

/**
 * Geocoding a Belgian address with the regions' own address registers, from the browser: each
 * service answers with WGS 84 coordinates and allows any origin (CORS). Every region keeps its
 * own register, so the postal code picks the service; without one, all three are asked.
 */

export type GeocodeSource = 'flanders' | 'brussels' | 'wallonia'

export interface AddressCandidate {
    /** The address as the register writes it */
    label: string
    longitude: number
    latitude: number
    /**
     * The point is the house number's, on the building or parcel. When false, the register
     * knew the street but not the number, and the point is somewhere on the street: no use
     * in a street that is itself a canton boundary.
     */
    precise: boolean
    source: GeocodeSource
}

/** Which register to ask for a region, by its REFNIS code */
const SOURCE_BY_REGION: Record<string, GeocodeSource> = {
    '02000': 'flanders',
    '03000': 'wallonia',
    '04000': 'brussels',
}

/** The registers to ask: the region of the postal code in the address, or all three */
export function sourcesFor(address: string): GeocodeSource[] {
    const postalCode = /\b\d{4}\b/.exec(address)?.[0]
    const region = postalCode && getMunicipalitiesForPostalCode(postalCode)[0]?.region
    const source = region ? SOURCE_BY_REGION[region] : undefined
    return source ? [source] : ['flanders', 'brussels', 'wallonia']
}

async function getJson(url: string, signal?: AbortSignal): Promise<unknown> {
    const response = await fetch(url, { signal, headers: { Accept: 'application/json' } })
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
    return response.json()
}

// Digitaal Vlaanderen's Geolocation API, on the Adressenregister: Flanders (and Brussels, in Dutch)
interface FlandersResponse {
    LocationResult: {
        FormattedAddress: string
        Housenumber: string | null
        Location: { Lat_WGS84: number; Lon_WGS84: number }
    }[]
}

async function flanders(address: string, signal?: AbortSignal): Promise<AddressCandidate[]> {
    const ask = async (q: string) => {
        const url = `https://geo.api.vlaanderen.be/geolocation/v4/Location?c=5&q=${encodeURIComponent(q)}`
        return ((await getJson(url, signal)) as FlandersResponse).LocationResult
    }
    // The API completes as you type: '11' also gives 110 and 112, on another part of the street
    const numbers = new Set(address.toLowerCase().match(/\b\d+[a-z]?\b/g))
    let found = (await ask(address)).filter(
        (r) => r.Housenumber === null || numbers.has(r.Housenumber.toLowerCase()),
    )
    // A number the register doesn't know: the street, flagged as imprecise
    if (!found.length) {
        const street = address.replace(/(^|[\s,])\d{1,3}[a-z]?(?=[\s,]|$)/gi, '$1')
        if (street !== address) found = (await ask(street)).filter((r) => r.Housenumber === null)
    }
    return found.map((r) => ({
        label: r.FormattedAddress,
        longitude: r.Location.Lon_WGS84,
        latitude: r.Location.Lat_WGS84,
        precise: r.Housenumber !== null,
        source: 'flanders',
    }))
}

// UrbIS, the Brussels-Capital Region's localization service
interface BrusselsResponse {
    result?: {
        address: {
            street: { name: string; postCode: string; municipality: string }
            number: string
        }
        point: { x: number; y: number }
        score: number
        qualificationCode: { policeNumber: string }
    }[]
}

/** Below this, UrbIS has matched the number and guessed at the street */
const BRUSSELS_MIN_SCORE = 60

async function brussels(address: string, signal?: AbortSignal): Promise<AddressCandidate[]> {
    // The service searches the street names of one language: an address written in French
    // searched in Dutch finds other streets with the same number. Both, the better match first.
    const answers = await Promise.all(
        (['fr', 'nl'] as const).map(async (lang) => {
            const url = `https://geoservices.irisnet.be/localization/Rest/Localize/getaddresses?spatialReference=4326&language=${lang}&address=${encodeURIComponent(address)}`
            return ((await getJson(url, signal)) as BrusselsResponse).result ?? []
        }),
    )
    const seen = new Set<string>()
    return answers
        .flat()
        .filter((r) => r.score >= BRUSSELS_MIN_SCORE)
        .sort((a, b) => b.score - a.score)
        .flatMap((r) => {
            const { street, number } = r.address
            const label = `${street.name}${number ? ` ${number}` : ''}, ${street.postCode} ${street.municipality}`
            if (seen.has(label)) return []
            seen.add(label)
            return [
                {
                    label,
                    longitude: r.point.x,
                    latitude: r.point.y,
                    // '1': the house number was found
                    precise: r.qualificationCode.policeNumber === '1',
                    source: 'brussels' as const,
                },
            ]
        })
        .slice(0, 5)
}

// ICAR, the Walloon Region's address register, through the SPW's geocodeWS
interface Point {
    coordinates: [number, number]
}
interface WalloniaResponse {
    candidates?: {
        city: { name: string }
        zone?: { ident: string }
        street?: { name: string; geometry?: Point }
        house?: { name: string; geometry?: Point }
    }[]
}

async function wallonia(address: string, signal?: AbortSignal): Promise<AddressCandidate[]> {
    const url = `https://geoservices.wallonie.be/geocodeWS/geocode?crs=EPSG:4326&address=${encodeURIComponent(address)}`
    const { candidates = [] } = (await getJson(url, signal)) as WalloniaResponse
    return candidates.flatMap((c) => {
        const point = c.house?.geometry ?? c.street?.geometry
        if (!point) return []
        const street = [c.street?.name, c.house?.name].filter(Boolean).join(' ')
        const place = [c.zone?.ident, c.city.name].filter(Boolean).join(' ')
        return [
            {
                label: street ? `${street}, ${place}` : place,
                longitude: point.coordinates[0],
                latitude: point.coordinates[1],
                precise: Boolean(c.house?.geometry),
                source: 'wallonia' as const,
            },
        ]
    })
}

export interface GeocodeResult {
    candidates: AddressCandidate[]
    /** The registers that couldn't be reached, with the error */
    failed: { source: GeocodeSource; error: string }[]
}

/** The address's candidates from the register(s) of its region, house numbers first */
export async function geocode(address: string, signal?: AbortSignal): Promise<GeocodeResult> {
    const answers = await Promise.all(
        sourcesFor(address).map((source) =>
            (source === 'flanders' ? flanders(address, signal)
            : source === 'brussels' ? brussels(address, signal)
            : wallonia(address, signal)
            ).then(
                (candidates) => ({ source, candidates, error: undefined }),
                (error: unknown) => {
                    // A new search cancels this one: not the register's failure
                    if ((error as Error).name === 'AbortError') throw error
                    return { source, candidates: [], error: String(error) }
                },
            ),
        ),
    )
    const result: GeocodeResult = { candidates: [], failed: [] }
    for (const { source, candidates, error } of answers) {
        result.candidates.push(...candidates)
        if (error) result.failed.push({ source, error })
    }
    // Stable: each register's own ranking stays within the precise and the imprecise ones
    result.candidates.sort((a, b) => Number(b.precise) - Number(a.precise))
    return result
}
