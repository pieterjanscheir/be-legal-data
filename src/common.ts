export type Locale = 'nl' | 'fr' | 'de'

/** A name in the three national languages */
export type Translated = Record<Locale, string>

/** A name as the Judicial Code gives it, in Dutch and French */
export type Bilingual = Record<'nl' | 'fr', string>

/** Where a record's data was taken from */
export interface SourceRef {
    /**
     * The exact official page or file the data comes from
     * @format uri
     */
    url: string
    /**
     * Day the source was last checked, YYYY-MM-DD
     * @format date
     */
    retrieved: string
}

import type { MunicipalityId } from './ids.generated'

/** A postal address, as published */
export interface Address {
    /** A building's name, when one is published: 'Gerechtsgebouw' */
    building?: string
    /**
     * The street line as published, with its number, box or floor: 'Kazernevest 3',
     * 'Beverstraat 7B (eerste verdieping)'
     */
    street: string
    /** @pattern ^\d{4}$ */
    postalCode: string
    city: string
    /**
     * The municipality the postal code belongs to, by REFNIS code (data/postal-codes.json).
     * Missing when the code is shared by two municipalities and the city line doesn't name
     * one of them.
     */
    municipality?: MunicipalityId
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
     * The registry or service the contact belongs to, as the source titles it, in that page's
     * language: 'Burgerlijke griffie', 'Greffe pénal'. No label: the general contact.
     */
    label?: string
    /** Text published with the value: 'griffie', 'druk 1', 'tapez 2' */
    note?: string
}
