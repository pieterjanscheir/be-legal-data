// Imports the built package by name, as a consumer would. Plain Node, no test runner, so CI
// can run it on every supported Node version.
import assert from 'node:assert/strict'
import { getCourt, cantons as allCantons } from 'belgica'
import { cantons, getCantonsForMunicipality } from 'belgica/territory'
import { getJusticeOfThePeace } from 'belgica/courts'
import { getInterestRate } from 'belgica/interest-rates'
import { getPrison } from 'belgica/prisons'
import { getHouseOfJustice } from 'belgica/houses-of-justice'
import { createRequire } from 'node:module'

assert.equal(getCourt('justice-of-the-peace-gent-1').name.nl, 'Vredegerecht Gent 1')
assert.equal(getJusticeOfThePeace('gent-1').id, 'justice-of-the-peace-gent-1')
assert.deepEqual(
    getCantonsForMunicipality('44088').map((c) => c.id),
    ['merelbeke-melle'],
)
assert.equal(getInterestRate('2024-06-15', 'legal').rate, 5.75)
assert.equal(getPrison('gevangenis-gent').address.postalCode, '9000')
assert.equal(getHouseOfJustice('justitiehuis-gent').ovo, 'OVO001917')
// The entry points share one copy of the data
assert.equal(cantons, allCantons)

const require = createRequire(import.meta.url)
assert.equal(require('belgica/data/courts.json').length > 0, true)
assert.equal(require('belgica/datapackage.json').name, 'belgica')
assert.equal(require('belgica/schema/courts.schema.json').title, 'belgica: data/courts.json')

console.log(`ESM smoke test passed on Node ${process.version}`)
