# be-legal-data

Belgian legal reference data as JSON and CSV, with TypeScript types and helpers: every court
with its registries' contacts, prisons, houses of justice, judicial cantons and arrondissements,
municipalities, and the legal and commercial interest rates. Every record says where it comes
from, and the scraped data is rebuilt from the official sources every week.

Documentation, with a canton lookup, a court list and interest-rate tables:
**https://pieterjanscheir.github.io/be-legal-data/**

It's reference data, not legal advice: check the official sources before relying on it.

## What's in it

| File                                                         | Contents                                                                                                                                                                                                                                                                                                     | Source                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------- |
| [`data/judicial-areas.json`](data/judicial-areas.json)       | The 5 judicial areas (courts of appeal)                                                                                                                                                                                                                                                                      | Judicial Code, annex art. 5                         |
| [`data/arrondissements.json`](data/arrondissements.json)     | The 12 judicial arrondissements and their judicial area                                                                                                                                                                                                                                                      | Judicial Code, annex art. 4                         |
| [`data/cantons.json`](data/cantons.json)                     | All 162 judicial cantons: name, seat, municipalities, the legal description of their area, and its ELI                                                                                                                                                                                                       | Judicial Code, annex art. 1 (generated)             |
| [`data/canton-boundaries.json`](data/canton-boundaries.json) | The boundary of every canton as GeoJSON geometry (WGS 84), to find the canton of a point in a split city                                                                                                                                                                                                     | NGI, geo.be (fetched weekly)                        |
| [`data/municipalities.json`](data/municipalities.json)       | The 565 municipalities with REFNIS code and province                                                                                                                                                                                                                                                         | Statbel (generated)                                 |
| [`data/courts.json`](data/courts.json)                       | Every court, division and seat: every justice of the peace, police court, court of first instance, enterprise and labour court, court of appeal, labour court of appeal and court of assize, with names as published, addresses, registries' contacts, opening hours, ECLI codes and the cantons each covers | tribunaux-rechtbanken.be (scraped weekly)           |
| [`data/prisons.json`](data/prisons.json)                     | Every prison and detention house, names in three languages                                                                                                                                                                                                                                                   | justitie.belgium.be (scraped weekly)                |
| [`data/houses-of-justice.json`](data/houses-of-justice.json) | The houses of justice of the Flemish (with OVO number) and French Communities                                                                                                                                                                                                                                | vlaanderen.be, maisonsdejustice.be (scraped weekly) |
| [`data/interest-rates.json`](data/interest-rates.json)       | Legal interest rate (per year, since 1970) and commercial-transaction rate (per semester, since 2002)                                                                                                                                                                                                        | FOD Financiën / Belgisch Staatsblad                 |

The official sources are the truth; the files in `data/` are built from them. Every file has a
[JSON Schema](schema/), and [`datapackage.json`](datapackage.json) lists each dataset's sources,
licence, coverage and when it was last checked. Each [release](https://github.com/pieterjanscheir/be-legal-data/releases)
has the data as JSON and CSV in one zip.

Planned: the highest courts, history before 2025, bailiffs, police zones and the cadastre
offices. See the [roadmap](https://pieterjanscheir.github.io/be-legal-data/data/roadmap).

Municipality data © Statbel, canton boundaries © National Geographic Institute (NGI), both
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Using it

### TypeScript / JavaScript

```bash
pnpm add be-legal-data
```

ESM with TypeScript types and no runtime dependencies. Node 22.12 or later (where `require()`
loads it too), Deno, Bun and browsers. Design choices are explained in
[design decisions](https://pieterjanscheir.github.io/be-legal-data/guide/design).

```ts
import {
    getCourt,
    getContact,
    findCourts,
    getJusticeOfThePeace,
    getCantonsForMunicipality,
    findCompetentCourts,
    getInterestRate,
} from 'be-legal-data'

getCourt('court-of-appeal-brussel').name // { nl: 'Hof van Beroep Brussel', fr: "Cour d'appel de Bruxelles" }
getContact(getCourt('court-of-appeal-liege'), 'email', 'Greffe pénal') // 'liege.ca.greffepenal@just.fgov.be'
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })

const [canton] = getCantonsForMunicipality('44088') // merelbeke-melle
getJusticeOfThePeace(canton.id).address // where to file
getCantonsForMunicipality('44021', { on: '2025-09-15' }) // Gent 1–5 on that day: a split city
findCantonsAt(3.7268, 51.053) // [gent-1]: the canton of a point (be-legal-data/canton-boundaries)
findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde]: which court, by REFNIS code

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

`getInterestRate` returns `null` for a day with no rate on file, so callers can warn instead of
silently using 0 %. Malformed days, and days before a dataset's coverage, throw a `RangeError`.

Import a single dataset to keep bundles small: `be-legal-data/interest-rates`,
`be-legal-data/courts`, `be-legal-data/prisons`, `be-legal-data/houses-of-justice`,
`be-legal-data/territory`. The canton boundaries (a million positions of GeoJSON) are only in
`be-legal-data/canton-boundaries`; the root never loads them.

The raw files are also exported: `import courts from 'be-legal-data/data/courts.json' with { type: 'json' }`.

### Python, spreadsheets and anything else

Read the JSON files in `data/` directly: from the npm package, a git submodule, or a raw URL
pinned to a tag (`https://raw.githubusercontent.com/pieterjanscheir/be-legal-data/v0.3.0/data/cantons.json`).
For spreadsheets, take the CSV tables from a [release](https://github.com/pieterjanscheir/be-legal-data/releases).

## How the data is kept up to date

Every Monday the [sources workflow](.github/workflows/sources.yml) fetches every page of the
official sources, keeps them as snapshots on the [`sources`](../../tree/sources) branch, rebuilds
the courts, prisons, houses of justice and canton boundaries from them, tests the result, and
opens a pull request when anything changed. A [freshness check](.github/workflows/freshness.yml) opens an issue when a
new interest rate is missing, a dataset is overdue for review or a source is gone.

```bash
pnpm fetch:sources   # the official sources into .sources/
pnpm build:data      # rebuild the scraped datasets from them
pnpm build:cantons   # rebuild cantons and municipalities from the law and Statbel
pnpm check           # everything CI runs
```

See [CONTRIBUTING.md](CONTRIBUTING.md) and the
[data quality](https://pieterjanscheir.github.io/be-legal-data/guide/data-quality) page.

### Releasing

Ids are public API, so versions follow these rules: adding data is a minor version, fixing a
value is a patch, and removing or renaming an id is a major version.

1. Move the Unreleased entries in `CHANGELOG.md` under the new version.
2. Bump `version` in `package.json` and commit.
3. Tag it and push: `git tag v0.3.0 && git push && git push --tags`.

The [release workflow](.github/workflows/release.yml) runs `pnpm check`, publishes the tag to
npm with provenance and creates a GitHub release with the data, schemas and CSV tables. The tag
has to match `version`.

## Known gaps

See [known gaps](https://pieterjanscheir.github.io/be-legal-data/data/known-gaps). The main ones:
the highest courts aren't on the courts' portal yet, history before 1 January 2025 isn't in the
data (lookups for earlier days throw), and split cities need the address's coordinates to pick a
canton.

## Licence

The code is [MIT](LICENSE). The data in `data/` is [CC BY 4.0](LICENSE-DATA): reuse it freely,
including commercially, with credit to this project and to the sources listed there.
