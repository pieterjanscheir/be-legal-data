import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
    getArrondissement,
    getCanton,
    getCourtsForCanton,
    getJudicialArea,
    getMunicipality,
} from 'belgica'
import { CantonMap } from '@/components/CantonMap'
import { Code } from '@/components/Code'
import { CourtCard } from '@/components/CourtCard'
import { Name } from '@/components/Name'
import { bilingual, cantonName, currentCantons } from '@/lib/data'

export const dynamicParams = false
export const generateStaticParams = () => currentCantons.map((c) => ({ id: c.id }))

interface Props {
    params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale, id } = await params
    const t = await getTranslations({ locale, namespace: 'canton' })
    const c = getCanton(id)
    return { title: t('title', { name: c ? cantonName(c) : id }) }
}

export default async function CantonPage({ params }: Props) {
    const { locale, id } = await params
    setRequestLocale(locale)
    const t = await getTranslations('canton')
    const nav = await getTranslations('nav')
    const canton = getCanton(id)
    if (!canton) return null
    const arrondissement = getArrondissement(canton.arrondissement)
    const area = getJudicialArea(arrondissement.judicialArea)
    const courts = getCourtsForCanton(id)
    const justice = courts.find((c) => c.type === 'justice-of-the-peace')
    const sameArrondissement = currentCantons
        .filter((c) => c.arrondissement === canton.arrondissement)
        .map((c) => c.id)
    return (
        <>
            <p className="crumbs">
                <Link href="/cantons/">{nav('cantons')}</Link> / {id}
            </p>
            <h1>{t('title', { name: cantonName(canton) })}</h1>
            <div className="detail">
                <div>
                    <dl className="facts">
                        <div>
                            <dt>{t('seat')}</dt>
                            <dd>
                                <Name value={canton.seat} />
                            </dd>
                        </div>
                        <div>
                            <dt>{t('arrondissement')}</dt>
                            <dd>
                                <Name value={arrondissement.name} />
                            </dd>
                        </div>
                        <div>
                            <dt>{t('judicialArea')}</dt>
                            <dd>
                                <Name value={area.name} />
                            </dd>
                        </div>
                        <div>
                            <dt>{t('municipalities')}</dt>
                            <dd>
                                {canton.municipalities.map((m, i) => {
                                    return (
                                        <span key={m.municipality}>
                                            {i > 0 && ', '}
                                            <Link href={`/municipalities/${m.municipality}/`}>
                                                {bilingual(getMunicipality(m.municipality).name)}
                                            </Link>
                                            {m.partial && (
                                                <span className="muted"> {t('part')}</span>
                                            )}
                                        </span>
                                    )
                                })}
                            </dd>
                        </div>
                        <div>
                            <dt>{t('legalBasis')}</dt>
                            <dd>
                                <a href={canton.legalBasis.url}>{t('judicialCode')}</a>,{' '}
                                {canton.legalBasis.provision}
                            </dd>
                        </div>
                    </dl>
                </div>
                <CantonMap
                    only={sameArrondissement}
                    highlight={[id]}
                    label={t('mapLabel', { name: canton.name.nl })}
                />
            </div>
            <section className="block">
                <h2>{t('area')}</h2>
                <div className="two">
                    <blockquote lang="nl">{canton.territory.nl}</blockquote>
                    <blockquote lang="fr">{canton.territory.fr}</blockquote>
                </div>
            </section>
            <section className="block">
                <h2>{t('courts')}</h2>
                {justice && <p className="muted">{t('courtsNote')}</p>}
                <div className="cards">
                    {courts.map((c) => (
                        <CourtCard key={c.id} court={c} />
                    ))}
                </div>
                <Code>{`
import { getCourtsForCanton, getJusticeOfThePeace } from 'belgica'

getJusticeOfThePeace('${id}')?.id // '${justice?.id ?? ''}'
getCourtsForCanton('${id}').length // ${courts.length}`}</Code>
            </section>
        </>
    )
}
