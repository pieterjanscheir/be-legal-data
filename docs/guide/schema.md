# JSON Schema

Every file in `data/` has a [JSON Schema](https://json-schema.org) (draft-07) in `schema/`.
The schemas are generated from the TypeScript types, so the types, the schemas and the data
can't drift apart: CI fails when any of the three disagree.

| Data file                     | Schema                                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `data/judicial-areas.json`    | [`judicial-areas.schema.json`](/schema/judicial-areas.schema.json){target="_self"}       |
| `data/arrondissements.json`   | [`arrondissements.schema.json`](/schema/arrondissements.schema.json){target="_self"}     |
| `data/cantons.json`           | [`cantons.schema.json`](/schema/cantons.schema.json){target="_self"}                     |
| `data/canton-boundaries.json` | [`canton-boundaries.schema.json`](/schema/canton-boundaries.schema.json){target="_self"} |
| `data/municipalities.json`    | [`municipalities.schema.json`](/schema/municipalities.schema.json){target="_self"}       |
| `data/courts.json`            | [`courts.schema.json`](/schema/courts.schema.json){target="_self"}                       |
| `data/prisons.json`           | [`prisons.schema.json`](/schema/prisons.schema.json){target="_self"}                     |
| `data/houses-of-justice.json` | [`houses-of-justice.schema.json`](/schema/houses-of-justice.schema.json){target="_self"} |
| `data/interest-rates.json`    | [`interest-rates.schema.json`](/schema/interest-rates.schema.json){target="_self"}       |

Each schema's `$id` is its URL on this site, e.g.
`https://pieterjanscheir.github.io/be-legal-data/schema/courts.schema.json`. From the next
release they're also in the npm package as `be-legal-data/schema/courts.schema.json` (0.2.0
doesn't include them).

## Validating the data

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Pin a release tag that includes schema/; until the first one is out, use main
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

You'll mostly want this when you keep a copy of the data (a fork with extra records, a cached
download) and want to know it still has the shape the package expects.

## Generating types for other languages

Because the schemas are standard, you can generate models instead of writing them by hand:
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) for Python
(Pydantic), [quicktype](https://quicktype.io) for C#, Go, Java, Kotlin, Swift and more.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json

The repository root has a [`datapackage.json`](/datapackage.json){target="_self"}, a
[Frictionless Data Package](https://datapackage.org) descriptor: the standard metadata file for
open datasets. It lists each data file with its title, description, schema, official sources,
licence, and two fields of our own:

- `lastReviewed`: the day the dataset was last checked against its sources;
- `reviewEveryMonths`: how often it must be checked again. The
  [freshness check](./data-quality#automatic-checks) opens an issue when a dataset is overdue.

## Why not Swagger / OpenAPI?

Swagger (OpenAPI) describes **HTTP APIs**: endpoints, parameters, responses. This package has
no server and no endpoints. It's a library plus static JSON files, so there's nothing for
OpenAPI to describe. JSON Schema is the matching standard for describing data files (OpenAPI
itself uses JSON Schema for its data models), and it's what the files above provide.

If an HTTP API is added later (for example a small read-only service over the same data),
it would get an OpenAPI document, and its response models could reuse these schemas directly.
