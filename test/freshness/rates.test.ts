/**
 * Checks that depend on today's date: has a new rate been published that isn't in the data
 * yet? Run by the scheduled freshness workflow, which opens an issue when one fails.
 */
import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

import { getInterestRate, getLatestKnownRateDate, type InterestType } from '../../src'

const today = new Date().toISOString().slice(0, 10)
const inDays = (days: number) => new Date(Date.now() + days * 86_400_000).toISOString().slice(0, 10)

describe('interest rates', () => {
    it.each(['legal', 'commercial'] as InterestType[])('has the %s rate for today', (type) => {
        expect(
            getInterestRate(today, type),
            `No ${type} rate for ${today}; the data ends on ${getLatestKnownRateDate(type)}`,
        ).not.toBeNull()
    })

    // FOD Financiën publishes the commercial rate before the semester starts
    it('has the commercial rate for the next two weeks', () => {
        const day = inDays(14)
        expect(
            getInterestRate(day, 'commercial'),
            `No commercial rate yet for ${day}: check FOD Financiën for the next semester`,
        ).not.toBeNull()
    })
})

describe('review dates', () => {
    interface Resource {
        name: string
        path: string
        lastReviewed: string
        reviewEveryMonths: number
    }
    const { resources } = JSON.parse(readFileSync('datapackage.json', 'utf8')) as {
        resources: Resource[]
    }

    it.each(resources.map((r: Resource) => [r.name, r] as [string, Resource]))(
        '%s was reviewed recently enough',
        (_name: string, r: Resource) => {
            const [y = NaN, m = NaN, d = NaN] = r.lastReviewed.split('-').map(Number)
            // Day 0 of the month after is the last day of the target month: 31 August plus
            // 6 months is due on 28 (or 29) February, not rolled over into March
            const lastDay = new Date(Date.UTC(y, m - 1 + r.reviewEveryMonths + 1, 0)).getUTCDate()
            const due = new Date(Date.UTC(y, m - 1 + r.reviewEveryMonths, Math.min(d, lastDay)))
            const dueDay = due.toISOString().slice(0, 10)
            expect(
                today <= dueDay,
                `${r.path} was last reviewed on ${r.lastReviewed} and is due since ${dueDay}: ` +
                    'check it against its sources and update lastReviewed in datapackage.json',
            ).toBe(true)
        },
    )
})
