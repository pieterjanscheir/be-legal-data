import courtsData from '../data/courts.json'
import type { Locale, SourceRef, Translated } from './common'
import type { ArrondissementId, CantonId, CourtId } from './ids.generated'

export type { CourtId } from './ids.generated'

export interface Address {
    building?: string
    street: string
    houseNumber?: string
    /** @pattern ^\d{4}$ */
    postalCode: string
    city: string
}

/**
 * What a contact is for, in the courts' own (Dutch) terms: the registry ('griffie'), a specific
 * roll of the enterprise court ('A-rol', 'B-rol') or its register of legal entities
 * ('rechtspersonenregister'). No label: the court's general contact.
 */
export type ContactLabel = 'griffie' | 'A-rol' | 'B-rol' | 'rechtspersonenregister'

export type Contact =
    | {
          type: 'phone'
          /**
           * E.164, e.g. '+3292343210'; `formatPhoneNumber` gives the Belgian national form
           * @pattern ^\+32\d{8,9}$
           */
          value: string
          label?: ContactLabel
      }
    | {
          type: 'email'
          /**
           * Lowercase
           * @format email
           */
          value: string
          label?: ContactLabel
      }

interface CourtBase {
    /**
     * Stable id: the court `type` followed by its place, e.g. 'justice-of-the-peace-gent-1' or
     * 'enterprise-court-gent-brugge'
     */
    id: CourtId
    /** The judicial arrondissement the court lies in */
    arrondissement: ArrondissementId
    /** Place name of the court (or division) */
    name: Translated
    address: Address
    contacts: Contact[]
    /**
     * IBAN in electronic format (no spaces), checksum verified; `formatIban` groups it by four
     * @pattern ^BE\d{14}$
     */
    bankAccount?: string
    /**
     * When the registry is open, in OpenStreetMap `opening_hours` syntax, e.g.
     * 'Mo-Fr 08:30-12:30,13:30-16:00'
     */
    openingHours?: string
    /**
     * The court's own web page
     * @format uri
     */
    website?: string
    /** Where the record's data comes from */
    sources?: SourceRef[]
}

export interface JusticeOfThePeace extends CourtBase {
    type: 'justice-of-the-peace'
    /** The canton the justice of the peace serves */
    canton: CantonId
    /**
     * The canton's number in places with several cantons (Gent 1–5, …). Part of the court's
     * official name, so kept here; always equal to the canton's `number`.
     */
    number?: number
}

export interface EnterpriseCourtDivision extends CourtBase {
    type: 'enterprise-court'
    /** Place name of the court's seat; `name` is the division */
    seat: Translated
}

export type Court = JusticeOfThePeace | EnterpriseCourtDivision
export type CourtType = Court['type']

// The data is validated against the JSON Schema generated from these types (test/schema.test.ts)
export const courts = courtsData as readonly Court[]

const courtsById = new Map<string, Court>(courts.map((c) => [c.id, c]))
const justicesOfThePeaceByCanton = new Map<string, JusticeOfThePeace>()
for (const court of courts) {
    if (court.type === 'justice-of-the-peace') justicesOfThePeaceByCanton.set(court.canton, court)
}

export function getCourt(id: CourtId): Court
export function getCourt(id: string): Court | undefined
export function getCourt(id: string): Court | undefined {
    return courtsById.get(id)
}

/**
 * The justice of the peace of a canton, by canton id ('gent-1', 'merelbeke-melle'). `undefined`
 * when the canton's court isn't in the data yet; see the known gaps.
 */
export function getJusticeOfThePeace(cantonId: string): JusticeOfThePeace | undefined {
    return justicesOfThePeaceByCanton.get(cantonId)
}

export function findCourts(filter: { type?: CourtType; arrondissement?: string }): Court[] {
    return courts.filter(
        (c) =>
            (!filter.type || c.type === filter.type) &&
            (!filter.arrondissement || c.arrondissement === filter.arrondissement),
    )
}

export function getContact(
    court: Court,
    type: Contact['type'],
    label?: ContactLabel,
): string | undefined {
    return court.contacts.find((c) => c.type === type && (label === undefined || c.label === label))
        ?.value
}

const courtNameParts = {
    nl: {
        peace: 'Vredegerecht',
        canton: 'kanton',
        enterprise: 'Ondernemingsrechtbank',
        division: 'afdeling',
        of: '',
    },
    fr: {
        peace: 'Tribunal de paix',
        canton: 'canton',
        enterprise: "Tribunal de l'entreprise",
        division: 'division',
        of: 'de ',
    },
    de: {
        peace: 'Friedensgericht',
        canton: 'Kanton',
        enterprise: 'Unternehmensgericht',
        division: 'Abteilung',
        of: '',
    },
} as const

/**
 * Full official-style name, e.g. 'Vredegerecht 1e kanton Gent' or
 * 'Ondernemingsrechtbank Gent - afdeling Brugge'.
 */
export function formatCourtName(court: Court, locale: Locale = 'nl'): string {
    const t = courtNameParts[locale]
    if (court.type === 'enterprise-court') {
        return `${t.enterprise} ${t.of}${court.seat[locale]} - ${t.division} ${court.name[locale]}`
    }
    return court.number ?
            `${t.peace} ${court.number}e ${t.canton} ${court.name[locale]}`
        :   `${t.peace} ${t.canton} ${court.name[locale]}`
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
