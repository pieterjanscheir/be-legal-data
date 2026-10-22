---
layout: home

hero:
    name: belgica
    text: Belgijskie prawnicze dane referencyjne
    tagline: Sądy, kantony i okręgi sądowe, gminy oraz odsetki ustawowe i odsetki w transakcjach handlowych. JSON z typami i funkcjami pomocniczymi dla TypeScriptu.
    actions:
        - theme: brand
          text: Pierwsze kroki
          link: /pl/guide/getting-started
        - theme: alt
          text: Znajdź kanton
          link: /pl/data/territory#find-the-canton-for-a-municipality
        - theme: alt
          text: Stopy procentowe
          link: /pl/data/interest-rates

features:
    - title: Ze źródłami
      details: Każdy zbiór danych podaje, skąd pochodzi, od załącznika do Gerechtelijk Wetboek / Code judiciaire (belgijskiego kodeksu sądowego) po Statbel i Belgisch Staatsblad / Moniteur belge.
    - title: Pełne terytorium
      details: Wszystkie 162 kantony sądowe wraz z gminami, które obejmują, łącznie z tekstem przepisu dla miast podzielonych między kilka kantonów.
    - title: Stopy procentowe od 1970 roku
      details: Stopa odsetek ustawowych na każdy rok i stopa dla transakcji handlowych na każde półrocze, z wbudowaną regułą daty umowy z lat 2013–2015.
    - title: Nie tylko dla JavaScriptu
      details: Pliki JSON w data/ są źródłem prawdy. Czytaj je z Pythona lub czegokolwiek innego, przypięte do release tagu.
---

## W skrócie {#at-a-glance}

<DataStats />

```ts
import { getCantonsForMunicipality, getInterestRate } from 'belgica'

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
```

::: warning Dane referencyjne, nie porada prawna
Zanim na nich polegasz, sprawdź oficjalne źródła.
:::
