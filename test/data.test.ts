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

/** Each item paired with the one after it */
const consecutive = <T>(items: readonly T[]): [T, T][] =>
    items.flatMap((item, i) => {
        const next = items[i + 1]
        return next === undefined ? [] : [[item, next] as [T, T]]
    })

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
            for (const [prev, next] of consecutive(periods)) {
                expect(prev.to < next.from, next.from).toBe(true)
            }
        },
    )

    // A gap would make getInterestRate return null for days inside the series
    it.each(['legal', 'commercial'] as InterestType[])('has no gaps in the %s series', (type) => {
        for (const [prev, next] of consecutive(interestRates[type].periods)) {
            const dayAfter = new Date(`${prev.to}T00:00:00Z`)
            dayAfter.setUTCDate(dayAfter.getUTCDate() + 1)
            expect(next.from, prev.to).toBe(dayAfter.toISOString().slice(0, 10))
        }
    })

    it('sets the legal rate per calendar year since 2007', () => {
        for (const p of interestRates.legal.periods.filter((p) => p.from >= '2007')) {
            expect([p.from.slice(5), p.to.slice(5)], p.from).toEqual(['01-01', '12-31'])
            expect(p.from.slice(0, 4), p.from).toBe(p.to.slice(0, 4))
        }
    })

    it('sets the commercial rate per semester', () => {
        for (const p of interestRates.commercial.periods) {
            // 2015 is split on 16 March, when the contract-date rule ended
            if (p.from.startsWith('2015-01') || p.from === '2015-03-16') continue
            expect(['01-01', '07-01'], p.from).toContain(p.from.slice(5))
            expect(['06-30', '12-31'], p.to).toContain(p.to.slice(5))
        }
    })

    it('only has an older-contracts rate between 2013 and 15 March 2015', () => {
        for (const p of interestRates.commercial.periods) {
            if (p.rateForContractsBefore20130316 === undefined) continue
            expect(p.from >= '2013-01-01' && p.to <= '2015-03-15', p.from).toBe(true)
        }
    })
})

describe('courts', () => {
    it('formats justice of the peace names', () => {
        expect(formatCourtName(getCourt('justice-of-the-peace-gent-1'))).toBe(
            'Vredegerecht 1e kanton Gent',
        )
        expect(formatCourtName(getCourt('justice-of-the-peace-deinze'), 'fr')).toBe(
            'Tribunal de paix canton Deinze',
        )
    })

    it('formats enterprise court division names', () => {
        const brugge = getCourt('enterprise-court-gent-brugge')
        expect(formatCourtName(brugge)).toBe('Ondernemingsrechtbank Gent - afdeling Brugge')
        expect(formatCourtName(brugge, 'fr')).toBe(
            "Tribunal de l'entreprise de Gand - division Bruges",
        )
    })

    it('filters by type and arrondissement', () => {
        const result = findCourts({ type: 'enterprise-court', arrondissement: 'oost-vlaanderen' })
        expect(result.map((c) => c.name.nl).sort()).toEqual(['Dendermonde', 'Gent', 'Oudenaarde'])
    })

    it('finds a contact by label', () => {
        const gent = getCourt('enterprise-court-gent-gent')
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

describe('court contact data', () => {
    // ISO 13616: move the first four characters to the end, letters to numbers, mod 97 is 1
    const ibanIsValid = (iban: string) =>
        BigInt(
            (iban.slice(4) + iban.slice(0, 4)).replace(/[A-Z]/g, (c) =>
                String(c.charCodeAt(0) - 55),
            ),
        ) %
            97n ===
        1n

    it('has valid IBANs', () => {
        for (const c of courts)
            if (c.bankAccount) expect(ibanIsValid(c.bankAccount), c.id).toBe(true)
    })

    it('has lowercase e-mail addresses', () => {
        for (const c of courts) {
            for (const k of c.contacts)
                if (k.type === 'email') expect(k.value).toBe(k.value.toLowerCase())
        }
    })

    it('has opening hours in opening_hours syntax', () => {
        for (const c of courts) {
            if (c.openingHours) {
                expect(c.openingHours, c.id).toMatch(
                    /^(Mo|Tu|We|Th|Fr|Sa|Su)(-(Mo|Tu|We|Th|Fr|Sa|Su))? \d\d:\d\d-\d\d:\d\d(,\d\d:\d\d-\d\d:\d\d)*$/,
                )
            }
        }
    })
})
