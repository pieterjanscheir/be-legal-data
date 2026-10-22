# 邮政编码 {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

文件：`data/postal-codes.json`。比利时的 {{ stats.postalCodes.codes }} 个邮政编码，每个都通过 REFNIS 代码关联到其所属的市镇：
共 {{ stats.postalCodes.records }} 条记录，因为有 {{ stats.postalCodes.shared }} 个邮政编码同时属于两个市镇。

## 有什么用 {#why-it-s-useful}

- **从地址到司法地图。** 地址带的是邮政编码，而不是 REFNIS 代码。邮政编码给出市镇，市镇再给出其 canton 和法院：
  `findCourtsForPostalCode('9050', 'labour-court')` 在邮政编码所能确定的范围内回答"这个地址归哪个法院？"。
- **某个市镇的邮政编码。** 校验表单、寄送邮件、核对地址与 REFNIS 代码是否一致：`getPostalCodes('44021')`。
- **每个法院、监狱和 justitiehuis / maison de justice 所在的市镇。** 它们的 `address.municipality`
  就是这一关联，作用于所公布地址的邮政编码（[#28](https://github.com/pieterjanscheir/belgica/issues/28)）。

## 来源与更新 {#source-and-updates}

|          |                                                                                                                                                                                                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 来源     | Statbel（比利时统计局）的[邮政编码与 REFNIS 代码对照表](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie)，即自 2025 年 1 月 1 日起有效的表格（`…_va01012025.xlsx`） |
| 构建方式 | 由 `scripts/parse/postal-codes.ts` 根据每周快照生成。如果某个邮编指向 `municipalities.json` 中不存在的 REFNIS 代码，或某个市镇没有邮编，构建就会失败                                              |
| 变动时间 | Statbel 发布新表格时：市镇合并，或 bpost 新增或停用某个邮政编码                                                                                                                                   |
| 覆盖范围 | 2025 年 1 月 1 日及之后：查询更早的日期会抛出 `RangeError`（[时间](/zh/api#time)）。新表格生效当天，它删除的对照会得到 `validTo`，它新增的对照会得到 `validFrom`                                  |
| 检查     | 每周由 [sources 工作流](/zh/guide/data-quality#how-the-data-is-built)检查                                                                                                                         |
| 许可证   | © Statbel，[CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                          |

Statbel 根据 bpost 的邮政局和 FOD Financiën / SPF Finances（联邦财政部）的市镇编制这张表格。表格的每一行还带有一个市镇名称，
这里没有保存它：它与 Statbel 自己的 REFNIS 列表在几处不一致（列表写作 `Tongres-Looz` 的地方这里是 `Tongeren-Borgloon`，
Sint-Niklaas 写作 `Saint-Nicolas`），而且记录只关联到其市镇，而不复制市镇数据。名称可以通过
`getMunicipality(record.municipality).name` 获取。

## 共用的邮政编码 {#shared-postal-codes}

一个市镇有多个邮政编码（Gent 有十个），而一个邮政编码只属于一个市镇，但有三个例外：

| 邮政编码 | 市镇                                              |
| -------- | ------------------------------------------------- |
| `1040`   | Brussel（`21004`）和 Etterbeek（`21005`）         |
| `1050`   | Brussel（`21004`）和 Elsene（`21009`）            |
| `1804`   | Vilvoorde（`23088`）和 Zemst（`23096`）：Cargovil |

对于这几个邮编，由街道决定。`getMunicipalitiesForPostalCode` 会返回两个市镇，`findCourtsForPostalCode`
按市镇分别作答，因此共用的邮编绝不会被悄悄地归到其中一个市镇。

## 字段 {#fields}

| 字段                   | 类型             | 说明                                                                                                                              |
| ---------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PostalCodeId`   | 邮政编码与 REFNIS 代码的组合：`9000-44021`。两者单独都不能确定一条记录；合在一起则既官方又唯一。见[标识符](/zh/guide/identifiers) |
| `validFrom`, `validTo` | string?          | 该对照适用的日期，取自 Statbel 的表格；缺省表示自覆盖范围开始即适用，或仍然适用。见[时间](/zh/api#time)                           |
| `postalCode`           | string           | 四位数的邮政编码                                                                                                                  |
| `municipality`         | `MunicipalityId` | 该邮政编码所属的市镇（REFNIS 代码）                                                                                               |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## 未包含的内容 {#what-isn-t-in-it}

- **合并前的原市镇**（deelgemeenten / sections de commune）：Statbel 的表格只到市镇一级。bpost 自己的邮政编码列表列出了各个地点，
  但不含 REFNIS 代码，并且按 bpost 的使用条款（保留所有权利）发布，而不是开放许可，因此没有采用。
- **街道。** 在被分割为多个 canton 的城市（Antwerpen、Gent、Brussel、Luik 等）中，邮政编码给出市镇，市镇给出多个 canton；
  此时由街道决定，而在 [#29](https://github.com/pieterjanscheir/belgica/issues/29) 将边界作为几何数据加入之前，
  边界只以法律文字的形式存在于每个 canton 的 `territory` 中。

## 辅助函数 {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// 按市镇：它的治安法院，以及所请求类型的法院
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
