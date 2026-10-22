<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# Gebiet und Kantone {#territory-and-cantons}

Die belgische Gerichtslandkarte hat drei Ebenen: **Gerichtsbereiche** (einer pro Appellationshof)
umfassen **Gerichtsbezirke** (arrondissements), die wiederum **Kantone** umfassen (je ein
Friedensgericht). Kantone werden über **Gemeinden** umschrieben. Neben der Gerichtslandkarte steht
die Verwaltungskarte: Jede Gemeinde liegt in einer **Region** und, außerhalb Brüssels, in einer
**Provinz**.

## Wozu es dient {#why-it-s-useful}

- **Welches Friedensgericht?** Mietstreitigkeiten, geringfügige Forderungen, Schutzmaßnahmen
  (Verwaltung) und Nachbarschaftsstreitigkeiten gehen an einen Friedensrichter, meist den des
  Kantons, in dem der Beklagte wohnt oder die Immobilie liegt. Ein falscher Kanton bedeutet eine
  Klage beim falschen Gericht.
- **Welcher Gerichtsbezirk?** Gerichte erster Instanz, Unternehmens- und Arbeitsgerichte, die
  Staatsanwaltschaft und das Gebiet, in dem ein Gerichtsvollzieher tätig werden darf, sind alle
  pro Gerichtsbezirk organisiert.
- **Welcher Appellationshof?** Berufungen gehen an den Appellationshof des Gerichtsbereichs.
- **Daten verknüpfen.** Alles mit einem REFNIS-Code (Statistiken von Statbel, regionale offene
  Daten, Adressregister) lässt sich auf die Gerichtslandkarte bringen.

Das Gesetz beschreibt Kantone in Fließtext („der Teil des Gebiets der Stadt Antwerpen, begrenzt
durch die Mittellinien des Brouwersvliet …“). Diese Dateien machen daraus Daten und bewahren den
Gesetzestext für die Fälle, in denen nur der Text entscheiden kann.

## Quelle und Aktualisierungen {#source-and-updates}

|                   |                                                                                                                                                                                                                                                                                       |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quelle            | Anlage zum Gerichtsgesetzbuch, „Gebiedsomschrijving en zetel van hoven en rechtbanken“ ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), Niederländisch und Französisch; Open Data von Statbel für Gemeinden, Provinzen und Regionen |
| Gebaut durch      | `pnpm build:cantons` (Kantone, Gemeinden); wöchentliche Snapshots + `pnpm build:data` (Regionen, Provinzen); von Hand (Gerichtsbereiche, Gerichtsbezirke)                                                                                                                             |
| Ändert sich, wenn | Ein Gesetz die Anlage ändert; Gemeinden fusionieren (2019, 2025)                                                                                                                                                                                                                      |
| Deckt ab          | Ab dem 1. Januar 2025: Nachschlagen für einen früheren Tag wirft einen `RangeError` ([Zeit](/de/api#time))                                                                                                                                                                            |
| Geprüft           | Von Hand mit `pnpm build:cantons` neu gebaut: ejustice verweigert sich den Servern von GitHub ([Datenqualität](/de/guide/data-quality))                                                                                                                                               |
| Lizenz            | CC BY 4.0; Gemeindedaten © Statbel, CC BY 4.0                                                                                                                                                                                                                                         |

## Den Kanton einer Gemeinde finden {#find-the-canton-for-a-municipality}

<CantonLookup />

## Gerichtsbereiche {#judicial-areas}

Die 5 Bereiche der Appellationshöfe (rechtsgebieden / ressorts). Datei: `data/judicial-areas.json`.
Quelle: Anlage zum Gerichtsgesetzbuch (Ger.W. bijvoegsel), Art. 5.

<table>
<thead><tr><th>ID</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
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

## Gerichtsbezirke {#arrondissements}

Die 12 Gerichtsbezirke (gerechtelijke arrondissementen / arrondissements judiciaires). Datei:
`data/arrondissements.json`. Quelle: Ger.W. bijvoegsel Art. 4.

<table>
<thead><tr><th>ID</th><th>nl</th><th>fr</th><th>de</th><th>Gerichtsbereich</th></tr></thead>
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

## Kantone {#cantons}

Alle 162 Gerichtskantone: jeweils das Gebiet eines Friedensgerichts. Datei: `data/cantons.json`
(generiert aus der Anlage zum Gerichtsgesetzbuch, Art. 1).

### Felder {#fields}

| Feld             | Typ                            | Beschreibung                                                                                                             |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `id`             | `CantonId`                     | Stabile ID in der Landessprache, mit einer Nummer für Orte mit mehreren Kantonen: `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | ID des Gerichtsbezirks                                                                                                   |
| `name`           | `{ nl, fr }`                   | Name des Kantons, wie die Anlage ihn angibt                                                                              |
| `number`         | number?                        | Kantonsnummer an Orten mit mehreren Kantonen (Gent 1–5)                                                                  |
| `seat`           | `{ nl, fr }`                   | Wo das Friedensgericht seinen Sitz hat; kann vom Namen abweichen                                                         |
| `municipalities` | `{ municipality, partial? }[]` | Die abgedeckten Gemeinden, per REFNIS-Code; `partial: true`, wenn nur ein Teil abgedeckt ist                             |
| `territory`      | `{ nl, fr }`                   | Das Gebiet des Kantons, wörtlich aus der Anlage                                                                          |
| `legalBasis`     | `{ url, provision }`           | Wo das Gesetz es festlegt: die ELI der Anlage und der Abschnitt, z. B. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)       |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; meist der Sitz, aber nicht immer
    number?: number // für Orte mit mehreren Kantonen (Gent 1–5, …)
    seat: Bilingual // wo das Friedensgericht seinen Sitz hat
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // das Gebiet des Kantons, wörtlich aus der Anlage
    legalBasis: { url: string; provision: string } // die ELI der Anlage und der Abschnitt
}
```

- **IDs** folgen der Landessprache: Niederländisch in Flandern und Brüssel, Französisch in der
  Wallonie, Deutsch um Eupen; das zweisprachige Brüssel erhält den niederländischen Namen. Siehe
  [Identifikatoren](/de/guide/identifiers). Das Friedensgericht verweist über sein Feld `canton`
  auf seinen Kanton.
- **Name und Sitz können abweichen**: Der Kanton `oudergem` hat seinen Sitz in Etterbeek.
- **`partial: true`** kennzeichnet eine Gemeinde, die auf mehrere Kantone aufgeteilt ist. Der Text
  in `territory` sagt dann, welcher Teil (Straßen, Hausnummern, Wasserläufe) zu diesem Kanton
  gehört.
- Namen gibt es nur auf Niederländisch und Französisch: Die Anlage hat keinen koordinierten
  deutschen Text.

### Geteilte Gemeinden {#split-municipalities}

55 Kantone decken nur einen Teil einer Gemeinde ab. Für sie lässt sich der Kanton nicht allein aus
der Gemeinde bestimmen: Er hängt von der Straße ab (und manchmal von der Hausnummer). Der Text in
`territory` nennt die Grenzen. Mit den Koordinaten der Adresse findet `findCantonsAt(lon, lat)`
aus `belgica/canton-boundaries` den Kanton in den [Kantonsgrenzen](./canton-boundaries) des NGI;
ohne Koordinaten zeigen Sie die infrage kommenden Kantone mit ihrem Text an und lassen einen
Menschen entscheiden. Wo Geometrie und Text voneinander abweichen, ist der Text das Gesetz.

## Gemeinden {#municipalities}

Die 565 Gemeinden mit ihrem REFNIS-Code (NIS-Code) von Statbel. Datei: `data/municipalities.json`
(generiert aus Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // der REFNIS-Code: '44021' für Gent
    name: Bilingual
    province: ProvinceId | '04000' // REFNIS-Code der Provinz; '04000' in Brüssel
    region: RegionId // REFNIS-Code der Region
}
```

Die 19 Gemeinden der Region Brüssel-Hauptstadt haben keine Provinz. Ihr `province` ist `04000`,
der Code der Region: Das trägt Statbel selbst in die Provinzspalte seiner Dateien ein.
`getProvinceForMunicipality` gibt für sie `undefined` zurück; `getRegionForMunicipality` liefert
die Region. Die Codes stehen unten, aus den Daten.

## Regionen {#regions}

Die 3 Regionen (gewesten / régions). Datei: `data/regions.json` (generiert aus der
REFNIS-Codeliste von Statbel; Namen so, wie Statbel sie veröffentlicht). © Statbel, CC BY 4.0.

<table>
<thead><tr><th>ID (REFNIS)</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="r in regions" :key="r.id">
<td><code>{{ r.id }}</code></td><td>{{ r.name.nl }}</td><td>{{ r.name.fr }}</td><td>{{ r.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface Region {
    id: RegionId // der REFNIS-Code: '02000', '03000', '04000'
    name: Translated // { nl, fr, de }, so wie Statbel sie veröffentlicht
    sources: SourceRef[] // die REFNIS-Codeliste von Statbel
}
```

## Provinzen {#provinces}

Die 10 Provinzen, mit ihrer Region. Datei: `data/provinces.json` (generiert aus der
REFNIS-Codeliste von Statbel). © Statbel, CC BY 4.0. Die Region Brüssel-Hauptstadt hat keine
Provinz; die Provinz Brabant, die am 31. Dezember 1994 endete, liegt vor dem abgedeckten Zeitraum
der Daten.

<table>
<thead><tr><th>ID (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>Region</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // der REFNIS-Code: '40000' für Oost-Vlaanderen
    name: Translated // { nl, fr, de }, so wie Statbel sie veröffentlicht
    region: RegionId
    sources: SourceRef[] // die REFNIS-Codeliste von Statbel
}
```

Die Namen sind die von Statbel, einschließlich des Worts für die Art der Einheit (`Provincie
Oost-Vlaanderen`, `Province de Flandre orientale`, `Provinz Ostflandern`): Das Package speichert
Werte so, wie die Quelle sie veröffentlicht, und kürzt sie nicht.
