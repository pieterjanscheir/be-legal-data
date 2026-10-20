---
layout: home

hero:
    name: be-legal-data
    text: Belgian legal reference data
    tagline: Courts, judicial cantons and arrondissements, municipalities, and the legal and commercial interest rates. JSON, with TypeScript types and helpers.
    actions:
        - theme: brand
          text: Get started
          link: /guide/getting-started
        - theme: alt
          text: Find a canton
          link: /data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: Interest rates
          link: /data/interest-rates

features:
    - title: Sourced
      details: Every dataset records where it comes from, from the annex to the Judicial Code to Statbel and the Belgisch Staatsblad.
    - title: Complete territory
      details: All 162 judicial cantons with the municipalities they cover, including the legal text for cities split over several cantons.
    - title: Interest rates since 1970
      details: The legal rate per year and the commercial-transaction rate per semester, with the 2013–2015 contract-date rule built in.
    - title: Not just for JavaScript
      details: The JSON files in data/ are the source of truth. Read them from Python or anything else, pinned to a release tag.
---

## At a glance

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'be-legal-data'

getCantonsForMunicipality('44088') // [Canton MerelbekeMelle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning Reference data, not legal advice
Check the official sources before relying on it.
:::
