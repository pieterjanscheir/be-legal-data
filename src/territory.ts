import arrondissementsData from '../data/arrondissements.json'
import cantonsData from '../data/cantons.json'
import judicialAreasData from '../data/judicial-areas.json'
import municipalitiesData from '../data/municipalities.json'
import type { Bilingual, Translated } from './common'
import type { ArrondissementId, CantonId, JudicialAreaId, MunicipalityId } from './ids.generated'
import { appliesOn, lookupDay, type OnDay, type Validity } from './time'

export type { Bilingual, Locale, SourceRef, Translated } from './common'
export type { ArrondissementId, CantonId, JudicialAreaId, MunicipalityId } from './ids.generated'
export type { OnDay, Validity } from './time'

/**
 * The territory data describes the situation from this day on: the annex to the Judicial Code
 * as amended for the municipal mergers of 1 January 2025, and Statbel's municipalities of that
 * day. Lookups for an earlier day throw a `RangeError` rather than answer with today's map.
 */
export const territoryCoverage = { from: '2025-01-01' } as const

/** Area of a court of appeal (rechtsgebied): Antwerpen, Brussel, Gent, Luik or Bergen */
export interface JudicialArea extends Validity {
    /** Stable id from the local-language name, e.g. 'gent' */
    id: JudicialAreaId
    name: Translated
}

export interface Arrondissement extends Validity {
    /** Stable id from the local-language name, e.g. 'oost-vlaanderen' */
    id: ArrondissementId
    name: Translated
    /** The judicial area the arrondissement belongs to */
    judicialArea: JudicialAreaId
}

export interface Municipality extends Validity {
    /** The municipality's Statbel REFNIS (NIS) code, e.g. '44021' for Gent */
    id: MunicipalityId
    name: Bilingual
    /**
     * REFNIS code of the province, or '04000' for the Brussels-Capital Region
     * @pattern ^\d{5}$
     */
    province: string
}

/** A provision of Belgian law */
export interface LegalBasis {
    /**
     * The law's ELI on the Belgian Official Journal's site (ejustice)
     * @format uri
     */
    url: string
    /** The provision within it, as the law numbers it: 'Bijvoegsel art. 1, afdeling 1.1' */
    provision: string
}

/** A judicial canton: the area of one justice of the peace */
export interface Canton extends Validity {
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
    /** Where the law defines the canton */
    legalBasis: LegalBasis
}

// The data is validated against the JSON Schemas generated from these types (test/schema.test.ts)
export const judicialAreas = judicialAreasData as readonly JudicialArea[]
export const arrondissements = arrondissementsData as readonly Arrondissement[]
export const municipalities = municipalitiesData as readonly Municipality[]
export const cantons = cantonsData as readonly Canton[]

/** Every version of each record, oldest first */
const versionsById = <T extends { id: string } & Validity>(items: readonly T[]) => {
    const map = new Map<string, T[]>()
    for (const item of items) map.set(item.id, [...(map.get(item.id) ?? []), item])
    for (const list of map.values())
        list.sort((a, b) => (a.validFrom ?? '').localeCompare(b.validFrom ?? ''))
    return map
}

/** The latest version, or with `on` the version that applies on that day */
function pick<T extends Validity>(
    list: T[] | undefined,
    options: OnDay | undefined,
): T | undefined {
    if (options?.on === undefined) return list?.at(-1)
    const day = lookupDay(options, territoryCoverage.from, 'territory')
    return list?.find((record) => appliesOn(record, day))
}

const judicialAreasById = versionsById(judicialAreas)
const arrondissementsById = versionsById(arrondissements)
const municipalitiesById = versionsById(municipalities)
const cantonsById = versionsById(cantons)
const cantonsByMunicipality = new Map<string, Canton[]>()
for (const canton of cantons) {
    for (const { municipality } of canton.municipalities) {
        cantonsByMunicipality.set(municipality, [
            ...(cantonsByMunicipality.get(municipality) ?? []),
            canton,
        ])
    }
}

// Each lookup by id has two signatures: a known id (a literal, or a value typed with the id
// union) always finds the record's latest version; any other string, or a lookup on a given
// day, may not. A day before the data's coverage throws a RangeError.

/** A judicial area by id, e.g. 'gent' */
export function getJudicialArea(id: JudicialAreaId): JudicialArea
export function getJudicialArea(id: string, options?: OnDay): JudicialArea | undefined
export function getJudicialArea(id: string, options?: OnDay): JudicialArea | undefined {
    return pick(judicialAreasById.get(id), options)
}

/** A judicial arrondissement by id, e.g. 'oost-vlaanderen' */
export function getArrondissement(id: ArrondissementId): Arrondissement
export function getArrondissement(id: string, options?: OnDay): Arrondissement | undefined
export function getArrondissement(id: string, options?: OnDay): Arrondissement | undefined {
    return pick(arrondissementsById.get(id), options)
}

/** A municipality by its REFNIS code, e.g. '44021' for Gent */
export function getMunicipality(id: MunicipalityId): Municipality
export function getMunicipality(id: string, options?: OnDay): Municipality | undefined
export function getMunicipality(id: string, options?: OnDay): Municipality | undefined {
    return pick(municipalitiesById.get(id), options)
}

/** A judicial canton by id, e.g. 'gent-1' */
export function getCanton(id: CantonId): Canton
export function getCanton(id: string, options?: OnDay): Canton | undefined
export function getCanton(id: string, options?: OnDay): Canton | undefined {
    return pick(cantonsById.get(id), options)
}

/**
 * The cantons that cover a municipality on a day (today by default), by REFNIS code. One canton
 * for most municipalities; several for cities that are split (Antwerpen, Gent, Brussel, …), in
 * which case the street address decides and each canton's `territory` describes its part.
 */
export function getCantonsForMunicipality(id: string, options: OnDay = {}): Canton[] {
    const day = lookupDay(options, territoryCoverage.from, 'territory')
    return (cantonsByMunicipality.get(id) ?? []).filter((canton) => appliesOn(canton, day))
}

/**
 * The judicial arrondissement a municipality lies in on a day (today by default), by REFNIS
 * code. Every municipality lies in exactly one, even a city split over several cantons.
 */
export function getArrondissementForMunicipality(
    id: string,
    options: OnDay = {},
): Arrondissement | undefined {
    const canton = getCantonsForMunicipality(id, options)[0]
    return canton && getArrondissement(canton.arrondissement, options)
}
