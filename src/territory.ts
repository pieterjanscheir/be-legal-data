import arrondissementsData from '../data/arrondissements.json'
import cantonsData from '../data/cantons.json'
import judicialAreasData from '../data/judicial-areas.json'
import municipalitiesData from '../data/municipalities.json'

export type Locale = 'nl' | 'fr' | 'de'

/** A name in the three national languages */
export type Translated = Record<Locale, string>

/** A name as the Judicial Code gives it, in Dutch and French */
export type Bilingual = Record<'nl' | 'fr', string>

/** Area of a court of appeal (rechtsgebied): Antwerpen, Brussel, Gent, Luik or Bergen */
export interface JudicialArea {
    /** Stable key, e.g. 'Ghent' */
    id: string
    name: Translated
}

export interface Arrondissement {
    /** Stable key, e.g. 'EastFlanders' */
    id: string
    name: Translated
    /** Id of the judicial area the arrondissement belongs to */
    judicialArea: string
}

export interface Municipality {
    /** Statbel REFNIS (NIS) code, e.g. '44021' for Gent */
    refnis: string
    name: Bilingual
    /** REFNIS code of the province, or '04000' for the Brussels-Capital Region */
    province: string
}

/** A judicial canton: the area of one justice of the peace */
export interface Canton {
    /**
     * Stable key, e.g. 'Gent1' or 'MerelbekeMelle'. The justice of the peace of a canton has
     * the id 'Vredegerecht' + canton id.
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

export const judicialAreas = judicialAreasData as JudicialArea[]
export const arrondissements = arrondissementsData as Arrondissement[]
export const municipalities = municipalitiesData as Municipality[]
export const cantons = cantonsData as Canton[]

export function getJudicialArea(id: string): JudicialArea | undefined {
    return judicialAreas.find((a) => a.id === id)
}

export function getArrondissement(id: string): Arrondissement | undefined {
    return arrondissements.find((a) => a.id === id)
}

export function getMunicipality(refnis: string): Municipality | undefined {
    return municipalities.find((m) => m.refnis === refnis)
}

export function getCanton(id: string): Canton | undefined {
    return cantons.find((c) => c.id === id)
}

/**
 * The cantons that cover a municipality. One canton for most municipalities; several for
 * cities that are split (Antwerpen, Gent, Brussel, …), in which case the street address decides
 * and each canton's `territory` describes its part.
 */
export function getCantonsForMunicipality(refnis: string): Canton[] {
    return cantons.filter((c) => c.municipalities.some((m) => m.refnis === refnis))
}
