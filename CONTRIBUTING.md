# Contributing

Thanks for helping. The full guide, including how to add a dataset, is on the documentation
site: https://pieterjanscheir.github.io/be-legal-data/guide/contributing

The short version:

1. Every value needs an official source. Link it in the pull request.
2. Keep existing ids: projects store them. See the
   [id rules](https://pieterjanscheir.github.io/be-legal-data/guide/identifiers).
3. Don't edit generated files by hand (`data/cantons.json`, `data/municipalities.json`,
   `schema/`, `dist/`): change the script or the types and regenerate.
4. Run `pnpm check` before pushing, and commit `dist/` and `schema/` with your change.
5. Add a line to `CHANGELOG.md` under Unreleased.
