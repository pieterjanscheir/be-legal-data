import { readdirSync, readFileSync } from 'node:fs'
import { Ajv } from 'ajv'
import addFormats from 'ajv-formats'
import { describe, expect, it } from 'vitest'

const read = (path: string) => JSON.parse(readFileSync(path, 'utf8'))
interface Resource {
    name: string
    path: string
    jsonSchema: string
    sources: { title: string; path?: string }[]
    lastReviewed: string
    reviewEveryMonths: number
}

const pkg: { resources: Resource[] } = read('datapackage.json')
const dataFiles = readdirSync('data').filter((f) => f.endsWith('.json'))

describe('JSON Schemas', () => {
    const ajv = new Ajv({ allErrors: true, strict: true })
    addFormats.default(ajv)

    it.each(dataFiles)('data/%s matches its schema', (file) => {
        const validate = ajv.compile(read(`schema/${file.replace('.json', '.schema.json')}`))
        const valid = validate(read(`data/${file}`))
        expect(validate.errors?.slice(0, 5) ?? [], file).toEqual([])
        expect(valid).toBe(true)
    })
})

describe('datapackage.json', () => {
    it('describes every data file, and only those', () => {
        const paths = pkg.resources.map((r) => r.path).sort()
        expect(paths).toEqual(dataFiles.map((f) => `data/${f}`).sort())
    })

    it.each(pkg.resources.map((r: Resource) => [r.name, r] as [string, Resource]))(
        '%s has a schema, a source and a review policy',
        (_name: string, r: Resource) => {
            expect(dataFiles).toContain(r.path.replace('data/', ''))
            expect(() => read(r.jsonSchema)).not.toThrow()
            expect(r.sources.length).toBeGreaterThan(0)
            expect(r.lastReviewed).toMatch(/^\d{4}-\d{2}-\d{2}$/)
            expect(r.reviewEveryMonths).toBeGreaterThan(0)
        },
    )
})
