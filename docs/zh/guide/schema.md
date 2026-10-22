# JSON Schema {#json-schema}

`data/` 中的每个文件在 `schema/` 中都有对应的 [JSON Schema](https://json-schema.org)（draft-07）。这些 schema 由
TypeScript 类型生成，因此类型、schema 和数据三者不会互相脱节：只要其中任意两者不一致，CI 就会失败。

| 数据文件                      | Schema                                                                                   |
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

每个 schema 的 `$id` 就是它在本网站上的 URL，例如
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`。npm 包中也包含它们，路径为
`belgica/schema/courts.schema.json`。

## 校验数据 {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# 固定到一个包含 schema/ 的 release tag；在第一个这样的版本发布之前，使用 main
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

当你保留了一份数据副本（例如加了额外记录的 fork，或缓存的下载文件），并想确认它仍然符合包所期望的结构时，
通常就会用到这一步。

## 为其他语言生成类型 {#generating-types-for-other-languages}

由于这些 schema 遵循标准，你可以直接生成数据模型，而不必手写：Python（Pydantic）可用
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator)，C#、Go、Java、Kotlin、Swift 等
可用 [quicktype](https://quicktype.io)。

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

仓库根目录有一个 [`datapackage.json`](/datapackage.json){target="_self"}，它是
[Frictionless Data Package](https://datapackage.org) 描述文件，即开放数据集的标准元数据文件。它列出每个数据文件的
标题、描述、schema、官方来源和许可，另外还有两个我们自定义的字段：

- `lastReviewed`：最近一次根据来源核对该数据集的日期；
- `reviewEveryMonths`：需要多久重新核对一次。数据集逾期未核对时，
  [时效检查](./data-quality#automatic-checks)会自动开一个 issue。

## 为什么不用 Swagger / OpenAPI？ {#why-not-swagger-openapi}

Swagger（OpenAPI）描述的是 **HTTP API**：端点、参数和响应。这个包没有服务器，也没有端点。它是一个库加上一些静态
JSON 文件，OpenAPI 在这里没有可描述的对象。描述数据文件的对应标准是 JSON Schema（OpenAPI 本身也用 JSON Schema
描述数据模型），上面这些文件提供的正是它。

如果以后增加了 HTTP API（例如基于同一份数据的小型只读服务），它会有一份 OpenAPI 文档，其响应模型可以直接复用这些
schema。
