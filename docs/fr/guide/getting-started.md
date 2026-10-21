# Premiers pas {#getting-started}

## Installation {#install}

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

Le package est en ESM, fournit ses propres définitions de types, n'a aucune dépendance à
l'exécution et fonctionne dans les navigateurs et sous Node 22.12 ou plus récent, où `require()`
le charge aussi. Il est testé sous Node 22.12, 22, 24 et 26.

### N'importez que ce dont vous avez besoin {#import-only-what-you-need}

Les données sont intégrées au JavaScript : importer depuis la racine du package charge donc tous
les jeux de données (environ 250 Ko, surtout le texte légal des cantons). Chaque jeu de données a
son propre point d'entrée :

```ts
import { getInterestRate } from 'be-legal-data/interest-rates' // 12 Ko
import { getCourt } from 'be-legal-data/courts' // 32 Ko
import { getCanton } from 'be-legal-data/territory'
```

## Un premier aperçu {#a-first-look}

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
getCantonsForMunicipality('44021') // Gent 1–5 : ville scindée, voyez le `territory` de chaque canton
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Tâches courantes {#common-tasks}

### Quelle justice de paix pour une adresse ? {#which-justice-of-the-peace-handles-an-address}

Cherchez le code REFNIS de la commune et obtenez ses cantons, puis la justice de paix du canton.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'be-legal-data'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // chaque canton a sa justice de paix
}

// Au jour de la signification de la citation, plutôt qu'aujourd'hui
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Quand une ville est scindée en plusieurs cantons (Anvers, Gand, Bruxelles, Liège, …), vous obtenez
plus d'un résultat. C'est l'adresse (la rue) qui tranche, et le `territory` de chaque canton
contient la description légale de sa partie. Essayez-le sur la
[page Territoire et cantons](/fr/data/territory#find-the-canton-for-a-municipality).

### Quel tribunal pour une commune ? {#which-court-for-a-municipality}

Tout tribunal autre qu'une justice de paix liste les cantons qu'il couvre (`cantons`), tels que la
loi les fixe. `findCompetentCourts` y recherche les cantons d'une commune.

```ts
import { findCompetentCourts, getDivisions } from 'be-legal-data'

findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], pas Bruxelles
findCompetentCourts('21004', 'labour-court') // le tribunal néerlandophone et le tribunal francophone de Bruxelles

// Le tribunal dans son ensemble ; la division qui connaît de l'affaire n'est pas encore dans les données
const [court] = findCompetentCourts('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

### Intérêts dus à une date donnée {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'be-legal-data'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` renvoie `null` pour un jour sans taux connu, de sorte que vous pouvez avertir au
lieu d'appliquer 0 % en silence. Elle lève une `RangeError` pour une date mal formée telle que
`'2024-6-1'` : passez `YYYY-MM-DD` ou une `Date`.

### Le nom des tribunaux dans une autre langue {#court-names-in-another-language}

Les noms sont ceux que chaque tribunal publie, dans chaque langue où il a une page. Un tribunal
en Flandre publie uniquement en néerlandais ; les tribunaux bilingues de Bruxelles en néerlandais
et en français ; les tribunaux d'Eupen en allemand et en français.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## JSON brut {#raw-json}

Les fichiers de données sont exportés eux aussi :

```ts
import courts from 'be-legal-data/data/courts.json' with { type: 'json' }
```

## Les identifiants font partie de l'API publique {#ids-are-public-api}

Les projets stockent des identifiants tels que `justice-of-the-peace-gent-1` ou `oost-vlaanderen` ;
ils ne changent donc jamais au sein d'une version majeure (voir [Identifiants](./identifiers)), et
les versions suivent ces règles :

| Changement                                | Version |
| ----------------------------------------- | ------- |
| Ajout de données                          | mineure |
| Correction d'une valeur                   | patch   |
| Suppression ou renommage d'un identifiant | majeure |
