/**
 * Reads the first worksheet of an .xlsx file as rows of strings, with nothing but Node. An
 * .xlsx is a zip of XML files, and the two a plain table needs (the shared strings and the
 * sheet) are small enough to read with regular expressions. Enough for Statbel's conversion
 * tables; not a general spreadsheet reader (no formulas, dates or styles).
 */
import { inflateRawSync } from 'node:zlib'

const CENTRAL_DIRECTORY = 0x02014b50
const END_OF_CENTRAL_DIRECTORY = 0x06054b50

/** The files in a zip, by name */
export function unzip(zip: Buffer): Map<string, Buffer> {
    // The end-of-central-directory record is the last thing in the file, before a comment of
    // at most 65535 bytes
    let end = -1
    for (let i = zip.length - 22; i >= Math.max(0, zip.length - 22 - 0xffff); i--) {
        if (zip.readUInt32LE(i) === END_OF_CENTRAL_DIRECTORY) {
            end = i
            break
        }
    }
    if (end === -1) throw new Error('Not a zip file')
    const count = zip.readUInt16LE(end + 10)
    let offset = zip.readUInt32LE(end + 16)
    const files = new Map<string, Buffer>()
    for (let n = 0; n < count; n++) {
        if (zip.readUInt32LE(offset) !== CENTRAL_DIRECTORY) throw new Error('Not a zip file')
        const method = zip.readUInt16LE(offset + 10)
        const compressed = zip.readUInt32LE(offset + 20)
        const nameLength = zip.readUInt16LE(offset + 28)
        const extraLength = zip.readUInt16LE(offset + 30)
        const commentLength = zip.readUInt16LE(offset + 32)
        const local = zip.readUInt32LE(offset + 42)
        const name = zip.toString('utf8', offset + 46, offset + 46 + nameLength)
        // The local header repeats the name and may have its own extra field
        const start = local + 30 + zip.readUInt16LE(local + 26) + zip.readUInt16LE(local + 28)
        const data = zip.subarray(start, start + compressed)
        if (method === 0) files.set(name, data)
        else if (method === 8) files.set(name, inflateRawSync(data))
        else throw new Error(`Unsupported compression method ${method} for ${name}`)
        offset += 46 + nameLength + extraLength + commentLength
    }
    return files
}

const ENTITIES: Record<string, string> = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'" }

/** XML text with its character references decoded */
export function decodeXml(text: string): string {
    return text.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, ref: string) => {
        if (ref.startsWith('#x') || ref.startsWith('#X'))
            return String.fromCodePoint(Number.parseInt(ref.slice(2), 16))
        if (ref.startsWith('#')) return String.fromCodePoint(Number(ref.slice(1)))
        return ENTITIES[ref.toLowerCase()] ?? match
    })
}

/** The text of a cell or shared string: every <t> run, joined */
const runs = (xml: string) =>
    decodeXml([...xml.matchAll(/<t\b[^>]*>([\s\S]*?)<\/t>/g)].map((m) => m[1] ?? '').join(''))

/** 'A' → 0, 'Z' → 25, 'AA' → 26 */
export function columnIndex(letters: string): number {
    let n = 0
    for (const letter of letters) n = n * 26 + (letter.charCodeAt(0) - 64)
    return n - 1
}

/**
 * The first worksheet as rows of cell texts, empty cells as '', without trailing empty rows.
 * Shared strings, inline strings and plain values are read; anything else is an error, so a
 * table that changes shape stops the build rather than feed it half-read values.
 */
export function readSheet(xlsx: Buffer): string[][] {
    const files = unzip(xlsx)
    const sheet = files.get('xl/worksheets/sheet1.xml')?.toString('utf8')
    if (sheet === undefined) throw new Error('No worksheet in the .xlsx file')
    const strings = [
        ...(files.get('xl/sharedStrings.xml')?.toString('utf8') ?? '').matchAll(
            /<si>([\s\S]*?)<\/si>/g,
        ),
    ].map((m) => runs(m[1] ?? ''))
    const rows: string[][] = []
    for (const [, rowXml = ''] of sheet.matchAll(/<row\b[^>]*>([\s\S]*?)<\/row>/g)) {
        const row: string[] = []
        for (const cell of rowXml.matchAll(/<c\b([^>]*?)(?:\/>|>([\s\S]*?)<\/c>)/g)) {
            const attributes = cell[1] ?? ''
            const inner = cell[2] ?? ''
            const column = /\br="([A-Z]+)\d+"/.exec(attributes)?.[1]
            const type = /\bt="([^"]+)"/.exec(attributes)?.[1]
            if (!column) throw new Error(`Cell without a reference: ${cell[0]}`)
            const value = /<v>([\s\S]*?)<\/v>/.exec(inner)?.[1]
            let text: string
            if (type === 's') {
                const shared = strings[Number(value)]
                if (shared === undefined) throw new Error(`Unknown shared string ${value ?? ''}`)
                text = shared
            } else if (type === 'inlineStr') text = runs(inner)
            else if (type === undefined || type === 'n' || type === 'str') {
                text = decodeXml(value ?? '')
            } else throw new Error(`Unsupported cell type '${type}' in ${column}`)
            const index = columnIndex(column)
            while (row.length < index) row.push('')
            row[index] = text
        }
        rows.push(row)
    }
    while (rows.length > 0 && !rows.at(-1)?.some(Boolean)) rows.pop()
    return rows
}
