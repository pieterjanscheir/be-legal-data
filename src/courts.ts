import courtsData from '../data/courts.json'
import { cantonNames } from './canton-names.generated'
import type { Locale } from './common'
import { courtsCoverage } from './court-coverage'
import {
    formatCourtName as formatName,
    type FormatCourtNameOptions,
    type NamedCourt,
} from './court-format'
import { buildCourtLabel } from './court-label'
import type { CantonId, CourtId } from './ids.generated'
import type { Court, CourtType } from './schemas/courts'
import {
    applyingOn,
    pickVersion,
    versionsBy,
    versionsById,
    type OnDay,
    type Validity,
} from './time'

export type { CourtId } from './ids.generated'
export type { Coverage, OnDay, Validity } from './time'
export * from './contacts'
export type { FormatCourtNameOptions, NamedCourt } from './court-format'
export { courtsCoverage } from './court-coverage'
export type { Court, CourtDetails, CourtSummary, CourtType } from './schemas/courts'

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
/**
 * A court, division or seat by id, as on a given day (today by default). `undefined` for an
 * unknown id or one not in force that day. A day before the data's coverage throws a
 * `RangeError`.
 */
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
/**
 * The justice of the peace of a canton, by canton id, as on a given day (today by default).
 * `undefined` for an unknown id or one not in force that day. A day before the data's coverage
 * throws a `RangeError`.
 */
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

const cantonNamesById = versionsById(cantonNames)

/**
 * A court's name in a language: see `formatCourtName` in `belgica/courts/format`, which this
 * calls. For a justice of the peace without a stored `label` (a record saved before 0.5.0), it
 * builds the label from the canton, which `belgica/courts/format` can't without the cantons.
 */
export function formatCourtName(
    court: NamedCourt & Pick<Court, 'canton' | 'validTo'>,
    locale: Locale,
    options: FormatCourtNameOptions = {},
): string {
    const label =
        court.label ??
        (options.style === 'canton' ?
            buildCourtLabel(court, cantonNamesById.get(court.canton ?? ''))
        :   undefined)
    return formatName(label ? { ...court, label } : court, locale, options)
}
