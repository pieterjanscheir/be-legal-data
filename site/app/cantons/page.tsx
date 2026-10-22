import type { Metadata } from 'next'
import Link from 'next/link'
import { arrondissements } from 'belgica'
import { CantonMap } from '@/components/CantonMap'
import { Code } from '@/components/Code'
import { Name } from '@/components/Name'
import { cantonName, currentCantons } from '@/lib/data'

export const metadata: Metadata = { title: 'Judicial cantons' }

export default function Cantons() {
    return (
        <>
            <h1>Judicial cantons</h1>
            <p className="lede">
                The {currentCantons.length} areas of the justices of the peace, drawn from the
                National Geographic Institute&apos;s boundaries. Hover a canton to name it, click it
                to open it.
            </p>
            <CantonMap label="Map of the judicial cantons" />
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
