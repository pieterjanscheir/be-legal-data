# Decyzje projektowe {#design-decisions}

Pakiet został przeprojektowany, zanim miał pierwszych użytkowników, więc każdą decyzję można
było podjąć na podstawie jej zalet, a nie ze względu na kompatybilność. Ta strona zapisuje każdą
decyzję, jej powód i to, co z niej wynika. Nowa decyzja dostaje nowy punkt; decyzja wycofana
zostaje oznaczona, a nie usunięta.

## 1. Dane są produktem; kod jest udogodnieniem {#_1-the-data-is-the-product-the-code-is-a-convenience}

**Decyzja.** Oficjalne źródła są prawdą; pliki JSON w `data/` są z nich budowane i stanowią
produkt. Można z nich korzystać bez żadnego TypeScriptu: z Pythona, arkusza kalkulacyjnego
(wydania zawierają tabele CSV) albo `jq`. Struktura każdego pliku jest zdefiniowana raz, przez
typy TypeScriptu, i publikowana jako wygenerowany z nich JSON Schema; CI kończy się błędem, gdy
typy, schematy i dane się nie zgadzają. Biblioteka dodaje typy, indeksy i funkcje pomocnicze, a
nic z niej nie jest potrzebne, żeby zrozumieć dane.

**Dlaczego.** Dane referencyjne żyją dłużej niż otaczający je kod, a większość użytkowników
belgijskich danych prawniczych to nie są projekty w JavaScripcie.

**W efekcie.** Każdy plik ma [JSON Schema](./schema) i wpis w `datapackage.json` ze swoimi
źródłami i licencją. Nazwy pól i wartości są wyjaśnione w dokumentacji, nie tylko w kodzie.

## 2. Fakty prawne są danymi, nigdy nie są obliczane {#_2-legal-facts-are-data-never-computed}

**Decyzja.** Wszystko, co ma znaczenie prawne (nazwa sądu, terytorium kantonu, stopa
procentowa), pochodzi dosłownie z oficjalnego źródła i jest zapisywane. Kod może formatować lub
wyszukiwać; nie może konstruować faktu prawnego.

**Dlaczego.** Kod, który składa fakt, może się mylić w sposób, którego testy nie wychwycą:
francuskie nazwy sądów budowane przez wcześniejsze `formatCourtName` były błędne
(`Tribunal de paix …`, podczas gdy sądy nazywają siebie `Justice de paix …`;
[#10](https://github.com/pieterjanscheir/belgica/issues/10)). Zapisaną wartość można sprawdzić
ze źródłem.

**W efekcie.** Nazwy sądów są zapisywane tak, jak publikuje je każdy sąd, w każdym języku, w
którym publikuje, a `formatCourtName` zniknęło. Terytoria kantonów pozostają dosłownym tekstem
prawnym, z podstawą prawną w postaci linku ELI. Gdzie brakuje źródła, brakuje pola: nic nie jest
uzupełniane na podstawie domysłów. To samo dotyczy parsowania: tekst z godzinami otwarcia
zawierający uwagę, numer telefonu bez numeru kierunkowego albo adres zapisany jako zdanie są
pomijane, a nie zgadywane.

## 3. Jedna reguła dla identyfikatorów {#_3-one-identifier-rule}

**Decyzja.** Oficjalny kod, jeśli obejmuje wszystkie rekordy, a w przeciwnym razie kebab-case
małymi literami z nazwy w języku lokalnym; sądy to `type` + miejscowość. Oficjalne kody, które
obejmują tylko część rekordów (ECLI, OVO), są polami. Zobacz [identyfikatory](./identifiers).

## 4. Powiązania są polami {#_4-links-are-fields}

**Decyzja.** Rekordy odwołują się do siebie wyłącznie przez pola zawierające id drugiego
rekordu, nazwane od zbioru danych, do którego wskazują (`arrondissement`, `canton`,
`municipality`). Żadne id nie jest budowane z innego.

**Dlaczego.** Relacja ukryta w formacie napisu psuje się po cichu, gdy zmieni się którakolwiek
ze stron. Pole jest walidowane przez schemat (który wymienia poprawne id) i przez testy.

**W efekcie.** Adres sądu, więzienia lub justitiehuis / maison de justice jest powiązany ze swoją
gminą w ten sam sposób (`address.municipality`), przez kod pocztowy z tabeli konwersji Statbel,
nigdy przez nazwę miasta ([#28](https://github.com/pieterjanscheir/belgica/issues/28)); rekord
kodu pocztowego wskazuje na swoją gminę zamiast kopiować jej nazwę.

## 5. Wartości kanoniczne, prezentacja w kodzie {#_5-canonical-values-presentation-in-code}

**Decyzja.** Każda wartość jest zapisana w jednej kanonicznej, standardowej postaci, a
formatowanie dla ludzi jest funkcją:

| Wartość          | Zapisana jako                   | Standard                        |
| ---------------- | ------------------------------- | ------------------------------- |
| Dzień            | `2024-06-15`                    | ISO 8601                        |
| Telefon          | `+3253820701`                   | E.164                           |
| IBAN             | `BE73679200844560`              | ISO 13616, format elektroniczny |
| Godziny otwarcia | `Mo-Fr 08:30-12:30,13:30-16:00` | OpenStreetMap `opening_hours`   |
| Język            | klucze `nl`, `fr`, `de`         | ISO 639-1                       |

**Dlaczego.** Jedna postać na wartość sprawia, że wartości można porównywać, walidować (suma
kontrolna IBAN jest testowana) i używać w innym oprogramowaniu (linki `tel:`, systemy płatności,
parsery godzin otwarcia). Konwencje wyświetlania zależą od kontekstu; dane nie powinny.

## 6. Pochodzenie przy każdym rekordzie {#_6-provenance-on-every-record}

**Decyzja.** Każdy zbiór danych wymienia swoje źródła, licencję i datę przeglądu w
`datapackage.json`; każdy pobrany ze stron rekord wymienia strony, z których został odczytany, i
dzień, w którym ich treść pojawiła się po raz pierwszy (`sources: [{ url, retrieved }]`).

**Dlaczego.** „Skąd to pochodzi i jak stare to jest?” to pierwsze pytanie przy danych
prawniczych.

## 7. Dane budują maszyny, z przechowywanych snapshotów {#_7-the-data-is-built-by-machines-from-kept-snapshots}

**Decyzja.** Co tydzień workflow pobiera oficjalne źródła, przechowuje strony jako snapshoty na
gałęzi `sources`, przebudowuje z nich dane parserami w `scripts/parse`, testuje je i otwiera pull
request, gdy się zmieniły. Nic nie jest wpisywane ręcznie. Osobne cotygodniowe zadanie sprawdza
brakujące stopy procentowe, zaległe przeglądy i martwe źródła.

**Dlaczego.** Dane prawnicze dezaktualizują się po cichu; ludzie zapominają, harmonogramy nie.
Danych wpisanych ręcznie nie da się sprawdzić ani odtworzyć; parser można przetestować, a
snapshoty pokazują dokładnie, co źródło mówiło danego dnia. Pull request zostawia człowieka w
pętli: dane w `main` nigdy nie zmieniają się bez przeglądu.

**W efekcie.** Snapshoty żyją na własnej gałęzi, więc historia pakietu nie jest obciążona
megabajtami HTML-a. Parsery są testowane na przyciętych kopiach prawdziwych stron. Strona, której
parser nie potrafi umiejscowić, zatrzymuje build, zamiast tworzyć w połowie poprawny rekord. Dwa
źródła odrzucają serwery GitHuba (ejustice, police.be); są pobierane ze zwykłego komputera
([#52](https://github.com/pieterjanscheir/belgica/issues/52)).

## 8. Dystrybucja: tylko ESM, Node 22.12+, budowane przy wydaniu {#_8-distribution-esm-only-node-22-12-built-on-release}

**Decyzja.** Pakiet jest wyłącznie ESM, wymaga Node 22.12 lub nowszego, a wynik builda nie jest
commitowany: buduje go i publikuje w npm workflow wydania, z provenance.

**Dlaczego.** Node 18 i 20 osiągnęły koniec wsparcia. Od Node 22.12 `require()` ładuje ESM,
więc osobny build CommonJS dodałby tylko drugą kopię danych (dual-package hazard) i więcej do
testowania. Commitowany wynik builda się dezaktualizuje i psuł automatyczne aktualizacje
zależności.

**W efekcie.** Działają zarówno `import`, jak i `require()`, testowane na Node 22.12, 22, 24 i 26. Każdy zbiór danych ma własny entry point, więc aplikacja, która potrzebuje tylko stóp
procentowych, ładuje kilka kilobajtów, a nie sądy i tekst prawny każdego kantonu ([strona
pierwszych kroków](./getting-started#import-only-what-you-need) mierzy każdy z nich na podstawie
builda).

## 9. Typy, które niosą gwarancje danych {#_9-types-that-carry-the-data-s-guarantees}

**Decyzja.** Id są generowanymi typami unii; zbiory danych są `readonly`; wyszukiwania ze znanym
id zwracają rekord, a nie `record | undefined`; zamknięte słowniki (typy sądów, rodzaje, typy
kontaktów) są uniami. Etykiety kontaktów są wolnym tekstem, tak jak publikuje je sąd: zamknięta
lista oznaczałaby mapowanie setek nazw z rejestrów na kilka słów, czyli zgadywanie.

**Dlaczego.** Błędy wychodzą na jaw podczas pisania kodu, a nie na produkcji, a typy dokumentują
dane.

## 10. Bramki jakości {#_10-quality-gates}

**Decyzja.** Każda zmiana musi przejść: ścisły TypeScript (w tym `noUncheckedIndexedAccess` i
`exactOptionalPropertyTypes`), ESLint ze ścisłymi regułami opartymi na typach, Prettier, 100 %
pokrycia testami `src/`, walidację JSON Schema wszystkich danych, testy spójności (id, powiązania,
liczby, okresy) oraz `publint` + `arethetypeswrong` na spakowanym pakiecie.

**Dlaczego.** Na pakiecie referencyjnym warto polegać tylko wtedy, gdy jest bardziej niezawodny
niż ręczne kopiowanie danych.

## 11. Czas jest częścią modelu {#_11-time-is-part-of-the-model}

**Decyzja.** Rekordy mają okres obowiązywania (`validFrom`, `validTo`, oba dni włącznie), każdy
zbiór danych podaje, od którego dnia opisuje stan rzeczy (`territoryCoverage` oraz
`temporalCoverage` w `datapackage.json`), a wyszukiwania przyjmują opcjonalny dzień: `getCanton(id, {
on })`, `getCantonsForMunicipality(refnis, { on })`. Dzień sprzed zakresu powoduje `RangeError`.

**Dlaczego.** Pytania prawne dotyczą konkretnego dnia: który sąd był właściwy, gdy doręczono
pozew, jaka stopa obowiązywała, gdy faktura stała się wymagalna. Kantony, gminy i sądy się
zmieniają; model, który zna tylko „teraz”, odpowiada na pytania o przeszłość dzisiejszą mapą i
wygląda przy tym na poprawny. Dodanie czasu później zmieniłoby każde id i każde wyszukiwanie,
więc jest on w modelu, zanim historia trafi do danych
([#27](https://github.com/pieterjanscheir/belgica/issues/27)).

**W efekcie.** Stopy procentowe już mają okresy. Wyszukiwanie po id bez dnia zwraca dzisiejszą
wersję, więc znane id zachowują typ bez `undefined`; z dniem może nic nie znaleźć. Każdy zbiór
danych ma okres, nie tylko terytorium: pobrany ze strony rekord, którego źródło przestaje
wymieniać, zostaje wycofany przez `validTo`, a nie usunięty (`scripts/parse/retire.ts`), więc
raz opublikowane id zostaje, a sąd, który zostaje zamknięty, nadal jest sądem, który wskazywał
zeszłoroczny pozew.

## 12. Wydania zawierają dane, nie tylko pakiet {#_12-releases-carry-the-data-not-only-the-package}

**Decyzja.** Każde wydanie na GitHubie zawiera dane jako JSON i jako tabele CSV, ze schematami i
`datapackage.json`, w jednym pliku zip. npm to jeden ze sposobów zdobycia danych, nie jedyny.

**Dlaczego.** Osoby, które najbardziej potrzebują belgijskich prawniczych danych referencyjnych,
pracują w arkuszach kalkulacyjnych i innych językach, nie w JavaScripcie.

## 13. Geometria jest drugim źródłem, a tekst wygrywa {#_13-geometry-is-a-second-source-and-the-text-wins}

**Decyzja.** Granice kantonów to digitalizacja załącznika do Gerechtelijk Wetboek / Code
judiciaire (belgijskiego kodeksu sądowego) wykonana przez NGI (Nationaal Geografisch Instituut /
Institut géographique national), przejęta w opublikowanej postaci (wierzchołek po wierzchołku,
bez upraszczania, współrzędne z dokładnością do centymetra) i dopasowana do kantonów po nazwie w
obu językach, z jawną tabelą aliasów dla pozostałych. Tekst `territory` kantonu pozostaje prawem:
gdy geometria i tekst się różnią, wygrywa tekst. Geometria ma własny entry point, a główny punkt
pakietu jej nie reeksportuje.

**Dlaczego.** Wielokąty NGI są oficjalnym odczytaniem tego samego tekstu, więc można je cytować
i odtworzyć; granica wyprowadzona tutaj z danych o ulicach byłaby trzecim odczytaniem, którego
nikt nie może sprawdzić. Upraszczanie przesunęłoby linię, a linie mają największe znaczenie tam,
gdzie kantony się stykają. Milion pozycji przyćmiłby każdy inny zbiór danych, więc nikt nie
powinien ładować ich przypadkiem.

**W efekcie.** `findCantonsAt(lon, lat)` odpowiada na podstawie geometrii i dokumentacja to
mówi; punkt blisko linii to sprawa dla tekstu. Cotygodniowy build kończy się błędem, gdy kanton
nie ma granicy albo obiekt geometrii nie pasuje do żadnego kantonu
([#29](https://github.com/pieterjanscheir/belgica/issues/29)).

## Jeszcze nierozstrzygnięte {#not-decided-yet}

| Pytanie                                                   | Issue                                                                                     |
| --------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| Historia sprzed 1 stycznia 2025                           | [#27](https://github.com/pieterjanscheir/belgica/issues/27)                               |
| Obliczanie odsetek za okres (liczenie dni, kapitalizacja) | Nieplanowane, dopóki metody nie da się oprzeć na orzecznictwie lub oficjalnych wytycznych |
