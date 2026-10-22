# JSON Schema {#json-schema}

Кожен файл у `data/` має [JSON Schema](https://json-schema.org) (draft-07) у `schema/`.
Схеми генеруються з типів TypeScript, тож типи, схеми й дані не можуть розійтися: CI падає,
коли будь-які з трьох не узгоджуються.

| Файл даних                    | Схема                                                                                    |
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

`$id` кожної схеми — це її URL на цьому сайті, наприклад
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`. Вони також є в
npm-пакеті як `belgica/schema/courts.schema.json`.

## Валідація даних {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Закріпіться на release tag, що містить schema/; доки першого немає, використовуйте main
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

Найчастіше це знадобиться, коли ви зберігаєте копію даних (форк із додатковими записами,
закешоване завантаження) і хочете знати, що вона досі має ту структуру, на яку розраховує пакет.

## Генерування типів для інших мов {#generating-types-for-other-languages}

Оскільки схеми стандартні, моделі можна генерувати, а не писати вручну:
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) для Python
(Pydantic), [quicktype](https://quicktype.io) для C#, Go, Java, Kotlin, Swift та інших.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

У корені репозиторію є [`datapackage.json`](/datapackage.json){target="_self"} — дескриптор
[Frictionless Data Package](https://datapackage.org), стандартний файл метаданих для відкритих
наборів даних. Він перелічує кожен файл даних із назвою, описом, схемою, офіційними джерелами,
ліцензією і двома нашими власними полями:

- `lastReviewed`: день, коли набір даних востаннє звіряли з його джерелами;
- `reviewEveryMonths`: як часто його треба перевіряти знову.
  [Перевірка актуальності](./data-quality#automatic-checks) відкриває issue, коли перевірку
  набору даних прострочено.
