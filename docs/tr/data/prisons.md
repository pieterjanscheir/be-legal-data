# Cezaevleri {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Dosya: `data/prisons.json`. FOD Justitie / SPF Justice'e (federal adalet bakanlığı; Ceza İnfaz
Kurumları Genel Müdürlüğü) bağlı {{ stats.prisons }} cezaevi ve tutukevi (detentiehuis).

## Ne işe yarar {#why-it-s-useful}

- **Bir tutukluya veya cezaevine yazmak.** Avukatlar, aileler ve hizmet kuruluşları cezaevinin
  adresine ve telefon numarasına ihtiyaç duyar; adlar dile göre değişir
  (`Gevangenis van Bergen`, `Prison de Mons`, `Gefängnis Mons`).
- **Para yatırmak.** FOD Justitie'nin tutuklulara gönderilecek para için cezaevinin hesabını
  yayımladığı durumlarda, bu hesap iletişim bilgilerinde `bank-account` olarak, sağlama toplamı
  doğrulanmış şekilde yer alır.
- **Formlar ve dava dosyaları.** Bir dosyayla birlikte saklanacak, kurum başına sabit bir id ve
  seçim yapılacak bir liste.

## Kaynak ve güncellemeler {#source-and-updates}

|                 |                                                                                                                                                                                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kaynak          | [FOD Justitie: Belçika cezaevleri](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen), her cezaevinin Felemenkçe, Fransızca ve Almanca sayfası |
| Oluşturan       | Haftalık anlık görüntülerden `scripts/parse`                                                                                                                                         |
| Değiştiği zaman | Bir cezaevi açıldığında veya kapandığında ya da iletişim bilgilerini değiştirdiğinde                                                                                                 |
| Kontrol         | Her hafta, [kaynaklar workflow'u](/tr/guide/data-quality#how-the-data-is-built) tarafından                                                                                           |

## Alanlar {#fields}

| Alan                   | Tür                               | Açıklama                                                                                                                                       |
| ---------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PrisonId`                        | Yerel dildeki addan, artikeller olmadan: `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                           |
| `validFrom`, `validTo` | string?                           | Kaydın geçerli olduğu günler, sitenin listelediği şekliyle; yoksa: kapsamın başlangıcından beri ya da hâlâ geçerli. Bkz. [zaman](/tr/api#time) |
| `kind`                 | `'prison'` \| `'detention-house'` | Bir tutukevi (detentiehuis) kısa süreli cezaları olan kişileri evlerine yakın bir yerde barındırır                                             |
| `name`                 | `{ nl, fr, de }`                  | FOD Justitie'nin yayımladığı şekliyle                                                                                                          |
| `address`              | `Address`                         | Yerel dilde, posta kodunun ait olduğu belediye ile birlikte (`municipality`, REFNIS koduyla)                                                   |
| `contacts`             | `Contact[]`                       | Telefon, faks, e-posta ve yayımlandığı yerde tutuklulara gönderilecek para için hesap                                                          |
| `website`              | `{ nl, fr, de }`                  | Cezaevinin dil başına sayfası                                                                                                                  |
| `sources`              | `{ url, retrieved }[]`            | Kaydın okunduğu sayfalar                                                                                                                       |

Sayfaların da verdiği müdür adı dışarıda bırakılmıştır: değişir ve paketin ihtiyaç duymadığı
kişisel bir veridir.

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
