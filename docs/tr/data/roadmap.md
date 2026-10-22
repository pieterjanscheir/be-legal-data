# Yol haritası {#roadmap}

Planlanan veri kümeleri, her birini tanımlayan issue ile birlikte. Her issue resmî kaynakları,
önerilen alanları ve "tamam"ın ne anlama geldiğini listeler. Yardım memnuniyetle karşılanır:
birini seçin ve [kurallara](/tr/guide/contributing#adding-a-dataset) uyun.

## Planlananlar {#planned}

| Veri kümesi                                                                                                                                                    | Ne işe yarar                                                                                                           | Issue                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Diğer mahkemeler**: Hof van Cassatie / Cour de cassation, Grondwettelijk Hof / Cour constitutionnelle, Raad van State / Conseil d'État, disiplin mahkemeleri | En yüksek mahkemeler mahkemelerin portalında yer almaz, bu yüzden kendi kaynaklarına ihtiyaç duyarlar                  | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **Eupen'deki justitiehuis / maison de justice** (Almanca konuşan Topluluk)                                                                                     | Verilerde henüz bulunmayan tek justitiehuis                                                                            | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Geçmiş**: kantonların, belediyelerin ve mahkemelerin ne zaman değiştiği                                                                                      | Modelde geçerlilik dönemleri ve güne göre sorgular var; önceki sürümler için hâlâ veri gerekiyor                       | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Adres → koordinatlar**                                                                                                                                       | [Kanton sınırları](./canton-boundaries) bir noktanın kantonunu bulur; eksik adım, adresin coğrafi olarak kodlanmasıdır | [#28](https://github.com/pieterjanscheir/belgica/issues/28) |
| **İcra memuru büroları** (gerechtsdeurwaarders / huissiers de justice)                                                                                         | Tebligat veya icra için bir arrondissement'ta (adli bölge) icra memuru bulmak                                          | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Polis bölgeleri** (politiezones / zones de police)                                                                                                           | Bir belediyeye hangi bölgenin baktığı: şikâyetler, tutanak suretleri                                                   | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Kadastro ve hukuki güvenlik büroları** (kadaster, eski hypotheekkantoren)                                                                                    | Yetkili bürodan ipotek belgeleri ve kadastro kayıt örnekleri istemek                                                   | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## Değerlendirmeye değer {#worth-considering}

[#9](https://github.com/pieterjanscheir/belgica/issues/9) içinde toplandı, kabaca ne sıklıkla
kullanılacaklarına göre sıralı:

- Posta kodu başına **alt belediyeler** (deelgemeenten, sections de commune).
  [Posta kodları](./postal-codes) belediye düzeyinde durur; bpost'un listesi yerleşim yerlerini
  adlandırır, ama REFNIS kodu ve açık lisansı yoktur.
- **Mahkeme harçları** (rolrechten / griffierechten) ve **yargılama tazminatı**
  (rechtsplegingsvergoeding) dilimleri, faiz oranları gibi geçerlilik dönemleri ve
  endekslemeleriyle birlikte.
- Usul sürelerini hesaplamak için yıl başına **adli tatiller ve resmî tatiller**.
- Arrondissement başına **savcılıklar** (parketten, arbeidsauditoraten).
- **Noterler ve noterlik odaları**, **barolar** (balies / barreaux).
- **Belediye birleşmeleri**: 2019 ve 2025 için eski → yeni REFNIS kodları, böylece eski veriler
  eşlenebilir.
- Kira endekslemesi için **sağlık endeksi** (gezondheidsindex).

## Bazı veri kümeleri neden henüz yok {#why-some-datasets-aren-t-here-yet}

Hukuki bir veri kümesi ancak her değeri resmî bir kaynaktan geliyorsa işe yarar; bu yüzden
hiçbir şey ezberden elle eklenmez. Her veri kümesi, kaynağının anlık görüntülerinden bir script
ile oluşturulur ve kaynakların çoğu her hafta GitHub Actions tarafından çekilir. İkisi şimdilik
çekilemiyor: kantonların geldiği Belgisch Staatsblad / Moniteur belge (resmî gazete) sitesi
(ejustice) ve police.be, GitHub sunucularından gelen bağlantıları reddediyor; bunlar onun yerine
sıradan bir makineden çekiliyor
([#24](https://github.com/pieterjanscheir/belgica/issues/24)). İcra memurları rehberi tarayıcıda
oluşturulduğundan okumak için bir tarayıcı ya da Ulusal Oda'nın verileri gerekiyor
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
