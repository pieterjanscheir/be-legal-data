import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import Link from 'next/link'
import { LanguageSwitch, languageScript } from '@/components/LanguageSwitch'
import './globals.css'

export const metadata: Metadata = {
    title: { default: 'belgica explorer', template: '%s · belgica explorer' },
    description:
        'Every Belgian court, judicial canton, municipality and postal code, and the legal interest rates: a site built from the belgica package.',
}

const nav = [
    ['/courts/', 'Courts'],
    ['/cantons/', 'Cantons'],
    ['/municipalities/', 'Municipalities'],
    ['/interest/', 'Interest'],
    ['/places/', 'Prisons & houses of justice'],
] as const

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: languageScript }} />
            </head>
            <body>
                <a className="skip" href="#main">
                    Skip to content
                </a>
                <header className="top">
                    <div className="wrap top-inner">
                        <Link href="/" className="brand">
                            <Mark />
                            belgica <span className="muted">explorer</span>
                        </Link>
                        <nav aria-label="Main">
                            {nav.map(([href, label]) => (
                                <Link key={href} href={href}>
                                    {label}
                                </Link>
                            ))}
                        </nav>
                        <LanguageSwitch />
                    </div>
                </header>
                <main id="main" className="wrap">
                    {children}
                </main>
                <footer className="wrap foot">
                    <p>
                        Every page is built from{' '}
                        <a href="https://www.npmjs.com/package/belgica">belgica</a> at build time:{' '}
                        <a href="https://pieterjanscheir.github.io/belgica/">documentation</a> ·{' '}
                        <a href="https://github.com/pieterjanscheir/belgica/tree/main/site">
                            this site&apos;s source
                        </a>
                    </p>
                    <p className="muted">
                        Reference data, not legal advice: check the official sources before relying
                        on it. Municipality and postal-code data © Statbel, canton boundaries © NGI,
                        CC BY 4.0.
                    </p>
                </footer>
            </body>
        </html>
    )
}

/** The logo's b, in its grid cells */
function Mark() {
    const cells: [number, number, string][] = [
        [0, 0, 'ink'],
        [1, 0, 'ink'],
        [2, 0, 'ink'],
        [3, 0, 'ink'],
        [1, 1, 'ink'],
        [1, 2, 'yellow'],
        [2, 2, 'ink'],
        [3, 1, 'ink'],
        [3, 2, 'red'],
    ]
    return (
        <svg viewBox="0 0 34 46" width="17" height="23" aria-hidden="true" className="mark">
            {cells.map(([r, c, k]) => (
                <rect
                    key={`${r}${c}`}
                    x={c * 12}
                    y={r * 12}
                    width="10"
                    height="10"
                    rx="2.5"
                    className={k}
                />
            ))}
        </svg>
    )
}
