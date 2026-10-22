# Veri kalitesi ve güncelliği {#data-quality-freshness}

Hukuki referans verileri sessizce eskir: yeni bir faiz oranı yayımlanır, bir mahkeme taşınır, bir
yasa iki kantonu birleştirir. Bu sayfa, paketin bu değişikliklere nasıl ayak uydurduğunu ve her
veri kümesine ne kadar güvenebileceğinizi açıklar.

## Her veri kümesinin kaynağı {#where-each-dataset-comes-from}

| Veri kümesi                         | Kaynak                                                     | Nasıl oluşturulur                          | Ne zaman değişir                                                                    | Gözden geçirme sıklığı |
| ----------------------------------- | ---------------------------------------------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------- | ---------------------- |
| Yargı çevreleri, arrondissement'lar | Gerechtelijk Wetboek / Code judiciaire, ek md. 4–5         | Elle                                       | Bir yasa adli haritayı yeniden çizdiğinde (nadiren; en son 2014'te)                 | 24 ayda bir            |
| Kantonlar                           | Gerechtelijk Wetboek / Code judiciaire, ek md. 1 (nl + fr) | Üretilir: `pnpm build:cantons`             | Bir yasa eki değiştirdiğinde; belediyeler birleştiğinde                             | 12 ayda bir            |
| Kanton sınırları                    | NGI (geo.be)                                               | Haftalık: snapshot'lar + `pnpm build:data` | NGI yeni bir sürüm yayımladığında                                                   | Haftalık               |
| Belediyeler                         | Statbel açık verileri                                      | Üretilir: `pnpm build:cantons`             | Belediyeler birleştiğinde (2019, 2025)                                              | 12 ayda bir            |
| Bölgeler, eyaletler                 | Statbel REFNIS kod listesi                                 | Haftalık: snapshot'lar + `pnpm build:data` | Statbel kaydını değiştirdiğinde (en son 1995'te)                                    | Haftalık               |
| Mahkemeler                          | tribunaux-rechtbanken.be                                   | Haftalık: snapshot'lar + `pnpm build:data` | Bir mahkeme taşındığında ya da iletişim bilgilerini veya saatlerini değiştirdiğinde | Haftalık               |
| Cezaevleri                          | justitie.belgium.be                                        | Haftalık: snapshot'lar + `pnpm build:data` | Bir cezaevi açıldığında, kapandığında ya da iletişim bilgilerini değiştirdiğinde    | Haftalık               |
| Justitiehuizen / maisons de justice | vlaanderen.be, maisonsdejustice.be                         | Haftalık: snapshot'lar + `pnpm build:data` | Bir justitiehuis taşındığında ya da iletişim bilgilerini değiştirdiğinde            | Haftalık               |
| Posta kodları                       | Statbel dönüşüm tablosu                                    | Haftalık: snapshot'lar + `pnpm build:data` | Statbel yeni bir tablo yayımladığında (birleşmeler, yeni kodlar)                    | Haftalık               |
| Faiz oranları                       | FOD Financiën, Belgisch Staatsblad                         | Elle                                       | Her yıl (yasal faiz) ve her yarıyıl (ticari işlemler)                               | 6 ayda bir             |

Üretilen veri kümeleri asla elle düzenlenmez. `pnpm build:cantons` resmî metni ayrıştırır ve
Felemenkçe ile Fransızca sürümler uyuşmadıkça ve her belediye kapsanmadıkça hiçbir şey yazmaz;
`pnpm build:data` ise bir sayfa yerleştirilemediğinde, bir kantonun mahkemesi olmadığında ya da
bir kantonun NGI dosyasında sınırı bulunmadığında çalışmayı reddeder.

## Veriler nasıl oluşturulur {#how-the-data-is-built}

```
official site ──fetch──> snapshots (sources branch) ──parse──> data/*.json ──> pull request
```

1. **Çekme.** Her pazartesi [sources workflow'u](https://github.com/pieterjanscheir/belgica/actions/workflows/sources.yml)
   kaynakların her sayfasını (`scripts/sources`) nazikçe çeker: site başına saniyede bir istek,
   projeyi adıyla anan bir user agent ile. Her sayfa, neyin ne zaman çekildiğini ve içeriğin
   hash'ini gösteren bir dizinle birlikte `sources` branch'inde saklanır. Bir sayfa yalnızca
   içeriği değiştiğinde yeniden kaydedilir; böylece branch'in geçmişi hangi gün neyin değiştiğini
   gösterir. Başarısız olan bir sayfa (sunucu hatası, 404) son sağlam anlık görüntüsünü (snapshot)
   korur ve çalışmayı durdurur, bu da bir issue açar: veriler asla eksik bir tablodan yeniden
   oluşturulmaz. Kaynağın artık bağlantı vermediği bir sayfa snapshot'lardan çıkarılır; kaydı ise
   verilerde kalır ve bir `validTo` ile (onu bulamayan kontrolden önceki gün) sonlandırılır;
   böylece id'si çalışmaya devam eder ve daha önceki bir gün için yapılan sorgu onu hâlâ bulur.
   Yeni ortaya çıkan bir sayfa `validFrom` içeren bir kayıt alır.
2. **Ayrıştırma.** `pnpm build:data` snapshot'ları okur (`scripts/parse`) ve mahkemeleri,
   cezaevlerini, justitiehuizen'i ve kanton sınırlarını yazar. Okuyamadığını raporlar ve bir
   sayfa yerleştirilemediğinde başarısız olur.
3. **Test.** Workflow yeni veriler üzerinde tür denetimi yapar ve testleri çalıştırır.
4. **Gözden geçirme.** Veriler değiştiyse diff'i ve okunamayan değerlerin listesini içeren tek
   bir pull request açar veya günceller. Bir kişi bunu kaynaklarla karşılaştırır ve merge eder.

Kendiniz çalıştırmak için: `pnpm fetch:sources` (`.sources/` klasörünü yazar), ardından
`pnpm build:data`.

Kantonlar ve belediyeler `pnpm build:cantons` ile elle yeniden oluşturulur: Belgisch Staatsblad /
Moniteur belge'nin (Belçika resmî gazetesi) sitesi GitHub sunucularını reddediyor
([#24](https://github.com/pieterjanscheir/belgica/issues/24)).

## Otomatik kontroller {#automatic-checks}

### Her değişiklikte (CI) {#on-every-change-ci}

- **Şema doğrulama**: her veri dosyası kendi [JSON Schema'sına](./schema) uyar.
- **Bütünlük**: id'ler benzersiz ve doğru biçimlidir; her başvuru (arrondissement, kanton,
  belediye, mahkeme, sınır) var olan bir kayda işaret eder; her kantonun tek bir sınırı vardır,
  Belçika içinde geçerli bir GeoJSON olan bu sınırlar örtüşmeden ülkenin yüzölçümüne eşit olur;
  her belediye tam olarak bir kantondadır ya da birkaç kantona bölünmüştür; her kanton kendi
  arrondissement'ının (adli bölge) eyaletleri içinde kalır; her kantonun tam olarak bir
  vredegerecht / justice de paix'si (kanton düzeyindeki sulh mahkemesi benzeri mahkeme) vardır;
  her bölüm (afdeling / division) kendi mahkemesinin türünü ve alanını taşır; her mahkeme
  türünde yasanın belirlediği sayıda mahkeme vardır; her kanton her türden bir mahkemeye bağlıdır
  (Brüksel'de dil başına bir tane) ve bir mahkemenin kantonları onun arrondissement'ı ve yargı
  çevresi içinde yer alır.
- **Parser'lar**: gerçek sayfaların kırpılmış kopyaları üzerinde uçtan uca test edilir
  (`test/fixtures/sources`); her okuyucu (telefon numaraları, IBAN'lar, adresler, çalışma
  saatleri) de kaynaklarda görülen biçimler ve reddetmesi gerekenler üzerinde test edilir.
- **Faiz oranları**: dönemler sıralıdır, asla örtüşmez ve boşluk bırakmaz; yasal faiz takvim
  yılına, ticari işlemler faizi yarıyıla göre işler; 2013–2015 sözleşme tarihi oranı yalnızca o
  aralıkta görünür.
- **İletişim verileri**: her IBAN, ISO 13616 checksum'ını geçer; telefon numaraları E.164
  biçiminde Belçika numaralarıdır; e-posta adresleri küçük harflidir ve çalışma saatleri
  `opening_hours` sözdizimine uyar.
- **Kod**: katı TypeScript (unchecked index access ve exact optional properties dahil), tür
  bilgisine dayalı kurallarla ESLint, Prettier ve `src/` için %100 test kapsamı.
- **Paketleme**: derlenmiş paket her entry point'ten, Node 22.12, 22, 24 ve 26 üzerinde hem
  `import` hem `require()` ile yüklenir; `publint` ve `arethetypeswrong`, `exports` alanını ve
  tür bildirimlerini denetler.

### Her hafta (zamanlanmış) {#every-week-scheduled}

[Freshness workflow'u](https://github.com/pieterjanscheir/belgica/actions/workflows/freshness.yml)
her pazartesi çalışır ve bir şey bulduğunda
[`data-freshness`](https://github.com/pieterjanscheir/belgica/issues?q=label%3Adata-freshness)
etiketli bir issue açar:

- **Eksik oranlar**: bugün için yasal faiz veya ticari işlemler oranı yok ya da önümüzdeki iki
  hafta için ticari işlemler oranı yok (FOD Financiën bunu yarıyıl başlamadan yayımlar).
- **Gecikmiş gözden geçirmeler**: bir veri kümesinin `datapackage.json` içindeki `lastReviewed`
  tarihi, `reviewEveryMonths` süresinden daha eski.
- **Ölü kaynaklar**: `datapackage.json` içindeki resmî bir kaynak URL'si artık yanıt vermiyor.

Bunları kendiniz `pnpm test:freshness` ile çalıştırın (URL'leri de kontrol etmek için
`FRESHNESS_ONLINE=1` ekleyin).

## Bir değer nasıl okunur {#how-to-read-a-value}

- **Yok, sıfır demek değildir.** `getInterestRate`, kayıtlı oranı olmayan bir gün için tahmin
  yürütmek yerine `null` döndürür; kaynağın vermediği bir alan (bir mahkemenin adresi, makinece
  okunabilir çalışma saatleri) doldurulmak yerine eksik bırakılır. İkisini de ele alın.
- **Çok erken bir hatadır.** Bir veri kümesinin kapsamından önceki bir gün için yapılan sorgu
  `RangeError` fırlatır: veriler bunu bilemez ve bugünün yanıtı doğru yanıt gibi görünürdü.
- **İletişim verileri en az kararlı olanlardır.** Telefon numaraları, e-posta adresleri ve
  çalışma saatleri haber verilmeden değişir. Her kayıt hangi sayfalardan ve ne zaman okunduğunu
  belirtir (`sources`); önemli olduğunda mahkemenin sayfasını (`website`) kontrol edin.
- **Kanun metni üstündür.** Bölünmüş belediyelerde kantonun `territory` alanı yasanın kendi
  metnidir, kelimesi kelimesine. Bir özet ya da NGI'nin [sınırı](/tr/data/canton-boundaries)
  metinle çeliştiğinde doğru olan metindir.

## Hata bildirme {#reporting-a-mistake}

Kaydın id'si ve resmî kaynağa bir bağlantıyla
[bir veri düzeltmesi açın](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml).
Düzeltmeler patch sürümleri olarak yayımlanır.
