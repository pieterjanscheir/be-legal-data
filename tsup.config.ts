import { defineConfig } from 'tsup'

// ESM only: Node ≥ 22.12 loads ESM from require() as well, so a CommonJS build would only add a
// second copy of the data. The JSON is inlined, so consumers need no JSON loader. Each dataset
// has its own entry point, so importing only the interest rates doesn't pull in the cantons, and
// the boundaries (the largest by far) are only in theirs: the root doesn't re-export them.
// The zod schemas have their own entry point too: the datasets only import their types, so zod
// isn't in their bundles.
export default defineConfig({
    entry: {
        index: 'src/index.ts',
        territory: 'src/territory.ts',
        'canton-boundaries': 'src/canton-boundaries.ts',
        'arrondissement-boundaries': 'src/arrondissement-boundaries.ts',
        courts: 'src/courts.ts',
        'court-locations': 'src/court-locations.ts',
        prisons: 'src/prisons.ts',
        'houses-of-justice': 'src/houses-of-justice.ts',
        'interest-rates': 'src/interest-rates.ts',
        'postal-codes': 'src/postal-codes.ts',
        schemas: 'src/schemas/index.ts',
    },
    format: ['esm'],
    target: 'node22',
    dts: true,
    clean: true,
    splitting: true,
})
