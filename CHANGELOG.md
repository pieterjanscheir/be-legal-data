# Changelog

All notable changes to this package. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow the
[id rules](https://pieterjanscheir.github.io/belgica/guide/identifiers): adding data is a
minor version, fixing a value a patch, removing or renaming an id a major version.

## [Unreleased]

## [0.3.1] - 2026-10-21

### Fixed

The README said a day before a dataset's coverage throws a `RangeError`, right under
`getInterestRate`. `getInterestRate` returns `null` for any day without a rate, early days
included; only territory and court lookups throw for a day before their coverage. No code or
data changed.

## [0.3.0] - 2026-10-21

### Added

**Postal codes.** `data/postal-codes.json`: every Belgian postal code with the municipality it
belongs to, by REFNIS code, from Statbel's conversion table (CC BY 4.0): 1 152 records for 1 149
codes, since `1040`, `1050` and `1804` each belong to two municipalities. Ids are the two
official codes joined (`9000-44021`); every record carries a validity period read from the
table's own date, and the build fails when a code points at an unknown municipality or a
municipality has no code. Its own entry point, `belgica/postal-codes`, with
`getPostalCode`, `getMunicipalitiesForPostalCode`, `getPostalCodes` and `postalCodesCoverage`;
in the root, `findCourtsForPostalCode(postalCode, type)` chains a postal code to the justices
of the peace and the competent courts, per municipality, so a shared code is never resolved to
one of them. Sub-municipalities aren't in the data: bpost's list has them, but no REFNIS code
and no open licence
([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

**Addresses link to their municipality.** `address.municipality` on courts, prisons and houses
of justice holds the REFNIS code the postal code belongs to; for a shared code the published
city line decides between the two, and the field is left out when it names both (the justice
of the peace of Etterbeek, `1040 Brussel (Etterbeek)`). A test checks that every court sits in
its arrondissement, or its judicial area's; the one exception, the justice of the peace of
Limbourg with a temporary seat in Eupen, is named in the test
([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

**Canton boundaries** ([#29](https://github.com/pieterjanscheir/belgica/issues/29)).
`data/canton-boundaries.json` has the boundary of every canton as GeoJSON `MultiPolygon`
geometry in WGS 84, as the National Geographic Institute digitised it from the annex to the
Judicial Code (geo.be, CC BY 4.0), with the NGI's object id and canton code, fetched every week
with the other sources. One record per canton, keyed by the canton's id. The geometry is the
NGI's, unsimplified, to 7 decimals. A new entry point, `belgica/canton-boundaries`,
exports `cantonBoundaries`, `getCantonBoundary(cantonId)` and `findCantonsAt(lon, lat)`, the
cantons whose boundary holds a point: one for a point in Belgium, none outside it. The package
root doesn't re-export them: the file is 23 MB. The legal text in a canton's `territory` wins
where the geometry disagrees.

### Changed

**Renamed to `belgica` (breaking).** The package was `be-legal-data` up to 0.2.0; install
`belgica` and change the imports (`be-legal-data/courts` becomes `belgica/courts`). The data and
its ids are the same. The name leaves room for Belgian reference data beyond the legal kind.

**All courts, from the official source (breaking).** `data/courts.json` is now built every
week from the courts' portal, tribunaux-rechtbanken.be, instead of by hand: 347 courts,
divisions and seats instead of 46, and every canton has its justice of the peace.

- `Court` is one interface for every type of court: `type` adds `police-court`,
  `court-of-first-instance`, `labour-court`, `court-of-appeal`, `labour-court-of-appeal` and
  `court-of-assize`; `kind` says whether a record is a court, a division or a seat, and
  `court` links a division to its court. `JusticeOfThePeace` and `EnterpriseCourtDivision` are
  gone.
- `name` is the name as the court publishes it, in each language it has a page in
  (`Vredegerecht Gent 1`), instead of a place name. `seat` and `number` are gone.
  `formatCourtName` is removed: it built names, and the French ones were wrong.
- `arrondissement` is optional (courts of appeal cover a judicial area); every court has a
  `judicialArea`.
- Contacts are `phone`, `fax`, `email` or `bank-account`, with the registry they belong to as
  `label` and the text published with them as `note`. `ContactLabel` and `bankAccount` are
  gone: a court has a bank account per registry, as a contact.
- `address` is optional (a court whose divisions each have an address has none), keeps the
  street line as published, and has no `houseNumber`.
- New fields: `ecli` (the court's ECLI codes), `openingHoursText` (the hours as published, per
  language), `website` per language, and `sources` on every record.
- `getContact` takes any record with contacts and a free-text label.
- Most phone numbers changed: the courts moved to central `02 682` numbers. 21 bank accounts
  that were in the hand-made data aren't on the courts' pages any more and are gone.

**Time.** Every record carries a validity period (`validFrom`, `validTo`), every dataset says
from which day it describes the situation (`territoryCoverage` and `courtsCoverage`: 1 January
2025; `prisonsCoverage` and `housesOfJusticeCoverage`: 20 October 2026, when their sites were
first read), and every lookup takes an optional day: `getCantonsForMunicipality('44021', { on:
'2025-09-15' })`, `getCourt(id, { on })`, `findCourts(filter, { on })`, `getPrison(id, { on })`.
A day before the coverage throws a `RangeError`. The exported arrays hold every version of a
record; a lookup by id without a day gives today's version.

**Scraped records are retired, never deleted.** When a source stops listing a court, prison or
house of justice, the weekly build keeps its record with a `validTo` (the day before the check
that missed it) instead of removing it, and a record the source starts listing gets a
`validFrom`. Ids, once published, stay.

**Legal basis.** A canton's `legalBasis` is `{ url, provision }`: the annex's ELI link (numac
1967101058, not the Justel file number 1967101007) and the section.

**New identifiers (breaking).** Every id now follows one rule: an official code where one exists, otherwise lowercase
kebab-case from the local-language name. See
[identifiers](https://pieterjanscheir.github.io/belgica/guide/identifiers). The package
had no users yet, so this was done before 1.0 rather than carried forever.

- Judicial areas: `Antwerp` → `antwerpen`, `Brussels` → `brussel`, `Ghent` → `gent`, `Liege` → `liege`, `Mons` → `mons`.
- Arrondissements: `Antwerp` → `antwerpen`, `Limburg` → `limburg`, `Brussels` → `brussel`, `Leuven` → `leuven`, `WalloonBrabant` → `brabant-wallon`, `EastFlanders` → `oost-vlaanderen`, `WestFlanders` → `west-vlaanderen`, `Liege` → `liege`, `Eupen` → `eupen`, `Luxembourg` → `luxembourg`, `Namur` → `namur`, `Hainaut` → `hainaut`.
- Cantons: the same name, lowercase, words joined by hyphens, number as a suffix:
  `Gent1` → `gent-1`, `MerelbekeMelle` → `merelbeke-melle`, `BraineLAlleud` → `braine-l-alleud`,
  `EupenSanktVith1` → `eupen-sankt-vith-1`.
- Courts: the court `type` followed by the place: `VredegerechtGent1` →
  `justice-of-the-peace-gent-1`, `OndernemingsrechtbankGentBrugge` →
  `enterprise-court-gent-brugge`.
- Municipalities: the REFNIS code moves from `refnis` to `id`; a canton's
  `municipalities[].refnis` is now `municipalities[].municipality`.
- A justice of the peace links to its canton through a new `canton` field (the canton id).
  `getJusticeOfThePeace` follows the link instead of building an id.
- A canton's `source` (the article of the annex) is now `legalBasis`, so it isn't confused with
  the `sources` (URLs) on other records.

**Distribution (breaking).** ESM only, Node 22.12 or later (`require()` still loads it there).
The CommonJS build and `typesVersions` are gone, and `dist/` is no longer in git: install from
npm.

**Canonical data (breaking).** Court phone numbers are E.164 (`+3253820701`), IBANs are in
electronic format (`BE73679200844560`), e-mail addresses lowercase, and opening hours in
OpenStreetMap `opening_hours` syntax (`Mo-Fr 08:30-12:30,13:30-16:00`).

**Other changes.**

- `getInterestRate` throws a `RangeError` for a string that isn't a valid `YYYY-MM-DD` day and
  for an invalid `Date`. Before, `'2013-1-15'` silently returned the second semester's rate
  (7.5 % instead of 8 %), and other malformed input returned `null` as if no rate were on file.
- The exported datasets are typed `readonly`, so TypeScript flags code that modifies the shared
  data. Copy an array before sorting or changing it.
- Lookups by id use an index instead of a linear search.
- `package.json` declares `"sideEffects": false`, so bundlers can drop unused datasets.

### Added

- Regions and provinces as datasets: `data/regions.json` (the 3 regions) and
  `data/provinces.json` (the 10 provinces, each with its `region`), keyed by their Statbel
  REFNIS code, with the names in Dutch, French and German as Statbel's REFNIS code list gives
  them, built weekly from the snapshots of that list. Every municipality gains a `region`;
  `Municipality.province` is typed `ProvinceId | '04000'` instead of `string` (a narrowing: the
  values are unchanged, and the 19 municipalities of the Brussels-Capital Region, which has no
  province, keep `'04000'`, the region's code, as Statbel's files have it). New lookups
  `getRegion`, `getProvince`, `getProvinceForMunicipality` (`undefined` in Brussels) and
  `getRegionForMunicipality`, types `Region`, `Province`, `RegionId` and `ProvinceId`, and
  `regions.csv` and `provinces.csv` in the releases.
- The documentation site is available in Dutch (/nl/) and French (/fr/) next to English, with a
  language switcher. English is the source; the translations follow it.
- `ids.lock.json`: every id the package has published, per dataset. `pnpm generate` adds new
  ids and never removes one, and the tests fail when a locked id is missing from the data, so a
  record can't disappear or be renamed by accident. Removing an id is a deliberate act, for a
  major version.
- Every court other than a justice of the peace lists the cantons it covers (`cantons`), as the
  annex to the Judicial Code (art. 3–5) and art. 114 of the Code set them, from a law table in
  `scripts/parse/jurisdictions.ts` that the build checks against the portal both ways. A
  court's `arrondissement` now follows from its cantons: the courts of appeal and labour court
  of appeal of Mons and the court of assize of Brussels-Capital gain one, the court of assize
  of Liège, which covers Eupen too, loses it.
- `findCompetentCourts(municipalityId, type)`: which court of a type is competent for a
  municipality, including the Halle and Vilvoorde police courts and both language courts in
  Brussels; `getCourtsForCanton(cantonId)`; and a `court-cantons.csv` table in the releases.
- Prisons: the 39 prisons and detention houses, in `data/prisons.json` and
  `belgica/prisons`.
- Houses of justice: the 14 Flemish (with OVO number) and 13 French-speaking houses, in
  `data/houses-of-justice.json` and `belgica/houses-of-justice`.
- `getDivisions(courtId)`; `findCourts` filters by `kind` and `judicialArea` too.
- A weekly workflow that fetches the official sources, keeps snapshots on the `sources` branch,
  rebuilds the data and opens a pull request when it changed.
- CSV tables of all data, attached with the JSON and schemas to every GitHub release.

- `formatPhoneNumber` and `formatIban` for display, `getArrondissementForMunicipality`, and
  `findJusticesOfThePeace(municipalityId)`, which answers "which justice of the peace?" for a
  municipality, including split cities.
- Quality gates: strict TypeScript, ESLint (type-aware), Prettier, 100 % coverage, IBAN checksum
  and contact-format tests, type tests.
- A [design decisions](https://pieterjanscheir.github.io/belgica/guide/design) page.
- Generated id types (`CantonId`, `CourtId`, `MunicipalityId`, `ArrondissementId`,
  `JudicialAreaId`). Lookups with a known id return the record without `undefined`; the JSON
  Schemas list the valid ids, so a dangling link fails validation.

- Entry points per dataset: `belgica/territory`, `belgica/courts` and
  `belgica/interest-rates`. Importing only the interest rates no longer bundles the
  canton texts (12 KB instead of 250 KB).
- `getJusticeOfThePeace(cantonId)`.
- JSON Schemas for every data file (`schema/`, also published on the documentation site).
- `datapackage.json`: a Frictionless Data Package descriptor with sources, licences and review
  dates for every dataset.
- A shared `SourceRef` type.
- Weekly freshness check that opens an issue when a rate is missing, a dataset is overdue for
  review or a source URL is dead.

### Fixed

- The French name of the third canton of Brussels was `judicaire de Bruxelles`: a typo in the
  annex ("canton judicaire") broke the parser. It is now `Bruxelles`, and the generator corrects
  the typo.

## [0.2.0] - 2026-10-18

### Added

- Judicial areas, arrondissements, all 162 cantons and the 565 municipalities, generated from
  the annex to the Judicial Code and Statbel.
- Published on npm with provenance.

## [0.1.0] - 2026-10-05

### Added

- Courts (justices of the peace in East and West Flanders, Ondernemingsrechtbank Gent) and the
  legal and commercial interest rates.

[Unreleased]: https://github.com/pieterjanscheir/belgica/compare/v0.3.1...HEAD
[0.3.1]: https://github.com/pieterjanscheir/belgica/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/pieterjanscheir/belgica/compare/72889e0...v0.3.0
[0.2.0]: https://github.com/pieterjanscheir/belgica/commit/72889e0
[0.1.0]: https://github.com/pieterjanscheir/belgica/commit/c113197
