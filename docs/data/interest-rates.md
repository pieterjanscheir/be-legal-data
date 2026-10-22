# Interest rates

File: `data/interest-rates.json`. Source: FOD Financiën, published in the Belgisch Staatsblad.

## Why it's useful

Interest on a late payment is part of almost every claim, and the rate depends on the day:

- **Legal interest** (wettelijke interest) applies to debts in general, and is what courts
  award as moratory interest unless a contract or a special law says otherwise.
- **Commercial interest** (Wet 2 augustus 2002) applies to late payment between businesses
  and towards public authorities, unless the contract sets a higher rate.

A claim that runs over several years crosses several periods, each with its own rate. Getting
one period wrong changes the amount claimed, and the 2013–2015 transition (below) is easy to
miss. `getInterestRate` gives the right rate for a day, and returns `null` instead of guessing
when the rate isn't published yet.

## Source and updates

|              |                                                                                                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source       | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (commercial); annual notice in the Belgisch Staatsblad (legal) |
| Built by     | Hand: add a period when a new rate is published                                                                                                                                                                                       |
| Changes when | Every calendar year (legal); every semester (commercial)                                                                                                                                                                              |
| Covers       | The legal rate from 1 July 1970, the commercial rate from 1 July 2002: `getInterestRate` returns `null` for a day outside the periods on file                                                                                         |
| Checked      | Weekly: the freshness check opens an issue when today, or the next two weeks, has no rate                                                                                                                                             |
| Licence      | CC BY 4.0                                                                                                                                                                                                                             |

- **Legal** (`legal`, wettelijke interest, Wet 5 mei 1865): set per calendar year; on file since 1970.
- **Commercial** (`commercial`, late payment in commercial transactions, Wet 2 augustus 2002):
  set per semester; on file since 2002.

## Look up a rate

<InterestRates />

## The 2013–2015 contract rule {#the-2013-2015-contract-rule}

From 2013 to 15 March 2015 the commercial rate depends on when the contract was concluded. Those
periods carry an extra `rateForContractsBefore20130316`. By default `getInterestRate` returns the
rate for older contracts; pass `{ contractAfter20130316: true }` for contracts concluded on or
after 16 March 2013.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Missing periods

`getInterestRate` returns `null` for a day with no rate on file: before the first period, or a
period that hasn't been published (or added) yet. Use `getLatestKnownRateDate(type)` to show how
far the data reaches, and warn instead of silently using 0 %.

## Shape

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // first day, inclusive, YYYY-MM-DD
    to: string // last day, inclusive, YYYY-MM-DD
    rate: number // percent
    rateForContractsBefore20130316?: number
    note?: string
}
```
