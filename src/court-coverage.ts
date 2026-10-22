import type { Coverage } from './time'

/**
 * The courts data describes the situation from this day on, like the territory: which courts
 * exist follows from the Judicial Code as amended for 1 January 2025. Addresses and contacts
 * are as the portal showed them on `sources[].retrieved`; a record the portal stops listing
 * keeps its id and gets a `validTo`, and one it starts listing gets a `validFrom`. Lookups for
 * an earlier day throw a `RangeError`.
 */
export const courtsCoverage: Coverage = { from: '2025-01-01' }
