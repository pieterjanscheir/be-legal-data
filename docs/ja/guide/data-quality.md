# データの品質と鮮度 {#data-quality-freshness}

法務リファレンスデータは気づかないうちに古くなります。新しい利率が公表され、裁判所が移転し、
法律が二つの canton を統合します。このページでは、パッケージがどうやって変化に追随しているか、
そして各データセットをどこまで信頼できるかを説明します。

## 各データセットの出典 {#where-each-dataset-comes-from}

| データセット                     | 出典                                                              | 作り方                                     | 変わるとき                                               | 照合の間隔  |
| -------------------------------- | ----------------------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------- | ----------- |
| 管轄区域、arrondissement         | Gerechtelijk Wetboek / Code judiciaire、附属書 第 4〜5 条         | 手作業                                     | 法律が司法の地図を引き直したとき（まれ。最後は 2014 年） | 24 か月ごと |
| Canton                           | Gerechtelijk Wetboek / Code judiciaire、附属書 第 1 条（nl + fr） | 生成：`pnpm build:cantons`                 | 法律が附属書を改正したとき、自治体が合併したとき         | 12 か月ごと |
| Canton の境界                    | NGI（geo.be）                                                     | 毎週：スナップショット + `pnpm build:data` | NGI が新しい版を公表したとき                             | 毎週        |
| 自治体                           | Statbel のオープンデータ                                          | 生成：`pnpm build:cantons`                 | 自治体が合併したとき（2019 年、2025 年）                 | 12 か月ごと |
| 地域、州                         | Statbel の REFNIS コード一覧                                      | 毎週：スナップショット + `pnpm build:data` | Statbel が登録簿を変更したとき（最後は 1995 年）         | 毎週        |
| 裁判所                           | tribunaux-rechtbanken.be                                          | 毎週：スナップショット + `pnpm build:data` | 裁判所が移転したとき、連絡先や開庁時間を変更したとき     | 毎週        |
| 刑務所                           | justitie.belgium.be                                               | 毎週：スナップショット + `pnpm build:data` | 刑務所が開設・閉鎖されたとき、連絡先を変更したとき       | 毎週        |
| Justitiehuis / maison de justice | vlaanderen.be、maisonsdejustice.be                                | 毎週：スナップショット + `pnpm build:data` | 施設が移転したとき、連絡先を変更したとき                 | 毎週        |
| 郵便番号                         | Statbel の変換表                                                  | 毎週：スナップショット + `pnpm build:data` | Statbel が新しい表を公表したとき（合併、新しいコード）   | 毎週        |
| 利率                             | FOD Financiën、Belgisch Staatsblad                                | 手作業                                     | 毎年（法定利率）と半期ごと（商取引）                     | 6 か月ごと  |

生成されるデータセットは決して手で編集しません。`pnpm build:cantons` は公式の条文を解析し、
オランダ語版とフランス語版が一致し、かつすべての自治体がカバーされていない限り、何も書き出し
ません。`pnpm build:data` は、位置づけられないページがある場合、裁判所のない canton がある場合、
NGI のファイルに境界のない canton がある場合に処理を拒否します。

## データの作られ方 {#how-the-data-is-built}

```
official site ──fetch──> snapshots (sources branch) ──parse──> data/*.json ──> pull request
```

1. **取得。** 毎週月曜日に [sources ワークフロー](https://github.com/pieterjanscheir/belgica/actions/workflows/sources.yml)
   が情報源のすべてのページを取得します（`scripts/sources`）。取得は控えめに行い、サイトごとに
   1 秒あたり 1 リクエスト、プロジェクト名を明記した user agent を使います。各ページは、何を
   いつ取得したかの索引とその内容のハッシュとともに `sources` ブランチに保存します。ページを
   再び保存するのは内容が変わったときだけなので、ブランチの履歴を見れば何がどの日に変わったかが
   わかります。取得に失敗したページ（サーバーエラー、404）は最後の正常なスナップショットを保持
   したまま実行を止め、issue を作成します。不完全な状態からデータを作り直すことはありません。
   情報源からリンクされなくなったページはスナップショットから削除されますが、そのレコードは
   データに残り、`validTo`（それを見つけられなかったチェックの前日）をつけて廃止扱いになります。
   そのため id は引き続き使え、それより前の日付で検索すれば見つかります。新たに現れたページには
   `validFrom` つきのレコードが作られます。
2. **解析。** `pnpm build:data` がスナップショットを読み込み（`scripts/parse`）、裁判所、刑務所、
   justitiehuis / maison de justice、canton の境界を書き出します。読み取れなかったものを報告し、
   位置づけられないページがあると失敗します。
3. **テスト。** ワークフローが新しいデータに対して型チェックとテストを実行します。
4. **レビュー。** データが変わっていれば、差分と読み取れなかった値の一覧を含む pull request を
   一つ作成または更新します。人が情報源と照らし合わせて確認し、マージします。

自分で実行するには、`pnpm fetch:sources`（`.sources/` に書き出します）の後に `pnpm build:data`
を実行します。

canton と自治体は `pnpm build:cantons` で手動で作り直します。Belgisch Staatsblad / Moniteur belge
（官報）のサイトが GitHub のサーバーからのアクセスを拒否するためです
（[#52](https://github.com/pieterjanscheir/belgica/issues/52)）。

## 自動チェック {#automatic-checks}

### 変更のたびに（CI） {#on-every-change-ci}

- **スキーマ検証**：すべてのデータファイルが自身の [JSON Schema](./schema) に適合すること。
- **整合性**：id が一意で正しい形式であること。すべての参照（arrondissement、canton、自治体、
  裁判所、境界）が実在するレコードを指していること。すべての canton に境界が一つあり、それが
  ベルギー国内の有効な GeoJSON で、重なりなく合計すると国土の面積になること。すべての自治体が
  ちょうど一つの canton に属するか、複数の canton に分かれていること。すべての canton が自分の
  arrondissement の州の範囲内にあること。すべての canton に vredegerecht / justice de paix が
  ちょうど一つあること。すべての部が自分の裁判所と同じ種類と管轄区域を持つこと。各種類の裁判所の
  数が法律の定めるとおりであること。すべての canton が各種類の裁判所のどれか一つ（ブリュッセルでは
  言語ごとに一つ）の管轄に入り、裁判所の canton がその裁判所の arrondissement と管轄区域の中に
  あること。
- **パーサー**：実際のページを切り詰めたコピー（`test/fixtures/sources`）でエンドツーエンドに
  テストし、各読み取り処理（電話番号、IBAN、住所、開庁時間）は、情報源に現れる形式と、拒否
  しなければならない形式でテストします。
- **利率**：期間が並べ替えられ、決して重ならず、隙間がないこと。法定利率は暦年ごと、商取引の
  利率は半期ごとであること。2013〜2015 年の契約日による利率はその期間にのみ現れること。
- **連絡先データ**：すべての IBAN が ISO 13616 のチェックサムを通ること。電話番号が E.164 形式の
  ベルギーの番号であること。メールアドレスが小文字であること。開庁時間が `opening_hours` の構文に
  合っていること。
- **コード**：厳格な TypeScript（unchecked index access と exact optional properties を含む）、
  型情報を使うルールの ESLint、Prettier、`src/` のテストカバレッジ 100 %。
- **パッケージング**：ビルドしたパッケージが、すべての entry point から、`import` でも
  `require()` でも、Node 22.12、22、24、26 で読み込めること。`publint` と `arethetypeswrong` が
  `exports` と型宣言をチェックします。

### 毎週（定期実行） {#every-week-scheduled}

[鮮度ワークフロー](https://github.com/pieterjanscheir/belgica/actions/workflows/freshness.yml)は
毎週月曜日に実行され、問題を見つけると
[`data-freshness`](https://github.com/pieterjanscheir/belgica/issues?q=label%3Adata-freshness)
ラベルつきの issue を作成します。

- **利率の欠落**：今日の法定利率または商取引の利率がない、あるいは今後 2 週間の商取引の利率が
  ない（FOD Financiën は半期が始まる前に公表します）。
- **照合期限切れ**：`datapackage.json` にあるデータセットの `lastReviewed` の日付が、その
  `reviewEveryMonths` よりも古い。
- **リンク切れの情報源**：`datapackage.json` にある公式の情報源の URL が応答しなくなった。

自分で実行するには `pnpm test:freshness` を使います（URL もチェックするには
`FRESHNESS_ONLINE=1` を付けます）。

## 値の読み方 {#how-to-read-a-value}

- **値がないことはゼロではありません。** `getInterestRate` は利率の記録がない日には推測せず
  `null` を返します。情報源が提供していないフィールド（裁判所の住所、機械可読な開庁時間）は、
  埋めずに欠落させています。どちらにも対処してください。
- **早すぎる日付はエラーです。** データセットのカバー範囲より前の日付で検索すると `RangeError` を
  投げます。データからは答えられず、今日の答えが正しい答えに見えてしまうからです。
- **連絡先データは最も不安定です。** 電話番号、メールアドレス、開庁時間は予告なく変わります。
  すべてのレコードは、どのページからいつ読み取ったか（`sources`）を記載しています。重要な場合は
  裁判所のページ（`website`）を確認してください。
- **法令の条文が優先します。** 分割された自治体については、canton の `territory` が法律自体の
  条文そのままです。要約や NGI の[境界](/ja/data/canton-boundaries)が条文と食い違う場合は、
  条文が正しいとみなします。

## 誤りを報告する {#reporting-a-mistake}

レコードの id と公式の情報源へのリンクを添えて、
[データ修正の issue を作成](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)
してください。修正はパッチバージョンとしてリリースされます。
