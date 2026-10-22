'use client'

import { useMemo, useState } from 'react'
import { useTranslations } from 'next-intl'
import type { Court, CourtType } from 'belgica'
import { Link } from '@/i18n/navigation'
import { courtTypes, type PerLocale } from '@/lib/labels'
import { Name } from './Name'

export interface CourtRow {
    id: string
    type: CourtType
    kind: Court['kind']
    name: PerLocale
    /** Every name, folded, for the text filter */
    search: string
    city: string
}

const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

/** Every court, division and seat, filtered by type and by name or city */
export function CourtList({ rows }: { rows: CourtRow[] }) {
    const t = useTranslations('courts')
    const types = useTranslations('courtType')
    const kinds = useTranslations('kind')
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
                    placeholder={t('filterPlaceholder')}
                    aria-label={t('filterLabel')}
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value)
                    }}
                />
                <select
                    aria-label={t('typeLabel')}
                    value={type}
                    onChange={(e) => {
                        setType(e.target.value as CourtType | '')
                    }}
                >
                    <option value="">{t('everyType')}</option>
                    {courtTypes.map((type) => (
                        <option key={type} value={type}>
                            {types(type)}
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
                    {t('divisions')}
                </label>
                <span className="muted count" aria-live="polite">
                    {t('count', { shown: shown.length, total: rows.length })}
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
                                    <span className="pill">{kinds(r.kind)}</span>
                                )}
                                {types(r.type)}
                                {r.city && ` · ${r.city}`}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </>
    )
}
