# データセット {#datasets}

各データセットは `data/` にある JSON ファイルで、[JSON Schema](/ja/guide/schema) で記述され、
[`datapackage.json`](/ja/guide/schema#datapackage-json) に公式の情報源、ライセンス、最後に情報源と
照合した日付とともに記載されています。

| データセット                                            | レコード数 | 用途                                                                                    |
| ------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------- |
| [管轄区域](./territory#judicial-areas)                  | 5          | どの hof van beroep / cour d'appel（と arbeidshof / cour du travail）が控訴を審理するか |
| [Arrondissement](./territory#arrondissements)           | 12         | 裁判所、検察庁、執行官のグループ分け。ほとんどの管轄規則が単位とするもの                |
| [Canton](./territory#cantons)                           | 162        | ある住所を管轄する vredegerecht / justice de paix はどこか                              |
| [Canton の境界](./canton-boundaries)                    | 162        | 分割された都市にある地点の canton、地図上の canton（GeoJSON）                           |
| [自治体](./territory#municipalities)                    | 565        | ベルギーのあらゆる住所や統計を REFNIS コードで司法の地図に結びつける                    |
| [地域](./territory#regions)                             | 3          | 自治体の地域を REFNIS コードで。3 言語の名称つき                                        |
| [州](./territory#provinces)                             | 10         | 自治体の州（ブリュッセルにはなし）と、その地域                                          |
| [郵便番号](./postal-codes)                              | 1 152      | 住所の郵便番号から自治体へ、さらにその canton と裁判所へ                                |
| [裁判所](./courts)                                      | 347        | あらゆる裁判所に書面を送り、書類を提出し、支払いをするための名称、住所、書記課の連絡先  |
| [刑務所](./prisons)                                     | 39         | すべての刑務所と detentiehuis / maison de détention の住所と連絡先                      |
| [Justitiehuis / maison de justice](./houses-of-justice) | 27         | 保護観察、被害者支援、家庭裁判所のための社会調査                                        |
| [利率](./interest-rates)                                | 2 系列     | 債権の遅延利息の計算                                                                    |

## データセット同士の関係 {#how-the-datasets-fit-together}

```
Judicial area ──< Arrondissement ──< Canton >──< Municipality (REFNIS) ──< Postal code
      │                 │              │  │
      │                 │              │  └── Canton boundary   canton のジオメトリ（NGI）
      └───────────── Court ────────────┘  vredegerecht / justice de paix は自分の canton に、
                        │                 すべての裁判所の住所は自治体にリンクする
                        └──< Division      部は自分の裁判所にリンクする
```

`──<` は「複数を持つ」と読みます。自治体は通常一つの canton に属しますが、分割された都市
（Antwerpen、Gent、Brussel、Luik など）は複数の canton に属します。行政の側では
`Region ──< Province ──< Municipality` となりますが、ブリュッセル首都圏地域には州がなく、19 の
自治体を直接持っています。

レコード同士は名称ではなく id でリンクします。裁判所は `judicialArea` の id を持ち、管轄区域が一つの
arrondissement であれば `arrondissement` の id も持ちます。canton はその自治体の REFNIS コードを
列挙し、郵便番号と裁判所の住所はその自治体の REFNIS コードを持ちます。名称の綴りは情報源や言語に
よって変わりますが、id は変わりません。

## このデータが役立つ理由 {#why-this-data-is-useful}

ベルギーの法務の仕事では同じ検索が何度も繰り返されますが、公式の情報源はコードから使いにくい
ものです。

- **管轄。** vredegerecht / justice de paix、politierechtbank / tribunal de police をはじめ多くの
  裁判所は、土地によって管轄が決まります。法律（Gerechtelijk Wetboek / Code judiciaire の附属書）は
  その区域を文章で、一部は通りごとに記述しています。`cantons.json` はそれを自治体から canton への
  検索に変換し、分割された都市については法令の条文を保持します。`canton-boundaries.json` は NGI の
  ジオメトリを加えるので、分割された都市の中の地点からでも canton を見つけられます。
- **正しい名称と住所。** 令状、準備書面、書簡は、`Vredegerecht Gent 1` や
  `Ondernemingsrechtbank Gent - afdeling Brugge` のように裁判所自身が名乗る名称で正しい裁判所に
  宛て、正しい書記課に届けなければなりません。名称は各裁判所自身のページから、公表されている
  すべての言語で取得しています。
- **利息の計算。** 遅延損害の請求には法定利率、事業者間であれば商取引の利率を使います。どちらも
  毎年または半期ごとに変わり、2013〜2015 年の移行期間は契約日によって扱いが異なります。一つの
  期間を間違えるだけで請求額が変わります。
- **他のデータとの結合。** REFNIS コードは Statbel、各地域、そしてほとんどのオープンデータが使って
  いるコードです。それを canton や arrondissement に対応づければ、事件数、人口、住所のデータを
  司法の地図の上に載せられます。

## （まだ）含まれていないもの {#what-isn-t-in-it-yet}

現在のデータの制約については[既知の欠落](./known-gaps)を、予定しているデータセット（最上級の
裁判所、履歴、執行官、警察管区、土地台帳・抵当権登記所）については[ロードマップ](./roadmap)を
参照してください。

::: warning リファレンスデータであり、法的助言ではありません
データは公式の情報源と照合していますが、情報源は変わり、誤りも起こります。値を頼りにする前に
公式の情報源を確認し、
[誤りを見つけたら報告してください](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)。
:::
