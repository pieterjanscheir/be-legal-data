/**
 * Numbers the pages quote, computed at build time from the data and the build output, so the
 * documentation can't drift from the data it describes. Use in a page as
 * `import { data as stats } from '../.vitepress/stats.data'`.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { gzipSync } from 'node:zlib'

import {
    appliesOn,
    cantons,
    courts,
    housesOfJustice,
    municipalities,
    postalCodes,
    prisons,
    toDay,
    type CourtType,
} from '../../src'

export interface EntrySize {
    entry: string
    /** Bytes of JavaScript loaded by importing the entry point, with the chunks it pulls in */
    raw: number
    gzip: number
}

export interface Stats {
    cantons: number
    splitCantons: number
    municipalities: number
    courts: {
        /** Records that apply today */
        total: number
        /** Versions the file holds that no longer apply */
        retired: number
        byType: { type: CourtType; label: string; courts: number; divisions: number }[]
        withoutAddress: number
        hoursParsed: number
        hoursTextOnly: number
        hoursNone: number
        withBankAccount: number
        withEcli: number
    }
    prisons: number
    housesOfJustice: number
    postalCodes: {
        /** Records that apply today: one per postal code and municipality */
        records: number
        /** Distinct postal codes */
        codes: number
        /** Postal codes that belong to two municipalities */
        shared: number
    }
    /** Per entry point, when `pnpm build` has run; otherwise null */
    sizes: EntrySize[] | null
}

const TYPES: [CourtType, string][] = [
    ['justice-of-the-peace', 'Justice of the peace'],
    ['police-court', 'Police court'],
    ['court-of-first-instance', 'Court of first instance'],
    ['enterprise-court', 'Enterprise court'],
    ['labour-court', 'Labour court'],
    ['court-of-appeal', 'Court of appeal'],
    ['labour-court-of-appeal', 'Labour court of appeal'],
    ['court-of-assize', 'Court of assize'],
]

const DIST = join(import.meta.dirname, '../../dist')
const ENTRIES = [
    'index',
    'territory',
    'canton-boundaries',
    'arrondissement-boundaries',
    'courts',
    'court-locations',
    'courts-format',
    'courts-load',
    'cantons',
    'canton-territory',
    'prisons',
    'houses-of-justice',
    'interest-rates',
    'calendar',
    'postal-codes',
]

// The entry points whose file name isn't their export path
const NAMES: Record<string, string> = {
    index: 'belgica',
    'courts-format': 'belgica/courts/format',
    'courts-load': 'belgica/courts/load',
    'canton-territory': 'belgica/cantons/territory',
}

/** The files an entry point loads: itself and, transitively, the chunks it imports */
function filesOf(entry: string, seen = new Set<string>()): Set<string> {
    const file = `${entry}.js`
    if (seen.has(file) || !existsSync(join(DIST, file))) return seen
    seen.add(file)
    const source = readFileSync(join(DIST, file), 'utf8')
    for (const [, chunk] of source.matchAll(/from "\.\/(chunk-[^"]+)\.js"/g))
        if (chunk) filesOf(chunk, seen)
    return seen
}

function sizes(): EntrySize[] | null {
    if (!existsSync(DIST) || !readdirSync(DIST).some((f) => f.endsWith('.js'))) return null
    return ENTRIES.map((entry) => {
        const sources = [...filesOf(entry)].map((f) => readFileSync(join(DIST, f)))
        const raw = sources.reduce((n, buffer) => n + buffer.length, 0)
        const gzip = sources.reduce((n, buffer) => n + gzipSync(buffer).length, 0)
        return { entry: NAMES[entry] ?? `belgica/${entry}`, raw, gzip }
    })
}

export default {
    load(): Stats {
        const today = toDay(new Date())
        const current = courts.filter((c) => appliesOn(c, today))
        const currentPostalCodes = postalCodes.filter((p) => appliesOn(p, today))
        const codes = new Map<string, number>()
        for (const p of currentPostalCodes)
            codes.set(p.postalCode, (codes.get(p.postalCode) ?? 0) + 1)
        const byType = TYPES.map(([type, label]) => ({
            type,
            label,
            courts: current.filter((c) => c.type === type && c.kind === 'court').length,
            divisions: current.filter((c) => c.type === type && c.kind !== 'court').length,
        }))
        return {
            cantons: cantons.length,
            splitCantons: cantons.filter((c) => c.municipalities.some((m) => m.partial)).length,
            municipalities: municipalities.length,
            courts: {
                total: current.length,
                retired: courts.length - current.length,
                byType,
                withoutAddress: current.filter((c) => !c.address).length,
                hoursParsed: current.filter((c) => c.openingHours).length,
                hoursTextOnly: current.filter((c) => c.openingHoursText && !c.openingHours).length,
                hoursNone: current.filter((c) => !c.openingHoursText).length,
                withBankAccount: current.filter((c) =>
                    c.contacts.some((k) => k.type === 'bank-account'),
                ).length,
                withEcli: current.filter((c) => c.ecli).length,
            },
            prisons: prisons.filter((p) => appliesOn(p, today)).length,
            housesOfJustice: housesOfJustice.filter((h) => appliesOn(h, today)).length,
            postalCodes: {
                records: currentPostalCodes.length,
                codes: codes.size,
                shared: [...codes.values()].filter((n) => n > 1).length,
            },
            sizes: sizes(),
        }
    },
}
