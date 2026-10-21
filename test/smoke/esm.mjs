// Imports the built package by name, as a consumer would. Plain Node, no test runner, so CI
// can run it on every supported Node version.
import assert from 'node:assert/strict'
import { getCourt, cantons as allCantons } from 'be-legal-data'
import { cantons, getCantonsForMunicipality } from 'be-legal-data/territory'
import { getJusticeOfThePeace } from 'be-legal-data/courts'
import { getInterestRate } from 'be-legal-data/interest-rates'
import { getPrison } from 'be-legal-data/prisons'
import { getHouseOfJustice } from 'be-legal-data/houses-of-justice'
import { getMunicipalitiesForPostalCode } from 'be-legal-data/postal-codes'
import { findCourtsForPostalCode, getMunicipality } from 'be-legal-data'
import { findCantonsAt, getCantonBoundary } from 'be-legal-data/canton-boundaries'
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
assert.equal(getMunicipalitiesForPostalCode('9000')[0], getMunicipality('44021'))
assert.equal(findCourtsForPostalCode('1040', 'police-court').length, 2)
assert.equal(getCantonBoundary('gent-1').geometry.type, 'MultiPolygon')
assert.deepEqual(
    findCantonsAt(3.745, 50.995).map((c) => c.id),
    ['merelbeke-melle'],
)
// The entry points share one copy of the data
assert.equal(cantons, allCantons)

const require = createRequire(import.meta.url)
assert.equal(require('be-legal-data/data/courts.json').length > 0, true)
assert.equal(require('be-legal-data/datapackage.json').name, 'be-legal-data')
assert.equal(
    require('be-legal-data/schema/courts.schema.json').title,
    'be-legal-data: data/courts.json',
)

console.log(`ESM smoke test passed on Node ${process.version}`)
