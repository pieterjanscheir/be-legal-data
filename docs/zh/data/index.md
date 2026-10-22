# 数据集 {#datasets}

每个数据集都是 `data/` 中的一个 JSON 文件，由一份 [JSON Schema](/zh/guide/schema) 描述，并列在
[`datapackage.json`](/zh/guide/schema#datapackage-json) 中，附有其官方来源、许可证，以及最近一次与这些来源核对的日期。

| 数据集                                                  | 记录数   | 用途                                                                                            |
| ------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------------------- |
| [司法辖区](./territory#judicial-areas)                  | 5        | 由哪个上诉法院（及劳动上诉法院）审理上诉                                                        |
| [Arrondissement](./territory#arrondissements)           | 12       | 对法院、检察机关和执达员分组；大多数管辖规则所使用的单位                                        |
| [Canton](./territory#cantons)                           | 162      | 某个地址由哪个治安法院管辖                                                                      |
| [Canton 边界](./canton-boundaries)                      | 162      | 被分割城市中某一点所属的 canton；在地图上显示 canton（GeoJSON）                                 |
| [市镇](./territory#municipalities)                      | 565      | 通过 REFNIS 代码，将任何比利时地址或统计数据关联到司法地图上                                    |
| [大区](./territory#regions)                             | 3        | 某个市镇所属的大区（按 REFNIS 代码），附三种语言的名称                                          |
| [省](./territory#provinces)                             | 10       | 某个市镇所属的省（布鲁塞尔没有省），及该省所属的大区                                            |
| [邮政编码](./postal-codes)                              | 1 152    | 从地址的邮政编码找到其市镇，再进一步找到其 canton 和法院                                        |
| [法院](./courts)                                        | 347      | 名称、地址和书记处联系方式，用于向任何法院致函、递交文书或付款                                  |
| [监狱](./prisons)                                       | 39       | 每所监狱和拘留所的地址与联系方式                                                                |
| [Justitiehuis / maison de justice](./houses-of-justice) | 27       | 缓刑监督、被害人接待，以及为家事法院（familierechtbank / tribunal de la famille）开展的社会调查 |
| [利率](./interest-rates)                                | 2 个系列 | 计算一笔债权的迟延付款利息                                                                      |

## 数据集之间的关系 {#how-the-datasets-fit-together}

```
Judicial area ──< Arrondissement ──< Canton >──< Municipality (REFNIS) ──< Postal code
      │                 │              │  │
      │                 │              │  └── Canton boundary   canton 的几何形状（NGI）
      └───────────── Court ────────────┘  治安法院关联到它的 canton，
                        │                 每个法院的地址关联到它的市镇
                        └──< Division      分部关联到它所属的法院
```

`──<` 读作"拥有多个"。一个市镇通常只属于一个 canton；被分割的城市（Antwerpen、Gent、Brussel、Luik 等）属于多个 canton。
在行政层面是 `Region ──< Province ──< Municipality`，但布鲁塞尔首都大区没有省，直接包含其 19 个市镇。

记录之间通过 id 相互关联，从不通过名称：法院有一个 `judicialArea` id，当其辖区恰好是一个 arrondissement 时，还有一个
`arrondissement` id；canton 列出其所含市镇的 REFNIS 代码；邮政编码和法院地址都带有其所在市镇的 REFNIS 代码。
名称的拼写因来源和语言而异，id 则不会。

## 这些数据有什么用 {#why-this-data-is-useful}

比利时的法律工作总是反复遇到同样的查询，而官方来源很难在代码中使用：

- **管辖权。** vredegerecht / justice de paix（治安法院）、politierechtbank / tribunal de police（违警法院）以及许多其他法院按地域确定管辖。
  法律（Gerechtelijk Wetboek / Code judiciaire（司法法典）的附件）用文字描述这些辖区，部分甚至逐条街道列出。
  `cantons.json` 把它变成从市镇到 canton 的查询，并为被分割的城市保留法律原文；`canton-boundaries.json` 加入 NGI 的几何数据，
  使被分割城市中的某一点也能找到其 canton。
- **正确的名称和地址。** 传票、诉状和信函必须按法院自己使用的名称称呼正确的法院，例如 `Vredegerecht Gent 1` 或
  `Ondernemingsrechtbank Gent - afdeling Brugge`，并送达正确的书记处。名称取自各法院自己的网页，涵盖其发布的每一种语言。
- **利息计算。** 迟延付款的债权使用法定利率，企业之间则使用商业交易利率。两者每年或每半年变动一次，而 2013–2015
  年的过渡期取决于合同日期。只要算错一个期间，主张的金额就会出错。
- **关联其他数据。** Statbel、各大区和大多数开放数据都使用 REFNIS 代码。把它们映射到 canton 和 arrondissement，就可以把案件量、
  人口或地址数据放到司法地图上。

## 目前（尚）未包含的内容 {#what-isn-t-in-it-yet}

当前数据的局限见[已知缺口](./known-gaps)，计划中的数据集见[路线图](./roadmap)：最高级别的法院、历史数据、执达员、警察区，
以及土地登记和抵押登记机构。

::: warning 参考数据，而非法律意见
这些数据已与官方来源核对，但来源会变化，错误也难免发生。在依赖某个值之前，请先查阅官方来源，并
[报告任何错误](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)。
:::
