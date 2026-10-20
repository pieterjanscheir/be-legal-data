import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// Runs against dist/, so `pnpm build` first (pnpm check does)
describe.runIf(existsSync('dist/index.js'))('built package', () => {
    it.each(['test/smoke/esm.mjs', 'test/smoke/cjs.cjs'])('passes %s', (script) => {
        expect(execFileSync('node', [script], { encoding: 'utf8' })).toMatch(/passed/)
    })
})
