---
layout: home

hero:
    name: belgica
    text: Belgische juristische Referenzdaten
    tagline: Gerichtshöfe und Gerichte, Gerichtskantone und Gerichtsbezirke, Gemeinden sowie der gesetzliche Zinssatz und der Zinssatz für Handelsgeschäfte. JSON, mit TypeScript-Typen und Hilfsfunktionen.
    actions:
        - theme: brand
          text: Erste Schritte
          link: /de/guide/getting-started
        - theme: alt
          text: Kanton finden
          link: /de/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: Zinssätze
          link: /de/data/interest-rates

features:
    - title: Mit Quellenangabe
      details: Jeder Datensatz gibt an, woher er stammt, von der Anlage zum Gerichtsgesetzbuch bis zu Statbel und dem Belgischen Staatsblatt.
    - title: Vollständiges Gebiet
      details: Alle 162 Gerichtskantone mit den Gemeinden, die sie abdecken, einschließlich des Gesetzestexts für Städte, die auf mehrere Kantone aufgeteilt sind.
    - title: Zinssätze seit 1970
      details: Der gesetzliche Zinssatz pro Jahr und der Zinssatz für Handelsgeschäfte pro Halbjahr, mit eingebauter Vertragsdatumsregel von 2013–2015.
    - title: Nicht nur für JavaScript
      details: Die JSON-Dateien in data/ sind die maßgebliche Quelle. Lesen Sie sie aus Python oder einer anderen Sprache, festgelegt auf einen Release-Tag.
---

## Auf einen Blick {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning Referenzdaten, keine Rechtsberatung
Prüfen Sie die amtlichen Quellen, bevor Sie sich darauf verlassen.
:::
