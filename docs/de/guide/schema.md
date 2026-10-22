# JSON Schema {#json-schema}

Jede Datei in `data/` hat ein [JSON Schema](https://json-schema.org) (draft-07) in `schema/`.
Die Schemas werden aus den TypeScript-Typen generiert, sodass Typen, Schemas und Daten nicht
auseinanderdriften können: CI schlägt fehl, wenn eines der drei nicht zu den anderen passt.

| Datendatei                    | Schema                                                                                   |
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

Die `$id` jedes Schemas ist seine URL auf dieser Website, z. B.
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`. Sie sind auch im
npm-Package enthalten, als `belgica/schema/courts.schema.json`.

## Die Daten validieren {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Auf einen Release-Tag festlegen, der schema/ enthält; bis der erste erscheint, main verwenden
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

Das brauchen Sie vor allem, wenn Sie eine Kopie der Daten pflegen (einen Fork mit zusätzlichen
Einträgen, einen zwischengespeicherten Download) und wissen wollen, ob sie noch die Struktur hat,
die das Package erwartet.

## Typen für andere Sprachen generieren {#generating-types-for-other-languages}

Da die Schemas standardkonform sind, können Sie Modelle generieren, statt sie von Hand zu
schreiben: [datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) für
Python (Pydantic), [quicktype](https://quicktype.io) für C#, Go, Java, Kotlin, Swift und mehr.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

Der Root des Repositorys enthält eine [`datapackage.json`](/datapackage.json){target="_self"},
einen [Frictionless Data Package](https://datapackage.org)-Deskriptor: die Standard-Metadatendatei
für offene Datensätze. Sie führt jede Datendatei mit Titel, Beschreibung, Schema, amtlichen
Quellen, Lizenz und zwei eigenen Feldern auf:

- `lastReviewed`: der Tag, an dem der Datensatz zuletzt mit seinen Quellen abgeglichen wurde;
- `reviewEveryMonths`: wie oft er erneut geprüft werden muss. Die
  [Aktualitätsprüfung](./data-quality#automatic-checks) öffnet ein Issue, wenn ein Datensatz
  überfällig ist.
