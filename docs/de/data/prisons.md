# Gefängnisse {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Datei: `data/prisons.json`. Die {{ stats.prisons }} Gefängnisse und Detentionshäuser
(detentiehuizen / maisons de détention) des FÖD Justiz (Generaldirektion der
Strafvollzugsanstalten).

## Wozu es dient {#why-it-s-useful}

- **An einen Inhaftierten oder sein Gefängnis schreiben.** Anwälte, Familien und Dienste brauchen
  Adresse und Telefonnummer des Gefängnisses; die Namen unterscheiden sich je nach Sprache
  (`Gevangenis van Bergen`, `Prison de Mons`, `Gefängnis Mons`).
- **Geld einzahlen.** Wo der FÖD Justiz das Konto des Gefängnisses für Geld für Inhaftierte
  veröffentlicht, steht es in den Kontakten als `bank-account`, mit geprüfter Prüfsumme.
- **Formulare und Akten.** Eine stabile ID pro Einrichtung zum Speichern in einer Akte und eine
  Liste zur Auswahl.

## Quelle und Aktualisierungen {#source-and-updates}

|                   |                                                                                                                                                                                                        |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Quelle            | [FÖD Justiz: belgische Gefängnisse](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen), die Seite jedes Gefängnisses auf Niederländisch, Französisch und Deutsch |
| Gebaut durch      | `scripts/parse` aus den wöchentlichen Snapshots                                                                                                                                                        |
| Ändert sich, wenn | Ein Gefängnis öffnet oder schließt oder seine Kontaktdaten ändert                                                                                                                                      |
| Geprüft           | Jede Woche, durch den [sources-Workflow](/de/guide/data-quality#how-the-data-is-built)                                                                                                                 |

## Felder {#fields}

| Feld                   | Typ                               | Beschreibung                                                                                                                                                       |
| ---------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                   | `PrisonId`                        | Aus dem Namen in der Landessprache, ohne Artikel: `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                      |
| `validFrom`, `validTo` | string?                           | Die Tage, an denen der Eintrag gilt, wie die Website ihn aufführte; fehlend: seit Beginn des abgedeckten Zeitraums bzw. gilt weiterhin. Siehe [Zeit](/de/api#time) |
| `kind`                 | `'prison'` \| `'detention-house'` | Ein Detentionshaus nimmt Personen mit kurzen Strafen auf, nahe ihrem Wohnort                                                                                       |
| `name`                 | `{ nl, fr, de }`                  | Wie der FÖD Justiz ihn veröffentlicht                                                                                                                              |
| `address`              | `Address`                         | In der Landessprache, mit der Gemeinde, zu der ihre Postleitzahl gehört (`municipality`, per REFNIS-Code)                                                          |
| `contacts`             | `Contact[]`                       | Telefon, Fax, E-Mail und das Konto für Geld für Inhaftierte, soweit veröffentlicht                                                                                 |
| `website`              | `{ nl, fr, de }`                  | Die Seite des Gefängnisses pro Sprache                                                                                                                             |
| `sources`              | `{ url, retrieved }[]`            | Die Seiten, aus denen der Eintrag gelesen wurde                                                                                                                    |

Der Name des Direktors, den die Seiten ebenfalls angeben, wird weggelassen: Er ändert sich, und es
sind personenbezogene Daten, die das Package nicht braucht.

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
