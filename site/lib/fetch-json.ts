// The site is served under SITE_BASE; fetch() doesn't add the basePath the way <Link> does
const base = process.env.NEXT_PUBLIC_SITE_BASE ?? ''
const cache = new Map<string, Promise<unknown>>()

/** A JSON file of the site, fetched once per page load and shared by every caller */
export function fetchJson<T>(path: string): Promise<T> {
    let promise = cache.get(path)
    if (!promise) {
        promise = fetch(`${base}${path}`).then((r) => {
            if (!r.ok) throw new Error(`${path}: ${r.status}`)
            return r.json()
        })
        cache.set(path, promise)
    }
    return promise as Promise<T>
}
