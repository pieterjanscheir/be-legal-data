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
dataset (about 250 KB, mostly the legal text of the cantons). Each dataset has its own entry
point:

```ts
import { getInterestRate } from 'be-legal-data/interest-rates' // 12 KB
import { getCourt } from 'be-legal-data/courts' // 32 KB
import { getCanton } from 'be-legal-data/territory'
```

## A first look

```ts
import {
    getCourt,
    formatCourtName,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'be-legal-data'

formatCourtName(getCourt('justice-of-the-peace-gent-1')) // 'Vredegerecht 1e kanton Gent'
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
    const court = getJusticeOfThePeace(cantons[0].id) // undefined outside East and West Flanders, for now
}
```

When a city is split over several cantons (Antwerpen, Gent, Brussel, Luik, …), you get more than
one result. The street address decides, and each canton's `territory` holds the legal
description of its part. Try it on the [territory page](/data/territory#find-the-canton-for-a-municipality).

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

```ts
formatCourtName(getCourt('justice-of-the-peace-gent-1'), 'fr') // 'Tribunal de paix 1e canton Gand'
formatCourtName(getCourt('enterprise-court-gent-brugge')) // 'Ondernemingsrechtbank Gent - afdeling Brugge'
```

## Raw JSON

The data files are exported too:

```ts
import courts from 'be-legal-data/data/courts.json'
```

## Ids are public API

Projects store ids such as `justice-of-the-peace-gent-1` or `oost-vlaanderen`, so they never change within a
major version (see [identifiers](./identifiers)), and versions follow these rules:

| Change                     | Version |
| -------------------------- | ------- |
| Adding data                | minor   |
| Fixing a value             | patch   |
| Removing or renaming an id | major   |
