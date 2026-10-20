import { T as Translated, B as Bilingual } from './common-C23px35C.js';
export { L as Locale, S as SourceRef } from './common-C23px35C.js';

/** Area of a court of appeal (rechtsgebied): Antwerpen, Brussel, Gent, Luik or Bergen */
interface JudicialArea {
    /**
     * Stable key, e.g. 'Ghent'
     * @pattern ^[A-Z][A-Za-z0-9]*$
     */
    id: string;
    name: Translated;
}
interface Arrondissement {
    /**
     * Stable key, e.g. 'EastFlanders'
     * @pattern ^[A-Z][A-Za-z0-9]*$
     */
    id: string;
    name: Translated;
    /** Id of the judicial area the arrondissement belongs to */
    judicialArea: string;
}
interface Municipality {
    /**
     * Statbel REFNIS (NIS) code, e.g. '44021' for Gent
     * @pattern ^\d{5}$
     */
    refnis: string;
    name: Bilingual;
    /**
     * REFNIS code of the province, or '04000' for the Brussels-Capital Region
     * @pattern ^\d{5}$
     */
    province: string;
}
/** A judicial canton: the area of one justice of the peace */
interface Canton {
    /**
     * Stable key, e.g. 'Gent1' or 'MerelbekeMelle'. The justice of the peace of a canton has
     * the id 'Vredegerecht' + canton id.
     * @pattern ^[A-Z][A-Za-z0-9]*$
     */
    id: string;
    /** Id of the judicial arrondissement */
    arrondissement: string;
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
        refnis: string;
        partial?: boolean;
    }[];
    /** The canton's area, verbatim from the annex to the Judicial Code */
    territory: Bilingual;
    /** Where in the annex to the Judicial Code the canton is defined */
    source: string;
}
declare const judicialAreas: readonly JudicialArea[];
declare const arrondissements: readonly Arrondissement[];
declare const municipalities: readonly Municipality[];
declare const cantons: readonly Canton[];
declare function getJudicialArea(id: string): JudicialArea | undefined;
declare function getArrondissement(id: string): Arrondissement | undefined;
declare function getMunicipality(refnis: string): Municipality | undefined;
declare function getCanton(id: string): Canton | undefined;
/**
 * The cantons that cover a municipality. One canton for most municipalities; several for
 * cities that are split (Antwerpen, Gent, Brussel, …), in which case the street address decides
 * and each canton's `territory` describes its part.
 */
declare function getCantonsForMunicipality(refnis: string): Canton[];

export { type Arrondissement, Bilingual, type Canton, type JudicialArea, type Municipality, Translated, arrondissements, cantons, getArrondissement, getCanton, getCantonsForMunicipality, getJudicialArea, getMunicipality, judicialAreas, municipalities };
