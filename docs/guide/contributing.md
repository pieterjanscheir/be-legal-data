# Contributing

## Updating data

1. Edit the JSON in `data/`. Keep the existing ids: projects store them.
2. `pnpm check`: typecheck, tests, build, and a check that `dist/` is committed and up to date.
3. Commit (including `dist/`).

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
the peace of canton `X` has id `VredegerechtX`.

### New interest rates

- **Commercial**: FOD Financiën publishes the rate per semester. Add a period with `from`, `to`,
  `rate`, and the Staatsblad date in `note`.
- **Legal**: published per calendar year. Add a period for the year.

## Releasing

1. Bump `version` in `package.json` and commit.
2. Tag it and push: `git tag v0.2.1 && git push && git push --tags`.

The release workflow runs `pnpm check` and publishes the tag to npm with provenance. The tag has
to match `version`.

## This website

The site lives in `docs/` and is built with [VitePress](https://vitepress.dev). The interactive
tables import the package's own `src/` and `data/`, so they always show the data in the repository.

```bash
pnpm docs:dev      # local server with hot reload
pnpm docs:build    # static site in docs/.vitepress/dist
pnpm docs:preview  # serve the built site
```

Every push to `main` deploys it to GitHub Pages.
