import courtsData from '../data/courts.json'
import { cantonNames } from './canton-names.generated'
import type { Locale } from './common'
import type { CantonId, CourtId } from './ids.generated'
import type { Court, CourtType } from './schemas/courts'
import {
    applyingOn,
    currentVersion,
    pickVersion,
    toDay,
    versionsBy,
    versionsById,
    type Coverage,
    type OnDay,
    type Validity,
} from './time'

export type { CourtId } from './ids.generated'
export type { Coverage, OnDay, Validity } from './time'
export * from './contacts'
export type { Court, CourtType } from './schemas/courts'

/**
 * The courts data describes the situation from this day on, like the territory: which courts
 * exist follows from the Judicial Code as amended for 1 January 2025. Addresses and contacts
 * are as the portal showed them on `sources[].retrieved`; a record the portal stops listing
 * keeps its id and gets a `validTo`, and one it starts listing gets a `validFrom`. Lookups for
 * an earlier day throw a `RangeError`.
 */
export const courtsCoverage: Coverage = { from: '2025-01-01' }

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts)
/** Every record, every version: see `getCourt` and `findCourts` for the ones that apply on a day */
export const courts = courtsData as readonly Court[]

const courtsById = versionsById(courts)
const justicesOfThePeaceByCanton = versionsBy(courts, (court) =>
    court.type === 'justice-of-the-peace' && court.kind === 'court' ? court.canton : undefined,
)
const divisionsByCourt = new Map<string, Court[]>()
const courtsByCanton = new Map<string, Court[]>()
const add = (map: Map<string, Court[]>, key: string, court: Court) => {
    map.set(key, [...(map.get(key) ?? []), court])
}
for (const court of courts) {
    if (court.court) add(divisionsByCourt, court.court, court)
    if (court.kind === 'court') {
        for (const canton of court.cantons ?? []) add(courtsByCanton, canton, court)
        if (court.canton !== undefined) add(courtsByCanton, court.canton, court)
    }
}

const pick = <T extends Validity>(list: T[] | undefined, options: OnDay | undefined) =>
    pickVersion(list, options, courtsCoverage, 'courts')
const applying = (list: readonly Court[], options: OnDay) =>
    applyingOn(list, options, courtsCoverage, 'courts')

// Each lookup by id has two signatures: a known id (a literal, or a value typed with the id
// union) always finds the record as it is today; any other string, or a lookup on a given
// day, may not. A day before the data's coverage throws a RangeError.

/** A court, division or seat by id, e.g. 'justice-of-the-peace-gent-1' */
export function getCourt(id: CourtId): Court
export function getCourt(id: string, options?: OnDay): Court | undefined
export function getCourt(id: string, options?: OnDay): Court | undefined {
    return pick(courtsById.get(id), options)
}

/**
 * The justice of the peace of a canton, by canton id ('gent-1', 'merelbeke-melle'). One that
 * sits in several places (Philippeville) has no address of its own: its seats do, see
 * `getDivisions`.
 */
export function getJusticeOfThePeace(cantonId: CantonId): Court
export function getJusticeOfThePeace(cantonId: string, options?: OnDay): Court | undefined
export function getJusticeOfThePeace(cantonId: string, options?: OnDay): Court | undefined {
    return pick(justicesOfThePeaceByCanton.get(cantonId), options)
}

/**
 * A court's divisions, or a justice of the peace's seats, on a day (today by default); empty
 * for a court without
 */
export function getDivisions(courtId: string, options: OnDay = {}): Court[] {
    return applying(divisionsByCourt.get(courtId) ?? [], options)
}

/**
 * The courts whose area holds a canton on a day (today by default), by canton id: its justice
 * of the peace and, of each other type, the court (not its divisions) that covers it; in
 * Brussels, both language courts of a type. Empty for an unknown canton.
 */
export function getCourtsForCanton(cantonId: string, options: OnDay = {}): Court[] {
    return applying(courtsByCanton.get(cantonId) ?? [], options)
}

export interface CourtFilter {
    type?: CourtType
    kind?: Court['kind']
    arrondissement?: string
    judicialArea?: string
}

/**
 * The courts that match every given filter and apply on a day (today by default); an empty
 * filter gives every court
 */
export function findCourts(filter: CourtFilter, options: OnDay = {}): Court[] {
    return applying(courts, options).filter(
        (c) =>
            (!filter.type || c.type === filter.type) &&
            (!filter.kind || c.kind === filter.kind) &&
            (!filter.arrondissement || c.arrondissement === filter.arrondissement) &&
            (!filter.judicialArea || c.judicialArea === filter.judicialArea),
    )
}

export interface FormatCourtNameOptions {
    /**
     * 'official' (default): the court's name as it publishes it, from `name`. 'canton': for a
     * justice of the peace, a label built from its canton, 'Vredegerecht 1e kanton Gent'. That
     * label is not the court's official name.
     */
    style?: 'official' | 'canton'
}

// The language to fall back to when a court doesn't publish in the one asked for. A court
// publishes in one language, except in Brussels (Dutch and French) and the German-speaking
// area (German and French), so this is the court's own language in all but those.
const fallbackOrder: Record<Locale, readonly Locale[]> = {
    nl: ['nl', 'fr', 'de'],
    fr: ['fr', 'nl', 'de'],
    de: ['de', 'fr', 'nl'],
}

const ordinal: Record<Locale, (n: number) => string> = {
    nl: (n) => `${n}e`,
    fr: (n) => (n === 1 ? '1er' : `${n}e`),
    de: (n) => `${n}.`,
}

const cantonLabel: Record<Locale, { court: string; canton: string }> = {
    nl: { court: 'Vredegerecht', canton: 'kanton' },
    fr: { court: 'Justice de paix', canton: 'canton' },
    de: { court: 'Friedensgericht', canton: 'Kanton' },
}

const cantonNamesById = versionsById(cantonNames)

/**
 * A court's name in a language.
 *
 * With `style: 'official'` (the default), the name as the court publishes it. A court that
 * doesn't publish in `locale` gives its name in another language: for Dutch, French then
 * German; for French, Dutch then German; for German, French then Dutch.
 *
 * With `style: 'canton'`, a justice of the peace gets a label built from its canton's number and
 * name: 'Vredegerecht 1e kanton Gent', 'Justice de paix 1er canton Gand', 'Friedensgericht 1.
 * Kanton Gent', and without a number 'Vredegerecht kanton Deinze'. It is a label for display,
 * not the court's official name. The canton name is in `locale`. Only the cantons of
 * Eupen-Sankt Vith have a German name; for the others, German uses the canton's name in the
 * court's own language (French in Brussels). Any other court, and a seat of a justice of the
 * peace, gets its official name.
 */
export function formatCourtName(
    court: Court,
    locale: Locale,
    options: FormatCourtNameOptions = {},
): string {
    if (
        options.style === 'canton' &&
        court.type === 'justice-of-the-peace' &&
        court.kind === 'court'
    ) {
        const versions = cantonNamesById.get(court.canton ?? '')
        // The canton as it was on the court's last day, or today for a court that still applies
        const canton = versions && currentVersion(versions, court.validTo ?? toDay(new Date()))
        if (canton) {
            // Most cantons have no German name: then the one in the court's own language
            const ownLanguage =
                court.name.nl !== undefined && court.name.fr === undefined ? 'nl' : 'fr'
            const name = canton.name[locale] ?? canton.name[ownLanguage]
            const { court: type, canton: word } = cantonLabel[locale]
            const number = canton.number === undefined ? '' : `${ordinal[locale](canton.number)} `
            return `${type} ${number}${word} ${name}`
        }
    }
    for (const language of fallbackOrder[locale]) {
        const name = court.name[language]
        if (name !== undefined) return name
    }
    throw new Error(`Court '${court.id}' has no name`)
}
