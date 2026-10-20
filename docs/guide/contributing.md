# Contributing

## Updating data

1. Edit the JSON in `data/`. Keep the existing ids: projects store them.
2. Update `lastReviewed` for the dataset in `datapackage.json` if you checked it against its
   sources.
3. `pnpm check`: typecheck, regenerate the schemas, build, tests, package lint, and a check
   that `dist/` and `schema/` are committed and up to date.
4. Add a line to `CHANGELOG.md` under Unreleased, and commit (including `dist/` and `schema/`).

`dist/` is committed so projects can still install straight from GitHub: pnpm doesn't run build
scripts of git dependencies.

### Cantons and municipalities

`data/cantons.json` and `data/municipalities.json` are generated; don't edit them by hand. Run
`pnpm build:cantons` (needs network access and `unzip`). It reads:

- the annex to the Judicial Code, "Gebiedsomschrijving en zetel van hoven en rechtbanken"
  ([Justel 1967101007](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  in Dutch and French;
- Statbel's population-by-municipality file for the current municipalities and REFNIS codes.

It parses the Dutch and French texts separately and refuses to write anything unless they agree
and every municipality is covered exactly once (or split over several cantons). Exonyms the annex
uses but Statbel doesn't (`Gembloers`, `Saint-Nicolas`, …), typos in the annex, and boundary
mentions it can't tell apart are listed at the top of the script.

Rerun it after a law changes the annex or municipalities merge. Canton ids follow the local
language (Dutch in Flanders and Brussels, French in Wallonia, German around Eupen); the justice of
the peace of canton `x` has id `justice-of-the-peace-x` and links to it through its `canton` field.

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
   `tsup.config.ts` and `package.json` `exports`/`typesVersions`.
6. **Schema**: add the file type to `scripts/schema-types.ts` and `scripts/build-schemas.ts`.
7. **Script**: if the source can be fetched, a `scripts/build-<name>.ts` that rebuilds the file,
   so the freshness check can detect changes.
8. **Tests**: unique ids, references that resolve, and the count the official source gives.
9. **Docs**: a page under `docs/data/` with why it's useful, source and updates, and a field table.

## Checks

| Command | What it does |
| --- | --- |
| `pnpm test` | Unit, integrity, schema and package tests |
| `pnpm test:freshness` | Date-based checks: missing rates, overdue reviews; `FRESHNESS_ONLINE=1` also checks source URLs |
| `pnpm build:schemas` | Regenerate `schema/` from the types |
| `pnpm lint:package` | `publint` and `arethetypeswrong` on the packed package |
| `pnpm check` | Typecheck, schemas, build, `pnpm test` and `pnpm lint:package`, as CI does. Not the freshness checks: run `pnpm test:freshness` separately |

## Releasing

1. Move the Unreleased entries in `CHANGELOG.md` under the new version.
2. Bump `version` in `package.json` and commit.
3. Tag it and push: `git tag v0.3.0 && git push && git push --tags`.

The release workflow runs `pnpm check`, publishes the tag to npm with provenance, and creates
a GitHub release. The tag has to match `version`.

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
