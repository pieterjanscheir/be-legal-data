// Bundles the built package for the browser, as an app would (esbuild, minified, ESM), and checks
// that the split data files keep what it ships small:
//
// 1. An app that needs the justices of the peace of East and West Flanders imports their two
//    list files and formats their names: it stays under a size limit, and holds nothing of the
//    other courts, of the courts' details or of the cantons.
// 2. An app that uses `loadCourts` gets one chunk per data file, so a browser downloads only the
//    files asked for.
import assert from 'node:assert/strict'
import { mkdtempSync, readFileSync, readdirSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, relative, resolve } from 'node:path'
import { gzipSync } from 'node:zlib'
import { build } from 'esbuild'

const root = new URL('../../', import.meta.url).pathname
// 15.0 KB when the check was added (0.5.0); raise it on purpose, with the reason in the changelog
const LIMIT = 30_000
// The loader entry without the data: the map of the list files and the index
const LOADER_LIMIT = 15_000
const options = {
    bundle: true,
    minify: true,
    format: 'esm',
    platform: 'browser',
    write: false,
    logLevel: 'error',
}
const read = (file) => JSON.parse(readFileSync(join(root, file), 'utf8'))
const bundle = async (contents) => {
    const result = await build({ ...options, stdin: { contents, resolveDir: root } })
    return result.outputFiles[0].text
}

// For the log: what an app ships with the full courts and territory entry points
const before = {
    courts: await bundle(`import { findCourts, formatCourtName } from 'belgica/courts'
        export default findCourts({ type: 'justice-of-the-peace' }).map((c) => formatCourtName(c, 'nl', { style: 'canton' }))`),
    territory: await bundle(`import { getCanton } from 'belgica/territory'
        export default getCanton('gent-1').name.nl`),
}

// 1. Two list files and formatCourtName
const files = ['oost-vlaanderen', 'west-vlaanderen'].map(
    (a) => `data/courts/justice-of-the-peace/${a}.json`,
)
const code = await bundle(`
    import east from 'belgica/${files[0]}' with { type: 'json' }
    import west from 'belgica/${files[1]}' with { type: 'json' }
    import { formatCourtName } from 'belgica/courts/format'
    export default [...east, ...west].map((c) => formatCourtName(c, 'nl', { style: 'canton' }))
`)
const size = Buffer.byteLength(code)
assert.ok(
    size <= LIMIT,
    `The two list files are ${size} bytes minified, over the limit of ${LIMIT}`,
)

const included = new Set(files.flatMap((file) => read(file).map((c) => c.id)))
assert.equal(included.size, 38)
const courts = read('data/courts.json')
const names = new Set(
    courts.filter((c) => included.has(c.id)).flatMap((c) => Object.values(c.name)),
)
for (const court of courts) {
    if (included.has(court.id)) {
        // Their details stay in data/courts/details/
        for (const { value } of court.contacts)
            assert.ok(!code.includes(value), `${court.id}'s contact ${value} is in the bundle`)
        for (const { url } of court.sources)
            assert.ok(!code.includes(url), `${court.id}'s source ${url} is in the bundle`)
        continue
    }
    assert.ok(!code.includes(`"${court.id}"`), `${court.id} is in the bundle`)
    for (const name of Object.values(court.name))
        if (!names.has(name)) assert.ok(!code.includes(name), `'${name}' is in the bundle`)
}
for (const canton of read('data/cantons.json')) {
    for (const text of Object.values(canton.territory))
        assert.ok(!code.includes(text.slice(0, 50)), `${canton.id}'s territory is in the bundle`)
    assert.ok(!code.includes(canton.legalBasis.url), `${canton.id}'s legal basis is in the bundle`)
}

// 2. loadCourts: one chunk per data file
const outdir = mkdtempSync(join(tmpdir(), 'belgica-bundle-'))
try {
    const result = await build({
        ...options,
        stdin: {
            contents: `import { loadCourts, loadCourtDetails } from 'belgica/courts/load'
                export const load = (a) => loadCourts({ type: 'justice-of-the-peace', arrondissement: a })
                export const details = (id) => loadCourtDetails(id)`,
            resolveDir: root,
        },
        splitting: true,
        outdir,
        metafile: true,
    })
    const dataFiles = readdirSync(join(root, 'data/courts'), { recursive: true })
        .filter((f) => f.endsWith('.json'))
        .map((f) => `data/courts/${f}`)
    const outputs = Object.values(result.metafile.outputs)
    const holdsData = (o) =>
        Object.keys(o.inputs).some((input) => relative(root, join(root, input)).startsWith('data/'))
    for (const file of dataFiles) {
        const holding = outputs.filter((o) =>
            Object.keys(o.inputs).some((input) => relative(root, join(root, input)) === file),
        )
        assert.equal(holding.length, 1, `${file} is in ${holding.length} chunks`)
        assert.equal(Object.keys(holding[0].inputs).length, 1, `${file} shares its chunk`)
    }
    // Every dynamic import is an entry point to esbuild: the app's own is <stdin>
    const entry = outputs.find((o) => o.entryPoint === '<stdin>')
    const rest = outputs.filter((o) => o !== entry && !holdsData(o))
    // The map of the details files, loaded on the first loadCourtDetails
    assert.equal(rest.length, 1, `${rest.length} chunks besides the entry and the data`)
    assert.ok(
        entry.bytes <= LOADER_LIMIT,
        `The loader entry is ${entry.bytes} bytes minified, over the limit of ${LOADER_LIMIT}`,
    )

    const gzip = (text) => gzipSync(text).length
    const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`
    const paths = new Map(
        Object.entries(result.metafile.outputs).map(([path, o]) => [o, resolve(path)]),
    )
    const text = (o) => result.outputFiles.find((f) => f.path === paths.get(o)).text
    console.log(`Minified, gzip in brackets:
  whole:  belgica/courts, findCourts + formatCourtName        ${kb(Buffer.byteLength(before.courts))} (${kb(gzip(before.courts))})
  whole:  belgica/territory, getCanton                        ${kb(Buffer.byteLength(before.territory))} (${kb(gzip(before.territory))})
  after:  two list files + belgica/courts/format              ${kb(size)} (${kb(gzip(code))}, limit ${kb(LIMIT)})
  after:  belgica/courts/load entry                           ${kb(entry.bytes)} (${kb(gzip(text(entry)))}, limit ${kb(LOADER_LIMIT)})
          + on the first loadCourtDetails, the details map    ${kb(rest[0].bytes)} (${kb(gzip(text(rest[0])))})
          ${dataFiles.length} data files, one chunk each`)
} finally {
    rmSync(outdir, { recursive: true, force: true })
}
