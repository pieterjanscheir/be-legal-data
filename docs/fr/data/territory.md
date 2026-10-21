<script setup>
import { judicialAreas, arrondissements, getJudicialArea } from '../../../src'
</script>

# Territoire et cantons {#territory-and-cantons}

La carte judiciaire belge compte trois niveaux : les **ressorts** (un par cour d'appel) contiennent des
**arrondissements**, qui contiennent des **cantons** (une justice de paix chacun). Les cantons sont
définis en termes de **communes**.

## À quoi ça sert {#why-it-s-useful}

- **Quelle justice de paix ?** Les litiges locatifs, les petites créances, l'administration de la personne
  et des biens et les conflits de voisinage relèvent du juge de paix, en général celui du canton où le
  défendeur habite ou où se situe l'immeuble. Se tromper de canton, c'est introduire la demande devant le
  mauvais tribunal.
- **Quel arrondissement ?** Les tribunaux de première instance, de l'entreprise et du travail, le
  parquet et le territoire où un huissier de justice peut instrumenter sont tous organisés par
  arrondissement.
- **Quelle cour d'appel ?** L'appel se porte devant la cour d'appel du ressort.
- **Croiser des données.** Tout ce qui porte un code REFNIS (statistiques de Statbel, données ouvertes
  régionales, registres d'adresses) peut être placé sur la carte judiciaire.

La loi décrit les cantons en prose (« la partie du territoire de la ville d'Anvers délimitée par l'axe du
Brouwersvliet… »). Ces fichiers en font des données tout en conservant le texte légal pour les cas où seul
le texte peut trancher.

## Source et mises à jour {#source-and-updates}

|               |                                                                                                                                                                                                                                                                                                                                        |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source        | Annexe au Code judiciaire, « Gebiedsomschrijving en zetel van hoven en rechtbanken » / « Délimitation du territoire et siège des cours et tribunaux » ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), en néerlandais et en français ; données ouvertes de Statbel pour les communes |
| Construit par | `pnpm build:cantons` (cantons, communes) ; à la main (ressorts, arrondissements)                                                                                                                                                                                                                                                       |
| Change quand  | Une loi modifie l'annexe ; des communes fusionnent (2019, 2025)                                                                                                                                                                                                                                                                        |
| Couvre        | À partir du 1er janvier 2025 : une recherche pour une date antérieure lève une `RangeError` ([temps](/fr/api#time))                                                                                                                                                                                                                    |
| Vérifié       | Reconstruit à la main avec `pnpm build:cantons` : ejustice refuse les serveurs de GitHub ([qualité des données](/fr/guide/data-quality))                                                                                                                                                                                               |
| Licence       | CC BY 4.0 ; données communales © Statbel, CC BY 4.0                                                                                                                                                                                                                                                                                    |

## Trouver le canton d'une commune {#find-the-canton-for-a-municipality}

<CantonLookup />

## Ressorts {#judicial-areas}

Les 5 ressorts des cours d'appel (rechtsgebieden). Fichier : `data/judicial-areas.json`.
Source : annexe au Code judiciaire (C. jud.), art. 5.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="a in judicialAreas" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface JudicialArea {
    id: JudicialAreaId // 'gent'
    name: Translated // { nl, fr, de }
}
```

## Arrondissements {#arrondissements}

Les 12 arrondissements judiciaires. Fichier : `data/arrondissements.json`. Source : annexe au
C. jud., art. 4.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>Ressort</th></tr></thead>
<tbody>
<tr v-for="a in arrondissements" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
<td>{{ getJudicialArea(a.judicialArea)?.name.fr }}</td>
</tr>
</tbody>
</table>

```ts
interface Arrondissement {
    id: ArrondissementId // 'oost-vlaanderen'
    name: Translated
    judicialArea: JudicialAreaId
}
```

## Cantons {#cantons}

Les 162 cantons judiciaires : le territoire d'une justice de paix chacun. Fichier : `data/cantons.json`
(généré à partir de l'annexe au Code judiciaire, art. 1er).

### Champs {#fields}

| Champ            | Type                           | Description                                                                                                                |
| ---------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Identifiant stable dans la langue locale, numéroté là où il y a plusieurs cantons : `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | Identifiant de l'arrondissement                                                                                            |
| `name`           | `{ nl, fr }`                   | Nom du canton tel que l'annexe le donne                                                                                    |
| `number`         | number?                        | Numéro du canton là où il y en a plusieurs (Gent 1–5)                                                                      |
| `seat`           | `{ nl, fr }`                   | Siège de la justice de paix ; peut différer du nom                                                                         |
| `municipalities` | `{ municipality, partial? }[]` | Communes couvertes, par code REFNIS ; `partial: true` quand seule une partie l'est                                         |
| `territory`      | `{ nl, fr }`                   | Le territoire du canton, tel quel dans l'annexe                                                                            |
| `legalBasis`     | `{ url, provision }`           | Où la loi le définit : l'ELI de l'annexe et la section, p. ex. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)                 |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr } ; généralement le siège, mais pas toujours
    number?: number // pour les lieux à plusieurs cantons (Gent 1–5, …)
    seat: Bilingual // le siège de la justice de paix
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // le territoire du canton, tel quel dans l'annexe
    legalBasis: { url: string; provision: string } // l'ELI de l'annexe, et la section
}
```

- **Les identifiants** suivent la langue locale : le néerlandais en Flandre et à Bruxelles, le français en
  Wallonie, l'allemand autour d'Eupen ; Bruxelles, bilingue, prend le nom néerlandais. Voyez
  [Identifiants](/fr/guide/identifiers). La justice de paix renvoie à son canton par son champ `canton`.
- **Le nom et le siège peuvent différer** : le canton `oudergem` siège à Etterbeek.
- **`partial: true`** marque une commune scindée entre plusieurs cantons. Le texte `territory` précise
  alors quelle partie (rues, numéros, cours d'eau) relève de ce canton.
- Les noms n'existent qu'en néerlandais et en français : l'annexe n'a pas de texte allemand consolidé.

### Communes scindées {#split-municipalities}

55 cantons ne couvrent qu'une partie d'une commune. Pour ceux-ci, le canton ne peut se déduire de la seule
commune : il dépend de la rue (et parfois du numéro de maison). Le texte `territory` en nomme les
limites. Le géocodage de ces limites est un ajout possible à l'avenir ; d'ici là, affichez les cantons
candidats et leur texte, et laissez une personne trancher.

## Communes {#municipalities}

Les 565 communes avec leur code REFNIS (NIS) de Statbel. Fichier : `data/municipalities.json`
(généré à partir de Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // le code REFNIS : '44021' pour Gent
    name: Bilingual
    province: string // code REFNIS de la province, ou '04000' pour Bruxelles-Capitale
}
```

| Code de province | Province                     |
| ---------------- | ---------------------------- |
| `04000`          | Région de Bruxelles-Capitale |
| `10000`          | Antwerpen                    |
| `20001`          | Vlaams-Brabant               |
| `20002`          | Brabant wallon               |
| `30000`          | West-Vlaanderen              |
| `40000`          | Oost-Vlaanderen              |
| `50000`          | Hainaut                      |
| `60000`          | Liège                        |
| `70000`          | Limburg                      |
| `80000`          | Luxembourg                   |
| `90000`          | Namur                        |
