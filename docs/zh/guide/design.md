# 设计取舍 {#design-decisions}

这个包在有第一批用户之前经过了重新设计，所以每个选择都可以只看其本身的优劣，而不必迁就兼容性。本页记录每项决定、
做出它的理由以及由此带来的结果。新的决定新增一条；被推翻的决定会加以标注，而不是删除。

## 1. 数据才是产品，代码只是便利 {#_1-the-data-is-the-product-the-code-is-a-convenience}

**决定。** 官方来源才是事实；`data/` 中的 JSON 文件由官方来源构建而成，它们才是产品。不用任何 TypeScript 也能使用
这些文件：可以从 Python、电子表格（release 中附带 CSV 表格）或 `jq` 中读取。每个文件的结构只定义一次，由
TypeScript 类型定义，并以由类型生成的 JSON Schema 发布；当类型、schema 和数据不一致时，CI 会失败。库只是添加了
类型、索引和辅助函数，理解数据不需要其中任何东西。

**理由。** 参考数据比它周围的代码活得更久，而大多数使用比利时法律数据的人并不是 JavaScript 项目。

**所以。** 每个文件都有一个 [JSON Schema](./schema)，并在 `datapackage.json` 中有一个条目，写明其来源和许可。
字段名和取值在文档中都有解释，而不只是写在代码里。

## 2. 法律事实是数据，绝不靠计算得出 {#_2-legal-facts-are-data-never-computed}

**决定。** 任何具有法律意义的东西（法院名称、canton 的辖区、利率）都逐字取自官方来源并加以存储。代码可以格式化或
查找，但不能构造法律事实。

**理由。** 拼装事实的代码可能以测试发现不了的方式出错：早先的 `formatCourtName` 生成的法语法院名称是错的（写成
`Tribunal de paix …`，而这些法院自称 `Justice de paix …`；[#10](https://github.com/pieterjanscheir/belgica/issues/10)）。
存储下来的值则可以与来源核对。

**所以。** 法院名称按各法院自己公布的形式存储，涵盖它公布所用的每种语言，`formatCourtName` 已被删除。canton 的辖区
保持为逐字的法律条文，并以 ELI 链接注明其法律依据。来源缺失的地方，字段也就缺失：没有任何东西是靠猜测填进去的。
解析也是如此：夹带备注的办公时间文本、没有区号的电话号码，或写成一句话的地址，都会被舍弃，而不是去猜。

## 3. 一条标识符规则 {#_3-one-identifier-rule}

**决定。** 如果有覆盖每条记录的官方代码，就用官方代码；否则用由当地语言名称生成的小写 kebab-case；法院 id 为
`type` + 地名。只覆盖部分记录的官方代码（ECLI、OVO）作为字段保存。见[标识符](./identifiers)。

## 4. 关联是字段 {#_4-links-are-fields}

**决定。** 记录之间只通过字段相互引用，字段保存另一条记录的 id，并以它所指向的数据集命名（`arrondissement`、
`canton`、`municipality`）。不会由一个 id 拼出另一个 id。

**理由。** 藏在字符串格式中的关系，在任何一方发生变化时都会悄无声息地失效。字段则由 schema（其中列出了所有有效
id）和测试来校验。

**所以。** 法院、监狱或 justitiehuis / maison de justice 的地址以同样的方式关联到其市镇（`address.municipality`），
通过 Statbel 对照表中的邮政编码，而从不通过城市名称（[#28](https://github.com/pieterjanscheir/belgica/issues/28)）；
邮政编码记录关联到它的市镇，而不是复制市镇的名称。

## 5. 规范化存储，展示交给代码 {#_5-canonical-values-presentation-in-code}

**决定。** 每个值都以一种规范的标准形式存储，面向人的格式化则交给函数：

| 值       | 存储形式                        | 标准                          |
| -------- | ------------------------------- | ----------------------------- |
| 日期     | `2024-06-15`                    | ISO 8601                      |
| 电话     | `+3253820701`                   | E.164                         |
| IBAN     | `BE73679200844560`              | ISO 13616 电子格式            |
| 办公时间 | `Mo-Fr 08:30-12:30,13:30-16:00` | OpenStreetMap `opening_hours` |
| 语言     | `nl`、`fr`、`de` 键             | ISO 639-1                     |

**理由。** 每个值只有一种形式，值才能相互比较、能够校验（IBAN 校验和有测试），并能被其他软件使用（`tel:` 链接、
支付系统、办公时间解析器）。显示习惯因场景而异，数据不应如此。

## 6. 每条记录都注明出处 {#_6-provenance-on-every-record}

**决定。** 每个数据集都在 `datapackage.json` 中列出其来源、许可和核对日期；每条抓取来的记录都列出读取它的页面，
以及这些页面内容首次被看到的日期（`sources: [{ url, retrieved }]`）。

**理由。** 对法律数据来说，第一个问题就是：“这是从哪里来的，有多旧？”

## 7. 数据由机器根据保存的快照构建 {#_7-the-data-is-built-by-machines-from-kept-snapshots}

**决定。** 每周有一个 workflow 抓取官方来源，把页面作为快照保存在 `sources` 分支上，用 `scripts/parse` 中的解析器
据此重建数据，进行测试，并在数据有变化时开一个 pull request。没有任何数据是手工录入的。另有一个每周任务检查缺失的
利率、逾期的核对和失效的来源。

**理由。** 法律数据会悄无声息地过时；人会忘记，定时任务不会。手工录入的数据无法检查也无法重做；解析器可以测试，
快照则准确显示来源在那一天写了什么。pull request 让人始终参与其中：`main` 中的数据从不会未经审查就发生变化。

**所以。** 快照放在单独的分支上，这样包的历史就不会被几 MB 的 HTML 拖累。解析器用真实页面的精简副本进行测试。解析器
无法归位的页面会让构建停止，而不是产生一条半对半错的记录。有两个来源（ejustice、police.be）拒绝 GitHub 的服务器
访问，因此改从一台普通机器上抓取（[#24](https://github.com/pieterjanscheir/belgica/issues/24)）。

## 8. 分发：仅 ESM、Node 22.12+、在发布时构建 {#_8-distribution-esm-only-node-22-12-built-on-release}

**决定。** 这个包只提供 ESM，要求 Node 22.12 或更高版本，构建产物不提交到仓库：由 release workflow 构建并发布到
npm，并附带 provenance。

**理由。** Node 18 和 20 已经停止维护。从 Node 22.12 起，`require()` 可以加载 ESM，所以单独的 CommonJS 构建只会多出
一份数据副本（dual-package hazard），还要多测试一套。提交到仓库的构建产物会过时，并且曾经导致依赖自动更新失败。

**所以。** `import` 和 `require()` 都可以使用，并在 Node 22.12、22、24 和 26 上测试。每个数据集都有自己的 entry
point，所以只需要利率的应用只会加载几 KB，而不会加载法院数据和每个 canton 的法律条文
（[快速上手页面](./getting-started#import-only-what-you-need)根据构建产物测量了每一个的大小）。

## 9. 让类型承载数据的保证 {#_9-types-that-carry-the-data-s-guarantees}

**决定。** id 是生成的联合类型；数据集是 `readonly` 的；用已知 id 查询返回记录本身，而不是 `record | undefined`；
封闭的词汇表（法院类型、种类、联系方式类型）都是联合类型。联系方式的标签是自由文本，按法院公布的样子保存：如果用
封闭列表，就意味着要把数百个书记处名称映射成几个词，那就是在猜。

**理由。** 错误会在写代码时暴露出来，而不是在生产环境中；类型本身也就是数据的文档。

## 10. 质量关卡 {#_10-quality-gates}

**决定。** 每次变更都必须通过：严格的 TypeScript（包括 `noUncheckedIndexedAccess` 和
`exactOptionalPropertyTypes`）、启用类型感知严格规则的 ESLint、Prettier、`src/` 的 100 % 测试覆盖率、所有数据的
JSON Schema 校验、完整性测试（id、关联、数量、期间），以及对打包后的包运行 `publint` 和 `arethetypeswrong`。

**理由。** 一个参考数据包只有比手工复制数据更可靠，才值得依赖。

## 11. 时间是模型的一部分 {#_11-time-is-part-of-the-model}

**决定。** 记录带有有效期（`validFrom`、`validTo`，两端日期都包含在内），每个数据集都说明它从哪一天起描述现状
（`territoryCoverage`，以及 `datapackage.json` 中的 `temporalCoverage`），查询可以接受一个可选的日期：
`getCanton(id, { on })`、`getCantonsForMunicipality(refnis, { on })`。早于覆盖范围的日期会抛出 `RangeError`。

**理由。** 法律问题总是关于某一天的：传票送达时哪个法院有管辖权，发票到期时适用哪个利率。canton、市镇和法院都会
变化；只知道“现在”的模型会用今天的划分回答关于过去的问题，而且看起来还是对的。以后再加入时间维度会改变每一个 id
和每一个查询，所以在历史数据收录之前，时间就已经是模型的一部分了
（[#27](https://github.com/pieterjanscheir/belgica/issues/27)）。

**所以。** 利率本来就有期间。不带日期按 id 查询返回今天的版本，所以已知 id 的返回类型仍然不含 `undefined`；带日期时
则可能找不到结果。每个数据集都带有期间，而不只是地域数据：来源不再列出的抓取记录会用 `validTo` 退役而不是被删除
（`scripts/parse/retire.ts`），所以一个 id 一旦发布就会一直保留，已经撤销的法院仍然是去年传票上写的那个法院。

## 12. release 携带数据，而不只是包 {#_12-releases-carry-the-data-not-only-the-package}

**决定。** 每个 GitHub release 都附带一个 zip 文件，其中包含 JSON 格式和 CSV 表格形式的数据，以及各个 schema 和
`datapackage.json`。npm 只是获取数据的途径之一，而不是唯一途径。

**理由。** 最需要比利时法律参考数据的人，用的是电子表格和其他编程语言，而不是 JavaScript。

## 13. 几何数据是第二来源，以条文为准 {#_13-geometry-is-a-second-source-and-the-text-wins}

**决定。** canton 边界采用 NGI（比利时国家地理研究所）对 Gerechtelijk Wetboek / Code judiciaire（司法法典）附件的
数字化成果，按原样采用（逐个顶点，不做简化，坐标精确到厘米），并按两种语言的名称与 canton 匹配，其余的用一张显式
的别名表处理。canton 的 `territory` 条文仍然是法律本身：几何数据与条文不一致时，以条文为准。几何数据有自己的 entry
point，包的根路径不会重新导出它。

**理由。** NGI 的多边形是对同一条文的官方解读，因此可以引用，也可以重建；在这里根据街道数据推导出的边界，会成为一种
谁也无法核对的第三种解读。简化会移动边界线，而边界线恰恰在 canton 交界处最要紧。一百万个坐标点会让其他所有数据集
相形见绌，所以不应该有人无意中加载它们。

**所以。** `findCantonsAt(lon, lat)` 根据几何数据作答，文档中也说明了这一点；靠近边界线的点应以条文为准。当某个
canton 没有边界，或某个要素匹配不到任何 canton 时，每周构建会失败
（[#29](https://github.com/pieterjanscheir/belgica/issues/29)）。

## 尚未决定 {#not-decided-yet}

| 问题                             | Issue                                                       |
| -------------------------------- | ----------------------------------------------------------- |
| 2025 年 1 月 1 日之前的历史数据  | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| 按期间计算利息（计日方法、复利） | 在能从判例或官方指引中找到方法依据之前，暂不计划            |
