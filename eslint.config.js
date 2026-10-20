// @ts-check
import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default tseslint.config(
    {
        ignores: [
            'dist/',
            'coverage/',
            'docs/.vitepress/dist/',
            'docs/.vitepress/cache/',
            'src/ids.generated.ts',
        ],
    },
    js.configs.recommended,
    {
        files: ['**/*.ts'],
        extends: [tseslint.configs.strictTypeChecked, tseslint.configs.stylisticTypeChecked],
        languageOptions: {
            parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
        },
        rules: {
            // Template literals with numbers are clear and used throughout
            '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],
        },
    },
    {
        // The site's own files: type-aware rules need the VitePress and Vue types, which the
        // package's tsconfig doesn't load
        files: ['docs/**'],
        extends: [tseslint.configs.disableTypeChecked],
    },
    {
        files: ['scripts/**', 'test/**', '*.config.*', '**/*.cjs', '**/*.mjs'],
        languageOptions: { globals: globals.node },
    },
)
