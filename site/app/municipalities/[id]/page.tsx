import type { Metadata } from 'next'
import Link from 'next/link'
import {
    getArrondissementForMunicipality,
    getCantonsForMunicipality,
    getMunicipality,
    getPostalCodes,
    getProvinceForMunicipality,
    getRegionForMunicipality,
} from 'belgica'
import { CantonMap } from '@/components/CantonMap'
import { Code } from '@/components/Code'
import { Competence } from '@/components/Competence'
import { Name } from '@/components/Name'
import { bilingual, currentCantons, currentMunicipalities } from '@/lib/data'

export const dynamicParams = false
export const generateStaticParams = () => currentMunicipalities.map((m) => ({ id: m.id }))

interface Props {
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const m = getMunicipality((await params).id)
    return { title: m ? bilingual(m.name) : 'Municipality' }
}

export default async function MunicipalityPage({ params }: Props) {
    const { id } = await params
    const m = getMunicipality(id)
    if (!m) return null
    const region = getRegionForMunicipality(id)
    const province = getProvinceForMunicipality(id)
    const arrondissement = getArrondissementForMunicipality(id)
    const cantonIds = getCantonsForMunicipality(id).map((c) => c.id)
    const nearby = currentCantons
        .filter((c) => c.arrondissement === arrondissement?.id)
        .map((c) => c.id)
    return (
        <>
            <p className="crumbs">
                <Link href="/municipalities/">Municipalities</Link> / {m.id}
            </p>
            <h1>{bilingual(m.name)}</h1>
            <div className="detail">
                <div>
                    <dl className="facts">
                        <div>
                            <dt>REFNIS code</dt>
                            <dd className="mono">{m.id}</dd>
                        </div>
                        {region && (
                            <div>
                                <dt>Region</dt>
                                <dd>
                                    <Name value={region.name} />
                                </dd>
                            </div>
                        )}
                        {province && (
                            <div>
                                <dt>Province</dt>
                                <dd>
                                    <Name value={province.name} />
                                </dd>
                            </div>
                        )}
                        {arrondissement && (
                            <div>
                                <dt>Judicial arrondissement</dt>
                                <dd>
                                    <Name value={arrondissement.name} />
                                </dd>
                            </div>
                        )}
                        <div>
                            <dt>Postal codes</dt>
                            <dd>
                                {getPostalCodes(id).map((p, i) => (
                                    <span key={p.id}>
                                        {i > 0 && ', '}
                                        <Link href={`/postal-codes/${p.postalCode}/`}>
                                            {p.postalCode}
                                        </Link>
                                    </span>
                                ))}
                            </dd>
                        </div>
                    </dl>
                    <Code>{`
import { getCantonsForMunicipality, findJusticesOfThePeace } from 'belgica'

getCantonsForMunicipality('${id}').map((c) => c.id)
// → ${JSON.stringify(cantonIds).replaceAll('"', "'").replaceAll(',', ', ')}`}</Code>
                </div>
                <CantonMap
                    only={nearby}
                    highlight={cantonIds}
                    label={`Cantons of ${arrondissement?.name.nl ?? ''}, with those of ${m.name.nl} highlighted`}
                />
            </div>
            <section className="block">
                <h2>Competent courts</h2>
                <Competence municipality={id} />
            </section>
        </>
    )
}
