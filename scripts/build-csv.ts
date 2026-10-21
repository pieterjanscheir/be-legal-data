/**
 * Writes the data as CSV tables, for spreadsheets and tools that don't read JSON. Nested values
 * become tables of their own: a court's contacts are in court-contacts.csv, keyed by court id.
 *
 *     node scripts/build-csv.ts [directory]     # csv/ by default
 *
 * RFC 4180, UTF-8 with a byte order mark so Excel reads the accents. The release workflow
 * attaches the tables to each GitHub release.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'

import type {
    Arrondissement,
    Canton,
    Contact,
    Court,
    HouseOfJustice,
    InterestRateSeries,
    InterestType,
    JudicialArea,
    Municipality,
    PostalCode,
    Prison,
    Province,
    Region,
    Validity,
} from '../src/index.ts'

const read = (file: string): unknown => JSON.parse(readFileSync(`data/${file}.json`, 'utf8'))
const judicialAreas = read('judicial-areas') as JudicialArea[]
const arrondissements = read('arrondissements') as Arrondissement[]
const regions = read('regions') as Region[]
const provinces = read('provinces') as Province[]
const municipalities = read('municipalities') as Municipality[]
const cantons = read('cantons') as Canton[]
const courts = read('courts') as Court[]
const prisons = read('prisons') as Prison[]
const housesOfJustice = read('houses-of-justice') as HouseOfJustice[]
const postalCodes = read('postal-codes') as PostalCode[]
const interestRates = read('interest-rates') as Record<InterestType, InterestRateSeries>

type Cell = string | number | boolean | undefined
type Row = Record<string, Cell>

const quote = (cell: Cell) => {
    const text = cell === undefined ? '' : String(cell)
    return /[",\r\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

export function toCsv(rows: Row[]): string {
    const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))]
    const lines = [columns, ...rows.map((row) => columns.map((c) => row[c]))]
    return '﻿' + lines.map((line) => line.map(quote).join(',')).join('\r\n') + '\r\n'
}

/**
 * A record's validity period. A record can have several versions with the same id, so the
 * tables always have these columns, even while every value is empty.
 */
const validity = (r: Validity) => ({ valid_from: r.validFrom, valid_to: r.validTo })

const contactRows = (owner: string, id: string, contacts: readonly Contact[]) =>
    contacts.map((c) => ({
        [owner]: id,
        type: c.type,
        value: c.value,
        label: c.label,
        note: c.note,
    }))

export const tables: Record<string, Row[]> = {
    'judicial-areas': judicialAreas.map((a) => ({
        id: a.id,
        name_nl: a.name.nl,
        name_fr: a.name.fr,
        name_de: a.name.de,
        ...validity(a),
    })),
    arrondissements: arrondissements.map((a) => ({
        id: a.id,
        judicial_area: a.judicialArea,
        name_nl: a.name.nl,
        name_fr: a.name.fr,
        name_de: a.name.de,
        ...validity(a),
    })),
    regions: regions.map((r) => ({
        refnis: r.id,
        name_nl: r.name.nl,
        name_fr: r.name.fr,
        name_de: r.name.de,
        ...validity(r),
    })),
    provinces: provinces.map((p) => ({
        refnis: p.id,
        region: p.region,
        name_nl: p.name.nl,
        name_fr: p.name.fr,
        name_de: p.name.de,
        ...validity(p),
    })),
    municipalities: municipalities.map((m) => ({
        refnis: m.id,
        name_nl: m.name.nl,
        name_fr: m.name.fr,
        province: m.province,
        region: m.region,
        ...validity(m),
    })),
    'postal-codes': postalCodes.map((p) => ({
        id: p.id,
        postal_code: p.postalCode,
        municipality: p.municipality,
        ...validity(p),
    })),
    cantons: cantons.map((c) => ({
        id: c.id,
        arrondissement: c.arrondissement,
        name_nl: c.name.nl,
        name_fr: c.name.fr,
        number: c.number,
        seat_nl: c.seat.nl,
        seat_fr: c.seat.fr,
        territory_nl: c.territory.nl,
        territory_fr: c.territory.fr,
        legal_basis: c.legalBasis.provision,
        legal_basis_url: c.legalBasis.url,
        ...validity(c),
    })),
    'canton-municipalities': cantons.flatMap((c) =>
        c.municipalities.map((m) => ({
            canton: c.id,
            canton_valid_from: c.validFrom,
            municipality: m.municipality,
            partial: m.partial ?? false,
        })),
    ),
    courts: courts.map((c) => ({
        id: c.id,
        ...validity(c),
        type: c.type,
        kind: c.kind,
        court: c.court,
        name_nl: c.name.nl,
        name_fr: c.name.fr,
        name_de: c.name.de,
        judicial_area: c.judicialArea,
        arrondissement: c.arrondissement,
        canton: c.canton,
        ecli: c.ecli?.join(' '),
        building: c.address?.building,
        street: c.address?.street,
        postal_code: c.address?.postalCode,
        city: c.address?.city,
        municipality: c.address?.municipality,
        opening_hours: c.openingHours,
        website_nl: c.website.nl,
        website_fr: c.website.fr,
        website_de: c.website.de,
    })),
    'court-contacts': courts.flatMap((c) => contactRows('court', c.id, c.contacts)),
    // The area of each court other than a justice of the peace, whose canton is in courts.csv
    'court-cantons': courts.flatMap((c) =>
        (c.cantons ?? []).map((canton) => ({ court: c.id, canton })),
    ),
    prisons: prisons.map((p) => ({
        id: p.id,
        ...validity(p),
        kind: p.kind,
        name_nl: p.name.nl,
        name_fr: p.name.fr,
        name_de: p.name.de,
        street: p.address.street,
        postal_code: p.address.postalCode,
        city: p.address.city,
        municipality: p.address.municipality,
        website_nl: p.website.nl,
    })),
    'prison-contacts': prisons.flatMap((p) => contactRows('prison', p.id, p.contacts)),
    'houses-of-justice': housesOfJustice.map((h) => ({
        id: h.id,
        ...validity(h),
        community: h.community,
        name: h.name.nl ?? h.name.fr ?? h.name.de,
        ovo: h.ovo,
        street: h.address.street,
        postal_code: h.address.postalCode,
        city: h.address.city,
        municipality: h.address.municipality,
    })),
    'house-of-justice-contacts': housesOfJustice.flatMap((h) =>
        contactRows('house_of_justice', h.id, h.contacts),
    ),
    'interest-rates': (['legal', 'commercial'] as const).flatMap((type) =>
        interestRates[type].periods.map((p) => ({
            type,
            from: p.from,
            to: p.to,
            rate: p.rate,
            rate_contracts_before_20130316: p.rateForContractsBefore20130316,
        })),
    ),
}

// Run as a script, not imported by the tests. pathToFileURL escapes spaces and the like, which
// a hand-built file:// URL wouldn't.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const dir = process.argv[2] ?? 'csv'
    mkdirSync(dir, { recursive: true })
    for (const [name, rows] of Object.entries(tables))
        writeFileSync(join(dir, `${name}.csv`), toCsv(rows))
}
