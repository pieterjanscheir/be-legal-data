# Stopy procentowe {#interest-rates}

Plik: `data/interest-rates.json`. Źródło: FOD Financiën / SPF Finances (federalne ministerstwo
finansów), publikacja w Belgisch Staatsblad / Moniteur belge.

## Do czego się przydaje {#why-it-s-useful}

Odsetki od opóźnionej płatności są częścią niemal każdego roszczenia, a stopa zależy od dnia:

- **Odsetki ustawowe** (wettelijke interest / intérêt légal) dotyczą długów w ogólności i to je
  sądy zasądzają jako odsetki za zwłokę, chyba że umowa lub ustawa szczególna stanowi inaczej.
- **Odsetki handlowe** (Wet 2 augustus 2002) dotyczą opóźnień w płatnościach między
  przedsiębiorcami i wobec organów publicznych, chyba że umowa przewiduje wyższą stopę.

Roszczenie obejmujące kilka lat przechodzi przez kilka okresów, każdy z własną stopą. Błąd w
jednym okresie zmienia dochodzoną kwotę, a okres przejściowy 2013–2015 (poniżej) łatwo
przeoczyć. `getInterestRate` podaje właściwą stopę dla danego dnia i zwraca `null` zamiast
zgadywać, gdy stopa nie została jeszcze opublikowana.

## Źródło i aktualizacje {#source-and-updates}

|                  |                                                                                                                                                                                                                                         |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Źródło           | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (handlowe); coroczne ogłoszenie w Belgisch Staatsblad (ustawowe) |
| Budowane przez   | Ręcznie: dodaj okres, gdy zostanie opublikowana nowa stopa                                                                                                                                                                              |
| Zmienia się, gdy | Co rok kalendarzowy (ustawowe); co pół roku (handlowe)                                                                                                                                                                                  |
| Sprawdzanie      | Co tydzień: kontrola aktualności otwiera issue, gdy dziś lub w ciągu najbliższych dwóch tygodni brak stopy                                                                                                                              |

- **Ustawowe** (`legal`, wettelijke interest, Wet 5 mei 1865): ustalane na rok kalendarzowy; w
  danych od 1970 roku.
- **Handlowe** (`commercial`, opóźnienia w płatnościach w transakcjach handlowych, Wet 2 augustus
  2002): ustalane na półrocze; w danych od 2002 roku.

## Sprawdź stopę {#look-up-a-rate}

<InterestRates />

## Reguła dotycząca umów z lat 2013–2015 {#the-2013-2015-contract-rule}

Od 2013 roku do 15 marca 2015 stopa handlowa zależy od tego, kiedy zawarto umowę. Te okresy mają
dodatkowe pole `rateForContractsBefore20130316`. Domyślnie `getInterestRate` zwraca stopę dla
starszych umów; przekaż `{ contractAfter20130316: true }` dla umów zawartych 16 marca 2013 lub
później.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Brakujące okresy {#missing-periods}

`getInterestRate` zwraca `null` dla dnia, dla którego nie ma stopy w danych: przed pierwszym
okresem albo w okresie, który nie został jeszcze opublikowany (lub dodany). Użyj
`getLatestKnownRateDate(type)`, żeby pokazać, jak daleko sięgają dane, i ostrzec zamiast po
cichu przyjąć 0 %.

## Struktura {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // pierwszy dzień, włącznie, YYYY-MM-DD
    to: string // ostatni dzień, włącznie, YYYY-MM-DD
    rate: number // procent
    rateForContractsBefore20130316?: number
    note?: string
}
```
