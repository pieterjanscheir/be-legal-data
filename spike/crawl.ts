// Spike crawler: breadth-first, same-site, polite (1 request per second), saves every page.
import { createHash } from 'node:crypto'
import { mkdirSync, writeFileSync } from 'node:fs'

interface Job {
    name: string
    seeds: string[]
    allow: RegExp
    deny?: RegExp
    maxPages: number
}

const jobs: Job[] = [
    {
        name: 'courts',
        seeds: [
            'https://www.tribunaux-rechtbanken.be/nl/een-rechtbank-zoeken',
            'https://www.tribunaux-rechtbanken.be/nl/rechtbanken/vredegerecht',
            'https://www.tribunaux-rechtbanken.be/nl/rechtbanken/politierechtbank',
            'https://www.tribunaux-rechtbanken.be/nl/rechtbanken/rechtbank-van-eerste-aanleg',
            'https://www.tribunaux-rechtbanken.be/nl/rechtbanken/ondernemingsrechtbank',
            'https://www.tribunaux-rechtbanken.be/nl/rechtbanken/arbeidsrechtbank',
            'https://www.tribunaux-rechtbanken.be/nl/hoven/hof-van-beroep',
            'https://www.tribunaux-rechtbanken.be/nl/hoven/arbeidshof',
            'https://www.tribunaux-rechtbanken.be/nl/hoven/hof-van-assisen',
            'https://www.tribunaux-rechtbanken.be/nl/hoven/hof-van-cassatie',
            'https://www.tribunaux-rechtbanken.be/nl/links/territoriale-bevoegdheid',
        ],
        allow: /^https:\/\/www\.tribunaux-rechtbanken\.be\/nl\//,
        deny: /\/(nieuws|nieuwsartikel|nieuwsartikel-lokaal|pers|jobs|user|zoeken|videos|brochures|college|statistieken|lexicon|faq)(\/|$)|[?&]page=/,
        maxPages: 700,
    },
    {
        name: 'prisons',
        seeds: ['https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen'],
        allow: /^https:\/\/justitie\.belgium\.be\/nl\/themas_en_dossiers\/gevangenissen\/belgische_gevangenissen/,
        maxPages: 80,
    },
    {
        name: 'justitiehuizen',
        seeds: [
            'https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen',
            'https://www.maisonsdejustice.be/',
        ],
        allow: /^https:\/\/(www\.vlaanderen\.be\/agentschap-justitie-en-handhaving\/justitie\/justitiehuizen|www\.maisonsdejustice\.be\/)/,
        maxPages: 120,
    },
    {
        name: 'bailiffs',
        seeds: ['https://www.gerechtsdeurwaarders.be/', 'https://www.gerechtsdeurwaarders.be/bailiff'],
        allow: /^https:\/\/www\.gerechtsdeurwaarders\.be\/(bailiff|zoek|vind|gerechtsdeurwaarder|de-gerechtsdeurwaarder|home$)/,
        maxPages: 40,
    },
    {
        name: 'statbel',
        seeds: [
            'https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie',
            'https://statbel.fgov.be/nl/open-data?category=All&keys=refnis',
        ],
        allow: /^https:\/\/statbel\.fgov\.be\/nl\/(open-data|over-statbel\/methodologie\/classificaties)/,
        maxPages: 40,
    },
]

const UA = 'Mozilla/5.0 (compatible; be-legal-data source check; +https://github.com/pieterjanscheir/be-legal-data)'
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const slug = (url: string) =>
    url.replace(/^https?:\/\//, '').replace(/[^a-zA-Z0-9]+/g, '_').slice(0, 150)

for (const job of jobs) {
    const dir = `spike/sources/${job.name}`
    mkdirSync(dir, { recursive: true })
    const queue = [...job.seeds]
    const seen = new Set(queue)
    const index: object[] = []
    while (queue.length > 0 && index.length < job.maxPages) {
        const url = queue.shift()!
        await sleep(1000)
        try {
            const res = await fetch(url, { headers: { 'user-agent': UA }, redirect: 'follow' })
            const type = res.headers.get('content-type') ?? ''
            const body = Buffer.from(await res.arrayBuffer())
            const file = slug(url) + (type.includes('html') ? '.html' : '.bin')
            writeFileSync(`${dir}/${file}`, body)
            index.push({ url, final: res.url, status: res.status, type, file, bytes: body.length, sha256: createHash('sha256').update(body).digest('hex') })
            console.log(job.name, res.status, url)
            if (!type.includes('html')) continue
            for (const [, href] of body.toString('utf8').matchAll(/href="([^"#]+)/g)) {
                let next: string
                try {
                    next = new URL(href!.replaceAll('&amp;', '&'), res.url).href
                } catch {
                    continue
                }
                if (job.allow.test(next) && !job.deny?.test(next) && !seen.has(next)) {
                    seen.add(next)
                    queue.push(next)
                }
            }
        } catch (error) {
            index.push({ url, error: String(error) })
            console.log(job.name, 'ERR', url, String(error))
        }
    }
    writeFileSync(`${dir}/index.json`, JSON.stringify({ retrieved: new Date().toISOString(), pages: index, unvisited: queue }, null, 1))
}
