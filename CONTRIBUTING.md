# Contributing

Thanks for helping. The full guide, including how to add a dataset, is on the documentation
site: https://pieterjanscheir.github.io/belgica/guide/contributing

The short version:

1. Every value needs an official source. Link it in the pull request.
2. Keep existing ids: projects store them, and `ids.lock.json` plus the tests hold you to it.
   See the [id rules](https://pieterjanscheir.github.io/belgica/guide/identifiers).
3. Don't edit generated files by hand (`data/cantons.json`, `data/municipalities.json`,
   `data/regions.json`, `data/provinces.json`, `data/courts.json`, `data/prisons.json`,
   `data/houses-of-justice.json`, `data/canton-boundaries.json`, `schema/`,
   `src/ids.generated.ts`, `src/data-files.generated.ts`, and the files under `data/courts/` and
   `data/cantons/`): change the parser, script or types and regenerate. The scraped datasets
   are rebuilt from the official sources every week.
4. Run `pnpm check` before pushing, and commit `schema/`, `src/ids.generated.ts` and
   `ids.lock.json` with your change. The build output (`dist/`) isn't committed, and neither are
   the files `pnpm generate` splits into `data/courts/` and `data/cantons/`.
5. Add a line to `CHANGELOG.md` under Unreleased.
