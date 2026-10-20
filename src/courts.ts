import courtsData from '../data/courts.json'
import type { Locale, SourceRef, Translated } from './common'
import type { ArrondissementId, CantonId, CourtId, JudicialAreaId } from './ids.generated'

export type { CourtId } from './ids.generated'

export interface Address {
    /** A building's name, when the court publishes one: 'Gerechtsgebouw' */
    building?: string
    /**
     * The street line as the court publishes it, with its number, box or floor: 'Kazernevest 3',
     * 'Beverstraat 7B (eerste verdieping)'
     */
    street: string
    /** @pattern ^\d{4}$ */
    postalCode: string
    city: string
}

/** @format uri */
export type Url = string

export type ContactType = 'phone' | 'fax' | 'email' | 'bank-account'

export interface Contact {
    type: ContactType
    /**
     * Phone and fax: E.164 ('+3292343210'; `formatPhoneNumber` gives the national form).
     * Email: lowercase. Bank account: IBAN in electronic form, checksum verified (`formatIban`
     * groups it by four).
     * @pattern ^(\+32\d{8,9}|[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}|BE\d{14})$
     */
    value: string
    /**
     * The registry or service the contact belongs to, as the court titles it on its page and in
     * that page's language: 'Burgerlijke griffie', 'Greffe pénal'. No label: the court's
     * general contact.
     */
    label?: string
    /** Text the court publishes with the value: 'griffie', 'druk 1', 'tapez 2' */
    note?: string
}

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

/** The value of a court's first contact of a type, optionally with a label */
export function getContact(court: Court, type: ContactType, label?: string): string | undefined {
    return court.contacts.find((c) => c.type === type && (label === undefined || c.label === label))
        ?.value
}

/**
 * A Belgian phone number in its national written form: '+3292343210' → '09 234 32 10',
 * '+3253820701' → '053 82 07 01', '+32470123456' → '0470 12 34 56'. Zones 2, 3, 4 and 9 have a
 * one-digit area code; other landlines two digits; mobile numbers start with 4 and are one
 * digit longer.
 */
export function formatPhoneNumber(e164: string): string {
    const m = /^\+32(\d{8,9})$/.exec(e164)
    if (!m) throw new RangeError(`Expected a Belgian number in E.164 form, got '${e164}'`)
    const n = `0${m[1]}`
    if (n.length === 10) return `${n.slice(0, 4)} ${n.slice(4, 6)} ${n.slice(6, 8)} ${n.slice(8)}`
    if ('2349'.includes(n.charAt(1)))
        return `${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5, 7)} ${n.slice(7)}`
    return `${n.slice(0, 3)} ${n.slice(3, 5)} ${n.slice(5, 7)} ${n.slice(7)}`
}

/** An IBAN in groups of four, as printed: 'BE73679200844560' → 'BE73 6792 0084 4560' */
export function formatIban(iban: string): string {
    return iban.replace(/(.{4})(?=.)/g, '$1 ')
}
