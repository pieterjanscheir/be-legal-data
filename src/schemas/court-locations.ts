import { z } from 'zod'
import { courtIdSchema } from '../ids.generated.ts'
import { sourceRefSchema, validityShape } from './common.ts'
import { ngiIdSchema, pointSchema } from './geometry.ts'

/**
 * Where a court is on the map: a point the National Geographic Institute (NGI) publishes for
 * each justice of the peace. Only kept where the NGI's address and the court's own agree on the
 * house number, so a point never sits at a building the court has left.
 */
export const courtLocationSchema = z.strictObject({
    ...validityShape,
    /** The court's id: a court has one location, which takes its key */
    id: courtIdSchema,
    /** The court, or the seat of one, the point is the location of */
    court: courtIdSchema,
    /** The NGI's identifier of the object (its `tgid`), e.g. '{453FCA79-B9F8-4194-875E-CD73D8AAAAA0}' */
    ngiId: ngiIdSchema,
    /** The address the NGI gives with the point, as published: 'Neerstraat 11' */
    address: z.string(),
    /** The point: WGS 84, longitude first, rounded to 7 decimals (about a centimetre) */
    geometry: pointSchema,
    sources: z.array(sourceRefSchema).min(1),
})
/**
 * Where a court is on the map: a point the National Geographic Institute (NGI) publishes for
 * each justice of the peace. Only kept where the NGI's address and the court's own agree on the
 * house number, so a point never sits at a building the court has left.
 */
export type CourtLocation = z.infer<typeof courtLocationSchema>
