<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Justitiehuizen / maisons de justice {#houses-of-justice}

Plik: `data/houses-of-justice.json`. Justitiehuizen / maisons de justice (dosłownie „domy
sprawiedliwości”) Wspólnoty Flamandzkiej i Wspólnoty Francuskiej: {{ stats.housesOfJustice }}
rekordów.

Justitiehuizen / maisons de justice prowadzą i nadzorują sprawców na zlecenie sądów i prokuratur
(probacja, dozór elektroniczny, prace społeczne), przyjmują ofiary i sporządzają wywiady
społeczne dla familierechtbanken / tribunaux de la famille (sądów rodzinnych). Od 2015 roku
prowadzą je Wspólnoty.

## Do czego się przydaje {#why-it-s-useful}

- **Prawo rodzinne.** Familierechtbank / tribunal de la famille zleca wywiad społeczny
  justitiehuis / maison de justice z obszaru, na którym mieszka rodzina; adwokaci i strony
  potrzebują jego danych kontaktowych.
- **Prawo karne.** Warunki probacji, kary alternatywne i dozór elektroniczny są monitorowane
  przez justitiehuis / maison de justice; podobnie przyjmowanie ofiar.
- **Łączenie.** Flamandzkie placówki mają swój numer OVO, identyfikator we flamandzkim rejestrze
  organizacji ([Wegwijs](https://wegwijs.vlaanderen.be)), więc dane łączą się z innymi danymi
  flamandzkiej administracji.

## Źródło i aktualizacje {#source-and-updates}

|                |                                                                                                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Źródło         | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen) (Wspólnota Flamandzka) i [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/) (Wspólnota Francuska) |
| Budowane przez | `scripts/parse` z cotygodniowych snapshotów                                                                                                                                                                                                             |
| Sprawdzanie    | Co tydzień, przez [workflow sources](/pl/guide/data-quality#how-the-data-is-built)                                                                                                                                                                      |

Jeszcze nie ma w danych: justitiehuis / maison de justice Wspólnoty Niemieckojęzycznej w Eupen
([#3](https://github.com/pieterjanscheir/belgica/issues/3)). Bruksela ma zarówno placówkę
flamandzką (`justitiehuis-brussel`), jak i francuskojęzyczną (`maison-justice-bruxelles`).

## Pola {#fields}

| Pole                   | Typ                                     | Opis                                                                                                                                         |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `HouseOfJusticeId`                      | Z nazwy, bez rodzajników: `justitiehuis-gent`, `maison-justice-arlon`                                                                        |
| `validFrom`, `validTo` | string?                                 | Dni, w których rekord obowiązuje, tak jak wymieniała go strona; brak: od początku zakresu albo nadal obowiązuje. Zobacz [czas](/pl/api#time) |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | Wspólnota, która prowadzi placówkę                                                                                                           |
| `name`                 | `{ nl }` lub `{ fr }`                   | W języku Wspólnoty                                                                                                                           |
| `ovo`                  | string?                                 | Numer OVO we flamandzkim rejestrze organizacji, dla placówek flamandzkich: `OVO001917`                                                       |
| `address`              | `Address`                               | Z gminą, do której należy jego kod pocztowy (`municipality`, po kodzie REFNIS)                                                               |
| `contacts`             | `Contact[]`                             | Telefon, faks i e-mail; służba pomocy ofiarom placówki francuskojęzycznej ma własne kontakty z etykietami                                    |
| `website`              | `{ nl }` lub `{ fr }`                   | Strona, na której placówka jest wymieniona                                                                                                   |
| `sources`              | `{ url, retrieved }[]`                  | Strony, z których odczytano rekord                                                                                                           |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
