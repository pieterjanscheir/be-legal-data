import { describe, expect, it } from 'vitest'

import {
    arrondissements,
    cantons,
    courts,
    getCanton,
    getCantonsForMunicipality,
    judicialAreas,
    municipalities,
} from '../src'

// Statbel province codes per arrondissement. Brussels also has the Halle-Vilvoorde cantons.
const provincesOf: Record<string, string[]> = {
    Antwerp: ['10000'],
    Limburg: ['70000'],
    Brussels: ['04000', '20001'],
    Leuven: ['20001'],
    WalloonBrabant: ['20002'],
    EastFlanders: ['40000'],
    WestFlanders: ['30000'],
    Liege: ['60000'],
    Eupen: ['60000'],
    Luxembourg: ['80000'],
    Namur: ['90000'],
    Hainaut: ['50000'],
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
        expect(count('Brussels')).toBe(26)
        expect(count('Leuven')).toBe(7)
        expect(count('WalloonBrabant')).toBe(5)
        expect(count('Eupen')).toBe(2)
    })

    it('puts every municipality wholly in one canton, or splits it over several', () => {
        expect(municipalities).toHaveLength(565)
        for (const m of municipalities) {
            const entries = cantons.flatMap((c) =>
                c.municipalities.filter((x) => x.refnis === m.refnis),
            )
            const whole = entries.filter((e) => !e.partial).length
            const partial = entries.filter((e) => e.partial).length
            const label = `${m.name.nl} (${m.refnis})`
            if (whole) expect({ whole, partial }, label).toEqual({ whole: 1, partial: 0 })
            else expect(partial, label).toBeGreaterThanOrEqual(2)
        }
    })

    it('keeps cantons within their arrondissement', () => {
        const byRefnis = new Map(municipalities.map((m) => [m.refnis, m]))
        for (const c of cantons) {
            for (const { refnis } of c.municipalities) {
                expect(byRefnis.has(refnis), `${c.id}: ${refnis}`).toBe(true)
                expect(provincesOf[c.arrondissement], `${c.id}: ${refnis}`).toContain(
                    byRefnis.get(refnis)!.province,
                )
            }
        }
    })

    it('finds the cantons for a municipality', () => {
        expect(getCantonsForMunicipality('44088').map((c) => c.id)).toEqual(['MerelbekeMelle'])
        expect(getCantonsForMunicipality('44021').map((c) => c.id)).toEqual([
            'Gent1',
            'Gent2',
            'Gent3',
            'Gent4',
            'Gent5',
        ])
    })

    it('distinguishes a canton name from its seat', () => {
        expect(getCanton('Oudergem')).toMatchObject({
            name: { nl: 'Oudergem', fr: 'Auderghem' },
            seat: { nl: 'Etterbeek', fr: 'Etterbeek' },
        })
    })
})

describe('justices of the peace', () => {
    const peace = courts.filter((c) => c.type === 'justice-of-the-peace')

    it('match a canton in the same arrondissement', () => {
        for (const court of peace) {
            const canton = getCanton(court.id.replace(/^Vredegerecht/, ''))
            expect(canton, court.id).toBeDefined()
            expect(canton!.arrondissement, court.id).toBe(court.arrondissement)
            expect(court.canton, court.id).toBe(canton!.number)
        }
    })

    // Arrondissements whose justices of the peace are all in data/courts.json
    it.each(['EastFlanders', 'WestFlanders'])('cover every canton in %s', (arrondissement) => {
        const ids = new Set(peace.map((c) => c.id))
        const missing = cantons
            .filter((c) => c.arrondissement === arrondissement)
            .map((c) => `Vredegerecht${c.id}`)
            .filter((id) => !ids.has(id))
        expect(missing).toEqual([])
    })
})
