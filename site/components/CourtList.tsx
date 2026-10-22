'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { CourtType } from 'belgica'
import { courtTypeLabel, courtTypes, kindLabel, type PerLocale } from '@/lib/labels'
import { Name } from './Name'

export interface CourtRow {
    id: string
    type: CourtType
    kind: keyof typeof kindLabel
    name: PerLocale
    /** Every name, folded, for the text filter */
    search: string
    city: string
}

const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

/** Every court, division and seat, filtered by type and by name or city */
export function CourtList({ rows }: { rows: CourtRow[] }) {
    const [type, setType] = useState<CourtType | ''>('')
    const [query, setQuery] = useState('')
    const [divisions, setDivisions] = useState(true)
    const shown = useMemo(() => {
        const q = fold(query.trim())
        return rows.filter(
            (r) =>
                (!type || r.type === type) &&
                (divisions || r.kind === 'court') &&
                (!q || r.search.includes(q)),
        )
    }, [rows, type, query, divisions])

    return (
        <>
            <div className="filters">
                <input
                    type="search"
                    placeholder="Name or city"
                    aria-label="Filter by name or city"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}
                />
                <select
                    aria-label="Court type"
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value as CourtType | '')
                    }}
                >
                    <option value="">Every type</option>
                    {courtTypes.map((t) => (
                        <option key={t} value={t}>
                            {courtTypeLabel[t]}
                        </option>
                    ))}
                </select>
                <label className="check">
                    <input
                        type="checkbox"
                        checked={divisions}
                        onChange={(e) => {
                            setDivisions(e.target.checked)
                        }}
                    />
                    Divisions and seats
                </label>
                <span className="muted count" aria-live="polite">
                    {shown.length} of {rows.length}
                </span>
            </div>
            <ul className="rows">
                {shown.map((r) => (
                    <li key={r.id}>
                        <Link href={`/courts/${r.id}/`}>
                            <span className="row-main">
                                <Name value={r.name} />
                            </span>
                            <span className="row-meta">
                                {r.kind !== 'court' && (
                                    <span className="pill">{kindLabel[r.kind]}</span>
                                )}
                                {courtTypeLabel[r.type]}
                                {r.city && ` · ${r.city}`}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
