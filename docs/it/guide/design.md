# Scelte di progettazione {#design-decisions}

Il package è stato riprogettato prima di avere i primi utenti, così ogni scelta ha potuto essere
fatta nel merito invece che per compatibilità. Questa pagina registra ogni decisione, perché è
stata presa e che cosa ne consegue. Una nuova decisione riceve una nuova voce; una decisione
revocata viene segnata, non cancellata.

## 1. Il prodotto sono i dati; il codice è una comodità {#_1-the-data-is-the-product-the-code-is-a-convenience}

**Decisione.** La verità sono le fonti ufficiali; i file JSON in `data/` sono costruiti a
partire da esse e sono il prodotto. Si possono usare senza alcun TypeScript: da Python, da un
foglio di calcolo (le release includono tabelle CSV) o con `jq`. La struttura di ogni file è
definita una sola volta, dai tipi TypeScript, e pubblicata come JSON Schema generato da essi; la
CI fallisce quando tipi, schemi e dati non concordano. La libreria aggiunge tipi, indici e
helper, e nulla di ciò che contiene è necessario per capire i dati.

**Perché.** I dati di riferimento sopravvivono al codice che li circonda, e la maggior parte di
chi usa dati giuridici belgi non lavora a progetti JavaScript.

**Quindi.** Ogni file ha un [JSON Schema](./schema) e una voce in `datapackage.json` con le sue
fonti e la sua licenza. I nomi e i valori dei campi sono spiegati nella documentazione, non solo
nel codice.

## 2. I fatti giuridici sono dati, mai calcolati {#_2-legal-facts-are-data-never-computed}

**Decisione.** Tutto ciò che ha un significato giuridico (il nome di un tribunale, il territorio
di un cantone, un tasso) proviene alla lettera da una fonte ufficiale e viene memorizzato. Il
codice può formattare o cercare; non può costruire un fatto giuridico.

**Perché.** Il codice che assembla un fatto può sbagliare in modi che i test non colgono: i nomi
francesi dei tribunali costruiti da un precedente `formatCourtName` erano sbagliati
(`Tribunal de paix …`, mentre i tribunali si chiamano `Justice de paix …`; [#10](https://github.com/pieterjanscheir/belgica/issues/10)).
Un valore memorizzato si può confrontare con la sua fonte.

**Quindi.** I nomi dei tribunali sono memorizzati come ogni tribunale li pubblica, in ogni lingua
in cui pubblica, e `formatCourtName` non esiste più. I territori dei cantoni restano testo di
legge alla lettera, con la loro base giuridica come link ELI. Dove manca una fonte, manca il
campo: nulla viene completato a intuito. Lo stesso vale per il parsing: un testo di orari di
apertura con una nota, un numero di telefono senza prefisso o un indirizzo scritto come frase
vengono omessi, non indovinati.

## 3. Un'unica regola per gli identificatori {#_3-one-identifier-rule}

**Decisione.** Un codice ufficiale quando ne esiste uno che copre tutti i record, altrimenti
kebab-case minuscolo ricavato dal nome nella lingua locale; i tribunali sono `type` + luogo. I
codici ufficiali che coprono solo alcuni record (ECLI, OVO) sono campi. Vedi
[identificatori](./identifiers).

## 4. I collegamenti sono campi {#_4-links-are-fields}

**Decisione.** I record si riferiscono gli uni agli altri solo tramite campi che contengono l'id
dell'altro record, chiamati come il dataset a cui puntano (`arrondissement`, `canton`,
`municipality`). Nessun id viene costruito a partire da un altro.

**Perché.** Una relazione nascosta in un formato di stringa si rompe in silenzio quando cambia
uno dei due lati. Un campo viene validato dallo schema (che elenca gli id validi) e dai test.

**Quindi.** L'indirizzo di un tribunale, di un carcere o di una justitiehuis / maison de justice
si collega al suo comune allo stesso modo (`address.municipality`), tramite il codice postale
nella tabella di conversione di Statbel, mai tramite il nome della città
([#28](https://github.com/pieterjanscheir/belgica/issues/28)); un record di codice postale si
collega al suo comune invece di copiarne il nome.

## 5. Valori canonici, presentazione nel codice {#_5-canonical-values-presentation-in-code}

**Decisione.** Ogni valore è memorizzato in un'unica forma canonica e standard, e la
formattazione per le persone è una funzione:

| Valore            | Memorizzato come                | Standard                      |
| ----------------- | ------------------------------- | ----------------------------- |
| Giorno            | `2024-06-15`                    | ISO 8601                      |
| Telefono          | `+3253820701`                   | E.164                         |
| IBAN              | `BE73679200844560`              | Formato elettronico ISO 13616 |
| Orari di apertura | `Mo-Fr 08:30-12:30,13:30-16:00` | OpenStreetMap `opening_hours` |
| Lingua            | chiavi `nl`, `fr`, `de`         | ISO 639-1                     |

**Perché.** Un'unica forma per valore rende i valori confrontabili, validabili (il checksum
dell'IBAN è testato) e utilizzabili da altri software (link `tel:`, sistemi di pagamento, parser
di orari di apertura). Le convenzioni di visualizzazione cambiano con il contesto; i dati non
dovrebbero.

## 6. Provenienza su ogni record {#_6-provenance-on-every-record}

**Decisione.** Ogni dataset elenca fonti, licenza e data di revisione in `datapackage.json`;
ogni record ottenuto per scraping elenca le pagine da cui è stato letto e il giorno in cui il
loro contenuto è stato visto per la prima volta (`sources: [{ url, retrieved }]`).

**Perché.** "Da dove viene, e quanto è vecchio?" è la prima domanda per i dati giuridici.

## 7. I dati sono costruiti da macchine, a partire da snapshot conservati {#_7-the-data-is-built-by-machines-from-kept-snapshots}

**Decisione.** Ogni settimana un workflow scarica le fonti ufficiali, conserva le pagine come
snapshot sul branch `sources`, ricostruisce i dati a partire da esse con i parser in
`scripts/parse`, li testa e apre una pull request quando sono cambiati. Nulla viene inserito a
mano. Un job settimanale separato cerca tassi d'interesse mancanti, revisioni scadute e fonti non
più raggiungibili.

**Perché.** I dati giuridici invecchiano in silenzio; le persone dimenticano, le pianificazioni
no. I dati inseriti a mano non si possono verificare né rifare; un parser si può testare, e gli
snapshot mostrano esattamente che cosa diceva la fonte in quel giorno. La pull request mantiene
una persona nel processo: i dati in `main` non cambiano mai senza revisione.

**Quindi.** Gli snapshot vivono su un branch a parte, così la storia del package non è
appesantita da megabyte di HTML. I parser sono testati su copie ridotte di pagine reali. Una
pagina che il parser non sa collocare blocca la build invece di produrre un record mezzo giusto.
Due fonti rifiutano i server di GitHub (ejustice, police.be); vengono scaricate da una macchina
normale ([#24](https://github.com/pieterjanscheir/belgica/issues/24)).

## 8. Distribuzione: solo ESM, Node 22.12+, build al momento della release {#_8-distribution-esm-only-node-22-12-built-on-release}

**Decisione.** Il package è solo ESM, richiede Node 22.12 o successivo, e l'output della build
non viene committato: viene costruito e pubblicato su npm dal workflow di release, con
provenance.

**Perché.** Node 18 e 20 sono a fine vita. Da Node 22.12, `require()` carica ESM, quindi una
build CommonJS separata aggiungerebbe solo una seconda copia dei dati (il dual-package hazard) e
altro da testare. L'output di build committato invecchia e rompeva gli aggiornamenti automatici
delle dipendenze.

**Quindi.** Funzionano sia `import` sia `require()`, testati su Node 22.12, 22, 24 e 26. Ogni
dataset ha il proprio entry point, così un'app che ha bisogno solo dei tassi d'interesse carica
pochi kilobyte, non i tribunali e il testo di legge di ogni cantone (la
[pagina Per iniziare](./getting-started#import-only-what-you-need) misura ciascuno sulla build).

## 9. Tipi che portano le garanzie dei dati {#_9-types-that-carry-the-data-s-guarantees}

**Decisione.** Gli id sono union type generati; i dataset sono `readonly`; le ricerche con un id
noto restituiscono il record, non `record | undefined`; i vocabolari chiusi (tipi di tribunale,
kind, tipi di contatto) sono union. Le etichette dei contatti sono testo libero, come le pubblica
il tribunale: un elenco chiuso significherebbe ricondurre centinaia di nomi di cancellerie a poche
parole, il che equivale a indovinare.

**Perché.** Gli errori emergono mentre si scrive il codice invece che in produzione, e i tipi
documentano i dati.

## 10. Controlli di qualità {#_10-quality-gates}

**Decisione.** Ogni modifica deve superare: TypeScript strict (compresi
`noUncheckedIndexedAccess` e `exactOptionalPropertyTypes`), ESLint con regole strict type-aware,
Prettier, copertura dei test al 100 % di `src/`, validazione JSON Schema di tutti i dati, test di
integrità (id, collegamenti, conteggi, periodi), e `publint` + `arethetypeswrong` sul package
impacchettato.

**Perché.** Vale la pena dipendere da un package di riferimento solo se è più affidabile che
copiare i dati a mano.

## 11. Il tempo fa parte del modello {#_11-time-is-part-of-the-model}

**Decisione.** I record hanno un periodo di validità (`validFrom`, `validTo`, entrambi i giorni
inclusi), ogni dataset indica da quale giorno descrive la situazione (`territoryCoverage`, e
`temporalCoverage` in `datapackage.json`), e le ricerche accettano un giorno facoltativo:
`getCanton(id, { on })`, `getCantonsForMunicipality(refnis, { on })`. Un giorno precedente alla
copertura lancia un `RangeError`.

**Perché.** Le questioni giuridiche riguardano un giorno: quale tribunale era competente quando
è stata notificata la citazione, quale tasso si applicava quando la fattura è scaduta. Cantoni,
comuni e tribunali cambiano; un modello che conosce solo "adesso" risponde a domande sul passato
con la mappa di oggi, e sembra corretto mentre lo fa. Aggiungere il tempo in seguito
cambierebbe ogni id e ogni ricerca, quindi è nel modello prima che la storia sia nei dati
([#27](https://github.com/pieterjanscheir/belgica/issues/27)).

**Quindi.** I tassi d'interesse hanno già dei periodi. Una ricerca per id senza giorno
restituisce la versione di oggi, così gli id noti conservano il loro tipo non-`undefined`; con
un giorno può non trovare nulla. Ogni dataset porta il periodo, non solo il territorio: un record
ottenuto per scraping che la fonte smette di elencare viene ritirato con un `validTo` invece di
essere cancellato (`scripts/parse/retire.ts`), così un id, una volta pubblicato, resta, e un
tribunale che chiude è ancora il tribunale indicato nella citazione dell'anno scorso.

## 12. Le release portano i dati, non solo il package {#_12-releases-carry-the-data-not-only-the-package}

**Decisione.** Ogni release GitHub contiene i dati in JSON e come tabelle CSV, con gli schemi e
`datapackage.json`, in un unico zip. npm è un modo per ottenere i dati, non l'unico.

**Perché.** Chi ha più bisogno di dati giuridici di riferimento belgi lavora con fogli di calcolo
e con altri linguaggi, non con JavaScript.

## 13. La geometria è una seconda fonte, e il testo prevale {#_13-geometry-is-a-second-source-and-the-text-wins}

**Decisione.** I confini dei cantoni sono la digitalizzazione dell'allegato al Gerechtelijk
Wetboek / Code judiciaire (il codice giudiziario belga) realizzata dall'Istituto geografico
nazionale (NGI), presa così come è pubblicata (vertice per vertice, senza semplificazioni,
coordinate al centimetro) e abbinata ai cantoni per nome in entrambe le lingue, con una tabella
esplicita di alias per i restanti. Il testo `territory` del cantone resta la legge: dove
geometria e testo non concordano, prevale il testo. La geometria ha il proprio entry point e la
root del package non la riesporta.

**Perché.** I poligoni dell'NGI sono una lettura ufficiale dello stesso testo, quindi si possono
citare e ricostruire; un confine ricavato qui da dati stradali sarebbe una terza lettura che
nessuno può verificare. Semplificare sposterebbe la linea, e le linee contano soprattutto dove i
cantoni si incontrano. Un milione di posizioni farebbe sembrare piccolo ogni altro dataset,
quindi nessuno dovrebbe caricarle per sbaglio.

**Quindi.** `findCantonsAt(lon, lat)` risponde a partire dalla geometria e la documentazione lo
dice; un punto vicino a una linea è un caso per il testo. La build settimanale fallisce quando un
cantone non ha confine o una feature non corrisponde a nessun cantone
([#29](https://github.com/pieterjanscheir/belgica/issues/29)).

## Non ancora deciso {#not-decided-yet}

| Questione                                                                      | Issue                                                                                           |
| ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------- |
| Storia prima del 1° gennaio 2025                                               | [#27](https://github.com/pieterjanscheir/belgica/issues/27)                                     |
| Calcolo degli interessi su un periodo (conteggio dei giorni, capitalizzazione) | Non previsto finché il metodo non potrà basarsi sulla giurisprudenza o su indicazioni ufficiali |
