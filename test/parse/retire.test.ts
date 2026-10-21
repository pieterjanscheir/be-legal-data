import { describe, expect, it } from 'vitest'

import { carryOver, dayBefore, walkDay } from '../../scripts/parse/retire.ts'

interface Rec {
    id: string
    validFrom?: string
    validTo?: string
    name: string
}

const WALK = '2027-03-01'

describe('carryOver', () => {
    it('replaces a record the source still lists, keeping its validFrom', () => {
        const previous: Rec[] = [{ id: 'a', validFrom: '2026-11-02', name: 'old' }]
        const fresh: Rec[] = [{ id: 'a', name: 'new' }]
        expect(carryOver(previous, fresh, WALK)).toEqual([
            { id: 'a', validFrom: '2026-11-02', name: 'new' },
        ])
    })

    it('retires a record the source no longer lists, the day before the walk', () => {
        const previous: Rec[] = [
            { id: 'a', name: 'gone' },
            { id: 'b', name: 'stays' },
        ]
        const fresh: Rec[] = [{ id: 'b', name: 'stays' }]
        expect(carryOver(previous, fresh, WALK)).toEqual([
            { id: 'a', validTo: '2027-02-28', name: 'gone' },
            { id: 'b', name: 'stays' },
        ])
    })

    it('leaves a record that was retired before as it is', () => {
        const previous: Rec[] = [{ id: 'a', validTo: '2026-12-31', name: 'gone' }]
        expect(carryOver(previous, [], WALK)).toEqual(previous)
    })

    it('starts a new record on the day of the walk, except in the first build', () => {
        const fresh: Rec[] = [{ id: 'a', name: 'new' }]
        expect(carryOver([], fresh, WALK)).toEqual(fresh)
        const other: Rec = { id: 'b', name: 'other' }
        expect(carryOver([other], [...fresh, other], WALK)).toEqual([
            { id: 'a', validFrom: WALK, name: 'new' },
            other,
        ])
    })

    it('adds a new version when a retired record is listed again', () => {
        const previous: Rec[] = [
            { id: 'a', validTo: '2026-12-31', name: 'first' },
            { id: 'a', validFrom: '2027-01-15', validTo: '2027-02-01', name: 'second' },
        ]
        const fresh: Rec[] = [{ id: 'a', name: 'third' }]
        expect(carryOver(previous, fresh, WALK)).toEqual([
            ...previous,
            { id: 'a', validFrom: WALK, name: 'third' },
        ])
    })

    it('keeps the earlier versions of a record whose current version is replaced', () => {
        const previous: Rec[] = [
            { id: 'a', validFrom: '2027-01-15', name: 'current' },
            { id: 'a', validTo: '2026-12-31', name: 'first' },
        ]
        expect(carryOver(previous, [{ id: 'a', name: 'updated' }], WALK)).toEqual([
            { id: 'a', validTo: '2026-12-31', name: 'first' },
            { id: 'a', validFrom: '2027-01-15', name: 'updated' },
        ])
    })

    it('puts the validity fields right after the id, and sorts by id and version', () => {
        const out = carryOver([{ id: 'z', name: 'z' }], [{ id: 'a', name: 'a' }], WALK)
        expect(Object.keys(out[0] ?? {})).toEqual(['id', 'validFrom', 'name'])
        expect(out.map((r) => r.id)).toEqual(['a', 'z'])
    })
})

describe('dayBefore', () => {
    it('crosses months and years', () => {
        expect(dayBefore('2027-03-01')).toBe('2027-02-28')
        expect(dayBefore('2028-03-01')).toBe('2028-02-29')
        expect(dayBefore('2027-01-01')).toBe('2026-12-31')
    })
})

describe('walkDay', () => {
    it('is the latest day a page was checked', () => {
        expect(walkDay([{ checked: '2027-02-22' }, { checked: '2027-03-01' }])).toBe('2027-03-01')
        expect(() => walkDay([])).toThrow('No snapshots')
    })
})
