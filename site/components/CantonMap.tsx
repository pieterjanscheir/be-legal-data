'use client'

import { useEffect, useState, type PointerEvent } from 'react'
import Link from 'next/link'
import { fetchJson } from '@/lib/fetch-json'

interface MapData {
    viewBox: [number, number, number, number]
    cantons: { canton: string; name: string; court: string; d: string }[]
}

interface Props {
    /** Draw only these cantons (and zoom to them); all by default */
    only?: readonly string[]
    /** Cantons to highlight */
    highlight?: readonly string[]
    label: string
}

function bounds(paths: readonly string[]): [number, number, number, number] {
    let [minX, minY, maxX, maxY] = [Infinity, Infinity, -Infinity, -Infinity]
    for (const d of paths) {
        for (const pair of d.split(/[MLZ]/)) {
            if (!pair) continue
            const [x, y] = pair.split(' ').map(Number) as [number, number]
            minX = Math.min(minX, x)
            minY = Math.min(minY, y)
            maxX = Math.max(maxX, x)
            maxY = Math.max(maxY, y)
        }
    }
    return [minX, minY, maxX - minX, maxY - minY]
}

/**
 * The cantons as an SVG map, from the boundaries in belgica/canton-boundaries, simplified at
 * build time into canton-map.json. Each canton links to its page; hovering names it.
 */
export function CantonMap({ only, highlight = [], label }: Props) {
    const [data, setData] = useState<MapData | null>(null)
    const [tip, setTip] = useState<{ x: number; y: number; name: string; court: string } | null>(
        null,
    )
    useEffect(() => {
        fetchJson<MapData>('/canton-map.json').then(setData, () => {
            setData(null)
        })
    }, [])

    const shapes =
        data ?
            only ? data.cantons.filter((c) => only.includes(c.canton))
            :   data.cantons
        :   []
    const [x, y, w, h] =
        !data ? [0, 0, 100, 80]
        : only ? bounds(shapes.map((s) => s.d))
        : data.viewBox
    const pad = Math.max(w, h) * 0.03
    const viewBox = [x - pad, y - pad, w + 2 * pad, h + 2 * pad]

    function move(e: PointerEvent<HTMLDivElement>) {
        const link = (e.target as Element).closest('a[data-canton]')
        const shape = data?.cantons.find((c) => c.canton === link?.getAttribute('data-canton'))
        if (!shape) {
            setTip(null)
            return
        }
        const box = e.currentTarget.getBoundingClientRect()
        setTip({
            x: e.clientX - box.left,
            y: e.clientY - box.top,
            name: shape.name,
            court: shape.court,
        })
    }

    return (
        <div
            className="map-frame"
            onPointerMove={move}
            onPointerLeave={() => {
                setTip(null)
            }}
        >
            <svg
                viewBox={viewBox.join(' ')}
                role="img"
                aria-label={label}
                className="map"
                aria-busy={!data}
            >
                {shapes.map((s) => (
                    <Link
                        key={s.canton}
                        href={`/cantons/${s.canton}/`}
                        data-canton={s.canton}
                        aria-label={s.name}
                    >
                        <path
                            d={s.d}
                            fillRule="evenodd"
                            className={highlight.includes(s.canton) ? 'on' : undefined}
                        />
                    </Link>
                ))}
            </svg>
            {tip && (
                <div className="tip" style={{ left: tip.x, top: tip.y }}>
                    <strong>{tip.name}</strong>
                    <span>{tip.court}</span>
                </div>
            )}
        </div>
    )
}
