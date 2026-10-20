/** 'legal' = wettelijke interest, 'commercial' = handelstransacties */
type InterestType = 'legal' | 'commercial';
interface InterestRatePeriod {
    /**
     * First day of the period (inclusive), YYYY-MM-DD
     * @format date
     */
    from: string;
    /**
     * Last day of the period (inclusive), YYYY-MM-DD
     * @format date
     */
    to: string;
    /**
     * Rate in percent
     * @minimum 0
     * @maximum 100
     */
    rate: number;
    /**
     * Commercial rates 2013 – 15 March 2015 only: the rate for contracts
     * concluded before 16 March 2013, when it differs from `rate`.
     */
    rateForContractsBefore20130316?: number;
    note?: string;
}
interface InterestRateSeries {
    description: string;
    source: string;
    periods: InterestRatePeriod[];
}
declare const interestRates: Readonly<Record<InterestType, InterestRateSeries>>;
interface InterestRateResult {
    rate: number;
    period: {
        from: string;
        to: string;
    };
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
declare function getInterestRate(date: Date | string, type: InterestType, options?: {
    contractAfter20130316?: boolean;
}): InterestRateResult | null;
/** Last day for which a rate is on file, YYYY-MM-DD */
declare function getLatestKnownRateDate(type: InterestType): string;

export { type InterestRatePeriod, type InterestRateResult, type InterestRateSeries, type InterestType, getInterestRate, getLatestKnownRateDate, interestRates };
