---
layout: home

hero:
    name: belgica
    text: 比利时法律参考数据
    tagline: 法院、司法 canton 与 arrondissement、市镇，以及法定利率和商业交易利率。JSON 格式，附带 TypeScript 类型和辅助函数。
    actions:
        - theme: brand
          text: 快速上手
          link: /zh/guide/getting-started
        - theme: alt
          text: 查找 canton
          link: /zh/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: 利率
          link: /zh/data/interest-rates

features:
    - title: 来源可查
      details: 每个数据集都注明出处，从 Gerechtelijk Wetboek / Code judiciaire（司法法典）的附件，到 Statbel 和 Belgisch Staatsblad（比利时政府公报）。
    - title: 地域完整
      details: 全部 162 个司法 canton 及其覆盖的市镇，包括分属多个 canton 的城市的法律条文。
    - title: 1970 年以来的利率
      details: 按年的法定利率和按半年的商业交易利率，内置 2013–2015 年按合同日期适用的规则。
    - title: 不只适用于 JavaScript
      details: data/ 中的 JSON 文件是唯一的权威数据源。可以从 Python 或任何其他语言读取，并固定到某个 release tag。
---

## 概览 {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning 参考数据，不构成法律意见
使用前请核对官方来源。
:::
