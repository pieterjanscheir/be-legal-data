# JSON Schema {#json-schema}

Ogni file in `data/` ha un [JSON Schema](https://json-schema.org) (draft-07) in `schema/`.
Gli schemi sono generati dai tipi TypeScript, quindi tipi, schemi e dati non possono
divergere: la CI fallisce quando uno dei tre non concorda con gli altri.

| File di dati                  | Schema                                                                                   |
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

Il `$id` di ogni schema è il suo URL su questo sito, per esempio
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`. Si trovano anche nel
package npm come `belgica/schema/courts.schema.json`.

## Validare i dati {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Fissa un release tag che includa schema/; finché non esce il primo, usa main
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

Ti servirà soprattutto quando conservi una copia dei dati (un fork con record in più, un
download in cache) e vuoi sapere se ha ancora la struttura che il package si aspetta.

## Generare tipi per altri linguaggi {#generating-types-for-other-languages}

Poiché gli schemi sono standard, puoi generare i modelli invece di scriverli a mano:
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) per Python
(Pydantic), [quicktype](https://quicktype.io) per C#, Go, Java, Kotlin, Swift e altri.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

La root del repository contiene un [`datapackage.json`](/datapackage.json){target="_self"}, un
descrittore [Frictionless Data Package](https://datapackage.org): il file di metadati standard
per i dataset aperti. Elenca ogni file di dati con titolo, descrizione, schema, fonti ufficiali,
licenza e due campi nostri:

- `lastReviewed`: il giorno in cui il dataset è stato verificato l'ultima volta rispetto alle
  sue fonti;
- `reviewEveryMonths`: ogni quanto deve essere verificato di nuovo. Il
  [controllo di aggiornamento](./data-quality#automatic-checks) apre una issue quando un dataset
  è in ritardo.

## Perché non Swagger / OpenAPI? {#why-not-swagger-openapi}

Swagger (OpenAPI) descrive **API HTTP**: endpoint, parametri, risposte. Questo package non ha
né server né endpoint. È una libreria più file JSON statici, quindi OpenAPI non avrebbe nulla da
descrivere. JSON Schema è lo standard corrispondente per descrivere file di dati (OpenAPI stesso
usa JSON Schema per i suoi modelli di dati), ed è ciò che forniscono i file qui sopra.

Se in futuro si aggiungerà un'API HTTP (per esempio un piccolo servizio in sola lettura sugli
stessi dati), avrà un documento OpenAPI, e i suoi modelli di risposta potranno riutilizzare
direttamente questi schemi.
