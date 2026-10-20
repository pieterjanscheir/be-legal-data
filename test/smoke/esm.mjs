// Imports the built package by name, as a consumer would. Plain Node, no test runner, so CI
// can run it on every supported Node version.
import assert from 'node:assert/strict'
import { getCourt, formatCourtName, cantons as allCantons } from 'be-legal-data'
import { cantons, getCantonsForMunicipality } from 'be-legal-data/territory'
import { getJusticeOfThePeace } from 'be-legal-data/courts'
import { getInterestRate } from 'be-legal-data/interest-rates'
import { createRequire } from 'node:module'

assert.equal(formatCourtName(getCourt('VredegerechtGent1')), 'Vredegerecht 1e kanton Gent')
assert.equal(getJusticeOfThePeace('Gent1').id, 'VredegerechtGent1')
assert.deepEqual(getCantonsForMunicipality('44088').map((c) => c.id), ['MerelbekeMelle'])
assert.equal(getInterestRate('2024-06-15', 'legal').rate, 5.75)
// The entry points share one copy of the data
assert.equal(cantons, allCantons)

const require = createRequire(import.meta.url)
assert.equal(require('be-legal-data/data/courts.json').length > 0, true)
assert.equal(require('be-legal-data/datapackage.json').name, 'be-legal-data')
assert.equal(require('be-legal-data/schema/courts.schema.json').title, 'be-legal-data: data/courts.json')

console.log(`ESM smoke test passed on Node ${process.version}`)
