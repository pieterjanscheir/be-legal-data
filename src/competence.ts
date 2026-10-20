import { getJusticeOfThePeace, type JusticeOfThePeace } from './courts'
import { getCantonsForMunicipality, type Canton } from './territory'

export interface CantonCourt {
    canton: Canton
    /** `undefined` when the canton's court isn't in the data yet; see the known gaps */
    court: JusticeOfThePeace | undefined
    /**
     * The canton covers only part of the municipality: the street address decides, and the
     * canton's `territory` says which part
     */
    partial: boolean
}

/**
 * The justices of the peace for a municipality, by REFNIS code: one for most municipalities,
 * several for a city split over cantons.
 */
export function findJusticesOfThePeace(municipalityId: string): CantonCourt[] {
    return getCantonsForMunicipality(municipalityId).map((canton) => ({
        canton,
        court: getJusticeOfThePeace(canton.id),
        partial: canton.municipalities.some(
            (m) => m.municipality === municipalityId && m.partial === true,
        ),
    }))
}
