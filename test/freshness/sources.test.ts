/**
 * Checks that the official sources are still online, so a moved or removed page is noticed
 * before someone tries to update the data from it. Needs the network; set FRESHNESS_ONLINE=1.
 */
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { courts } from '../../src'

const { resources } = JSON.parse(readFileSync('datapackage.json', 'utf8'))
const urls = new Set<string>([
    ...resources.flatMap((r: { sources: { path?: string }[] }) =>
        r.sources.map((s) => s.path).filter(Boolean),
    ),
    ...courts.flatMap((c) => [c.website, ...(c.sources ?? []).map((s) => s.url)]).filter(
        (u): u is string => Boolean(u),
    ),
])

describe.runIf(process.env.FRESHNESS_ONLINE === '1')('source URLs', () => {
    it.each([...urls])('%s responds', async (url) => {
        const res = await fetch(url, {
            redirect: 'follow',
            headers: { 'user-agent': 'be-legal-data freshness check (+https://github.com/pieterjanscheir/be-legal-data)' },
            signal: AbortSignal.timeout(25_000),
        })
        expect(res.status, url).toBeLessThan(400)
    })
})
