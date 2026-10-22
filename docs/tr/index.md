---
layout: home

hero:
    name: belgica
    text: Belçika hukuki referans verileri
    tagline: Mahkemeler, adli kantonlar ve arrondissement'lar (adli bölgeler), belediyeler, yasal faiz ve ticari işlemler faiz oranı. JSON, TypeScript tipleri ve yardımcı fonksiyonlarla.
    actions:
        - theme: brand
          text: Başlarken
          link: /tr/guide/getting-started
        - theme: alt
          text: Kanton bul
          link: /tr/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: Faiz oranları
          link: /tr/data/interest-rates

features:
    - title: Kaynaklı
      details: Her veri kümesi nereden geldiğini kaydeder; Gerechtelijk Wetboek / Code judiciaire ekinden Statbel'e ve Belgisch Staatsblad'a kadar.
    - title: Eksiksiz coğrafya
      details: 162 adli kantonun tamamı, kapsadıkları belediyelerle; birden fazla kantona bölünmüş şehirler için kanun metni dahil.
    - title: 1970'ten bu yana faiz oranları
      details: Yıllık yasal faiz oranı ve altı aylık ticari işlemler faiz oranı; 2013–2015 sözleşme tarihi kuralı yerleşik.
    - title: Yalnızca JavaScript için değil
      details: data/ klasöründeki JSON dosyaları esas kaynaktır. Bunları Python'dan veya başka herhangi bir dilden, bir release tag'ine sabitleyerek okuyun.
---

## Bir bakışta {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning Referans verileridir, hukuki tavsiye değildir
Bunlara güvenmeden önce resmî kaynakları kontrol edin.
:::
