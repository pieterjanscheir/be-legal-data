# API reference

Everything is exported from the package root:

```ts
import { getCanton, getInterestRate /* … */ } from 'be-legal-data'
```

Lookups by id return `undefined` when nothing matches; list functions return an empty array.

## Territory

### `getJudicialArea(id)`

```ts
function getJudicialArea(id: string): JudicialArea | undefined
```

### `getArrondissement(id)`

```ts
function getArrondissement(id: string): Arrondissement | undefined
```

```ts
getArrondissement('EastFlanders')!.name.fr // 'Flandre orientale'
```

### `getMunicipality(refnis)`

```ts
function getMunicipality(refnis: string): Municipality | undefined
```

```ts
getMunicipality('44021')!.name // { nl: 'Gent', fr: 'Gand' }
```

### `getCanton(id)`

```ts
function getCanton(id: string): Canton | undefined
```

```ts
getCanton('Oudergem')!.seat.nl // 'Etterbeek'
```

### `getCantonsForMunicipality(refnis)`

```ts
function getCantonsForMunicipality(refnis: string): Canton[]
```

The cantons that cover a municipality. One canton for most municipalities; several for cities
that are split (Antwerpen, Gent, Brussel, …). Then the street address decides, and each canton's
`territory` describes its part.

```ts
getCantonsForMunicipality('44088').map((c) => c.id) // ['MerelbekeMelle']
getCantonsForMunicipality('44021').map((c) => c.id) // ['Gent1', 'Gent2', 'Gent3', 'Gent4', 'Gent5']
```

## Courts

### `getCourt(id)`

```ts
function getCourt(id: string): Court | undefined
```

The justice of the peace of canton `X` has the id `VredegerechtX`.

### `findCourts(filter)`

```ts
function findCourts(filter: { type?: CourtType; arrondissement?: string }): Court[]
```

Both filters are optional; an empty filter returns every court.

```ts
findCourts({ type: 'enterprise-court', arrondissement: 'WestFlanders' })
```

### `getContact(court, type, label?)`

```ts
function getContact(court: Court, type: 'phone' | 'email', label?: string): string | undefined
```

The value of the first contact of that type, optionally with that label (`'griffie'`, `'B-rol'`, …).

```ts
getContact(getCourt('OndernemingsrechtbankGentBrugge')!, 'email', 'griffie')
// 'orb.brugge.griffie@just.fgov.be'
```

### `formatCourtName(court, locale?)`

```ts
function formatCourtName(court: Court, locale?: Locale): string // locale defaults to 'nl'
```

The full official-style name.

```ts
formatCourtName(getCourt('VredegerechtGent1')!) // 'Vredegerecht 1e kanton Gent'
formatCourtName(getCourt('OndernemingsrechtbankGentBrugge')!) // 'Ondernemingsrechtbank Gent - afdeling Brugge'
formatCourtName(getCourt('OndernemingsrechtbankGentBrugge')!, 'fr') // "Tribunal de l'entreprise de Gand - division Bruges"
```

## Interest rates

### `getInterestRate(date, type, options?)`

```ts
function getInterestRate(
    date: Date | string,
    type: InterestType,
    options?: { contractAfter20130316?: boolean },
): InterestRateResult | null

interface InterestRateResult {
    rate: number // percent
    period: { from: string; to: string }
}
```

The rate that applies on a day, or `null` when no rate is on file for it. A `Date` is read as a
local calendar day; a string is taken as `YYYY-MM-DD`.

`contractAfter20130316` only matters for commercial interest between 2013 and 15 March 2015; by
default the rate for older contracts is used. See [interest rates](/data/interest-rates#the-2013-2015-contract-rule).

### `getLatestKnownRateDate(type)`

```ts
function getLatestKnownRateDate(type: InterestType): string
```

The last day for which a rate is on file, `YYYY-MM-DD`.

## Datasets

The full datasets, typed:

| Export | Type |
| --- | --- |
| `judicialAreas` | `JudicialArea[]` |
| `arrondissements` | `Arrondissement[]` |
| `cantons` | `Canton[]` |
| `municipalities` | `Municipality[]` |
| `courts` | `Court[]` |
| `interestRates` | `Record<InterestType, InterestRateSeries>` |

## Types

| Type | Described on |
| --- | --- |
| `Locale` = `'nl' \| 'fr' \| 'de'` | |
| `Translated` = `Record<Locale, string>` | |
| `Bilingual` = `Record<'nl' \| 'fr', string>`: names as the Judicial Code gives them | |
| `JudicialArea`, `Arrondissement`, `Canton`, `Municipality` | [Territory](/data/territory) |
| `Court`, `CourtType`, `JusticeOfThePeace`, `EnterpriseCourtDivision`, `Address`, `Contact` | [Courts](/data/courts#shape) |
| `InterestType`, `InterestRatePeriod`, `InterestRateSeries`, `InterestRateResult` | [Interest rates](/data/interest-rates#shape) |
