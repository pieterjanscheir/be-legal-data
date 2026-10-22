import municipalitiesData from '../data/municipalities.json'
import postalCodesData from '../data/postal-codes.json'
import type { PostalCodeId } from './ids.generated'
import type { PostalCode } from './schemas/postal-codes'
import type { Municipality } from './schemas/territory'
import {
    applyingOn,
    pickVersion,
    versionsBy,
    versionsById,
    type Coverage,
    type OnDay,
    type Validity,
} from './time'

export type { MunicipalityId, PostalCodeId } from './ids.generated'
export type { Coverage, OnDay, Validity } from './time'
export type { PostalCode } from './schemas/postal-codes'

/**
 * The postal codes describe the situation from this day on: Statbel's conversion table as
 * valid from 1 January 2025, after the municipal mergers. Lookups for an earlier day throw a
 * `RangeError`.
 */
export const postalCodesCoverage: Coverage = { from: '2025-01-01' }

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts)
/** Every record, every version */
export const postalCodes = postalCodesData as readonly PostalCode[]

// The same municipalities the territory entry point has, without loading the cantons with it
const municipalities = municipalitiesData as readonly Municipality[]
const municipalitiesById = versionsById(municipalities)
const postalCodesById = versionsById(postalCodes)
const byPostalCode = versionsBy(postalCodes, (record) => record.postalCode)
const byMunicipality = versionsBy(postalCodes, (record) => record.municipality)

const pick = <T extends Validity>(list: T[] | undefined, options: OnDay | undefined) =>
    pickVersion(list, options, postalCodesCoverage, 'postal codes')

/** A postal code record by id, e.g. '9000-44021': today's version, or the one of a given day */
export function getPostalCode(id: PostalCodeId): PostalCode
export function getPostalCode(id: string, options?: OnDay): PostalCode | undefined
export function getPostalCode(id: string, options?: OnDay): PostalCode | undefined {
    return pick(postalCodesById.get(id), options)
}

/**
 * The municipalities a postal code belongs to on a day (today by default): one for almost every
 * code; two for 1040, 1050 and 1804, where the street decides. Empty for an unknown code.
 */
export function getMunicipalitiesForPostalCode(
    postalCode: string,
    options: OnDay = {},
): Municipality[] {
    return applyingOn(
        byPostalCode.get(postalCode) ?? [],
        options,
        postalCodesCoverage,
        'postal codes',
    ).flatMap((record) => {
        const municipality = pick(municipalitiesById.get(record.municipality), options)
        // Every record links to a municipality of the same day (test/postal-codes.test.ts);
        // the branch is there for the type
        /* v8 ignore start */
        if (!municipality) return []
        /* v8 ignore stop */
        return [municipality]
    })
}

/**
 * The postal codes of a municipality on a day (today by default), by REFNIS code, in order.
 * Empty for an unknown code.
 */
export function getPostalCodes(municipalityId: string, options: OnDay = {}): PostalCode[] {
    return applyingOn(
        byMunicipality.get(municipalityId) ?? [],
        options,
        postalCodesCoverage,
        'postal codes',
    ).sort((a, b) => a.postalCode.localeCompare(b.postalCode))
}
