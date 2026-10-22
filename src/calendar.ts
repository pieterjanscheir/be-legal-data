/**
 * The days a procedural deadline depends on: the legal public holidays and the judicial
 * holidays. These are the building blocks; computing a whole deadline depends on the procedure.
 */
import publicHolidaysData from '../data/public-holidays.json'
import type { Translated } from './schemas/common'
import type { PublicHolidayId, PublicHolidayRule, PublicHolidays } from './schemas/public-holidays'
import { toDay } from './time'

export type {
    PublicHolidayDefinition,
    PublicHolidayId,
    PublicHolidayReplacement,
    PublicHolidayRule,
    PublicHolidays,
} from './schemas/public-holidays'

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts)
export const publicHolidays: PublicHolidays = publicHolidaysData as PublicHolidays

export interface PublicHoliday {
    id: PublicHolidayId
    /** YYYY-MM-DD */
    day: string
    name: Translated
}

const MS_PER_DAY = 86_400_000
const LAST_YEAR = 9999

const utcDay = (date: Date) => date.toISOString().slice(0, 10)
const fromDay = (day: string) => new Date(`${day}T00:00:00Z`)
const addDays = (day: string, days: number) =>
    utcDay(new Date(fromDay(day).getTime() + days * MS_PER_DAY))

/** Easter Sunday in the Gregorian calendar (the anonymous algorithm, Meeus/Jones/Butcher) */
export function getEasterSunday(year: number): string {
    checkYear(year)
    const a = year % 19
    const b = Math.floor(year / 100)
    const c = year % 100
    const d = Math.floor(b / 4)
    const e = b % 4
    const f = Math.floor((b + 8) / 25)
    const g = Math.floor((b - f + 1) / 3)
    const h = (19 * a + b - d - g + 15) % 30
    const i = Math.floor(c / 4)
    const k = c % 4
    const l = (32 + 2 * e + 2 * i - h - k) % 7
    const m = Math.floor((a + 11 * h + 22 * l) / 451)
    const month = Math.floor((h + l - 7 * m + 114) / 31)
    const day = ((h + l - 7 * m + 114) % 31) + 1
    return utcDay(new Date(Date.UTC(year, month - 1, day)))
}

function checkYear(year: number): void {
    if (!Number.isInteger(year) || year < publicHolidays.fromYear || year > LAST_YEAR) {
        throw new RangeError(
            `The public holidays are on file for ${publicHolidays.fromYear}–${LAST_YEAR}; got ${year}`,
        )
    }
}

function ruleDay(rule: PublicHolidayRule, year: number, easter: string): string {
    if (rule.type === 'easter') return addDays(easter, rule.daysAfterEaster)
    return utcDay(new Date(Date.UTC(year, rule.month - 1, rule.day)))
}

const byYear = new Map<number, readonly PublicHoliday[]>()

/**
 * The ten legal public holidays of a year, by day. A holiday moved by royal decree is on the
 * day it was moved to: Ascension Day 2008, which fell on 1 May, is on 2 May.
 *
 * Throws a `RangeError` for a year before the rules are on file (1975) or that isn't an integer.
 */
export function getPublicHolidays(year: number): PublicHoliday[] {
    let holidays = byYear.get(year)
    if (!holidays) {
        const easter = getEasterSunday(year)
        holidays = publicHolidays.holidays
            .map(({ id, name, rule }) => {
                const day = ruleDay(rule, year, easter)
                const moved = publicHolidays.replacements.find(
                    (r) => r.holiday === id && r.replaces === day,
                )
                return { id, day: moved?.day ?? day, name }
            })
            .sort((a, b) => a.day.localeCompare(b.day))
        byYear.set(year, holidays)
    }
    return holidays.map((holiday) => ({ ...holiday }))
}

/**
 * The legal public holiday on a day, if there is one.
 *
 * Throws a `RangeError` for a string that isn't a valid YYYY-MM-DD day, an invalid `Date`, or a
 * day before 1975.
 */
export function getPublicHoliday(date: Date | string): PublicHoliday | undefined {
    const day = toDay(date)
    return getPublicHolidays(Number(day.slice(0, 4))).find((holiday) => holiday.day === day)
}

/** Whether a day is a legal public holiday (see `getPublicHoliday`) */
export function isPublicHoliday(date: Date | string): boolean {
    return getPublicHoliday(date) !== undefined
}

/** Whether a day is a working day: not a Saturday, a Sunday or a legal public holiday */
export function isWorkingDay(date: Date | string): boolean {
    const day = toDay(date)
    const weekday = fromDay(day).getUTCDay()
    return weekday !== 0 && weekday !== 6 && !isPublicHoliday(day)
}

/**
 * The last day of a deadline, moved as art. 53 Ger.W. / C. jud. moves it: the day itself when
 * it's a working day, otherwise the first working day after it.
 *
 * ```ts
 * nextWorkingDay('2026-04-03') // '2026-04-03', a Friday
 * nextWorkingDay('2026-04-04') // '2026-04-07': Saturday, then Sunday and Easter Monday
 * ```
 */
export function nextWorkingDay(date: Date | string): string {
    let day = toDay(date)
    while (!isWorkingDay(day)) day = addDays(day, 1)
    return day
}

/**
 * Whether a day falls in the judicial holidays, 1 July to 31 August (art. 334 Ger.W. / C. jud.).
 *
 * The holidays don't stop a deadline running. Only an appeal or opposition deadline that starts
 * and ends within them is extended, to 15 September (art. 50, second paragraph).
 */
export function isJudicialHoliday(date: Date | string): boolean {
    const month = toDay(date).slice(5, 7)
    return month === '07' || month === '08'
}
