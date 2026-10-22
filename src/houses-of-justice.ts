import housesData from '../data/houses-of-justice.json'
import type { HouseOfJusticeId } from './ids.generated'
import type { HouseOfJustice } from './schemas/places'
import { pickVersion, versionsById, type Coverage, type OnDay } from './time'

export type { HouseOfJusticeId } from './ids.generated'
export type { Coverage, OnDay, Validity } from './time'
export * from './contacts'
export type { HouseOfJustice } from './schemas/places'

/**
 * The houses-of-justice data describes the situation from the day the Communities' sites were
 * first read. A house a site stops listing keeps its id and gets a `validTo`; one it starts
 * listing gets a `validFrom`. Lookups for an earlier day throw a `RangeError`.
 */
export const housesOfJusticeCoverage: Coverage = { from: '2026-10-20' }

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts)
/** Every record, every version */
export const housesOfJustice = housesData as readonly HouseOfJustice[]

const byId = versionsById(housesOfJustice)

/** A house of justice by id, e.g. 'justitiehuis-gent': today's version, or the one of a given day */
export function getHouseOfJustice(id: HouseOfJusticeId): HouseOfJustice
/**
 * A house of justice by id, as on a given day (today by default). `undefined` for an unknown id
 * or one not in force that day. A day before the data's coverage throws a `RangeError`.
 */
export function getHouseOfJustice(id: string, options?: OnDay): HouseOfJustice | undefined
export function getHouseOfJustice(id: string, options?: OnDay): HouseOfJustice | undefined {
    return pickVersion(byId.get(id), options, housesOfJusticeCoverage, 'houses of justice')
}
