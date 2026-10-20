import { defineConfig } from 'vitest/config'

// The freshness checks depend on today's date and the network, so they run on a schedule
// (pnpm test:freshness), not on every change.
export default defineConfig({
    test: { include: ['test/*.test.ts'] },
})
