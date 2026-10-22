# Tasarım kararları {#design-decisions}

Paket, ilk kullanıcıları gelmeden önce yeniden tasarlandı; bu yüzden her seçim uyumluluk
kaygısıyla değil, kendi değerine göre yapılabildi. Bu sayfa her kararı, neden alındığını ve
neyi beraberinde getirdiğini kaydeder. Yeni bir karar yeni bir madde alır; geri alınan bir karar
silinmez, işaretlenir.

## 1. Ürün veridir; kod bir kolaylıktır {#_1-the-data-is-the-product-the-code-is-a-convenience}

**Karar.** Gerçeğin kaynağı resmî kaynaklardır; `data/` içindeki JSON dosyaları bunlardan
üretilir ve ürünün kendisidir. TypeScript'in hiçbir parçası olmadan kullanılabilirler: Python'dan,
bir hesap tablosundan (sürümlerde CSV tabloları da bulunur) ya da `jq` ile. Her dosyanın yapısı
bir kez, TypeScript türleriyle tanımlanır ve bunlardan üretilen bir JSON Schema olarak yayımlanır;
türler, şemalar ve veriler birbirini tutmadığında CI başarısız olur. Kütüphane türler, indeksler ve
yardımcı fonksiyonlar ekler; verileri anlamak için içindeki hiçbir şeye ihtiyaç yoktur.

**Neden.** Referans verileri, çevresindeki koddan daha uzun yaşar ve Belçika hukuki verilerini
kullananların çoğu JavaScript projesi değildir.

**Sonuç.** Her dosyanın bir [JSON Schema](./schema)'sı ve `datapackage.json` içinde kaynaklarını
ve lisansını belirten bir kaydı vardır. Alan adları ve değerleri yalnızca kodda değil,
belgelerde de açıklanır.

## 2. Hukuki olgular veridir, asla hesaplanmaz {#_2-legal-facts-are-data-never-computed}

**Karar.** Hukuki anlamı olan her şey (bir mahkemenin adı, bir kantonun sınırları, bir faiz oranı)
resmî bir kaynaktan kelimesi kelimesine alınır ve saklanır. Kod biçimlendirebilir veya
arayabilir; hukuki bir olguyu kendisi oluşturamaz.

**Neden.** Bir olguyu bir araya getiren kod, testlerin yakalayamayacağı şekillerde yanlış
olabilir: eski `formatCourtName` fonksiyonunun ürettiği Fransızca mahkeme adları yanlıştı
(mahkemeler kendilerine `Justice de paix …` derken `Tribunal de paix …`; [#10](https://github.com/pieterjanscheir/belgica/issues/10)).
Saklanan bir değer ise kaynağıyla karşılaştırılarak kontrol edilebilir.

**Sonuç.** Mahkeme adları, her mahkemenin yayımladığı haliyle ve yayımladığı her dilde saklanır;
`formatCourtName` kaldırıldı. Kantonların sınırları kelimesi kelimesine hukuk metni olarak kalır ve
hukuki dayanakları bir ELI bağlantısıyla verilir. Bir kaynak eksikse alan da eksiktir: hiçbir şey
tahminle doldurulmaz. Ayrıştırma için de aynısı geçerlidir: içinde not bulunan bir çalışma saatleri
metni, alan kodu olmayan bir telefon numarası ya da cümle olarak yazılmış bir adres tahmin
edilmez, dışarıda bırakılır.

## 3. Tek bir tanımlayıcı kuralı {#_3-one-identifier-rule}

**Karar.** Her kaydı kapsayan resmî bir kod varsa o kod; yoksa yerel dildeki addan türetilen,
küçük harfli kebab-case bir id; mahkemeler için `type` + yer. Yalnızca bazı kayıtları kapsayan
resmî kodlar (ECLI, OVO) birer alandır. Bkz. [tanımlayıcılar](./identifiers).

## 4. Bağlantılar alandır {#_4-links-are-fields}

**Karar.** Kayıtlar birbirine yalnızca diğer kaydın id'sini tutan alanlar üzerinden başvurur; bu
alanlar işaret ettikleri veri kümesinin adını taşır (`arrondissement`, `canton`,
`municipality`). Hiçbir id başka bir id'den türetilmez.

**Neden.** Bir metin biçiminin içine gizlenmiş bir ilişki, taraflardan biri değiştiğinde sessizce
bozulur. Bir alan ise şema (geçerli id'leri listeler) ve testler tarafından doğrulanır.

**Sonuç.** Bir mahkemenin, cezaevinin veya justitiehuis / maison de justice'in adresi kendi
belediyesine aynı şekilde (`address.municipality`) bağlanır: şehir adı üzerinden değil, her zaman
Statbel'in dönüşüm tablosundaki posta kodu üzerinden
([#28](https://github.com/pieterjanscheir/belgica/issues/28)); bir posta kodu kaydı da
belediyenin adını kopyalamak yerine belediyeye bağlanır.

## 5. Kanonik değerler, sunum kodda {#_5-canonical-values-presentation-in-code}

**Karar.** Her değer tek bir kanonik, standart biçimde saklanır; insanlar için biçimlendirme bir
fonksiyonun işidir:

| Değer            | Saklanma biçimi                 | Standart                      |
| ---------------- | ------------------------------- | ----------------------------- |
| Gün              | `2024-06-15`                    | ISO 8601                      |
| Telefon          | `+3253820701`                   | E.164                         |
| IBAN             | `BE73679200844560`              | ISO 13616 elektronik biçim    |
| Çalışma saatleri | `Mo-Fr 08:30-12:30,13:30-16:00` | OpenStreetMap `opening_hours` |
| Dil              | `nl`, `fr`, `de` anahtarları    | ISO 639-1                     |

**Neden.** Değer başına tek bir biçim, değerleri karşılaştırılabilir, doğrulanabilir (IBAN
sağlama toplamı test edilir) ve başka yazılımlar tarafından kullanılabilir kılar (`tel:`
bağlantıları, ödeme sistemleri, çalışma saati ayrıştırıcıları). Gösterim alışkanlıkları bağlama
göre değişir; verinin değişmemesi gerekir.

## 6. Her kayıtta köken bilgisi {#_6-provenance-on-every-record}

**Karar.** Her veri kümesi kaynaklarını, lisansını ve gözden geçirme tarihini
`datapackage.json` içinde listeler; web'den toplanan her kayıt, okunduğu sayfaları ve bu
sayfaların içeriğinin ilk görüldüğü günü listeler (`sources: [{ url, retrieved }]`).

**Neden.** "Bu nereden geliyor ve ne kadar eski?" hukuki veriler için sorulan ilk sorudur.

## 7. Veriler, saklanan anlık görüntülerden makineler tarafından üretilir {#_7-the-data-is-built-by-machines-from-kept-snapshots}

**Karar.** Her hafta bir workflow resmî kaynakları indirir, sayfaları `sources` dalında anlık
görüntüler (snapshot) olarak saklar, `scripts/parse` içindeki ayrıştırıcılarla verileri bunlardan
yeniden üretir, test eder ve bir değişiklik varsa bir pull request açar. Hiçbir şey elle
girilmez. Ayrı bir haftalık iş, eksik faiz oranlarını, gecikmiş gözden geçirmeleri ve artık
çalışmayan kaynakları denetler.

**Neden.** Hukuki veriler sessizce eskir; insanlar unutur, zamanlanmış işler unutmaz. Elle
girilmiş veriler kontrol edilemez ya da yeniden üretilemez; bir ayrıştırıcı test edilebilir ve
anlık görüntüler kaynağın o gün tam olarak ne söylediğini gösterir. Pull request bir insanı
sürecin içinde tutar: `main` içindeki veriler gözden geçirilmeden asla değişmez.

**Sonuç.** Anlık görüntüler kendi dallarında durur; böylece paketin geçmişi megabaytlarca HTML
ile şişmez. Ayrıştırıcılar gerçek sayfaların kırpılmış kopyaları üzerinde test edilir.
Ayrıştırıcının yerleştiremediği bir sayfa, yarı doğru bir kayıt üretmek yerine derlemeyi
durdurur. İki kaynak GitHub'ın sunucularını reddeder (ejustice, police.be); bunlar sıradan bir
makineden indirilir ([#24](https://github.com/pieterjanscheir/belgica/issues/24)).

## 8. Dağıtım: yalnızca ESM, Node 22.12+, sürümde derlenir {#_8-distribution-esm-only-node-22-12-built-on-release}

**Karar.** Paket yalnızca ESM'dir, Node 22.12 veya üstünü gerektirir ve derleme çıktısı
commit'lenmez: release workflow'u tarafından derlenir ve provenance ile npm'e yayımlanır.

**Neden.** Node 18 ve 20'nin desteği sona erdi. Node 22.12'den itibaren `require()` ESM
yükleyebiliyor; bu yüzden ayrı bir CommonJS derlemesi yalnızca verilerin ikinci bir kopyasını
(dual-package hazard) ve test edilecek daha fazla şey eklerdi. Commit'lenmiş derleme çıktısı
eskir ve otomatik bağımlılık güncellemelerini bozuyordu.

**Sonuç.** `import` ve `require()` ikisi de çalışır; Node 22.12, 22, 24 ve 26 üzerinde test
edilir. Her veri kümesinin kendi entry point'i vardır; böylece yalnızca faiz oranlarına ihtiyaç
duyan bir uygulama, mahkemeleri ve her kantonun hukuk metnini değil, birkaç kilobaytı yükler
([başlarken sayfası](./getting-started#import-only-what-you-need) her birini derlemeden ölçer).

## 9. Verinin güvencelerini taşıyan türler {#_9-types-that-carry-the-data-s-guarantees}

**Karar.** Id'ler üretilmiş union türleridir; veri kümeleri `readonly`'dir; bilinen bir id ile
yapılan aramalar `record | undefined` değil, kaydın kendisini döndürür; kapalı sözcük dağarcıkları
(mahkeme türleri, kind değerleri, iletişim türleri) union'dır. İletişim etiketleri ise mahkemenin
yayımladığı haliyle serbest metindir: kapalı bir liste, yüzlerce kalem (griffie / greffe) adını
birkaç kelimeye eşlemek demek olurdu, bu da tahmindir.

**Neden.** Hatalar üretimde değil, kod yazılırken ortaya çıkar ve türler verileri belgeler.

## 10. Kalite kapıları {#_10-quality-gates}

**Karar.** Her değişiklik şunlardan geçer: katı TypeScript (`noUncheckedIndexedAccess` ve
`exactOptionalPropertyTypes` dahil), tür farkındalıklı katı kurallarla ESLint, Prettier, `src/`
için %100 test kapsamı, tüm verilerin JSON Schema doğrulaması, bütünlük testleri (id'ler,
bağlantılar, sayılar, dönemler) ve paketlenmiş paket üzerinde `publint` + `arethetypeswrong`.

**Neden.** Bir referans paketine bağımlı olmak, ancak verileri elle kopyalamaktan daha güvenilirse
değerlidir.

## 11. Zaman modelin bir parçasıdır {#_11-time-is-part-of-the-model}

**Karar.** Kayıtlar bir geçerlilik dönemi taşır (`validFrom`, `validTo`, iki gün de dahil); her
veri kümesi durumu hangi günden itibaren tanımladığını belirtir (`territoryCoverage` ve
`datapackage.json` içinde `temporalCoverage`) ve aramalar isteğe bağlı bir gün alır:
`getCanton(id, { on })`, `getCantonsForMunicipality(refnis, { on })`. Kapsamdan önceki bir
gün `RangeError` fırlatır.

**Neden.** Hukuki sorular belirli bir günle ilgilidir: celpname tebliğ edildiğinde hangi mahkeme
yetkiliydi, fatura vadesi geldiğinde hangi oran geçerliydi. Kantonlar, belediyeler ve mahkemeler
değişir; yalnızca "şimdi"yi bilen bir model geçmişe dair soruları bugünün haritasıyla yanıtlar ve
bunu yaparken doğru görünür. Zamanı sonradan eklemek her id'yi ve her aramayı değiştirirdi; bu
yüzden geçmiş verilere girmeden önce modele girdi
([#27](https://github.com/pieterjanscheir/belgica/issues/27)).

**Sonuç.** Faiz oranlarının zaten dönemleri var. Gün belirtilmeden id ile yapılan bir arama
bugünkü sürümü verir; böylece bilinen id'ler `undefined` olmayan türlerini korur; gün
belirtildiğinde arama hiçbir şey bulamayabilir. Dönemi yalnızca coğrafya değil, her veri kümesi
taşır: kaynağın artık listelemediği, web'den toplanmış bir kayıt silinmez, bir `validTo` ile
emekliye ayrılır (`scripts/parse/retire.ts`); böylece bir id bir kez yayımlandıysa kalır ve
kapanan bir mahkeme, geçen yılki celpnamede adı geçen mahkeme olmaya devam eder.

## 12. Sürümler yalnızca paketi değil, verileri de taşır {#_12-releases-carry-the-data-not-only-the-package}

**Karar.** Her GitHub sürümü verileri JSON ve CSV tabloları olarak, şemalar ve
`datapackage.json` ile birlikte tek bir zip halinde içerir. npm verilere ulaşmanın yollarından
biridir, tek yolu değil.

**Neden.** Belçika hukuki referans verilerine en çok ihtiyaç duyanlar JavaScript ile değil, hesap
tablolarıyla ve başka dillerle çalışır.

## 13. Geometri ikinci bir kaynaktır ve metin üstün gelir {#_13-geometry-is-a-second-source-and-the-text-wins}

**Karar.** Kanton sınırları, Ulusal Coğrafya Enstitüsü'nün (NGI) Gerechtelijk Wetboek / Code
judiciaire ekinin dijitalleştirilmiş halidir; yayımlandığı gibi alınır (köşe köşe, sadeleştirme
olmadan, koordinatlar santimetre hassasiyetinde) ve kantonlarla iki dildeki adları üzerinden,
geri kalanlar için de açık bir takma ad tablosuyla eşleştirilir. Kantonun `territory` metni hukuk
olarak kalır: geometri ile metin çeliştiğinde metin üstün gelir. Geometrinin kendi entry point'i
vardır ve paketin kökü onu yeniden dışa aktarmaz.

**Neden.** NGI'nin poligonları aynı metnin resmî bir okumasıdır; dolayısıyla kaynak gösterilebilir
ve yeniden üretilebilir. Burada sokak verilerinden türetilen bir sınır, kimsenin kontrol
edemeyeceği üçüncü bir okuma olurdu. Sadeleştirme çizgiyi kaydırırdı ve çizgiler en çok
kantonların buluştuğu yerde önemlidir. Bir milyon konum diğer bütün veri kümelerini cüce
bırakırdı; bu yüzden kimse onları yanlışlıkla yüklememelidir.

**Sonuç.** `findCantonsAt(lon, lat)` yanıtını geometriden verir ve belgeler bunu açıkça belirtir;
bir çizgiye yakın bir nokta metne bakılmasını gerektiren bir durumdur. Bir kantonun sınırı yoksa ya
da bir özellik hiçbir kantonla eşleşmiyorsa haftalık derleme başarısız olur
([#29](https://github.com/pieterjanscheir/belgica/issues/29)).

## Henüz karar verilmedi {#not-decided-yet}

| Soru                                                          | Issue                                                                        |
| ------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1 Ocak 2025 öncesi geçmiş                                     | [#27](https://github.com/pieterjanscheir/belgica/issues/27)                  |
| Bir dönem üzerinden faiz hesaplama (gün sayımı, bileşik faiz) | Yöntem içtihada veya resmî bir kılavuza dayandırılabilene kadar planlanmıyor |
