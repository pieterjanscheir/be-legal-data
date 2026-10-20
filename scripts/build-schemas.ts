/**
 * Generates a JSON Schema (draft-07) for every file in data/ from the TypeScript types in src/,
 * so the schemas can't drift from the types. Run with `pnpm build:schemas`; `pnpm check` fails
 * when the committed schemas are out of date.
 */
import { writeFileSync } from 'node:fs'
import { createGenerator } from 'ts-json-schema-generator'

const SITE = 'https://pieterjanscheir.github.io/be-legal-data'

export const files = {
    'judicial-areas': 'JudicialAreasFile',
    arrondissements: 'ArrondissementsFile',
    cantons: 'CantonsFile',
    municipalities: 'MunicipalitiesFile',
    courts: 'CourtsFile',
    prisons: 'PrisonsFile',
    'houses-of-justice': 'HousesOfJusticeFile',
    'interest-rates': 'InterestRatesFile',
} as const

const generator = createGenerator({
    path: 'scripts/schema-types.ts',
    tsconfig: 'tsconfig.json',
    skipTypeCheck: true,
    additionalProperties: false,
})

for (const [name, type] of Object.entries(files)) {
    const { $schema, ...rest } = generator.createSchema(type)
    const schema = {
        $schema,
        $id: `${SITE}/schema/${name}.schema.json`,
        title: `be-legal-data: data/${name}.json`,
        ...rest,
    }
    writeFileSync(`schema/${name}.schema.json`, JSON.stringify(schema, null, 2) + '\n')
}
