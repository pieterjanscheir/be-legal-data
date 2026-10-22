# 利率 {#interest-rates}

文件：`data/interest-rates.json`。来源：FOD Financiën（联邦财政部），刊登于 Belgisch Staatsblad / Moniteur belge（比利时政府公报）。

## 有什么用 {#why-it-s-useful}

迟延付款的利息几乎是每一笔债权的组成部分，而利率取决于具体日期：

- **法定利率**（wettelijke interest / intérêt légal）一般适用于各类债务，也是法院在合同或特别法没有另行规定时判给的迟延利息。
- **商业交易利率**（Wet 2 augustus 2002）适用于企业之间以及对公共机构的迟延付款，除非合同约定了更高的利率。

一笔跨越数年的债权会经过多个期间，每个期间都有自己的利率。算错一个期间，主张的金额就会出错，而 2013–2015
年的过渡期（见下文）很容易被忽略。`getInterestRate` 会给出某一天的正确利率；如果利率尚未公布，它返回 `null`，而不是去猜测。

## 来源与更新 {#source-and-updates}

|          |                                                                                                                                                                                                                              |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 来源     | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties)（商业交易）；Belgisch Staatsblad 上的年度公告（法定） |
| 构建方式 | 手工：新利率公布时添加一个期间                                                                                                                                                                                               |
| 变动时间 | 每个日历年（法定）；每半年（商业交易）                                                                                                                                                                                       |
| 检查     | 每周：如果今天或接下来两周没有利率，新鲜度检查会开一个 issue                                                                                                                                                                 |

- **法定**（`legal`，wettelijke interest，Wet 5 mei 1865）：按日历年确定；数据自 1970 年起。
- **商业交易**（`commercial`，商业交易中的迟延付款，Wet 2 augustus 2002）：按半年确定；数据自 2002 年起。

## 查询利率 {#look-up-a-rate}

<InterestRates />

## 2013–2015 年的合同规则 {#the-2013-2015-contract-rule}

从 2013 年到 2015 年 3 月 15 日，商业交易利率取决于合同的订立时间。这些期间带有一个额外的
`rateForContractsBefore20130316`。默认情况下，`getInterestRate` 返回较早合同适用的利率；对于 2013 年 3 月 16 日或之后订立的合同，
请传入 `{ contractAfter20130316: true }`。

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## 缺失的期间 {#missing-periods}

对于数据中没有利率的日期，`getInterestRate` 返回 `null`：早于第一个期间，或者某个期间尚未公布（或尚未添加）。
请用 `getLatestKnownRateDate(type)` 显示数据覆盖到哪一天，并给出警告，而不是悄悄地按 0 % 计算。

## 结构 {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // 第一天（含），YYYY-MM-DD
    to: string // 最后一天（含），YYYY-MM-DD
    rate: number // 百分比
    rateForContractsBefore20130316?: number
    note?: string
}
```
