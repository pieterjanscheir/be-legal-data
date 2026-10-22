# JSON Schema {#json-schema}

`data/` にあるすべてのファイルには、`schema/` に [JSON Schema](https://json-schema.org)（draft-07）が
あります。スキーマは TypeScript の型から生成されるので、型・スキーマ・データの三つがずれることは
ありません。三つのうちどれかが食い違えば CI が失敗します。

| データファイル                | スキーマ                                                                                 |
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

各スキーマの `$id` はこのサイト上の URL です（例：
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`）。npm パッケージにも
`belgica/schema/courts.schema.json` として含まれています。

## データを検証する {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# schema/ を含む release tag に固定する。最初の release が出るまでは main を使う
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

これが役に立つのは主に、データのコピーを手元に持っている場合（独自のレコードを追加した fork、
キャッシュしたダウンロードなど）に、それがまだパッケージの想定する構造を保っているかを
確かめたいときです。

## 他の言語向けに型を生成する {#generating-types-for-other-languages}

スキーマは標準的な形式なので、モデルを手で書く代わりに生成できます。Python（Pydantic）には
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator)、C#、Go、Java、
Kotlin、Swift などには [quicktype](https://quicktype.io) が使えます。

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

リポジトリのルートには [`datapackage.json`](/datapackage.json){target="_self"} があります。これは
[Frictionless Data Package](https://datapackage.org) のディスクリプタで、オープンデータセットの
標準的なメタデータファイルです。各データファイルについて、タイトル、説明、スキーマ、公式の
情報源、ライセンスと、このプロジェクト独自の二つのフィールドを記載しています。

- `lastReviewed`：そのデータセットを最後に情報源と照合した日
- `reviewEveryMonths`：次に照合しなければならない間隔。データセットの照合期限が過ぎると、
  [鮮度チェック](./data-quality#automatic-checks)が issue を作成します。

## なぜ Swagger / OpenAPI ではないのか {#why-not-swagger-openapi}

Swagger（OpenAPI）が記述するのは **HTTP API**、つまりエンドポイント、パラメータ、レスポンスです。
このパッケージにはサーバーもエンドポイントもありません。ライブラリと静的な JSON ファイルだけなので、
OpenAPI で記述するものがないのです。データファイルを記述するための対応する標準は JSON Schema
であり（OpenAPI 自体もデータモデルに JSON Schema を使っています）、上のファイルが提供しているのは
まさにそれです。

将来 HTTP API が追加された場合（たとえば同じデータを提供する小さな読み取り専用サービス）、
それには OpenAPI ドキュメントを用意し、レスポンスのモデルにはこれらのスキーマをそのまま
再利用できます。
