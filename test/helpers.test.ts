import { describe, expect, it } from 'vitest'

import {
    courts,
    findJusticesOfThePeace,
    formatIban,
    formatPhoneNumber,
    getArrondissementForMunicipality,
    getJudicialArea,
    getLatestKnownRateDate,
    interestRates,
    municipalities,
} from '../src'

describe('getJudicialArea', () => {
    it('finds an area by id', () => {
        expect(getJudicialArea('gent').name.fr).toBe('Gand')
        expect(getJudicialArea('nowhere')).toBeUndefined()
    })
})

describe('getArrondissementForMunicipality', () => {
    it('finds the arrondissement of a whole and of a split municipality', () => {
        expect(getArrondissementForMunicipality('44088')?.id).toBe('oost-vlaanderen')
        expect(getArrondissementForMunicipality('21004')?.id).toBe('brussel')
        expect(getArrondissementForMunicipality('00000')).toBeUndefined()
    })

    it('has an answer for every municipality', () => {
        for (const m of municipalities)
            expect(getArrondissementForMunicipality(m.id), m.id).toBeDefined()
    })
})

describe('findJusticesOfThePeace', () => {
    it('gives one court for a municipality in one canton', () => {
        const [only, ...rest] = findJusticesOfThePeace('44088')
        expect(rest).toEqual([])
        expect(only?.canton.id).toBe('merelbeke-melle')
        expect(only?.court.id).toBe('justice-of-the-peace-merelbeke-melle')
        expect(only?.partial).toBe(false)
    })

    it('gives every canton of a split city, marked partial', () => {
        const gent = findJusticesOfThePeace('44021')
        expect(gent.map((c) => c.canton.id)).toEqual([
            'gent-1',
            'gent-2',
            'gent-3',
            'gent-4',
            'gent-5',
        ])
        expect(gent.every((c) => c.partial && c.court.canton === c.canton.id)).toBe(true)
    })

    it('finds the court of the canton, and nothing for an unknown municipality', () => {
        expect(findJusticesOfThePeace('11001').map((c) => c.court.id)).toEqual([
            'justice-of-the-peace-boom',
        ])
        expect(findJusticesOfThePeace('00000')).toEqual([])
    })
})

describe('formatPhoneNumber', () => {
    it.each([
        ['+3292343210', '09 234 32 10'],
        ['+3222345678', '02 234 56 78'],
        ['+3253820701', '053 82 07 01'],
        ['+32470123456', '0470 12 34 56'],
    ])('formats %s as %s', (e164, national) => {
        expect(formatPhoneNumber(e164)).toBe(national)
    })

    it.each(['053 82 07 01', '+31201234567', '+32123'])('rejects %j', (value) => {
        expect(() => formatPhoneNumber(value)).toThrow(RangeError)
    })

    it('formats every phone number in the data', () => {
        for (const c of courts) {
            for (const k of c.contacts) {
                if (k.type === 'phone') expect(formatPhoneNumber(k.value)).toMatch(/^0\d[\d ]+\d$/)
            }
        }
    })
})

describe('formatIban', () => {
    it('groups by four', () => {
        expect(formatIban('BE73679200844560')).toBe('BE73 6792 0084 4560')
    })
})

describe('getLatestKnownRateDate', () => {
    it('is the end of the last period', () => {
        expect(getLatestKnownRateDate('legal')).toBe(interestRates.legal.periods.at(-1)?.to)
    })
})
