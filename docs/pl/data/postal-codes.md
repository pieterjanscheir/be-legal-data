# Kody pocztowe {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Plik: `data/postal-codes.json`. {{ stats.postalCodes.codes }} belgijskich kodów pocztowych, każdy
powiązany przez kod REFNIS z gminą, do której należy: {{ stats.postalCodes.records }} rekordów,
ponieważ {{ stats.postalCodes.shared }} kody pocztowe należą do dwóch gmin.

## Do czego się przydaje {#why-it-s-useful}

- **Od adresu do mapy sądowej.** Adresy mają kod pocztowy, a nie kod REFNIS. Kod pocztowy
  wskazuje gminę, a gmina jej kantony i sądy: `findCourtsForPostalCode('9050', 'labour-court')`
  odpowiada na pytanie „który sąd dla tego adresu?” na tyle, na ile pozwala kod pocztowy.
- **Kody pocztowe gminy.** Walidacja formularza, adresowanie korespondencji, sprawdzenie, czy
  adres i kod REFNIS są zgodne: `getPostalCodes('44021')`.
- **Gmina każdego sądu, więzienia i justitiehuis / maison de justice.** Ich
  `address.municipality` to właśnie to powiązanie, zastosowane do kodu pocztowego opublikowanego
  adresu ([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

## Źródło i aktualizacje {#source-and-updates}

|                  |                                                                                                                                                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Źródło           | [Tabela konwersji kodów pocztowych na kody REFNIS](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie) ze Statbel, tabela obowiązująca od 1 stycznia 2025 (`…_va01012025.xlsx`)                      |
| Budowane przez   | `scripts/parse/postal-codes.ts` z cotygodniowych snapshotów. Build kończy się błędem, gdy kod wskazuje kod REFNIS, którego nie ma w `municipalities.json`, albo gmina nie ma kodu                                               |
| Zmienia się, gdy | Statbel publikuje nową tabelę: gminy się łączą, bpost dodaje lub wycofuje kod pocztowy                                                                                                                                          |
| Zakres           | Od 1 stycznia 2025: wyszukiwania dla wcześniejszego dnia rzucają `RangeError` ([czas](/pl/api#time)). Późniejsza tabela nadaje parom, które usuwa, `validTo`, a parom, które dodaje, `validFrom`, w dniu wejścia tabeli w życie |
| Sprawdzanie      | Co tydzień, przez [workflow sources](/pl/guide/data-quality#how-the-data-is-built)                                                                                                                                              |
| Licencja         | © Statbel, [CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                                                        |

Statbel buduje tabelę z urzędów pocztowych bpost i gmin FOD Financiën / SPF Finances. Tabela
zawiera też nazwę gminy w każdym wierszu, której tu nie zapisujemy: w kilku miejscach różni się
ona od własnej listy REFNIS Statbel (`Tongeren-Borgloon` tam, gdzie lista mówi `Tongres-Looz`,
oraz `Saint-Nicolas` dla Sint-Niklaas), a rekord wskazuje na swoją gminę zamiast ją kopiować.
Nazwy zawiera `getMunicipality(record.municipality).name`.

## Wspólne kody pocztowe {#shared-postal-codes}

Gmina ma kilka kodów pocztowych (Gent ma ich dziesięć), a kod pocztowy należy do jednej gminy, z
trzema wyjątkami:

| Kod pocztowy | Gminy                                           |
| ------------ | ----------------------------------------------- |
| `1040`       | Brussel (`21004`) i Etterbeek (`21005`)         |
| `1050`       | Brussel (`21004`) i Elsene (`21009`)            |
| `1804`       | Vilvoorde (`23088`) i Zemst (`23096`): Cargovil |

W tych przypadkach rozstrzyga ulica. `getMunicipalitiesForPostalCode` zwraca obie gminy, a
`findCourtsForPostalCode` odpowiada osobno dla każdej gminy, więc wspólny kod nigdy nie jest po
cichu przypisywany do jednej z nich.

## Pola {#fields}

| Pole                   | Typ              | Opis                                                                                                                                                                                     |
| ---------------------- | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PostalCodeId`   | Kod pocztowy i kod REFNIS, połączone: `9000-44021`. Żaden z nich osobno nie wskazuje rekordu; razem są zarówno oficjalne, jak i unikalne. Zobacz [identyfikatory](/pl/guide/identifiers) |
| `validFrom`, `validTo` | string?          | Dni, w których para obowiązuje, według tabel Statbel; brak: od początku zakresu albo nadal obowiązuje. Zobacz [czas](/pl/api#time)                                                       |
| `postalCode`           | string           | Czterocyfrowy kod pocztowy                                                                                                                                                               |
| `municipality`         | `MunicipalityId` | Gmina, do której należy kod pocztowy, po kodzie REFNIS                                                                                                                                   |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## Czego tu nie ma {#what-isn-t-in-it}

- **Części gmin** (deelgemeenten / sections de commune): tabela Statbel kończy się na gminie.
  Własna lista kodów pocztowych bpost podaje miejscowości, ale nie ma kodu REFNIS i jest
  publikowana na warunkach korzystania bpost (wszelkie prawa zastrzeżone), a nie na otwartej
  licencji, więc nie jest używana.
- **Ulica.** W mieście podzielonym między kantony (Antwerpen, Gent, Brussel, Luik, …) kod
  pocztowy wskazuje gminę, a gmina kilka kantonów; wtedy rozstrzyga ulica, a granice istnieją
  tylko jako proza prawnicza w `territory` każdego kantonu, dopóki
  [#29](https://github.com/pieterjanscheir/belgica/issues/29) nie doda ich jako geometrii.

## Funkcje pomocnicze {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// Dla każdej gminy: jej vredegerechten i jej sądy żądanego typu
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
