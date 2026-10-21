/**
 * The area each court covers, as the law sets it: the annex to the Judicial Code (art. 3 for
 * the police courts, art. 4 for the courts of first instance, the enterprise courts and the
 * labour courts, art. 5 for the courts of appeal and the labour courts of appeal) and art. 114
 * of the Code for the courts of assize, one per province and one for Brussels-Capital.
 *
 * The build turns each area into the cantons it holds (`cantons` on the court), and fails when
 * a court on the portal has no entry here or an entry has no court on the portal: either means
 * the law or the portal changed, and a person has to look. A justice of the peace covers its
 * canton (`canton`), so it isn't listed.
 */
export type Area =
    | { arrondissements: string[] }
    | { judicialArea: string }
    | { cantons: string[] }
    | { provinces: string[] }

const arrondissements = (...ids: string[]): Area => ({ arrondissements: ids })
const judicialArea = (id: string): Area => ({ judicialArea: id })
const provinces = (...codes: string[]): Area => ({ provinces: codes })

/** The 19 municipalities of Brussels-Capital: Statbel province code 04000 */
const BRUSSELS_CAPITAL = provinces('04000')

export const JURISDICTIONS: Record<string, Area> = {
    // Art. 3: a police court per arrondissement. Brussels has a Dutch- and a French-speaking
    // one over the capital's cantons; Halle and Vilvoorde cover the rest of the arrondissement.
    'police-court-antwerpen': arrondissements('antwerpen'),
    'police-court-limburg': arrondissements('limburg'),
    'police-court-brussel-nl': BRUSSELS_CAPITAL,
    'police-court-brussel-fr': BRUSSELS_CAPITAL,
    'police-court-halle': { cantons: ['halle', 'lennik', 'sint-genesius-rode'] },
    'police-court-vilvoorde': { cantons: ['asse', 'meise', 'vilvoorde', 'zaventem'] },
    'police-court-leuven': arrondissements('leuven'),
    'police-court-brabant-wallon': arrondissements('brabant-wallon'),
    'police-court-oost-vlaanderen': arrondissements('oost-vlaanderen'),
    'police-court-west-vlaanderen': arrondissements('west-vlaanderen'),
    'police-court-liege': arrondissements('liege'),
    'police-court-eupen': arrondissements('eupen'),
    'police-court-luxembourg': arrondissements('luxembourg'),
    'police-court-namur': arrondissements('namur'),
    'police-court-hainaut': arrondissements('hainaut'),

    // Art. 4: a court of first instance per arrondissement, Brussels split by language
    'court-of-first-instance-antwerpen': arrondissements('antwerpen'),
    'court-of-first-instance-limburg': arrondissements('limburg'),
    'court-of-first-instance-brussel-nl': arrondissements('brussel'),
    'court-of-first-instance-brussel-fr': arrondissements('brussel'),
    'court-of-first-instance-leuven': arrondissements('leuven'),
    'court-of-first-instance-brabant-wallon': arrondissements('brabant-wallon'),
    'court-of-first-instance-oost-vlaanderen': arrondissements('oost-vlaanderen'),
    'court-of-first-instance-west-vlaanderen': arrondissements('west-vlaanderen'),
    'court-of-first-instance-liege': arrondissements('liege'),
    'court-of-first-instance-eupen': arrondissements('eupen'),
    'court-of-first-instance-luxembourg': arrondissements('luxembourg'),
    'court-of-first-instance-namur': arrondissements('namur'),
    'court-of-first-instance-hainaut': arrondissements('hainaut'),

    // Art. 4: enterprise and labour courts, some over several arrondissements
    'enterprise-court-antwerpen': arrondissements('antwerpen', 'limburg'),
    'enterprise-court-gent': arrondissements('oost-vlaanderen', 'west-vlaanderen'),
    'enterprise-court-leuven': arrondissements('leuven'),
    'enterprise-court-brussel-nl': arrondissements('brussel'),
    'enterprise-court-brussel-fr': arrondissements('brussel'),
    'enterprise-court-brabant-wallon': arrondissements('brabant-wallon'),
    'enterprise-court-liege': arrondissements('liege', 'luxembourg', 'namur'),
    'enterprise-court-eupen': arrondissements('eupen'),
    'enterprise-court-hainaut': arrondissements('hainaut'),
    'labour-court-antwerpen': arrondissements('antwerpen', 'limburg'),
    'labour-court-gent': arrondissements('oost-vlaanderen', 'west-vlaanderen'),
    'labour-court-leuven': arrondissements('leuven'),
    'labour-court-brussel-nl': arrondissements('brussel'),
    'labour-court-brussel-fr': arrondissements('brussel'),
    'labour-court-brabant-wallon': arrondissements('brabant-wallon'),
    'labour-court-liege': arrondissements('liege', 'luxembourg', 'namur'),
    'labour-court-eupen': arrondissements('eupen'),
    'labour-court-hainaut': arrondissements('hainaut'),

    // Art. 5: a court of appeal and a labour court of appeal per judicial area
    'court-of-appeal-antwerpen': judicialArea('antwerpen'),
    'court-of-appeal-brussel': judicialArea('brussel'),
    'court-of-appeal-gent': judicialArea('gent'),
    'court-of-appeal-liege': judicialArea('liege'),
    'court-of-appeal-mons': judicialArea('mons'),
    'labour-court-of-appeal-antwerpen': judicialArea('antwerpen'),
    'labour-court-of-appeal-brussel': judicialArea('brussel'),
    'labour-court-of-appeal-gent': judicialArea('gent'),
    'labour-court-of-appeal-liege': judicialArea('liege'),
    'labour-court-of-appeal-mons': judicialArea('mons'),

    // Ger.W. art. 114: a court of assize per province, and one for Brussels-Capital
    'court-of-assize-antwerpen': provinces('10000'),
    'court-of-assize-limburg': provinces('70000'),
    'court-of-assize-oost-vlaanderen': provinces('40000'),
    'court-of-assize-west-vlaanderen': provinces('30000'),
    'court-of-assize-vlaams-brabant': provinces('20001'),
    'court-of-assize-brussel-hoofdstad': BRUSSELS_CAPITAL,
    'court-of-assize-brabant-wallon': provinces('20002'),
    'court-of-assize-hainaut': provinces('50000'),
    'court-of-assize-liege': provinces('60000'),
    'court-of-assize-luxembourg': provinces('80000'),
    'court-of-assize-namur': provinces('90000'),
}

export interface CantonArea {
    id: string
    arrondissement: string
    municipalities: { municipality: string }[]
}

/**
 * The ids of the cantons an area holds, in the order the cantons are listed. A canton lies in
 * one province (test/territory.test.ts), so its first municipality's province is the canton's.
 */
export function cantonsIn(
    area: Area,
    cantons: CantonArea[],
    judicialAreaOf: ReadonlyMap<string, string>,
    provinceOf: ReadonlyMap<string, string>,
): string[] {
    const holds = (canton: CantonArea): boolean => {
        if ('cantons' in area) return area.cantons.includes(canton.id)
        if ('arrondissements' in area) return area.arrondissements.includes(canton.arrondissement)
        if ('judicialArea' in area)
            return judicialAreaOf.get(canton.arrondissement) === area.judicialArea
        const province = provinceOf.get(canton.municipalities[0]?.municipality ?? '')
        return province !== undefined && area.provinces.includes(province)
    }
    return cantons.filter(holds).map((canton) => canton.id)
}

/** The canton ids an area names outright, to check against the cantons that exist */
export function namedCantons(area: Area): string[] {
    return 'cantons' in area ? area.cantons : []
}
