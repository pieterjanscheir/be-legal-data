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

The package works with ESM and CommonJS, ships its own type definitions, and needs Node 18 or later.

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

formatCourtName(getCourt('VredegerechtGent1')!) // 'Vredegerecht 1e kanton Gent'
findCourts({ type: 'enterprise-court', arrondissement: 'WestFlanders' })

getCantonsForMunicipality('44088') // [Canton MerelbekeMelle]
getCantonsForMunicipality('44021') // Gent 1–5: split city, see each canton's `territory`
getCanton('Oudergem')!.seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Common tasks

### Which justice of the peace handles an address?

Look up the municipality's REFNIS code and get its cantons. The justice of the peace of canton
`X` has the id `VredegerechtX`.

```ts
import { getCantonsForMunicipality, getCourt } from 'be-legal-data'

const [canton, ...others] = getCantonsForMunicipality('44088')
if (others.length === 0) {
    const court = getCourt(`Vredegerecht${canton.id}`) // undefined outside East and West Flanders, for now
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
silently using 0 %.

### Court names in another language

```ts
formatCourtName(getCourt('VredegerechtGent1')!, 'fr') // 'Tribunal de paix 1e canton Gand'
formatCourtName(getCourt('OndernemingsrechtbankGentBrugge')!) // 'Ondernemingsrechtbank Gent - afdeling Brugge'
```

## Raw JSON

The data files are exported too:

```ts
import courts from 'be-legal-data/data/courts.json'
```

## Ids are public API

Projects store ids such as `VredegerechtGent1` or `EastFlanders`, so versions follow these
rules:

| Change | Version |
| --- | --- |
| Adding data | minor |
| Fixing a value | patch |
| Removing or renaming an id | major |
