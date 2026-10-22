# Contributing

## Updating data

The courts, prisons, houses of justice and canton boundaries are built from the official
sources every week ([how](./data-quality#how-the-data-is-built)): don't edit them by hand. Fix the parser in
`scripts/parse`, or, if the source itself is wrong, report it to the court. The weekly pull
request is reviewed like any other: compare the diff with the sources before merging.

For the datasets kept by hand (judicial areas, arrondissements, interest rates):

1. Edit the JSON in `data/`. Keep the existing ids: projects store them.
2. Update `lastReviewed` for the dataset in `datapackage.json` if you checked it against its
   sources.
3. `pnpm check`: regenerate the id types and schemas, typecheck, lint and format check, build,
   tests with coverage, and package lint. It fails when the generated files aren't committed.
4. Add a line to `CHANGELOG.md` under Unreleased, and commit (including `schema/`,
   `data/courts.json`, `src/ids.generated.ts`, `src/data-files.generated.ts` and `ids.lock.json`).
   The build output (`dist/`) isn't committed, nor are the files split into `data/courts/` and
   `data/cantons/`: they're built for every release and published to npm.

An id that was published stays: `ids.lock.json` lists them all and the tests fail when one is
missing from the data. If a source renamed a record, map the new name to the existing id in the
parser; if the record ended, keep it with a `validTo`. See
[identifiers](./identifiers#stability).

### Cantons and municipalities

`data/cantons.json` and `data/municipalities.json` are generated; don't edit them by hand. Run
`pnpm build:cantons` (needs network access and `unzip`). It reads:

- the annex to the Judicial Code, "Gebiedsomschrijving en zetel van hoven en rechtbanken"
  ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  in Dutch and French;
- Statbel's population-by-municipality file for the current municipalities and REFNIS codes.

It parses the Dutch and French texts separately and refuses to write anything unless they agree
and every municipality is covered exactly once (or split over several cantons). Exonyms the annex
uses but Statbel doesn't (`Gembloers`, `Saint-Nicolas`, …), typos in the annex, and boundary
mentions it can't tell apart are listed at the top of the script.

Rerun it after a law changes the annex or municipalities merge. Canton ids follow the local
language (Dutch in Flanders and Brussels, French in Wallonia, German around Eupen); the justice of
the peace of canton `x` has id `justice-of-the-peace-x` and links to it through its `canton` field.

### Scraped datasets

```bash
pnpm fetch:sources            # every source into .sources/ (about 20 minutes, politely)
pnpm fetch:sources courts     # or one source
pnpm build:data               # rebuild the courts, prisons, houses of justice, postal codes, regions and provinces from .sources/
```

The canton boundaries come from the NGI's GeoPackage (source `ngi`), read with Node's own
SQLite; when the NGI renames a canton, map its code to the id in `CANTON_ALIASES` in
`scripts/parse/boundaries.ts`.

Or check out the latest snapshots instead of fetching: `git worktree add .sources origin/sources`.

A source is a walk in `scripts/sources/catalog.ts`; a parser reads its snapshots in
`scripts/parse`. When a site changes its markup, the parser tests in `test/parse` (on trimmed
copies of real pages in `test/fixtures/sources`) show what broke.

### New interest rates

- **Commercial**: FOD Financiën publishes the rate per semester. Add a period with `from`, `to`,
  `rate`, and the Staatsblad date in `note`.
- **Legal**: published per calendar year. Add a period for the year.

## Adding a dataset

Every dataset gets the same treatment, so users can rely on it:

1. **Data**: `data/<name>.json`, an array of records. Every value from an official source.
2. **Ids**: follow the [identifier rules](./identifiers): an official code when one exists,
   otherwise lowercase kebab-case from the local-language name (`scripts/id.ts`).
3. **Links, not copies**: refer to arrondissements, cantons and municipalities by id, and reuse
   the shared types (`Translated`, `Address`, `Contact`, `SourceRef`).
4. **Sources**: a `sources: [{ url, retrieved }]` on each record, and an entry in
   `datapackage.json` with the dataset's sources, licence, `lastReviewed` and
   `reviewEveryMonths`.
5. **Types and helpers**: `src/<name>.ts`, exported from `src/index.ts`, plus an entry point in
   `tsup.config.ts` and `package.json` `exports`.
6. **Schema**: a zod schema in `src/schemas/`, exported from `src/schemas/index.ts` with the
   file in `dataFileSchemas`. The record type is its `z.infer`; the JSON Schema is generated
   from it, with the JSDoc comments as descriptions.
7. **Source and parser**: a walk in `scripts/sources/catalog.ts` that fetches the official
   pages, and a parser in `scripts/parse` that builds the file from the snapshots, with
   fixtures and tests. It reads only what it can read for certain and reports the rest.
8. **Tests**: unique ids, references that resolve, and the count the official source gives.
9. **Docs**: a page under `docs/data/` with why it's useful, source and updates, and a field table.

## Checks

| Command                     | What it does                                                                                                                                                  |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                | Everything CI runs: `generate`, `typecheck`, `lint`, `build`, `test:coverage`, `test:package`, `lint:package`, and a check that generated files are committed |
| `pnpm test`                 | Unit, integrity, schema and type tests on the source (no build needed; it splits `data/courts/` and `data/cantons/` first)                                    |
| `pnpm test:package`         | Smoke tests of the built package with `import` and `require()`: run `pnpm build` first                                                                        |
| `pnpm test:coverage`        | The same, failing below 100 % coverage of `src/`                                                                                                              |
| `pnpm lint` / `pnpm format` | ESLint and Prettier: check / fix                                                                                                                              |
| `pnpm generate`             | Regenerate the courts' `label`, `src/ids.generated.ts` (id types) and `schema/`, add new ids to `ids.lock.json`, and split `data/courts/` and `data/cantons/` |
| `pnpm lint:package`         | `publint` and `arethetypeswrong` on the packed package                                                                                                        |
| `pnpm test:freshness`       | Date-based checks: missing rates, overdue reviews. Not part of `check`; `FRESHNESS_ONLINE=1` also checks the source URLs                                      |
| `pnpm fetch:sources`        | Fetch the official sources into `.sources/`                                                                                                                   |
| `pnpm build:data`           | Rebuild the courts, prisons, houses of justice, postal codes, regions, provinces and canton boundaries from `.sources/`                                       |
| `pnpm build:csv`            | Write the data as CSV tables into `csv/`                                                                                                                      |

## Releasing

1. Move the Unreleased entries in `CHANGELOG.md` under the new version.
2. Bump `version` in `package.json` and commit.
3. Tag it and push: `git tag v0.3.0 && git push && git push --tags`.

The release workflow runs `pnpm check`, publishes the tag to npm with provenance, and creates
a GitHub release with the data, schemas and CSV tables attached. The tag has to match `version`.

## This website

The site lives in `docs/` and is built with [VitePress](https://vitepress.dev). The interactive
tables import the package's own `src/` and `data/`, so they always show the data in the repository.

```bash
pnpm docs:dev      # local server with hot reload
pnpm docs:build    # static site in docs/.vitepress/dist
pnpm docs:preview  # serve the built site
```

Every push to `main` deploys it to GitHub Pages. CI builds it on every pull request, so a broken
page is caught before merging.

### Translations

The English pages in `docs/` are the source of truth. Every other language has the same tree
under its own folder: Dutch (`docs/nl/`) and French (`docs/fr/`), and German, Spanish, Italian,
Portuguese, Polish, Turkish, Arabic, Ukrainian, Chinese and Japanese (`docs/de/`, `docs/es/`,
and so on). They are translations of the English page and are updated after it changes. When
you change an English page, change the same page in `docs/nl/` and `docs/fr/` too, or say in
the pull request that the translations lag behind; the other languages may lag a release. The
words of the theme and the interactive components in those other languages are in
`docs/.vitepress/locales/`.

Code, ids, field names and official names stay as they are in every language, and every heading
keeps the English anchor (`## Heading {#english-anchor}`) so cross-links and the language
switcher keep working. A Belgian institution or legal term keeps its official Dutch or French
name (or German, where Belgium publishes one) instead of a coined translation: a Chinese page
says vredegerecht / justice de paix, not a made-up word for it. The changelog is kept in English
only.
