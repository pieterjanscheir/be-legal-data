# Canton 边界 {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

文件：`data/canton-boundaries.json`。全部 {{ stats.cantons }} 个司法 canton（比利时最小的司法辖区单位，
每个设一个治安法院）的边界，以 GeoJSON 几何形式提供，由 NGI（Nationaal Geografisch Instituut /
Institut géographique national，比利时国家地理研究所）根据 Gerechtelijk Wetboek / Code judiciaire
（司法法典）的附件数字化而成。

## 用途 {#why-it-s-useful}

- **在被分割的城市中确定某个地址所属的 canton。** 有 {{ stats.splitCantons }} 个 canton 只覆盖某个市镇的
  一部分（Antwerpen、Gent、Brussel、Luik、Charleroi……），`getCantonsForMunicipality` 只能列出候选项。
  将地址地理编码后，`findCantonsAt(lon, lat)` 就能给出唯一的 canton，从而确定对应的
  vredegerecht / justice de paix（治安法院）。
- **地图。** 几何数据是 WGS 84 坐标系下的标准 GeoJSON：可以在地图上绘制 canton、与其他地理数据关联，
  或载入 PostGIS、QGIS 或带地图功能的电子表格。
- **核对法律文本。** NGI 的多边形是对同一附件的另一种解读，可与每个 canton 的 `territory` 文本对照。

::: warning 以法律文本为准
边界是 NGI 对 Gerechtelijk Wetboek / Code judiciaire 附件的解读，依据地籍市镇边界、水道和道路数字化而成。
附件本身（逐字引用于每个 canton 的 `territory` 中）才是法律。对于靠近边界线的点，请阅读该文本：
它会列出街道名称和门牌号。
:::

## 来源与更新 {#source-and-updates}

|          |                                                                                                                                                                                                                                                         |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 来源     | NGI 在 geo.be 上发布的 [Judicial cantons and arrondissements](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3)（Territorial Divisions）：WGS 84（EPSG:4326）的 GeoPackage，要素类型 `judicialcanton`，修订于 2026 年 7 月 16 日 |
| 许可     | © NGI，[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                                        |
| 生成方式 | 由 `scripts/parse/boundaries.ts` 根据 GeoPackage 的每周快照生成                                                                                                                                                                                         |
| 何时变化 | NGI 发布新版本时：每年 FOD Financiën / SPF Finances（联邦财政部）更新市镇边界时，或法律修改附件时                                                                                                                                                       |
| 覆盖范围 | 自 2026 年 10 月 21 日（首次读取该文件之日）起：查询更早的日期会抛出 `RangeError`（[时间](/zh/api#time)）                                                                                                                                               |
| 检查     | 每周一次，由 [sources workflow](/zh/guide/data-quality#how-the-data-is-built) 执行：若某个 canton 没有边界，或某条边界不对应任何 canton，构建即失败                                                                                                     |

NGI 自述的边界绘制方法：附件提到市镇边界时，采用 FOD Financiën / SPF Finances 的地籍边界；
提到水道或道路时，采用 NGI 自己的地形数据；提到原市镇时，采用 NGI 绘制的原市镇边界。比例尺为 1:10 000。

## 字段 {#fields}

| 字段                   | 类型                   | 说明                                                                                                                                    |
| ---------------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | canton 的 id：每个 canton 只有一条边界，边界沿用其键                                                                                    |
| `validFrom`, `validTo` | string?                | 记录适用的日期；缺省表示自数据覆盖开始起即适用，或至今仍适用。参见[时间](/zh/api#time)                                                  |
| `canton`               | `CantonId`             | 该边界所属的 canton                                                                                                                     |
| `ngiId`                | string                 | NGI 对该对象的标识符（其 `tgid`），一个 GUID                                                                                            |
| `cantonCode`           | `{ nl, fr }`           | NGI 数据中的 canton 代码：六位数字（Gent 1 为 `248112`），在布鲁塞尔首都大区和 Sint-Genesius-Rode 按语言加 `N` 或 `F` 前缀（`N238104`） |
| `geometry`             | `MultiPolygon`         | GeoJSON（[RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)）：WGS 84，经度在前，外环逆时针，内洞顺时针                                 |
| `sources`              | `{ url, retrieved }[]` | 读取该记录的 NGI 文件                                                                                                                   |

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

几何数据完全沿用 NGI 的原始顶点，未做任何简化。坐标四舍五入到小数点后 7 位，约一厘米，低于数据源本身的精度。
每条边界都是一个 `MultiPolygon`，即使只有一个多边形也是如此，因此所有记录的结构都相同。

### Canton 如何与 NGI 的要素匹配 {#how-cantons-are-matched-to-the-ngi-s-features}

NGI 用荷兰语和法语为每个要素命名（`Eerste gerechtelijk kanton Gent`、`Premier canton judiciaire de Gand`）。
如果两个名称按[常规方式](/zh/guide/identifiers)转换成 id 后都指向同一个 canton，且编号一致，
该要素就是这个 canton 的边界。有七个要素在附件使用外语地名的地方，两种语言都采用了当地名称
（附件写作 `Hal`，要素为 `Canton judiciaire de Halle`；附件写作 `Hoei`，要素为 `Gerechtelijk kanton Huy`）；
这些要素通过解析器中 `CANTON_ALIASES` 里的 canton 代码进行映射。其他任何不匹配都会使构建中止。

## 大小 {#size}

边界是迄今为止最大的数据集：约一百万个坐标点。它们有自己的 entry point `belgica/canton-boundaries`，
包的根入口不会重新导出它们，因此除非显式请求，否则不会加载：

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">加载的 JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">大小在构建站点时从构建产物中测得（请先运行 <code>pnpm build</code>）。</p>

原始文件 `data/canton-boundaries.json` 包含在 npm 包和每个 release 中，因此 Python、PostGIS 和 GIS
工具无需 JavaScript 即可读取。

## 查找某个点所在的 canton {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// 先经度，后纬度，与 GeoJSON 的顺序一致
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // 向哪里提交

findCantonsAt(2.3522, 48.8566) // [] : 巴黎，在比利时境外
getCantonBoundary('gent-1').geometry // MultiPolygon
```

对于比利时境内的点，`findCantonsAt` 返回一个 canton；境外的点返回空；恰好位于两个 canton 分界线上的点
则返回两个。它不需要任何依赖：只是对边界做一次普通的 point-in-polygon 测试，每次查询约一毫秒。
地址的地理编码（把街道和门牌号转换为坐标）需要你自己完成：各大区的地址登记册（弗拉芒大区的
Adressenregister、布鲁塞尔的 UrbIS、瓦隆大区的 ICAR）以及 geo.be 上的联邦 BeSt 地址数据都能做到。

## 在其他语言中使用 {#in-other-languages}

该文件的每条记录都是普通的 GeoJSON 几何，任何 GIS 都能读取。在 Python 中使用 Shapely：

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
