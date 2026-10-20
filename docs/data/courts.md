# Courts

File: `data/courts.json`. Sources: the courts' own websites and just.fgov.be.

Coverage so far: the justices of the peace in East and West Flanders, and the divisions of the
Ondernemingsrechtbank Gent. See [known gaps](./known-gaps).

<CourtList />

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
findCourts({ type: 'justice-of-the-peace', arrondissement: 'EastFlanders' })
getContact(court, 'email', 'griffie') // first matching contact's value
formatCourtName(court, 'fr') // official-style name in nl (default), fr or de
```

Phone numbers are stored as found, in mixed formats.
