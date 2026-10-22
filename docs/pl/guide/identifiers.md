# Identyfikatory {#identifiers}

Każdy rekord ma `id`. Odwołują się do niego inne rekordy, twoja baza danych i twoje URL-e, więc
id musi być raz ustalone poprawnie, a potem nigdy się nie zmieniać. Ta strona opisuje reguły,
powód każdej z nich i to, co się dzieje, gdy prawo zmienia rzecz, którą id nazywa.

## Reguły {#the-rules}

1. **Każdy rekord ma pole `id`**, unikalne w obrębie swojego zbioru danych. Kod ogólny (indeks,
   cache, formularz) traktuje każdy zbiór danych tak samo.
2. **Oficjalny kod wygrywa, jeśli obejmuje wszystkie rekordy.** Gdy władze nadają kod każdemu
   rekordowi zbioru danych, id _jest_ tym kodem: gminy używają swojego kodu REFNIS ze Statbel
   (`44021` dla Gent). Kod, który obejmuje tylko część rekordów, jest zamiast tego trzymany jako
   pole: sądy mają swoje kody ECLI w `ecli`, flamandzkie justitiehuizen swój numer OVO w `ovo`
   (zobacz [dlaczego](#why-not-the-official-court-codes)).
3. **W przeciwnym razie kebab-case ASCII małymi literami**: `^[a-z0-9]+(-[a-z0-9]+)*$`, budowany
   przez [`scripts/id.ts`](https://github.com/pieterjanscheir/belgica/blob/main/scripts/id.ts):
   akcenty są usuwane, a wszystko inne, co nie jest literą ani cyfrą, staje się jednym myślnikiem.
   `Merelbeke-Melle` → `merelbeke-melle`, `Braine-l'Alleud` → `braine-l-alleud`,
   `Liège` → `liege`.
4. **Z oficjalnej nazwy w języku lokalnym**: niderlandzkim we Flandrii, francuskim w Walonii,
   niemieckim w okolicach Eupen. Bruksela jest oficjalnie dwujęzyczna i wymaga jednego stałego
   wyboru: niderlandzkiego.
5. **Numer jest przyrostkiem**: miejscowości z kilkoma kantonami dostają `gent-1` … `gent-5`.
6. **Sądy to `type` + miejscowość**: `justice-of-the-peace-gent-1`, `court-of-appeal-liege`.
   Vredegerecht / justice de paix przejmuje id swojego kantonu. Dwa sądy jednego typu w Brukseli,
   po jednym na język, dodają `-nl` lub `-fr` (`police-court-brussel-fr`). Wydział lub siedziba
   dodaje własną miejscowość do id swojego sądu (`enterprise-court-gent-brugge`). Prefiks
   zapewnia unikalność id, gdy Gent ma vredegerecht, ondernemingsrechtbank i arbeidsrechtbank, i
   jest dokładnie polem `type` rekordu, więc nigdy nie potrzebuje drugiego słownika.
7. **Więzienia i justitiehuizen / maisons de justice to ich nazwa** w języku lokalnym, bez
   rodzajników: `gevangenis-gent`, `prison-lantin`, `justitiehuis-gent`, `maison-justice-arlon`.
   Ich nazwy już mówią, czym są, a dwie instytucje w jednym mieście (więzienie centralne i
   pomocnicze w Leuven) różnią się nazwą.
8. **Powiązania są polami, nigdy wyprowadzonymi napisami.** Vredegerecht ma pole `canton`; kanton
   wymienia `{ municipality }`; okręg sądowy ma `judicialArea`. Każde z nich zawiera id rekordu,
   na który wskazuje, a pole jest nazwane od zbioru danych, do którego wskazuje.

Wszystko to egzekwują testy (`test/ids.test.ts`) oraz [JSON Schema](./schema), które wymieniają
poprawne id, więc wiszące powiązanie nie przechodzi walidacji.

## Id {#the-ids}

| Zbiór danych                        | Przykłady                                                                                                                 | Reguła                    |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| Obszary sądowe                      | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                                                                           | Nazwa lokalna             |
| Okręgi sądowe                       | `oost-vlaanderen`, `brabant-wallon`, `eupen`                                                                              | Nazwa lokalna             |
| Kantony                             | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1`                                                  | Nazwa lokalna + numer     |
| Granice kantonów                    | `gent-1`: jedna granica na kanton, z id kantonu, i `canton` jako powiązanie                                               | Id kantonu                |
| Gminy                               | `44021`, `21004`                                                                                                          | Kod REFNIS                |
| Prowincje                           | `10000`, `40000`                                                                                                          | Kod REFNIS                |
| Regiony                             | `02000`, `03000`, `04000`                                                                                                 | Kod REFNIS                |
| Kody pocztowe                       | `9000-44021`, `1040-21005`                                                                                                | Kod pocztowy + kod REFNIS |
| Sądy                                | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`, `police-court-brussel-fr`, `police-court-eupen-sankt-vith` | Typ + miejscowość         |
| Więzienia                           | `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                               | Nazwa lokalna             |
| Justitiehuizen / maisons de justice | `justitiehuis-gent`, `maison-justice-arlon`                                                                               | Nazwa lokalna             |
| Stopy procentowe                    | `legal`, `commercial`                                                                                                     | Stałe klucze              |

## Dlaczego takie wybory {#why-these-choices}

**Dlaczego kebab-case?** Id trafiają do URL-i (`/cantons/gent-1`), nazw plików, klas CSS,
kluczy w bazach danych i wierszy logów. Małe litery zapobiegają kolizjom w systemach
niewrażliwych na wielkość liter (systemy plików macOS i Windows, wiele collation baz danych):
`Gent1` i `gent1` byłyby dwoma id w danych i jednym plikiem na dysku. Myślniki zachowują
czytelne granice słów bez wielkich liter, a ten zestaw znaków nigdzie nie wymaga escapowania.

**Dlaczego czytelne id zamiast liczb lub UUID?** Zbiór danych referencyjnych czytają ludzie:
`justice-of-the-peace-gent-1` w wierszu bazy danych albo w komunikacie błędu mówi, o co chodzi.
Id są tak stabilne, jak byłyby liczby, bo zmieniają się tylko wtedy, gdy prawo zmienia rzecz,
którą nazywają (zobacz niżej), a wtedy nowe id jest właściwym wynikiem.

**Dlaczego język lokalny, a nie angielski?** Angielskie nazwy istnieją dla garstki miejscowości
(Ghent, Antwerp, Liege), a nie dla 162 kantonów, więc angielskie id oznaczałyby dwie reguły.
Nazwa lokalna jest też tą, której używa sama instytucja, i występuje w tekstach oficjalnych.

**Dlaczego oficjalne kody?** REFNIS to kod, którego używają Statbel, regiony i niemal każdy
belgijski zbiór danych. Gdy kod jest id, połączenie któregokolwiek z nich z kantonami i sądami
nie wymaga tabeli mapowania.

**Dlaczego dwa kody dla kodu pocztowego?** Sam kod pocztowy nie wskazuje rekordu: `1040`
należy do Brussel i do Etterbeek, a każda para jest osobnym rekordem z własnym okresem
obowiązywania. Para oficjalnych kodów, `1040-21005`, jest unikalna i pozostaje taka, dopóki
tabela Statbel nie zmieni pary, a wtedy właśnie nowy rekord jest właściwy. Gmina jest też polem
(`municipality`), zgodnie z regułą 8: id jest kluczem, a nie czymś do rozdzielania.

**Dlaczego `type` w id sądów?** W jednej miejscowości jest kilka sądów, a typów sądów będzie
przybywać (politierechtbanken, arbeidsrechtbanken, rechtbanken van eerste aanleg…). Własne pola
sądu mówią, czym on jest; id musi być tylko unikalne i rozpoznawalne, a typ zapewnia jedno i
drugie.

**Dlaczego nie oficjalne kody sądów?** Sądy mają dwa oficjalne kody i żaden nie obejmuje
wszystkich sądów. Kody ECLI (`HBGNT` dla hof van beroep w Gent) istnieją dla każdego sądu i
każdego języka, nie dla wydziału, i żaden nie pojawia się w opublikowanych orzeczeniach
vredegerechten / justices de paix. Numery przedsiębiorstw (KBO) należą do FOD Justitie / SPF
Justice (federalnego ministerstwa sprawiedliwości); ich jednostki lokalne odpowiadają budynkom, a
nie sądom, i zmieniają się, gdy sąd się przeprowadza. Reguła, która obowiązuje dla każdego
rekordu, jest lepsza niż dwie reguły, więc kody ECLI są polem (`ecli`), a id stosuje regułę 6.

**Dlaczego jawne powiązania?** Stary schemat budował id sądu przez połączenie `Vredegerecht` i
id kantonu. To ukrywa relację w formacie napisu, który psuje się w chwili, gdy jeden sąd obsługuje
dwa kantony albo zmienia się nazwa. Pole `canton` jest sprawdzane przez schemat i testy i można
nim podążać w obu kierunkach.

## W TypeScripcie {#in-typescript}

Każdy zbiór danych ma generowany typ id (`CantonId`, `CourtId`, `MunicipalityId`, `ProvinceId`,
`RegionId`, `ArrondissementId`, `JudicialAreaId`, `PrisonId`, `HouseOfJusticeId`, `PostalCodeId`),
generowany ponownie z danych przez `pnpm build:ids`:

```ts
import { getCanton, type CantonId } from 'belgica'

getCanton('gent-1') // Canton: znane id zawsze znajduje swój rekord
getCanton(userInput) // Canton | undefined: dowolny inny napis może nie znaleźć

const id: CantonId = 'gent1' // błąd kompilacji: to nie jest id kantonu
```

Używaj typów id dla wartości, które zapisujesz, żeby literówka albo usunięte id zostały wykryte
przy aktualizacji.

## Gdy prawo zmienia id {#when-the-law-changes-an-id}

Kantony i gminy rzeczywiście się zmieniają: gminy łączono w 2019 i 2025 roku, a ustawy
wyznaczają kantony na nowo. Rekordy mają okres obowiązywania (`validFrom`, `validTo`), więc
zmiana dodaje historię, zamiast ją wymazywać:

1. Stary rekord zostaje, z `validTo`; nowy dostaje nowe id i `validFrom`. Id nigdy nie jest
   używane ponownie dla innej rzeczy, więc id zapisane lata temu nadal znajduje to, co oznaczało.
2. Bez dnia wyszukiwania odpowiadają dla dnia dzisiejszego: wyszukiwanie po id zwraca wersję
   obowiązującą dziś (ostatnią, w przypadku rekordu, który wygasł), a listy, takie jak
   `getCantonsForMunicipality`, tylko to, co obowiązuje dziś. Z `{ on }` oba odpowiadają dla
   tego dnia.
3. Changelog wymienia każde nowe id i id, które ono zastępuje.

Sama zmiana nazwy, na przykład poprawka pisowni, nie zmienia id. Historii sprzed 1 stycznia 2025
nie ma jeszcze w danych ([#27](https://github.com/pieterjanscheir/belgica/issues/27)):
wyszukiwanie dla wcześniejszego dnia rzuca `RangeError`, zamiast odpowiadać dzisiejszą mapą.

## Id są nieprzezroczyste {#ids-are-opaque}

Id jest kluczem, a nie formatem. `court-of-first-instance-luxembourg-marche-en-famenne` nie da
się z powrotem rozdzielić na typ, miejscowość i wydział, bo typ, miejscowość i przyrostek języka
używają tego samego myślnika. Nie parsuj id: każda część id jest też polem (`type`, `court`,
`canton`, `arrondissement`), a to pola są sprawdzane przez schematy i testy.

## Stabilność {#stability}

Id są publicznym API. Dodanie rekordów to wersja minor, poprawienie wartości to patch, a
usunięcie lub zmiana nazwy id to wersja major. Wersja 0.3.0 zastępuje wcześniejsze id w
PascalCase (`VredegerechtGent1`, `EastFlanders`) tym schematem, zanim pakiet miał jakichkolwiek
użytkowników; [changelog](./changelog) zawiera mapowanie.

Ta obietnica jest sprawdzana, a nie tylko składana. `ids.lock.json` wymienia każde id, jakie
pakiet opublikował, dla każdego zbioru danych; `pnpm generate` dodaje do niego nowe id i nigdy
żadnego nie usuwa, a `test/ids.test.ts` kończy się błędem, gdy w danych brakuje zablokowanego id.
Dlatego scraper, który czyta stronę ze zmienionym tytułem, wygenerowana od nowa lista kantonów
albo ręczna edycja nie mogą niezauważenie usunąć ani zmienić nazwy id: cotygodniowy pull request
z danymi kończy się błędem, a człowiek mapuje nową nazwę na istniejące id w parserze albo kończy
rekord przez `validTo`. Usunięcie id z locka jest świadomym działaniem, dla wersji major, z id i
jego zastępstwem w changelogu.
