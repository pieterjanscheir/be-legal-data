import type { Metadata } from 'next'
import { housesOfJustice, prisons, type HouseOfJustice, type Prison } from 'belgica'
import { Code } from '@/components/Code'
import { AddressLines, Contacts } from '@/components/Contacts'
import { Name } from '@/components/Name'

export const metadata: Metadata = { title: 'Prisons and houses of justice' }

const communityLabel = {
    flemish: 'Flemish Community',
    french: 'French Community',
    german: 'German-speaking Community',
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

export default function Places() {
    const sorted = <T extends { id: string }>(list: readonly T[]) =>
        [...list].sort((a, b) => a.id.localeCompare(b.id))
    return (
        <>
            <h1>Prisons and houses of justice</h1>
            <p className="lede">
                The {prisons.length} prisons and detention houses of the FPS Justice, and the{' '}
                {housesOfJustice.length} houses of justice the Communities run.
            </p>
            <Code>{`
import { prisons } from 'belgica/prisons'
import { housesOfJustice } from 'belgica/houses-of-justice'

prisons.filter((p) => p.kind === 'detention-house').length // ${prisons.filter((p) => p.kind === 'detention-house').length}`}</Code>
            <section className="block">
                <h2>
                    Prisons <span className="muted small">{prisons.length}</span>
                </h2>
                <div className="places">
                    {sorted(prisons).map((p) => (
                        <Place
                            key={p.id}
                            place={p}
                            meta={p.kind === 'prison' ? 'Prison' : 'Detention house'}
                        />
                    ))}
                </div>
            </section>
            <section className="block">
                <h2>
                    Houses of justice <span className="muted small">{housesOfJustice.length}</span>
                </h2>
                <div className="places">
                    {sorted(housesOfJustice).map((h) => (
                        <Place key={h.id} place={h} meta={communityLabel[h.community]} />
                    ))}
                </div>
            </section>
        </>
    )
}
