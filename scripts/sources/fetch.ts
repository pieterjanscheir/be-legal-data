/**
 * Fetches the official sources into snapshot directories (see store.ts).
 *
 *     node scripts/sources/fetch.ts [source…]     # all sources when none are named
 *
 * Writes to $SOURCES_DIR, or .sources/ by default. The scheduled `sources` workflow runs this
 * and commits the snapshots to the `sources` branch.
 */
import { sources } from './catalog.ts'
import { get } from './http.ts'
import { Store } from './store.ts'

const root = process.env['SOURCES_DIR'] ?? '.sources'
const wanted = process.argv.slice(2)
const unknown = wanted.filter((name) => !sources.some((s) => s.name === name))
if (unknown.length > 0) throw new Error(`Unknown source: ${unknown.join(', ')}`)

let failed = false
for (const source of sources) {
    if (wanted.length > 0 && !wanted.includes(source.name)) continue
    const store = new Store(root, source.name)
    let fetched = 0
    let changed = 0
    try {
        await source.fetch(async (url) => {
            const res = await get(url)
            fetched++
            if (store.put(url, res)) changed++
            if (res.status !== 200) console.warn(`${source.name}: HTTP ${res.status} ${url}`)
            return res
        })
    } catch (error) {
        failed = true
        console.error(`${source.name}: ${String(error)}`)
    }
    store.save()
    console.log(`${source.name}: ${fetched} fetched, ${changed} changed`)
}
if (failed) process.exitCode = 1
