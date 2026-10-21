import { describe, expect, expectTypeOf, it } from 'vitest'

import {
    type ArrondissementId,
    type Canton,
    type CantonId,
    type Court,
    type Municipality,
    type MunicipalityId,
    cantons,
    findCompetentCourts,
    findJusticesOfThePeace,
    getCanton,
    getCourt,
    getMunicipality,
    getCantonsForMunicipality,
    getInterestRate,
    getJusticeOfThePeace,
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
        expect(getJusticeOfThePeace('gent-1').id).toBe('justice-of-the-peace-gent-1')
    })

    it('returns undefined for an unknown canton', () => {
        expect(getJusticeOfThePeace('NoSuchCanton')).toBeUndefined()
    })
})

describe('findCompetentCourts', () => {
    it('finds the police court of Halle-Vilvoorde, not Brussels', () => {
        // Vilvoorde
        expect(findCompetentCourts('23088', 'police-court').map((c) => c.id)).toEqual([
            'police-court-vilvoorde',
        ])
    })

    it('finds both language courts in Brussels', () => {
        // Brussel
        expect(findCompetentCourts('21004', 'court-of-first-instance').map((c) => c.id)).toEqual([
            'court-of-first-instance-brussel-fr',
            'court-of-first-instance-brussel-nl',
        ])
    })

    it('finds one court for a city split over cantons, and every justice of the peace', () => {
        // Gent
        expect(findCompetentCourts('44021', 'labour-court').map((c) => c.id)).toEqual([
            'labour-court-gent',
        ])
        expect(findCompetentCourts('44021', 'justice-of-the-peace').map((c) => c.canton)).toEqual(
            findJusticesOfThePeace('44021').map((c) => c.canton.id),
        )
    })

    it('finds the court of assize of the province', () => {
        // Vilvoorde lies in the judicial arrondissement of Brussels, but the province of Vlaams-Brabant
        expect(findCompetentCourts('23088', 'court-of-assize').map((c) => c.id)).toEqual([
            'court-of-assize-vlaams-brabant',
        ])
        // Eupen: the court of assize of Liège
        expect(findCompetentCourts('63023', 'court-of-assize').map((c) => c.id)).toEqual([
            'court-of-assize-liege',
        ])
    })

    it('answers for a day, within the coverage', () => {
        expect(findCompetentCourts('23088', 'police-court', { on: '2025-06-01' })).toHaveLength(1)
        expect(() => findCompetentCourts('23088', 'police-court', { on: '2024-12-31' })).toThrow(
            RangeError,
        )
    })

    it('returns an empty list for an unknown code', () => {
        expect(findCompetentCourts('99999', 'police-court')).toEqual([])
    })
})

describe('lookups', () => {
    it('return copies, so callers cannot change the shared data', () => {
        getCantonsForMunicipality('44021').pop()
        expect(getCantonsForMunicipality('44021')).toHaveLength(5)
    })

    it('find every canton through each of its municipalities', () => {
        for (const canton of cantons) {
            for (const { municipality } of canton.municipalities) {
                expect(getCantonsForMunicipality(municipality), canton.id).toContain(canton)
            }
        }
    })
})

describe('id types', () => {
    it('return a record, not undefined, for a known id', () => {
        expectTypeOf(getCanton('gent-1')).toEqualTypeOf<Canton>()
        expectTypeOf(getCourt('justice-of-the-peace-gent-1')).toEqualTypeOf<Court>()
        expectTypeOf(getMunicipality('44021')).toEqualTypeOf<Municipality>()
        expectTypeOf(getJusticeOfThePeace('gent-1')).toEqualTypeOf<Court>()
    })

    it('may return undefined on a given day, even for a known id', () => {
        expectTypeOf(getCanton('gent-1', { on: '2025-06-01' })).toEqualTypeOf<Canton | undefined>()
    })

    it('may return undefined for any other string', () => {
        const lookup = (id: string) => getCanton(id)
        expectTypeOf(lookup).returns.toEqualTypeOf<Canton | undefined>()
        expectTypeOf(getCanton('no-such-canton')).toEqualTypeOf<Canton | undefined>()
    })

    it('type the links between datasets', () => {
        expectTypeOf<Canton['arrondissement']>().toEqualTypeOf<ArrondissementId>()
        expectTypeOf<
            Canton['municipalities'][number]['municipality']
        >().toEqualTypeOf<MunicipalityId>()
        // @ts-expect-error: not a canton id
        const typo: CantonId = 'gent1'
        expect(typo).toBe('gent1')
    })
})
