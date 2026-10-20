import courtsData from '../data/courts.json'
import type { Address, Contact, Locale, SourceRef, Translated, Url } from './common'
import type { ArrondissementId, CantonId, CourtId, JudicialAreaId } from './ids.generated'

export type { CourtId } from './ids.generated'
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
export interface Court {
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

// The data is validated against the JSON Schema generated from these types (test/schema.test.ts)
export const courts = courtsData as readonly Court[]

const courtsById = new Map<string, Court>(courts.map((c) => [c.id, c]))
const justicesOfThePeaceByCanton = new Map<string, Court>()
const divisionsByCourt = new Map<string, Court[]>()
for (const court of courts) {
    if (court.type === 'justice-of-the-peace' && court.kind === 'court' && court.canton)
        justicesOfThePeaceByCanton.set(court.canton, court)
    if (court.court)
        divisionsByCourt.set(court.court, [...(divisionsByCourt.get(court.court) ?? []), court])
}

/** A court, division or seat by id, e.g. 'justice-of-the-peace-gent-1' */
export function getCourt(id: CourtId): Court
export function getCourt(id: string): Court | undefined
export function getCourt(id: string): Court | undefined {
    return courtsById.get(id)
}

/** The justice of the peace of a canton, by canton id ('gent-1', 'merelbeke-melle') */
export function getJusticeOfThePeace(cantonId: CantonId): Court
export function getJusticeOfThePeace(cantonId: string): Court | undefined
export function getJusticeOfThePeace(cantonId: string): Court | undefined {
    return justicesOfThePeaceByCanton.get(cantonId)
}

/** A court's divisions, or a justice of the peace's seats; empty for a court without */
export function getDivisions(courtId: string): Court[] {
    return [...(divisionsByCourt.get(courtId) ?? [])]
}

export interface CourtFilter {
    type?: CourtType
    kind?: Court['kind']
    arrondissement?: string
    judicialArea?: string
}

/** The courts that match every given filter; an empty filter gives every court */
export function findCourts(filter: CourtFilter): Court[] {
    return courts.filter(
        (c) =>
            (!filter.type || c.type === filter.type) &&
            (!filter.kind || c.kind === filter.kind) &&
            (!filter.arrondissement || c.arrondissement === filter.arrondissement) &&
            (!filter.judicialArea || c.judicialArea === filter.judicialArea),
    )
}
