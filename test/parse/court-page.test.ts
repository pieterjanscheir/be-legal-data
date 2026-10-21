import { describe, expect, it } from 'vitest'

import { readCourtPage } from '../../scripts/parse/court-page.ts'

const home = '<html><head><title>Vredegerecht Test | Hoven &amp; Rechtbanken</title></head></html>'
/** A contact page with one contact block holding the given phone items */
const contactPage = (...phones: string[]) => `<html><body><main>
    <div class="paragraph paragraph--type--contact">
        ${phones.map((p) => `<div class="paragraph paragraph--type--phone"><ul><li>${p}</li></ul></div>`).join('')}
    </div></main></body></html>`
const read = (...phones: string[]) =>
    readCourtPage(
        'https://www.tribunaux-rechtbanken.be/nl/vredegerecht-test',
        home,
        contactPage(...phones),
    )

describe('readCourtPage contacts', () => {
    it('reads two numbers joined by a dash or a word as two numbers', () => {
        expect(read('02 508 65 11 - 02 508 65 12').contacts.map((c) => c.value)).toEqual([
            '+3225086511',
            '+3225086512',
        ])
        expect(read('09 234 42 15 / 09 234 42 01').contacts).toHaveLength(2)
    })

    it('keeps the text around a number as its note, without the joining word', () => {
        expect(
            read('09 234 42 15 en 09 234 42 01 (secretariaat eerste voorzitter)').contacts,
        ).toEqual([
            { type: 'phone', value: '+3292344215', note: 'secretariaat eerste voorzitter' },
            { type: 'phone', value: '+3292344201', note: 'secretariaat eerste voorzitter' },
        ])
        expect(read('+32 2 682 05 28 druk 1').contacts[0]?.note).toBe('druk 1')
    })

    it('keeps a slash inside a number', () => {
        expect(read('02/682.07.86.').contacts.map((c) => c.value)).toEqual(['+3226820786'])
    })

    it('reports what it cannot read', () => {
        const page = read('+32 682 05 28 druk 7')
        expect(page.contacts).toEqual([])
        expect(page.unreadable).toEqual(['phone: +32 682 05 28 druk 7'])
    })
})
