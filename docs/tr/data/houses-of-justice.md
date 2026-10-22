<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Justitiehuizen / maisons de justice {#houses-of-justice}

Dosya: `data/houses-of-justice.json`. Flaman ve Fransız Topluluklarının justitiehuizen /
maisons de justice'leri (adalet evleri: ceza infazı ve mağdur desteği hizmetleri): {{ stats.housesOfJustice }}
kayıt.

Justitiehuizen, mahkemeler ve savcılıklar adına failleri yönlendirir ve denetler (denetimli
serbestlik, elektronik izleme, kamu yararına çalışma), mağdurları karşılar ve aile mahkemeleri
için sosyal inceleme raporları yazar. 2015'ten beri Topluluklar tarafından yönetilirler.

## Ne işe yarar {#why-it-s-useful}

- **Aile hukuku.** Bir aile mahkemesi, ailenin bulunduğu bölgedeki justitiehuis'ten sosyal
  inceleme ister; avukatların ve tarafların onun iletişim bilgilerine ihtiyacı vardır.
- **Ceza hukuku.** Denetimli serbestlik koşulları, alternatif cezalar ve elektronik izleme
  justitiehuis tarafından takip edilir; mağdurların karşılanması da öyle.
- **Bağlama.** Flaman justitiehuizen'in OVO numarası, yani Flaman kurumlar sicilindeki
  ([Wegwijs](https://wegwijs.vlaanderen.be)) tanımlayıcısı vardır; böylece veriler diğer Flaman
  kamu verileriyle birleştirilebilir.

## Kaynak ve güncellemeler {#source-and-updates}

|           |                                                                                                                                                                                                                                                    |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Kaynak    | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen) (Flaman Topluluğu) ve [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/) (Fransız Topluluğu) |
| Oluşturan | Haftalık anlık görüntülerden `scripts/parse`                                                                                                                                                                                                       |
| Kontrol   | Her hafta, [kaynaklar workflow'u](/tr/guide/data-quality#how-the-data-is-built) tarafından                                                                                                                                                         |

Henüz verilerde yok: Almanca konuşan Topluluğun Eupen'deki justitiehuis'i
([#3](https://github.com/pieterjanscheir/belgica/issues/3)). Brüksel'de hem Flaman
(`justitiehuis-brussel`) hem de Fransızca konuşan bir maison de justice (`maison-justice-bruxelles`)
bulunur.

## Alanlar {#fields}

| Alan                   | Tür                                     | Açıklama                                                                                                                                       |
| ---------------------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `HouseOfJusticeId`                      | Addan, artikeller olmadan: `justitiehuis-gent`, `maison-justice-arlon`                                                                         |
| `validFrom`, `validTo` | string?                                 | Kaydın geçerli olduğu günler, sitenin listelediği şekliyle; yoksa: kapsamın başlangıcından beri ya da hâlâ geçerli. Bkz. [zaman](/tr/api#time) |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | Onu yöneten Topluluk                                                                                                                           |
| `name`                 | `{ nl }` veya `{ fr }`                  | Topluluğun dilinde                                                                                                                             |
| `ovo`                  | string?                                 | Flaman justitiehuizen için Flaman kurumlar sicilindeki OVO numarası: `OVO001917`                                                               |
| `address`              | `Address`                               | Posta kodunun ait olduğu belediye ile birlikte (`municipality`, REFNIS koduyla)                                                                |
| `contacts`             | `Contact[]`                             | Telefon, faks ve e-posta; Fransızca konuşan bir maison de justice'in mağdur hizmetinin kendi, etiketli iletişim bilgileri vardır               |
| `website`              | `{ nl }` veya `{ fr }`                  | Listelendiği sayfa                                                                                                                             |
| `sources`              | `{ url, retrieved }[]`                  | Kaydın okunduğu sayfalar                                                                                                                       |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
