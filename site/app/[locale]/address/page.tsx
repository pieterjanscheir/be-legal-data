import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { AddressLookup } from '@/components/AddressLookup'
import { Code } from '@/components/Code'
import { ClientMessages } from '@/lib/client-messages'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'address' })
    return { title: t('title') }
}

export default async function Address({ params }: Props) {
    setRequestLocale((await params).locale)
    const t = await getTranslations('address')
    return (
        <>
            <h1>{t('title')}</h1>
            <p className="lede">{t('lede')}</p>
            <ClientMessages namespaces={['address', 'courtType']}>
                <AddressLookup />
            </ClientMessages>
            <Code>{`
import { findCantonsAt } from 'belgica/canton-boundaries'
import { getCourtsForCanton } from 'belgica'

// The point from the address register: Kerkstraat 10, 2060 Antwerpen
const [canton] = findCantonsAt(4.429126, 51.217827) // antwerpen-4
getCourtsForCanton(canton.id).map((c) => c.id)`}</Code>
            <section className="block">
                <h2>{t('howTitle')}</h2>
                <p className="muted prose">{t('how')}</p>
                <p className="muted small">{t('disclaimer')}</p>
            </section>
        </>
    )
}
