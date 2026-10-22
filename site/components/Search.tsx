'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocale } from 'next-intl'
import { useRouter } from '@/i18n/navigation'
import { fetchJson } from '@/lib/fetch-json'

export interface Entry {
    /** What's shown and searched */
    label: string
    /** Searched too, not shown: the other languages' names */
    alt?: string
    kind: string
    href: string
}

const fold = (s: string) => s.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase()

/**
 * Finds a postal code, municipality, canton or court as you type, and opens its page. The index
 * is search-index.json, built from the package with the site.
 */
export function Search({ placeholder }: { placeholder: string }) {
    const router = useRouter()
    const locale = useLocale()
    const [entries, setEntries] = useState<Entry[]>([])
    const [query, setQuery] = useState('')
    const [active, setActive] = useState(0)
    useEffect(() => {
        fetchJson<Entry[]>(`/${locale}/search-index.json`).then(setEntries, () => {
            setEntries([])
        })
    }, [locale])
    const index = useMemo(
        () => entries.map((e) => ({ e, text: fold(`${e.label} ${e.alt ?? ''}`) })),
        [entries],
    )
    const results = useMemo(() => {
        const q = fold(query.trim())
        if (!q) return []
        const starts: Entry[] = []
        const contains: Entry[] = []
        for (const { e, text } of index) {
            if (text.startsWith(q) || text.includes(` ${q}`)) starts.push(e)
            else if (text.includes(q)) contains.push(e)
            if (starts.length >= 8) break
        }
        return [...starts, ...contains].slice(0, 8)
    }, [index, query])

    function open(entry: Entry | undefined) {
        if (entry) router.push(entry.href)
    }

    return (
        <div className="search">
            <input
                type="search"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="search-results"
                aria-activedescendant={results.length ? `result-${active}` : undefined}
                aria-label={placeholder}
                placeholder={placeholder}
                value={query}
                autoComplete="off"
                onChange={(e) => {
                    setQuery(e.target.value)
                    setActive(0)
                }}
                onKeyDown={(e) => {
                    if (e.key === 'ArrowDown') {
                        e.preventDefault()
                        setActive((a) => Math.min(a + 1, results.length - 1))
                    } else if (e.key === 'ArrowUp') {
                        e.preventDefault()
                        setActive((a) => Math.max(a - 1, 0))
                    } else if (e.key === 'Enter') {
                        e.preventDefault()
                        open(results[active])
                    }
                }}
            />
            {results.length > 0 && (
                <ul id="search-results" role="listbox">
                    {results.map((r, i) => (
                        <li
                            key={r.href}
                            id={`result-${i}`}
                            role="option"
                            aria-selected={i === active}
                            onPointerEnter={() => {
                                setActive(i)
                            }}
                            onPointerDown={(e) => {
                                e.preventDefault()
                                open(r)
                            }}
                        >
                            <span>{r.label}</span>
                            <span className="kind">{r.kind}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
