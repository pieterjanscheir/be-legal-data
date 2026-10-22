<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Justitiehuis / maison de justice {#houses-of-justice}

ファイル：`data/houses-of-justice.json`。フラマン語共同体とフランス語共同体の justitiehuizen /
maisons de justice：{{ stats.housesOfJustice }} 件のレコード。

justitiehuis / maison de justice は、裁判所や検察庁の委託を受けて犯罪者を指導・監督し（保護観察、
電子監視、社会奉仕命令）、被害者を受け入れ、家庭裁判所（familierechtbank / tribunal de la famille）
のために社会調査を作成する機関です。2015 年からは各共同体が運営しています。

## 役立つ場面 {#why-it-s-useful}

- **家族法。** 家庭裁判所は、その家族が住む地域の justitiehuis / maison de justice に社会調査を
  命じます。弁護士や当事者にはその連絡先が必要です。
- **刑事法。** 保護観察の条件、代替刑、電子監視は justitiehuis / maison de justice がフォロー
  アップし、被害者の受け入れも行います。
- **リンク。** フランデレンの施設には、フランデレンの組織登録簿
  （[Wegwijs](https://wegwijs.vlaanderen.be)）の識別子である OVO 番号が付いているので、データを
  フランデレン政府の他のデータと結合できます。

## 出典と更新 {#source-and-updates}

|        |                                                                                                                                                                                                                                                    |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 出典   | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen)（フラマン語共同体）と [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/)（フランス語共同体） |
| 作り方 | 週次スナップショットから `scripts/parse` で生成                                                                                                                                                                                                    |
| 照合   | 毎週、[sources ワークフロー](/ja/guide/data-quality#how-the-data-is-built)が実行                                                                                                                                                                   |

まだデータにないもの：ドイツ語共同体の Eupen にある施設
（[#3](https://github.com/pieterjanscheir/belgica/issues/3)）。ブリュッセルにはフラマン語共同体の
施設（`justitiehuis-brussel`）とフランス語共同体の施設（`maison-justice-bruxelles`）の両方が
あります。

## フィールド {#fields}

| フィールド             | 型                                      | 説明                                                                                                                               |
| ---------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `HouseOfJusticeId`                      | 冠詞を除いた名称から：`justitiehuis-gent`、`maison-justice-arlon`                                                                  |
| `validFrom`, `validTo` | string?                                 | サイトに掲載されていたとおりの、レコードが適用される日。なければ対象期間の開始時から、またはまだ適用中。[時間](/ja/api#time)を参照 |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | 運営する共同体                                                                                                                     |
| `name`                 | `{ nl }` または `{ fr }`                | 共同体の言語で                                                                                                                     |
| `ovo`                  | string?                                 | フランデレンの施設について、フランデレンの組織登録簿の OVO 番号：`OVO001917`                                                       |
| `address`              | `Address`                               | その郵便番号が属する自治体（`municipality`、REFNIS コード）つき                                                                    |
| `contacts`             | `Contact[]`                             | 電話、ファクス、メール。フランス語共同体の施設の被害者支援サービスには、ラベル付きの専用の連絡先がある                             |
| `website`              | `{ nl }` または `{ fr }`                | 掲載されているページ                                                                                                               |
| `sources`              | `{ url, retrieved }[]`                  | レコードを読み取ったページ                                                                                                         |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
