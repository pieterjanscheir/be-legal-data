# 参与贡献 {#contributing}

## 更新数据 {#updating-data}

法院、监狱、justitiehuizen / maisons de justice 和 canton 边界每周根据官方来源构建（[方法](./data-quality#how-the-data-is-built)）：
不要手工编辑它们。请修复 `scripts/parse` 中的解析器；如果是来源本身有错，请报告给相应法院。每周的 pull request 和
其他 pull request 一样需要审查：合并前请把 diff 与来源对照。

对于手工维护的数据集（司法辖区、arrondissement、利率）：

1. 编辑 `data/` 中的 JSON。保留现有的 id：各项目都保存着它们。
2. 如果你已对照来源核对过该数据集，请更新 `datapackage.json` 中它的 `lastReviewed`。
3. 运行 `pnpm check`：重新生成 id 类型和 schema，进行类型检查、lint 和格式检查、构建、带覆盖率的测试，以及包 lint。
   如果生成的文件没有提交，它会失败。
4. 在 `CHANGELOG.md` 的 Unreleased 下添加一行，然后提交（包括 `schema/`、`src/ids.generated.ts` 和
   `ids.lock.json`）。构建产物（`dist/`）不提交：它在每次发布时构建并发布到 npm。

已经发布的 id 会一直保留：`ids.lock.json` 列出了所有 id，数据中缺少任何一个时测试都会失败。如果来源改了某条记录的
名称，请在解析器中把新名称映射到现有 id；如果记录已终止，请保留它并加上 `validTo`。见
[标识符](./identifiers#stability)。

### Canton 和市镇 {#cantons-and-municipalities}

`data/cantons.json` 和 `data/municipalities.json` 是生成的；不要手工编辑。请运行 `pnpm build:cantons`（需要网络访问和
`unzip`）。它会读取：

- Gerechtelijk Wetboek / Code judiciaire（司法法典）的附件“Gebiedsomschrijving en zetel van hoven en rechtbanken”
  （[ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)），荷兰语版和
  法语版；
- Statbel 按市镇统计的人口文件，用于获取现有市镇及其 REFNIS 代码。

它分别解析荷兰语和法语文本，只有当两者一致、并且每个市镇都恰好被覆盖一次（或分属多个 canton）时才会写入。附件中
使用而 Statbel 不使用的外来地名（`Gembloers`、`Saint-Nicolas`……）、附件中的拼写错误，以及它无法区分的边界描述，
都列在脚本开头。

在法律修改附件或市镇合并之后，请重新运行它。canton id 采用当地语言（弗拉芒大区和布鲁塞尔用荷兰语，瓦隆大区用
法语，Eupen 一带用德语）；canton `x` 的治安法院的 id 为 `justice-of-the-peace-x`，并通过其 `canton` 字段关联到该
canton。

### 抓取的数据集 {#scraped-datasets}

```bash
pnpm fetch:sources            # 把所有来源抓取到 .sources/（约 20 分钟，礼貌抓取）
pnpm fetch:sources courts     # 或只抓取一个来源
pnpm build:data               # 根据 .sources/ 重建法院、监狱、justitiehuizen、邮政编码、大区和省
```

canton 边界来自 NGI 的 GeoPackage（来源 `ngi`），用 Node 自带的 SQLite 读取；当 NGI 重命名某个 canton 时，请在
`scripts/parse/boundaries.ts` 的 `CANTON_ALIASES` 中把它的代码映射到对应的 id。

也可以不抓取，直接检出最新的快照：`git worktree add .sources origin/sources`。

每个来源是 `scripts/sources/catalog.ts` 中的一个遍历；解析器在 `scripts/parse` 中读取它的快照。当某个网站更改了
页面结构时，`test/parse` 中的解析器测试（基于 `test/fixtures/sources` 中真实页面的精简副本）会显示哪里出了问题。

### 新的利率 {#new-interest-rates}

- **商业交易利率**：FOD Financiën / SPF Finances（联邦财政部）按半年公布。添加一个期间，包含 `from`、`to`、`rate`，
  并在 `note` 中写上 Staatsblad 的公布日期。
- **法定利率**：按日历年公布。为该年添加一个期间。

## 添加数据集 {#adding-a-dataset}

每个数据集都按同样的方式处理，这样用户才能依赖它：

1. **数据**：`data/<name>.json`，一个记录数组。每个值都来自官方来源。
2. **id**：遵循[标识符规则](./identifiers)：有官方代码就用官方代码，否则用由当地语言名称生成的小写 kebab-case
   （`scripts/id.ts`）。
3. **关联而不是复制**：通过 id 引用 arrondissement、canton 和市镇，并复用共享类型（`Translated`、`Address`、
   `Contact`、`SourceRef`）。
4. **来源**：每条记录带有 `sources: [{ url, retrieved }]`，并在 `datapackage.json` 中添加一个条目，写明数据集的
   来源、许可、`lastReviewed` 和 `reviewEveryMonths`。
5. **类型和辅助函数**：`src/<name>.ts`，从 `src/index.ts` 导出，并在 `tsup.config.ts` 和 `package.json` 的
   `exports` 中添加 entry point。
6. **Schema**：把文件类型添加到 `scripts/schema-types.ts` 和 `scripts/build-schemas.ts`。
7. **来源和解析器**：在 `scripts/sources/catalog.ts` 中添加一个抓取官方页面的遍历，并在 `scripts/parse` 中添加一个
   根据快照构建文件的解析器，附带 fixture 和测试。它只读取能够确定读对的内容，其余的予以报告。
8. **测试**：id 唯一、引用都能解析，并且数量与官方来源给出的一致。
9. **文档**：在 `docs/data/` 下添加一个页面，说明它的用途、来源和更新方式，并附字段表。

## 检查 {#checks}

| 命令                        | 作用                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm check`                | CI 运行的全部内容：`generate`、`typecheck`、`lint`、`build`、`test:coverage`、`test:package`、`lint:package`，并检查生成的文件已提交 |
| `pnpm test`                 | 针对源码的单元测试、完整性测试、schema 测试和类型测试（无需构建）                                                                    |
| `pnpm test:package`         | 用 `import` 和 `require()` 对构建后的包做冒烟测试：请先运行 `pnpm build`                                                             |
| `pnpm test:coverage`        | 同上，`src/` 的覆盖率低于 100 % 时失败                                                                                               |
| `pnpm lint` / `pnpm format` | ESLint 和 Prettier：检查 / 修复                                                                                                      |
| `pnpm generate`             | 根据数据和类型重新生成 `src/ids.generated.ts`（id 类型）和 `schema/`，并把新 id 加入 `ids.lock.json`                                 |
| `pnpm lint:package`         | 对打包后的包运行 `publint` 和 `arethetypeswrong`                                                                                     |
| `pnpm test:freshness`       | 基于日期的检查：缺失的利率、逾期的核对。不属于 `check`；设置 `FRESHNESS_ONLINE=1` 还会检查来源 URL                                   |
| `pnpm fetch:sources`        | 把官方来源抓取到 `.sources/`                                                                                                         |
| `pnpm build:data`           | 根据 `.sources/` 重建法院、监狱、justitiehuizen / maisons de justice、邮政编码、大区、省和 canton 边界                               |
| `pnpm build:csv`            | 把数据以 CSV 表格写入 `csv/`                                                                                                         |

## 发布 {#releasing}

1. 把 `CHANGELOG.md` 中 Unreleased 下的条目移到新版本下。
2. 提升 `package.json` 中的 `version` 并提交。
3. 打 tag 并推送：`git tag v0.3.0 && git push && git push --tags`。

release workflow 会运行 `pnpm check`，把该 tag 连同 provenance 发布到 npm，并创建一个附带数据、schema 和 CSV 表格的
GitHub release。tag 必须与 `version` 一致。

## 本网站 {#this-website}

网站位于 `docs/`，用 [VitePress](https://vitepress.dev) 构建。交互式表格直接导入包自身的 `src/` 和 `data/`，所以它们
展示的始终是仓库中的数据。

```bash
pnpm docs:dev      # 带热重载的本地服务器
pnpm docs:build    # 静态网站输出到 docs/.vitepress/dist
pnpm docs:preview  # 预览构建好的网站
```

每次推送到 `main` 都会把它部署到 GitHub Pages。CI 会在每个 pull request 上构建网站，所以损坏的页面在合并前就会被
发现。

### 翻译 {#translations}

`docs/` 中的英文页面是权威来源。其他每种语言在自己的文件夹下都有相同的目录结构：荷兰语（`docs/nl/`）和法语
（`docs/fr/`），以及德语、西班牙语、意大利语、葡萄牙语、波兰语、土耳其语、阿拉伯语、乌克兰语、中文和日语
（`docs/de/`、`docs/es/` 等）。它们都是英文页面的翻译，在英文页面变化后再更新。当你修改某个英文页面时，请同时修改
`docs/nl/` 和 `docs/fr/` 中的同一页面，或者在 pull request 中说明翻译暂时落后；其他语言可以落后一个版本。这些其他
语言的主题和交互组件中的文字位于 `docs/.vitepress/locales/`。

代码、id、字段名和官方名称在每种语言中都保持原样，每个标题都保留英文锚点（`## 标题 {#english-anchor}`），这样页面间
的链接和语言切换才能正常工作。比利时的机构名称和法律术语保留其官方的荷兰语或法语名称（或比利时公布的德语名称），
而不是新造的译名：中文页面写 vredegerecht / justice de paix，而不是为它编一个词。更新日志只用英文维护。
