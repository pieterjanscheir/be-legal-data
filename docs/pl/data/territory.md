<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# Terytorium i kantony {#territory-and-cantons}

Mapa sądowa Belgii ma trzy poziomy: **obszary sądowe** (po jednym na każdy hof van beroep /
cour d'appel, czyli sąd apelacyjny) obejmują **okręgi sądowe** (arrondissements), które obejmują
**kantony sądowe** (każdy z jednym vredegerecht / justice de paix, belgijskim sądem pokoju).
Kantony są zdefiniowane przez **gminy**. Obok mapy sądowej istnieje mapa administracyjna: każda
gmina leży w **regionie** i, poza Brukselą, w **prowincji**.

## Do czego się przydaje {#why-it-s-useful}

- **Który vredegerecht / justice de paix?** Spory najmu, drobne roszczenia, opieka i spory
  sąsiedzkie trafiają do sądu pokoju, zwykle tego z kantonu, w którym mieszka pozwany lub leży
  nieruchomość. Pomyłka co do kantonu oznacza roszczenie złożone w niewłaściwym sądzie.
- **Który okręg sądowy?** Rechtbanken van eerste aanleg / tribunaux de première instance (sądy
  pierwszej instancji), ondernemingsrechtbanken / tribunaux de l'entreprise i
  arbeidsrechtbanken / tribunaux du travail, prokuratura oraz obszar, na którym może działać
  komornik, są zorganizowane według okręgów sądowych.
- **Który sąd apelacyjny?** Apelacje trafiają do hof van beroep / cour d'appel danego obszaru
  sądowego.
- **Łączenie danych.** Wszystko, co ma kod REFNIS (statystyki Statbel, regionalne otwarte dane,
  rejestry adresów), można nanieść na mapę sądową.

Ustawa opisuje kantony prozą („the part of the territory of the city of Antwerpen bounded by
the centre lines of the Brouwersvliet…”). Te pliki zamieniają ją w dane, zachowując tekst prawny
dla przypadków, w których rozstrzygać może tylko tekst.

## Źródło i aktualizacje {#source-and-updates}

|                  |                                                                                                                                                                                                                                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Źródło           | Załącznik do Gerechtelijk Wetboek / Code judiciaire (belgijskiego kodeksu sądowego), „Gebiedsomschrijving en zetel van hoven en rechtbanken” ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), po niderlandzku i po francusku; otwarte dane Statbel dla gmin, prowincji i regionów |
| Budowane przez   | `pnpm build:cantons` (kantony, gminy); cotygodniowe snapshoty + `pnpm build:data` (regiony, prowincje); ręcznie (obszary, okręgi sądowe)                                                                                                                                                                                            |
| Zmienia się, gdy | Ustawa zmienia załącznik; gminy się łączą (2019, 2025)                                                                                                                                                                                                                                                                              |
| Zakres           | Od 1 stycznia 2025: wyszukiwania dla wcześniejszego dnia rzucają `RangeError` ([czas](/pl/api#time))                                                                                                                                                                                                                                |
| Sprawdzanie      | Przebudowywane ręcznie przez `pnpm build:cantons`: ejustice odrzuca serwery GitHuba ([jakość danych](/pl/guide/data-quality))                                                                                                                                                                                                       |
| Licencja         | CC BY 4.0; dane gmin © Statbel, CC BY 4.0                                                                                                                                                                                                                                                                                           |

## Znajdź kanton dla gminy {#find-the-canton-for-a-municipality}

<CantonLookup />

## Obszary sądowe {#judicial-areas}

5 obszarów sądów apelacyjnych (rechtsgebieden / ressorts). Plik: `data/judicial-areas.json`.
Źródło: załącznik do Gerechtelijk Wetboek (Ger.W. bijvoegsel), art. 5.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="a in judicialAreas" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface JudicialArea {
    id: JudicialAreaId // 'gent'
    name: Translated // { nl, fr, de }
}
```

## Okręgi sądowe {#arrondissements}

12 okręgów sądowych (gerechtelijke arrondissementen / arrondissements judiciaires). Plik:
`data/arrondissements.json`. Źródło: Ger.W. bijvoegsel art. 4.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>Obszar sądowy</th></tr></thead>
<tbody>
<tr v-for="a in arrondissements" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
<td>{{ getJudicialArea(a.judicialArea)?.name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Arrondissement {
    id: ArrondissementId // 'oost-vlaanderen'
    name: Translated
    judicialArea: JudicialAreaId
}
```

## Kantony {#cantons}

Wszystkie 162 kantony sądowe: każdy to obszar jednego vredegerecht / justice de paix. Plik:
`data/cantons.json` (generowany z załącznika do Gerechtelijk Wetboek, art. 1).

### Pola {#fields}

| Pole             | Typ                            | Opis                                                                                                                  |
| ---------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Stabilne id w języku lokalnym, z numerem dla miejscowości z kilkoma kantonami: `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | Id okręgu sądowego                                                                                                    |
| `name`           | `{ nl, fr }`                   | Nazwa kantonu w brzmieniu z załącznika                                                                                |
| `number`         | number?                        | Numer kantonu w miejscowościach, w których jest ich kilka (Gent 1–5)                                                  |
| `seat`           | `{ nl, fr }`                   | Gdzie ma siedzibę vredegerecht / justice de paix; może się różnić od nazwy                                            |
| `municipalities` | `{ municipality, partial? }[]` | Objęte gminy, po kodzie REFNIS; `partial: true`, gdy objęta jest tylko część                                          |
| `territory`      | `{ nl, fr }`                   | Obszar kantonu, dosłownie z załącznika                                                                                |
| `legalBasis`     | `{ url, provision }`           | Gdzie definiuje go ustawa: ELI załącznika i sekcja, np. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)                   |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; zwykle siedziba, ale nie zawsze
    number?: number // dla miejscowości z kilkoma kantonami (Gent 1–5, …)
    seat: Bilingual // gdzie ma siedzibę vredegerecht
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // obszar kantonu, dosłownie z załącznika
    legalBasis: { url: string; provision: string } // ELI załącznika i sekcja
}
```

- **Id** stosują język lokalny: niderlandzki we Flandrii i w Brukseli, francuski w Walonii,
  niemiecki w okolicach Eupen; dwujęzyczna Bruksela dostaje nazwę niderlandzką. Zobacz
  [identyfikatory](/pl/guide/identifiers). Vredegerecht / justice de paix jest powiązany ze swoim
  kantonem przez pole `canton`.
- **Nazwa i siedziba mogą się różnić**: kanton `oudergem` ma siedzibę w Etterbeek.
- **`partial: true`** oznacza gminę podzieloną między kilka kantonów. Tekst `territory` mówi
  wtedy, która część (ulice, numery, cieki wodne) należy do tego kantonu.
- Nazwy są tylko po niderlandzku i po francusku: załącznik nie ma skonsolidowanego tekstu
  niemieckiego.

### Podzielone gminy {#split-municipalities}

55 kantonów obejmuje tylko część gminy. Dla nich kantonu nie da się ustalić na podstawie samej
gminy: zależy on od ulicy (a czasem od numeru domu). Tekst `territory` wymienia granice. Jeśli
znasz współrzędne adresu, `findCantonsAt(lon, lat)` z `belgica/canton-boundaries` znajduje
kanton w [granicach kantonów](./canton-boundaries) z NGI; bez nich pokaż kantony-kandydatów i ich
tekst i pozwól zdecydować człowiekowi. Gdy geometria i tekst się różnią, prawem jest tekst.

## Gminy {#municipalities}

565 gmin z ich kodem REFNIS (NIS) ze Statbel. Plik: `data/municipalities.json` (generowany ze
Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // kod REFNIS: '44021' dla Gent
    name: Bilingual
    province: ProvinceId | '04000' // kod REFNIS prowincji; '04000' w Brukseli
    region: RegionId // kod REFNIS regionu
}
```

19 gmin Regionu Stołecznego Brukseli nie ma prowincji. Ich `province` to `04000`, kod regionu,
który Statbel umieszcza w kolumnie prowincji we własnych plikach, a
`getProvinceForMunicipality` zwraca dla nich `undefined`; region podaje
`getRegionForMunicipality`. Kody są wymienione poniżej, na podstawie danych.

## Regiony {#regions}

3 regiony (gewesten / régions). Plik: `data/regions.json` (generowany z listy kodów REFNIS
Statbel; nazwy w formie publikowanej przez Statbel). © Statbel, CC BY 4.0.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="r in regions" :key="r.id">
<td><code>{{ r.id }}</code></td><td>{{ r.name.nl }}</td><td>{{ r.name.fr }}</td><td>{{ r.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface Region {
    id: RegionId // kod REFNIS: '02000', '03000', '04000'
    name: Translated // { nl, fr, de }, w formie publikowanej przez Statbel
    sources: SourceRef[] // lista kodów REFNIS Statbel
}
```

## Prowincje {#provinces}

10 prowincji, z ich regionem. Plik: `data/provinces.json` (generowany z listy kodów REFNIS
Statbel). © Statbel, CC BY 4.0. Region Stołeczny Brukseli nie ma prowincji; prowincja Brabancja,
która przestała istnieć 31 grudnia 1994, jest sprzed zakresu danych.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>Region</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // kod REFNIS: '40000' dla Oost-Vlaanderen
    name: Translated // { nl, fr, de }, w formie publikowanej przez Statbel
    region: RegionId
    sources: SourceRef[] // lista kodów REFNIS Statbel
}
```

Nazwy pochodzą ze Statbel, łącznie ze słowem oznaczającym rodzaj jednostki (`Provincie
Oost-Vlaanderen`, `Province de Flandre orientale`, `Provinz Ostflandern`): pakiet zapisuje
wartości tak, jak publikuje je źródło, i ich nie skraca.
