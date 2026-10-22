import { z } from 'zod'
import { municipalityIdSchema } from '../ids.generated.ts'

export const localeSchema = z.enum(['nl', 'fr', 'de'])
export type Locale = z.infer<typeof localeSchema>

/** A name in the three national languages */
export const translatedSchema = z.strictObject({ nl: z.string(), fr: z.string(), de: z.string() })
/** A name in the three national languages */
export type Translated = z.infer<typeof translatedSchema>

/** A name as the Judicial Code gives it, in Dutch and French */
export const bilingualSchema = z.strictObject({ nl: z.string(), fr: z.string() })
/** A name as the Judicial Code gives it, in Dutch and French */
export type Bilingual = z.infer<typeof bilingualSchema>

/** A day as YYYY-MM-DD */
export const daySchema = z.iso.date()

/** An http(s) URL */
export const urlSchema = z.httpUrl()
/** An http(s) URL */
export type Url = z.infer<typeof urlSchema>

/** A value per national language, for the languages it's published in */
export const perLanguage = <T extends z.ZodType>(value: T) =>
    z.strictObject({
        nl: value.exactOptional(),
        fr: value.exactOptional(),
        de: value.exactOptional(),
    })

/** A name in the national languages it's published in */
export const partialTranslatedSchema = perLanguage(z.string())

/** A page per language: the languages it's published in */
export const websiteSchema = perLanguage(urlSchema)

/** Where a record's data was taken from */
export const sourceRefSchema = z.strictObject({
    /** The exact official page or file the data comes from */
    url: urlSchema,
    /** Day the source was last checked, YYYY-MM-DD */
    retrieved: daySchema,
})
/** Where a record's data was taken from */
export type SourceRef = z.infer<typeof sourceRefSchema>

/** When a record applies, both days included. No `validTo`: it still applies. */
export const validityShape = {
    /**
     * First day the record applies, YYYY-MM-DD. No `validFrom`: since before the dataset's
     * coverage starts.
     */
    validFrom: daySchema.exactOptional(),
    /** Last day the record applies, YYYY-MM-DD */
    validTo: daySchema.exactOptional(),
}
/** When a record applies, both days included. No `validTo`: it still applies. */
export const validitySchema = z.strictObject(validityShape)
/** When a record applies, both days included. No `validTo`: it still applies. */
export type Validity = z.infer<typeof validitySchema>

/** A postal address, as published */
export const addressSchema = z.strictObject({
    /** A building's name, when one is published: 'Gerechtsgebouw' */
    building: z.string().exactOptional(),
    /**
     * The street line as published, with its number, box or floor: 'Kazernevest 3',
     * 'Beverstraat 7B (eerste verdieping)'
     */
    street: z.string(),
    /** The four-digit postal code */
    postalCode: z.string().regex(/^\d{4}$/),
    city: z.string(),
    /**
     * The municipality the postal code belongs to, by REFNIS code (data/postal-codes.json).
     * Missing when the code is shared by two municipalities and the city line doesn't name
     * one of them.
     */
    municipality: municipalityIdSchema.exactOptional(),
})
/** A postal address, as published */
export type Address = z.infer<typeof addressSchema>

const contactShape = {
    /**
     * The registry or service the contact belongs to, as the source titles it, in that page's
     * language: 'Burgerlijke griffie', 'Greffe pénal'. No label: the general contact.
     */
    label: z.string().exactOptional(),
    /** Text published with the value: 'griffie', 'druk 1', 'tapez 2' */
    note: z.string().exactOptional(),
}
const e164Schema = z.string().regex(/^\+32\d{8,9}$/)

export const contactSchema = z.discriminatedUnion('type', [
    z.strictObject({
        type: z.literal('phone'),
        /** E.164: '+3292343210'; `formatPhoneNumber` gives the national form */
        value: e164Schema,
        ...contactShape,
    }),
    z.strictObject({
        type: z.literal('fax'),
        /** E.164: '+3292343210'; `formatPhoneNumber` gives the national form */
        value: e164Schema,
        ...contactShape,
    }),
    z.strictObject({
        type: z.literal('email'),
        /** Lowercase */
        value: z.string().regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/),
        ...contactShape,
    }),
    z.strictObject({
        type: z.literal('bank-account'),
        /** IBAN in electronic form, checksum verified (`formatIban` groups it by four) */
        value: z.string().regex(/^BE\d{14}$/),
        ...contactShape,
    }),
])
export type Contact = z.infer<typeof contactSchema>
export type ContactType = Contact['type']
