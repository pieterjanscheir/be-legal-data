import arrondissementsData from '../data/arrondissements.json'
import cantonsData from '../data/cantons.json'
import judicialAreasData from '../data/judicial-areas.json'
import municipalitiesData from '../data/municipalities.json'
import type { Bilingual, Translated } from './common'

export type { Bilingual, Locale, SourceRef, Translated } from './common'

/** Area of a court of appeal (rechtsgebied): Antwerpen, Brussel, Gent, Luik or Bergen */
export interface JudicialArea {
    /**
     * Stable key, e.g. 'Ghent'
     * @pattern ^[A-Z][A-Za-z0-9]*$
     */
    id: string
    name: Translated
}

export interface Arrondissement {
    /**
     * Stable key, e.g. 'EastFlanders'
     * @pattern ^[A-Z][A-Za-z0-9]*$
     */
    id: string
    name: Translated
    /** Id of the judicial area the arrondissement belongs to */
    judicialArea: string
}

export interface Municipality {
    /**
     * Statbel REFNIS (NIS) code, e.g. '44021' for Gent
     * @pattern ^\d{5}$
     */
    refnis: string
    name: Bilingual
    /**
     * REFNIS code of the province, or '04000' for the Brussels-Capital Region
     * @pattern ^\d{5}$
     */
    province: string
}

/** A judicial canton: the area of one justice of the peace */
export interface Canton {
    /**
     * Stable key, e.g. 'Gent1' or 'MerelbekeMelle'. The justice of the peace of a canton has
     * the id 'Vredegerecht' + canton id.
     * @pattern ^[A-Z][A-Za-z0-9]*$
     */
    id: string
    /** Id of the judicial arrondissement */
    arrondissement: string
    /** Name of the canton; usually the seat, but not always ('Oudergem' sits in Etterbeek) */
    name: Bilingual
    /** Canton number for places with several cantons (Gent 1–5, …) */
    number?: number
    /** Where the justice of the peace sits */
    seat: Bilingual
    /**
     * The municipalities the canton covers. `partial` marks a municipality that is split over
     * several cantons; `territory` then says which part belongs to this one.
     */
    municipalities: { refnis: string; partial?: boolean }[]
    /** The canton's area, verbatim from the annex to the Judicial Code */
    territory: Bilingual
    /** Where in the annex to the Judicial Code the canton is defined */
    source: string
}

export const judicialAreas: readonly JudicialArea[] = judicialAreasData
export const arrondissements: readonly Arrondissement[] = arrondissementsData
export const municipalities: readonly Municipality[] = municipalitiesData
export const cantons: readonly Canton[] = cantonsData

const byId = <T extends { id: string }>(items: readonly T[]) =>
    new Map(items.map((item) => [item.id, item]))

const judicialAreasById = byId(judicialAreas)
const arrondissementsById = byId(arrondissements)
const cantonsById = byId(cantons)
const municipalitiesByRefnis = new Map(municipalities.map((m) => [m.refnis, m]))
const cantonsByRefnis = new Map<string, Canton[]>()
for (const canton of cantons) {
    for (const { refnis } of canton.municipalities) {
        cantonsByRefnis.set(refnis, [...(cantonsByRefnis.get(refnis) ?? []), canton])
    }
}

export function getJudicialArea(id: string): JudicialArea | undefined {
    return judicialAreasById.get(id)
}

export function getArrondissement(id: string): Arrondissement | undefined {
    return arrondissementsById.get(id)
}

export function getMunicipality(refnis: string): Municipality | undefined {
    return municipalitiesByRefnis.get(refnis)
}

export function getCanton(id: string): Canton | undefined {
    return cantonsById.get(id)
}

/**
 * The cantons that cover a municipality. One canton for most municipalities; several for
 * cities that are split (Antwerpen, Gent, Brussel, …), in which case the street address decides
 * and each canton's `territory` describes its part.
 */
export function getCantonsForMunicipality(refnis: string): Canton[] {
    return [...(cantonsByRefnis.get(refnis) ?? [])]
}
