# Design decisions

The package was redesigned before its first users, so every choice could be made on its merits
instead of for compatibility. This page records each decision, why it was made, and what
follows from it. A new decision gets a new entry; a reversed one is marked, not deleted.

## 1. The data is the product; the code is a convenience

**Decision.** The JSON files in `data/` are the source of truth. They're usable without any of
the TypeScript: from Python, a spreadsheet or `jq`. The library adds types, indexes and
helpers, and nothing in it is needed to understand the data.

**Why.** Reference data outlives the code around it, and most consumers of Belgian legal data
aren't JavaScript projects.

**So.** Every file has a [JSON Schema](./schema) and an entry in `datapackage.json` with its
sources and licence. Field names and values are explained in the docs, not only in code.

## 2. Legal facts are data, never computed

**Decision.** Anything with legal meaning (a court's name, a canton's territory, a rate) comes
verbatim from an official source and is stored. Code may format or look up; it may not
construct a legal fact.

**Why.** Code that assembles a fact can be wrong in ways tests can't catch: the French court
names `formatCourtName` builds are probably wrong ([#10](https://github.com/pieterjanscheir/be-legal-data/issues/10)).
A stored value can be checked against its source.

**So.** Official court names move into the data ([#26](https://github.com/pieterjanscheir/be-legal-data/issues/26)).
Canton territories stay verbatim legal text. Where a source is missing, the field is missing:
nothing is filled in by guesswork.

## 3. One identifier rule

**Decision.** An official code where one exists, otherwise lowercase kebab-case from the
local-language name; courts are `type` + place. See [identifiers](./identifiers).

## 4. Links are fields

**Decision.** Records refer to each other only through fields holding the other record's id,
named after the dataset they point into (`arrondissement`, `canton`, `municipality`). No id is
built from another.

**Why.** A relation hidden in a string format breaks silently when either side changes. A field
is validated by the schema (which lists the valid ids) and by the tests.

**So.** Court addresses will link to their municipality the same way
([#28](https://github.com/pieterjanscheir/be-legal-data/issues/28)).

## 5. Canonical values, presentation in code

**Decision.** Each value is stored in one canonical, standard form, and formatting for people is
a function:

| Value         | Stored as                       | Standard                      |
| ------------- | ------------------------------- | ----------------------------- |
| Day           | `2024-06-15`                    | ISO 8601                      |
| Phone         | `+3253820701`                   | E.164                         |
| IBAN          | `BE73679200844560`              | ISO 13616 electronic format   |
| Opening hours | `Mo-Fr 08:30-12:30,13:30-16:00` | OpenStreetMap `opening_hours` |
| Language      | `nl`, `fr`, `de` keys           | ISO 639-1                     |

**Why.** One form per value makes values comparable, validatable (the IBAN checksum is tested)
and usable by other software (`tel:` links, payment systems, opening-hours parsers). Display
conventions vary by context; the data shouldn't.

## 6. Provenance on every record

**Decision.** Every dataset lists its sources, licence and review date in `datapackage.json`;
records get `sources: [{ url, retrieved }]` as they're (re)collected.

**Why.** "Where does this come from, and how old is it?" is the first question for legal data.

## 7. Freshness is checked by machines

**Decision.** A weekly job checks for missing interest rates, overdue reviews and dead sources,
and re-runs the generators against the live law and Statbel. Anything off opens an issue.

**Why.** Legal data goes stale silently; people forget, schedules don't.

## 8. Distribution: ESM only, Node 22.12+, built on release

**Decision.** The package is ESM only, requires Node 22.12 or later, and the build output isn't
committed: it's built and published to npm by the release workflow, with provenance.

**Why.** Node 18 and 20 are end of life. From Node 22.12, `require()` loads ESM, so a separate
CommonJS build would only add a second copy of the data (the dual-package hazard) and more to
test. Committed build output goes stale and broke automated dependency updates.

**So.** `import` and `require()` both work, tested on Node 22.12, 22, 24 and 26. Each dataset
has its own entry point, so an app that needs only the interest rates loads 12 KB, not 250 KB.

## 9. Types that carry the data's guarantees

**Decision.** Ids are generated union types; datasets are `readonly`; lookups with a known id
return the record, not `record | undefined`; closed vocabularies (court types, contact labels)
are unions.

**Why.** Mistakes surface while typing instead of in production, and the types document the
data.

## 10. Quality gates

**Decision.** Every change passes: strict TypeScript (including `noUncheckedIndexedAccess` and
`exactOptionalPropertyTypes`), ESLint with type-aware strict rules, Prettier, 100 % test
coverage of `src/`, JSON Schema validation of all data, integrity tests (ids, links, counts,
periods), and `publint` + `arethetypeswrong` on the packed package.

**Why.** A reference package is only worth depending on if it's more reliable than copying the
data by hand.

## Not decided yet

| Question                                                                                   | Issue                                                                          |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| When each record applies (`validFrom` / `validUntil`), for the judicial map on a past date | [#27](https://github.com/pieterjanscheir/be-legal-data/issues/27)              |
| Canton boundaries as geometry for split cities                                             | [#29](https://github.com/pieterjanscheir/be-legal-data/issues/29)              |
| Interest calculation over a period (day count, compounding)                                | Not planned until the method can be sourced from case law or official guidance |
