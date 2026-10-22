<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# Coğrafya ve kantonlar {#territory-and-cantons}

Belçika'nın adli haritası üç düzeyden oluşur: **yargı çevreleri** (rechtsgebieden / ressorts; her
hof van beroep / cour d'appel için bir tane) **arrondissement**'ları (adli bölgeler), onlar da
**kanton**ları (adli kantonlar; her birinde bir vredegerecht / justice de paix, yani sulh
mahkemesi benzeri, kanton düzeyindeki mahkeme) kapsar. Kantonlar **belediyeler** üzerinden
tanımlanır. Adli haritanın yanında bir de idari harita vardır: her belediye bir **bölge** içinde
ve Brüksel dışında bir **eyalet** içinde yer alır.

## Neden işe yarar {#why-it-s-useful}

- **Hangi vredegerecht?** Kira uyuşmazlıkları, küçük alacaklar, vesayet ve komşuluk
  uyuşmazlıkları vredegerecht'e gider; genellikle davalının oturduğu ya da taşınmazın bulunduğu
  kantonunkine. Kantonu yanlış belirlemek, davanın yanlış mahkemeye açılması demektir.
- **Hangi arrondissement?** Rechtbank van eerste aanleg / tribunal de première instance,
  ondernemingsrechtbank / tribunal de l'entreprise ve arbeidsrechtbank / tribunal du travail,
  savcılık ve bir icra memurunun (gerechtsdeurwaarder / huissier de justice) görev yapabileceği
  alan, hepsi arrondissement bazında düzenlenir.
- **Hangi hof van beroep?** İstinaf başvuruları, yargı çevresinin hof van beroep'una gider.
- **Verileri birleştirmek.** REFNIS kodu olan her şey (Statbel istatistikleri, bölgesel açık
  veriler, adres sicilleri) adli haritaya yerleştirilebilir.

Kanun kantonları düz metinle tarif eder ("Antwerpen şehri topraklarının Brouwersvliet'in orta
hatlarıyla sınırlanan kısmı…"). Bu dosyalar bunu veriye dönüştürür ve yalnızca metnin karar
verebildiği durumlar için kanun metnini saklar.

## Kaynak ve güncellemeler {#source-and-updates}

|                  |                                                                                                                                                                                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Kaynak           | Gerechtelijk Wetboek / Code judiciaire'in eki, "Gebiedsomschrijving en zetel van hoven en rechtbanken" ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), Felemenkçe ve Fransızca; belediyeler, eyaletler ve bölgeler için Statbel açık verileri |
| Oluşturan        | `pnpm build:cantons` (kantonlar, belediyeler); haftalık anlık görüntüler + `pnpm build:data` (bölgeler, eyaletler); elle (yargı çevreleri, arrondissement'lar)                                                                                                                                   |
| Ne zaman değişir | Bir kanun eki değiştirdiğinde; belediyeler birleştiğinde (2019, 2025)                                                                                                                                                                                                                            |
| Kapsam           | 1 Ocak 2025 ve sonrası: daha önceki bir gün için yapılan sorgular `RangeError` fırlatır ([zaman](/tr/api#time))                                                                                                                                                                                  |
| Kontrol          | `pnpm build:cantons` ile elle yeniden oluşturulur: ejustice, GitHub'ın sunucularını reddeder ([veri kalitesi](/tr/guide/data-quality))                                                                                                                                                           |
| Lisans           | CC BY 4.0; belediye verileri © Statbel, CC BY 4.0                                                                                                                                                                                                                                                |

## Bir belediyenin kantonunu bulun {#find-the-canton-for-a-municipality}

<CantonLookup />

## Yargı çevreleri {#judicial-areas}

Hof van beroep / cour d'appel'lerin 5 yargı çevresi (rechtsgebieden). Dosya:
`data/judicial-areas.json`. Kaynak: Gerechtelijk Wetboek'un eki (Ger.W. bijvoegsel), md. 5.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="a in judicialAreas" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface JudicialArea {
    id: JudicialAreaId // 'gent'
    name: Translated // { nl, fr, de }
}
```

## Arrondissement'lar {#arrondissements}

12 adli arrondissement. Dosya: `data/arrondissements.json`. Kaynak: Ger.W. bijvoegsel md. 4.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>Yargı çevresi</th></tr></thead>
<tbody>
<tr v-for="a in arrondissements" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
<td>{{ getJudicialArea(a.judicialArea)?.name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Arrondissement {
    id: ArrondissementId // 'oost-vlaanderen'
    name: Translated
    judicialArea: JudicialAreaId
}
```

## Kantonlar {#cantons}

162 adli kantonun tamamı: her biri bir vredegerecht'in alanı. Dosya: `data/cantons.json`
(Gerechtelijk Wetboek'un ekinden, md. 1, üretilir).

### Alanlar {#fields}

| Alan             | Tür                            | Açıklama                                                                                                   |
| ---------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Yerel dilde kararlı id, birden çok kantonu olan yerlerde numarayla: `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | Arrondissement id'si                                                                                       |
| `name`           | `{ nl, fr }`                   | Kantonun ekte verilen adı                                                                                  |
| `number`         | number?                        | Birden çok kantonu olan yerlerde kanton numarası (Gent 1–5)                                                |
| `seat`           | `{ nl, fr }`                   | Vredegerecht'in bulunduğu yer; addan farklı olabilir                                                       |
| `municipalities` | `{ municipality, partial? }[]` | Kapsanan belediyeler, REFNIS koduyla; yalnızca bir kısmı kapsanıyorsa `partial: true`                      |
| `territory`      | `{ nl, fr }`                   | Kantonun alanı, ekten kelimesi kelimesine                                                                  |
| `legalBasis`     | `{ url, provision }`           | Kanunun onu tanımladığı yer: ekin ELI'si ve bölümü, örn. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)       |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; genellikle merkez yer, ama her zaman değil
    number?: number // birden çok kantonu olan yerler için (Gent 1–5, …)
    seat: Bilingual // vredegerecht'in bulunduğu yer
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // kantonun alanı, ekten kelimesi kelimesine
    legalBasis: { url: string; provision: string } // ekin ELI'si ve bölümü
}
```

- **Id'ler** yerel dili izler: Flaman Bölgesi'nde ve Brüksel'de Felemenkçe, Valon Bölgesi'nde
  Fransızca, Eupen çevresinde Almanca; iki dilli Brüksel Felemenkçe adı alır. Bkz.
  [tanımlayıcılar](/tr/guide/identifiers). Vredegerecht, `canton` alanı aracılığıyla kantonuna
  bağlanır.
- **Ad ve merkez farklı olabilir**: `oudergem` kantonunun vredegerecht'i Etterbeek'tedir.
- **`partial: true`**, birden çok kantona bölünmüş bir belediyeyi işaretler. Bu durumda
  `territory` metni hangi kısmın (sokaklar, numaralar, su yolları) bu kantona ait olduğunu
  söyler.
- Adlar yalnızca Felemenkçe ve Fransızcadır: ekin konsolide bir Almanca metni yoktur.

### Bölünmüş belediyeler {#split-municipalities}

55 kanton bir belediyenin yalnızca bir kısmını kapsar. Bunlarda kanton yalnızca belediyeden
belirlenemez: sokağa (ve bazen kapı numarasına) bağlıdır. `territory` metni sınırları adlandırır.
Adresin koordinatları varsa, `belgica/canton-boundaries` içindeki `findCantonsAt(lon, lat)`
kantonu NGI'nin [kanton sınırları](./canton-boundaries) içinde bulur; koordinatlar yoksa aday
kantonları ve metinlerini gösterin ve kararı bir insana bırakın. Geometri ile metin
uyuşmadığında kanun metindir.

## Belediyeler {#municipalities}

Statbel REFNIS (NIS) kodlarıyla 565 belediye. Dosya: `data/municipalities.json` (Statbel'den
üretilir). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // REFNIS kodu: Gent için '44021'
    name: Bilingual
    province: ProvinceId | '04000' // eyaletin REFNIS kodu; Brüksel'de '04000'
    region: RegionId // bölgenin REFNIS kodu
}
```

Brüksel-Başkent Bölgesi'nin 19 belediyesinin eyaleti yoktur. Bunların `province` değeri
bölgenin kodu olan `04000`'dır; Statbel de kendi dosyalarının eyalet sütununa bunu yazar.
`getProvinceForMunicipality` bunlar için `undefined` döndürür; `getRegionForMunicipality` ise
bölgeyi verir. Kodlar aşağıda, verilerden alınarak listelenmiştir.

## Bölgeler {#regions}

3 bölge (gewesten, régions). Dosya: `data/regions.json` (Statbel'in REFNIS kod listesinden
üretilir; adlar Statbel'in yayımladığı gibidir). © Statbel, CC BY 4.0.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="r in regions" :key="r.id">
<td><code>{{ r.id }}</code></td><td>{{ r.name.nl }}</td><td>{{ r.name.fr }}</td><td>{{ r.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface Region {
    id: RegionId // REFNIS kodu: '02000', '03000', '04000'
    name: Translated // { nl, fr, de }, Statbel'in yayımladığı gibi
    sources: SourceRef[] // Statbel'in REFNIS kod listesi
}
```

## Eyaletler {#provinces}

Bölgeleriyle birlikte 10 eyalet (provincies, provinces). Dosya: `data/provinces.json` (Statbel'in
REFNIS kod listesinden üretilir). © Statbel, CC BY 4.0. Brüksel-Başkent Bölgesi'nin eyaleti
yoktur; 31 Aralık 1994'te sona eren Brabant eyaleti, verilerin kapsamından öncesine aittir.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>Bölge</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // REFNIS kodu: Oost-Vlaanderen için '40000'
    name: Translated // { nl, fr, de }, Statbel'in yayımladığı gibi
    region: RegionId
    sources: SourceRef[] // Statbel'in REFNIS kod listesi
}
```

Adlar, birim türünü belirten kelime de dahil olmak üzere Statbel'e aittir
(`Provincie Oost-Vlaanderen`, `Province de Flandre orientale`, `Provinz Ostflandern`): paket
değerleri kaynağın yayımladığı gibi saklar ve kısaltmaz.
