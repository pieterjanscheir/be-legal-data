import { z } from 'zod'
import {
    arrondissementIdSchema,
    cantonIdSchema,
    courtIdSchema,
    judicialAreaIdSchema,
} from '../ids.generated.ts'
import {
    addressSchema,
    contactSchema,
    sourceRefSchema,
    partialTranslatedSchema,
    validityShape,
    websiteSchema,
} from './common.ts'

export const courtTypeSchema = z.enum([
    'justice-of-the-peace',
    'police-court',
    'court-of-first-instance',
    'enterprise-court',
    'labour-court',
    'court-of-appeal',
    'labour-court-of-appeal',
    'court-of-assize',
])
export type CourtType = z.infer<typeof courtTypeSchema>

/**
 * A court, a division of one (afdeling, division, Abteilung), or one of the seats of a justice
 * of the peace that sits in several places.
 */
export const courtSchema = z.strictObject({
    ...validityShape,
    /**
     * Stable id: the type, then the place in the court's own language (Dutch for Brussels, with
     * `-nl` or `-fr` for the courts split by language); a division or seat adds its place.
     * 'justice-of-the-peace-gent-1', 'enterprise-court-gent-brugge', 'police-court-brussel-fr'
     */
    id: courtIdSchema,
    type: courtTypeSchema,
    kind: z.enum(['court', 'division', 'seat']),
    /** For a division or seat: the court it belongs to */
    court: courtIdSchema.exactOptional(),
    /**
     * The court's name as it publishes it, in each language it publishes in: 'Vredegerecht
     * Gent 1', 'Tribunal de l'entreprise du Hainaut - division Mons'
     */
    name: partialTranslatedSchema,
    judicialArea: judicialAreaIdSchema,
    /** The arrondissement, for a court whose area is one arrondissement or lies within one */
    arrondissement: arrondissementIdSchema.exactOptional(),
    /** For a justice of the peace: the canton it serves */
    canton: cantonIdSchema.exactOptional(),
    /**
     * For a court other than a justice of the peace: the cantons it covers, as the annex to the
     * Judicial Code (art. 3–5) and art. 114 of the Code set them. A justice of the peace covers
     * its `canton`; a division or seat has neither: see `court`.
     */
    cantons: z.array(cantonIdSchema).exactOptional(),
    /**
     * The court's codes in European Case Law Identifiers (ECLI:BE:<code>:…), one per language
     * it judges in; only codes seen in published decisions
     */
    ecli: z.array(z.string().regex(/^[A-Z]{2,7}$/)).exactOptional(),
    /** Where the registry is; missing when the court publishes no single address */
    address: addressSchema.exactOptional(),
    contacts: z.array(contactSchema),
    /**
     * When the registry is open, in OpenStreetMap `opening_hours` syntax: 'Mo-Fr
     * 08:30-12:30,13:30-16:00'. Only when the published text reads to it without doubt.
     */
    openingHours: z.string().exactOptional(),
    /** The opening hours as the court publishes them, per language */
    openingHoursText: partialTranslatedSchema.exactOptional(),
    /** The court's page, per language */
    website: websiteSchema,
    /** The pages the record was read from */
    sources: z.array(sourceRefSchema).min(1),
})
/**
 * A court, a division of one (afdeling, division, Abteilung), or one of the seats of a justice
 * of the peace that sits in several places.
 */
export type Court = z.infer<typeof courtSchema>
