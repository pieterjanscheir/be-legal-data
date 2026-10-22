# Roadmap {#roadmap}

Geplande datasets, met de issue die elke dataset specificeert. Elke issue somt de officiële
bronnen, de voorgestelde velden en de definitie van "klaar" op. Hulp is welkom: kies er een en
volg de [conventies](/nl/guide/contributing#adding-a-dataset).

## Gepland {#planned}

| Dataset                                                                                              | Waarvoor het dient                                                                                                  | Issue                                                       |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **De andere rechtscolleges**: Hof van Cassatie, Grondwettelijk Hof, Raad van State, tuchtrechtbanken | De hoogste rechtscolleges staan niet op het portaal van de hoven en rechtbanken, dus ze hebben eigen bronnen nodig  | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **Het justitiehuis in Eupen** (Duitstalige Gemeenschap)                                              | Het ene justitiehuis dat de data nog niet heeft                                                                     | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Historiek**: wanneer kantons, gemeenten en gerechten veranderden                                   | Het model heeft geldigheidsperiodes en opzoekingen per dag; de vroegere versies hebben nog de data nodig            | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Adres → coördinaten**                                                                              | De [kantongrenzen](./canton-boundaries) vinden het kanton van een punt; het adres geocoderen is de ontbrekende stap | [#66](https://github.com/pieterjanscheir/belgica/issues/66) |
| **Gerechtsdeurwaarderskantoren** (gerechtsdeurwaarders / huissiers de justice)                       | Een gerechtsdeurwaarder in een arrondissement vinden voor betekening of tenuitvoerlegging                           | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Politiezones** (politiezones / zones de police)                                                    | Welke zone een gemeente behandelt: klachten, afschriften van processen-verbaal                                      | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Kantoren van het kadaster en van de rechtszekerheid** (kadaster, vroegere hypotheekkantoren)       | Hypothecaire getuigschriften en kadastrale uittreksels aanvragen bij het bevoegde kantoor                           | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## Het overwegen waard {#worth-considering}

Elk met een eigen issue, ruwweg in volgorde van hoe vaak ze gebruikt zouden worden:

- **Deelgemeenten** per postcode. De [postcodes](./postal-codes) stoppen bij de gemeente; de
  lijst van bpost noemt de deelgemeenten, maar heeft geen REFNIS-code en geen open licentie
  ([#54](https://github.com/pieterjanscheir/belgica/issues/54)).
- **Rolrechten** (griffierechten) en de schijven van de **rechtsplegingsvergoeding**, met hun
  geldigheidsperiodes en indexering, zoals de rentevoeten
  ([#59](https://github.com/pieterjanscheir/belgica/issues/59),
  [#60](https://github.com/pieterjanscheir/belgica/issues/60)).
- **Gerechtelijk verlof en feestdagen** per jaar, om proceduretermijnen te berekenen
  ([#61](https://github.com/pieterjanscheir/belgica/issues/61)).
- **Parketten** (parketten, arbeidsauditoraten) per arrondissement
  ([#55](https://github.com/pieterjanscheir/belgica/issues/55)).
- **Notarissen en notariële kamers**, **balies** (balies / barreaux)
  ([#56](https://github.com/pieterjanscheir/belgica/issues/56),
  [#57](https://github.com/pieterjanscheir/belgica/issues/57)).
- **Gemeentefusies**: oude → nieuwe REFNIS-codes voor 2019 en 2025, zodat oudere data te mappen
  is ([#53](https://github.com/pieterjanscheir/belgica/issues/53)).
- **De gezondheidsindex** voor de indexering van huurprijzen
  ([#62](https://github.com/pieterjanscheir/belgica/issues/62)).

## Waarom sommige datasets er nog niet zijn {#why-some-datasets-aren-t-here-yet}

Een juridische dataset is alleen nuttig als elke waarde uit een officiële bron komt, dus wordt
niets uit het hoofd met de hand toegevoegd. Elke dataset wordt door een script gebouwd uit
snapshots van zijn bron, en de meeste bronnen worden elke week door GitHub Actions opgehaald.
Twee kunnen dat voorlopig niet: de site van het Belgisch Staatsblad (ejustice), waar de kantons
uit komen, en police.be weigeren allebei verbindingen van de servers van GitHub; ze worden in
de plaats daarvan vanaf een gewone machine opgehaald
([#52](https://github.com/pieterjanscheir/belgica/issues/52)). De
gerechtsdeurwaardersgids wordt in de browser opgebouwd, dus die vereist een browser om te
lezen, of de data van de Nationale Kamer
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
