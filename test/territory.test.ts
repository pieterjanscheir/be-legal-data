import { describe, expect, it } from 'vitest'

import {
    arrondissements,
    cantons,
    getArrondissementForMunicipality,
    getCanton,
    getCantonsForMunicipality,
    judicialAreas,
    municipalities,
    territoryCoverage,
} from '../src'

// Statbel province codes per arrondissement. Brussels also has the Halle-Vilvoorde cantons.
const provincesOf: Record<string, string[]> = {
    antwerpen: ['10000'],
    limburg: ['70000'],
    brussel: ['04000', '20001'],
    leuven: ['20001'],
    'brabant-wallon': ['20002'],
    'oost-vlaanderen': ['40000'],
    'west-vlaanderen': ['30000'],
    liege: ['60000'],
    eupen: ['60000'],
    luxembourg: ['80000'],
    namur: ['90000'],
    hainaut: ['50000'],
}

describe('territory', () => {
    it('has the 5 judicial areas and 12 arrondissements', () => {
        expect(judicialAreas).toHaveLength(5)
        expect(arrondissements.map((a) => a.id).sort()).toEqual(Object.keys(provincesOf).sort())
        const areas = new Set(judicialAreas.map((a) => a.id))
        for (const a of arrondissements) expect(areas, a.id).toContain(a.judicialArea)
    })

    it('has all 162 cantons with unique ids', () => {
        expect(cantons).toHaveLength(162)
        expect(new Set(cantons.map((c) => c.id)).size).toBe(cantons.length)
    })

    it('has the number of cantons per arrondissement that art. 4 of the annex lists', () => {
        const count = (id: string) => cantons.filter((c) => c.arrondissement === id).length
        expect(count('brussel')).toBe(26)
        expect(count('leuven')).toBe(7)
        expect(count('brabant-wallon')).toBe(5)
        expect(count('eupen')).toBe(2)
    })

    it('puts every municipality wholly in one canton, or splits it over several', () => {
        expect(municipalities).toHaveLength(565)
        for (const m of municipalities) {
            const entries = cantons.flatMap((c) =>
                c.municipalities.filter((x) => x.municipality === m.id),
            )
            const whole = entries.filter((e) => !e.partial).length
            const partial = entries.filter((e) => e.partial).length
            const label = `${m.name.nl} (${m.id})`
            if (whole) expect({ whole, partial }, label).toEqual({ whole: 1, partial: 0 })
            else expect(partial, label).toBeGreaterThanOrEqual(2)
        }
    })

    it('keeps cantons within their arrondissement', () => {
        const byId = new Map(municipalities.map((m) => [m.id, m]))
        for (const c of cantons) {
            for (const { municipality } of c.municipalities) {
                expect(byId.has(municipality), `${c.id}: ${municipality}`).toBe(true)
                expect(provincesOf[c.arrondissement], `${c.id}: ${municipality}`).toContain(
                    byId.get(municipality)?.province,
                )
            }
        }
    })

    it('finds the cantons for a municipality', () => {
        expect(getCantonsForMunicipality('44088').map((c) => c.id)).toEqual(['merelbeke-melle'])
        expect(getCantonsForMunicipality('44021').map((c) => c.id)).toEqual([
            'gent-1',
            'gent-2',
            'gent-3',
            'gent-4',
            'gent-5',
        ])
    })

    it('distinguishes a canton name from its seat', () => {
        expect(getCanton('oudergem')).toMatchObject({
            name: { nl: 'Oudergem', fr: 'Auderghem' },
            seat: { nl: 'Etterbeek', fr: 'Etterbeek' },
        })
    })
})

describe('a day', () => {
    it('finds the version of a record that applies on it', () => {
        expect(getCanton('gent-1', { on: '2025-06-01' })?.id).toBe('gent-1')
        expect(getCantonsForMunicipality('44088', { on: new Date(2026, 0, 1) })).toHaveLength(1)
        expect(getArrondissementForMunicipality('44021', { on: '2025-01-01' })?.id).toBe(
            'oost-vlaanderen',
        )
    })

    it("throws before the data's coverage starts, rather than answer with today's map", () => {
        expect(territoryCoverage.from).toBe('2025-01-01')
        expect(() => getCanton('gent-1', { on: '2024-12-31' })).toThrow(RangeError)
        expect(() => getCantonsForMunicipality('44021', { on: '2018-06-01' })).toThrow(
            /2025-01-01 onwards/,
        )
    })

    it('throws for a malformed day', () => {
        expect(() => getCantonsForMunicipality('44021', { on: '2025-1-1' })).toThrow(RangeError)
    })
})
