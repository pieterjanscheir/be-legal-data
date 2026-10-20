# Changelog

All notable changes to this package. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow the
[id rules](https://pieterjanscheir.github.io/be-legal-data/guide/identifiers): adding data is a
minor version, fixing a value a patch, removing or renaming an id a major version.

## [Unreleased]

### Changed

**New identifiers (breaking).** Every id now follows one rule: an official code where one exists, otherwise lowercase
kebab-case from the local-language name. See
[identifiers](https://pieterjanscheir.github.io/be-legal-data/guide/identifiers). The package
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
- A justice of the peace links to its canton through a new `canton` field (the canton id). Its
  canton number, which was in `canton`, is now `number`. `getJusticeOfThePeace` follows the link
  instead of building an id.
- A canton's `source` (the article of the annex) is now `legalBasis`, so it isn't confused with
  the `sources` (URLs) on other records.

**Other changes.**

- `getInterestRate` throws a `RangeError` for a string that isn't a valid `YYYY-MM-DD` day and
  for an invalid `Date`. Before, `'2013-1-15'` silently returned the second semester's rate
  (7.5 % instead of 8 %), and other malformed input returned `null` as if no rate were on file.
- The exported datasets are typed `readonly`, so TypeScript flags code that modifies the shared
  data. Copy an array before sorting or changing it.
- Lookups by id use an index instead of a linear search.
- `package.json` declares `"sideEffects": false`, so bundlers can drop unused datasets.

### Added

- Generated id types (`CantonId`, `CourtId`, `MunicipalityId`, `ArrondissementId`,
  `JudicialAreaId`). Lookups with a known id return the record without `undefined`; the JSON
  Schemas list the valid ids, so a dangling link fails validation.

- Entry points per dataset: `be-legal-data/territory`, `be-legal-data/courts` and
  `be-legal-data/interest-rates`. Importing only the interest rates no longer bundles the
  canton texts (12 KB instead of 250 KB).
- `getJusticeOfThePeace(cantonId)`.
- JSON Schemas for every data file (`schema/`, also published on the documentation site).
- `datapackage.json`: a Frictionless Data Package descriptor with sources, licences and review
  dates for every dataset.
- Optional `website` and `sources` fields on courts, and a shared `SourceRef` type.
- Weekly freshness check that opens an issue when a rate is missing, a dataset is overdue for
  review, a source URL is dead, or the Judicial Code or Statbel data changed.

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

[Unreleased]: https://github.com/pieterjanscheir/be-legal-data/compare/72889e0...HEAD
[0.2.0]: https://github.com/pieterjanscheir/be-legal-data/commit/72889e0
[0.1.0]: https://github.com/pieterjanscheir/be-legal-data/commit/c113197
