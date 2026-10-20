/**
 * Snapshots of the official sources, one directory per source:
 *
 *     <root>/<source>/index.json         what was fetched, when, and a content hash
 *     <root>/<source>/<host>/<path>      the response body, as received
 *
 * A page is only rewritten when its content changes. Pages carry volatile markup (session
 * tokens, generated element ids), so the hash is taken over the normalized main content: a
 * fetch that finds the same content leaves the snapshot, and its `retrieved` date, as they were.
 */
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'

export interface Entry {
    url: string
    /** The URL after redirects, when different */
    finalUrl?: string
    status: number
    contentType: string
    /** Path of the snapshot, relative to the source's directory */
    file: string
    /** SHA-256 of the normalized content */
    sha256: string
    /** When this content was first fetched (ISO date) */
    retrieved: string
    /** When the URL was last fetched (ISO date) */
    checked: string
}

export interface Index {
    source: string
    entries: Entry[]
}

/** The file a URL is stored in: host and path, with the query folded into the name */
export function fileFor(url: string, contentType: string): string {
    const u = new URL(url)
    let path = decodeURIComponent(u.pathname).replace(/\/$/, '/index')
    if (u.search) path += '_' + u.search.slice(1).replace(/[^\w.-]+/g, '_')
    path = path.replace(/[^\w./-]+/g, '_')
    const ext = contentType.includes('html') ? '.html' : ''
    return join(u.host, path.endsWith(ext) ? path : path + ext)
}

/** Main content without volatile markup, for change detection */
export function normalize(body: Buffer, contentType: string): Buffer {
    if (!contentType.includes('html')) return body
    const html = body.toString('utf8')
    const main = /<main\b[\s\S]*<\/main>/i.exec(html)?.[0] ?? html
    return Buffer.from(
        main
            .replace(/<(script|style|noscript)\b[\s\S]*?<\/\1>/gi, '')
            .replace(/\s(?:class|id)="[^"]*(?:js-view-dom-id|form-build-id|token)[^"]*"/g, '')
            .replace(/\sname="form_build_id" value="[^"]*"/g, '')
            .replace(/\s+/g, ' '),
    )
}

export class Store {
    readonly #dir: string
    readonly #index: Index
    readonly #byUrl = new Map<string, Entry>()
    readonly #today = new Date().toISOString().slice(0, 10)

    constructor(root: string, source: string) {
        this.#dir = join(root, source)
        const path = join(this.#dir, 'index.json')
        this.#index =
            existsSync(path) ?
                (JSON.parse(readFileSync(path, 'utf8')) as Index)
            :   { source, entries: [] }
        for (const entry of this.#index.entries) this.#byUrl.set(entry.url, entry)
    }

    /** Records a response; returns whether its content changed */
    put(
        url: string,
        res: { url: string; status: number; contentType: string; body: Buffer },
    ): boolean {
        const sha256 = createHash('sha256')
            .update(normalize(res.body, res.contentType))
            .digest('hex')
        const previous = this.#byUrl.get(url)
        const changed = previous?.sha256 !== sha256 || previous.status !== res.status
        const file = previous?.file ?? fileFor(url, res.contentType)
        if (changed) {
            mkdirSync(dirname(join(this.#dir, file)), { recursive: true })
            writeFileSync(join(this.#dir, file), res.body)
        }
        const entry: Entry = {
            url,
            ...(res.url === url ? {} : { finalUrl: res.url }),
            status: res.status,
            contentType: res.contentType,
            file,
            sha256,
            retrieved: changed ? this.#today : previous.retrieved,
            checked: this.#today,
        }
        this.#byUrl.set(url, entry)
        return changed
    }

    save(): void {
        mkdirSync(this.#dir, { recursive: true })
        const entries = [...this.#byUrl.values()].sort((a, b) => a.url.localeCompare(b.url))
        writeFileSync(
            join(this.#dir, 'index.json'),
            JSON.stringify({ source: this.#index.source, entries }, null, 4) + '\n',
        )
    }
}

/** Reads snapshots back, for the parsers */
export class Snapshots {
    readonly #dir: string
    readonly #byUrl: Map<string, Entry>

    constructor(root: string, source: string) {
        this.#dir = join(root, source)
        const index = JSON.parse(readFileSync(join(this.#dir, 'index.json'), 'utf8')) as Index
        this.#byUrl = new Map(index.entries.map((e) => [e.url, e]))
    }

    entries(): Entry[] {
        return [...this.#byUrl.values()]
    }

    entry(url: string): Entry | undefined {
        return this.#byUrl.get(url)
    }

    /** The body of a successfully fetched URL */
    text(url: string): string | undefined {
        const entry = this.#byUrl.get(url)
        if (entry?.status !== 200) return undefined
        return readFileSync(join(this.#dir, entry.file), 'utf8')
    }

    path(url: string): string | undefined {
        const entry = this.#byUrl.get(url)
        return entry?.status === 200 ? join(this.#dir, entry.file) : undefined
    }
}
