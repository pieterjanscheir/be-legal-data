import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { formatCourtName } from 'belgica'
import { Code } from '@/components/Code'
import { CourtList, type CourtRow } from '@/components/CourtList'
import { ClientMessages } from '@/lib/client-messages'
import { courtName, currentCourts } from '@/lib/data'
import { locales } from '@/lib/labels'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'courts' })
    return { title: t('title') }
}

const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export default async function Courts({ params }: Props) {
    setRequestLocale((await params).locale)
    const t = await getTranslations('courts')
    const rows: CourtRow[] = currentCourts.map((c) => ({
        id: c.id,
        type: c.type,
        kind: c.kind,
        name: courtName(c),
        search: fold(
            [
                ...locales.map((l) => formatCourtName(c, l)),
                ...locales.map((l) => formatCourtName(c, l, { style: 'canton' })),
                c.address?.city ?? '',
                c.address?.postalCode ?? '',
            ].join(' '),
        ),
        city: c.address?.city ?? '',
    }))
    return (
        <>
            <h1>{t('title')}</h1>
            <p className="lede">{t('lede')}</p>
            <Code>{`
import { findCourts } from 'belgica'

findCourts({ type: 'enterprise-court', kind: 'division' }).length // ${currentCourts.filter((c) => c.type === 'enterprise-court' && c.kind === 'division').length}`}</Code>
            <ClientMessages namespaces={['courts', 'courtType', 'kind']}>
                <CourtList rows={rows} />
            </ClientMessages>
        </>
    )
}
