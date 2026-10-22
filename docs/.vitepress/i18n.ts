import { computed } from 'vue'
import { useData } from 'vitepress'
import { extraLocales } from './locales'
import type { ComponentName } from './locales/types'

/**
 * The site's locales: `root` is English; the other languages mirror it under /nl, /fr, /de and so
 * on. Dutch and French are in the components; the rest in ./locales.
 */
export type SiteLocale = string

/** The language to show the data's own names in: French on the French pages, Dutch everywhere else */
export type DataLang = 'nl' | 'fr'

/** The page's locale, the prefix for links into its pages, and the language for data names */
export function useLocale() {
    const { localeIndex } = useData()
    const locale = computed<SiteLocale>(() => localeIndex.value || 'root')
    const prefix = computed(() => (locale.value === 'root' ? '' : `/${locale.value}`))
    const dataLang = computed<DataLang>(() => (locale.value === 'fr' ? 'fr' : 'nl'))
    return { locale, prefix, dataLang }
}

/**
 * The component's strings in the page's language. English (`root`) is complete; a translation
 * may leave a key out and gets the English string for it. Dutch and French come with the
 * component, the other languages from their file in ./locales.
 */
export function useStrings<T extends Record<string, string>>(
    name: ComponentName,
    dict: { root: T; nl?: Partial<T>; fr?: Partial<T> },
) {
    const { locale } = useLocale()
    return computed(() => {
        const l = locale.value
        const translated = l === 'nl' || l === 'fr' ? dict[l] : extraLocales[l]?.components[name]
        return { ...dict.root, ...translated } as T
    })
}

/** The page's language as a BCP 47 tag, for numbers and dates: 'nl-BE', 'de-BE', 'zh-CN' */
export function usePageLang() {
    const { lang } = useData()
    return lang
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
