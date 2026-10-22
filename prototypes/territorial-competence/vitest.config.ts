import { defineConfig } from 'vitest/config'

// The prototype runs on its own (pnpm prototype:competence would be the script), outside the
// package's test suite and its 100% coverage threshold
export default defineConfig({
    test: {
        root: import.meta.dirname,
        include: ['test/*.test.ts'],
    },
})
