# Veri kümeleri {#datasets}

Her veri kümesi `data/` klasöründe bir JSON dosyasıdır; bir [JSON Schema](/tr/guide/schema) ile
tanımlanır ve resmî kaynakları, lisansı ve bu kaynaklarla en son karşılaştırıldığı tarihle
birlikte [`datapackage.json`](/tr/guide/schema#datapackage-json) dosyasında listelenir.

| Veri kümesi                                                | Kayıt  | Ne işe yarar                                                                                                                       |
| ---------------------------------------------------------- | ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| [Yargı çevreleri](./territory#judicial-areas)              | 5      | Bir istinaf başvurusuna hangi hof van beroep / cour d'appel (ve arbeidshof / cour du travail) bakar                                |
| [Arrondissement'lar](./territory#arrondissements)          | 12     | Mahkemeleri, savcılıkları ve icra memurlarını (gerechtsdeurwaarders / huissiers de justice) gruplamak; çoğu yetki kuralının birimi |
| [Kantonlar](./territory#cantons)                           | 162    | Bir adres için hangi vredegerecht / justice de paix'nin yetkili olduğu                                                             |
| [Kanton sınırları](./canton-boundaries)                    | 162    | Bölünmüş bir şehirdeki bir noktanın kantonu; kantonlar harita üzerinde (GeoJSON)                                                   |
| [Belediyeler](./territory#municipalities)                  | 565    | Herhangi bir Belçika adresini veya istatistiğini REFNIS koduyla adli haritaya bağlamak                                             |
| [Bölgeler](./territory#regions)                            | 3      | Bir belediyenin bölgesi, REFNIS koduna göre, üç dilde adıyla                                                                       |
| [Eyaletler](./territory#provinces)                         | 10     | Bir belediyenin eyaleti (Brüksel'de yok), bölgesiyle birlikte                                                                      |
| [Posta kodları](./postal-codes)                            | 1 152  | Bir adresin posta kodundan belediyesine, oradan da kantonlarına ve mahkemelerine                                                   |
| [Mahkemeler](./courts)                                     | 347    | Herhangi bir mahkemeye yazmak, evrak sunmak veya ödeme yapmak için adlar, adresler ve kalemlerin iletişim bilgileri                |
| [Cezaevleri](./prisons)                                    | 39     | Her cezaevinin ve tutukevinin adresi ve iletişim bilgileri                                                                         |
| [Justitiehuizen / maisons de justice](./houses-of-justice) | 27     | Denetimli serbestlik, mağdur desteği ve aile mahkemeleri için sosyal incelemeler                                                   |
| [Faiz oranları](./interest-rates)                          | 2 seri | Bir alacak için gecikme faizini hesaplamak                                                                                         |

## Veri kümeleri birbirine nasıl bağlanır {#how-the-datasets-fit-together}

```
Yargı çevresi ──< Arrondissement ──< Kanton >──< Belediye (REFNIS) ──< Posta kodu
      │                 │              │  │
      │                 │              │  └── Kanton sınırı   kantonun geometrisi (NGI)
      └──────────── Mahkeme ───────────┘  bir vredegerecht kantonuna bağlanır,
                        │                 her mahkemenin adresi de belediyesine
                        └──< Bölüm         bir bölüm mahkemesine bağlanır
```

`──<` "birden çok ... içerir" diye okunur. Bir belediye genellikle tek bir kantondadır; bölünmüş
şehirler (Antwerpen, Gent, Brussel, Luik, …) birden çok kantondadır. İdari tarafta
`Bölge ──< Eyalet ──< Belediye` yapısı geçerlidir; yalnız Brüksel-Başkent Bölgesi'nin eyaleti
yoktur ve 19 belediyesini doğrudan kapsar.

Kayıtlar birbirine adla değil, her zaman id ile bağlanır: bir mahkemenin bir `judicialArea` id'si
ve, alanı tek bir arrondissement (adli bölge) ise, bir `arrondissement` id'si vardır; bir kanton
belediyelerinin REFNIS kodlarını listeler; bir posta kodu ve bir mahkemenin adresi, belediyelerinin
REFNIS kodunu taşır. Adların yazımı kaynaktan kaynağa ve dilden dile değişir; id'ler değişmez.

## Bu veriler neden işe yarar {#why-this-data-is-useful}

Belçika'da hukuki işler hep aynı sorgulamalara takılır ve resmî kaynakları koddan kullanmak
zordur:

- **Yetki.** Vredegerecht / justice de paix (sulh mahkemesi benzeri, kanton düzeyindeki mahkeme),
  politierechtbank / tribunal de police ve diğer birçok mahkeme yer bakımından yetkilidir. Kanun
  (Gerechtelijk Wetboek / Code judiciaire'in eki) bu alanları düz metinle, kısmen sokak sokak
  tarif eder. `cantons.json` bunu belediyeden kantona bir sorguya dönüştürür ve bölünmüş şehirler
  için kanun metnini saklar; `canton-boundaries.json` NGI'nin geometrisini ekler, böylece
  bölünmüş bir şehirdeki bir noktanın kantonu bulunabilir.
- **Doğru adlar ve adresler.** Celpnameler, conclusies / conclusions (yazılı savunmalar) ve
  mektuplar, doğru mahkemeye onun kendi kullandığı adla hitap etmeli, örneğin
  `Vredegerecht Gent 1` veya `Ondernemingsrechtbank Gent - afdeling Brugge`, ve doğru kaleme
  ulaşmalıdır. Adlar, mahkemelerin kendi sayfalarından, yayımladıkları her dilde alınır.
- **Faiz hesaplamaları.** Gecikmiş ödeme alacaklarında yasal faiz (wettelijke interest) ya da
  işletmeler arasında ticari işlemler faizi kullanılır. İkisi de her yıl veya her yarıyıl
  değişir ve 2013–2015 geçişi sözleşme tarihine bağlıdır. Tek bir dönemi yanlış almak talep
  edilen tutarı değiştirir.
- **Başka verilerle birleştirmek.** Statbel, bölgeler ve açık verilerin çoğu REFNIS kodlarını
  kullanır. Bunları kantonlara ve arrondissement'lara eşlemek, dava yükü, nüfus veya adres
  verilerini adli haritaya yerleştirmenizi sağlar.

## Neler (henüz) yok {#what-isn-t-in-it-yet}

Mevcut verilerin sınırlamaları için [bilinen eksikler](./known-gaps) sayfasına, planlanan veri
kümeleri için [yol haritası](./roadmap) sayfasına bakın: en yüksek mahkemeler, geçmiş, icra
memurları, polis bölgeleri ve kadastro ile ipotek daireleri.

::: warning Referans verileridir, hukuki tavsiye değildir
Veriler resmî kaynaklarla karşılaştırılarak kontrol edilir, ancak kaynaklar değişir ve hatalar
olur. Bir değere güvenmeden önce resmî kaynağı kontrol edin ve
[yanlış olan her şeyi bildirin](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml).
:::
