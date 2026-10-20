export type Locale = 'nl' | 'fr' | 'de'

/** A name in the three national languages */
export type Translated = Record<Locale, string>

/** A name as the Judicial Code gives it, in Dutch and French */
export type Bilingual = Record<'nl' | 'fr', string>

/** Where a record's data was taken from */
export interface SourceRef {
    /**
     * The exact official page or file the data comes from
     * @format uri
     */
    url: string
    /**
     * Day the source was last checked, YYYY-MM-DD
     * @format date
     */
    retrieved: string
}
