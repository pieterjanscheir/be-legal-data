# API reference

Everything is exported from the package root, and each dataset also has its own entry point:

```ts
import { getCanton, getInterestRate /* … */ } from 'belgica'

// Only what you use: the interest rates alone are a few kilobytes
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt, getJusticeOfThePeace } from 'belgica/courts'
import { getCanton, getCantonsForMunicipality } from 'belgica/territory'
import { findCantonsAt } from 'belgica/canton-boundaries'
import { getPrison } from 'belgica/prisons'
import { getHouseOfJustice } from 'belgica/houses-of-justice'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

| Entry point                    | Contents                                                                     |
| ------------------------------ | ---------------------------------------------------------------------------- |
| `belgica`                      | Everything below, except the canton boundaries                               |
| `belgica/territory`            | Judicial areas, arrondissements, cantons, municipalities, provinces, regions |
| `belgica/canton-boundaries`    | The cantons' geometry, and `findCantonsAt`                                   |
| `belgica/courts`               | Courts, and the contact helpers                                              |
| `belgica/prisons`              | Prisons, and the contact helpers                                             |
| `belgica/houses-of-justice`    | Houses of justice, and the contact helpers                                   |
| `belgica/interest-rates`       | Interest rates                                                               |
| `belgica/postal-codes`         | Postal codes, with the municipalities they belong to                         |
| `belgica/data/*.json`          | The raw data files                                                           |
| `belgica/schema/*.schema.json` | [JSON Schemas](/guide/schema)                                                |
| `belgica/datapackage.json`     | [Data package descriptor](/guide/schema#datapackage-json)                    |

Conventions:

- Lookups by id return `undefined` when nothing matches; list functions return an empty array.
- Functions only throw for invalid input: a malformed day, or a day before the data's
  coverage (`RangeError`). Never for missing data.
- Every lookup takes an optional day, `{ on: '2025-06-01' }` or a `Date`, and answers for
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
getMunicipality('44021').province // '40000'
getMunicipality('21004').province // '04000': Brussels has no province, this is the region's code
```

### `getRegion(id)`

```ts
function getRegion(id: RegionId): Region
function getRegion(id: string, options?: OnDay): Region | undefined
```

```ts
getRegion('02000').name.fr // 'Région flamande'
```

### `getProvince(id)`

```ts
function getProvince(id: ProvinceId): Province
function getProvince(id: string, options?: OnDay): Province | undefined
```

```ts
getProvince('40000').name.nl // 'Provincie Oost-Vlaanderen'
getProvince('40000').region // '02000'
getProvince('04000') // undefined: the Brussels-Capital Region is not a province
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

### `getProvinceForMunicipality(id)`

```ts
function getProvinceForMunicipality(id: string, options?: OnDay): Province | undefined
```

The province a municipality lies in, by REFNIS code. `undefined` for the 19 municipalities of
the Brussels-Capital Region, which has no province, and for an unknown code.

```ts
getProvinceForMunicipality('44021')?.id // '40000'
getProvinceForMunicipality('21004') // undefined: Brussel
```

### `getRegionForMunicipality(id)`

```ts
function getRegionForMunicipality(id: string, options?: OnDay): Region | undefined
```

```ts
getRegionForMunicipality('21004')?.name.nl // 'Brussels Hoofdstedelijk Gewest'
```

## Canton boundaries

Only in `belgica/canton-boundaries`: the geometry is about a million positions, so the
package root doesn't re-export it (the types it does). See the
[data page](/data/canton-boundaries).

### `findCantonsAt(longitude, latitude)`

```ts
function findCantonsAt(longitude: number, latitude: number, options?: OnDay): Canton[]
```

The cantons whose boundary holds a point, on a day (today by default). Longitude first, then
latitude, in decimal degrees (WGS 84), as GeoJSON orders them. One canton for a point in
Belgium; none outside it; two for a point on the line between two cantons. Throws a
`RangeError` for coordinates that aren't finite numbers.

```ts
findCantonsAt(3.7268, 51.053).map((c) => c.id) // ['gent-1']: Sint-Baafskathedraal
findCantonsAt(2.3522, 48.8566) // []: Paris
```

### `getCantonBoundary(cantonId)`

```ts
function getCantonBoundary(id: CantonId): CantonBoundary
function getCantonBoundary(id: string, options?: OnDay): CantonBoundary | undefined
```

```ts
getCantonBoundary('gent-1').geometry.type // 'MultiPolygon'
```

## Courts

### `getCourt(id)`

```ts
function getCourt(id: CourtId): Court
function getCourt(id: string, options?: OnDay): Court | undefined
```

A court, division or seat. Ids are the court `type` followed by the place:
`justice-of-the-peace-gent-1`, `police-court-brussel-fr`, `enterprise-court-gent-brugge`.

```ts
getCourt('court-of-appeal-brussel').name // { nl: 'Hof van Beroep Brussel', fr: "Cour d'appel de Bruxelles" }
```

### `getJusticeOfThePeace(cantonId)`

```ts
function getJusticeOfThePeace(cantonId: CantonId): Court
function getJusticeOfThePeace(cantonId: string, options?: OnDay): Court | undefined
```

The justice of the peace of a canton. Every canton has one. A justice of the peace that sits in
several places (Philippeville, in Couvin and Florennes) has no address or contacts of its own:
its seats have them, see `getDivisions`.

```ts
const [canton] = getCantonsForMunicipality('44088')
getJusticeOfThePeace(canton.id).address // Merelbeke-Melle's court
```

### `getDivisions(courtId)`

```ts
function getDivisions(courtId: string, options?: OnDay): Court[]
```

A court's divisions, or the seats of a justice of the peace that sits in several places, on a
day (today by default); empty for a court without.

```ts
getDivisions('labour-court-gent').map((c) => c.id) // ['labour-court-gent-aalst', …]
```

### `getCourtsForCanton(cantonId)`

```ts
function getCourtsForCanton(cantonId: string, options?: OnDay): Court[]
```

The courts whose area holds a canton on a day (today by default): its justice of the peace and,
of each other type, the court that covers it (the court as a whole, not its divisions); in
Brussels both language courts of a type. Empty for an unknown canton.

```ts
getCourtsForCanton('gent-1').map((c) => c.id)
// ['court-of-appeal-gent', 'court-of-assize-oost-vlaanderen', 'court-of-first-instance-oost-vlaanderen', …]
```

### `findCourts(filter)`

```ts
function findCourts(
    filter: {
        type?: CourtType
        kind?: 'court' | 'division' | 'seat'
        arrondissement?: string
        judicialArea?: string
    },
    options?: OnDay,
): Court[]
```

The courts that match every given filter and apply on a day (today by default); an empty
filter returns every court of that day.

```ts
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' }) // its divisions there
findCourts({ type: 'court-of-appeal' }) // the five courts of appeal
```

### `formatCourtName(court, locale, options?)`

```ts
function formatCourtName(
    court: Court,
    locale: Locale,
    options?: { style?: 'official' | 'canton' },
): string
```

A court's name in one language. `style: 'official'` (the default) gives the name as the court
publishes it, from `name`. A court that doesn't publish in `locale` gives its name in another
language: for Dutch, French then German; for French, Dutch then German; for German, French then
Dutch. Each court publishes in its own language, so that is what you get.

`style: 'canton'` gives a justice of the peace a label built from its canton's number and name,
the same in every language. **It is a display label, not the court's official name**: use
`'official'` where the name has legal weight. Any other court, and a seat of a justice of the
peace, gets its official name, so a list of mixed courts can use one style. The cantons have no
German names yet: German uses the canton's name in the court's own language (French in Brussels
and the German-speaking area).

```ts
const court = getCourt('justice-of-the-peace-gent-1')
formatCourtName(court, 'fr') // 'Vredegerecht Gent 1': the court publishes in Dutch only
formatCourtName(court, 'nl', { style: 'canton' }) // 'Vredegerecht 1e kanton Gent'
formatCourtName(court, 'fr', { style: 'canton' }) // 'Justice de paix 1er canton Gand'
formatCourtName(court, 'de', { style: 'canton' }) // 'Friedensgericht 1. Kanton Gent'
formatCourtName(getCourt('justice-of-the-peace-deinze'), 'fr', { style: 'canton' }) // 'Justice de paix canton Deinze'
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
function getPrison(id: string, options?: OnDay): Prison | undefined
```

```ts
getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
```

## Houses of justice

### `getHouseOfJustice(id)`

```ts
function getHouseOfJustice(id: HouseOfJusticeId): HouseOfJustice
function getHouseOfJustice(id: string, options?: OnDay): HouseOfJustice | undefined
```

```ts
getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
```

## Postal codes

### `getPostalCode(id)`

```ts
function getPostalCode(id: PostalCodeId): PostalCode
function getPostalCode(id: string, options?: OnDay): PostalCode | undefined
```

A record by id: the postal code and the REFNIS code joined, `'9000-44021'`.

### `getMunicipalitiesForPostalCode(postalCode)`

```ts
function getMunicipalitiesForPostalCode(postalCode: string, options?: OnDay): Municipality[]
```

The municipalities a postal code belongs to on a day (today by default): one for almost every
code; two for `1040`, `1050` and `1804`, where the street decides. The same `Municipality`
records `getMunicipality` gives. Empty for an unknown code.

```ts
getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('0000') // []
```

### `getPostalCodes(municipalityId)`

```ts
function getPostalCodes(municipalityId: string, options?: OnDay): PostalCode[]
```

The postal codes of a municipality on a day (today by default), by REFNIS code, in order. Empty
for an unknown code.

```ts
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]
```

## Competence

Questions that combine datasets. They're in the package root only, since they need both the
territory and the courts.

### `findCompetentCourts(municipalityId, type)`

```ts
function findCompetentCourts(municipalityId: string, type: CourtType, options?: OnDay): Court[]
```

The courts of a type competent for a municipality on a day (today by default), by REFNIS code:
the courts whose area, as the law sets it (`cantons`), holds one of the municipality's cantons.
One court for most municipalities; in Brussels the Dutch- and the French-speaking court; for a
city split over cantons, every justice of the peace that serves one of them. It gives the court
as a whole: which of its divisions hears a case is set by royal decree and isn't in the data
yet, so pick among `getDivisions(court.id)`. Empty for an unknown code.

```ts
findCompetentCourts('23088', 'police-court').map((c) => c.id) // ['police-court-vilvoorde']
findCompetentCourts('21004', 'court-of-first-instance').map((c) => c.id)
// ['court-of-first-instance-brussel-fr', 'court-of-first-instance-brussel-nl']
findCompetentCourts('44021', 'labour-court').map((c) => c.id) // ['labour-court-gent']
```

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

### `findCourtsForPostalCode(postalCode, type)`

```ts
function findCourtsForPostalCode(
    postalCode: string,
    type: CourtType,
    options?: OnDay,
): PostalCodeCourts[]

interface PostalCodeCourts {
    municipality: Municipality
    justicesOfThePeace: CantonCourt[] // findJusticesOfThePeace(municipality.id)
    courts: Court[] // findCompetentCourts(municipality.id, type)
}
```

The courts for a postal code on a day (today by default), per municipality: the postal code
gives the municipality ([postal codes](/data/postal-codes)), the municipality its justices of the
peace and its courts of the type asked for. One entry for almost every code; two for `1040`,
`1050` and `1804`, which belong to two municipalities, so the answer is never collapsed to one
of them. Empty for an unknown code. In a city split over cantons the street still decides
between the justices of the peace, as with `findJusticesOfThePeace`.

```ts
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: { id: '44021', … }, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
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

Every record has a validity period, and every lookup takes a day. The helpers are exported for
your own records.

```ts
interface Validity {
    validFrom?: string // first day, YYYY-MM-DD; none: since before the coverage
    validTo?: string // last day; none: still applies
}

interface OnDay {
    on?: Date | string // today by default; a Date is read as a local day
}

const territoryCoverage: { from: '2025-01-01' }
const courtsCoverage: { from: '2025-01-01' }
const prisonsCoverage: { from: '2026-10-20' }
const housesOfJusticeCoverage: { from: '2026-10-20' }
const postalCodesCoverage: { from: '2025-01-01' }

function appliesOn(record: Validity, day: string): boolean
function toDay(date: Date | string): string // 'YYYY-MM-DD', or a RangeError
```

Each dataset says from which day it describes the situation; a lookup for an earlier day
throws a `RangeError` rather than answer with today's map. The territory and the list of courts
follow from the law as amended for 1 January 2025; prisons and houses of justice are known from
the day their sites were first read. Earlier versions are planned
([#27](https://github.com/pieterjanscheir/belgica/issues/27)).

The exported arrays (`courts`, `prisons`, …) hold every version of every record. A record the
source stops listing isn't deleted: it keeps its id and gets a `validTo`, the day before the
weekly check that missed it. One the source starts listing gets a `validFrom`. So a lookup by id
without a day returns today's version, or the last version of a record that has ended: check
`validTo` before you file something there.

## Datasets

The full datasets, typed:

| Export            | Type                                                 |
| ----------------- | ---------------------------------------------------- |
| `judicialAreas`   | `readonly JudicialArea[]`                            |
| `arrondissements` | `readonly Arrondissement[]`                          |
| `cantons`         | `readonly Canton[]`                                  |
| `regions`         | `readonly Region[]`                                  |
| `provinces`       | `readonly Province[]`                                |
| `municipalities`  | `readonly Municipality[]`                            |
| `courts`          | `readonly Court[]`                                   |
| `prisons`         | `readonly Prison[]`                                  |
| `housesOfJustice` | `readonly HouseOfJustice[]`                          |
| `postalCodes`     | `readonly PostalCode[]`                              |
| `interestRates`   | `Readonly<Record<InterestType, InterestRateSeries>>` |

## Types

| Type                                                                                                                                                                                                        | Described on                                                           |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `JudicialAreaId`, `ArrondissementId`, `CantonId`, `RegionId`, `ProvinceId`, `MunicipalityId`, `CourtId`, `PrisonId`, `HouseOfJusticeId`, `PostalCodeId`: unions of the ids in the data, regenerated with it | [Identifiers](/guide/identifiers#in-typescript)                        |
| `Locale` = `'nl' \| 'fr' \| 'de'`                                                                                                                                                                           |                                                                        |
| `SourceRef` = `{ url: string; retrieved: string }`: where a record's data comes from                                                                                                                        | [Data quality](/guide/data-quality)                                    |
| `Translated` = `Record<Locale, string>`                                                                                                                                                                     |                                                                        |
| `Bilingual` = `Record<'nl' \| 'fr', string>`: names as the Judicial Code gives them                                                                                                                         |                                                                        |
| `JudicialArea`, `Arrondissement`, `Canton`, `Region`, `Province`, `Municipality`, `LegalBasis`, `Validity`, `OnDay`                                                                                         | [Territory](/data/territory)                                           |
| `Court`, `CourtType`, `CourtFilter`, `Address`, `Contact`, `ContactType`, `CantonCourt`                                                                                                                     | [Courts](/data/courts#shape)                                           |
| `PostalCode`, `PostalCodeCourts`                                                                                                                                                                            | [Postal codes](/data/postal-codes)                                     |
| `Prison`, `HouseOfJustice`                                                                                                                                                                                  | [Prisons](/data/prisons), [Houses of justice](/data/houses-of-justice) |
| `InterestType`, `InterestRatePeriod`, `InterestRateSeries`, `InterestRateResult`                                                                                                                            | [Interest rates](/data/interest-rates#shape)                           |
