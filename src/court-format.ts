// belgica/courts/format: helpers for a court you already hold, from a list file, a loader or
// your own storage. Imports no data, so it stays small in a browser bundle: the canton label is
// stored on the record (`label`).
import type { Locale } from './schemas/common'
import type { Court } from './schemas/courts'

export * from './contacts'
export type { Locale } from './common'
export type { Court, CourtDetails, CourtSummary, CourtType } from './schemas/courts'

export interface FormatCourtNameOptions {
    /**
     * 'official' (default): the court's name as it publishes it, from `name`. 'canton': for a
     * justice of the peace, a label built from its canton, 'Vredegerecht 1e kanton Gent'. That
     * label is not the court's official name.
     */
    style?: 'official' | 'canton'
}

/** The fields of a court that `formatCourtName` reads: a full record or a summary */
export type NamedCourt = Pick<Court, 'id' | 'type' | 'kind' | 'name' | 'label'>

// The language to fall back to when a court doesn't publish in the one asked for. A court
// publishes in one language, except in Brussels (Dutch and French) and the German-speaking
// area (German and French), so this is the court's own language in all but those.
const fallbackOrder: Record<Locale, readonly Locale[]> = {
    nl: ['nl', 'fr', 'de'],
    fr: ['fr', 'nl', 'de'],
    de: ['de', 'fr', 'nl'],
}

/**
 * A court's name in a language.
 *
 * With `style: 'official'` (the default), the name as the court publishes it. A court that
 * doesn't publish in `locale` gives its name in another language: for Dutch, French then
 * German; for French, Dutch then German; for German, French then Dutch.
 *
 * With `style: 'canton'`, a justice of the peace gets its `label`, built from its canton's
 * number and name: 'Vredegerecht 1e kanton Gent', 'Justice de paix 1er canton Gand',
 * 'Friedensgericht 1. Kanton Gent', and without a number 'Vredegerecht kanton Deinze'. It is a
 * label for display, not the court's official name. The canton name is in `locale`. Only the
 * cantons of Eupen-Sankt Vith have a German name; for the others, German uses the canton's name
 * in the court's own language (French in Brussels). Any other court, and a seat of a justice of
 * the peace, gets its official name.
 *
 * This version reads the label stored on the record and loads no data. The one in
 * `belgica/courts` also builds the label of a record that has none (saved before 0.5.0).
 */
export function formatCourtName(
    court: NamedCourt,
    locale: Locale,
    options: FormatCourtNameOptions = {},
): string {
    if (options.style === 'canton' && court.label) return court.label[locale]
    for (const language of fallbackOrder[locale]) {
        const name = court.name[language]
        if (name !== undefined) return name
    }
    throw new Error(`Court '${court.id}' has no name`)
}
