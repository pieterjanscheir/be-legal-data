# JSON Schema {#json-schema}

Chaque fichier de `data/` a un [JSON Schema](https://json-schema.org) (draft-07) dans `schema/`.
Les schémas sont générés à partir des types TypeScript ; les types, les schémas et les données
ne peuvent donc pas diverger : la CI échoue dès que l'un des trois n'est pas d'accord avec les
autres.

| Fichier de données            | Schéma                                                                                   |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| `data/judicial-areas.json`    | [`judicial-areas.schema.json`](/schema/judicial-areas.schema.json){target="_self"}       |
| `data/arrondissements.json`   | [`arrondissements.schema.json`](/schema/arrondissements.schema.json){target="_self"}     |
| `data/cantons.json`           | [`cantons.schema.json`](/schema/cantons.schema.json){target="_self"}                     |
| `data/municipalities.json`    | [`municipalities.schema.json`](/schema/municipalities.schema.json){target="_self"}       |
| `data/regions.json`           | [`regions.schema.json`](/schema/regions.schema.json){target="_self"}                     |
| `data/provinces.json`         | [`provinces.schema.json`](/schema/provinces.schema.json){target="_self"}                 |
| `data/courts.json`            | [`courts.schema.json`](/schema/courts.schema.json){target="_self"}                       |
| `data/prisons.json`           | [`prisons.schema.json`](/schema/prisons.schema.json){target="_self"}                     |
| `data/houses-of-justice.json` | [`houses-of-justice.schema.json`](/schema/houses-of-justice.schema.json){target="_self"} |
| `data/interest-rates.json`    | [`interest-rates.schema.json`](/schema/interest-rates.schema.json){target="_self"}       |

Le `$id` de chaque schéma est son URL sur ce site, par exemple
`https://pieterjanscheir.github.io/be-legal-data/schema/courts.schema.json`. À partir de la
prochaine version, ils sont aussi dans le package npm sous `be-legal-data/schema/courts.schema.json`
(la 0.2.0 ne les contient pas).

## Valider les données {#validating-the-data}

::: code-group

```python [Python]
import json
from urllib.request import urlopen
from jsonschema import validate  # pip install jsonschema

# Épinglez un tag de version qui contient schema/ ; tant que le premier n'est pas publié, utilisez main
TAG = "main"
BASE = f"https://raw.githubusercontent.com/pieterjanscheir/be-legal-data/{TAG}"
courts = json.load(urlopen(f"{BASE}/data/courts.json"))
schema = json.load(urlopen(f"{BASE}/schema/courts.schema.json"))
validate(courts, schema)
```

```ts [TypeScript]
import { Ajv } from 'ajv'
import addFormats from 'ajv-formats'
import courts from 'be-legal-data/data/courts.json' with { type: 'json' }
import schema from 'be-legal-data/schema/courts.schema.json' with { type: 'json' }

const ajv = new Ajv()
addFormats(ajv)
ajv.validate(schema, courts) // true
```

:::

Vous en aurez surtout besoin quand vous conservez une copie des données (un fork avec des
enregistrements supplémentaires, un téléchargement mis en cache) et voulez savoir si elle a
toujours la forme que le package attend.

## Générer des types pour d'autres langages {#generating-types-for-other-languages}

Comme les schémas sont standard, vous pouvez générer des modèles au lieu de les écrire à la
main : [datamodel-code-generator](https://github.com/koxudaxi/datamodel-code-generator) pour
Python (Pydantic), [quicktype](https://quicktype.io) pour C#, Go, Java, Kotlin, Swift et
d'autres encore.

```bash
datamodel-codegen --input courts.schema.json --input-file-type jsonschema --output courts.py
```

## datapackage.json {#datapackage-json}

La racine du dépôt contient un [`datapackage.json`](/datapackage.json){target="_self"}, un
descripteur [Frictionless Data Package](https://datapackage.org) : le fichier de métadonnées
standard pour les jeux de données ouverts. Il liste chaque fichier de données avec son titre, sa
description, son schéma, ses sources officielles, sa licence, et deux champs qui nous sont
propres :

- `lastReviewed` : le jour où le jeu de données a été vérifié pour la dernière fois par rapport
  à ses sources ;
- `reviewEveryMonths` : la fréquence à laquelle il doit être vérifié à nouveau. Le
  [contrôle de fraîcheur](./data-quality#automatic-checks) ouvre une issue quand un jeu de
  données est en retard.

## Pourquoi pas Swagger / OpenAPI ? {#why-not-swagger-openapi}

Swagger (OpenAPI) décrit des **API HTTP** : des endpoints, des paramètres, des réponses. Ce
package n'a ni serveur ni endpoint. C'est une bibliothèque accompagnée de fichiers JSON
statiques ; OpenAPI n'aurait donc rien à décrire. JSON Schema est le standard qui convient pour
décrire des fichiers de données (OpenAPI lui-même s'appuie sur JSON Schema pour ses modèles de
données), et c'est ce que fournissent les fichiers ci-dessus.

Si une API HTTP est ajoutée plus tard (par exemple un petit service en lecture seule au-dessus
des mêmes données), elle recevra un document OpenAPI, et ses modèles de réponse pourront
réutiliser ces schémas tels quels.
