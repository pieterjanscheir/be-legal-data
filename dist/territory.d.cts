import { A as ArrondissementId, T as Translated, J as JudicialAreaId, C as CantonId, B as Bilingual, M as MunicipalityId } from './ids.generated-Bb9CqYLw.cjs';
export { L as Locale, S as SourceRef } from './ids.generated-Bb9CqYLw.cjs';

/** Area of a court of appeal (rechtsgebied): Antwerpen, Brussel, Gent, Luik or Bergen */
interface JudicialArea {
    /** Stable id from the local-language name, e.g. 'gent' */
    id: JudicialAreaId;
    name: Translated;
}
interface Arrondissement {
    /** Stable id from the local-language name, e.g. 'oost-vlaanderen' */
    id: ArrondissementId;
    name: Translated;
    /** The judicial area the arrondissement belongs to */
    judicialArea: JudicialAreaId;
}
interface Municipality {
    /** The municipality's Statbel REFNIS (NIS) code, e.g. '44021' for Gent */
    id: MunicipalityId;
    name: Bilingual;
    /**
     * REFNIS code of the province, or '04000' for the Brussels-Capital Region
     * @pattern ^\d{5}$
     */
    province: string;
}
/** A judicial canton: the area of one justice of the peace */
interface Canton {
    /** Stable id from the local-language name, plus the number if any: 'gent-1', 'merelbeke-melle' */
    id: CantonId;
    /** The judicial arrondissement */
    arrondissement: ArrondissementId;
    /** Name of the canton; usually the seat, but not always ('Oudergem' sits in Etterbeek) */
    name: Bilingual;
    /** Canton number for places with several cantons (Gent 1–5, …) */
    number?: number;
    /** Where the justice of the peace sits */
    seat: Bilingual;
    /**
     * The municipalities the canton covers. `partial` marks a municipality that is split over
     * several cantons; `territory` then says which part belongs to this one.
     */
    municipalities: {
        municipality: MunicipalityId;
        partial?: boolean;
    }[];
    /** The canton's area, verbatim from the annex to the Judicial Code */
    territory: Bilingual;
    /** Where in the annex to the Judicial Code the canton is defined */
    legalBasis: string;
}
declare const judicialAreas: readonly JudicialArea[];
declare const arrondissements: readonly Arrondissement[];
declare const municipalities: readonly Municipality[];
declare const cantons: readonly Canton[];
/** A judicial area by id, e.g. 'gent' */
declare function getJudicialArea(id: JudicialAreaId): JudicialArea;
declare function getJudicialArea(id: string): JudicialArea | undefined;
/** A judicial arrondissement by id, e.g. 'oost-vlaanderen' */
declare function getArrondissement(id: ArrondissementId): Arrondissement;
declare function getArrondissement(id: string): Arrondissement | undefined;
/** A municipality by its REFNIS code, e.g. '44021' for Gent */
declare function getMunicipality(id: MunicipalityId): Municipality;
declare function getMunicipality(id: string): Municipality | undefined;
/** A judicial canton by id, e.g. 'gent-1' */
declare function getCanton(id: CantonId): Canton;
declare function getCanton(id: string): Canton | undefined;
/**
 * The cantons that cover a municipality, by its REFNIS code. One canton for most
 * municipalities; several for cities that are split (Antwerpen, Gent, Brussel, …), in which case
 * the street address decides and each canton's `territory` describes its part.
 */
declare function getCantonsForMunicipality(id: string): Canton[];

export { type Arrondissement, ArrondissementId, Bilingual, type Canton, CantonId, type JudicialArea, JudicialAreaId, type Municipality, MunicipalityId, Translated, arrondissements, cantons, getArrondissement, getCanton, getCantonsForMunicipality, getJudicialArea, getMunicipality, judicialAreas, municipalities };
