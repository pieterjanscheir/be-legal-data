# Identifiers

Every record has a stable identifier. Projects store them (in a database column, a URL, a
configuration file), so **ids are public API**: once released, an id is never renamed or
reused. Removing or renaming one is a major version.

## The rules

1. **Use an official code when one exists.** Municipalities use their Statbel REFNIS code
   (`44021` for Gent), because every other Belgian dataset does too. Future datasets follow the
   same rule: police zones by their zone number, organisations by their enterprise (KBO) number.
2. **Otherwise, a readable key in PascalCase ASCII** (`^[A-Z][A-Za-z0-9]*$`, enforced by the
   [JSON Schema](./schema)): no spaces, accents or hyphens, so ids are safe in URLs, file names,
   enum names and code.
3. **Take the name in the local language of the place** for places and institutions: Dutch in
   Flanders and Brussels, French in Wallonia, German in the German-speaking area. That's the
   name the institution uses itself. Accents are dropped (`Liège` → `Liege`), hyphens and
   spaces removed (`Merelbeke-Melle` → `MerelbekeMelle`).
4. **Add a type prefix where one place has several records of different kinds**: courts are
   `Vredegerecht…`, `Ondernemingsrechtbank…`, because Gent has a justice of the peace, an
   enterprise court, a labour court…
5. **Ids are case-sensitive and compared exactly.**

## The ids in use

| Dataset | Example | Pattern |
| --- | --- | --- |
| Judicial areas | `Ghent` | English name |
| Arrondissements | `EastFlanders` | English name |
| Cantons | `Gent1`, `MerelbekeMelle`, `Wavre1`, `Eupen` | Local name + number |
| Municipalities | `44021` | REFNIS code (official) |
| Courts | `VredegerechtGent1`, `OndernemingsrechtbankGentBrugge` | Type (Dutch) + place (+ division) |
| Interest rates | `legal`, `commercial` | Fixed keys |

## Is this the best scheme?

Short answer: **it's sound, with two known compromises, and it isn't worth breaking to change.**

What works well:

- Ids are short, readable and stable. Unlike UUIDs or numbers, `VredegerechtGent1` in a
  database tells you what it is.
- REFNIS for municipalities is the right call: it's the official key, and joining with
  Statbel, regional and address data needs no mapping.
- Ids never depend on a translation, so changing a display name never changes an id.

The compromises:

- **Mixed languages.** Judicial areas and arrondissements have English ids (`EastFlanders`),
  cantons and courts have local-language ids (`Gent1`). The English ids came first and are
  fine for a small, fixed set; renaming them now would break users for no functional gain.
  New datasets follow rule 3.
- **Derived court ids.** A justice of the peace's id is `Vredegerecht` + its canton id. That
  makes the link obvious (`getJusticeOfThePeace('Gent1')`), but if a law merges or renumbers
  cantons, both ids change together. That's a real change in the law, so a new id is the
  right outcome, and it will be released as a major version with a mapping from old to new.

What we'd do differently from scratch: kebab-case ids (`east-flanders`) read better in URLs,
and English everywhere is more predictable for non-Belgian developers. Neither outweighs
breaking every stored id, so the scheme above is frozen for 1.x.

## When the law changes an id

Cantons and municipalities do change: municipalities merged in 2019 and 2025, and cantons
are redrawn by law. When that happens:

1. The old record is removed and a new one added: ids are never reused for a different area.
2. The release is a major version, and the changelog lists old → new ids.
3. Where it helps, the record keeps a note of what it replaces (planned: a `replaces` field
   for municipalities after mergers, see the [roadmap](/data/roadmap)).
