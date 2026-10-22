# 路线图 {#roadmap}

计划中的数据集，每一个都附有说明其规格的 issue。每个 issue 列出官方来源、拟议的字段，以及"完成"的标准。欢迎参与：挑一个，
并遵循[约定](/zh/guide/contributing#adding-a-dataset)。

## 计划中 {#planned}

| 数据集                                                                                                                                                                               | 用途                                                                                | Issue                                                       |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **其他法院**：Hof van Cassatie / Cour de cassation（最高法院）、Grondwettelijk Hof / Cour constitutionnelle（宪法法院）、Raad van State / Conseil d'État（国务委员会）、纪律审判机构 | 最高级别的法院不在法院门户网站上，因此需要各自的来源                                | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **Eupen 的 justitiehuis / maison de justice**（德语共同体）                                                                                                                          | 数据中唯一还缺少的 justitiehuis                                                     | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **历史数据**：canton、市镇和法院何时发生变化                                                                                                                                         | 数据模型已有有效期和按日期查询；更早的版本还需要补充数据                            | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **地址 → 坐标**                                                                                                                                                                      | [canton 边界](./canton-boundaries)可以找到某一点所属的 canton；缺的是地址的地理编码 | [#28](https://github.com/pieterjanscheir/belgica/issues/28) |
| **执达员事务所**（gerechtsdeurwaarders / huissiers de justice）                                                                                                                      | 在某个 arrondissement 内找一位执达员进行送达或强制执行                              | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **警察区**（politiezones / zones de police）                                                                                                                                         | 某个市镇由哪个警察区负责：报案、获取笔录副本                                        | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **土地登记和法律保障机构**（kadaster，原 hypotheekkantoren）                                                                                                                         | 向主管机构申请抵押证明和土地登记摘录                                                | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## 值得考虑 {#worth-considering}

汇总在 [#9](https://github.com/pieterjanscheir/belgica/issues/9) 中，大致按使用频率排序：

- 按邮政编码列出的**合并前的原市镇**（deelgemeenten / sections de commune）。[邮政编码](./postal-codes)只到市镇一级；
  bpost 的列表列出了各个地点，但没有 REFNIS 代码，也没有开放许可。
- **诉讼费用**（rolrechten / griffierechten）和 **rechtsplegingsvergoeding / indemnité de procédure**（诉讼费补偿）的分档金额，
  像利率一样附有有效期和指数化调整。
- 每年的**司法假期和公共假日**，用于计算诉讼期限。
- 每个 arrondissement 的**检察机关**（parketten、arbeidsauditoraten）。
- **公证人和公证人公会**、**律师公会**（balies / barreaux）。
- **市镇合并**：2019 年和 2025 年旧 REFNIS 代码到新代码的对应关系，以便映射较早的数据。
- 用于租金指数化的**健康指数**（gezondheidsindex）。

## 为什么有些数据集还没有 {#why-some-datasets-aren-t-here-yet}

法律数据集只有在每个值都来自官方来源时才有用，因此不会凭记忆手工添加任何内容。每个数据集都由脚本根据其来源的快照生成，
大多数来源每周由 GitHub Actions 抓取。目前有两个来源无法这样做：canton 数据所来自的 Belgisch Staatsblad / Moniteur belge（比利时政府公报）网站（ejustice）和 police.be
都拒绝来自 GitHub 服务器的连接；它们改为从一台普通机器上抓取（[#24](https://github.com/pieterjanscheir/belgica/issues/24)）。
执达员名录是在浏览器中渲染的，因此需要用浏览器读取，或者使用全国执达员公会的数据（[#6](https://github.com/pieterjanscheir/belgica/issues/6)）。
