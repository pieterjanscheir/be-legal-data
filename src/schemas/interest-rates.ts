import { z } from 'zod'
import { daySchema } from './common.ts'

/** 'legal' = wettelijke interest, 'commercial' = handelstransacties */
export const interestTypeSchema = z.enum(['legal', 'commercial'])
/** 'legal' = wettelijke interest, 'commercial' = handelstransacties */
export type InterestType = z.infer<typeof interestTypeSchema>

const rateSchema = z.number().min(0).max(100)

/** A period during which one rate applies */
export const interestRatePeriodSchema = z.strictObject({
    /** First day of the period (inclusive), YYYY-MM-DD */
    from: daySchema,
    /** Last day of the period (inclusive), YYYY-MM-DD */
    to: daySchema,
    /** Rate in percent */
    rate: rateSchema,
    /**
     * Commercial rates 2013 – 15 March 2015 only: the rate for contracts
     * concluded before 16 March 2013, when it differs from `rate`.
     */
    rateForContractsBefore20130316: rateSchema.exactOptional(),
    note: z.string().exactOptional(),
})
/** A period during which one rate applies */
export type InterestRatePeriod = z.infer<typeof interestRatePeriodSchema>

/** The rates of one type of interest, with their source */
export const interestRateSeriesSchema = z.strictObject({
    /** What the rate is and its legal basis, in Dutch */
    description: z.string(),
    /** Where the rates are published: a publisher or a URL */
    source: z.string(),
    /** Every period on file, oldest first */
    periods: z.array(interestRatePeriodSchema).min(1),
})
/** The rates of one type of interest, with their source */
export type InterestRateSeries = z.infer<typeof interestRateSeriesSchema>
