import prisonsData from '../data/prisons.json'
import type { Address, Contact, SourceRef, Translated, Url, Locale } from './common'
import type { PrisonId } from './ids.generated'

export type { PrisonId } from './ids.generated'
export * from './contacts'

/** A prison or detention house of the FPS Justice (DG EPI) */
export interface Prison {
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

// The data is validated against the JSON Schema generated from these types (test/schema.test.ts)
export const prisons = prisonsData as readonly Prison[]

const prisonsById = new Map<string, Prison>(prisons.map((p) => [p.id, p]))

/** A prison by id, e.g. 'gevangenis-gent' */
export function getPrison(id: PrisonId): Prison
export function getPrison(id: string): Prison | undefined
export function getPrison(id: string): Prison | undefined {
    return prisonsById.get(id)
}
