# Contributing

Thanks for helping. The full guide, including how to add a dataset and how releases work, is on
the documentation site: https://pieterjanscheir.github.io/belgica/guide/contributing

To report a wrong or outdated value, open a
[data correction](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)
with the record id and a link to the official source.

The short version:

1. Every value needs an official source. Link it in the pull request.
2. Keep existing ids: projects store them, and `ids.lock.json` plus the tests hold you to it.
   See the [id rules](https://pieterjanscheir.github.io/belgica/guide/identifiers).
3. Don't edit generated files by hand: change the parser, script or types and regenerate. The
   scraped datasets are rebuilt from the official sources every week. Generated are
   `data/cantons.json`, `data/municipalities.json`, `data/regions.json`, `data/provinces.json`,
   `data/courts.json`, `data/prisons.json`, `data/houses-of-justice.json`,
   `data/postal-codes.json`, `data/canton-boundaries.json`,
   `data/arrondissement-boundaries.json`, `data/court-locations.json`, `schema/`, the
   `src/*.generated.ts` files, and the files under `data/courts/` and `data/cantons/`.
4. Run `pnpm check` before pushing. It fails when a generated file you need to commit is out of
   date: `schema/`, `data/courts.json`, `src/*.generated.ts` and `ids.lock.json`. The build
   output (`dist/`) isn't committed, and neither are the files `pnpm generate` splits into
   `data/courts/` and `data/cantons/`.
5. Add a line to `CHANGELOG.md` under Unreleased.
6. If you change an English documentation page, say in the pull request whether the
   translations under `docs/<language>/` still need updating.
