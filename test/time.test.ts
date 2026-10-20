import { describe, expect, it } from 'vitest'

import { appliesOn, lookupDay, toDay } from '../src'

describe('appliesOn', () => {
    const record = { validFrom: '2018-09-01', validTo: '2024-12-31' }

    it('includes both ends of the period', () => {
        expect(appliesOn(record, '2018-09-01')).toBe(true)
        expect(appliesOn(record, '2024-12-31')).toBe(true)
    })

    it('excludes the days outside it', () => {
        expect(appliesOn(record, '2018-08-31')).toBe(false)
        expect(appliesOn(record, '2025-01-01')).toBe(false)
    })

    it('treats a missing end as open', () => {
        expect(appliesOn({}, '1900-01-01')).toBe(true)
        expect(appliesOn({ validFrom: '2025-01-01' }, '2099-01-01')).toBe(true)
    })
})

describe('lookupDay', () => {
    it('defaults to today', () => {
        expect(lookupDay({}, '2000-01-01', 'test')).toBe(toDay(new Date()))
    })

    it('names the dataset and its coverage when the day is too early', () => {
        expect(() => lookupDay({ on: '1999-12-31' }, '2000-01-01', 'test')).toThrow(
            'The test data describes 2000-01-01 onwards; 1999-12-31 is before that',
        )
    })
})
