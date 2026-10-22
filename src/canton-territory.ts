// The legal description of each canton's area: the largest part of the cantons data, kept out
// of `belgica/cantons` so an app that only names cantons doesn't load it
import territoryData from '../data/cantons/territory.json'
import type { Bilingual } from './common'
import type { CantonId } from './ids.generated'
import type { CantonTerritory } from './schemas/territory'
import { territoryCoverage } from './territory-coverage'
import { pickVersion, versionsById, type OnDay } from './time'

export type { CantonTerritory } from './schemas/territory'

const territoryById = versionsById(territoryData as readonly CantonTerritory[])

/**
 * The legal description of a canton's area, by canton id, as in the annex to the Judicial
 * Code: which municipalities, or for a city split over several cantons, which part. The same
 * as `getCanton(id).territory` from `belgica/territory`.
 */
export function getCantonTerritory(id: CantonId): Bilingual
export function getCantonTerritory(id: string, options?: OnDay): Bilingual | undefined
export function getCantonTerritory(id: string, options?: OnDay): Bilingual | undefined {
    return pickVersion(territoryById.get(id), options, territoryCoverage, 'territory')?.territory
}
