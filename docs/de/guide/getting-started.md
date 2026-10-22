<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Erste Schritte {#getting-started}

## Installation {#install}

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

Das Package ist ESM, bringt eigene Typdefinitionen mit, hat keine Laufzeitabhängigkeiten und läuft
in Browsern und auf Node 22.12 oder neuer, wo es auch mit `require()` geladen werden kann. Getestet
wird es auf Node 22.12, 22, 24 und 26.

### Nur importieren, was Sie brauchen {#import-only-what-you-need}

Die Daten sind in das JavaScript gebündelt; wer aus dem Root des Package importiert, lädt also
jeden Datensatz. Jeder Datensatz hat einen eigenen Entry Point, und die Gerichte und die Kantone
(mit dem Gesetzestext ihres Gebiets) sind mit Abstand die größten:

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

Die [Kantonsgrenzen](/de/data/canton-boundaries) sind die Ausnahme: eine Million Positionen
Geometrie, nur in `belgica/canton-boundaries`, nie vom Root des Package geladen.

<table v-if="stats.sizes">
<thead><tr><th>Entry Point</th><th style="text-align:right">Geladenes JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Die Größen werden beim Bauen der Website aus dem Build gemessen (zuerst <code>pnpm build</code>).</p>

## Ein erster Blick {#a-first-look}

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
getCantonsForMunicipality('44021') // Gent 1–5: geteilte Stadt, siehe `territory` jedes Kantons
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Häufige Aufgaben {#common-tasks}

### Welches Friedensgericht ist für eine Adresse zuständig? {#which-justice-of-the-peace-handles-an-address}

Schlagen Sie den REFNIS-Code der Gemeinde nach, holen Sie ihre Kantone und dann das
Friedensgericht des Kantons.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // jeder Kanton hat sein Friedensgericht
}

// Am Tag der Zustellung der Ladung statt heute
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Ist eine Stadt auf mehrere Kantone aufgeteilt (Antwerpen, Gent, Brüssel, Lüttich, …), erhalten
Sie mehr als ein Ergebnis. Dann entscheidet die Straßenadresse, und `territory` jedes Kantons
enthält die gesetzliche Beschreibung seines Teils. Probieren Sie es auf der
[Seite Gebiet und Kantone](/de/data/territory#find-the-canton-for-a-municipality) aus.

Mit den Koordinaten der Adresse entscheiden die [Kantonsgrenzen](/de/data/canton-boundaries):

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // Längengrad, Breitengrad: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### Welches Gericht für eine Gemeinde? {#which-court-for-a-municipality}

Jedes Gericht außer einem Friedensgericht führt die Kantone auf, die es abdeckt (`cantons`), so
wie das Gesetz sie festlegt. `findCompetentCourts` sucht die Kantone einer Gemeinde darin.

```ts
import { findCompetentCourts, getDivisions } from 'belgica'

findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], nicht Brüssel
findCompetentCourts('21004', 'labour-court') // das niederländischsprachige und das französischsprachige Gericht von Brüssel

// Das Gericht als Ganzes; welche Abteilung die Sache verhandelt, steht noch nicht in den Daten
const [court] = findCompetentCourts('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### Ausgehend von einer Postleitzahl {#from-a-postal-code}

Eine Adresse hat eine Postleitzahl, keinen REFNIS-Code. `findCourtsForPostalCode` geht von der
Postleitzahl zur Gemeinde ([Postleitzahlen](/de/data/postal-codes)) und von dort zu den
Friedensgerichten und den Gerichten eines Typs. Die Antwort kommt pro Gemeinde: Drei
Postleitzahlen (`1040`, `1050`, `1804`) gehören zu zwei Gemeinden, und dann entscheidet die Straße.

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']: die Straße entscheidet

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

In einer auf Kantone aufgeteilten Stadt grenzt die Postleitzahl die Frage auf die Gemeinde ein;
für den Kanton braucht es weiterhin die Straße, und seine Grenzen sind juristischer Fließtext, bis
[#29](https://github.com/pieterjanscheir/belgica/issues/29) sie als Geometrie hinzufügt.

### Geschuldete Zinsen an einem Tag {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` gibt `null` zurück für einen Tag, für den kein Zinssatz hinterlegt ist, sodass
Sie warnen können, statt stillschweigend 0 % zu verwenden. Bei einem fehlerhaften Tag wie
`'2024-6-1'` wirft es einen `RangeError`: Übergeben Sie `YYYY-MM-DD` oder ein `Date`.

### Gerichtsnamen in einer anderen Sprache {#court-names-in-another-language}

Die Namen stehen so, wie jedes Gericht sie veröffentlicht, in jeder Sprache, in der es eine Seite
hat. Ein Gericht in Flandern veröffentlicht nur auf Niederländisch, die zweisprachigen Gerichte
in Brüssel auf Niederländisch und Französisch, die Gerichte in Eupen auf Deutsch und Französisch.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## Rohes JSON {#raw-json}

Die Datendateien werden ebenfalls exportiert:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## IDs sind öffentliche API {#ids-are-public-api}

Projekte speichern IDs wie `justice-of-the-peace-gent-1` oder `oost-vlaanderen`; deshalb ändern
sie sich innerhalb einer Major-Version nie (siehe [Identifikatoren](./identifiers)), und die
Versionen folgen diesen Regeln:

| Änderung                          | Version |
| --------------------------------- | ------- |
| Daten hinzufügen                  | minor   |
| Einen Wert korrigieren            | patch   |
| Eine ID entfernen oder umbenennen | major   |
