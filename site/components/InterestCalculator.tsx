'use client'

import { useEffect, useMemo, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { formatDay } from '@/lib/labels'
import { getLatestKnownRateDate, interestRates, type InterestType } from 'belgica/interest-rates'

const DAY = 86_400_000
const toTime = (day: string) => Date.parse(`${day}T00:00:00Z`)
const toDay = (time: number) => new Date(time).toISOString().slice(0, 10)

/**
 * An amount as people type it in Belgium or in English: '10000', '10 000', '10.000,50',
 * '10,000.50', '1234,5'. One separator followed by exactly three digits ('10,000', '10.000')
 * could be either a thousands separator or a decimal one, so it's rejected rather than guessed.
 */
function parseAmount(input: string): number | 'ambiguous' | null {
    const text = input.replace(/[\s\u00a0']/g, '')
    if (!/^\d[\d.,]*$/.test(text)) return null
    const separators = text.match(/[.,]/g) ?? []
    let normalised: string
    if (separators.length === 0) normalised = text
    else if (new Set(separators).size === 2) {
        // Both kinds: the last one is the decimal separator, the others group thousands
        const decimal = text.lastIndexOf(',') > text.lastIndexOf('.') ? ',' : '.'
        const grouping = decimal === ',' ? '.' : ','
        if (text.indexOf(grouping) > text.lastIndexOf(decimal)) return null
        normalised = text.replaceAll(grouping, '').replace(decimal, '.')
    } else if (separators.length > 1) {
        // The same separator several times can only group thousands: 1.000.000
        if (!/^\d{1,3}([.,]\d{3})+$/.test(text)) return null
        normalised = text.replace(/[.,]/g, '')
    } else {
        const decimals = text.length - 1 - text.search(/[.,]/)
        if (decimals === 3) return 'ambiguous'
        normalised = text.replace(',', '.')
    }
    const value = Number(normalised)
    return Number.isFinite(value) && value > 0 ? value : null
}

interface Row {
    from: string
    to: string
    days: number
    rate: number | null
    interest: number
}

/**
 * Simple interest over a period, at the rate of each day: the days in each rate period times
 * the amount times the rate, over 365. Days from the start date up to the end date.
 */
function calculate(amount: number, from: string, to: string, type: InterestType, newer: boolean) {
    const start = toTime(from)
    const end = toTime(to)
    const rows: Row[] = []
    let cursor = start
    for (const p of interestRates[type].periods) {
        const pStart = toTime(p.from)
        const pEnd = toTime(p.to) + DAY
        if (pEnd <= cursor || pStart >= end) continue
        if (pStart > cursor) {
            rows.push({
                from: toDay(cursor),
                to: toDay(pStart - DAY),
                days: (pStart - cursor) / DAY,
                rate: null,
                interest: 0,
            })
            cursor = pStart
        }
        const segmentEnd = Math.min(end, pEnd)
        const days = Math.round((segmentEnd - cursor) / DAY)
        const rate =
            !newer && p.rateForContractsBefore20130316 !== undefined ?
                p.rateForContractsBefore20130316
            :   p.rate
        rows.push({
            from: toDay(cursor),
            to: toDay(segmentEnd - DAY),
            days,
            rate,
            interest: (amount * rate * days) / 36_500,
        })
        cursor = segmentEnd
        if (cursor >= end) break
    }
    if (cursor < end)
        rows.push({
            from: toDay(cursor),
            to: toDay(end - DAY),
            days: Math.round((end - cursor) / DAY),
            rate: null,
            interest: 0,
        })
    return rows
}

export function InterestCalculator() {
    const t = useTranslations('interest')
    const locale = useLocale()
    const euro = useMemo(
        () => new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' }),
        [locale],
    )
    const percent = useMemo(
        () => new Intl.NumberFormat(locale, { style: 'percent', maximumFractionDigits: 3 }),
        [locale],
    )
    const [type, setType] = useState<InterestType>('legal')
    const [amount, setAmount] = useState('10000')
    const [from, setFrom] = useState('2023-03-15')
    // Today, once mounted: the page is rendered at build time, so a day set during rendering
    // would be the build's and wouldn't match in the browser
    const [to, setTo] = useState('')
    useEffect(() => {
        setTo(new Date().toISOString().slice(0, 10))
    }, [])
    const [newer, setNewer] = useState(true)
    const latest = getLatestKnownRateDate(type)

    const parsed = parseAmount(amount)
    const value = typeof parsed === 'number' ? parsed : 0
    const valid = value > 0 && from !== '' && to !== '' && toTime(from) < toTime(to)
    const rows = useMemo(
        () => (valid ? calculate(value, from, to, type, newer) : []),
        [valid, value, from, to, type, newer],
    )
    const total = rows.reduce((sum, r) => sum + r.interest, 0)
    const missing = rows.some((r) => r.rate === null)

    return (
        <div className="calculator">
            <form
                className="fields"
                onSubmit={(e) => {
                    e.preventDefault()
                }}
            >
                <label>
                    {t('rate')}
                    <select
                        value={type}
                        onChange={(e) => {
                            setType(e.target.value as InterestType)
                        }}
                    >
                        <option value="legal">{t('legal')}</option>
                        <option value="commercial">{t('commercial')}</option>
                    </select>
                </label>
                <label>
                    {t('principal')}
                    <input
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => {
                            setAmount(e.target.value)
                        }}
                    />
                </label>
                <label>
                    {t('from')}
                    <input
                        type="date"
                        value={from}
                        min="1970-07-01"
                        onChange={(e) => {
                            setFrom(e.target.value)
                        }}
                    />
                </label>
                <label>
                    {t('to')}
                    <input
                        type="date"
                        value={to}
                        onChange={(e) => {
                            setTo(e.target.value)
                        }}
                    />
                </label>
                {type === 'commercial' && (
                    <label className="check">
                        <input
                            type="checkbox"
                            checked={newer}
                            onChange={(e) => {
                                setNewer(e.target.checked)
                            }}
                        />
                        {t('newerContract')}
                    </label>
                )}
            </form>

            {to === '' ?
                null
            : parsed === 'ambiguous' ?
                <p className="warn" role="alert">
                    {t('ambiguous', { amount })}
                </p>
            : !valid ?
                <p className="muted">{t('invalid')}</p>
            :   <>
                    <p className="total">
                        <span className="muted">{t('interest')}</span>
                        <strong>{euro.format(total)}</strong>
                        <span className="muted">
                            {t('over', {
                                amount: euro.format(value),
                                days: rows.reduce((s, r) => s + r.days, 0),
                            })}
                        </span>
                    </p>
                    {missing && (
                        <p className="warn" role="note">
                            ⚠ {t('missing', { date: formatDay(latest, locale) })}
                        </p>
                    )}
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>{t('from')}</th>
                                    <th>{t('to')}</th>
                                    <th className="num">{t('days')}</th>
                                    <th className="num">{t('rate')}</th>
                                    <th className="num">{t('interest')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rows.map((r) => (
                                    <tr key={r.from}>
                                        <td>{formatDay(r.from, locale)}</td>
                                        <td>{formatDay(r.to, locale)}</td>
                                        <td className="num">{r.days}</td>
                                        <td className="num">
                                            {r.rate === null ? '—' : percent.format(r.rate / 100)}
                                        </td>
                                        <td className="num">
                                            {r.rate === null ? '—' : euro.format(r.interest)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            }
        </div>
    )
}
