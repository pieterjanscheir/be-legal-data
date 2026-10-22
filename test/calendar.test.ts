import { describe, expect, it } from 'vitest'

import {
    getEasterSunday,
    getPublicHoliday,
    getPublicHolidays,
    isJudicialHoliday,
    isPublicHoliday,
    isWorkingDay,
    nextWorkingDay,
    publicHolidays,
} from '../src/calendar'

// The legal holidays as the Royal Observatory publishes them per year
// (robinfo.oma.be/nl/astro-info/kalender/belgische-feestdagen/belgische-feestdagen-<year>/),
// checked on 2026-10-22
const published: Record<number, string[]> = {
    2024: [
        '2024-01-01',
        '2024-04-01',
        '2024-05-01',
        '2024-05-09',
        '2024-05-20',
        '2024-07-21',
        '2024-08-15',
        '2024-11-01',
        '2024-11-11',
        '2024-12-25',
    ],
    2025: [
        '2025-01-01',
        '2025-04-21',
        '2025-05-01',
        '2025-05-29',
        '2025-06-09',
        '2025-07-21',
        '2025-08-15',
        '2025-11-01',
        '2025-11-11',
        '2025-12-25',
    ],
    2026: [
        '2026-01-01',
        '2026-04-06',
        '2026-05-01',
        '2026-05-14',
        '2026-05-25',
        '2026-07-21',
        '2026-08-15',
        '2026-11-01',
        '2026-11-11',
        '2026-12-25',
    ],
    2027: [
        '2027-01-01',
        '2027-03-29',
        '2027-05-01',
        '2027-05-06',
        '2027-05-17',
        '2027-07-21',
        '2027-08-15',
        '2027-11-01',
        '2027-11-11',
        '2027-12-25',
    ],
}

describe('getPublicHolidays', () => {
    it.each(Object.entries(published))('matches the published list for %s', (year, days) => {
        expect(getPublicHolidays(Number(year)).map((h) => h.day)).toEqual(days)
    })

    it('gives each holiday its id and names', () => {
        expect(getPublicHolidays(2026)[1]).toEqual({
            id: 'easter-monday',
            day: '2026-04-06',
            name: { nl: 'Paasmaandag', fr: 'Lundi de Pâques', de: 'Ostermontag' },
        })
    })

    it('has ten distinct holidays every year', () => {
        for (let year = publicHolidays.fromYear; year <= 2100; year++) {
            const holidays = getPublicHolidays(year)
            expect(new Set(holidays.map((h) => h.day)).size, String(year)).toBe(10)
            expect(holidays.every((h) => h.day.startsWith(String(year)))).toBe(true)
        }
    })

    it('puts Ascension Day 2008 on 2 May: it fell on 1 May (KB 10 februari 2008)', () => {
        const holidays = getPublicHolidays(2008)
        expect(holidays.find((h) => h.id === 'ascension')?.day).toBe('2008-05-02')
        expect(holidays.find((h) => h.id === 'labour-day')?.day).toBe('2008-05-01')
    })

    it('only moves a holiday from the day its rule gives', () => {
        for (const r of publicHolidays.replacements) {
            const year = Number(r.replaces.slice(0, 4))
            const easter = getEasterSunday(year)
            const rule = publicHolidays.holidays.find((h) => h.id === r.holiday)?.rule
            const ruleDay =
                rule?.type === 'easter' ?
                    new Date(Date.parse(easter) + rule.daysAfterEaster * 86_400_000)
                        .toISOString()
                        .slice(0, 10)
                :   `${year}-${String(rule?.month).padStart(2, '0')}-${String(rule?.day).padStart(2, '0')}`
            expect(ruleDay, r.holiday).toBe(r.replaces)
        }
    })

    it("returns copies: changing one doesn't change the next call", () => {
        const [first] = getPublicHolidays(2026)
        if (first) {
            first.day = '1900-01-01'
            first.name.nl = 'Changed'
        }
        expect(getPublicHolidays(2026)[0]?.day).toBe('2026-01-01')
        expect(getPublicHolidays(2026)[0]?.name.nl).toBe('Nieuwjaar')
        expect(getPublicHoliday('2026-01-01')?.name.nl).toBe('Nieuwjaar')
        expect(publicHolidays.holidays[0]?.name.nl).toBe('Nieuwjaar')
    })

    it.each([1974, 2026.5, 10_000, Number.NaN])('throws a RangeError for %s', (year) => {
        expect(() => getPublicHolidays(year)).toThrow(RangeError)
    })
})

describe('getEasterSunday', () => {
    it.each([
        [1981, '1981-04-19'],
        [2000, '2000-04-23'],
        [2008, '2008-03-23'],
        [2011, '2011-04-24'],
        [2019, '2019-04-21'],
        [2038, '2038-04-25'], // the latest possible
        [2285, '2285-03-22'], // the earliest possible
    ])('%s: %s', (year, day) => {
        expect(getEasterSunday(year)).toBe(day)
    })

    it('places the Easter-dependent holidays from it', () => {
        const days = Object.fromEntries(getPublicHolidays(2038).map((h) => [h.id, h.day]))
        expect(days['easter-monday']).toBe('2038-04-26')
        expect(days['ascension']).toBe('2038-06-03')
        expect(days['whit-monday']).toBe('2038-06-14')
    })
})

describe('getPublicHoliday and isPublicHoliday', () => {
    it('find the holiday on a day', () => {
        expect(getPublicHoliday('2026-07-21')?.id).toBe('national-day')
        expect(getPublicHoliday(new Date(2026, 11, 25))?.name.fr).toBe('Noël')
        expect(isPublicHoliday('2026-07-21')).toBe(true)
    })

    it("don't count community holidays or Easter Sunday", () => {
        for (const day of ['2026-07-11', '2026-09-27', '2026-11-15', '2026-04-05'])
            expect(isPublicHoliday(day), day).toBe(false)
    })

    it('throw a RangeError for an invalid day', () => {
        expect(() => isPublicHoliday('2026-02-30')).toThrow(RangeError)
    })
})

describe('isWorkingDay', () => {
    it('excludes Saturdays, Sundays and holidays', () => {
        expect(isWorkingDay('2026-10-23')).toBe(true) // Friday
        expect(isWorkingDay('2026-10-24')).toBe(false) // Saturday
        expect(isWorkingDay('2026-10-25')).toBe(false) // Sunday
        expect(isWorkingDay('2026-11-11')).toBe(false) // Wednesday, Armistice
    })
})

describe('nextWorkingDay (art. 53 Ger.W.)', () => {
    it('keeps a working day', () => {
        expect(nextWorkingDay('2026-04-03')).toBe('2026-04-03')
    })

    it('moves a Saturday before Easter Monday to the Tuesday', () => {
        expect(nextWorkingDay('2026-04-04')).toBe('2026-04-07')
    })

    it('moves a Saturday before Whit Monday to the Tuesday', () => {
        expect(nextWorkingDay('2026-05-23')).toBe('2026-05-26')
    })

    it('moves a holiday on a weekday to the next day', () => {
        expect(nextWorkingDay('2026-05-14')).toBe('2026-05-15') // Ascension, a Thursday
    })

    it('crosses into the next year', () => {
        expect(nextWorkingDay('2022-12-31')).toBe('2023-01-02') // Saturday, then Sunday 1 January
    })

    it('moves past both 1 and 2 May 2008', () => {
        expect(nextWorkingDay('2008-05-01')).toBe('2008-05-05')
    })
})

describe('isJudicialHoliday (art. 334 Ger.W.)', () => {
    it.each([
        ['2026-06-30', false],
        ['2026-07-01', true],
        ['2026-08-31', true],
        ['2026-09-01', false],
    ])('%s: %s', (day, expected) => {
        expect(isJudicialHoliday(day)).toBe(expected)
    })
})
