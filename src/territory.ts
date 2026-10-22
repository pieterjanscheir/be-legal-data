import arrondissementsData from '../data/arrondissements.json'
import cantonsData from '../data/cantons.json'
import judicialAreasData from '../data/judicial-areas.json'
import municipalitiesData from '../data/municipalities.json'
import provincesData from '../data/provinces.json'
import regionsData from '../data/regions.json'
import type {
    ArrondissementId,
    CantonId,
    JudicialAreaId,
    MunicipalityId,
    ProvinceId,
    RegionId,
} from './ids.generated'
import { territoryCoverage } from './territory-coverage'
import type {
    Arrondissement,
    Canton,
    JudicialArea,
    Municipality,
    Province,
    Region,
} from './schemas/territory'
import { applyingOn, pickVersion, versionsById, type OnDay, type Validity } from './time'

export type {
    Arrondissement,
    Canton,
    CantonSummary,
    CantonTerritory,
    JudicialArea,
    LegalBasis,
    Municipality,
    Province,
    Region,
} from './schemas/territory'
export type { Bilingual, Locale, SourceRef, Translated } from './common'
export type {
    ArrondissementId,
    CantonId,
    JudicialAreaId,
    MunicipalityId,
    ProvinceId,
    RegionId,
} from './ids.generated'
export type { Coverage, OnDay, Validity } from './time'

export { territoryCoverage } from './territory-coverage'

// The data is validated against the zod schemas in ./schemas (test/schema.test.ts)
/** Every judicial area (rechtsgebied / ressort), every version */
export const judicialAreas = judicialAreasData as readonly JudicialArea[]
/** Every judicial arrondissement, every version */
export const arrondissements = arrondissementsData as readonly Arrondissement[]
/** The three regions, every version */
export const regions = regionsData as readonly Region[]
/** The ten provinces, every version */
export const provinces = provincesData as readonly Province[]
/** Every municipality, every version, by REFNIS code */
export const municipalities = municipalitiesData as readonly Municipality[]
/** Every judicial canton, every version, with its `territory` */
export const cantons = cantonsData as readonly Canton[]

const pick = <T extends Validity>(list: T[] | undefined, options: OnDay | undefined) =>
    pickVersion(list, options, territoryCoverage, 'territory')

const judicialAreasById = versionsById(judicialAreas)
const arrondissementsById = versionsById(arrondissements)
const regionsById = versionsById(regions)
const provincesById = versionsById(provinces)
const municipalitiesById = versionsById(municipalities)
const cantonsById = versionsById(cantons)
const cantonsByMunicipality = new Map<string, Canton[]>()
for (const canton of cantons) {
    for (const { municipality } of canton.municipalities) {
        cantonsByMunicipality.set(municipality, [
            ...(cantonsByMunicipality.get(municipality) ?? []),
            canton,
        ])
    }
}

// Each lookup by id has two signatures: a known id (a literal, or a value typed with the id
// union) always finds the record as it is today; any other string, or a lookup on a given
// day, may not. A day before the data's coverage throws a RangeError.

/** A judicial area by id, e.g. 'gent' */
export function getJudicialArea(id: JudicialAreaId): JudicialArea
/**
 * A judicial area by id, as on a given day (today by default). `undefined` for an unknown id or
 * one not in force that day. A day before the data's coverage throws a `RangeError`.
 */
export function getJudicialArea(id: string, options?: OnDay): JudicialArea | undefined
export function getJudicialArea(id: string, options?: OnDay): JudicialArea | undefined {
    return pick(judicialAreasById.get(id), options)
}

/** A judicial arrondissement by id, e.g. 'oost-vlaanderen' */
export function getArrondissement(id: ArrondissementId): Arrondissement
/**
 * A judicial arrondissement by id, as on a given day (today by default). `undefined` for an
 * unknown id or one not in force that day. A day before the data's coverage throws a
 * `RangeError`.
 */
export function getArrondissement(id: string, options?: OnDay): Arrondissement | undefined
export function getArrondissement(id: string, options?: OnDay): Arrondissement | undefined {
    return pick(arrondissementsById.get(id), options)
}

/** A region by its REFNIS code: '02000' Flemish, '03000' Walloon, '04000' Brussels-Capital */
export function getRegion(id: RegionId): Region
/**
 * A region by its REFNIS code, as on a given day (today by default). `undefined` for an unknown
 * id or one not in force that day. A day before the data's coverage throws a `RangeError`.
 */
export function getRegion(id: string, options?: OnDay): Region | undefined
export function getRegion(id: string, options?: OnDay): Region | undefined {
    return pick(regionsById.get(id), options)
}

/** A province by its REFNIS code, e.g. '40000' for Oost-Vlaanderen */
export function getProvince(id: ProvinceId): Province
/**
 * A province by its REFNIS code, as on a given day (today by default). `undefined` for an
 * unknown id or one not in force that day. A day before the data's coverage throws a
 * `RangeError`.
 */
export function getProvince(id: string, options?: OnDay): Province | undefined
export function getProvince(id: string, options?: OnDay): Province | undefined {
    return pick(provincesById.get(id), options)
}

/** A municipality by its REFNIS code, e.g. '44021' for Gent */
export function getMunicipality(id: MunicipalityId): Municipality
/**
 * A municipality by its REFNIS code, as on a given day (today by default). `undefined` for an
 * unknown id or one not in force that day. A day before the data's coverage throws a
 * `RangeError`.
 */
export function getMunicipality(id: string, options?: OnDay): Municipality | undefined
export function getMunicipality(id: string, options?: OnDay): Municipality | undefined {
    return pick(municipalitiesById.get(id), options)
}

/** A judicial canton by id, e.g. 'gent-1' */
export function getCanton(id: CantonId): Canton
/**
 * A judicial canton by id, as on a given day (today by default). `undefined` for an unknown id
 * or one not in force that day. A day before the data's coverage throws a `RangeError`.
 */
export function getCanton(id: string, options?: OnDay): Canton | undefined
export function getCanton(id: string, options?: OnDay): Canton | undefined {
    return pick(cantonsById.get(id), options)
}

/**
 * The cantons that cover a municipality on a day (today by default), by REFNIS code. One canton
 * for most municipalities; several for cities that are split (Antwerpen, Gent, Brussel, …), in
 * which case the street address decides and each canton's `territory` describes its part.
 */
export function getCantonsForMunicipality(id: string, options: OnDay = {}): Canton[] {
    return applyingOn(cantonsByMunicipality.get(id) ?? [], options, territoryCoverage, 'territory')
}

/**
 * The judicial arrondissement a municipality lies in on a day (today by default), by REFNIS
 * code. Every municipality lies in exactly one, even a city split over several cantons.
 */
export function getArrondissementForMunicipality(
    id: string,
    options: OnDay = {},
): Arrondissement | undefined {
    const canton = getCantonsForMunicipality(id, options)[0]
    return canton && getArrondissement(canton.arrondissement, options)
}

/**
 * The province a municipality lies in on a day (today by default), by REFNIS code. `undefined`
 * for the 19 municipalities of the Brussels-Capital Region, which has no province: use
 * `getRegionForMunicipality` there.
 */
export function getProvinceForMunicipality(id: string, options: OnDay = {}): Province | undefined {
    const municipality = getMunicipality(id, options)
    return municipality && getProvince(municipality.province, options)
}

/** The region a municipality lies in on a day (today by default), by REFNIS code */
export function getRegionForMunicipality(id: string, options: OnDay = {}): Region | undefined {
    const municipality = getMunicipality(id, options)
    return municipality && getRegion(municipality.region, options)
}
