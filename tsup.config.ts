import { defineConfig } from 'tsup'

// ESM only: Node ≥ 22.12 loads ESM from require() as well, so a CommonJS build would only add a
// second copy of the data. The JSON is inlined, so consumers need no JSON loader. Each dataset
// has its own entry point, so importing only the interest rates doesn't pull in the cantons.
export default defineConfig({
    entry: {
        index: 'src/index.ts',
        territory: 'src/territory.ts',
        courts: 'src/courts.ts',
        'interest-rates': 'src/interest-rates.ts',
    },
    format: ['esm'],
    target: 'node22',
    dts: true,
    clean: true,
    splitting: true,
})
