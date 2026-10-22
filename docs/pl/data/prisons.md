# Więzienia {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Plik: `data/prisons.json`. {{ stats.prisons }} więzień i detentiehuizen / maisons de détention
(małych zakładów dla osób z krótkimi wyrokami) podległych FOD Justitie / SPF Justice
(Directoraat-generaal Penitentiaire Inrichtingen / Direction générale des Établissements
pénitentiaires).

## Do czego się przydaje {#why-it-s-useful}

- **Korespondencja z osadzonym lub jego więzieniem.** Adwokaci, rodziny i służby potrzebują
  adresu i numeru telefonu więzienia; nazwy różnią się w zależności od języka
  (`Gevangenis van Bergen`, `Prison de Mons`, `Gefängnis Mons`).
- **Wpłacanie pieniędzy.** Tam, gdzie FOD Justitie / SPF Justice publikuje rachunek więzienia na
  pieniądze dla osadzonych, jest on w kontaktach jako `bank-account`, ze sprawdzoną sumą
  kontrolną.
- **Formularze i akta spraw.** Stabilne id każdej instytucji do zapisania w aktach i lista do
  wyboru.

## Źródło i aktualizacje {#source-and-updates}

|                  |                                                                                                                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Źródło           | [FOD Justitie / SPF Justice: belgijskie więzienia](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen), strona każdego więzienia po niderlandzku, francusku i niemiecku |
| Budowane przez   | `scripts/parse` z cotygodniowych snapshotów                                                                                                                                                                  |
| Zmienia się, gdy | Więzienie jest otwierane lub zamykane albo zmienia dane kontaktowe                                                                                                                                           |
| Sprawdzanie      | Co tydzień, przez [workflow sources](/pl/guide/data-quality#how-the-data-is-built)                                                                                                                           |

## Pola {#fields}

| Pole                   | Typ                               | Opis                                                                                                                                         |
| ---------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PrisonId`                        | Z nazwy w języku lokalnym, bez rodzajników: `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                      |
| `validFrom`, `validTo` | string?                           | Dni, w których rekord obowiązuje, tak jak wymieniała go strona; brak: od początku zakresu albo nadal obowiązuje. Zobacz [czas](/pl/api#time) |
| `kind`                 | `'prison'` \| `'detention-house'` | Detentiehuis / maison de détention przyjmuje osoby z krótkimi wyrokami, blisko miejsca zamieszkania                                          |
| `name`                 | `{ nl, fr, de }`                  | W brzmieniu publikowanym przez FOD Justitie / SPF Justice                                                                                    |
| `address`              | `Address`                         | W języku lokalnym, z gminą, do której należy jego kod pocztowy (`municipality`, po kodzie REFNIS)                                            |
| `contacts`             | `Contact[]`                       | Telefon, faks, e-mail i rachunek na pieniądze dla osadzonych, jeśli zostały opublikowane                                                     |
| `website`              | `{ nl, fr, de }`                  | Strona więzienia dla każdego języka                                                                                                          |
| `sources`              | `{ url, retrieved }[]`            | Strony, z których odczytano rekord                                                                                                           |

Nazwisko dyrektora, które strony również podają, jest pomijane: zmienia się, a to dane osobowe,
których pakiet nie potrzebuje.

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
