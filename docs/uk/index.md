---
layout: home

hero:
    name: belgica
    text: Бельгійські правові довідкові дані
    tagline: Суди, судові кантони й округи (arrondissements), громади, а також законна процентна ставка і ставка для комерційних операцій. JSON із типами TypeScript і допоміжними функціями.
    actions:
        - theme: brand
          text: Почати роботу
          link: /uk/guide/getting-started
        - theme: alt
          text: Знайти кантон
          link: /uk/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: Процентні ставки
          link: /uk/data/interest-rates

features:
    - title: З джерелами
      details: Кожен набір даних зазначає своє походження, від додатка до Gerechtelijk Wetboek / Code judiciaire (Судового кодексу) до Statbel і Belgisch Staatsblad / Moniteur belge.
    - title: Уся територія
      details: Усі 162 судові кантони з громадами, які вони охоплюють, разом із текстом закону для міст, поділених між кількома кантонами.
    - title: Процентні ставки з 1970 року
      details: Законна ставка за кожен рік і ставка для комерційних операцій за кожне півріччя, з уже вбудованим правилом дати договору 2013–2015 років.
    - title: Не лише для JavaScript
      details: JSON-файли в data/ — це джерело істини. Читайте їх із Python чи будь-чого іншого, закріпивши на release tag.
---

## Коротко {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning Довідкові дані, а не юридична консультація
Перш ніж покладатися на них, перевірте офіційні джерела.
:::
