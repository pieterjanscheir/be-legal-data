/**
 * Postal codes, from Statbel's conversion tables from postal codes to REFNIS codes (source
 * `postal-codes` in scripts/sources/catalog.ts). Each table gives the pairs (postal code,
 * municipality) valid from a day: `…_va01012025.xlsx` from 1 January 2025. One record per
 * pair, with its validity read from the tables: a pair applies from the first table that lists
 * it (no `validFrom` when that table starts on or before the coverage) until the day before
 * the first later table that doesn't. A table the parser can't read, a REFNIS code that isn't a
 * municipality or a municipality without a postal code stops the build: the data would be
 * wrong, not merely incomplete.
 */
import { readFileSync } from 'node:fs'

import type { Bilingual } from '../../src/common.ts'
import { isPostalCodeTable } from '../sources/catalog.ts'
import { Snapshots } from '../sources/store.ts'
import { clean } from './normalize.ts'
import { dayBefore } from './retire.ts'
import type { Address, PostalCode } from './types.ts'
import { readSheet } from './xlsx.ts'

/** The first day the dataset describes; the same as `postalCodesCoverage` in src */
export const COVERAGE_FROM = '2025-01-01'

const HEADER = ['Postal code', 'Refnis code', 'Gemeentenaam', 'Nom commune']

/** A postal code and a REFNIS code */
export type Pair = [postalCode: string, municipality: string]

/** The pairs a table lists, and the day it applies from */
export interface Table {
    validFrom: string
    pairs: Pair[]
}

/** The day a table applies from, from its file name: `…_va01012025.xlsx` → '2025-01-01' */
export function tableDay(url: string): string | undefined {
    const m = /_va(\d{2})(\d{2})(\d{4})\.xlsx$/i.exec(url)
    return m ? `${m[3] ?? ''}-${m[2] ?? ''}-${m[1] ?? ''}` : undefined
}

/** The pairs of a table; throws when the table isn't the one the parser knows */
export function readTable(xlsx: Buffer, name: string): Pair[] {
    const [header, ...rows] = readSheet(xlsx)
    if (header?.join('|') !== HEADER.join('|'))
        throw new Error(
            `${name}: expected the columns ${HEADER.join(', ')}; got ${header?.join(', ') ?? 'nothing'}`,
        )
    return rows.flatMap((row, i): Pair[] => {
        if (!row.some(Boolean)) return []
        const [postalCode = '', municipality = ''] = row
        if (!/^\d{4}$/.test(postalCode) || !/^\d{5}$/.test(municipality))
            throw new Error(
                `${name}, row ${i + 2}: cannot read '${postalCode}' / '${municipality}'`,
            )
        return [[postalCode, municipality]]
    })
}

export const postalCodeId = ([postalCode, municipality]: Pair) => `${postalCode}-${municipality}`

/**
 * The records the tables give, with their validity, and what is wrong with them: a code that
 * points at a REFNIS code that isn't a municipality, a municipality without any code in the
 * latest table
 */
export function postalCodesFrom(
    tables: readonly Table[],
    municipalities: ReadonlySet<string>,
): { postalCodes: PostalCode[]; problems: string[] } {
    const sorted = [...tables].sort((a, b) => a.validFrom.localeCompare(b.validFrom))
    for (const [i, table] of sorted.entries())
        if (sorted[i + 1]?.validFrom === table.validFrom)
            throw new Error(`Two postal code tables apply from ${table.validFrom}`)
    // Only the tables that apply on a day of the coverage: the last one starting on or before
    // its first day applies then. Without one, the data would have a gap at the start of the
    // coverage that the lookups couldn't tell from an unknown code.
    const first = sorted.findLastIndex((t) => t.validFrom <= COVERAGE_FROM)
    if (first === -1) throw new Error(`No postal code table applies on ${COVERAGE_FROM}`)
    const applying = sorted.slice(first)
    const problems: string[] = []
    const versions = new Map<string, PostalCode[]>()
    const open = new Map<string, PostalCode>()
    for (const [index, table] of applying.entries()) {
        const listed = new Set(table.pairs.map(postalCodeId))
        if (index > 0) {
            for (const [id, record] of open) {
                if (listed.has(id)) continue
                record.validTo = dayBefore(table.validFrom)
                open.delete(id)
            }
        }
        for (const pair of table.pairs) {
            const id = postalCodeId(pair)
            if (open.has(id)) continue
            const [postalCode, municipality] = pair
            if (!municipalities.has(municipality))
                problems.push(
                    `postal code ${postalCode} points at REFNIS code ${municipality}, which isn't in data/municipalities.json`,
                )
            const record: PostalCode = {
                id,
                ...(table.validFrom > COVERAGE_FROM ? { validFrom: table.validFrom } : {}),
                postalCode,
                municipality,
            }
            open.set(id, record)
            versions.set(id, [...(versions.get(id) ?? []), record])
        }
    }
    const latest = new Set([...open.values()].map((r) => r.municipality))
    for (const municipality of [...municipalities].sort())
        if (!latest.has(municipality))
            problems.push(`municipality ${municipality} has no postal code`)
    // validFrom and validTo right after the id, like every other dataset
    const postalCodes = [...versions.values()]
        .flat()
        .map(({ id, validFrom, validTo, ...rest }) => ({
            id,
            ...(validFrom !== undefined ? { validFrom } : {}),
            ...(validTo !== undefined ? { validTo } : {}),
            ...rest,
        }))
    postalCodes.sort(
        (a, b) => a.id.localeCompare(b.id) || (a.validFrom ?? '').localeCompare(b.validFrom ?? ''),
    )
    return { postalCodes, problems }
}

/** The tables in the snapshots, read */
export function readTables(root: string): { tables: Table[]; names: string[] } {
    const snapshots = new Snapshots(root, 'postal-codes')
    const tables: Table[] = []
    const names: string[] = []
    for (const entry of snapshots.entries()) {
        if (!isPostalCodeTable(entry.url)) continue
        const path = snapshots.path(entry.url)
        if (!path) continue
        const validFrom = tableDay(entry.url)
        if (!validFrom) throw new Error(`${entry.url}: cannot read the day the table applies from`)
        tables.push({ validFrom, pairs: readTable(readFileSync(path), entry.url) })
        names.push(entry.url)
    }
    if (tables.length === 0) throw new Error('No snapshot of a postal code table')
    return { tables, names }
}

export function buildPostalCodes(
    root: string,
    municipalities: readonly { id: string }[],
): { postalCodes: PostalCode[]; problems: string[]; tables: string[] } {
    const { tables, names } = readTables(root)
    return { ...postalCodesFrom(tables, new Set(municipalities.map((m) => m.id))), tables: names }
}

// ---------------------------------------------------------------------------------------------
// Addresses: the link from a published address to its municipality (#28)

const fold = (name: string) => clean(name).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

/**
 * Finds the municipality of an address through its postal code, never through the city name
 * alone: the municipality the code belongs to today, or, for a code shared by two
 * municipalities (1040, 1050, 1804), the one the city line names exactly, in Dutch or French.
 * Otherwise nothing, and the caller reports the address.
 */
export function municipalityResolver(
    postalCodes: readonly PostalCode[],
    municipalities: readonly { id: string; name: Bilingual }[],
): (address: Pick<Address, 'postalCode' | 'city'>) => string | undefined {
    const byCode = new Map<string, string[]>()
    for (const record of postalCodes) {
        if (record.validTo !== undefined) continue
        byCode.set(record.postalCode, [
            ...(byCode.get(record.postalCode) ?? []),
            record.municipality,
        ])
    }
    const names = new Map(municipalities.map((m) => [m.id, m.name]))
    return (address) => {
        const candidates = byCode.get(address.postalCode) ?? []
        if (candidates.length === 1) return candidates[0]
        const city = fold(address.city)
        const named = candidates.filter((id) =>
            Object.values(names.get(id) ?? {}).some((name) => fold(name) === city),
        )
        return named.length === 1 ? named[0] : undefined
    }
}

/** The records with their address linked to its municipality, and the addresses that couldn't be */
export function linkMunicipalities<T extends { id: string; address?: Address }>(
    records: readonly T[],
    resolve: ReturnType<typeof municipalityResolver>,
): { records: T[]; unresolved: string[] } {
    const unresolved: string[] = []
    const linked = records.map((record) => {
        if (!record.address) return record
        const municipality = resolve(record.address)
        if (municipality === undefined) {
            unresolved.push(
                `${record.id}: no single municipality for ${record.address.postalCode} ${record.address.city}`,
            )
            return record
        }
        return { ...record, address: { ...record.address, municipality } }
    })
    return { records: linked, unresolved }
}
