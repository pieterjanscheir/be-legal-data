/**
 * The published record types, for the parsers, with plain string ids: the parsers make the ids,
 * and the id unions in src/ids.generated.ts are generated from what they make.
 */
import type { Address as PublishedAddress } from '../../src/common.ts'
import type { Court as PublishedCourt } from '../../src/courts.ts'
import type { HouseOfJustice as PublishedHouseOfJustice } from '../../src/houses-of-justice.ts'
import type { PostalCode as PublishedPostalCode } from '../../src/postal-codes.ts'
import type { Prison as PublishedPrison } from '../../src/prisons.ts'

export type { Contact, ContactType, Locale } from '../../src/common.ts'
export type { CourtType } from '../../src/courts.ts'

export type Address = Omit<PublishedAddress, 'municipality'> & { municipality?: string }
export type Court = Omit<
    PublishedCourt,
    'id' | 'court' | 'judicialArea' | 'arrondissement' | 'canton' | 'cantons' | 'address'
> & {
    id: string
    court?: string
    judicialArea: string
    arrondissement?: string
    canton?: string
    cantons?: string[]
    address?: Address
}
export type Prison = Omit<PublishedPrison, 'id' | 'address'> & { id: string; address: Address }
export type HouseOfJustice = Omit<PublishedHouseOfJustice, 'id' | 'address'> & {
    id: string
    address: Address
}
export type PostalCode = Omit<PublishedPostalCode, 'id' | 'municipality'> & {
    id: string
    municipality: string
}
