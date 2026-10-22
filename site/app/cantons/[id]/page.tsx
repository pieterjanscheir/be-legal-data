import type { Metadata } from 'next'
import Link from 'next/link'
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
    params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const c = getCanton((await params).id)
    return { title: c ? `Canton ${cantonName(c)}` : 'Canton' }
}

export default async function CantonPage({ params }: Props) {
    const { id } = await params
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
                <Link href="/cantons/">Cantons</Link> / {id}
            </p>
            <h1>Canton {cantonName(canton)}</h1>
            <div className="detail">
                <div>
                    <dl className="facts">
                        <div>
                            <dt>Seat</dt>
                            <dd>
                                <Name value={canton.seat} />
                            </dd>
                        </div>
                        <div>
                            <dt>Arrondissement</dt>
                            <dd>
                                <Name value={arrondissement.name} />
                            </dd>
                        </div>
                        <div>
                            <dt>Judicial area</dt>
                            <dd>
                                <Name value={area.name} />
                            </dd>
                        </div>
                        <div>
                            <dt>Municipalities</dt>
                            <dd>
                                {canton.municipalities.map((m, i) => {
                                    return (
                                        <span key={m.municipality}>
                                            {i > 0 && ', '}
                                            <Link href={`/municipalities/${m.municipality}/`}>
                                                {bilingual(getMunicipality(m.municipality).name)}
                                            </Link>
                                            {m.partial && <span className="muted"> (part)</span>}
                                        </span>
                                    )
                                })}
                            </dd>
                        </div>
                        <div>
                            <dt>Legal basis</dt>
                            <dd>
                                <a href={canton.legalBasis.url}>Judicial Code</a>,{' '}
                                {canton.legalBasis.provision}
                            </dd>
                        </div>
                    </dl>
                </div>
                <CantonMap
                    only={sameArrondissement}
                    highlight={[id]}
                    label={`The cantons of the arrondissement, with ${canton.name.nl} highlighted`}
                />
            </div>
            <section className="block">
                <h2>Area, as the law describes it</h2>
                <div className="two">
                    <blockquote lang="nl">{canton.territory.nl}</blockquote>
                    <blockquote lang="fr">{canton.territory.fr}</blockquote>
                </div>
            </section>
            <section className="block">
                <h2>Courts that cover this canton</h2>
                {justice && (
                    <p className="muted">
                        Its own justice of the peace first, then the courts whose area holds it.
                    </p>
                )}
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
