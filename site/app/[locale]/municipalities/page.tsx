import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { getRegion, provinces } from 'belgica'
import { Code } from '@/components/Code'
import { Name } from '@/components/Name'
import { bilingual, currentMunicipalities } from '@/lib/data'

interface Props {
    params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const t = await getTranslations({ locale: (await params).locale, namespace: 'municipalities' })
    return { title: t('title') }
}

export default async function Municipalities({ params }: Props) {
    setRequestLocale((await params).locale)
    const t = await getTranslations('municipalities')
    // The ten provinces, then Brussels, which has none
    const groups = [
        ...provinces.map((p) => ({ id: p.id, name: p.name })),
        { id: '04000', name: getRegion('04000').name },
    ]
    return (
        <>
            <h1>{t('title')}</h1>
            <p className="lede">{t('lede', { count: currentMunicipalities.length })}</p>
            <Code>{`
import { municipalities, getProvinceForMunicipality, getCantonsForMunicipality } from 'belgica'

getProvinceForMunicipality('44021')?.name.nl // 'Provincie Oost-Vlaanderen'`}</Code>
            {groups.map((g) => {
                const list = currentMunicipalities
                    .filter((m) => m.province === g.id)
                    .sort((a, b) => a.name.nl.localeCompare(b.name.nl))
                return (
                    <section key={g.id} className="block">
                        <h2>
                            <Name value={g.name} />{' '}
                            <span className="muted small">{list.length}</span>
                        </h2>
                        <ul className="columns">
                            {list.map((m) => (
                                <li key={m.id}>
                                    <Link href={`/municipalities/${m.id}/`}>
                                        {bilingual(m.name)}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>
                )
            })}
        </>
    )
}
