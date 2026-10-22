# 識別子 {#identifiers}

すべてのレコードには `id` があります。他のレコードや、あなたのデータベース、URL がそれを参照する
ので、id は一度正しく決めたら二度と変えてはいけません。このページでは、そのルールと、それぞれの
ルールが存在する理由、そして id が指すものを法律が変えたときに何が起きるかを説明します。

## ルール {#the-rules}

1. **すべてのレコードに `id` フィールドがあり**、データセット内で一意です。汎用的なコード
   （インデックス、キャッシュ、フォーム）はすべてのデータセットを同じように扱えます。
2. **すべてのレコードをカバーしているなら、公式コードを優先します。** 当局がデータセットの全
   レコードにコードを割り当てている場合、id はそのコード _そのもの_ です。自治体は Statbel の
   REFNIS コードを使います（Gent は `44021`）。一部のレコードしかカバーしないコードは、代わりに
   フィールドとして保持します。裁判所の ECLI コードは `ecli` に、フランデレンの justitiehuis の
   OVO 番号は `ovo` に入っています（[理由](#why-not-the-official-court-codes)を参照）。
3. **それ以外は小文字の kebab-case の ASCII**：`^[a-z0-9]+(-[a-z0-9]+)*$`。
   [`scripts/id.ts`](https://github.com/pieterjanscheir/belgica/blob/main/scripts/id.ts) で生成し、
   アクセント記号を取り除き、英字と数字以外はすべて一つのハイフンにします。
   `Merelbeke-Melle` → `merelbeke-melle`、`Braine-l'Alleud` → `braine-l-alleud`、
   `Liège` → `liege`。
4. **現地語の公式名称から作ります**：フランデレンではオランダ語、ワロン地域ではフランス語、
   Eupen 周辺ではドイツ語。ブリュッセルは公式には二言語なので、一つに固定する必要があり、
   オランダ語を選んでいます。
5. **番号は接尾辞にします**：複数の canton がある地名は `gent-1` … `gent-5` となります。
6. **裁判所は `type` + 地名です**：`justice-of-the-peace-gent-1`、`court-of-appeal-liege`。
   vredegerecht / justice de paix は自分の canton の id を使います。ブリュッセルにある同じ種類の
   二つの裁判所（言語ごとに一つ）には `-nl` または `-fr` を付けます（`police-court-brussel-fr`）。
   部（afdeling / division）や所在地は、裁判所の id に自分の地名を付け足します
   （`enterprise-court-gent-brugge`）。Gent に vredegerecht、ondernemingsrechtbank、
   arbeidsrechtbank があっても、この接頭辞のおかげで id は一意になります。しかも接頭辞は
   レコードの `type` とまったく同じなので、二つ目の語彙は必要ありません。
7. **刑務所と justitiehuis / maison de justice は、冠詞を除いた現地語の名称です**：
   `gevangenis-gent`、`prison-lantin`、`justitiehuis-gent`、`maison-justice-arlon`。名称自体が
   何の施設かを表しており、同じ都市にある二つの施設（Leuven の中央刑務所と補助刑務所）も名称で
   区別できます。
8. **リンクはフィールドであり、決して文字列から導き出しません。** vredegerecht / justice de paix
   には `canton` フィールドがあり、canton は `{ municipality }` を列挙し、arrondissement には
   `judicialArea` があります。それぞれが参照先レコードの id を持ち、フィールド名は参照先の
   データセットにちなみます。

これらはすべて、テスト（`test/ids.test.ts`）と、有効な id を列挙している
[JSON Schema](./schema) によって強制されるので、参照先のないリンクは検証に失敗します。

## id の一覧 {#the-ids}

| データセット                     | 例                                                                                                                        | ルール                   |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 管轄区域                         | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                                                                           | 現地語の名称             |
| Arrondissement                   | `oost-vlaanderen`, `brabant-wallon`, `eupen`                                                                              | 現地語の名称             |
| Canton                           | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1`                                                  | 現地語の名称 + 番号      |
| Canton の境界                    | `gent-1`：canton ごとに一つの境界。canton の id を持ち、`canton` がリンク                                                 | canton の id             |
| 自治体                           | `44021`, `21004`                                                                                                          | REFNIS コード            |
| 州                               | `10000`, `40000`                                                                                                          | REFNIS コード            |
| 地域                             | `02000`, `03000`, `04000`                                                                                                 | REFNIS コード            |
| 郵便番号                         | `9000-44021`, `1040-21005`                                                                                                | 郵便番号 + REFNIS コード |
| 裁判所                           | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`, `police-court-brussel-fr`, `police-court-eupen-sankt-vith` | 種類 + 地名              |
| 刑務所                           | `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                               | 現地語の名称             |
| Justitiehuis / maison de justice | `justitiehuis-gent`, `maison-justice-arlon`                                                                               | 現地語の名称             |
| 利率                             | `legal`, `commercial`                                                                                                     | 固定のキー               |

## これらを選んだ理由 {#why-these-choices}

**なぜ kebab-case なのか。** id は URL（`/cantons/gent-1`）、ファイル名、CSS クラス、
データベースのキー、ログ行に入り込みます。小文字にすれば、大文字小文字を区別しないシステム
（macOS や Windows のファイルシステム、多くのデータベースの照合順序）での衝突を避けられます。
`Gent1` と `gent1` はデータ上は二つの id でも、ディスク上では一つのファイルになってしまいます。
ハイフンを使えば大文字なしでも単語の区切りが読みやすく、この文字セットはどこでもエスケープが
不要です。

**なぜ数値や UUID ではなく読める id なのか。** リファレンスデータセットは人が読むものです。
データベースの行やエラーメッセージに `justice-of-the-peace-gent-1` とあれば、それが何かが
わかります。id は数値と同じくらい安定しています。id が変わるのは、それが指すものを法律が変えた
ときだけで（後述）、その場合は新しい id になるのが正しい結果です。

**なぜ英語ではなく現地語なのか。** 英語名があるのはごく一部の地名（Ghent、Antwerp、Liege）だけ
で、162 の canton にはないため、英語の id にするとルールが二つになってしまいます。現地語の名称は
機関自身が使っている名称でもあり、公式の文書にも載っています。

**なぜ公式コードなのか。** REFNIS は Statbel、各地域、そしてほぼすべてのベルギーのデータセットが
使っているコードです。そのコードを id にすれば、どのデータセットとも対応表なしで canton や裁判所と
結合できます。

**なぜ郵便番号には二つのコードを使うのか。** 郵便番号だけではレコードを特定できません。`1040` は
Brussel と Etterbeek の両方に属し、それぞれの組が独自の有効期間を持つ独立したレコードです。公式
コードの組 `1040-21005` は一意で、Statbel の表がその組を変えるまでは変わりません。そしてそのとき
こそ新しいレコードが正しいのです。ルール 8 のとおり、自治体はフィールド（`municipality`）にも
なっています。id はキーであり、分割するためのものではありません。

**なぜ裁判所の id に `type` を入れるのか。** 一つの地名に複数の裁判所があり、裁判所の種類は今後
増えていきます（politierechtbank、arbeidsrechtbank、rechtbank van eerste aanleg など）。裁判所が
何であるかは裁判所自身のフィールドが示すので、id は一意で見分けがつけば十分であり、種類は
その両方を満たします。

**なぜ裁判所の公式コードを使わないのか。** 裁判所には公式コードが二つありますが、どちらも
すべての裁判所をカバーしていません。ECLI コード（Gent の hof van beroep なら `HBGNT`）は裁判所
ごと・言語ごとに存在し、部ごとにはありません。また vredegerecht / justice de paix の公表された
判決には一つも現れません。企業番号（KBO）は FOD Justitie / SPF Justice のもので、その事業所
単位は裁判所ではなく建物に対応しており、裁判所が移転すると変わります。すべてのレコードに当て
はまるルール一つのほうがルール二つよりも優れているので、ECLI コードはフィールド（`ecli`）とし、
id はルール 6 に従います。

**なぜリンクを明示するのか。** 旧方式では、`Vredegerecht` と canton の id を連結して裁判所の id を
作っていました。これは関係を文字列の形式に隠すことであり、一つの裁判所が二つの canton を担当
したり、名称が変わったりした瞬間に壊れます。`canton` フィールドならスキーマとテストで検証され、
双方向にたどることができます。

## TypeScript では {#in-typescript}

すべてのデータセットには生成された id の型（`CantonId`、`CourtId`、`MunicipalityId`、
`ProvinceId`、`RegionId`、`ArrondissementId`、`JudicialAreaId`、`PrisonId`、`HouseOfJusticeId`、
`PostalCodeId`）があり、`pnpm build:ids` でデータから再生成されます。

```ts
import { getCanton, type CantonId } from 'belgica'

getCanton('gent-1') // Canton：既知の id なら必ずレコードが見つかる
getCanton(userInput) // Canton | undefined：それ以外の文字列では見つからないことがある

const id: CantonId = 'gent1' // コンパイルエラー：canton の id ではない
```

保存する値には id の型を使ってください。そうすれば、タイプミスや削除された id にアップグレード
時に気づけます。

## 法律が id を変えるとき {#when-the-law-changes-an-id}

canton や自治体は実際に変わります。自治体は 2019 年と 2025 年に合併し、法律によって canton の
線引きも変わります。レコードは有効期間（`validFrom`、`validTo`）を持つので、変更は履歴を消すの
ではなく、履歴を追加します。

1. 古いレコードは `validTo` つきで残り、新しいレコードには新しい id と `validFrom` が付きます。
   id が別のものに再利用されることはないので、何年も前に保存した id でも、当時の意味のものが
   見つかります。
2. 日付を指定しない場合、検索は今日の時点で答えます。id による検索は今日適用される版（終了した
   レコードなら最後の版）を返し、`getCantonsForMunicipality` のような一覧は今日適用されるもの
   だけを返します。`{ on }` を指定すると、どちらもその日の時点で答えます。
3. 変更履歴には、新しい id と、それが置き換える id がすべて記載されます。

綴りの訂正など、名称だけの変更では id は変わりません。2025 年 1 月 1 日より前の履歴はまだデータに
入っていません（[#27](https://github.com/pieterjanscheir/belgica/issues/27)）。それより前の日付で
検索すると、今日の地図で答える代わりに `RangeError` を投げます。

## id は不透明 {#ids-are-opaque}

id はキーであり、形式ではありません。`court-of-first-instance-luxembourg-marche-en-famenne` を
種類・地名・部に分解し直すことはできません。種類、地名、言語の接尾辞のすべてが同じハイフンを
使っているからです。id を解析しないでください。id の各部分はフィールド（`type`、`court`、
`canton`、`arrondissement`）にもなっており、スキーマとテストが検証しているのはそのフィールドです。

## 安定性 {#stability}

id は公開 API です。レコードの追加はマイナーバージョン、値の修正はパッチ、id の削除や名前の変更は
メジャーバージョンです。バージョン 0.3.0 では、パッケージにまだユーザーがいないうちに、以前の
PascalCase の id（`VredegerechtGent1`、`EastFlanders`）をこの方式に置き換えました。対応関係は
[変更履歴](./changelog)に記載しています。

この約束は宣言するだけでなく検証されています。`ids.lock.json` はパッケージが公開したすべての id
をデータセットごとに列挙しています。`pnpm generate` は新しい id をそこに追加するだけで、決して
削除しません。また `test/ids.test.ts` は、ロックされた id がデータから消えると失敗します。
そのため、タイトルが変わったページを読んだスクレイパー、再生成された canton の一覧、手作業での
編集によって、id が気づかれないまま消えたり名前が変わったりすることはありません。週次のデータの
pull request が失敗し、人がパーサーで新しい名称を既存の id に対応づけるか、`validTo` でレコードを
終了させます。id をロックから外すのは意図的な行為であり、メジャーバージョンで、その id と
置き換え先を変更履歴に記載して行います。
