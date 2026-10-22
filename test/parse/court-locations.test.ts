// The court locations parser, on the two peace courts in the trimmed copy of the NGI's
// GeoPackage in test/fixtures/sources/ngi (Anderlecht 1 and Antwerpen 1)
import { describe, expect, it } from 'vitest'

import { buildCourtLocations, houseNumber } from '../../scripts/parse/court-locations.ts'
import type { Court } from '../../scripts/parse/types.ts'
import { NGI_CANTONS } from '../../scripts/sources/catalog.ts'
import { cantons, courts as publishedCourts } from '../../src'

const root = 'test/fixtures/sources'
const courts = publishedCourts.filter((c) => !c.validTo) as unknown as Court[]

describe('buildCourtLocations', () => {
    it('places the court of the point’s canton, when the house numbers agree', () => {
        const { locations, report } = buildCourtLocations(root, cantons, courts)
        expect(report).toEqual({ unmatched: [], moved: [] })
        expect(locations.map((l) => l.id)).toEqual([
            'justice-of-the-peace-anderlecht-1',
            'justice-of-the-peace-antwerpen-1',
        ])
        expect(locations[0]).toEqual({
            id: 'justice-of-the-peace-anderlecht-1',
            court: 'justice-of-the-peace-anderlecht-1',
            ngiId: expect.stringMatching(/^\{[0-9A-F-]{36}\}$/) as unknown,
            // The NGI's address in French, the court's in Dutch: 'Verzetsplein 3'
            address: 'Place de la Résistance 3',
            geometry: { type: 'Point', coordinates: [expect.any(Number), expect.any(Number)] },
            sources: [{ url: NGI_CANTONS, retrieved: '2026-10-21' }],
        })
        const [longitude, latitude] = locations[0]?.geometry.coordinates ?? []
        // Anderlecht, rounded to 7 decimals
        expect(longitude).toBeCloseTo(4.31, 1)
        expect(latitude).toBeCloseTo(50.84, 1)
        expect(longitude).toBe(Number(longitude?.toFixed(7)))
    })

    it('leaves out and reports a point at another house number than the court', () => {
        const moved = courts.map((c) =>
            c.id === 'justice-of-the-peace-anderlecht-1' && c.address ?
                { ...c, address: { ...c.address, street: 'Verzetsplein 30' } }
            :   c,
        )
        const { locations, report } = buildCourtLocations(root, cantons, moved)
        expect(locations.map((l) => l.id)).toEqual(['justice-of-the-peace-antwerpen-1'])
        expect(report.moved).toEqual([
            'justice-of-the-peace-anderlecht-1: the NGI places it at "Place de la Résistance 3", ' +
                'the court gives "Verzetsplein 30"',
        ])
    })

    it('places a seat whose address matches when the court’s doesn’t', () => {
        const anderlecht = courts.find((c) => c.id === 'justice-of-the-peace-anderlecht-1')
        if (!anderlecht) throw new Error('No Anderlecht 1 in the courts')
        const seat: Court = {
            ...anderlecht,
            id: 'justice-of-the-peace-anderlecht-1-seat',
            kind: 'seat',
            court: 'justice-of-the-peace-anderlecht-1',
        }
        delete seat.canton
        const withSeat = [
            ...courts.map((c) => {
                if (c.id !== 'justice-of-the-peace-anderlecht-1') return c
                const copy = { ...c }
                delete copy.address
                return copy
            }),
            seat,
        ]
        const { locations } = buildCourtLocations(root, cantons, withSeat)
        expect(locations.map((l) => l.id)).toContain('justice-of-the-peace-anderlecht-1-seat')
    })

    it('reports a point whose canton has no court', () => {
        const { locations, report } = buildCourtLocations(
            root,
            cantons,
            courts.filter((c) => c.canton !== 'antwerpen-1'),
        )
        expect(locations).toHaveLength(1)
        expect(report.unmatched).toEqual([expect.stringMatching(/no court for antwerpen-1$/)])
    })
})

describe('houseNumber', () => {
    it.each([
        ['Verzetsplein 3', '3'],
        ['Poelaertplein 3 bus 5', '3'],
        ['Poelaertplein, 3', '3'],
        ['Canadaplein 1, 8400 Oostende', '1'],
        ['Rue Royale 271-273', '271'],
        ['Dr. André Sierensstraat 16/3', '16'],
        ['Gerechtsgebouw, Canadaplein ZN', undefined],
        ['', undefined],
    ])('%s → %s', (street, number) => {
        expect(houseNumber(street)).toBe(number)
    })
})
