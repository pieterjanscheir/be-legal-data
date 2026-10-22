# JSON Schema {#json-schema}

Cada ficheiro em `data/` tem um [JSON Schema](https://json-schema.org) (draft-07) em `schema/`.
Os schemas são gerados a partir dos tipos TypeScript, para que os tipos, os schemas e os dados
não possam divergir: a CI falha quando algum dos três discorda dos outros.

| Ficheiro de dados             | Schema                                                                                   |
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

O `$id` de cada schema é o seu URL neste site, p. ex.
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`. Também estão no pacote
npm como `belgica/schema/courts.schema.json`.

## Validar os dados {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Fixe uma tag de release que inclua schema/; até sair a primeira, use main
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

Vai querer isto sobretudo quando guarda uma cópia dos dados (um fork com registos extra, um
download em cache) e quer saber se ainda tem a estrutura que o pacote espera.

## Gerar tipos para outras linguagens {#generating-types-for-other-languages}

Como os schemas são standard, pode gerar modelos em vez de os escrever à mão:
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) para Python
(Pydantic), [quicktype](https://quicktype.io) para C#, Go, Java, Kotlin, Swift e outras.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

A raiz do repositório tem um [`datapackage.json`](/datapackage.json){target="_self"}, um
descritor [Frictionless Data Package](https://datapackage.org): o ficheiro de metadados standard
para conjuntos de dados abertos. Lista cada ficheiro de dados com o seu título, descrição,
schema, fontes oficiais, licença e dois campos próprios:

- `lastReviewed`: o dia em que o conjunto de dados foi verificado pela última vez face às suas
  fontes;
- `reviewEveryMonths`: com que frequência tem de voltar a ser verificado. A
  [verificação de atualidade](./data-quality#automatic-checks) abre uma issue quando um conjunto
  de dados está em atraso.
