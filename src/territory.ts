import arrondissementsData from '../data/arrondissements.json'
import cantonsData from '../data/cantons.json'
import judicialAreasData from '../data/judicial-areas.json'
import municipalitiesData from '../data/municipalities.json'
import type { Bilingual, Translated } from './common'
import type { ArrondissementId, CantonId, JudicialAreaId, MunicipalityId } from './ids.generated'

export type { Bilingual, Locale, SourceRef, Translated } from './common'
export type { ArrondissementId, CantonId, JudicialAreaId, MunicipalityId } from './ids.generated'

/** Area of a court of appeal (rechtsgebied): Antwerpen, Brussel, Gent, Luik or Bergen */
export interface JudicialArea {
    /** Stable id from the local-language name, e.g. 'gent' */
    id: JudicialAreaId
    name: Translated
}

export interface Arrondissement {
    /** Stable id from the local-language name, e.g. 'oost-vlaanderen' */
    id: ArrondissementId
    name: Translated
    /** The judicial area the arrondissement belongs to */
    judicialArea: JudicialAreaId
}

export interface Municipality {
    /** The municipality's Statbel REFNIS (NIS) code, e.g. '44021' for Gent */
    id: MunicipalityId
    name: Bilingual
    /**
     * REFNIS code of the province, or '04000' for the Brussels-Capital Region
     * @pattern ^\d{5}$
     */
    province: string
}

/** A judicial canton: the area of one justice of the peace */
export interface Canton {
    /** Stable id from the local-language name, plus the number if any: 'gent-1', 'merelbeke-melle' */
    id: CantonId
    /** The judicial arrondissement */
    arrondissement: ArrondissementId
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
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    /** The canton's area, verbatim from the annex to the Judicial Code */
    territory: Bilingual
    /** Where in the annex to the Judicial Code the canton is defined */
    legalBasis: string
}

// The data is validated against the JSON Schemas generated from these types (test/schema.test.ts)
export const judicialAreas = judicialAreasData as readonly JudicialArea[]
export const arrondissements = arrondissementsData as readonly Arrondissement[]
export const municipalities = municipalitiesData as readonly Municipality[]
export const cantons = cantonsData as readonly Canton[]

const byId = <T extends { id: string }>(items: readonly T[]) =>
    new Map<string, T>(items.map((item) => [item.id, item]))

const judicialAreasById = byId(judicialAreas)
const arrondissementsById = byId(arrondissements)
const municipalitiesById = byId(municipalities)
const cantonsById = byId(cantons)
const cantonsByMunicipality = new Map<string, Canton[]>()
for (const canton of cantons) {
    for (const { municipality } of canton.municipalities) {
        cantonsByMunicipality.set(municipality, [
            ...(cantonsByMunicipality.get(municipality) ?? []),
            canton,
        ])
    }
}

// Each lookup has two signatures: a known id (a literal, or a value typed with the id union)
// always finds its record; any other string may not.

export function getJudicialArea(id: JudicialAreaId): JudicialArea
export function getJudicialArea(id: string): JudicialArea | undefined
export function getJudicialArea(id: string): JudicialArea | undefined {
    return judicialAreasById.get(id)
}

export function getArrondissement(id: ArrondissementId): Arrondissement
export function getArrondissement(id: string): Arrondissement | undefined
export function getArrondissement(id: string): Arrondissement | undefined {
    return arrondissementsById.get(id)
}

/** A municipality by its REFNIS code */
export function getMunicipality(id: MunicipalityId): Municipality
export function getMunicipality(id: string): Municipality | undefined
export function getMunicipality(id: string): Municipality | undefined {
    return municipalitiesById.get(id)
}

export function getCanton(id: CantonId): Canton
export function getCanton(id: string): Canton | undefined
export function getCanton(id: string): Canton | undefined {
    return cantonsById.get(id)
}

/**
 * The cantons that cover a municipality, by its REFNIS code. One canton for most
 * municipalities; several for cities that are split (Antwerpen, Gent, Brussel, …), in which case
 * the street address decides and each canton's `territory` describes its part.
 */
export function getCantonsForMunicipality(id: string): Canton[] {
    return [...(cantonsByMunicipality.get(id) ?? [])]
}
