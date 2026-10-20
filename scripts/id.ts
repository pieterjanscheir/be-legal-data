/**
 * The id rule shared by the generators and the tests: lowercase ASCII words joined by hyphens,
 * taken from a name, with the number appended for places with several (`gent-1`).
 * See docs/guide/identifiers.md.
 */
export function toId(name: string, number?: number): string {
    const base = name
        .normalize('NFD')
        .replace(/[̀-ͯ]/g, '')
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean)
        .join('-')
    return number === undefined ? base : `${base}-${number}`
}

/** Pattern every non-numeric id matches */
export const ID_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/
