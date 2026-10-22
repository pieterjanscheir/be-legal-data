# Posta kodları {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Dosya: `data/postal-codes.json`. {{ stats.postalCodes.codes }} Belçika posta kodu, her biri ait
olduğu belediyeye REFNIS koduyla bağlı: {{ stats.postalCodes.records }} kayıt, çünkü
{{ stats.postalCodes.shared }} posta kodu iki belediyeye aittir.

## Ne işe yarar {#why-it-s-useful}

- **Bir adresten adli haritaya.** Adresler REFNIS koduyla değil, posta koduyla gelir. Posta
  kodu belediyeyi verir, belediye de kantonlarını ve mahkemelerini:
  `findCourtsForPostalCode('9050', 'labour-court')` "bu adres için hangi mahkeme?" sorusunu
  posta kodunun izin verdiği ölçüde yanıtlar.
- **Bir belediyenin posta kodları.** Bir formu doğrulamak, toplu posta göndermek, bir adresle
  bir REFNIS kodunun uyuştuğunu kontrol etmek: `getPostalCodes('44021')`.
- **Her mahkemenin, cezaevinin ve justitiehuis / maison de justice'in belediyesi.** Bunların
  `address.municipality` alanı, yayımlanan adresin posta koduna uygulanan bu bağlantıdır
  ([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

## Kaynak ve güncellemeler {#source-and-updates}

|                 |                                                                                                                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kaynak          | Statbel'in [posta kodlarından REFNIS kodlarına dönüşüm tablosu](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie), 1 Ocak 2025'ten itibaren geçerli tablo (`…_va01012025.xlsx`)                                                               |
| Oluşturan       | Haftalık anlık görüntülerden `scripts/parse/postal-codes.ts`. Bir kod `municipalities.json` içinde olmayan bir REFNIS koduna işaret ederse ya da bir belediyenin hiç kodu yoksa build başarısız olur                                                                       |
| Değiştiği zaman | Statbel yeni bir tablo yayımladığında: belediyeler birleştiğinde, bpost bir posta kodu eklediğinde veya kaldırdığında                                                                                                                                                      |
| Kapsam          | 1 Ocak 2025 ve sonrası: daha önceki bir gün için yapılan sorgular `RangeError` fırlatır ([zaman](/tr/api#time)). Daha sonraki bir tablo, çıkardığı çiftlere bir `validTo`, eklediği çiftlere bir `validFrom` verir; tarih olarak tablonun yürürlüğe girdiği gün kullanılır |
| Kontrol         | Her hafta, [kaynaklar workflow'u](/tr/guide/data-quality#how-the-data-is-built) tarafından                                                                                                                                                                                 |
| Lisans          | © Statbel, [CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                                                                                                   |

Statbel tabloyu bpost'un postanelerinden ve FOD Financiën / SPF Finances'ın (federal maliye
bakanlığı) belediyelerinden oluşturur. Tablo her satırda bir belediye adı da taşır, ancak bu ad
burada saklanmaz: birkaç yerde Statbel'in kendi REFNIS listesinden farklıdır (listenin
`Tongres-Looz` dediği yerde `Tongeren-Borgloon`, Sint-Niklaas için `Saint-Nicolas`) ve bir kayıt
belediyesini kopyalamak yerine ona bağlanır. Adlar `getMunicipality(record.municipality).name`
içindedir.

## Ortak posta kodları {#shared-postal-codes}

Bir belediyenin birkaç posta kodu vardır (Gent'in on tane), ve bir posta kodu tek bir belediyeye
aittir; üç istisna dışında:

| Posta kodu | Belediyeler                                      |
| ---------- | ------------------------------------------------ |
| `1040`     | Brussel (`21004`) ve Etterbeek (`21005`)         |
| `1050`     | Brussel (`21004`) ve Elsene (`21009`)            |
| `1804`     | Vilvoorde (`23088`) ve Zemst (`23096`): Cargovil |

Bunlarda sokak belirleyicidir. `getMunicipalitiesForPostalCode` iki belediyeyi de döndürür,
`findCourtsForPostalCode` da belediye başına yanıt verir; böylece ortak bir kod hiçbir zaman
sessizce bunlardan birine indirgenmez.

## Alanlar {#fields}

| Alan                   | Tür              | Açıklama                                                                                                                                                                             |
| ---------------------- | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `id`                   | `PostalCodeId`   | Posta kodu ve REFNIS kodu, birleştirilmiş: `9000-44021`. Tek başına hiçbiri bir kaydı adlandırmaz; birlikte hem resmî hem benzersizdir. Bkz. [tanımlayıcılar](/tr/guide/identifiers) |
| `validFrom`, `validTo` | string?          | Çiftin geçerli olduğu günler, Statbel tablolarının verdiği şekliyle; yoksa: kapsamın başlangıcından beri ya da hâlâ geçerli. Bkz. [zaman](/tr/api#time)                              |
| `postalCode`           | string           | Dört haneli posta kodu                                                                                                                                                               |
| `municipality`         | `MunicipalityId` | Posta kodunun ait olduğu belediye, REFNIS koduyla                                                                                                                                    |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## Neler yok {#what-isn-t-in-it}

- **Alt belediyeler** (deelgemeenten, sections de commune): Statbel'in tablosu belediye
  düzeyinde durur. bpost'un kendi posta kodu listesi yerleşim yerlerini adlandırır, ancak REFNIS
  kodu taşımaz ve açık bir lisansla değil, bpost'un kullanım koşullarıyla (tüm hakları saklıdır)
  yayımlanır; bu yüzden kullanılmaz.
- **Sokak.** Kantonlara bölünmüş bir şehirde (Antwerpen, Gent, Brussel, Luik, …) posta kodu
  belediyeyi, belediye de birkaç kantonu verir; bundan sonra sokak belirleyicidir. Sınırlar ise,
  [#29](https://github.com/pieterjanscheir/belgica/issues/29) bunları geometri olarak ekleyene
  kadar, yalnızca her kantonun `territory` alanındaki hukuki metin olarak vardır.

## Yardımcı fonksiyonlar {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// Belediye başına: vredegerecht'leri ve istenen türdeki mahkemeleri
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
