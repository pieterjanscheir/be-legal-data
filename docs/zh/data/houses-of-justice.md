<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Justitiehuizen / maisons de justice {#houses-of-justice}

文件：`data/houses-of-justice.json`。弗拉芒语社群（Vlaamse Gemeenschap）和法语社群（Communauté
française）的 justitiehuizen / maisons de justice：共 {{ stats.housesOfJustice }} 条记录。

Justitiehuizen / maisons de justice 受法院和检察机关委托，对犯罪人进行辅导和监督（缓刑、电子监控、
社区劳动），接待被害人，并为家事法院（familierechtbank / tribunal de la famille）撰写社会调查报告。
自 2015 年起由各语言社群负责管理。

## 用途 {#why-it-s-useful}

- **家庭法。** 家事法院会委托该家庭所在地区的 justitiehuis / maison de justice 进行社会调查；
  律师和当事人需要它的联系方式。
- **刑法。** 缓刑条件、替代刑罚和电子监控由 justitiehuis / maison de justice 跟进；被害人接待也是如此。
- **数据关联。** 弗拉芒的 justitiehuizen 带有 OVO 编号，即弗拉芒组织登记册
  （[Wegwijs](https://wegwijs.vlaanderen.be)）中的标识符，因此这些数据可以与弗拉芒政府的其他数据关联。

## 来源与更新 {#source-and-updates}

|          |                                                                                                                                                                                                                                        |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 来源     | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen)（弗拉芒语社群）和 [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/)（法语社群） |
| 生成方式 | 由 `scripts/parse` 根据每周快照生成                                                                                                                                                                                                    |
| 检查     | 每周一次，由 [sources workflow](/zh/guide/data-quality#how-the-data-is-built) 执行                                                                                                                                                     |

尚未收录：德语社群位于 Eupen 的 justitiehuis / maison de justice
（[#3](https://github.com/pieterjanscheir/belgica/issues/3)）。布鲁塞尔既有一个弗拉芒的
（`justitiehuis-brussel`），也有一个法语的（`maison-justice-bruxelles`）。

## 字段 {#fields}

| 字段                   | 类型                                    | 说明                                                                                                   |
| ---------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `id`                   | `HouseOfJusticeId`                      | 由名称生成，去掉冠词：`justitiehuis-gent`、`maison-justice-arlon`                                      |
| `validFrom`, `validTo` | string?                                 | 记录适用的日期，以网站所列为准；缺省表示自数据覆盖开始起即适用，或至今仍适用。参见[时间](/zh/api#time) |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | 负责管理它的语言社群                                                                                   |
| `name`                 | `{ nl }` 或 `{ fr }`                    | 使用该社群的语言                                                                                       |
| `ovo`                  | string?                                 | 弗拉芒组织登记册中的 OVO 编号，仅弗拉芒的 justitiehuizen 有：`OVO001917`                               |
| `address`              | `Address`                               | 附带其邮政编码所属的市镇（`municipality`，以 REFNIS 代码表示）                                         |
| `contacts`             | `Contact[]`                             | 电话、传真和电子邮件；法语 maison de justice 的被害人服务有自己的、带标签的联系方式                    |
| `website`              | `{ nl }` 或 `{ fr }`                    | 列出它的网页                                                                                           |
| `sources`              | `{ url, retrieved }[]`                  | 读取该记录的网页                                                                                       |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
