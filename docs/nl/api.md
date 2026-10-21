# API-referentie {#api-reference}

Alles wordt geëxporteerd vanuit de root van het package, en elke dataset heeft ook een eigen entry point:

```ts
import { getCanton, getInterestRate /* … */ } from 'be-legal-data'

// Alleen wat je gebruikt: 12 KB voor de rentevoeten in plaats van alles
import { getInterestRate } from 'be-legal-data/interest-rates'
import { getCourt, getJusticeOfThePeace } from 'be-legal-data/courts'
import { getCanton, getCantonsForMunicipality } from 'be-legal-data/territory'
import { getPrison } from 'be-legal-data/prisons'
import { getHouseOfJustice } from 'be-legal-data/houses-of-justice'
```

| Entry point                          | Inhoud                                                       |
| ------------------------------------ | ------------------------------------------------------------ |
| `be-legal-data`                      | Alles hieronder                                              |
| `be-legal-data/territory`            | Rechtsgebieden, arrondissementen, kantons, gemeenten         |
| `be-legal-data/courts`               | Hoven en rechtbanken, en de helpers voor contactgegevens     |
| `be-legal-data/prisons`              | Gevangenissen, en de helpers voor contactgegevens            |
| `be-legal-data/houses-of-justice`    | Justitiehuizen, en de helpers voor contactgegevens           |
| `be-legal-data/interest-rates`       | Rentevoeten                                                  |
| `be-legal-data/data/*.json`          | De ruwe databestanden                                        |
| `be-legal-data/schema/*.schema.json` | [JSON Schemas](/nl/guide/schema)                             |
| `be-legal-data/datapackage.json`     | [Data package descriptor](/nl/guide/schema#datapackage-json) |

Conventies:

- Opzoekingen op id geven `undefined` terug als niets overeenkomt; lijstfuncties geven een lege array terug.
- Functies gooien alleen een fout bij ongeldige invoer: een misvormde dag, of een dag vóór de
  dekking van de data (`RangeError`). Nooit voor ontbrekende data.
- Opzoekingen in het territorium nemen een optionele dag, `{ on: '2025-06-01' }` of een `Date`, en antwoorden voor
  vandaag als je er geen meegeeft. Een opzoeking op id vindt altijd een bekend record: de versie van vandaag, of de laatste
  versie van een record dat is beëindigd. Zie [tijd](#time).
- Geëxporteerde datasets zijn `readonly`: kopieer ze voor je sorteert of wijzigt (`[...courts].sort()`).
- Een opzoeking met een bekende id (een literal zoals `'gent-1'`, of een waarde met type `CantonId`) geeft het
  record zelf terug, nooit `undefined`. Elke andere string geeft `Record | undefined` terug.
  Zie [identifiers](/nl/guide/identifiers).

## Territorium {#territory}

### `getJudicialArea(id)` {#getjudicialarea-id}

```ts
function getJudicialArea(id: JudicialAreaId): JudicialArea
function getJudicialArea(id: string, options?: OnDay): JudicialArea | undefined
```

### `getArrondissement(id)` {#getarrondissement-id}

```ts
function getArrondissement(id: ArrondissementId): Arrondissement
function getArrondissement(id: string, options?: OnDay): Arrondissement | undefined
```

```ts
getArrondissement('oost-vlaanderen').name.fr // 'Flandre orientale'
```

### `getMunicipality(id)` {#getmunicipality-id}

```ts
function getMunicipality(id: MunicipalityId): Municipality
function getMunicipality(id: string, options?: OnDay): Municipality | undefined
```

```ts
getMunicipality('44021').name // { nl: 'Gent', fr: 'Gand' }
```

### `getCanton(id)` {#getcanton-id}

```ts
function getCanton(id: CantonId): Canton
function getCanton(id: string, options?: OnDay): Canton | undefined
```

```ts
getCanton('oudergem').seat.nl // 'Etterbeek'
getCanton('gent-1', { on: '2025-06-01' }) // de versie van die dag
getCanton('gent-1', { on: '2020-01-01' }) // RangeError: de data beschrijft 2025-01-01 en later
```

### `getCantonsForMunicipality(id)` {#getcantonsformunicipality-id}

```ts
function getCantonsForMunicipality(id: string, options?: OnDay): Canton[]
```

De kantons die een gemeente bestrijken op een dag, standaard vandaag. Eén kanton voor de meeste gemeenten; meerdere voor steden
die gesplitst zijn (Antwerpen, Gent, Brussel, …). Dan beslist het straatadres, en het
`territory` van elk kanton beschrijft zijn deel.

```ts
getCantonsForMunicipality('44088').map((c) => c.id) // ['merelbeke-melle']
getCantonsForMunicipality('44021').map((c) => c.id) // ['gent-1', 'gent-2', 'gent-3', 'gent-4', 'gent-5']
```

### `getArrondissementForMunicipality(id)` {#getarrondissementformunicipality-id}

```ts
function getArrondissementForMunicipality(id: string, options?: OnDay): Arrondissement | undefined
```

Het gerechtelijk arrondissement waarin een gemeente ligt, op REFNIS-code. Elke gemeente ligt in
precies één arrondissement, ook een stad die over meerdere kantons gesplitst is.

```ts
getArrondissementForMunicipality('44021')?.id // 'oost-vlaanderen'
```

## Hoven en rechtbanken {#courts}

### `getCourt(id)` {#getcourt-id}

```ts
function getCourt(id: CourtId): Court
function getCourt(id: string): Court | undefined
```

Een rechtbank, afdeling of zetel. Ids zijn het `type` van de rechtbank gevolgd door de plaats:
`justice-of-the-peace-gent-1`, `police-court-brussel-fr`, `enterprise-court-gent-brugge`.

```ts
getCourt('court-of-appeal-brussel').name // { nl: 'Hof van Beroep Brussel', fr: "Cour d'appel de Bruxelles" }
```

### `getJusticeOfThePeace(cantonId)` {#getjusticeofthepeace-cantonid}

```ts
function getJusticeOfThePeace(cantonId: CantonId): Court
function getJusticeOfThePeace(cantonId: string): Court | undefined
```

Het vredegerecht van een kanton. Elk kanton heeft er één.

```ts
const [canton] = getCantonsForMunicipality('44088')
getJusticeOfThePeace(canton.id).address // het vredegerecht van Merelbeke-Melle
```

### `getDivisions(courtId)` {#getdivisions-courtid}

```ts
function getDivisions(courtId: string): Court[]
```

De afdelingen van een rechtbank, of de zetels van een vredegerecht dat op meerdere plaatsen zitting houdt; leeg
voor een rechtbank zonder.

```ts
getDivisions('labour-court-gent').map((c) => c.id) // ['labour-court-gent-aalst', …]
```

### `findCourts(filter)` {#findcourts-filter}

```ts
function findCourts(filter: {
    type?: CourtType
    kind?: 'court' | 'division' | 'seat'
    arrondissement?: string
    judicialArea?: string
}): Court[]
```

De hoven en rechtbanken die aan elk opgegeven filter voldoen; een leeg filter geeft ze allemaal terug.

```ts
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' }) // de afdelingen ervan daar
findCourts({ type: 'court-of-appeal' }) // de vijf hoven van beroep
```

## Contactgegevens {#contacts}

In elk entry point met records die contactgegevens hebben: de root, `courts`, `prisons` en
`houses-of-justice`.

### `getContact(record, type, label?)` {#getcontact-record-type-label}

```ts
function getContact(
    record: { contacts: readonly Contact[] },
    type: 'phone' | 'fax' | 'email' | 'bank-account',
    label?: string,
): string | undefined
```

De waarde van het eerste contactgegeven van dat type, optioneel met dat label (de griffie of
dienst, zoals de bron die benoemt).

```ts
getContact(getCourt('court-of-appeal-liege'), 'email', 'Greffe pénal')
// 'liege.ca.greffepenal@just.fgov.be'
```

### `formatPhoneNumber(e164)` {#formatphonenumber-e164}

```ts
function formatPhoneNumber(e164: string): string
```

Een Belgisch nummer in zijn nationale schrijfwijze. Gooit een `RangeError` voor alles wat geen
Belgisch nummer in E.164-vorm is.

```ts
formatPhoneNumber('+3292343210') // '09 234 32 10'
formatPhoneNumber('+3253820701') // '053 82 07 01'
formatPhoneNumber('+32470123456') // '0470 12 34 56'
```

### `formatIban(iban)` {#formatiban-iban}

```ts
function formatIban(iban: string): string
```

```ts
formatIban('BE73679200844560') // 'BE73 6792 0084 4560'
```

## Gevangenissen {#prisons}

### `getPrison(id)` {#getprison-id}

```ts
function getPrison(id: PrisonId): Prison
function getPrison(id: string): Prison | undefined
```

```ts
getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
```

## Justitiehuizen {#houses-of-justice}

### `getHouseOfJustice(id)` {#gethouseofjustice-id}

```ts
function getHouseOfJustice(id: HouseOfJusticeId): HouseOfJustice
function getHouseOfJustice(id: string): HouseOfJustice | undefined
```

```ts
getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
```

## Bevoegdheid {#competence}

Vragen die datasets combineren. Ze zitten alleen in de root van het package, omdat ze zowel het
territorium als de hoven en rechtbanken nodig hebben.

### `findJusticesOfThePeace(municipalityId)` {#findjusticesofthepeace-municipalityid}

```ts
function findJusticesOfThePeace(municipalityId: string, options?: OnDay): CantonCourt[]

interface CantonCourt {
    canton: Canton
    court: Court
    partial: boolean // het kanton bestrijkt slechts een deel van de gemeente
}
```

De vredegerechten voor een gemeente op een dag (standaard vandaag): één voor de meeste gemeenten, meerdere voor een stad
die over kantons gesplitst is, waar het straatadres beslist en het `territory` van elk kanton zegt welk
deel het bestrijkt.

```ts
findJusticesOfThePeace('44088')
// [{ canton: { id: 'merelbeke-melle', … }, court: { id: 'justice-of-the-peace-merelbeke-melle', … }, partial: false }]

findJusticesOfThePeace('44021').map((c) => c.canton.id) // ['gent-1', 'gent-2', 'gent-3', 'gent-4', 'gent-5']
```

## Rentevoeten {#interest-rates}

### `getInterestRate(date, type, options?)` {#getinterestrate-date-type-options}

```ts
function getInterestRate(
    date: Date | string,
    type: InterestType,
    options?: { contractAfter20130316?: boolean },
): InterestRateResult | null

interface InterestRateResult {
    rate: number // procent
    period: { from: string; to: string }
}
```

De rentevoet die op een dag geldt, of `null` als er voor die dag geen rentevoet bekend is. Een `Date` wordt gelezen als een
lokale kalenderdag; een string moet beginnen met een geldige `YYYY-MM-DD`-dag (een ISO-timestamp
mag, het tijdstip wordt genegeerd).

Gooit een `RangeError` voor al het andere: `'2013-1-15'`, `'15/01/2013'`, `'2013-02-30'` of een
ongeldige `Date`. Een ontbrekende rentevoet is `null`; een misvormde dag is een fout, zodat je de twee niet
kunt verwarren.

`contractAfter20130316` is alleen van belang voor de interest bij handelstransacties tussen 2013 en 15 maart 2015; standaard
wordt de rentevoet voor oudere contracten gebruikt. Zie [rentevoeten](/nl/data/interest-rates#the-2013-2015-contract-rule).

### `getLatestKnownRateDate(type)` {#getlatestknownratedate-type}

```ts
function getLatestKnownRateDate(type: InterestType): string
```

De laatste dag waarvoor een rentevoet bekend is, `YYYY-MM-DD`.

## Tijd {#time}

Territoriumrecords hebben een geldigheidsperiode, en opzoekingen in het territorium nemen een dag. De helpers worden
geëxporteerd voor je eigen records.

```ts
interface Validity {
    validFrom?: string // eerste dag, YYYY-MM-DD; geen: al van vóór de dekking
    validTo?: string // laatste dag; geen: geldt nog steeds
}

interface OnDay {
    on?: Date | string // standaard vandaag; een Date wordt gelezen als een lokale dag
}

const territoryCoverage: { from: '2025-01-01' }

function appliesOn(record: Validity, day: string): boolean
function toDay(date: Date | string): string // 'YYYY-MM-DD', of een RangeError
```

De territoriumdata beschrijft 1 januari 2025 en later; een opzoeking voor een vroegere dag gooit een
`RangeError` in plaats van te antwoorden met de kaart van vandaag. Vroegere versies zijn gepland
([#27](https://github.com/pieterjanscheir/be-legal-data/issues/27)).

## Datasets {#datasets}

De volledige datasets, getypeerd:

| Export            | Type                                                 |
| ----------------- | ---------------------------------------------------- |
| `judicialAreas`   | `readonly JudicialArea[]`                            |
| `arrondissements` | `readonly Arrondissement[]`                          |
| `cantons`         | `readonly Canton[]`                                  |
| `municipalities`  | `readonly Municipality[]`                            |
| `courts`          | `readonly Court[]`                                   |
| `prisons`         | `readonly Prison[]`                                  |
| `housesOfJustice` | `readonly HouseOfJustice[]`                          |
| `interestRates`   | `Readonly<Record<InterestType, InterestRateSeries>>` |

## Types {#types}

| Type                                                                                                                                                           | Beschreven op                                                                   |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `JudicialAreaId`, `ArrondissementId`, `CantonId`, `MunicipalityId`, `CourtId`, `PrisonId`, `HouseOfJusticeId`: unions van de ids in de data, mee geregenereerd | [Identifiers](/nl/guide/identifiers#in-typescript)                              |
| `Locale` = `'nl' \| 'fr' \| 'de'`                                                                                                                              |                                                                                 |
| `SourceRef` = `{ url: string; retrieved: string }`: waar de data van een record vandaan komt                                                                   | [Datakwaliteit en actualiteit](/nl/guide/data-quality)                          |
| `Translated` = `Record<Locale, string>`                                                                                                                        |                                                                                 |
| `Bilingual` = `Record<'nl' \| 'fr', string>`: namen zoals het Gerechtelijk Wetboek ze geeft                                                                    |                                                                                 |
| `JudicialArea`, `Arrondissement`, `Canton`, `Municipality`, `LegalBasis`, `Validity`, `OnDay`                                                                  | [Territorium en kantons](/nl/data/territory)                                    |
| `Court`, `CourtType`, `CourtFilter`, `Address`, `Contact`, `ContactType`, `CantonCourt`                                                                        | [Hoven en rechtbanken](/nl/data/courts#shape)                                   |
| `Prison`, `HouseOfJustice`                                                                                                                                     | [Gevangenissen](/nl/data/prisons), [Justitiehuizen](/nl/data/houses-of-justice) |
| `InterestType`, `InterestRatePeriod`, `InterestRateSeries`, `InterestRateResult`                                                                               | [Rentevoeten](/nl/data/interest-rates#shape)                                    |
