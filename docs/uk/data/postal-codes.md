# Поштові індекси {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Файл: `data/postal-codes.json`. Бельгійські поштові індекси ({{ stats.postalCodes.codes }}),
кожен пов'язаний із громадою, до якої він належить, за кодом REFNIS: {{ stats.postalCodes.records }}
записів, бо {{ stats.postalCodes.shared }} поштові індекси належать двом громадам.

## Чим він корисний {#why-it-s-useful}

- **Від адреси до судової карти.** Адреси містять поштовий індекс, а не код REFNIS. Поштовий
  індекс дає громаду, а громада — свої кантони й суди:
  `findCourtsForPostalCode('9050', 'labour-court')` відповідає на питання «який суд для цієї
  адреси?» настільки, наскільки це дозволяє поштовий індекс.
- **Поштові індекси громади.** Валідація форми, адресування розсилки, перевірка, чи
  узгоджуються адреса і код REFNIS: `getPostalCodes('44021')`.
- **Громада кожного суду, в'язниці та justitiehuis / maison de justice.** Їхня
  `address.municipality` — це саме цей зв'язок, застосований до поштового індексу опублікованої
  адреси ([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

## Джерело й оновлення {#source-and-updates}

|                  |                                                                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Джерело          | [Таблиця відповідності поштових індексів кодам REFNIS](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie) від Statbel, таблиця, чинна з 1 січня 2025 року (`…_va01012025.xlsx`)   |
| Будується        | `scripts/parse/postal-codes.ts` зі щотижневих знімків. Збірка падає, коли індекс вказує на код REFNIS, якого немає в `municipalities.json`, або коли громада не має індексу                                   |
| Змінюється, коли | Statbel публікує нову таблицю: громади об'єднуються, bpost додає чи скасовує поштовий індекс                                                                                                                  |
| Охоплює          | З 1 січня 2025 року: пошук на раніший день викидає `RangeError` ([час](/uk/api#time)). Пізніша таблиця дає парам, які вона вилучає, `validTo`, а парам, які додає, — `validFrom`, у день, з якого таблиця діє |
| Перевіряється    | Щотижня, через [sources workflow](/uk/guide/data-quality#how-the-data-is-built)                                                                                                                               |
| Ліцензія         | © Statbel, [CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                                      |

Statbel будує таблицю з поштових відділень bpost і громад FOD Financiën / SPF Finances. Вона
також містить назву громади в кожному рядку, але тут її не зберігають: у кількох місцях вона
відрізняється від власного переліку REFNIS від Statbel (`Tongeren-Borgloon`, де перелік каже
`Tongres-Looz`, і `Saint-Nicolas` для Sint-Niklaas), а запис посилається на свою громаду, а не
копіює її. Назви містить `getMunicipality(record.municipality).name`.

## Спільні поштові індекси {#shared-postal-codes}

Громада має кілька поштових індексів (Gent — десять), а поштовий індекс належить одній громаді,
за трьома винятками:

| Поштовий індекс | Громади                                         |
| --------------- | ----------------------------------------------- |
| `1040`          | Brussel (`21004`) і Etterbeek (`21005`)         |
| `1050`          | Brussel (`21004`) і Elsene (`21009`)            |
| `1804`          | Vilvoorde (`23088`) і Zemst (`23096`): Cargovil |

Для них вирішує вулиця. `getMunicipalitiesForPostalCode` повертає обидві громади, а
`findCourtsForPostalCode` відповідає для кожної громади окремо, тож спільний індекс ніколи не
зводиться мовчки до однієї з них.

## Поля {#fields}

| Поле                   | Тип              | Опис                                                                                                                                                                   |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PostalCodeId`   | Поштовий індекс і код REFNIS, з'єднані: `9000-44021`. Жоден окремо не визначає запис; разом вони і офіційні, і унікальні. Див. [Ідентифікатори](/uk/guide/identifiers) |
| `validFrom`, `validTo` | string?          | Дні, протягом яких пара чинна, як їх дають таблиці Statbel; якщо немає — від початку охоплення або досі чинна. Див. [час](/uk/api#time)                                |
| `postalCode`           | string           | Чотиризначний поштовий індекс                                                                                                                                          |
| `municipality`         | `MunicipalityId` | Громада, до якої належить поштовий індекс, за кодом REFNIS                                                                                                             |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## Чого тут немає {#what-isn-t-in-it}

- **Частин громад** (deelgemeenten, sections de commune): таблиця Statbel закінчується на рівні
  громади. Власний список поштових індексів bpost називає населені пункти, але не містить коду
  REFNIS і публікується за умовами використання bpost (усі права захищено), а не за відкритою
  ліцензією, тож він не використовується.
- **Вулиці.** У місті, поділеному між кантонами (Antwerpen, Gent, Brussel, Luik, …), поштовий
  індекс дає громаду, а громада — кілька кантонів; далі вирішує вулиця, а межі існують лише як
  юридичний текст у `territory` кожного кантону, доки
  [#29](https://github.com/pieterjanscheir/belgica/issues/29) не додасть їх як геометрію.

## Допоміжні функції {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// Для кожної громади: її vredegerechten і її суди запитаного типу
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
