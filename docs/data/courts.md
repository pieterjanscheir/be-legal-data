# Courts

File: `data/courts.json`. Coverage so far: the justices of the peace in East and West Flanders,
and the divisions of the Ondernemingsrechtbank Gent. The other courts are planned
([#4](https://github.com/pieterjanscheir/be-legal-data/issues/4)).

## Why it's useful

- **Addressing documents.** Writs of summons, petitions and conclusions name the court in its
  official form; letters and filings go to the registry (griffie) at its address.
- **Contacting the registry.** The right phone number or e-mail for the registry, or for a
  specific roll (`A-rol`, `B-rol`) or the register of legal entities, saves a call to the
  central number.
- **Paying fees.** Some registries list the bank account for court fees and deposits.
- **Building forms.** Court pickers in legal software need a complete, consistent list with
  stable ids, linked to cantons and arrondissements.

## Source and updates

|              |                                                                                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| Source       | The courts' own websites and just.fgov.be (per-record source URLs are coming, [#5](https://github.com/pieterjanscheir/be-legal-data/issues/5)) |
| Built by     | Hand                                                                                                                                           |
| Changes when | A court moves, merges, or changes its contact details or bank account                                                                          |
| Checked      | Reviewed at least every 12 months ([data quality](/guide/data-quality))                                                                        |

Contact details change more often than anything else in this package: confirm a phone number
or bank account on the court's website before relying on it.

<CourtList />

## Fields

| Field            | Type                                             | Description                                                                                                                                              |
| ---------------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `CourtId`                                        | Stable id: the `type`, then the place: `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`                                                     |
| `type`           | `'justice-of-the-peace'` \| `'enterprise-court'` | Kind of court; more types will be added ([#4](https://github.com/pieterjanscheir/be-legal-data/issues/4))                                                |
| `arrondissement` | `ArrondissementId`                               | Arrondissement id                                                                                                                                        |
| `name`           | `{ nl, fr, de }`                                 | Place name of the court or division                                                                                                                      |
| `canton`         | `CantonId`                                       | The canton the justice of the peace serves (justices of the peace only)                                                                                  |
| `number`         | number?                                          | The canton's number in multi-canton places, part of the official name (justices of the peace only)                                                       |
| `seat`           | `{ nl, fr, de }`                                 | Seat of the court (enterprise court divisions)                                                                                                           |
| `address`        | `Address`                                        | Street, house number, postal code, city, and building if any                                                                                             |
| `contacts`       | `Contact[]`                                      | Phone numbers (E.164: `+3253820701`) and e-mail addresses (lowercase), with a `label` for what they're for                                               |
| `bankAccount`    | string?                                          | IBAN for fees and deposits, electronic format (`BE73679200844560`), checksum verified                                                                    |
| `openingHours`   | string?                                          | Registry opening hours in OpenStreetMap [`opening_hours`](https://wiki.openstreetmap.org/wiki/Key:opening_hours) syntax: `Mo-Fr 08:30-12:30,13:30-16:00` |
| `website`        | string?                                          | The court's own page                                                                                                                                     |
| `sources`        | `{ url, retrieved }[]`?                          | Where the data comes from, and when it was checked                                                                                                       |

::: tip Future court types
`type` will gain new values (police court, court of first instance, labour court…). If you
`switch` on it, keep a `default` branch so a new court type doesn't break your code.
:::

## Shape

A court is either a justice of the peace or a division of an enterprise court; `type` tells them
apart.

```ts
type Court = JusticeOfThePeace | EnterpriseCourtDivision

interface JusticeOfThePeace {
    type: 'justice-of-the-peace'
    id: CourtId // 'justice-of-the-peace-gent-1': type + canton id
    canton: CantonId // the canton it serves
    arrondissement: ArrondissementId
    name: Translated // place name
    number?: number // the canton's number, for places with several cantons
    address: Address
    contacts: Contact[]
    bankAccount?: string
    openingHours?: string
}

interface EnterpriseCourtDivision {
    type: 'enterprise-court'
    id: CourtId // 'enterprise-court-gent-brugge'
    arrondissement: ArrondissementId
    name: Translated // the division
    seat: Translated // the court's seat
    address: Address
    contacts: Contact[]
    bankAccount?: string
    openingHours?: string
}

interface Address {
    building?: string
    street: string
    houseNumber?: string
    postalCode: string
    city: string
}

interface Contact {
    type: 'phone' | 'email'
    value: string
    label?: ContactLabel // 'griffie' | 'A-rol' | 'B-rol' | 'rechtspersonenregister'
}
```

## Helpers

```ts
getCourt('justice-of-the-peace-gent-1')
getJusticeOfThePeace('gent-1') // same court, by canton id
findCourts({ type: 'justice-of-the-peace', arrondissement: 'oost-vlaanderen' })
getContact(court, 'email', 'griffie') // first matching contact's value
formatCourtName(court, 'fr') // official-style name in nl (default), fr or de
formatPhoneNumber('+3253820701') // '053 82 07 01'
formatIban('BE73679200844560') // 'BE73 6792 0084 4560'
```

## Canonical values

The data stores one canonical form of each value, so it can be compared, validated and linked;
formatting for display is the job of the helpers above.

| Value         | Stored as                                        | Why                                                                                                                                                                |
| ------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Phone number  | E.164: `+3253820701`                             | One form per number, dialable from anywhere, `tel:` links work as is                                                                                               |
| IBAN          | Electronic format: `BE73679200844560`            | The form payment systems take; the checksum is verified in the tests                                                                                               |
| E-mail        | Lowercase                                        | Comparisons and deduplication work                                                                                                                                 |
| Opening hours | `opening_hours`: `Mo-Fr 08:30-12:30,13:30-16:00` | The OpenStreetMap standard, with parsers in many languages (e.g. [opening_hours.js](https://github.com/opening-hours/opening_hours.js)) and no language of its own |

The source pages wrote the same schedule four different ways and phone numbers in six; the
canonical forms remove that noise without losing information.
