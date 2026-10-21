import prisonsData from '../data/prisons.json'
import type { Address, Contact, SourceRef, Translated, Url, Locale } from './common'
import type { PrisonId } from './ids.generated'
import { pickVersion, versionsById, type Coverage, type OnDay, type Validity } from './time'

export type { PrisonId } from './ids.generated'
export type { OnDay, Validity } from './time'
export * from './contacts'

/** A prison or detention house of the FPS Justice (DG EPI) */
export interface Prison extends Validity {
    /**
     * Stable id from the name in the local language (Dutch in Brussels), without articles:
     * 'gevangenis-gent', 'prison-lantin', 'detentiehuis-kortrijk'
     */
    id: PrisonId
    /** A detention house (detentiehuis) holds people for short sentences, close to home */
    kind: 'prison' | 'detention-house'
    /** The name in each national language, as FPS Justice publishes it */
    name: Partial<Translated>
    /** In the local language */
    address: Address
    contacts: Contact[]
    /** The prison's page on justitie.belgium.be, per language */
    website: Partial<Record<Locale, Url>>
    sources: SourceRef[]
}

/**
 * The prisons data describes the situation from the day the FPS Justice site was first read.
 * A prison the site stops listing keeps its id and gets a `validTo`; one it starts listing gets
 * a `validFrom`. Lookups for an earlier day throw a `RangeError`.
 */
export const prisonsCoverage: Coverage = { from: '2026-10-20' }

// The data is validated against the JSON Schema generated from these types (test/schema.test.ts)
/** Every record, every version */
export const prisons = prisonsData as readonly Prison[]

const prisonsById = versionsById(prisons)

/** A prison by id, e.g. 'gevangenis-gent': today's version, or the one of a given day */
export function getPrison(id: PrisonId): Prison
export function getPrison(id: string, options?: OnDay): Prison | undefined
export function getPrison(id: string, options?: OnDay): Prison | undefined {
    return pickVersion(prisonsById.get(id), options, prisonsCoverage, 'prisons')
}
