# Межі кантонів {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

Файл: `data/canton-boundaries.json`. Межа кожного із судових кантонів (усього {{ stats.cantons }})
як геометрія GeoJSON, оцифрована Національним географічним інститутом (NGI) з додатка до
Gerechtelijk Wetboek / Code judiciaire (Судового кодексу).

## Чим він корисний {#why-it-s-useful}

- **Кантон адреси в поділеному місті.** {{ stats.splitCantons }} кантонів охоплюють лише
  частину громади (Antwerpen, Gent, Brussel, Luik, Charleroi, …), і
  `getCantonsForMunicipality` може лише перелічити кандидатів. Якщо адресу геокодовано,
  `findCantonsAt(lon, lat)` дає один кантон, а отже — і vredegerecht / justice de paix.
- **Карти.** Геометрія — це стандартний GeoJSON у WGS 84: малюйте кантони на карті, поєднуйте
  їх з іншими геоданими або завантажуйте в PostGIS, QGIS чи електронну таблицю з картою.
- **Перевірка тексту закону.** Полігони NGI — це друге прочитання того самого додатка, поряд із
  текстом `territory` кожного кантону.

::: warning Текст закону має перевагу
Межа — це тлумачення NGI додатка до Gerechtelijk Wetboek / Code judiciaire, оцифроване за
кадастровими межами громад, водотоками і дорогами. Сам додаток, дослівно наведений у
`territory` кожного кантону, — це закон. Для точки поблизу лінії межі читайте текст; він
називає вулиці й номери будинків.
:::

## Джерело й оновлення {#source-and-updates}

|                  |                                                                                                                                                                                                                                           |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Джерело          | NGI, [Судові кантони й округи](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3) (Територіальний поділ) на geo.be: GeoPackage у WGS 84 (EPSG:4326), тип об'єктів `judicialcanton`, переглянутий 16 липня 2026 року |
| Ліцензія         | © NGI, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                          |
| Будується        | `scripts/parse/boundaries.ts` зі щотижневого знімка GeoPackage                                                                                                                                                                            |
| Змінюється, коли | NGI публікує нову версію: щороку, коли оновлюються межі громад FOD Financiën / SPF Finances, або коли закон змінює додаток                                                                                                                |
| Охоплює          | З 21 жовтня 2026 року, дня, коли файл було вперше прочитано: пошук на раніший день викидає `RangeError` ([час](/uk/api#time))                                                                                                             |
| Перевіряється    | Щотижня, через [sources workflow](/uk/guide/data-quality#how-the-data-is-built): збірка падає, коли кантон не має межі або межа не відповідає жодному кантону                                                                             |

Як NGI проводив межі, за його власними словами: там, де додаток посилається на межі громад, він
використав кадастрові межі FOD Financiën / SPF Finances; там, де посилається на водотоки чи
дороги, — власні топографічні дані NGI; там, де посилається на колишні громади, — межі NGI для
них. Масштаб — 1:10 000.

## Поля {#fields}

| Поле                   | Тип                    | Опис                                                                                                                                                                       |
| ---------------------- | ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | Id кантону: кантон має одну межу, яка бере його ключ                                                                                                                       |
| `validFrom`, `validTo` | string?                | Дні, протягом яких запис чинний; якщо немає — від початку охоплення або досі чинний. Див. [час](/uk/api#time)                                                              |
| `canton`               | `CantonId`             | Кантон, якому належить межа                                                                                                                                                |
| `ngiId`                | string                 | Ідентифікатор об'єкта в NGI (його `tgid`), GUID                                                                                                                            |
| `cantonCode`           | `{ nl, fr }`           | Код кантону в даних NGI: шість цифр (`248112` для Gent 1), з префіксом `N` або `F` для кожної мови в Брюссельському столичному регіоні та в Sint-Genesius-Rode (`N238104`) |
| `geometry`             | `MultiPolygon`         | GeoJSON ([RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)): WGS 84, спершу довгота, зовнішні кільця проти годинникової стрілки, отвори — за годинниковою                 |
| `sources`              | `{ url, retrieved }[]` | Файл NGI, з якого прочитано запис                                                                                                                                          |

```ts
interface CantonBoundary {
    id: CantonId // 'gent-1'
    canton: CantonId // 'gent-1'
    ngiId: string // '{3905ED53-F233-4C4E-8225-4E43FEC7C541}'
    cantonCode: Bilingual // { nl: '248114', fr: '248114' }
    geometry: MultiPolygon // { type: 'MultiPolygon', coordinates: [[[[lon, lat], …]]] }
    sources: SourceRef[]
}
```

Геометрія належить NGI, вершина за вершиною: нічого не спрощено. Координати округлено до
7 знаків після коми, приблизно до сантиметра, що нижче за власну точність джерела. Кожна межа —
це один `MultiPolygon`, навіть якщо в ній один полігон, тож усі записи мають однакову структуру.

### Як кантони зіставляються з об'єктами NGI {#how-cantons-are-matched-to-the-ngi-s-features}

NGI називає кожен об'єкт нідерландською і французькою (`Eerste gerechtelijk kanton Gent`,
`Premier canton judiciaire de Gand`). Об'єкт є межею кантону, коли обидві назви, перетворені на
id [звичайним способом](/uk/guide/identifiers), дають цей кантон і збігаються щодо його номера.
Сім об'єктів названо обома мовами місцевою назвою там, де додаток використовує екзонім
(`Canton judiciaire de Halle`, де додаток каже `Hal`; `Gerechtelijk kanton Huy`, де він каже
`Hoei`); їх зіставлено за кодом кантону в `CANTON_ALIASES` у парсері. Будь-що інше зупиняє
збірку.

## Розмір {#size}

Межі — найбільший набір даних з великим відривом: близько мільйона позицій. Вони мають власний
entry point, `belgica/canton-boundaries`, і корінь пакета їх не реекспортує, тож ніщо не
завантажує їх, якщо про це не попросить:

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">Завантажений JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Розміри вимірюються зі збірки під час побудови сайту (спершу <code>pnpm build</code>).</p>

Сирий файл, `data/canton-boundaries.json`, є в npm-пакеті і в кожному релізі, тож Python,
PostGIS і ГІС-інструменти можуть читати його без JavaScript.

## Пошук кантону точки {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// Спершу довгота, потім широта, як їх упорядковує GeoJSON
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // куди подавати

findCantonsAt(2.3522, 48.8566) // [] : Париж, поза Бельгією
getCantonBoundary('gent-1').geometry // MultiPolygon
```

`findCantonsAt` повертає один кантон для точки в Бельгії, жодного — поза нею, і обидва кантони
для точки точно на лінії між двома. Залежностей не потрібно: звичайна перевірка «точка в
полігоні» по межах, близько мілісекунди на пошук. Геокодування адреси (вулиця й номер →
координати) — ваша справа: це роблять адресні реєстри регіонів (Adressenregister у Фландрії,
UrbIS у Брюсселі, ICAR у Валлонії) і федеральні адресні дані BeSt на geo.be.

## Іншими мовами {#in-other-languages}

Файл — це звичайна геометрія GeoJSON для кожного запису, тож його прочитає будь-яка ГІС. У
Python із Shapely:

```python
import json
from shapely.geometry import Point, shape

boundaries = json.load(open("data/canton-boundaries.json"))
polygons = {b["canton"]: shape(b["geometry"]) for b in boundaries}

def cantons_at(lon: float, lat: float) -> list[str]:
    point = Point(lon, lat)
    return [canton for canton, polygon in polygons.items() if polygon.covers(point)]

cantons_at(3.7268, 51.053)  # ['gent-1']
```
