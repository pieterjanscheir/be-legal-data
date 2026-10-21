import { getCourtsForCanton, getJusticeOfThePeace, type Court, type CourtType } from './courts'
import { getCantonsForMunicipality, type Canton } from './territory'
import type { OnDay } from './time'

export interface CantonCourt {
    canton: Canton
    /** The canton's justice of the peace */
    court: Court
    /**
     * The canton covers only part of the municipality: the street address decides, and the
     * canton's `territory` says which part
     */
    partial: boolean
}

/**
 * The justices of the peace for a municipality on a day (today by default), by REFNIS code:
 * one for most municipalities, several for a city split over cantons.
 */
export function findJusticesOfThePeace(municipalityId: string, options: OnDay = {}): CantonCourt[] {
    return getCantonsForMunicipality(municipalityId, options).flatMap((canton) => {
        const court = getJusticeOfThePeace(canton.id, options)
        // Every canton has its court on every day of the coverage (test/data.test.ts); the
        // branch is there for the type
        /* v8 ignore start */
        if (!court) return []
        /* v8 ignore stop */
        return [
            {
                canton,
                court,
                partial: canton.municipalities.some(
                    (m) => m.municipality === municipalityId && m.partial === true,
                ),
            },
        ]
    })
}

/**
 * The courts of a type competent for a municipality on a day (today by default), by REFNIS
 * code: the courts whose area, as the law sets it, holds one of its cantons. One court for most
 * municipalities; in Brussels the Dutch- and the French-speaking court; for a city split over
 * cantons, every justice of the peace that serves one of them (the street address decides, see
 * `findJusticesOfThePeace`). The court as a whole: which of its divisions hears a case is set
 * by royal decree and isn't in the data; see `getDivisions`. Empty for an unknown code.
 */
export function findCompetentCourts(
    municipalityId: string,
    type: CourtType,
    options: OnDay = {},
): Court[] {
    const found = new Set<Court>()
    for (const canton of getCantonsForMunicipality(municipalityId, options)) {
        for (const court of getCourtsForCanton(canton.id, options))
            if (court.type === type) found.add(court)
    }
    return [...found]
}
