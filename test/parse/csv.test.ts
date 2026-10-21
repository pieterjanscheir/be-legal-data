import { describe, expect, it } from 'vitest'

import { tables, toCsv } from '../../scripts/build-csv.ts'

describe('toCsv', () => {
    it('quotes what needs quoting, as RFC 4180 says, after a byte order mark', () => {
        expect(toCsv([{ a: 'x,y', b: 'say "hi"', c: undefined, d: 1 }])).toBe(
            '﻿a,b,c,d\r\n"x,y","say ""hi""",,1\r\n',
        )
    })

    it('takes the columns of every row', () => {
        expect(toCsv([{ a: 1 }, { b: 2 }])).toBe('﻿a,b\r\n1,\r\n,2\r\n')
    })
})

describe('tables', () => {
    it('has a row for every record', () => {
        expect(tables['courts']).toHaveLength(347)
        expect(tables['cantons']).toHaveLength(162)
        for (const [name, rows] of Object.entries(tables))
            expect(rows.length, name).toBeGreaterThan(0)
    })
})
