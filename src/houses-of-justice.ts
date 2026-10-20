import housesData from '../data/houses-of-justice.json'
import type { Address, Contact, Locale, SourceRef, Translated, Url } from './common'
import type { HouseOfJusticeId } from './ids.generated'

export type { HouseOfJusticeId } from './ids.generated'
export * from './contacts'

/**
 * A house of justice (justitiehuis, maison de justice): guidance and supervision of offenders,
 * victim support, social studies for the courts. Run by the Communities since 2015.
 */
export interface HouseOfJustice {
    /** Stable id from the name, without articles: 'justitiehuis-gent', 'maison-justice-arlon' */
    id: HouseOfJusticeId
    /** The Community that runs it */
    community: 'flemish' | 'french' | 'german'
    /** The name, in the language of its Community */
    name: Partial<Translated>
    /**
     * The house's id in the Flemish organisation register (Wegwijs, OVO number), for the Flemish
     * houses
     * @pattern ^OVO\d{6}$
     */
    ovo?: string
    address: Address
    contacts: Contact[]
    /** The page it's listed on */
    website: Partial<Record<Locale, Url>>
    sources: SourceRef[]
}

// The data is validated against the JSON Schema generated from these types (test/schema.test.ts)
export const housesOfJustice = housesData as readonly HouseOfJustice[]

const byId = new Map<string, HouseOfJustice>(housesOfJustice.map((h) => [h.id, h]))

/** A house of justice by id, e.g. 'justitiehuis-gent' */
export function getHouseOfJustice(id: HouseOfJusticeId): HouseOfJustice
export function getHouseOfJustice(id: string): HouseOfJustice | undefined
export function getHouseOfJustice(id: string): HouseOfJustice | undefined {
    return byId.get(id)
}
