# JSON Schema {#json-schema}

Cada archivo de `data/` tiene un [JSON Schema](https://json-schema.org) (draft-07) en `schema/`.
Los esquemas se generan a partir de los tipos de TypeScript, de modo que los tipos, los esquemas
y los datos no pueden divergir: la CI falla cuando cualquiera de los tres no coincide.

| Archivo de datos              | Esquema                                                                                  |
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

El `$id` de cada esquema es su URL en este sitio, p. ej.
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`. También están en el
paquete npm como `belgica/schema/courts.schema.json`.

## Validar los datos {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Fija un release tag que incluya schema/; hasta que salga el primero, usa main
TAG = "main"
BASE = f"https://raw.githubusercontent.com/pieterjanscheir/belgica/{TAG}"
courts = json.load(urlopen(f"{BASE}/data/courts.json"))
schema = json.load(urlopen(f"{BASE}/schema/courts.schema.json"))
validate(courts, schema)
```

```ts [TypeScript]
import { Ajv } from 'ajv'
import addFormats from 'ajv-formats'
import courts from 'belgica/data/courts.json' with { type: 'json' }
import schema from 'belgica/schema/courts.schema.json' with { type: 'json' }

const ajv = new Ajv()
addFormats(ajv)
ajv.validate(schema, courts) // true
```

:::

Normalmente lo querrás cuando guardas una copia de los datos (un fork con registros extra, una
descarga en caché) y quieres saber que sigue teniendo la estructura que espera el paquete.

## Generar tipos para otros lenguajes {#generating-types-for-other-languages}

Como los esquemas son estándar, puedes generar modelos en lugar de escribirlos a mano:
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) para Python
(Pydantic), [quicktype](https://quicktype.io) para C#, Go, Java, Kotlin, Swift y más.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

La raíz del repositorio tiene un [`datapackage.json`](/datapackage.json){target="_self"}, un
descriptor [Frictionless Data Package](https://datapackage.org): el archivo de metadatos estándar
para conjuntos de datos abiertos. Enumera cada archivo de datos con su título, descripción,
esquema, fuentes oficiales y licencia, y dos campos propios:

- `lastReviewed`: el día en que el conjunto de datos se comprobó por última vez frente a sus
  fuentes;
- `reviewEveryMonths`: cada cuánto debe volver a comprobarse. La
  [comprobación de actualidad](./data-quality#automatic-checks) abre un issue cuando un conjunto
  de datos está atrasado.

## ¿Por qué no Swagger / OpenAPI? {#why-not-swagger-openapi}

Swagger (OpenAPI) describe **APIs HTTP**: endpoints, parámetros, respuestas. Este paquete no tiene
servidor ni endpoints. Es una librería más archivos JSON estáticos, así que OpenAPI no tiene nada
que describir. JSON Schema es el estándar correspondiente para describir archivos de datos (el
propio OpenAPI usa JSON Schema para sus modelos de datos), y es lo que proporcionan los archivos
de arriba.

Si más adelante se añade una API HTTP (por ejemplo un pequeño servicio de solo lectura sobre los
mismos datos), tendría un documento OpenAPI, y sus modelos de respuesta podrían reutilizar
directamente estos esquemas.
