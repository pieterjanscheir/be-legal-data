# 数据质量与时效 {#data-quality-freshness}

法律参考数据会悄无声息地过时：新的利率公布了，某个法院搬迁了，某部法律把两个 canton 合并了。本页说明这个包如何
跟上这些变化，以及每个数据集可以信任到什么程度。

## 每个数据集的来源 {#where-each-dataset-comes-from}

| 数据集                              | 来源                                                               | 构建方式                       | 何时变化                                     | 核对周期 |
| ----------------------------------- | ------------------------------------------------------------------ | ------------------------------ | -------------------------------------------- | -------- |
| 司法辖区、arrondissement            | Gerechtelijk Wetboek / Code judiciaire（司法法典）附件第 4–5 条    | 手工                           | 法律重新划定司法版图（罕见；上次在 2014 年） | 24 个月  |
| Canton                              | 司法法典附件第 1 条（荷兰语 + 法语）                               | 生成：`pnpm build:cantons`     | 法律修改附件；市镇合并                       | 12 个月  |
| Canton 边界                         | NGI（geo.be）                                                      | 每周：快照 + `pnpm build:data` | NGI 发布新版本                               | 每周     |
| 市镇                                | Statbel 开放数据                                                   | 生成：`pnpm build:cantons`     | 市镇合并（2019、2025 年）                    | 12 个月  |
| 大区、省                            | Statbel REFNIS 代码表                                              | 每周：快照 + `pnpm build:data` | Statbel 修改其登记册（上次在 1995 年）       | 每周     |
| 法院                                | tribunaux-rechtbanken.be                                           | 每周：快照 + `pnpm build:data` | 法院搬迁，或更改联系方式或办公时间           | 每周     |
| 监狱                                | justitie.belgium.be                                                | 每周：快照 + `pnpm build:data` | 监狱启用、关闭或更改联系方式                 | 每周     |
| Justitiehuizen / maisons de justice | vlaanderen.be、maisonsdejustice.be                                 | 每周：快照 + `pnpm build:data` | 机构搬迁或更改联系方式                       | 每周     |
| 邮政编码                            | Statbel 对照表                                                     | 每周：快照 + `pnpm build:data` | Statbel 发布新表（市镇合并、新代码）         | 每周     |
| 利率                                | FOD Financiën（联邦财政部）、Belgisch Staatsblad（比利时政府公报） | 手工                           | 每年（法定利率）和每半年（商业交易利率）     | 6 个月   |

生成的数据集从不手工编辑。`pnpm build:cantons` 会解析官方文本，只有当荷兰语和法语版本一致、并且每个市镇都被覆盖时
才会写入；当某个页面无法归位、某个 canton 没有法院，或某个 canton 在 NGI 的文件中没有边界时，`pnpm build:data`
会拒绝写入。

## 数据如何构建 {#how-the-data-is-built}

```
official site ──fetch──> snapshots (sources branch) ──parse──> data/*.json ──> pull request
```

1. **抓取。** 每周一，[sources workflow](https://github.com/pieterjanscheir/belgica/actions/workflows/sources.yml)
   会礼貌地抓取所有来源的每个页面（`scripts/sources`）：每个网站每秒一个请求，并使用标明本项目的 user agent。它把
   每个页面保存在 `sources` 分支上，同时保存一份索引，记录抓取了什么、何时抓取，以及内容的哈希值。只有内容变化时
   页面才会被再次保存，所以这个分支的历史能显示哪一天变了什么。抓取失败的页面（服务器错误、404）保留上一次成功的
   快照并中止运行，同时开一个 issue：数据绝不会根据不完整的信息重建。来源不再链接的页面会从快照中删除；它对应的
   记录仍留在数据中，以 `validTo`（漏掉它的那次检查的前一天）退役，所以它的 id 依然有效，查询更早的日期时仍能找到
   它。新出现的页面会得到一条带 `validFrom` 的记录。
2. **解析。** `pnpm build:data` 读取快照（`scripts/parse`），写出法院、监狱、justitiehuizen / maisons de justice 和
   canton 边界的数据。它会报告无法读取的内容，并在某个页面无法归位时失败。
3. **测试。** workflow 对新数据进行类型检查并运行测试。
4. **审查。** 数据有变化时，它会新开或更新一个 pull request，其中包含 diff 和无法读取的值的列表。由人对照来源检查后
   合并。

自己运行：先运行 `pnpm fetch:sources`（写入 `.sources/`），再运行 `pnpm build:data`。

canton 和市镇用 `pnpm build:cantons` 手工重建：Belgisch Staatsblad / Moniteur belge（比利时政府公报）的网站拒绝
GitHub 服务器的访问（[#52](https://github.com/pieterjanscheir/belgica/issues/52)）。

## 自动检查 {#automatic-checks}

### 每次变更时（CI） {#on-every-change-ci}

- **Schema 校验**：每个数据文件都符合其 [JSON Schema](./schema)。
- **完整性**：id 唯一且格式正确；每个引用（arrondissement、canton、市镇、法院、边界）都指向一条存在的记录；每个
  canton 都有一条边界，它是位于比利时境内的有效 GeoJSON，合起来正好等于国土面积且没有重叠；每个市镇恰好属于一个
  canton，或分属多个 canton；每个 canton 都位于其 arrondissement 所在的省份之内；每个 canton 恰好有一个治安法院；
  每个分部都与其法院的类型和辖区一致；每类法院的数量都与法律规定一致；每个 canton 都隶属于每种类型的一个法院
  （布鲁塞尔为每种语言一个），并且法院覆盖的 canton 都位于其 arrondissement 和司法辖区之内。
- **解析器**：用真实页面的精简副本（`test/fixtures/sources`）进行端到端测试；每个读取器（电话号码、IBAN、地址、
  办公时间）都针对来源中出现过的各种写法，以及必须拒绝的写法进行测试。
- **利率**：期间按顺序排列，从不重叠，也没有空档；法定利率按日历年，商业交易利率按半年；2013–2015 年按合同日期
  适用的利率只出现在那个时间窗口内。
- **联系方式**：每个 IBAN 都通过 ISO 13616 校验和，电话号码是 E.164 格式的比利时号码，电子邮件地址为小写，办公时间
  符合 `opening_hours` 语法。
- **代码**：严格的 TypeScript（包括未检查的索引访问和精确的可选属性）、启用类型感知规则的 ESLint、Prettier，以及
  `src/` 的 100 % 测试覆盖率。
- **打包**：构建后的包可以在 Node 22.12、22、24 和 26 上，从每个 entry point 用 `import` 和 `require()` 加载；
  `publint` 和 `arethetypeswrong` 检查 `exports` 和类型声明。

### 每周（定时） {#every-week-scheduled}

[freshness workflow](https://github.com/pieterjanscheir/belgica/actions/workflows/freshness.yml) 每周一运行，发现
问题时会开一个带
[`data-freshness`](https://github.com/pieterjanscheir/belgica/issues?q=label%3Adata-freshness) 标签的 issue：

- **缺失的利率**：今天没有法定利率或商业交易利率，或者未来两周没有商业交易利率（FOD Financiën 会在半年期开始前
  公布）。
- **逾期的核对**：`datapackage.json` 中某个数据集的 `lastReviewed` 日期早于其 `reviewEveryMonths` 所规定的周期。
- **失效的来源**：`datapackage.json` 中某个官方来源 URL 不再响应。

自己运行：`pnpm test:freshness`（加上 `FRESHNESS_ONLINE=1` 可检查 URL）。

## 如何解读一个值 {#how-to-read-a-value}

- **缺失不等于零。** 对于没有利率记录的日期，`getInterestRate` 返回 `null`，而不是去猜；来源没有提供的字段（法院
  的地址、机器可读的办公时间）会缺失，而不是被填上。两种情况都要处理。
- **太早的日期是错误。** 查询早于数据集覆盖范围的日期会抛出 `RangeError`：数据无法回答，而今天的答案看起来却像是
  对的。
- **联系方式最不稳定。** 电话号码、电子邮件地址和办公时间会在没有通知的情况下变化。每条记录都注明它读自哪些页面、
  何时读取（`sources`）；在重要场合，请查看法院自己的页面（`website`）。
- **以法律条文为准。** 对于被分割的市镇，canton 的 `territory` 就是法律原文，一字不差。当摘要或 NGI 的
  [边界](/zh/data/canton-boundaries)与条文不一致时，以条文为准。

## 报告错误 {#reporting-a-mistake}

[提交数据更正](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)，附上记录 id 和
官方来源的链接。更正会以 patch 版本发布。
