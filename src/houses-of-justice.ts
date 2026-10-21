import housesData from '../data/houses-of-justice.json'
import type { Address, Contact, Locale, SourceRef, Translated, Url } from './common'
import type { HouseOfJusticeId } from './ids.generated'
import { pickVersion, versionsById, type Coverage, type OnDay, type Validity } from './time'

export type { HouseOfJusticeId } from './ids.generated'
export type { OnDay, Validity } from './time'
export * from './contacts'

/**
 * A house of justice (justitiehuis, maison de justice): guidance and supervision of offenders,
 * victim support, social studies for the courts. Run by the Communities since 2015.
 */
export interface HouseOfJustice extends Validity {
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

/**
 * The houses-of-justice data describes the situation from the day the Communities' sites were
 * first read. A house a site stops listing keeps its id and gets a `validTo`; one it starts
 * listing gets a `validFrom`. Lookups for an earlier day throw a `RangeError`.
 */
export const housesOfJusticeCoverage: Coverage = { from: '2026-10-20' }

// The data is validated against the JSON Schema generated from these types (test/schema.test.ts)
/** Every record, every version */
export const housesOfJustice = housesData as readonly HouseOfJustice[]

const byId = versionsById(housesOfJustice)

/** A house of justice by id, e.g. 'justitiehuis-gent': today's version, or the one of a given day */
export function getHouseOfJustice(id: HouseOfJusticeId): HouseOfJustice
export function getHouseOfJustice(id: string, options?: OnDay): HouseOfJustice | undefined
export function getHouseOfJustice(id: string, options?: OnDay): HouseOfJustice | undefined {
    return pickVersion(byId.get(id), options, housesOfJusticeCoverage, 'houses of justice')
}
