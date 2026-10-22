<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Justitiehuizen / maisons de justice {#houses-of-justice}

File: `data/houses-of-justice.json`. Le justitiehuizen / maisons de justice ("case della
giustizia", i servizi territoriali di giustizia) delle Comunità fiamminga e francese:
{{ stats.housesOfJustice }} record.

Le justitiehuizen / maisons de justice seguono e controllano gli autori di reato per conto dei
tribunali e delle procure (probation, sorveglianza elettronica, lavori di pubblica utilità),
accolgono le vittime e redigono indagini sociali per i tribunali della famiglia
(familierechtbank / tribunal de la famille). Dal 2015 sono gestite dalle Comunità.

## Perché è utile {#why-it-s-useful}

- **Diritto di famiglia.** Un tribunale della famiglia dispone un'indagine sociale presso la
  justitiehuis / maison de justice dell'area della famiglia; avvocati e parti hanno bisogno dei
  suoi contatti.
- **Diritto penale.** Le condizioni della probation, le pene alternative e la sorveglianza
  elettronica sono seguite dalla justitiehuis / maison de justice; lo stesso vale per
  l'accoglienza delle vittime.
- **Collegamenti.** Le sedi fiamminghe hanno il loro numero OVO, l'identificatore nel registro
  delle organizzazioni fiammingo ([Wegwijs](https://wegwijs.vlaanderen.be)), così i dati si
  collegano ad altri dati del governo fiammingo.

## Fonte e aggiornamenti {#source-and-updates}

|              |                                                                                                                                                                                                                                                     |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte        | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen) (Comunità fiamminga) e [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/) (Comunità francese) |
| Costruito da | `scripts/parse` a partire dagli snapshot settimanali                                                                                                                                                                                                |
| Verificato   | Ogni settimana, dal [workflow sources](/it/guide/data-quality#how-the-data-is-built)                                                                                                                                                                |

Non ancora nei dati: la sede della Comunità germanofona a Eupen
([#3](https://github.com/pieterjanscheir/belgica/issues/3)). Bruxelles ha sia una sede fiamminga
(`justitiehuis-brussel`) sia una francofona (`maison-justice-bruxelles`).

## Campi {#fields}

| Campo                  | Tipo                                    | Descrizione                                                                                                                                             |
| ---------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `HouseOfJusticeId`                      | Dal nome, senza articoli: `justitiehuis-gent`, `maison-justice-arlon`                                                                                   |
| `validFrom`, `validTo` | string?                                 | I giorni in cui il record si applica, secondo l'elenco del sito; assente: dall'inizio della copertura, oppure ancora valido. Vedi [tempo](/it/api#time) |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | La Comunità che la gestisce                                                                                                                             |
| `name`                 | `{ nl }` o `{ fr }`                     | Nella lingua della Comunità                                                                                                                             |
| `ovo`                  | string?                                 | Numero OVO nel registro delle organizzazioni fiammingo, per le sedi fiamminghe: `OVO001917`                                                             |
| `address`              | `Address`                               | Con il comune a cui appartiene il suo codice postale (`municipality`, per codice REFNIS)                                                                |
| `contacts`             | `Contact[]`                             | Telefono, fax ed e-mail; il servizio di accoglienza delle vittime di una sede francofona ha i propri contatti, con etichetta                            |
| `website`              | `{ nl }` o `{ fr }`                     | La pagina in cui è elencata                                                                                                                             |
| `sources`              | `{ url, retrieved }[]`                  | Le pagine da cui è stato letto il record                                                                                                                |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
