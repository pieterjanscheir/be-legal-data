import { z } from 'zod'
import {
    arrondissementIdSchema,
    cantonIdSchema,
    judicialAreaIdSchema,
    municipalityIdSchema,
    provinceIdSchema,
    regionIdSchema,
} from '../ids.generated.ts'
import {
    bilingualSchema,
    sourceRefSchema,
    translatedSchema,
    urlSchema,
    validityShape,
} from './common.ts'

/** Area of a court of appeal (rechtsgebied): Antwerpen, Brussel, Gent, Luik or Bergen */
export const judicialAreaSchema = z.strictObject({
    ...validityShape,
    /** Stable id from the local-language name, e.g. 'gent' */
    id: judicialAreaIdSchema,
    name: translatedSchema,
})
/** Area of a court of appeal (rechtsgebied): Antwerpen, Brussel, Gent, Luik or Bergen */
export type JudicialArea = z.infer<typeof judicialAreaSchema>

/** A judicial arrondissement */
export const arrondissementSchema = z.strictObject({
    ...validityShape,
    /** Stable id from the local-language name, e.g. 'oost-vlaanderen' */
    id: arrondissementIdSchema,
    name: translatedSchema,
    /** The judicial area the arrondissement belongs to */
    judicialArea: judicialAreaIdSchema,
})
/** A judicial arrondissement */
export type Arrondissement = z.infer<typeof arrondissementSchema>

/** One of the three regions (gewesten, régions): Flemish, Walloon and Brussels-Capital */
export const regionSchema = z.strictObject({
    ...validityShape,
    /** The region's Statbel REFNIS code: '02000' Flemish, '03000' Walloon, '04000' Brussels-Capital */
    id: regionIdSchema,
    /** The name as Statbel publishes it: 'Vlaams Gewest', 'Région flamande', 'Flämische Region' */
    name: translatedSchema,
    /** Statbel's REFNIS code list, and the day its content was first seen */
    sources: z.array(sourceRefSchema).min(1),
})
/** One of the three regions (gewesten, régions): Flemish, Walloon and Brussels-Capital */
export type Region = z.infer<typeof regionSchema>

/** One of the ten provinces. The Brussels-Capital Region has none. */
export const provinceSchema = z.strictObject({
    ...validityShape,
    /** The province's Statbel REFNIS code, e.g. '40000' for Oost-Vlaanderen */
    id: provinceIdSchema,
    /**
     * The name as Statbel publishes it: 'Provincie Oost-Vlaanderen', 'Province de Flandre
     * orientale', 'Provinz Ostflandern'
     */
    name: translatedSchema,
    /** The region the province lies in */
    region: regionIdSchema,
    /** Statbel's REFNIS code list, and the day its content was first seen */
    sources: z.array(sourceRefSchema).min(1),
})
/** One of the ten provinces. The Brussels-Capital Region has none. */
export type Province = z.infer<typeof provinceSchema>

/** A municipality, as Statbel lists it */
export const municipalitySchema = z.strictObject({
    ...validityShape,
    /** The municipality's Statbel REFNIS (NIS) code, e.g. '44021' for Gent */
    id: municipalityIdSchema,
    name: bilingualSchema,
    /**
     * REFNIS code of the province. The 19 municipalities of the Brussels-Capital Region have no
     * province and carry the region's code, '04000', as Statbel's files do.
     */
    province: z.union([provinceIdSchema, z.literal('04000')]),
    /** REFNIS code of the region */
    region: regionIdSchema,
})
/** A municipality, as Statbel lists it */
export type Municipality = z.infer<typeof municipalitySchema>

/** A provision of Belgian law */
export const legalBasisSchema = z.strictObject({
    /** The law's ELI on the Belgian Official Journal's site (ejustice) */
    url: urlSchema,
    /** The provision within it, as the law numbers it: 'Bijvoegsel art. 1, afdeling 1.1' */
    provision: z.string(),
})
/** A provision of Belgian law */
export type LegalBasis = z.infer<typeof legalBasisSchema>

/** A judicial canton: the area of one justice of the peace */
export const cantonSchema = z.strictObject({
    ...validityShape,
    /** Stable id from the local-language name, plus the number if any: 'gent-1', 'merelbeke-melle' */
    id: cantonIdSchema,
    /** The judicial arrondissement */
    arrondissement: arrondissementIdSchema,
    /**
     * Name of the canton; usually the seat, but not always ('Oudergem' sits in Etterbeek). In
     * Dutch and French from the annex to the Judicial Code; in German only where an official
     * German text names the canton (see `sources`), since the annex has no German translation.
     */
    name: bilingualSchema.extend({ de: z.string().exactOptional() }),
    /** Canton number for places with several cantons (Gent 1–5, …) */
    number: z.int().positive().exactOptional(),
    /** Where the justice of the peace sits */
    seat: bilingualSchema,
    /**
     * The municipalities the canton covers. `partial` marks a municipality that is split over
     * several cantons; `territory` then says which part belongs to this one.
     */
    municipalities: z
        .array(
            z.strictObject({
                municipality: municipalityIdSchema,
                partial: z.boolean().exactOptional(),
            }),
        )
        .min(1),
    /** The canton's area, verbatim from the annex to the Judicial Code */
    territory: bilingualSchema,
    /** Where the law defines the canton */
    legalBasis: legalBasisSchema,
    /** The official texts the German name is taken from, for a canton that has one */
    sources: z.array(sourceRefSchema).exactOptional(),
})
/** A judicial canton: the area of one justice of the peace */
export type Canton = z.infer<typeof cantonSchema>
