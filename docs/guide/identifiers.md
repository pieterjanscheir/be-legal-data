# Identifiers

Every record has an `id`. Other records, your database and your URLs refer to it, so an id has
to be right once and then never change. This page sets out the rules, why each one exists, and
what happens when the law changes the thing an id names.

## The rules

1. **Every record has an `id` field**, and it is unique within its dataset. Generic code (an
   index, a cache, a form) treats every dataset the same way.
2. **An official code wins.** Where the authorities assign a code, the id _is_ that code:
   municipalities use their Statbel REFNIS code (`44021` for Gent). Future datasets follow
   suit: police zones by zone number, organisations by enterprise (KBO) number.
3. **Otherwise, lowercase kebab-case ASCII**: `^[a-z0-9]+(-[a-z0-9]+)*$`, built by
   [`scripts/id.ts`](https://github.com/pieterjanscheir/be-legal-data/blob/main/scripts/id.ts):
   accents dropped, everything else that isn't a letter or digit becomes one hyphen.
   `Merelbeke-Melle` → `merelbeke-melle`, `Braine-l'Alleud` → `braine-l-alleud`,
   `Liège` → `liege`.
4. **From the official name in the local language**: Dutch in Flanders, French in Wallonia,
   German around Eupen. Brussels is officially bilingual and needs one fixed choice: Dutch.
5. **A number is a suffix**: places with several cantons get `gent-1` … `gent-5`.
6. **Courts are `type` + place**: `justice-of-the-peace-gent-1`,
   `enterprise-court-gent-brugge` (seat, then division). The prefix keeps ids unique when Gent
   has a justice of the peace, an enterprise court and a labour court, and it is exactly the
   record's `type`, so it never needs a second vocabulary.
7. **Links are fields, never derived strings.** A justice of the peace has a `canton` field; a
   canton lists `{ municipality }`; an arrondissement has a `judicialArea`. Each holds the id of
   the record it points to, and the field is named after the dataset it points into.

All of these are enforced by tests (`test/ids.test.ts`) and by the
[JSON Schemas](./schema), which list the valid ids, so a dangling link fails validation.

## The ids

| Dataset         | Examples                                                                 | Rule                |
| --------------- | ------------------------------------------------------------------------ | ------------------- |
| Judicial areas  | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                          | Local name          |
| Arrondissements | `oost-vlaanderen`, `brabant-wallon`, `eupen`                             | Local name          |
| Cantons         | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1` | Local name + number |
| Municipalities  | `44021`, `21004`                                                         | REFNIS code         |
| Courts          | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`            | Type + place        |
| Interest rates  | `legal`, `commercial`                                                    | Fixed keys          |

## Why these choices

**Why kebab-case?** Ids end up in URLs (`/cantons/gent-1`), file names, CSS classes, database
keys and log lines. Lowercase avoids collisions on case-insensitive systems (macOS and Windows
file systems, many database collations): `Gent1` and `gent1` would be two ids in the data and
one file on disk. Hyphens keep word boundaries readable without capitals, and the character set
needs no escaping anywhere.

**Why readable ids rather than numbers or UUIDs?** A reference dataset is read by people:
`justice-of-the-peace-gent-1` in a database row or an error message tells you what it is. The
ids are as stable as numbers would be, because they only change when the law changes the thing
they name (see below), and then a new id is the right outcome.

**Why the local language, not English?** English names exist for a handful of places (Ghent,
Antwerp, Liege) and not for the 162 cantons, so English ids would mean two rules. The local name
is also the one the institution uses itself, and it's in the official texts.

**Why official codes?** REFNIS is what Statbel, the regions and almost every Belgian dataset use.
With the code as the id, joining any of them to cantons and courts needs no mapping table.

**Why `type` in court ids?** Within one place there are several courts, and court types will
grow (police courts, labour courts, courts of first instance…). A court's own fields say what
it is; the id only needs to be unique and recognisable, and the type does both.

**Why explicit links?** The old scheme built a court id by concatenating `Vredegerecht` and the
canton id. That hides a relation in a string format, which breaks the moment one court serves
two cantons or a name changes. A `canton` field is checked by the schema and the tests, and can
be followed in both directions.

## In TypeScript

Every dataset has a generated id type (`CantonId`, `CourtId`, `MunicipalityId`,
`ArrondissementId`, `JudicialAreaId`), regenerated from the data by `pnpm build:ids`:

```ts
import { getCanton, type CantonId } from 'be-legal-data'

getCanton('gent-1') // Canton: a known id always finds its record
getCanton(userInput) // Canton | undefined: any other string may not

const id: CantonId = 'gent1' // compile error: not a canton id
```

Use the id types for values you store, so a typo or a removed id is caught when you upgrade.

## When the law changes an id

Cantons and municipalities do change: municipalities merged in 2019 and 2025, and laws redraw
cantons. Then:

1. The old record is removed and a new one added. An id is never reused for a different thing.
2. The release is a major version, and the changelog lists every old → new id.
3. Merged municipalities will record what they replace (planned with the municipality-merger
   dataset on the [roadmap](/data/roadmap)).

A change of name alone, such as a spelling correction, doesn't change the id.

## Stability

Ids are public API. Adding records is a minor version, correcting a value a patch, and removing
or renaming an id a major version. Version 0.3.0 replaces the earlier PascalCase ids
(`VredegerechtGent1`, `EastFlanders`) with this scheme before the package had any users; the
[changelog](./changelog) lists the mapping.
