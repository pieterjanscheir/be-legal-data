import { describe, expect, it } from 'vitest'

import {
    arrondissements,
    courts,
    findCourts,
    formatCourtName,
    getContact,
    getCourt,
    getInterestRate,
    getLatestKnownRateDate,
    interestRates,
    type InterestType,
} from '../src'

describe('data integrity', () => {
    it('has unique court ids', () => {
        const ids = courts.map((c) => c.id)
        expect(new Set(ids).size).toBe(ids.length)
    })

    it('only references known arrondissements', () => {
        const known = new Set(arrondissements.map((a) => a.id))
        for (const c of courts) expect(known, c.id).toContain(c.arrondissement)
    })

    it('gives every court a name in all languages and a postal code', () => {
        for (const c of courts) {
            expect(c.name.nl && c.name.fr && c.name.de, c.id).toBeTruthy()
            expect(c.address.postalCode, c.id).toMatch(/^\d{4}$/)
        }
    })

    it.each(['legal', 'commercial'] as InterestType[])(
        'has sorted, non-overlapping %s rate periods',
        (type) => {
            const periods = interestRates[type].periods
            for (const p of periods) {
                expect(p.from, JSON.stringify(p)).toMatch(/^\d{4}-\d{2}-\d{2}$/)
                expect(p.from <= p.to, JSON.stringify(p)).toBe(true)
            }
            for (let i = 1; i < periods.length; i++) {
                expect(periods[i - 1].to < periods[i].from, periods[i].from).toBe(true)
            }
        },
    )
})

describe('courts', () => {
    it('formats justice of the peace names', () => {
        expect(formatCourtName(getCourt('VredegerechtGent1')!)).toBe(
            'Vredegerecht 1e kanton Gent',
        )
        expect(formatCourtName(getCourt('VredegerechtDeinze')!, 'fr')).toBe(
            'Tribunal de paix canton Deinze',
        )
    })

    it('formats enterprise court division names', () => {
        const brugge = getCourt('OndernemingsrechtbankGentBrugge')!
        expect(formatCourtName(brugge)).toBe(
            'Ondernemingsrechtbank Gent - afdeling Brugge',
        )
        expect(formatCourtName(brugge, 'fr')).toBe(
            "Tribunal de l'entreprise de Gand - division Bruges",
        )
    })

    it('filters by type and arrondissement', () => {
        const result = findCourts({ type: 'enterprise-court', arrondissement: 'EastFlanders' })
        expect(result.map((c) => c.name.nl).sort()).toEqual([
            'Dendermonde',
            'Gent',
            'Oudenaarde',
        ])
    })

    it('finds a contact by label', () => {
        const gent = getCourt('OndernemingsrechtbankGentGent')!
        expect(getContact(gent, 'email', 'griffie')).toBe('orb.gent.griffie@just.fgov.be')
    })
})

describe('getInterestRate', () => {
    it('returns the legal rate for a year', () => {
        expect(getInterestRate('2024-06-15', 'legal')).toEqual({
            rate: 5.75,
            period: { from: '2024-01-01', to: '2024-12-31' },
        })
    })

    it('accepts Date objects as local days', () => {
        expect(getInterestRate(new Date(2023, 0, 1), 'legal')?.rate).toBe(5.25)
    })

    it('depends on the contract date for commercial rates in 2013–2015', () => {
        expect(getInterestRate('2014-06-15', 'commercial')?.rate).toBe(7.5)
        expect(
            getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true })?.rate,
        ).toBe(8.5)
        expect(getInterestRate('2015-03-16', 'commercial')?.rate).toBe(8.5)
    })

    it('returns null when no rate is on file', () => {
        expect(getInterestRate('1960-01-01', 'legal')).toBeNull()
        const after = getLatestKnownRateDate('commercial')
        expect(getInterestRate(`${Number(after.slice(0, 4)) + 1}-06-01`, 'commercial')).toBeNull()
    })
})
