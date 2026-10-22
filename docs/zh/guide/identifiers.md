# 标识符 {#identifiers}

每条记录都有一个 `id`。其他记录、你的数据库和你的 URL 都会引用它，所以 id 必须一次定对，之后永不改变。本页列出
这些规则、每条规则存在的理由，以及当法律改变了某个 id 所指的对象时会发生什么。

## 规则 {#the-rules}

1. **每条记录都有一个 `id` 字段**，并且在所属数据集中唯一。通用代码（索引、缓存、表单）可以用同一种方式处理每个
   数据集。
2. **如果官方代码覆盖每一条记录，就用官方代码。** 当主管机关为某个数据集的每条记录都分配了代码时，id _就是_
   这个代码：市镇使用 Statbel（比利时统计局）的 REFNIS 代码（Gent 为 `44021`）。只覆盖部分记录的代码则作为普通
   字段保留：法院的 ECLI 代码在 `ecli` 中，弗拉芒语社群的 justitiehuizen 的 OVO 编号在 `ovo` 中
   （见[原因](#why-not-the-official-court-codes)）。
3. **否则使用小写 kebab-case ASCII**：`^[a-z0-9]+(-[a-z0-9]+)*$`，由
   [`scripts/id.ts`](https://github.com/pieterjanscheir/belgica/blob/main/scripts/id.ts) 生成：去掉重音符号，其他
   非字母、非数字的字符都变成一个连字符。
   `Merelbeke-Melle` → `merelbeke-melle`，`Braine-l'Alleud` → `braine-l-alleud`，
   `Liège` → `liege`。
4. **取自当地语言的官方名称**：弗拉芒大区用荷兰语，瓦隆大区用法语，Eupen 一带用德语。布鲁塞尔官方上是双语的，
   需要一个固定的选择：荷兰语。
5. **编号作为后缀**：有多个 canton 的地方得到 `gent-1` … `gent-5`。
6. **法院 id 为 `type` + 地名**：`justice-of-the-peace-gent-1`、`court-of-appeal-liege`。治安法院沿用其 canton 的
   id。布鲁塞尔同一类型的两个法院（每种语言一个）加上 `-nl` 或 `-fr`（`police-court-brussel-fr`）。分部或开庭
   地点在其法院 id 后加上自己的地名（`enterprise-court-gent-brugge`）。当 Gent 同时有治安法院、企业法院和劳动法院时，
   这个前缀能保证 id 唯一；而且它恰好就是记录的 `type`，因此不需要第二套词汇。
7. **监狱和 justitiehuizen / maisons de justice 使用其名称**（当地语言，不带冠词）：`gevangenis-gent`、
   `prison-lantin`、`justitiehuis-gent`、`maison-justice-arlon`。它们的名称本身已经说明了是什么机构，同一城市的两个
   机构（Leuven 的中央监狱和辅助监狱）也靠名称区分。
8. **关联是字段，绝不是推导出来的字符串。** 治安法院有 `canton` 字段；canton 列出 `{ municipality }`；
   arrondissement 有 `judicialArea`。每个字段保存它所指向记录的 id，字段名取自它所指向的数据集。

以上规则都由测试（`test/ids.test.ts`）和 [JSON Schema](./schema) 强制执行；schema 列出了所有有效的 id，所以悬空的
关联会校验失败。

## id 一览 {#the-ids}

| 数据集                              | 示例                                                                                                                      | 规则                   |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 司法辖区                            | `antwerpen`、`brussel`、`gent`、`liege`、`mons`                                                                           | 当地名称               |
| Arrondissement                      | `oost-vlaanderen`、`brabant-wallon`、`eupen`                                                                              | 当地名称               |
| Canton                              | `gent-1`、`merelbeke-melle`、`wavre-1`、`oudergem`、`eupen-sankt-vith-1`                                                  | 当地名称 + 编号        |
| Canton 边界                         | `gent-1`：每个 canton 一条边界，使用该 canton 的 id，并以 `canton` 作为关联                                               | canton 的 id           |
| 市镇                                | `44021`、`21004`                                                                                                          | REFNIS 代码            |
| 省                                  | `10000`、`40000`                                                                                                          | REFNIS 代码            |
| 大区                                | `02000`、`03000`、`04000`                                                                                                 | REFNIS 代码            |
| 邮政编码                            | `9000-44021`、`1040-21005`                                                                                                | 邮政编码 + REFNIS 代码 |
| 法院                                | `justice-of-the-peace-gent-1`、`enterprise-court-gent-brugge`、`police-court-brussel-fr`、`police-court-eupen-sankt-vith` | 类型 + 地名            |
| 监狱                                | `gevangenis-gent`、`prison-lantin`、`detentiehuis-kortrijk`                                                               | 当地名称               |
| Justitiehuizen / maisons de justice | `justitiehuis-gent`、`maison-justice-arlon`                                                                               | 当地名称               |
| 利率                                | `legal`、`commercial`                                                                                                     | 固定键                 |

## 为什么这样选择 {#why-these-choices}

**为什么用 kebab-case？** id 最终会出现在 URL（`/cantons/gent-1`）、文件名、CSS 类名、数据库键和日志行中。全部小写
可以避免在不区分大小写的系统（macOS 和 Windows 的文件系统、许多数据库排序规则）上发生冲突：`Gent1` 和 `gent1`
在数据中是两个 id，在磁盘上却是同一个文件。连字符让单词边界在没有大写字母时依然清晰，而且这个字符集在任何地方都
不需要转义。

**为什么用可读的 id，而不是数字或 UUID？** 参考数据集是给人读的：数据库行或错误信息中的
`justice-of-the-peace-gent-1` 一看就知道是什么。这些 id 和数字一样稳定，因为只有当法律改变了它们所指的对象时才会
变化（见下文），而那时换一个新 id 正是正确的结果。

**为什么用当地语言而不是英语？** 只有少数地方有英文名（Ghent、Antwerp、Liege），162 个 canton 都没有，所以用英文
id 就意味着要有两套规则。当地名称也是机构自己使用的名称，并且出现在官方文本中。

**为什么用官方代码？** REFNIS 是 Statbel、各大区以及几乎所有比利时数据集都在用的代码。用它作为 id，把任何这些数据
与 canton 和法院关联起来都不需要映射表。

**为什么邮政编码要用两个代码？** 单凭邮政编码无法确定一条记录：`1040` 同时属于 Brussel 和 Etterbeek，每一对都是
一条独立的记录，有各自的有效期。由两个官方代码组成的 `1040-21005` 是唯一的，并且在 Statbel 的对照表改变这一对之前
保持不变，而那正是应该新建记录的时候。按照规则 8，市镇同时也是一个字段（`municipality`）：id 是键，不是用来拆分的。

**为什么法院 id 中要有 `type`？** 同一个地方有好几个法院，而且法院类型还会增加（违警法院、劳动法院、初审法院……）。
法院自己的字段说明它是什么；id 只需要唯一且容易辨认，类型正好同时满足这两点。

**为什么不用官方的法院代码？** 法院有两种官方代码，但都不能覆盖所有法院。ECLI 代码（Gent 上诉法院为 `HBGNT`）
按法院和语言分配，而不是按分部分配，而且治安法院公布的判决中一个也没有出现。企业编号（KBO）属于 FOD Justitie /
SPF Justice（联邦司法部）；其营业单位跟着建筑物走，而不是跟着法院走，法院搬迁时就会变化。一条对所有记录都成立的
规则胜过两条规则，所以 ECLI 代码只作为字段（`ecli`），id 遵循规则 6。

**为什么要显式关联？** 旧方案把 `Vredegerecht` 和 canton id 拼接起来作为法院 id。这把一种关系藏进了字符串格式里，
一旦某个法院服务两个 canton，或者某个名称发生变化，它就失效了。`canton` 字段则由 schema 和测试检查，并且可以双向
追溯。

## 在 TypeScript 中 {#in-typescript}

每个数据集都有一个生成的 id 类型（`CantonId`、`CourtId`、`MunicipalityId`、`ProvinceId`、`RegionId`、
`ArrondissementId`、`JudicialAreaId`、`PrisonId`、`HouseOfJusticeId`、`PostalCodeId`），由 `pnpm build:ids` 根据
数据重新生成：

```ts
import { getCanton, type CantonId } from 'belgica'

getCanton('gent-1') // Canton：已知 id 总能找到对应记录
getCanton(userInput) // Canton | undefined：其他任意字符串则不一定

const id: CantonId = 'gent1' // 编译错误：不是 canton id
```

对于需要保存的值，请使用这些 id 类型，这样升级时就能发现拼写错误或已被删除的 id。

## 当法律改变一个 id 时 {#when-the-law-changes-an-id}

canton 和市镇确实会变化：市镇在 2019 年和 2025 年发生过合并，法律也会重新划定 canton。记录带有有效期
（`validFrom`、`validTo`），所以变更是增加历史，而不是抹掉历史：

1. 旧记录保留，并加上 `validTo`；新记录获得新的 id 和 `validFrom`。id 永远不会被重新用于另一个对象，所以多年前
   保存的 id 仍然能找到它当时所指的东西。
2. 不指定日期时，查询按今天作答：按 id 查询返回今天适用的版本（对已终止的记录则返回最后一个版本），而
   `getCantonsForMunicipality` 之类的列表只返回今天适用的内容。传入 `{ on }` 时，两者都按那一天作答。
3. 更新日志会列出每个新 id 及其替代的 id。

仅仅改名（例如拼写更正）不会改变 id。2025 年 1 月 1 日之前的历史数据尚未收录
（[#27](https://github.com/pieterjanscheir/belgica/issues/27)）：查询更早的日期会抛出 `RangeError`，而不是用今天的
划分来作答。

## id 是不透明的 {#ids-are-opaque}

id 是键，不是格式。`court-of-first-instance-luxembourg-marche-en-famenne` 无法拆回类型、地名和分部，因为类型、地名
和语言后缀都使用同样的连字符。不要解析 id：id 的每个组成部分同时也是一个字段（`type`、`court`、`canton`、
`arrondissement`），schema 和测试检查的正是这些字段。

## 稳定性 {#stability}

id 是公共 API。新增记录是 minor 版本，修正某个值是 patch 版本，删除或重命名 id 是 major 版本。0.3.0 版在这个包还
没有用户之前，就用这套方案取代了早先的 PascalCase id（`VredegerechtGent1`、`EastFlanders`）；
[更新日志](./changelog)列出了对应关系。

这个承诺是经过检查的，而不只是口头承诺。`ids.lock.json` 按数据集列出这个包发布过的每个 id；`pnpm generate` 会把
新 id 加进去，但从不删除；当数据中缺少某个已锁定的 id 时，`test/ids.test.ts` 就会失败。因此，无论是读取了改了标题
的页面的抓取程序、重新生成的 canton 列表，还是手工编辑，都无法在不被发现的情况下删除或重命名 id：每周的数据
pull request 会失败，然后由人在解析器中把新名称映射到现有 id，或者用 `validTo` 结束该记录。把一个 id 移出锁定
文件是一个刻意的操作，只能在 major 版本中进行，并在更新日志中写明该 id 及其替代者。
