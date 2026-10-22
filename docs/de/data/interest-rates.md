# Zinssätze {#interest-rates}

Datei: `data/interest-rates.json`. Quelle: FÖD Finanzen (FOD Financiën), veröffentlicht im
Belgischen Staatsblatt.

## Wozu es dient {#why-it-s-useful}

Zinsen auf eine verspätete Zahlung gehören zu fast jeder Forderung, und der Zinssatz hängt vom Tag
ab:

- **Gesetzliche Zinsen** (wettelijke interest / intérêt légal) gelten für Schulden im Allgemeinen
  und sind das, was Gerichte als Verzugszinsen zusprechen, sofern kein Vertrag und kein
  Sondergesetz etwas anderes bestimmt.
- **Zinsen im Handelsverkehr** (Gesetz vom 2. August 2002, Wet 2 augustus 2002) gelten bei
  Zahlungsverzug zwischen Unternehmen und gegenüber öffentlichen Stellen, sofern der Vertrag keinen
  höheren Zinssatz festlegt.

Eine Forderung, die über mehrere Jahre läuft, durchquert mehrere Zeiträume mit jeweils eigenem
Zinssatz. Ein falscher Zeitraum ändert den geforderten Betrag, und der Übergang 2013–2015 (unten)
wird leicht übersehen. `getInterestRate` liefert den richtigen Zinssatz für einen Tag und gibt
`null` zurück, statt zu raten, wenn der Zinssatz noch nicht veröffentlicht ist.

## Quelle und Aktualisierungen {#source-and-updates}

|                   |                                                                                                                                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quelle            | [FÖD Finanzen](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (Handelsgeschäfte); jährliche Mitteilung im Belgischen Staatsblatt (gesetzlich) |
| Gebaut durch      | Von Hand: einen Zeitraum hinzufügen, wenn ein neuer Zinssatz veröffentlicht wird                                                                                                                                                                      |
| Ändert sich, wenn | Jedes Kalenderjahr (gesetzlich); jedes Halbjahr (Handelsgeschäfte)                                                                                                                                                                                    |
| Geprüft           | Wöchentlich: Die Aktualitätsprüfung öffnet ein Issue, wenn es für heute oder die nächsten zwei Wochen keinen Zinssatz gibt                                                                                                                            |

- **Gesetzlich** (`legal`, wettelijke interest, Gesetz vom 5. Mai 1865): pro Kalenderjahr
  festgelegt; in den Daten seit 1970.
- **Handelsgeschäfte** (`commercial`, Zahlungsverzug im Handelsverkehr, Gesetz vom 2. August 2002):
  pro Halbjahr festgelegt; in den Daten seit 2002.

## Einen Zinssatz nachschlagen {#look-up-a-rate}

<InterestRates />

## Die Vertragsregel 2013–2015 {#the-2013-2015-contract-rule}

Von 2013 bis zum 15. März 2015 hängt der Zinssatz für Handelsgeschäfte davon ab, wann der Vertrag
geschlossen wurde. Diese Zeiträume tragen zusätzlich ein `rateForContractsBefore20130316`.
Standardmäßig gibt `getInterestRate` den Zinssatz für ältere Verträge zurück; übergeben Sie
`{ contractAfter20130316: true }` für Verträge, die am oder nach dem 16. März 2013 geschlossen
wurden.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Fehlende Zeiträume {#missing-periods}

`getInterestRate` gibt `null` zurück für einen Tag ohne hinterlegten Zinssatz: vor dem ersten
Zeitraum oder in einem Zeitraum, der noch nicht veröffentlicht (oder hinzugefügt) ist. Verwenden
Sie `getLatestKnownRateDate(type)`, um anzuzeigen, wie weit die Daten reichen, und warnen Sie,
statt stillschweigend 0 % zu verwenden.

## Struktur {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // erster Tag, einschließlich, YYYY-MM-DD
    to: string // letzter Tag, einschließlich, YYYY-MM-DD
    rate: number // Prozent
    rateForContractsBefore20130316?: number
    note?: string
}
```
