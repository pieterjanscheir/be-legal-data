# 利率 {#interest-rates}

ファイル：`data/interest-rates.json`。出典：FOD Financiën（連邦財務省）、Belgisch Staatsblad（官報）
で公表。

## 役立つ場面 {#why-it-s-useful}

支払遅延に対する利息はほぼすべての請求に含まれ、その利率は日によって異なります。

- **法定利率**（wettelijke interest）は債務一般に適用され、契約や特別法に別段の定めがない限り、
  裁判所が遅延利息として認めるのはこの利率です。
- **商取引の利率**（Wet 2 augustus 2002）は、事業者間および公的機関に対する支払遅延に適用され
  ます。ただし、契約でより高い利率を定めている場合を除きます。

数年にわたる請求は複数の期間にまたがり、期間ごとに利率が異なります。一つの期間を間違えるだけで
請求額が変わり、2013〜2015 年の移行期間（後述）は見落としやすいものです。`getInterestRate` は
ある日の正しい利率を返し、利率がまだ公表されていない場合は推測せずに `null` を返します。

## 出典と更新 {#source-and-updates}

|            |                                                                                                                                                                                                                              |
| ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 出典       | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties)（商取引）、Belgisch Staatsblad の年次告示（法定利率） |
| 作り方     | 手作業：新しい利率が公表されたら期間を追加                                                                                                                                                                                   |
| 変わるとき | 暦年ごと（法定利率）、半期ごと（商取引）                                                                                                                                                                                     |
| 照合       | 毎週：今日または今後 2 週間の利率がない場合、鮮度チェックが issue を作成                                                                                                                                                     |

- **法定利率**（`legal`、wettelijke interest、Wet 5 mei 1865）：暦年ごとに定められます。1970 年
  以降を収録。
- **商取引**（`commercial`、商取引における支払遅延、Wet 2 augustus 2002）：半期ごとに定められます。
  2002 年以降を収録。

## 利率を調べる {#look-up-a-rate}

<InterestRates />

## 2013〜2015 年の契約ルール {#the-2013-2015-contract-rule}

2013 年から 2015 年 3 月 15 日までは、商取引の利率は契約がいつ締結されたかによって異なります。
これらの期間には追加の `rateForContractsBefore20130316` があります。`getInterestRate` はデフォルト
で古い契約の利率を返します。2013 年 3 月 16 日以降に締結された契約については
`{ contractAfter20130316: true }` を渡してください。

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## 欠落している期間 {#missing-periods}

`getInterestRate` は利率の記録がない日、つまり最初の期間より前の日や、まだ公表されていない
（あるいはまだ追加されていない）期間の日には `null` を返します。`getLatestKnownRateDate(type)` を
使ってデータがどこまであるかを示し、黙って 0 % を使う代わりに警告を出してください。

## 構造 {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // 最初の日（その日を含む）、YYYY-MM-DD
    to: string // 最後の日（その日を含む）、YYYY-MM-DD
    rate: number // パーセント
    rateForContractsBefore20130316?: number
    note?: string
}
```
