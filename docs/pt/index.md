---
layout: home

hero:
    name: belgica
    text: Dados jurídicos belgas de referência
    tagline: Tribunais, cantões e arrondissements judiciais, municípios, e as taxas de juro legal e comercial. JSON, com tipos TypeScript e funções auxiliares.
    actions:
        - theme: brand
          text: Primeiros passos
          link: /pt/guide/getting-started
        - theme: alt
          text: Encontrar um cantão
          link: /pt/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: Taxas de juro
          link: /pt/data/interest-rates

features:
    - title: Com fontes
      details: Cada conjunto de dados indica de onde vem, do anexo ao Gerechtelijk Wetboek / Code judiciaire até ao Statbel e ao Belgisch Staatsblad.
    - title: Território completo
      details: Os 162 cantões judiciais com os municípios que abrangem, incluindo o texto legal para as cidades divididas por vários cantões.
    - title: Taxas de juro desde 1970
      details: A taxa legal por ano e a taxa das transações comerciais por semestre, com a regra da data do contrato de 2013–2015 incorporada.
    - title: Não só para JavaScript
      details: Os ficheiros JSON em data/ são a fonte de verdade. Leia-os a partir de Python ou de qualquer outra linguagem, fixados numa tag de release.
---

## Num relance {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning Dados de referência, não aconselhamento jurídico
Consulte as fontes oficiais antes de confiar neles.
:::
