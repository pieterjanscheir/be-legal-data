# JSON Schema {#json-schema}

Każdy plik w `data/` ma [JSON Schema](https://json-schema.org) (draft-07) w `schema/`.
Schematy są generowane z typów TypeScriptu, więc typy, schematy i dane nie mogą się rozjechać:
CI kończy się błędem, gdy którekolwiek z trzech się nie zgadza.

| Plik z danymi                 | Schemat                                                                                  |
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

`$id` każdego schematu to jego URL na tej stronie, np.
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`. Są też w pakiecie npm
jako `belgica/schema/courts.schema.json`.

## Walidacja danych {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Przypnij release tag, który zawiera schema/; dopóki pierwszy nie wyjdzie, użyj main
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

Przyda się to głównie wtedy, gdy trzymasz własną kopię danych (fork z dodatkowymi rekordami,
pobraną kopię w cache) i chcesz wiedzieć, czy nadal ma strukturę, jakiej oczekuje pakiet.

## Generowanie typów dla innych języków {#generating-types-for-other-languages}

Ponieważ schematy są standardowe, możesz generować modele zamiast pisać je ręcznie:
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) dla Pythona
(Pydantic), [quicktype](https://quicktype.io) dla C#, Go, Javy, Kotlina, Swifta i innych.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

Katalog główny repozytorium zawiera [`datapackage.json`](/datapackage.json){target="_self"},
deskryptor [Frictionless Data Package](https://datapackage.org): standardowy plik metadanych dla
otwartych zbiorów danych. Wymienia każdy plik z danymi wraz z tytułem, opisem, schematem,
oficjalnymi źródłami, licencją i dwoma naszymi własnymi polami:

- `lastReviewed`: dzień, w którym zbiór danych był ostatnio sprawdzany ze źródłami;
- `reviewEveryMonths`: jak często trzeba go sprawdzać ponownie.
  [Kontrola aktualności](./data-quality#automatic-checks) otwiera issue, gdy termin sprawdzenia
  zbioru minął.

## Dlaczego nie Swagger / OpenAPI? {#why-not-swagger-openapi}

Swagger (OpenAPI) opisuje **API HTTP**: endpointy, parametry, odpowiedzi. Ten pakiet nie ma
serwera ani endpointów. To biblioteka plus statyczne pliki JSON, więc OpenAPI nie ma czego
opisywać. JSON Schema to odpowiedni standard do opisywania plików z danymi (samo OpenAPI używa
JSON Schema do swoich modeli danych) i to właśnie zapewniają powyższe pliki.

Jeśli później dojdzie API HTTP (na przykład mała usługa tylko do odczytu nad tymi samymi
danymi), dostanie dokument OpenAPI, a jej modele odpowiedzi będą mogły bezpośrednio korzystać z
tych schematów.
