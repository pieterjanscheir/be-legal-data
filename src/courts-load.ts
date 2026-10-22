// Loads the court files in data/courts/ on demand. Each file is its own import(), so a bundler
// makes a chunk of it and a browser downloads only what is asked for. Nothing here imports
// data/courts.json, and the map of every details file loads only when details are asked for.
import { courtsCoverage } from './court-coverage'
import { courtIndexFile, courtListFiles } from './data-files.generated'
import type { CourtId } from './ids.generated'
import type { CourtDetails, CourtSummary, CourtType } from './schemas/courts'
import { applyingOn, pickVersion, versionsById, type OnDay } from './time'

export type { ArrondissementId, CourtId } from './ids.generated'
export type { CourtDetails, CourtSummary, CourtType } from './schemas/courts'
export type { OnDay } from './time'
export { courtsCoverage } from './court-coverage'

export interface LoadCourtsFilter {
    type: CourtType
    /**
     * Only the courts of this arrondissement. Without, the whole type, including the courts
     * whose area covers several arrondissements and so have none.
     */
    arrondissement?: string
}

const load = async <T>(
    files: Readonly<Record<string, () => Promise<{ default: unknown }>>>,
    file: string,
): Promise<T | undefined> =>
    Object.hasOwn(files, file) ? ((await files[file]?.())?.default as T) : undefined

/**
 * The courts of a type, or of a type and arrondissement, that apply on a day (today by
 * default), as summaries: who and where, without contacts (see `loadCourtDetails`). Loads one
 * file: data/courts/<type>.json or data/courts/<type>/<arrondissement>.json. Empty for an
 * unknown type or arrondissement.
 */
export async function loadCourts(
    filter: LoadCourtsFilter,
    options: OnDay = {},
): Promise<CourtSummary[]> {
    const file =
        filter.arrondissement === undefined ?
            filter.type
        :   `${filter.type}/${filter.arrondissement}`
    const list = await load<CourtSummary[]>(courtListFiles, file)
    return applyingOn(list ?? [], options, courtsCoverage, 'courts')
}

/**
 * A court's summary by id, e.g. from a saved file: loads data/courts/index.json, then the one
 * list file the court is in. Without `on`, its version as it is today, like `getCourt`.
 */
export async function loadCourt(
    id: CourtId | (string & {}),
    options?: OnDay,
): Promise<CourtSummary | undefined> {
    const index = await load<Record<string, string>>({ index: courtIndexFile }, 'index')
    const file = index && Object.hasOwn(index, id) ? index[id] : undefined
    const list = file === undefined ? undefined : await load<CourtSummary[]>(courtListFiles, file)
    return pickVersion(list && versionsById(list).get(id), options, courtsCoverage, 'courts')
}

/**
 * How to reach a court: its contacts, opening hours, website, ECLI codes and sources, by id.
 * Loads data/courts/details/<id>.json only. Without `on`, its version as it is today.
 */
export async function loadCourtDetails(
    id: CourtId | (string & {}),
    options?: OnDay,
): Promise<CourtDetails | undefined> {
    // The map of every details file is a module of its own, loaded on the first call
    const { courtDetailsFiles } = await import('./court-details-files.generated')
    const versions = await load<CourtDetails[]>(courtDetailsFiles, id)
    return pickVersion(versions, options, courtsCoverage, 'courts')
}
