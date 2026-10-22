import { describe, expect, test } from 'vitest'
import { determineCompetence, type Competence } from '../src'

const GENT = { municipality: '44021' }
const MERELBEKE_MELLE = { municipality: '44088' }
const ANTWERPEN = { municipality: '11002' }
const LIEGE = { municipality: '62063' }
const VILVOORDE = { municipality: '23088' }
const ELSENE = { municipality: '21009' }

// The court ids per ground, the shape most assertions care about
const ids = (result: Competence) => result.grounds.map((g) => g.courts.map((c) => c.id))
const articles = (result: Competence) => result.grounds.map((g) => g.article)

describe('art. 624: the plaintiff chooses', () => {
    test("the defendant's domicile and the place of performance", () => {
        const result = determineCompetence({
            kind: 'general',
            court: 'court-of-first-instance',
            defendants: [MERELBEKE_MELLE],
            obligations: [LIEGE],
        })
        expect(articles(result)).toEqual([
            'Judicial Code art. 624, 1°',
            'Judicial Code art. 624, 2°',
        ])
        expect(ids(result)).toEqual([
            ['court-of-first-instance-oost-vlaanderen'],
            ['court-of-first-instance-liege'],
        ])
        expect(result.mandatory).toBe(false)
        expect(result.notes.join()).toContain('forum clause can depart')
    })

    test('two defendants in one city give one choice, not two', () => {
        const result = determineCompetence({
            kind: 'general',
            court: 'enterprise-court',
            defendants: [GENT, MERELBEKE_MELLE],
        })
        expect(result.grounds).toHaveLength(1)
    })

    test('a defendant abroad gives no Belgian court; the place of performance still does', () => {
        const result = determineCompetence({
            kind: 'general',
            court: 'court-of-first-instance',
            defendants: [{ abroad: true }],
            obligations: [ANTWERPEN],
        })
        expect(ids(result)).toEqual([['court-of-first-instance-antwerpen']])
    })

    test('4° only when no defendant has a domicile anywhere', () => {
        const served = { municipality: '21009' }
        const without = determineCompetence({
            kind: 'general',
            court: 'justice-of-the-peace',
            defendants: [{ unknown: true }],
            servedInPerson: served,
        })
        expect(articles(without)).toEqual(['Judicial Code art. 624, 4°'])
        expect(ids(without)).toEqual([['justice-of-the-peace-elsene']])

        const withDomicile = determineCompetence({
            kind: 'general',
            court: 'justice-of-the-peace',
            defendants: [{ abroad: true }],
            servedInPerson: served,
        })
        expect(withDomicile.grounds).toEqual([])
        expect(withDomicile.notes.join()).toContain('624, 4° only applies')
        expect(withDomicile.notes.join()).toContain('international jurisdiction')
    })

    test('a justice of the peace in a split city leaves the choice to the street address', () => {
        const result = determineCompetence({
            kind: 'general',
            court: 'justice-of-the-peace',
            defendants: [GENT],
        })
        expect(result.grounds[0]?.ambiguous).toBe(true)
        expect(result.grounds[0]?.courts).toHaveLength(5)
        expect(result.notes.join()).toContain('street address decides')
    })

    test('a geocoded address picks the canton', () => {
        const result = determineCompetence({
            kind: 'general',
            court: 'justice-of-the-peace',
            defendants: [{ point: [3.7268, 51.053] }],
        })
        expect(ids(result)).toEqual([['justice-of-the-peace-gent-1']])
        expect(result.grounds[0]?.ambiguous).toBe(false)
    })

    test('a postal code of two municipalities', () => {
        const result = determineCompetence({
            kind: 'general',
            court: 'police-court',
            defendants: [{ postalCode: '1040' }],
        })
        // Brussels and Etterbeek share the Brussels police courts: the code settles it
        expect(ids(result)).toEqual([['police-court-brussel-fr', 'police-court-brussel-nl']])
        expect(result.grounds[0]?.ambiguous).toBe(false)
    })
})

describe('mandatory rules', () => {
    test('art. 629, 1°: a lease goes to where the property lies, not the domicile', () => {
        const result = determineCompetence({
            kind: 'immovable-property',
            court: 'justice-of-the-peace',
            property: [ELSENE],
        })
        expect(articles(result)).toEqual(['Judicial Code art. 629, 1°'])
        expect(ids(result)).toEqual([['justice-of-the-peace-elsene']])
        expect(result.mandatory).toBe(true)
        expect(result.notes.join()).toContain('Art. 630')
    })

    test('art. 629, 1°: a property over two cantons, either part', () => {
        const result = determineCompetence({
            kind: 'immovable-property',
            court: 'justice-of-the-peace',
            property: [ELSENE, MERELBEKE_MELLE],
        })
        expect(result.grounds).toHaveLength(2)
        expect(result.notes.join()).toContain('any part will do')
    })

    test("art. 628, 15°: a farm lease by the tenant's seat, or the land when seated abroad", () => {
        expect(
            ids(
                determineCompetence({
                    kind: 'farm-lease',
                    tenantSeat: ELSENE,
                    property: MERELBEKE_MELLE,
                }),
            ),
        ).toEqual([['justice-of-the-peace-elsene']])
        expect(
            ids(
                determineCompetence({
                    kind: 'farm-lease',
                    tenantSeat: { abroad: true },
                    property: MERELBEKE_MELLE,
                }),
            ),
        ).toEqual([['justice-of-the-peace-merelbeke-melle']])
    })

    test('art. 627, 9°: employment goes to the labour court of the workplace', () => {
        const result = determineCompetence({ kind: 'employment', workplace: VILVOORDE })
        expect(result.grounds[0]?.courtType).toBe('labour-court')
        // Halle-Vilvoorde: belgica gives both Brussels language courts
        expect(ids(result)).toEqual([['labour-court-brussel-fr', 'labour-court-brussel-nl']])
    })

    test('art. 628, 14°: social security falls back to the last residence, then employment', () => {
        const insured = determineCompetence({ kind: 'social-security', insured: LIEGE })
        expect(ids(insured)).toEqual([['labour-court-liege']])

        const lastResidence = determineCompetence({
            kind: 'social-security',
            insured: { abroad: true },
            lastInBelgium: ANTWERPEN,
            lastEmployment: LIEGE,
        })
        expect(articles(lastResidence)).toEqual(['Judicial Code art. 628, 14°, 2nd para.'])
        expect(ids(lastResidence)).toEqual([['labour-court-antwerpen']])

        const lastEmployment = determineCompetence({
            kind: 'social-security',
            insured: { abroad: true },
            lastEmployment: LIEGE,
        })
        expect(articles(lastEmployment)).toEqual(['Judicial Code art. 628, 14°, 3rd para.'])
    })

    test.each([
        [
            'consumer-credit',
            { kind: 'consumer-credit', court: 'justice-of-the-peace', consumer: MERELBEKE_MELLE },
            '628, 8°',
        ],
        [
            'insurance',
            { kind: 'insurance', court: 'justice-of-the-peace', policyholder: MERELBEKE_MELLE },
            '628, 10°',
        ],
        [
            'utility-debt',
            { kind: 'utility-debt', court: 'justice-of-the-peace', defendant: MERELBEKE_MELLE },
            '628, 25°',
        ],
    ] as const)('%s goes to the consumer side', (_, claim, article) => {
        const result = determineCompetence(claim)
        expect(articles(result)).toEqual([`Judicial Code art. ${article}`])
        expect(ids(result)).toEqual([['justice-of-the-peace-merelbeke-melle']])
    })

    test("art. 628, 17°: collective debt settlement at the debtor's labour court", () => {
        expect(
            ids(determineCompetence({ kind: 'collective-debt-settlement', debtor: GENT })),
        ).toEqual([['labour-court-gent']])
    })

    test('art. 627, 3°: a partition where the succession opened', () => {
        const result = determineCompetence({ kind: 'succession', openedAt: GENT })
        expect(result.grounds[0]?.section).toBe('family')
        expect(ids(result)).toEqual([['court-of-first-instance-oost-vlaanderen']])
    })

    test('art. 628, 3°: adult protection by residence, else domicile', () => {
        expect(
            ids(
                determineCompetence({
                    kind: 'adult-protection',
                    residence: ELSENE,
                    domicile: MERELBEKE_MELLE,
                }),
            ),
        ).toEqual([['justice-of-the-peace-elsene']])
        expect(
            ids(determineCompetence({ kind: 'adult-protection', domicile: MERELBEKE_MELLE })),
        ).toEqual([['justice-of-the-peace-merelbeke-melle']])
    })

    test('art. 633, § 1: an attachment where levied, a garnishment by the debtor', () => {
        const levied = determineCompetence({
            kind: 'attachment',
            garnishment: false,
            levied: LIEGE,
            debtorDomicile: GENT,
        })
        expect(ids(levied)).toEqual([['court-of-first-instance-liege']])
        expect(levied.grounds[0]?.section).toBe('attachment')

        const garnishment = determineCompetence({
            kind: 'attachment',
            garnishment: true,
            levied: LIEGE,
            debtorDomicile: GENT,
        })
        expect(ids(garnishment)).toEqual([['court-of-first-instance-oost-vlaanderen']])

        const debtorAbroad = determineCompetence({
            kind: 'attachment',
            garnishment: true,
            levied: LIEGE,
            debtorDomicile: { abroad: true },
        })
        expect(ids(debtorAbroad)).toEqual([['court-of-first-instance-liege']])
    })
})

describe('family: art. 628, 1° and 629bis', () => {
    test('a contested divorce: last marital residence or the defendant', () => {
        const result = determineCompetence({
            kind: 'divorce',
            mutualConsent: false,
            lastMaritalResidence: LIEGE,
            defendant: GENT,
        })
        expect(ids(result)).toEqual([
            ['court-of-first-instance-liege'],
            ['court-of-first-instance-oost-vlaanderen'],
        ])
    })

    test('a divorce by mutual consent: the last marital residence, unless they agree otherwise', () => {
        const base = {
            kind: 'divorce',
            mutualConsent: true,
            lastMaritalResidence: LIEGE,
            defendant: GENT,
        } as const
        expect(ids(determineCompetence(base))).toEqual([['court-of-first-instance-liege']])
        expect(ids(determineCompetence({ ...base, agreedDomicile: ANTWERPEN }))).toEqual([
            ['court-of-first-instance-antwerpen'],
        ])
    })

    test('§ 1: a pending family case draws every new one', () => {
        const result = determineCompetence({
            kind: 'divorce',
            mutualConsent: false,
            lastMaritalResidence: LIEGE,
            pendingFamilyCourt: 'court-of-first-instance-antwerpen',
        })
        expect(articles(result)).toEqual(['Judicial Code art. 629bis, § 1'])
        expect(ids(result)).toEqual([['court-of-first-instance-antwerpen']])
        expect(() =>
            determineCompetence({
                kind: 'other-family',
                defendant: GENT,
                pendingFamilyCourt: 'nope',
            }),
        ).toThrow(RangeError)
    })

    test("§ 2: a minor's domicile, else habitual residence, else Brussels", () => {
        expect(
            ids(determineCompetence({ kind: 'minor-child', children: [{ domicile: GENT }] })),
        ).toEqual([['court-of-first-instance-oost-vlaanderen']])
        expect(
            ids(
                determineCompetence({
                    kind: 'minor-child',
                    children: [{ domicile: { abroad: true }, habitualResidence: LIEGE }],
                }),
            ),
        ).toEqual([['court-of-first-instance-liege']])
        expect(ids(determineCompetence({ kind: 'minor-child', children: [{}] }))).toEqual([
            ['court-of-first-instance-brussel-fr', 'court-of-first-instance-brussel-nl'],
        ])
    })

    test('§ 2: children living apart: the court seized first', () => {
        const result = determineCompetence({
            kind: 'minor-child',
            children: [{ domicile: GENT }, { domicile: LIEGE }],
        })
        expect(result.grounds).toHaveLength(2)
        expect(result.notes.join()).toContain('seized first')
    })

    test('§ 2/1: filiation by the child', () => {
        expect(
            articles(determineCompetence({ kind: 'filiation', child: { domicile: GENT } })),
        ).toEqual(['Judicial Code art. 629bis, § 2/1'])
        expect(ids(determineCompetence({ kind: 'filiation', child: {} }))).toHaveLength(1)
    })

    test("§§ 4 and 5: maintenance at the claimant's court too, but not to reduce it", () => {
        const claim = {
            kind: 'maintenance',
            claimant: LIEGE,
            defendant: GENT,
            lastCommonResidence: ANTWERPEN,
            reduceOrEnd: false,
        } as const
        expect(articles(determineCompetence(claim))).toEqual([
            'Judicial Code art. 629bis, § 4',
            'Judicial Code art. 629bis, § 5',
            'Judicial Code art. 629bis, § 5',
        ])
        expect(articles(determineCompetence({ ...claim, reduceOrEnd: true }))).toEqual([
            'Judicial Code art. 629bis, § 5',
            'Judicial Code art. 629bis, § 5',
        ])
    })

    test('§ 5: other family claims', () => {
        expect(ids(determineCompetence({ kind: 'other-family', defendant: GENT }))).toEqual([
            ['court-of-first-instance-oost-vlaanderen'],
        ])
    })
})
