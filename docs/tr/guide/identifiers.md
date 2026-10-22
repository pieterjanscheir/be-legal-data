# Tanımlayıcılar {#identifiers}

Her kaydın bir `id`'si vardır. Diğer kayıtlar, veritabanınız ve URL'leriniz ona başvurur; bu
yüzden bir id bir kez doğru olmalı ve sonra hiç değişmemelidir. Bu sayfa kuralları, her kuralın
neden var olduğunu ve yasa bir id'nin adlandırdığı şeyi değiştirdiğinde ne olduğunu anlatır.

## Kurallar {#the-rules}

1. **Her kaydın bir `id` alanı vardır** ve bu alan kendi veri kümesi içinde benzersizdir. Genel
   kod (bir dizin, bir önbellek, bir form) her veri kümesini aynı şekilde ele alır.
2. **Her kaydı kapsıyorsa resmî kod kazanır.** Resmî makamların bir veri kümesinin her kaydına
   bir kod verdiği yerde id _o koddur_: belediyeler Statbel'in REFNIS kodunu kullanır (Gent için
   `44021`). Yalnızca bazı kayıtları kapsayan bir kod ise alan olarak tutulur: mahkemelerin ECLI
   kodları `ecli` alanında, Flaman justitiehuizen / maisons de justice'in OVO numarası `ovo`
   alanındadır ([neden](#why-not-the-official-court-codes)).
3. **Aksi halde küçük harfli kebab-case ASCII**: `^[a-z0-9]+(-[a-z0-9]+)*$`,
   [`scripts/id.ts`](https://github.com/pieterjanscheir/belgica/blob/main/scripts/id.ts)
   tarafından üretilir: aksanlar atılır, harf veya rakam olmayan her şey tek bir tireye dönüşür.
   `Merelbeke-Melle` → `merelbeke-melle`, `Braine-l'Alleud` → `braine-l-alleud`,
   `Liège` → `liege`.
4. **Yerel dildeki resmî addan**: Flandre'da Felemenkçe, Valonya'da Fransızca, Eupen çevresinde
   Almanca. Brüksel resmî olarak iki dillidir ve sabit bir seçim gerektirir: Felemenkçe.
5. **Numara bir sonektir**: birden fazla kantonu olan yerler `gent-1` … `gent-5` alır.
6. **Mahkemeler `type` + yerdir**: `justice-of-the-peace-gent-1`, `court-of-appeal-liege`. Bir
   vredegerecht / justice de paix (kanton düzeyindeki sulh mahkemesi benzeri mahkeme) kendi
   kantonunun id'sini alır. Brüksel'de aynı türden, her dil için birer tane olan iki mahkeme
   `-nl` veya `-fr` ekler (`police-court-brussel-fr`). Bir bölüm (afdeling / division) veya
   duruşma yeri, mahkemesinin id'sine kendi yerini ekler (`enterprise-court-gent-brugge`). Önek,
   Gent'te bir vredegerecht, bir ondernemingsrechtbank ve bir arbeidsrechtbank olduğunda id'leri
   benzersiz tutar ve kaydın `type` değerinin tam kendisidir; bu yüzden ikinci bir sözcük
   dağarcığına hiç gerek kalmaz.
7. **Cezaevleri ve justitiehuizen kendi adlarıdır**, yerel dilde ve tanımlık olmadan:
   `gevangenis-gent`, `prison-lantin`, `justitiehuis-gent`, `maison-justice-arlon`. Adları zaten
   ne olduklarını söyler ve aynı şehirdeki iki kurum (Leuven'in merkez cezaevi ve yardımcı
   cezaevi) adlarıyla ayrılır.
8. **Bağlantılar alandır, asla türetilmiş string değildir.** Bir vredegerecht'in `canton` alanı
   vardır; bir kanton `{ municipality }` listeler; bir arrondissement'ın (adli bölge) bir
   `judicialArea` alanı vardır. Her biri işaret ettiği kaydın id'sini tutar ve alan, işaret ettiği
   veri kümesinin adını taşır.

Bunların hepsi testlerle (`test/ids.test.ts`) ve geçerli id'leri listeleyen
[JSON Schema'larla](./schema) zorunlu kılınır; böylece boşa düşen bir bağlantı doğrulamadan
geçemez.

## Id'ler {#the-ids}

| Veri kümesi        | Örnekler                                                                                                                  | Kural                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| Yargı çevreleri    | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                                                                           | Yerel ad                 |
| Arrondissement'lar | `oost-vlaanderen`, `brabant-wallon`, `eupen`                                                                              | Yerel ad                 |
| Kantonlar          | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1`                                                  | Yerel ad + numara        |
| Kanton sınırları   | `gent-1`: kanton başına bir sınır, kantonun id'siyle ve bağlantı olarak `canton` ile                                      | Kantonun id'si           |
| Belediyeler        | `44021`, `21004`                                                                                                          | REFNIS kodu              |
| Eyaletler          | `10000`, `40000`                                                                                                          | REFNIS kodu              |
| Bölgeler           | `02000`, `03000`, `04000`                                                                                                 | REFNIS kodu              |
| Posta kodları      | `9000-44021`, `1040-21005`                                                                                                | Posta kodu + REFNIS kodu |
| Mahkemeler         | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`, `police-court-brussel-fr`, `police-court-eupen-sankt-vith` | Tür + yer                |
| Cezaevleri         | `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                               | Yerel ad                 |
| Justitiehuizen     | `justitiehuis-gent`, `maison-justice-arlon`                                                                               | Yerel ad                 |
| Faiz oranları      | `legal`, `commercial`                                                                                                     | Sabit anahtarlar         |

## Bu tercihlerin nedenleri {#why-these-choices}

**Neden kebab-case?** Id'ler URL'lere (`/cantons/gent-1`), dosya adlarına, CSS sınıflarına,
veritabanı anahtarlarına ve log satırlarına girer. Küçük harf, büyük/küçük harf duyarsız
sistemlerde (macOS ve Windows dosya sistemleri, birçok veritabanı collation'ı) çakışmaları önler:
`Gent1` ve `gent1` verilerde iki id, diskte ise tek dosya olurdu. Tireler büyük harf olmadan da
sözcük sınırlarını okunur tutar ve karakter kümesi hiçbir yerde kaçış (escape) gerektirmez.

**Neden numara ya da UUID yerine okunabilir id'ler?** Bir referans veri kümesini insanlar okur:
bir veritabanı satırında ya da hata mesajında `justice-of-the-peace-gent-1` size ne olduğunu
söyler. Id'ler numaralar kadar kararlıdır, çünkü yalnızca yasa adlandırdıkları şeyi
değiştirdiğinde değişirler (aşağıya bakın) ve o durumda yeni bir id zaten doğru sonuçtur.

**Neden İngilizce değil de yerel dil?** İngilizce adlar yalnızca birkaç yer için vardır (Ghent,
Antwerp, Liege), 162 kanton için yoktur; İngilizce id'ler iki kural demek olurdu. Yerel ad aynı
zamanda kurumun kendisinin kullandığı addır ve resmî metinlerde geçer.

**Neden resmî kodlar?** REFNIS; Statbel'in, bölgelerin ve neredeyse her Belçika veri kümesinin
kullandığı koddur. Kod id olunca bunlardan herhangi birini kantonlara ve mahkemelere bağlamak için
eşleme tablosu gerekmez.

**Bir posta kodu için neden iki kod?** Tek başına bir posta kodu bir kaydı adlandırmaz: `1040`
hem Brussel'e hem Etterbeek'e aittir ve her çift, kendi geçerliliği olan ayrı bir kayıttır. Resmî
kodlardan oluşan çift, `1040-21005`, benzersizdir ve Statbel'in tablosu çifti değiştirene kadar
aynı kalır; yeni bir kaydın doğru olduğu an da tam olarak budur. Belediye ayrıca bir alandır
(`municipality`), 8. kuralın istediği gibi: id bir anahtardır, bölünecek bir şey değildir.

**Mahkeme id'lerinde neden `type`?** Aynı yerde birden fazla mahkeme vardır ve mahkeme türleri
artacaktır (politierechtbanken, arbeidsrechtbanken, rechtbanken van eerste aanleg…). Bir
mahkemenin ne olduğunu kendi alanları söyler; id'nin yalnızca benzersiz ve tanınabilir olması
gerekir, tür de ikisini birden sağlar.

**Neden resmî mahkeme kodları değil?** Mahkemelerin iki resmî kodu vardır ve hiçbiri her
mahkemeyi kapsamaz. ECLI kodları (Gent hof van beroep / cour d'appel için `HBGNT`) bölüm başına
değil, mahkeme ve dil başına vardır ve vredegerecht'lerin yayımlanmış kararlarında hiç görünmez.
İşletme numaraları (KBO) FOD Justitie / SPF Justice'e aittir; onun şube birimleri mahkemeleri
değil binaları izler ve bir mahkeme taşındığında değişir. Her kayıt için geçerli tek kural iki
kuraldan iyidir; bu yüzden ECLI kodları bir alandır (`ecli`) ve id 6. kurala uyar.

**Neden açık bağlantılar?** Eski şema bir mahkeme id'sini `Vredegerecht` ile kanton id'sini
birleştirerek kuruyordu. Bu, bir ilişkiyi string formatının içine gizler; bir mahkeme iki kantona
hizmet ettiği ya da bir ad değiştiği anda bozulur. Bir `canton` alanı ise şema ve testler
tarafından denetlenir ve iki yönde de izlenebilir.

## TypeScript'te {#in-typescript}

Her veri kümesinin üretilmiş bir id türü vardır (`CantonId`, `CourtId`, `MunicipalityId`,
`ProvinceId`, `RegionId`, `ArrondissementId`, `JudicialAreaId`, `PrisonId`, `HouseOfJusticeId`,
`PostalCodeId`); bunlar `pnpm build:ids` ile verilerden yeniden üretilir:

```ts
import { getCanton, type CantonId } from 'belgica'

getCanton('gent-1') // Canton: bilinen bir id kaydını her zaman bulur
getCanton(userInput) // Canton | undefined: başka bir string bulamayabilir

const id: CantonId = 'gent1' // derleme hatası: kanton id'si değil
```

Sakladığınız değerler için id türlerini kullanın; böylece bir yazım hatası ya da kaldırılmış bir
id, sürüm yükselttiğinizde yakalanır.

## Yasa bir id'yi değiştirdiğinde {#when-the-law-changes-an-id}

Kantonlar ve belediyeler gerçekten değişir: belediyeler 2019'da ve 2025'te birleşti, yasalar da
kantonları yeniden çizer. Kayıtlar bir geçerlilik dönemi taşır (`validFrom`, `validTo`); böylece
bir değişiklik geçmişi silmek yerine ona ekleme yapar:

1. Eski kayıt `validTo` ile kalır; yenisi yeni bir id ve bir `validFrom` alır. Bir id asla başka
   bir şey için yeniden kullanılmaz; bu yüzden yıllar önce saklanmış bir id, kastettiği şeyi hâlâ
   bulur.
2. Gün verilmezse sorgular bugüne göre yanıt verir: id ile yapılan bir sorgu bugün geçerli olan
   sürümü (sona ermiş bir kayıt için son sürümü) verir, `getCantonsForMunicipality` gibi listeler
   ise yalnızca bugün geçerli olanları. `{ on }` ile ikisi de o güne göre yanıt verir.
3. Değişiklik günlüğü her yeni id'yi ve yerini aldığı id'leri listeler.

Yalnızca bir ad değişikliği, örneğin bir yazım düzeltmesi, id'yi değiştirmez. 1 Ocak 2025
öncesindeki geçmiş henüz verilerde yok
([#27](https://github.com/pieterjanscheir/belgica/issues/27)): daha önceki bir gün için yapılan
sorgu, bugünün haritasıyla yanıt vermek yerine bir `RangeError` fırlatır.

## Id'ler opaktır {#ids-are-opaque}

Bir id bir anahtardır, bir format değildir.
`court-of-first-instance-luxembourg-marche-en-famenne` tekrar tür, yer ve bölüm olarak
ayrıştırılamaz, çünkü tür, yer ve dil soneki aynı tireyi kullanır. Id'leri parse etmeyin: bir
id'nin her parçası aynı zamanda bir alandır (`type`, `court`, `canton`, `arrondissement`) ve
şemaların ve testlerin denetlediği de bu alanlardır.

## Kararlılık {#stability}

Id'ler public API'dir. Kayıt eklemek minor sürüm, bir değeri düzeltmek patch, bir id'yi kaldırmak
veya yeniden adlandırmak major sürümdür. 0.3.0 sürümü, paketin henüz hiç kullanıcısı yokken eski
PascalCase id'lerin (`VredegerechtGent1`, `EastFlanders`) yerine bu şemayı getirir;
[değişiklik günlüğü](./changelog) eşlemeyi listeler.

Bu söz yalnızca verilmekle kalmaz, denetlenir. `ids.lock.json` paketin yayımladığı her id'yi veri
kümesi başına listeler; `pnpm generate` buna yeni id'ler ekler ve hiçbirini silmez,
`test/ids.test.ts` ise kilitli bir id verilerde eksikse başarısız olur. Böylece başlığı değişmiş
bir sayfayı okuyan bir scraper, yeniden üretilmiş bir kanton listesi ya da elle yapılan bir
düzenleme bir id'yi fark edilmeden düşüremez veya yeniden adlandıramaz: haftalık veri pull
request'i başarısız olur ve bir kişi parser'da yeni adı mevcut id'ye eşler ya da kaydı bir
`validTo` ile sonlandırır. Bir id'yi kilitten çıkarmak bilinçli bir eylemdir; bir major sürüm
için yapılır ve id ile yerine geçen id değişiklik günlüğünde yer alır.
