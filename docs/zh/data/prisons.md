# 监狱 {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

文件：`data/prisons.json`。FOD Justitie / SPF Justice（联邦司法部）（监狱机构总局）下属的 {{ stats.prisons }} 所监狱和拘留所。

## 有什么用 {#why-it-s-useful}

- **给被羁押人或其所在监狱写信。** 律师、家属和相关服务机构需要监狱的地址和电话号码；名称因语言而异（`Gevangenis van Bergen`、
  `Prison de Mons`、`Gefängnis Mons`）。
- **存钱。** 如果 FOD Justitie / SPF Justice 公布了监狱用于接收给被羁押人款项的账户，它会以 `bank-account` 的形式列在联系方式中，并已校验其校验码。
- **表单和案卷。** 每个机构都有一个稳定的 id，可以和案卷一起保存，也可以作为可供选择的列表。

## 来源与更新 {#source-and-updates}

|          |                                                                                                                                                                     |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 来源     | [FOD Justitie / SPF Justice：比利时监狱](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen)，每所监狱的荷兰语、法语和德语页面 |
| 构建方式 | 由 `scripts/parse` 根据每周快照生成                                                                                                                                 |
| 变动时间 | 监狱开设或关闭，或更改其联系方式时                                                                                                                                  |
| 检查     | 每周由 [sources 工作流](/zh/guide/data-quality#how-the-data-is-built)检查                                                                                           |

## 字段 {#fields}

| 字段                   | 类型                              | 说明                                                                                                 |
| ---------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `id`                   | `PrisonId`                        | 取自当地语言的名称，去掉冠词：`gevangenis-gent`、`prison-lantin`、`detentiehuis-kortrijk`            |
| `validFrom`, `validTo` | string?                           | 该记录适用的日期，以网站列出的为准；缺省表示自覆盖范围开始即适用，或仍然适用。见[时间](/zh/api#time) |
| `kind`                 | `'prison'` \| `'detention-house'` | 拘留所（detentiehuis / maison de détention）关押刑期较短的人，地点靠近其住所                         |
| `name`                 | `{ nl, fr, de }`                  | 按 FOD Justitie / SPF Justice 公布的名称                                                             |
| `address`              | `Address`                         | 以当地语言书写，并附上其邮政编码所属的市镇（`municipality`，REFNIS 代码）                            |
| `contacts`             | `Contact[]`                       | 电话、传真、电子邮件，以及用于接收给被羁押人款项的账户（如有公布）                                   |
| `website`              | `{ nl, fr, de }`                  | 该监狱各语言的页面                                                                                   |
| `sources`              | `{ url, retrieved }[]`            | 读取该记录所依据的页面                                                                               |

页面上也给出了监狱长的姓名，但这里没有收录：它会变动，而且属于本包不需要的个人数据。

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
