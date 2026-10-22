# Faiz oranları {#interest-rates}

Dosya: `data/interest-rates.json`. Kaynak: FOD Financiën (federal maliye bakanlığı), Belgisch
Staatsblad / Moniteur belge'de (resmî gazete) yayımlanır.

## Ne işe yarar {#why-it-s-useful}

Geç ödemeye işleyen faiz neredeyse her alacak talebinin bir parçasıdır ve oran güne bağlıdır:

- **Yasal faiz** (wettelijke interest) genel olarak borçlara uygulanır ve bir sözleşme ya da
  özel bir kanun aksini öngörmedikçe mahkemelerin temerrüt faizi olarak hükmettiği faizdir.
- **Ticari faiz** (Wet 2 augustus 2002) bir sözleşme daha yüksek bir oran belirlemedikçe,
  işletmeler arasındaki ve kamu kurumlarına karşı geç ödemelere uygulanır.

Birkaç yıla yayılan bir alacak, her biri kendi oranına sahip birkaç dönemi kapsar. Tek bir
dönemi yanlış almak talep edilen tutarı değiştirir ve 2013–2015 geçişi (aşağıda) kolayca gözden
kaçar. `getInterestRate` bir gün için doğru oranı verir ve oran henüz yayımlanmamışsa tahmin
yürütmek yerine `null` döndürür.

## Kaynak ve güncellemeler {#source-and-updates}

|                 |                                                                                                                                                                                                                               |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kaynak          | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (ticari); Belgisch Staatsblad'da yıllık duyuru (yasal) |
| Oluşturan       | Elle: yeni bir oran yayımlandığında bir dönem eklenir                                                                                                                                                                         |
| Değiştiği zaman | Her takvim yılı (yasal); her yarıyıl (ticari)                                                                                                                                                                                 |
| Kontrol         | Haftalık: güncellik kontrolü, bugün veya önümüzdeki iki hafta için oran yoksa bir issue açar                                                                                                                                  |

- **Yasal** (`legal`, wettelijke interest, Wet 5 mei 1865): takvim yılı başına belirlenir; 1970'ten beri verilerde.
- **Ticari** (`commercial`, ticari işlemlerde geç ödeme, Wet 2 augustus 2002):
  yarıyıl başına belirlenir; 2002'den beri verilerde.

## Oran sorgulama {#look-up-a-rate}

<InterestRates />

## 2013–2015 sözleşme kuralı {#the-2013-2015-contract-rule}

2013'ten 15 Mart 2015'e kadar ticari oran, sözleşmenin ne zaman yapıldığına bağlıdır. Bu
dönemlerde ek olarak `rateForContractsBefore20130316` bulunur. Varsayılan olarak `getInterestRate`
eski sözleşmeler için geçerli oranı döndürür; 16 Mart 2013'te veya sonrasında yapılan sözleşmeler
için `{ contractAfter20130316: true }` verin.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Eksik dönemler {#missing-periods}

`getInterestRate`, verilerde oranı olmayan bir gün için `null` döndürür: ilk dönemden önceki
günler ya da henüz yayımlanmamış (veya eklenmemiş) bir dönem. Verilerin nereye kadar uzandığını
göstermek için `getLatestKnownRateDate(type)` kullanın ve sessizce %0 kullanmak yerine uyarı
gösterin.

## Yapı {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // ilk gün, dahil, YYYY-MM-DD
    to: string // son gün, dahil, YYYY-MM-DD
    rate: number // yüzde
    rateForContractsBefore20130316?: number
    note?: string
}
```
