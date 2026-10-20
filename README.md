# be-legal-data

Belgian legal reference data as JSON, with TypeScript types and helpers: courts, judicial
cantons and arrondissements, municipalities, and the legal and commercial interest rates.
Every dataset records where it comes from.

Documentation, with a canton lookup and interest-rate tables: **https://pieterjanscheir.github.io/be-legal-data/**

It's reference data, not legal advice: check the official sources before relying on it.

## What's in it

| File                                                     | Contents                                                                                              | Source                               |
| -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [`data/judicial-areas.json`](data/judicial-areas.json)   | The 5 judicial areas (courts of appeal)                                                               | Ger.W. bijvoegsel art. 5             |
| [`data/arrondissements.json`](data/arrondissements.json) | The 12 judicial arrondissements and their judicial area                                               | Ger.W. bijvoegsel art. 4             |
| [`data/cantons.json`](data/cantons.json)                 | All 162 judicial cantons: name, seat, municipalities, and the legal description of their area         | Ger.W. bijvoegsel art. 1 (generated) |
| [`data/municipalities.json`](data/municipalities.json)   | The 565 municipalities with REFNIS code and province                                                  | Statbel (generated)                  |
| [`data/courts.json`](data/courts.json)                   | Justices of the peace in East and West Flanders, and the divisions of the Ondernemingsrechtbank Gent  | Court websites, just.fgov.be         |
| [`data/interest-rates.json`](data/interest-rates.json)   | Legal interest rate (per year, since 1970) and commercial-transaction rate (per semester, since 2002) | FOD Financiën / Belgisch Staatsblad  |

The JSON files are the source of truth. The TypeScript in `src/` only adds types and helpers.
Every file has a [JSON Schema](schema/), and [`datapackage.json`](datapackage.json) lists each
dataset's sources, licence and when it was last checked.

Coming next: the remaining courts, prisons, houses of justice, bailiffs, police zones and the
cadastre offices. See the [roadmap](https://pieterjanscheir.github.io/be-legal-data/data/roadmap).

Municipality data © Statbel, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

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

`getInterestRate` returns `null` for a day with no rate on file, so callers can warn instead of
silently using 0 %, and throws a `RangeError` for a malformed day. `getLatestKnownRateDate(type)`
gives the last day that is covered.

Import a single dataset to keep bundles small: `be-legal-data/interest-rates`,
`be-legal-data/courts`, `be-legal-data/territory`.

The raw files are also exported: `import courts from 'be-legal-data/data/courts.json' with { type: 'json' }`.

### Python and anything else

Read the JSON files in `data/` directly: from the npm package, a git submodule, or a raw URL
pinned to a tag (`https://raw.githubusercontent.com/pieterjanscheir/be-legal-data/v0.2.0/data/cantons.json`).

## Updating data

1. Edit the JSON in `data/`. Keep the existing ids: projects store them.
2. `pnpm check`: regenerate the id types and schemas, typecheck, lint, build, tests with
   coverage, the built-package smoke tests and package lint. It fails when the generated files
   (`schema/`, `src/ids.generated.ts`) aren't committed.
3. Add a line to [`CHANGELOG.md`](CHANGELOG.md) and commit, including the generated files. The
   build output isn't committed: releases build it.

A [weekly freshness check](.github/workflows/freshness.yml) opens an issue when a new interest
rate is missing, a dataset is overdue for review, a source URL is dead, or the Judicial Code or
Statbel data changed. See [CONTRIBUTING.md](CONTRIBUTING.md) for adding a dataset.

### Releasing

Ids are public API, so versions follow these rules: adding data is a minor version, fixing a
value is a patch, and removing or renaming an id is a major version.

1. Move the Unreleased entries in `CHANGELOG.md` under the new version.
2. Bump `version` in `package.json` and commit.
3. Tag it and push: `git tag v0.3.0 && git push && git push --tags`.

The [release workflow](.github/workflows/release.yml) runs `pnpm check`, publishes the tag to
npm with provenance and creates a GitHub release. The tag has to match `version`.

### Cantons and municipalities

`data/cantons.json` and `data/municipalities.json` are generated; don't edit them by hand. Run
`pnpm build:cantons` (needs network access and `unzip`). It reads:

- the annex to the Judicial Code, "Gebiedsomschrijving en zetel van hoven en rechtbanken"
  ([Justel 1967101007](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  in Dutch and French;
- Statbel's population-by-municipality file for the current municipalities and REFNIS codes.

It parses the Dutch and French texts separately and refuses to write anything unless they agree
and every municipality is covered exactly once (or split over several cantons). Exonyms the
annex uses but Statbel doesn't (`Gembloers`, `Saint-Nicolas`, …), typos in the annex, and
boundary mentions it can't tell apart are listed at the top of the script.

Rerun it after a law changes the annex or municipalities merge. Canton ids follow the local
language (Dutch in Flanders and Brussels, French in Wallonia, German around Eupen); the justice
of the peace of canton `x` has id `justice-of-the-peace-x` and links to it through its `canton` field.

### New interest rates

- **Commercial**: FOD Financiën publishes the rate per semester. Add a period with `from`, `to`,
  `rate`, and the Staatsblad date in `note`.
- **Legal**: published per calendar year. Add a period for the year.

### Documentation site

The site in `docs/` is built with VitePress and deployed to GitHub Pages on every push to `main`.
Run it locally with `pnpm docs:dev`.

## Known gaps

- Courts only cover East and West Flanders so far: justices of the peace and the
  Ondernemingsrechtbank Gent. All 162 cantons are in `data/cantons.json`, so the missing
  justices of the peace are known; other court types still need a manifest.
- Canton names and seats are in Dutch and French only: the annex has no consolidated German text.
- Split municipalities (Antwerpen, Gent, Brussel, Luik, …) map to several cantons. Picking the
  right one needs the street address, and the boundaries exist only as legal prose in `territory`.
- The French name of canton Beveren-Kruibeke-Zwijndrecht in `courts.json`
  (`Beveren-Cruybeke-Zwijndrecht`) differs from the annex (`Beveren-Kruibeke-Zwijndrecht`).
- French and German court names from `formatCourtName` need checking against official usage
  ([#10](https://github.com/pieterjanscheir/be-legal-data/issues/10)).
- The Ondernemingsrechtbank Gent, division Oostende, has no house number (Canadaplein).

## Licence

The code is [MIT](LICENSE). The data in `data/` is [CC BY 4.0](LICENSE-DATA): reuse it freely,
including commercially, with credit to this project and to the sources listed there.
