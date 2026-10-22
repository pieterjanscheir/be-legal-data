# Katkıda bulunma {#contributing}

## Verileri güncelleme {#updating-data}

Mahkemeler, cezaevleri, justitiehuizen / maisons de justice ve kanton sınırları her hafta resmî
kaynaklardan oluşturulur ([nasıl](./data-quality#how-the-data-is-built)): bunları elle
düzenlemeyin. `scripts/parse` içindeki parser'ı düzeltin ya da kaynağın kendisi yanlışsa bunu
mahkemeye bildirin. Haftalık pull request diğerleri gibi gözden geçirilir: merge etmeden önce
diff'i kaynaklarla karşılaştırın.

Elle tutulan veri kümeleri (yargı çevreleri, arrondissement'lar (adli bölgeler), faiz oranları)
için:

1. `data/` içindeki JSON'u düzenleyin. Mevcut id'leri koruyun: projeler onları saklar.
2. Veri kümesini kaynaklarıyla karşılaştırarak kontrol ettiyseniz `datapackage.json` içinde o veri
   kümesinin `lastReviewed` değerini güncelleyin.
3. `pnpm check`: id türlerini ve şemaları yeniden üretir; tür denetimi, lint ve biçim kontrolü
   yapar; derler; testleri coverage ile çalıştırır ve paketi lint eder. Üretilen dosyalar commit
   edilmemişse başarısız olur.
4. `CHANGELOG.md` dosyasına Unreleased altında bir satır ekleyin ve commit edin (`schema/`,
   `src/ids.generated.ts` ve `ids.lock.json` dahil). Derleme çıktısı (`dist/`) commit edilmez: her
   sürüm için derlenir ve npm'e yayımlanır.

Yayımlanmış bir id kalır: `ids.lock.json` hepsini listeler ve biri verilerde eksik olduğunda
testler başarısız olur. Bir kaynak bir kaydı yeniden adlandırdıysa parser'da yeni adı mevcut
id'ye eşleyin; kayıt sona erdiyse onu bir `validTo` ile koruyun. Bkz.
[tanımlayıcılar](./identifiers#stability).

### Kantonlar ve belediyeler {#cantons-and-municipalities}

`data/cantons.json` ve `data/municipalities.json` üretilmiş dosyalardır; elle düzenlemeyin.
`pnpm build:cantons` komutunu çalıştırın (ağ erişimi ve `unzip` gerektirir). Şunları okur:

- Gerechtelijk Wetboek / Code judiciaire'in eki, "Gebiedsomschrijving en zetel van hoven en
  rechtbanken"
  ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  Felemenkçe ve Fransızca;
- güncel belediyeler ve REFNIS kodları için Statbel'in belediye bazında nüfus dosyası.

Felemenkçe ve Fransızca metinleri ayrı ayrı ayrıştırır ve bunlar uyuşmadıkça ve her belediye tam
olarak bir kez kapsanmadıkça (ya da birkaç kantona bölünmedikçe) hiçbir şey yazmaz. Ekin
kullandığı ama Statbel'in kullanmadığı dış adlar (`Gembloers`, `Saint-Nicolas`, …), ekteki yazım
hataları ve ayırt edemediği sınır ifadeleri script'in en başında listelenir.

Bir yasa eki değiştirdikten ya da belediyeler birleştikten sonra yeniden çalıştırın. Kanton
id'leri yerel dili izler (Flandre ve Brüksel'de Felemenkçe, Valonya'da Fransızca, Eupen
çevresinde Almanca); `x` kantonunun vredegerecht / justice de paix'si (kanton düzeyindeki sulh
mahkemesi benzeri mahkeme) `justice-of-the-peace-x` id'sine sahiptir ve `canton` alanı üzerinden
kantona bağlanır.

### Kazınan (scrape edilen) veri kümeleri {#scraped-datasets}

```bash
pnpm fetch:sources            # tüm kaynaklar .sources/ içine (yaklaşık 20 dakika, nazikçe)
pnpm fetch:sources courts     # ya da tek bir kaynak
pnpm build:data               # mahkemeleri, cezaevlerini, justitiehuizen'i, posta kodlarını, bölgeleri ve eyaletleri .sources/ içinden yeniden oluştur
```

Kanton sınırları NGI'nin GeoPackage dosyasından (kaynak `ngi`) gelir ve Node'un kendi SQLite'ı
ile okunur; NGI bir kantonu yeniden adlandırdığında, onun kodunu
`scripts/parse/boundaries.ts` içindeki `CANTON_ALIASES` ile id'ye eşleyin.

Ya da çekmek yerine en son snapshot'ları checkout edin:
`git worktree add .sources origin/sources`.

Bir kaynak, `scripts/sources/catalog.ts` içinde bir walk'tur; bir parser onun snapshot'larını
`scripts/parse` içinde okur. Bir site işaretlemesini değiştirdiğinde, `test/parse` içindeki parser
testleri (`test/fixtures/sources` içindeki gerçek sayfaların kırpılmış kopyaları üzerinde) neyin
bozulduğunu gösterir.

### Yeni faiz oranları {#new-interest-rates}

- **Ticari işlemler**: FOD Financiën oranı yarıyıl bazında yayımlar. `from`, `to`, `rate` ve
  `note` içinde Staatsblad tarihiyle bir dönem ekleyin.
- **Yasal faiz**: takvim yılı bazında yayımlanır. O yıl için bir dönem ekleyin.

## Veri kümesi ekleme {#adding-a-dataset}

Kullanıcıların güvenebilmesi için her veri kümesi aynı şekilde ele alınır:

1. **Veriler**: `data/<name>.json`, kayıtlardan oluşan bir dizi. Her değer resmî bir kaynaktan.
2. **Id'ler**: [tanımlayıcı kurallarına](./identifiers) uyun: varsa resmî bir kod, yoksa yerel
   dildeki addan küçük harfli kebab-case (`scripts/id.ts`).
3. **Kopya değil, bağlantı**: arrondissement'lara, kantonlara ve belediyelere id ile başvurun ve
   ortak türleri (`Translated`, `Address`, `Contact`, `SourceRef`) yeniden kullanın.
4. **Kaynaklar**: her kayıtta bir `sources: [{ url, retrieved }]` ve `datapackage.json` içinde
   veri kümesinin kaynaklarını, lisansını, `lastReviewed` ve `reviewEveryMonths` değerlerini
   içeren bir girdi.
5. **Türler ve yardımcılar**: `src/<name>.ts`, `src/index.ts` üzerinden dışa aktarılır; ayrıca
   `tsup.config.ts` içinde ve `package.json` `exports` alanında bir entry point.
6. **Şema**: dosya türünü `scripts/schema-types.ts` ve `scripts/build-schemas.ts` dosyalarına
   ekleyin.
7. **Kaynak ve parser**: `scripts/sources/catalog.ts` içinde resmî sayfaları çeken bir walk ve
   `scripts/parse` içinde dosyayı snapshot'lardan oluşturan, fixture'ları ve testleri olan bir
   parser. Yalnızca kesin olarak okuyabildiğini okur ve gerisini raporlar.
8. **Testler**: benzersiz id'ler, çözümlenen başvurular ve resmî kaynağın verdiği sayı.
9. **Dokümantasyon**: `docs/data/` altında, ne işe yaradığını, kaynağı ve güncellemeleri ve bir
   alan tablosunu içeren bir sayfa.

## Kontroller {#checks}

| Komut                       | Ne yapar                                                                                                                                                              |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                | CI'ın çalıştırdığı her şey: `generate`, `typecheck`, `lint`, `build`, `test:coverage`, `test:package`, `lint:package` ve üretilen dosyaların commit edildiği kontrolü |
| `pnpm test`                 | Kaynak kod üzerinde birim, bütünlük, şema ve tür testleri (derleme gerekmez)                                                                                          |
| `pnpm test:package`         | Derlenmiş paketin `import` ve `require()` ile smoke testleri: önce `pnpm build` çalıştırın                                                                            |
| `pnpm test:coverage`        | Aynısı, ancak `src/` için kapsam %100'ün altındaysa başarısız olur                                                                                                    |
| `pnpm lint` / `pnpm format` | ESLint ve Prettier: kontrol / düzeltme                                                                                                                                |
| `pnpm generate`             | `src/ids.generated.ts` (id türleri) ve `schema/` dosyalarını verilerden ve türlerden yeniden üretir ve yeni id'leri `ids.lock.json` dosyasına ekler                   |
| `pnpm lint:package`         | Paketlenmiş paket üzerinde `publint` ve `arethetypeswrong`                                                                                                            |
| `pnpm test:freshness`       | Tarihe dayalı kontroller: eksik oranlar, gecikmiş gözden geçirmeler. `check`'in parçası değildir; `FRESHNESS_ONLINE=1` kaynak URL'lerini de kontrol eder              |
| `pnpm fetch:sources`        | Resmî kaynakları `.sources/` içine çeker                                                                                                                              |
| `pnpm build:data`           | Mahkemeleri, cezaevlerini, justitiehuizen'i, posta kodlarını, bölgeleri, eyaletleri ve kanton sınırlarını `.sources/` içinden yeniden oluşturur                       |
| `pnpm build:csv`            | Verileri CSV tabloları olarak `csv/` içine yazar                                                                                                                      |

## Sürüm yayımlama {#releasing}

1. `CHANGELOG.md` içindeki Unreleased girdilerini yeni sürümün altına taşıyın.
2. `package.json` içindeki `version` değerini artırın ve commit edin.
3. Etiketleyin ve push edin: `git tag v0.3.0 && git push && git push --tags`.

Release workflow'u `pnpm check` çalıştırır, etiketi provenance ile npm'e yayımlar ve verilerin,
şemaların ve CSV tablolarının ekli olduğu bir GitHub release'i oluşturur. Etiket `version` ile
eşleşmelidir.

## Bu web sitesi {#this-website}

Site `docs/` içinde yer alır ve [VitePress](https://vitepress.dev) ile oluşturulur. Etkileşimli
tablolar paketin kendi `src/` ve `data/` klasörlerini içe aktarır; bu yüzden her zaman depodaki
verileri gösterirler.

```bash
pnpm docs:dev      # hot reload ile yerel sunucu
pnpm docs:build    # docs/.vitepress/dist içinde statik site
pnpm docs:preview  # derlenmiş siteyi sun
```

`main`'e yapılan her push siteyi GitHub Pages'e deploy eder. CI her pull request'te siteyi
derler; böylece bozuk bir sayfa merge'den önce yakalanır.

### Çeviriler {#translations}

`docs/` içindeki İngilizce sayfalar esas kaynaktır. Diğer her dilin kendi klasöründe aynı ağaç
vardır: Felemenkçe (`docs/nl/`) ve Fransızca (`docs/fr/`), ayrıca Almanca, İspanyolca, İtalyanca,
Portekizce, Lehçe, Türkçe, Arapça, Ukraynaca, Çince ve Japonca (`docs/de/`, `docs/es/` vb.).
Bunlar İngilizce sayfanın çevirileridir ve o sayfa değiştikten sonra güncellenir. Bir İngilizce
sayfayı değiştirdiğinizde `docs/nl/` ve `docs/fr/` içindeki aynı sayfayı da değiştirin ya da pull
request'te çevirilerin geride kaldığını belirtin; diğer diller bir sürüm geride kalabilir. Bu
diğer dillerde temanın ve etkileşimli bileşenlerin metinleri `docs/.vitepress/locales/` içindedir.

Kod, id'ler, alan adları ve resmî adlar her dilde olduğu gibi kalır ve her başlık İngilizce
çapasını korur (`## Başlık {#english-anchor}`); böylece sayfalar arası bağlantılar ve dil seçici
çalışmaya devam eder. Bir Belçika kurumu ya da hukuki terim, uydurma bir çeviri yerine resmî
Felemenkçe veya Fransızca adını (ya da Belçika'nın yayımladığı yerlerde Almanca adını) korur:
Çince bir sayfa vredegerecht / justice de paix der, onun için uydurulmuş bir sözcük kullanmaz.
Değişiklik günlüğü yalnızca İngilizce tutulur.
