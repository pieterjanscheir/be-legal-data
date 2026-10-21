/**
 * Fetches the official sources into snapshot directories (see store.ts).
 *
 *     node scripts/sources/fetch.ts [source…]     # all sources when none are named
 *
 * Writes to $SOURCES_DIR, or .sources/ by default. The scheduled `sources` workflow runs this
 * and commits the snapshots to the `sources` branch. Exits non-zero when a page failed (its last
 * good snapshot is kept) or a walk was interrupted (the source's snapshots are left as they
 * were), so the workflow stops before the data is rebuilt from an incomplete picture.
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
    const count = { changed: 0, unchanged: 0, failed: 0 }
    try {
        await source.fetch(async (url) => {
            const res = await get(url)
            const result = store.put(url, res)
            count[result]++
            if (result === 'failed') console.error(`${source.name}: HTTP ${res.status} ${url}`)
            return res
        })
    } catch (error) {
        // An interrupted walk keeps the previous index whole, rather than drop what it missed
        failed = true
        console.error(`${source.name}: ${String(error)}; snapshots left as they were`)
        continue
    }
    // Failed pages keep their last good snapshot, and nothing is pruned: a failed list page
    // would make every page it links to look removed. The run fails, so a person looks.
    if (count.failed > 0) failed = true
    store.save({ prune: count.failed === 0 })
    console.log(
        `${source.name}: ${count.changed} changed, ${count.unchanged} unchanged, ${count.failed} failed`,
    )
}
if (failed) process.exitCode = 1
