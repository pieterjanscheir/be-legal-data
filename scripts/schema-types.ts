// The shape of each file in data/, for scripts/build-schemas.ts
import type { Court } from '../src/courts'
import type { HouseOfJustice } from '../src/houses-of-justice'
import type { PostalCode } from '../src/postal-codes'
import type { Prison } from '../src/prisons'
import type { InterestRateSeries, InterestType } from '../src/interest-rates'
import type {
    Arrondissement,
    Canton,
    JudicialArea,
    Municipality,
    Province,
    Region,
} from '../src/territory'

export type JudicialAreasFile = JudicialArea[]
export type ArrondissementsFile = Arrondissement[]
export type CantonsFile = Canton[]
export type RegionsFile = Region[]
export type ProvincesFile = Province[]
export type MunicipalitiesFile = Municipality[]
export type CourtsFile = Court[]
export type PrisonsFile = Prison[]
export type HousesOfJusticeFile = HouseOfJustice[]
export type PostalCodesFile = PostalCode[]
export type InterestRatesFile = Record<InterestType, InterestRateSeries>
