# Kantonsgrenzen {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

Datei: `data/canton-boundaries.json`. Die Grenze jedes der {{ stats.cantons }} Gerichtskantone als
GeoJSON-Geometrie, so wie das Nationale Geographische Institut (NGI) sie aus der Anlage zum
Gerichtsgesetzbuch digitalisiert hat.

## Wozu es dient {#why-it-s-useful}

- **Der Kanton einer Adresse in einer geteilten Stadt.** {{ stats.splitCantons }} Kantone decken
  nur einen Teil einer Gemeinde ab (Antwerpen, Gent, Brüssel, Lüttich, Charleroi, …), und
  `getCantonsForMunicipality` kann nur die Kandidaten aufzählen. Mit der geocodierten Adresse
  liefert `findCantonsAt(lon, lat)` den einen Kanton und damit das Friedensgericht.
- **Karten.** Die Geometrie ist Standard-GeoJSON in WGS 84: Zeichnen Sie die Kantone auf eine
  Karte, verknüpfen Sie sie mit anderen Geodaten oder laden Sie sie in PostGIS, QGIS oder eine
  Tabellenkalkulation mit Kartenfunktion.
- **Den Gesetzestext prüfen.** Die Polygone des NGI sind eine zweite Lesart derselben Anlage,
  neben dem `territory`-Text jedes Kantons.

::: warning Der Gesetzestext gewinnt
Die Grenze ist die Auslegung der Anlage zum Gerichtsgesetzbuch durch das NGI, digitalisiert anhand
der katastralen Gemeindegrenzen, Wasserläufe und Straßen. Die Anlage selbst, wörtlich zitiert in
`territory` jedes Kantons, ist das Gesetz. Bei einem Punkt nahe an einer Grenzlinie lesen Sie den
Text; er nennt die Straßen und Hausnummern.
:::

## Quelle und Aktualisierungen {#source-and-updates}

|                   |                                                                                                                                                                                                                                                         |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Quelle            | NGI, [Gerichtskantone und Gerichtsbezirke](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3) (Gebietseinteilungen) auf geo.be: das GeoPackage in WGS 84 (EPSG:4326), Feature-Typ `judicialcanton`, überarbeitet am 16. Juli 2026 |
| Lizenz            | © NGI, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                                        |
| Gebaut durch      | `scripts/parse/boundaries.ts` aus dem wöchentlichen Snapshot des GeoPackage                                                                                                                                                                             |
| Ändert sich, wenn | Das NGI eine neue Version veröffentlicht: jedes Jahr, wenn die Gemeindegrenzen des FÖD Finanzen aktualisiert werden, oder wenn ein Gesetz die Anlage ändert                                                                                             |
| Deckt ab          | Ab dem 21. Oktober 2026, dem Tag, an dem die Datei zuerst gelesen wurde: Nachschlagen für einen früheren Tag wirft einen `RangeError` ([Zeit](/de/api#time))                                                                                            |
| Geprüft           | Jede Woche, durch den [sources-Workflow](/de/guide/data-quality#how-the-data-is-built): Der Build schlägt fehl, wenn ein Kanton keine Grenze hat oder eine Grenze zu keinem Kanton passt                                                                |

Wie das NGI die Grenzen gezogen hat, in seinen eigenen Worten: Wo die Anlage auf Gemeindegrenzen
verweist, hat es die Katastergrenzen des FÖD Finanzen verwendet; wo sie auf Wasserläufe oder
Straßen verweist, die eigenen topografischen Daten des NGI; wo sie auf ehemalige Gemeinden
verweist, die Grenzen des NGI für diese. Der Maßstab ist 1:10 000.

## Felder {#fields}

| Feld                   | Typ                    | Beschreibung                                                                                                                                                                     |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | Die ID des Kantons: Ein Kanton hat eine Grenze, die seinen Schlüssel übernimmt                                                                                                   |
| `validFrom`, `validTo` | string?                | Die Tage, an denen der Eintrag gilt; fehlend: seit Beginn des abgedeckten Zeitraums bzw. gilt weiterhin. Siehe [Zeit](/de/api#time)                                              |
| `canton`               | `CantonId`             | Der Kanton, zu dem die Grenze gehört                                                                                                                                             |
| `ngiId`                | string                 | Der Identifikator des Objekts beim NGI (sein `tgid`), eine GUID                                                                                                                  |
| `cantonCode`           | `{ nl, fr }`           | Der Kantonscode in den Daten des NGI: sechs Ziffern (`248112` für Gent 1), mit einem Präfix `N` oder `F` pro Sprache in Brüssel-Hauptstadt und in Sint-Genesius-Rode (`N238104`) |
| `geometry`             | `MultiPolygon`         | GeoJSON ([RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)): WGS 84, Längengrad zuerst, Außenringe gegen den Uhrzeigersinn, Löcher im Uhrzeigersinn                             |
| `sources`              | `{ url, retrieved }[]` | Die Datei des NGI, aus der der Eintrag gelesen wurde                                                                                                                             |

```ts
interface CantonBoundary {
    id: CantonId // 'gent-1'
    canton: CantonId // 'gent-1'
    ngiId: string // '{3905ED53-F233-4C4E-8225-4E43FEC7C541}'
    cantonCode: Bilingual // { nl: '248114', fr: '248114' }
    geometry: MultiPolygon // { type: 'MultiPolygon', coordinates: [[[[lon, lat], …]]] }
    sources: SourceRef[]
}
```

Die Geometrie ist die des NGI, Punkt für Punkt: Nichts wird vereinfacht. Koordinaten sind auf
7 Dezimalstellen gerundet, etwa einen Zentimeter, unterhalb der Genauigkeit der Quelle selbst.
Jede Grenze ist ein `MultiPolygon`, auch wenn sie nur ein Polygon hat, sodass jeder Eintrag dieselbe
Form hat.

### Wie Kantone den Features des NGI zugeordnet werden {#how-cantons-are-matched-to-the-ngi-s-features}

Das NGI benennt jedes Feature auf Niederländisch und auf Französisch (`Eerste gerechtelijk kanton
Gent`, `Premier canton judiciaire de Gand`). Ein Feature ist die Grenze eines Kantons, wenn beide
Namen, auf die [übliche Weise](/de/guide/identifiers) in eine ID umgewandelt, diesen Kanton ergeben
und in seiner Nummer übereinstimmen. Sieben Features sind in beiden Sprachen mit ihrem lokalen
Namen benannt, wo die Anlage ein Exonym verwendet (`Canton judiciaire de Halle`, wo die Anlage
`Hal` sagt; `Gerechtelijk kanton Huy`, wo sie `Hoei` sagt); diese werden über ihren Kantonscode in
`CANTON_ALIASES` im Parser zugeordnet. Alles andere stoppt den Build.

## Größe {#size}

Die Grenzen sind mit Abstand der größte Datensatz: etwa eine Million Positionen. Sie haben einen
eigenen Entry Point, `belgica/canton-boundaries`, und der Root des Package exportiert sie nicht
erneut; nichts lädt sie also, ohne danach zu fragen:

<table v-if="stats.sizes">
<thead><tr><th>Entry Point</th><th style="text-align:right">Geladenes JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Die Größen werden beim Bauen der Website aus dem Build gemessen (zuerst <code>pnpm build</code>).</p>

Die Rohdatei `data/canton-boundaries.json` ist im npm-Package und in jedem Release enthalten, sodass
Python, PostGIS und GIS-Werkzeuge sie ohne das JavaScript lesen können.

## Den Kanton eines Punktes finden {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// Zuerst der Längengrad, dann der Breitengrad, wie GeoJSON sie ordnet
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // wo Sie einreichen

findCantonsAt(2.3522, 48.8566) // [] : Paris, außerhalb Belgiens
getCantonBoundary('gent-1').geometry // das MultiPolygon
```

`findCantonsAt` gibt für einen Punkt in Belgien einen Kanton zurück, keinen außerhalb, und beide
Kantone für einen Punkt genau auf der Linie zwischen zweien. Es braucht keine Abhängigkeit: ein
einfacher Punkt-in-Polygon-Test über die Grenzen, etwa eine Millisekunde pro Abfrage. Das
Geocodieren der Adresse (Straße und Hausnummer zu Koordinaten) liegt bei Ihnen: Die Adressregister
der Regionen (das Adressenregister in Flandern, UrbIS in Brüssel, ICAR in der Wallonie) und die
föderalen BeSt-Adressdaten auf geo.be leisten das.

## In anderen Sprachen {#in-other-languages}

Die Datei ist schlichte GeoJSON-Geometrie pro Eintrag, also liest jedes GIS sie. In Python mit
Shapely:

```python
import json
from shapely.geometry import Point, shape

boundaries = json.load(open("data/canton-boundaries.json"))
polygons = {b["canton"]: shape(b["geometry"]) for b in boundaries}

def cantons_at(lon: float, lat: float) -> list[str]:
    point = Point(lon, lat)
    return [canton for canton, polygon in polygons.items() if polygon.covers(point)]

cantons_at(3.7268, 51.053)  # ['gent-1']
```
