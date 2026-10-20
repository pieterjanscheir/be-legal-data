// CommonJS consumers: same checks as esm.mjs
const assert = require('node:assert/strict')
const { getCourt } = require('be-legal-data')
const { getCantonsForMunicipality } = require('be-legal-data/territory')
const { getJusticeOfThePeace } = require('be-legal-data/courts')
const { getInterestRate } = require('be-legal-data/interest-rates')

assert.equal(getCourt('justice-of-the-peace-gent-1').name.nl, 'Vredegerecht Gent 1')
assert.equal(getJusticeOfThePeace('gent-1').id, 'justice-of-the-peace-gent-1')
assert.deepEqual(
    getCantonsForMunicipality('44088').map((c) => c.id),
    ['merelbeke-melle'],
)
assert.equal(getInterestRate('2024-06-15', 'legal').rate, 5.75)

console.log(`CJS smoke test passed on Node ${process.version}`)
