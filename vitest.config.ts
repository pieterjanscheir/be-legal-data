import { defineConfig } from 'vitest/config'

// The freshness checks depend on today's date and the network, so they run on a schedule
// (pnpm test:freshness), not on every change.
export default defineConfig({
    test: {
        include: ['test/*.test.ts'],
        typecheck: { enabled: true, include: ['test/*.test.ts'] },
        coverage: {
            provider: 'v8',
            include: ['src/**'],
            // Type-only modules have no code to cover
            exclude: ['src/ids.generated.ts', 'src/common.ts'],
            thresholds: { statements: 100, branches: 100, functions: 100, lines: 100 },
        },
    },
})
