/**
 * Builds the court locations from the peacecourt table of the NGI's "Judicial cantons and
 * arrondissements" GeoPackage: a point per justice of the peace, with the address the NGI
 * placed it at. A point joins its canton through the canton's head office (`cantonheadoffice`,
 * the same in both tables), and the canton gives the court: the justice of the peace of the
 * canton, or one of its seats.
 *
 * The NGI updates the points when it hears of a move, which it doesn't always: some still sit
 * at a building the court has left. A point is only kept when the NGI's address has the house
 * number of the court's own address (or a seat's); the others are reported, not published.
 * Comparing house numbers rather than streets keeps a Brussels court whose address the NGI
 * gives in French and the court's page in Dutch ('Place de la Résistance 3', 'Verzetsplein 3').
 */
import { readNgiGeoPackage, cantonIndex, matchCanton, round } from './boundaries.ts'
import { queryGeoPackage, readGeoPackagePoint } from './geopackage.ts'
import { NGI_CANTONS } from '../sources/catalog.ts'
import type { Canton } from '../../src/territory.ts'
import type { Court, CourtLocation } from './types.ts'

/**
 * The house number of an address line: its first number, once a postal code and the city after
 * it are taken off. 'Canadaplein 1, 8400 Oostende' → '1', 'Poelaertplein 3 bus 5' → '3'.
 */
export function houseNumber(street: string): string | undefined {
    return /\d+/.exec(street.replace(/\b\d{4}\s+\D.*$/, ''))?.[0]
}

export interface CourtLocationReport {
    /** Points no canton matches, with why */
    unmatched: string[]
    /** Points left out: the NGI's address isn't the court's */
    moved: string[]
}

export function buildCourtLocations(
    root: string,
    cantons: readonly Canton[],
    courts: readonly Court[],
): { locations: CourtLocation[]; report: CourtLocationReport } {
    const { geopackage, retrieved } = readNgiGeoPackage(root)
    const byName = cantonIndex(cantons)
    const report: CourtLocationReport = { unmatched: [], moved: [] }

    // A point whose head office no canton has comes out of the LEFT JOIN with null names
    const text = (value: unknown) => (typeof value === 'string' ? value : '')
    const points = queryGeoPackage(
        geopackage,
        'SELECT p.tgid, p.address, p.shape, c.namedut, c.namefre, c.cantoncodedut, ' +
            'c.cantoncodefre, c.tgid AS cantontgid FROM peacecourt p ' +
            'LEFT JOIN judicialcanton c ON c.cantonheadoffice = p.cantonheadoffice ' +
            'ORDER BY c.cantoncodedut, p.tgid',
        (row) => ({
            tgid: text(row['tgid']),
            address: text(row['address']).trim(),
            shape: row['shape'] as Uint8Array,
            canton: {
                tgid: text(row['cantontgid']),
                namedut: text(row['namedut']),
                namefre: text(row['namefre']),
                cantoncodedut: text(row['cantoncodedut']),
                cantoncodefre: text(row['cantoncodefre']),
            },
        }),
    )

    const locations = new Map<string, CourtLocation>()
    for (const point of points) {
        const match = matchCanton(point.canton, byName)
        if ('problem' in match) {
            report.unmatched.push(`peace court ${point.tgid}: ${match.problem}`)
            continue
        }
        const court = courts.find((c) => c.kind === 'court' && c.canton === match.canton.id)
        if (!court) {
            report.unmatched.push(`peace court ${point.tgid}: no court for ${match.canton.id}`)
            continue
        }
        // The court itself first: a seat at the same address is the same building
        const candidates = [court, ...courts.filter((c) => c.court === court.id)]
        const number = houseNumber(point.address)
        const at = candidates.find(
            (c) => c.address && number !== undefined && houseNumber(c.address.street) === number,
        )
        if (!at) {
            const published = candidates
                .flatMap((c) => (c.address ? [c.address.street] : []))
                .join(' / ')
            report.moved.push(
                `${court.id}: the NGI places it at "${point.address}", the court gives ` +
                    `"${published || 'no address'}"`,
            )
            continue
        }
        if (locations.has(at.id)) {
            report.unmatched.push(`peace court ${point.tgid}: a second point for ${at.id}`)
            continue
        }
        const [longitude, latitude] = readGeoPackagePoint(point.shape)
        locations.set(at.id, {
            id: at.id,
            court: at.id,
            ngiId: point.tgid,
            address: point.address,
            geometry: { type: 'Point', coordinates: [round(longitude), round(latitude)] },
            sources: [{ url: NGI_CANTONS, retrieved }],
        })
    }
    return {
        locations: [...locations.values()].sort((a, b) => a.id.localeCompare(b.id)),
        report,
    }
}
