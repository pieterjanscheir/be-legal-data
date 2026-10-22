// The cantons without their territory texts: a canton's name, number, seat, arrondissement and
// municipalities, for an app that doesn't need the legal description of its area. That is in
// `belgica/cantons/territory`; `belgica/territory` has the full records.
import summariesData from '../data/cantons/summaries.json'
import type { CantonId } from './ids.generated'
import type { CantonSummary } from './schemas/territory'
import { territoryCoverage } from './territory-coverage'
import { pickVersion, versionsById, type OnDay } from './time'

export type { CantonId } from './ids.generated'
export type { CantonSummary } from './schemas/territory'
export type { OnDay } from './time'
export { territoryCoverage } from './territory-coverage'

/** Every canton, every version, without its `territory` (data/cantons/summaries.json) */
export const cantons = summariesData as readonly CantonSummary[]

const cantonsById = versionsById(cantons)

/** A judicial canton by id, e.g. 'gent-1', without its `territory` */
export function getCanton(id: CantonId): CantonSummary
export function getCanton(id: string, options?: OnDay): CantonSummary | undefined
export function getCanton(id: string, options?: OnDay): CantonSummary | undefined {
    return pickVersion(cantonsById.get(id), options, territoryCoverage, 'territory')
}
