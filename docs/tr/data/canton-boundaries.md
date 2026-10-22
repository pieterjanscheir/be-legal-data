# Kanton sınırları {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

Dosya: `data/canton-boundaries.json`. {{ stats.cantons }} adli kantonun her birinin sınırı,
Ulusal Coğrafya Enstitüsü'nün (NGI) Gerechtelijk Wetboek / Code judiciaire'in ekinden
sayısallaştırdığı haliyle GeoJSON geometrisi olarak.

## Neden işe yarar {#why-it-s-useful}

- **Bölünmüş bir şehirdeki bir adresin kantonu.** {{ stats.splitCantons }} kanton bir
  belediyenin yalnızca bir kısmını kapsar (Antwerpen, Gent, Brussel, Luik, Charleroi, …) ve
  `getCantonsForMunicipality` yalnızca adayları listeleyebilir. Adres coğrafi olarak
  kodlandığında `findCantonsAt(lon, lat)` tek kantonu ve dolayısıyla vredegerecht / justice de
  paix'yi (sulh mahkemesi benzeri, kanton düzeyindeki mahkeme) verir.
- **Haritalar.** Geometri WGS 84'te standart GeoJSON'dur: kantonları bir haritaya çizin, başka
  coğrafi verilerle birleştirin ya da PostGIS'e, QGIS'e veya harita destekli bir elektronik
  tabloya yükleyin.
- **Kanun metnini kontrol etmek.** NGI'nin poligonları, her kantonun `territory` metninin
  yanında, aynı ekin ikinci bir okumasıdır.

::: warning Kanun metni üstündür
Sınır, NGI'nin Gerechtelijk Wetboek ekine ilişkin yorumudur; kadastral belediye sınırları, su
yolları ve yollar üzerinde sayısallaştırılmıştır. Her kantonun `territory` alanında kelimesi
kelimesine aktarılan ekin kendisi kanundur. Bir sınır çizgisine yakın bir nokta için metni
okuyun; metin sokakları ve kapı numaralarını adlandırır.
:::

## Kaynak ve güncellemeler {#source-and-updates}

|                  |                                                                                                                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kaynak           | NGI, geo.be üzerinde [Judicial cantons and arrondissements](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3) (Territorial Divisions): WGS 84'te (EPSG:4326) GeoPackage, nesne türü `judicialcanton`, 16 Temmuz 2026'da revize edilmiş |
| Lisans           | © NGI, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                                              |
| Oluşturan        | GeoPackage'ın haftalık anlık görüntüsünden `scripts/parse/boundaries.ts`                                                                                                                                                                                      |
| Ne zaman değişir | NGI yeni bir sürüm yayımladığında: her yıl, FOD Financiën / SPF Finances'ın belediye sınırları güncellendiğinde ya da bir kanun eki değiştirdiğinde                                                                                                           |
| Kapsam           | 21 Ekim 2026 ve sonrası, dosyanın ilk okunduğu gün: daha önceki bir gün için yapılan sorgular `RangeError` fırlatır ([zaman](/tr/api#time))                                                                                                                   |
| Kontrol          | Her hafta, [sources workflow'u](/tr/guide/data-quality#how-the-data-is-built) tarafından: bir kantonun sınırı yoksa ya da bir sınır hiçbir kantonla eşleşmiyorsa derleme başarısız olur                                                                       |

NGI'nin sınırları nasıl çizdiği, kendi anlatımıyla: ekin belediye sınırlarına atıf yaptığı
yerlerde FOD Financiën / SPF Finances'ın kadastral sınırlarını; su yollarına veya yollara atıf
yaptığı yerlerde NGI'nin kendi topografik verilerini; eski belediyelere atıf yaptığı yerlerde
NGI'nin bu belediyelere ait sınırlarını kullanmıştır. Ölçek 1:10 000'dir.

## Alanlar {#fields}

| Alan                   | Tür                    | Açıklama                                                                                                                                                 |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | Kantonun id'si: bir kantonun tek bir sınırı vardır ve sınır onun anahtarını alır                                                                         |
| `validFrom`, `validTo` | string?                | Kaydın geçerli olduğu günler; yoksa: kapsamın başladığı günden beri, ya da hâlâ geçerli. Bkz. [zaman](/tr/api#time)                                      |
| `canton`               | `CantonId`             | Sınırın ait olduğu kanton                                                                                                                                |
| `ngiId`                | string                 | NGI'nin nesne tanımlayıcısı (`tgid`), bir GUID                                                                                                           |
| `cantonCode`           | `{ nl, fr }`           | NGI verilerindeki kanton kodu: altı hane (Gent 1 için `248112`); Brüksel-Başkent'te ve Sint-Genesius-Rode'de dile göre `N` veya `F` önekiyle (`N238104`) |
| `geometry`             | `MultiPolygon`         | GeoJSON ([RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)): WGS 84, önce boylam, dış halkalar saat yönünün tersine, delikler saat yönünde              |
| `sources`              | `{ url, retrieved }[]` | Kaydın okunduğu NGI dosyası                                                                                                                              |

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

Geometri, köşe köşe NGI'ye aittir: hiçbir şey sadeleştirilmez. Koordinatlar 7 ondalık basamağa,
yaklaşık bir santimetreye, yani kaynağın kendi hassasiyetinin altına yuvarlanır. Her sınır, tek
bir poligondan oluşsa bile bir `MultiPolygon`'dur; böylece her kaydın yapısı aynıdır.

### Kantonlar NGI nesneleriyle nasıl eşleştirilir {#how-cantons-are-matched-to-the-ngi-s-features}

NGI her nesneyi Felemenkçe ve Fransızca adlandırır (`Eerste gerechtelijk kanton Gent`,
`Premier canton judiciaire de Gand`). Bir nesne, iki ad da [olağan yöntemle](/tr/guide/identifiers)
id'ye dönüştürüldüğünde o kantonu verirse ve numarasında uyuşursa o kantonun sınırıdır. Ekin bir
egzonim kullandığı yedi nesne iki dilde de yerel adıyla anılır (ekin `Hal` dediği yerde
`Canton judiciaire de Halle`; `Hoei` dediği yerde `Gerechtelijk kanton Huy`); bunlar
ayrıştırıcıdaki `CANTON_ALIASES` içinde kanton kodlarıyla eşlenir. Bunların dışındaki her şey
derlemeyi durdurur.

## Boyut {#size}

Sınırlar açık ara en büyük veri kümesidir: yaklaşık bir milyon konum. Kendi entry point'leri
olan `belgica/canton-boundaries` vardır ve paketin kökü onları yeniden dışa aktarmaz; böylece
istemeyen hiçbir şey onları yüklemez:

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">Yüklenen JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Boyutlar, site derlenirken derleme çıktısından ölçülür (önce <code>pnpm build</code>).</p>

Ham dosya `data/canton-boundaries.json` npm paketinde ve her sürümde yer alır; böylece Python,
PostGIS ve GIS araçları onu JavaScript olmadan okuyabilir.

## Bir noktanın kantonunu bulmak {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// Önce boylam, sonra enlem, GeoJSON'un sıraladığı gibi
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // evrakın sunulacağı yer

findCantonsAt(2.3522, 48.8566) // [] : Paris, Belçika dışında
getCantonBoundary('gent-1').geometry // MultiPolygon
```

`findCantonsAt`, Belçika içindeki bir nokta için tek bir kanton, dışındaki bir nokta için hiç
kanton, iki kanton arasındaki çizginin tam üzerindeki bir nokta için ise her iki kantonu
döndürür. Hiçbir bağımlılığa ihtiyaç duymaz: sınırlar üzerinde basit bir point-in-polygon testi,
sorgu başına yaklaşık bir milisaniye. Adresin coğrafi kodlanması (sokak ve numaradan
koordinatlara) size kalmıştır: bölgelerin adres sicilleri (Flaman Bölgesi'nin Adressenregister'ı,
Brüksel'in UrbIS'i, Valon Bölgesi'nin ICAR'ı) ve geo.be üzerindeki federal BeSt adres verileri
bunu yapar.

## Diğer dillerde {#in-other-languages}

Dosya, kayıt başına düz GeoJSON geometrisidir; dolayısıyla her GIS onu okur. Python'da Shapely
ile:

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
