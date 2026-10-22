import { z } from 'zod'
import { daySchema } from './common.ts'

/** 'legal' = wettelijke interest, 'commercial' = handelstransacties */
export const interestTypeSchema = z.enum(['legal', 'commercial'])
/** 'legal' = wettelijke interest, 'commercial' = handelstransacties */
export type InterestType = z.infer<typeof interestTypeSchema>

const rateSchema = z.number().min(0).max(100)

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
export type InterestRatePeriod = z.infer<typeof interestRatePeriodSchema>

export const interestRateSeriesSchema = z.strictObject({
    description: z.string(),
    source: z.string(),
    periods: z.array(interestRatePeriodSchema).min(1),
})
export type InterestRateSeries = z.infer<typeof interestRateSeriesSchema>
