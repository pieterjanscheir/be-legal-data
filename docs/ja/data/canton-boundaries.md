# canton の境界 {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

ファイル：`data/canton-boundaries.json`。{{ stats.cantons }} の司法 canton それぞれの境界を、
National Geographic Institute（NGI）が Gerechtelijk Wetboek / Code judiciaire の附属書から
デジタル化したとおりに、GeoJSON のジオメトリとして収録しています。

## 役立つ場面 {#why-it-s-useful}

- **分割された都市にある住所の canton。** {{ stats.splitCantons }} の canton は自治体の一部
  だけを管轄しており（Antwerpen、Gent、Brussel、Luik、Charleroi など）、
  `getCantonsForMunicipality` では候補を列挙することしかできません。住所をジオコーディング
  すれば、`findCantonsAt(lon, lat)` が canton を一つに絞り、したがって vredegerecht / justice de
  paix も一つに決まります。
- **地図。** ジオメトリは WGS 84 の標準的な GeoJSON です。地図上に canton を描画したり、他の地理
  データと結合したり、PostGIS、QGIS、地図機能のあるスプレッドシートに読み込んだりできます。
- **法令の条文の確認。** NGI のポリゴンは、各 canton の `territory` の条文と並ぶ、同じ附属書の
  もう一つの解釈です。

::: warning 法令の条文が優先します
境界は、NGI が Gerechtelijk Wetboek / Code judiciaire の附属書を解釈し、地籍上の自治体境界、
水路、道路に基づいてデジタル化したものです。各 canton の `territory` にそのまま引用されている
附属書自体が法律です。境界線の近くの地点については条文を読んでください。条文には通りの名前と
番地が記されています。
:::

## 出典と更新 {#source-and-updates}

|            |                                                                                                                                                                                                                                                        |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 出典       | geo.be にある NGI の [Judicial cantons and arrondissements](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3)（Territorial Divisions）：WGS 84（EPSG:4326）の GeoPackage、feature type `judicialcanton`、2026 年 7 月 16 日改訂 |
| ライセンス | © NGI、[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                                       |
| 作り方     | GeoPackage の週次スナップショットから `scripts/parse/boundaries.ts` で生成                                                                                                                                                                             |
| 変わるとき | NGI が新しい版を公表したとき：毎年、FOD Financiën / SPF Finances の自治体境界が更新されたとき、または法律が附属書を改正したとき                                                                                                                        |
| 対象期間   | ファイルを最初に読み込んだ日である 2026 年 10 月 21 日以降。それより前の日付で検索すると `RangeError` を投げます（[時間](/ja/api#time)）                                                                                                               |
| 照合       | 毎週、[sources ワークフロー](/ja/guide/data-quality#how-the-data-is-built)が実行。境界のない canton や、どの canton にも対応しない境界があるとビルドが失敗します                                                                                       |

NGI 自身の説明によれば、境界は次のように引かれています。附属書が自治体の境界に言及している箇所では
FOD Financiën / SPF Finances の地籍上の境界を、水路や道路に言及している箇所では NGI 自身の地形
データを、旧自治体に言及している箇所では NGI による旧自治体の境界を使っています。縮尺は 1:10 000
です。

## フィールド {#fields}

| フィールド             | 型                     | 説明                                                                                                                                                                |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | canton の id。canton には境界が一つだけあり、そのキーを使う                                                                                                         |
| `validFrom`, `validTo` | string?                | レコードが適用される日。なければ、対象期間の開始時から、またはまだ適用中。[時間](/ja/api#time)を参照                                                                |
| `canton`               | `CantonId`             | 境界が属する canton                                                                                                                                                 |
| `ngiId`                | string                 | NGI によるオブジェクトの識別子（その `tgid`）。GUID                                                                                                                 |
| `cantonCode`           | `{ nl, fr }`           | NGI のデータでの canton コード：6 桁の数字（Gent 1 は `248112`）。ブリュッセル首都圏と Sint-Genesius-Rode では言語ごとに `N` または `F` の接頭辞が付く（`N238104`） |
| `geometry`             | `MultiPolygon`         | GeoJSON（[RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)）：WGS 84、経度が先、外側のリングは反時計回り、穴は時計回り                                             |
| `sources`              | `{ url, retrieved }[]` | レコードを読み込んだ NGI のファイル                                                                                                                                 |

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

ジオメトリは頂点単位で NGI のものそのままで、何も簡略化していません。座標は小数点以下 7 桁
（約 1 センチメートル）に丸めており、これは情報源自体の精度より細かい値です。境界はポリゴンが
一つしかない場合でもすべて一つの `MultiPolygon` なので、すべてのレコードが同じ形をしています。

### canton と NGI の feature の対応づけ {#how-cantons-are-matched-to-the-ngi-s-features}

NGI は各 feature にオランダ語とフランス語の名称を付けています（`Eerste gerechtelijk kanton Gent`、
`Premier canton judiciaire de Gand`）。両方の名称を[通常の方法](/ja/guide/identifiers)で id に
変換したときに同じ canton になり、番号も一致すれば、その feature はその canton の境界です。
附属書が外名を使っている箇所で、両言語とも現地語の名称で呼ばれている feature が七つあります
（附属書では `Hal` だが `Canton judiciaire de Halle`、附属書では `Hoei` だが
`Gerechtelijk kanton Huy`）。これらはパーサーの `CANTON_ALIASES` で canton コードによって対応
づけています。それ以外のものがあればビルドを止めます。

## サイズ {#size}

境界は群を抜いて最大のデータセットで、約 100 万の座標点があります。専用の entry point
`belgica/canton-boundaries` があり、パッケージのルートからは再 export されないので、明示的に
求めない限り読み込まれることはありません。

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">読み込まれる JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">サイズはサイトのビルド時にビルド成果物から計測されます（先に <code>pnpm build</code> を実行してください）。</p>

生のファイル `data/canton-boundaries.json` は npm パッケージとすべての release に含まれている
ので、Python、PostGIS、GIS ツールから JavaScript なしで読み込めます。

## 地点の canton を見つける {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// GeoJSON の順序どおり、経度が先、次に緯度
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // 書類の提出先

findCantonsAt(2.3522, 48.8566) // [] : パリ、ベルギー国外
getCantonBoundary('gent-1').geometry // MultiPolygon
```

`findCantonsAt` は、ベルギー国内の地点には canton を一つ、国外の地点には何も返さず、二つの
canton の境界線ちょうどの地点には両方の canton を返します。依存関係は不要で、境界に対する単純な
point-in-polygon 判定であり、1 回の検索は約 1 ミリ秒です。住所のジオコーディング（通りと番地から
座標への変換）は利用者側で行ってください。各地域の住所登録簿（フランデレンの Adressenregister、
ブリュッセルの UrbIS、ワロン地域の ICAR）や、geo.be にある連邦の BeSt 住所データが使えます。

## 他の言語では {#in-other-languages}

ファイルはレコードごとの素の GeoJSON ジオメトリなので、どの GIS でも読めます。Python で Shapely を
使う場合：

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
