import courtsData from '../data/courts.json'
import type { Locale, Translated } from './territory'

export interface Address {
    building?: string
    street: string
    houseNumber?: string
    postalCode: string
    city: string
}

export interface Contact {
    type: 'phone' | 'email'
    value: string
    /** What the contact is for, e.g. 'griffie' or 'B-rol' */
    label?: string
}

interface CourtBase {
    /** Stable key, e.g. 'VredegerechtGent1' or 'OndernemingsrechtbankGentBrugge' */
    id: string
    /** Id of the judicial arrondissement the court lies in */
    arrondissement: string
    /** Place name of the court (or division) */
    name: Translated
    address: Address
    contacts: Contact[]
    bankAccount?: string
    openingHours?: string
}

export interface JusticeOfThePeace extends CourtBase {
    type: 'justice-of-the-peace'
    /** Canton number for places with several cantons (Gent 1–5, …) */
    canton?: number
}

export interface EnterpriseCourtDivision extends CourtBase {
    type: 'enterprise-court'
    /** Place name of the court's seat; `name` is the division */
    seat: Translated
}

export type Court = JusticeOfThePeace | EnterpriseCourtDivision
export type CourtType = Court['type']

export const courts = courtsData as Court[]

export function getCourt(id: string): Court | undefined {
    return courts.find((c) => c.id === id)
}

export function findCourts(filter: {
    type?: CourtType
    arrondissement?: string
}): Court[] {
    return courts.filter(
        (c) =>
            (!filter.type || c.type === filter.type) &&
            (!filter.arrondissement || c.arrondissement === filter.arrondissement),
    )
}

export function getContact(
    court: Court,
    type: Contact['type'],
    label?: string,
): string | undefined {
    return court.contacts.find(
        (c) => c.type === type && (label === undefined || c.label === label),
    )?.value
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
    return court.canton ?
            `${t.peace} ${court.canton}e ${t.canton} ${court.name[locale]}`
        :   `${t.peace} ${t.canton} ${court.name[locale]}`
}
