# Plan rozwoju {#roadmap}

Planowane zbiory danych, każdy z issue, które go opisuje. Każde issue wymienia oficjalne źródła,
proponowane pola i to, co oznacza „gotowe”. Pomoc jest mile widziana: wybierz jedno i stosuj
[konwencje](/pl/guide/contributing#adding-a-dataset).

## Zaplanowane {#planned}

| Zbiór danych                                                                                                                                               | Do czego się przydaje                                                                                       | Issue                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Pozostałe sądy**: Hof van Cassatie / Cour de cassation, Grondwettelijk Hof / Cour constitutionnelle, Raad van State / Conseil d'État, sądy dyscyplinarne | Najwyższych sądów nie ma na portalu sądów, więc potrzebują własnych źródeł                                  | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **Justitiehuis / maison de justice w Eupen** (Wspólnota Niemieckojęzyczna)                                                                                 | Jedyna placówka, której dane jeszcze nie mają                                                               | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Historia**: kiedy zmieniały się kantony, gminy i sądy                                                                                                    | Model ma okresy obowiązywania i wyszukiwania według dnia; wcześniejsze wersje wciąż potrzebują danych       | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Adres → współrzędne**                                                                                                                                    | [Granice kantonów](./canton-boundaries) znajdują kanton punktu; brakującym krokiem jest geokodowanie adresu | [#28](https://github.com/pieterjanscheir/belgica/issues/28) |
| **Kancelarie komornicze** (gerechtsdeurwaarders / huissiers de justice)                                                                                    | Znalezienie komornika w okręgu sądowym do doręczeń lub egzekucji                                            | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Strefy policyjne** (politiezones / zones de police)                                                                                                      | Która strefa obsługuje gminę: skargi, kopie protokołów                                                      | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Urzędy katastralne i urzędy pewności prawnej** (kadaster, dawne hypotheekkantoren)                                                                       | Zamawianie zaświadczeń hipotecznych i wypisów katastralnych we właściwym urzędzie                           | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## Warte rozważenia {#worth-considering}

Zebrane w [#9](https://github.com/pieterjanscheir/belgica/issues/9), mniej więcej według tego,
jak często byłyby używane:

- **Części gmin** (deelgemeenten / sections de commune) dla każdego kodu pocztowego.
  [Kody pocztowe](./postal-codes) kończą się na gminie; lista bpost podaje miejscowości, ale nie
  ma kodu REFNIS ani otwartej licencji.
- **Opłaty sądowe** (rolrechten / griffierechten) i przedziały **rechtsplegingsvergoeding /
  indemnité de procédure** (zryczałtowanego zwrotu kosztów postępowania), z okresami
  obowiązywania i indeksacją, podobnie jak stopy procentowe.
- **Ferie sądowe i dni ustawowo wolne od pracy** na każdy rok, do obliczania terminów
  procesowych.
- **Prokuratury** (parketten, arbeidsauditoraten) dla każdego okręgu sądowego.
- **Notariusze i izby notarialne**, **izby adwokackie** (balies / barreaux).
- **Połączenia gmin**: stare → nowe kody REFNIS dla 2019 i 2025, żeby można było mapować
  starsze dane.
- **Indeks zdrowia** (gezondheidsindex) do indeksacji czynszów.

## Dlaczego niektórych zbiorów danych jeszcze nie ma {#why-some-datasets-aren-t-here-yet}

Prawniczy zbiór danych jest użyteczny tylko wtedy, gdy każda wartość pochodzi z oficjalnego
źródła, więc nic nie jest dodawane ręcznie z pamięci. Każdy zbiór danych jest budowany przez
skrypt ze snapshotów swojego źródła, a większość źródeł jest pobierana co tydzień przez GitHub
Actions. Dwóch na razie nie da się tak pobrać: strona Belgisch Staatsblad / Moniteur belge
(ejustice), z której pochodzą kantony, oraz police.be odrzucają połączenia z serwerów GitHuba;
zamiast tego są pobierane ze zwykłego komputera
([#24](https://github.com/pieterjanscheir/belgica/issues/24)). Katalog komorników jest budowany w
przeglądarce, więc do jego odczytania potrzebna jest przeglądarka albo dane Nationale Kamer van
Gerechtsdeurwaarders / Chambre nationale des huissiers de justice
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
