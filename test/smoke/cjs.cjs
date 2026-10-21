// CommonJS consumers: same checks as esm.mjs
const assert = require('node:assert/strict')
const { getCourt } = require('belgica')
const { getCantonsForMunicipality } = require('belgica/territory')
const { getJusticeOfThePeace } = require('belgica/courts')
const { getInterestRate } = require('belgica/interest-rates')

assert.equal(getCourt('justice-of-the-peace-gent-1').name.nl, 'Vredegerecht Gent 1')
assert.equal(getJusticeOfThePeace('gent-1').id, 'justice-of-the-peace-gent-1')
assert.deepEqual(
    getCantonsForMunicipality('44088').map((c) => c.id),
    ['merelbeke-melle'],
)
assert.equal(getInterestRate('2024-06-15', 'legal').rate, 5.75)

console.log(`CJS smoke test passed on Node ${process.version}`)
