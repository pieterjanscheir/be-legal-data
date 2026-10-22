import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { housesOfJustice, prisons, type HouseOfJustice, type Prison } from 'belgica'
import { Code } from '@/components/Code'
import { AddressLines, Contacts } from '@/components/Contacts'
import { Name } from '@/components/Name'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'places' })
    return { title: t('title') }
}

function Place({ place, meta }: { place: Prison | HouseOfJustice; meta: string }) {
    const site = place.website.nl ?? place.website.fr ?? place.website.de
    return (
        <article className="place">
            <span className="card-type">{meta}</span>
            <h3>
                {site ?
                    <a href={site}>
                        <Name value={place.name} />
                    </a>
                :   <Name value={place.name} />}
            </h3>
            <AddressLines address={place.address} />
            <Contacts contacts={place.contacts} />
        </article>
    )
}

export default async function Places({ params }: Props) {
    setRequestLocale((await params).locale)
    const t = await getTranslations('places')
    const sorted = <T extends { id: string }>(list: readonly T[]) =>
        [...list].sort((a, b) => a.id.localeCompare(b.id))
    return (
        <>
            <h1>{t('title')}</h1>
            <p className="lede">
                {t('lede', { prisons: prisons.length, houses: housesOfJustice.length })}
            </p>
            <Code>{`
import { prisons } from 'belgica/prisons'
import { housesOfJustice } from 'belgica/houses-of-justice'

prisons.filter((p) => p.kind === 'detention-house').length // ${prisons.filter((p) => p.kind === 'detention-house').length}`}</Code>
            <section className="block">
                <h2>
                    {t('prisons')} <span className="muted small">{prisons.length}</span>
                </h2>
                <div className="places">
                    {sorted(prisons).map((p) => (
                        <Place
                            key={p.id}
                            place={p}
                            meta={p.kind === 'prison' ? t('prison') : t('detentionHouse')}
                        />
                    ))}
                </div>
            </section>
            <section className="block">
                <h2>
                    {t('housesOfJustice')}{' '}
                    <span className="muted small">{housesOfJustice.length}</span>
                </h2>
                <div className="places">
                    {sorted(housesOfJustice).map((h) => (
                        <Place key={h.id} place={h} meta={t(h.community)} />
                    ))}
                </div>
            </section>
        </>
    )
}
