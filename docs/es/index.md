---
layout: home

hero:
    name: belgica
    text: Datos jurídicos de referencia de Bélgica
    tagline: Tribunales, cantones y distritos judiciales, municipios, y los tipos de interés legal y de operaciones comerciales. JSON, con tipos y helpers de TypeScript.
    actions:
        - theme: brand
          text: Empezar
          link: /es/guide/getting-started
        - theme: alt
          text: Buscar un cantón
          link: /es/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: Tipos de interés
          link: /es/data/interest-rates

features:
    - title: Con fuentes
      details: Cada conjunto de datos indica de dónde procede, desde el anexo del Code judiciaire (Gerechtelijk Wetboek) hasta Statbel y el Moniteur belge (Belgisch Staatsblad).
    - title: Territorio completo
      details: Los 162 cantones judiciales con los municipios que cubren, incluido el texto legal de las ciudades divididas entre varios cantones.
    - title: Tipos de interés desde 1970
      details: El tipo de interés legal por año y el de las operaciones comerciales por semestre, con la regla de 2013–2015 sobre la fecha del contrato incorporada.
    - title: No solo para JavaScript
      details: Los archivos JSON de data/ son la fuente de verdad. Léelos desde Python o cualquier otro lenguaje, fijados a un release tag.
---

## De un vistazo {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning Datos de referencia, no asesoramiento jurídico
Consulta las fuentes oficiales antes de basarte en ellos.
:::
