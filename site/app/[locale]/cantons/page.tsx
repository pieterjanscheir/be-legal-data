import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { arrondissements } from 'belgica'
import { CantonMap } from '@/components/CantonMap'
import { Code } from '@/components/Code'
import { Name } from '@/components/Name'
import { cantonName, currentCantons } from '@/lib/data'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'cantons' })
    return { title: t('title') }
}

export default async function Cantons({ params }: Props) {
    setRequestLocale((await params).locale)
    const t = await getTranslations('cantons')
    return (
        <>
            <h1>{t('title')}</h1>
            <p className="lede">{t('lede', { count: currentCantons.length })}</p>
            <CantonMap label={t('mapLabel')} />
            <Code>{`
import { cantonBoundaries, findCantonsAt } from 'belgica/canton-boundaries'

// The canton of a point, for a city split over several
findCantonsAt(4.3517, 50.8466).map((c) => c.id) // Brussels, Grand-Place`}</Code>
            {arrondissements.map((a) => {
                const list = currentCantons
                    .filter((c) => c.arrondissement === a.id)
                    .sort((x, y) => x.id.localeCompare(y.id))
                return (
                    <section key={a.id} className="block">
                        <h2>
                            <Name value={a.name} />{' '}
                            <span className="muted small">{list.length}</span>
                        </h2>
                        <ul className="columns">
                            {list.map((c) => (
                                <li key={c.id}>
                                    <Link href={`/cantons/${c.id}/`}>{cantonName(c)}</Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )
            })}
        </>
    )
}
