# API reference

Everything is exported from the package root, and each dataset also has its own entry point:

```ts
import { getCanton, getInterestRate /* … */ } from 'be-legal-data'

// Only what you use: 12 KB for the interest rates instead of everything
import { getInterestRate } from 'be-legal-data/interest-rates'
import { getCourt, getJusticeOfThePeace } from 'be-legal-data/courts'
import { getCanton, getCantonsForMunicipality } from 'be-legal-data/territory'
import { getPrison } from 'be-legal-data/prisons'
import { getHouseOfJustice } from 'be-legal-data/houses-of-justice'
```

| Entry point                          | Contents                                                  |
| ------------------------------------ | --------------------------------------------------------- |
| `be-legal-data`                      | Everything below                                          |
| `be-legal-data/territory`            | Judicial areas, arrondissements, cantons, municipalities  |
| `be-legal-data/courts`               | Courts, and the contact helpers                           |
| `be-legal-data/prisons`              | Prisons, and the contact helpers                          |
| `be-legal-data/houses-of-justice`    | Houses of justice, and the contact helpers                |
| `be-legal-data/interest-rates`       | Interest rates                                            |
| `be-legal-data/data/*.json`          | The raw data files                                        |
| `be-legal-data/schema/*.schema.json` | [JSON Schemas](/guide/schema)                             |
| `be-legal-data/datapackage.json`     | [Data package descriptor](/guide/schema#datapackage-json) |

Conventions:

- Lookups by id return `undefined` when nothing matches; list functions return an empty array.
- Functions only throw for invalid input: a malformed day, or a day before the data's
  coverage (`RangeError`). Never for missing data.
- Territory lookups take an optional day, `{ on: '2025-06-01' }` or a `Date`, and answer for
  today without one. A lookup by id always finds a known record: today's version, or the last
  one of a record that has ended. See [time](#time).
- Exported datasets are `readonly`: copy before sorting or changing (`[...courts].sort()`).
- A lookup with a known id (a literal like `'gent-1'`, or a value typed `CantonId`) returns the
  record itself, never `undefined`. Any other string returns `Record | undefined`.
  See [identifiers](/guide/identifiers).

## Territory

### `getJudicialArea(id)`

```ts
function getJudicialArea(id: JudicialAreaId): JudicialArea
function getJudicialArea(id: string, options?: OnDay): JudicialArea | undefined
```

### `getArrondissement(id)`

```ts
function getArrondissement(id: ArrondissementId): Arrondissement
function getArrondissement(id: string, options?: OnDay): Arrondissement | undefined
```

```ts
getArrondissement('oost-vlaanderen').name.fr // 'Flandre orientale'
```

### `getMunicipality(id)`

```ts
function getMunicipality(id: MunicipalityId): Municipality
function getMunicipality(id: string, options?: OnDay): Municipality | undefined
```

```ts
getMunicipality('44021').name // { nl: 'Gent', fr: 'Gand' }
```

### `getCanton(id)`

```ts
function getCanton(id: CantonId): Canton
function getCanton(id: string, options?: OnDay): Canton | undefined
```

```ts
getCanton('oudergem').seat.nl // 'Etterbeek'
getCanton('gent-1', { on: '2025-06-01' }) // the version of that day
getCanton('gent-1', { on: '2020-01-01' }) // RangeError: the data describes 2025-01-01 onwards
```

### `getCantonsForMunicipality(id)`

```ts
function getCantonsForMunicipality(id: string, options?: OnDay): Canton[]
```

The cantons that cover a municipality on a day, today by default. One canton for most municipalities; several for cities
that are split (Antwerpen, Gent, Brussel, …). Then the street address decides, and each canton's
`territory` describes its part.

```ts
getCantonsForMunicipality('44088').map((c) => c.id) // ['merelbeke-melle']
getCantonsForMunicipality('44021').map((c) => c.id) // ['gent-1', 'gent-2', 'gent-3', 'gent-4', 'gent-5']
```

### `getArrondissementForMunicipality(id)`

```ts
function getArrondissementForMunicipality(id: string, options?: OnDay): Arrondissement | undefined
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

A court, division or seat. Ids are the court `type` followed by the place:
`justice-of-the-peace-gent-1`, `police-court-brussel-fr`, `enterprise-court-gent-brugge`.

```ts
getCourt('court-of-appeal-brussel').name // { nl: 'Hof van Beroep Brussel', fr: "Cour d'appel de Bruxelles" }
```

### `getJusticeOfThePeace(cantonId)`

```ts
function getJusticeOfThePeace(cantonId: CantonId): Court
function getJusticeOfThePeace(cantonId: string): Court | undefined
```

The justice of the peace of a canton. Every canton has one.

```ts
const [canton] = getCantonsForMunicipality('44088')
getJusticeOfThePeace(canton.id).address // Merelbeke-Melle's court
```

### `getDivisions(courtId)`

```ts
function getDivisions(courtId: string): Court[]
```

A court's divisions, or the seats of a justice of the peace that sits in several places; empty
for a court without.

```ts
getDivisions('labour-court-gent').map((c) => c.id) // ['labour-court-gent-aalst', …]
```

### `findCourts(filter)`

```ts
function findCourts(filter: {
    type?: CourtType
    kind?: 'court' | 'division' | 'seat'
    arrondissement?: string
    judicialArea?: string
}): Court[]
```

The courts that match every given filter; an empty filter returns every court.

```ts
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' }) // its divisions there
findCourts({ type: 'court-of-appeal' }) // the five courts of appeal
```

## Contacts

In every entry point that has records with contacts: the root, `courts`, `prisons` and
`houses-of-justice`.

### `getContact(record, type, label?)`

```ts
function getContact(
    record: { contacts: readonly Contact[] },
    type: 'phone' | 'fax' | 'email' | 'bank-account',
    label?: string,
): string | undefined
```

The value of the first contact of that type, optionally with that label (the registry or
service, as the source names it).

```ts
getContact(getCourt('court-of-appeal-liege'), 'email', 'Greffe pénal')
// 'liege.ca.greffepenal@just.fgov.be'
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

## Prisons

### `getPrison(id)`

```ts
function getPrison(id: PrisonId): Prison
function getPrison(id: string): Prison | undefined
```

```ts
getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
```

## Houses of justice

### `getHouseOfJustice(id)`

```ts
function getHouseOfJustice(id: HouseOfJusticeId): HouseOfJustice
function getHouseOfJustice(id: string): HouseOfJustice | undefined
```

```ts
getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
```

## Competence

Questions that combine datasets. They're in the package root only, since they need both the
territory and the courts.

### `findJusticesOfThePeace(municipalityId)`

```ts
function findJusticesOfThePeace(municipalityId: string, options?: OnDay): CantonCourt[]

interface CantonCourt {
    canton: Canton
    court: Court
    partial: boolean // the canton covers only part of the municipality
}
```

The justices of the peace for a municipality on a day (today by default): one for most municipalities, several for a city
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

## Time

Territory records have a validity period, and territory lookups take a day. The helpers are
exported for your own records.

```ts
interface Validity {
    validFrom?: string // first day, YYYY-MM-DD; none: since before the coverage
    validTo?: string // last day; none: still applies
}

interface OnDay {
    on?: Date | string // today by default; a Date is read as a local day
}

const territoryCoverage: { from: '2025-01-01' }

function appliesOn(record: Validity, day: string): boolean
function toDay(date: Date | string): string // 'YYYY-MM-DD', or a RangeError
```

The territory data describes 1 January 2025 onwards; a lookup for an earlier day throws a
`RangeError` rather than answer with today's map. Earlier versions are planned
([#27](https://github.com/pieterjanscheir/be-legal-data/issues/27)).

## Datasets

The full datasets, typed:

| Export            | Type                                                 |
| ----------------- | ---------------------------------------------------- |
| `judicialAreas`   | `readonly JudicialArea[]`                            |
| `arrondissements` | `readonly Arrondissement[]`                          |
| `cantons`         | `readonly Canton[]`                                  |
| `municipalities`  | `readonly Municipality[]`                            |
| `courts`          | `readonly Court[]`                                   |
| `prisons`         | `readonly Prison[]`                                  |
| `housesOfJustice` | `readonly HouseOfJustice[]`                          |
| `interestRates`   | `Readonly<Record<InterestType, InterestRateSeries>>` |

## Types

| Type                                                                                                                                                              | Described on                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `JudicialAreaId`, `ArrondissementId`, `CantonId`, `MunicipalityId`, `CourtId`, `PrisonId`, `HouseOfJusticeId`: unions of the ids in the data, regenerated with it | [Identifiers](/guide/identifiers#in-typescript)                        |
| `Locale` = `'nl' \| 'fr' \| 'de'`                                                                                                                                 |                                                                        |
| `SourceRef` = `{ url: string; retrieved: string }`: where a record's data comes from                                                                              | [Data quality](/guide/data-quality)                                    |
| `Translated` = `Record<Locale, string>`                                                                                                                           |                                                                        |
| `Bilingual` = `Record<'nl' \| 'fr', string>`: names as the Judicial Code gives them                                                                               |                                                                        |
| `JudicialArea`, `Arrondissement`, `Canton`, `Municipality`, `LegalBasis`, `Validity`, `OnDay`                                                                     | [Territory](/data/territory)                                           |
| `Court`, `CourtType`, `CourtFilter`, `Address`, `Contact`, `ContactType`, `CantonCourt`                                                                           | [Courts](/data/courts#shape)                                           |
| `Prison`, `HouseOfJustice`                                                                                                                                        | [Prisons](/data/prisons), [Houses of justice](/data/houses-of-justice) |
| `InterestType`, `InterestRatePeriod`, `InterestRateSeries`, `InterestRateResult`                                                                                  | [Interest rates](/data/interest-rates#shape)                           |
