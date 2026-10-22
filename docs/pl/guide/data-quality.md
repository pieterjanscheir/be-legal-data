# Jakość i aktualność danych {#data-quality-freshness}

Prawnicze dane referencyjne dezaktualizują się po cichu: zostaje opublikowana nowa stopa
procentowa, sąd się przeprowadza, ustawa łączy dwa kantony. Ta strona wyjaśnia, jak pakiet
nadąża za zmianami i na ile możesz ufać każdemu zbiorowi danych.

## Skąd pochodzi każdy zbiór danych {#where-each-dataset-comes-from}

| Zbiór danych                        | Źródło                                                             | Jak jest budowany                         | Zmienia się, gdy                                               | Przegląd co |
| ----------------------------------- | ------------------------------------------------------------------ | ----------------------------------------- | -------------------------------------------------------------- | ----------- |
| Obszary sądowe, okręgi sądowe       | Gerechtelijk Wetboek / Code judiciaire, załącznik art. 4–5         | Ręcznie                                   | Ustawa zmienia mapę sądową (rzadko; ostatnio w 2014)           | 24 miesiące |
| Kantony                             | Gerechtelijk Wetboek / Code judiciaire, załącznik art. 1 (nl + fr) | Generowany: `pnpm build:cantons`          | Ustawa zmienia załącznik; gminy się łączą                      | 12 miesięcy |
| Granice kantonów                    | NGI (geo.be)                                                       | Co tydzień: snapshoty + `pnpm build:data` | NGI publikuje nową wersję                                      | Co tydzień  |
| Gminy                               | Otwarte dane Statbel                                               | Generowany: `pnpm build:cantons`          | Gminy się łączą (2019, 2025)                                   | 12 miesięcy |
| Regiony, prowincje                  | Lista kodów REFNIS ze Statbel                                      | Co tydzień: snapshoty + `pnpm build:data` | Statbel zmienia swój rejestr (ostatnio w 1995)                 | Co tydzień  |
| Sądy                                | tribunaux-rechtbanken.be                                           | Co tydzień: snapshoty + `pnpm build:data` | Sąd się przeprowadza albo zmienia dane kontaktowe lub godziny  | Co tydzień  |
| Więzienia                           | justitie.belgium.be                                                | Co tydzień: snapshoty + `pnpm build:data` | Więzienie jest otwierane, zamykane lub zmienia dane kontaktowe | Co tydzień  |
| Justitiehuizen / maisons de justice | vlaanderen.be, maisonsdejustice.be                                 | Co tydzień: snapshoty + `pnpm build:data` | Placówka się przeprowadza albo zmienia dane kontaktowe         | Co tydzień  |
| Kody pocztowe                       | Tabela konwersji Statbel                                           | Co tydzień: snapshoty + `pnpm build:data` | Statbel publikuje nową tabelę (połączenia gmin, nowe kody)     | Co tydzień  |
| Stopy procentowe                    | FOD Financiën, Belgisch Staatsblad                                 | Ręcznie                                   | Co roku (ustawowe) i co pół roku (handlowe)                    | 6 miesięcy  |

Generowane zbiory danych nigdy nie są edytowane ręcznie. `pnpm build:cantons` parsuje oficjalny
tekst i odmawia zapisania czegokolwiek, jeśli wersje niderlandzka i francuska się nie zgadzają
albo któraś gmina nie jest objęta; `pnpm build:data` odmawia, gdy strony nie da się
umiejscowić, kanton nie ma sądu albo kanton nie ma granicy w pliku NGI.

## Jak budowane są dane {#how-the-data-is-built}

```
official site ──fetch──> snapshots (sources branch) ──parse──> data/*.json ──> pull request
```

1. **Pobieranie.** W każdy poniedziałek [workflow sources](https://github.com/pieterjanscheir/belgica/actions/workflows/sources.yml)
   pobiera każdą stronę źródeł (`scripts/sources`), uprzejmie: jedno zapytanie na sekundę na
   serwis, z user agentem, który podaje nazwę projektu. Każdą stronę przechowuje na gałęzi
   `sources`, z indeksem tego, co zostało pobrane, kiedy, oraz hashem treści. Strona jest
   zapisywana ponownie tylko wtedy, gdy zmieni się jej treść, więc historia gałęzi pokazuje, co
   się zmieniło którego dnia. Strona, której pobranie się nie powiedzie (błąd serwera, 404),
   zachowuje ostatni dobry snapshot i zatrzymuje przebieg, co otwiera issue: dane nigdy nie są
   przebudowywane z niepełnego obrazu. Strona, do której źródło już nie linkuje, znika ze
   snapshotów; jej rekord zostaje w danych, wycofany przez `validTo` (dzień przed kontrolą, która
   jej nie znalazła), więc jego id dalej działa, a wyszukiwanie dla wcześniejszego dnia nadal go
   znajduje. Strona, która się pojawia, dostaje rekord z `validFrom`.
2. **Parsowanie.** `pnpm build:data` czyta snapshoty (`scripts/parse`) i zapisuje sądy,
   więzienia, justitiehuizen / maisons de justice oraz granice kantonów. Raportuje to, czego nie
   potrafi odczytać, i kończy się błędem, gdy strony nie da się umiejscowić.
3. **Testy.** Workflow sprawdza typy i uruchamia testy na nowych danych.
4. **Przegląd.** Gdy dane się zmieniły, otwiera lub aktualizuje jeden pull request z diffem i
   listą nieczytelnych wartości. Człowiek sprawdza go ze źródłami i go merguje.

Aby uruchomić to samodzielnie: `pnpm fetch:sources` (zapisuje `.sources/`), a potem
`pnpm build:data`.

Kantony i gminy są przebudowywane ręcznie przez `pnpm build:cantons`: strona Belgisch
Staatsblad / Moniteur belge (belgijskiego dziennika urzędowego) odrzuca serwery GitHuba
([#24](https://github.com/pieterjanscheir/belgica/issues/24)).

## Automatyczne kontrole {#automatic-checks}

### Przy każdej zmianie (CI) {#on-every-change-ci}

- **Walidacja schematów**: każdy plik z danymi pasuje do swojego [JSON Schema](./schema).
- **Spójność**: id są unikalne i poprawnie zbudowane; każde odwołanie (okręg sądowy, kanton,
  gmina, sąd, granica) wskazuje na istniejący rekord; każdy kanton ma jedną granicę, poprawny
  GeoJSON w obrębie Belgii, który bez nakładania się sumuje się do powierzchni kraju; każda gmina
  jest w dokładnie jednym kantonie albo jest podzielona między kilka; każdy kanton mieści się w
  prowincjach swojego okręgu sądowego; każdy kanton ma dokładnie jeden vredegerecht / justice de
  paix; każdy wydział ma typ i obszar swojego sądu; każdy rodzaj sądu ma liczbę sądów, jaką
  określa ustawa; każdy kanton podlega jednemu sądowi każdego typu (w Brukseli jednemu na język),
  a kantony sądu leżą w jego okręgu sądowym i obszarze sądowym.
- **Parsery**: testowane od początku do końca na przyciętych kopiach prawdziwych stron
  (`test/fixtures/sources`), a każdy czytnik (numery telefonów, IBAN-y, adresy, godziny otwarcia)
  na postaciach spotykanych w źródłach i na tym, co musi odrzucić.
- **Stopy procentowe**: okresy są posortowane, nigdy się nie nakładają i nie zostawiają luk;
  stopa ustawowa obowiązuje na rok kalendarzowy, a handlowa na półrocze; stopa zależna od daty
  umowy z lat 2013–2015 pojawia się tylko w tym przedziale.
- **Dane kontaktowe**: każdy IBAN przechodzi sumę kontrolną ISO 13616, numery telefonów są
  belgijskimi numerami E.164, adresy e-mail są pisane małymi literami, a godziny otwarcia pasują
  do składni `opening_hours`.
- **Kod**: ścisły TypeScript (w tym niesprawdzony dostęp przez indeks i dokładne opcjonalne
  właściwości), ESLint z regułami opartymi na typach, Prettier i 100 % pokrycia testami `src/`.
- **Pakowanie**: zbudowany pakiet ładuje się przez `import` i przez `require()`, z każdego entry
  pointu, na Node 22.12, 22, 24 i 26; `publint` i `arethetypeswrong` sprawdzają `exports` i
  deklaracje typów.

### Co tydzień (zaplanowane) {#every-week-scheduled}

[Workflow freshness](https://github.com/pieterjanscheir/belgica/actions/workflows/freshness.yml)
uruchamia się w każdy poniedziałek i otwiera issue z etykietą
[`data-freshness`](https://github.com/pieterjanscheir/belgica/issues?q=label%3Adata-freshness),
gdy coś znajdzie:

- **Brakujące stopy**: brak stopy ustawowej lub handlowej na dziś albo brak stopy handlowej na
  najbliższe dwa tygodnie (FOD Financiën publikuje ją przed początkiem półrocza).
- **Zaległe przeglądy**: data `lastReviewed` zbioru danych w `datapackage.json` jest starsza niż
  jego `reviewEveryMonths`.
- **Martwe źródła**: URL oficjalnego źródła w `datapackage.json` przestał odpowiadać.

Uruchom je samodzielnie przez `pnpm test:freshness` (dodaj `FRESHNESS_ONLINE=1`, żeby sprawdzić
URL-e).

## Jak czytać wartość {#how-to-read-a-value}

- **Brak to nie zero.** `getInterestRate` zwraca `null` dla dnia bez stopy w danych, zamiast
  zgadywać; pole, którego źródło nie podaje (adres sądu, godziny otwarcia w formie czytelnej dla
  maszyn), jest nieobecne, a nie uzupełnione. Obsłuż oba przypadki.
- **Zbyt wcześnie to błąd.** Wyszukiwanie dla dnia sprzed zakresu zbioru danych rzuca
  `RangeError`: dane nie potrafią odpowiedzieć, a dzisiejsza odpowiedź wyglądałaby na poprawną.
- **Dane kontaktowe są najmniej stabilne.** Numery telefonów, adresy e-mail i godziny otwarcia
  zmieniają się bez zapowiedzi. Każdy rekord podaje, z jakich stron i kiedy został odczytany
  (`sources`); gdy to ważne, sprawdź stronę sądu (`website`).
- **Tekst prawny wygrywa.** Dla podzielonych gmin `territory` kantonu to dosłowny tekst ustawy.
  Gdy streszczenie albo [granica](/pl/data/canton-boundaries) z NGI nie zgadzają się z tekstem,
  rację ma tekst.

## Zgłaszanie błędu {#reporting-a-mistake}

[Zgłoś poprawkę danych](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)
z id rekordu i linkiem do oficjalnego źródła. Poprawki są wydawane jako wersje patch.
