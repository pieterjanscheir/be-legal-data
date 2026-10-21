import { computed } from 'vue'
import { useData } from 'vitepress'

/** The site's locales: `root` is English; the Dutch and French pages mirror it under /nl and /fr */
export type SiteLocale = 'root' | 'nl' | 'fr'

/** The language to show the data's own names in: Dutch on the English pages, as before */
export type DataLang = 'nl' | 'fr'

/** The page's locale, the prefix for links into its pages, and the language for data names */
export function useLocale() {
    const { localeIndex } = useData()
    const locale = computed<SiteLocale>(() =>
        localeIndex.value === 'nl' || localeIndex.value === 'fr' ? localeIndex.value : 'root',
    )
    const prefix = computed(() => (locale.value === 'root' ? '' : `/${locale.value}`))
    const dataLang = computed<DataLang>(() => (locale.value === 'fr' ? 'fr' : 'nl'))
    return { locale, prefix, dataLang }
}

/**
 * The component's strings in the page's language. English (`root`) is complete; a translation
 * may leave a key out and gets the English string for it.
 */
export function useStrings<T extends Record<string, string>>(dict: {
    root: T
    nl?: Partial<T>
    fr?: Partial<T>
}) {
    const { locale } = useLocale()
    return computed(() => ({ ...dict.root, ...dict[locale.value] }) as T)
}

/** Fills `{name}` placeholders: fmt('{n} cantons', { n: 3 }) */
export function fmt(template: string, vars: Record<string, string | number>) {
    return template.replace(/\{(\w+)\}/g, (match, key: string) =>
        key in vars ? String(vars[key]) : match,
    )
}

/** A name published in several languages, in the page's data language or the first available */
export function inLang<T extends Partial<Record<string, string>>>(
    names: T | undefined,
    lang: DataLang,
): string {
    if (!names) return ''
    return names[lang] ?? names.nl ?? names.fr ?? names.de ?? ''
}
