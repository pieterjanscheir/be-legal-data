---
layout: home

hero:
    name: belgica
    text: بيانات مرجعية قانونية بلجيكية
    tagline: المحاكم، والكانتونات والدوائر القضائية، والبلديات، وسعر الفائدة القانونية وسعر الفائدة على المعاملات التجارية. بصيغة JSON، مع أنواع TypeScript ودوال مساعدة.
    actions:
        - theme: brand
          text: ابدأ الآن
          link: /ar/guide/getting-started
        - theme: alt
          text: ابحث عن كانتون
          link: /ar/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: أسعار الفائدة
          link: /ar/data/interest-rates

features:
    - title: موثّقة المصادر
      details: تسجّل كل مجموعة بيانات مصدرها، من ملحق Gerechtelijk Wetboek / Code judiciaire (القانون القضائي) إلى Statbel وBelgisch Staatsblad.
    - title: الإقليم كاملًا
      details: الكانتونات القضائية الـ162 كلها مع البلديات التي تغطيها، بما في ذلك النص القانوني للمدن المقسّمة على عدة كانتونات.
    - title: أسعار الفائدة منذ 1970
      details: سعر الفائدة القانونية لكل سنة وسعر المعاملات التجارية لكل نصف سنة، مع قاعدة تاريخ العقد للفترة 2013–2015 مدمجة.
    - title: ليست لـJavaScript فقط
      details: ملفات JSON في data/ هي المصدر المرجعي. اقرأها من Python أو من أي لغة أخرى، مثبّتة على release tag.
---

## نظرة سريعة {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning بيانات مرجعية، لا استشارة قانونية
راجع المصادر الرسمية قبل الاعتماد عليها.
:::
