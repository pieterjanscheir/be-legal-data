import { a as CourtId, A as ArrondissementId, T as Translated, S as SourceRef, C as CantonId, L as Locale } from './ids.generated-Bb9CqYLw.cjs';

interface Address {
    building?: string;
    street: string;
    houseNumber?: string;
    /** @pattern ^\d{4}$ */
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
    /**
     * Stable id: the court `type` followed by its place, e.g. 'justice-of-the-peace-gent-1' or
     * 'enterprise-court-gent-brugge'
     */
    id: CourtId;
    /** The judicial arrondissement the court lies in */
    arrondissement: ArrondissementId;
    /** Place name of the court (or division) */
    name: Translated;
    address: Address;
    contacts: Contact[];
    bankAccount?: string;
    openingHours?: string;
    /**
     * The court's own web page
     * @format uri
     */
    website?: string;
    /** Where the record's data comes from */
    sources?: SourceRef[];
}
interface JusticeOfThePeace extends CourtBase {
    type: 'justice-of-the-peace';
    /** The canton the justice of the peace serves */
    canton: CantonId;
    /**
     * The canton's number in places with several cantons (Gent 1–5, …). Part of the court's
     * official name, so kept here; always equal to the canton's `number`.
     */
    number?: number;
}
interface EnterpriseCourtDivision extends CourtBase {
    type: 'enterprise-court';
    /** Place name of the court's seat; `name` is the division */
    seat: Translated;
}
type Court = JusticeOfThePeace | EnterpriseCourtDivision;
type CourtType = Court['type'];
declare const courts: readonly Court[];
declare function getCourt(id: CourtId): Court;
declare function getCourt(id: string): Court | undefined;
/**
 * The justice of the peace of a canton, by canton id ('gent-1', 'merelbeke-melle'). `undefined`
 * when the canton's court isn't in the data yet; see the known gaps.
 */
declare function getJusticeOfThePeace(cantonId: string): JusticeOfThePeace | undefined;
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

export { type Address, type Contact, type Court, CourtId, type CourtType, type EnterpriseCourtDivision, type JusticeOfThePeace, courts, findCourts, formatCourtName, getContact, getCourt, getJusticeOfThePeace };
