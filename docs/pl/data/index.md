# Zbiory danych {#datasets}

Każdy zbiór danych to plik JSON w `data/`, opisany przez [JSON Schema](/pl/guide/schema) i
wymieniony w [`datapackage.json`](/pl/guide/schema#datapackage-json) wraz z oficjalnymi
źródłami, licencją i datą, kiedy ostatnio sprawdzono go z tymi źródłami.

| Zbiór danych                                               | Rekordy | Do czego się przydaje                                                                          |
| ---------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------- |
| [Obszary sądowe](./territory#judicial-areas)               | 5       | Który hof van beroep / cour d'appel (i arbeidshof / cour du travail) rozpatruje apelację       |
| [Okręgi sądowe](./territory#arrondissements)               | 12      | Grupowanie sądów, prokuratur i komorników; jednostka, której używa większość reguł właściwości |
| [Kantony](./territory#cantons)                             | 162     | Który vredegerecht / justice de paix jest właściwy dla adresu                                  |
| [Granice kantonów](./canton-boundaries)                    | 162     | Kanton punktu w podzielonym mieście; kantony na mapie (GeoJSON)                                |
| [Gminy](./territory#municipalities)                        | 565     | Łączenie dowolnego belgijskiego adresu lub statystyki z mapą sądową przez kod REFNIS           |
| [Regiony](./territory#regions)                             | 3       | Region gminy, po kodzie REFNIS, z nazwami w trzech językach                                    |
| [Prowincje](./territory#provinces)                         | 10      | Prowincja gminy (w Brukseli brak), z jej regionem                                              |
| [Kody pocztowe](./postal-codes)                            | 1 152   | Od kodu pocztowego adresu do jego gminy, a dalej do jej kantonów i sądów                       |
| [Sądy](./courts)                                           | 347     | Nazwy, adresy i dane kontaktowe sekretariatów, by pisać do sądu, składać pisma lub płacić      |
| [Więzienia](./prisons)                                     | 39      | Adresy i dane kontaktowe każdego więzienia i detentiehuis / maison de détention                |
| [Justitiehuizen / maisons de justice](./houses-of-justice) | 27      | Probacja, pomoc ofiarom i wywiady społeczne dla familierechtbanken / tribunaux de la famille   |
| [Stopy procentowe](./interest-rates)                       | 2 serie | Obliczanie odsetek za opóźnienie w płatności od roszczenia                                     |

## Jak zbiory danych się łączą {#how-the-datasets-fit-together}

```
Obszar sądowy ──< Okręg sądowy ──< Kanton >──< Gmina (REFNIS) ──< Kod pocztowy
      │                │             │  │
      │                │             │  └── Granica kantonu   geometria kantonu (NGI)
      └────────────── Sąd ───────────┘  vredegerecht wskazuje na swój kanton,
                       │                a adres każdego sądu na swoją gminę
                       └──< Wydział     wydział wskazuje na swój sąd
```

`──<` czytaj jako „ma wiele”. Gmina leży zwykle w jednym kantonie; podzielone miasta
(Antwerpen, Gent, Brussel, Luik, …) leżą w kilku. Po stronie administracyjnej: `Region ──<
Prowincja ──< Gmina`, z tym że Region Stołeczny Brukseli nie ma prowincji i obejmuje swoje 19
gmin bezpośrednio.

Rekordy łączą się ze sobą przez id, nigdy przez nazwę: sąd ma id `judicialArea`, a gdy jego
obszarem jest jeden okręg sądowy (arrondissement), także id `arrondissement`; kanton wymienia kody REFNIS swoich
gmin; kod pocztowy i adres sądu zawierają kod REFNIS swojej gminy. Pisownia nazw różni się między
źródłami i językami; id nie.

## Do czego przydają się te dane {#why-this-data-is-useful}

Praca prawnicza w Belgii wciąż wymaga tych samych wyszukiwań, a z oficjalnych źródeł trudno
korzystać w kodzie:

- **Właściwość.** Vredegerecht / justice de paix (sąd pokoju), politierechtbank / tribunal de
  police i wiele innych sądów są właściwe miejscowo. Ustawa (załącznik do Gerechtelijk Wetboek /
  Code judiciaire) opisuje te obszary prozą, częściowo ulica po ulicy. `cantons.json` zamienia
  to w wyszukiwanie od gminy do kantonu i zachowuje tekst prawny dla podzielonych miast;
  `canton-boundaries.json` dodaje geometrię NGI, więc punkt w podzielonym mieście znajduje swój
  kanton.
- **Poprawne nazwy i adresy.** Pozwy, pisma procesowe i listy muszą być adresowane do właściwego
  sądu tak, jak sam siebie nazywa, na przykład `Vredegerecht Gent 1` albo
  `Ondernemingsrechtbank Gent - afdeling Brugge`, i trafić do właściwego sekretariatu (griffie /
  greffe). Nazwy są brane z własnych stron sądów, w każdym języku, w którym publikują.
- **Obliczanie odsetek.** Roszczenia z tytułu opóźnienia w płatności korzystają ze stopy odsetek
  ustawowych albo, między przedsiębiorcami, ze stopy dla transakcji handlowych. Obie zmieniają się
  co rok lub co pół roku, a okres przejściowy 2013–2015 zależy od daty umowy. Błąd w jednym
  okresie zmienia dochodzoną kwotę.
- **Łączenie z innymi danymi.** Kodów REFNIS używają Statbel, regiony i większość otwartych
  danych. Ich mapowanie na kantony i okręgi sądowe pozwala nanieść liczbę spraw, ludność czy
  dane adresowe na mapę sądową.

## Czego (jeszcze) nie ma {#what-isn-t-in-it-yet}

Zobacz [znane luki](./known-gaps), by poznać ograniczenia obecnych danych, oraz
[plan rozwoju](./roadmap), by poznać planowane zbiory danych: najwyższe sądy, historię,
komorników, strefy policyjne oraz urzędy katastralne i hipoteczne.

::: warning Dane referencyjne, nie porada prawna
Dane są sprawdzane z oficjalnymi źródłami, ale źródła się zmieniają, a błędy się zdarzają. Zanim
oprzesz się na wartości, sprawdź oficjalne źródło i
[zgłoś wszystko, co jest błędne](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml).
:::
