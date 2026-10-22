import { localeNames, routing } from '@/i18n/routing'

const base = process.env.NEXT_PUBLIC_SITE_BASE ?? ''

// The static 404 page, outside any language: it links to each
export default function NotFound() {
    return (
        <html lang="en">
            <body>
                <main className="wrap">
                    <h1>404</h1>
                    <ul className="columns">
                        {routing.locales.map((l) => (
                            <li key={l}>
                                <a href={`${base}/${l}/`} lang={l}>
                                    {localeNames[l]}
                                </a>
                            </li>
                        ))}
                    </ul>
                </main>
            </body>
        </html>
    )
}
