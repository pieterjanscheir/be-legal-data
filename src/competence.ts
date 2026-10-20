import { getJusticeOfThePeace, type Court } from './courts'
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
    // Every canton has its court: test/data.test.ts checks it
    return getCantonsForMunicipality(municipalityId, options).map((canton) => ({
        canton,
        court: getJusticeOfThePeace(canton.id),
        partial: canton.municipalities.some(
            (m) => m.municipality === municipalityId && m.partial === true,
        ),
    }))
}
