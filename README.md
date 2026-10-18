# be-legal-data

One place for the Belgian legal reference data my projects share: courts and interest rates.
Change it here once, then bump the dependency in each project.

Private, for my own projects. Every dataset records where it comes from.

## What's in it

| File | Contents | Source |
| --- | --- | --- |
| [`data/judicial-areas.json`](data/judicial-areas.json) | The 5 judicial areas (courts of appeal) | Ger.W. bijvoegsel art. 5 |
| [`data/arrondissements.json`](data/arrondissements.json) | The 12 judicial arrondissements and their judicial area | Ger.W. bijvoegsel art. 4 |
| [`data/cantons.json`](data/cantons.json) | All 162 judicial cantons: name, seat, municipalities, and the legal description of their area | Ger.W. bijvoegsel art. 1 (generated) |
| [`data/municipalities.json`](data/municipalities.json) | The 565 municipalities with REFNIS code and province | Statbel (generated) |
| [`data/courts.json`](data/courts.json) | Justices of the peace in East and West Flanders, and the divisions of the Ondernemingsrechtbank Gent | Court websites, just.fgov.be |
| [`data/interest-rates.json`](data/interest-rates.json) | Legal interest rate (per year, since 1970) and commercial-transaction rate (per semester, since 2002) | FOD Financiën / Belgisch Staatsblad |

The JSON files are the source of truth. The TypeScript in `src/` only adds types and helpers.

Municipality data © Statbel, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).

## Using it

### TypeScript / JavaScript

Install it from GitHub. Pin a tag so an update is always a conscious choice:

```bash
pnpm add github:pieterjanscheir/be-legal-data#v0.1.0
```

```ts
import {
    getCourt,
    formatCourtName,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'be-legal-data'

formatCourtName(getCourt('VredegerechtGent1')!) // 'Vredegerecht 1e kanton Gent'
findCourts({ type: 'enterprise-court', arrondissement: 'WestFlanders' })

getCantonsForMunicipality('44088') // [Canton MerelbekeMelle]
getCantonsForMunicipality('44021') // Gent 1–5: split city, see each canton's `territory`
getCanton('Oudergem')!.seat.nl // 'Etterbeek'

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
of the peace of canton `X` has id `VredegerechtX`.

### New interest rates

- **Commercial**: FOD Financiën publishes the rate per semester. Add a period with `from`, `to`,
  `rate`, and the Staatsblad date in `note`.
- **Legal**: published per calendar year. Add a period for the year.

## Known gaps

- Courts only cover East and West Flanders so far: justices of the peace and the
  Ondernemingsrechtbank Gent. All 162 cantons are in `data/cantons.json`, so the missing
  justices of the peace are known; other court types still need a manifest.
- Canton names and seats are in Dutch and French only: the annex has no consolidated German text.
- Split municipalities (Antwerpen, Gent, Brussel, Luik, …) map to several cantons. Picking the
  right one needs the street address, and the boundaries exist only as legal prose in `territory`.
- The French name of canton Beveren-Kruibeke-Zwijndrecht in `courts.json`
  (`Beveren-Cruybeke-Zwijndrecht`) differs from the annex (`Beveren-Kruibeke-Zwijndrecht`).
- Phone numbers are stored as found, in mixed formats.
- The Ondernemingsrechtbank Gent, division Oostende, has no house number (Canadaplein).
