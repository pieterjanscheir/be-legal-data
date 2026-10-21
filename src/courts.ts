import courtsData from '../data/courts.json'
import type { Address, Contact, Locale, SourceRef, Translated, Url } from './common'
import type { ArrondissementId, CantonId, CourtId, JudicialAreaId } from './ids.generated'
import {
    applyingOn,
    pickVersion,
    versionsBy,
    versionsById,
    type Coverage,
    type OnDay,
    type Validity,
} from './time'

export type { CourtId } from './ids.generated'
export type { Coverage, OnDay, Validity } from './time'
export * from './contacts'

export type CourtType =
    | 'justice-of-the-peace'
    | 'police-court'
    | 'court-of-first-instance'
    | 'enterprise-court'
    | 'labour-court'
    | 'court-of-appeal'
    | 'labour-court-of-appeal'
    | 'court-of-assize'

/**
 * A court, a division of one (afdeling, division, Abteilung), or one of the seats of a justice
 * of the peace that sits in several places.
 */
export interface Court extends Validity {
    /**
     * Stable id: the type, then the place in the court's own language (Dutch for Brussels, with
     * `-nl` or `-fr` for the courts split by language); a division or seat adds its place.
     * 'justice-of-the-peace-gent-1', 'enterprise-court-gent-brugge', 'police-court-brussel-fr'
     */
    id: CourtId
    type: CourtType
    kind: 'court' | 'division' | 'seat'
    /** For a division or seat: the court it belongs to */
    court?: CourtId
    /**
     * The court's name as it publishes it, in each language it publishes in: 'Vredegerecht
     * Gent 1', 'Tribunal de l'entreprise du Hainaut - division Mons'
     */
    name: Partial<Translated>
    judicialArea: JudicialAreaId
    /** The arrondissement, for a court whose area is one arrondissement or lies within one */
    arrondissement?: ArrondissementId
    /** For a justice of the peace: the canton it serves */
    canton?: CantonId
    /**
     * For a court other than a justice of the peace: the cantons it covers, as the annex to the
     * Judicial Code (art. 3–5) and art. 114 of the Code set them. A justice of the peace covers
     * its `canton`; a division or seat has neither: see `court`.
     */
    cantons?: CantonId[]
    /**
     * The court's codes in European Case Law Identifiers (ECLI:BE:<code>:…), one per language
     * it judges in; only codes seen in published decisions
     */
    ecli?: string[]
    /** Where the registry is; missing when the court publishes no single address */
    address?: Address
    contacts: Contact[]
    /**
     * When the registry is open, in OpenStreetMap `opening_hours` syntax: 'Mo-Fr
     * 08:30-12:30,13:30-16:00'. Only when the published text reads to it without doubt.
     */
    openingHours?: string
    /** The opening hours as the court publishes them, per language */
    openingHoursText?: Partial<Translated>
    /** The court's page, per language */
    website: Partial<Record<Locale, Url>>
    /** The pages the record was read from */
    sources: SourceRef[]
}

/**
 * The courts data describes the situation from this day on, like the territory: which courts
 * exist follows from the Judicial Code as amended for 1 January 2025. Addresses and contacts
 * are as the portal showed them on `sources[].retrieved`; a record the portal stops listing
 * keeps its id and gets a `validTo`, and one it starts listing gets a `validFrom`. Lookups for
 * an earlier day throw a `RangeError`.
 */
export const courtsCoverage: Coverage = { from: '2025-01-01' }

// The data is validated against the JSON Schema generated from these types (test/schema.test.ts)
/** Every record, every version: see `getCourt` and `findCourts` for the ones that apply on a day */
export const courts = courtsData as readonly Court[]

const courtsById = versionsById(courts)
const justicesOfThePeaceByCanton = versionsBy(courts, (court) =>
    court.type === 'justice-of-the-peace' && court.kind === 'court' ? court.canton : undefined,
)
const divisionsByCourt = new Map<string, Court[]>()
const courtsByCanton = new Map<string, Court[]>()
const add = (map: Map<string, Court[]>, key: string, court: Court) => {
    map.set(key, [...(map.get(key) ?? []), court])
}
for (const court of courts) {
    if (court.court) add(divisionsByCourt, court.court, court)
    if (court.kind === 'court') {
        for (const canton of court.cantons ?? []) add(courtsByCanton, canton, court)
        if (court.canton !== undefined) add(courtsByCanton, court.canton, court)
    }
}

const pick = <T extends Validity>(list: T[] | undefined, options: OnDay | undefined) =>
    pickVersion(list, options, courtsCoverage, 'courts')
const applying = (list: readonly Court[], options: OnDay) =>
    applyingOn(list, options, courtsCoverage, 'courts')

// Each lookup by id has two signatures: a known id (a literal, or a value typed with the id
// union) always finds the record as it is today; any other string, or a lookup on a given
// day, may not. A day before the data's coverage throws a RangeError.

/** A court, division or seat by id, e.g. 'justice-of-the-peace-gent-1' */
export function getCourt(id: CourtId): Court
export function getCourt(id: string, options?: OnDay): Court | undefined
export function getCourt(id: string, options?: OnDay): Court | undefined {
    return pick(courtsById.get(id), options)
}

/**
 * The justice of the peace of a canton, by canton id ('gent-1', 'merelbeke-melle'). One that
 * sits in several places (Philippeville) has no address of its own: its seats do, see
 * `getDivisions`.
 */
export function getJusticeOfThePeace(cantonId: CantonId): Court
export function getJusticeOfThePeace(cantonId: string, options?: OnDay): Court | undefined
export function getJusticeOfThePeace(cantonId: string, options?: OnDay): Court | undefined {
    return pick(justicesOfThePeaceByCanton.get(cantonId), options)
}

/**
 * A court's divisions, or a justice of the peace's seats, on a day (today by default); empty
 * for a court without
 */
export function getDivisions(courtId: string, options: OnDay = {}): Court[] {
    return applying(divisionsByCourt.get(courtId) ?? [], options)
}

/**
 * The courts whose area holds a canton on a day (today by default), by canton id: its justice
 * of the peace and, of each other type, the court (not its divisions) that covers it; in
 * Brussels, both language courts of a type. Empty for an unknown canton.
 */
export function getCourtsForCanton(cantonId: string, options: OnDay = {}): Court[] {
    return applying(courtsByCanton.get(cantonId) ?? [], options)
}

export interface CourtFilter {
    type?: CourtType
    kind?: Court['kind']
    arrondissement?: string
    judicialArea?: string
}

/**
 * The courts that match every given filter and apply on a day (today by default); an empty
 * filter gives every court
 */
export function findCourts(filter: CourtFilter, options: OnDay = {}): Court[] {
    return applying(courts, options).filter(
        (c) =>
            (!filter.type || c.type === filter.type) &&
            (!filter.kind || c.kind === filter.kind) &&
            (!filter.arrondissement || c.arrondissement === filter.arrondissement) &&
            (!filter.judicialArea || c.judicialArea === filter.judicialArea),
    )
}
