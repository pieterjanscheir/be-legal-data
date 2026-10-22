# Dataset {#datasets}

Ogni dataset è un file JSON in `data/`, descritto da un [JSON Schema](/it/guide/schema) ed
elencato in [`datapackage.json`](/it/guide/schema#datapackage-json) con le sue fonti ufficiali,
la licenza e la data in cui è stato verificato l'ultima volta rispetto a esse.

| Dataset                                                    | Record  | A che cosa serve                                                                                                    |
| ---------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------- |
| [Distretti giudiziari](./territory#judicial-areas)         | 5       | Quale hof van beroep / cour d'appel (e quale arbeidshof / cour du travail) giudica un appello                       |
| [Arrondissement](./territory#arrondissements)              | 12      | Raggruppare tribunali, procure e ufficiali giudiziari; l'unità usata dalla maggior parte delle regole di competenza |
| [Cantoni](./territory#cantons)                             | 162     | Quale vredegerecht / justice de paix (giudice di pace) è competente per un indirizzo                                |
| [Confini dei cantoni](./canton-boundaries)                 | 162     | Il cantone di un punto in una città suddivisa; i cantoni su una mappa (GeoJSON)                                     |
| [Comuni](./territory#municipalities)                       | 565     | Collegare qualsiasi indirizzo o statistica belga alla mappa giudiziaria tramite codice REFNIS                       |
| [Regioni](./territory#regions)                             | 3       | La regione di un comune, per codice REFNIS, con il nome in tre lingue                                               |
| [Province](./territory#provinces)                          | 10      | La provincia di un comune (nessuna a Bruxelles), con la sua regione                                                 |
| [Codici postali](./postal-codes)                           | 1 152   | Dal codice postale di un indirizzo al suo comune, e da lì ai suoi cantoni e tribunali                               |
| [Corti e tribunali](./courts)                              | 347     | Nomi, indirizzi e contatti delle cancellerie per scrivere, depositare atti o pagare presso qualsiasi tribunale      |
| [Carceri](./prisons)                                       | 39      | Indirizzi e contatti di ogni carcere e casa di detenzione                                                           |
| [Justitiehuizen / maisons de justice](./houses-of-justice) | 27      | Probation, assistenza alle vittime e indagini sociali per i tribunali della famiglia                                |
| [Tassi d'interesse](./interest-rates)                      | 2 serie | Calcolare gli interessi di mora su un credito                                                                       |

## Come si collegano i dataset {#how-the-datasets-fit-together}

```
Distretto ──< Arrondissement ──< Cantone >──< Comune (REFNIS) ──< Codice postale
      │                 │              │  │
      │                 │              │  └── Confine del cantone   la geometria del cantone (NGI)
      └──────────── Tribunale ─────────┘  un giudice di pace rimanda al suo cantone,
                        │                 e l'indirizzo di ogni tribunale al suo comune
                        └──< Sezione       una sezione rimanda al suo tribunale
```

`──<` si legge "ha più". Un comune di solito si trova in un solo cantone; le città suddivise
(Antwerpen, Gent, Brussel, Luik, …) in più cantoni. Sul piano amministrativo vale `Regione ──<
Provincia ──< Comune`, tranne che la Regione di Bruxelles-Capitale non ha province e comprende
direttamente i suoi 19 comuni.

I record si collegano tra loro tramite id, mai tramite nome: un tribunale ha un id
`judicialArea` e, quando la sua area è un solo arrondissement, un id `arrondissement`; un
cantone elenca i codici REFNIS dei suoi comuni; un codice postale e l'indirizzo di un tribunale
portano il codice REFNIS del loro comune. I nomi cambiano grafia tra fonti e lingue; gli id no.

## Perché questi dati sono utili {#why-this-data-is-useful}

Il lavoro giuridico in Belgio si imbatte sempre nelle stesse ricerche, e le fonti ufficiali sono
difficili da usare dal codice:

- **Competenza.** Il vredegerecht / justice de paix, il politierechtbank / tribunal de police e
  molti altri tribunali sono competenti per territorio. La legge (l'allegato al Gerechtelijk
  Wetboek / Code judiciaire) descrive queste aree in prosa, in parte via per via.
  `cantons.json` le trasforma in una ricerca dal comune al cantone, e conserva il testo di legge
  per le città suddivise; `canton-boundaries.json` aggiunge la geometria dell'NGI, così un punto
  in una città suddivisa trova il suo cantone.
- **Nomi e indirizzi corretti.** Atti, conclusioni e lettere devono indirizzarsi al tribunale
  giusto con il nome che il tribunale stesso usa, come `Vredegerecht Gent 1` o
  `Ondernemingsrechtbank Gent - afdeling Brugge`, e raggiungere la cancelleria giusta. I nomi
  sono presi dalle pagine dei tribunali stessi, in ogni lingua in cui pubblicano.
- **Calcolo degli interessi.** Le richieste per ritardato pagamento usano il tasso legale
  oppure, tra imprese, il tasso per le transazioni commerciali. Entrambi cambiano ogni anno o
  ogni semestre, e la transizione 2013–2015 dipende dalla data del contratto. Sbagliare un solo
  periodo cambia l'importo richiesto.
- **Collegare altri dati.** I codici REFNIS sono quelli usati da Statbel, dalle regioni e dalla
  maggior parte degli open data. Ricondurli a cantoni e arrondissement permette di collocare sulla
  mappa giudiziaria dati sul carico di lavoro, sulla popolazione o sugli indirizzi.

## Che cosa non contiene (ancora) {#what-isn-t-in-it-yet}

Vedi le [lacune note](./known-gaps) per i limiti dei dati attuali e la [roadmap](./roadmap) per i
dataset previsti: le giurisdizioni supreme, la storia, gli ufficiali giudiziari, le zone di
polizia e gli uffici del catasto e delle ipoteche.

::: warning Dati di riferimento, non consulenza legale
I dati sono verificati rispetto alle fonti ufficiali, ma le fonti cambiano e gli errori capitano.
Controlla la fonte ufficiale prima di fare affidamento su un valore, e
[segnala qualsiasi errore](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml).
:::
