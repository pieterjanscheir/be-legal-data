---
layout: home

hero:
    name: belgica
    text: Dati giuridici di riferimento belgi
    tagline: Corti e tribunali, cantoni e arrondissement giudiziari, comuni, e i tassi d'interesse legale e per le transazioni commerciali. JSON, con tipi e helper TypeScript.
    actions:
        - theme: brand
          text: Per iniziare
          link: /it/guide/getting-started
        - theme: alt
          text: Trova un cantone
          link: /it/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: Tassi d'interesse
          link: /it/data/interest-rates

features:
    - title: Con le fonti
      details: Ogni dataset indica da dove proviene, dall'allegato al Gerechtelijk Wetboek / Code judiciaire fino a Statbel e al Belgisch Staatsblad.
    - title: Territorio completo
      details: Tutti i 162 cantoni giudiziari con i comuni che coprono, compreso il testo di legge per le città suddivise tra più cantoni.
    - title: Tassi d'interesse dal 1970
      details: Il tasso legale per anno e il tasso per le transazioni commerciali per semestre, con la regola 2013–2015 sulla data del contratto già integrata.
    - title: Non solo per JavaScript
      details: I file JSON in data/ sono la fonte di verità. Leggili da Python o da qualunque altro linguaggio, fissati a un release tag.
---

## In breve {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning Dati di riferimento, non consulenza legale
Verifica le fonti ufficiali prima di farvi affidamento.
:::
