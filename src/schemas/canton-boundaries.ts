import { z } from 'zod'
import { cantonIdSchema } from '../ids.generated.ts'
import { sourceRefSchema, validityShape } from './common.ts'

/** A GeoJSON position: longitude, then latitude, in decimal degrees (WGS 84) */
export const positionSchema = z.tuple([z.number().min(-180).max(180), z.number().min(-90).max(90)])
/** A GeoJSON position: longitude, then latitude, in decimal degrees (WGS 84) */
export type Position = z.infer<typeof positionSchema>

/** A GeoJSON linear ring: closed (the first position repeated last), so at least four positions */
export const ringSchema = z.array(positionSchema).min(4)
/** A GeoJSON linear ring: closed (the first position repeated last), so at least four positions */
export type Ring = z.infer<typeof ringSchema>

/**
 * The rings of a GeoJSON polygon: the exterior ring first, counter-clockwise, then its holes,
 * clockwise (RFC 7946)
 */
export const polygonCoordinatesSchema = z.array(ringSchema).min(1)
/**
 * The rings of a GeoJSON polygon: the exterior ring first, counter-clockwise, then its holes,
 * clockwise (RFC 7946)
 */
export type PolygonCoordinates = z.infer<typeof polygonCoordinatesSchema>

/** A GeoJSON MultiPolygon geometry (RFC 7946), in WGS 84 */
export const multiPolygonSchema = z.strictObject({
    type: z.literal('MultiPolygon'),
    coordinates: z.array(polygonCoordinatesSchema).min(1),
})
/** A GeoJSON MultiPolygon geometry (RFC 7946), in WGS 84 */
export type MultiPolygon = z.infer<typeof multiPolygonSchema>

/**
 * The boundary of a judicial canton, as the National Geographic Institute (NGI) digitised it
 * from the annex to the Judicial Code. The legal text in the canton's `territory` is the law;
 * where the two disagree, the text wins.
 */
export const cantonBoundarySchema = z.strictObject({
    ...validityShape,
    /** The canton's id: a canton has one boundary, which takes its key */
    id: cantonIdSchema,
    /** The canton the boundary belongs to */
    canton: cantonIdSchema,
    /** The NGI's identifier of the object (its `tgid`), e.g. '{50412818-C0B7-4FEE-9E9B-DFFF0A768922}' */
    ngiId: z.string().regex(/^\{[0-9A-F]{8}(-[0-9A-F]{4}){3}-[0-9A-F]{12}\}$/),
    /**
     * The canton code in the NGI's data, in Dutch and French: six digits, the same in both
     * ('248112' for Gent 1), with an 'N' or 'F' prefix per language in Brussels-Capital and in
     * Sint-Genesius-Rode ('N238104', 'F238104' for Brussel 1)
     */
    cantonCode: z.strictObject({
        nl: z.string().regex(/^N?\d{6}$/),
        fr: z.string().regex(/^F?\d{6}$/),
    }),
    /**
     * The boundary as the NGI publishes it, without simplification: WGS 84, longitude first,
     * coordinates rounded to 7 decimals (about a centimetre)
     */
    geometry: multiPolygonSchema,
    sources: z.array(sourceRefSchema).min(1),
})
/**
 * The boundary of a judicial canton, as the National Geographic Institute (NGI) digitised it
 * from the annex to the Judicial Code. The legal text in the canton's `territory` is the law;
 * where the two disagree, the text wins.
 */
export type CantonBoundary = z.infer<typeof cantonBoundarySchema>
