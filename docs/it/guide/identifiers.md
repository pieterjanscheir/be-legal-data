# Identificatori {#identifiers}

Ogni record ha un `id`. Altri record, il tuo database e i tuoi URL vi fanno riferimento, quindi
un id deve essere giusto una volta e poi non cambiare mai. Questa pagina espone le regole, perché
esiste ciascuna, e che cosa succede quando la legge cambia la cosa che un id nomina.

## Le regole {#the-rules}

1. **Ogni record ha un campo `id`**, unico all'interno del suo dataset. Il codice generico (un
   indice, una cache, un modulo) tratta ogni dataset allo stesso modo.
2. **Un codice ufficiale prevale, se copre tutti i record.** Dove le autorità assegnano un codice
   a ogni record di un dataset, l'id _è_ quel codice: i comuni usano il loro codice REFNIS di
   Statbel (`44021` per Gent). Un codice che copre solo alcuni record viene invece conservato come
   campo: i tribunali hanno i loro codici ECLI in `ecli`, le justitiehuizen fiamminghe il loro
   numero OVO in `ovo` (vedi [perché](#why-not-the-official-court-codes)).
3. **Altrimenti, ASCII kebab-case minuscolo**: `^[a-z0-9]+(-[a-z0-9]+)*$`, costruito da
   [`scripts/id.ts`](https://github.com/pieterjanscheir/belgica/blob/main/scripts/id.ts):
   accenti rimossi, tutto ciò che non è una lettera o una cifra diventa un unico trattino.
   `Merelbeke-Melle` → `merelbeke-melle`, `Braine-l'Alleud` → `braine-l-alleud`,
   `Liège` → `liege`.
4. **Dal nome ufficiale nella lingua locale**: neerlandese nelle Fiandre, francese in Vallonia,
   tedesco nella zona di Eupen. Bruxelles è ufficialmente bilingue e richiede una scelta fissa:
   il neerlandese.
5. **Un numero è un suffisso**: i luoghi con più cantoni ricevono `gent-1` … `gent-5`.
6. **I tribunali sono `type` + luogo**: `justice-of-the-peace-gent-1`, `court-of-appeal-liege`.
   Un vredegerecht / justice de paix (giudice di pace) prende l'id del suo cantone. I due
   tribunali dello stesso tipo a Bruxelles, uno per lingua, aggiungono `-nl` o `-fr`
   (`police-court-brussel-fr`). Una sezione o una sede aggiunge il proprio luogo all'id del suo
   tribunale (`enterprise-court-gent-brugge`). Il prefisso mantiene gli id unici quando Gent ha un
   giudice di pace, un ondernemingsrechtbank e un arbeidsrechtbank, ed è esattamente il `type` del
   record, quindi non serve mai un secondo vocabolario.
7. **Le carceri e le justitiehuizen / maisons de justice sono il loro nome** nella lingua locale,
   senza articoli: `gevangenis-gent`, `prison-lantin`, `justitiehuis-gent`,
   `maison-justice-arlon`. I loro nomi dicono già che cosa sono, e due istituti nella stessa città
   (il carcere centrale e quello ausiliario di Leuven) si distinguono per nome.
8. **I collegamenti sono campi, mai stringhe derivate.** Un giudice di pace ha un campo `canton`;
   un cantone elenca `{ municipality }`; un arrondissement ha un `judicialArea`. Ognuno contiene
   l'id del record a cui punta, e il campo prende il nome del dataset a cui punta.

Tutte queste regole sono verificate dai test (`test/ids.test.ts`) e dai
[JSON Schema](./schema), che elencano gli id validi, così un collegamento orfano non supera la
validazione.

## Gli id {#the-ids}

| Dataset              | Esempi                                                                                                                    | Regola                         |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------ |
| Distretti giudiziari | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                                                                           | Nome locale                    |
| Arrondissement       | `oost-vlaanderen`, `brabant-wallon`, `eupen`                                                                              | Nome locale                    |
| Cantoni              | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1`                                                  | Nome locale + numero           |
| Confini dei cantoni  | `gent-1`: un confine per cantone, con l'id del cantone, e `canton` come collegamento                                      | L'id del cantone               |
| Comuni               | `44021`, `21004`                                                                                                          | Codice REFNIS                  |
| Province             | `10000`, `40000`                                                                                                          | Codice REFNIS                  |
| Regioni              | `02000`, `03000`, `04000`                                                                                                 | Codice REFNIS                  |
| Codici postali       | `9000-44021`, `1040-21005`                                                                                                | Codice postale + codice REFNIS |
| Corti e tribunali    | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`, `police-court-brussel-fr`, `police-court-eupen-sankt-vith` | Tipo + luogo                   |
| Carceri              | `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                               | Nome locale                    |
| Justitiehuizen       | `justitiehuis-gent`, `maison-justice-arlon`                                                                               | Nome locale                    |
| Tassi d'interesse    | `legal`, `commercial`                                                                                                     | Chiavi fisse                   |

## Perché queste scelte {#why-these-choices}

**Perché kebab-case?** Gli id finiscono negli URL (`/cantons/gent-1`), nei nomi di file, nelle
classi CSS, nelle chiavi di database e nelle righe di log. Il minuscolo evita collisioni sui
sistemi che non distinguono maiuscole e minuscole (i file system di macOS e Windows, molte
collation di database): `Gent1` e `gent1` sarebbero due id nei dati e un solo file su disco. I
trattini mantengono leggibili i confini tra le parole senza maiuscole, e il set di caratteri non
richiede escaping da nessuna parte.

**Perché id leggibili invece di numeri o UUID?** Un dataset di riferimento viene letto da
persone: `justice-of-the-peace-gent-1` in una riga di database o in un messaggio di errore ti
dice di che cosa si tratta. Gli id sono stabili quanto lo sarebbero dei numeri, perché cambiano
solo quando la legge cambia la cosa che nominano (vedi sotto), e in quel caso un nuovo id è il
risultato giusto.

**Perché la lingua locale e non l'inglese?** I nomi inglesi esistono per una manciata di luoghi
(Ghent, Antwerp, Liege) e non per i 162 cantoni, quindi gli id in inglese significherebbero due
regole. Il nome locale è anche quello che l'istituzione stessa usa, e compare nei testi
ufficiali.

**Perché i codici ufficiali?** REFNIS è ciò che usano Statbel, le regioni e quasi ogni dataset
belga. Con il codice come id, collegare uno qualsiasi di essi a cantoni e tribunali non richiede
alcuna tabella di corrispondenza.

**Perché due codici per un codice postale?** Un codice postale da solo non identifica un record:
`1040` appartiene a Brussel e a Etterbeek, e ogni coppia è un record a sé con la propria
validità. La coppia di codici ufficiali, `1040-21005`, è unica e resta tale finché la tabella di
Statbel non cambia la coppia, che è proprio il momento in cui serve un nuovo record. Il comune è
anche un campo (`municipality`), come chiede la regola 8: l'id è una chiave, non qualcosa da
scomporre.

**Perché `type` negli id dei tribunali?** In uno stesso luogo ci sono più tribunali, e i tipi di
tribunale aumenteranno (politierechtbanken, arbeidsrechtbanken, rechtbanken van eerste
aanleg…). I campi di un tribunale dicono che cos'è; l'id deve solo essere unico e riconoscibile,
e il tipo garantisce entrambe le cose.

**Perché non i codici ufficiali dei tribunali?** I tribunali hanno due codici ufficiali, e
nessuno dei due copre tutti i tribunali. I codici ECLI (`HBGNT` per lo hof van beroep / cour
d'appel di Gent) esistono per tribunale e per lingua, non per sezione, e nessuno compare nelle
decisioni pubblicate dei giudici di pace. I numeri d'impresa (KBO) appartengono alla FOD Justitie
/ SPF Justice; le sue unità di stabilimento seguono gli edifici, non i tribunali, e cambiano
quando un tribunale trasloca. Una regola valida per ogni record batte due regole, quindi i codici
ECLI sono un campo (`ecli`), e l'id segue la regola 6.

**Perché collegamenti espliciti?** Il vecchio schema costruiva l'id di un tribunale concatenando
`Vredegerecht` e l'id del cantone. Così una relazione resta nascosta in un formato di stringa,
che si rompe nel momento in cui un tribunale serve due cantoni o un nome cambia. Un campo
`canton` è verificato dallo schema e dai test, e si può seguire in entrambe le direzioni.

## In TypeScript {#in-typescript}

Ogni dataset ha un tipo di id generato (`CantonId`, `CourtId`, `MunicipalityId`, `ProvinceId`,
`RegionId`, `ArrondissementId`, `JudicialAreaId`, `PrisonId`, `HouseOfJusticeId`,
`PostalCodeId`), rigenerato dai dati con `pnpm build:ids`:

```ts
import { getCanton, type CantonId } from 'belgica'

getCanton('gent-1') // Canton: un id noto trova sempre il suo record
getCanton(userInput) // Canton | undefined: qualsiasi altra stringa potrebbe non trovarlo

const id: CantonId = 'gent1' // errore di compilazione: non è un id di cantone
```

Usa i tipi di id per i valori che memorizzi, così un refuso o un id rimosso viene intercettato
quando aggiorni.

## Quando la legge cambia un id {#when-the-law-changes-an-id}

Cantoni e comuni cambiano davvero: i comuni si sono fusi nel 2019 e nel 2025, e le leggi
ridisegnano i cantoni. I record hanno un periodo di validità (`validFrom`, `validTo`), quindi un
cambiamento aggiunge storia invece di cancellarla:

1. Il vecchio record resta, con un `validTo`; quello nuovo riceve un nuovo id e un `validFrom`.
   Un id non viene mai riutilizzato per un'altra cosa, così un id memorizzato anni fa trova
   ancora ciò che indicava.
2. Senza un giorno, le ricerche rispondono per oggi: una ricerca per id restituisce la versione
   valida oggi (l'ultima, per un record che è terminato), e gli elenchi come
   `getCantonsForMunicipality` solo ciò che vale oggi. Con `{ on }` entrambe rispondono per quel
   giorno.
3. Il changelog elenca ogni nuovo id e gli id che sostituisce.

Un semplice cambio di nome, come una correzione ortografica, non cambia l'id. La storia
precedente al 1° gennaio 2025 non è ancora nei dati
([#27](https://github.com/pieterjanscheir/belgica/issues/27)): una ricerca per un giorno
anteriore lancia un `RangeError` invece di rispondere con la mappa di oggi.

## Gli id sono opachi {#ids-are-opaque}

Un id è una chiave, non un formato. `court-of-first-instance-luxembourg-marche-en-famenne` non si
può scomporre di nuovo in tipo, luogo e sezione, perché il tipo, il luogo e il suffisso di
lingua usano tutti lo stesso trattino. Non fare il parsing degli id: ogni loro parte è anche un
campo (`type`, `court`, `canton`, `arrondissement`), e sono i campi che gli schemi e i test
verificano.

## Stabilità {#stability}

Gli id sono API pubblica. Aggiungere record è una versione minor, correggere un valore una patch,
e rimuovere o rinominare un id una versione major. La versione 0.3.0 sostituisce i precedenti id
in PascalCase (`VredegerechtGent1`, `EastFlanders`) con questo schema prima che il package avesse
utenti; il [changelog](./changelog) riporta la corrispondenza.

La promessa viene verificata, non solo fatta. `ids.lock.json` elenca ogni id che il package ha
pubblicato, per dataset; `pnpm generate` vi aggiunge i nuovi id e non ne rimuove mai uno, e
`test/ids.test.ts` fallisce quando un id bloccato manca dai dati. Così uno scraper che legge una
pagina con un nuovo titolo, un elenco di cantoni rigenerato o una modifica manuale non possono
eliminare o rinominare un id senza che ce ne si accorga: la pull request settimanale dei dati
fallisce, e una persona collega il nuovo nome all'id esistente nel parser, oppure chiude il
record con un `validTo`. Togliere un id dal lock è un atto deliberato, per una versione major,
con l'id e il suo sostituto nel changelog.
