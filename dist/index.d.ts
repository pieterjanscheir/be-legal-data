type Locale = 'nl' | 'fr' | 'de';
/** A name in the three national languages */
type Translated = Record<Locale, string>;
interface Arrondissement {
    /** Stable key, e.g. 'EastFlanders' */
    id: string;
    name: Translated;
}
interface Address {
    building?: string;
    street: string;
    houseNumber?: string;
    postalCode: string;
    city: string;
}
interface Contact {
    type: 'phone' | 'email';
    value: string;
    /** What the contact is for, e.g. 'griffie' or 'B-rol' */
    label?: string;
}
interface CourtBase {
    /** Stable key, e.g. 'VredegerechtGent1' or 'OndernemingsrechtbankGentBrugge' */
    id: string;
    /** Id of the judicial arrondissement the court lies in */
    arrondissement: string;
    /** Place name of the court (or division) */
    name: Translated;
    address: Address;
    contacts: Contact[];
    bankAccount?: string;
    openingHours?: string;
}
interface JusticeOfThePeace extends CourtBase {
    type: 'justice-of-the-peace';
    /** Canton number for places with several cantons (Gent 1–5, …) */
    canton?: number;
}
interface EnterpriseCourtDivision extends CourtBase {
    type: 'enterprise-court';
    /** Place name of the court's seat; `name` is the division */
    seat: Translated;
}
type Court = JusticeOfThePeace | EnterpriseCourtDivision;
type CourtType = Court['type'];
declare const arrondissements: Arrondissement[];
declare const courts: Court[];
declare function getArrondissement(id: string): Arrondissement | undefined;
declare function getCourt(id: string): Court | undefined;
declare function findCourts(filter: {
    type?: CourtType;
    arrondissement?: string;
}): Court[];
declare function getContact(court: Court, type: Contact['type'], label?: string): string | undefined;
/**
 * Full official-style name, e.g. 'Vredegerecht 1e kanton Gent' or
 * 'Ondernemingsrechtbank Gent - afdeling Brugge'.
 */
declare function formatCourtName(court: Court, locale?: Locale): string;

/** 'legal' = wettelijke interest, 'commercial' = handelstransacties */
type InterestType = 'legal' | 'commercial';
interface InterestRatePeriod {
    /** First day of the period (inclusive), YYYY-MM-DD */
    from: string;
    /** Last day of the period (inclusive), YYYY-MM-DD */
    to: string;
    /** Rate in percent */
    rate: number;
    /**
     * Commercial rates 2013 – 15 March 2015 only: the rate for contracts
     * concluded before 16 March 2013, when it differs from `rate`.
     */
    rateForContractsBefore20130316?: number;
    note?: string;
}
interface InterestRateSeries {
    description: string;
    source: string;
    periods: InterestRatePeriod[];
}
declare const interestRates: Record<InterestType, InterestRateSeries>;
interface InterestRateResult {
    rate: number;
    period: {
        from: string;
        to: string;
    };
}
/**
 * The rate that applies on a day, or `null` when no rate is on file for it
 * (before the earliest period, or a period not yet published).
 *
 * `contractAfter20130316` only matters for commercial interest between 2013
 * and 15 March 2015; by default the rate for older contracts is used.
 */
declare function getInterestRate(date: Date | string, type: InterestType, options?: {
    contractAfter20130316?: boolean;
}): InterestRateResult | null;
/** Last day for which a rate is on file, YYYY-MM-DD */
declare function getLatestKnownRateDate(type: InterestType): string;

export { type Address, type Arrondissement, type Contact, type Court, type CourtType, type EnterpriseCourtDivision, type InterestRatePeriod, type InterestRateResult, type InterestRateSeries, type InterestType, type JusticeOfThePeace, type Locale, type Translated, arrondissements, courts, findCourts, formatCourtName, getArrondissement, getContact, getCourt, getInterestRate, getLatestKnownRateDate, interestRates };
