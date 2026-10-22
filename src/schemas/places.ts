import { z } from 'zod'
import { houseOfJusticeIdSchema, prisonIdSchema } from '../ids.generated.ts'
import {
    addressSchema,
    contactSchema,
    sourceRefSchema,
    partialTranslatedSchema,
    validityShape,
    websiteSchema,
} from './common.ts'

/** A prison or detention house of the FPS Justice (DG EPI) */
export const prisonSchema = z.strictObject({
    ...validityShape,
    /**
     * Stable id from the name in the local language (Dutch in Brussels), without articles:
     * 'gevangenis-gent', 'prison-lantin', 'detentiehuis-kortrijk'
     */
    id: prisonIdSchema,
    /** A detention house (detentiehuis) holds people for short sentences, close to home */
    kind: z.enum(['prison', 'detention-house']),
    /** The name in each national language, as FPS Justice publishes it */
    name: partialTranslatedSchema,
    /** In the local language */
    address: addressSchema,
    contacts: z.array(contactSchema),
    /** The prison's page on justitie.belgium.be, per language */
    website: websiteSchema,
    sources: z.array(sourceRefSchema).min(1),
})
/** A prison or detention house of the FPS Justice (DG EPI) */
export type Prison = z.infer<typeof prisonSchema>

/**
 * A house of justice (justitiehuis, maison de justice): guidance and supervision of offenders,
 * victim support, social studies for the courts. Run by the Communities since 2015.
 */
export const houseOfJusticeSchema = z.strictObject({
    ...validityShape,
    /** Stable id from the name, without articles: 'justitiehuis-gent', 'maison-justice-arlon' */
    id: houseOfJusticeIdSchema,
    /** The Community that runs it */
    community: z.enum(['flemish', 'french', 'german']),
    /** The name, in the language of its Community */
    name: partialTranslatedSchema,
    /**
     * The house's id in the Flemish organisation register (Wegwijs, OVO number), for the Flemish
     * houses
     */
    ovo: z
        .string()
        .regex(/^OVO\d{6}$/)
        .exactOptional(),
    address: addressSchema,
    contacts: z.array(contactSchema),
    /** The page it's listed on */
    website: websiteSchema,
    sources: z.array(sourceRefSchema).min(1),
})
/**
 * A house of justice (justitiehuis, maison de justice): guidance and supervision of offenders,
 * victim support, social studies for the courts. Run by the Communities since 2015.
 */
export type HouseOfJustice = z.infer<typeof houseOfJusticeSchema>
