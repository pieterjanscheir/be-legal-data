/**
 * The published record types, for the parsers, with plain string ids: the parsers make the ids,
 * and the id unions in src/ids.generated.ts are generated from what they make.
 */
import type { Court as PublishedCourt } from '../../src/courts.ts'
import type { HouseOfJustice as PublishedHouseOfJustice } from '../../src/houses-of-justice.ts'
import type { Prison as PublishedPrison } from '../../src/prisons.ts'

export type { Address, Contact, ContactType, Locale } from '../../src/common.ts'
export type { CourtType } from '../../src/courts.ts'

export type Court = Omit<
    PublishedCourt,
    'id' | 'court' | 'judicialArea' | 'arrondissement' | 'canton'
> & {
    id: string
    court?: string
    judicialArea: string
    arrondissement?: string
    canton?: string
}
export type Prison = Omit<PublishedPrison, 'id'> & { id: string }
export type HouseOfJustice = Omit<PublishedHouseOfJustice, 'id'> & { id: string }
