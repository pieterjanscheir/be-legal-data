# コントリビュート {#contributing}

## データを更新する {#updating-data}

裁判所、刑務所、justitiehuis / maison de justice、canton の境界は、毎週公式の情報源から作られて
います（[仕組み](./data-quality#how-the-data-is-built)）。手で編集しないでください。`scripts/parse`
のパーサーを修正するか、情報源自体が誤っている場合は裁判所に報告してください。週次の pull request
も他の pull request と同じようにレビューします。マージする前に差分を情報源と比べてください。

手作業で管理しているデータセット（管轄区域、arrondissement、利率）の場合：

1. `data/` の JSON を編集します。既存の id は変えないでください。各プロジェクトが保存しています。
2. データセットを情報源と照合した場合は、`datapackage.json` でそのデータセットの `lastReviewed`
   を更新します。
3. `pnpm check`：id の型とスキーマの再生成、型チェック、lint とフォーマットのチェック、ビルド、
   カバレッジつきのテスト、パッケージの lint を行います。生成されたファイルがコミットされて
   いないと失敗します。
4. `CHANGELOG.md` の Unreleased の下に 1 行追加し、コミットします（`schema/`、
   `src/ids.generated.ts`、`ids.lock.json` も含めます）。ビルド成果物（`dist/`）はコミットしません。
   release ごとにビルドされ、npm に公開されます。

一度公開された id は残ります。`ids.lock.json` がそのすべてを列挙しており、データから一つでも
消えるとテストが失敗します。情報源がレコードの名前を変えた場合は、パーサーで新しい名称を既存の
id に対応づけてください。レコードが終了した場合は、`validTo` をつけて残します。
[識別子](./identifiers#stability)を参照してください。

### Canton と自治体 {#cantons-and-municipalities}

`data/cantons.json` と `data/municipalities.json` は生成されるファイルなので、手で編集しないで
ください。`pnpm build:cantons` を実行します（ネットワーク接続と `unzip` が必要です）。読み込むのは
次のものです。

- Gerechtelijk Wetboek / Code judiciaire の附属書「Gebiedsomschrijving en zetel van hoven en
  rechtbanken」（[ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)）
  のオランダ語版とフランス語版
- 現在の自治体と REFNIS コードを得るための、Statbel の自治体別人口ファイル

オランダ語とフランス語の条文を別々に解析し、両者が一致し、かつすべての自治体がちょうど一度
カバーされている（または複数の canton に分かれている）場合にのみ書き出します。附属書は使うが
Statbel は使わない外名（`Gembloers`、`Saint-Nicolas` など）、附属書の誤字、区別のつかない境界の
記述は、スクリプトの冒頭に列挙しています。

法律が附属書を改正したときや自治体が合併したときは、再実行してください。canton の id は現地語に
従います（フランデレンとブリュッセルではオランダ語、ワロン地域ではフランス語、Eupen 周辺では
ドイツ語）。canton `x` の vredegerecht / justice de paix の id は `justice-of-the-peace-x` で、
その `canton` フィールドを通じて canton にリンクします。

### スクレイピングで作るデータセット {#scraped-datasets}

```bash
pnpm fetch:sources            # すべての情報源を .sources/ へ（控えめに取得するため約 20 分）
pnpm fetch:sources courts     # または一つの情報源だけ
pnpm build:data               # .sources/ から裁判所、刑務所、justitiehuis / maison de justice、郵便番号、地域、州を作り直す
```

canton の境界は NGI の GeoPackage（情報源 `ngi`）から、Node 組み込みの SQLite で読み込みます。
NGI が canton の名前を変えた場合は、`scripts/parse/boundaries.ts` の `CANTON_ALIASES` でその
コードを id に対応づけてください。

取得する代わりに最新のスナップショットをチェックアウトすることもできます：
`git worktree add .sources origin/sources`。

情報源は `scripts/sources/catalog.ts` の walk として定義し、パーサーは `scripts/parse` でその
スナップショットを読み込みます。サイトのマークアップが変わったときは、`test/parse` のパーサー
テスト（`test/fixtures/sources` にある実際のページを切り詰めたコピーを使用）で何が壊れたかが
わかります。

### 新しい利率 {#new-interest-rates}

- **商取引**：FOD Financiën が半期ごとに利率を公表します。`from`、`to`、`rate` と、`note` に
  Staatsblad の日付を入れた期間を追加します。
- **法定利率**：暦年ごとに公表されます。その年の期間を追加します。

## データセットを追加する {#adding-a-dataset}

利用者が安心して頼れるように、どのデータセットも同じように扱います。

1. **データ**：`data/<name>.json`、レコードの配列。すべての値は公式の情報源から。
2. **id**：[識別子のルール](./identifiers)に従います。公式コードがあればそれを、なければ現地語の
   名称から作った小文字の kebab-case を使います（`scripts/id.ts`）。
3. **コピーではなくリンク**：arrondissement、canton、自治体は id で参照し、共通の型（`Translated`、
   `Address`、`Contact`、`SourceRef`）を再利用します。
4. **出典**：各レコードに `sources: [{ url, retrieved }]` を付け、`datapackage.json` にデータセットの
   出典、ライセンス、`lastReviewed`、`reviewEveryMonths` を記した項目を追加します。
5. **型とヘルパー**：`src/<name>.ts` を作って `src/index.ts` から export し、`tsup.config.ts` と
   `package.json` の `exports` に entry point を追加します。
6. **スキーマ**：`scripts/schema-types.ts` と `scripts/build-schemas.ts` にファイルの型を追加します。
7. **情報源とパーサー**：公式のページを取得する walk を `scripts/sources/catalog.ts` に、
   スナップショットからファイルを作るパーサーを fixture とテストつきで `scripts/parse` に追加
   します。パーサーは確実に読み取れるものだけを読み取り、残りは報告します。
8. **テスト**：id が一意であること、参照が解決できること、件数が公式の情報源と一致すること。
9. **ドキュメント**：`docs/data/` の下に、そのデータが何に役立つか、出典と更新、フィールドの表を
   記したページを作ります。

## チェック {#checks}

| コマンド                    | 内容                                                                                                                                                               |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `pnpm check`                | CI が実行するすべて：`generate`、`typecheck`、`lint`、`build`、`test:coverage`、`test:package`、`lint:package`、および生成ファイルがコミットされているかのチェック |
| `pnpm test`                 | ソースに対するユニットテスト、整合性テスト、スキーマテスト、型テスト（ビルド不要）                                                                                 |
| `pnpm test:package`         | ビルドしたパッケージを `import` と `require()` で読み込むスモークテスト。先に `pnpm build` を実行                                                                  |
| `pnpm test:coverage`        | 同上。`src/` のカバレッジが 100 % 未満なら失敗                                                                                                                     |
| `pnpm lint` / `pnpm format` | ESLint と Prettier：チェック / 修正                                                                                                                                |
| `pnpm generate`             | データと型から `src/ids.generated.ts`（id の型）と `schema/` を再生成し、新しい id を `ids.lock.json` に追加                                                       |
| `pnpm lint:package`         | パッケージ化したものに対する `publint` と `arethetypeswrong`                                                                                                       |
| `pnpm test:freshness`       | 日付に基づくチェック：利率の欠落、照合期限切れ。`check` には含まれない。`FRESHNESS_ONLINE=1` で情報源の URL もチェック                                             |
| `pnpm fetch:sources`        | 公式の情報源を `.sources/` に取得                                                                                                                                  |
| `pnpm build:data`           | `.sources/` から裁判所、刑務所、justitiehuis / maison de justice、郵便番号、地域、州、canton の境界を作り直す                                                      |
| `pnpm build:csv`            | データを CSV の表として `csv/` に書き出す                                                                                                                          |

## リリース {#releasing}

1. `CHANGELOG.md` の Unreleased の項目を新しいバージョンの下に移します。
2. `package.json` の `version` を上げてコミットします。
3. tag を付けて push します：`git tag v0.3.0 && git push && git push --tags`。

release ワークフローが `pnpm check` を実行し、provenance つきで tag を npm に公開し、データ、
スキーマ、CSV の表を添付した GitHub release を作成します。tag は `version` と一致している必要が
あります。

## このウェブサイト {#this-website}

サイトは `docs/` にあり、[VitePress](https://vitepress.dev) でビルドしています。インタラクティブな
表はパッケージ自身の `src/` と `data/` を import しているので、常にリポジトリ内のデータを表示します。

```bash
pnpm docs:dev      # ホットリロードつきのローカルサーバー
pnpm docs:build    # docs/.vitepress/dist に静的サイトを生成
pnpm docs:preview  # ビルドしたサイトを配信
```

`main` に push するたびに GitHub Pages にデプロイされます。CI はすべての pull request でサイトを
ビルドするので、壊れたページはマージ前に見つかります。

### 翻訳 {#translations}

`docs/` にある英語のページが正です。他の言語はすべて、それぞれのフォルダーの下に同じ構成を
持っています。オランダ語（`docs/nl/`）とフランス語（`docs/fr/`）、そしてドイツ語、スペイン語、
イタリア語、ポルトガル語、ポーランド語、トルコ語、アラビア語、ウクライナ語、中国語、日本語
（`docs/de/`、`docs/es/` など）です。これらは英語のページの翻訳であり、英語のページが変わった
後に更新されます。英語のページを変更するときは、`docs/nl/` と `docs/fr/` の同じページも変更するか、
翻訳が遅れていることを pull request に書いてください。その他の言語は 1 リリース分遅れることが
あります。それらの言語でのテーマとインタラクティブなコンポーネントの文言は
`docs/.vitepress/locales/` にあります。

コード、id、フィールド名、公式の名称はどの言語でもそのまま残し、すべての見出しは英語のアンカー
（`## Heading {#english-anchor}`）を保ちます。そうすることで相互リンクと言語の切り替えが動作し
続けます。ベルギーの機関や法律用語は、造語の訳語ではなく、オランダ語またはフランス語（ベルギーが
公表している場合はドイツ語）の公式名称を使います。たとえば中国語のページでも、それを指す造語では
なく vredegerecht / justice de paix と書きます。変更履歴は英語でのみ管理しています。
