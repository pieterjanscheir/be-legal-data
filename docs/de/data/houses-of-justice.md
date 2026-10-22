<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Justizhäuser {#houses-of-justice}

Datei: `data/houses-of-justice.json`. Die Justizhäuser (justitiehuizen / maisons de justice) der
Flämischen und der Französischen Gemeinschaft: {{ stats.housesOfJustice }} Einträge.

Justizhäuser begleiten und betreuen Täter im Auftrag der Gerichte und Staatsanwaltschaften
(Bewährung, elektronische Überwachung, gemeinnützige Arbeit), nehmen Opfer auf und erstellen
Sozialuntersuchungen für die Familiengerichte. Seit 2015 werden sie von den Gemeinschaften
betrieben.

## Wozu es dient {#why-it-s-useful}

- **Familienrecht.** Ein Familiengericht ordnet eine Sozialuntersuchung beim Justizhaus des
  Gebiets der Familie an; Anwälte und Parteien brauchen dessen Kontaktdaten.
- **Strafrecht.** Bewährungsauflagen, alternative Strafen und elektronische Überwachung werden vom
  Justizhaus begleitet, ebenso die Aufnahme von Opfern.
- **Verknüpfen.** Die flämischen Justizhäuser tragen ihre OVO-Nummer, den Identifikator im
  flämischen Organisationsregister ([Wegwijs](https://wegwijs.vlaanderen.be)), sodass die Daten
  sich mit anderen Daten der flämischen Verwaltung verknüpfen lassen.

## Quelle und Aktualisierungen {#source-and-updates}

|              |                                                                                                                                                                                                                                                                   |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quelle       | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen) (Flämische Gemeinschaft) und [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/) (Französische Gemeinschaft) |
| Gebaut durch | `scripts/parse` aus den wöchentlichen Snapshots                                                                                                                                                                                                                   |
| Geprüft      | Jede Woche, durch den [sources-Workflow](/de/guide/data-quality#how-the-data-is-built)                                                                                                                                                                            |

Noch nicht in den Daten: das Justizhaus der Deutschsprachigen Gemeinschaft in Eupen
([#3](https://github.com/pieterjanscheir/belgica/issues/3)). Brüssel hat sowohl ein flämisches
(`justitiehuis-brussel`) als auch ein französischsprachiges Justizhaus (`maison-justice-bruxelles`).

## Felder {#fields}

| Feld                   | Typ                                     | Beschreibung                                                                                                                                                       |
| ---------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                   | `HouseOfJusticeId`                      | Aus dem Namen, ohne Artikel: `justitiehuis-gent`, `maison-justice-arlon`                                                                                           |
| `validFrom`, `validTo` | string?                                 | Die Tage, an denen der Eintrag gilt, wie die Website ihn aufführte; fehlend: seit Beginn des abgedeckten Zeitraums bzw. gilt weiterhin. Siehe [Zeit](/de/api#time) |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | Die Gemeinschaft, die es betreibt                                                                                                                                  |
| `name`                 | `{ nl }` oder `{ fr }`                  | In der Sprache der Gemeinschaft                                                                                                                                    |
| `ovo`                  | string?                                 | OVO-Nummer im flämischen Organisationsregister, für die flämischen Justizhäuser: `OVO001917`                                                                       |
| `address`              | `Address`                               | Mit der Gemeinde, zu der ihre Postleitzahl gehört (`municipality`, per REFNIS-Code)                                                                                |
| `contacts`             | `Contact[]`                             | Telefon, Fax und E-Mail; der Opferdienst eines französischsprachigen Justizhauses hat eigene, gekennzeichnete Kontakte                                             |
| `website`              | `{ nl }` oder `{ fr }`                  | Die Seite, auf der es aufgeführt ist                                                                                                                               |
| `sources`              | `{ url, retrieved }[]`                  | Die Seiten, aus denen der Eintrag gelesen wurde                                                                                                                    |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
