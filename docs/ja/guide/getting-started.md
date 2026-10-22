<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# はじめに {#getting-started}

## インストール {#install}

::: code-group

```bash [pnpm]
pnpm add belgica
```

```bash [npm]
npm install belgica
```

```bash [yarn]
yarn add belgica
```

:::

このパッケージは ESM で、型定義を同梱し、ランタイム依存はありません。ブラウザと Node 22.12
以降で動作し、Node では `require()` でも読み込めます。Node 22.12、22、24、26 でテストしています。

### 必要なものだけを import する {#import-only-what-you-need}

データは JavaScript にバンドルされているため、パッケージのルートから import するとすべての
データセットが読み込まれます。データセットごとに専用の entry point があり、なかでも裁判所と
canton（管轄領域の法令の条文を含む）が群を抜いて大きいデータです。

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

例外は [canton の境界](/ja/data/canton-boundaries)です。100 万の座標点からなるジオメトリで、
`belgica/canton-boundaries` にのみ含まれ、パッケージのルートからは決して読み込まれません。

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">読み込まれる JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">サイズはサイトのビルド時にビルド成果物から計測されます（先に <code>pnpm build</code> を実行してください）。</p>

## まず使ってみる {#a-first-look}

```ts
import {
    getCourt,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'belgica'

getCourt('justice-of-the-peace-gent-1').name.nl // 'Vredegerecht Gent 1'
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getCantonsForMunicipality('44021') // Gent 1–5：分割された都市。各 canton の `territory` を参照
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## よくある作業 {#common-tasks}

### ある住所を管轄する vredegerecht / justice de paix はどこか {#which-justice-of-the-peace-handles-an-address}

vredegerecht / justice de paix は canton ごとに置かれる裁判所です。自治体の REFNIS コードを調べてその canton を取得し、次に canton の裁判所を取得します。

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // どの canton にも裁判所がある
}

// 今日ではなく、召喚状が送達された日の時点で
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

都市が複数の canton に分かれている場合（Antwerpen、Gent、Brussel、Luik など）、結果は複数に
なります。決め手は通りの住所で、各 canton の `territory` にその区域の法令上の記述が入っています。
[領域のページ](/ja/data/territory#find-the-canton-for-a-municipality)で試せます。

住所の座標があれば、[canton の境界](/ja/data/canton-boundaries)で判定できます。

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // 経度、緯度：gent-1
const court = getJusticeOfThePeace(canton.id)
```

### ある自治体を管轄する裁判所はどこか {#which-court-for-a-municipality}

vredegerecht / justice de paix 以外の裁判所はすべて、法律の定めるとおりに管轄する canton を
列挙しています（`cantons`）。`findCourtsWithJurisdiction` は自治体の canton をそこから探します。

```ts
import { findCourtsWithJurisdiction, getDivisions } from 'belgica'

findCourtsWithJurisdiction('23088', 'police-court') // [police-court-vilvoorde]、ブリュッセルではない
findCourtsWithJurisdiction('21004', 'labour-court') // ブリュッセルのオランダ語の裁判所とフランス語の裁判所

// 裁判所全体。どの部が事件を扱うかはまだデータにない
const [court] = findCourtsWithJurisdiction('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### 郵便番号から {#from-a-postal-code}

住所に付いているのは REFNIS コードではなく郵便番号です。`findCourtsForPostalCode` は郵便番号から
自治体へ（[郵便番号](/ja/data/postal-codes)）、そこから vredegerecht / justice de paix と指定した
種類の裁判所へとたどります。結果は自治体ごとに返ります。3 つの郵便番号（`1040`、`1050`、`1804`）は
2 つの自治体にまたがっており、その場合は通りで決まります。

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']：通りで決まる

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

複数の canton に分かれた都市では、郵便番号で絞り込めるのは自治体までです。canton を決めるには
やはり通りが必要で、その境界は [#29](https://github.com/pieterjanscheir/belgica/issues/29) で
ジオメトリとして追加されるまでは法令の文章のままです。

### ある日に発生する利息 {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` は利率の記録がない日には `null` を返すので、黙って 0 % を使う代わりに警告を
出せます。`'2024-6-1'` のような不正な形式の日付には `RangeError` を投げます。`YYYY-MM-DD` か
`Date` を渡してください。

### 他の言語での裁判所名 {#court-names-in-another-language}

名称は各裁判所が公表しているとおりで、その裁判所がページを持つすべての言語で収録しています。
フランデレンの裁判所はオランダ語のみ、ブリュッセルの二言語の裁判所はオランダ語とフランス語、Eupen の
裁判所はドイツ語とフランス語で公表しています。

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## 生の JSON {#raw-json}

データファイルも export されています。

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## id は公開 API {#ids-are-public-api}

各プロジェクトは `justice-of-the-peace-gent-1` や `oost-vlaanderen` のような id を保存するため、
id はメジャーバージョンの中では決して変わりません（[識別子](./identifiers)を参照）。バージョンは
次のルールに従います。

| 変更                      | バージョン |
| ------------------------- | ---------- |
| データの追加              | minor      |
| 値の修正                  | patch      |
| id の削除または名前の変更 | major      |
