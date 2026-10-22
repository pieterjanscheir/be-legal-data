import { findCantonsAt } from '../../../src/canton-boundaries'
import {
    findCourtsWithJurisdiction,
    findJusticesOfThePeace,
    getCourtsForCanton,
    getMunicipalitiesForPostalCode,
    type Court,
    type CourtType,
    type OnDay,
} from '../../../src/index'

/**
 * A place the law connects a claim to: a domicile, the place of an obligation, where a property
 * lies. As precise as the caller knows it: a municipality by REFNIS code, a postal code, a point
 * (longitude, latitude; from a geocoded street address), abroad, or not known at all.
 */
export type Place =
    | { municipality: string }
    | { postalCode: string }
    | { point: readonly [longitude: number, latitude: number] }
    | { abroad: true }
    | { unknown: true }

export interface PlaceCourts {
    /** The courts of the type for the place: one, both language courts in Brussels, or several when the place isn't precise enough */
    courts: Court[]
    /**
     * The place doesn't settle the court: a postal code of two municipalities, or a city split
     * over cantons for a justice of the peace. The street address decides.
     */
    ambiguous: boolean
}

/** The courts of a type for a place, through belgica's lookups. None abroad or when unknown. */
export function resolvePlace(place: Place, type: CourtType, options: OnDay = {}): PlaceCourts {
    if ('municipality' in place) return forMunicipality(place.municipality, type, options)
    if ('postalCode' in place) {
        const parts = getMunicipalitiesForPostalCode(place.postalCode, options).map((m) =>
            forMunicipality(m.id, type, options),
        )
        const courts = unique(parts.flatMap((p) => p.courts))
        return {
            courts,
            ambiguous: parts.some((p) => p.ambiguous) || (parts.length > 1 && differ(parts)),
        }
    }
    if ('point' in place) {
        const [longitude, latitude] = place.point
        const courts = unique(
            findCantonsAt(longitude, latitude, options).flatMap((canton) =>
                getCourtsForCanton(canton.id, options).filter((c) => c.type === type),
            ),
        )
        // A point on the line between two cantons gives both justices of the peace
        return { courts, ambiguous: type === 'justice-of-the-peace' && courts.length > 1 }
    }
    return { courts: [], ambiguous: false }
}

function forMunicipality(id: string, type: CourtType, options: OnDay): PlaceCourts {
    if (type === 'justice-of-the-peace') {
        const found = findJusticesOfThePeace(id, options)
        return { courts: found.map((f) => f.court), ambiguous: found.some((f) => f.partial) }
    }
    return { courts: findCourtsWithJurisdiction(id, type, options), ambiguous: false }
}

// Two municipalities of a postal code with different courts: the street decides
function differ(parts: PlaceCourts[]): boolean {
    const keys = new Set(parts.map((p) => p.courts.map((c) => c.id).join()))
    return keys.size > 1
}

function unique(courts: Court[]): Court[] {
    return [...new Set(courts)]
}

export function isKnown(place: Place | undefined): place is Place {
    return place !== undefined && !('unknown' in place)
}

export function isInBelgium(place: Place | undefined): place is Place {
    return isKnown(place) && !('abroad' in place)
}
