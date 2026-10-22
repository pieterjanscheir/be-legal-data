---
layout: home

hero:
    name: belgica
    text: ベルギーの法務リファレンスデータ
    tagline: 裁判所、司法 canton と arrondissement、自治体、法定利率と商取引の利率。TypeScript の型とヘルパー付きの JSON。
    actions:
        - theme: brand
          text: はじめる
          link: /ja/guide/getting-started
        - theme: alt
          text: canton を探す
          link: /ja/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: 利率
          link: /ja/data/interest-rates

features:
    - title: 出典つき
      details: すべてのデータセットに出典を記録しています。Gerechtelijk Wetboek（Code judiciaire）の附属書から Statbel、Belgisch Staatsblad まで。
    - title: 全領域をカバー
      details: 162 の司法 canton すべてと、それぞれが管轄する自治体。複数の canton に分かれる都市については法令の条文も収録しています。
    - title: 1970 年以降の利率
      details: 年ごとの法定利率と半期ごとの商取引利率。2013〜2015 年の契約日ルールも組み込み済みです。
    - title: JavaScript 以外でも
      details: data/ にある JSON ファイルが正のデータです。release tag に固定して、Python など任意の言語から読めます。
---

## 概要 {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning リファレンスデータであり、法的助言ではありません
利用する前に公式の情報源を確認してください。
:::
