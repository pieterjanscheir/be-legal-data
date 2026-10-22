import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import {
    formatCourtName,
    getArrondissement,
    getCanton,
    getCourt,
    getDivisions,
    getJudicialArea,
    type Court,
} from 'belgica'
import { CantonMap } from '@/components/CantonMap'
import { Code } from '@/components/Code'
import { AddressLines, Contacts } from '@/components/Contacts'
import { CourtCard } from '@/components/CourtCard'
import { Name } from '@/components/Name'
import { cantonName, courtName, currentCantons, currentCourts } from '@/lib/data'
import { formatDay, locales } from '@/lib/labels'

export const dynamicParams = false
export const generateStaticParams = () => currentCourts.map((c) => ({ id: c.id }))

interface Props {
    params: Promise<{ locale: string; id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const c = getCourt((await params).id)
    return { title: c ? formatCourtName(c, 'nl') : (await params).id }
}

/** The cantons a court covers: its own for a justice of the peace, else its list */
const coveredCantons = (court: Court): string[] =>
    court.canton ? [court.canton] : [...(court.cantons ?? [])]

export default async function CourtPage({ params }: Props) {
    const { locale, id } = await params
    setRequestLocale(locale)
    const t = await getTranslations('court')
    const nav = await getTranslations('nav')
    const types = await getTranslations('courtType')
    const kinds = await getTranslations('kind')
    const court = getCourt(id)
    if (!court) return null
    const parent = court.court ? getCourt(court.court) : undefined
    const divisions = getDivisions(id)
    const arrondissement =
        court.arrondissement ? getArrondissement(court.arrondissement) : undefined
    const area = getJudicialArea(court.judicialArea)
    const covered = coveredCantons(parent ?? court)
    const published = locales.filter((l) => court.name[l] !== undefined)
    const isCantonCourt = court.type === 'justice-of-the-peace' && court.kind === 'court'
    return (
        <>
            <p className="crumbs">
                <Link href="/courts/">{nav('courts')}</Link> / {types(court.type)}
                {court.kind !== 'court' && ` · ${kinds(court.kind)}`}
            </p>
            <h1>
                <Name value={courtName(court)} />
            </h1>
            {parent && (
                <p className="lede">
                    {t.rich('kindOf', {
                        kind: kinds(court.kind),
                        name: '',
                        link: () => (
                            <Link href={`/courts/${parent.id}/`}>
                                <Name value={courtName(parent)} />
                            </Link>
                        ),
                    })}
                </p>
            )}
            <div className="detail">
                <div>
                    <dl className="facts">
                        <div>
                            <dt>{t('publishedNames', { count: published.length })}</dt>
                            <dd>
                                {published.map((l) => (
                                    <span key={l} className="block-line" lang={l}>
                                        <span className="pill">{l.toUpperCase()}</span>{' '}
                                        {court.name[l]}
                                    </span>
                                ))}
                            </dd>
                        </div>
                        {isCantonCourt && (
                            <div>
                                <dt>{t('cantonLabel')}</dt>
                                <dd>
                                    {locales.map((l) => (
                                        <span key={l} className="block-line" lang={l}>
                                            <span className="pill">{l.toUpperCase()}</span>{' '}
                                            {formatCourtName(court, l, { style: 'canton' })}
                                        </span>
                                    ))}
                                </dd>
                            </div>
                        )}
                        {court.address && (
                            <div>
                                <dt>{t('registry')}</dt>
                                <dd>
                                    <AddressLines address={court.address} />
                                </dd>
                            </div>
                        )}
                        <div>
                            <dt>{t('area')}</dt>
                            <dd>
                                {arrondissement && (
                                    <>
                                        <Name value={arrondissement.name} /> ·{' '}
                                    </>
                                )}
                                <Name value={area.name} />
                            </dd>
                        </div>
                        {court.ecli && (
                            <div>
                                <dt>{t('ecli')}</dt>
                                <dd className="mono">
                                    {court.ecli.map((c) => `ECLI:BE:${c}`).join(', ')}
                                </dd>
                            </div>
                        )}
                        {court.openingHours && (
                            <div>
                                <dt>{t('openingHours')}</dt>
                                <dd className="mono">{court.openingHours}</dd>
                            </div>
                        )}
                    </dl>
                    <h2>{t('contacts')}</h2>
                    <Contacts contacts={court.contacts} />
                </div>
                {covered.length > 0 && (
                    <div>
                        <CantonMap
                            {...(arrondissement && {
                                only: currentCantons
                                    .filter((c) => c.arrondissement === arrondissement.id)
                                    .map((c) => c.id),
                            })}
                            highlight={covered}
                            label={t('mapLabel', { count: covered.length })}
                        />
                        <p className="muted small center">
                            {covered.length === 1 ?
                                t.rich('coversOne', {
                                    name: cantonName(
                                        getCanton(covered[0] ?? '') ?? { name: { nl: '', fr: '' } },
                                    ),
                                    link: (c) => <Link href={`/cantons/${covered[0]}/`}>{c}</Link>,
                                })
                            :   t('coversMany', { count: covered.length })}
                        </p>
                    </div>
                )}
            </div>

            {court.openingHoursText && (
                <section className="block">
                    <h2>{t('hoursPublished')}</h2>
                    {locales
                        .filter((l) => court.openingHoursText?.[l])
                        .map((l) => (
                            <p key={l} lang={l} className="prose">
                                {court.openingHoursText?.[l]}
                            </p>
                        ))}
                </section>
            )}

            {divisions.length > 0 && (
                <section className="block">
                    <h2>
                        {court.type === 'justice-of-the-peace' ? t('seats') : t('divisions')}{' '}
                        <span className="muted small">{divisions.length}</span>
                    </h2>
                    <div className="cards">
                        {divisions.map((d) => (
                            <CourtCard key={d.id} court={d} />
                        ))}
                    </div>
                </section>
            )}

            <section className="block">
                <h2>{t('sources')}</h2>
                <ul className="sources">
                    {court.sources.map((s) => (
                        <li key={s.url}>
                            <a href={s.url}>{s.url.replace(/^https:\/\/(www\.)?/, '')}</a>{' '}
                            <span className="muted">
                                {t('checked', { date: formatDay(s.retrieved, locale) })}
                            </span>
                        </li>
                    ))}
                </ul>
                <Code>{`
import { getCourt, formatCourtName, getDivisions } from 'belgica'

const court = getCourt('${id}')
formatCourtName(court, 'fr')${isCantonCourt ? `\nformatCourtName(court, 'de', { style: 'canton' }) // '${formatCourtName(court, 'de', { style: 'canton' })}'` : ''}
getDivisions('${id}').length // ${divisions.length}`}</Code>
            </section>
        </>
    )
}
