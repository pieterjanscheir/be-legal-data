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

| | |
| --- | --- |
| Source | Annex to the Judicial Code, "Gebiedsomschrijving en zetel van hoven en rechtbanken" ([Justel 1967101007](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), Dutch and French; Statbel open data for municipalities |
| Built by | `pnpm build:cantons` (cantons, municipalities); by hand (areas, arrondissements) |
| Changes when | A law amends the annex; municipalities merge (2019, 2025) |
| Checked | Weekly, by regenerating from the live sources ([data quality](/guide/data-quality)) |
| Licence | CC BY 4.0; municipality data © Statbel, CC BY 4.0 |

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
    id: string // 'Ghent'
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
    id: string // 'EastFlanders'
    name: Translated
    judicialArea: string // id of the JudicialArea
}
```

## Cantons

All 162 judicial cantons: the area of one justice of the peace each. File: `data/cantons.json`
(generated from the annex to the Judicial Code, art. 1).

### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Stable id in the local language, with a number for multi-canton places: `Gent1`, `MerelbekeMelle`, `Wavre1` |
| `arrondissement` | string | Arrondissement id |
| `name` | `{ nl, fr }` | Name of the canton as the annex gives it |
| `number` | number? | Canton number in places with several (Gent 1–5) |
| `seat` | `{ nl, fr }` | Where the justice of the peace sits; can differ from the name |
| `municipalities` | `{ refnis, partial? }[]` | Municipalities covered; `partial: true` when only part is |
| `territory` | `{ nl, fr }` | The canton's area, verbatim from the annex |
| `source` | string | Section of the annex, e.g. `Ger.W. bijvoegsel art. 1, afdeling 6.15` (Gent 4) |

```ts
interface Canton {
    id: string // 'Gent1', 'MerelbekeMelle'
    arrondissement: string
    name: Bilingual // { nl, fr }; usually the seat, but not always
    number?: number // for places with several cantons (Gent 1–5, …)
    seat: Bilingual // where the justice of the peace sits
    municipalities: { refnis: string; partial?: boolean }[]
    territory: Bilingual // the canton's area, verbatim from the annex
    source: string // where in the annex the canton is defined
}
```

- **Ids** follow the local language: Dutch in Flanders and Brussels, French in Wallonia, German
  around Eupen. The justice of the peace of canton `X` has the court id `VredegerechtX`.
- **Name and seat can differ**: canton `Oudergem` sits in Etterbeek.
- **`partial: true`** marks a municipality that is split over several cantons. The `territory`
  text then says which part (streets, numbers, waterways) belongs to this canton.
- Names are in Dutch and French only: the annex has no consolidated German text.

### Split municipalities

55 cantons cover only part of a municipality. For these, the canton can't be determined from the
municipality alone: it depends on the street (and sometimes the house number). The `territory`
text names the boundaries. Geocoding these boundaries is a possible future addition; until
then, show the candidate cantons and their text, and let a person decide.

## Municipalities

The 565 municipalities with their Statbel REFNIS (NIS) code. File: `data/municipalities.json`
(generated from Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    refnis: string // '44021' for Gent
    name: Bilingual
    province: string // REFNIS code of the province, or '04000' for Brussels-Capital
}
```

| Province code | Province |
| --- | --- |
| `04000` | Brussels-Capital Region |
| `10000` | Antwerpen |
| `20001` | Vlaams-Brabant |
| `20002` | Brabant wallon |
| `30000` | West-Vlaanderen |
| `40000` | Oost-Vlaanderen |
| `50000` | Hainaut |
| `60000` | Liège |
| `70000` | Limburg |
| `80000` | Luxembourg |
| `90000` | Namur |
