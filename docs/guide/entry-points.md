<script setup>
import { data as stats } from '../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Entry points and bundle size

The data is bundled into the JavaScript, so what an app loads depends on what it imports. On a
server that rarely matters. In a browser it does: the courts and the legal text of every canton
are hundreds of kilobytes.

## One entry point per dataset

Importing from `belgica` loads every dataset except the boundaries and the court locations.
Each dataset also has its own entry point, and importing from it loads that dataset alone:

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { nextWorkingDay } from 'belgica/calendar'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

The [API reference](/api#entry-points) lists every entry point and what it exports. The
jurisdiction functions, such as `findCourtsWithJurisdiction`, need both the territory and the
courts and are only in the root.

The canton boundaries, the arrondissement boundaries and the court locations are only in their
own entry points (`belgica/canton-boundaries`, `belgica/arrondissement-boundaries`,
`belgica/court-locations`). The root never loads them.

## Measured sizes

The JavaScript each entry point loads, with the chunks it imports, measured from the build of
this version:

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">JavaScript loaded</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Sizes are measured from the build when the site is built (<code>pnpm build</code> first).</p>

The two boundary entry points read their geometry from `data/` with a JSON import, so the sizes
above leave it out: the canton boundaries are 23 MB of JSON and the arrondissement boundaries
8 MB.

## Smaller still: only the courts you need

JSON can't be tree-shaken, so an app that imports `belgica/courts` ships every court. A browser
app that needs only some courts can import smaller files, or load them when they're needed:

| You need                                       | Use                                                                                           |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------- |
| Every court, with lookups and filters          | `belgica/courts`                                                                              |
| One type, all of Belgium                       | `belgica/data/courts/<type>.json`, or `loadCourts({ type })`                                  |
| One type in one arrondissement                 | `belgica/data/courts/<type>/<arrondissement>.json`, or `loadCourts({ type, arrondissement })` |
| One court by a stored id                       | `loadCourt(id)`                                                                               |
| One court's contacts, hours and website        | `belgica/data/courts/details/<id>.json`, or `loadCourtDetails(id)`                            |
| Names and contacts of a court you already hold | `belgica/courts/format`, which loads no data                                                  |
| Cantons without the legal text of their area   | `belgica/cantons`, and `belgica/cantons/territory` for the text                               |

The loaders are in `belgica/courts/load`. [Only the courts you need](/data/courts#only-the-courts-you-need)
describes the files and gives an example.

## The raw files

Every data file is exported as well, for a JSON import or a bundler:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

Their paths are public API, like the ids: they don't change within a major version. See
[without JavaScript](./raw-json#files) for the list.
