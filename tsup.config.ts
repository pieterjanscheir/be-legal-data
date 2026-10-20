import { defineConfig } from 'tsup'

// The JSON data is inlined into the bundle, so consumers need no JSON loader. Each dataset
// also has its own entry point, so importing only the interest rates doesn't pull in the
// canton texts.
export default defineConfig({
    entry: {
        index: 'src/index.ts',
        territory: 'src/territory.ts',
        courts: 'src/courts.ts',
        'interest-rates': 'src/interest-rates.ts',
    },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    splitting: true,
})
