import { z } from 'zod'

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

/** A GeoJSON Point geometry (RFC 7946), in WGS 84 */
export const pointSchema = z.strictObject({
    type: z.literal('Point'),
    coordinates: positionSchema,
})
/** A GeoJSON Point geometry (RFC 7946), in WGS 84 */
export type Point = z.infer<typeof pointSchema>

/** The NGI's identifier of an object (its `tgid`): a GUID in braces, uppercase */
export const ngiIdSchema = z.string().regex(/^\{[0-9A-F]{8}(-[0-9A-F]{4}){3}-[0-9A-F]{12}\}$/)
