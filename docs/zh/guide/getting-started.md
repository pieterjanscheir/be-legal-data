<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# 快速上手 {#getting-started}

## 安装 {#install}

::: code-group

```bash [pnpm]
pnpm add belgica
```

```bash [npm]
npm install belgica
```

```bash [yarn]
yarn add belgica
```

:::

这个包是 ESM 格式，自带类型定义，没有运行时依赖，可以在浏览器和 Node 22.12 及以上版本中运行；在
Node 中也可以用 `require()` 加载。测试覆盖 Node 22.12、22、24 和 26。

### 只导入你需要的部分 {#import-only-what-you-need}

数据被打包进 JavaScript，所以从包的根路径导入会加载所有数据集。每个数据集都有自己的 entry point，
其中法院和 canton（含其辖区的法律条文）是体积最大的两个：

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

[canton 边界](/zh/data/canton-boundaries)是个例外：它包含约一百万个几何坐标点，只在
`belgica/canton-boundaries` 中提供，包的根路径从不加载它。

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">加载的 JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">体积在构建网站时根据构建产物测量（请先运行 <code>pnpm build</code>）。</p>

## 初步了解 {#a-first-look}

```ts
import {
    getCourt,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'belgica'

getCourt('justice-of-the-peace-gent-1').name.nl // 'Vredegerecht Gent 1'
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getCantonsForMunicipality('44021') // Gent 1–5：被分割的城市，见各 canton 的 `territory`
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## 常见任务 {#common-tasks}

### 某个地址由哪个治安法院管辖？ {#which-justice-of-the-peace-handles-an-address}

在比利时，每个司法 canton（最小的司法辖区单位）设有一个 vredegerecht / justice de paix（治安法院）。
先查出市镇的 REFNIS 代码，取得它所属的 canton，再取得该 canton 的治安法院。

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // 每个 canton 都有自己的治安法院
}

// 以传票送达当天为准，而不是今天
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

如果一个城市分属多个 canton（Antwerpen、Gent、Brussel、Luik……），结果会不止一个。这时由街道地址决定，
每个 canton 的 `territory` 字段保存了它所辖部分的法律描述。可以在
[地域与 canton 页面](/zh/data/territory#find-the-canton-for-a-municipality)上试一试。

如果有地址的坐标，[canton 边界](/zh/data/canton-boundaries)就能给出答案：

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // 经度，纬度：gent-1
const court = getJusticeOfThePeace(canton.id)
```

### 某个市镇由哪个法院管辖？ {#which-court-for-a-municipality}

除治安法院外，每个法院都按法律规定列出它覆盖的 canton（`cantons`）。`findCourtsWithJurisdiction` 会在这些列表中查找
市镇所属的 canton。

```ts
import { findCourtsWithJurisdiction, getDivisions } from 'belgica'

findCourtsWithJurisdiction('23088', 'police-court') // [police-court-vilvoorde]，而不是 Brussel
findCourtsWithJurisdiction('21004', 'labour-court') // 布鲁塞尔的荷兰语法院和法语法院

// 返回的是整个法院；由哪个分部审理案件，数据中还没有
const [court] = findCourtsWithJurisdiction('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### 从邮政编码出发 {#from-a-postal-code}

地址上写的是邮政编码，而不是 REFNIS 代码。`findCourtsForPostalCode` 先从邮政编码找到市镇
（[邮政编码](/zh/data/postal-codes)），再从市镇找到治安法院和指定类型的法院。结果按市镇给出：有三个邮政编码
（`1040`、`1050`、`1804`）分属两个市镇，这时由街道决定。

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']：由街道决定

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

在分属多个 canton 的城市里，邮政编码只能把问题缩小到市镇；要确定 canton 仍然需要街道，而 canton 的边界目前还是
法律条文，直到 [#29](https://github.com/pieterjanscheir/belgica/issues/29) 把它们加为几何数据。

### 某一天应付的利息 {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

对于没有利率记录的日期，`getInterestRate` 返回 `null`，这样你可以发出警告，而不是悄悄地按 0 % 计算。
对于格式错误的日期（例如 `'2024-6-1'`），它会抛出 `RangeError`：请传入 `YYYY-MM-DD` 或 `Date`。

### 其他语言的法院名称 {#court-names-in-another-language}

名称按各法院自己公布的形式收录，涵盖它有页面的每种语言。弗拉芒大区的法院只用荷兰语公布；布鲁塞尔的双语法院
用荷兰语和法语；Eupen 的法院用德语和法语。

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## 原始 JSON {#raw-json}

数据文件也一并导出：

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## id 是公共 API {#ids-are-public-api}

各项目会保存 `justice-of-the-peace-gent-1` 或 `oost-vlaanderen` 这样的 id，所以它们在同一个主版本内绝不会改变
（见[标识符](./identifiers)），版本号遵循以下规则：

| 变更                | 版本  |
| ------------------- | ----- |
| 新增数据            | minor |
| 修正某个值          | patch |
| 删除或重命名某个 id | major |
