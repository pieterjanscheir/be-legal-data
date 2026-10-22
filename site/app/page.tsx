import { localeNames, routing } from '@/i18n/routing'

const base = process.env.NEXT_PUBLIC_SITE_BASE ?? ''

// A static export has no server to read Accept-Language, so the browser picks: the first of its
// languages the site has, else English. Without JavaScript, the links below.
const redirect = `(function(){var l=${JSON.stringify(routing.locales)},p=(navigator.languages||[navigator.language||'']).map(function(x){return x.slice(0,2).toLowerCase()}),m='${routing.defaultLocale}';for(var i=0;i<p.length;i++){if(l.indexOf(p[i])>=0){m=p[i];break}}location.replace('${base}/'+m+'/')})()`

export default function Root() {
    return (
        <html lang="en">
            <head>
                <title>belgica explorer</title>
                <script dangerouslySetInnerHTML={{ __html: redirect }} />
                <noscript>
                    <meta httpEquiv="refresh" content={`0; url=${base}/en/`} />
                </noscript>
            </head>
            <body>
                <main className="wrap">
                    <h1>belgica explorer</h1>
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
