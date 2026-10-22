# Współtworzenie {#contributing}

## Aktualizacja danych {#updating-data}

Sądy, więzienia, justitiehuizen / maisons de justice i granice kantonów są co tydzień budowane z
oficjalnych źródeł ([jak](./data-quality#how-the-data-is-built)): nie edytuj ich ręcznie. Popraw
parser w `scripts/parse` albo, jeśli błędne jest samo źródło, zgłoś to sądowi. Cotygodniowy pull
request przechodzi przegląd jak każdy inny: przed mergem porównaj diff ze źródłami.

Dla zbiorów danych prowadzonych ręcznie (obszary sądowe, okręgi sądowe, stopy procentowe):

1. Edytuj JSON w `data/`. Zachowaj istniejące id: projekty je zapisują.
2. Zaktualizuj `lastReviewed` dla zbioru danych w `datapackage.json`, jeśli sprawdziłeś go ze
   źródłami.
3. `pnpm check`: ponownie generuje typy id i schematy, sprawdza typy, uruchamia lint i kontrolę
   formatowania, build, testy z pokryciem i lint pakietu. Kończy się błędem, gdy wygenerowane
   pliki nie są zacommitowane.
4. Dodaj wiersz do `CHANGELOG.md` w sekcji Unreleased i zrób commit (łącznie z `schema/`,
   `src/ids.generated.ts` i `ids.lock.json`). Wynik builda (`dist/`) nie jest commitowany: jest
   budowany przy każdym wydaniu i publikowany w npm.

Opublikowane id zostaje: `ids.lock.json` wymienia je wszystkie, a testy kończą się błędem, gdy
któregoś brakuje w danych. Jeśli źródło zmieniło nazwę rekordu, zmapuj nową nazwę na istniejące
id w parserze; jeśli rekord przestał istnieć, zachowaj go z `validTo`. Zobacz
[identyfikatory](./identifiers#stability).

### Kantony i gminy {#cantons-and-municipalities}

`data/cantons.json` i `data/municipalities.json` są generowane; nie edytuj ich ręcznie. Uruchom
`pnpm build:cantons` (wymaga dostępu do sieci i `unzip`). Czyta on:

- załącznik do Gerechtelijk Wetboek / Code judiciaire, „Gebiedsomschrijving en zetel van hoven
  en rechtbanken”
  ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  po niderlandzku i po francusku;
- plik Statbel z liczbą ludności według gmin, dla obecnych gmin i kodów REFNIS.

Parsuje teksty niderlandzki i francuski osobno i odmawia zapisania czegokolwiek, jeśli się nie
zgadzają albo jeśli któraś gmina nie jest objęta dokładnie raz (lub podzielona między kilka
kantonów). Egzonimy, których używa załącznik, a Statbel nie (`Gembloers`, `Saint-Nicolas`, …),
literówki w załączniku i wzmianki o granicach, których nie potrafi rozróżnić, są wymienione na
początku skryptu.

Uruchom go ponownie, gdy ustawa zmieni załącznik albo gminy się połączą. Id kantonów stosują
język lokalny (niderlandzki we Flandrii i w Brukseli, francuski w Walonii, niemiecki w okolicach
Eupen); vredegerecht / justice de paix kantonu `x` ma id `justice-of-the-peace-x` i jest z nim
powiązany przez swoje pole `canton`.

### Zbiory danych pobierane ze stron {#scraped-datasets}

```bash
pnpm fetch:sources            # każde źródło do .sources/ (około 20 minut, uprzejmie)
pnpm fetch:sources courts     # albo jedno źródło
pnpm build:data               # przebuduj sądy, więzienia, justitiehuizen, kody pocztowe, regiony i prowincje z .sources/
```

Granice kantonów pochodzą z GeoPackage NGI (źródło `ngi`), czytanego wbudowanym SQLite Node'a;
gdy NGI zmieni nazwę kantonu, zmapuj jego kod na id w `CANTON_ALIASES` w
`scripts/parse/boundaries.ts`.

Możesz też zamiast pobierania zrobić checkout najnowszych snapshotów:
`git worktree add .sources origin/sources`.

Źródło to walk w `scripts/sources/catalog.ts`; parser czyta jego snapshoty w `scripts/parse`.
Gdy serwis zmieni znaczniki, testy parserów w `test/parse` (na przyciętych kopiach prawdziwych
stron w `test/fixtures/sources`) pokazują, co się zepsuło.

### Nowe stopy procentowe {#new-interest-rates}

- **Handlowa**: FOD Financiën publikuje stopę na każde półrocze. Dodaj okres z `from`, `to`,
  `rate` i datą Staatsblad w `note`.
- **Ustawowa**: publikowana na każdy rok kalendarzowy. Dodaj okres dla danego roku.

## Dodawanie zbioru danych {#adding-a-dataset}

Każdy zbiór danych jest traktowany tak samo, żeby użytkownicy mogli na nim polegać:

1. **Dane**: `data/<name>.json`, tablica rekordów. Każda wartość z oficjalnego źródła.
2. **Id**: stosuj [reguły identyfikatorów](./identifiers): oficjalny kod, jeśli istnieje, w
   przeciwnym razie kebab-case małymi literami z nazwy w języku lokalnym (`scripts/id.ts`).
3. **Powiązania, nie kopie**: odwołuj się do okręgów sądowych, kantonów i gmin przez id i używaj
   wspólnych typów (`Translated`, `Address`, `Contact`, `SourceRef`).
4. **Źródła**: `sources: [{ url, retrieved }]` przy każdym rekordzie i wpis w `datapackage.json`
   ze źródłami zbioru danych, licencją, `lastReviewed` i `reviewEveryMonths`.
5. **Typy i funkcje pomocnicze**: `src/<name>.ts`, eksportowane z `src/index.ts`, plus entry
   point w `tsup.config.ts` i w `exports` w `package.json`.
6. **Schemat**: dodaj typ pliku do `scripts/schema-types.ts` i `scripts/build-schemas.ts`.
7. **Źródło i parser**: walk w `scripts/sources/catalog.ts`, który pobiera oficjalne strony, i
   parser w `scripts/parse`, który buduje plik ze snapshotów, z fixture'ami i testami. Czyta tylko
   to, co potrafi odczytać na pewno, a resztę raportuje.
8. **Testy**: unikalne id, odwołania, które się rozwiązują, i liczba podana przez oficjalne
   źródło.
9. **Dokumentacja**: strona w `docs/data/` z tym, do czego zbiór się przydaje, źródłem i
   aktualizacjami oraz tabelą pól.

## Kontrole {#checks}

| Polecenie                   | Co robi                                                                                                                                                                     |
| --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                | Wszystko, co uruchamia CI: `generate`, `typecheck`, `lint`, `build`, `test:coverage`, `test:package`, `lint:package` i sprawdzenie, czy wygenerowane pliki są zacommitowane |
| `pnpm test`                 | Testy jednostkowe, spójności, schematów i typów na kodzie źródłowym (bez builda)                                                                                            |
| `pnpm test:package`         | Testy dymne zbudowanego pakietu z `import` i `require()`: najpierw uruchom `pnpm build`                                                                                     |
| `pnpm test:coverage`        | To samo, z błędem poniżej 100 % pokrycia `src/`                                                                                                                             |
| `pnpm lint` / `pnpm format` | ESLint i Prettier: sprawdzenie / poprawienie                                                                                                                                |
| `pnpm generate`             | Generuje ponownie `src/ids.generated.ts` (typy id) i `schema/` z danych i typów oraz dodaje nowe id do `ids.lock.json`                                                      |
| `pnpm lint:package`         | `publint` i `arethetypeswrong` na spakowanym pakiecie                                                                                                                       |
| `pnpm test:freshness`       | Kontrole oparte na datach: brakujące stopy, zaległe przeglądy. Nie jest częścią `check`; `FRESHNESS_ONLINE=1` sprawdza też URL-e źródeł                                     |
| `pnpm fetch:sources`        | Pobiera oficjalne źródła do `.sources/`                                                                                                                                     |
| `pnpm build:data`           | Przebudowuje sądy, więzienia, justitiehuizen / maisons de justice, kody pocztowe, regiony, prowincje i granice kantonów z `.sources/`                                       |
| `pnpm build:csv`            | Zapisuje dane jako tabele CSV do `csv/`                                                                                                                                     |

## Wydawanie {#releasing}

1. Przenieś wpisy z sekcji Unreleased w `CHANGELOG.md` pod nową wersję.
2. Podbij `version` w `package.json` i zrób commit.
3. Otaguj i wypchnij: `git tag v0.3.0 && git push && git push --tags`.

Workflow wydania uruchamia `pnpm check`, publikuje tag w npm z provenance i tworzy wydanie na
GitHubie z dołączonymi danymi, schematami i tabelami CSV. Tag musi odpowiadać `version`.

## Ta strona {#this-website}

Strona znajduje się w `docs/` i jest budowana za pomocą [VitePress](https://vitepress.dev).
Interaktywne tabele importują własne `src/` i `data/` pakietu, więc zawsze pokazują dane z
repozytorium.

```bash
pnpm docs:dev      # lokalny serwer z hot reload
pnpm docs:build    # statyczna strona w docs/.vitepress/dist
pnpm docs:preview  # serwuje zbudowaną stronę
```

Każdy push do `main` wdraża ją na GitHub Pages. CI buduje ją przy każdym pull requeście, więc
zepsuta strona zostaje wykryta przed mergem.

### Tłumaczenia {#translations}

Angielskie strony w `docs/` są źródłem prawdy. Każdy inny język ma to samo drzewo we własnym
folderze: niderlandzki (`docs/nl/`) i francuski (`docs/fr/`) oraz niemiecki, hiszpański,
włoski, portugalski, polski, turecki, arabski, ukraiński, chiński i japoński (`docs/de/`,
`docs/es/` i tak dalej). Są tłumaczeniami strony angielskiej i są aktualizowane po jej zmianie.
Gdy zmieniasz stronę angielską, zmień też tę samą stronę w `docs/nl/` i `docs/fr/` albo napisz w
pull requeście, że tłumaczenia są opóźnione; pozostałe języki mogą być opóźnione o jedno
wydanie. Teksty motywu i komponentów interaktywnych w tych pozostałych językach są w
`docs/.vitepress/locales/`.

Kod, id, nazwy pól i nazwy oficjalne pozostają bez zmian w każdym języku, a każdy nagłówek
zachowuje angielską kotwicę (`## Heading {#english-anchor}`), żeby odnośniki i przełącznik
języka nadal działały. Belgijska instytucja lub termin prawny zachowuje swoją oficjalną nazwę
niderlandzką lub francuską (albo niemiecką, jeśli Belgia ją publikuje) zamiast wymyślonego
tłumaczenia: chińska strona pisze vredegerecht / justice de paix, a nie wymyślone słowo. Changelog
jest prowadzony tylko po angielsku.
