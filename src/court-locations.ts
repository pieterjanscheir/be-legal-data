import locationsData from '../data/court-locations.json'
import type { CourtLocation } from './schemas/court-locations'
import { pickVersion, versionsById, type Coverage, type OnDay } from './time'

export type { SourceRef } from './common'
export type { CourtId } from './ids.generated'
export type { Coverage, OnDay, Validity } from './time'

export type { CourtLocation } from './schemas/court-locations'
export type { Point, Position } from './schemas/geometry'

/**
 * The locations describe the situation from the day the NGI's file was first read for them. A
 * point the NGI moves replaces the previous one; a point the NGI drops, or that stops matching
 * the court's address, keeps its record with a `validTo`. Lookups for an earlier day throw a
 * `RangeError`.
 */
export const courtLocationsCoverage: Coverage = { from: '2026-10-21' }

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts). TypeScript
// reads the file's positions as number[] rather than [number, number], hence unknown.
/** Every record, every version */
export const courtLocations = locationsData as unknown as readonly CourtLocation[]

const DATASET = 'court locations'
const locationsById = versionsById(courtLocations)

/**
 * Where a court is on the map, by court id: today's version, or the one of a given day.
 * Undefined for a court the NGI has no point for (only justices of the peace have one), or
 * whose point is at another address than the court's.
 */
export function getCourtLocation(id: string, options?: OnDay): CourtLocation | undefined {
    return pickVersion(locationsById.get(id), options, courtLocationsCoverage, DATASET)
}
