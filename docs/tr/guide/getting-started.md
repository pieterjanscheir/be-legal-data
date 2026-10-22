<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Başlarken {#getting-started}

## Kurulum {#install}

::: code-group

```bash [pnpm]
pnpm add belgica
```

```bash [npm]
npm install belgica
```

```bash [yarn]
yarn add belgica
```

:::

Paket ESM'dir, kendi tip tanımlarıyla gelir, hiçbir runtime bağımlılığı yoktur ve tarayıcılarda
ve Node 22.12 veya sonrasında çalışır; orada `require()` ile de yüklenebilir. Node 22.12, 22, 24
ve 26 üzerinde test edilir.

### Yalnızca ihtiyacınız olanı import edin {#import-only-what-you-need}

Veriler JavaScript'in içine paketlenmiştir, bu yüzden paketin kökünden import etmek tüm veri
kümelerini yükler. Her veri kümesinin kendi entry point'i vardır; mahkemeler ve kantonlar (bölge
tanımlarının yasal metniyle birlikte) açık ara en büyükleridir:

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

İstisna [kanton sınırlarıdır](/tr/data/canton-boundaries): bir milyon konumluk geometri, yalnızca
`belgica/canton-boundaries` içinde bulunur ve paketin kökü tarafından asla yüklenmez.

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">Yüklenen JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Boyutlar, site oluşturulurken build çıktısından ölçülür (önce <code>pnpm build</code>).</p>

## İlk bakış {#a-first-look}

```ts
import {
    getCourt,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'belgica'

getCourt('justice-of-the-peace-gent-1').name.nl // 'Vredegerecht Gent 1'
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getCantonsForMunicipality('44021') // Gent 1–5: bölünmüş şehir, her kantonun `territory` alanına bakın
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Sık yapılan işler {#common-tasks}

### Bir adres hangi vredegerecht'e düşer? {#which-justice-of-the-peace-handles-an-address}

Belçika'da her adli kantonun bir vredegerecht / justice de paix'si (sulh mahkemesi benzeri,
kanton düzeyindeki mahkeme) vardır. Belediyenin REFNIS kodunu bulun, kantonlarını alın, ardından
kantonun mahkemesini.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // her kantonun kendi mahkemesi vardır
}

// Bugün yerine, celpnamenin tebliğ edildiği gün itibarıyla
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Bir şehir birden fazla kantona bölünmüşse (Antwerpen, Gent, Brussel, Luik, …), birden fazla sonuç
alırsınız. Bu durumda sokak adresi belirleyicidir; her kantonun `territory` alanı, kendi kısmının
yasal tanımını içerir. [Coğrafya ve kantonlar sayfasında](/tr/data/territory#find-the-canton-for-a-municipality)
deneyebilirsiniz.

Adresin koordinatları elinizdeyse [kanton sınırları](/tr/data/canton-boundaries) soruyu çözer:

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // boylam, enlem: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### Bir belediye için hangi mahkeme? {#which-court-for-a-municipality}

Vredegerecht dışındaki her mahkeme, yasanın belirlediği şekilde kapsadığı kantonları listeler
(`cantons`). `findCompetentCourts`, bir belediyenin kantonlarını bu listelerde arar.

```ts
import { findCompetentCourts, getDivisions } from 'belgica'

findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], Brüksel değil
findCompetentCourts('21004', 'labour-court') // Brüksel'in Hollandaca ve Fransızca konuşan mahkemeleri

// Mahkeme bir bütün olarak; davaya hangi bölümün baktığı henüz verilerde yok
const [court] = findCompetentCourts('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### Posta kodundan {#from-a-postal-code}

Bir adres REFNIS koduyla değil, posta koduyla gelir. `findCourtsForPostalCode` posta kodundan
belediyeye ([posta kodları](/tr/data/postal-codes)), oradan da vredegerecht'lere ve belirli bir
türdeki mahkemelere gider. Yanıtı belediye başına verir: üç posta kodu (`1040`, `1050`, `1804`)
iki belediyeye aittir ve bu durumda sokak belirleyicidir.

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']: sokak belirler

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

Kantonlara bölünmüş bir şehirde posta kodu soruyu belediyeye kadar daraltır; kanton için yine de
sokak gerekir ve kantonun sınırları, [#29](https://github.com/pieterjanscheir/belgica/issues/29)
onları geometri olarak ekleyene kadar yasal metin halindedir.

### Belirli bir gün için faiz {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate`, kayıtlı oranı olmayan bir gün için `null` döndürür; böylece sessizce % 0
kullanmak yerine uyarı verebilirsiniz. `'2024-6-1'` gibi hatalı biçimli bir gün için `RangeError`
fırlatır: `YYYY-MM-DD` veya bir `Date` verin.

### Mahkeme adları başka bir dilde {#court-names-in-another-language}

Adlar, her mahkemenin yayımladığı şekliyle ve sayfası bulunan her dilde yer alır. Flaman Bölgesi'ndeki bir
mahkeme yalnızca Hollandaca yayımlar; Brüksel'deki iki dilli mahkemeler Hollandaca ve Fransızca;
Eupen'deki mahkemeler Almanca ve Fransızca.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## Ham JSON {#raw-json}

Veri dosyaları da export edilir:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## Id'ler herkese açık API'dir {#ids-are-public-api}

Projeler `justice-of-the-peace-gent-1` veya `oost-vlaanderen` gibi id'leri saklar; bu yüzden id'ler
bir major sürüm içinde asla değişmez (bkz. [tanımlayıcılar](./identifiers)) ve sürümler şu
kurallara uyar:

| Değişiklik                                   | Sürüm |
| -------------------------------------------- | ----- |
| Veri eklemek                                 | minor |
| Bir değeri düzeltmek                         | patch |
| Bir id'yi kaldırmak veya yeniden adlandırmak | major |
