# API reference

Everything is exported from the package root, and each dataset also has its own entry point:

```ts
import { getCanton, getInterestRate /* … */ } from 'be-legal-data'

// Only what you use: 12 KB for the interest rates instead of 250 KB for everything
import { getInterestRate } from 'be-legal-data/interest-rates'
import { getCourt, getJusticeOfThePeace } from 'be-legal-data/courts'
import { getCanton, getCantonsForMunicipality } from 'be-legal-data/territory'
```

| Entry point                          | Contents                                                  |
| ------------------------------------ | --------------------------------------------------------- |
| `be-legal-data`                      | Everything below                                          |
| `be-legal-data/territory`            | Judicial areas, arrondissements, cantons, municipalities  |
| `be-legal-data/courts`               | Courts                                                    |
| `be-legal-data/interest-rates`       | Interest rates                                            |
| `be-legal-data/data/*.json`          | The raw data files                                        |
| `be-legal-data/schema/*.schema.json` | [JSON Schemas](/guide/schema)                             |
| `be-legal-data/datapackage.json`     | [Data package descriptor](/guide/schema#datapackage-json) |

Conventions:

- Lookups by id return `undefined` when nothing matches; list functions return an empty array.
- Functions only throw for invalid input (a malformed date), never for missing data.
- Exported datasets are `readonly`: copy before sorting or changing (`[...courts].sort()`).
- A lookup with a known id (a literal like `'gent-1'`, or a value typed `CantonId`) returns the
  record itself, never `undefined`. Any other string returns `Record | undefined`.
  See [identifiers](/guide/identifiers).

## Territory

### `getJudicialArea(id)`

```ts
function getJudicialArea(id: JudicialAreaId): JudicialArea
function getJudicialArea(id: string): JudicialArea | undefined
```

### `getArrondissement(id)`

```ts
function getArrondissement(id: ArrondissementId): Arrondissement
function getArrondissement(id: string): Arrondissement | undefined
```

```ts
getArrondissement('oost-vlaanderen').name.fr // 'Flandre orientale'
```

### `getMunicipality(id)`

```ts
function getMunicipality(id: MunicipalityId): Municipality
function getMunicipality(id: string): Municipality | undefined
```

```ts
getMunicipality('44021').name // { nl: 'Gent', fr: 'Gand' }
```

### `getCanton(id)`

```ts
function getCanton(id: CantonId): Canton
function getCanton(id: string): Canton | undefined
```

```ts
getCanton('oudergem').seat.nl // 'Etterbeek'
```

### `getCantonsForMunicipality(id)`

```ts
function getCantonsForMunicipality(id: string): Canton[]
```

The cantons that cover a municipality. One canton for most municipalities; several for cities
that are split (Antwerpen, Gent, Brussel, …). Then the street address decides, and each canton's
`territory` describes its part.

```ts
getCantonsForMunicipality('44088').map((c) => c.id) // ['merelbeke-melle']
getCantonsForMunicipality('44021').map((c) => c.id) // ['gent-1', 'gent-2', 'gent-3', 'gent-4', 'gent-5']
```

### `getArrondissementForMunicipality(id)`

```ts
function getArrondissementForMunicipality(id: string): Arrondissement | undefined
```

The judicial arrondissement a municipality lies in, by REFNIS code. Every municipality lies in
exactly one, even a city split over several cantons.

```ts
getArrondissementForMunicipality('44021')?.id // 'oost-vlaanderen'
```

## Courts

### `getCourt(id)`

```ts
function getCourt(id: CourtId): Court
function getCourt(id: string): Court | undefined
```

Court ids are the court `type` followed by the place: `justice-of-the-peace-gent-1`,
`enterprise-court-gent-brugge`.

### `getJusticeOfThePeace(cantonId)`

```ts
function getJusticeOfThePeace(cantonId: string): JusticeOfThePeace | undefined
```

The justice of the peace of a canton. `undefined` when that court isn't in the data yet
(only East and West Flanders so far), so pair it with `getCantonsForMunicipality`:

```ts
const [canton] = getCantonsForMunicipality('44088')
getJusticeOfThePeace(canton.id)?.address // Merelbeke-Melle's court
```

### `findCourts(filter)`

```ts
function findCourts(filter: { type?: CourtType; arrondissement?: string }): Court[]
```

Both filters are optional; an empty filter returns every court.

```ts
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })
```

### `getContact(court, type, label?)`

```ts
function getContact(court: Court, type: 'phone' | 'email', label?: ContactLabel): string | undefined
```

The value of the first contact of that type, optionally with that label (`'griffie'`, `'B-rol'`, …).

```ts
getContact(getCourt('enterprise-court-gent-brugge'), 'email', 'griffie')
// 'orb.brugge.griffie@just.fgov.be'
```

### `formatCourtName(court, locale?)`

```ts
function formatCourtName(court: Court, locale?: Locale): string // locale defaults to 'nl'
```

The full official-style name.

```ts
formatCourtName(getCourt('justice-of-the-peace-gent-1')) // 'Vredegerecht 1e kanton Gent'
formatCourtName(getCourt('enterprise-court-gent-brugge')) // 'Ondernemingsrechtbank Gent - afdeling Brugge'
formatCourtName(getCourt('enterprise-court-gent-brugge'), 'fr') // "Tribunal de l'entreprise de Gand - division Bruges"
```

### `formatPhoneNumber(e164)`

```ts
function formatPhoneNumber(e164: string): string
```

A Belgian number in its national written form. Throws a `RangeError` for anything that isn't a
Belgian number in E.164 form.

```ts
formatPhoneNumber('+3292343210') // '09 234 32 10'
formatPhoneNumber('+3253820701') // '053 82 07 01'
formatPhoneNumber('+32470123456') // '0470 12 34 56'
```

### `formatIban(iban)`

```ts
function formatIban(iban: string): string
```

```ts
formatIban('BE73679200844560') // 'BE73 6792 0084 4560'
```

## Competence

Questions that combine datasets. They're in the package root only, since they need both the
territory and the courts.

### `findJusticesOfThePeace(municipalityId)`

```ts
function findJusticesOfThePeace(municipalityId: string): CantonCourt[]

interface CantonCourt {
    canton: Canton
    court: JusticeOfThePeace | undefined // not in the data yet: see the known gaps
    partial: boolean // the canton covers only part of the municipality
}
```

The justices of the peace for a municipality: one for most municipalities, several for a city
split over cantons, where the street address decides and each canton's `territory` says which
part it covers.

```ts
findJusticesOfThePeace('44088')
// [{ canton: { id: 'merelbeke-melle', … }, court: { id: 'justice-of-the-peace-merelbeke-melle', … }, partial: false }]

findJusticesOfThePeace('44021').map((c) => c.canton.id) // ['gent-1', 'gent-2', 'gent-3', 'gent-4', 'gent-5']
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
local calendar day; a string must start with a valid `YYYY-MM-DD` day (an ISO timestamp is
fine, its time is ignored).

Throws a `RangeError` for anything else: `'2013-1-15'`, `'15/01/2013'`, `'2013-02-30'` or an
invalid `Date`. A missing rate is `null`; a malformed day is an error, so the two can't be
confused.

`contractAfter20130316` only matters for commercial interest between 2013 and 15 March 2015; by
default the rate for older contracts is used. See [interest rates](/data/interest-rates#the-2013-2015-contract-rule).

### `getLatestKnownRateDate(type)`

```ts
function getLatestKnownRateDate(type: InterestType): string
```

The last day for which a rate is on file, `YYYY-MM-DD`.

## Datasets

The full datasets, typed:

| Export            | Type                                                 |
| ----------------- | ---------------------------------------------------- |
| `judicialAreas`   | `readonly JudicialArea[]`                            |
| `arrondissements` | `readonly Arrondissement[]`                          |
| `cantons`         | `readonly Canton[]`                                  |
| `municipalities`  | `readonly Municipality[]`                            |
| `courts`          | `readonly Court[]`                                   |
| `interestRates`   | `Readonly<Record<InterestType, InterestRateSeries>>` |

## Types

| Type                                                                                                                              | Described on                                    |
| --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `JudicialAreaId`, `ArrondissementId`, `CantonId`, `MunicipalityId`, `CourtId`: unions of the ids in the data, regenerated with it | [Identifiers](/guide/identifiers#in-typescript) |
| `Locale` = `'nl' \| 'fr' \| 'de'`                                                                                                 |                                                 |
| `SourceRef` = `{ url: string; retrieved: string }`: where a record's data comes from                                              | [Data quality](/guide/data-quality)             |
| `Translated` = `Record<Locale, string>`                                                                                           |                                                 |
| `Bilingual` = `Record<'nl' \| 'fr', string>`: names as the Judicial Code gives them                                               |                                                 |
| `JudicialArea`, `Arrondissement`, `Canton`, `Municipality`                                                                        | [Territory](/data/territory)                    |
| `Court`, `CourtType`, `JusticeOfThePeace`, `EnterpriseCourtDivision`, `Address`, `Contact`, `ContactLabel`, `CantonCourt`         | [Courts](/data/courts#shape)                    |
| `InterestType`, `InterestRatePeriod`, `InterestRateSeries`, `InterestRateResult`                                                  | [Interest rates](/data/interest-rates#shape)    |
