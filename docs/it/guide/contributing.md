# Contribuire {#contributing}

## Aggiornare i dati {#updating-data}

Le corti e i tribunali, le carceri, le justitiehuizen / maisons de justice e i confini dei
cantoni vengono costruiti ogni settimana a partire dalle fonti ufficiali
([come](./data-quality#how-the-data-is-built)): non modificarli a mano. Correggi il parser in
`scripts/parse`, oppure, se è la fonte stessa a essere sbagliata, segnalalo al tribunale. La pull
request settimanale viene revisionata come qualsiasi altra: confronta il diff con le fonti prima
di fare il merge.

Per i dataset mantenuti a mano (distretti giudiziari, arrondissement, tassi d'interesse):

1. Modifica il JSON in `data/`. Mantieni gli id esistenti: i progetti li memorizzano.
2. Aggiorna `lastReviewed` del dataset in `datapackage.json` se lo hai verificato rispetto alle
   sue fonti.
3. `pnpm check`: rigenera i tipi degli id e gli schemi, typecheck, lint e controllo del
   formato, build, test con copertura e lint del package. Fallisce quando i file generati non
   sono stati committati.
4. Aggiungi una riga in `CHANGELOG.md` sotto Unreleased, e fai il commit (compresi `schema/`,
   `src/ids.generated.ts` e `ids.lock.json`). L'output della build (`dist/`) non viene
   committato: viene costruito per ogni release e pubblicato su npm.

Un id pubblicato resta: `ids.lock.json` li elenca tutti e i test falliscono quando ne manca uno
dai dati. Se una fonte ha rinominato un record, collega il nuovo nome all'id esistente nel
parser; se il record è terminato, conservalo con un `validTo`. Vedi
[identificatori](./identifiers#stability).

### Cantoni e comuni {#cantons-and-municipalities}

`data/cantons.json` e `data/municipalities.json` sono generati; non modificarli a mano. Esegui
`pnpm build:cantons` (richiede accesso alla rete e `unzip`). Legge:

- l'allegato al Gerechtelijk Wetboek / Code judiciaire (il codice giudiziario belga),
  "Gebiedsomschrijving en zetel van hoven en rechtbanken"
  ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  in neerlandese e in francese;
- il file di Statbel sulla popolazione per comune, per i comuni attuali e i codici REFNIS.

Analizza separatamente i testi neerlandese e francese e si rifiuta di scrivere qualsiasi cosa a
meno che concordino e ogni comune sia coperto esattamente una volta (o suddiviso tra più
cantoni). Gli esonimi che l'allegato usa e Statbel no (`Gembloers`, `Saint-Nicolas`, …), i
refusi nell'allegato e le menzioni di confini che non riesce a distinguere sono elencati
all'inizio dello script.

Rieseguilo dopo che una legge modifica l'allegato o dei comuni si fondono. Gli id dei cantoni
seguono la lingua locale (neerlandese nelle Fiandre e a Bruxelles, francese in Vallonia, tedesco
nella zona di Eupen); il vredegerecht / justice de paix (giudice di pace) del cantone `x` ha
l'id `justice-of-the-peace-x` e vi si collega tramite il suo campo `canton`.

### Dataset ottenuti per scraping {#scraped-datasets}

```bash
pnpm fetch:sources            # ogni fonte in .sources/ (circa 20 minuti, con garbo)
pnpm fetch:sources courts     # oppure una sola fonte
pnpm build:data               # ricostruisce tribunali, carceri, justitiehuizen, codici postali, regioni e province da .sources/
```

I confini dei cantoni provengono dal GeoPackage dell'NGI (fonte `ngi`), letto con il SQLite
integrato in Node; quando l'NGI rinomina un cantone, collega il suo codice all'id in
`CANTON_ALIASES` in `scripts/parse/boundaries.ts`.

Oppure, invece di scaricare, fai il checkout degli snapshot più recenti:
`git worktree add .sources origin/sources`.

Una fonte è un percorso in `scripts/sources/catalog.ts`; un parser legge i suoi snapshot in
`scripts/parse`. Quando un sito cambia il suo markup, i test dei parser in `test/parse` (su copie
ridotte di pagine reali in `test/fixtures/sources`) mostrano che cosa si è rotto.

### Nuovi tassi d'interesse {#new-interest-rates}

- **Commerciale**: la FOD Financiën pubblica il tasso per semestre. Aggiungi un periodo con
  `from`, `to`, `rate`, e la data del Staatsblad in `note`.
- **Legale**: pubblicato per anno solare. Aggiungi un periodo per l'anno.

## Aggiungere un dataset {#adding-a-dataset}

Ogni dataset riceve lo stesso trattamento, così gli utenti possono farvi affidamento:

1. **Dati**: `data/<name>.json`, un array di record. Ogni valore proviene da una fonte
   ufficiale.
2. **Id**: segui le [regole sugli identificatori](./identifiers): un codice ufficiale quando
   esiste, altrimenti kebab-case minuscolo dal nome nella lingua locale (`scripts/id.ts`).
3. **Collegamenti, non copie**: fai riferimento ad arrondissement, cantoni e comuni tramite id, e
   riutilizza i tipi condivisi (`Translated`, `Address`, `Contact`, `SourceRef`).
4. **Fonti**: un `sources: [{ url, retrieved }]` su ogni record, e una voce in
   `datapackage.json` con le fonti del dataset, la licenza, `lastReviewed` e
   `reviewEveryMonths`.
5. **Tipi e helper**: `src/<name>.ts`, esportato da `src/index.ts`, più un entry point in
   `tsup.config.ts` e negli `exports` di `package.json`.
6. **Schema**: aggiungi il tipo di file a `scripts/schema-types.ts` e
   `scripts/build-schemas.ts`.
7. **Fonte e parser**: un percorso in `scripts/sources/catalog.ts` che scarica le pagine
   ufficiali, e un parser in `scripts/parse` che costruisce il file a partire dagli snapshot, con
   fixture e test. Legge solo ciò che può leggere con certezza e segnala il resto.
8. **Test**: id unici, riferimenti che si risolvono, e il conteggio indicato dalla fonte
   ufficiale.
9. **Documentazione**: una pagina in `docs/data/` con a che cosa serve, fonte e aggiornamenti, e
   una tabella dei campi.

## Controlli {#checks}

| Comando                     | Che cosa fa                                                                                                                                                                |
| --------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                | Tutto ciò che esegue la CI: `generate`, `typecheck`, `lint`, `build`, `test:coverage`, `test:package`, `lint:package`, e un controllo che i file generati siano committati |
| `pnpm test`                 | Test unitari, di integrità, degli schemi e dei tipi sul sorgente (non serve la build)                                                                                      |
| `pnpm test:package`         | Smoke test del package costruito con `import` e `require()`: esegui prima `pnpm build`                                                                                     |
| `pnpm test:coverage`        | Lo stesso, ma fallisce sotto il 100 % di copertura di `src/`                                                                                                               |
| `pnpm lint` / `pnpm format` | ESLint e Prettier: verifica / correzione                                                                                                                                   |
| `pnpm generate`             | Rigenera `src/ids.generated.ts` (tipi degli id) e `schema/` a partire dai dati e dai tipi, e aggiunge i nuovi id a `ids.lock.json`                                         |
| `pnpm lint:package`         | `publint` e `arethetypeswrong` sul package impacchettato                                                                                                                   |
| `pnpm test:freshness`       | Controlli basati sulle date: tassi mancanti, revisioni scadute. Non fa parte di `check`; `FRESHNESS_ONLINE=1` verifica anche gli URL delle fonti                           |
| `pnpm fetch:sources`        | Scarica le fonti ufficiali in `.sources/`                                                                                                                                  |
| `pnpm build:data`           | Ricostruisce tribunali, carceri, justitiehuizen / maisons de justice, codici postali, regioni, province e confini dei cantoni a partire da `.sources/`                     |
| `pnpm build:csv`            | Scrive i dati come tabelle CSV in `csv/`                                                                                                                                   |

## Rilasciare una versione {#releasing}

1. Sposta le voci Unreleased di `CHANGELOG.md` sotto la nuova versione.
2. Aumenta `version` in `package.json` e fai il commit.
3. Crea il tag e fai il push: `git tag v0.3.0 && git push && git push --tags`.

Il workflow di release esegue `pnpm check`, pubblica il tag su npm con provenance e crea una
release GitHub con i dati, gli schemi e le tabelle CSV allegati. Il tag deve corrispondere a
`version`.

## Questo sito {#this-website}

Il sito si trova in `docs/` ed è costruito con [VitePress](https://vitepress.dev). Le tabelle
interattive importano `src/` e `data/` del package stesso, così mostrano sempre i dati presenti
nel repository.

```bash
pnpm docs:dev      # server locale con hot reload
pnpm docs:build    # sito statico in docs/.vitepress/dist
pnpm docs:preview  # serve il sito costruito
```

Ogni push su `main` lo pubblica su GitHub Pages. La CI lo costruisce a ogni pull request, così
una pagina rotta viene individuata prima del merge.

### Traduzioni {#translations}

Le pagine inglesi in `docs/` sono la fonte di verità. Ogni altra lingua ha lo stesso albero
nella propria cartella: neerlandese (`docs/nl/`) e francese (`docs/fr/`), e tedesco, spagnolo,
italiano, portoghese, polacco, turco, arabo, ucraino, cinese e giapponese (`docs/de/`,
`docs/es/` e così via). Sono traduzioni della pagina inglese e vengono aggiornate dopo che questa
cambia. Quando modifichi una pagina inglese, modifica anche la stessa pagina in `docs/nl/` e
`docs/fr/`, oppure indica nella pull request che le traduzioni sono indietro; le altre lingue
possono restare indietro di una release. Le parole del tema e dei componenti interattivi in
queste altre lingue si trovano in `docs/.vitepress/locales/`.

Codice, id, nomi dei campi e nomi ufficiali restano invariati in ogni lingua, e ogni titolo
mantiene l'ancora inglese (`## Titolo {#english-anchor}`) così che i link incrociati e il
selettore di lingua continuino a funzionare. Un'istituzione o un termine giuridico belga mantiene
il suo nome ufficiale neerlandese o francese (o tedesco, dove il Belgio ne pubblica uno) invece
di una traduzione inventata: una pagina in cinese scrive vredegerecht / justice de paix, non una
parola coniata per l'occasione. Il changelog è tenuto solo in inglese.
