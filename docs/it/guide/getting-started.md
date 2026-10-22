<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Per iniziare {#getting-started}

## Installazione {#install}

::: code-group

```bash [pnpm]
pnpm add belgica
```

```bash [npm]
npm install belgica
```

```bash [yarn]
yarn add belgica
```

:::

Il package è ESM, include le proprie definizioni di tipo, non ha dipendenze a runtime e funziona
nei browser e su Node 22.12 o successivo, dove si carica anche con `require()`. È testato su
Node 22.12, 22, 24 e 26.

### Importa solo ciò che ti serve {#import-only-what-you-need}

I dati sono inclusi nel JavaScript, quindi importare dalla root del package carica tutti i
dataset. Ogni dataset ha il proprio entry point, e le corti e i tribunali e i cantoni (con il
testo di legge dei loro territori) sono di gran lunga i più pesanti:

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

I [confini dei cantoni](/it/data/canton-boundaries) sono l'eccezione: un milione di posizioni di
geometria, solo in `belgica/canton-boundaries`, mai caricati dalla root del package.

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">JavaScript caricato</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Le dimensioni vengono misurate sulla build quando si costruisce il sito (prima <code>pnpm build</code>).</p>

## Un primo sguardo {#a-first-look}

```ts
import {
    getCourt,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'belgica'

getCourt('justice-of-the-peace-gent-1').name.nl // 'Vredegerecht Gent 1'
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getCantonsForMunicipality('44021') // Gent 1–5: città suddivisa, vedi il `territory` di ogni cantone
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Operazioni comuni {#common-tasks}

### Quale vredegerecht / justice de paix è competente per un indirizzo? {#which-justice-of-the-peace-handles-an-address}

Il vredegerecht / justice de paix è il giudice di pace del cantone. Cerca il codice REFNIS del
comune e ottieni i suoi cantoni, poi il giudice del cantone.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // ogni cantone ha il suo giudice di pace
}

// Alla data della notifica della citazione, invece che a oggi
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Quando una città è suddivisa tra più cantoni (Antwerpen, Gent, Brussel, Luik, …), ottieni più di
un risultato. Decide l'indirizzo, e il `territory` di ogni cantone contiene la descrizione
giuridica della sua parte. Provalo nella [pagina sul territorio](/it/data/territory#find-the-canton-for-a-municipality).

Con le coordinate dell'indirizzo, i [confini dei cantoni](/it/data/canton-boundaries) risolvono
la questione:

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // longitudine, latitudine: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### Quale tribunale per un comune? {#which-court-for-a-municipality}

Ogni corte o tribunale diverso dal giudice di pace elenca i cantoni che copre (`cantons`), come
li stabilisce la legge. `findCompetentCourts` cerca i cantoni di un comune in questi elenchi.

```ts
import { findCompetentCourts, getDivisions } from 'belgica'

findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], non Bruxelles
findCompetentCourts('21004', 'labour-court') // il tribunale di lingua neerlandese e quello di lingua francese di Bruxelles

// Il tribunale nel suo insieme; quale sezione tratta la causa non è ancora nei dati
const [court] = findCompetentCourts('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### A partire da un codice postale {#from-a-postal-code}

Un indirizzo ha un codice postale, non un codice REFNIS. `findCourtsForPostalCode` passa dal
codice postale al comune ([codici postali](/it/data/postal-codes)) e da lì ai giudici di pace e
ai tribunali di un dato tipo. Risponde per comune: tre codici postali (`1040`, `1050`, `1804`)
appartengono a due comuni, e allora decide la via.

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']: decide la via

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

In una città suddivisa tra cantoni, il codice postale restringe la domanda al comune; per il
cantone serve comunque la via, e i suoi confini sono testo giuridico finché
[#29](https://github.com/pieterjanscheir/belgica/issues/29) non li aggiunge come geometria.

### Interessi dovuti in un dato giorno {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` restituisce `null` per un giorno senza tasso noto, così puoi segnalarlo invece
di usare in silenzio lo 0 %. Lancia un `RangeError` per un giorno malformato come `'2024-6-1'`:
passa `YYYY-MM-DD` oppure un `Date`.

### Nomi dei tribunali in un'altra lingua {#court-names-in-another-language}

I nomi sono quelli che ogni tribunale pubblica, in ogni lingua in cui ha una pagina. Un
tribunale nelle Fiandre pubblica solo in neerlandese; i tribunali bilingui di Bruxelles in
neerlandese e in francese; i tribunali di Eupen in tedesco e in francese.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## JSON grezzo {#raw-json}

Anche i file di dati sono esportati:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## Gli id sono API pubblica {#ids-are-public-api}

I progetti memorizzano id come `justice-of-the-peace-gent-1` o `oost-vlaanderen`, quindi non
cambiano mai all'interno di una versione major (vedi [Identificatori](./identifiers)), e le
versioni seguono queste regole:

| Modifica                     | Versione |
| ---------------------------- | -------- |
| Aggiungere dati              | minor    |
| Correggere un valore         | patch    |
| Rimuovere o rinominare un id | major    |
