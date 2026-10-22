// What the pages read from the package, on the day the site is built
import {
    appliesOn,
    cantons,
    courts,
    formatCourtName,
    getMunicipality,
    municipalities,
    postalCodes,
    toDay,
    type Court,
} from 'belgica'
import type { Entry } from '@/components/Search'
import { locales, type PerLocale } from './labels'

export const buildDay = toDay(new Date())

const current = <T extends { validFrom?: string; validTo?: string }>(records: readonly T[]) =>
    records.filter((r) => appliesOn(r, buildDay))

export const currentCourts = current(courts)
export const currentCantons = current(cantons)
export const currentMunicipalities = current(municipalities)
export const currentPostalCodes = current(postalCodes)

/** The distinct postal codes, sorted */
export const postalCodeList = [...new Set(currentPostalCodes.map((p) => p.postalCode))].sort()

export function courtName(court: Court): PerLocale {
    return Object.fromEntries(locales.map((l) => [l, formatCourtName(court, l)]))
}

/** Dutch and French where they differ: 'Gent / Gand' */
export const bilingual = (name: { nl: string; fr: string }) =>
    name.nl === name.fr ? name.nl : `${name.nl} / ${name.fr}`

/** A canton's name with its number, in Dutch and French: 'Gent 1 / Gand 1' */
export const cantonName = (canton: { name: { nl: string; fr: string }; number?: number }) => {
    const n = canton.number === undefined ? '' : ` ${canton.number}`
    return bilingual({ nl: `${canton.name.nl}${n}`, fr: `${canton.name.fr}${n}` })
}

/** The labels the search box shows next to each result, in the site's language */
export interface SearchLabels {
    postalCode: string
    municipality: string
    canton: string
    cantonName: (name: string) => string
    courtType: (type: Court['type']) => string
}

/** Everything the search box on the home page finds; the names stay as published */
export function searchEntries(labels: SearchLabels): Entry[] {
    const postal: Entry[] = postalCodeList.map((code) => {
        const names = currentPostalCodes
            .filter((p) => p.postalCode === code)
            .map((p) => getMunicipality(p.municipality))
        return {
            label: `${code} ${names.map((m) => m.name.nl).join(', ')}`,
            alt: names.map((m) => m.name.fr).join(' '),
            kind: labels.postalCode,
            href: `/postal-codes/${code}/`,
        }
    })
    const munis: Entry[] = currentMunicipalities.map((m) => ({
        label: bilingual(m.name),
        kind: labels.municipality,
        href: `/municipalities/${m.id}/`,
    }))
    const cantonEntries: Entry[] = currentCantons.map((c) => ({
        label: labels.cantonName(cantonName(c)),
        alt: c.id,
        kind: labels.canton,
        href: `/cantons/${c.id}/`,
    }))
    const courtEntries: Entry[] = currentCourts.map((c) => ({
        label: formatCourtName(c, 'nl'),
        alt: [c.name.fr, c.name.de, formatCourtName(c, 'nl', { style: 'canton' })].join(' '),
        kind: labels.courtType(c.type),
        href: `/courts/${c.id}/`,
    }))
    return [...postal, ...munis, ...cantonEntries, ...courtEntries]
}
