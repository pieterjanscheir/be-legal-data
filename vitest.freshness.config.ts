import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: { include: ['test/freshness/*.test.ts'], testTimeout: 30_000 },
})
