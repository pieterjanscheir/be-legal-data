# 刑務所 {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

ファイル：`data/prisons.json`。FOD Justitie / SPF Justice（Directoraat-generaal Penitentiaire
Inrichtingen / Direction générale des Établissements pénitentiaires）の {{ stats.prisons }} の
刑務所と detentiehuis / maison de détention。

## 役立つ場面 {#why-it-s-useful}

- **被収容者やその刑務所への連絡。** 弁護士、家族、関係機関には刑務所の住所と電話番号が必要
  です。名称は言語によって異なります（`Gevangenis van Bergen`、`Prison de Mons`、
  `Gefängnis Mons`）。
- **送金。** FOD Justitie / SPF Justice が被収容者向けの送金先として刑務所の口座を公表している
  場合、それを連絡先に `bank-account` としてチェックサム検証済みで収録しています。
- **フォームと事件記録。** 記録とともに保存できる施設ごとの安定した id と、選択用の一覧。

## 出典と更新 {#source-and-updates}

|            |                                                                                                                                                                                             |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 出典       | [FOD Justitie / SPF Justice：ベルギーの刑務所](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen)、各刑務所のオランダ語、フランス語、ドイツ語のページ |
| 作り方     | 週次スナップショットから `scripts/parse` で生成                                                                                                                                             |
| 変わるとき | 刑務所が開設・閉鎖されたとき、連絡先の詳細を変更したとき                                                                                                                                    |
| 照合       | 毎週、[sources ワークフロー](/ja/guide/data-quality#how-the-data-is-built)が実行                                                                                                            |

## フィールド {#fields}

| フィールド             | 型                                | 説明                                                                                                                               |
| ---------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PrisonId`                        | 冠詞を除いた現地語の名称から：`gevangenis-gent`、`prison-lantin`、`detentiehuis-kortrijk`                                          |
| `validFrom`, `validTo` | string?                           | サイトに掲載されていたとおりの、レコードが適用される日。なければ対象期間の開始時から、またはまだ適用中。[時間](/ja/api#time)を参照 |
| `kind`                 | `'prison'` \| `'detention-house'` | detentiehuis / maison de détention は、短期刑の人を自宅の近くで収容する施設                                                        |
| `name`                 | `{ nl, fr, de }`                  | FOD Justitie / SPF Justice が公表しているとおり                                                                                    |
| `address`              | `Address`                         | 現地語で。その郵便番号が属する自治体（`municipality`、REFNIS コード）つき                                                          |
| `contacts`             | `Contact[]`                       | 電話、ファクス、メール、および公表されている場合は被収容者向けの送金口座                                                           |
| `website`              | `{ nl, fr, de }`                  | 言語ごとの刑務所のページ                                                                                                           |
| `sources`              | `{ url, retrieved }[]`            | レコードを読み取ったページ                                                                                                         |

ページには所長の名前も記載されていますが、除外しています。変わるものであり、パッケージに
必要のない個人データだからです。

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
