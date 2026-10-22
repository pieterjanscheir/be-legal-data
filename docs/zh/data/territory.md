<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# 地域与 canton {#territory-and-cantons}

比利时的司法地图分为三层：**司法辖区**（每个上诉法院一个）包含若干 **arrondissement**（司法 arrondissement，由初审法院管辖的司法辖区），
arrondissement 又包含若干 **canton**（比利时最小的司法辖区单位，每个设一个 vredegerecht / justice de paix（治安法院））。
canton 以**市镇**为单位来界定。司法地图之外还有行政地图：每个市镇都位于一个**大区**，并且（布鲁塞尔以外）位于一个**省**。

## 有什么用 {#why-it-s-useful}

- **哪个治安法院？** 租赁纠纷、小额诉讼、监护和相邻关系纠纷由治安法院审理，通常是被告住所地或财产所在地所属 canton 的治安法院。
  canton 弄错，就意味着向错误的法院提起了诉讼。
- **哪个 arrondissement？** rechtbank van eerste aanleg / tribunal de première instance（初审法院）、
  ondernemingsrechtbank / tribunal de l'entreprise（企业法院）和 arbeidsrechtbank / tribunal du travail（劳动法院）、检察机关，
  以及执达员可以执行职务的地域，都按 arrondissement 组织。
- **哪个上诉法院？** 上诉由该司法辖区的 hof van beroep / cour d'appel（上诉法院）审理。
- **关联数据。** 任何带有 REFNIS 代码的数据（Statbel 统计数据、大区的开放数据、地址登记）都可以放到司法地图上。

法律用文字描述 canton（"Antwerpen 市领土中以 Brouwersvliet 的中心线为界的部分……"）。这些文件把它转化为数据，
同时保留法律原文，以应对只有原文才能判定的情况。

## 来源与更新 {#source-and-updates}

|          |                                                                                                                                                                                                                                                                                             |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 来源     | Gerechtelijk Wetboek / Code judiciaire（司法法典）的附件 "Gebiedsomschrijving en zetel van hoven en rechtbanken"（[ELI，numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)），荷兰语和法语版本；市镇、省和大区来自 Statbel（比利时统计局）的开放数据 |
| 构建方式 | `pnpm build:cantons`（canton、市镇）；每周快照 + `pnpm build:data`（大区、省）；手工（司法辖区、arrondissement）                                                                                                                                                                            |
| 变动时间 | 法律修改该附件时；市镇合并时（2019 年、2025 年）                                                                                                                                                                                                                                            |
| 覆盖范围 | 2025 年 1 月 1 日及之后：查询更早的日期会抛出 `RangeError`（[时间](/zh/api#time)）                                                                                                                                                                                                          |
| 检查     | 用 `pnpm build:cantons` 手工重新构建：ejustice 拒绝来自 GitHub 服务器的连接（[数据质量](/zh/guide/data-quality)）                                                                                                                                                                           |
| 许可证   | CC BY 4.0；市镇数据 © Statbel，CC BY 4.0                                                                                                                                                                                                                                                    |

## 查找某个市镇的 canton {#find-the-canton-for-a-municipality}

<CantonLookup />

## 司法辖区 {#judicial-areas}

上诉法院的 5 个司法辖区（rechtsgebieden / ressorts）。文件：`data/judicial-areas.json`。
来源：Gerechtelijk Wetboek 附件（Ger.W. bijvoegsel）第 5 条。

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

12 个司法 arrondissement。文件：`data/arrondissements.json`。来源：Ger.W. bijvoegsel 第 4 条。

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>司法辖区</th></tr></thead>
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

全部 162 个司法 canton：每个都是一个治安法院的辖区。文件：`data/cantons.json`（根据 Gerechtelijk Wetboek 附件第 1 条生成）。

### 字段 {#fields}

| 字段             | 类型                           | 说明                                                                                       |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------ |
| `id`             | `CantonId`                     | 使用当地语言的稳定 id，有多个 canton 的地方加编号：`gent-1`、`merelbeke-melle`、`wavre-1`  |
| `arrondissement` | string                         | Arrondissement id                                                                          |
| `name`           | `{ nl, fr }`                   | 附件中给出的 canton 名称                                                                   |
| `number`         | number?                        | 在有多个 canton 的地方的 canton 编号（Gent 1–5）                                           |
| `seat`           | `{ nl, fr }`                   | 治安法院的所在地；可能与名称不同                                                           |
| `municipalities` | `{ municipality, partial? }[]` | 所涵盖的市镇（REFNIS 代码）；只涵盖一部分时为 `partial: true`                              |
| `territory`      | `{ nl, fr }`                   | canton 的辖区，逐字取自附件                                                                |
| `legalBasis`     | `{ url, provision }`           | 法律对其作出界定之处：附件的 ELI 和条款，例如 `Bijvoegsel art. 1, afdeling 6.15`（Gent 4） |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }；通常就是所在地，但并非总是如此
    number?: number // 用于有多个 canton 的地方（Gent 1–5 等）
    seat: Bilingual // 治安法院的所在地
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // canton 的辖区，逐字取自附件
    legalBasis: { url: string; provision: string } // 附件的 ELI 及条款
}
```

- **Id** 采用当地语言：弗拉芒大区和布鲁塞尔用荷兰语，瓦隆大区用法语，Eupen 一带用德语；双语的布鲁塞尔采用荷兰语名称。
  见[标识符](/zh/guide/identifiers)。治安法院通过其 `canton` 字段关联到它的 canton。
- **名称和所在地可能不同**：canton `oudergem` 的所在地在 Etterbeek。
- **`partial: true`** 表示该市镇被分割到多个 canton。此时 `territory` 文本会说明哪一部分（街道、门牌号、水道）属于这个 canton。
- 名称只有荷兰语和法语：该附件没有经过合并整理的德语文本。

### 被分割的市镇 {#split-municipalities}

有 55 个 canton 只涵盖某个市镇的一部分。对于这些 canton，仅凭市镇无法确定 canton：它取决于街道（有时还取决于门牌号）。
`territory` 文本列出了边界。有了地址的坐标，`belgica/canton-boundaries` 中的 `findCantonsAt(lon, lat)` 就能在 NGI 的
[canton 边界](./canton-boundaries)中找到 canton；没有坐标时，请列出候选 canton 及其文本，由人来决定。
当几何数据与文本不一致时，以文本为准，因为文本才是法律。

## 市镇 {#municipalities}

565 个市镇及其 Statbel REFNIS（NIS）代码。文件：`data/municipalities.json`（根据 Statbel 数据生成）。© Statbel，CC BY 4.0。

```ts
interface Municipality {
    id: MunicipalityId // REFNIS 代码：Gent 为 '44021'
    name: Bilingual
    province: ProvinceId | '04000' // 省的 REFNIS 代码；布鲁塞尔为 '04000'
    region: RegionId // 大区的 REFNIS 代码
}
```

布鲁塞尔首都大区的 19 个市镇没有省。它们的 `province` 是 `04000`，即该大区的代码，这也是 Statbel 在其自己文件的省一栏中填写的值；
`getProvinceForMunicipality` 对它们返回 `undefined`，`getRegionForMunicipality` 则给出大区。这些代码取自数据，列在下方。

## 大区 {#regions}

3 个大区（gewesten / régions）。文件：`data/regions.json`（根据 Statbel 的 REFNIS 代码列表生成；名称按 Statbel 公布的原样）。
© Statbel，CC BY 4.0。

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
    id: RegionId // REFNIS 代码：'02000'、'03000'、'04000'
    name: Translated // { nl, fr, de }，按 Statbel 公布的原样
    sources: SourceRef[] // Statbel 的 REFNIS 代码列表
}
```

## 省 {#provinces}

10 个省及其所属大区。文件：`data/provinces.json`（根据 Statbel 的 REFNIS 代码列表生成）。© Statbel，CC BY 4.0。
布鲁塞尔首都大区没有省；Brabant 省已于 1994 年 12 月 31 日撤销，早于本数据的覆盖范围。

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>大区</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // REFNIS 代码：Oost-Vlaanderen 为 '40000'
    name: Translated // { nl, fr, de }，按 Statbel 公布的原样
    region: RegionId
    sources: SourceRef[] // Statbel 的 REFNIS 代码列表
}
```

名称取自 Statbel，包括表示单位类型的词（`Provincie Oost-Vlaanderen`、`Province de Flandre orientale`、`Provinz Ostflandern`）：
本包按来源公布的原样保存数值，不做缩写。
