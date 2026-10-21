import type { Contact, ContactType } from './common'

export type { Address, Contact, ContactType, Url } from './common'

/** The value of a record's first contact of a type, optionally with a label */
export function getContact(
    record: { contacts: readonly Contact[] },
    type: ContactType,
    label?: string,
): string | undefined {
    return record.contacts.find(
        (c) => c.type === type && (label === undefined || c.label === label),
    )?.value
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
