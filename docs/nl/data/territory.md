<script setup>
import { judicialAreas, arrondissements, getJudicialArea } from '../../../src'
</script>

# Territorium en kantons {#territory-and-cantons}

De Belgische gerechtelijke kaart heeft drie niveaus: **rechtsgebieden** (één per hof van beroep)
bevatten **arrondissementen**, die **kantons** bevatten (één vredegerecht elk). Kantons worden
omschreven in termen van **gemeenten**.

## Waarvoor het dient {#why-it-s-useful}

- **Welk vredegerecht?** Huurgeschillen, kleine vorderingen, bewindvoering en burengeschillen
  gaan naar een vrederechter, meestal die van het kanton waar de verweerder woont of het
  onroerend goed ligt. Het verkeerde kanton betekent een vordering bij het verkeerde gerecht.
- **Welk arrondissement?** Rechtbanken van eerste aanleg, ondernemings- en arbeidsrechtbanken,
  het parket en het gebied waarin een gerechtsdeurwaarder mag optreden zijn allemaal per
  arrondissement georganiseerd.
- **Welk hof van beroep?** Beroepen gaan naar het hof van beroep van het rechtsgebied.
- **Data koppelen.** Alles met een REFNIS-code (Statbel-statistieken, gewestelijke open data,
  adresregisters) kan op de gerechtelijke kaart worden gezet.

De wet beschrijft kantons in proza ("het deel van het grondgebied van de stad Antwerpen
begrensd door de middellijnen van de Brouwersvliet…"). Deze bestanden maken daar data van en
bewaren de wettekst voor de gevallen waarin alleen de tekst uitsluitsel kan geven.

## Bron en updates {#source-and-updates}

|               |                                                                                                                                                                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bron          | Bijvoegsel bij het Gerechtelijk Wetboek, "Gebiedsomschrijving en zetel van hoven en rechtbanken" ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), Nederlands en Frans; open data van Statbel voor de gemeenten |
| Gebouwd door  | `pnpm build:cantons` (kantons, gemeenten); met de hand (rechtsgebieden, arrondissementen)                                                                                                                                                                        |
| Verandert bij | Een wet die het bijvoegsel wijzigt; gemeentefusies (2019, 2025)                                                                                                                                                                                                  |
| Dekt          | 1 januari 2025 en later: opzoekingen voor een vroegere dag gooien een `RangeError` ([tijd](/nl/api#time))                                                                                                                                                        |
| Gecontroleerd | Met de hand herbouwd met `pnpm build:cantons`: ejustice weigert de servers van GitHub ([datakwaliteit](/nl/guide/data-quality))                                                                                                                                  |
| Licentie      | CC BY 4.0; gemeentedata © Statbel, CC BY 4.0                                                                                                                                                                                                                     |

## Zoek het kanton van een gemeente {#find-the-canton-for-a-municipality}

<CantonLookup />

## Rechtsgebieden {#judicial-areas}

De 5 rechtsgebieden van de hoven van beroep. Bestand: `data/judicial-areas.json`.
Bron: bijvoegsel bij het Gerechtelijk Wetboek (Ger.W. bijvoegsel), art. 5.

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

## Arrondissementen {#arrondissements}

De 12 gerechtelijke arrondissementen. Bestand: `data/arrondissements.json`. Bron: Ger.W.
bijvoegsel art. 4.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>Rechtsgebied</th></tr></thead>
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

## Kantons {#cantons}

Alle 162 gerechtelijke kantons: het gebied van telkens één vredegerecht. Bestand:
`data/cantons.json` (gegenereerd uit het bijvoegsel bij het Gerechtelijk Wetboek, art. 1).

### Velden {#fields}

| Veld             | Type                           | Beschrijving                                                                                                            |
| ---------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Stabiele id in de streektaal, met een nummer voor plaatsen met meerdere kantons: `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | Id van het arrondissement                                                                                               |
| `name`           | `{ nl, fr }`                   | Naam van het kanton zoals het bijvoegsel die geeft                                                                      |
| `number`         | number?                        | Kantonnummer in plaatsen met meerdere kantons (Gent 1–5)                                                                |
| `seat`           | `{ nl, fr }`                   | Waar het vredegerecht zetelt; kan verschillen van de naam                                                               |
| `municipalities` | `{ municipality, partial? }[]` | De gemeenten die het dekt, per REFNIS-code; `partial: true` als dat maar gedeeltelijk is                                |
| `territory`      | `{ nl, fr }`                   | Het gebied van het kanton, letterlijk uit het bijvoegsel                                                                |
| `legalBasis`     | `{ url, provision }`           | Waar de wet het omschrijft: de ELI van het bijvoegsel en de afdeling, bv. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)   |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; meestal de zetel, maar niet altijd
    number?: number // voor plaatsen met meerdere kantons (Gent 1–5, …)
    seat: Bilingual // waar het vredegerecht zetelt
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // het gebied van het kanton, letterlijk uit het bijvoegsel
    legalBasis: { url: string; provision: string } // de ELI van het bijvoegsel, en de afdeling
}
```

- **Ids** volgen de streektaal: Nederlands in Vlaanderen en Brussel, Frans in Wallonië, Duits
  rond Eupen; het tweetalige Brussel krijgt de Nederlandse naam. Zie [identifiers](/nl/guide/identifiers).
  Het vredegerecht verwijst naar zijn kanton via zijn veld `canton`.
- **Naam en zetel kunnen verschillen**: kanton `oudergem` zetelt in Etterbeek.
- **`partial: true`** markeert een gemeente die over meerdere kantons is gesplitst. De tekst in
  `territory` zegt dan welk deel (straten, huisnummers, waterlopen) bij dit kanton hoort.
- Namen zijn er alleen in het Nederlands en het Frans: het bijvoegsel heeft geen geconsolideerde
  Duitse tekst.

### Gesplitste gemeenten {#split-municipalities}

55 kantons dekken maar een deel van een gemeente. Voor die kantons kun je het kanton niet
bepalen op basis van de gemeente alleen: het hangt af van de straat (en soms van het
huisnummer). De tekst in `territory` noemt de grenzen. Die grenzen geocoderen is een mogelijke
toekomstige uitbreiding; tot dan toon je de kandidaat-kantons met hun tekst en laat je een
mens beslissen.

## Gemeenten {#municipalities}

De 565 gemeenten met hun REFNIS-code (NIS-code) van Statbel. Bestand: `data/municipalities.json`
(gegenereerd uit Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // de REFNIS-code: '44021' voor Gent
    name: Bilingual
    province: string // REFNIS-code van de provincie, of '04000' voor Brussel-Hoofdstad
}
```

| Provinciecode | Provincie                      |
| ------------- | ------------------------------ |
| `04000`       | Brussels Hoofdstedelijk Gewest |
| `10000`       | Antwerpen                      |
| `20001`       | Vlaams-Brabant                 |
| `20002`       | Brabant wallon                 |
| `30000`       | West-Vlaanderen                |
| `40000`       | Oost-Vlaanderen                |
| `50000`       | Hainaut                        |
| `60000`       | Liège                          |
| `70000`       | Limburg                        |
| `80000`       | Luxembourg                     |
| `90000`       | Namur                          |
