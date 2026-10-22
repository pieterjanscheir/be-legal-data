import { defineRouting } from 'next-intl/routing'

/** The docs' languages, in the docs' order. Every page exists in each, under /<locale>/. */
export const routing = defineRouting({
    locales: ['en', 'nl', 'fr', 'de', 'ar', 'es', 'it', 'ja', 'pl', 'pt', 'tr', 'uk', 'zh'],
    defaultLocale: 'en',
    // A static export has no middleware to add or strip a prefix, so every language has one
    localePrefix: 'always',
})

export type SiteLocale = (typeof routing.locales)[number]

/** Each language in its own name, for the switch */
export const localeNames: Record<SiteLocale, string> = {
    en: 'English',
    nl: 'Nederlands',
    fr: 'Français',
    de: 'Deutsch',
    ar: 'العربية',
    es: 'Español',
    it: 'Italiano',
    ja: '日本語',
    pl: 'Polski',
    pt: 'Português',
    tr: 'Türkçe',
    uk: 'Українська',
    zh: '中文',
}

/** The languages written right to left */
export const rtl: readonly SiteLocale[] = ['ar']
