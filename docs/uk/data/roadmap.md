# Дорожня карта {#roadmap}

Заплановані набори даних, кожен з issue, що його специфікує. Кожне issue перелічує офіційні
джерела, запропоновані поля і що означає «готово». Допомога вітається: виберіть одне і
дотримуйтеся [домовленостей](/uk/guide/contributing#adding-a-dataset).

## Заплановано {#planned}

| Набір даних                                                                                                                                           | Чим він корисний                                                                              | Issue                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Інші суди**: Hof van Cassatie / Cour de cassation, Grondwettelijk Hof / Cour constitutionnelle, Raad van State / Conseil d'État, дисциплінарні суди | Найвищих судів немає на порталі судів, тож для них потрібні власні джерела                    | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **Justitiehuis в Eupen** (Німецькомовна спільнота)                                                                                                    | Єдиний justitiehuis / maison de justice, якого в даних поки немає                             | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Історія**: коли змінювалися кантони, громади й суди                                                                                                 | Модель має періоди чинності і пошук за днем; для попередніх версій ще бракує даних            | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Адреса → координати**                                                                                                                               | [Межі кантонів](./canton-boundaries) знаходять кантон точки; бракує кроку геокодування адреси | [#66](https://github.com/pieterjanscheir/belgica/issues/66) |
| **Контори судових виконавців** (gerechtsdeurwaarders / huissiers de justice)                                                                          | Знайти судового виконавця в судовому окрузі для вручення документів чи примусового виконання  | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Поліцейські зони** (politiezones / zones de police)                                                                                                 | Яка зона обслуговує громаду: скарги, копії протоколів                                         | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Кадастр і управління правової визначеності** (kadaster, колишні hypotheekkantoren)                                                                  | Запитувати іпотечні довідки й кадастрові витяги в компетентному управлінні                    | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## Варто розглянути {#worth-considering}

Кожен має власне issue, приблизно в порядку того, як часто ними користувалися б:

- **Частини громад** (deelgemeenten, sections de commune) для кожного поштового індексу.
  [Поштові індекси](./postal-codes) закінчуються на рівні громади; список bpost називає
  населені пункти, але не має коду REFNIS і відкритої ліцензії
  ([#54](https://github.com/pieterjanscheir/belgica/issues/54)).
- **Судові збори** (rolrechten / griffierechten) і шкала **процесуального відшкодування**
  (rechtsplegingsvergoeding), з періодами чинності та індексацією, як і процентні ставки
  ([#59](https://github.com/pieterjanscheir/belgica/issues/59),
  [#60](https://github.com/pieterjanscheir/belgica/issues/60)).
- **Судові канікули і державні свята** за кожен рік, для обчислення процесуальних строків
  ([#61](https://github.com/pieterjanscheir/belgica/issues/61)).
- **Прокуратури** (parketten, arbeidsauditoraten) для кожного судового округу
  ([#55](https://github.com/pieterjanscheir/belgica/issues/55)).
- **Нотаріуси і нотаріальні палати**, **адвокатські колегії** (balies / barreaux)
  ([#56](https://github.com/pieterjanscheir/belgica/issues/56),
  [#57](https://github.com/pieterjanscheir/belgica/issues/57)).
- **Об'єднання громад**: старі → нові коди REFNIS за 2019 і 2025 роки, щоб можна було
  зіставити старіші дані ([#53](https://github.com/pieterjanscheir/belgica/issues/53)).
- **Індекс здоров'я** (gezondheidsindex) для індексації орендної плати
  ([#62](https://github.com/pieterjanscheir/belgica/issues/62)).

## Чому деяких наборів даних тут ще немає {#why-some-datasets-aren-t-here-yet}

Правовий набір даних корисний лише тоді, коли кожне значення походить з офіційного джерела, тож
нічого не додається вручну з пам'яті. Кожен набір даних будує скрипт зі знімків його джерела, і
більшість джерел щотижня завантажує GitHub Actions. Два поки що не можна: сайт Belgisch
Staatsblad / Moniteur belge (ejustice), з якого беруться кантони, і police.be відмовляють у
з'єднанні серверам GitHub; натомість їх завантажують зі звичайної машини
([#52](https://github.com/pieterjanscheir/belgica/issues/52)). Довідник судових виконавців
будується в браузері, тож для його читання потрібен браузер або дані Національної палати
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
