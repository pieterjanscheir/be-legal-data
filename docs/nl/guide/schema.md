# JSON Schema {#json-schema}

Elk bestand in `data/` heeft een [JSON Schema](https://json-schema.org) (draft-07) in `schema/`.
De schema's worden gegenereerd uit de TypeScript-types, zodat de types, de schema's en de data
niet uit elkaar kunnen groeien: CI faalt wanneer een van de drie het oneens is.

| Databestand                   | Schema                                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `data/judicial-areas.json`    | [`judicial-areas.schema.json`](/schema/judicial-areas.schema.json){target="_self"}       |
| `data/arrondissements.json`   | [`arrondissements.schema.json`](/schema/arrondissements.schema.json){target="_self"}     |
| `data/cantons.json`           | [`cantons.schema.json`](/schema/cantons.schema.json){target="_self"}                     |
| `data/canton-boundaries.json` | [`canton-boundaries.schema.json`](/schema/canton-boundaries.schema.json){target="_self"} |
| `data/municipalities.json`    | [`municipalities.schema.json`](/schema/municipalities.schema.json){target="_self"}       |
| `data/regions.json`           | [`regions.schema.json`](/schema/regions.schema.json){target="_self"}                     |
| `data/provinces.json`         | [`provinces.schema.json`](/schema/provinces.schema.json){target="_self"}                 |
| `data/courts.json`            | [`courts.schema.json`](/schema/courts.schema.json){target="_self"}                       |
| `data/prisons.json`           | [`prisons.schema.json`](/schema/prisons.schema.json){target="_self"}                     |
| `data/houses-of-justice.json` | [`houses-of-justice.schema.json`](/schema/houses-of-justice.schema.json){target="_self"} |
| `data/postal-codes.json`      | [`postal-codes.schema.json`](/schema/postal-codes.schema.json){target="_self"}           |
| `data/interest-rates.json`    | [`interest-rates.schema.json`](/schema/interest-rates.schema.json){target="_self"}       |

De `$id` van elk schema is zijn URL op deze site, bv.
`https://pieterjanscheir.github.io/be-legal-data/schema/courts.schema.json`. Vanaf de volgende
release zitten ze ook in het npm-package als `be-legal-data/schema/courts.schema.json` (0.2.0
bevat ze niet).

## De data valideren {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Pin een releasetag die schema/ bevat; tot de eerste uit is, gebruik main
TAG = "main"
BASE = f"https://raw.githubusercontent.com/pieterjanscheir/be-legal-data/{TAG}"
courts = json.load(urlopen(f"{BASE}/data/courts.json"))
schema = json.load(urlopen(f"{BASE}/schema/courts.schema.json"))
validate(courts, schema)
```

```ts [TypeScript]
import { Ajv } from 'ajv'
import addFormats from 'ajv-formats'
import courts from 'be-legal-data/data/courts.json' with { type: 'json' }
import schema from 'be-legal-data/schema/courts.schema.json' with { type: 'json' }

const ajv = new Ajv()
addFormats(ajv)
ajv.validate(schema, courts) // true
```

:::

Dit wil je vooral wanneer je een kopie van de data bijhoudt (een fork met extra records, een
gecachete download) en wilt weten of ze nog de structuur heeft die het package verwacht.

## Types genereren voor andere talen {#generating-types-for-other-languages}

Omdat de schema's standaard zijn, kun je modellen genereren in plaats van ze met de hand te
schrijven: [datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) voor
Python (Pydantic), [quicktype](https://quicktype.io) voor C#, Go, Java, Kotlin, Swift en meer.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

De root van de repository heeft een [`datapackage.json`](/datapackage.json){target="_self"}, een
[Frictionless Data Package](https://datapackage.org)-descriptor: het standaard metadatabestand
voor open datasets. Het vermeldt elk databestand met zijn titel, beschrijving, schema, officiële
bronnen, licentie, en twee velden van onszelf:

- `lastReviewed`: de dag waarop de dataset voor het laatst tegen haar bronnen is gecontroleerd;
- `reviewEveryMonths`: hoe vaak ze opnieuw gecontroleerd moet worden. De
  [actualiteitscontrole](./data-quality#automatic-checks) opent een issue wanneer een dataset
  achterstallig is.

## Waarom geen Swagger / OpenAPI? {#why-not-swagger-openapi}

Swagger (OpenAPI) beschrijft **HTTP-API's**: endpoints, parameters, responses. Dit package heeft
geen server en geen endpoints. Het is een bibliotheek plus statische JSON-bestanden, dus er valt
voor OpenAPI niets te beschrijven. JSON Schema is de passende standaard om databestanden te
beschrijven (OpenAPI gebruikt zelf JSON Schema voor zijn datamodellen), en dat is wat de
bestanden hierboven bieden.

Als er later een HTTP-API bijkomt (bijvoorbeeld een kleine read-only dienst over dezelfde data),
krijgt die een OpenAPI-document, en haar responsemodellen zouden deze schema's rechtstreeks kunnen
hergebruiken.
