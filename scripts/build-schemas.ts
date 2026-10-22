/**
 * Generates a JSON Schema (draft-07) for every file in data/ from the zod schemas in
 * src/schemas/, so the schemas can't drift from the types. Run with `pnpm build:schemas`;
 * `pnpm check` fails when the committed schemas are out of date.
 *
 * Every exported `fooSchema` becomes the definition `Foo`. Descriptions are the JSDoc comments
 * in src/schemas/, read with the TypeScript compiler: the same text editors show on hover.
 */
import { writeFileSync } from 'node:fs'
import ts from 'typescript'
import { z } from 'zod'
import * as schemas from '../src/schemas/index.ts'

const SITE = 'https://pieterjanscheir.github.io/belgica'
const ENTRY = 'src/schemas/index.ts'

interface JsonSchema {
    description?: string
    properties?: Record<string, JsonSchema>
    items?: JsonSchema | JsonSchema[]
    additionalProperties?: JsonSchema | boolean
    anyOf?: JsonSchema[]
    oneOf?: JsonSchema[]
    definitions?: Record<string, JsonSchema>
    const?: unknown
}

const config = ts.readConfigFile('tsconfig.json', (path) => ts.sys.readFile(path))
const { options } = ts.parseJsonConfigFileContent(config.config, ts.sys, '.')
const program = ts.createProgram([ENTRY], options)
const checker = program.getTypeChecker()
const entry = program.getSourceFile(ENTRY)
const moduleSymbol = entry && checker.getSymbolAtLocation(entry)
if (!moduleSymbol) throw new Error(`Can't read ${ENTRY}`)
const exported = new Map(
    checker.getExportsOfModule(moduleSymbol).map((symbol) => {
        const target =
            symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol
        return [symbol.name, target]
    }),
)

const docOf = (symbol: ts.Symbol | undefined) =>
    ts
        .displayPartsToString(symbol?.getDocumentationComment(checker))
        .replace(/\s*\n\s*/g, ' ')
        .trim()

const describe = (node: JsonSchema, doc: string) => {
    if (doc && node.description === undefined) node.description = doc
}

/** Copies the JSDoc of each property of `type` onto the matching JSON Schema property */
function annotate(node: JsonSchema, type: ts.Type): void {
    const self = checker.getNonNullableType(type)
    for (const branch of node.anyOf ?? node.oneOf ?? []) {
        const members = self.isUnion() ? self.types : [self]
        const member = members.find((m) =>
            Object.entries(branch.properties ?? {}).every(([key, value]) => {
                const property = m.getProperty(key)
                if (!property) return false
                const t = checker.getTypeOfSymbol(property)
                return value.const === undefined || (t.isLiteral() && t.value === value.const)
            }),
        )
        if (member) annotate(branch, member)
    }
    for (const [key, child] of Object.entries(node.properties ?? {})) {
        const property = self.getProperty(key)
        if (!property) continue
        describe(child, docOf(property))
        annotate(child, checker.getTypeOfSymbol(property))
    }
    if (node.items && !Array.isArray(node.items)) {
        const element = checker.getIndexTypeOfType(self, ts.IndexKind.Number)
        if (element) annotate(node.items, element)
    }
}

const registry = z.registry<{ id: string }>()
for (const [name, schema] of Object.entries(schemas)) {
    if (name.endsWith('Schema') && schema instanceof z.ZodType)
        registry.add(schema, { id: name.charAt(0).toUpperCase() + name.slice(1, -'Schema'.length) })
}

for (const [name, fileSchema] of Object.entries(schemas.dataFileSchemas)) {
    const { $schema, ...rest } = z.toJSONSchema(fileSchema, {
        target: 'draft-07',
        metadata: registry,
        // The JSON Schema `uri` format allows any scheme; the zod schema only http(s)
        override: ({ jsonSchema }) => {
            if (jsonSchema.format === 'uri') jsonSchema.pattern = '^https?://'
        },
    }) as JsonSchema & { $schema: string }
    for (const [id, definition] of Object.entries(rest.definitions ?? {})) {
        const schemaName = `${id.charAt(0).toLowerCase()}${id.slice(1)}Schema`
        describe(definition, docOf(exported.get(schemaName)))
        const type = exported.get(id)
        if (type && type.flags & ts.SymbolFlags.TypeAlias)
            annotate(definition, checker.getDeclaredTypeOfSymbol(type))
    }
    const schema = {
        $schema,
        $id: `${SITE}/schema/${name}.schema.json`,
        title: `belgica: data/${name}.json`,
        ...rest,
    }
    writeFileSync(`schema/${name}.schema.json`, JSON.stringify(schema, null, 2) + '\n')
}
