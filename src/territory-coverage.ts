import type { Coverage } from './time'

/**
 * The territory data describes the situation from this day on: the annex to the Judicial Code
 * as amended for the municipal mergers of 1 January 2025, and Statbel's municipalities of that
 * day. Lookups for an earlier day throw a `RangeError` rather than answer with today's map.
 */
export const territoryCoverage: Coverage = { from: '2025-01-01' }
