# Data quality & freshness

Legal reference data goes stale quietly: a new interest rate is published, a court moves, a law
merges two cantons. This page explains how the package keeps up, and how far you can trust
each dataset.

## Where each dataset comes from

| Dataset | Source | How it's built | Changes when | Review every |
| --- | --- | --- | --- | --- |
| Judicial areas, arrondissements | Judicial Code, annex art. 4–5 | By hand | A law redraws the judicial map (rare; last in 2014) | 24 months |
| Cantons | Judicial Code, annex art. 1 (nl + fr) | Generated: `pnpm build:cantons` | A law changes the annex; municipalities merge | 12 months |
| Municipalities | Statbel open data | Generated: `pnpm build:cantons` | Municipalities merge (2019, 2025) | 12 months |
| Courts | Court websites, just.fgov.be | By hand | A court moves or changes phone, e-mail, bank account | 12 months |
| Interest rates | FOD Financiën, Belgisch Staatsblad | By hand | Every year (legal) and every semester (commercial) | 6 months |

Generated datasets are never edited by hand: the script parses the official text and refuses
to write anything unless the Dutch and French versions agree and every municipality is covered.

## Automatic checks

### On every change (CI)

- **Schema validation**: every data file matches its [JSON Schema](./schema).
- **Integrity**: ids are unique and well-formed; every reference (arrondissement, canton,
  municipality) points at a record that exists; every municipality is in exactly one canton or
  split over several; every canton stays within its arrondissement's provinces; the justices of
  the peace of East and West Flanders cover every canton there.
- **Interest rates**: periods are sorted, never overlap and leave no gaps; the legal rate runs
  per calendar year and the commercial rate per semester; the 2013–2015 contract-date rate only
  appears in that window.
- **Packaging**: the built package imports correctly as ESM and CommonJS, from every entry
  point, on Node 18, 20, 22 and 24; `publint` and `arethetypeswrong` check the `exports` and
  type declarations.

### Every week (scheduled)

The [freshness workflow](https://github.com/pieterjanscheir/be-legal-data/actions/workflows/freshness.yml)
runs every Monday and opens an issue labelled
[`data-freshness`](https://github.com/pieterjanscheir/be-legal-data/issues?q=label%3Adata-freshness)
when it finds something:

- **Missing rates**: no legal or commercial rate for today, or no commercial rate for the
  next two weeks (FOD Financiën publishes it before the semester starts).
- **Overdue reviews**: a dataset's `lastReviewed` date in `datapackage.json` is older than its
  `reviewEveryMonths`.
- **Dead sources**: an official source URL no longer responds.
- **Changed law or municipalities**: it re-runs `pnpm build:cantons` against the live
  Judicial Code and Statbel, and reports any difference with the committed data.

Run them yourself with `pnpm test:freshness` (add `FRESHNESS_ONLINE=1` to check the URLs).

## How to read a value

- **Absent is not zero.** `getInterestRate` returns `null` for a day without a rate on file,
  rather than guessing; `getJusticeOfThePeace` returns `undefined` for a court not yet in the
  data. Handle both.
- **Contact data is the least stable.** Phone numbers, e-mail addresses and opening hours
  change without notice. Courts will get a per-record source URL and check date
  ([#5](https://github.com/pieterjanscheir/be-legal-data/issues/5)).
- **Legal text wins.** For split municipalities, the canton's `territory` is the law's own
  text, verbatim. When a summary and the text disagree, the text is right.

## Reporting a mistake

[Open a data correction](https://github.com/pieterjanscheir/be-legal-data/issues/new?template=data-correction.yml)
with the record id and a link to the official source. Corrections are released as patch
versions.
