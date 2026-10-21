<script setup>
import { data as stats } from '../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Getting started

## Install

::: code-group

```bash [pnpm]
pnpm add be-legal-data
```

```bash [npm]
npm install be-legal-data
```

```bash [yarn]
yarn add be-legal-data
```

:::

The package is ESM, ships its own type definitions, has no runtime dependencies, and runs in
browsers and on Node 22.12 or later, where `require()` loads it too. It's tested on Node 22.12,
22, 24 and 26.

### Import only what you need

The data is bundled into the JavaScript, so importing from the package root loads every
dataset. Each dataset has its own entry point, and the courts and the cantons (with the legal
text of their territories) are by far the largest:

```ts
import { getInterestRate } from 'be-legal-data/interest-rates'
import { getCourt } from 'be-legal-data/courts'
import { getCanton } from 'be-legal-data/territory'
```

The [canton boundaries](/data/canton-boundaries) are the exception: a million positions of
geometry, only in `be-legal-data/canton-boundaries`, never loaded by the package root.

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">JavaScript loaded</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Sizes are measured from the build when the site is built (<code>pnpm build</code> first).</p>

## A first look

```ts
import {
    getCourt,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'be-legal-data'

getCourt('justice-of-the-peace-gent-1').name.nl // 'Vredegerecht Gent 1'
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getCantonsForMunicipality('44021') // Gent 1–5: split city, see each canton's `territory`
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Common tasks

### Which justice of the peace handles an address?

Look up the municipality's REFNIS code and get its cantons, then the canton's court.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'be-legal-data'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // every canton has its court
}

// On the day the summons was served, rather than today
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

When a city is split over several cantons (Antwerpen, Gent, Brussel, Luik, …), you get more than
one result. The street address decides, and each canton's `territory` holds the legal
description of its part. Try it on the [territory page](/data/territory#find-the-canton-for-a-municipality).

With the address's coordinates, the [canton boundaries](/data/canton-boundaries) settle it:

```ts
import { findCantonsAt } from 'be-legal-data/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // longitude, latitude: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### Which court for a municipality?

Every court other than a justice of the peace lists the cantons it covers (`cantons`), as the
law sets them. `findCompetentCourts` looks a municipality's cantons up in them.

```ts
import { findCompetentCourts, getDivisions } from 'be-legal-data'

findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], not Brussels
findCompetentCourts('21004', 'labour-court') // the Dutch- and the French-speaking court of Brussels

// The court as a whole; which division hears the case isn't in the data yet
const [court] = findCompetentCourts('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

### Interest due on a day

```ts
import { getInterestRate, getLatestKnownRateDate } from 'be-legal-data'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` returns `null` for a day with no rate on file, so you can warn instead of
silently using 0 %. It throws a `RangeError` for a malformed day such as `'2024-6-1'`: pass
`YYYY-MM-DD` or a `Date`.

### Court names in another language

Names are as each court publishes them, in every language it has a page in. A court in
Flanders publishes in Dutch only; bilingual courts in Brussels in Dutch and French; the courts
in Eupen in German and French.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## Raw JSON

The data files are exported too:

```ts
import courts from 'be-legal-data/data/courts.json' with { type: 'json' }
```

## Ids are public API

Projects store ids such as `justice-of-the-peace-gent-1` or `oost-vlaanderen`, so they never change within a
major version (see [identifiers](./identifiers)), and versions follow these rules:

| Change                     | Version |
| -------------------------- | ------- |
| Adding data                | minor   |
| Fixing a value             | patch   |
| Removing or renaming an id | major   |
