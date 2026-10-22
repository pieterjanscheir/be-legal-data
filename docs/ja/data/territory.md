<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# 領域と canton {#territory-and-cantons}

ベルギーの司法の地図は三つの階層からなります。**管轄区域**（rechtsgebied / ressort。
hof van beroep / cour d'appel ごとに一つ）が **arrondissement**（司法管轄の地区）を含み、
arrondissement が **canton** を含みます（canton ごとに vredegerecht / justice de paix が一つ）。
canton は**自治体**を単位として定められています。司法の地図と並んで行政の地図もあり、すべての
自治体は**地域**（gewest / région）に属し、ブリュッセル以外では**州**にも属します。

## 役立つ場面 {#why-it-s-useful}

- **どの vredegerecht / justice de paix か。** 賃貸借の紛争、少額の請求、後見、近隣の紛争は
  vredegerecht / justice de paix が扱い、通常は被告の住所地または不動産の所在地の canton の
  裁判所が管轄します。canton を間違えると、誤った裁判所に訴えを提起することになります。
- **どの arrondissement か。** rechtbank van eerste aanleg / tribunal de première instance、
  ondernemingsrechtbank / tribunal de l'entreprise、arbeidsrechtbank / tribunal du travail、
  検察庁、そして執行官が職務を行える区域は、すべて arrondissement ごとに組織されています。
- **どの hof van beroep / cour d'appel か。** 控訴は管轄区域の hof van beroep / cour d'appel に
  申し立てます。
- **データの結合。** REFNIS コードを持つもの（Statbel の統計、地域のオープンデータ、住所の登録簿）
  なら何でも司法の地図の上に載せられます。

法律は canton を文章で記述しています（「Antwerpen 市の領域のうち、Brouwersvliet の中心線で
区切られる部分…」）。これらのファイルはそれをデータに変換しつつ、条文でしか判断できない場合に
備えて法令の条文も保持しています。

## 出典と更新 {#source-and-updates}

|            |                                                                                                                                                                                                                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 出典       | Gerechtelijk Wetboek / Code judiciaire の附属書「Gebiedsomschrijving en zetel van hoven en rechtbanken」（[ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)）のオランダ語版とフランス語版。自治体、州、地域は Statbel のオープンデータ |
| 作り方     | `pnpm build:cantons`（canton、自治体）、毎週のスナップショット + `pnpm build:data`（地域、州）、手作業（管轄区域、arrondissement）                                                                                                                                                   |
| 変わるとき | 法律が附属書を改正したとき、自治体が合併したとき（2019 年、2025 年）                                                                                                                                                                                                                 |
| 対象期間   | 2025 年 1 月 1 日以降。それより前の日付で検索すると `RangeError` を投げます（[時間](/ja/api#time)）                                                                                                                                                                                  |
| 照合       | `pnpm build:cantons` で手動で作り直しています。ejustice が GitHub のサーバーからのアクセスを拒否するためです（[データの品質](/ja/guide/data-quality)）                                                                                                                               |
| ライセンス | CC BY 4.0。自治体データ © Statbel、CC BY 4.0                                                                                                                                                                                                                                         |

## 自治体の canton を探す {#find-the-canton-for-a-municipality}

<CantonLookup />

## 管轄区域 {#judicial-areas}

hof van beroep / cour d'appel の 5 つの管轄区域（rechtsgebieden）。ファイル：`data/judicial-areas.json`。
出典：Gerechtelijk Wetboek / Code judiciaire の附属書（Ger.W. bijvoegsel）第 5 条。

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

## Arrondissement {#arrondissements}

12 の司法 arrondissement。ファイル：`data/arrondissements.json`。出典：Ger.W. bijvoegsel 第 4 条。

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>管轄区域</th></tr></thead>
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

## Canton {#cantons}

162 の司法 canton すべて。それぞれが一つの vredegerecht / justice de paix の管轄区域です。
ファイル：`data/cantons.json`（Gerechtelijk Wetboek / Code judiciaire の附属書第 1 条から生成）。

### フィールド {#fields}

| フィールド       | 型                             | 説明                                                                                                  |
| ---------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | 現地語による安定した id。複数の canton がある地名には番号付き：`gent-1`、`merelbeke-melle`、`wavre-1` |
| `arrondissement` | string                         | arrondissement の id                                                                                  |
| `name`           | `{ nl, fr }`                   | 附属書に記載された canton の名称                                                                      |
| `number`         | number?                        | 複数の canton がある地名での canton の番号（Gent 1–5）                                                |
| `seat`           | `{ nl, fr }`                   | vredegerecht / justice de paix の所在地。名称と異なることがある                                       |
| `municipalities` | `{ municipality, partial? }[]` | 管轄する自治体（REFNIS コード）。一部だけを管轄する場合は `partial: true`                             |
| `territory`      | `{ nl, fr }`                   | canton の区域。附属書の条文そのまま                                                                   |
| `legalBasis`     | `{ url, provision }`           | 法律上の定義箇所：附属書の ELI と節。例：`Bijvoegsel art. 1, afdeling 6.15`（Gent 4）                 |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }。たいていは所在地だが、そうでないこともある
    number?: number // 複数の canton がある地名用（Gent 1–5 など）
    seat: Bilingual // vredegerecht / justice de paix の所在地
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // canton の区域。附属書の条文そのまま
    legalBasis: { url: string; provision: string } // 附属書の ELI と節
}
```

- **id** は現地語に従います。フランデレンとブリュッセルではオランダ語、ワロン地域ではフランス語、
  Eupen 周辺ではドイツ語で、二言語のブリュッセルはオランダ語の名称を使います。
  [識別子](/ja/guide/identifiers)を参照してください。vredegerecht / justice de paix は自身の
  `canton` フィールドで canton にリンクします。
- **名称と所在地は異なることがあります**：canton `oudergem` の所在地は Etterbeek です。
- **`partial: true`** は、複数の canton に分かれている自治体を示します。その場合、`territory` の
  条文がどの部分（通り、番地、水路）がこの canton に属するかを示しています。
- 名称はオランダ語とフランス語のみです。附属書には統合されたドイツ語の条文がありません。

### 分割された自治体 {#split-municipalities}

55 の canton は自治体の一部だけを管轄しています。これらについては、自治体だけでは canton を決め
られず、通り（ときには番地）によって決まります。境界は `territory` の条文に記載されています。
住所の座標があれば、`belgica/canton-boundaries` の `findCantonsAt(lon, lat)` が NGI の
[canton の境界](./canton-boundaries)から canton を見つけます。座標がなければ、候補の canton と
その条文を表示して、人に判断してもらってください。ジオメトリと条文が食い違う場合は、条文が
法律です。

## 自治体 {#municipalities}

565 の自治体と、その Statbel の REFNIS（NIS）コード。ファイル：`data/municipalities.json`
（Statbel から生成）。© Statbel、CC BY 4.0。

```ts
interface Municipality {
    id: MunicipalityId // REFNIS コード：Gent は '44021'
    name: Bilingual
    province: ProvinceId | '04000' // 州の REFNIS コード。ブリュッセルでは '04000'
    region: RegionId // 地域の REFNIS コード
}
```

ブリュッセル首都圏地域の 19 の自治体には州がありません。その `province` は地域のコードである
`04000` で、これは Statbel が自身のファイルの州の列に入れている値です。これらの自治体に対して
`getProvinceForMunicipality` は `undefined` を返し、`getRegionForMunicipality` は地域を返します。
コードは以下にデータから一覧で示しています。

## 地域 {#regions}

3 つの地域（gewesten / régions）。ファイル：`data/regions.json`（Statbel の REFNIS コード一覧から
生成。名称は Statbel が公表しているとおり）。© Statbel、CC BY 4.0。

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="r in regions" :key="r.id">
<td><code>{{ r.id }}</code></td><td>{{ r.name.nl }}</td><td>{{ r.name.fr }}</td><td>{{ r.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface Region {
    id: RegionId // REFNIS コード：'02000'、'03000'、'04000'
    name: Translated // { nl, fr, de }。Statbel が公表しているとおり
    sources: SourceRef[] // Statbel の REFNIS コード一覧
}
```

## 州 {#provinces}

10 の州と、それぞれが属する地域。ファイル：`data/provinces.json`（Statbel の REFNIS コード一覧から
生成）。© Statbel、CC BY 4.0。ブリュッセル首都圏地域には州がありません。1994 年 12 月 31 日に
廃止された Brabant 州は、データの対象期間より前のものです。

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>地域</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // REFNIS コード：Oost-Vlaanderen は '40000'
    name: Translated // { nl, fr, de }。Statbel が公表しているとおり
    region: RegionId
    sources: SourceRef[] // Statbel の REFNIS コード一覧
}
```

名称は Statbel のもので、単位の種類を表す語も含みます（`Provincie Oost-Vlaanderen`、
`Province de Flandre orientale`、`Provinz Ostflandern`）。パッケージは値を情報源が公表している
とおりに保存し、短縮しません。
