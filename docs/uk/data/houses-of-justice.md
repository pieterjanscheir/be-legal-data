<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Justitiehuizen / maisons de justice {#houses-of-justice}

Файл: `data/houses-of-justice.json`. Justitiehuizen / maisons de justice («будинки
правосуддя») Фламандської та Французької спільнот: {{ stats.housesOfJustice }} записів.

Justitiehuizen / maisons de justice супроводжують правопорушників і наглядають за ними від імені
судів і прокуратури (пробація, електронний моніторинг, громадські роботи), приймають потерпілих
і готують соціальні дослідження для сімейних судів. З 2015 року ними опікуються спільноти.

## Чим він корисний {#why-it-s-useful}

- **Сімейне право.** Сімейний суд доручає соціальне дослідження justitiehuis / maison de justice
  за місцем проживання родини; адвокатам і сторонам потрібні його контакти.
- **Кримінальне право.** Умови пробації, альтернативні покарання й електронний моніторинг
  контролює justitiehuis / maison de justice; так само й прийом потерпілих.
- **Зв'язування.** Фламандські установи мають свій номер OVO — ідентифікатор у фламандському
  реєстрі організацій ([Wegwijs](https://wegwijs.vlaanderen.be)), тож дані поєднуються з іншими
  даними фламандського уряду.

## Джерело й оновлення {#source-and-updates}

|               |                                                                                                                                                                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Джерело       | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen) (Фламандська спільнота) і [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/) (Французька спільнота) |
| Будується     | `scripts/parse` зі щотижневих знімків                                                                                                                                                                                                                     |
| Перевіряється | Щотижня, через [sources workflow](/uk/guide/data-quality#how-the-data-is-built)                                                                                                                                                                           |

Поки що немає в даних: justitiehuis Німецькомовної спільноти в Eupen
([#3](https://github.com/pieterjanscheir/belgica/issues/3)). У Брюсселі є і фламандська
(`justitiehuis-brussel`), і франкомовна установа (`maison-justice-bruxelles`).

## Поля {#fields}

| Поле                   | Тип                                     | Опис                                                                                                                              |
| ---------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `HouseOfJusticeId`                      | З назви, без артиклів: `justitiehuis-gent`, `maison-justice-arlon`                                                                |
| `validFrom`, `validTo` | string?                                 | Дні, протягом яких запис чинний, як їх наводив сайт; якщо немає — від початку охоплення або досі чинний. Див. [час](/uk/api#time) |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | Спільнота, яка нею опікується                                                                                                     |
| `name`                 | `{ nl }` або `{ fr }`                   | Мовою спільноти                                                                                                                   |
| `ovo`                  | string?                                 | Номер OVO у фламандському реєстрі організацій, для фламандських установ: `OVO001917`                                              |
| `address`              | `Address`                               | З громадою, до якої належить її поштовий індекс (`municipality`, за кодом REFNIS)                                                 |
| `contacts`             | `Contact[]`                             | Телефон, факс і електронна пошта; служба допомоги потерпілим франкомовної установи має власні контакти з мітками                  |
| `website`              | `{ nl }` або `{ fr }`                   | Сторінка, на якій її наведено                                                                                                     |
| `sources`              | `{ url, retrieved }[]`                  | Сторінки, з яких прочитано запис                                                                                                  |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
