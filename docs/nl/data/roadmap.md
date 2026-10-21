# Roadmap {#roadmap}

Geplande datasets, met de issue die elke dataset specificeert. Elke issue somt de officiële
bronnen, de voorgestelde velden en de definitie van "klaar" op. Hulp is welkom: kies er een en
volg de [conventies](/nl/guide/contributing#adding-a-dataset).

## Gepland {#planned}

| Dataset                                                                                              | Waarvoor het dient                                                                                                 | Issue                                                             |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| **De andere rechtscolleges**: Hof van Cassatie, Grondwettelijk Hof, Raad van State, tuchtrechtbanken | De hoogste rechtscolleges staan niet op het portaal van de hoven en rechtbanken, dus ze hebben eigen bronnen nodig | [#4](https://github.com/pieterjanscheir/be-legal-data/issues/4)   |
| **Het justitiehuis in Eupen** (Duitstalige Gemeenschap)                                              | Het ene justitiehuis dat de data nog niet heeft                                                                    | [#3](https://github.com/pieterjanscheir/be-legal-data/issues/3)   |
| **Historiek**: wanneer kantons, gemeenten en gerechten veranderden                                   | Het model heeft geldigheidsperiodes en opzoekingen per dag; de vroegere versies hebben nog de data nodig           | [#27](https://github.com/pieterjanscheir/be-legal-data/issues/27) |
| **Kantongrenzen** als geometrie                                                                      | Het kanton van een adres in een gesplitste stad vinden; het NGI publiceert de grenzen op geo.be                    | [#29](https://github.com/pieterjanscheir/be-legal-data/issues/29) |
| **Gerechtsdeurwaarderskantoren** (gerechtsdeurwaarders / huissiers de justice)                       | Een gerechtsdeurwaarder in een arrondissement vinden voor betekening of tenuitvoerlegging                          | [#6](https://github.com/pieterjanscheir/be-legal-data/issues/6)   |
| **Politiezones** (politiezones / zones de police)                                                    | Welke zone een gemeente behandelt: klachten, afschriften van processen-verbaal                                     | [#7](https://github.com/pieterjanscheir/be-legal-data/issues/7)   |
| **Kantoren van het kadaster en van de rechtszekerheid** (kadaster, vroegere hypotheekkantoren)       | Hypothecaire getuigschriften en kadastrale uittreksels aanvragen bij het bevoegde kantoor                          | [#8](https://github.com/pieterjanscheir/be-legal-data/issues/8)   |

## Het overwegen waard {#worth-considering}

Verzameld in [#9](https://github.com/pieterjanscheir/be-legal-data/issues/9), ruwweg in volgorde
van hoe vaak ze gebruikt zouden worden:

- **Deelgemeenten** per postcode. De [postcodes](./postal-codes) stoppen bij de gemeente; de
  lijst van bpost noemt de deelgemeenten, maar heeft geen REFNIS-code en geen open licentie.
- **Rolrechten** (griffierechten) en de schijven van de **rechtsplegingsvergoeding**, met hun
  geldigheidsperiodes en indexering, zoals de rentevoeten.
- **Gerechtelijk verlof en feestdagen** per jaar, om proceduretermijnen te berekenen.
- **Parketten** (parketten, arbeidsauditoraten) per arrondissement.
- **Notarissen en notariële kamers**, **balies** (balies / barreaux).
- **Gemeentefusies**: oude → nieuwe REFNIS-codes voor 2019 en 2025, zodat oudere data te mappen
  is.
- **Provincies en gewesten** als eigen dataset (vandaag alleen codes).
- **De gezondheidsindex** voor de indexering van huurprijzen.

## Waarom sommige datasets er nog niet zijn {#why-some-datasets-aren-t-here-yet}

Een juridische dataset is alleen nuttig als elke waarde uit een officiële bron komt, dus wordt
niets uit het hoofd met de hand toegevoegd. Elke dataset wordt door een script gebouwd uit
snapshots van zijn bron, en de meeste bronnen worden elke week door GitHub Actions opgehaald.
Twee kunnen dat voorlopig niet: de site van het Belgisch Staatsblad (ejustice), waar de kantons
uit komen, en police.be weigeren allebei verbindingen van de servers van GitHub; ze worden in
de plaats daarvan vanaf een gewone machine opgehaald
([#24](https://github.com/pieterjanscheir/be-legal-data/issues/24)). De
gerechtsdeurwaardersgids wordt in de browser opgebouwd, dus die vereist een browser om te
lezen, of de data van de Nationale Kamer
([#6](https://github.com/pieterjanscheir/be-legal-data/issues/6)).
