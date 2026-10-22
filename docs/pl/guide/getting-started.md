<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Pierwsze kroki {#getting-started}

## Instalacja {#install}

::: code-group

```bash [pnpm]
pnpm add belgica
```

```bash [npm]
npm install belgica
```

```bash [yarn]
yarn add belgica
```

:::

Pakiet jest modułem ESM, ma własne definicje typów, nie ma zależności w czasie działania i działa
w przeglądarkach oraz na Node 22.12 lub nowszym, gdzie ładuje go także `require()`. Jest testowany
na Node 22.12, 22, 24 i 26.

### Importuj tylko to, czego potrzebujesz {#import-only-what-you-need}

Dane są wbudowane w JavaScript, więc import z głównego punktu pakietu ładuje wszystkie zbiory
danych. Każdy zbiór ma własny entry point, a sądy i kantony (z tekstem przepisów opisującym ich
terytorium) są zdecydowanie największe:

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

Wyjątkiem są [granice kantonów](/pl/data/canton-boundaries): milion pozycji geometrii, dostępnych
tylko w `belgica/canton-boundaries` i nigdy nieładowanych przez główny punkt pakietu.

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">Załadowany JavaScript</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Rozmiary są mierzone na podstawie builda podczas budowania strony (najpierw <code>pnpm build</code>).</p>

## Pierwsze spojrzenie {#a-first-look}

```ts
import {
    getCourt,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'belgica'

getCourt('justice-of-the-peace-gent-1').name.nl // 'Vredegerecht Gent 1'
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getCantonsForMunicipality('44021') // Gent 1–5: miasto podzielone, zobacz `territory` każdego kantonu
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Typowe zadania {#common-tasks}

### Który vredegerecht / justice de paix jest właściwy dla adresu? {#which-justice-of-the-peace-handles-an-address}

Vredegerecht / justice de paix to belgijski sąd pokoju, najniższy szczebel sądownictwa, po jednym
na kanton sądowy. Znajdź kod REFNIS gminy i pobierz jej kantony, a następnie sąd danego kantonu.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // każdy kanton ma swój sąd
}

// W dniu doręczenia pozwu, a nie dzisiaj
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Gdy miasto jest podzielone między kilka kantonów (Antwerpen, Gent, Brussel, Luik, …), dostajesz
więcej niż jeden wynik. Rozstrzyga adres ulicy, a `territory` każdego kantonu zawiera prawny opis
jego części. Wypróbuj to na [stronie o terytorium](/pl/data/territory#find-the-canton-for-a-municipality).

Jeśli znasz współrzędne adresu, sprawę rozstrzygają [granice kantonów](/pl/data/canton-boundaries):

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // długość, szerokość geograficzna: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### Który sąd dla danej gminy? {#which-court-for-a-municipality}

Każdy sąd poza vredegerecht / justice de paix wymienia kantony, które obejmuje (`cantons`), tak jak
określa je ustawa. `findCourtsWithJurisdiction` szuka w nich kantonów danej gminy.

```ts
import { findCourtsWithJurisdiction, getDivisions } from 'belgica'

findCourtsWithJurisdiction('23088', 'police-court') // [police-court-vilvoorde], nie Bruksela
findCourtsWithJurisdiction('21004', 'labour-court') // niderlandzkojęzyczny i francuskojęzyczny sąd w Brukseli

// Sąd jako całość; który wydział rozpatruje sprawę, nie ma jeszcze w danych
const [court] = findCourtsWithJurisdiction('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### Na podstawie kodu pocztowego {#from-a-postal-code}

Adres ma kod pocztowy, a nie kod REFNIS. `findCourtsForPostalCode` przechodzi od kodu pocztowego
do gminy ([kody pocztowe](/pl/data/postal-codes)), a stamtąd do vredegerechten / justices de paix
i do sądów danego typu. Odpowiada osobno dla każdej gminy: trzy kody pocztowe (`1040`, `1050`,
`1804`) należą do dwóch gmin i wtedy rozstrzyga ulica.

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']: rozstrzyga ulica

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

W mieście podzielonym między kantony kod pocztowy zawęża pytanie do gminy; kanton nadal wymaga
ulicy, a jego granice pozostają prozą prawniczą, dopóki
[#29](https://github.com/pieterjanscheir/belgica/issues/29) nie doda ich jako geometrii.

### Odsetki należne w danym dniu {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` zwraca `null` dla dnia, dla którego nie ma stopy w danych, więc możesz ostrzec
użytkownika zamiast po cichu przyjąć 0 %. Rzuca `RangeError` dla błędnie zapisanego dnia, takiego
jak `'2024-6-1'`: przekaż `YYYY-MM-DD` albo `Date`.

### Nazwy sądów w innym języku {#court-names-in-another-language}

Nazwy są podane tak, jak publikuje je każdy sąd, w każdym języku, w którym ma stronę. Sąd we
Flandrii publikuje tylko po niderlandzku; dwujęzyczne sądy w Brukseli po niderlandzku i po
francusku; sądy w Eupen po niemiecku i po francusku.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## Surowy JSON {#raw-json}

Pliki z danymi są również eksportowane:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## Id są publicznym API {#ids-are-public-api}

Projekty zapisują id takie jak `justice-of-the-peace-gent-1` czy `oost-vlaanderen`, więc nigdy nie
zmieniają się one w obrębie wersji major (zobacz [identyfikatory](./identifiers)), a wersje
podlegają tym regułom:

| Zmiana                        | Wersja |
| ----------------------------- | ------ |
| Dodanie danych                | minor  |
| Poprawienie wartości          | patch  |
| Usunięcie lub zmiana nazwy id | major  |
