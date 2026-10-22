import type { CourtType, Locale } from 'belgica'

export const locales: readonly Locale[] = ['nl', 'fr', 'de']

/** A value per language, falling back the way formatCourtName does */
export type PerLocale = Partial<Record<Locale, string>>

const fallback: Record<Locale, readonly Locale[]> = {
    nl: ['nl', 'fr', 'de'],
    fr: ['fr', 'nl', 'de'],
    de: ['de', 'fr', 'nl'],
}

export function pick(value: PerLocale, locale: Locale): string {
    for (const l of fallback[locale]) {
        const v = value[l]
        if (v !== undefined) return v
    }
    return ''
}

/** The site's labels for each court type, in English */
export const courtTypeLabel: Record<CourtType, string> = {
    'justice-of-the-peace': 'Justice of the peace',
    'police-court': 'Police court',
    'court-of-first-instance': 'Court of first instance',
    'enterprise-court': 'Enterprise court',
    'labour-court': 'Labour court',
    'court-of-appeal': 'Court of appeal',
    'labour-court-of-appeal': 'Labour court of appeal',
    'court-of-assize': 'Court of assize',
}

export const courtTypes = Object.keys(courtTypeLabel) as CourtType[]

export const kindLabel = { court: 'Court', division: 'Division', seat: 'Seat' } as const

export function formatDay(day: string): string {
    return new Date(`${day}T12:00:00Z`).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    })
}
