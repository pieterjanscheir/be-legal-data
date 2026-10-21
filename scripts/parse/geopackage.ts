/**
 * Reads the geometries of a GeoPackage (OGC 12-128r19): an SQLite file whose feature tables
 * hold each geometry as a GeoPackage binary blob, a short header followed by OGC well-known
 * binary. Only what the NGI's territorial divisions use is read: two-dimensional polygons
 * and multipolygons, in either byte order. Anything else is an error, not a guess.
 */
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

/** GeoJSON positions: longitude, then latitude */
export type Position = [number, number]
export type Ring = Position[]
export type PolygonRings = Ring[]

/** The rings of each polygon of a geometry, as the file holds them: a polygon is one entry */
export type MultiPolygonRings = PolygonRings[]

const WKB_POLYGON = 3
const WKB_MULTIPOLYGON = 6

class Reader {
    #pos: number
    readonly #view: DataView
    constructor(blob: Uint8Array, offset: number) {
        this.#view = new DataView(blob.buffer, blob.byteOffset, blob.byteLength)
        this.#pos = offset
    }
    byte(): number {
        return this.#view.getUint8(this.#pos++)
    }
    uint32(littleEndian: boolean): number {
        const value = this.#view.getUint32(this.#pos, littleEndian)
        this.#pos += 4
        return value
    }
    double(littleEndian: boolean): number {
        const value = this.#view.getFloat64(this.#pos, littleEndian)
        this.#pos += 8
        return value
    }
    get position() {
        return this.#pos
    }
}

function readRings(reader: Reader, littleEndian: boolean): PolygonRings {
    const rings: PolygonRings = []
    const count = reader.uint32(littleEndian)
    for (let r = 0; r < count; r++) {
        const points = reader.uint32(littleEndian)
        const ring: Ring = []
        for (let p = 0; p < points; p++) {
            ring.push([reader.double(littleEndian), reader.double(littleEndian)])
        }
        rings.push(ring)
    }
    return rings
}

/** A WKB polygon or multipolygon, as the rings of each of its polygons */
function readWkb(reader: Reader): MultiPolygonRings {
    const littleEndian = reader.byte() === 1
    const type = reader.uint32(littleEndian)
    // Z and M coordinates come as type + 1000/2000/3000 (ISO) or as flag bits (EWKB)
    const base = type & 0xff
    if (type !== base)
        throw new Error(`WKB: geometries with Z or M aren't supported (type ${type})`)
    if (base === WKB_POLYGON) return [readRings(reader, littleEndian)]
    if (base === WKB_MULTIPOLYGON) {
        const count = reader.uint32(littleEndian)
        const polygons: MultiPolygonRings = []
        for (let i = 0; i < count; i++) polygons.push(...readWkb(reader))
        return polygons
    }
    throw new Error(`WKB: expected a polygon or multipolygon, got type ${type}`)
}

/** The polygons of a GeoPackage geometry blob */
export function readGeoPackageGeometry(blob: Uint8Array): MultiPolygonRings {
    if (blob[0] !== 0x47 || blob[1] !== 0x50) throw new Error('Not a GeoPackage geometry blob')
    const flags = blob[3] ?? 0
    if (flags & 0x20) throw new Error('GeoPackage geometry blob: empty geometry')
    // Envelope: none, xy, xyz, xym or xyzm doubles after the 8-byte header
    const envelope = [0, 32, 48, 48, 64][(flags >> 1) & 7]
    if (envelope === undefined) throw new Error('GeoPackage geometry blob: bad envelope flag')
    const reader = new Reader(blob, 8 + envelope)
    const polygons = readWkb(reader)
    if (reader.position !== blob.length)
        throw new Error('GeoPackage geometry blob: trailing bytes after the geometry')
    return polygons
}

/**
 * Runs a query against a GeoPackage held in memory: SQLite reads files, so the bytes are written
 * to a temporary file for the duration of the query.
 */
export function queryGeoPackage<T>(
    geopackage: Buffer,
    sql: string,
    read: (row: Record<string, unknown>) => T,
): T[] {
    const dir = mkdtempSync(join(tmpdir(), 'geopackage-'))
    const path = join(dir, 'data.gpkg')
    try {
        writeFileSync(path, geopackage)
        const db = new DatabaseSync(path, { readOnly: true })
        try {
            return db
                .prepare(sql)
                .all()
                .map((row) => read(row as Record<string, unknown>))
        } finally {
            db.close()
        }
    } finally {
        rmSync(dir, { recursive: true, force: true })
    }
}
