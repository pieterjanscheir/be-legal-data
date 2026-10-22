<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Початок роботи {#getting-started}

## Встановлення {#install}

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

Пакет — це ESM, він постачається з власними визначеннями типів, не має залежностей під час
виконання і працює в браузерах та на Node 22.12 або новіших, де його також завантажує
`require()`. Його протестовано на Node 22.12, 22, 24 і 26.

### Імпортуйте лише потрібне {#import-only-what-you-need}

Дані вбудовано в JavaScript, тож імпорт із кореня пакета завантажує всі набори даних. Кожен
набір даних має власний entry point, і найбільші з них — суди та кантони (разом із текстом
закону, що описує їхню територію):

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

Виняток — [межі кантонів](/uk/data/canton-boundaries): мільйон позицій геометрії, лише в
`belgica/canton-boundaries`, і корінь пакета їх ніколи не завантажує.

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">Завантажений JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Розміри вимірюються зі збірки під час побудови сайту (спершу <code>pnpm build</code>).</p>

## Перший погляд {#a-first-look}

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
getCantonsForMunicipality('44021') // Gent 1–5: поділене місто, див. `territory` кожного кантону
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Типові завдання {#common-tasks}

### Який vredegerecht / justice de paix відповідає за адресу? {#which-justice-of-the-peace-handles-an-address}

Vredegerecht / justice de paix — мировий суд, по одному на кожен судовий кантон. Знайдіть код
REFNIS громади, отримайте її кантони, а потім — суд кантону.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // кожен кантон має свій суд
}

// На день вручення повістки, а не на сьогодні
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Якщо місто поділене між кількома кантонами (Antwerpen, Gent, Brussel, Luik, …), ви отримаєте
більше одного результату. Вирішує вулична адреса, а `territory` кожного кантону містить
юридичний опис його частини. Спробуйте на [сторінці території](/uk/data/territory#find-the-canton-for-a-municipality).

Якщо відомі координати адреси, питання вирішують [межі кантонів](/uk/data/canton-boundaries):

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // довгота, широта: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### Який суд для громади? {#which-court-for-a-municipality}

Кожен суд, окрім vredegerecht / justice de paix, перелічує кантони, які він охоплює
(`cantons`), так, як їх визначає закон. `findCompetentCourts` шукає в них кантони громади.

```ts
import { findCompetentCourts, getDivisions } from 'belgica'

findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], не Брюссель
findCompetentCourts('21004', 'labour-court') // нідерландськомовний і франкомовний суди Брюсселя

// Суд у цілому; яке відділення розглядає справу, в даних поки немає
const [court] = findCompetentCourts('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### За поштовим індексом {#from-a-postal-code}

Адреса містить поштовий індекс, а не код REFNIS. `findCourtsForPostalCode` переходить від
поштового індексу до громади ([поштові індекси](/uk/data/postal-codes)), а звідти — до
vredegerechten / justices de paix і до судів певного типу. Відповідь дається для кожної громади
окремо: три поштові індекси (`1040`, `1050`, `1804`) належать двом громадам, і тоді вирішує
вулиця.

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']: вирішує вулиця

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

У місті, поділеному між кантонами, поштовий індекс звужує питання до громади; для кантону
все одно потрібна вулиця, а його межі залишаються юридичним текстом, доки
[#29](https://github.com/pieterjanscheir/belgica/issues/29) не додасть їх як геометрію.

### Проценти, що належать на певний день {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` повертає `null` для дня, для якого ставка невідома, тож ви можете вивести
попередження замість того, щоб мовчки використати 0 %. Для неправильно записаного дня, як-от
`'2024-6-1'`, функція викидає `RangeError`: передавайте `YYYY-MM-DD` або `Date`.

### Назви судів іншою мовою {#court-names-in-another-language}

Назви подано так, як їх публікує кожен суд, усіма мовами, якими він має сторінку. Суд у
Фландрії публікує лише нідерландською; двомовні суди в Брюсселі — нідерландською і
французькою; суди в Eupen — німецькою і французькою.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## Сирий JSON {#raw-json}

Файли даних також експортуються:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## Id — це публічний API {#ids-are-public-api}

Проєкти зберігають id, як-от `justice-of-the-peace-gent-1` чи `oost-vlaanderen`, тож вони
ніколи не змінюються в межах major-версії (див. [Ідентифікатори](./identifiers)), а версії
підпорядковуються таким правилам:

| Зміна                           | Версія |
| ------------------------------- | ------ |
| Додавання даних                 | minor  |
| Виправлення значення            | patch  |
| Видалення або перейменування id | major  |
