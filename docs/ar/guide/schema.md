# JSON Schema {#json-schema}

لكل ملف في `data/` مخطط [JSON Schema](https://json-schema.org) (draft-07) في `schema/`. تُولَّد
المخططات من أنواع TypeScript، فلا يمكن أن تتباعد الأنواع والمخططات والبيانات: يفشل CI حين يختلف
أي من الثلاثة.

| ملف البيانات                  | المخطط                                                                                   |
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

قيمة `$id` لكل مخطط هي رابطه على هذا الموقع، مثل
`https://pieterjanscheir.github.io/belgica/schema/courts.schema.json`. وهي موجودة أيضًا في حزمة
npm باسم `belgica/schema/courts.schema.json`.

## التحقق من البيانات {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# ثبّت release tag يتضمن schema/؛ وإلى أن يصدر أول واحد، استخدم main
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

ستحتاج إلى هذا غالبًا حين تحتفظ بنسخة من البيانات (fork فيه سجلات إضافية، أو تنزيل مخزَّن مؤقتًا)
وتريد أن تعرف أنها لا تزال بالبنية التي تتوقعها الحزمة.

## توليد الأنواع للغات أخرى {#generating-types-for-other-languages}

لأن المخططات قياسية، يمكنك توليد النماذج بدلًا من كتابتها يدويًا:
[datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) لـPython
(Pydantic)، و[quicktype](https://quicktype.io) لـC# وGo وJava وKotlin وSwift وغيرها.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

في جذر المستودع ملف [`datapackage.json`](/datapackage.json){target="_self"}، وهو واصف
[Frictionless Data Package](https://datapackage.org): ملف البيانات الوصفية القياسي لمجموعات
البيانات المفتوحة. يسرد كل ملف بيانات بعنوانه ووصفه ومخططه ومصادره الرسمية وترخيصه، وحقلين
خاصين بنا:

- `lastReviewed`: آخر يوم رُوجعت فيه مجموعة البيانات مقابل مصادرها؛
- `reviewEveryMonths`: كم مرة يجب مراجعتها من جديد. يفتح
  [فحص الحداثة](./data-quality#automatic-checks) issue حين تتأخر مراجعة مجموعة بيانات.
