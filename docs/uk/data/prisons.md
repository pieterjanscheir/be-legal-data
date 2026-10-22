# В'язниці {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Файл: `data/prisons.json`. В'язниці та detentiehuizen (установи для засуджених до коротких
строків) FOD Justitie / SPF Justice (Directoraat-generaal Penitentiaire Inrichtingen), усього
{{ stats.prisons }}.

## Чим він корисний {#why-it-s-useful}

- **Листування з ув'язненим чи його в'язницею.** Адвокатам, родинам і службам потрібні адреса
  і телефон в'язниці; назви різняться залежно від мови (`Gevangenis van Bergen`,
  `Prison de Mons`, `Gefängnis Mons`).
- **Внесення грошей.** Якщо FOD Justitie / SPF Justice публікує рахунок в'язниці для грошей
  ув'язненим, він є серед контактів як `bank-account` з перевіреною контрольною сумою.
- **Форми і матеріали справ.** Стабільний id для кожної установи, щоб зберігати його разом зі
  справою, і список, з якого можна вибрати.

## Джерело й оновлення {#source-and-updates}

|                  |                                                                                                                                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Джерело          | [FOD Justitie / SPF Justice: бельгійські в'язниці](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen), сторінка кожної в'язниці нідерландською, французькою і німецькою |
| Будується        | `scripts/parse` зі щотижневих знімків                                                                                                                                                                         |
| Змінюється, коли | В'язниця відкривається чи закривається або змінює контактні дані                                                                                                                                              |
| Перевіряється    | Щотижня, через [sources workflow](/uk/guide/data-quality#how-the-data-is-built)                                                                                                                               |

## Поля {#fields}

| Поле                   | Тип                               | Опис                                                                                                                              |
| ---------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PrisonId`                        | З назви місцевою мовою, без артиклів: `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                 |
| `validFrom`, `validTo` | string?                           | Дні, протягом яких запис чинний, як їх наводив сайт; якщо немає — від початку охоплення або досі чинний. Див. [час](/uk/api#time) |
| `kind`                 | `'prison'` \| `'detention-house'` | Detentiehuis утримує людей із короткими строками покарання, близько до дому                                                       |
| `name`                 | `{ nl, fr, de }`                  | Як її публікує FOD Justitie / SPF Justice                                                                                         |
| `address`              | `Address`                         | Місцевою мовою, з громадою, до якої належить її поштовий індекс (`municipality`, за кодом REFNIS)                                 |
| `contacts`             | `Contact[]`                       | Телефон, факс, електронна пошта і рахунок для грошей ув'язненим, якщо їх опубліковано                                             |
| `website`              | `{ nl, fr, de }`                  | Сторінка в'язниці кожною мовою                                                                                                    |
| `sources`              | `{ url, retrieved }[]`            | Сторінки, з яких прочитано запис                                                                                                  |

Ім'я директора, яке сторінки також наводять, пропущено: воно змінюється, і це персональні дані,
які пакету не потрібні.

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
