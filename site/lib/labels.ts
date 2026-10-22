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

/** Every court type, from the lowest court up; their labels are in messages/ under courtType */
export const courtTypes: readonly CourtType[] = [
    'justice-of-the-peace',
    'police-court',
    'court-of-first-instance',
    'enterprise-court',
    'labour-court',
    'court-of-appeal',
    'labour-court-of-appeal',
    'court-of-assize',
]

/** A day as the site's language writes it: '20 Oct 2026', '20 okt. 2026', '2026年10月20日' */
export function formatDay(day: string, locale: string): string {
    return new Date(`${day}T12:00:00Z`).toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC',
    })
}
