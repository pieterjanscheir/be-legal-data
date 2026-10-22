import prisonsData from '../data/prisons.json'
import type { Prison } from './schemas/places'
import type { PrisonId } from './ids.generated'
import { pickVersion, versionsById, type Coverage, type OnDay } from './time'

export type { PrisonId } from './ids.generated'
export type { Coverage, OnDay, Validity } from './time'
export * from './contacts'
export type { Prison } from './schemas/places'

/**
 * The prisons data describes the situation from the day the FPS Justice site was first read.
 * A prison the site stops listing keeps its id and gets a `validTo`; one it starts listing gets
 * a `validFrom`. Lookups for an earlier day throw a `RangeError`.
 */
export const prisonsCoverage: Coverage = { from: '2026-10-20' }

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts)
/** Every record, every version */
export const prisons = prisonsData as readonly Prison[]

const prisonsById = versionsById(prisons)

/** A prison by id, e.g. 'gevangenis-gent': today's version, or the one of a given day */
export function getPrison(id: PrisonId): Prison
/**
 * A prison by id, as on a given day (today by default). `undefined` for an unknown id or one
 * not in force that day. A day before the data's coverage throws a `RangeError`.
 */
export function getPrison(id: string, options?: OnDay): Prison | undefined
export function getPrison(id: string, options?: OnDay): Prison | undefined {
    return pickVersion(prisonsById.get(id), options, prisonsCoverage, 'prisons')
}
