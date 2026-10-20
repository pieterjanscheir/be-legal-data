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

| | |
| --- | --- |
| Source | The courts' own websites and just.fgov.be (per-record source URLs are coming, [#5](https://github.com/pieterjanscheir/be-legal-data/issues/5)) |
| Built by | Hand |
| Changes when | A court moves, merges, or changes its contact details or bank account |
| Checked | Reviewed at least every 12 months ([data quality](/guide/data-quality)) |

Contact details change more often than anything else in this package: confirm a phone number
or bank account on the court's website before relying on it.

<CourtList />

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | string | Stable id: `Vredegerecht` + canton id, or `Ondernemingsrechtbank` + seat + division |
| `type` | `'justice-of-the-peace'` \| `'enterprise-court'` | Kind of court; more types will be added ([#4](https://github.com/pieterjanscheir/be-legal-data/issues/4)) |
| `arrondissement` | string | Arrondissement id |
| `name` | `{ nl, fr, de }` | Place name of the court or division |
| `canton` | number? | Canton number (justices of the peace in multi-canton places) |
| `seat` | `{ nl, fr, de }` | Seat of the court (enterprise court divisions) |
| `address` | `Address` | Street, house number, postal code, city, and building if any |
| `contacts` | `Contact[]` | Phone numbers and e-mail addresses, with a `label` for what they're for |
| `bankAccount` | string? | IBAN for fees and deposits, as published |
| `openingHours` | string? | Registry opening hours, as published (Dutch) |
| `website` | string? | The court's own page |
| `sources` | `{ url, retrieved }[]`? | Where the data comes from, and when it was checked |

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
    id: string // 'VredegerechtGent1' = 'Vredegerecht' + canton id
    arrondissement: string
    name: Translated // place name
    canton?: number // for places with several cantons
    address: Address
    contacts: Contact[]
    bankAccount?: string
    openingHours?: string
}

interface EnterpriseCourtDivision {
    type: 'enterprise-court'
    id: string // 'OndernemingsrechtbankGentBrugge'
    arrondissement: string
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
    label?: string // what it's for, e.g. 'griffie' or 'B-rol'
}
```

## Helpers

```ts
getCourt('VredegerechtGent1')
getJusticeOfThePeace('Gent1') // same court, by canton id
findCourts({ type: 'justice-of-the-peace', arrondissement: 'EastFlanders' })
getContact(court, 'email', 'griffie') // first matching contact's value
formatCourtName(court, 'fr') // official-style name in nl (default), fr or de
```

Phone numbers are stored as found, in mixed formats.
