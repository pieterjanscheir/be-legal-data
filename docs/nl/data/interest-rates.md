# Rentevoeten {#interest-rates}

Bestand: `data/interest-rates.json`. Bron: FOD Financiën, bekendgemaakt in het Belgisch
Staatsblad.

## Waarvoor het dient {#why-it-s-useful}

Interest op een laattijdige betaling maakt deel uit van bijna elke vordering, en de rentevoet
hangt af van de dag:

- **Wettelijke interest** geldt voor schulden in het algemeen, en is wat rechtbanken als
  moratoire interest toekennen tenzij een contract of een bijzondere wet anders bepaalt.
- **Interest voor handelstransacties** (Wet 2 augustus 2002) geldt bij betalingsachterstand
  tussen ondernemingen en tegenover overheden, tenzij het contract een hogere rentevoet
  vastlegt.

Een vordering die over meerdere jaren loopt, doorkruist meerdere periodes, elk met een eigen
rentevoet. Eén periode fout en het gevorderde bedrag klopt niet, en de overgang 2013–2015
(hieronder) is makkelijk te missen. `getInterestRate` geeft de juiste rentevoet voor een dag,
en geeft `null` terug in plaats van te gissen als de rentevoet nog niet bekendgemaakt is.

## Bron en updates {#source-and-updates}

|               |                                                                                                                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bron          | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (handelstransacties); jaarlijks bericht in het Belgisch Staatsblad (wettelijk) |
| Gebouwd door  | Met de hand: een periode toevoegen als een nieuwe rentevoet bekendgemaakt wordt                                                                                                                                                                       |
| Verandert bij | Elk kalenderjaar (wettelijk); elk semester (handelstransacties)                                                                                                                                                                                       |
| Gecontroleerd | Wekelijks: de actualiteitscheck opent een issue als er voor vandaag, of de komende twee weken, geen rentevoet is                                                                                                                                      |

- **Wettelijk** (`legal`, wettelijke interest, Wet 5 mei 1865): vastgelegd per kalenderjaar; in de data sinds 1970.
- **Handelstransacties** (`commercial`, betalingsachterstand bij handelstransacties, Wet 2 augustus 2002):
  vastgelegd per semester; in de data sinds 2002.

## Zoek een rentevoet op {#look-up-a-rate}

<InterestRates />

## De contractregel 2013–2015 {#the-2013-2015-contract-rule}

Van 2013 tot 15 maart 2015 hangt de rentevoet voor handelstransacties af van wanneer het contract
gesloten is. Die periodes dragen een extra `rateForContractsBefore20130316`. Standaard geeft
`getInterestRate` de rentevoet voor oudere contracten terug; geef `{ contractAfter20130316: true }`
mee voor contracten gesloten op of na 16 maart 2013.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Ontbrekende periodes {#missing-periods}

`getInterestRate` geeft `null` terug voor een dag zonder rentevoet in de data: vóór de eerste
periode, of een periode die nog niet bekendgemaakt (of toegevoegd) is. Gebruik
`getLatestKnownRateDate(type)` om te tonen hoe ver de data reikt, en waarschuw in plaats van
stilzwijgend 0 % te gebruiken.

## Vorm {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // eerste dag, inclusief, YYYY-MM-DD
    to: string // laatste dag, inclusief, YYYY-MM-DD
    rate: number // procent
    rateForContractsBefore20130316?: number
    note?: string
}
```
