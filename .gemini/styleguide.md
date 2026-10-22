# belgica review guide

belgica is Belgian legal reference data (courts, cantons, municipalities, interest rates) with
a small TypeScript library around it. The design decisions are in `docs/guide/design.md`; these
are the ones a review should hold a change to.

- **Legal facts are stored, never built.** A court's name, a canton's territory or a rate comes
  verbatim from an official source. Flag code that assembles one, and parsers that guess a
  value instead of leaving it out.
- **Every record keeps its provenance**: `sources: [{ url, retrieved }]`, and the dataset's
  entry in `datapackage.json`.
- **Records link by id fields** named after the dataset they point into (`canton`,
  `municipality`), never by a string built from another id or matched on a name.
- **Values are stored in one canonical form** (ISO days, E.164 phones, electronic IBANs,
  OpenStreetMap opening hours); formatting for people belongs in a function.
- **Ids are stable.** Removing or renaming one is a breaking change and must be in
  `CHANGELOG.md` as such; `ids.lock.json` guards this.
- **Time is part of the model.** Lookups take `{ on }`, records carry `validFrom` and `validTo`,
  and a day before a dataset's coverage throws a `RangeError` rather than answering.
- **Bundles stay small.** Each dataset has its own entry point; flag an import that pulls one
  dataset into another's (`test/smoke/courts-bundle.mjs` has a size limit).
- **Strict TypeScript**: `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, no `any`,
  100 % coverage of `src/`. Generated files (`src/*.generated.ts`, `schema/`) are regenerated
  by `pnpm generate`, not edited by hand.
- **Comments and docs** are plain and short, and say why. A user-facing change gets a line in
  `CHANGELOG.md` under Unreleased.
