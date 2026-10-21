/**
 * Rebuilds the scraped datasets in data/ from the snapshots of the official sources.
 *
 *     node scripts/parse/build.ts        # reads $SOURCES_DIR, or .sources/
 *
 * Prints what it couldn't read. Fails, and writes nothing, when a page can't be placed (a court
 * without a canton, an unknown kind of court), a canton has no court, a postal code points at
 * an unknown municipality or a municipality has no postal code: those need a person.
 */
import { readFileSync, writeFileSync } from 'node:fs'

import type { Municipality } from '../../src/territory.ts'
import { Snapshots } from '../sources/store.ts'
import { buildCourts } from './courts.ts'
import { buildHousesOfJustice, buildPrisons } from './places.ts'
import { buildPostalCodes, linkMunicipalities, municipalityResolver } from './postal-codes.ts'
import { carryOver, walkDay, type Dated } from './retire.ts'
import type { Court, HouseOfJustice, Prison } from './types.ts'

const root = process.env['SOURCES_DIR'] ?? '.sources'
const municipalities = JSON.parse(
    readFileSync('data/municipalities.json', 'utf8'),
) as Municipality[]
const { postalCodes, problems: postalCodeProblems } = buildPostalCodes(root, municipalities)

// Every address links to its municipality through its postal code (#28)
const resolve = municipalityResolver(postalCodes, municipalities)
const { courts: builtCourts, report } = buildCourts(root)
const { records: freshCourts, unresolved: courtAddresses } = linkMunicipalities(
    builtCourts,
    resolve,
)
const built = { prisons: buildPrisons(root), houses: buildHousesOfJustice(root) }
const { records: freshPrisons, unresolved: prisonAddresses } = linkMunicipalities(
    built.prisons.prisons,
    resolve,
)
const { records: freshHouses, unresolved: houseAddresses } = linkMunicipalities(
    built.houses.houses,
    resolve,
)
const prisonProblems = built.prisons.problems
const houseProblems = built.houses.problems

// A record a source no longer lists is retired with a validTo, never deleted (retire.ts)
const previous = <T extends Dated>(file: string): T[] =>
    JSON.parse(readFileSync(`data/${file}.json`, 'utf8')) as T[]
const day = (source: string) => walkDay(new Snapshots(root, source).entries())
const courts = carryOver(previous<Court>('courts'), freshCourts, day('courts'))
const prisons = carryOver(previous<Prison>('prisons'), freshPrisons, day('prisons'))
const houses = carryOver(
    previous<HouseOfJustice>('houses-of-justice'),
    freshHouses,
    day('houses-of-justice'),
)
for (const line of [...prisonProblems, ...houseProblems]) console.warn(`unreadable: ${line}`)
for (const line of [...courtAddresses, ...prisonAddresses, ...houseAddresses])
    console.warn(`unreadable: ${line}`)

const problems = [
    ...postalCodeProblems,
    ...report.unmatched,
    ...report.conflicts,
    ...report.cantonsWithoutCourt.map((id) => `canton ${id} has no court`),
    ...report.eclisWithoutCourt.map((id) => `the ECLI table has ${id}, the sources don't`),
    ...report.courtsWithoutJurisdiction.map(
        (id) => `${id} is on the portal, but not in the law table`,
    ),
    ...report.jurisdictionsWithoutCourt.map((id) => `the law table has ${id}, the sources don't`),
]
for (const line of report.unreadable) console.warn(`unreadable: ${line}`)
const withoutAddress = courts.filter((c) => !c.address).map((c) => c.id)
console.warn(`${courts.length} courts; without a single address: ${withoutAddress.join(', ')}`)

if (problems.length > 0) {
    for (const line of problems) console.error(line)
    process.exit(1)
}
const write = (file: string, data: unknown) => {
    writeFileSync(`data/${file}.json`, JSON.stringify(data, null, 2) + '\n')
}
write('courts', courts)
write('prisons', prisons)
write('houses-of-justice', houses)
write('postal-codes', postalCodes)
