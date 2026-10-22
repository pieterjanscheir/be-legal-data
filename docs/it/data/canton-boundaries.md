# Confini dei cantoni {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

File: `data/canton-boundaries.json`. Il confine di ciascuno dei {{ stats.cantons }} cantoni
giudiziari come geometria GeoJSON, così come l'Istituto geografico nazionale (NGI) lo ha
digitalizzato dall'allegato al Gerechtelijk Wetboek / Code judiciaire (il codice giudiziario
belga).

## Perché è utile {#why-it-s-useful}

- **Il cantone di un indirizzo in una città suddivisa.** {{ stats.splitCantons }} cantoni coprono
  solo una parte di un comune (Antwerpen, Gent, Brussel, Luik, Charleroi, …), e
  `getCantonsForMunicipality` può solo elencare i candidati. Con l'indirizzo geocodificato,
  `findCantonsAt(lon, lat)` restituisce l'unico cantone, e quindi il vredegerecht / justice de
  paix (giudice di pace).
- **Mappe.** La geometria è GeoJSON standard in WGS 84: disegna i cantoni su una mappa,
  collegali ad altri dati geografici, o caricali in PostGIS, QGIS o in un foglio di calcolo con
  una mappa.
- **Verificare il testo di legge.** I poligoni dell'NGI sono una seconda lettura dello stesso
  allegato, accanto al testo `territory` di ogni cantone.

::: warning Prevale il testo di legge
Il confine è l'interpretazione che l'NGI dà dell'allegato al Gerechtelijk Wetboek, digitalizzata
sui confini comunali catastali, sui corsi d'acqua e sulle strade. La legge è l'allegato stesso,
citato alla lettera nel `territory` di ogni cantone. Per un punto vicino a una linea di confine,
leggi il testo: nomina le vie e i numeri civici.
:::

## Fonte e aggiornamenti {#source-and-updates}

|               |                                                                                                                                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fonte         | NGI, [Cantons et arrondissements judiciaires](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3) (Divisioni territoriali) su geo.be: il GeoPackage in WGS 84 (EPSG:4326), feature type `judicialcanton`, revisionato il 16 luglio 2026 |
| Licenza       | © NGI, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                                             |
| Costruito da  | `scripts/parse/boundaries.ts` a partire dallo snapshot settimanale del GeoPackage                                                                                                                                                                            |
| Cambia quando | L'NGI pubblica una nuova versione: ogni anno, quando vengono aggiornati i confini comunali della FOD Financiën / SPF Finances, o quando una legge modifica l'allegato                                                                                        |
| Copre         | Dal 21 ottobre 2026, il giorno in cui il file è stato letto per la prima volta: le ricerche per un giorno precedente lanciano un `RangeError` ([tempo](/it/api#time))                                                                                        |
| Verificato    | Ogni settimana, dal [workflow sources](/it/guide/data-quality#how-the-data-is-built): la build fallisce quando un cantone non ha confine o un confine non corrisponde a nessun cantone                                                                       |

Come l'NGI ha tracciato i confini, con parole sue: dove l'allegato rimanda ai confini comunali,
ha usato i confini catastali della FOD Financiën / SPF Finances; dove rimanda a corsi d'acqua o
strade, i dati topografici dell'NGI stesso; dove rimanda a ex comuni, i confini di questi
tracciati dall'NGI. La scala è 1:10 000.

## Campi {#fields}

| Campo                  | Tipo                   | Descrizione                                                                                                                                                            |
| ---------------------- | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | L'id del cantone: un cantone ha un solo confine, che ne prende la chiave                                                                                               |
| `validFrom`, `validTo` | string?                | I giorni in cui il record si applica; assente: dall'inizio della copertura, oppure ancora valido. Vedi [tempo](/it/api#time)                                           |
| `canton`               | `CantonId`             | Il cantone a cui appartiene il confine                                                                                                                                 |
| `ngiId`                | string                 | L'identificatore dell'oggetto presso l'NGI (il suo `tgid`), un GUID                                                                                                    |
| `cantonCode`           | `{ nl, fr }`           | Il codice del cantone nei dati dell'NGI: sei cifre (`248112` per Gent 1), con un prefisso `N` o `F` per lingua a Bruxelles-Capitale e a Sint-Genesius-Rode (`N238104`) |
| `geometry`             | `MultiPolygon`         | GeoJSON ([RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)): WGS 84, longitudine per prima, anelli esterni in senso antiorario, buchi in senso orario                 |
| `sources`              | `{ url, retrieved }[]` | Il file dell'NGI da cui è stato letto il record                                                                                                                        |

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

La geometria è quella dell'NGI, vertice per vertice: nulla è semplificato. Le coordinate sono
arrotondate a 7 decimali, circa un centimetro, al di sotto della precisione della fonte stessa.
Ogni confine è un `MultiPolygon`, anche quando ha un solo poligono, così ogni record ha la stessa
struttura.

### Come i cantoni vengono abbinati alle feature dell'NGI {#how-cantons-are-matched-to-the-ngi-s-features}

L'NGI nomina ogni feature in neerlandese e in francese (`Eerste gerechtelijk kanton Gent`,
`Premier canton judiciaire de Gand`). Una feature è il confine di un cantone quando entrambi i
nomi, trasformati in un id nel [modo consueto](/it/guide/identifiers), danno quel cantone e
concordano sul suo numero. Sette feature sono nominate con il loro nome locale in entrambe le
lingue dove l'allegato usa un esonimo (`Canton judiciaire de Halle`, dove l'allegato dice `Hal`;
`Gerechtelijk kanton Huy`, dove dice `Hoei`); queste vengono abbinate tramite il loro codice di
cantone in `CANTON_ALIASES` nel parser. Qualsiasi altro caso blocca la build.

## Dimensioni {#size}

I confini sono di gran lunga il dataset più grande: circa un milione di posizioni. Hanno il
proprio entry point, `belgica/canton-boundaries`, e la root del package non li riesporta, così
nulla li carica a meno che non lo chieda:

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">JavaScript caricato</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Le dimensioni vengono misurate sulla build quando si costruisce il sito (prima <code>pnpm build</code>).</p>

Il file grezzo, `data/canton-boundaries.json`, è nel package npm e in ogni release, così Python,
PostGIS e gli strumenti GIS possono leggerlo senza JavaScript.

## Trovare il cantone di un punto {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// Prima la longitudine, poi la latitudine, nell'ordine di GeoJSON
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // dove depositare

findCantonsAt(2.3522, 48.8566) // [] : Parigi, fuori dal Belgio
getCantonBoundary('gent-1').geometry // il MultiPolygon
```

`findCantonsAt` restituisce un cantone per un punto in Belgio, nessuno al di fuori, ed entrambi i
cantoni per un punto esattamente sulla linea tra due. Non richiede dipendenze: un semplice test
point-in-polygon sui confini, circa un millisecondo per ricerca. La geocodifica dell'indirizzo
(da via e numero civico a coordinate) spetta a te: se ne occupano i registri degli indirizzi delle
regioni (l'Adressenregister delle Fiandre, UrbIS a Bruxelles, ICAR in Vallonia) e i dati federali
sugli indirizzi BeSt su geo.be.

## In altri linguaggi {#in-other-languages}

Il file contiene semplice geometria GeoJSON per record, quindi qualsiasi GIS lo legge. In Python
con Shapely:

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
