# ロードマップ {#roadmap}

予定しているデータセットと、それぞれの仕様を記した issue です。各 issue には、公式の情報源、
提案するフィールド、「完了」の定義が記載されています。協力を歓迎します。一つ選んで
[規約](/ja/guide/contributing#adding-a-dataset)に従ってください。

## 予定 {#planned}

| データセット                                                                                                                                       | 役立つ理由                                                                                         | Issue                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **その他の裁判所**：Hof van Cassatie / Cour de cassation、Grondwettelijk Hof / Cour constitutionnelle、Raad van State / Conseil d'État、懲戒裁判所 | 最上級の裁判所は裁判所のポータルに掲載されていないため、独自の情報源が必要                         | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **Eupen の justitiehuis / maison de justice**（ドイツ語共同体）                                                                                    | データにまだない唯一の justitiehuis / maison de justice                                            | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **履歴**：canton、自治体、裁判所がいつ変わったか                                                                                                   | モデルには有効期間と日付による検索がすでにあり、以前の版のデータがまだ必要                         | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **住所 → 座標**                                                                                                                                    | [canton の境界](./canton-boundaries)で地点の canton はわかる。欠けているのは住所のジオコーディング | [#28](https://github.com/pieterjanscheir/belgica/issues/28) |
| **執行官の事務所**（gerechtsdeurwaarders / huissiers de justice）                                                                                  | 送達や強制執行のために、arrondissement 内の執行官を探す                                            | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **警察管区**（politiezones / zones de police）                                                                                                     | ある自治体をどの管区が担当するか：被害届、調書の写し                                               | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **土地台帳と法的安定性の事務所**（kadaster、旧 hypotheekkantoren）                                                                                 | 管轄の事務所に抵当権証明書や土地台帳の抄本を請求する                                               | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## 検討に値するもの {#worth-considering}

[#9](https://github.com/pieterjanscheir/belgica/issues/9) にまとめています。おおよそ利用頻度の
高い順です。

- 郵便番号ごとの**自治体内の旧自治体**（deelgemeenten / sections de commune）。
  [郵便番号](./postal-codes)は自治体の単位までです。bpost の一覧には地区名がありますが、REFNIS
  コードがなく、オープンなライセンスでもありません。
- **裁判所手数料**（rolrechten / griffierechten）と **rechtsplegingsvergoeding**（訴訟費用の補償額）
  の区分。利率と同様に、有効期間と物価スライドつきで。
- 手続き上の期限を計算するための、年ごとの**裁判所休廷期間と祝日**。
- arrondissement ごとの**検察庁**（parketten、arbeidsauditoraten）。
- **公証人と公証人会**、**弁護士会**（balies / barreaux）。
- **自治体の合併**：2019 年と 2025 年の旧 REFNIS コード → 新 REFNIS コード。古いデータを対応づけ
  られるように。
- 家賃の物価スライドのための **gezondheidsindex**（健康指数）。

## 一部のデータセットがまだない理由 {#why-some-datasets-aren-t-here-yet}

法務データセットは、すべての値が公式の情報源から来ている場合にしか役に立たないので、記憶に
頼って手で追加するものは何もありません。各データセットは、情報源のスナップショットからスクリプト
で作られ、ほとんどの情報源は GitHub Actions が毎週取得しています。今のところ取得できないものが
二つあります。canton の出典である Belgisch Staatsblad / Moniteur belge（官報）のサイト（ejustice）
と police.be は、どちらも GitHub のサーバーからの接続を拒否するため、代わりに通常のマシンから
取得しています（[#24](https://github.com/pieterjanscheir/belgica/issues/24)）。執行官の名簿は
ブラウザ内で組み立てられるため、読み取るにはブラウザか、Nationale Kamer van Gerechtsdeurwaarders /
Chambre nationale des huissiers de justice のデータが必要です
（[#6](https://github.com/pieterjanscheir/belgica/issues/6)）。
