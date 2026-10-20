# Datasets

Every dataset is a JSON file in `data/`, described by a [JSON Schema](/guide/schema) and listed
in [`datapackage.json`](/guide/schema#datapackage-json) with its official sources, licence and
the date it was last checked against them.

| Dataset                                        | Records  | What you'd use it for                                                         |
| ---------------------------------------------- | -------- | ----------------------------------------------------------------------------- |
| [Judicial areas](./territory#judicial-areas)   | 5        | Which court of appeal (and labour court of appeal) hears an appeal            |
| [Arrondissements](./territory#arrondissements) | 12       | Grouping courts, prosecutors and bailiffs; the unit most competence rules use |
| [Cantons](./territory#cantons)                 | 162      | Which justice of the peace is competent for an address                        |
| [Municipalities](./territory#municipalities)   | 565      | Joining any Belgian address or statistic to the judicial map by REFNIS code   |
| [Courts](./courts)                             | 46       | Names, addresses and contact details to write to, file with or pay a court    |
| [Interest rates](./interest-rates)             | 2 series | Calculating late-payment interest on a claim                                  |

## How the datasets fit together

```
Judicial area ──< Arrondissement ──< Canton >──< Municipality (REFNIS)
                        │              │
                        └──< Court ────┘  a justice of the peace links to its canton
```

`──<` reads "has many". A municipality is usually in one canton; split cities (Antwerpen, Gent,
Brussel, Luik, …) are in several.

Records link to each other by id, never by name: a court has an `arrondissement` id, a canton
lists the REFNIS codes of its municipalities. Names change spelling between sources and
languages; ids don't.

## Why this data is useful

Belgian legal work runs into the same lookups over and over, and the official sources are hard
to use from code:

- **Competence.** The justice of the peace, police court and many other courts are competent
  by place. The law (the annex to the Judicial Code) describes those areas in prose, partly
  street by street. `cantons.json` turns that into a lookup from municipality to canton, and
  keeps the legal text for the split cities.
- **Correct names and addresses.** Writs, conclusions and letters must address the right court
  with its official name, such as `Vredegerecht 1e kanton Gent` or
  `Ondernemingsrechtbank Gent - afdeling Brugge`. `formatCourtName` builds them consistently
  (the French and German forms [are being reviewed](./known-gaps)).
- **Interest calculations.** Claims for late payment use the legal rate or, between
  businesses, the commercial-transaction rate. Both change every year or semester, and the
  2013–2015 transition depends on the contract date. Getting one period wrong changes the
  amount claimed.
- **Joining other data.** REFNIS codes are what Statbel, the regions and most open data use.
  Mapping them to cantons and arrondissements lets you put caseload, population or address data
  on the judicial map.

## What isn't in it (yet)

See [known gaps](./known-gaps) for limitations of the current data and the
[roadmap](./roadmap) for datasets that are planned: prisons, houses of justice, the remaining
courts, bailiffs, police zones and the cadastre and mortgage offices.

::: warning Reference data, not legal advice
The data is checked against official sources, but sources change and mistakes happen. Check
the official source before relying on a value, and
[report anything wrong](https://github.com/pieterjanscheir/be-legal-data/issues/new?template=data-correction.yml).
:::
