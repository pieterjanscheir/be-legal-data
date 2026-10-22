import { getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { searchEntries } from '@/lib/data'

// Written once per language at build time as a static file; the search box loads its language's
export const dynamic = 'force-static'
export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }))

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params
    const t = await getTranslations({ locale, namespace: 'search' })
    const types = await getTranslations({ locale, namespace: 'courtType' })
    return Response.json(
        searchEntries({
            postalCode: t('postalCode'),
            municipality: t('municipality'),
            canton: t('canton'),
            cantonName: (name) => t('cantonName', { name }),
            courtType: (type) => types(type),
        }),
    )
}
