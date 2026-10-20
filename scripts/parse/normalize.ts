/**
 * Canonical forms for the values the sources publish in many shapes. Each function returns
 * `undefined` for a value it can't read with certainty, so the parsers leave it out rather
 * than guess.
 */

/** Text with whitespace collapsed, soft hyphens removed and typographic quotes made plain */
export function clean(text: string): string {
    return text.replace(/­/g, '').replace(/[‘’]/g, "'").replace(/\s+/g, ' ').trim()
}

/**
 * A Belgian phone number in E.164 form: '02/682.07.86.', '+32 2 682 05 44' and
 * '0032 9 234 65 00' all give '+3226820786'-style values
 */
export function toE164(text: string): string | undefined {
    let digits = text.replace(/[^\d+]/g, '')
    if (digits.startsWith('+32')) digits = digits.slice(3)
    else if (digits.startsWith('0032')) digits = digits.slice(4)
    else if (digits.startsWith('0')) digits = digits.slice(1)
    else return undefined
    if (digits.includes('+')) return undefined
    // Mobiles (045x to 049x) have 9 digits after the country code, landlines 8: 04 is also
    // the Liège area code
    const ok = /^4[5-9]/.test(digits) ? digits.length === 9 : digits.length === 8
    return ok ? `+32${digits}` : undefined
}

/** A Belgian IBAN in electronic form, only when its mod-97 checksum is right */
export function toIban(text: string): string | undefined {
    const iban = text.replace(/\s+/g, '').toUpperCase()
    if (!/^BE\d{14}$/.test(iban)) return undefined
    const rearranged = iban.slice(4) + '1114' + iban.slice(2, 4) // B = 11, E = 14
    let remainder = 0
    for (const digit of rearranged) remainder = (remainder * 10 + Number(digit)) % 97
    return remainder === 1 ? iban : undefined
}

export function toEmail(text: string): string | undefined {
    const email = text
        .trim()
        .replace(/^mailto:/i, '')
        .toLowerCase()
    return /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email) ? email : undefined
}

export interface Address {
    building?: string
    street: string
    postalCode: string
    city: string
}

/**
 * An address from its published lines, e.g. ['Bolivarplaats 20 b19', '2000', 'Antwerpen'] or
 * ['Gerechtsgebouw', 'Kazernevest 3', '8000 Brugge']. The street line stays as published, with
 * its number, box or floor: the sources write them too many ways ('Canadaplein ZN', 'Rue de
 * Bruxelles 2 - 3', '7B (eerste verdieping)') to split them without guessing.
 */
export function toAddress(lines: string[]): Address | undefined {
    const parts = lines.map(clean).filter(Boolean)
    let postalCode: string | undefined
    let city: string | undefined
    const last = parts.at(-1) ?? ''
    const joined = /^(\d{4})\s+(.+)$/.exec(last)
    if (joined) {
        postalCode = joined[1]
        city = joined[2]
        parts.pop()
    } else if (parts.length >= 2 && /^\d{4}$/.test(parts.at(-2) ?? '')) {
        postalCode = parts.at(-2)
        city = last
        parts.splice(-2)
    }
    if (!postalCode || !city || /\d/.test(city)) return undefined
    // The postal code and city repeated at the end of the street line
    const street = parts.pop()?.replace(new RegExp(`,?\\s*${postalCode}\\s+\\S.*$`), '')
    // A sentence where the street should be: "Our addresses are listed under …"
    if (!street || street.length > 60 || /["“”]/.test(street)) return undefined
    const building = parts.join(', ')
    return { ...(building ? { building } : {}), street, postalCode, city }
}
