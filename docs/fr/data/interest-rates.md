# Taux d'intérêt {#interest-rates}

Fichier : `data/interest-rates.json`. Source : SPF Finances, publié au Moniteur belge.

## À quoi ça sert {#why-it-s-useful}

Les intérêts de retard font partie de presque toute créance, et le taux dépend du jour :

- **L'intérêt légal** (wettelijke interest) s'applique aux dettes en général ; c'est ce que les
  tribunaux accordent à titre d'intérêts moratoires, sauf si un contrat ou une loi spéciale en
  dispose autrement.
- **L'intérêt commercial** (loi du 2 août 2002) s'applique au retard de paiement entre
  entreprises et envers les pouvoirs publics, sauf si le contrat fixe un taux plus élevé.

Une créance qui court sur plusieurs années traverse plusieurs périodes, chacune avec son propre
taux. Se tromper sur une seule période change le montant réclamé, et la transition 2013–2015
(ci-dessous) est facile à manquer. `getInterestRate` donne le bon taux pour un jour donné, et
renvoie `null` plutôt que de deviner quand le taux n'est pas encore publié.

## Source et mises à jour {#source-and-updates}

|               |                                                                                                                                                                                                                            |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source        | [SPF Finances](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (commercial) ; avis annuel au Moniteur belge (légal) |
| Construit par | À la main : ajouter une période quand un nouveau taux est publié                                                                                                                                                           |
| Change        | Chaque année civile (légal) ; chaque semestre (commercial)                                                                                                                                                                 |
| Vérifié       | Chaque semaine : le contrôle de fraîcheur ouvre une issue quand aujourd'hui, ou les deux semaines à venir, n'a pas de taux                                                                                                 |

- **Légal** (`legal`, wettelijke interest, loi du 5 mai 1865) : fixé par année civile ; dans les données depuis 1970.
- **Commercial** (`commercial`, retard de paiement dans les transactions commerciales, loi du 2 août 2002) :
  fixé par semestre ; dans les données depuis 2002.

## Consulter un taux {#look-up-a-rate}

<InterestRates />

## La règle contractuelle 2013–2015 {#the-2013-2015-contract-rule}

De 2013 au 15 mars 2015, le taux commercial dépend de la date de conclusion du contrat. Ces
périodes portent un champ supplémentaire, `rateForContractsBefore20130316`. Par défaut,
`getInterestRate` renvoie le taux des contrats plus anciens ; passez `{ contractAfter20130316: true }`
pour les contrats conclus le 16 mars 2013 ou après.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Périodes manquantes {#missing-periods}

`getInterestRate` renvoie `null` pour un jour sans taux dans les données : avant la première
période, ou dans une période pas encore publiée (ou pas encore ajoutée). Utilisez
`getLatestKnownRateDate(type)` pour montrer jusqu'où vont les données, et avertissez au lieu
d'appliquer 0 % en silence.

## Structure {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // premier jour, inclus, YYYY-MM-DD
    to: string // dernier jour, inclus, YYYY-MM-DD
    rate: number // pour cent
    rateForContractsBefore20130316?: number
    note?: string
}
```
