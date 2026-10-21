import { describe, expect, it } from 'vitest'

import { appliesOn, currentVersion, lookupDay, toDay, versionsById } from '../src/time'

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

describe('currentVersion', () => {
    const versions = [
        { name: 'old', validTo: '2024-12-31' },
        { name: 'now', validFrom: '2025-01-01', validTo: '2026-12-31' },
        { name: 'next', validFrom: '2027-01-01' },
    ]

    it('gives the version that applies, never a later one', () => {
        expect(currentVersion(versions, '2026-10-21')?.name).toBe('now')
        expect(currentVersion(versions, '2024-06-01')?.name).toBe('old')
        expect(currentVersion(versions, '2027-01-01')?.name).toBe('next')
    })

    it('gives the last version of a record that ended, the first of one not started', () => {
        expect(currentVersion([{ name: 'ended', validTo: '2020-01-01' }], '2026-10-21')?.name).toBe(
            'ended',
        )
        expect(
            currentVersion([{ name: 'future', validFrom: '2030-01-01' }], '2026-10-21')?.name,
        ).toBe('future')
        expect(currentVersion<{ validFrom?: string }>([], '2026-10-21')).toBeUndefined()
    })
})

describe('versionsById', () => {
    it('groups the versions of each record, oldest first', () => {
        const map = versionsById([
            { id: 'a', validFrom: '2030-01-01' },
            { id: 'a', validFrom: '2025-01-01' },
            { id: 'b' },
            { id: 'a', validTo: '2024-12-31' },
            { id: 'a', validFrom: '2027-01-01' },
        ])
        expect(map.get('a')?.map((v) => v.validFrom ?? 'first')).toEqual([
            'first',
            '2025-01-01',
            '2027-01-01',
            '2030-01-01',
        ])
        expect(map.get('b')).toEqual([{ id: 'b' }])
    })
})
