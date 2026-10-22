import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { interestRates } from 'belgica/interest-rates'
import { Code } from '@/components/Code'
import { InterestCalculator } from '@/components/InterestCalculator'
import { ClientMessages } from '@/lib/client-messages'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'interest' })
    return { title: t('title') }
}

export default async function Interest({ params }: Props) {
    setRequestLocale((await params).locale)
    const t = await getTranslations('interest')
    return (
        <>
            <h1>{t('title')}</h1>
            <p className="lede">{t.rich('lede', { code: (c) => <code>{c}</code> })}</p>
            <ClientMessages namespaces={['interest']}>
                <InterestCalculator />
            </ClientMessages>
            <Code>{`
import { getInterestRate, getLatestKnownRateDate, interestRates } from 'belgica/interest-rates'

getInterestRate('2014-06-01', 'commercial', { contractAfter20130316: true })
getLatestKnownRateDate('legal') // '${interestRates.legal.periods.at(-1)?.to ?? ''}'`}</Code>
            <section className="block">
                <h2>{t('sources')}</h2>
                <p className="muted">
                    {t('sourcesText', {
                        legal: interestRates.legal.source,
                        commercial: interestRates.commercial.source,
                    })}
                </p>
                <p className="muted small">{t('disclaimer')}</p>
            </section>
        </>
    )
}
