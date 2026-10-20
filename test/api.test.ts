import { describe, expect, it } from 'vitest'

import {
    cantons,
    courts,
    formatCourtName,
    getCantonsForMunicipality,
    getInterestRate,
    getJusticeOfThePeace,
    type Locale,
} from '../src'

describe('getInterestRate input validation', () => {
    // Periods are compared as strings: a day that isn't zero-padded used to fall in the
    // wrong period silently ('2013-1-15' gave the second semester's rate).
    it.each(['2013-1-15', '15/01/2013', '2013-02-30', '2013-13-01', '', 'today'])(
        'rejects %j',
        (day) => {
            expect(() => getInterestRate(day, 'commercial')).toThrow(RangeError)
        },
    )

    it('rejects an invalid Date', () => {
        expect(() => getInterestRate(new Date('nope'), 'legal')).toThrow(RangeError)
    })

    it('accepts an ISO timestamp and uses its day', () => {
        expect(getInterestRate('2013-01-15T23:00:00Z', 'commercial')?.rate).toBe(8)
    })

    it('accepts leap days', () => {
        expect(getInterestRate('2024-02-29', 'legal')?.rate).toBe(5.75)
    })

    it('includes both ends of a period', () => {
        expect(getInterestRate('2013-06-30', 'commercial')?.period.to).toBe('2013-06-30')
        expect(getInterestRate('2013-07-01', 'commercial')?.period.from).toBe('2013-07-01')
    })
})

describe('getJusticeOfThePeace', () => {
    it('finds the court of a canton', () => {
        expect(getJusticeOfThePeace('Gent1')?.id).toBe('VredegerechtGent1')
    })

    it('returns undefined for a canton whose court is not on file', () => {
        expect(getJusticeOfThePeace('Antwerpen1')).toBeUndefined()
        expect(getJusticeOfThePeace('NoSuchCanton')).toBeUndefined()
    })
})

describe('lookups', () => {
    it('return copies, so callers cannot change the shared data', () => {
        getCantonsForMunicipality('44021').pop()
        expect(getCantonsForMunicipality('44021')).toHaveLength(5)
    })

    it('find every canton through each of its municipalities', () => {
        for (const canton of cantons) {
            for (const { refnis } of canton.municipalities) {
                expect(getCantonsForMunicipality(refnis), canton.id).toContain(canton)
            }
        }
    })
})

describe('formatCourtName', () => {
    it.each(['nl', 'fr', 'de'] as Locale[])('gives every court a complete name in %s', (locale) => {
        for (const court of courts) {
            const name = formatCourtName(court, locale)
            expect(name, court.id).not.toMatch(/undefined|\s{2}|^\s|\s$/)
        }
    })
})
