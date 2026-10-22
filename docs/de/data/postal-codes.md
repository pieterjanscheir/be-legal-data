# Postleitzahlen {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Datei: `data/postal-codes.json`. Die {{ stats.postalCodes.codes }} belgischen Postleitzahlen,
jeweils per REFNIS-Code mit der Gemeinde verknüpft, zu der sie gehören: {{ stats.postalCodes.records }}
Einträge, weil {{ stats.postalCodes.shared }} Postleitzahlen zu zwei Gemeinden gehören.

## Wozu es dient {#why-it-s-useful}

- **Von einer Adresse zur Gerichtslandkarte.** Adressen haben eine Postleitzahl, keinen
  REFNIS-Code. Die Postleitzahl liefert die Gemeinde, und die Gemeinde ihre Kantone und Gerichte:
  `findCourtsForPostalCode('9050', 'labour-court')` beantwortet „welches Gericht für diese
  Adresse?“, soweit die Postleitzahl es kann.
- **Die Postleitzahlen einer Gemeinde.** Ein Formular validieren, ein Mailing adressieren, prüfen,
  ob eine Adresse und ein REFNIS-Code zusammenpassen: `getPostalCodes('44021')`.
- **Die Gemeinde jedes Gerichts, Gefängnisses und Justizhauses.** Ihr `address.municipality` ist
  diese Verknüpfung, angewandt auf die Postleitzahl der veröffentlichten Adresse
  ([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

## Quelle und Aktualisierungen {#source-and-updates}

|                   |                                                                                                                                                                                                                                                                       |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quelle            | Die [Umrechnungstabelle von Postleitzahlen zu REFNIS-Codes](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie) von Statbel, die ab dem 1. Januar 2025 geltende Tabelle (`…_va01012025.xlsx`)                                              |
| Gebaut durch      | `scripts/parse/postal-codes.ts` aus den wöchentlichen Snapshots. Der Build schlägt fehl, wenn ein Code auf einen REFNIS-Code zeigt, der nicht in `municipalities.json` steht, oder eine Gemeinde keinen Code hat                                                      |
| Ändert sich, wenn | Statbel eine neue Tabelle veröffentlicht: Gemeinden fusionieren, bpost fügt eine Postleitzahl hinzu oder zieht sie ein                                                                                                                                                |
| Deckt ab          | Ab dem 1. Januar 2025: Nachschlagen für einen früheren Tag wirft einen `RangeError` ([Zeit](/de/api#time)). Eine spätere Tabelle gibt den Paaren, die sie streicht, ein `validTo` und den Paaren, die sie hinzufügt, ein `validFrom`, am Tag, ab dem die Tabelle gilt |
| Geprüft           | Jede Woche, durch den [sources-Workflow](/de/guide/data-quality#how-the-data-is-built)                                                                                                                                                                                |
| Lizenz            | © Statbel, [CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                                                                                              |

Statbel baut die Tabelle aus den Postämtern von bpost und den Gemeinden des FÖD Finanzen. Sie
enthält auch einen Gemeindenamen pro Zeile, der hier nicht gespeichert wird: Er weicht an einigen
Stellen von der eigenen REFNIS-Liste von Statbel ab (`Tongeren-Borgloon`, wo die Liste
`Tongres-Looz` sagt, und `Saint-Nicolas` für Sint-Niklaas), und ein Eintrag verweist auf seine
Gemeinde, statt sie zu kopieren. `getMunicipality(record.municipality).name` liefert die Namen.

## Geteilte Postleitzahlen {#shared-postal-codes}

Eine Gemeinde hat mehrere Postleitzahlen (Gent hat zehn), und eine Postleitzahl gehört zu einer
Gemeinde, mit drei Ausnahmen:

| Postleitzahl | Gemeinden                                         |
| ------------ | ------------------------------------------------- |
| `1040`       | Brüssel (`21004`) und Etterbeek (`21005`)         |
| `1050`       | Brüssel (`21004`) und Ixelles/Elsene (`21009`)    |
| `1804`       | Vilvoorde (`23088`) und Zemst (`23096`): Cargovil |

Bei diesen entscheidet die Straße. `getMunicipalitiesForPostalCode` gibt beide Gemeinden zurück,
und `findCourtsForPostalCode` antwortet pro Gemeinde, sodass ein geteilter Code nie stillschweigend
einer von beiden zugeordnet wird.

## Felder {#fields}

| Feld                   | Typ              | Beschreibung                                                                                                                                                                        |
| ---------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PostalCodeId`   | Postleitzahl und REFNIS-Code, verbunden: `9000-44021`. Keiner allein benennt einen Eintrag; zusammen sind sie amtlich und eindeutig. Siehe [Identifikatoren](/de/guide/identifiers) |
| `validFrom`, `validTo` | string?          | Die Tage, an denen das Paar gilt, wie die Tabellen von Statbel sie angeben; fehlend: seit Beginn des abgedeckten Zeitraums bzw. gilt weiterhin. Siehe [Zeit](/de/api#time)          |
| `postalCode`           | string           | Die vierstellige Postleitzahl                                                                                                                                                       |
| `municipality`         | `MunicipalityId` | Die Gemeinde, zu der die Postleitzahl gehört, per REFNIS-Code                                                                                                                       |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## Was nicht enthalten ist {#what-isn-t-in-it}

- **Teilgemeinden** (deelgemeenten / sections de commune): Die Tabelle von Statbel endet bei der
  Gemeinde. Die eigene Postleitzahlenliste von bpost nennt die Ortschaften, enthält aber keinen
  REFNIS-Code und wird unter den Nutzungsbedingungen von bpost veröffentlicht (alle Rechte
  vorbehalten), nicht unter einer offenen Lizenz; sie wird daher nicht verwendet.
- **Die Straße.** In einer auf Kantone aufgeteilten Stadt (Antwerpen, Gent, Brüssel, Lüttich, …)
  liefert die Postleitzahl die Gemeinde und die Gemeinde mehrere Kantone; dann entscheidet die
  Straße, und die Grenzen existieren nur als juristischer Fließtext in `territory` jedes Kantons,
  bis [#29](https://github.com/pieterjanscheir/belgica/issues/29) sie als Geometrie hinzufügt.

## Hilfsfunktionen {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// Pro Gemeinde: ihre Friedensgerichte und ihre Gerichte des angefragten Typs
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
