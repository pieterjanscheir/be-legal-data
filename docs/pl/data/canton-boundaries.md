# Granice kantonów {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

Plik: `data/canton-boundaries.json`. Granica każdego z {{ stats.cantons }} kantonów sądowych jako
geometria GeoJSON, w postaci zdigitalizowanej przez NGI (Nationaal Geografisch Instituut /
Institut géographique national, belgijski Narodowy Instytut Geograficzny) na podstawie
załącznika do Gerechtelijk Wetboek / Code judiciaire (belgijskiego kodeksu sądowego).

## Do czego się przydaje {#why-it-s-useful}

- **Kanton adresu w podzielonym mieście.** {{ stats.splitCantons }} kantonów obejmuje tylko
  część gminy (Antwerpen, Gent, Brussel, Luik, Charleroi, …), a `getCantonsForMunicipality`
  może jedynie wymienić kandydatów. Dla zgeokodowanego adresu `findCantonsAt(lon, lat)` podaje
  jeden kanton, a więc i vredegerecht / justice de paix (sąd pokoju).
- **Mapy.** Geometria to standardowy GeoJSON w WGS 84: narysuj kantony na mapie, połącz je z
  innymi danymi przestrzennymi albo wczytaj do PostGIS, QGIS lub arkusza kalkulacyjnego z mapą.
- **Sprawdzanie tekstu prawnego.** Wielokąty NGI są drugim odczytaniem tego samego załącznika,
  obok tekstu `territory` każdego kantonu.

::: warning Tekst prawny wygrywa
Granica jest interpretacją załącznika do Gerechtelijk Wetboek / Code judiciaire dokonaną przez
NGI, zdigitalizowaną na podstawie granic gmin katastralnych, cieków wodnych i dróg. Prawem jest
sam załącznik, cytowany dosłownie w `territory` każdego kantonu. Dla punktu blisko linii granicy
przeczytaj tekst; wymienia on ulice i numery domów.
:::

## Źródło i aktualizacje {#source-and-updates}

|                  |                                                                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Źródło           | NGI, [Judicial cantons and arrondissements](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3) (Territorial Divisions) na geo.be: GeoPackage w WGS 84 (EPSG:4326), typ obiektu `judicialcanton`, zrewidowany 16 lipca 2026 |
| Licencja         | © NGI, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                                 |
| Budowane przez   | `scripts/parse/boundaries.ts` z cotygodniowego snapshotu GeoPackage                                                                                                                                                                              |
| Zmienia się, gdy | NGI publikuje nową wersję: co roku, gdy aktualizowane są granice gmin FOD Financiën / SPF Finances, albo gdy ustawa zmienia załącznik                                                                                                            |
| Zakres           | Od 21 października 2026, dnia, w którym plik został odczytany po raz pierwszy: wyszukiwania dla wcześniejszego dnia rzucają `RangeError` ([czas](/pl/api#time))                                                                                  |
| Sprawdzanie      | Co tydzień, przez [workflow sources](/pl/guide/data-quality#how-the-data-is-built): build kończy się błędem, gdy kanton nie ma granicy albo granica nie pasuje do żadnego kantonu                                                                |

Jak NGI wyznaczył granice, według jego własnego opisu: tam, gdzie załącznik odwołuje się do
granic gmin, użył granic katastralnych FOD Financiën / SPF Finances; tam, gdzie odwołuje się do
cieków wodnych lub dróg, własnych danych topograficznych NGI; tam, gdzie odwołuje się do dawnych
gmin, granic tych gmin według NGI. Skala to 1:10 000.

## Pola {#fields}

| Pole                   | Typ                    | Opis                                                                                                                                                                                   |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | Id kantonu: kanton ma jedną granicę, która przejmuje jego klucz                                                                                                                        |
| `validFrom`, `validTo` | string?                | Dni, w których rekord obowiązuje; brak: od początku zakresu albo nadal obowiązuje. Zobacz [czas](/pl/api#time)                                                                         |
| `canton`               | `CantonId`             | Kanton, do którego należy granica                                                                                                                                                      |
| `ngiId`                | string                 | Identyfikator obiektu w NGI (jego `tgid`), GUID                                                                                                                                        |
| `cantonCode`           | `{ nl, fr }`           | Kod kantonu w danych NGI: sześć cyfr (`248112` dla Gent 1), z prefiksem `N` lub `F` zależnie od języka w Regionie Stołecznym Brukseli i w Sint-Genesius-Rode (`N238104`)               |
| `geometry`             | `MultiPolygon`         | GeoJSON ([RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)): WGS 84, najpierw długość geograficzna, pierścienie zewnętrzne przeciwnie do ruchu wskazówek zegara, otwory zgodnie z nim |
| `sources`              | `{ url, retrieved }[]` | Plik NGI, z którego odczytano rekord                                                                                                                                                   |

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

Geometria pochodzi z NGI, wierzchołek po wierzchołku: nic nie jest upraszczane. Współrzędne są
zaokrąglane do 7 miejsc po przecinku, około centymetra, poniżej precyzji samego źródła. Każda
granica to jeden `MultiPolygon`, nawet gdy ma jeden wielokąt, więc każdy rekord ma tę samą
strukturę.

### Jak kantony są dopasowywane do obiektów NGI {#how-cantons-are-matched-to-the-ngi-s-features}

NGI nazywa każdy obiekt po niderlandzku i po francusku (`Eerste gerechtelijk kanton Gent`,
`Premier canton judiciaire de Gand`). Obiekt jest granicą kantonu, gdy obie nazwy, zamienione na
id w [zwykły sposób](/pl/guide/identifiers), dają ten kanton i zgadzają się co do jego numeru.
Siedem obiektów jest nazwanych w obu językach nazwą lokalną tam, gdzie załącznik używa egzonimu
(`Canton judiciaire de Halle`, gdzie załącznik mówi `Hal`; `Gerechtelijk kanton Huy`, gdzie mówi
`Hoei`); są one mapowane po kodzie kantonu w `CANTON_ALIASES` w parserze. Wszystko inne
zatrzymuje build.

## Rozmiar {#size}

Granice są zdecydowanie największym zbiorem danych: około miliona pozycji. Mają własny entry
point, `belgica/canton-boundaries`, a główny punkt pakietu ich nie reeksportuje, więc nic ich nie
ładuje, dopóki o nie nie poprosi:

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">Załadowany JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Rozmiary są mierzone na podstawie builda podczas budowania strony (najpierw <code>pnpm build</code>).</p>

Surowy plik, `data/canton-boundaries.json`, jest w pakiecie npm i w każdym wydaniu, więc Python,
PostGIS i narzędzia GIS mogą go czytać bez JavaScriptu.

## Znajdowanie kantonu dla punktu {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// Najpierw długość, potem szerokość geograficzna, w kolejności GeoJSON
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // gdzie złożyć pismo

findCantonsAt(2.3522, 48.8566) // [] : Paryż, poza Belgią
getCantonBoundary('gent-1').geometry // MultiPolygon
```

`findCantonsAt` zwraca jeden kanton dla punktu w Belgii, żadnego poza nią i oba kantony dla
punktu leżącego dokładnie na linii między dwoma. Nie wymaga żadnej zależności: to prosty test
punktu w wielokącie na granicach, około milisekundy na wyszukiwanie. Geokodowanie adresu (ulica i
numer na współrzędne) należy do ciebie: robią to regionalne rejestry adresów (flamandzki
Adressenregister, brukselski UrbIS, waloński ICAR) i federalne dane adresowe BeSt na geo.be.

## W innych językach {#in-other-languages}

Plik to zwykła geometria GeoJSON dla każdego rekordu, więc odczyta go każdy GIS. W Pythonie z
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
