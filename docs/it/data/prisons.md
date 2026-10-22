# Carceri {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

File: `data/prisons.json`. Le {{ stats.prisons }} carceri e case di detenzione (detentiehuizen /
maisons de détention) della FOD Justitie / SPF Justice, il servizio pubblico federale Giustizia
(Directoraat-generaal Penitentiaire Inrichtingen / Direction générale des Établissements
pénitentiaires).

## Perché è utile {#why-it-s-useful}

- **Scrivere a un detenuto o al suo carcere.** Avvocati, familiari e servizi hanno bisogno
  dell'indirizzo e del numero di telefono del carcere; i nomi cambiano con la lingua
  (`Gevangenis van Bergen`, `Prison de Mons`, `Gefängnis Mons`).
- **Versare denaro.** Dove la FOD Justitie / SPF Justice pubblica il conto del carcere per il
  denaro destinato ai detenuti, questo si trova nei contatti come `bank-account`, con il checksum
  verificato.
- **Moduli e fascicoli.** Un id stabile per istituto da memorizzare con un fascicolo, e un elenco
  da cui scegliere.

## Fonte e aggiornamenti {#source-and-updates}

|               |                                                                                                                                                                                                     |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte         | [FOD Justitie / SPF Justice: carceri belghe](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen), la pagina di ogni carcere in neerlandese, francese e tedesco |
| Costruito da  | `scripts/parse` a partire dagli snapshot settimanali                                                                                                                                                |
| Cambia quando | Un carcere apre o chiude, o cambia i suoi dati di contatto                                                                                                                                          |
| Verificato    | Ogni settimana, dal [workflow sources](/it/guide/data-quality#how-the-data-is-built)                                                                                                                |

## Campi {#fields}

| Campo                  | Tipo                              | Descrizione                                                                                                                                             |
| ---------------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PrisonId`                        | Dal nome nella lingua locale, senza articoli: `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                               |
| `validFrom`, `validTo` | string?                           | I giorni in cui il record si applica, secondo l'elenco del sito; assente: dall'inizio della copertura, oppure ancora valido. Vedi [tempo](/it/api#time) |
| `kind`                 | `'prison'` \| `'detention-house'` | Una casa di detenzione accoglie persone con pene brevi, vicino a casa                                                                                   |
| `name`                 | `{ nl, fr, de }`                  | Come lo pubblica la FOD Justitie / SPF Justice                                                                                                          |
| `address`              | `Address`                         | Nella lingua locale, con il comune a cui appartiene il suo codice postale (`municipality`, per codice REFNIS)                                           |
| `contacts`             | `Contact[]`                       | Telefono, fax, e-mail e il conto per il denaro destinato ai detenuti, dove pubblicati                                                                   |
| `website`              | `{ nl, fr, de }`                  | La pagina del carcere per lingua                                                                                                                        |
| `sources`              | `{ url, retrieved }[]`            | Le pagine da cui è stato letto il record                                                                                                                |

Il nome del direttore, che le pagine riportano anch'esse, viene omesso: cambia, ed è un dato
personale di cui il package non ha bisogno.

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
