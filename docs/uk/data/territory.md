<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# Територія і кантони {#territory-and-cantons}

Судова карта Бельгії має три рівні: **апеляційні округи** (rechtsgebieden / ressorts, по одному
на кожен hof van beroep / cour d'appel) містять **судові округи** (arrondissements), які
містять **кантони** (кожен — територія одного vredegerecht / justice de paix, мирового суду).
Кантони визначено через **громади** (gemeenten / communes). Поряд із судовою картою є
адміністративна: кожна громада лежить у **регіоні** і, за межами Брюсселя, у **провінції**.

## Чим він корисний {#why-it-s-useful}

- **Який vredegerecht / justice de paix?** Спори щодо оренди, дрібні позови, опіка і сусідські
  спори розглядає vredegerecht / justice de paix, зазвичай той, що в кантоні, де проживає
  відповідач або розташоване майно. Помилка з кантоном означає позов, поданий до неправильного
  суду.
- **Який судовий округ?** Rechtbanken van eerste aanleg / tribunaux de première instance,
  ondernemingsrechtbanken / tribunaux de l'entreprise і arbeidsrechtbanken / tribunaux du
  travail, прокуратура, а також територія, на якій може діяти судовий виконавець, — усе це
  організовано за судовими округами.
- **Який hof van beroep / cour d'appel?** Апеляції йдуть до hof van beroep / cour d'appel
  відповідного апеляційного округу.
- **Поєднання даних.** Усе, що має код REFNIS (статистика Statbel, регіональні відкриті дані,
  адресні реєстри), можна нанести на судову карту.

Закон описує кантони прозою («частина території міста Antwerpen, обмежена осьовими лініями
Brouwersvliet…»). Ці файли перетворюють її на дані, зберігаючи текст закону для випадків, коли
вирішити може лише текст.

## Джерело й оновлення {#source-and-updates}

|                  |                                                                                                                                                                                                                                                                                                    |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Джерело          | Додаток до Gerechtelijk Wetboek / Code judiciaire, «Gebiedsomschrijving en zetel van hoven en rechtbanken» ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), нідерландською і французькою; відкриті дані Statbel для громад, провінцій і регіонів |
| Будується        | `pnpm build:cantons` (кантони, громади); щотижневі знімки + `pnpm build:data` (регіони, провінції); вручну (апеляційні й судові округи)                                                                                                                                                            |
| Змінюється, коли | Закон змінює додаток; громади об'єднуються (2019, 2025)                                                                                                                                                                                                                                            |
| Охоплює          | З 1 січня 2025 року: пошук на раніший день викидає `RangeError` ([час](/uk/api#time))                                                                                                                                                                                                              |
| Перевіряється    | Перебудовується вручну командою `pnpm build:cantons`: ejustice відмовляє серверам GitHub ([якість даних](/uk/guide/data-quality))                                                                                                                                                                  |
| Ліцензія         | CC BY 4.0; дані про громади © Statbel, CC BY 4.0                                                                                                                                                                                                                                                   |

## Знайти кантон громади {#find-the-canton-for-a-municipality}

<CantonLookup />

## Апеляційні округи {#judicial-areas}

5 територій hoven van beroep / cours d'appel (rechtsgebieden). Файл: `data/judicial-areas.json`.
Джерело: додаток до Gerechtelijk Wetboek (Ger.W. bijvoegsel), ст. 5.

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

## Судові округи {#arrondissements}

12 судових округів (gerechtelijke arrondissementen / arrondissements judiciaires). Файл:
`data/arrondissements.json`. Джерело: Ger.W. bijvoegsel, ст. 4.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>Апеляційний округ</th></tr></thead>
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

## Кантони {#cantons}

Усі 162 судові кантони: кожен — територія одного vredegerecht / justice de paix. Файл:
`data/cantons.json` (згенерований із додатка до Gerechtelijk Wetboek, ст. 1).

### Поля {#fields}

| Поле             | Тип                            | Опис                                                                                                            |
| ---------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Стабільний id місцевою мовою, з номером для місць із кількома кантонами: `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | Id судового округу                                                                                              |
| `name`           | `{ nl, fr }`                   | Назва кантону, як її наводить додаток                                                                           |
| `number`         | number?                        | Номер кантону в місцях, де їх кілька (Gent 1–5)                                                                 |
| `seat`           | `{ nl, fr }`                   | Де засідає vredegerecht / justice de paix; може відрізнятися від назви                                          |
| `municipalities` | `{ municipality, partial? }[]` | Охоплені громади, за кодом REFNIS; `partial: true`, коли охоплено лише частину                                  |
| `territory`      | `{ nl, fr }`                   | Територія кантону, дослівно з додатка                                                                           |
| `legalBasis`     | `{ url, provision }`           | Де закон його визначає: ELI додатка і розділ, напр. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)                 |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; зазвичай місце засідань, але не завжди
    number?: number // для місць із кількома кантонами (Gent 1–5, …)
    seat: Bilingual // де засідає vredegerecht
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // територія кантону, дослівно з додатка
    legalBasis: { url: string; provision: string } // ELI додатка і розділ
}
```

- **Id** ідуть за місцевою мовою: нідерландська у Фландрії та Брюсселі, французька у Валлонії,
  німецька в районі Eupen; двомовний Брюссель бере нідерландську назву. Див.
  [Ідентифікатори](/uk/guide/identifiers). Vredegerecht / justice de paix пов'язаний зі своїм
  кантоном через своє поле `canton`.
- **Назва і місце засідань можуть різнитися**: кантон `oudergem` засідає в Etterbeek.
- **`partial: true`** позначає громаду, поділену між кількома кантонами. Тоді текст
  `territory` каже, яка частина (вулиці, номери, водні шляхи) належить до цього кантону.
- Назви є лише нідерландською і французькою: додаток не має консолідованого німецького тексту.

### Поділені громади {#split-municipalities}

55 кантонів охоплюють лише частину громади. Для них кантон неможливо визначити лише за громадою:
він залежить від вулиці (а іноді й від номера будинку). Текст `territory` називає межі. Якщо
відомі координати адреси, `findCantonsAt(lon, lat)` з `belgica/canton-boundaries` знаходить
кантон у [межах кантонів](./canton-boundaries) від NGI; без них покажіть кантони-кандидати та
їхній текст і дайте вирішити людині. Де геометрія і текст розходяться, законом є текст.

## Громади {#municipalities}

565 громад із їхнім кодом REFNIS (NIS) від Statbel. Файл: `data/municipalities.json`
(згенерований зі Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // код REFNIS: '44021' для Gent
    name: Bilingual
    province: ProvinceId | '04000' // код REFNIS провінції; '04000' у Брюсселі
    region: RegionId // код REFNIS регіону
}
```

19 громад Брюссельського столичного регіону не мають провінції. Їхня `province` — це `04000`,
код регіону, який Statbel ставить у стовпець провінції у власних файлах, і
`getProvinceForMunicipality` повертає для них `undefined`; `getRegionForMunicipality` дає
регіон. Коди наведено нижче, з даних.

## Регіони {#regions}

3 регіони (gewesten / régions). Файл: `data/regions.json` (згенерований із переліку кодів
REFNIS від Statbel; назви — як їх публікує Statbel). © Statbel, CC BY 4.0.

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
    id: RegionId // код REFNIS: '02000', '03000', '04000'
    name: Translated // { nl, fr, de }, як їх публікує Statbel
    sources: SourceRef[] // перелік кодів REFNIS від Statbel
}
```

## Провінції {#provinces}

10 провінцій із їхнім регіоном. Файл: `data/provinces.json` (згенерований із переліку кодів
REFNIS від Statbel). © Statbel, CC BY 4.0. Брюссельський столичний регіон не має провінції;
провінція Брабант, що припинила існування 31 грудня 1994 року, лежить поза охопленням даних.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>Регіон</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // код REFNIS: '40000' для Oost-Vlaanderen
    name: Translated // { nl, fr, de }, як їх публікує Statbel
    region: RegionId
    sources: SourceRef[] // перелік кодів REFNIS від Statbel
}
```

Назви — від Statbel, включно зі словом, що позначає вид одиниці (`Provincie Oost-Vlaanderen`,
`Province de Flandre orientale`, `Provinz Ostflandern`): пакет зберігає значення так, як їх
публікує джерело, і не скорочує їх.
