/**
 * Stores the canton label of every justice of the peace in data/courts.json, as `label`, right
 * after `name`: 'Vredegerecht 1e kanton Gent' in Dutch, French and German. `formatCourtName`
 * reads it, so a browser app that formats names doesn't load the cantons. Run with
 * `pnpm build:court-labels` (part of `pnpm generate`); `pnpm check` fails when the committed
 * file is out of date.
 */
import { readFileSync, writeFileSync } from 'node:fs'

import { buildCourtLabel } from '../src/court-label.ts'
import type { Canton } from '../src/schemas/territory.ts'
import type { Court } from '../src/schemas/courts.ts'
import { versionsById } from '../src/time.ts'

const cantons = versionsById(JSON.parse(readFileSync('data/cantons.json', 'utf8')) as Canton[])
const courts = JSON.parse(readFileSync('data/courts.json', 'utf8')) as Court[]

const labelled = courts.map((court) => {
    const label = buildCourtLabel(court, cantons.get(court.canton ?? ''))
    const out: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(court)) {
        if (key === 'label') continue
        out[key] = value
        if (key === 'name' && label) out['label'] = label
    }
    return out
})
writeFileSync('data/courts.json', JSON.stringify(labelled, null, 2) + '\n')
