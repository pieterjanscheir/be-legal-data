import interestRatesData from '../data/interest-rates.json'

/** 'legal' = wettelijke interest, 'commercial' = handelstransacties */
export type InterestType = 'legal' | 'commercial'

export interface InterestRatePeriod {
    /**
     * First day of the period (inclusive), YYYY-MM-DD
     * @format date
     */
    from: string
    /**
     * Last day of the period (inclusive), YYYY-MM-DD
     * @format date
     */
    to: string
    /**
     * Rate in percent
     * @minimum 0
     * @maximum 100
     */
    rate: number
    /**
     * Commercial rates 2013 – 15 March 2015 only: the rate for contracts
     * concluded before 16 March 2013, when it differs from `rate`.
     */
    rateForContractsBefore20130316?: number
    note?: string
}

export interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

export const interestRates: Readonly<Record<InterestType, InterestRateSeries>> = interestRatesData

export interface InterestRateResult {
    rate: number
    period: { from: string; to: string }
}

/**
 * Local calendar day as YYYY-MM-DD. Strings must start with a valid YYYY-MM-DD day (a time
 * after it is ignored): periods are compared as strings, so '2013-1-15' would otherwise
 * silently fall in the wrong period.
 */
function toDay(date: Date | string): string {
    if (typeof date === 'string') {
        const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(date)
        const [y = NaN, m = NaN, d = NaN] = (match ?? []).slice(1).map(Number)
        // Date.UTC rolls an impossible day over ('2013-02-30' → 2 March), which this catches
        const check = new Date(Date.UTC(y, m - 1, d))
        if (check.getUTCMonth() !== m - 1 || check.getUTCDate() !== d) {
            throw new RangeError(`Expected a day as YYYY-MM-DD, got '${date}'`)
        }
        return date.slice(0, 10)
    }
    if (Number.isNaN(date.getTime())) throw new RangeError('Invalid Date')
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${date.getFullYear()}-${m}-${d}`
}

/**
 * The rate that applies on a day, or `null` when no rate is on file for it
 * (before the earliest period, or a period not yet published).
 *
 * Throws a `RangeError` for a string that isn't a valid YYYY-MM-DD day, or an invalid `Date`.
 *
 * `contractAfter20130316` only matters for commercial interest between 2013
 * and 15 March 2015; by default the rate for older contracts is used.
 */
export function getInterestRate(
    date: Date | string,
    type: InterestType,
    options: { contractAfter20130316?: boolean } = {},
): InterestRateResult | null {
    const day = toDay(date)
    const period = interestRates[type].periods.find((p) => p.from <= day && day <= p.to)
    if (!period) return null
    const rate =
        !options.contractAfter20130316 && period.rateForContractsBefore20130316 !== undefined ?
            period.rateForContractsBefore20130316
        :   period.rate
    return { rate, period: { from: period.from, to: period.to } }
}

/** Last day for which a rate is on file, YYYY-MM-DD */
export function getLatestKnownRateDate(type: InterestType): string {
    // Periods are sorted and never empty (test/data.test.ts), so the last one ends latest
    const last = interestRates[type].periods.at(-1)
    /* v8 ignore next */
    if (!last) throw new Error(`No ${type} interest rates on file`)
    return last.to
}
