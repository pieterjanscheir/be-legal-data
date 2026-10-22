import { z } from 'zod'
import { arrondissementIdSchema } from '../ids.generated.ts'
import { sourceRefSchema, validityShape } from './common.ts'
import { multiPolygonSchema, ngiIdSchema } from './geometry.ts'

/**
 * The boundary of a judicial arrondissement, as the National Geographic Institute (NGI)
 * digitised it from the annex to the Judicial Code: the union of its cantons' boundaries. The
 * legal text is the law; where the two disagree, the text wins.
 */
export const arrondissementBoundarySchema = z.strictObject({
    ...validityShape,
    /** The arrondissement's id: an arrondissement has one boundary, which takes its key */
    id: arrondissementIdSchema,
    /** The arrondissement the boundary belongs to */
    arrondissement: arrondissementIdSchema,
    /** The NGI's identifier of the object (its `tgid`), e.g. '{26AAD4D5-2C17-4F54-80DE-297C9683B18D}' */
    ngiId: ngiIdSchema,
    /**
     * The boundary as the NGI publishes it, without simplification: WGS 84, longitude first,
     * coordinates rounded to 7 decimals (about a centimetre)
     */
    geometry: multiPolygonSchema,
    sources: z.array(sourceRefSchema).min(1),
})
/**
 * The boundary of a judicial arrondissement, as the National Geographic Institute (NGI)
 * digitised it from the annex to the Judicial Code: the union of its cantons' boundaries. The
 * legal text is the law; where the two disagree, the text wins.
 */
export type ArrondissementBoundary = z.infer<typeof arrondissementBoundarySchema>
