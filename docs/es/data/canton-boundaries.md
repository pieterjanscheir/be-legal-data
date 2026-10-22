# Límites de los cantones {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

Archivo: `data/canton-boundaries.json`. El límite de cada uno de los {{ stats.cantons }} cantones
judiciales como geometría GeoJSON, tal como lo digitalizó el NGI (Institut géographique national
/ Nationaal Geografisch Instituut, el instituto geográfico nacional de Bélgica) a partir del anexo
del Code judiciaire (Gerechtelijk Wetboek).

## Para qué sirve {#why-it-s-useful}

- **El cantón de una dirección en una ciudad dividida.** {{ stats.splitCantons }} cantones
  cubren solo parte de un municipio (Antwerpen, Gent, Brussel, Luik, Charleroi, …), y
  `getCantonsForMunicipality` solo puede enumerar los candidatos. Con la dirección geocodificada,
  `findCantonsAt(lon, lat)` da el único cantón, y por tanto la justice de paix (vredegerecht).
- **Mapas.** La geometría es GeoJSON estándar en WGS 84: dibuja los cantones en un mapa, crúzalos
  con otros datos geográficos o cárgalos en PostGIS, QGIS o una hoja de cálculo con mapa.
- **Contrastar el texto legal.** Los polígonos del NGI son una segunda lectura del mismo anexo,
  junto al texto `territory` de cada cantón.

::: warning Prevalece el texto legal
El límite es la interpretación que hace el NGI del anexo del Code judiciaire, digitalizada sobre
los límites catastrales de los municipios, los cursos de agua y las carreteras. El propio anexo,
citado literalmente en el `territory` de cada cantón, es la ley. Para un punto cercano a una línea
de límite, lee el texto; nombra las calles y los números de las casas.
:::

## Fuente y actualizaciones {#source-and-updates}

|               |                                                                                                                                                                                                                                                             |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fuente        | NGI, [Judicial cantons and arrondissements](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3) (Territorial Divisions) en geo.be: el GeoPackage en WGS 84 (EPSG:4326), feature type `judicialcanton`, revisado el 16 de julio de 2026 |
| Licencia      | © NGI, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                                            |
| Generado por  | `scripts/parse/boundaries.ts`, a partir de la captura semanal del GeoPackage                                                                                                                                                                                |
| Cambia cuando | El NGI publica una nueva versión: cada año, cuando se actualizan los límites municipales del SPF Finances / FOD Financiën, o cuando una ley modifica el anexo                                                                                               |
| Cubre         | Desde el 21 de octubre de 2026, el día en que se leyó el archivo por primera vez: las búsquedas para un día anterior lanzan un `RangeError` ([tiempo](/es/api#time))                                                                                        |
| Comprobado    | Cada semana, mediante el [workflow de fuentes](/es/guide/data-quality#how-the-data-is-built): la build falla cuando un cantón no tiene límite o un límite no corresponde a ningún cantón                                                                    |

Cómo trazó el NGI los límites, según sus propias palabras: donde el anexo se refiere a límites
municipales, usó los límites catastrales del SPF Finances; donde se refiere a cursos de agua o
carreteras, los datos topográficos propios del NGI; donde se refiere a antiguos municipios, los
límites de estos según el NGI. La escala es 1:10 000.

## Campos {#fields}

| Campo                  | Tipo                   | Descripción                                                                                                                                                                 |
| ---------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | El id del cantón: un cantón tiene un solo límite, que toma su clave                                                                                                         |
| `validFrom`, `validTo` | string?                | Los días en que se aplica el registro; ausentes: desde el inicio de la cobertura, o sigue vigente. Ver [tiempo](/es/api#time)                                               |
| `canton`               | `CantonId`             | El cantón al que pertenece el límite                                                                                                                                        |
| `ngiId`                | string                 | El identificador del objeto en el NGI (su `tgid`), un GUID                                                                                                                  |
| `cantonCode`           | `{ nl, fr }`           | El código del cantón en los datos del NGI: seis dígitos (`248112` para Gent 1), con un prefijo `N` o `F` por lengua en Bruselas-Capital y en Sint-Genesius-Rode (`N238104`) |
| `geometry`             | `MultiPolygon`         | GeoJSON ([RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)): WGS 84, longitud primero, anillos exteriores en sentido antihorario, huecos en sentido horario                |
| `sources`              | `{ url, retrieved }[]` | El archivo del NGI del que se leyó el registro                                                                                                                              |

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

La geometría es la del NGI, vértice por vértice: no se simplifica nada. Las coordenadas se
redondean a 7 decimales, aproximadamente un centímetro, por debajo de la propia precisión de la
fuente. Cada límite es un `MultiPolygon`, aunque tenga un solo polígono, para que todos los
registros tengan la misma estructura.

### Cómo se emparejan los cantones con los features del NGI {#how-cantons-are-matched-to-the-ngi-s-features}

El NGI nombra cada feature en neerlandés y en francés (`Eerste gerechtelijk kanton Gent`,
`Premier canton judiciaire de Gand`). Un feature es el límite de un cantón cuando ambos nombres,
convertidos en id de la [forma habitual](/es/guide/identifiers), dan ese cantón y coinciden en su
número. Siete features se nombran con su nombre local en ambas lenguas donde el anexo usa un
exónimo (`Canton judiciaire de Halle`, donde el anexo dice `Hal`; `Gerechtelijk kanton Huy`, donde
dice `Hoei`); esos se asignan por su código de cantón en `CANTON_ALIASES` en el parser. Cualquier
otra cosa detiene la build.

## Tamaño {#size}

Los límites son con diferencia el conjunto de datos más grande: alrededor de un millón de
posiciones. Tienen su propio entry point, `belgica/canton-boundaries`, y la raíz del paquete no
los reexporta, así que nada los carga a menos que los pida:

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">JavaScript cargado</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Los tamaños se miden a partir de la build cuando se construye el sitio (primero <code>pnpm build</code>).</p>

El archivo sin procesar, `data/canton-boundaries.json`, está en el paquete npm y en cada release,
así que Python, PostGIS y las herramientas SIG pueden leerlo sin el JavaScript.

## Encontrar el cantón de un punto {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// Primero la longitud, luego la latitud, en el orden de GeoJSON
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // dónde presentar

findCantonsAt(2.3522, 48.8566) // [] : París, fuera de Bélgica
getCantonBoundary('gent-1').geometry // el MultiPolygon
```

`findCantonsAt` devuelve un cantón para un punto en Bélgica, ninguno fuera, y los dos cantones
para un punto situado exactamente en la línea entre ambos. No necesita dependencias: un simple
test de punto en polígono sobre los límites, alrededor de un milisegundo por búsqueda. Geocodificar
la dirección (de calle y número a coordenadas) corre de tu cuenta: los registros de direcciones de
las regiones (el Adressenregister de Flandes, UrbIS de Bruselas, ICAR de Valonia) y los datos de
direcciones federales BeSt en geo.be lo hacen.

## En otros lenguajes {#in-other-languages}

El archivo es geometría GeoJSON simple por registro, así que cualquier SIG lo lee. En Python con
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
