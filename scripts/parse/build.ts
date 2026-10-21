/**
 * Rebuilds the scraped datasets in data/ from the snapshots of the official sources.
 *
 *     node scripts/parse/build.ts        # reads $SOURCES_DIR, or .sources/
 *
 * Prints what it couldn't read. Fails, and writes nothing, when a page can't be placed (a court
 * without a canton, an unknown kind of court) or a canton has no court: those need a person.
 */
import { writeFileSync } from 'node:fs'

import { buildCourts } from './courts.ts'
import { buildHousesOfJustice, buildPrisons } from './places.ts'

const root = process.env['SOURCES_DIR'] ?? '.sources'
const { courts, report } = buildCourts(root)

const { prisons, problems: prisonProblems } = buildPrisons(root)
const { houses, problems: houseProblems } = buildHousesOfJustice(root)
for (const line of [...prisonProblems, ...houseProblems]) console.warn(`unreadable: ${line}`)

const problems = [
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
