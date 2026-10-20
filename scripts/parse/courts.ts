/**
 * Builds the courts from the snapshots of tribunaux-rechtbanken.be.
 *
 * Every court and division has its own page, in the language of the court; a bilingual court
 * (Brussels) has a page in each language, and the pages merge into one record. Ids follow the
 * rule in docs/guide/identifiers.md: the type, then the place in the court's own language, with
 * Dutch for Brussels; a division adds its own place.
 */
import { readFileSync } from 'node:fs'

import { toId } from '../id.ts'
import { isCourtPage } from '../sources/catalog.ts'
import { Snapshots } from '../sources/store.ts'
import { readCourtPage, type Contact, type CourtPage } from './court-page.ts'
import type { Address } from './normalize.ts'
import { toOpeningHours } from './opening-hours.ts'

type Lang = 'nl' | 'fr' | 'de'

export type CourtType =
    | 'justice-of-the-peace'
    | 'police-court'
    | 'court-of-first-instance'
    | 'enterprise-court'
    | 'labour-court'
    | 'court-of-appeal'
    | 'labour-court-of-appeal'
    | 'court-of-assize'

export interface Court {
    id: string
    type: CourtType
    kind: 'court' | 'division' | 'seat'
    court?: string
    name: Partial<Record<Lang, string>>
    judicialArea: string
    arrondissement?: string
    canton?: string
    ecli?: string[]
    address?: Address
    contacts: Contact[]
    openingHours?: string
    openingHoursText?: Partial<Record<Lang, string>>
    website: Partial<Record<Lang, string>>
    sources: { url: string; retrieved: string }[]
}

// The name of each type, as it opens a court's name in each language
const TYPES: [CourtType, RegExp][] = [
    ['justice-of-the-peace', /^(vredegerecht|justice de paix|friedensgericht)\b/i],
    ['police-court', /^(politierechtbank|tribunal de police|polizeigericht)\b/i],
    [
        'court-of-first-instance',
        /^(rechtbank (van )?eerste aanleg|tribunal de première instance|gericht erster instanz)\b/i,
    ],
    [
        'enterprise-court',
        /^(ondernemingsrechtbank|tribunal de l'entreprise|unternehmensgericht)\b/i,
    ],
    ['labour-court', /^(arbeidsrechtbank|tribunal du travail|arbeitsgericht)\b/i],
    ['court-of-appeal', /^(hof van beroep|cour d'appel|appellationshof)\b/i],
    ['labour-court-of-appeal', /^(arbeidshof|cour du travail|arbeitsgerichtshof)\b/i],
    ['court-of-assize', /^(hof van assisen|cour d'assises|assisenhof)\b/i],
]

// The shared pages of all justices of the peace of an arrondissement aren't courts
const GROUP_PAGE = /^(vredegerechten|justices de paix|friedensgerichte)\b/i

/**
 * Place names to the form ids use: Dutch for Brussels, German in the German-speaking area,
 * where the French pages use the French name
 */
const PLACES: Record<string, string> = {
    bruxelles: 'brussel',
    'bruxelles-capitale': 'brussel-hoofdstad',
    'saint-vith': 'sankt-vith',
}

/**
 * Where the portal's own name for a justice of the peace doesn't match the canton in the
 * Judicial Code, with the canton it serves. Checked by hand against the page's address.
 */
const CANTON_ALIASES: Record<string, string> = {
    // The French page still uses the name from before the 2025 municipal mergers; same court,
    // same address (Kielenstraat 22/5, Tongeren) as Vredegerecht Tongeren-Borgloon
    'tongres-fourons': 'tongeren-borgloon',
}

/**
 * ECLI court codes found in published Belgian case law (ECLI:BE:<code>:…), per court. A court
 * that judges in both languages has a code for each. Codes not seen in published decisions are
 * left out rather than guessed. Source: the ECLI list of Belgian decisions
 * (github.com/openjusticebe/ecli, resources/IUBEL.txt) and e-justice.europa.eu.
 */
export const ECLI: Record<string, string[]> = {
    'court-of-appeal-antwerpen': ['HBANT'],
    'court-of-appeal-brussel': ['CABRL'],
    'court-of-appeal-gent': ['HBGNT'],
    'court-of-appeal-liege': ['CALIE'],
    'court-of-appeal-mons': ['CAMON'],
    'labour-court-of-appeal-antwerpen': ['AHANT'],
    'labour-court-of-appeal-brussel': ['CTBRL'],
    'labour-court-of-appeal-gent': ['AHGNT'],
    'labour-court-of-appeal-liege': ['CTLIE'],
    'labour-court-of-appeal-mons': ['CTMON'],
    'court-of-first-instance-antwerpen': ['EAANT'],
    'court-of-first-instance-brussel-nl': ['EABRL'],
    'court-of-first-instance-brussel-fr': ['PIBRL'],
    'court-of-first-instance-leuven': ['EALEU'],
    'court-of-first-instance-limburg': ['EALIM'],
    'court-of-first-instance-oost-vlaanderen': ['EAOVL'],
    'court-of-first-instance-west-vlaanderen': ['EAWVL'],
    'court-of-first-instance-brabant-wallon': ['PIBRW'],
    'court-of-first-instance-hainaut': ['PIHAI'],
    'court-of-first-instance-liege': ['PILIE'],
    'court-of-first-instance-luxembourg': ['PILUX'],
    'court-of-first-instance-namur': ['PINAM'],
    'enterprise-court-antwerpen': ['ORANT'],
    'enterprise-court-gent': ['ORGNT'],
    'enterprise-court-brussel-nl': ['ORBRL'],
    'enterprise-court-brussel-fr': ['TEBRL'],
    'enterprise-court-brabant-wallon': ['TEBRW'],
    'enterprise-court-hainaut': ['TEHAI'],
    'enterprise-court-liege': ['TELIE'],
    'labour-court-antwerpen': ['ARANT'],
    'labour-court-gent': ['ARGNT'],
    'labour-court-leuven': ['ARLEU'],
    'labour-court-brussel-nl': ['ARBRL'],
    'labour-court-brussel-fr': ['TTBRL'],
    'labour-court-brabant-wallon': ['TTBRW'],
    'labour-court-hainaut': ['TTHAI'],
    'labour-court-liege': ['TTLIE'],
    'police-court-brussel-fr': ['TPBRL'],
}

interface Named {
    id: string
    name: Partial<Record<Lang, string>>
}
interface Canton extends Named {
    arrondissement: string
    number?: number
}
interface Arrondissement extends Named {
    judicialArea: string
}
interface CantonMunicipalities {
    arrondissement: string
    municipalities: { municipality: string }[]
}

const read = (path: string): unknown => JSON.parse(readFileSync(path, 'utf8'))

const ORDINALS: Record<string, number> = {
    eerste: 1,
    tweede: 2,
    premier: 1,
    second: 2,
    deuxième: 2,
    ersten: 1,
    zweiten: 2,
}
const ROMAN: Record<string, number> = { i: 1, ii: 2, iii: 3, iv: 4, v: 5, vi: 6, vii: 7 }

/** The place and number of a justice of the peace: 'Anderlecht 1e kanton' → ['Anderlecht', 1] */
export function placeAndNumber(rest: string): [string, number | undefined] {
    let m = /^(\S+) (?:kanton|canton|kantons) (?:d'|de |von )?(.+)$/i.exec(rest)
    if (m?.[1] && m[2] && m[1].toLowerCase() in ORDINALS)
        return [m[2], ORDINALS[m[1].toLowerCase()]]
    m = /^(.+?) (\d+)(?:e|er|de|ème|ième)? (?:kanton|canton)$/i.exec(rest)
    if (m?.[1] && m[2]) return [m[1], Number(m[2])]
    m = /^(.+?) (\d+|[ivx]+)$/i.exec(rest)
    if (m?.[1] && m[2]) return [m[1], /\d/.test(m[2]) ? Number(m[2]) : ROMAN[m[2].toLowerCase()]]
    return [rest, undefined]
}

/** What the words after a court's type say: its place, its language in Brussels */
export function parseTitle(
    title: string,
):
    | { type: CourtType; place: string; split?: 'nl' | 'fr'; division?: string; seat?: string }
    | undefined {
    let name = title
    let division: string | undefined
    let seat: string | undefined
    const sub =
        /^(.*?)\s+(?:-\s+)?(afdeling|division|abteilung|siège|zetel)\s+(?:de |d')?(.+)$/i.exec(name)
    if (sub?.[1] && sub[2] && sub[3]) {
        name = sub[1].replace(/,$/, '')
        if (/^(siège|zetel)$/i.test(sub[2])) seat = sub[3]
        else division = sub[3]
    }
    let split: 'nl' | 'fr' | undefined
    if (/\b(nederlandstalige|néerlandophone)\b/i.test(name)) split = 'nl'
    if (/\b(franstalige|francophone)\b/i.test(name)) split = 'fr'
    name = name
        .replace(/\s*\b(nederlandstalige|franstalige|néerlandophone|francophone)\b\s*/gi, ' ')
        .trim()
    if (GROUP_PAGE.test(name)) return undefined
    const match = TYPES.find(([, re]) => re.test(name))
    if (!match) throw new Error(`Unknown kind of court: ${title}`)
    const [type, re] = match
    const place = name
        .replace(re, '')
        .trim()
        .replace(/^(?:(?:van het|van|du|des|der|de) +|d')/i, '')
        .replace(
            /^(l'|het )?(administratief arrondissement|arrondissement administratif|arrondissement|gerichtsbezirks?)\s+(van |de |d')?/i,
            '',
        )
        .trim()
    return {
        type,
        place,
        ...(split ? { split } : {}),
        ...(division ? { division } : {}),
        ...(seat ? { seat } : {}),
    }
}

const placeId = (place: string) => {
    const id = toId(place)
    return PLACES[id] ?? id
}

/** Courts of appeal, and enterprise and labour courts named after one, cover a judicial area */
const AREA_SEATS = new Set(['antwerpen', 'brussel', 'gent', 'liege', 'mons'])
/** Police courts in Halle and Vilvoorde lie in the judicial arrondissement of Brussels */
const ARRONDISSEMENT_OF: Record<string, string> = { halle: 'brussel', vilvoorde: 'brussel' }
/** Courts of assize are per province; these two aren't an arrondissement */
const ASSIZE_AREAS: Record<string, string> = {
    'brussel-hoofdstad': 'brussel',
    'vlaams-brabant': 'brussel',
}

export interface Report {
    unreadable: string[]
    unmatched: string[]
    conflicts: string[]
    cantonsWithoutCourt: string[]
}

export function buildCourts(root: string, dataDir = 'data'): { courts: Court[]; report: Report } {
    const snapshots = new Snapshots(root, 'courts')
    const cantons = read(`${dataDir}/cantons.json`) as Canton[]
    const arrondissements = read(`${dataDir}/arrondissements.json`) as Arrondissement[]
    const report: Report = { unreadable: [], unmatched: [], conflicts: [], cantonsWithoutCourt: [] }

    const cantonByName = new Map<string, Canton>()
    for (const c of cantons) {
        for (const name of Object.values(c.name))
            cantonByName.set(`${toId(name)}|${c.number ?? ''}`, c)
    }
    const arrondissementIds = new Set(arrondissements.map((a) => a.id))
    // A division sits in a municipality of its name: Brugge, Tongeren-Borgloon, La Louvière
    const municipalities = read(`${dataDir}/municipalities.json`) as Named[]
    const arrondissementOfMunicipality = new Map<string, string>()
    for (const c of read(`${dataDir}/cantons.json`) as CantonMunicipalities[])
        for (const { municipality } of c.municipalities)
            arrondissementOfMunicipality.set(municipality, c.arrondissement)
    const arrondissementByPlace = new Map<string, string>()
    for (const m of municipalities) {
        const arrondissement = arrondissementOfMunicipality.get(m.id)
        if (arrondissement)
            for (const name of Object.values(m.name))
                arrondissementByPlace.set(toId(name), arrondissement)
    }
    const areaOf = new Map(arrondissements.map((a) => [a.id, a.judicialArea]))

    const drafts = new Map<string, { court: Court; pages: CourtPage[] }>()
    const add = (court: Court, page?: CourtPage) => {
        const draft = drafts.get(court.id)
        if (!draft) drafts.set(court.id, { court, pages: page ? [page] : [] })
        else if (page) draft.pages.push(page)
    }

    for (const entry of snapshots.entries()) {
        if (!isCourtPage(entry.url)) continue
        const contactUrl = entry.url + '/contact'
        const home = snapshots.text(entry.url)
        const contact = snapshots.text(contactUrl)
        if (home === undefined || contact === undefined) continue
        const page = readCourtPage(entry.url, home, contact)
        report.unreadable.push(...page.unreadable.map((u) => `${entry.url}: ${u}`))
        const parsed = parseTitle(page.title)
        if (!parsed) continue

        let id: string
        let canton: Canton | undefined
        let arrondissement: string | undefined
        let judicialArea: string | undefined
        if (parsed.type === 'justice-of-the-peace') {
            const [place, number] = placeAndNumber(parsed.place)
            const alias = CANTON_ALIASES[toId(place)]
            canton =
                alias ?
                    cantons.find((c) => c.id === alias)
                :   cantonByName.get(`${toId(place)}|${number ?? ''}`)
            if (!canton) {
                report.unmatched.push(`${entry.url}: no canton "${parsed.place}"`)
                continue
            }
            id = `justice-of-the-peace-${canton.id}`
            arrondissement = canton.arrondissement
        } else {
            const place = placeId(parsed.place)
            id = `${parsed.type}-${place}${parsed.split ? `-${parsed.split}` : ''}`
            if (parsed.type === 'court-of-appeal' || parsed.type === 'labour-court-of-appeal') {
                judicialArea = place
            } else if (parsed.type === 'court-of-assize' && place in ASSIZE_AREAS) {
                judicialArea = ASSIZE_AREAS[place]
            } else if (
                (parsed.type === 'enterprise-court' || parsed.type === 'labour-court') &&
                AREA_SEATS.has(place) &&
                place !== 'brussel'
            ) {
                judicialArea = place
            } else {
                arrondissement = ARRONDISSEMENT_OF[place] ?? place
            }
        }
        if (arrondissement && !arrondissementIds.has(arrondissement)) {
            report.unmatched.push(`${entry.url}: no arrondissement "${arrondissement}"`)
            continue
        }
        judicialArea ??= arrondissement ? areaOf.get(arrondissement) : undefined
        if (!judicialArea) {
            report.unmatched.push(`${entry.url}: no judicial area for "${parsed.place}"`)
            continue
        }

        const base = {
            type: parsed.type,
            judicialArea,
            ...(arrondissement ? { arrondissement } : {}),
            ...(canton ? { canton: canton.id } : {}),
            contacts: [],
            website: {},
            sources: [],
        }
        const sub = parsed.division ?? parsed.seat
        if (sub) {
            const parentId = id
            const parentName = page.title.replace(
                /\s+(?:-\s+)?(afdeling|division|abteilung|siège|zetel)\s+.*$/i,
                '',
            )
            add({ ...base, id: parentId, kind: 'court', name: { [page.lang]: parentName } })
            id = `${parentId}-${placeId(sub)}`
            const where = arrondissementByPlace.get(toId(sub))
            if (!where) {
                report.unmatched.push(`${entry.url}: no municipality "${sub}"`)
                continue
            }
            if (arrondissement && where !== arrondissement)
                report.conflicts.push(`${id}: in ${where}, but its court is in ${arrondissement}`)
            add(
                {
                    ...base,
                    arrondissement: where,
                    id,
                    kind: parsed.seat ? 'seat' : 'division',
                    court: parentId,
                    name: {},
                },
                page,
            )
        } else {
            add({ ...base, id, kind: 'court', name: {} }, page)
        }
    }

    const courts: Court[] = []
    for (const { court, pages } of drafts.values()) {
        for (const page of pages.sort(
            (a, b) => 'nl de fr'.indexOf(a.lang) - 'nl de fr'.indexOf(b.lang),
        )) {
            court.name[page.lang] = page.title
            court.website[page.lang] = page.url
            if (page.address) {
                if (!court.address) court.address = page.address
                else if (court.address.postalCode !== page.address.postalCode)
                    report.conflicts.push(
                        `${court.id}: addresses differ between ${Object.values(court.website).join(' and ')}`,
                    )
            }
            // Labels and notes are in the page's language: take the first language's contacts,
            // and from the other pages only values it doesn't have
            const known = new Set(court.contacts.map((c) => c.value))
            court.contacts.push(
                ...page.contacts.filter((c) => court.contacts.length === 0 || !known.has(c.value)),
            )
            if (page.openingHoursText)
                (court.openingHoursText ??= {})[page.lang] = page.openingHoursText
            for (const url of [page.url, page.url + '/contact']) {
                const retrieved = snapshots.entry(url)?.retrieved
                if (retrieved) court.sources.push({ url, retrieved })
            }
        }
        // Machine-readable hours only when every language's text reads to the same hours
        const texts = Object.values(court.openingHoursText ?? {})
        const hours = new Set(texts.map((t) => toOpeningHours(t)))
        const [only] = hours
        if (texts.length > 0 && hours.size === 1 && only) court.openingHours = only
        const codes = ECLI[court.id]
        if (codes) court.ecli = codes
        court.contacts = uniqueContacts(court.contacts)
        courts.push(court)
    }

    const served = new Set(courts.map((c) => c.canton))
    report.cantonsWithoutCourt = cantons.filter((c) => !served.has(c.id)).map((c) => c.id)
    for (const id of Object.keys(ECLI))
        if (!drafts.has(id)) report.unmatched.push(`ECLI table: no court ${id}`)

    courts.sort((a, b) => a.id.localeCompare(b.id))
    return { courts: courts.map(ordered), report }
}

function uniqueContacts(contacts: Contact[]): Contact[] {
    const seen = new Set<string>()
    return contacts.filter((c) => {
        const key = JSON.stringify([c.type, c.value, c.label, c.note])
        if (seen.has(key)) return false
        seen.add(key)
        return true
    })
}

/** Fields in a fixed order, for stable diffs */
function ordered(c: Court): Court {
    return {
        id: c.id,
        type: c.type,
        kind: c.kind,
        ...(c.court ? { court: c.court } : {}),
        name: c.name,
        judicialArea: c.judicialArea,
        ...(c.arrondissement ? { arrondissement: c.arrondissement } : {}),
        ...(c.canton ? { canton: c.canton } : {}),
        ...(c.ecli ? { ecli: c.ecli } : {}),
        ...(c.address ? { address: c.address } : {}),
        contacts: c.contacts,
        ...(c.openingHours ? { openingHours: c.openingHours } : {}),
        ...(c.openingHoursText ? { openingHoursText: c.openingHoursText } : {}),
        website: c.website,
        sources: c.sources,
    }
}
