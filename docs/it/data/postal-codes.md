# Codici postali {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

File: `data/postal-codes.json`. I {{ stats.postalCodes.codes }} codici postali belgi, ciascuno
collegato al comune a cui appartiene tramite codice REFNIS: {{ stats.postalCodes.records }}
record, perché {{ stats.postalCodes.shared }} codici postali appartengono a due comuni.

## Perché è utile {#why-it-s-useful}

- **Da un indirizzo alla mappa giudiziaria.** Gli indirizzi hanno un codice postale, non un
  codice REFNIS. Il codice postale dà il comune, e il comune dà i suoi cantoni e tribunali:
  `findCourtsForPostalCode('9050', 'labour-court')` risponde a "quale tribunale per questo
  indirizzo?" per quanto lo consente il codice postale.
- **I codici postali di un comune.** Validare un modulo, indirizzare un invio postale,
  verificare che un indirizzo e un codice REFNIS concordino: `getPostalCodes('44021')`.
- **Il comune di ogni tribunale, carcere e justitiehuis / maison de justice.** Il loro
  `address.municipality` è questo collegamento, applicato al codice postale dell'indirizzo
  pubblicato ([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

## Fonte e aggiornamenti {#source-and-updates}

|               |                                                                                                                                                                                                                                                            |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte         | La [tabella di conversione dai codici postali ai codici REFNIS](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie) di Statbel, la tabella valida dal 1° gennaio 2025 (`…_va01012025.xlsx`)                                     |
| Costruito da  | `scripts/parse/postal-codes.ts` a partire dagli snapshot settimanali. La build fallisce quando un codice punta a un codice REFNIS che non è in `municipalities.json`, o un comune non ha alcun codice                                                      |
| Cambia quando | Statbel pubblica una nuova tabella: dei comuni si fondono, bpost aggiunge o ritira un codice postale                                                                                                                                                       |
| Copre         | Dal 1° gennaio 2025: le ricerche per un giorno precedente lanciano un `RangeError` ([tempo](/it/api#time)). Una tabella successiva dà alle coppie che elimina un `validTo` e a quelle che aggiunge un `validFrom`, nel giorno in cui la tabella si applica |
| Verificato    | Ogni settimana, dal [workflow sources](/it/guide/data-quality#how-the-data-is-built)                                                                                                                                                                       |
| Licenza       | © Statbel, [CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                                                                                   |

Statbel costruisce la tabella a partire dagli uffici postali di bpost e dai comuni della FOD
Financiën / SPF Finances. La tabella riporta anche un nome di comune per riga, che qui non viene
memorizzato: in alcuni casi differisce dall'elenco REFNIS di Statbel stesso (`Tongeren-Borgloon`
dove l'elenco dice `Tongres-Looz`, e `Saint-Nicolas` per Sint-Niklaas), e un record si collega al
suo comune invece di copiarlo. I nomi si trovano in `getMunicipality(record.municipality).name`.

## Codici postali condivisi {#shared-postal-codes}

Un comune ha più codici postali (Gent ne ha dieci), e un codice postale appartiene a un solo
comune, con tre eccezioni:

| Codice postale | Comuni                                          |
| -------------- | ----------------------------------------------- |
| `1040`         | Brussel (`21004`) e Etterbeek (`21005`)         |
| `1050`         | Brussel (`21004`) e Elsene (`21009`)            |
| `1804`         | Vilvoorde (`23088`) e Zemst (`23096`): Cargovil |

Per questi decide la via. `getMunicipalitiesForPostalCode` restituisce entrambi i comuni, e
`findCourtsForPostalCode` risponde per comune, così un codice condiviso non viene mai
ricondotto in silenzio a uno solo dei due.

## Campi {#fields}

| Campo                  | Tipo             | Descrizione                                                                                                                                                                                    |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PostalCodeId`   | Il codice postale e il codice REFNIS, uniti: `9000-44021`. Nessuno dei due da solo identifica un record; insieme sono entrambi ufficiali e unici. Vedi [identificatori](/it/guide/identifiers) |
| `validFrom`, `validTo` | string?          | I giorni in cui la coppia si applica, secondo le tabelle di Statbel; assente: dall'inizio della copertura, oppure ancora valida. Vedi [tempo](/it/api#time)                                    |
| `postalCode`           | string           | Il codice postale a quattro cifre                                                                                                                                                              |
| `municipality`         | `MunicipalityId` | Il comune a cui appartiene il codice postale, per codice REFNIS                                                                                                                                |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## Che cosa non contiene {#what-isn-t-in-it}

- **Le frazioni** (deelgemeenten, sections de commune): la tabella di Statbel si ferma al comune.
  L'elenco dei codici postali di bpost nomina le località, ma non riporta alcun codice REFNIS ed
  è pubblicato secondo le condizioni d'uso di bpost (tutti i diritti riservati), non con una
  licenza aperta, quindi non viene usato.
- **La via.** In una città suddivisa tra cantoni (Antwerpen, Gent, Brussel, Luik, …) il codice
  postale dà il comune, e il comune dà più cantoni; decide allora la via, e i confini esistono
  solo come prosa giuridica nel `territory` di ogni cantone finché
  [#29](https://github.com/pieterjanscheir/belgica/issues/29) non li aggiunge come geometria.

## Helper {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// Per comune: i suoi giudici di pace, e i suoi tribunali del tipo richiesto
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
