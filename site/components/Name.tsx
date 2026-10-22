import type { Locale } from 'belgica'
import { locales, pick, type PerLocale } from '@/lib/labels'

/**
 * A name in the language picked in the header. The page is static, so it renders every
 * language and CSS shows the one picked (html[data-lang]); a name that's the same in every
 * language renders once.
 */
export function Name({ value }: { value: PerLocale | ((locale: Locale) => string) }) {
    const text = (l: Locale) => (typeof value === 'function' ? value(l) : pick(value, l))
    const names = locales.map((l) => [l, text(l)] as const)
    if (names.every(([, n]) => n === names[0]?.[1])) return <>{names[0]?.[1]}</>
    return (
        <>
            {names.map(([l, n]) => (
                <span key={l} className="tr" data-l={l} lang={l}>
                    {n}
                </span>
            ))}
        </>
    )
}
