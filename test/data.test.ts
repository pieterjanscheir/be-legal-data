import { describe, expect, it } from 'vitest'

import {
    arrondissements,
    cantons,
    courts,
    findCourts,
    getContact,
    getCourt,
    getDivisions,
    judicialAreas,
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

    it('only references known areas, arrondissements, cantons and courts', () => {
        const areas = new Set(judicialAreas.map((a) => a.id))
        const known = new Set(arrondissements.map((a) => a.id))
        const cantonIds = new Set(cantons.map((c) => c.id))
        for (const c of courts) {
            expect(areas, c.id).toContain(c.judicialArea)
            if (c.arrondissement) expect(known, c.id).toContain(c.arrondissement)
            if (c.canton) expect(cantonIds, c.id).toContain(c.canton)
            if (c.court) expect(getCourt(c.court).kind, c.id).toBe('court')
        }
    })

    it('puts every arrondissement in its judicial area', () => {
        for (const c of courts) {
            if (c.arrondissement)
                expect(
                    arrondissements.find((a) => a.id === c.arrondissement)?.judicialArea,
                    c.id,
                ).toBe(c.judicialArea)
        }
    })

    it('gives a division the type and area of its court', () => {
        for (const c of courts) {
            if (c.kind === 'court') {
                expect(c.court, c.id).toBeUndefined()
                continue
            }
            const court = getCourt(c.court ?? '')
            expect(court?.type, c.id).toBe(c.type)
            expect(court?.judicialArea, c.id).toBe(c.judicialArea)
            expect(c.id.startsWith(`${court?.id ?? ''}-`), c.id).toBe(true)
        }
    })

    it('names every court in at least one language', () => {
        for (const c of courts) expect(Object.values(c.name).length, c.id).toBeGreaterThan(0)
    })

    it('has a justice of the peace for every canton, serving only that canton', () => {
        const served = courts
            .filter((c) => c.type === 'justice-of-the-peace' && c.kind === 'court')
            .map((c) => c.canton)
        expect([...served].sort()).toEqual(cantons.map((c) => c.id).sort())
        for (const c of courts.filter((c) => c.type === 'justice-of-the-peace')) {
            const canton = cantons.find((k) => k.id === c.canton)
            expect(canton?.arrondissement, c.id).toBe(c.arrondissement)
        }
    })

    it('has every kind of court', () => {
        const count = (type: string) =>
            courts.filter((c) => c.type === type && c.kind === 'court').length
        expect(count('court-of-appeal')).toBe(5)
        expect(count('labour-court-of-appeal')).toBe(5)
        // 12 arrondissements, with Brussels split by language
        expect(count('court-of-first-instance')).toBe(13)
        expect(count('enterprise-court')).toBe(9)
        expect(count('labour-court')).toBe(9)
        // Brussels split by language, and Halle and Vilvoorde in the Brussels arrondissement
        expect(count('police-court')).toBe(15)
        // One per province, and Brussels-Capital
        expect(count('court-of-assize')).toBe(11)
    })

    it('has a source for every record', () => {
        for (const c of courts) {
            expect(c.sources.length, c.id).toBeGreaterThan(0)
            for (const s of c.sources) expect(s.retrieved, c.id).toMatch(/^\d{4}-\d{2}-\d{2}$/)
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
    it('filters by type and arrondissement', () => {
        const result = findCourts({ type: 'enterprise-court', arrondissement: 'oost-vlaanderen' })
        expect(result.map((c) => c.id).sort()).toEqual([
            'enterprise-court-gent-dendermonde',
            'enterprise-court-gent-gent',
            'enterprise-court-gent-oudenaarde',
        ])
    })

    it('filters by kind and judicial area', () => {
        expect(
            findCourts({ kind: 'court', type: 'court-of-appeal', judicialArea: 'mons' }),
        ).toEqual([getCourt('court-of-appeal-mons')])
    })

    it("lists a court's divisions", () => {
        expect(getDivisions('enterprise-court-gent').map((c) => c.id)).toContain(
            'enterprise-court-gent-brugge',
        )
        expect(getDivisions('justice-of-the-peace-philippeville').map((c) => c.kind)).toEqual([
            'seat',
            'seat',
        ])
        expect(getDivisions('justice-of-the-peace-gent-1')).toEqual([])
    })

    it('finds a contact, optionally by label', () => {
        const court = getCourt('court-of-appeal-liege')
        expect(getContact(court, 'email', 'Greffe pénal')).toBe('liege.ca.greffepenal@just.fgov.be')
        expect(getContact(court, 'email')).toMatch(/@just\.fgov\.be$/)
        expect(getContact(court, 'email', 'No such registry')).toBeUndefined()
    })

    it('merges the pages of a bilingual court', () => {
        expect(getCourt('justice-of-the-peace-meise').name).toEqual({
            nl: 'Vredegerecht Meise',
            fr: 'Justice de paix de Meise',
        })
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

    it('has values in the canonical form for their type', () => {
        for (const c of courts) {
            for (const k of c.contacts) {
                if (k.type === 'bank-account') expect(ibanIsValid(k.value), c.id).toBe(true)
                else if (k.type === 'email')
                    expect(k.value, c.id).toMatch(/^[^@\sA-Z]+@[^@\sA-Z]+$/)
                else expect(k.value, c.id).toMatch(/^\+32(4[5-9]\d{7}|[1-9]\d{7})$/)
            }
        }
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
                const day = '(Mo|Tu|We|Th|Fr|Sa|Su)'
                const days = `${day}(-${day})?(,${day}(-${day})?)*`
                const times = '\\d\\d:\\d\\d-\\d\\d:\\d\\d(,\\d\\d:\\d\\d-\\d\\d:\\d\\d)*'
                expect(c.openingHours, c.id).toMatch(
                    new RegExp(`^${days} ${times}(; ${days} ${times})*$`),
                )
            }
        }
    })
})
