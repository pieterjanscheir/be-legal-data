<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const labels = {
    'justice-of-the-peace': 'Vredegerecht / Justice de paix',
    'police-court': 'Politierechtbank / Tribunal de police',
    'court-of-first-instance': 'Rechtbank van eerste aanleg / Tribunal de première instance',
    'enterprise-court': "Ondernemingsrechtbank / Tribunal de l'entreprise",
    'labour-court': 'Arbeidsrechtbank / Tribunal du travail',
    'court-of-appeal': "Hof van beroep / Cour d'appel",
    'labour-court-of-appeal': 'Arbeidshof / Cour du travail',
    'court-of-assize': "Hof van assisen / Cour d'assises",
}

const areas = {
    'justice-of-the-peace': 'Un cantone; Philippeville ha sede in due luoghi',
    'police-court': 'Un arrondissement (Bruxelles divisa per lingua, Halle, Vilvoorde)',
    'court-of-first-instance': 'Un arrondissement (Bruxelles divisa per lingua)',
    'enterprise-court': "Un arrondissement, o l'area di una corte d'appello",
    'labour-court': "Un arrondissement, o l'area di una corte d'appello",
    'court-of-appeal': 'Un distretto giudiziario',
    'labour-court-of-appeal': 'Un distretto giudiziario',
    'court-of-assize': 'Una provincia, o Bruxelles-Capitale',
}
</script>

# Corti e tribunali {#courts}

File: `data/courts.json`. Ogni organo giurisdizionale dell'ordine giudiziario elencato dal
portale delle corti e dei tribunali stessi,
[tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be): {{ stats.courts.total }}
record validi oggi<span v-if="stats.courts.retired">, e {{ stats.courts.retired }} versioni
ritirate che il portale non elenca più</span>. I numeri di questa pagina sono calcolati a partire
dai dati quando il sito viene costruito.

<table>
<thead><tr><th>Tipo</th><th style="text-align:right">Tribunali</th><th style="text-align:right">Sezioni o sedi</th><th>Area</th></tr></thead>
<tbody>
<tr v-for="t in stats.courts.byType" :key="t.type">
<td>{{ labels[t.type] }}</td><td style="text-align:right">{{ t.courts }}</td><td style="text-align:right">{{ t.divisions }}</td><td>{{ areas[t.type] }}</td>
</tr>
</tbody>
</table>

I nomi dei tipi restano quelli ufficiali belgi, in neerlandese e in francese: per esempio il
vredegerecht / justice de paix è il giudice di pace del cantone, l'hof van beroep / cour d'appel
la corte d'appello.

Non presenti sul portale, e quindi non ancora qui: l'Hof van Cassatie / Cour de cassation, il
Grondwettelijk Hof / Cour constitutionnelle e il Raad van State / Conseil d'État, e i tribunali
disciplinari.

## Perché è utile {#why-it-s-useful}

- **Indirizzare gli atti.** Citazioni, ricorsi e conclusioni indicano il tribunale con il nome
  che esso stesso usa; lettere e depositi vanno alla cancelleria (griffie, greffe) al suo
  indirizzo.
- **Contattare la cancelleria giusta.** I tribunali più grandi hanno una cancelleria per materia
  (civile, penale, famiglia, il registro delle persone giuridiche…), ciascuna con il proprio
  numero di telefono, indirizzo e-mail e talvolta conto bancario. I dati le tengono separate, con
  l'etichetta che usa il tribunale stesso.
- **Pagare i diritti.** Le cancellerie che pubblicano un conto bancario per i diritti di
  cancelleria e i depositi lo hanno nei dati, con il checksum verificato.
- **Costruire moduli.** Un selettore di tribunali ha bisogno di un elenco completo con id
  stabili, collegati a cantoni, arrondissement e distretti giudiziari, e al tribunale a cui
  appartiene una sezione.
- **Collegare la giurisprudenza.** `ecli` fornisce il codice che le decisioni del tribunale
  portano nel loro European Case Law Identifier (`ECLI:BE:HBGNT:…`).

## Fonte e aggiornamenti {#source-and-updates}

|               |                                                                                                                                                       |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte         | [tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be), il portale del College van de hoven en rechtbanken / Collège des cours et tribunaux |
| Costruito da  | `scripts/parse` a partire dagli snapshot settimanali della pagina e della pagina dei contatti di ogni tribunale                                       |
| Cambia quando | Un tribunale trasloca, cambia i suoi contatti o orari, oppure il portale aggiunge o rinomina un tribunale                                             |
| Verificato    | Ogni settimana, dal [workflow sources](/it/guide/data-quality#how-the-data-is-built); le modifiche arrivano come pull request                         |

Ogni record elenca le pagine da cui è stato letto e il giorno in cui il contenuto di ciascuna
pagina è stato visto per la prima volta (`sources`). I dati di contatto cambiano più spesso di
qualsiasi altra cosa in questo package: quando conta, controlla la pagina del tribunale
(`website`).

<CourtList />

## Campi {#fields}

| Campo              | Tipo                                  | Descrizione                                                                                                                                                                                                                                 |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `CourtId`                             | Id stabile: il `type`, poi il luogo nella lingua del tribunale: `justice-of-the-peace-gent-1`, `police-court-brussel-fr`, `enterprise-court-gent-brugge`. Vedi [identificatori](/it/guide/identifiers)                                      |
| `validFrom`        | string?                               | Primo giorno in cui il record si applica, `YYYY-MM-DD`: il giorno in cui il portale lo ha elencato per la prima volta. Assente: dall'inizio della copertura                                                                                 |
| `validTo`          | string?                               | Ultimo giorno in cui il record si applica: il giorno prima del controllo settimanale che non l'ha più trovato sul portale. Assente: ancora valido                                                                                           |
| `type`             | `CourtType`                           | `justice-of-the-peace`, `police-court`, `court-of-first-instance`, `enterprise-court`, `labour-court`, `court-of-appeal`, `labour-court-of-appeal`, `court-of-assize`                                                                       |
| `kind`             | `'court'` \| `'division'` \| `'seat'` | Il tribunale stesso, una delle sue sezioni (afdeling, division, Abteilung), o uno dei luoghi in cui ha sede un giudice di pace                                                                                                              |
| `court`            | `CourtId`?                            | Per una sezione o una sede: il tribunale a cui appartiene                                                                                                                                                                                   |
| `name`             | `{ nl?, fr?, de? }`                   | Il nome come lo pubblica il tribunale, in ogni lingua in cui ha una pagina: `Vredegerecht Gent 1`, `Tribunal de l'entreprise du Hainaut - division Mons`                                                                                    |
| `judicialArea`     | `JudicialAreaId`                      | Il distretto giudiziario                                                                                                                                                                                                                    |
| `arrondissement`   | `ArrondissementId`?                   | L'arrondissement, per un tribunale o una sezione la cui area è un arrondissement o vi è compresa                                                                                                                                            |
| `canton`           | `CantonId`?                           | Per un giudice di pace: il cantone che serve                                                                                                                                                                                                |
| `cantons`          | `CantonId[]`?                         | Per ogni altro tribunale (non le sue sezioni): i cantoni che copre, come li stabiliscono l'allegato al Gerechtelijk Wetboek / Code judiciaire (art. 3–5) e l'art. 114 dello stesso codice                                                   |
| `ecli`             | `string[]`?                           | I codici ECLI del tribunale, uno per ogni lingua in cui giudica; solo codici visti in decisioni pubblicate                                                                                                                                  |
| `address`          | `Address`?                            | Dove si trova la cancelleria, con il comune a cui appartiene il suo codice postale (`municipality`, per codice REFNIS). Assente quando il tribunale non pubblica un indirizzo unico (un tribunale le cui sezioni hanno ciascuna il proprio) |
| `contacts`         | `Contact[]`                           | Telefono, fax, e-mail e conto bancario, ciascuno con la cancelleria a cui appartiene (`label`) e il testo pubblicato insieme (`note`)                                                                                                       |
| `openingHours`     | string?                               | Orari della cancelleria nella sintassi OpenStreetMap [`opening_hours`](https://wiki.openstreetmap.org/wiki/Key:opening_hours): `Mo-Fr 08:30-12:30,13:30-16:00`, solo quando il testo pubblicato dice esattamente questo                     |
| `openingHoursText` | `{ nl?, fr?, de? }`?                  | Gli orari di apertura come pubblicati, per lingua                                                                                                                                                                                           |
| `website`          | `{ nl?, fr?, de? }`                   | La pagina del tribunale sul portale, per lingua                                                                                                                                                                                             |
| `sources`          | `{ url, retrieved }[]`                | Le pagine da cui è stato letto il record, e quando il loro contenuto è stato visto per la prima volta                                                                                                                                       |

::: tip Nuovi tipi di tribunale
`type` può acquisire nuovi valori (l'Hof van Cassatie / Cour de cassation, per esempio). Se fai
uno `switch` su di esso, mantieni un ramo `default` così che un nuovo tipo non rompa il tuo
codice.
:::

## Struttura {#shape}

```ts
interface Court {
    id: CourtId
    validFrom?: string
    validTo?: string
    type: CourtType
    kind: 'court' | 'division' | 'seat'
    court?: CourtId
    name: Partial<Translated>
    judicialArea: JudicialAreaId
    arrondissement?: ArrondissementId
    canton?: CantonId
    cantons?: CantonId[]
    ecli?: string[]
    address?: Address
    contacts: Contact[]
    openingHours?: string
    openingHoursText?: Partial<Translated>
    website: Partial<Record<Locale, string>>
    sources: SourceRef[]
}

interface Address {
    building?: string
    street: string // come pubblicata, con numero, casella o piano: 'Beverstraat 7B (eerste verdieping)'
    postalCode: string
    city: string
    municipality?: MunicipalityId // tramite il codice postale; vedi la pagina Codici postali
}

interface Contact {
    type: 'phone' | 'fax' | 'email' | 'bank-account'
    value: string // canonico: E.164, e-mail in minuscolo, IBAN elettronico
    label?: string // la cancelleria o il servizio: 'Burgerlijke griffie', 'Greffe pénal'
    note?: string // testo pubblicato insieme al valore: 'druk 1', 'tapez 2'
}
```

## Helper {#helpers}

```ts
getCourt('justice-of-the-peace-gent-1')
getJusticeOfThePeace('gent-1') // lo stesso tribunale, tramite l'id del cantone
getDivisions('enterprise-court-gent') // le sue otto sezioni
getCourtsForCanton('gent-1') // il suo giudice di pace, e un tribunale per ciascun altro tipo
findCourtsWithJurisdiction('23088', 'police-court') // [police-court-vilvoorde], per codice REFNIS
findCourts({ type: 'police-court', kind: 'court', judicialArea: 'gent' })
getContact(court, 'email', 'Greffe pénal') // il valore del primo contatto corrispondente
formatPhoneNumber('+3253820701') // '053 82 07 01'
formatIban('BE73679200844560') // 'BE73 6792 0084 4560'
```

## Come vengono letti i dati {#how-the-data-is-read}

Il portale ha una pagina per tribunale e per sezione, nella lingua del tribunale; i tribunali
bilingui di Bruxelles hanno una pagina in neerlandese e una in francese, e i tribunali di Eupen
una in francese e una in tedesco. Il parser:

1. ricava il tipo e il luogo del tribunale dal suo nome (`Politierechtbank Limburg - afdeling
Genk`), e il cantone di un giudice di pace dal suo nome e numero;
2. unisce le versioni linguistiche di un tribunale in un unico record: nomi, pagine e orari di
   apertura per lingua; indirizzo e contatti dalla prima lingua (neerlandese a Bruxelles, tedesco
   a Eupen), con gli eventuali valori presenti solo nell'altra pagina;
3. legge i blocchi di contatto delle cancellerie, mantenendo ogni valore con la sua cancelleria;
4. converte gli orari di apertura pubblicati nella sintassi `opening_hours` solo quando ogni
   parola è compresa e ogni lingua dice la stessa cosa. Un testo con una nota o una disposizione
   temporanea ("OPGELET: tot 31 december…") conserva solo il testo pubblicato;
5. assegna a ogni tribunale i cantoni che la legge gli attribuisce (`cantons`), da una tabella
   dell'allegato al Gerechtelijk Wetboek in `scripts/parse/jurisdictions.ts`, e ne ricava il suo
   `arrondissement`. La tabella e il portale si controllano a vicenda: un tribunale sul portale
   che manca nella tabella di legge, o viceversa, blocca la build.

Si rifiuta di scrivere qualsiasi cosa quando una pagina non può essere collocata (un tipo di
tribunale sconosciuto, un giudice di pace senza cantone), un cantone non ha un tribunale, o la
tabella di legge e il portale non concordano su quali tribunali esistano. Ciò che non riesce a
leggere (un numero di telefono senza prefisso, un indirizzo scritto come frase) viene segnalato
con la pull request settimanale, e lasciato fuori dai dati invece di essere indovinato.

## Valori canonici {#canonical-values}

| Valore             | Memorizzato come                                 | Perché                                                                                                                                                                     |
| ------------------ | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Numero di telefono | E.164: `+3253820701`                             | Una sola forma per numero, componibile da ovunque, i link `tel:` funzionano così come sono                                                                                 |
| IBAN               | Formato elettronico: `BE73679200844560`          | La forma accettata dai sistemi di pagamento; il checksum viene verificato in lettura e nei test                                                                            |
| E-mail             | Minuscolo                                        | Confronti e deduplicazione funzionano                                                                                                                                      |
| Orari di apertura  | `opening_hours`: `Mo-Fr 08:30-12:30,13:30-16:00` | Lo standard di OpenStreetMap, con parser in molti linguaggi (per esempio [opening_hours.js](https://github.com/opening-hours/opening_hours.js)) e senza una lingua propria |
| Via                | Come pubblicata                                  | Numeri, caselle e piani sono scritti in troppi modi (`Canadaplein ZN`, `Rue de Bruxelles 2 - 3`) per scomporli senza tirare a indovinare                                   |
