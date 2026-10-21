import { describe, expect, it } from 'vitest'

import { clean, toAddress, toE164, toEmail, toIban } from '../../scripts/parse/normalize.ts'

describe('toE164', () => {
    it.each([
        ['02/682.07.86.', '+3226820786'],
        ['+32 2 682 05 44', '+3226820544'],
        ['09 234 65 00', '+3292346500'],
        ['0032 53 82 07 01', '+3253820701'],
        ['0470 12 34 56', '+32470123456'],
    ])('%j → %s', (text, expected) => {
        expect(toE164(text)).toBe(expected)
    })

    it.each(['', '12345', '02 682 05', '+31 20 123 4567', '0470 12 34 5', '02 682 05 44 +1'])(
        'refuses %j',
        (text) => {
            expect(toE164(text)).toBeUndefined()
        },
    )
})

describe('toIban', () => {
    it('accepts a valid Belgian IBAN, with or without spaces', () => {
        expect(toIban('BE13 6792 0088 1239')).toBe('BE13679200881239')
    })
    it('refuses a wrong checksum or another country', () => {
        expect(toIban('BE14 6792 0088 1239')).toBeUndefined()
        expect(toIban('NL91ABNA0417164300')).toBeUndefined()
    })
})

describe('toEmail', () => {
    it('lowercases and strips mailto', () => {
        expect(toEmail('mailto:Vred.Gent1@just.fgov.be')).toBe('vred.gent1@just.fgov.be')
    })
    it('refuses what is not an email', () => {
        expect(toEmail('griffie')).toBeUndefined()
    })
})

describe('toAddress', () => {
    it('reads postal code and city on separate lines', () => {
        expect(toAddress(['Bolivarplaats 20 b19', '2000', 'Antwerpen'])).toEqual({
            street: 'Bolivarplaats 20 b19',
            postalCode: '2000',
            city: 'Antwerpen',
        })
    })
    it('reads a building line, and postal code and city on one line', () => {
        expect(toAddress(['Gerechtsgebouw', 'Kazernevest 3', '8000 Brugge'])).toEqual({
            building: 'Gerechtsgebouw',
            street: 'Kazernevest 3',
            postalCode: '8000',
            city: 'Brugge',
        })
    })
    it('keeps the street line as published', () => {
        expect(
            toAddress(['Beverstraat 7B (eerste verdieping)', '9700', 'Oudenaarde'])?.street,
        ).toBe('Beverstraat 7B (eerste verdieping)')
    })
    it('drops the postal code and city repeated on the street line', () => {
        expect(
            toAddress(['Dr. André Sierenstraat 16 bus 3/C, 9300 Aalst', '9300', 'Aalst'])?.street,
        ).toBe('Dr. André Sierenstraat 16 bus 3/C')
    })
    it('refuses lines without a postal code, or a sentence for a street', () => {
        expect(toAddress(['Voor het adres verwijzen we naar de afdelingen'])).toBeUndefined()
        expect(toAddress(['7000', 'Mons'])).toBeUndefined()
        expect(
            toAddress([
                'Nos différentes adresses sont précisées dans la rubrique "Greffes & Services"',
                '1400',
                'Nivelles',
            ]),
        ).toBeUndefined()
    })
})

describe('clean', () => {
    it('removes soft hyphens and collapses whitespace', () => {
        expect(clean(' Ondernemings­rechtbank   Gent ')).toBe('Ondernemingsrechtbank Gent')
    })
})

describe('toE164 and the Liège area code', () => {
    it('reads 04 numbers as landlines, 045x–049x as mobiles', () => {
        expect(toE164('04 232 56 16')).toBe('+3242325616')
        expect(toE164('0495 12 34 56')).toBe('+32495123456')
        expect(toE164('0495 12 34 5')).toBeUndefined()
    })
})
