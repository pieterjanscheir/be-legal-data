# Courts

File: `data/courts.json`. Every court of the judiciary that the courts' own portal,
[tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be), lists: 347 records.

| Kind                    | Courts | Divisions or seats | Area                                                             |
| ----------------------- | -----: | -----------------: | ---------------------------------------------------------------- |
| Justice of the peace    |    162 |                  2 | A canton; Philippeville sits in two places                       |
| Police court            |     15 |                 34 | An arrondissement (Brussels split by language, Halle, Vilvoorde) |
| Court of first instance |     13 |                 23 | An arrondissement (Brussels split by language)                   |
| Enterprise court        |      9 |                 24 | An arrondissement, or the area of a court of appeal              |
| Labour court            |      9 |                 29 | An arrondissement, or the area of a court of appeal              |
| Court of appeal         |      5 |                  0 | A judicial area                                                  |
| Labour court of appeal  |      5 |                  7 | A judicial area                                                  |
| Court of assize         |     11 |                  0 | A province, or Brussels-Capital                                  |

Not on the portal, so not here yet: the Court of Cassation, the Constitutional Court and the
Council of State, and the disciplinary courts.

## Why it's useful

- **Addressing documents.** Writs of summons, petitions and conclusions name the court as it
  names itself; letters and filings go to the registry (griffie, greffe) at its address.
- **Contacting the right registry.** Larger courts have a registry per matter (civil,
  criminal, family, the register of legal entities…), each with its own phone number, e-mail
  and sometimes bank account. The data keeps them apart, labelled as the court labels them.
- **Paying fees.** Registries that publish a bank account for court fees and deposits have it
  in the data, checksum verified.
- **Building forms.** Court pickers need a complete list with stable ids, linked to cantons,
  arrondissements and judicial areas, and to the court a division belongs to.
- **Linking to case law.** `ecli` gives the code the court's decisions carry in their
  European Case Law Identifier (`ECLI:BE:HBGNT:…`).

## Source and updates

|              |                                                                                                                     |
| ------------ | ------------------------------------------------------------------------------------------------------------------- |
| Source       | [tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be), the portal of the College of Courts and Tribunals |
| Built by     | `scripts/parse` from weekly snapshots of every court's page and contact page                                        |
| Changes when | A court moves, changes its contacts or hours, or the portal adds or renames a court                                 |
| Checked      | Every week, by the [sources workflow](/guide/data-quality#how-the-data-is-built); changes arrive as a pull request  |

Every record lists the pages it was read from and the day each page's content was first seen
(`sources`). Contact details change more often than anything else in this package: when it
matters, check the court's page (`website`).

<CourtList />

## Fields

| Field              | Type                                  | Description                                                                                                                                                                                        |
| ------------------ | ------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `CourtId`                             | Stable id: the `type`, then the place in the court's own language: `justice-of-the-peace-gent-1`, `police-court-brussel-fr`, `enterprise-court-gent-brugge`. See [identifiers](/guide/identifiers) |
| `validFrom`        | string?                               | First day the record applies, `YYYY-MM-DD`: the day the portal first listed it. None: since the coverage starts                                                                                    |
| `validTo`          | string?                               | Last day the record applies: the day before the weekly check found it gone from the portal. None: still applies                                                                                    |
| `type`             | `CourtType`                           | `justice-of-the-peace`, `police-court`, `court-of-first-instance`, `enterprise-court`, `labour-court`, `court-of-appeal`, `labour-court-of-appeal`, `court-of-assize`                              |
| `kind`             | `'court'` \| `'division'` \| `'seat'` | The court itself, one of its divisions (afdeling, division, Abteilung), or one of the places a justice of the peace sits                                                                           |
| `court`            | `CourtId`?                            | For a division or seat: the court it belongs to                                                                                                                                                    |
| `name`             | `{ nl?, fr?, de? }`                   | The name as the court publishes it, in each language it has a page in: `Vredegerecht Gent 1`, `Tribunal de l'entreprise du Hainaut - division Mons`                                                |
| `judicialArea`     | `JudicialAreaId`                      | The judicial area                                                                                                                                                                                  |
| `arrondissement`   | `ArrondissementId`?                   | The arrondissement, for a court or division whose area is one arrondissement or lies within one                                                                                                    |
| `canton`           | `CantonId`?                           | For a justice of the peace: the canton it serves                                                                                                                                                   |
| `cantons`          | `CantonId[]`?                         | For every other court (not its divisions): the cantons it covers, as the annex to the Judicial Code (art. 3–5) and art. 114 of the Code set them                                                   |
| `ecli`             | `string[]`?                           | The court's ECLI codes, one per language it judges in; only codes seen in published decisions                                                                                                      |
| `address`          | `Address`?                            | Where the registry is. Missing when the court publishes no single address (a court whose divisions each have their own)                                                                            |
| `contacts`         | `Contact[]`                           | Phone, fax, e-mail and bank account, each with the registry it belongs to (`label`) and the text published with it (`note`)                                                                        |
| `openingHours`     | string?                               | Registry hours in OpenStreetMap [`opening_hours`](https://wiki.openstreetmap.org/wiki/Key:opening_hours) syntax: `Mo-Fr 08:30-12:30,13:30-16:00`, only when the published text says exactly that   |
| `openingHoursText` | `{ nl?, fr?, de? }`?                  | The opening hours as published, per language                                                                                                                                                       |
| `website`          | `{ nl?, fr?, de? }`                   | The court's page on the portal, per language                                                                                                                                                       |
| `sources`          | `{ url, retrieved }[]`                | The pages the record was read from, and when their content was first seen                                                                                                                          |

::: tip New court types
`type` may gain values (the Court of Cassation, for one). If you `switch` on it, keep a
`default` branch so a new type doesn't break your code.
:::

## Shape

```ts
interface Court {
    id: CourtId
    validFrom?: string
    validTo?: string
    type: CourtType
    kind: 'court' | 'division' | 'seat'
    court?: CourtId
    name: Partial<Translated>
    judicialArea: JudicialAreaId
    arrondissement?: ArrondissementId
    canton?: CantonId
    cantons?: CantonId[]
    ecli?: string[]
    address?: Address
    contacts: Contact[]
    openingHours?: string
    openingHoursText?: Partial<Translated>
    website: Partial<Record<Locale, string>>
    sources: SourceRef[]
}

interface Address {
    building?: string
    street: string // as published, with number, box or floor: 'Beverstraat 7B (eerste verdieping)'
    postalCode: string
    city: string
}

interface Contact {
    type: 'phone' | 'fax' | 'email' | 'bank-account'
    value: string // canonical: E.164, lowercase e-mail, electronic IBAN
    label?: string // the registry or service: 'Burgerlijke griffie', 'Greffe pénal'
    note?: string // text published with the value: 'druk 1', 'tapez 2'
}
```

## Helpers

```ts
getCourt('justice-of-the-peace-gent-1')
getJusticeOfThePeace('gent-1') // the same court, by canton id
getDivisions('enterprise-court-gent') // its eight divisions
getCourtsForCanton('gent-1') // its justice of the peace, and one court of each other type
findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], by REFNIS code
findCourts({ type: 'police-court', kind: 'court', judicialArea: 'gent' })
getContact(court, 'email', 'Greffe pénal') // the first matching contact's value
formatPhoneNumber('+3253820701') // '053 82 07 01'
formatIban('BE73679200844560') // 'BE73 6792 0084 4560'
```

## How the data is read

The portal has a page per court and per division, in the court's language; bilingual courts
in Brussels have a page in Dutch and one in French, and the courts in Eupen one in French and
one in German. The parser:

1. reads the court's type and place from its name (`Politierechtbank Limburg - afdeling Genk`),
   and the canton of a justice of the peace from its name and number;
2. merges the language versions of one court into one record: names, pages and opening hours
   per language; address and contacts from the first language (Dutch in Brussels, German in
   Eupen), with any value only the other page has;
3. reads the registries' contact blocks, keeping each value with its registry;
4. turns the published opening hours into `opening_hours` syntax only when every word is
   understood and every language says the same. Text with a note or a temporary arrangement
   ("OPGELET: tot 31 december…") keeps only the published text;
5. gives each court the cantons the law assigns it (`cantons`), from a table of the annex to
   the Judicial Code in `scripts/parse/jurisdictions.ts`, and derives its `arrondissement` from
   them. The table and the portal check each other: a court on the portal that the law table
   lacks, or the reverse, stops the build.

It refuses to write anything when a page can't be placed (an unknown kind of court, a justice
of the peace without a canton), a canton has no court, or the law table and the portal
disagree on which courts exist. What it can't read (a phone number
without an area code, an address written as a sentence) is reported with the weekly pull
request, and left out of the data rather than guessed.

## Canonical values

| Value         | Stored as                                        | Why                                                                                                                                                                |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Phone number  | E.164: `+3253820701`                             | One form per number, dialable from anywhere, `tel:` links work as is                                                                                               |
| IBAN          | Electronic format: `BE73679200844560`            | The form payment systems take; the checksum is verified when read and in the tests                                                                                 |
| E-mail        | Lowercase                                        | Comparisons and deduplication work                                                                                                                                 |
| Opening hours | `opening_hours`: `Mo-Fr 08:30-12:30,13:30-16:00` | The OpenStreetMap standard, with parsers in many languages (e.g. [opening_hours.js](https://github.com/opening-hours/opening_hours.js)) and no language of its own |
| Street        | As published                                     | Numbers, boxes and floors are written too many ways (`Canadaplein ZN`, `Rue de Bruxelles 2 - 3`) to split them without guessing                                    |
