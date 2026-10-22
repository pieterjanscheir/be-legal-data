import type { Metadata } from 'next'
import { formatCourtName } from 'belgica'
import { Code } from '@/components/Code'
import { CourtList, type CourtRow } from '@/components/CourtList'
import { courtName, currentCourts } from '@/lib/data'
import { locales } from '@/lib/labels'

export const metadata: Metadata = { title: 'Courts' }

const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

export default function Courts() {
    const rows: CourtRow[] = currentCourts.map((c) => ({
        id: c.id,
        type: c.type,
        kind: c.kind,
        name: courtName(c),
        search: fold(
            [
                ...locales.map((l) => formatCourtName(c, l)),
                ...locales.map((l) => formatCourtName(c, l, { style: 'canton' })),
                c.address?.city ?? '',
                c.address?.postalCode ?? '',
            ].join(' '),
        ),
        city: c.address?.city ?? '',
    }))
    return (
        <>
            <h1>Courts</h1>
            <p className="lede">
                Every court, division and seat, as published on tribunaux-rechtbanken.be and rebuilt
                every week.
            </p>
            <Code>{`
import { findCourts } from 'belgica'

findCourts({ type: 'enterprise-court', kind: 'division' }).length // ${currentCourts.filter((c) => c.type === 'enterprise-court' && c.kind === 'division').length}`}</Code>
            <CourtList rows={rows} />
        </>
    )
}
