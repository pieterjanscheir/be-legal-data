import { defineConfig } from 'tsup'

// The JSON data is inlined into the bundle, so consumers need no JSON loader.
export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
})
