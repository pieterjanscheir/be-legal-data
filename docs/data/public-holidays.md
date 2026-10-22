# Public holidays

File: `data/public-holidays.json`. Source: the law of 4 January 1974 on public holidays and its
royal decree of 18 April 1974, art. 1; the Judicial Code, art. 50, 53 and 334.

## Why it's useful

Every procedural deadline depends on the calendar. A deadline counts every day, Saturdays,
Sundays and holidays included (art. 52 Ger.W. / C. jud.), but when its last day is a Saturday,
a Sunday or a legal public holiday, that day moves to the next working day (art. 53). Three of
the ten holidays move with Easter, so a hard-coded list goes wrong the next year.
`nextWorkingDay` applies the art. 53 rule; `getPublicHolidays` gives the holidays of any year.

This is the building blocks, not a deadline calculator: when a deadline starts, how long it runs
and whether it's extended depend on the procedure.

## Source and updates

|              |                                                                                                                                                                                                                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Source       | [Wet 4 januari 1974](https://www.ejustice.just.fgov.be/eli/wet/1974/01/04/1974010407/justel) and [KB 18 april 1974](https://www.ejustice.just.fgov.be/eli/besluit/1974/04/18/1974041801/justel), art. 1, on Justel |
| Built by     | Hand: the ten rules, and the years a royal decree moved a holiday                                                                                                                                                  |
| Changes when | A law or decree changes the list, or moves a holiday for one year                                                                                                                                                  |
| Covers       | 1975 onwards, the first full year of the 1974 law: a day or year before it throws a `RangeError`                                                                                                                   |
| Checked      | Against the [Royal Observatory's list](https://robinfo.oma.be/nl/astro-info/kalender/belgische-feestdagen/) for 2024–2027 (`test/calendar.test.ts`); reviewed every year                                           |
| Licence      | CC BY 4.0                                                                                                                                                                                                          |

The file holds rules, not dates: a fixed day, or a number of days after Easter Sunday, which
`getEasterSunday` computes for the Gregorian calendar.

| Holiday         | id              | Day              |
| --------------- | --------------- | ---------------- |
| New Year's Day  | `new-year`      | 1 January        |
| Easter Monday   | `easter-monday` | Easter + 1 day   |
| Labour Day      | `labour-day`    | 1 May            |
| Ascension Day   | `ascension`     | Easter + 39 days |
| Whit Monday     | `whit-monday`   | Easter + 50 days |
| National Day    | `national-day`  | 21 July          |
| Assumption      | `assumption`    | 15 August        |
| All Saints' Day | `all-saints`    | 1 November       |
| Armistice Day   | `armistice`     | 11 November      |
| Christmas       | `christmas`     | 25 December      |

## When a holiday moves

In 2008 Ascension Day fell on 1 May, and the royal decree of 10 February 2008 moved it to 2 May
for that year. `replacements` records such years; `getPublicHolidays(2008)` has Ascension Day on
2 May. A holiday that falls on a Sunday is not moved: employers give a substitute day off
(art. 6 of the 1974 law), but the holiday itself stays where it is, and art. 53 already moves a
deadline off a Sunday.

## What isn't a legal holiday

- **Community and regional holidays**: 11 July (Flemish Community), 27 September (French
  Community), 15 November (German-speaking Community), 8 May and 20 September. They're days off
  for some public services, set by community or regional decree, not legal holidays: they don't
  move a deadline under art. 53, so they're not in this file.
- **Days off for federal services**: 2 November, 15 November and 26 December.
- **Easter Sunday and Whit Sunday**: Sundays already.

## Judicial holidays

From 1 July to 31 August the courts sit in vacation chambers (art. 334). The judicial holidays
don't stop deadlines running, with one exception: an appeal or opposition deadline that starts
and ends during them is extended to the fifteenth day of the new judicial year, 15 September
(art. 50, second paragraph). `isJudicialHoliday` tells you whether a day is in them; whether
art. 50 applies depends on the deadline.

## Other packages

General holiday packages list Belgium's holidays too. They answer "is this day a holiday?", but
they mix in days that don't move a deadline and don't know the art. 50 and 53 rules:

| Package                                                        | Language | Belgium                                                                                                    |
| -------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| [`date-holidays`](https://www.npmjs.com/package/date-holidays) | JS / TS  | Country `BE`, names in Dutch, French, German and English, with the community holidays as regional holidays |
| [Nager.Date](https://date.nager.at)                            | REST API | `GET /api/v3/PublicHolidays/{year}/BE`; free, no key                                                       |
| [`holidays`](https://pypi.org/project/holidays/)               | Python   | Country `BE` with localized names                                                                          |
| [`workalendar`](https://pypi.org/project/workalendar/)         | Python   | A Belgium calendar with working-day arithmetic (`add_working_days`)                                        |

Use one of them for days off in general, such as a school or office calendar; use this file
when the day has legal consequences.

## Use it

```ts
import { getPublicHolidays, isJudicialHoliday, nextWorkingDay } from 'belgica/calendar'

getPublicHolidays(2026).map((h) => h.day) // ['2026-01-01', '2026-04-06', …, '2026-12-25']
nextWorkingDay('2026-04-04') // '2026-04-07': Saturday, Sunday, then Easter Monday
nextWorkingDay('2026-04-03') // '2026-04-03': already a working day
isJudicialHoliday('2026-08-14') // true
```

## Shape

```ts
interface PublicHolidays {
    description: string
    legalBasis: string
    fromYear: number // 1975
    holidays: PublicHolidayDefinition[] // the ten
    replacements: PublicHolidayReplacement[]
}

interface PublicHolidayDefinition {
    id: PublicHolidayId
    name: Translated // nl, fr, de
    rule:
        { type: 'fixed'; month: number; day: number } | { type: 'easter'; daysAfterEaster: number }
}

interface PublicHolidayReplacement {
    holiday: PublicHolidayId
    replaces: string // the day the rule gives, YYYY-MM-DD
    day: string // the day it's on instead
    legalBasis: string
}
```
