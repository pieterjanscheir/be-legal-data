import { getCourt, type Court, type CourtType, type OnDay } from '../../../src/index'
import { isInBelgium, isKnown, resolvePlace, type Place } from './places'

/**
 * Territorial competence (territoriale bevoegdheid) under the Judicial Code, art. 624 to 633,
 * as consolidated on Justel on 22 October 2026. Which court type hears the claim (subject-matter
 * competence) is the caller's input where the claim doesn't fix it: the justice of the peace up
 * to €5,000, for example, is art. 590 and not this module's question.
 *
 * Belgian international jurisdiction is assumed: a claim against a defendant abroad goes
 * through Brussels Ia or the Code of Private International Law first.
 */

/** A section of the court of first instance; the data has the court, not its sections */
export type Section = 'family' | 'attachment'

export type Claim =
    /** Art. 624: any claim the law gives no specific court for */
    | {
          kind: 'general'
          court: CourtType
          /** Each defendant's domicile */
          defendants: Place[]
          /** Where the obligations in dispute arose, or are, were or must be performed */
          obligations?: Place[]
          /** The domicile elected for the performance of the deed */
          electedDomicile?: Place
          /** Where the bailiff spoke to the defendant in person */
          servedInPerson?: Place
      }
    /**
     * Art. 629, 1°: rights in rem in immovable property and the matters of art. 591, 1° to 6°,
     * 9° to 13°, 18° and 20°, among them the lease of a property (art. 591, 1°); not farm leases
     */
    | { kind: 'immovable-property'; court: CourtType; property: Place[] }
    /** Art. 628, 15°: farm leases (pacht), before the justice of the peace */
    | { kind: 'farm-lease'; tenantSeat: Place; property: Place }
    /** Art. 627, 9°: disputes of art. 578 (employment) and 582, 3°, 4° and 15° */
    | { kind: 'employment'; workplace: Place }
    /** Art. 628, 14°: social security disputes of art. 579 to 583 */
    | {
          kind: 'social-security'
          insured: Place
          /** The last residence or domicile in Belgium, when the insured has none any more */
          lastInBelgium?: Place
          /** The last place of employment in Belgium, when there was never a residence */
          lastEmployment?: Place
      }
    /** Art. 628, 8°: consumer credit, payment facilities and sureties for it */
    | { kind: 'consumer-credit'; court: CourtType; consumer: Place }
    /** Art. 628, 10°: insurance contracts (not marine insurance or work accidents) */
    | { kind: 'insurance'; court: CourtType; policyholder: Place }
    /** Art. 628, 25°: a utility or telecom provider's claim for payment against a consumer */
    | { kind: 'utility-debt'; court: CourtType; defendant: Place }
    /** Art. 628, 17°: collective debt settlement, before the labour court */
    | { kind: 'collective-debt-settlement'; debtor: Place }
    /** Art. 627, 3°: partition, and claims between co-heirs or legatees until the partition */
    | { kind: 'succession'; openedAt: Place }
    /** Art. 628, 3°: a protection measure for an adult (art. 490/1 to 490/2, 492/1 Civil Code) */
    | { kind: 'adult-protection'; residence?: Place; domicile?: Place }
    /**
     * Art. 633, § 1: attachments and enforcement, before the attachment judge. A garnishment
     * (beslag onder derden) goes by the debtor's domicile; anything else by where it's levied.
     */
    | { kind: 'attachment'; garnishment: boolean; levied: Place; debtorDomicile?: Place }
    /** Art. 628, 1°, subject to art. 629bis: divorce or separation from bed and board */
    | {
          kind: 'divorce'
          mutualConsent: boolean
          lastMaritalResidence?: Place
          defendant?: Place
          /** Mutual consent: the current domicile whose court the spouses agreed on */
          agreedDomicile?: Place
          pendingFamilyCourt?: string
      }
    /** Art. 629bis, § 2: parental authority, residence arrangements and maintenance of a minor */
    | {
          kind: 'minor-child'
          children: { domicile?: Place; habitualResidence?: Place }[]
          pendingFamilyCourt?: string
      }
    /** Art. 629bis, § 2/1: filiation */
    | { kind: 'filiation'; child: { domicile?: Place; habitualResidence?: Place } }
    /** Art. 629bis, §§ 4 and 5: maintenance between (former) spouses or cohabitants */
    | {
          kind: 'maintenance'
          claimant: Place
          defendant: Place
          lastCommonResidence?: Place
          /** A claim to reduce or end the maintenance can't go to the claimant's court */
          reduceOrEnd: boolean
          pendingFamilyCourt?: string
      }
    /** Art. 629bis, § 5: any other family claim between (former) spouses or cohabitants */
    | {
          kind: 'other-family'
          defendant: Place
          lastCommonResidence?: Place
          pendingFamilyCourt?: string
      }

export interface Ground {
    /** The provision, as cited: 'Judicial Code art. 624, 1°' */
    article: string
    /** What the place is, in a few words */
    basis: string
    place: Place
    courtType: CourtType
    section?: Section
    courts: Court[]
    /** The place doesn't settle the court: the street address decides */
    ambiguous: boolean
}

export interface Competence {
    /**
     * The competent courts, one ground per place. More than one: the plaintiff chooses
     * (art. 624), or the law gives alternatives (art. 629bis, § 4)
     */
    grounds: Ground[]
    /**
     * A rule of art. 627, 628, 629 or 629bis applies: art. 630 voids a forum clause agreed
     * before the dispute arose
     */
    mandatory: boolean
    notes: string[]
}

const BRUSSELS: Place = { municipality: '21004' }
const CODE = 'Judicial Code art.'

/** The territorially competent courts for a claim on a day (today by default) */
export function determineCompetence(claim: Claim, options: OnDay = {}): Competence {
    const result = rules(claim, options)
    const notes = [...result.notes]
    if (result.grounds.length === 0)
        notes.push('No connecting factor in Belgium: check international jurisdiction first.')
    if (result.grounds.some((g) => g.ambiguous))
        notes.push('A place in a split city or shared postal code: the street address decides.')
    if (result.grounds.some((g) => g.section))
        notes.push('The court of first instance is given as a whole; the section hears the claim.')
    notes.push(
        'Which division of the court sits is set by royal decree and is not in the data.',
        result.mandatory ?
            'Art. 630: a forum clause agreed before the dispute is void; a defendant who does not appear is presumed to contest competence.'
        :   'A forum clause can depart from art. 624, unless another law (consumer law, for one) forbids it.',
    )
    return { ...result, notes }
}

interface RuleResult {
    grounds: Ground[]
    mandatory: boolean
    notes: string[]
}

function rules(claim: Claim, options: OnDay): RuleResult {
    // Builds a ground for a place in Belgium; a place abroad or unknown gives none
    const at = (
        article: string,
        basis: string,
        place: Place | undefined,
        courtType: CourtType,
        section?: Section,
    ): Ground[] => {
        if (!isInBelgium(place)) return []
        const { courts, ambiguous } = resolvePlace(place, courtType, options)
        return [
            {
                article: `${CODE} ${article}`,
                basis,
                place,
                courtType,
                ...(section && { section }),
                courts,
                ambiguous,
            },
        ]
    }
    const mandatory = (grounds: Ground[], notes: string[] = []): RuleResult => ({
        grounds,
        mandatory: true,
        notes,
    })
    const family = 'court-of-first-instance'

    switch (claim.kind) {
        case 'general': {
            const grounds = [
                ...claim.defendants.flatMap((p) =>
                    at('624, 1°', "a defendant's domicile", p, claim.court),
                ),
                ...(claim.obligations ?? []).flatMap((p) =>
                    at('624, 2°', 'where the obligation arose or is performed', p, claim.court),
                ),
                ...at('624, 3°', 'the elected domicile', claim.electedDomicile, claim.court),
            ]
            const notes: string[] = []
            // 4° only when no defendant has a domicile, in Belgium or abroad
            if (claim.defendants.every((p) => !isKnown(p))) {
                grounds.push(
                    ...at(
                        '624, 4°',
                        'where the bailiff spoke to the defendant in person',
                        claim.servedInPerson,
                        claim.court,
                    ),
                )
            } else if (claim.servedInPerson) {
                notes.push('Art. 624, 4° only applies when no defendant has a domicile anywhere.')
            }
            return { grounds: dedupe(grounds), mandatory: false, notes }
        }
        case 'immovable-property':
            return mandatory(
                claim.property.flatMap((p) =>
                    at('629, 1°', 'where the property, or a part of it, lies', p, claim.court),
                ),
                claim.property.length > 1 ?
                    ['A property over several cantons or arrondissements: any part will do.']
                :   [],
            )
        case 'farm-lease':
            return mandatory(
                isInBelgium(claim.tenantSeat) ?
                    at('628, 15°', "the tenant's seat", claim.tenantSeat, 'justice-of-the-peace')
                :   at(
                        '628, 15°',
                        'where the leased property lies (tenant seated abroad)',
                        claim.property,
                        'justice-of-the-peace',
                    ),
            )
        case 'employment':
            return mandatory(at('627, 9°', 'the place of work', claim.workplace, 'labour-court'))
        case 'social-security': {
            const [article, basis, place] =
                isInBelgium(claim.insured) ? ['628, 14°', "the insured's domicile", claim.insured]
                : isInBelgium(claim.lastInBelgium) ?
                    [
                        '628, 14°, 2nd para.',
                        'the last residence or domicile in Belgium',
                        claim.lastInBelgium,
                    ]
                :   [
                        '628, 14°, 3rd para.',
                        'the last place of employment in Belgium',
                        claim.lastEmployment,
                    ]
            return mandatory(at(article, basis, place, 'labour-court'))
        }
        case 'consumer-credit':
            return mandatory(at('628, 8°', "the consumer's domicile", claim.consumer, claim.court))
        case 'insurance':
            return mandatory(
                at('628, 10°', "the policyholder's domicile", claim.policyholder, claim.court),
            )
        case 'utility-debt':
            return mandatory(
                at('628, 25°', "the defendant's domicile", claim.defendant, claim.court),
            )
        case 'collective-debt-settlement':
            return mandatory(
                at('628, 17°', "the debtor's domicile at filing", claim.debtor, 'labour-court'),
            )
        case 'succession':
            return mandatory(
                at('627, 3°', 'where the succession opened', claim.openedAt, family, 'family'),
            )
        case 'adult-protection': {
            const residence = isInBelgium(claim.residence)
            return mandatory(
                at(
                    '628, 3°',
                    residence ? 'the residence of the person to protect' : 'their domicile',
                    residence ? claim.residence : claim.domicile,
                    'justice-of-the-peace',
                ),
                ['The law names "a judge of the arrondissement" of that place.'],
            )
        }
        case 'attachment': {
            if (!claim.garnishment)
                return mandatory(
                    at(
                        '633, § 1',
                        'where the attachment is levied',
                        claim.levied,
                        family,
                        'attachment',
                    ),
                )
            return mandatory(
                isInBelgium(claim.debtorDomicile) ?
                    at(
                        '633, § 1, 2nd para.',
                        "the attached debtor's domicile",
                        claim.debtorDomicile,
                        family,
                        'attachment',
                    )
                :   at(
                        '633, § 1, 2nd para.',
                        'where the attachment is enforced (debtor abroad or unknown)',
                        claim.levied,
                        family,
                        'attachment',
                    ),
            )
        }
        case 'divorce': {
            const pending = pendingCase(claim.pendingFamilyCourt, options)
            if (pending) return mandatory(pending)
            if (!claim.mutualConsent)
                return mandatory(
                    dedupe([
                        ...at(
                            '628, 1°',
                            'the last marital residence',
                            claim.lastMaritalResidence,
                            family,
                            'family',
                        ),
                        ...at(
                            '628, 1°',
                            "the defendant's domicile",
                            claim.defendant,
                            family,
                            'family',
                        ),
                    ]),
                )
            return mandatory(
                isInBelgium(claim.agreedDomicile) ?
                    at(
                        '628, 1°',
                        'the current domicile the spouses agreed on',
                        claim.agreedDomicile,
                        family,
                        'family',
                    )
                :   at(
                        '628, 1°',
                        'the last marital residence',
                        claim.lastMaritalResidence,
                        family,
                        'family',
                    ),
            )
        }
        case 'minor-child': {
            const pending = pendingCase(claim.pendingFamilyCourt, options)
            if (pending) return mandatory(pending)
            const grounds = dedupe(
                claim.children.flatMap((child) => childGround('629bis, § 2', child)),
            )
            return mandatory(
                grounds.length > 0 ?
                    grounds
                :   at(
                        '629bis, § 2',
                        'no domicile or habitual residence: Brussels',
                        BRUSSELS,
                        family,
                        'family',
                    ),
                grounds.length > 1 ?
                    [
                        'Children with different domiciles: the court seized first hears all claims (art. 629bis, § 2, 3rd para.).',
                    ]
                :   [],
            )
        }
        case 'filiation': {
            const grounds = childGround('629bis, § 2/1', claim.child)
            return mandatory(
                grounds.length > 0 ?
                    grounds
                :   at(
                        '629bis, § 2/1',
                        'no domicile or habitual residence: Brussels',
                        BRUSSELS,
                        family,
                        'family',
                    ),
            )
        }
        case 'maintenance': {
            const pending = pendingCase(claim.pendingFamilyCourt, options)
            if (pending) return mandatory(pending)
            return mandatory(
                dedupe([
                    ...(claim.reduceOrEnd ?
                        []
                    :   at(
                            '629bis, § 4',
                            "the claimant's domicile",
                            claim.claimant,
                            family,
                            'family',
                        )),
                    ...fivePara(claim.defendant, claim.lastCommonResidence),
                ]),
            )
        }
        case 'other-family': {
            const pending = pendingCase(claim.pendingFamilyCourt, options)
            if (pending) return mandatory(pending)
            return mandatory(dedupe(fivePara(claim.defendant, claim.lastCommonResidence)))
        }
    }

    function childGround(
        article: string,
        child: { domicile?: Place; habitualResidence?: Place },
    ): Ground[] {
        return isInBelgium(child.domicile) ?
                at(article, "the child's domicile", child.domicile, family, 'family')
            :   at(
                    article,
                    "the child's habitual residence",
                    child.habitualResidence,
                    family,
                    'family',
                )
    }

    function fivePara(defendant: Place, lastCommonResidence: Place | undefined): Ground[] {
        return [
            ...at('629bis, § 5', "the defendant's domicile", defendant, family, 'family'),
            ...at(
                '629bis, § 5',
                'the last marital or common residence',
                lastCommonResidence,
                family,
                'family',
            ),
        ]
    }
}

// Art. 629bis, § 1: a family case already pending between the parties draws the new one
function pendingCase(courtId: string | undefined, options: OnDay): Ground[] | undefined {
    if (courtId === undefined) return undefined
    const court = getCourt(courtId, options)
    if (!court) throw new RangeError(`Unknown court: ${courtId}`)
    return [
        {
            article: `${CODE} 629bis, § 1`,
            basis: 'the family court where a case between the parties is pending',
            place: { unknown: true },
            courtType: court.type,
            section: 'family',
            courts: [court],
            ambiguous: false,
        },
    ]
}

// The same provision leading to the same courts twice (two defendants in one city) is one
// choice
function dedupe(grounds: Ground[]): Ground[] {
    const seen = new Set<string>()
    return grounds.filter((g) => {
        const key = `${g.article} ${g.courts.map((c) => c.id).join()}`
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
}
