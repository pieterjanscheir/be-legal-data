# JSON Schema {#json-schema}

`data/` içindeki her dosyanın `schema/` içinde bir [JSON Schema](https://json-schema.org)
(draft-07) şeması vardır. Şemalar TypeScript tiplerinden üretilir; böylece tipler, şemalar ve
veriler birbirinden kopamaz: üçünden biri diğerleriyle uyuşmadığında CI başarısız olur.

| Veri dosyası                  | Şema                                                                                     |
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

Her şemanın `$id` değeri, bu sitedeki URL'sidir; ör.
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`. Şemalar npm paketinde de
`belgica/schema/courts.schema.json` olarak bulunur.

## Verileri doğrulama {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# schema/ içeren bir release tag'e sabitleyin; ilki çıkana kadar main kullanın
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

Buna çoğunlukla verilerin bir kopyasını tuttuğunuzda (ek kayıtlar içeren bir fork, önbelleğe
alınmış bir indirme) ve kopyanın hâlâ paketin beklediği yapıda olup olmadığını bilmek
istediğinizde ihtiyaç duyarsınız.

## Başka diller için tip üretme {#generating-types-for-other-languages}

Şemalar standart olduğu için modelleri elle yazmak yerine üretebilirsiniz: Python (Pydantic) için
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator); C#, Go, Java,
Kotlin, Swift ve daha fazlası için [quicktype](https://quicktype.io).

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

Repository'nin kökünde bir [`datapackage.json`](/datapackage.json){target="_self"} bulunur: açık
veri kümeleri için standart metadata dosyası olan bir
[Frictionless Data Package](https://datapackage.org) tanımlayıcısı. Her veri dosyasını başlığı,
açıklaması, şeması, resmî kaynakları, lisansı ve bize ait iki alanla birlikte listeler:

- `lastReviewed`: veri kümesinin kaynaklarıyla en son karşılaştırıldığı gün;
- `reviewEveryMonths`: ne sıklıkla yeniden kontrol edilmesi gerektiği. Bir veri kümesinin süresi
  geçtiğinde [güncellik kontrolü](./data-quality#automatic-checks) bir issue açar.
