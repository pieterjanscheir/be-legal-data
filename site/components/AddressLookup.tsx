'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import type { CourtType } from 'belgica'
import { Link } from '@/i18n/navigation'
import { fetchJson } from '@/lib/fetch-json'
import {
    geocode,
    type AddressCandidate,
    type GeocodeResult,
    type GeocodeSource,
} from '@/lib/geocode'
import { contains, distanceToEdge, nearBox, type Polygons } from '@/lib/geometry'
import { courtTypes, type PerLocale } from '@/lib/labels'
import { Name } from './Name'

/** public/address/index.json, from scripts/build-address.ts */
interface Index {
    cantons: { canton: string; box: number[] }[]
    regions: Record<string, GeocodeSource | undefined>
}

/** public/address/<canton>.json */
interface CantonFile {
    canton: string
    name: string
    territory: PerLocale
    split: PerLocale[]
    courts: {
        id: string
        type: CourtType
        name: PerLocale
        address?: { street: string; postalCode: string; city: string }
    }[]
    geometry: Polygons
}

/** Within this distance of another canton, the boundary is too close to call from the map */
const NEAR_METRES = 25
/** About 50 m in degrees: the boxes of the cantons whose edge may be within NEAR_METRES */
const BOX_MARGIN = 0.0007

// One per region, each in a city split over several cantons
const EXAMPLES = [
    'Kerkstraat 10, 2060 Antwerpen',
    'Rue de la Loi 16, 1000 Bruxelles',
    'Place Saint-Lambert 18, 4000 Liège',
]

const REGISTERS: Record<GeocodeSource, string> = {
    flanders: 'Adressenregister (Digitaal Vlaanderen)',
    brussels: 'UrbIS (paradigm.brussels)',
    wallonia: 'ICAR (SPW)',
}

interface Placed {
    inside: CantonFile[]
    near: { canton: CantonFile; metres: number }[]
}

/** The cantons the point lies in, and those whose boundary comes within NEAR_METRES of it */
async function place(at: AddressCandidate, index: Index): Promise<Placed> {
    const { longitude: lon, latitude: lat } = at
    const files = await Promise.all(
        index.cantons
            .filter((c) => nearBox(c.box, lon, lat, BOX_MARGIN))
            .map((c) => fetchJson<CantonFile>(`/address/${c.canton}.json`)),
    )
    const inside = files.filter((f) => contains(f.geometry, lon, lat))
    const near = files
        .filter((f) => !inside.includes(f))
        .map((canton) => ({ canton, metres: distanceToEdge(canton.geometry, lon, lat) }))
        .filter((n) => n.metres <= NEAR_METRES)
        .sort((a, b) => a.metres - b.metres)
    return { inside, near }
}

/**
 * From a street address to its canton and courts: the region's own address register geocodes
 * it in the browser, and the point is looked up in the canton boundaries, fetched per canton
 * from public/address/.
 */
export function AddressLookup() {
    const t = useTranslations('address')
    const types = useTranslations('courtType')
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<GeocodeResult | null>(null)
    const [selected, setSelected] = useState(0)
    const [placed, setPlaced] = useState<Placed | null>(null)
    const [error, setError] = useState<string | null>(null)
    const controller = useRef<AbortController | null>(null)

    async function search(address: string) {
        setQuery(address)
        if (!address.trim()) return
        controller.current?.abort()
        // Only the latest search writes its results: an earlier one can finish after it starts
        const current = new AbortController()
        controller.current = current
        setLoading(true)
        setError(null)
        try {
            const index = await fetchJson<Index>('/address/index.json')
            const found = await geocode(address, index.regions, current.signal)
            if (controller.current !== current) return
            setResult(found)
            setSelected(0)
        } catch (e) {
            if ((e as Error).name === 'AbortError') return
            if (controller.current === current) setError(String(e))
        } finally {
            if (controller.current === current) setLoading(false)
        }
    }

    // The match shown, the first or another picked from the list: placed in the cantons
    const candidate = result?.candidates[selected]
    useEffect(() => {
        setPlaced(null)
        if (!candidate) return
        let stale = false
        fetchJson<Index>('/address/index.json')
            .then((index) => place(candidate, index))
            .then(
                (p) => {
                    if (!stale) setPlaced(p)
                },
                (e: unknown) => {
                    if (!stale) setError(String(e))
                },
            )
        return () => {
            stale = true
        }
    }, [candidate])

    function submit(e: FormEvent) {
        e.preventDefault()
        void search(query)
    }

    const inside = placed?.inside ?? []
    const courts = [
        ...new Map(inside.flatMap((c) => c.courts).map((court) => [court.id, court])).values(),
    ].sort((a, b) => courtTypes.indexOf(a.type) - courtTypes.indexOf(b.type))
    const split = inside[0]?.split[0]
    const legal = [...inside, ...(placed?.near.map((n) => n.canton) ?? [])]
    const showLegal = Boolean(split) || inside.length > 1 || (placed?.near.length ?? 0) > 0

    return (
        <div className="address">
            <form className="address-form" onSubmit={submit}>
                <label>
                    <span className="sr-only">{t('label')}</span>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                        placeholder={t('placeholder')}
                        autoComplete="street-address"
                        aria-label={t('label')}
                    />
                </label>
                <button type="submit" disabled={loading}>
                    {t('find')}
                </button>
            </form>
            <p className="examples">
                {t('try')}{' '}
                {EXAMPLES.map((example, i) => (
                    <span key={example}>
                        {i > 0 && ' · '}
                        <a
                            href="#"
                            onClick={(e) => {
                                e.preventDefault()
                                void search(example)
                            }}
                        >
                            {example}
                        </a>
                    </span>
                ))}
            </p>

            <div aria-live="polite">
                {loading && <p className="muted">{t('searching')}</p>}
                {error && <p className="warn">{error}</p>}
                {!loading &&
                    result?.failed.map((f) => (
                        <p key={f.source} className="warn">
                            {t('failed', { source: REGISTERS[f.source], error: f.error })}
                        </p>
                    ))}

                {!loading && result && !candidate && <p className="muted">{t('none')}</p>}
                {!loading && candidate && (
                    <section className="block address-result">
                        {result && result.candidates.length > 1 && (
                            <label className="address-match">
                                {t('match')}{' '}
                                <select
                                    value={selected}
                                    onChange={(e) => {
                                        setSelected(Number(e.target.value))
                                    }}
                                >
                                    {result.candidates.map((c, i) => (
                                        <option key={`${c.label}${i}`} value={i}>
                                            {c.label}
                                        </option>
                                    ))}
                                </select>
                            </label>
                        )}
                        <p>
                            <strong>{candidate.label}</strong>{' '}
                            <span className="muted small" dir="ltr">
                                {candidate.latitude.toFixed(6)}, {candidate.longitude.toFixed(6)}
                            </span>{' '}
                            ·{' '}
                            <a
                                className="small"
                                href={`https://www.openstreetmap.org/?mlat=${candidate.latitude}&mlon=${candidate.longitude}#map=19/${candidate.latitude}/${candidate.longitude}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t('map')}
                            </a>
                        </p>
                        {!candidate.precise && <p className="note">{t('streetOnly')}</p>}

                        {placed && !inside.length && <p className="warn">{t('outside')}</p>}
                        {inside.length > 0 && (
                            <>
                                <h2>
                                    {t('canton')}{' '}
                                    {inside.map((c, i) => (
                                        <span key={c.canton}>
                                            {i > 0 && ' / '}
                                            <Link href={`/cantons/${c.canton}/`}>{c.name}</Link>
                                        </span>
                                    ))}
                                </h2>
                                {inside.length > 1 && (
                                    <p className="note">
                                        {t('onLine', {
                                            cantons: inside.map((c) => c.name).join(' / '),
                                        })}
                                    </p>
                                )}
                                {placed?.near[0] && (
                                    <p className="note">
                                        {t('near', {
                                            metres: Math.round(placed.near[0].metres),
                                            other: placed.near[0].canton.name,
                                        })}
                                    </p>
                                )}
                                {split && (
                                    <p className="muted">
                                        {t.rich('split', { name: () => <Name value={split} /> })}
                                    </p>
                                )}

                                <h3>{t('courts')}</h3>
                                <div className="cards">
                                    {courts.map((court) => (
                                        <Link
                                            key={court.id}
                                            href={`/courts/${court.id}/`}
                                            className="card"
                                        >
                                            <span className="card-type">{types(court.type)}</span>
                                            <strong>
                                                <Name value={court.name} />
                                            </strong>
                                            {court.address && (
                                                <span className="muted">
                                                    {court.address.street},{' '}
                                                    {court.address.postalCode} {court.address.city}
                                                </span>
                                            )}
                                        </Link>
                                    ))}
                                </div>

                                {showLegal && (
                                    <details className="territory">
                                        <summary>{t('legalText')}</summary>
                                        {legal.map((c) => (
                                            <div key={c.canton}>
                                                <h4>
                                                    <Link href={`/cantons/${c.canton}/`}>
                                                        {c.name}
                                                    </Link>
                                                </h4>
                                                <p>
                                                    <Name value={c.territory} />
                                                </p>
                                            </div>
                                        ))}
                                    </details>
                                )}
                            </>
                        )}
                        <p className="muted small">
                            {t('source', { register: REGISTERS[candidate.source] })}
                        </p>
                    </section>
                )}
            </div>
        </div>
    )
}
