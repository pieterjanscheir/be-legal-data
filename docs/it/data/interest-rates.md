# Tassi d'interesse {#interest-rates}

File: `data/interest-rates.json`. Fonte: FOD Financiën / SPF Finances, pubblicati nel Belgisch
Staatsblad / Moniteur belge (la gazzetta ufficiale belga).

## Perché è utile {#why-it-s-useful}

Gli interessi su un pagamento tardivo fanno parte di quasi ogni credito, e il tasso dipende dal
giorno:

- **L'interesse legale** (wettelijke interest / intérêt légal) si applica ai debiti in generale,
  ed è ciò che i tribunali riconoscono come interessi moratori salvo che un contratto o una legge
  speciale dispongano diversamente.
- **L'interesse commerciale** (Wet 2 augustus 2002) si applica ai ritardi di pagamento tra
  imprese e nei confronti delle pubbliche amministrazioni, salvo che il contratto preveda un
  tasso più alto.

Un credito che si estende su più anni attraversa più periodi, ciascuno con il proprio tasso.
Sbagliare un solo periodo cambia l'importo richiesto, e la transizione 2013–2015 (sotto) è facile
da trascurare. `getInterestRate` fornisce il tasso giusto per un giorno, e restituisce `null`
invece di tirare a indovinare quando il tasso non è ancora pubblicato.

## Fonte e aggiornamenti {#source-and-updates}

|               |                                                                                                                                                                                                                                       |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte         | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (commerciale); avviso annuale nel Belgisch Staatsblad (legale) |
| Costruito da  | A mano: si aggiunge un periodo quando viene pubblicato un nuovo tasso                                                                                                                                                                 |
| Cambia quando | Ogni anno solare (legale); ogni semestre (commerciale)                                                                                                                                                                                |
| Verificato    | Ogni settimana: il controllo di aggiornamento apre una issue quando per oggi, o per le prossime due settimane, non c'è un tasso                                                                                                       |

- **Legale** (`legal`, wettelijke interest, Wet 5 mei 1865): fissato per anno solare; presente
  dal 1970.
- **Commerciale** (`commercial`, ritardi di pagamento nelle transazioni commerciali, Wet 2
  augustus 2002): fissato per semestre; presente dal 2002.

## Cerca un tasso {#look-up-a-rate}

<InterestRates />

## La regola sui contratti 2013–2015 {#the-2013-2015-contract-rule}

Dal 2013 al 15 marzo 2015 il tasso commerciale dipende da quando è stato concluso il contratto.
Questi periodi hanno un campo in più, `rateForContractsBefore20130316`. Per impostazione
predefinita `getInterestRate` restituisce il tasso per i contratti più vecchi; passa
`{ contractAfter20130316: true }` per i contratti conclusi il 16 marzo 2013 o dopo.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Periodi mancanti {#missing-periods}

`getInterestRate` restituisce `null` per un giorno senza tasso noto: prima del primo periodo, o
per un periodo non ancora pubblicato (o non ancora aggiunto). Usa `getLatestKnownRateDate(type)`
per mostrare fin dove arrivano i dati, e segnalalo invece di usare in silenzio lo 0 %.

## Struttura {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // primo giorno, incluso, YYYY-MM-DD
    to: string // ultimo giorno, incluso, YYYY-MM-DD
    rate: number // percentuale
    rateForContractsBefore20130316?: number
    note?: string
}
```
