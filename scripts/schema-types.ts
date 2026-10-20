// The shape of each file in data/, for scripts/build-schemas.ts
import type { Court } from '../src/courts'
import type { InterestRateSeries, InterestType } from '../src/interest-rates'
import type { Arrondissement, Canton, JudicialArea, Municipality } from '../src/territory'

export type JudicialAreasFile = JudicialArea[]
export type ArrondissementsFile = Arrondissement[]
export type CantonsFile = Canton[]
export type MunicipalitiesFile = Municipality[]
export type CourtsFile = Court[]
export type InterestRatesFile = Record<InterestType, InterestRateSeries>
