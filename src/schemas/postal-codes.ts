import { z } from 'zod'
import { municipalityIdSchema, postalCodeIdSchema } from '../ids.generated.ts'
import { validityShape } from './common.ts'

/**
 * A postal code and one of the municipalities it belongs to, from Statbel's conversion table.
 * A municipality has one or more postal codes; a postal code belongs to one municipality,
 * except 1040 (Brussel and Etterbeek), 1050 (Brussel and Elsene) and 1804 (Vilvoorde and
 * Zemst), which have a record per municipality.
 */
export const postalCodeSchema = z.strictObject({
    ...validityShape,
    /**
     * The postal code and the municipality's REFNIS code, joined: '9000-44021'. Neither code
     * alone names a record (a postal code can belong to two municipalities, a municipality has
     * several postal codes); together they're both official and unique.
     */
    id: postalCodeIdSchema,
    /** The four-digit postal code */
    postalCode: z.string().regex(/^\d{4}$/),
    /** The municipality, by REFNIS code */
    municipality: municipalityIdSchema,
})
/**
 * A postal code and one of the municipalities it belongs to, from Statbel's conversion table.
 * A municipality has one or more postal codes; a postal code belongs to one municipality,
 * except 1040 (Brussel and Etterbeek), 1050 (Brussel and Elsene) and 1804 (Vilvoorde and
 * Zemst), which have a record per municipality.
 */
export type PostalCode = z.infer<typeof postalCodeSchema>
