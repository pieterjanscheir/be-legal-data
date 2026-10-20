# Interest rates

File: `data/interest-rates.json`. Source: FOD Financiën, published in the Belgisch Staatsblad.

- **Legal** (`legal`, wettelijke interest, Wet 5 mei 1865): set per calendar year; on file since 1970.
- **Commercial** (`commercial`, late payment in commercial transactions, Wet 2 augustus 2002):
  set per semester; on file since 2002.

## Look up a rate

<InterestRates />

## The 2013–2015 contract rule

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
