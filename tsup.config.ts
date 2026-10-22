import { defineConfig, type Options } from 'tsup'

// The canton boundaries (22 MB) stay out of the bundle: belgica/canton-boundaries imports them
// from data/, so the package holds them once. The path stays right because src/ and dist/ are
// both one level down.
const keepBoundariesApart: NonNullable<Options['esbuildPlugins']>[number] = {
    name: 'keep-boundaries-apart',
    setup(build) {
        build.onResolve({ filter: /^\.\.\/data\/canton-boundaries\.json$/ }, (args) => ({
            path: args.path,
            external: true,
        }))
    },
}

// ESM only: Node ≥ 22.12 loads ESM from require() as well, so a CommonJS build would only add a
// second copy of the data. The JSON is inlined, except the canton boundaries, which
// belgica/canton-boundaries imports from data/ with `with { type: 'json' }`. Each dataset
// has its own entry point, so importing only the interest rates doesn't pull in the cantons, and
// the canton boundaries (the largest by far) are only in theirs: the root doesn't re-export them.
// The zod schemas have their own entry point too: the datasets only import their types, so zod
// isn't in their bundles.
export default defineConfig({
    entry: {
        index: 'src/index.ts',
        territory: 'src/territory.ts',
        'canton-boundaries': 'src/canton-boundaries.ts',
        courts: 'src/courts.ts',
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
    esbuildPlugins: [keepBoundariesApart],
})
