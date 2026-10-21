# Aan de slag {#getting-started}

## Installatie {#install}

::: code-group

```bash [pnpm]
pnpm add be-legal-data
```

```bash [npm]
npm install be-legal-data
```

```bash [yarn]
yarn add be-legal-data
```

:::

Het package is ESM, levert zijn eigen typedefinities mee, heeft geen runtime-afhankelijkheden en
draait in browsers en op Node 22.12 of later, waar `require()` het ook laadt. Het wordt getest op
Node 22.12, 22, 24 en 26.

### Importeer alleen wat je nodig hebt {#import-only-what-you-need}

De data zit mee in de JavaScript gebundeld, dus wie importeert vanuit de root van het package laadt
elke dataset (ongeveer 250 KB, vooral de wettekst van de kantons). Elke dataset heeft een eigen
entry point:

```ts
import { getInterestRate } from 'be-legal-data/interest-rates' // 12 KB
import { getCourt } from 'be-legal-data/courts' // 32 KB
import { getCanton } from 'be-legal-data/territory'
```

## Een eerste blik {#a-first-look}

```ts
import {
    getCourt,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'be-legal-data'

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
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'be-legal-data'

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

### Verschuldigde interest op een dag {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'be-legal-data'

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
import courts from 'be-legal-data/data/courts.json' with { type: 'json' }
```

## Ids zijn publieke API {#ids-are-public-api}

Projecten slaan ids zoals `justice-of-the-peace-gent-1` of `oost-vlaanderen` op, dus die veranderen
nooit binnen een major-versie (zie [Identifiers](./identifiers)), en versies volgen deze regels:

| Wijziging                       | Versie |
| ------------------------------- | ------ |
| Data toevoegen                  | minor  |
| Een waarde corrigeren           | patch  |
| Een id verwijderen of hernoemen | major  |
