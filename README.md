# be-legal-data

One place for the Belgian legal reference data my projects share: courts and interest rates.
Change it here once, then bump the dependency in each project.

Private, for my own projects. Every dataset records where it comes from.

## What's in it

| File | Contents | Source |
| --- | --- | --- |
| [`data/arrondissements.json`](data/arrondissements.json) | Judicial arrondissements (nl/fr/de names) | — |
| [`data/courts.json`](data/courts.json) | Justices of the peace in East and West Flanders, and the divisions of the Ondernemingsrechtbank Gent | Court websites, just.fgov.be |
| [`data/interest-rates.json`](data/interest-rates.json) | Legal interest rate (per year, since 1970) and commercial-transaction rate (per semester, since 2002) | FOD Financiën / Belgisch Staatsblad |

The JSON files are the source of truth. The TypeScript in `src/` only adds types and helpers.

## Using it

### TypeScript / JavaScript

Install it from GitHub. Pin a tag so an update is always a conscious choice:

```bash
pnpm add github:pieterjanscheir/be-legal-data#v0.1.0
```

```ts
import { getCourt, formatCourtName, findCourts, getInterestRate } from 'be-legal-data'

formatCourtName(getCourt('VredegerechtGent1')!) // 'Vredegerecht 1e kanton Gent'
findCourts({ type: 'enterprise-court', arrondissement: 'WestFlanders' })

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

`getInterestRate` returns `null` for a day with no rate on file, so callers can warn instead of
silently using 0 %. `getLatestKnownRateDate(type)` gives the last day that is covered.

The raw files are also exported: `import courts from 'be-legal-data/data/courts.json'`.

### Python and anything else

Read the JSON files in `data/` directly, for example from a git submodule or a pinned raw URL.

## Updating data

1. Edit the JSON in `data/`. Keep the existing ids: projects store them.
2. `pnpm check`: typecheck, tests, build, and a check that `dist/` is committed and up to date.
3. Commit (including `dist/`), bump `version` in `package.json`, and tag it: `git tag v0.1.1 && git push --tags`.
4. Update the tag in the projects that use it.

`dist/` is committed on purpose: pnpm doesn't run build scripts of git dependencies, so the
built files have to be in the repo.

### New interest rates

- **Commercial**: FOD Financiën publishes the rate per semester. Add a period with `from`, `to`,
  `rate`, and the Staatsblad date in `note`.
- **Legal**: published per calendar year. Add a period for the year.

## Known gaps

- Courts only cover East and West Flanders so far: justices of the peace and the
  Ondernemingsrechtbank Gent. Other courts and regions still need adding.
- Phone numbers are stored as found, in mixed formats.
- The Ondernemingsrechtbank Gent, division Oostende, has no house number (Canadaplein).
