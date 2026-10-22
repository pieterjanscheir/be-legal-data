import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { findCourtsForPostalCode, getPostalCodes } from 'belgica'
import { Code } from '@/components/Code'
import { Jurisdiction } from '@/components/Jurisdiction'
import { Link } from '@/i18n/navigation'
import { bilingual, postalCodeList } from '@/lib/data'

export const dynamicParams = false
export const generateStaticParams = () => postalCodeList.map((code) => ({ code }))

interface Props {
    params: Promise<{ locale: string; code: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, code } = await params
    const t = await getTranslations({ locale, namespace: 'postalCode' })
    const names = findCourtsForPostalCode(code, 'police-court').map((e) => e.municipality.name.nl)
    return { title: t('title', { code, names: names.join(', ') }) }
}

export default async function PostalCodePage({ params }: Props) {
    const { locale, code } = await params
    setRequestLocale(locale)
    const t = await getTranslations('postalCode')
    const entries = findCourtsForPostalCode(code, 'police-court')
    return (
        <>
            <p className="crumbs">
                <Link href="/">{t('crumbSearch')}</Link> / {t('crumb')}
            </p>
            <h1>
                {code}{' '}
                <span className="muted">
                    {entries.map((e) => bilingual(e.municipality.name)).join(' · ')}
                </span>
            </h1>
            {entries.length > 1 && (
                <p className="note">{t('shared', { code, count: entries.length })}</p>
            )}
            {entries.map(({ municipality }) => (
                <section key={municipality.id} className="block">
                    <h2>
                        <Link href={`/municipalities/${municipality.id}/`}>
                            {bilingual(municipality.name)}
                        </Link>{' '}
                        <span className="muted small">
                            {t('refnis', {
                                id: municipality.id,
                                codes: getPostalCodes(municipality.id)
                                    .map((p) => p.postalCode)
                                    .join(', '),
                            })}
                        </span>
                    </h2>
                    <Jurisdiction municipality={municipality.id} />
                </section>
            ))}
            <Code>{`
import { findCourtsForPostalCode } from 'belgica'

const [${entries.length > 1 ? 'first, second' : 'entry'}] = findCourtsForPostalCode('${code}', 'police-court')
${entries.length > 1 ? 'first' : 'entry'}.justicesOfThePeace // ${entries[0]?.justicesOfThePeace.length} canton(s)`}</Code>
        </>
    )
}
