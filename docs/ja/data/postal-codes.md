# 郵便番号 {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

ファイル：`data/postal-codes.json`。ベルギーの {{ stats.postalCodes.codes }} の郵便番号を、それぞれ
が属する自治体に REFNIS コードでリンクしたものです。{{ stats.postalCodes.shared }} の郵便番号が
2 つの自治体に属しているため、レコードは {{ stats.postalCodes.records }} 件あります。

## 役立つ場面 {#why-it-s-useful}

- **住所から司法の地図へ。** 住所に付いているのは REFNIS コードではなく郵便番号です。郵便番号から
  自治体が、自治体からその canton と裁判所がわかります。
  `findCourtsForPostalCode('9050', 'labour-court')` は、郵便番号でわかる範囲で「この住所を管轄する
  裁判所はどこか」に答えます。
- **自治体の郵便番号。** フォームの検証、郵送物の宛名書き、住所と REFNIS コードが一致しているかの
  確認に：`getPostalCodes('44021')`。
- **すべての裁判所、刑務所、justitiehuis / maison de justice の自治体。** それらの
  `address.municipality` は、公表された住所の郵便番号にこのリンクを適用したものです
  （[#28](https://github.com/pieterjanscheir/belgica/issues/28)）。

## 出典と更新 {#source-and-updates}

|            |                                                                                                                                                                                                                         |
| ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 出典       | Statbel の[郵便番号から REFNIS コードへの変換表](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie)。2025 年 1 月 1 日から有効な表（`…_va01012025.xlsx`）                                   |
| 作り方     | 週次スナップショットから `scripts/parse/postal-codes.ts` で生成。`municipalities.json` にない REFNIS コードを指すコードがある場合や、コードのない自治体がある場合はビルドが失敗します                                   |
| 変わるとき | Statbel が新しい表を公表したとき：自治体が合併したとき、bpost が郵便番号を追加または廃止したとき                                                                                                                        |
| 対象期間   | 2025 年 1 月 1 日以降。それより前の日付で検索すると `RangeError` を投げます（[時間](/ja/api#time)）。新しい表が出ると、その表が適用される日付で、削除された組には `validTo` が、追加された組には `validFrom` が付きます |
| 照合       | 毎週、[sources ワークフロー](/ja/guide/data-quality#how-the-data-is-built)が実行                                                                                                                                        |
| ライセンス | © Statbel、[CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                                                |

Statbel はこの表を、bpost の郵便局と FOD Financiën / SPF Finances の自治体から作成しています。
表には行ごとに自治体名も入っていますが、ここには保存していません。Statbel 自身の REFNIS 一覧と
いくつかの箇所で異なり（一覧では `Tongres-Looz` のところが `Tongeren-Borgloon`、Sint-Niklaas が
`Saint-Nicolas`）、レコードは自治体名をコピーせず自治体にリンクするからです。名称は
`getMunicipality(record.municipality).name` にあります。

## 共有されている郵便番号 {#shared-postal-codes}

一つの自治体は複数の郵便番号を持ち（Gent は 10 個）、一つの郵便番号は一つの自治体に属しますが、
例外が三つあります。

| 郵便番号 | 自治体                                            |
| -------- | ------------------------------------------------- |
| `1040`   | Brussel（`21004`）と Etterbeek（`21005`）         |
| `1050`   | Brussel（`21004`）と Elsene（`21009`）            |
| `1804`   | Vilvoorde（`23088`）と Zemst（`23096`）：Cargovil |

これらについては通りで決まります。`getMunicipalitiesForPostalCode` は両方の自治体を返し、
`findCourtsForPostalCode` は自治体ごとに答えるので、共有されたコードが黙ってどちらか一方に
解決されることはありません。

## フィールド {#fields}

| フィールド             | 型               | 説明                                                                                                                                                      |
| ---------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PostalCodeId`   | 郵便番号と REFNIS コードを連結したもの：`9000-44021`。どちらか一方だけではレコードを特定できず、両方で公式かつ一意。[識別子](/ja/guide/identifiers)を参照 |
| `validFrom`, `validTo` | string?          | Statbel の表に従った、その組が適用される日。なければ対象期間の開始時から、またはまだ適用中。[時間](/ja/api#time)を参照                                    |
| `postalCode`           | string           | 4 桁の郵便番号                                                                                                                                            |
| `municipality`         | `MunicipalityId` | 郵便番号が属する自治体（REFNIS コード）                                                                                                                   |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## 含まれていないもの {#what-isn-t-in-it}

- **自治体内の旧自治体**（deelgemeenten / sections de commune）：Statbel の表は自治体の単位まで
  です。bpost 自身の郵便番号一覧には地区名がありますが、REFNIS コードを含まず、オープンな
  ライセンスではなく bpost の利用規約（all rights reserved）のもとで公表されているため、使って
  いません。
- **通り。** 複数の canton に分かれた都市（Antwerpen、Gent、Brussel、Luik など）では、郵便番号から
  自治体が、自治体から複数の canton がわかります。その先は通りで決まり、境界は
  [#29](https://github.com/pieterjanscheir/belgica/issues/29) でジオメトリとして追加されるまでは、
  各 canton の `territory` にある法令の文章としてのみ存在します。

## ヘルパー {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// 自治体ごとに：その vredegerecht と、指定した種類の裁判所
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
