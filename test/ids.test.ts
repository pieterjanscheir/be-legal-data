// The identifier rules in docs/guide/identifiers.md, checked on every record
import { describe, expect, it } from 'vitest'

import { ID_PATTERN, toId } from '../scripts/id'
import {
    arrondissements,
    cantons,
    courts,
    getArrondissement,
    getCanton,
    judicialAreas,
    municipalities,
} from '../src'

const names = (name: Record<string, string>) => Object.values(name)

// The language ids are taken from: French in Wallonia; otherwise the Dutch-text name, which is
// Dutch in Flanders and (tie-break) Brussels, and German around Eupen
const local = (arrondissement: string) =>
    ['brabant-wallon', 'liege', 'luxembourg', 'namur', 'hainaut'].includes(arrondissement) ? 'fr'
    :   'nl'

describe('identifiers', () => {
    const datasets = { judicialAreas, arrondissements, cantons, municipalities, courts }

    it.each(Object.entries(datasets))('are unique in %s', (_name, records) => {
        const ids = records.map((r) => r.id)
        expect(new Set(ids).size).toBe(ids.length)
    })

    it('are lowercase kebab-case, or a REFNIS code for municipalities', () => {
        for (const records of [judicialAreas, arrondissements, cantons, courts]) {
            for (const { id } of records) expect(id).toMatch(ID_PATTERN)
        }
        for (const { id } of municipalities) expect(id).toMatch(/^\d{5}$/)
    })

    it('derive from one of the official names', () => {
        for (const records of [judicialAreas, arrondissements]) {
            for (const r of records)
                expect(
                    names(r.name).map((n) => toId(n)),
                    r.id,
                ).toContain(r.id)
        }
        for (const c of cantons) {
            expect(
                names(c.name).map((n) => toId(n, c.number)),
                c.id,
            ).toContain(c.id)
        }
    })

    it('use the local-language name', () => {
        for (const c of cantons)
            expect(c.id, c.id).toBe(toId(c.name[local(c.arrondissement)], c.number))
        expect(getArrondissement('oost-vlaanderen').name.nl).toBe('Oost-Vlaanderen')
        expect(getArrondissement('brabant-wallon').name.fr).toBe('Brabant wallon')
        expect(getCanton('eupen-sankt-vith-1').name.nl).toBe('Eupen-Sankt-Vith')
    })

    it('of courts are the court type followed by the place', () => {
        for (const c of courts) {
            const place =
                c.type === 'justice-of-the-peace' ?
                    c.canton
                :   `${toId(c.seat[local(c.arrondissement)])}-${toId(c.name[local(c.arrondissement)])}`
            expect(c.id).toBe(`${c.type}-${place}`)
        }
    })
})
