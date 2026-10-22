import type { Metadata } from 'next'
import Link from 'next/link'
import { getRegion, provinces } from 'belgica'
import { Code } from '@/components/Code'
import { Name } from '@/components/Name'
import { bilingual, currentMunicipalities } from '@/lib/data'

export const metadata: Metadata = { title: 'Municipalities' }

export default function Municipalities() {
    // The ten provinces, then Brussels, which has none
    const groups = [
        ...provinces.map((p) => ({ id: p.id, name: p.name })),
        { id: '04000', name: getRegion('04000').name },
    ]
    return (
        <>
            <h1>Municipalities</h1>
            <p className="lede">
                The {currentMunicipalities.length} municipalities by province, with their REFNIS
                code. Each page lists its postal codes, cantons and competent courts.
            </p>
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
