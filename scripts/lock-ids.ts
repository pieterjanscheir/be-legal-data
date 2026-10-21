/**
 * Adds every id in data/ to ids.lock.json: the ids this package has published, per dataset.
 *
 * Ids are public API, so the lock only grows here, and test/ids.test.ts fails when a locked id
 * is missing from the data. That catches an id that disappears or changes by accident: a
 * scraper reading a retitled page, a regenerated canton list, a hand edit. Removing an id is a
 * deliberate act, a major version: record it in CHANGELOG.md, then take it out of the lock by
 * hand. Runs as part of `pnpm generate`; `pnpm check` fails when the committed lock is behind.
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'

export const LOCK_FILE = 'ids.lock.json'

export const DATASETS = [
    'judicial-areas',
    'arrondissements',
    'cantons',
    'canton-boundaries',
    'municipalities',
    'courts',
    'prisons',
    'houses-of-justice',
] as const

export type Lock = Record<(typeof DATASETS)[number], string[]>

/** The lock as committed; a dataset it doesn't know yet (a new one) starts empty */
export function readLock(path = LOCK_FILE): Lock {
    const saved = existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as Partial<Lock>) : {}
    return Object.fromEntries(DATASETS.map((d) => [d, saved[d] ?? []])) as unknown as Lock
}

/** The lock with every current id added; nothing is ever taken out here */
export function lockIds(lock: Lock, current: Record<string, readonly string[]>): Lock {
    const out = {} as Lock
    for (const dataset of DATASETS) {
        out[dataset] = [...new Set([...lock[dataset], ...(current[dataset] ?? [])])].sort()
    }
    return out
}

const current: Record<string, string[]> = {}
for (const dataset of DATASETS) {
    const records = JSON.parse(readFileSync(`data/${dataset}.json`, 'utf8')) as { id: string }[]
    current[dataset] = records.map((r) => r.id)
}
writeFileSync(LOCK_FILE, JSON.stringify(lockIds(readLock(), current), null, 2) + '\n')
