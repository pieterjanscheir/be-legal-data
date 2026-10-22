import { z } from 'zod'
import { daySchema, translatedSchema } from './common.ts'

/** The ten legal public holidays (KB 18 april 1974, art. 1) */
export const publicHolidayIdSchema = z.enum([
    'new-year',
    'easter-monday',
    'labour-day',
    'ascension',
    'whit-monday',
    'national-day',
    'assumption',
    'all-saints',
    'armistice',
    'christmas',
])
/** The ten legal public holidays (KB 18 april 1974, art. 1) */
export type PublicHolidayId = z.infer<typeof publicHolidayIdSchema>

/** When a holiday falls each year */
export const publicHolidayRuleSchema = z.discriminatedUnion('type', [
    z.strictObject({
        /** The same day every year */
        type: z.literal('fixed'),
        month: z.int().min(1).max(12),
        day: z.int().min(1).max(31),
    }),
    z.strictObject({
        /** A number of days after Easter Sunday (Gregorian calendar) */
        type: z.literal('easter'),
        daysAfterEaster: z.int().min(1),
    }),
])
export type PublicHolidayRule = z.infer<typeof publicHolidayRuleSchema>

export const publicHolidayDefinitionSchema = z.strictObject({
    id: publicHolidayIdSchema,
    name: translatedSchema,
    rule: publicHolidayRuleSchema,
})
export type PublicHolidayDefinition = z.infer<typeof publicHolidayDefinitionSchema>

/** A year in which a holiday was moved to another day by royal decree */
export const publicHolidayReplacementSchema = z.strictObject({
    holiday: publicHolidayIdSchema,
    /** The day the rule gives, YYYY-MM-DD */
    replaces: daySchema,
    /** The day the holiday is that year instead, YYYY-MM-DD */
    day: daySchema,
    /** The decree that moved it */
    legalBasis: z.string(),
})
export type PublicHolidayReplacement = z.infer<typeof publicHolidayReplacementSchema>

export const publicHolidaysSchema = z.strictObject({
    description: z.string(),
    /** The law and decree that set the holidays */
    legalBasis: z.string(),
    /** The first year the rules are on file for */
    fromYear: z.int(),
    holidays: z.array(publicHolidayDefinitionSchema).length(10),
    replacements: z.array(publicHolidayReplacementSchema),
})
export type PublicHolidays = z.infer<typeof publicHolidaysSchema>
