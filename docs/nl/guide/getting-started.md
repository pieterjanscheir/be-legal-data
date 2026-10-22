<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Aan de slag {#getting-started}

## Installatie {#install}

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

Het package is ESM, levert zijn eigen typedefinities mee, heeft geen runtime-afhankelijkheden en
draait in browsers en op Node 22.12 of later, waar `require()` het ook laadt. Het wordt getest op
Node 22.12, 22, 24 en 26.

### Importeer alleen wat je nodig hebt {#import-only-what-you-need}

De data zit mee in de JavaScript gebundeld, dus wie importeert vanuit de root van het package laadt
elke dataset. Elke dataset heeft een eigen entry point, en de hoven en rechtbanken en de kantons (met
de wettekst van hun grondgebied) zijn veruit de grootste:

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

De [kantongrenzen](/nl/data/canton-boundaries) zijn de uitzondering: een miljoen posities
geometrie, alleen in `belgica/canton-boundaries`, nooit geladen door de root van het
package.

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">Geladen JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">De groottes worden uit de build gemeten wanneer de site gebouwd wordt (eerst <code>pnpm build</code>).</p>

## Een eerste blik {#a-first-look}

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
getCantonsForMunicipality('44021') // Gent 1–5: gesplitste stad, zie de `territory` van elk kanton
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Veelvoorkomende taken {#common-tasks}

### Welk vredegerecht is bevoegd voor een adres? {#which-justice-of-the-peace-handles-an-address}

Zoek de REFNIS-code van de gemeente op en haal haar kantons op, en daarna het vredegerecht van
het kanton.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // elk kanton heeft zijn vredegerecht
}

// Op de dag van de betekening van de dagvaarding, in plaats van vandaag
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Wanneer een stad over meerdere kantons is gesplitst (Antwerpen, Gent, Brussel, Luik, …), krijg je
meer dan één resultaat. Het straatadres beslist, en de `territory` van elk kanton bevat de
wettelijke omschrijving van zijn deel. Probeer het uit op de
[pagina Territorium en kantons](/nl/data/territory#find-the-canton-for-a-municipality).

Met de coördinaten van het adres beslissen de [kantongrenzen](/nl/data/canton-boundaries) het:

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // lengtegraad, breedtegraad: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### Welke rechtbank voor een gemeente? {#which-court-for-a-municipality}

Elke rechtbank behalve een vredegerecht vermeldt de kantons die ze bestrijkt (`cantons`), zoals
de wet ze vastlegt. `findCourtsWithJurisdiction` zoekt de kantons van een gemeente daarin op.

```ts
import { findCourtsWithJurisdiction, getDivisions } from 'belgica'

findCourtsWithJurisdiction('23088', 'police-court') // [police-court-vilvoorde], niet Brussel
findCourtsWithJurisdiction('21004', 'labour-court') // de Nederlandstalige en de Franstalige rechtbank van Brussel

// De rechtbank als geheel; welke afdeling de zaak behandelt zit nog niet in de data
const [court] = findCourtsWithJurisdiction('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### Vanaf een postcode {#from-a-postal-code}

Een adres komt met een postcode, niet met een REFNIS-code. `findCourtsForPostalCode` gaat van
de postcode naar de gemeente ([postcodes](/nl/data/postal-codes)) en van daar naar de
vredegerechten en de gerechten van een type. Het antwoordt per gemeente: drie postcodes (`1040`,
`1050`, `1804`) horen bij twee gemeenten, en dan beslist de straat.

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']: de straat beslist

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

In een stad die over kantons gesplitst is, brengt de postcode de vraag terug tot de gemeente;
het kanton heeft nog altijd de straat nodig, en zijn grenzen zijn juridisch proza tot
[#29](https://github.com/pieterjanscheir/belgica/issues/29) ze als geometrie toevoegt.

### Verschuldigde interest op een dag {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` geeft `null` terug voor een dag waarvoor geen rentevoet bekend is, zodat je kunt
waarschuwen in plaats van stilzwijgend 0 % te gebruiken. Het gooit een `RangeError` bij een
misvormde dag zoals `'2024-6-1'`: geef `YYYY-MM-DD` of een `Date` mee.

### Namen van rechtbanken in een andere taal {#court-names-in-another-language}

Namen staan zoals elke rechtbank ze publiceert, in elke taal waarin ze een pagina heeft. Een
rechtbank in Vlaanderen publiceert alleen in het Nederlands; tweetalige rechtbanken in Brussel in
het Nederlands en het Frans; de rechtbanken in Eupen in het Duits en het Frans.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## Ruwe JSON {#raw-json}

De databestanden worden ook geëxporteerd:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## Ids zijn publieke API {#ids-are-public-api}

Projecten slaan ids zoals `justice-of-the-peace-gent-1` of `oost-vlaanderen` op, dus die veranderen
nooit binnen een major-versie (zie [Identifiers](./identifiers)), en versies volgen deze regels:

| Wijziging                       | Versie |
| ------------------------------- | ------ |
| Data toevoegen                  | minor  |
| Een waarde corrigeren           | patch  |
| Een id verwijderen of hernoemen | major  |
