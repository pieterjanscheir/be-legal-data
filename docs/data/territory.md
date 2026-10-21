<script setup>
import { judicialAreas, arrondissements, getJudicialArea } from '../../src'
</script>

# Territory and cantons

Belgium's judicial map has three levels: **judicial areas** (one per court of appeal) contain
**arrondissements**, which contain **cantons** (one justice of the peace each). Cantons are
defined in terms of **municipalities**.

## Why it's useful

- **Which justice of the peace?** Rent disputes, small claims, guardianship and neighbour
  disputes go to a justice of the peace, usually the one of the canton where the defendant
  lives or the property lies. Getting the canton wrong means a claim filed at the wrong court.
- **Which arrondissement?** Courts of first instance, enterprise and labour courts, the
  prosecutor's office, and the territory where a bailiff may act are all organised per
  arrondissement.
- **Which court of appeal?** Appeals go to the court of appeal of the judicial area.
- **Joining data.** Anything with a REFNIS code (Statbel statistics, regional open data,
  address registers) can be put on the judicial map.

The law describes cantons in prose ("the part of the territory of the city of Antwerpen bounded
by the centre lines of the Brouwersvliet…"). These files turn it into data while keeping the
legal text for the cases where only the text can decide.

## Source and updates

|              |                                                                                                                                                                                                                                               |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Source       | Annex to the Judicial Code, "Gebiedsomschrijving en zetel van hoven en rechtbanken" ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), Dutch and French; Statbel open data for municipalities |
| Built by     | `pnpm build:cantons` (cantons, municipalities); by hand (areas, arrondissements)                                                                                                                                                              |
| Changes when | A law amends the annex; municipalities merge (2019, 2025)                                                                                                                                                                                     |
| Covers       | 1 January 2025 onwards: lookups for an earlier day throw a `RangeError` ([time](/api#time))                                                                                                                                                   |
| Checked      | Rebuilt by hand with `pnpm build:cantons`: ejustice refuses GitHub's servers ([data quality](/guide/data-quality))                                                                                                                            |
| Licence      | CC BY 4.0; municipality data © Statbel, CC BY 4.0                                                                                                                                                                                             |

## Find the canton for a municipality

<CantonLookup />

## Judicial areas

The 5 areas of the courts of appeal (rechtsgebieden). File: `data/judicial-areas.json`.
Source: annex to the Judicial Code (Ger.W. bijvoegsel), art. 5.

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

## Arrondissements

The 12 judicial arrondissements. File: `data/arrondissements.json`. Source: Ger.W. bijvoegsel
art. 4.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>Judicial area</th></tr></thead>
<tbody>
<tr v-for="a in arrondissements" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
<td>{{ getJudicialArea(a.judicialArea)?.name.nl }}</td>
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

## Cantons

All 162 judicial cantons: the area of one justice of the peace each. File: `data/cantons.json`
(generated from the annex to the Judicial Code, art. 1).

### Fields

| Field            | Type                           | Description                                                                                                    |
| ---------------- | ------------------------------ | -------------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Stable id in the local language, with a number for multi-canton places: `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | Arrondissement id                                                                                              |
| `name`           | `{ nl, fr }`                   | Name of the canton as the annex gives it                                                                       |
| `number`         | number?                        | Canton number in places with several (Gent 1–5)                                                                |
| `seat`           | `{ nl, fr }`                   | Where the justice of the peace sits; can differ from the name                                                  |
| `municipalities` | `{ municipality, partial? }[]` | Municipalities covered, by REFNIS code; `partial: true` when only part is                                      |
| `territory`      | `{ nl, fr }`                   | The canton's area, verbatim from the annex                                                                     |
| `legalBasis`     | `{ url, provision }`           | Where the law defines it: the annex's ELI and the section, e.g. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)    |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; usually the seat, but not always
    number?: number // for places with several cantons (Gent 1–5, …)
    seat: Bilingual // where the justice of the peace sits
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // the canton's area, verbatim from the annex
    legalBasis: { url: string; provision: string } // the annex's ELI, and the section
}
```

- **Ids** follow the local language: Dutch in Flanders and Brussels, French in Wallonia, German
  around Eupen; Brussels, which is bilingual, takes the Dutch name. See [identifiers](/guide/identifiers).
  The justice of the peace links to its canton through its `canton` field.
- **Name and seat can differ**: canton `oudergem` sits in Etterbeek.
- **`partial: true`** marks a municipality that is split over several cantons. The `territory`
  text then says which part (streets, numbers, waterways) belongs to this canton.
- Names are in Dutch and French only: the annex has no consolidated German text.

### Split municipalities

55 cantons cover only part of a municipality. For these, the canton can't be determined from the
municipality alone: it depends on the street (and sometimes the house number). The `territory`
text names the boundaries. With the address's coordinates, `findCantonsAt(lon, lat)` from
`be-legal-data/canton-boundaries` finds the canton in the NGI's
[canton boundaries](./canton-boundaries); without them, show the candidate cantons and their
text, and let a person decide. Where the geometry and the text disagree, the text is the law.

## Municipalities

The 565 municipalities with their Statbel REFNIS (NIS) code. File: `data/municipalities.json`
(generated from Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // the REFNIS code: '44021' for Gent
    name: Bilingual
    province: string // REFNIS code of the province, or '04000' for Brussels-Capital
}
```

| Province code | Province                |
| ------------- | ----------------------- |
| `04000`       | Brussels-Capital Region |
| `10000`       | Antwerpen               |
| `20001`       | Vlaams-Brabant          |
| `20002`       | Brabant wallon          |
| `30000`       | West-Vlaanderen         |
| `40000`       | Oost-Vlaanderen         |
| `50000`       | Hainaut                 |
| `60000`       | Liège                   |
| `70000`       | Limburg                 |
| `80000`       | Luxembourg              |
| `90000`       | Namur                   |
