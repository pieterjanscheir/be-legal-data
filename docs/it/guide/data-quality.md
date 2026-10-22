# Qualità e aggiornamento dei dati {#data-quality-freshness}

I dati giuridici di riferimento invecchiano in silenzio: viene pubblicato un nuovo tasso
d'interesse, un tribunale trasloca, una legge fonde due cantoni. Questa pagina spiega come il
package si mantiene aggiornato, e quanto ci si può fidare di ciascun dataset.

## Da dove viene ogni dataset {#where-each-dataset-comes-from}

| Dataset                              | Fonte                                                             | Come è costruito                          | Cambia quando                                                            | Revisione ogni |
| ------------------------------------ | ----------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------ | -------------- |
| Distretti giudiziari, arrondissement | Gerechtelijk Wetboek / Code judiciaire, allegato art. 4–5         | A mano                                    | Una legge ridisegna la mappa giudiziaria (raro; l'ultima volta nel 2014) | 24 mesi        |
| Cantoni                              | Gerechtelijk Wetboek / Code judiciaire, allegato art. 1 (nl + fr) | Generato: `pnpm build:cantons`            | Una legge modifica l'allegato; dei comuni si fondono                     | 12 mesi        |
| Confini dei cantoni                  | NGI (geo.be)                                                      | Settimanale: snapshot + `pnpm build:data` | L'NGI pubblica una nuova versione                                        | Ogni settimana |
| Comuni                               | Open data di Statbel                                              | Generato: `pnpm build:cantons`            | Dei comuni si fondono (2019, 2025)                                       | 12 mesi        |
| Regioni, province                    | Elenco dei codici REFNIS di Statbel                               | Settimanale: snapshot + `pnpm build:data` | Statbel modifica il suo registro (l'ultima volta nel 1995)               | Ogni settimana |
| Corti e tribunali                    | tribunaux-rechtbanken.be                                          | Settimanale: snapshot + `pnpm build:data` | Un tribunale trasloca o cambia contatti od orari                         | Ogni settimana |
| Carceri                              | justitie.belgium.be                                               | Settimanale: snapshot + `pnpm build:data` | Un carcere apre, chiude o cambia i suoi contatti                         | Ogni settimana |
| Justitiehuizen / maisons de justice  | vlaanderen.be, maisonsdejustice.be                                | Settimanale: snapshot + `pnpm build:data` | Una sede trasloca o cambia i suoi contatti                               | Ogni settimana |
| Codici postali                       | Tabella di conversione di Statbel                                 | Settimanale: snapshot + `pnpm build:data` | Statbel pubblica una nuova tabella (fusioni, nuovi codici)               | Ogni settimana |
| Tassi d'interesse                    | FOD Financiën, Belgisch Staatsblad                                | A mano                                    | Ogni anno (legale) e ogni semestre (commerciale)                         | 6 mesi         |

I dataset generati non vengono mai modificati a mano. `pnpm build:cantons` analizza il testo
ufficiale e si rifiuta di scrivere qualsiasi cosa a meno che le versioni neerlandese e francese
concordino e ogni comune sia coperto; `pnpm build:data` si rifiuta quando una pagina non può
essere collocata, un cantone non ha un tribunale o un cantone non ha un confine nel file
dell'NGI.

## Come vengono costruiti i dati {#how-the-data-is-built}

```
sito ufficiale ──fetch──> snapshot (branch sources) ──parse──> data/*.json ──> pull request
```

1. **Download.** Ogni lunedì il [workflow sources](https://github.com/pieterjanscheir/belgica/actions/workflows/sources.yml)
   scarica ogni pagina delle fonti (`scripts/sources`), con garbo: una richiesta al secondo per
   sito, con uno user agent che nomina il progetto. Conserva ogni pagina sul branch `sources`,
   con un indice di che cosa è stato scaricato, quando, e un hash del suo contenuto. Una pagina
   viene salvata di nuovo solo quando il suo contenuto cambia, così la storia del branch mostra
   che cosa è cambiato e in quale giorno. Una pagina che fallisce (un errore del server, un 404)
   mantiene il suo ultimo snapshot valido e interrompe l'esecuzione, che apre una issue: i dati
   non vengono mai ricostruiti da un quadro incompleto. Una pagina a cui la fonte non rimanda più
   viene tolta dagli snapshot; il suo record resta nei dati, ritirato con un `validTo` (il giorno
   prima del controllo che non l'ha trovata), così il suo id continua a funzionare e una ricerca
   per un giorno precedente la trova ancora. Una pagina che compare riceve un record con un
   `validFrom`.
2. **Parsing.** `pnpm build:data` legge gli snapshot (`scripts/parse`) e scrive i tribunali, le
   carceri, le justitiehuizen / maisons de justice e i confini dei cantoni. Segnala ciò che non
   riesce a leggere, e fallisce quando una pagina non può essere collocata.
3. **Test.** Il workflow esegue il typecheck e i test sui nuovi dati.
4. **Revisione.** Quando i dati sono cambiati, apre o aggiorna una pull request con il diff e
   l'elenco dei valori illeggibili. Una persona la confronta con le fonti e la integra.

Per eseguirlo tu stesso: `pnpm fetch:sources` (scrive `.sources/`), poi `pnpm build:data`.

I cantoni e i comuni vengono ricostruiti a mano con `pnpm build:cantons`: il sito del Belgisch
Staatsblad / Moniteur belge (la gazzetta ufficiale belga) rifiuta i server di GitHub
([#52](https://github.com/pieterjanscheir/belgica/issues/52)).

## Controlli automatici {#automatic-checks}

### A ogni modifica (CI) {#on-every-change-ci}

- **Validazione degli schemi**: ogni file di dati corrisponde al suo [JSON Schema](./schema).
- **Integrità**: gli id sono unici e ben formati; ogni riferimento (arrondissement, cantone,
  comune, tribunale, confine) punta a un record esistente; ogni cantone ha un solo confine,
  GeoJSON valido all'interno del Belgio la cui somma dà la superficie del paese senza
  sovrapposizioni; ogni comune sta in esattamente un cantone oppure è suddiviso tra più cantoni;
  ogni cantone resta entro le province del suo arrondissement; ogni cantone ha esattamente un
  vredegerecht / justice de paix (giudice di pace); ogni sezione ha il tipo e l'area del suo
  tribunale; ogni tipo di tribunale ha il numero di tribunali stabilito dalla legge; ogni cantone
  ricade sotto un tribunale di ciascun tipo (uno per lingua a Bruxelles), e i cantoni di un
  tribunale si trovano nel suo arrondissement e nel suo distretto giudiziario.
- **Parser**: testati end to end su copie ridotte di pagine reali (`test/fixtures/sources`), e
  ogni lettore (numeri di telefono, IBAN, indirizzi, orari di apertura) sulle forme viste nelle
  fonti e su ciò che deve rifiutare.
- **Tassi d'interesse**: i periodi sono ordinati, non si sovrappongono mai e non lasciano buchi;
  il tasso legale vale per anno solare e quello commerciale per semestre; il tasso legato alla
  data del contratto 2013–2015 compare solo in quella finestra.
- **Dati di contatto**: ogni IBAN supera il suo checksum ISO 13616, i numeri di telefono sono
  numeri belgi E.164, gli indirizzi e-mail sono in minuscolo, e gli orari di apertura rispettano
  la sintassi `opening_hours`.
- **Codice**: TypeScript strict (compresi l'accesso agli indici non verificato e le proprietà
  facoltative esatte), ESLint con regole type-aware, Prettier, e copertura dei test al 100 % di
  `src/`.
- **Packaging**: il package costruito si carica con `import` e con `require()`, da ogni entry
  point, su Node 22.12, 22, 24 e 26; `publint` e `arethetypeswrong` verificano gli `exports` e le
  dichiarazioni di tipo.

### Ogni settimana (pianificato) {#every-week-scheduled}

Il [workflow freshness](https://github.com/pieterjanscheir/belgica/actions/workflows/freshness.yml)
gira ogni lunedì e apre una issue con l'etichetta
[`data-freshness`](https://github.com/pieterjanscheir/belgica/issues?q=label%3Adata-freshness)
quando trova qualcosa:

- **Tassi mancanti**: nessun tasso legale o commerciale per oggi, o nessun tasso commerciale per
  le prossime due settimane (la FOD Financiën lo pubblica prima che inizi il semestre).
- **Revisioni scadute**: la data `lastReviewed` di un dataset in `datapackage.json` è più vecchia
  del suo `reviewEveryMonths`.
- **Fonti non raggiungibili**: un URL di fonte ufficiale in `datapackage.json` non risponde più.

Eseguili tu stesso con `pnpm test:freshness` (aggiungi `FRESHNESS_ONLINE=1` per verificare gli
URL).

## Come leggere un valore {#how-to-read-a-value}

- **Assente non significa zero.** `getInterestRate` restituisce `null` per un giorno senza tasso
  noto, invece di tirare a indovinare; un campo che la fonte non fornisce (l'indirizzo di un
  tribunale, orari di apertura leggibili da una macchina) manca invece di essere riempito.
  Gestisci entrambi i casi.
- **Troppo presto è un errore.** Una ricerca per un giorno precedente alla copertura di un
  dataset lancia un `RangeError`: i dati non possono saperlo, e la risposta di oggi sembrerebbe
  quella giusta.
- **I dati di contatto sono i meno stabili.** Numeri di telefono, indirizzi e-mail e orari di
  apertura cambiano senza preavviso. Ogni record indica da quali pagine è stato letto e quando
  (`sources`); controlla la pagina del tribunale (`website`) quando è importante.
- **Prevale il testo di legge.** Per i comuni suddivisi, il `territory` del cantone è il testo
  stesso della legge, alla lettera. Quando un riassunto, o il [confine](/it/data/canton-boundaries)
  dell'NGI, e il testo non concordano, ha ragione il testo.

## Segnalare un errore {#reporting-a-mistake}

[Apri una correzione dei dati](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)
con l'id del record e un link alla fonte ufficiale. Le correzioni vengono rilasciate come
versioni patch.
