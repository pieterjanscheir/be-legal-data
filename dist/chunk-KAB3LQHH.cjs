"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// data/arrondissements.json
var arrondissements_default = [
  {
    id: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers",
      de: "Antwerpen"
    },
    judicialArea: "antwerpen"
  },
  {
    id: "limburg",
    name: {
      nl: "Limburg",
      fr: "Limbourg",
      de: "Limburg"
    },
    judicialArea: "antwerpen"
  },
  {
    id: "brussel",
    name: {
      nl: "Brussel",
      fr: "Bruxelles",
      de: "Br\xFCssel"
    },
    judicialArea: "brussel"
  },
  {
    id: "leuven",
    name: {
      nl: "Leuven",
      fr: "Louvain",
      de: "L\xF6wen"
    },
    judicialArea: "brussel"
  },
  {
    id: "brabant-wallon",
    name: {
      nl: "Waals-Brabant",
      fr: "Brabant wallon",
      de: "Wallonisch-Brabant"
    },
    judicialArea: "brussel"
  },
  {
    id: "oost-vlaanderen",
    name: {
      nl: "Oost-Vlaanderen",
      fr: "Flandre orientale",
      de: "Ostflandern"
    },
    judicialArea: "gent"
  },
  {
    id: "west-vlaanderen",
    name: {
      nl: "West-Vlaanderen",
      fr: "Flandre occidentale",
      de: "Westflandern"
    },
    judicialArea: "gent"
  },
  {
    id: "liege",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge",
      de: "L\xFCttich"
    },
    judicialArea: "liege"
  },
  {
    id: "eupen",
    name: {
      nl: "Eupen",
      fr: "Eupen",
      de: "Eupen"
    },
    judicialArea: "liege"
  },
  {
    id: "luxembourg",
    name: {
      nl: "Luxemburg",
      fr: "Luxembourg",
      de: "Luxemburg"
    },
    judicialArea: "liege"
  },
  {
    id: "namur",
    name: {
      nl: "Namen",
      fr: "Namur",
      de: "Namur"
    },
    judicialArea: "liege"
  },
  {
    id: "hainaut",
    name: {
      nl: "Henegouwen",
      fr: "Hainaut",
      de: "Hennegau"
    },
    judicialArea: "mons"
  }
];

// data/cantons.json
var cantons_default = [
  {
    id: "antwerpen-1",
    arrondissement: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    number: 1,
    seat: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Antwerpen begrensd door de middellijnen van de Brouwersvliet (onpare nummers), de Oude-Leeuwenrui (onpare nummers), de Ankerrui (onpare nummers), de Zwedenstraat (pare nummers), de Itali\xEBlei (onpare nummers), de De Keyserlei (onpare nummers), de Pelikaanstraat (pare nummers), de Gemeentestraat (onpare nummers), de Carnotstraat (onpare nummers), de Kerkstraat (onpare nummers), de Pothoekstraat (onpare nummers) en de Schijnpoortweg (onpare nummers) en het gedeelte van het grondgebied van de stad Antwerpen gelegen op de rechteroever van de Schelde ten noorden van een lijn die loopt vanaf de Scheldekaaien en het verlengde vormt van de middellijn van de Brouwersvliet, doch behoudens (1) het gedeelte van het grondgebied van de stad Antwerpen grenzende aan de deelgemeente Merksem van de Stad Antwerpen en omsloten door het Straatsburgdok, Noorderlaan (pare nummers), Ekersesteenweg tot de A12, de A12 tot verkeersknooppunt met de E19, de E19 en behoudens (2) het gedeelte van het grondgebied van de stad Antwerpen tussen de A12 en de deelgemeente Ekeren van de Stad Antwerpen",
      fr: "La partie du territoire de la ville d'Anvers d\xE9limit\xE9e par les lignes m\xE9dianes des Brouwersvliet (num\xE9ros impairs), Oude-Leeuwenrui (num\xE9ros impairs), Ankerrui (num\xE9ros impairs), Zwedenstraat (num\xE9ros pairs), Itali\xEBlei (num\xE9ros impairs), De Keyserlei (num\xE9ros impairs), Pelikanstraat (num\xE9ros pairs), Gemeentestraat (num\xE9ros impairs), Carnotstraat (num\xE9ros impairs), Kerkstraat (num\xE9ros impairs), Pothoekstraat (num\xE9ros impairs) et Schijnpoortweg (num\xE9ros impairs) et la partie du territoire de la ville d'Anvers situ\xE9e sur la rive droite de l'Escaut au nord d'une ligne partant des quais de l'Escaut et prolongeant la ligne m\xE9diane du Brouwersvliet, \xE0 l'exception, cependant, (1) de la partie du territoire de la ville d'Anvers limitrophe \xE0 l'ancienne commune de Merksem de la ville d'Anvers et entour\xE9e par le Straatsburgdok, Noorderlaan (num\xE9ros pairs), Ekersesteenweg jusqu'\xE0 l'A12, l'A12 jusqu'au croisement avec l'E19, l'E19 et \xE0 l'exception (2) de la partie du territoire de la ville d'Anvers situ\xE9e entre l'A12 et l'ancienne commune d'Ekeren de la ville d'Anvers"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.1"
  },
  {
    id: "antwerpen-2",
    arrondissement: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    number: 2,
    seat: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Antwerpen begrensd door de middellijn van de Blauwmoezelstraat, de Lijnwaadmarkt, de Korte Nieuwstraat, de Lange Nieuwstraat, de Kipdorpbrug, de Frankrijklei, de Mechelsesteenweg, de Aarschotstraat, de Teichmannstraat, de Isabella Brantstraat, de Ballaertstraat, de Pyckestraat, de Oude-Kerkstraat, de Lange Elzenstraat, de Kielsevest, de Hobokensevest, een lijn die het verlengde vormt van de middellijn van de Hobokensevest tussen nrs. 9 en 10 van de Scheldekaaien, de Scheldekaaien, een lijn die het verlengde vormt van de middellijn van de Van der Sweepstraat tussen nrs. 13a en 13b van de Scheldekaaien, de middellijn van de Van der Sweepstraat, de Vlaamse Kaai, de Kronenburgstraat, de Begijnenstraat, de Bredestraat, de Kleine-Markt, de Kammenstraat, de Oude Koornmarkt, de Quinten Matsijsdoorgang en de lijn die de verbinding vormt van de middellijn van de Quinten Matsijsdoorgang tot de middellijn van de Blauwmoezelstraat",
      fr: "La partie du territoire de la ville d'Anvers d\xE9limit\xE9e par la ligne m\xE9diane des Blauwmoezelstraat, Lijnwaadmarkt, Korte Nieuwstraat, Lange Nieuwstraat, Kipdorpbrug, Frankrijklei, Mechelsesteenweg, Aarschotstraat, Teichmannstraat, Isabella Brantstraat, Ballaertstraat, Pyckestraat, Oude-Kerkstraat, Lange Elzenstraat, Kielsevest, Hobokensevest, une ligne prolongeant la ligne m\xE9diane du Hobokensevest entre les num\xE9ros 9 et 10 des quais de l'Escaut, les quais de l'Escaut, une ligne prolongeant la ligne m\xE9diane de la Van der Sweepstraat entre les num\xE9ros 13a et 13b des quais de l'Escaut, la ligne m\xE9diane des Van der Sweepstraat, Vlaamse Kaai, Kronenburgstraat, Begijnenstraat, Bredestraat, Kleine-Markt, Kammenstraat, Oude Koornmarkt, Quinten Matsijsdoorgang et la ligne reliant la ligne m\xE9diane du Quinten Matsijsdoorgang \xE0 la ligne m\xE9diane de la Blauwmoezelstraat"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.2"
  },
  {
    id: "antwerpen-3",
    arrondissement: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    number: 3,
    seat: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeente Hoboken van de stad Antwerpen en het gedeelte van het grondgebied van de stad Antwerpen begrensd door een lijn die loopt vanaf de Scheldekaaien tussen nrs. 9 en 10 (deel Herbouvillekaai) en het verlengde vormt van de middellijn van de Hobokensevest, en door de middellijn van de Hobokensevest, de Kielsevest (oneven nummers van 1 tot 53), de Desguinlei (onpare nummers vanaf 39 tot einde), de Jan Van Rijswijcklaan (pare nummers vanaf 162 tot einde), de Boomsesteenweg (pare nummers tot aan de Jules Moretuslei), de Jules Moretuslei (vanaf Boomsesteenweg tot de Krijgsbaan), vervolgens de volledige Krijgsbaan en de Sint Bernardsesteenweg en vanaf de scheidingslijn van de deelgemeenten Wilrijk en Hoboken van de stad Antwerpen, met name vanaf de Van Praetstraat tot de Scheldekaaien",
      fr: "L'ancienne commune de Hoboken de la ville d'Anvers et la partie du territoire de la ville d'Anvers d\xE9limit\xE9e par une ligne partant des quais de l'Escaut entre les num\xE9ros 9 et 10 (partie Herbouvillekaai) et prolongeant la ligne m\xE9diane du Hobokensevest, et via la ligne m\xE9diane des Hobokensevest, Kielsevest (num\xE9ros impairs de 1 \xE0 53), Desguinlei (num\xE9ros impairs de 39 jusqu'\xE0 la fin), Jan Van Rijswijcklaan (num\xE9ros pairs de 162 jusqu'\xE0 la fin), Boomsesteenweg (num\xE9ros pairs jusqu'\xE0 la Jules Moretuslei), Jules Moretuslei (depuis Boomsesteenweg jusqu'au Krijgsbaan), puis l'entier Krijgsbaan et la Sint Bernardsesteenweg et \xE0 partir de la ligne de s\xE9paration des anciennes communes de Wilrijk et de Hoboken de la ville d'Anvers, notamment \xE0 partir de la Van Praetstraat jusqu'aux quais de l'Escaut"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.3"
  },
  {
    id: "antwerpen-4",
    arrondissement: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    number: 4,
    seat: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeente Borgerhout van de stad Antwerpen en het gedeelte van het grondgebied van de stad Antwerpen begrensd door de middellijn van de Plantijn en Moretuslei (onpare nummers), de Simonsstraat (onpare nummers), de Pelikaanstraat (onpare nummers), het Koningin Astridplein, de Gemeentestraat (pare nummers), de Carnotstraat (pare nummers), de Kerkstraat (pare nummers), de Pothoekstraat (pare nummers) en de Schijnpoortweg (pare nummers)",
      fr: "L'ancienne commune de Borgerhout de la ville d'Anvers et la partie du territoire de la ville d'Anvers d\xE9limit\xE9e par la ligne m\xE9diane des Plantijn et Moretuslei (num\xE9ros impairs), Simonsstraat (num\xE9ros impairs), Pelikaanstraat (num\xE9ros impairs), Koningin Astridplein, Gemeentestraat (num\xE9ros pairs), Carnotstraat (num\xE9ros pairs), Kerkstraat (num\xE9ros pairs), Pothoekstraat (num\xE9ros pairs) et Schijnpoortweg (num\xE9ros pairs)"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.4"
  },
  {
    id: "antwerpen-5",
    arrondissement: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    number: 5,
    seat: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Antwerpen gelegen op de linkeroever van de Schelde en het deel van het grondgebied van de stad Antwerpen (rechteroever) begrensd door een lijn die loopt vanaf de Scheldekaaien en die het verlengde vormt van de middellijn van de Brouwersvliet, de middellijn van de Brouwersvliet, de Oude-Leeuwenrui, de Ankerrui, de Zwedenstraat, de Itali\xEBlei, de Kipdorpbrug, de Lange Nieuwstraat, de Korte Nieuwstraat, de Lijnwaadmarkt, de Blauwmoezelstraat, een lijn die de verbinding vormt van de middellijn van de Blauwmoezelstraat tot de middellijn van de Quinten Matsijsdoorgang, de middellijn van de Quinten Matsijsdoorgang, de Oude-Koornmarkt, de Kammenstraat, de Kleine-Markt, de Bredestraat, de Begijnenstraat, de Kronenburgstraat, de Vlaamse kaai, de Van der Sweepstraat, een lijn die het verlengde vormt van de Van der Sweepstraat tussen nrs. 13a en 13b van de Scheldekaaien en de nrs. 13b tot 25 van de Scheldekaaien",
      fr: "La partie du territoire de la ville d'Anvers situ\xE9e sur la rive gauche de l'Escaut et la partie du territoire de la ville d'Anvers (rive droite) d\xE9limit\xE9e par une ligne partant des quais de l'Escaut et prolongeant la ligne m\xE9diane des Brouwersvliet, la ligne m\xE9diane des Brouwersvliet, Oude-Leeuwenrui, Ankerrui, Zwedenstraat, Itali\xEBlei, Kipdorpbrug, Lange Nieuwstraat, Korte Nieuwstraat, Lijnwaadmarkt, Blauwmoezelstraat, une ligne reliant la ligne m\xE9diane de la Blauwmoezelstraat \xE0 la ligne m\xE9diane du Quinten Matsijsdoorgang, la ligne m\xE9diane des Quinten Matsijsdoorgang, Oude-Koornmarkt, Kammenstraat, Kleine-Markt, Bredestraat, Begijnenstraat, Kronenburgstraat, Vlaamse kaai, Van der Sweepstraat, une ligne prolongeant la Van der Sweepstraat entre les num\xE9ros 13a et 13b des quais de l'Escaut et les num\xE9ros 13b \xE0 25 des quais de l'Escaut"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.5"
  },
  {
    id: "antwerpen-6",
    arrondissement: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    number: 6,
    seat: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Antwerpen begrensd door de middellijnen van de Generaal Lemanstraat (onpare nummers) tot aan de grens met het district Berchem, de Desguinlei (pare nummers vanaf grens district Berchem tot aan grens met 2de kanton zijnde hoek Desguinlei-Lange Elzenstraat), de Lange Elzenstraat (onpare nummers 103 tot einde), de Oudekerkstraat (onpare nummers), de Pyckestraat (onpare nummers), de Ballaarstraat (onpare nummers), de Isabella Brantstraat (onpare nummers), de Teichmannstraat (onpare nummers), de Aarschotstraat (onpare nummers), de Mechelsesteenweg (onpare nummers 3 tot en met einde - pare nummers 128 tot en met einde), de Frankrijklei (onpare nummers vanaf de hoek met Mechelsesteenweg tot de hoek met De Keyserlei), de De Keyserlei (pare nummers vanaf hoek met Frankrijklei tot de hoek met Pelikaanstraat), de Pelikaanstraat (pare nummers), de Simonsstraat (pare nummers) uitmondend in de Plantin en Moretuslei, de Plantin en Moretuslei (pare nummers) tot de grens met het district Berchem en de grens met district Borgerhout",
      fr: "La partie du territoire de la ville d'Anvers d\xE9limit\xE9e par les lignes m\xE9dianes de la Generaal Lemanstraat (num\xE9ros impairs) jusqu'\xE0 la fronti\xE8re avec le district de Berchem, Desguinlei (num\xE9ros pairs depuis la fronti\xE8re du district de Berchem jusqu'\xE0 la fronti\xE8re avec le 2\xE8me canton \xE9tant le coin du Desguinlei-Lange Elzenstraat), Lange Elzenstraat (num\xE9ros impairs du 103 jusqu'\xE0 la fin), Oudekerkstraat (num\xE9ros impairs), Pyckestraat (num\xE9ros impairs), Ballaarstraat (num\xE9ros impairs), Isabella Brantstraat (num\xE9ros impairs), Teichmannstraat (num\xE9ros impairs), Aarschotstraat (num\xE9ros impairs), Mechelsesteenweg (num\xE9ros impairs, du 3 jusqu'\xE0 la fin - num\xE9ros pairs du 128 jusqu'\xE0 la fin), Frankrijklei (num\xE9ros impairs depuis le coin avec Mechelsesteenweg jusqu'au coin avec De Keyserlei), De Keyserlei (num\xE9ros pairs depuis le coin avec Frankrijklei jusqu'au coin avec Pelikaanstraat), Pelikaanstraat (num\xE9ros pairs), Simonsstraat (num\xE9ros pairs) d\xE9bouchant sur Plantin et Moretuslei, Plantin et Moretuslei (num\xE9ros pairs) jusqu'\xE0 la fronti\xE8re avec le district de Berchem et la fronti\xE8re avec le district de Borgerhout"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.6"
  },
  {
    id: "antwerpen-7",
    arrondissement: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    number: 7,
    seat: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeente Wilrijk van de stad Antwerpen, uitgezonderd het gedeelte begrensd door de middellijn van de Jules Moretuslei tussen de Boomsesteenweg en de Krijgsbaan en de middellijn van de Jan Van Rijswijcklaan en de Boomsesteenweg, het gedeelte van het grondgebied van de stad Antwerpen begrensd in het noordwesten door de middellijn van de Jan Van Rijswijcklaan en verder door de middellijn van de Desguinlei tussen de Jan Van Rijswijcklaan en de grens van de deelgemeente Berchem van de stad Antwerpen, en het westelijke gedeelte van de deelgemeente Berchem, begrensd door de middellijn van de Singel",
      fr: "L'ancienne commune de Wilrijk de la ville d'Anvers, except\xE9 la partie d\xE9limit\xE9e par la ligne m\xE9diane de la Jules Moretuslei entre la Boomsesteenweg et la Krijgsbaan et la ligne m\xE9diane de la Jan Van Rijswijcklaan et la Boomsesteenweg, la partie du territoire de la ville d'Anvers d\xE9limit\xE9e, dans le nord-ouest, par la ligne m\xE9diane de la Jan Van Rijswijcklaan et plus loin par la ligne m\xE9diane de Desguinlei entre Jan Van Rijswijcklaan et la fronti\xE8re de l'ancienne commune de Berchem de la ville d'Anvers, et la partie ouest de l'ancienne commune de Berchem, d\xE9limit\xE9e par la ligne m\xE9diane de Singel"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.7"
  },
  {
    id: "merksem",
    arrondissement: "antwerpen",
    name: {
      nl: "Merksem",
      fr: "Merksem"
    },
    seat: {
      nl: "Merksem",
      fr: "Merksem"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      },
      {
        municipality: "11040"
      },
      {
        municipality: "11050"
      }
    ],
    territory: {
      nl: "De gemeenten Schoten, Wijnegem en de deelgemeente Merksem van de stad Antwerpen en het gebied langs Noorderlaan en omsloten door de haven in het westen, het Albertkanaal in het zuiden, de Ring en de Spoorlijn 12 Antwerpen - Lage Zwaluwe in het oosten (de grens met Merksem) en de A12 in het noorden (de wijk Rozemaai en het natuurgebied Oude Landen)",
      fr: "Les communes de Schoten, de Wijnegem et l'ancienne commune de Merksem de la ville d'Anvers et le territoire longeant Noorderlaan et entour\xE9 par le port \xE0 l'ouest, le canal Albert au sud, le Ring et la ligne de chemin de fer 12 Anvers - Lage Zwaluwe \xE0 l'est (la fronti\xE8re avec Merksem) et l'A12 au nord (le quartier Rozemaai et le domaine naturel Oude Landen)"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.8"
  },
  {
    id: "deurne",
    arrondissement: "antwerpen",
    name: {
      nl: "Deurne",
      fr: "Deurne"
    },
    seat: {
      nl: "Deurne",
      fr: "Deurne"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeenten Borsbeek en Deurne van de stad Antwerpen",
      fr: "Les anciennes communes de Borsbeek et de Deurne de la ville d'Anvers"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.9"
  },
  {
    id: "boom",
    arrondissement: "antwerpen",
    name: {
      nl: "Boom",
      fr: "Boom"
    },
    seat: {
      nl: "Boom",
      fr: "Boom"
    },
    municipalities: [
      {
        municipality: "11001"
      },
      {
        municipality: "11005"
      },
      {
        municipality: "11018"
      },
      {
        municipality: "11030"
      },
      {
        municipality: "11037"
      },
      {
        municipality: "11038"
      }
    ],
    territory: {
      nl: "De gemeenten Aartselaar, Boom, Hemiksem, Niel, Rumst en Schelle",
      fr: "Les communes d'Aartselaar, de Boom, de Hemiksem, de Niel, de Rumst et de Schelle"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.10"
  },
  {
    id: "brasschaat",
    arrondissement: "antwerpen",
    name: {
      nl: "Brasschaat",
      fr: "Brasschaat"
    },
    seat: {
      nl: "Brasschaat",
      fr: "Brasschaat"
    },
    municipalities: [
      {
        municipality: "11008"
      },
      {
        municipality: "11009"
      },
      {
        municipality: "11039"
      }
    ],
    territory: {
      nl: "De gemeenten Brasschaat, Brecht en Schilde",
      fr: "Les communes de Brasschaat, de Brecht et de Schilde"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.11"
  },
  {
    id: "kapellen",
    arrondissement: "antwerpen",
    name: {
      nl: "Kapellen",
      fr: "Kapellen"
    },
    seat: {
      nl: "Kapellen",
      fr: "Kapellen"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      },
      {
        municipality: "11016"
      },
      {
        municipality: "11022"
      },
      {
        municipality: "11023"
      },
      {
        municipality: "11044"
      },
      {
        municipality: "11053"
      }
    ],
    territory: {
      nl: "De gemeenten Essen, Kalmthout, Kapellen, Stabroek, Wuustwezel en de deelgemeenten Berendrecht, Lillo, Ekeren en Zandvliet van de stad Antwerpen en het gedeelte ten noorden van de A12 dat grenst aan Ekeren",
      fr: "Les communes d'Essen, de Kalmthout, de Kapellen, de Stabroek, de Wuustwezel et les anciennes communes de Berendrecht, de Lillo, de Ekeren et de Zandvliet de la ville d'Anvers et la partie au nord de l'A12 adjacente \xE0 Ekeren"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.12"
  },
  {
    id: "kontich",
    arrondissement: "antwerpen",
    name: {
      nl: "Kontich",
      fr: "Kontich"
    },
    seat: {
      nl: "Kontich",
      fr: "Kontich"
    },
    municipalities: [
      {
        municipality: "11002",
        partial: true
      },
      {
        municipality: "11004"
      },
      {
        municipality: "11013"
      },
      {
        municipality: "11021"
      },
      {
        municipality: "11024"
      },
      {
        municipality: "11025"
      },
      {
        municipality: "11029"
      }
    ],
    territory: {
      nl: "De stad Mortsel, de gemeenten Boechout, Edegem, Hove, Kontich, Lint en het deel buiten de Singel van de deelgemeente Berchem van de stad Antwerpen",
      fr: "La ville de Mortsel, les communes de Boechout, d'Edegem, de Hove, de Kontich, de Lint et la partie hors de Singel de l'ancienne commune de Berchem de la ville d'Anvers"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.13"
  },
  {
    id: "zandhoven",
    arrondissement: "antwerpen",
    name: {
      nl: "Zandhoven",
      fr: "Zandhoven"
    },
    seat: {
      nl: "Zandhoven",
      fr: "Zandhoven"
    },
    municipalities: [
      {
        municipality: "11035"
      },
      {
        municipality: "11052"
      },
      {
        municipality: "11054"
      },
      {
        municipality: "11055"
      },
      {
        municipality: "11057"
      }
    ],
    territory: {
      nl: "De gemeenten Malle, Ranst, Wommelgem, Zandhoven en Zoersel",
      fr: "Les communes de Malle, de Ranst, de Wommelgem, de Zandhoven et de Zoersel"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.14"
  },
  {
    id: "heist-op-den-berg",
    arrondissement: "antwerpen",
    name: {
      nl: "Heist-op-den-Berg",
      fr: "Heist-op-den-Berg"
    },
    seat: {
      nl: "Heist-op-den-Berg",
      fr: "Heist-op-den-Berg"
    },
    municipalities: [
      {
        municipality: "12014"
      },
      {
        municipality: "12029"
      },
      {
        municipality: "13012"
      },
      {
        municipality: "13016"
      }
    ],
    territory: {
      nl: "De gemeenten Heist-op-den-Berg, Herenthout, Hulshout en Putte",
      fr: "Les communes de Heist-op-den-Berg, de Herenthout, de Hulshout et de Putte"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.15"
  },
  {
    id: "lier",
    arrondissement: "antwerpen",
    name: {
      nl: "Lier",
      fr: "Lierre"
    },
    seat: {
      nl: "Lier",
      fr: "Lierre"
    },
    municipalities: [
      {
        municipality: "12002"
      },
      {
        municipality: "12009"
      },
      {
        municipality: "12021"
      },
      {
        municipality: "12026"
      }
    ],
    territory: {
      nl: "De stad Lier en de gemeenten Berlaar, Duffel en Nijlen",
      fr: "La ville de Lierre et les communes de Berlaar, de Duffel et de Nijlen"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.16"
  },
  {
    id: "mechelen",
    arrondissement: "antwerpen",
    name: {
      nl: "Mechelen",
      fr: "Malines"
    },
    seat: {
      nl: "Mechelen",
      fr: "Malines"
    },
    municipalities: [
      {
        municipality: "12005"
      },
      {
        municipality: "12025"
      },
      {
        municipality: "12035"
      }
    ],
    territory: {
      nl: "De stad Mechelen en de gemeenten Bonheiden en Sint-Katelijne-Waver",
      fr: "La ville de Malines et les communes de Bonheiden et de Sint-Katelijne-Waver"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.17"
  },
  {
    id: "willebroek",
    arrondissement: "antwerpen",
    name: {
      nl: "Willebroek",
      fr: "Willebroek"
    },
    seat: {
      nl: "Willebroek",
      fr: "Willebroek"
    },
    municipalities: [
      {
        municipality: "12007"
      },
      {
        municipality: "12040"
      },
      {
        municipality: "12041"
      }
    ],
    territory: {
      nl: "De gemeenten Bornem, Puurs-Sint-Amands en Willebroek",
      fr: "Les communes de Bornem, de Puurs-Sint-Amands et de Willebroek"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.18"
  },
  {
    id: "mol-geel-1",
    arrondissement: "antwerpen",
    name: {
      nl: "Mol-Geel",
      fr: "Mol-Geel"
    },
    number: 1,
    seat: {
      nl: "Mol",
      fr: "Mol"
    },
    municipalities: [
      {
        municipality: "13003"
      },
      {
        municipality: "13006"
      },
      {
        municipality: "13021"
      },
      {
        municipality: "13025"
      },
      {
        municipality: "13036"
      }
    ],
    territory: {
      nl: "De gemeenten Balen, Dessel, Meerhout, Mol en Retie",
      fr: "Les communes de Balen, de Dessel, de Meerhout, de Mol et de Retie"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.19"
  },
  {
    id: "mol-geel-2",
    arrondissement: "antwerpen",
    name: {
      nl: "Mol-Geel",
      fr: "Mol-Geel"
    },
    number: 2,
    seat: {
      nl: "Mol",
      fr: "Mol"
    },
    municipalities: [
      {
        municipality: "13008"
      },
      {
        municipality: "13017"
      }
    ],
    territory: {
      nl: "De stad Geel en de gemeente Kasterlee",
      fr: "La ville de Geel et la commune de Kasterlee"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.20"
  },
  {
    id: "turnhout-1",
    arrondissement: "antwerpen",
    name: {
      nl: "Turnhout",
      fr: "Turnhout"
    },
    number: 1,
    seat: {
      nl: "Turnhout",
      fr: "Turnhout"
    },
    municipalities: [
      {
        municipality: "13023"
      },
      {
        municipality: "13040"
      },
      {
        municipality: "13046"
      }
    ],
    territory: {
      nl: "De stad Turnhout en de gemeenten Merksplas en Vosselaar",
      fr: "La ville de Turnhout et les communes de Merksplas et de Vosselaar"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.21"
  },
  {
    id: "turnhout-2",
    arrondissement: "antwerpen",
    name: {
      nl: "Turnhout",
      fr: "Turnhout"
    },
    number: 2,
    seat: {
      nl: "Turnhout",
      fr: "Turnhout"
    },
    municipalities: [
      {
        municipality: "13001"
      },
      {
        municipality: "13002"
      },
      {
        municipality: "13004"
      },
      {
        municipality: "13014"
      },
      {
        municipality: "13019"
      },
      {
        municipality: "13031"
      },
      {
        municipality: "13035"
      },
      {
        municipality: "13037"
      }
    ],
    territory: {
      nl: "De stad Hoogstraten en de gemeenten Arendonk, Baarle-Hertog, Beerse, Lille, Oud-Turnhout, Ravels en Rijkevorsel",
      fr: "La ville de Hoogstraten et les communes d'Arendonk, de Baerle-Duc, de Beerse, de Lille, de Oud-Turnhout, de Ravels et de Rijkevorsel"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.22"
  },
  {
    id: "westerlo",
    arrondissement: "antwerpen",
    name: {
      nl: "Westerlo",
      fr: "Westerlo"
    },
    seat: {
      nl: "Westerlo",
      fr: "Westerlo"
    },
    municipalities: [
      {
        municipality: "13010"
      },
      {
        municipality: "13011"
      },
      {
        municipality: "13013"
      },
      {
        municipality: "13029"
      },
      {
        municipality: "13044"
      },
      {
        municipality: "13049"
      },
      {
        municipality: "13053"
      }
    ],
    territory: {
      nl: "De stad Herentals en de gemeenten Grobbendonk, Herselt, Laakdal, Olen, Vorselaar en Westerlo",
      fr: "La ville de Herentals et les communes de Grobbendonk, de Herselt, de Laakdal, d'Olen, de Vorselaar et de Westerlo"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 1.23"
  },
  {
    id: "beringen",
    arrondissement: "limburg",
    name: {
      nl: "Beringen",
      fr: "Beringen"
    },
    seat: {
      nl: "Beringen",
      fr: "Beringen"
    },
    municipalities: [
      {
        municipality: "71004"
      },
      {
        municipality: "71034"
      },
      {
        municipality: "71070"
      },
      {
        municipality: "71071"
      }
    ],
    territory: {
      nl: "De stad Beringen en de gemeenten Tessenderlo-Ham, Heusden-Zolder en Leopoldsburg",
      fr: "La ville de Beringen et les communes de Tessenderlo-Ham, de Heusden-Zolder et de Bourg-Leopold"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.1"
  },
  {
    id: "hasselt-1",
    arrondissement: "limburg",
    name: {
      nl: "Hasselt",
      fr: "Hasselt"
    },
    number: 1,
    seat: {
      nl: "Hasselt",
      fr: "Hasselt"
    },
    municipalities: [
      {
        municipality: "71011"
      },
      {
        municipality: "71072",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Diepenbeek , de deelgemeente Kortessem van de stad Hasselt en het gedeelte van het grondgebied van de stad Hasselt dat gelegen is ten oosten van de middellijn van de Kempische Steenweg, Herckenrodesingel, Hendrik Van Veldekesingel, Boerenkrijgsingel en de Sint-Truidersteenweg",
      fr: "La commune de Diepenbeek , l'ancienne commune de Kortessem de la ville de Hasselt ainsi que la partie du territoire de la ville de Hasselt situ\xE9e \xE0 l'est de la ligne m\xE9diane des Kempische Steenweg, Herckenrodesingel, Hendrik Van Veldekesingel, Boerenkrijgsingel et Sint-Truidersteenweg"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.2"
  },
  {
    id: "hasselt-2",
    arrondissement: "limburg",
    name: {
      nl: "Hasselt",
      fr: "Hasselt"
    },
    number: 2,
    seat: {
      nl: "Hasselt",
      fr: "Hasselt"
    },
    municipalities: [
      {
        municipality: "71020"
      },
      {
        municipality: "71024"
      },
      {
        municipality: "71037"
      },
      {
        municipality: "71072",
        partial: true
      }
    ],
    territory: {
      nl: "De steden Halen, Herk-de-Stad, de gemeente Lummen en het gedeelte van het grondgebied van de stad Hasselt dat ligt ten westen van de middellijn van de Kempische Steenweg, de Herckenrodesingel, de Hendrik Van Veldekesingel, de Boerenkrijgsingel en de Sint-Truidersteenweg",
      fr: "Les villes de Halen, de Herck-la-Ville, la commune de Lummen et la partie du territoire de la ville de Hasselt situ\xE9e \xE0 l'ouest de la ligne m\xE9diane des Kempische Steenweg, Herckenrodesingel, Hendrik Van Veldekesingel, Boerenkrijgsingel et Sint-Truidersteenweg"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.3"
  },
  {
    id: "houthalen-helchteren",
    arrondissement: "limburg",
    name: {
      nl: "Houthalen-Helchteren",
      fr: "Houthalen-Helchteren"
    },
    seat: {
      nl: "Houthalen-Helchteren",
      fr: "Houthalen-Helchteren"
    },
    municipalities: [
      {
        municipality: "71066"
      },
      {
        municipality: "72030"
      },
      {
        municipality: "72038"
      },
      {
        municipality: "72039"
      }
    ],
    territory: {
      nl: "De stad Peer en de gemeenten Hechtel-Eksel, Houthalen-Helchteren en Zonhoven",
      fr: "La ville de Peer et les communes de Hechtel-Eksel, de Houthalen-Helchteren et de Zonhoven"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.4"
  },
  {
    id: "pelt",
    arrondissement: "limburg",
    name: {
      nl: "Pelt",
      fr: "Pelt"
    },
    seat: {
      nl: "Pelt",
      fr: "Pelt"
    },
    municipalities: [
      {
        municipality: "72020"
      },
      {
        municipality: "72037"
      },
      {
        municipality: "72043"
      }
    ],
    territory: {
      nl: "De steden Hamont-Achel, Lommel en de gemeente Pelt",
      fr: "Les villes de Hamont-Achel, de Lommel et la commune de Pelt"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.5"
  },
  {
    id: "sint-truiden",
    arrondissement: "limburg",
    name: {
      nl: "Sint-Truiden",
      fr: "Saint-Trond"
    },
    seat: {
      nl: "Sint-Truiden",
      fr: "Saint-Trond"
    },
    municipalities: [
      {
        municipality: "71017"
      },
      {
        municipality: "71045"
      },
      {
        municipality: "71053"
      }
    ],
    territory: {
      nl: "De stad Sint-Truiden en de gemeenten Gingelom en Nieuwerkerken",
      fr: "La ville de Saint-Trond et les communes de Gingelom et de Nieuwerkerken"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.6"
  },
  {
    id: "bilzen-hoeselt",
    arrondissement: "limburg",
    name: {
      nl: "Bilzen-Hoeselt",
      fr: "Bilzen-Hoeselt"
    },
    seat: {
      nl: "Bilzen-Hoeselt",
      fr: "Bilzen-Hoeselt"
    },
    municipalities: [
      {
        municipality: "73066"
      },
      {
        municipality: "73110"
      }
    ],
    territory: {
      nl: "De stad Bilzen-Hoeselt en de gemeente Riemst",
      fr: "La ville de Bilzen-Hoeselt et la commune de Riemst"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.7"
  },
  {
    id: "bree",
    arrondissement: "limburg",
    name: {
      nl: "Bree",
      fr: "Bree"
    },
    seat: {
      nl: "Bree",
      fr: "Bree"
    },
    municipalities: [
      {
        municipality: "72003"
      },
      {
        municipality: "72004"
      },
      {
        municipality: "72018"
      },
      {
        municipality: "72021"
      },
      {
        municipality: "72042"
      }
    ],
    territory: {
      nl: "De steden Bree, Maaseik en de gemeenten Bocholt, Kinrooi en Oudsbergen",
      fr: "Les villes de Bree, de Maaseik et les communes de Bocholt, de Kinrooi et d'Oudsbergen"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.8"
  },
  {
    id: "genk",
    arrondissement: "limburg",
    name: {
      nl: "Genk",
      fr: "Genk"
    },
    seat: {
      nl: "Genk",
      fr: "Genk"
    },
    municipalities: [
      {
        municipality: "71002"
      },
      {
        municipality: "71016"
      },
      {
        municipality: "71067"
      }
    ],
    territory: {
      nl: "De stad Genk en de gemeenten As en Zutendaal",
      fr: "La ville de Genk et les communes d'As et de Zutendaal"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.9"
  },
  {
    id: "maasmechelen",
    arrondissement: "limburg",
    name: {
      nl: "Maasmechelen",
      fr: "Maasmechelen"
    },
    seat: {
      nl: "Maasmechelen",
      fr: "Maasmechelen"
    },
    municipalities: [
      {
        municipality: "72041"
      },
      {
        municipality: "73042"
      },
      {
        municipality: "73107"
      }
    ],
    territory: {
      nl: "De stad Dilsen-Stokkem en de gemeenten Lanaken en Maasmechelen",
      fr: "La ville de Dilsen-Stokkem et les communes de Lanaken et de Maasmechelen"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.10"
  },
  {
    id: "tongeren-borgloon",
    arrondissement: "limburg",
    name: {
      nl: "Tongeren-Borgloon",
      fr: "Tongres-Looz"
    },
    seat: {
      nl: "Tongeren-Borgloon",
      fr: "Tongres-Looz"
    },
    municipalities: [
      {
        municipality: "73001"
      },
      {
        municipality: "73022"
      },
      {
        municipality: "73028"
      },
      {
        municipality: "73098"
      },
      {
        municipality: "73109"
      },
      {
        municipality: "73111"
      }
    ],
    territory: {
      nl: "De stad Tongeren-Borgloon en de gemeenten Alken, Heers, Herstappe, Voeren en Wellen",
      fr: "La ville de Tongres-Looz et les communes d'Alken, de Heers, de Herstappe, de Fourons et de Wellen"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 2.11"
  },
  {
    id: "braine-l-alleud",
    arrondissement: "brabant-wallon",
    name: {
      nl: "Eigenbrakel",
      fr: "Braine-l'Alleud"
    },
    seat: {
      nl: "Eigenbrakel",
      fr: "Braine-l'Alleud"
    },
    municipalities: [
      {
        municipality: "25014"
      },
      {
        municipality: "25015"
      },
      {
        municipality: "25110"
      }
    ],
    territory: {
      nl: "De gemeenten Eigenbrakel, Kasteelbrakel en Waterloo",
      fr: "Les communes de Braine-l'Alleud, de Braine-le-Ch\xE2teau et de Waterloo"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 3.1"
  },
  {
    id: "jodoigne",
    arrondissement: "brabant-wallon",
    name: {
      nl: "Geldenaken",
      fr: "Jodoigne"
    },
    seat: {
      nl: "Geldenaken",
      fr: "Jodoigne"
    },
    municipalities: [
      {
        municipality: "25005"
      },
      {
        municipality: "25037"
      },
      {
        municipality: "25043"
      },
      {
        municipality: "25048"
      },
      {
        municipality: "25084"
      },
      {
        municipality: "25118"
      },
      {
        municipality: "25120"
      },
      {
        municipality: "25122"
      }
    ],
    territory: {
      nl: "De stad Geldenaken en de gemeenten Bevekom, Graven, H\xE9lecine, Incourt, Orp-Jauche, Perwijs en Ramillies",
      fr: "La ville de Jodoigne et les communes de Beauvechain, de Grez-Doiceau, de H\xE9lecine, de Incourt, d'Orp-Jauche, de Perwez et de Ramillies"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 3.2"
  },
  {
    id: "nivelles",
    arrondissement: "brabant-wallon",
    name: {
      nl: "Nijvel",
      fr: "Nivelles"
    },
    seat: {
      nl: "Nijvel",
      fr: "Nivelles"
    },
    municipalities: [
      {
        municipality: "25031"
      },
      {
        municipality: "25044"
      },
      {
        municipality: "25072"
      },
      {
        municipality: "25105"
      },
      {
        municipality: "25107"
      },
      {
        municipality: "25119"
      },
      {
        municipality: "25123"
      }
    ],
    territory: {
      nl: "De steden Genepi\xEBn, Nijvel, Tubeke en de gemeenten Itter, Lasne, Roosbeek en Villers-la-Ville",
      fr: "Les villes de Genappe, de Nivelles, de Tubize et les communes d'Ittre, de Lasne, de Rebecq et de Villers-la-Ville"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 3.3"
  },
  {
    id: "wavre-1",
    arrondissement: "brabant-wallon",
    name: {
      nl: "Waver",
      fr: "Wavre"
    },
    number: 1,
    seat: {
      nl: "Waver",
      fr: "Wavre"
    },
    municipalities: [
      {
        municipality: "25050"
      },
      {
        municipality: "25091"
      },
      {
        municipality: "25112"
      }
    ],
    territory: {
      nl: "De stad Waver en de gemeenten Rixensart en Terhulpen",
      fr: "La ville de Wavre et les communes de Rixensart et de La Hulpe"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 3.4"
  },
  {
    id: "wavre-2",
    arrondissement: "brabant-wallon",
    name: {
      nl: "Waver",
      fr: "Wavre"
    },
    number: 2,
    seat: {
      nl: "Waver",
      fr: "Wavre"
    },
    municipalities: [
      {
        municipality: "25018"
      },
      {
        municipality: "25023"
      },
      {
        municipality: "25068"
      },
      {
        municipality: "25117"
      },
      {
        municipality: "25121"
      },
      {
        municipality: "25124"
      }
    ],
    territory: {
      nl: "De stad Ottignies-Louvain-la-Neuve en de gemeenten Chastre, Chaumont-Gistoux, Court-Saint-Etienne, Mont-Saint-Guibert en Walhain",
      fr: "La ville d'Ottignies-Louvain-la-Neuve et les communes de Chastre, de Chaumont-Gistoux, de Court-Saint-Etienne, de Mont-Saint-Guibert et de Walhain"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 3.5"
  },
  {
    id: "anderlecht-1",
    arrondissement: "brussel",
    name: {
      nl: "Anderlecht",
      fr: "Anderlecht"
    },
    number: 1,
    seat: {
      nl: "Anderlecht",
      fr: "Anderlecht"
    },
    municipalities: [
      {
        municipality: "21001",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de gemeente Anderlecht gelegen ten oosten van de middellijn van de Louis Mettewielaan, de Prins van Luiklaan, de Cyriel Buyssestraat, de Edmond Delcourtstraat, de Jef Dillensquare, de de Formanoirstraat, de Veeweidestraat en de Bergensesteenweg",
      fr: "La partie du territoire de la commune d'Anderlecht situ\xE9e \xE0 l'est de la ligne m\xE9diane des boulevard Louis Mettewie, boulevard Prince de Li\xE8ge, rue Cyriel Buysse, rue Edmond Delcourt, square Jef Dillen, rue de Formanoir, rue de Veeweyde et chauss\xE9e de Mons"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.1"
  },
  {
    id: "anderlecht-2",
    arrondissement: "brussel",
    name: {
      nl: "Anderlecht",
      fr: "Anderlecht"
    },
    number: 2,
    seat: {
      nl: "Anderlecht",
      fr: "Anderlecht"
    },
    municipalities: [
      {
        municipality: "21001",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de gemeente Anderlecht gelegen ten westen van de middellijn van de Louis Mettewielaan, de Prins van Luiklaan, de Cyriel Buyssestraat, de Edmond Delcourtstraat, de Jef Dillensquare, de de Formanoirstraat, de Veeweidestraat en de Bergensesteenweg",
      fr: "La partie du territoire de la commune d'Anderlecht situ\xE9e \xE0 l'ouest de la ligne m\xE9diane des boulevard Louis Mettewie, boulevard Prince de Li\xE8ge, rue Cyriel Buysse, rue Edmond Delcourt, square Jef Dillen, rue de Formanoir, rue de Veeweyde et chauss\xE9e de Mons,"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.2"
  },
  {
    id: "oudergem",
    arrondissement: "brussel",
    name: {
      nl: "Oudergem",
      fr: "Auderghem"
    },
    seat: {
      nl: "Etterbeek",
      fr: "Etterbeek"
    },
    municipalities: [
      {
        municipality: "21002"
      },
      {
        municipality: "21017"
      }
    ],
    territory: {
      nl: "De gemeenten Oudergem en Watermaal-Bosvoorde",
      fr: "Les communes d'Auderghem et de Watermael-Boitsfort"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.3"
  },
  {
    id: "brussel-1",
    arrondissement: "brussel",
    name: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    number: 1,
    seat: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    municipalities: [
      {
        municipality: "21004",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brussel begrensd door de middellijnen van de Maurice Lemonnierlaan, het Fontainasplein, de Anspachlaan, de Kiekenmarkt, de Grasmarkt, de Bergstraat, de Berlaimontlaan, de Collegialestraat, de Wilde Woudstraat, Treurenberg, de Wetstraat, de Regentlaan en door de scheidingslijn tussen de stad Brussel en de gemeente Elsene vormt, samen met heel het grondgebied van de stad Brussel gelegen tussen het zuidwesten van het Louisaplein en de scheidingslijn tussen de stad Brussel en de gemeente Sint-Gillis",
      fr: "La partie du territoire de la ville de Bruxelles d\xE9limit\xE9e par les lignes m\xE9dianes des boulevard Maurice Lemonnier, place Fontainas, boulevard Anspach, rue March\xE9-aux-Poulets, rue du March\xE9-aux-Herbes, rue Montagne, boulevard Berlaimont, rue Coll\xE9giale, rue du Bois Sauvage, Treurenberg, rue de la Loi, boulevard du R\xE9gent et par la ligne de s\xE9paration entre la ville de Bruxelles et la commune d'Ixelles et l'ensemble du territoire de la ville de Bruxelles situ\xE9 entre le sud-est de la place Louise et la ligne de s\xE9paration entre la ville de Bruxelles et la commune de Saint-Gilles"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.4"
  },
  {
    id: "brussel-2",
    arrondissement: "brussel",
    name: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    number: 2,
    seat: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    municipalities: [
      {
        municipality: "21004",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brussel begrensd door de middellijnen van het Saincteletteplein, de Sainctelettesquare, het IJzerplein en de lijn die de Antwerpselaan van de Boudewijnlaan scheidt tot de middellijn van de Adolphe Maxlaan, de scheidingslijn tussen de stad Brussel en de gemeente Sint-Joost-ten-Node, de scheidingslijn tussen de stad Brussel en de gemeente Schaarbeek, de scheidingslijn tussen de stad Brussel en de gemeente Etterbeek, de scheidingslijn tussen de stad Brussel en de gemeente Elsene en de middellijnen van de Regentlaan, de Wetstraat, het deel van de Koningsstraat tot aan Treurenberg, Treurenberg, de Wilde Woudstraat, de Collegialestraat, de Berlaimontlaan, de Bergstraat, de Grasmarkt, de Kiekenmarkt, de Anspachlaan, het Fontainasplein en de Maurice Lemonnierlaan tot aan de grens van de stad Brussel",
      fr: "La partie du territoire de la ville de Bruxelles d\xE9limit\xE9e par les lignes m\xE9dianes des place Sainctelette, square Sainctelette, place de l'Yser et la ligne qui s\xE9pare le boulevard d'Anvers du boulevard Baudouin jusqu'\xE0 la ligne m\xE9diane du boulevard Adolphe Max, la ligne de s\xE9paration entre la ville de Bruxelles et la commune de Saint-Josse-ten-Noode, la ligne de s\xE9paration entre la ville de Bruxelles et la commune de Schaerbeek, la ligne de s\xE9paration entre la ville de Bruxelles et la commune d'Etterbeek, la ligne de s\xE9paration entre la ville de Bruxelles et la commune d'Ixelles et les lignes m\xE9dianes du boulevard du R\xE9gent, de la rue de la Loi, de la partie de la rue Royale jusqu'au Treurenberg, les Treurenberg, rue du Bois Sauvage, rue Coll\xE9giale, avenue Berlaimont, rue Montagne, rue du March\xE9-aux-Herbes, rue du March\xE9-aux-Poulets, boulevard Anspach, place Fontainas et boulevard Maurice Lemonnier jusqu'aux limites de la ville de Bruxelles"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.5"
  },
  {
    id: "brussel-3",
    arrondissement: "brussel",
    name: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    number: 3,
    seat: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    municipalities: [
      {
        municipality: "21004",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brussel begrensd ten oosten door de middellijn van het Saincteletteplein, de Willebroekse vaart, de van Praetbrug, de Jules van Praetlaan en de Meiselaan",
      fr: "La partie du territoire de la ville de Bruxelles d\xE9limit\xE9e \xE0 l'est par la ligne m\xE9diane de la place Sainctelette, du canal de Willebroek, du pont van Praet, de l'avenue Jules van Praet et de l'avenue de Meysse"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.6"
  },
  {
    id: "brussel-4",
    arrondissement: "brussel",
    name: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    number: 4,
    seat: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    municipalities: [
      {
        municipality: "21004",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brussel begrensd ten westen door de middellijn van het Saincteletteplein, de Willebroekse vaart, de van Praetbrug, de Jules van Praetlaan en de Meiselaan, ten zuiden door de middellijn van het Saincteletteplein, de Sainctelettesquare, het IJzerplein en door de lijn die de scheiding vormt tussen de Antwerpselaan en de Boudewijnlaan",
      fr: "La partie du territoire de la ville de Bruxelles d\xE9limit\xE9e \xE0 l'ouest par la ligne m\xE9diane de la place Sainctelette, du canal de Willebroek, du pont van Praet, de l'avenue Jules van Praet et de l'avenue de Meysse, au sud par la ligne m\xE9diane de la place Sainctelette, du square Sainctelette, de la place de l'Yser et par la ligne de s\xE9paration entre le boulevard d'Anvers et le boulevard Baudouin"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.7"
  },
  {
    id: "etterbeek",
    arrondissement: "brussel",
    name: {
      nl: "Etterbeek",
      fr: "Etterbeek"
    },
    seat: {
      nl: "Etterbeek",
      fr: "Etterbeek"
    },
    municipalities: [
      {
        municipality: "21005"
      }
    ],
    territory: {
      nl: "De gemeente Etterbeek",
      fr: "La commune d'Etterbeek"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.8"
  },
  {
    id: "vorst",
    arrondissement: "brussel",
    name: {
      nl: "Vorst",
      fr: "Forest"
    },
    seat: {
      nl: "Vorst",
      fr: "Forest"
    },
    municipalities: [
      {
        municipality: "21007"
      }
    ],
    territory: {
      nl: "De gemeente Vorst",
      fr: "La commune de Forest"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.9"
  },
  {
    id: "elsene",
    arrondissement: "brussel",
    name: {
      nl: "Elsene",
      fr: "Ixelles"
    },
    seat: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    municipalities: [
      {
        municipality: "21009"
      }
    ],
    territory: {
      nl: "De gemeente Elsene",
      fr: "La commune d'Ixelles"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.10"
  },
  {
    id: "ganshoren",
    arrondissement: "brussel",
    name: {
      nl: "Ganshoren",
      fr: "Ganshoren"
    },
    seat: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    municipalities: [
      {
        municipality: "21003"
      },
      {
        municipality: "21008"
      },
      {
        municipality: "21011"
      }
    ],
    territory: {
      nl: "De gemeenten Sint-Agatha-Berchem, Ganshoren en Koekelberg",
      fr: "Les communes de Berchem-Sainte-Agathe, de Ganshoren et de Koekelberg"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.11"
  },
  {
    id: "jette",
    arrondissement: "brussel",
    name: {
      nl: "Jette",
      fr: "Jette"
    },
    seat: {
      nl: "Jette",
      fr: "Jette"
    },
    municipalities: [
      {
        municipality: "21010"
      }
    ],
    territory: {
      nl: "De gemeente Jette",
      fr: "La commune de Jette"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.12"
  },
  {
    id: "sint-jans-molenbeek",
    arrondissement: "brussel",
    name: {
      nl: "Sint-Jans-Molenbeek",
      fr: "Molenbeek-Saint-Jean"
    },
    seat: {
      nl: "Sint-Jans-Molenbeek",
      fr: "Molenbeek-Saint-Jean"
    },
    municipalities: [
      {
        municipality: "21012"
      }
    ],
    territory: {
      nl: "De gemeente Sint-Jans-Molenbeek",
      fr: "La commune de Molenbeek-Saint-Jean"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.13"
  },
  {
    id: "sint-gillis",
    arrondissement: "brussel",
    name: {
      nl: "Sint-Gillis",
      fr: "Saint-Gilles"
    },
    seat: {
      nl: "Sint-Gillis",
      fr: "Saint-Gilles"
    },
    municipalities: [
      {
        municipality: "21013"
      }
    ],
    territory: {
      nl: "De gemeente Sint-Gillis",
      fr: "La commune de Saint-Gilles"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.14"
  },
  {
    id: "sint-joost-ten-node",
    arrondissement: "brussel",
    name: {
      nl: "Sint-Joost-ten-Node",
      fr: "Saint-Josse-ten-Noode"
    },
    seat: {
      nl: "Sint-Joost-ten-Node",
      fr: "Saint-Josse-ten-Noode"
    },
    municipalities: [
      {
        municipality: "21006"
      },
      {
        municipality: "21014"
      }
    ],
    territory: {
      nl: "De gemeenten Evere en Sint-Joost-ten-Node",
      fr: "Les communes d'Evere et de Saint-Josse-ten-Noode"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.15"
  },
  {
    id: "schaarbeek-1",
    arrondissement: "brussel",
    name: {
      nl: "Schaarbeek",
      fr: "Schaerbeek"
    },
    number: 1,
    seat: {
      nl: "Schaarbeek",
      fr: "Schaerbeek"
    },
    municipalities: [
      {
        municipality: "21015",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de gemeente Schaarbeek gelegen links van de middellijn van de Paviljoenstraat, de Vleugelsstraat, de Jeruzalemstraat, de Azalealaan, de Ernest Cambierlaan, de Leuvense Steenweg, van het Generaal Meiserplein tot aan de grens met de gemeente Sint-Joost-ten-Node",
      fr: "La partie du territoire de la commune de Schaerbeek situ\xE9e \xE0 gauche des lignes m\xE9dianes des rue du Pavillon, rue des Ailes, rue de J\xE9rusalem, avenue des Azal\xE9es, avenue Ernest Cambier, chauss\xE9e de Louvain, de la place G\xE9n\xE9ral Meiser jusqu'\xE0 la fronti\xE8re avec la commune de Saint-Josse-ten-Noode"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.16"
  },
  {
    id: "schaarbeek-2",
    arrondissement: "brussel",
    name: {
      nl: "Schaarbeek",
      fr: "Schaerbeek"
    },
    number: 2,
    seat: {
      nl: "Schaarbeek",
      fr: "Schaerbeek"
    },
    municipalities: [
      {
        municipality: "21015",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de gemeente Schaarbeek gelegen rechts van de middellijn van de Paviljoenstraat, de Vleugelsstraat, de Jeruzalemstraat, de Azalealaan, de Ernest Cambierlaan, de Leuvense Steenweg, van het Generaal Meiserplein tot aan de grens met de gemeente Sint-Joost-ten-Node",
      fr: "La partie du territoire de la commune de Schaerbeek situ\xE9e \xE0 droite des lignes m\xE9dianes des rue du Pavillon, rue des Ailes, rue de J\xE9rusalem, avenue des Azal\xE9es, avenue Ernest Cambier, chauss\xE9e de Louvain, de la place G\xE9n\xE9ral Meiser jusqu'\xE0 la fronti\xE8re avec la commune de Saint-Josse-ten-Noode"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.17"
  },
  {
    id: "ukkel",
    arrondissement: "brussel",
    name: {
      nl: "Ukkel",
      fr: "Uccle"
    },
    seat: {
      nl: "Ukkel",
      fr: "Uccle"
    },
    municipalities: [
      {
        municipality: "21016"
      }
    ],
    territory: {
      nl: "De gemeente Ukkel",
      fr: "La commune d'Uccle"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.18"
  },
  {
    id: "sint-pieters-woluwe",
    arrondissement: "brussel",
    name: {
      nl: "Sint-Pieters-Woluwe",
      fr: "Woluw\xE9-Saint-Pierre"
    },
    seat: {
      nl: "Sint-Pieters-Woluwe",
      fr: "Woluw\xE9-Saint-Pierre"
    },
    municipalities: [
      {
        municipality: "21018"
      },
      {
        municipality: "21019"
      }
    ],
    territory: {
      nl: "De gemeenten Sint-Lambrechts-Woluwe en Sint-Pieters-Woluwe",
      fr: "Les communes de Woluw\xE9-Saint-Lambert et de Woluw\xE9-Saint-Pierre"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 4.19"
  },
  {
    id: "asse",
    arrondissement: "brussel",
    name: {
      nl: "Asse",
      fr: "Asse"
    },
    seat: {
      nl: "Asse",
      fr: "Asse"
    },
    municipalities: [
      {
        municipality: "23002"
      },
      {
        municipality: "23052"
      },
      {
        municipality: "23060"
      },
      {
        municipality: "23086"
      },
      {
        municipality: "23105"
      }
    ],
    territory: {
      nl: "De gemeenten Affligem, Asse, Merchtem, Opwijk en Ternat",
      fr: "Les communes d'Affligem, d'Asse, de Merchtem, d'Opwijk et de Ternat"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.1"
  },
  {
    id: "halle",
    arrondissement: "brussel",
    name: {
      nl: "Halle",
      fr: "Hal"
    },
    seat: {
      nl: "Halle",
      fr: "Hal"
    },
    municipalities: [
      {
        municipality: "23003"
      },
      {
        municipality: "23027"
      },
      {
        municipality: "23064"
      },
      {
        municipality: "23077"
      }
    ],
    territory: {
      nl: "De stad Halle en de gemeenten Beersel, Pepingen en Sint-Pieters-Leeuw",
      fr: "La ville de Hal et les communes de Beersel, de Pepingen et de Leeuw-Saint-Pierre"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.2"
  },
  {
    id: "sint-genesius-rode",
    arrondissement: "brussel",
    name: {
      nl: "Sint-Genesius-Rode",
      fr: "Rhode-Saint-Gen\xE8se"
    },
    seat: {
      nl: "Sint-Genesius-Rode",
      fr: "Rhode-Saint-Gen\xE8se"
    },
    municipalities: [
      {
        municipality: "23098"
      },
      {
        municipality: "23099"
      },
      {
        municipality: "23100"
      },
      {
        municipality: "23101"
      },
      {
        municipality: "23103"
      }
    ],
    territory: {
      nl: "De gemeenten Drogenbos, Kraainem, Linkebeek, Sint-Genesius-Rode en Wezembeek-Oppem",
      fr: "Les communes de Drogenbos, de Kraainem, de Linkebeek, de Rhode-Saint-Gen\xE8se et de Wezembeek-Oppem"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.3"
  },
  {
    id: "lennik",
    arrondissement: "brussel",
    name: {
      nl: "Lennik",
      fr: "Lennik"
    },
    seat: {
      nl: "Lennik",
      fr: "Lennik"
    },
    municipalities: [
      {
        municipality: "23009"
      },
      {
        municipality: "23016"
      },
      {
        municipality: "23044"
      },
      {
        municipality: "23097"
      },
      {
        municipality: "23104"
      },
      {
        municipality: "23106"
      }
    ],
    territory: {
      nl: "De gemeenten Bever, Dilbeek, Pajottegem, Lennik, Liedekerke en Roosdaal",
      fr: "Les communes de Bi\xE9v\xE8ne, de Dilbeek, de Pajottegem, de Lennik, de Liedekerke et de Roosdaal"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.4"
  },
  {
    id: "meise",
    arrondissement: "brussel",
    name: {
      nl: "Meise",
      fr: "Meise"
    },
    seat: {
      nl: "Meise",
      fr: "Meise"
    },
    municipalities: [
      {
        municipality: "23025"
      },
      {
        municipality: "23039"
      },
      {
        municipality: "23045"
      },
      {
        municipality: "23050"
      },
      {
        municipality: "23102"
      }
    ],
    territory: {
      nl: "De gemeenten Grimbergen, Kapelle-op-den-Bos, Londerzeel, Meise en Wemmel",
      fr: "Les communes de Grimbergen, de Kapelle-op-den-Bos, de Londerzeel, de Meise et de Wemmel"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.5"
  },
  {
    id: "zaventem",
    arrondissement: "brussel",
    name: {
      nl: "Zaventem",
      fr: "Zaventem"
    },
    seat: {
      nl: "Zaventem",
      fr: "Zaventem"
    },
    municipalities: [
      {
        municipality: "23033"
      },
      {
        municipality: "23062"
      },
      {
        municipality: "23081"
      },
      {
        municipality: "23094"
      }
    ],
    territory: {
      nl: "De gemeenten Hoeilaart, Overijse, Steenokkerzeel en Zaventem",
      fr: "Les communes de Hoeilaart, de Overijse, de Steenokkerzeel et de Zaventem"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.6"
  },
  {
    id: "vilvoorde",
    arrondissement: "brussel",
    name: {
      nl: "Vilvoorde",
      fr: "Vilvorde"
    },
    seat: {
      nl: "Vilvoorde",
      fr: "Vilvorde"
    },
    municipalities: [
      {
        municipality: "23038"
      },
      {
        municipality: "23047"
      },
      {
        municipality: "23088"
      },
      {
        municipality: "23096"
      }
    ],
    territory: {
      nl: "De stad Vilvoorde en de gemeenten Kampenhout, Machelen en Zemst",
      fr: "La ville de Vilvorde et les communes de Kampenhout, de Machelen et de Zemst"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.7"
  },
  {
    id: "aarschot",
    arrondissement: "leuven",
    name: {
      nl: "Aarschot",
      fr: "Aarschot"
    },
    seat: {
      nl: "Aarschot",
      fr: "Aarschot"
    },
    municipalities: [
      {
        municipality: "24001"
      },
      {
        municipality: "24007"
      },
      {
        municipality: "24014"
      },
      {
        municipality: "24033"
      },
      {
        municipality: "24048"
      },
      {
        municipality: "24094"
      },
      {
        municipality: "24109"
      }
    ],
    territory: {
      nl: "De stad Aarschot en de gemeenten Begijnendijk, Boortmeerbeek, Haacht, Keerbergen, Rotselaar en Tremelo",
      fr: "La ville d'Aarschot et les communes de Begijnendijk, de Boortmeerbeek, de Haacht, de Keerbergen, de Rotselaar et de Tremelo"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.9"
  },
  {
    id: "diest",
    arrondissement: "leuven",
    name: {
      nl: "Diest",
      fr: "Diest"
    },
    seat: {
      nl: "Diest",
      fr: "Diest"
    },
    municipalities: [
      {
        municipality: "24008"
      },
      {
        municipality: "24020"
      },
      {
        municipality: "24134"
      },
      {
        municipality: "24135"
      }
    ],
    territory: {
      nl: "De steden Diest, Scherpenheuvel-Zichem en de gemeenten Bekkevoort en Tielt-Winge",
      fr: "Les villes de Diest, de Montaigu-Zichem et les communes de Bekkevoort et de Tielt-Winge"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.10"
  },
  {
    id: "zoutleeuw",
    arrondissement: "leuven",
    name: {
      nl: "Zoutleeuw",
      fr: "L\xE9au"
    },
    seat: {
      nl: "Zoutleeuw",
      fr: "L\xE9au"
    },
    municipalities: [
      {
        municipality: "24028"
      },
      {
        municipality: "24054"
      },
      {
        municipality: "24059"
      },
      {
        municipality: "24130"
      },
      {
        municipality: "24133"
      },
      {
        municipality: "24137"
      }
    ],
    territory: {
      nl: "De steden Landen, Zoutleeuw en de gemeenten Glabbeek, Geetbets, Kortenaken en Linter",
      fr: "Les villes de Landen, de L\xE9au et les communes de Glabbeek, de Geetbets, de Kortenaken et de Linter"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.11"
  },
  {
    id: "leuven-1",
    arrondissement: "leuven",
    name: {
      nl: "Leuven",
      fr: "Louvain"
    },
    number: 1,
    seat: {
      nl: "Leuven",
      fr: "Louvain"
    },
    municipalities: [
      {
        municipality: "24038"
      },
      {
        municipality: "24055"
      },
      {
        municipality: "24062",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeenten Herent, Kortenberg en het gedeelte van het grondgebied van de stad Leuven gelegen ten noorden van de lijn die het verlengde vormt van de middellijn van de Diestsestraat en de Diestsesteenweg tot de grens van de stad Leuven; van de middellijn van de Diestsestraat en de Diestsesteenweg, een lijn die de verbinding vormt tussen de middellijn van de Diestsestraat en de Diestsesteenweg tot de middellijn van de Grote Markt en de de middellijnen van de Grote markt, Brusselsestraat en de Brusselsesteenweg tot de grens van de stad Leuven",
      fr: "Les communes de Herent, de Kortenberg et la partie du territoire de la ville de Louvain situ\xE9e au nord de la ligne qui constitue le prolongement de la m\xE9diane de la Diestsestraat et de la Diestsesteenweg jusqu'\xE0 la limite de la ville de Louvain; de la m\xE9diane de la Diestsestraat et de la Diestsesteenweg, une ligne qui forme la jonction entre la m\xE9diane de la Diestsestraat et de la Diestsesteenweg jusqu'\xE0 la m\xE9diane du Grote Markt et les m\xE9dianes du Grote Markt, de la Brusselsestraat et de la Brusselsesteenweg jusqu'\xE0 la limite de la ville de Louvain"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.12"
  },
  {
    id: "leuven-2",
    arrondissement: "leuven",
    name: {
      nl: "Leuven",
      fr: "Louvain"
    },
    number: 2,
    seat: {
      nl: "Leuven",
      fr: "Louvain"
    },
    municipalities: [
      {
        municipality: "24011"
      },
      {
        municipality: "24043"
      },
      {
        municipality: "24062",
        partial: true
      },
      {
        municipality: "24086"
      }
    ],
    territory: {
      nl: "De gemeenten Bierbeek, Holsbeek, Oud-Heverlee en het gedeelte van het grondgebied van de stad Leuven gelegen ten zuiden van de lijn die het verlengde vormt van de middellijnen van de Diestsestraat en de Diestsesteenweg tot de grens van de stad Leuven; van de middellijn van de Diestsestraat en de Diestsesteenweg, een lijn die de verbinding vormt tussen de middellijn van de Diestsestraat en de Diestsesteenweg tot de middellijn van de Grote Markt en de Naamsestraat ten oosten van de Grote Markt en de Naamsesteenweg tot de grens van de stad Leuven",
      fr: "Les communes de Bierbeek, de Holsbeek, de Oud-Heverlee et la partie du territoire de la ville de Louvain situ\xE9e au sud de la ligne qui constitue le prolongement des lignes m\xE9dianes de la Diestsestraat et de la Diestsesteenweg jusqu'\xE0 la limite de la ville de Louvain; de la m\xE9diane de la Diestsestraat et de la Diestsesteenweg, une ligne qui forme la jonction entre la m\xE9diane de la Diestsestraat et de la Diestsesteenweg jusqu'\xE0 la m\xE9diane du Grote Markt et de la Naamsestraat \xE0 l'est du Grote Markt, et de la Naamsesteenweg jusqu'\xE0 la limite de la ville de Louvain"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.13"
  },
  {
    id: "leuven-3",
    arrondissement: "leuven",
    name: {
      nl: "Leuven",
      fr: "Louvain"
    },
    number: 3,
    seat: {
      nl: "Leuven",
      fr: "Louvain"
    },
    municipalities: [
      {
        municipality: "24009"
      },
      {
        municipality: "24045"
      },
      {
        municipality: "24062",
        partial: true
      },
      {
        municipality: "24104"
      }
    ],
    territory: {
      nl: "De gemeenten Bertem, Huldenberg, Tervuren, en het gedeelte van het grondgebied van de stad Leuven gelegen ten zuiden van de lijn die de verbinding vormt van de lijn die het verlengde vormt van de middellijn van de Brusselsestraat en de Brusselsesteenweg tot de grens van de stad Leuven ten westen van de middellijnen van de Naamsestraat en de Naamsesteenweg en de middellijn van de Grote Markt tot aan de grens van de stad Leuven",
      fr: "Les communes de Bertem, de Huldenberg, de Tervuren et la partie du territoire de la ville de Louvain situ\xE9e au sud de la ligne qui forme la jonction de la ligne qui constitue le prolongement de la m\xE9diane de la Brusselsestraat et de la Brusselsesteenweg jusqu'\xE0 la limite de la ville de Louvain et \xE0 l'ouest des m\xE9dianes de la Naamsestraat et de la Naamsesteenweg et de la m\xE9diane du Grote Markt jusqu'\xE0 la limite de la ville de Louvain,"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.14"
  },
  {
    id: "tienen",
    arrondissement: "leuven",
    name: {
      nl: "Tienen",
      fr: "Tirlemont"
    },
    seat: {
      nl: "Tienen",
      fr: "Tirlemont"
    },
    municipalities: [
      {
        municipality: "24016"
      },
      {
        municipality: "24041"
      },
      {
        municipality: "24066"
      },
      {
        municipality: "24107"
      }
    ],
    territory: {
      nl: "De stad Tienen en de gemeenten Boutersem, Hoegaarden en Lubbeek",
      fr: "La ville de Tirlemont et les communes de Boutersem, de Hoegaarden et de Lubbeek"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 5.15"
  },
  {
    id: "aalst-1",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Aalst",
      fr: "Alost"
    },
    number: 1,
    seat: {
      nl: "Aalst",
      fr: "Alost"
    },
    municipalities: [
      {
        municipality: "41002",
        partial: true
      },
      {
        municipality: "41082"
      }
    ],
    territory: {
      nl: "De gemeente Erpe-Mere, het gedeelte van het grondgebied van de stad Aalst ten westen van de Dender en de deelgemeente Nieuwerkerken van de stad Aalst",
      fr: "La commune d'Erpe-Mere, la partie du territoire de la ville d'Alost situ\xE9e \xE0 l'ouest de la Dendre et l'ancienne commune de Nieuwerkerken de la ville d'Alost"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.1"
  },
  {
    id: "aalst-2",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Aalst",
      fr: "Alost"
    },
    number: 2,
    seat: {
      nl: "Aalst",
      fr: "Alost"
    },
    municipalities: [
      {
        municipality: "41002",
        partial: true
      },
      {
        municipality: "41034"
      }
    ],
    territory: {
      nl: "De gemeente Lede, het gedeelte van het grondgebied van de stad Aalst ten oosten van de Dender en de deelgemeenten Baardegem, Erembodegem, Gijzegem, Herdersem, Hofstade, Meldert en Moorsel van de stad Aalst",
      fr: "La commune de Lede, la partie du territoire de la ville d'Alost situ\xE9e \xE0 l'est de la Dendre et les anciennes communes de Baardegem, de Erembodegem, de Gijzegem, de Herdersem, de Hofstade, de Meldert et de Moorsel de la ville d'Alost"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.2"
  },
  {
    id: "beveren-kruibeke-zwijndrecht",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Beveren-Kruibeke-Zwijndrecht",
      fr: "Beveren-Kruibeke-Zwijndrecht"
    },
    seat: {
      nl: "Beveren-Kruibeke-Zwijndrecht",
      fr: "Beveren-Kruibeke-Zwijndrecht"
    },
    municipalities: [
      {
        municipality: "46020"
      },
      {
        municipality: "46030"
      }
    ],
    territory: {
      nl: "De gemeenten Beveren-Kruibeke-Zwijndrecht en Sint-Gillis-Waas",
      fr: "Les communes de Beveren-Kruibeke-Zwijndrecht et de Sint-Gillis-Waas"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.3"
  },
  {
    id: "dendermonde",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Dendermonde",
      fr: "Termonde"
    },
    seat: {
      nl: "Dendermonde",
      fr: "Termonde"
    },
    municipalities: [
      {
        municipality: "42004"
      },
      {
        municipality: "42006"
      },
      {
        municipality: "42011"
      }
    ],
    territory: {
      nl: "De stad Dendermonde en de gemeenten Buggenhout en Lebbeke",
      fr: "La ville de Termonde et les communes de Buggenhout et de Lebbeke"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.4"
  },
  {
    id: "hamme",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Hamme",
      fr: "Hamme"
    },
    seat: {
      nl: "Hamme",
      fr: "Hamme"
    },
    municipalities: [
      {
        municipality: "42008"
      },
      {
        municipality: "42023"
      },
      {
        municipality: "42028"
      },
      {
        municipality: "46025"
      }
    ],
    territory: {
      nl: "De gemeenten Hamme, Temse, Waasmunster en Zele",
      fr: "Les communes de Hamme, de Tamise, de Waasmunster et de Zele"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.5"
  },
  {
    id: "lokeren",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Lokeren",
      fr: "Lokeren"
    },
    seat: {
      nl: "Lokeren",
      fr: "Lokeren"
    },
    municipalities: [
      {
        municipality: "46024"
      },
      {
        municipality: "46029"
      }
    ],
    territory: {
      nl: "De stad Lokeren , de deelgemeente Moerbeke van de stad Lokeren en de gemeente Stekene",
      fr: "La ville de Lokeren , l'ancienne commune de Moerbeke de la Ville de Lokeren et la commune de Stekene"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.6"
  },
  {
    id: "ninove",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Ninove",
      fr: "Ninove"
    },
    seat: {
      nl: "Ninove",
      fr: "Ninove"
    },
    municipalities: [
      {
        municipality: "41011"
      },
      {
        municipality: "41024"
      },
      {
        municipality: "41048"
      }
    ],
    territory: {
      nl: "De stad Ninove en de gemeenten Denderleeuw en Haaltert",
      fr: "La ville de Ninove et les communes de Denderleeuw et de Haaltert"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.7"
  },
  {
    id: "sint-niklaas",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Sint-Niklaas",
      fr: "Saint-Nicolas"
    },
    seat: {
      nl: "Sint-Niklaas",
      fr: "Saint-Nicolas"
    },
    municipalities: [
      {
        municipality: "46021"
      }
    ],
    territory: {
      nl: "De stad Sint-Niklaas",
      fr: "La ville de Saint-Nicolas"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.8"
  },
  {
    id: "wetteren",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Wetteren",
      fr: "Wetteren"
    },
    seat: {
      nl: "Wetteren",
      fr: "Wetteren"
    },
    municipalities: [
      {
        municipality: "42003"
      },
      {
        municipality: "42010"
      },
      {
        municipality: "42025"
      },
      {
        municipality: "42026"
      }
    ],
    territory: {
      nl: "De gemeenten Berlare, Laarne, Wetteren en Wichelen",
      fr: "Les communes de Berlare, de Laarne, de Wetteren et de Wichelen"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.9"
  },
  {
    id: "deinze",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Deinze",
      fr: "Deinze"
    },
    seat: {
      nl: "Deinze",
      fr: "Deinze"
    },
    municipalities: [
      {
        municipality: "44081"
      },
      {
        municipality: "44083"
      },
      {
        municipality: "44084"
      }
    ],
    territory: {
      nl: "De stad Deinze en de gemeenten Aalter en Zulte",
      fr: "La ville de Deinze et les communes de Aalter et de Zulte"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.10"
  },
  {
    id: "eeklo",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Eeklo",
      fr: "Eeklo"
    },
    seat: {
      nl: "Eeklo",
      fr: "Eeklo"
    },
    municipalities: [
      {
        municipality: "43005"
      },
      {
        municipality: "43007"
      },
      {
        municipality: "43010"
      },
      {
        municipality: "43014"
      },
      {
        municipality: "44085"
      }
    ],
    territory: {
      nl: "De stad Eeklo en de gemeenten Kaprijke, Lievegem, Maldegem en Sint-Laureins",
      fr: "La ville d'Eeklo et les communes de Kaprijke, de Lievegem, de Maldegem et de Sint-Laureins"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.11"
  },
  {
    id: "gent-1",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Gent",
      fr: "Gand"
    },
    number: 1,
    seat: {
      nl: "Gent",
      fr: "Gand"
    },
    municipalities: [
      {
        municipality: "44021",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Gent beginnend onder de torens van het Rabot, het kanaal de Lieve tot aan de Lievebrug, de middellijn van de Lievestraat, de middellijn van de Lange Steenstraat, de middellijn van de Grauwpoort tot aan het Sluizeken, de middellijn van het Sluizeken tot tegen de Achterleie, de zuidelijke grens van Achterleie tot aan de Leie, de Leie langs de Achterleie, de Leie tot aan de Slachthuisbrug, de Slachthuisbrug tot het kruispunt met de Koepoortkaai, de Koepoortkaai, de Filips Van Artveldestraat tot aan het Sint-Annaplein, de noordelijke grens van het Sint-Annaplein, de middellijnen van de Brabantdam tot aan de kruising met de Kortedagsteeg, de middellijn van de Kortedagsteeg, de middellijn van de Walpoortstraat, de middellijn van de Sint-Pietersnieuwstraat, het deel van het Sint-Pietersplein dat de verbinding vormt tussen de Sint-Pietersnieuwstraat en de Overpoortstraat, de middellijn van de Overpoortstraat, de middellijn van de Normaalschoolstraat, de middellijn van de Ottergemsesteenweg tot aan de spoorweglijn onmiddellijk ten zuiden van de Burggravenlaan, de spoorweg in oostelijke richting tot aan de Schelde en verder de Schelde in zuidelijke richting tot aan de Ringvaart, dan van de Ringvaart in noordwestelijke richting tot aan de Maaltebrug/kruising met de Kortrijksesteenweg, de zuidelijke grens van de Kortrijksesteenweg tot aan De Sterre - kruising N60/N43 met de Voskenslaan, de oostelijke grens van de Voskenslaan, de noordoostelijke grens van de Sint-Denijslaan volgend tot aan het kruispunt met de Valentin Vaerewyckweg, verder volgend noordelijk naar de parking Gent Sint-Pietersstation tot aan de kruising met de Koningin Fabiolalaan, de noordoostelijke grens van de Koningin Fabiolalaan over de kruising met de Gordunakaai tot aan de Ringvaart in zuidoostelijke richting, de Leie in noordelijke richting langs de Gordunakaai tot aan de splitsing ter hoogte van Aan De Bocht, met verder als grens de Leie in noordelijke richting langs Aan de Bocht, langs de Belv\xE9d\xE8reweg, langs de Constant Dosscheweg, verder noordelijk langs de Leie tot aan de kruising van de Leie met Einde Were, de zuidelijke grens van Einde Were tot aan de kruising met Overzet en Nieuwe Wandeling, de noordelijke grens van de Nieuwe Wandeling, de middellijn van de Contributiestraat en de middellijn van de Begijnhoflaan tot aan de torens aan het Rabot",
      fr: "La partie du territoire de la ville de Gand d\xE9butant sous les tours du Rabot, le canal de Lieve jusqu'au Lievebrug, la ligne m\xE9diane de la Lievestraat, la ligne m\xE9diane de la Lange Steenstraat, la ligne m\xE9diane du Grauwpoort jusqu'au Sluizeken, la ligne m\xE9diane du Sluizeken jusqu'\xE0 l'Achterleie, la fronti\xE8re sud de l'Achterleie jusqu'\xE0 la Lys, la Lys le long de l'Achterleie, la Lys jusqu'au Slachthuisbrug, le Slachthuisbrug jusqu'au croisement avec le Koepoortkaai, le Koepoortkaai, la Filips Van Artveldestraat jusqu'\xE0 Sint-Annaplein, la fronti\xE8re nord de la Sint-Annaplein, la ligne m\xE9diane de Brabantdam jusqu'au croisement avec le Kortedagsteeg, la ligne m\xE9diane du Kortedagsteeg, la ligne m\xE9diane de la Walpoortstraat, la ligne m\xE9diane de la Sint-Pietersnieuwstraat, la partie de la Sint-Pietersplein reliant la Sint-Pietersnieuwstraat \xE0 l'Overpoortstraat, la ligne m\xE9diane de l'Overpoortstraat, la ligne m\xE9diane de la Normaalschoolstraat, la ligne m\xE9diane de l'Ottergemsesteenweg jusqu\xE0 la ligne de chemin de fer imm\xE9diatement au sud de la Burggravenlaan, la ligne de chemin de fer en direction de l'est vers l'Escaut et apr\xE8s l'Escaut en direction du sud vers le Ringvaart, puis du Ringvaart en direction du nord-ouest jusqu'au Maaltebrug/croisement avec la Kortrijksesteenweg, la limite sud de la Kortrijksesteenweg jusqu'\xE0 De Sterre - croisement N60/N43 avec la Voskenslaan, la limite est de la Voskenslaan, la limite nord-est de la Sint-Denijslaan jusqu'au carrefour avec la Valentin Vaerewyckweg, puis en direction du nord vers le parking de la gare de Gand Saint-Pierre jusqu'au croisement avec la Koningin Fabiolalaan, la limite nord-est de la Koningin Fabiolalaan au croisement avec le Gordunakaai jusqu'au Ringvaart en direction du sud-est, la Lys en direction du nord le long du Gordunakaai jusqu'\xE0 la s\xE9paration \xE0 hauteur de Aan De Bocht, avec comme limite ensuite la Lys en direction du nord le long d'Aan De Bocht, le long de la Belv\xE9d\xE8reweg, le long de la Constant Dosscheweg, puis en direction du nord le long de la Lys jusqu'au croisement de la Lys avec l'Einde Were, la limite sud de l'Einde Were jusqu'au croisement avec l'Overzet et la Nieuwe Wandeling, la limite nord de la Nieuwe Wandeling, la ligne m\xE9diane de la Contributiestraat et la ligne m\xE9diane de la Begijnhoflaan jusqu'aux tours du Rabot"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.12"
  },
  {
    id: "gent-2",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Gent",
      fr: "Gand"
    },
    number: 2,
    seat: {
      nl: "Gent",
      fr: "Gand"
    },
    municipalities: [
      {
        municipality: "44021",
        partial: true
      },
      {
        municipality: "44064"
      },
      {
        municipality: "44086"
      }
    ],
    territory: {
      nl: "De gemeenten Sint-Martens-Latem en Nazareth-De Pinte, de deelgemeenten Drongen, Zwijnaarde, Sint-Denijs-Westrem en Afsnee en het gedeelte van het grondgebied van de stad Gent beginnend aan de grens met de gemeente Lovendegem aan het kanaal Gent-Oostende, verder zuidelijk tot aan de Contributiebrug, de noordwestelijke grens van de Nieuwe Wandeling tot aan de kruising met Einde Were, de zuidelijke grens van Einde Were tot aan de kruising met de Leie, met verder als grens de Leie in zuidelijke richting, langs de Constant Dosscheweg, langs de Belv\xE9d\xE8reweg, langs Aan de Bocht tot aan het kruispunt van de Gordunakaai met de Koningin Fabiolalaan en vanaf daar, de noordoostelijke grens van de Koningin Fabiolalaan tot aan en zuidelijk over de parking Gent Sint-Pietersstation, de noordoostelijke grens van de Sint-Denijslaan volgend, langs de oostelijke grens van de Voskenslaan tot aan De Sterre (kruising Voskenslaan met N60/N43), de zuidelijke grens van de Kortrijksesteenweg tot aan de Ringvaart in zuidoostelijke richting tot aan de grens met de gemeente Merelbeke-Melle",
      fr: "Les communes de Sint-Martens-Latem et de Nazareth-De Pinte, les anciennes communes de Drongen, de Zwijnaarde, de Sint-Denijs-Westrem et de Afsnee et la partie de la ville de Gand d\xE9butant \xE0 la limite avec la commune de Lovendegem au canal Gand-Ostende, ensuite en direction du sud jusqu'au Contributiebrug, la limite nord-ouest de la Nieuwe Wandeling jusqu'au croisement avec l'Einde Were, la limite sud de l'Einde Were jusqu'au croisement avec la Lys, avec ensuite comme limite la Lys en direction du sud, le long de la Constant Dosscheweg, le long de la Belv\xE9d\xE8reweg, le long de l'Aan de Bocht jusqu'au croisement du Gordunakaai avec la Koningin Fabiolalaan et de l\xE0, la limite nord-est de la Koningin Fabiolalaan jusque et au sud du parking de la gare de Gand Saint-Pierre, la limite nord-est de la Sint-Denijslaan suivant, le long de la limite est de la Voskenslaan jusqu'\xE0 De Sterre (croisement Voskenslaan avec N60/N43), la limite sud de la Kortrijksesteenweg jusqu'au Ringvaart en direction du sud-est jusqu'\xE0 la limite avec la commune de Merelbeke-Melle"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.13"
  },
  {
    id: "gent-3",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Gent",
      fr: "Gand"
    },
    number: 3,
    seat: {
      nl: "Gent",
      fr: "Gand"
    },
    municipalities: [
      {
        municipality: "44021",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeente Mariakerke, het gedeelte van het grondgebied van de stad Gent dat begint aan de Ringvaart en de grens tussen de deelgemeente Mariakerke en Wondelgem, de grens tussen de deelgemeente Mariakerke en Wondelgem in zuidelijke richting tot aan het fietspad langs de Zandstraat, het fietspad in westelijke richting tot aan het kanaal Gent-Oostende, het kanaal Gent-Oostende in zuidelijke richting tot aan het Verbindingskanaal, dan het Verbindingskanaal, het Tolhuisdok, de Voorhaven en het kanaal Gent-Terneuzen in noordelijke richting tot aan de grens met de gemeente Zelzate en vervolgens de grens met de gemeente Zelzate in westelijke richting tot aan de grens met de gemeente Evergem",
      fr: "L'ancienne commune de Mariakerke, la partie du territoire de la ville de Gand d\xE9butant au Ringvaart et la limite entre l'ancienne commune de Mariakerke et Wondelgem, la limite entre l'ancienne commune de Mariakerke et Wondelgem en direction du sud jusqu'\xE0 la piste cyclable le long de la Zandstraat, la piste cyclable en direction de l'ouest jusqu'au canal Gand-Ostende, le canal Gand-Ostende en direction du sud jusqu'au Verbindingskanaal, ensuite le Verbindingskanaal, le Tolhuisdok, le Voorhaven et le canal Gand-Terneuzen en direction du nord jusqu'\xE0 la limite avec la commune de Zelzate et ensuite la limite avec la commune de Zelzate en direction de l'ouest jusqu'\xE0 la limite avec la commune d'Evergem"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.14"
  },
  {
    id: "gent-4",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Gent",
      fr: "Gand"
    },
    number: 4,
    seat: {
      nl: "Gent",
      fr: "Gand"
    },
    municipalities: [
      {
        municipality: "44021",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Gent dat begint aan de grens met de gemeente Zelzate, het kanaal Gent-Terneuzen in zuidelijke richting, de Voorhaven, het Tolhuisdok en het Verbindingskanaal tot aan het kanaal Gent-Oostende, het kanaal Gent-Oostende zuidelijk tot aan de Contributiebrug, de middellijn van de Contributiestraat, de middellijn van de Begijnhoflaan tot aan de torens van het Rabot, onder de torens van het Rabot het kanaal de Lieve tot aan de Lievebrug, dan de middellijn van de Lievestraat, de middellijn van de Lange Steenstraat, de middellijn van de Grauwpoort tot aan het Sluizeken, de middellijn van het Sluizeken tot tegen de Achterleie, de Achterleie tot aan de Leie en dan de Leie tot voor Portus Gandae, de waterweg in oostelijke richting naar het Octrooiplein, dwars door het Octrooiplein en het Antwerpenplein, door de middellijn van de Dendermondsesteenweg tot aan de grens met de gemeente Destelbergen en verder de grens met de gemeenten Lochristi en Zelzate",
      fr: "La partie du territoire de la ville de Gand d\xE9butant \xE0 la limite avec la commune de Zelzate, le canal Gand-Terneuzen en direction du sud, le Voorhaven, le Tolhuisdok et le Verbindingskanaal jusqu'au canal Gand-Ostende, le canal Gand-Ostende en direction du sud jusqu'au Contributiebrug, la ligne m\xE9diane de la Contributiestraat, la ligne m\xE9diane de la Begijnhoflaan jusqu'aux tours du Rabot, sous les tours du Rabot le canal de Lieve jusqu'au Lievebrug, ensuite la ligne m\xE9diane de la Lievestraat, la ligne m\xE9diane de la Lange Steenstraat, la ligne m\xE9diane de la Grauwpoort jusqu'au Sluizeken, la ligne m\xE9diane du Sluizeken jusqu'\xE0 l'Achterleie, l'Achterleie jusqu'\xE0 la Lys, ensuite la Lys jusque devant le Portus Gandae, la voie navigable en direction de l'est vers l'Octrooiplein, \xE0 travers l'Octrooiplein et l'Antwerpenplein, par la ligne m\xE9diane de la Dendermondsesteenweg jusqu'\xE0 la limite de la commune de Destelbergen et au-del\xE0 de la limite des communes de Lochristi et de Zelzate"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.15"
  },
  {
    id: "gent-5",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Gent",
      fr: "Gand"
    },
    number: 5,
    seat: {
      nl: "Gent",
      fr: "Gand"
    },
    municipalities: [
      {
        municipality: "44013"
      },
      {
        municipality: "44021",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Destelbergen en het gedeelte van het grondgebied van de stad Gent beginnend aan de grens met de gemeente Destelbergen, de middellijn van de Dendermondsesteenweg tot aan het Antwerpenplein, de middellijn van het Antwerpenplein dwars door het Octrooiplein, de waterweg tussen het Octrooiplein en de Leie, de Leie tot aan de Slachthuisbrug, de Slachthuisbrug tot het kruispunt met de Koepoortkaai, verder de oostelijke grens van de Koepoortkaai en de Filips Van Artveldestraat tot aan het Sint-Annaplein, de noordelijke grens van het Sint-Annaplein, de middellijnen van de Brabantdam tot aan de kruising met de Kortedagsteeg, de middellijn van de Kortedagsteeg, de middellijn van de Walpoortstraat, de middellijn van de Sint-Pietersnieuwstraat, het deel van het Sint-Pietersplein dat de verbinding vormt tussen de Sint-Pietersnieuwstraat en de Overpoortstraat, de middellijn van de Overpoortstraat, de middellijn van de Normaalschoolstraat, de middellijn van de Ottergemsesteenweg tot aan de spoorweglijn onmiddellijk ten zuiden van de Burggravenlaan, de spoorweg in oostelijke richting tot aan de Schelde en verder de Schelde in zuidelijke richting tot aan tot aan de grens met de gemeente Merelbeke-Melle",
      fr: "La commune de Destelbergen et la partie du territoire de la ville de Gand d\xE9butant \xE0 la limite de la commune de Destelbergen, la ligne m\xE9diane de la Dendermondsesteenweg jusqu'\xE0 l'Antwerpenplein, la ligne m\xE9diane de l'Antwerpenplein \xE0 travers l'Octrooiplein, la voie navigable entre l'Octrooiplein et la Lys, la Lys jusqu'au Slachthuisbrug, le Slachthuisbrug jusqu'au croisement avec le Koepoortkaai, ensuite la limite est du Koepoortkaai et la Filips Van Artveldestraat jusqu'\xE0 la Sint-Annaplein, la limite nord de la Sint-Annaplein, la ligne m\xE9diane du Brabantdam jusqu'au croisement avec le Kortedagsteeg, la ligne m\xE9diane du Kortedagsteeg, la ligne m\xE9diane de la Walpoortstraat, la ligne m\xE9diane de la Sint-Pietersnieuwstraat, la partie de la Sint-Pietersplein reliant la Sint-Pietersnieuwstraat \xE0 l'Overpoortstraat, la ligne m\xE9diane de l'Overpoortstraat, la ligne m\xE9diane de la Normaalschoolstraat, la ligne m\xE9diane de la Ottergemsesteenweg jusqu'\xE0 la ligne de chemin de fer imm\xE9diatement au sud de la Burggravenlaan, la ligne de chemin de fer en direction de l'est jusqu'\xE0 l'Escaut et au-del\xE0 de l'Escaut en direction du sud jusqu'\xE0 la limite de la commune de Merelbeke-Melle"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.16"
  },
  {
    id: "merelbeke-melle",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Merelbeke-Melle",
      fr: "Merelbeke-Melle"
    },
    seat: {
      nl: "Merelbeke-Melle",
      fr: "Merelbeke-Melle"
    },
    municipalities: [
      {
        municipality: "44020"
      },
      {
        municipality: "44052"
      },
      {
        municipality: "44088"
      }
    ],
    territory: {
      nl: "De gemeenten Gavere, Merelbeke-Melle en Oosterzele",
      fr: "Les communes de Gavere Merelbeke-Melle et d'Oosterzele"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.17"
  },
  {
    id: "zelzate",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Zelzate",
      fr: "Zelzate"
    },
    seat: {
      nl: "Zelzate",
      fr: "Zelzate"
    },
    municipalities: [
      {
        municipality: "43002"
      },
      {
        municipality: "43018"
      },
      {
        municipality: "44019"
      },
      {
        municipality: "44087"
      }
    ],
    territory: {
      nl: "De gemeenten Assenede, Evergem, Lochristi en Zelzate",
      fr: "Les communes d'Assenede, d'Evergem, de Lochristi et de Zelzate"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.18"
  },
  {
    id: "geraardsbergen",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Geraardsbergen",
      fr: "Grammont"
    },
    seat: {
      nl: "Geraardsbergen",
      fr: "Grammont"
    },
    municipalities: [
      {
        municipality: "41018"
      },
      {
        municipality: "45041"
      },
      {
        municipality: "45059"
      }
    ],
    territory: {
      nl: "De steden Geraardsbergen, Ronse en de gemeente Brakel",
      fr: "Les villes de Grammont, de Renaix et la commune de Brakel"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.19"
  },
  {
    id: "oudenaarde",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Oudenaarde",
      fr: "Audenarde"
    },
    seat: {
      nl: "Oudenaarde",
      fr: "Audenarde"
    },
    municipalities: [
      {
        municipality: "45035"
      },
      {
        municipality: "45060"
      },
      {
        municipality: "45061"
      },
      {
        municipality: "45062"
      },
      {
        municipality: "45064"
      },
      {
        municipality: "45065"
      },
      {
        municipality: "45068"
      }
    ],
    territory: {
      nl: "De stad Oudenaarde en de gemeenten Horebeke, Kluisbergen, Kruisem, Maarkedal, Wortegem-Petegem en Zwalm",
      fr: "La ville d'Audenarde et les communes de Horebeke, de Kluisbergen, de Kruisem, de Maarkedal, de Wortegem-Petegem et de Zwalm"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.20"
  },
  {
    id: "herzele",
    arrondissement: "oost-vlaanderen",
    name: {
      nl: "Herzele",
      fr: "Herzele"
    },
    seat: {
      nl: "Herzele",
      fr: "Herzele"
    },
    municipalities: [
      {
        municipality: "41027"
      },
      {
        municipality: "41063"
      },
      {
        municipality: "41081"
      },
      {
        municipality: "45063"
      }
    ],
    territory: {
      nl: "De stad Zottegem en de gemeenten Herzele, Lierde en Sint-Lievens-Houtem",
      fr: "La ville de Zottegem et les communes de Herzele, de Lierde et de Sint-Lievens-Houtem"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 6.21"
  },
  {
    id: "brugge-1",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Brugge",
      fr: "Bruges"
    },
    number: 1,
    seat: {
      nl: "Brugge",
      fr: "Bruges"
    },
    municipalities: [
      {
        municipality: "31003"
      },
      {
        municipality: "31005",
        partial: true
      },
      {
        municipality: "31022"
      }
    ],
    territory: {
      nl: "De gemeenten Beernem, Oostkamp en het gedeelte van het grondgebied van de stad Brugge begrensd door de middellijn van het kanaal Gent-Brugge-Oostende en de middellijn van het kanaal Brugge-Damme",
      fr: "Les communes de Beernem, d'Oostkamp et la partie du territoire de la ville de Bruges d\xE9limit\xE9e par la ligne m\xE9diane du canal Gand-Bruges-Ostende et la ligne m\xE9diane du canal Bruges-Damme"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.1"
  },
  {
    id: "brugge-2",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Brugge",
      fr: "Bruges"
    },
    number: 2,
    seat: {
      nl: "Brugge",
      fr: "Bruges"
    },
    municipalities: [
      {
        municipality: "31004"
      },
      {
        municipality: "31005",
        partial: true
      },
      {
        municipality: "31012"
      },
      {
        municipality: "31042"
      },
      {
        municipality: "35029"
      }
    ],
    territory: {
      nl: "De stad Blankenberge, de gemeenten De Haan, Jabbeke en Zuienkerke en het gedeelte van het grondgebied van de stad Brugge begrensd door de middellijn van het Boudewijnkanaal en de middellijn van het kanaal Gent-Brugge-Oostende",
      fr: "La ville de Blankenberge, les communes de De Haan, de Jabbeke et de Zuienkerke et la partie du territoire de la ville de Bruges d\xE9limit\xE9e par la ligne m\xE9diane du canal Baudouin et la ligne m\xE9diane du canal Gand-Bruges-Ostende"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.2"
  },
  {
    id: "brugge-3",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Brugge",
      fr: "Bruges"
    },
    number: 3,
    seat: {
      nl: "Brugge",
      fr: "Bruges"
    },
    municipalities: [
      {
        municipality: "31005",
        partial: true
      },
      {
        municipality: "31006"
      },
      {
        municipality: "31043"
      }
    ],
    territory: {
      nl: "De stad Damme, de gemeente Knokke-Heist en het gedeelte van het grondgebied van de stad Brugge begrensd door de middellijn van het kanaal Brugge-Damme, de middellijn van het kanaal Gent-Brugge-Oostende en de middellijn van het Boudewijnkanaal",
      fr: "La ville de Damme, la commune de Knokke-Heist et la partie du territoire de la ville de Bruges d\xE9limit\xE9e par la ligne m\xE9diane du canal de Bruges-Damme, la ligne m\xE9diane du canal de Gand-Bruges-Ostende et la ligne m\xE9diane du canal Baudouin"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.3"
  },
  {
    id: "brugge-4",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Brugge",
      fr: "Bruges"
    },
    number: 4,
    seat: {
      nl: "Brugge",
      fr: "Bruges"
    },
    municipalities: [
      {
        municipality: "31005",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brugge ten noorden en ten oosten begrensd door de middellijn van het kanaal Gent-Brugge-Oostende",
      fr: "La partie du territoire de la ville de Bruges d\xE9limit\xE9e au nord et \xE0 l'est par la ligne m\xE9diane du canal Gand-Bruges-Ostende"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.4"
  },
  {
    id: "oostende-1",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Oostende",
      fr: "Ostende"
    },
    number: 1,
    seat: {
      nl: "Oostende",
      fr: "Ostende"
    },
    municipalities: [
      {
        municipality: "35002"
      },
      {
        municipality: "35013",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Bredene en het gedeelte van het grondgebied van de stad Oostende gelegen ten oosten van de middellijn van de Koninginnelaan van de dijk tot aan de Torhoutsesteenweg en ten zuiden van de middellijn van de Torhoutsesteenweg vanaf de Koninginnelaan tot aan de grens van de stad",
      fr: "La commune de Bredene et la partie du territoire de la ville d'Ostende situ\xE9e \xE0 l'est de la ligne m\xE9diane de la Koninginnelaan de la digue jusqu'\xE0 la Torhoutsesteenweg et au sud de la ligne m\xE9diane de la Torhoutsesteenweg depuis la Koninginnelaan jusqu'\xE0 la limite de la ville"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.5"
  },
  {
    id: "oostende-2",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Oostende",
      fr: "Ostende"
    },
    number: 2,
    seat: {
      nl: "Oostende",
      fr: "Ostende"
    },
    municipalities: [
      {
        municipality: "35005"
      },
      {
        municipality: "35011"
      },
      {
        municipality: "35013",
        partial: true
      },
      {
        municipality: "35014"
      }
    ],
    territory: {
      nl: "De steden Oudenburg, Gistel, de gemeente Middelkerke en het gedeelte van het grondgebied van de stad Oostende gelegen ten westen van de middellijn van de Koninginnelaan, van de dijk tot aan de Torhoutsesteenweg, en ten noorden van de middellijn van de Torhoutsesteenweg vanaf de Koninginnelaan tot aan de grens van de stad",
      fr: "Les villes d'Oudenburg, de Gistel, la commune de Middelkerke et la partie du territoire de la ville d'Ostende situ\xE9e \xE0 l'ouest de la ligne m\xE9diane de la Koninginnelaan, de la digue jusqu'\xE0 la Torhoutsesteenweg, et au nord de la ligne m\xE9diane de la Torhoutsesteenweg \xE0 partir de la Koninginnelaan jusqu'\xE0 la limite de la ville"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.6"
  },
  {
    id: "tielt",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Tielt",
      fr: "Tielt"
    },
    seat: {
      nl: "Tielt",
      fr: "Tielt"
    },
    municipalities: [
      {
        municipality: "37002"
      },
      {
        municipality: "37011"
      },
      {
        municipality: "37020"
      },
      {
        municipality: "37021"
      },
      {
        municipality: "37022"
      }
    ],
    territory: {
      nl: "De stad Tielt en de gemeenten Ardooie, Dentergem, Pittem en Wingene",
      fr: "La ville de Tielt et les communes d'Ardooie, de Dentergem, de Pittem et de Wingene"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.7"
  },
  {
    id: "torhout",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Torhout",
      fr: "Torhout"
    },
    seat: {
      nl: "Torhout",
      fr: "Torhout"
    },
    municipalities: [
      {
        municipality: "31033"
      },
      {
        municipality: "31040"
      },
      {
        municipality: "32010"
      },
      {
        municipality: "32011"
      },
      {
        municipality: "35006"
      },
      {
        municipality: "36011"
      }
    ],
    territory: {
      nl: "De stad Torhout en de gemeenten Ichtegem, Koekelare, Kortemark, Lichtervelde en Zedelgem",
      fr: "La ville de Torhout et les communes d'Ichtegem, de Koekelare, de Kortemark, de Lichtervelde et de Zedelgem"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.8"
  },
  {
    id: "ieper",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Ieper",
      fr: "Ypres"
    },
    seat: {
      nl: "Ieper",
      fr: "Ypres"
    },
    municipalities: [
      {
        municipality: "33011"
      },
      {
        municipality: "33037"
      },
      {
        municipality: "33040"
      },
      {
        municipality: "36019"
      }
    ],
    territory: {
      nl: "De stad Ieper en de gemeenten Langemark-Poelkapelle, Staden en Zonnebeke",
      fr: "La ville d'Ypres et les communes de Langemark-Poelkapelle, de Staden et de Zonnebeke"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.9"
  },
  {
    id: "poperinge",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Poperinge",
      fr: "Poperinge"
    },
    seat: {
      nl: "Poperinge",
      fr: "Poperinge"
    },
    municipalities: [
      {
        municipality: "32006"
      },
      {
        municipality: "32030"
      },
      {
        municipality: "33016"
      },
      {
        municipality: "33021"
      },
      {
        municipality: "33039"
      },
      {
        municipality: "33041"
      }
    ],
    territory: {
      nl: "De steden Lo-Reninge, Poperinge, Mesen en de gemeenten Heuvelland, Houthulst en Vleteren",
      fr: "Les villes de Lo-Reninge, de Poperinge, de Messines et les communes de Heuvelland, de Houthulst et de Vleteren"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.10"
  },
  {
    id: "izegem",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Izegem",
      fr: "Izegem"
    },
    seat: {
      nl: "Izegem",
      fr: "Izegem"
    },
    municipalities: [
      {
        municipality: "34025"
      },
      {
        municipality: "36007"
      },
      {
        municipality: "36008"
      },
      {
        municipality: "36010"
      }
    ],
    territory: {
      nl: "De stad Izegem en de gemeenten Ingelmunster, Ledegem en Lendelede",
      fr: "La ville d'Izegem et les communes d'Ingelmunster, de Ledegem et de Lendelede"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.11"
  },
  {
    id: "kortrijk-1",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Kortrijk",
      fr: "Courtrai"
    },
    number: 1,
    seat: {
      nl: "Kortrijk",
      fr: "Courtrai"
    },
    municipalities: [
      {
        municipality: "34022",
        partial: true
      },
      {
        municipality: "34023"
      }
    ],
    territory: {
      nl: "De gemeente Kuurne en het gedeelte van het grondgebied van de stad Kortrijk boven de E17",
      fr: "La commune de Kuurne et la partie du territoire de la ville de Courtrai situ\xE9e au-del\xE0 de la E17"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.12"
  },
  {
    id: "kortrijk-2",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Kortrijk",
      fr: "Courtrai"
    },
    number: 2,
    seat: {
      nl: "Kortrijk",
      fr: "Courtrai"
    },
    municipalities: [
      {
        municipality: "34002"
      },
      {
        municipality: "34003"
      },
      {
        municipality: "34009"
      },
      {
        municipality: "34022",
        partial: true
      },
      {
        municipality: "34042"
      },
      {
        municipality: "34043"
      }
    ],
    territory: {
      nl: "De gemeenten Anzegem, Avelgem, Deerlijk, Spiere-Helkijn, Zwevegem en het gedeelte van het grondgebied van de stad Kortrijk onder de E17",
      fr: "Les communes d'Anzegem, d'Avelgem, de Deerlijk, d'Espierres-Helchin, de Zwevegem et la partie du territoire de la ville de Courtrai en-de\xE7\xE0 de la E17"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.13"
  },
  {
    id: "menen",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Menen",
      fr: "Menin"
    },
    seat: {
      nl: "Menen",
      fr: "Menin"
    },
    municipalities: [
      {
        municipality: "33029"
      },
      {
        municipality: "34027"
      },
      {
        municipality: "34041"
      },
      {
        municipality: "36012"
      }
    ],
    territory: {
      nl: "De steden Menen, Wervik en de gemeenten Moorslede en Wevelgem",
      fr: "Les villes de Menin, de Wervik et les communes de Moorslede et de Wevelgem"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.14"
  },
  {
    id: "roeselare",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Roeselare",
      fr: "Roulers"
    },
    seat: {
      nl: "Roeselare",
      fr: "Roulers"
    },
    municipalities: [
      {
        municipality: "36006"
      },
      {
        municipality: "36015"
      }
    ],
    territory: {
      nl: "De stad Roeselare en de gemeente Hooglede",
      fr: "La ville de Roulers et la commune de Hooglede"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.15"
  },
  {
    id: "waregem",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Waregem",
      fr: "Waregem"
    },
    seat: {
      nl: "Waregem",
      fr: "Waregem"
    },
    municipalities: [
      {
        municipality: "34013"
      },
      {
        municipality: "34040"
      },
      {
        municipality: "37010"
      },
      {
        municipality: "37017"
      }
    ],
    territory: {
      nl: "De steden Harelbeke en Waregem en de gemeenten Oostrozebeke en Wielsbeke",
      fr: "Les villes de Harelbeke et de Waregem et les communes d'Oostrozebeke et de Wielsbeke"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.16"
  },
  {
    id: "veurne",
    arrondissement: "west-vlaanderen",
    name: {
      nl: "Veurne",
      fr: "Furnes"
    },
    seat: {
      nl: "Veurne",
      fr: "Furnes"
    },
    municipalities: [
      {
        municipality: "32003"
      },
      {
        municipality: "38002"
      },
      {
        municipality: "38008"
      },
      {
        municipality: "38014"
      },
      {
        municipality: "38016"
      },
      {
        municipality: "38025"
      }
    ],
    territory: {
      nl: "De steden Diksmuide, Nieuwpoort, Veurne en de gemeenten Alveringem, De Panne en Koksijde",
      fr: "Les villes de Dixmude, de Nieuport, de Furnes et les communes d'Alveringem, de La Panne et de Coxyde"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 7.17"
  },
  {
    id: "eupen-sankt-vith-1",
    arrondissement: "eupen",
    name: {
      nl: "Eupen-Sankt-Vith",
      fr: "Eupen-Saint-Vith"
    },
    number: 1,
    seat: {
      nl: "Eupen",
      fr: "Eupen"
    },
    municipalities: [
      {
        municipality: "63023"
      },
      {
        municipality: "63040"
      },
      {
        municipality: "63048"
      },
      {
        municipality: "63061"
      }
    ],
    territory: {
      nl: "De stad Eupen en de gemeenten Kelmis, Lontzen en Raeren",
      fr: "La ville d'Eupen et les communes de La Calamine, de Lontzen et de Raeren"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.1"
  },
  {
    id: "eupen-sankt-vith-2",
    arrondissement: "eupen",
    name: {
      nl: "Eupen-Sankt-Vith",
      fr: "Eupen-Saint-Vith"
    },
    number: 2,
    seat: {
      nl: "Eupen",
      fr: "Eupen"
    },
    municipalities: [
      {
        municipality: "63001"
      },
      {
        municipality: "63012"
      },
      {
        municipality: "63013"
      },
      {
        municipality: "63067"
      },
      {
        municipality: "63087"
      }
    ],
    territory: {
      nl: "De stad Sankt-Vith en de gemeenten Amel, B\xFCllingen, Burg-Reuland en Butgenbach",
      fr: "La ville de Saint-Vith et les communes d'Ambl\xE8ve, de Bullange, de Burg-Reuland et de Butgenbach"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.2"
  },
  {
    id: "huy-1",
    arrondissement: "liege",
    name: {
      nl: "Hoei",
      fr: "Huy"
    },
    number: 1,
    seat: {
      nl: "Hoei",
      fr: "Huy"
    },
    municipalities: [
      {
        municipality: "61012"
      },
      {
        municipality: "61031"
      },
      {
        municipality: "61039"
      },
      {
        municipality: "61041"
      },
      {
        municipality: "61043"
      },
      {
        municipality: "61048"
      },
      {
        municipality: "61079"
      },
      {
        municipality: "61081"
      },
      {
        municipality: "62121"
      }
    ],
    territory: {
      nl: "De stad Hoei en de gemeenten Anthisnes, Clavier, Marchin, Modave, Nandrin, Neupr\xE9, Ouffet en Tinlot",
      fr: "La ville de Huy et les communes d'Anthisnes, de Clavier, de Marchin, de Modave, de Nandrin, de Neupr\xE9, de Ouffet et de Tinlot"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.3"
  },
  {
    id: "huy-2",
    arrondissement: "liege",
    name: {
      nl: "Hoei",
      fr: "Huy"
    },
    number: 2,
    seat: {
      nl: "Hoei",
      fr: "Huy"
    },
    municipalities: [
      {
        municipality: "61003"
      },
      {
        municipality: "61010"
      },
      {
        municipality: "61028"
      },
      {
        municipality: "61063"
      },
      {
        municipality: "61068"
      },
      {
        municipality: "61072"
      },
      {
        municipality: "64015"
      },
      {
        municipality: "64065"
      },
      {
        municipality: "64075"
      }
    ],
    territory: {
      nl: "De gemeenten Amay, Braives, Burdinne, H\xE9ron, Saint-Georges-sur-Meuse, Villers-le-Bouillet, Verlaine, Wanze en Wasseiges",
      fr: "Les communes d'Amay, de Braives, de Burdinne, de H\xE9ron, de Saint-Georges-sur-Meuse, de Villers-le-Bouillet, de Verlaine, de Wanze et de Wasseiges"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.4"
  },
  {
    id: "fleron",
    arrondissement: "liege",
    name: {
      nl: "Fl\xE9ron",
      fr: "Fl\xE9ron"
    },
    seat: {
      nl: "Fl\xE9ron",
      fr: "Fl\xE9ron"
    },
    municipalities: [
      {
        municipality: "62015"
      },
      {
        municipality: "62022"
      },
      {
        municipality: "62038"
      },
      {
        municipality: "62099"
      }
    ],
    territory: {
      nl: "De gemeenten Beyne-Heusay, Chaudfontaine, Fl\xE9ron en Soumagne",
      fr: "Les communes de Beyne-Heusay, de Chaudfontaine, de Fl\xE9ron et de Soumagne"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.5"
  },
  {
    id: "grace-hollogne",
    arrondissement: "liege",
    name: {
      nl: "Gr\xE2ce-Hollogne",
      fr: "Gr\xE2ce-Hollogne"
    },
    seat: {
      nl: "Gr\xE2ce-Hollogne",
      fr: "Gr\xE2ce-Hollogne"
    },
    municipalities: [
      {
        municipality: "61080"
      },
      {
        municipality: "62006"
      },
      {
        municipality: "62118"
      },
      {
        municipality: "62120"
      }
    ],
    territory: {
      nl: "De gemeenten Awans, Engis, Fl\xE9malle en Gr\xE2ce-Hollogne",
      fr: "Les communes d'Awans, d'Engis, de Fl\xE9malle et de Gr\xE2ce-Hollogne"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.6"
  },
  {
    id: "herstal",
    arrondissement: "liege",
    name: {
      nl: "Herstal",
      fr: "Herstal"
    },
    seat: {
      nl: "Herstal",
      fr: "Herstal"
    },
    municipalities: [
      {
        municipality: "62051"
      },
      {
        municipality: "62079"
      }
    ],
    territory: {
      nl: "De gemeenten Herstal en Oupeye",
      fr: "Les communes de Herstal et d'Oupeye"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.7"
  },
  {
    id: "liege-1",
    arrondissement: "liege",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    number: 1,
    seat: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    municipalities: [
      {
        municipality: "62063",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Luik gelegen ten oosten van de middellijnen van de Vesder (rechteroever), de Ourthe (rechteroever) en de Maas (rechteroever vanaf de pont de F\xE9tinne)",
      fr: "La partie du territoire de la ville de Li\xE8ge situ\xE9e \xE0 l'est des lignes m\xE9dianes de la Vesdre (rive droite), de l'Ourthe (rive droite) et de la Meuse (rive droite \xE0 partir du pont de F\xE9tinne)"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.8"
  },
  {
    id: "liege-2",
    arrondissement: "liege",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    number: 2,
    seat: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    municipalities: [
      {
        municipality: "62063",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Luik begrensd door de middellijnen van de rue Saint-Gilles, de rue Saint-Laurent, de rue Mont Saint-Martin, de rue Saint-Hubert, de rue Sainte-Croix, een lijn die de verbinding vormt tussen de middellijn van de rue Sainte-Croix en de middellijn van de rue du Palais, de rue des Mineurs, de rue du Pont, een lijn die de verbinding vormt tussen de middellijn van de rue du Pont en de middellijn van de Maas (linkeroever) tot de zuidgrens van de stad Luik, evenals het gedeelte van het grondgebied van de stad Luik begrensd door de middellijnen van de rue de la Tonne, de rue des XIV Verges, de rue de Vis\xE9 Voie tot de noordgrens van de stad Luik",
      fr: "La partie du territoire de la ville de Li\xE8ge d\xE9limit\xE9e par les lignes m\xE9dianes de la rue Saint-Gilles, rue Saint-Laurent, rue Mont Saint-Martin, rue Saint-Hubert, rue Sainte-Croix, une ligne reliant la ligne m\xE9diane de la rue Sainte-Croix \xE0 la ligne m\xE9diane de la rue du Palais, rue des Mineurs, rue du Pont, une ligne reliant la ligne m\xE9diane de la rue du Pont \xE0 la ligne m\xE9diane de la Meuse (rive gauche) jusqu'\xE0 la limite sud de la ville de Li\xE8ge ainsi que la partie du territoire de la ville de Li\xE8ge d\xE9limit\xE9e par les lignes m\xE9dianes de la rue de la Tonne, rue des XIV Verges, rue Vis\xE9 Voie jusqu'\xE0 la limite nord de la ville de Li\xE8ge"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.9"
  },
  {
    id: "liege-3",
    arrondissement: "liege",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    number: 3,
    seat: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    municipalities: [
      {
        municipality: "62063",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Luik begrensd ten noorden door de middellijnen van de rue de la Tonne, de rue des XIV Verges, de rue Vis\xE9 Voie en de gemeente Herstal, ten oosten door de middellijn van de Maas, ten zuiden door de middellijnen van de rue Saint-Gilles, de rue Saint-Laurent, de rue Mont Saint-Martin, de rue Saint-Hubert, de rue Sainte-Croix, een lijn die de verbinding vormt tussen de middellijn van de rue Sainte-Croix en de middellijn van de rue du Palais, de rue des Mineurs, de rue du Pont, een lijn die de verbinding vormt tussen de middellijn van de rue du Pont en de middellijn van de Maas (linkeroever)",
      fr: "La partie du territoire de la ville de Li\xE8ge d\xE9limit\xE9e au nord par les lignes m\xE9dianes de la rue de la Tonne, rue des XIV Verges, rue Vis\xE9 Voie et la commune de Herstal, \xE0 l'est par la ligne m\xE9diane de la Meuse, au sud par les lignes m\xE9dianes de la rue Saint-Gilles, rue Saint-Laurent, rue Mont Saint-Martin, rue Saint-Hubert, rue Sainte-Croix, une ligne reliant la ligne m\xE9diane de la rue Sainte-Croix \xE0 la ligne m\xE9diane de la rue du Palais, rue des Mineurs, rue du Pont, une ligne reliant la ligne m\xE9diane de la rue du Pont \xE0 la ligne m\xE9diane de la Meuse (rive gauche)"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.10"
  },
  {
    id: "liege-4",
    arrondissement: "liege",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    number: 4,
    seat: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    municipalities: [
      {
        municipality: "62003"
      },
      {
        municipality: "62063",
        partial: true
      },
      {
        municipality: "62093"
      }
    ],
    territory: {
      nl: "De gemeenten Ans, Saint-Nicolas en het gedeelte van het grondgebied van de stad Luik gelegen tussen het westen van de middellijn van de Ourthe (linkeroever) en de Maas (tot de pont de Fragn\xE9e)",
      fr: "Les communes d'Ans, de Saint Nicolas et la partie du territoire de la Ville de Li\xE8ge repris entre l'ouest de la ligne m\xE9diane de l'Ourthe (rive gauche) et de la Meuse (jusqu'au pont de Fragn\xE9e)"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.11"
  },
  {
    id: "seraing",
    arrondissement: "liege",
    name: {
      nl: "Seraing",
      fr: "Seraing"
    },
    seat: {
      nl: "Seraing",
      fr: "Seraing"
    },
    municipalities: [
      {
        municipality: "62096"
      }
    ],
    territory: {
      nl: "De stad Seraing",
      fr: "La ville de Seraing"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.12"
  },
  {
    id: "sprimont",
    arrondissement: "liege",
    name: {
      nl: "Sprimont",
      fr: "Sprimont"
    },
    seat: {
      nl: "Sprimont",
      fr: "Sprimont"
    },
    municipalities: [
      {
        municipality: "61019"
      },
      {
        municipality: "61024"
      },
      {
        municipality: "62009"
      },
      {
        municipality: "62026"
      },
      {
        municipality: "62032"
      },
      {
        municipality: "62100"
      },
      {
        municipality: "62122"
      }
    ],
    territory: {
      nl: "De gemeenten Aywaille, Comblain-au-Pont, Esneux, Ferri\xE8res, Hamoir, Sprimont en Trooz",
      fr: "Les communes d'Aywaille, de Comblain-au-Pont, d'Esneux, de Ferri\xE8res, de Hamoir, de Sprimont et de Trooz"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.13"
  },
  {
    id: "vise",
    arrondissement: "liege",
    name: {
      nl: "Wezet",
      fr: "Vis\xE9"
    },
    seat: {
      nl: "Wezet",
      fr: "Vis\xE9"
    },
    municipalities: [
      {
        municipality: "62011"
      },
      {
        municipality: "62027"
      },
      {
        municipality: "62060"
      },
      {
        municipality: "62108"
      },
      {
        municipality: "62119"
      }
    ],
    territory: {
      nl: "De stad Wezet en de gemeenten Bitsingen, Bl\xE9gny, Dalhem en Juprelle",
      fr: "La ville de Vis\xE9 et les communes de Bassenge, de Bl\xE9gny, de Dalhem et de Juprelle"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.14"
  },
  {
    id: "waremme",
    arrondissement: "liege",
    name: {
      nl: "Borgworm",
      fr: "Waremme"
    },
    seat: {
      nl: "Borgworm",
      fr: "Waremme"
    },
    municipalities: [
      {
        municipality: "64008"
      },
      {
        municipality: "64021"
      },
      {
        municipality: "64023"
      },
      {
        municipality: "64025"
      },
      {
        municipality: "64029"
      },
      {
        municipality: "64034"
      },
      {
        municipality: "64047"
      },
      {
        municipality: "64056"
      },
      {
        municipality: "64063"
      },
      {
        municipality: "64074"
      },
      {
        municipality: "64076"
      }
    ],
    territory: {
      nl: "De steden Borgworm, Hannuit en de gemeenten Berloz, Crisn\xE9e, Donceel, Faimes, Fexhe-le-Haut-Clocher, Geer, Lijsem, Oerle en Remicourt",
      fr: "Les villes de Waremme, de Hannut et les communes de Berloz, de Crisn\xE9e, de Donceel, de Faimes, de Fexhe-le-Haut-Clocher, de Geer, de Lincent, d'Oreye et de Remicourt"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.15"
  },
  {
    id: "limbourg",
    arrondissement: "liege",
    name: {
      nl: "Limburg",
      fr: "Limbourg"
    },
    seat: {
      nl: "Limburg",
      fr: "Limbourg"
    },
    municipalities: [
      {
        municipality: "63003"
      },
      {
        municipality: "63004"
      },
      {
        municipality: "63038"
      },
      {
        municipality: "63046"
      },
      {
        municipality: "63084"
      },
      {
        municipality: "63088"
      },
      {
        municipality: "63089"
      }
    ],
    territory: {
      nl: "De stad Limburg en de gemeenten Aubel, Baelen, Jalhay, Plombi\xE8res, Thimister-Clermont en Welkenraedt",
      fr: "La ville de Limbourg et les communes d'Aubel, de Baelen, de Jalhay, de Plombi\xE8res, de Thimister-Clermont et de Welkenraedt"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.16"
  },
  {
    id: "spa",
    arrondissement: "liege",
    name: {
      nl: "Spa",
      fr: "Spa"
    },
    seat: {
      nl: "Spa",
      fr: "Spa"
    },
    municipalities: [
      {
        municipality: "63045"
      },
      {
        municipality: "63049"
      },
      {
        municipality: "63072"
      },
      {
        municipality: "63073"
      },
      {
        municipality: "63075"
      },
      {
        municipality: "63080"
      },
      {
        municipality: "63086"
      }
    ],
    territory: {
      nl: "De steden Malmedy, Stavelot en de gemeenten Lierneux, Spa, Stoumont, Trois-Ponts en Weismes",
      fr: "Les villes de Malm\xE9dy, de Stavelot et les communes de Lierneux, de Spa, de Stoumont, de Trois-Ponts et de Waimes"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.17"
  },
  {
    id: "verviers-1",
    arrondissement: "liege",
    name: {
      nl: "Verviers",
      fr: "Verviers"
    },
    number: 1,
    seat: {
      nl: "Verviers",
      fr: "Verviers"
    },
    municipalities: [
      {
        municipality: "63020"
      },
      {
        municipality: "63035"
      },
      {
        municipality: "63057"
      },
      {
        municipality: "63058"
      },
      {
        municipality: "63079",
        partial: true
      }
    ],
    territory: {
      nl: "De stad Herve, de gemeenten Dison, Olne, Pepinster en het gedeelte van het grondgebied van de stad Verviers gelegen ten noorden van de Vesder",
      fr: "La ville de Herve, les communes de Dison, d'Olne, de Pepinster et la partie du territoire de la ville de Verviers situ\xE9e au nord de la Vesdre"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.18"
  },
  {
    id: "verviers-2",
    arrondissement: "liege",
    name: {
      nl: "Verviers",
      fr: "Verviers"
    },
    number: 2,
    seat: {
      nl: "Verviers",
      fr: "Verviers"
    },
    municipalities: [
      {
        municipality: "63076"
      },
      {
        municipality: "63079",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Theux en het gedeelte van het grondgebied van de stad Verviers gelegen ten zuiden van de Vesder",
      fr: "La commune de Theux et la partie du territoire de la ville de Verviers situ\xE9e au sud de la Vesdre"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 8.19"
  },
  {
    id: "arlon",
    arrondissement: "luxembourg",
    name: {
      nl: "Aarlen",
      fr: "Arlon"
    },
    seat: {
      nl: "Aarlen",
      fr: "Arlon"
    },
    municipalities: [
      {
        municipality: "81001"
      },
      {
        municipality: "81003"
      },
      {
        municipality: "81004"
      },
      {
        municipality: "81015"
      }
    ],
    territory: {
      nl: "De steden Aarlen en Aubange en de gemeenten Attert en Messancy",
      fr: "Les villes d'Arlon et d'Aubange et les communes d'Attert et de Messancy"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 9.1"
  },
  {
    id: "virton",
    arrondissement: "luxembourg",
    name: {
      nl: "Virton",
      fr: "Virton"
    },
    seat: {
      nl: "Virton",
      fr: "Virton"
    },
    municipalities: [
      {
        municipality: "85007"
      },
      {
        municipality: "85009"
      },
      {
        municipality: "85011"
      },
      {
        municipality: "85024"
      },
      {
        municipality: "85026"
      },
      {
        municipality: "85034"
      },
      {
        municipality: "85039"
      },
      {
        municipality: "85045"
      },
      {
        municipality: "85046"
      },
      {
        municipality: "85047"
      }
    ],
    territory: {
      nl: "De steden Chiny, Florenville, Virton en de gemeenten Etalle, Habay, Meix-devant-Virton, Musson, Rouvroy, Saint-L\xE9ger en Tintigny",
      fr: "Les villes de Chiny, de Florenville, de Virton et les communes d'Etalle, de Habay, de Meix-devant-Virton, de Musson, de Rouvroy, de Saint-L\xE9ger et de Tintigny"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 9.2"
  },
  {
    id: "marche-en-famenne",
    arrondissement: "luxembourg",
    name: {
      nl: "Marche-en-Famenne",
      fr: "Marche-en-Famenne"
    },
    seat: {
      nl: "Marche-en-Famenne",
      fr: "Marche-en-Famenne"
    },
    municipalities: [
      {
        municipality: "83012"
      },
      {
        municipality: "83013"
      },
      {
        municipality: "83028"
      },
      {
        municipality: "83031"
      },
      {
        municipality: "83034"
      },
      {
        municipality: "83040"
      },
      {
        municipality: "83044"
      },
      {
        municipality: "83049"
      },
      {
        municipality: "83055"
      }
    ],
    territory: {
      nl: "De steden Durbuy, Marche-en-Famenne, La Roche-en-Ardenne en de gemeenten Erez\xE9e, Hotton, Manhay, Nassogne, Rendeux en Tenneville",
      fr: "Les villes de Durbuy, de Marche-en-Famenne, de La Roche-en-Ardenne et les communes d'Erez\xE9e, de Hotton, de Manhay, de Nassogne, de Rendeux et de Tenneville"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 9.3"
  },
  {
    id: "bastogne",
    arrondissement: "luxembourg",
    name: {
      nl: "Bastenaken",
      fr: "Bastogne"
    },
    seat: {
      nl: "Bastenaken",
      fr: "Bastogne"
    },
    municipalities: [
      {
        municipality: "81013"
      },
      {
        municipality: "82009"
      },
      {
        municipality: "82014"
      },
      {
        municipality: "82032"
      },
      {
        municipality: "82036"
      },
      {
        municipality: "82037"
      },
      {
        municipality: "82038"
      },
      {
        municipality: "82039"
      },
      {
        municipality: "84033"
      }
    ],
    territory: {
      nl: "De steden Bastenaken en Houffalize de deelgemeente Bertogne van de stad Bastenaken en de gemeenten Fauvillers, Gouvy, L\xE9glise, Martelange, Sainte-Ode, Vaux-sur-S\xFBre en Vielsalm",
      fr: "Les villes de Bastogne et de Houffalize l'ancienne commune de Bertogne de la ville de Bastogne et les communes de Fauvillers, de Gouvy, de L\xE9glise, de Martelange, de Sainte-Ode, de Vaux-sur-S\xFBre et de Vielsalm"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 9.4"
  },
  {
    id: "neufchateau",
    arrondissement: "luxembourg",
    name: {
      nl: "Neufch\xE2teau",
      fr: "Neufch\xE2teau"
    },
    seat: {
      nl: "Neufch\xE2teau",
      fr: "Neufch\xE2teau"
    },
    municipalities: [
      {
        municipality: "84009"
      },
      {
        municipality: "84010"
      },
      {
        municipality: "84016"
      },
      {
        municipality: "84029"
      },
      {
        municipality: "84035"
      },
      {
        municipality: "84043"
      },
      {
        municipality: "84050"
      },
      {
        municipality: "84059"
      },
      {
        municipality: "84068"
      },
      {
        municipality: "84075"
      },
      {
        municipality: "84077"
      }
    ],
    territory: {
      nl: "De steden Bouillon, Neufch\xE2teau, Saint-Hubert en de gemeenten Bertrix, Daverdisse, Herbeumont, Libin, Libramont-Chevigny, Paliseul, Tellin en Wellin",
      fr: "Les villes de Bouillon, de Neufch\xE2teau, de Saint-Hubert et les communes de Bertrix, de Daverdisse, de Herbeumont, de Libin, de Libramont-Chevigny, de Paliseul, de Tellin et de Wellin"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 9.5"
  },
  {
    id: "dinant",
    arrondissement: "namur",
    name: {
      nl: "Dinant",
      fr: "Dinant"
    },
    seat: {
      nl: "Dinant",
      fr: "Dinant"
    },
    municipalities: [
      {
        municipality: "91005"
      },
      {
        municipality: "91013"
      },
      {
        municipality: "91015"
      },
      {
        municipality: "91034"
      },
      {
        municipality: "91054"
      },
      {
        municipality: "91072"
      },
      {
        municipality: "91141"
      },
      {
        municipality: "91143"
      }
    ],
    territory: {
      nl: "De steden Beauraing, Dinant en de gemeenten Anh\xE9e, Bi\xE8vre, Gedinne, Houyet, Vresse-sur-Semois en Yvoir",
      fr: "Les villes de Beauraing, de Dinant et les communes d'Anh\xE9e, de Bi\xE8vre, de Gedinne, de Houyet, de Vresse-sur-Semois et d'Yvoir"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 10.1"
  },
  {
    id: "ciney",
    arrondissement: "namur",
    name: {
      nl: "Ciney",
      fr: "Ciney"
    },
    seat: {
      nl: "Ciney",
      fr: "Ciney"
    },
    municipalities: [
      {
        municipality: "91030"
      },
      {
        municipality: "91059"
      },
      {
        municipality: "91064"
      },
      {
        municipality: "91114"
      },
      {
        municipality: "91120"
      }
    ],
    territory: {
      nl: "De steden Ciney, Rochefort en de gemeenten Hamois, Havelange en Somme-Leuze",
      fr: "Les villes de Ciney, de Rochefort et les communes de Hamois, de Havelange et de Somme-Leuze"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 10.2"
  },
  {
    id: "philippeville",
    arrondissement: "namur",
    name: {
      nl: "Philippeville",
      fr: "Philippeville"
    },
    seat: {
      nl: "Philippeville",
      fr: "Philippeville"
    },
    municipalities: [
      {
        municipality: "91103"
      },
      {
        municipality: "91142"
      },
      {
        municipality: "93010"
      },
      {
        municipality: "93014"
      },
      {
        municipality: "93018"
      },
      {
        municipality: "93022"
      },
      {
        municipality: "93056"
      },
      {
        municipality: "93088"
      },
      {
        municipality: "93090"
      }
    ],
    territory: {
      nl: "De steden Couvin, Philippeville, Walcourt en de gemeenten Cerfontaine, Doische, Florennes, Hasti\xE8re, Onhaye en Viroinval",
      fr: "Les villes de Couvin, de Philippeville, de Walcourt et les communes de Cerfontaine, de Doische, de Florennes, de Hasti\xE8re, d'Onhaye et de Viroinval"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 10.3"
  },
  {
    id: "andenne",
    arrondissement: "namur",
    name: {
      nl: "Andenne",
      fr: "Andenne"
    },
    seat: {
      nl: "Andenne",
      fr: "Andenne"
    },
    municipalities: [
      {
        municipality: "92003"
      },
      {
        municipality: "92006"
      },
      {
        municipality: "92054"
      },
      {
        municipality: "92097"
      },
      {
        municipality: "92138"
      }
    ],
    territory: {
      nl: "De stad Andenne en de gemeenten Assesse, Fernelmont, Gesves en Ohey",
      fr: "La ville d'Andenne et les communes d'Assesse, de Fernelmont, de Gesves et d'Ohey"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 10.4"
  },
  {
    id: "fosses-la-ville",
    arrondissement: "namur",
    name: {
      nl: "Fosses-la-Ville",
      fr: "Fosses-la-Ville"
    },
    seat: {
      nl: "Fosses-la-Ville",
      fr: "Fosses-la-Ville"
    },
    municipalities: [
      {
        municipality: "92045"
      },
      {
        municipality: "92048"
      },
      {
        municipality: "92087"
      },
      {
        municipality: "92137"
      }
    ],
    territory: {
      nl: "De stad Fosses-la-Ville en de gemeenten Floreffe, Mettet en Sambreville",
      fr: "La ville de Fosses-la-Ville et les communes de Floreffe, de Mettet et de Sambreville"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 10.5"
  },
  {
    id: "gembloux",
    arrondissement: "namur",
    name: {
      nl: "Gembloers",
      fr: "Gembloux"
    },
    seat: {
      nl: "Gembloers",
      fr: "Gembloux"
    },
    municipalities: [
      {
        municipality: "92035"
      },
      {
        municipality: "92114"
      },
      {
        municipality: "92140"
      },
      {
        municipality: "92141"
      },
      {
        municipality: "92142"
      }
    ],
    territory: {
      nl: "De stad Gembloers en de gemeenten Eghez\xE9e, Jemeppe-sur-Sambre, La Bruy\xE8re en Sombreffe",
      fr: "La ville de Gembloux et les communes d'Eghez\xE9e, de Jemeppe-sur-Sambre, de La Bruy\xE8re et de Sombreffe"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 10.6"
  },
  {
    id: "namur-1",
    arrondissement: "namur",
    name: {
      nl: "Namen",
      fr: "Namur"
    },
    number: 1,
    seat: {
      nl: "Namen",
      fr: "Namur"
    },
    municipalities: [
      {
        municipality: "92094",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeenten Beez, Belgrade, Boninne, Bouge, Champion, Cognel\xE9e, Daussoulx, Flawinne, Gelbress\xE9e, Marche-les-Dames, Saint-Marc, Saint-Servais, Suarl\xE9e, Temploux en Vedrin van de stad Namen en het gedeelte van het grondgebied van de stad Namen gelegen ten noorden van de middellijn van de Samber en de Maas (linkeroevers)",
      fr: "Les anciennes communes de Beez, de Belgrade, de Boninne, de Bouge, de Champion, de Cognel\xE9e, de Daussoulx, de Flawinne, de Gelbress\xE9e, de Marche-les-Dames, de Saint-Marc, de Saint-Servais, de Suarl\xE9e, de Temploux et de Vedrin de la ville de Namur et la partie du territoire de la ville de Namur situ\xE9e au nord de la ligne m\xE9diane de la Sambre et de la Meuse (rives gauches)"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 10.7"
  },
  {
    id: "namur-2",
    arrondissement: "namur",
    name: {
      nl: "Namen",
      fr: "Namur"
    },
    number: 2,
    seat: {
      nl: "Namen",
      fr: "Namur"
    },
    municipalities: [
      {
        municipality: "92094",
        partial: true
      },
      {
        municipality: "92101"
      }
    ],
    territory: {
      nl: "De gemeente Profondeville, de deelgemeenten Dave, Erpent, Jambes, Lives-sur-Meuse, Loyers, Malonne, Naninne, W\xE9pion en Wierde van de stad Namen en het gedeelte van het grondgebied van de stad Namen gelegen ten zuiden van de middellijn van de Samber (rechteroever)",
      fr: "La commune de Profondeville, les anciennes communes de Dave, d'Erpent, de Jambes, de Lives-sur-Meuse, de Loyers, de Malonne, de Naninne, de W\xE9pion et de Wierde de la ville de Namur et la partie du territoire de la ville de Namur situ\xE9e au sud de la ligne m\xE9diane de la Sambre (rive droite)"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 10.8"
  },
  {
    id: "chimay",
    arrondissement: "hainaut",
    name: {
      nl: "Chimay",
      fr: "Chimay"
    },
    seat: {
      nl: "Chimay",
      fr: "Chimay"
    },
    municipalities: [
      {
        municipality: "56005"
      },
      {
        municipality: "56016"
      },
      {
        municipality: "56022"
      },
      {
        municipality: "56029"
      },
      {
        municipality: "56049"
      },
      {
        municipality: "56051"
      },
      {
        municipality: "56088"
      }
    ],
    territory: {
      nl: "De steden Beaumont, Chimay en de gemeenten Erquelinnes, Froidchapelle, Merbes-le-Ch\xE2teau, Momignies en Sivry-Rance",
      fr: "Les villes de Beaumont, de Chimay et les communes d'Erquelinnes, de Froidchapelle, de Merbes-le-Ch\xE2teau, de Momignies et de Sivry-Rance"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.1"
  },
  {
    id: "binche",
    arrondissement: "hainaut",
    name: {
      nl: "Binche",
      fr: "Binche"
    },
    seat: {
      nl: "Binche",
      fr: "Binche"
    },
    municipalities: [
      {
        municipality: "58002"
      },
      {
        municipality: "58003"
      },
      {
        municipality: "58004"
      }
    ],
    territory: {
      nl: "De stad Binche en de gemeenten Estinnes en Morlanwelz",
      fr: "La ville de Binche et les communes d'Estinnes et de Morlanwelz"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.2"
  },
  {
    id: "charleroi-1",
    arrondissement: "hainaut",
    name: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    number: 1,
    seat: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    municipalities: [
      {
        municipality: "52011",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeenten Couillet, Dampremy en Gilly van de stad Charleroi alsook het grondgebied van de vroegere stad Charleroi",
      fr: "Les anciennes communes de Couillet, de Dampremy et de Gilly de la ville de Charleroi et le territoire de l'ancienne ville de Charleroi"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.3"
  },
  {
    id: "charleroi-2",
    arrondissement: "hainaut",
    name: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    number: 2,
    seat: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    municipalities: [
      {
        municipality: "52011",
        partial: true
      },
      {
        municipality: "52021"
      },
      {
        municipality: "52075"
      }
    ],
    territory: {
      nl: "De stad Fleurus, de gemeente Les Bons Villers en de deelgemeenten Gosselies, Goutroux, Ransart en Montignies-sur-Sambre van de stad Charleroi",
      fr: "La ville de Fleurus, la commune de Les Bons Villers et les anciennes communes de Gosselies, de Goutroux, de Ransart, et de Montignies-sur-Sambre de la ville de Charleroi"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.4"
  },
  {
    id: "charleroi-3",
    arrondissement: "hainaut",
    name: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    number: 3,
    seat: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    municipalities: [
      {
        municipality: "52011",
        partial: true
      },
      {
        municipality: "52015"
      }
    ],
    territory: {
      nl: "De gemeente Courcelles en de deelgemeenten Jumet, Lodelinsart, Monceau-sur-Sambre en Roux van de stad Charleroi",
      fr: "La commune de Courcelles et les anciennes communes de Jumet, de Lodelinsart, de Monceau-sur-Sambre et de Roux de la ville de Charleroi"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.5"
  },
  {
    id: "charleroi-4",
    arrondissement: "hainaut",
    name: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    number: 4,
    seat: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    municipalities: [
      {
        municipality: "52011",
        partial: true
      },
      {
        municipality: "52022"
      }
    ],
    territory: {
      nl: "De stad Fontaine-l'Ev\xEAque en de deelgemeenten Marchienne-au-Pont, Marcinelle en Mont-sur-Marchienne van de stad Charleroi",
      fr: "La ville de Fontaine-l'Ev\xEAque et les anciennes communes de Marchienne-au-Pont, de Marcinelle et de Mont-sur-Marchienne de la ville de Charleroi"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.6"
  },
  {
    id: "chatelet",
    arrondissement: "hainaut",
    name: {
      nl: "Ch\xE2telet",
      fr: "Ch\xE2telet"
    },
    seat: {
      nl: "Ch\xE2telet",
      fr: "Ch\xE2telet"
    },
    municipalities: [
      {
        municipality: "52012"
      },
      {
        municipality: "52018"
      },
      {
        municipality: "52025"
      },
      {
        municipality: "52074"
      }
    ],
    territory: {
      nl: "De stad Ch\xE2telet en de gemeenten Aiseau-Presles, Farciennes en Gerpinnes",
      fr: "La ville de Ch\xE2telet et les communes d'Aiseau-Presles, de Farciennes et de Gerpinnes"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.7"
  },
  {
    id: "seneffe",
    arrondissement: "hainaut",
    name: {
      nl: "Seneffe",
      fr: "Seneffe"
    },
    seat: {
      nl: "Seneffe",
      fr: "Seneffe"
    },
    municipalities: [
      {
        municipality: "52010"
      },
      {
        municipality: "52055"
      },
      {
        municipality: "55085"
      },
      {
        municipality: "55086"
      }
    ],
    territory: {
      nl: "De gemeenten Chapelle-lez-Herlaimont, Manage, Pont-\xE0-Celles en Seneffe",
      fr: "Les communes de Chapelle-lez-Herlaimont, de Manage, de Pont-\xE0-Celles et de Seneffe"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.8"
  },
  {
    id: "thuin",
    arrondissement: "hainaut",
    name: {
      nl: "Thuin",
      fr: "Thuin"
    },
    seat: {
      nl: "Thuin",
      fr: "Thuin"
    },
    municipalities: [
      {
        municipality: "52048"
      },
      {
        municipality: "56001"
      },
      {
        municipality: "56044"
      },
      {
        municipality: "56078"
      },
      {
        municipality: "56086"
      }
    ],
    territory: {
      nl: "De stad Thuin en de gemeenten Anderlues, Ham-sur-Heure-Nalinnes, Lobbes en Montigny-le-Tilleul",
      fr: "La ville de Thuin et les communes d'Anderlues, de Ham-sur-Heure-Nalinnes, de Lobbes et de Montigny-le-Tilleul"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.9"
  },
  {
    id: "boussu-colfontaine-1",
    arrondissement: "hainaut",
    name: {
      nl: "Boussu-Colfontaine",
      fr: "Boussu-Colfontaine"
    },
    number: 1,
    seat: {
      nl: "Boussu",
      fr: "Boussu"
    },
    municipalities: [
      {
        municipality: "53014"
      },
      {
        municipality: "53039"
      },
      {
        municipality: "53065"
      },
      {
        municipality: "53068"
      },
      {
        municipality: "53070"
      },
      {
        municipality: "53083"
      }
    ],
    territory: {
      nl: "De stad Saint-Ghislain en de gemeenten Boussu, Hensies, Honnelles, Quaregnon en Qui\xE9vrain",
      fr: "La ville de Saint-Ghislain et les communes de Boussu, de Hensies, de Honnelles, de Quaregnon et de Qui\xE9vrain"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.10"
  },
  {
    id: "boussu-colfontaine-2",
    arrondissement: "hainaut",
    name: {
      nl: "Boussu-Colfontaine",
      fr: "Boussu-Colfontaine"
    },
    number: 2,
    seat: {
      nl: "Boussu",
      fr: "Boussu"
    },
    municipalities: [
      {
        municipality: "53020"
      },
      {
        municipality: "53028"
      },
      {
        municipality: "53082"
      },
      {
        municipality: "53084"
      }
    ],
    territory: {
      nl: "De gemeenten Colfontaine, Dour, Frameries en Qu\xE9vy",
      fr: "Les communes de Colfontaine, de Dour, de Frameries et de Qu\xE9vy"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.11"
  },
  {
    id: "la-louviere",
    arrondissement: "hainaut",
    name: {
      nl: "La Louvi\xE8re",
      fr: "La Louvi\xE8re"
    },
    seat: {
      nl: "La Louvi\xE8re",
      fr: "La Louvi\xE8re"
    },
    municipalities: [
      {
        municipality: "58001"
      }
    ],
    territory: {
      nl: "De stad La Louvi\xE8re",
      fr: "La ville de La Louvi\xE8re"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.12"
  },
  {
    id: "mons-1",
    arrondissement: "hainaut",
    name: {
      nl: "Bergen",
      fr: "Mons"
    },
    number: 1,
    seat: {
      nl: "Bergen",
      fr: "Mons"
    },
    municipalities: [
      {
        municipality: "53053",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Bergen ten noorden van de grens van de deelgemeente Havr\xE9 van de stad Bergen tot aan de plaats met de naam &quot;La Cl\xE9 du Bois &quot;, ten noorden van de middellijn van de chauss\xE9e du Roeulx tot aan het kruispunt met de avenue Reine Astrid op de plaats met de naam &quot;Carrefour Saint-Fiacre &quot;, ten noorden van de middellijn van de avenue Reine Astrid, de place des Flandres, de rue Baudouin de Constantinople, de rue d'Havr\xE9, de rue du Hautbois, de rue de Houdain en de rue des Fripiers en ten westen van de middellijn van de Grand'Rue, de rue de Bertaimont en de avenue Jean d'Avesnes, verder ten noorden van de middellijn van de place des Chasseurs, de boulevard Sainctelette, de place des Alli\xE9s en van de N 22 tot aan het kruispunt met de oprit van de autosnelweg E10-E41, ten oosten van de middellijn van die oprit tot aan het kruispunt ervan met de autosnelweg, ten noorden van de vroegere grens van de deelgemeenten Ghlin en Jemappes van de stad Bergen",
      fr: "La partie du territoire de la ville de Mons situ\xE9e au nord de la limite de l'ancienne commune d'Havr\xE9 de la ville de Mons jusqu'au lieu-dit &quot;La Cl\xE9 du Bois &quot;et ensuite au nord de la ligne m\xE9diane de la chauss\xE9e du Roeulx jusqu'\xE0 sa jonction avec l'avenue Reine Astrid au lieu-dit &quot;Carrefour Saint-Fiacre&quot;, puis au nord de la ligne m\xE9diane de l'avenue Reine Astrid, de la place des Flandres, de la rue Baudouin de Constantinople, de la rue d'Havr\xE9, de la rue du Hautbois, de la rue de Houdain et la rue des Fripiers et ensuite \xE0 l'ouest de la ligne m\xE9diane de la Grand'Rue, de la rue de Bertaimont et de l'avenue Jean d'Avesnes puis au nord de la ligne m\xE9diane de la place des Chasseurs, du boulevard Sainctelette, de la place des Alli\xE9s et de la route Nationale 22 jusqu'\xE0 sa jonction avec la bretelle de l'autoroute E10-E41, \xE0 l'est de la ligne m\xE9diane de cette bretelle jusqu'\xE0 sa jonction avec l'autoroute, puis au nord de l'ancienne limite des anciennes communes de Ghlin et de Jemappes de la ville de Mons"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.13"
  },
  {
    id: "mons-2",
    arrondissement: "hainaut",
    name: {
      nl: "Bergen",
      fr: "Mons"
    },
    number: 2,
    seat: {
      nl: "Bergen",
      fr: "Mons"
    },
    municipalities: [
      {
        municipality: "53044"
      },
      {
        municipality: "53053",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Jurbeke en het gedeelte van het grondgebied van de stad Bergen ten zuiden van de middellijn van de grens van de deelgemeente Havr\xE9 van de stad Bergen tot aan de plaats met de naam &quot;La Cl\xE9 du Bois&quot;, ten zuiden van de middellijn van de chauss\xE9e du Roeulx tot aan het kruispunt met de avenue Reine Astrid op de plaats met de naam &quot;Carrefour Saint-Fiacre&quot;, ten zuiden van de middellijn van de avenue Reine Astrid, de place des Flandres, de rue Baudouin de Constantinople, de rue d'Havr\xE9, de rue du Hautbois, de rue de Houdain en de rue des Fripiers en ten oosten van de middellijn van de Grand'Rue, de rue de Bertaimont en de avenue Jean d'Avesnes, verder ten zuiden van de middellijn van de place des Chasseurs, de boulevard Sainctelette, de place des Alli\xE9s en van de N 22 tot aan het kruispunt met de oprit van de autosnelweg E10-E41, ten westen van de middellijn van die oprit tot aan het kruispunt ervan met de autosnelweg, ten zuiden van de vroegere grens van de deelgemeenten Ghlin en Jemappes van de stad Bergen",
      fr: "La commune de Jurbise et la partie du territoire de la ville de Mons situ\xE9e au sud de la ligne m\xE9diane de la limite de l'ancienne commune d'Havr\xE9 de la ville de Mons jusqu'au lieu-dit &quot;La Cl\xE9 du Bois&quot; et ensuite au sud de la ligne m\xE9diane de la chauss\xE9e du Roeulx jusqu'\xE0 sa jonction avec l'avenue Reine Astrid au lieu-dit &quot;Carrefour Saint-Fiacre&quot;, puis au sud de la ligne m\xE9diane de l'avenue Reine Astrid, de la place des Flandres, de la rue Baudouin de Constantinople, de la rue d'Havr\xE9, de la rue du Hautbois, de la rue de Houdain et la rue des Fripiers et ensuite \xE0 l'est de la ligne m\xE9diane de la Grand'Rue, de la rue de Bertaimont et de l'avenue Jean d'Avesnes puis au sud de la ligne m\xE9diane de la place des Chasseurs, du boulevard Sainctelette, de la place des Alli\xE9s et de la route Nationale 22 jusqu'\xE0 sa jonction avec la bretelle de l'autoroute E10-E41, \xE0 l'ouest de la ligne m\xE9diane de cette bretelle jusqu'\xE0 sa jonction avec l'autoroute, puis au sud de l'ancienne limite des anciennes communes de Ghlin et de Jemappes de la ville de Mons"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.14"
  },
  {
    id: "soignies",
    arrondissement: "hainaut",
    name: {
      nl: "Zinnik",
      fr: "Soignies"
    },
    seat: {
      nl: "Zinnik",
      fr: "Soignies"
    },
    municipalities: [
      {
        municipality: "53046"
      },
      {
        municipality: "55004"
      },
      {
        municipality: "55035"
      },
      {
        municipality: "55040"
      },
      {
        municipality: "55050"
      }
    ],
    territory: {
      nl: "De steden Le Roeulx, `s Gravenbrakel, Zinnik en de gemeenten Ecaussinnes en Lens",
      fr: "Les villes de Le Roeulx, de Braine-le-Comte, de Soignies et les communes d'Ecaussinnes et de Lens"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.15"
  },
  {
    id: "ath",
    arrondissement: "hainaut",
    name: {
      nl: "Aat",
      fr: "Ath"
    },
    seat: {
      nl: "Aat",
      fr: "Ath"
    },
    municipalities: [
      {
        municipality: "51004"
      },
      {
        municipality: "51012"
      },
      {
        municipality: "51017"
      },
      {
        municipality: "51019"
      },
      {
        municipality: "51067"
      },
      {
        municipality: "51068"
      },
      {
        municipality: "51069"
      }
    ],
    territory: {
      nl: "De steden Aat, Edingen, Lessen en de gemeenten Brugelette, Elzele, Opzullik en Vloesberg",
      fr: "Les villes d'Ath, d'Enghien, de Lessines et les communes de Brugelette, de Ellezelles, de Silly et de Flobecq"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.16"
  },
  {
    id: "mouscron",
    arrondissement: "hainaut",
    name: {
      nl: "Moeskroen",
      fr: "Mouscron"
    },
    seat: {
      nl: "Moeskroen",
      fr: "Mouscron"
    },
    municipalities: [
      {
        municipality: "57096"
      },
      {
        municipality: "57097"
      }
    ],
    territory: {
      nl: "De steden Komen-Waasten en Moeskroen",
      fr: "Les villes de Comines-Warneton et de Mouscron"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.17"
  },
  {
    id: "leuze-en-hainaut",
    arrondissement: "hainaut",
    name: {
      nl: "Leuze-en-Hainaut",
      fr: "Leuze-en-Hainaut"
    },
    seat: {
      nl: "Leuze-en-Hainaut",
      fr: "Leuze-en-Hainaut"
    },
    municipalities: [
      {
        municipality: "51008"
      },
      {
        municipality: "51009"
      },
      {
        municipality: "51014"
      },
      {
        municipality: "57064"
      },
      {
        municipality: "57094"
      }
    ],
    territory: {
      nl: "De steden Chi\xE8vres, Leuze-en-Hainaut, P\xE9ruwelz en de gemeenten Beloeil en Bernissart",
      fr: "Les villes de Chi\xE8vres, de Leuze-en-Hainaut, de P\xE9ruwelz et les communes de Beloeil et de Bernissart"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.18"
  },
  {
    id: "tournai-1",
    arrondissement: "hainaut",
    name: {
      nl: "Doornik",
      fr: "Tournai"
    },
    number: 1,
    seat: {
      nl: "Doornik",
      fr: "Tournai"
    },
    municipalities: [
      {
        municipality: "51065"
      },
      {
        municipality: "57003"
      },
      {
        municipality: "57018"
      },
      {
        municipality: "57081",
        partial: true
      },
      {
        municipality: "57095"
      }
    ],
    territory: {
      nl: "De stad Antoing en de gemeenten Celles, Frasnes-lez-Anvaing en Mont-de-l'Enclus en het gedeelte van het grondgebied van de stad Doornik gelegen op de rechteroever van de Schelde",
      fr: "La ville d'Antoing et les communes de Celles, de Frasnes-lez-Anvaing et de Mont-de-l'Enclus et la partie du territoire de la ville de Tournai situ\xE9e sur la rive droite de l'Escaut"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.19"
  },
  {
    id: "tournai-2",
    arrondissement: "hainaut",
    name: {
      nl: "Doornik",
      fr: "Tournai"
    },
    number: 2,
    seat: {
      nl: "Doornik",
      fr: "Tournai"
    },
    municipalities: [
      {
        municipality: "57027"
      },
      {
        municipality: "57062"
      },
      {
        municipality: "57072"
      },
      {
        municipality: "57081",
        partial: true
      },
      {
        municipality: "57093"
      }
    ],
    territory: {
      nl: "De gemeenten Brunehaut, Estaimpuis, Pecq, Rumes en het gedeelte van het grondgebied van de stad Doornik gelegen op de linkeroever van de Schelde",
      fr: "Les communes de Brunehaut, d'Estaimpuis, de Pecq, de Rumes et la partie du territoire de la ville de Tournai situ\xE9e sur la rive gauche de l'Escaut"
    },
    legalBasis: "Ger.W. bijvoegsel art. 1, afdeling 11.20"
  }
];

// data/judicial-areas.json
var judicial_areas_default = [
  {
    id: "antwerpen",
    name: {
      nl: "Antwerpen",
      fr: "Anvers",
      de: "Antwerpen"
    }
  },
  {
    id: "brussel",
    name: {
      nl: "Brussel",
      fr: "Bruxelles",
      de: "Br\xFCssel"
    }
  },
  {
    id: "gent",
    name: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    }
  },
  {
    id: "liege",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge",
      de: "L\xFCttich"
    }
  },
  {
    id: "mons",
    name: {
      nl: "Bergen",
      fr: "Mons",
      de: "Mons"
    }
  }
];

// data/municipalities.json
var municipalities_default = [
  {
    id: "11001",
    name: {
      nl: "Aartselaar",
      fr: "Aartselaar"
    },
    province: "10000"
  },
  {
    id: "11002",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    province: "10000"
  },
  {
    id: "11004",
    name: {
      nl: "Boechout",
      fr: "Boechout"
    },
    province: "10000"
  },
  {
    id: "11005",
    name: {
      nl: "Boom",
      fr: "Boom"
    },
    province: "10000"
  },
  {
    id: "11008",
    name: {
      nl: "Brasschaat",
      fr: "Brasschaat"
    },
    province: "10000"
  },
  {
    id: "11009",
    name: {
      nl: "Brecht",
      fr: "Brecht"
    },
    province: "10000"
  },
  {
    id: "11013",
    name: {
      nl: "Edegem",
      fr: "Edegem"
    },
    province: "10000"
  },
  {
    id: "11016",
    name: {
      nl: "Essen",
      fr: "Essen"
    },
    province: "10000"
  },
  {
    id: "11018",
    name: {
      nl: "Hemiksem",
      fr: "Hemiksem"
    },
    province: "10000"
  },
  {
    id: "11021",
    name: {
      nl: "Hove",
      fr: "Hove"
    },
    province: "10000"
  },
  {
    id: "11022",
    name: {
      nl: "Kalmthout",
      fr: "Kalmthout"
    },
    province: "10000"
  },
  {
    id: "11023",
    name: {
      nl: "Kapellen",
      fr: "Kapellen"
    },
    province: "10000"
  },
  {
    id: "11024",
    name: {
      nl: "Kontich",
      fr: "Kontich"
    },
    province: "10000"
  },
  {
    id: "11025",
    name: {
      nl: "Lint",
      fr: "Lint"
    },
    province: "10000"
  },
  {
    id: "11029",
    name: {
      nl: "Mortsel",
      fr: "Mortsel"
    },
    province: "10000"
  },
  {
    id: "11030",
    name: {
      nl: "Niel",
      fr: "Niel"
    },
    province: "10000"
  },
  {
    id: "11035",
    name: {
      nl: "Ranst",
      fr: "Ranst"
    },
    province: "10000"
  },
  {
    id: "11037",
    name: {
      nl: "Rumst",
      fr: "Rumst"
    },
    province: "10000"
  },
  {
    id: "11038",
    name: {
      nl: "Schelle",
      fr: "Schelle"
    },
    province: "10000"
  },
  {
    id: "11039",
    name: {
      nl: "Schilde",
      fr: "Schilde"
    },
    province: "10000"
  },
  {
    id: "11040",
    name: {
      nl: "Schoten",
      fr: "Schoten"
    },
    province: "10000"
  },
  {
    id: "11044",
    name: {
      nl: "Stabroek",
      fr: "Stabroek"
    },
    province: "10000"
  },
  {
    id: "11050",
    name: {
      nl: "Wijnegem",
      fr: "Wijnegem"
    },
    province: "10000"
  },
  {
    id: "11052",
    name: {
      nl: "Wommelgem",
      fr: "Wommelgem"
    },
    province: "10000"
  },
  {
    id: "11053",
    name: {
      nl: "Wuustwezel",
      fr: "Wuustwezel"
    },
    province: "10000"
  },
  {
    id: "11054",
    name: {
      nl: "Zandhoven",
      fr: "Zandhoven"
    },
    province: "10000"
  },
  {
    id: "11055",
    name: {
      nl: "Zoersel",
      fr: "Zoersel"
    },
    province: "10000"
  },
  {
    id: "11057",
    name: {
      nl: "Malle",
      fr: "Malle"
    },
    province: "10000"
  },
  {
    id: "12002",
    name: {
      nl: "Berlaar",
      fr: "Berlaar"
    },
    province: "10000"
  },
  {
    id: "12005",
    name: {
      nl: "Bonheiden",
      fr: "Bonheiden"
    },
    province: "10000"
  },
  {
    id: "12007",
    name: {
      nl: "Bornem",
      fr: "Bornem"
    },
    province: "10000"
  },
  {
    id: "12009",
    name: {
      nl: "Duffel",
      fr: "Duffel"
    },
    province: "10000"
  },
  {
    id: "12014",
    name: {
      nl: "Heist-op-den-Berg",
      fr: "Heist-op-den-Berg"
    },
    province: "10000"
  },
  {
    id: "12021",
    name: {
      nl: "Lier",
      fr: "Lierre"
    },
    province: "10000"
  },
  {
    id: "12025",
    name: {
      nl: "Mechelen",
      fr: "Malines"
    },
    province: "10000"
  },
  {
    id: "12026",
    name: {
      nl: "Nijlen",
      fr: "Nijlen"
    },
    province: "10000"
  },
  {
    id: "12029",
    name: {
      nl: "Putte",
      fr: "Putte"
    },
    province: "10000"
  },
  {
    id: "12035",
    name: {
      nl: "Sint-Katelijne-Waver",
      fr: "Sint-Katelijne-Waver"
    },
    province: "10000"
  },
  {
    id: "12040",
    name: {
      nl: "Willebroek",
      fr: "Willebroek"
    },
    province: "10000"
  },
  {
    id: "12041",
    name: {
      nl: "Puurs-Sint-Amands",
      fr: "Puurs-Sint-Amands"
    },
    province: "10000"
  },
  {
    id: "13001",
    name: {
      nl: "Arendonk",
      fr: "Arendonk"
    },
    province: "10000"
  },
  {
    id: "13002",
    name: {
      nl: "Baarle-Hertog",
      fr: "Baerle-Duc"
    },
    province: "10000"
  },
  {
    id: "13003",
    name: {
      nl: "Balen",
      fr: "Balen"
    },
    province: "10000"
  },
  {
    id: "13004",
    name: {
      nl: "Beerse",
      fr: "Beerse"
    },
    province: "10000"
  },
  {
    id: "13006",
    name: {
      nl: "Dessel",
      fr: "Dessel"
    },
    province: "10000"
  },
  {
    id: "13008",
    name: {
      nl: "Geel",
      fr: "Geel"
    },
    province: "10000"
  },
  {
    id: "13010",
    name: {
      nl: "Grobbendonk",
      fr: "Grobbendonk"
    },
    province: "10000"
  },
  {
    id: "13011",
    name: {
      nl: "Herentals",
      fr: "Herentals"
    },
    province: "10000"
  },
  {
    id: "13012",
    name: {
      nl: "Herenthout",
      fr: "Herenthout"
    },
    province: "10000"
  },
  {
    id: "13013",
    name: {
      nl: "Herselt",
      fr: "Herselt"
    },
    province: "10000"
  },
  {
    id: "13014",
    name: {
      nl: "Hoogstraten",
      fr: "Hoogstraten"
    },
    province: "10000"
  },
  {
    id: "13016",
    name: {
      nl: "Hulshout",
      fr: "Hulshout"
    },
    province: "10000"
  },
  {
    id: "13017",
    name: {
      nl: "Kasterlee",
      fr: "Kasterlee"
    },
    province: "10000"
  },
  {
    id: "13019",
    name: {
      nl: "Lille",
      fr: "Lille"
    },
    province: "10000"
  },
  {
    id: "13021",
    name: {
      nl: "Meerhout",
      fr: "Meerhout"
    },
    province: "10000"
  },
  {
    id: "13023",
    name: {
      nl: "Merksplas",
      fr: "Merksplas"
    },
    province: "10000"
  },
  {
    id: "13025",
    name: {
      nl: "Mol",
      fr: "Mol"
    },
    province: "10000"
  },
  {
    id: "13029",
    name: {
      nl: "Olen",
      fr: "Olen"
    },
    province: "10000"
  },
  {
    id: "13031",
    name: {
      nl: "Oud-Turnhout",
      fr: "Oud-Turnhout"
    },
    province: "10000"
  },
  {
    id: "13035",
    name: {
      nl: "Ravels",
      fr: "Ravels"
    },
    province: "10000"
  },
  {
    id: "13036",
    name: {
      nl: "Retie",
      fr: "Retie"
    },
    province: "10000"
  },
  {
    id: "13037",
    name: {
      nl: "Rijkevorsel",
      fr: "Rijkevorsel"
    },
    province: "10000"
  },
  {
    id: "13040",
    name: {
      nl: "Turnhout",
      fr: "Turnhout"
    },
    province: "10000"
  },
  {
    id: "13044",
    name: {
      nl: "Vorselaar",
      fr: "Vorselaar"
    },
    province: "10000"
  },
  {
    id: "13046",
    name: {
      nl: "Vosselaar",
      fr: "Vosselaar"
    },
    province: "10000"
  },
  {
    id: "13049",
    name: {
      nl: "Westerlo",
      fr: "Westerlo"
    },
    province: "10000"
  },
  {
    id: "13053",
    name: {
      nl: "Laakdal",
      fr: "Laakdal"
    },
    province: "10000"
  },
  {
    id: "21001",
    name: {
      nl: "Anderlecht",
      fr: "Anderlecht"
    },
    province: "04000"
  },
  {
    id: "21002",
    name: {
      nl: "Oudergem",
      fr: "Auderghem"
    },
    province: "04000"
  },
  {
    id: "21003",
    name: {
      nl: "Sint-Agatha-Berchem",
      fr: "Berchem-Sainte-Agathe"
    },
    province: "04000"
  },
  {
    id: "21004",
    name: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    province: "04000"
  },
  {
    id: "21005",
    name: {
      nl: "Etterbeek",
      fr: "Etterbeek"
    },
    province: "04000"
  },
  {
    id: "21006",
    name: {
      nl: "Evere",
      fr: "Evere"
    },
    province: "04000"
  },
  {
    id: "21007",
    name: {
      nl: "Vorst",
      fr: "Forest"
    },
    province: "04000"
  },
  {
    id: "21008",
    name: {
      nl: "Ganshoren",
      fr: "Ganshoren"
    },
    province: "04000"
  },
  {
    id: "21009",
    name: {
      nl: "Elsene",
      fr: "Ixelles"
    },
    province: "04000"
  },
  {
    id: "21010",
    name: {
      nl: "Jette",
      fr: "Jette"
    },
    province: "04000"
  },
  {
    id: "21011",
    name: {
      nl: "Koekelberg",
      fr: "Koekelberg"
    },
    province: "04000"
  },
  {
    id: "21012",
    name: {
      nl: "Sint-Jans-Molenbeek",
      fr: "Molenbeek-Saint-Jean"
    },
    province: "04000"
  },
  {
    id: "21013",
    name: {
      nl: "Sint-Gillis",
      fr: "Saint-Gilles"
    },
    province: "04000"
  },
  {
    id: "21014",
    name: {
      nl: "Sint-Joost-ten-Node",
      fr: "Saint-Josse-ten-Noode"
    },
    province: "04000"
  },
  {
    id: "21015",
    name: {
      nl: "Schaarbeek",
      fr: "Schaerbeek"
    },
    province: "04000"
  },
  {
    id: "21016",
    name: {
      nl: "Ukkel",
      fr: "Uccle"
    },
    province: "04000"
  },
  {
    id: "21017",
    name: {
      nl: "Watermaal-Bosvoorde",
      fr: "Watermael-Boitsfort"
    },
    province: "04000"
  },
  {
    id: "21018",
    name: {
      nl: "Sint-Lambrechts-Woluwe",
      fr: "Woluwe-Saint-Lambert"
    },
    province: "04000"
  },
  {
    id: "21019",
    name: {
      nl: "Sint-Pieters-Woluwe",
      fr: "Woluwe-Saint-Pierre"
    },
    province: "04000"
  },
  {
    id: "23002",
    name: {
      nl: "Asse",
      fr: "Asse"
    },
    province: "20001"
  },
  {
    id: "23003",
    name: {
      nl: "Beersel",
      fr: "Beersel"
    },
    province: "20001"
  },
  {
    id: "23009",
    name: {
      nl: "Bever",
      fr: "Bi\xE9v\xE8ne"
    },
    province: "20001"
  },
  {
    id: "23016",
    name: {
      nl: "Dilbeek",
      fr: "Dilbeek"
    },
    province: "20001"
  },
  {
    id: "23025",
    name: {
      nl: "Grimbergen",
      fr: "Grimbergen"
    },
    province: "20001"
  },
  {
    id: "23027",
    name: {
      nl: "Halle",
      fr: "Hal"
    },
    province: "20001"
  },
  {
    id: "23033",
    name: {
      nl: "Hoeilaart",
      fr: "Hoeilaart"
    },
    province: "20001"
  },
  {
    id: "23038",
    name: {
      nl: "Kampenhout",
      fr: "Kampenhout"
    },
    province: "20001"
  },
  {
    id: "23039",
    name: {
      nl: "Kapelle-op-den-Bos",
      fr: "Kapelle-op-den-Bos"
    },
    province: "20001"
  },
  {
    id: "23044",
    name: {
      nl: "Liedekerke",
      fr: "Liedekerke"
    },
    province: "20001"
  },
  {
    id: "23045",
    name: {
      nl: "Londerzeel",
      fr: "Londerzeel"
    },
    province: "20001"
  },
  {
    id: "23047",
    name: {
      nl: "Machelen",
      fr: "Machelen"
    },
    province: "20001"
  },
  {
    id: "23050",
    name: {
      nl: "Meise",
      fr: "Meise"
    },
    province: "20001"
  },
  {
    id: "23052",
    name: {
      nl: "Merchtem",
      fr: "Merchtem"
    },
    province: "20001"
  },
  {
    id: "23060",
    name: {
      nl: "Opwijk",
      fr: "Opwijk"
    },
    province: "20001"
  },
  {
    id: "23062",
    name: {
      nl: "Overijse",
      fr: "Overijse"
    },
    province: "20001"
  },
  {
    id: "23064",
    name: {
      nl: "Pepingen",
      fr: "Pepingen"
    },
    province: "20001"
  },
  {
    id: "23077",
    name: {
      nl: "Sint-Pieters-Leeuw",
      fr: "Sint-Pieters-Leeuw"
    },
    province: "20001"
  },
  {
    id: "23081",
    name: {
      nl: "Steenokkerzeel",
      fr: "Steenokkerzeel"
    },
    province: "20001"
  },
  {
    id: "23086",
    name: {
      nl: "Ternat",
      fr: "Ternat"
    },
    province: "20001"
  },
  {
    id: "23088",
    name: {
      nl: "Vilvoorde",
      fr: "Vilvorde"
    },
    province: "20001"
  },
  {
    id: "23094",
    name: {
      nl: "Zaventem",
      fr: "Zaventem"
    },
    province: "20001"
  },
  {
    id: "23096",
    name: {
      nl: "Zemst",
      fr: "Zemst"
    },
    province: "20001"
  },
  {
    id: "23097",
    name: {
      nl: "Roosdaal",
      fr: "Roosdaal"
    },
    province: "20001"
  },
  {
    id: "23098",
    name: {
      nl: "Drogenbos",
      fr: "Drogenbos"
    },
    province: "20001"
  },
  {
    id: "23099",
    name: {
      nl: "Kraainem",
      fr: "Kraainem"
    },
    province: "20001"
  },
  {
    id: "23100",
    name: {
      nl: "Linkebeek",
      fr: "Linkebeek"
    },
    province: "20001"
  },
  {
    id: "23101",
    name: {
      nl: "Sint-Genesius-Rode",
      fr: "Rhode-Saint-Gen\xE8se"
    },
    province: "20001"
  },
  {
    id: "23102",
    name: {
      nl: "Wemmel",
      fr: "Wemmel"
    },
    province: "20001"
  },
  {
    id: "23103",
    name: {
      nl: "Wezembeek-Oppem",
      fr: "Wezembeek-Oppem"
    },
    province: "20001"
  },
  {
    id: "23104",
    name: {
      nl: "Lennik",
      fr: "Lennik"
    },
    province: "20001"
  },
  {
    id: "23105",
    name: {
      nl: "Affligem",
      fr: "Affligem"
    },
    province: "20001"
  },
  {
    id: "23106",
    name: {
      nl: "Pajottegem",
      fr: "Pajottegem"
    },
    province: "20001"
  },
  {
    id: "24001",
    name: {
      nl: "Aarschot",
      fr: "Aarschot"
    },
    province: "20001"
  },
  {
    id: "24007",
    name: {
      nl: "Begijnendijk",
      fr: "Begijnendijk"
    },
    province: "20001"
  },
  {
    id: "24008",
    name: {
      nl: "Bekkevoort",
      fr: "Bekkevoort"
    },
    province: "20001"
  },
  {
    id: "24009",
    name: {
      nl: "Bertem",
      fr: "Bertem"
    },
    province: "20001"
  },
  {
    id: "24011",
    name: {
      nl: "Bierbeek",
      fr: "Bierbeek"
    },
    province: "20001"
  },
  {
    id: "24014",
    name: {
      nl: "Boortmeerbeek",
      fr: "Boortmeerbeek"
    },
    province: "20001"
  },
  {
    id: "24016",
    name: {
      nl: "Boutersem",
      fr: "Boutersem"
    },
    province: "20001"
  },
  {
    id: "24020",
    name: {
      nl: "Diest",
      fr: "Diest"
    },
    province: "20001"
  },
  {
    id: "24028",
    name: {
      nl: "Geetbets",
      fr: "Geetbets"
    },
    province: "20001"
  },
  {
    id: "24033",
    name: {
      nl: "Haacht",
      fr: "Haacht"
    },
    province: "20001"
  },
  {
    id: "24038",
    name: {
      nl: "Herent",
      fr: "Herent"
    },
    province: "20001"
  },
  {
    id: "24041",
    name: {
      nl: "Hoegaarden",
      fr: "Hoegaarden"
    },
    province: "20001"
  },
  {
    id: "24043",
    name: {
      nl: "Holsbeek",
      fr: "Holsbeek"
    },
    province: "20001"
  },
  {
    id: "24045",
    name: {
      nl: "Huldenberg",
      fr: "Huldenberg"
    },
    province: "20001"
  },
  {
    id: "24048",
    name: {
      nl: "Keerbergen",
      fr: "Keerbergen"
    },
    province: "20001"
  },
  {
    id: "24054",
    name: {
      nl: "Kortenaken",
      fr: "Kortenaken"
    },
    province: "20001"
  },
  {
    id: "24055",
    name: {
      nl: "Kortenberg",
      fr: "Kortenberg"
    },
    province: "20001"
  },
  {
    id: "24059",
    name: {
      nl: "Landen",
      fr: "Landen"
    },
    province: "20001"
  },
  {
    id: "24062",
    name: {
      nl: "Leuven",
      fr: "Louvain"
    },
    province: "20001"
  },
  {
    id: "24066",
    name: {
      nl: "Lubbeek",
      fr: "Lubbeek"
    },
    province: "20001"
  },
  {
    id: "24086",
    name: {
      nl: "Oud-Heverlee",
      fr: "Oud-Heverlee"
    },
    province: "20001"
  },
  {
    id: "24094",
    name: {
      nl: "Rotselaar",
      fr: "Rotselaar"
    },
    province: "20001"
  },
  {
    id: "24104",
    name: {
      nl: "Tervuren",
      fr: "Tervuren"
    },
    province: "20001"
  },
  {
    id: "24107",
    name: {
      nl: "Tienen",
      fr: "Tirlemont"
    },
    province: "20001"
  },
  {
    id: "24109",
    name: {
      nl: "Tremelo",
      fr: "Tremelo"
    },
    province: "20001"
  },
  {
    id: "24130",
    name: {
      nl: "Zoutleeuw",
      fr: "L\xE9au"
    },
    province: "20001"
  },
  {
    id: "24133",
    name: {
      nl: "Linter",
      fr: "Linter"
    },
    province: "20001"
  },
  {
    id: "24134",
    name: {
      nl: "Scherpenheuvel-Zichem",
      fr: "Montaigu-Zichem"
    },
    province: "20001"
  },
  {
    id: "24135",
    name: {
      nl: "Tielt-Winge",
      fr: "Tielt-Winge"
    },
    province: "20001"
  },
  {
    id: "24137",
    name: {
      nl: "Glabbeek",
      fr: "Glabbeek"
    },
    province: "20001"
  },
  {
    id: "25005",
    name: {
      nl: "Bevekom",
      fr: "Beauvechain"
    },
    province: "20002"
  },
  {
    id: "25014",
    name: {
      nl: "Eigenbrakel",
      fr: "Braine-l\u2019Alleud"
    },
    province: "20002"
  },
  {
    id: "25015",
    name: {
      nl: "Kasteelbrakel",
      fr: "Braine-le-Ch\xE2teau"
    },
    province: "20002"
  },
  {
    id: "25018",
    name: {
      nl: "Chaumont-Gistoux",
      fr: "Chaumont-Gistoux"
    },
    province: "20002"
  },
  {
    id: "25023",
    name: {
      nl: "Court-Saint-Etienne",
      fr: "Court-Saint-Etienne"
    },
    province: "20002"
  },
  {
    id: "25031",
    name: {
      nl: "Genepi\xEBn",
      fr: "Genappe"
    },
    province: "20002"
  },
  {
    id: "25037",
    name: {
      nl: "Graven",
      fr: "Grez-Doiceau"
    },
    province: "20002"
  },
  {
    id: "25043",
    name: {
      nl: "Incourt",
      fr: "Incourt"
    },
    province: "20002"
  },
  {
    id: "25044",
    name: {
      nl: "Itter",
      fr: "Ittre"
    },
    province: "20002"
  },
  {
    id: "25048",
    name: {
      nl: "Geldenaken",
      fr: "Jodoigne"
    },
    province: "20002"
  },
  {
    id: "25050",
    name: {
      nl: "Terhulpen",
      fr: "La Hulpe"
    },
    province: "20002"
  },
  {
    id: "25068",
    name: {
      nl: "Mont-Saint-Guibert",
      fr: "Mont-Saint-Guibert"
    },
    province: "20002"
  },
  {
    id: "25072",
    name: {
      nl: "Nijvel",
      fr: "Nivelles"
    },
    province: "20002"
  },
  {
    id: "25084",
    name: {
      nl: "Perwijs",
      fr: "Perwez"
    },
    province: "20002"
  },
  {
    id: "25091",
    name: {
      nl: "Rixensart",
      fr: "Rixensart"
    },
    province: "20002"
  },
  {
    id: "25105",
    name: {
      nl: "Tubeke",
      fr: "Tubize"
    },
    province: "20002"
  },
  {
    id: "25107",
    name: {
      nl: "Villers-la-Ville",
      fr: "Villers-la-Ville"
    },
    province: "20002"
  },
  {
    id: "25110",
    name: {
      nl: "Waterloo",
      fr: "Waterloo"
    },
    province: "20002"
  },
  {
    id: "25112",
    name: {
      nl: "Waver",
      fr: "Wavre"
    },
    province: "20002"
  },
  {
    id: "25117",
    name: {
      nl: "Chastre",
      fr: "Chastre"
    },
    province: "20002"
  },
  {
    id: "25118",
    name: {
      nl: "H\xE9l\xE9cine",
      fr: "H\xE9l\xE9cine"
    },
    province: "20002"
  },
  {
    id: "25119",
    name: {
      nl: "Lasne",
      fr: "Lasne"
    },
    province: "20002"
  },
  {
    id: "25120",
    name: {
      nl: "Orp-Jauche",
      fr: "Orp-Jauche"
    },
    province: "20002"
  },
  {
    id: "25121",
    name: {
      nl: "Ottignies-Louvain-la-Neuve",
      fr: "Ottignies-Louvain-la-Neuve"
    },
    province: "20002"
  },
  {
    id: "25122",
    name: {
      nl: "Ramillies",
      fr: "Ramillies"
    },
    province: "20002"
  },
  {
    id: "25123",
    name: {
      nl: "Rebecq",
      fr: "Rebecq"
    },
    province: "20002"
  },
  {
    id: "25124",
    name: {
      nl: "Walhain",
      fr: "Walhain"
    },
    province: "20002"
  },
  {
    id: "31003",
    name: {
      nl: "Beernem",
      fr: "Beernem"
    },
    province: "30000"
  },
  {
    id: "31004",
    name: {
      nl: "Blankenberge",
      fr: "Blankenberge"
    },
    province: "30000"
  },
  {
    id: "31005",
    name: {
      nl: "Brugge",
      fr: "Bruges"
    },
    province: "30000"
  },
  {
    id: "31006",
    name: {
      nl: "Damme",
      fr: "Damme"
    },
    province: "30000"
  },
  {
    id: "31012",
    name: {
      nl: "Jabbeke",
      fr: "Jabbeke"
    },
    province: "30000"
  },
  {
    id: "31022",
    name: {
      nl: "Oostkamp",
      fr: "Oostkamp"
    },
    province: "30000"
  },
  {
    id: "31033",
    name: {
      nl: "Torhout",
      fr: "Torhout"
    },
    province: "30000"
  },
  {
    id: "31040",
    name: {
      nl: "Zedelgem",
      fr: "Zedelgem"
    },
    province: "30000"
  },
  {
    id: "31042",
    name: {
      nl: "Zuienkerke",
      fr: "Zuienkerke"
    },
    province: "30000"
  },
  {
    id: "31043",
    name: {
      nl: "Knokke-Heist",
      fr: "Knokke-Heist"
    },
    province: "30000"
  },
  {
    id: "32003",
    name: {
      nl: "Diksmuide",
      fr: "Dixmude"
    },
    province: "30000"
  },
  {
    id: "32006",
    name: {
      nl: "Houthulst",
      fr: "Houthulst"
    },
    province: "30000"
  },
  {
    id: "32010",
    name: {
      nl: "Koekelare",
      fr: "Koekelare"
    },
    province: "30000"
  },
  {
    id: "32011",
    name: {
      nl: "Kortemark",
      fr: "Kortemark"
    },
    province: "30000"
  },
  {
    id: "32030",
    name: {
      nl: "Lo-Reninge",
      fr: "Lo-Reninge"
    },
    province: "30000"
  },
  {
    id: "33011",
    name: {
      nl: "Ieper",
      fr: "Ypres"
    },
    province: "30000"
  },
  {
    id: "33016",
    name: {
      nl: "Mesen",
      fr: "Messines"
    },
    province: "30000"
  },
  {
    id: "33021",
    name: {
      nl: "Poperinge",
      fr: "Poperinge"
    },
    province: "30000"
  },
  {
    id: "33029",
    name: {
      nl: "Wervik",
      fr: "Wervik"
    },
    province: "30000"
  },
  {
    id: "33037",
    name: {
      nl: "Zonnebeke",
      fr: "Zonnebeke"
    },
    province: "30000"
  },
  {
    id: "33039",
    name: {
      nl: "Heuvelland",
      fr: "Heuvelland"
    },
    province: "30000"
  },
  {
    id: "33040",
    name: {
      nl: "Langemark-Poelkapelle",
      fr: "Langemark-Poelkapelle"
    },
    province: "30000"
  },
  {
    id: "33041",
    name: {
      nl: "Vleteren",
      fr: "Vleteren"
    },
    province: "30000"
  },
  {
    id: "34002",
    name: {
      nl: "Anzegem",
      fr: "Anzegem"
    },
    province: "30000"
  },
  {
    id: "34003",
    name: {
      nl: "Avelgem",
      fr: "Avelgem"
    },
    province: "30000"
  },
  {
    id: "34009",
    name: {
      nl: "Deerlijk",
      fr: "Deerlijk"
    },
    province: "30000"
  },
  {
    id: "34013",
    name: {
      nl: "Harelbeke",
      fr: "Harelbeke"
    },
    province: "30000"
  },
  {
    id: "34022",
    name: {
      nl: "Kortrijk",
      fr: "Courtrai"
    },
    province: "30000"
  },
  {
    id: "34023",
    name: {
      nl: "Kuurne",
      fr: "Kuurne"
    },
    province: "30000"
  },
  {
    id: "34025",
    name: {
      nl: "Lendelede",
      fr: "Lendelede"
    },
    province: "30000"
  },
  {
    id: "34027",
    name: {
      nl: "Menen",
      fr: "Menin"
    },
    province: "30000"
  },
  {
    id: "34040",
    name: {
      nl: "Waregem",
      fr: "Waregem"
    },
    province: "30000"
  },
  {
    id: "34041",
    name: {
      nl: "Wevelgem",
      fr: "Wevelgem"
    },
    province: "30000"
  },
  {
    id: "34042",
    name: {
      nl: "Zwevegem",
      fr: "Zwevegem"
    },
    province: "30000"
  },
  {
    id: "34043",
    name: {
      nl: "Spiere-Helkijn",
      fr: "Espierres-Helchin"
    },
    province: "30000"
  },
  {
    id: "35002",
    name: {
      nl: "Bredene",
      fr: "Bredene"
    },
    province: "30000"
  },
  {
    id: "35005",
    name: {
      nl: "Gistel",
      fr: "Gistel"
    },
    province: "30000"
  },
  {
    id: "35006",
    name: {
      nl: "Ichtegem",
      fr: "Ichtegem"
    },
    province: "30000"
  },
  {
    id: "35011",
    name: {
      nl: "Middelkerke",
      fr: "Middelkerke"
    },
    province: "30000"
  },
  {
    id: "35013",
    name: {
      nl: "Oostende",
      fr: "Ostende"
    },
    province: "30000"
  },
  {
    id: "35014",
    name: {
      nl: "Oudenburg",
      fr: "Oudenburg"
    },
    province: "30000"
  },
  {
    id: "35029",
    name: {
      nl: "De Haan",
      fr: "De Haan"
    },
    province: "30000"
  },
  {
    id: "36006",
    name: {
      nl: "Hooglede",
      fr: "Hooglede"
    },
    province: "30000"
  },
  {
    id: "36007",
    name: {
      nl: "Ingelmunster",
      fr: "Ingelmunster"
    },
    province: "30000"
  },
  {
    id: "36008",
    name: {
      nl: "Izegem",
      fr: "Izegem"
    },
    province: "30000"
  },
  {
    id: "36010",
    name: {
      nl: "Ledegem",
      fr: "Ledegem"
    },
    province: "30000"
  },
  {
    id: "36011",
    name: {
      nl: "Lichtervelde",
      fr: "Lichtervelde"
    },
    province: "30000"
  },
  {
    id: "36012",
    name: {
      nl: "Moorslede",
      fr: "Moorslede"
    },
    province: "30000"
  },
  {
    id: "36015",
    name: {
      nl: "Roeselare",
      fr: "Roulers"
    },
    province: "30000"
  },
  {
    id: "36019",
    name: {
      nl: "Staden",
      fr: "Staden"
    },
    province: "30000"
  },
  {
    id: "37002",
    name: {
      nl: "Dentergem",
      fr: "Dentergem"
    },
    province: "30000"
  },
  {
    id: "37010",
    name: {
      nl: "Oostrozebeke",
      fr: "Oostrozebeke"
    },
    province: "30000"
  },
  {
    id: "37011",
    name: {
      nl: "Pittem",
      fr: "Pittem"
    },
    province: "30000"
  },
  {
    id: "37017",
    name: {
      nl: "Wielsbeke",
      fr: "Wielsbeke"
    },
    province: "30000"
  },
  {
    id: "37020",
    name: {
      nl: "Ardooie",
      fr: "Ardooie"
    },
    province: "30000"
  },
  {
    id: "37021",
    name: {
      nl: "Wingene",
      fr: "Wingene"
    },
    province: "30000"
  },
  {
    id: "37022",
    name: {
      nl: "Tielt",
      fr: "Tielt"
    },
    province: "30000"
  },
  {
    id: "38002",
    name: {
      nl: "Alveringem",
      fr: "Alveringem"
    },
    province: "30000"
  },
  {
    id: "38008",
    name: {
      nl: "De Panne",
      fr: "La Panne"
    },
    province: "30000"
  },
  {
    id: "38014",
    name: {
      nl: "Koksijde",
      fr: "Koksijde"
    },
    province: "30000"
  },
  {
    id: "38016",
    name: {
      nl: "Nieuwpoort",
      fr: "Nieuport"
    },
    province: "30000"
  },
  {
    id: "38025",
    name: {
      nl: "Veurne",
      fr: "Furnes"
    },
    province: "30000"
  },
  {
    id: "41002",
    name: {
      nl: "Aalst",
      fr: "Alost"
    },
    province: "40000"
  },
  {
    id: "41011",
    name: {
      nl: "Denderleeuw",
      fr: "Denderleeuw"
    },
    province: "40000"
  },
  {
    id: "41018",
    name: {
      nl: "Geraardsbergen",
      fr: "Grammont"
    },
    province: "40000"
  },
  {
    id: "41024",
    name: {
      nl: "Haaltert",
      fr: "Haaltert"
    },
    province: "40000"
  },
  {
    id: "41027",
    name: {
      nl: "Herzele",
      fr: "Herzele"
    },
    province: "40000"
  },
  {
    id: "41034",
    name: {
      nl: "Lede",
      fr: "Lede"
    },
    province: "40000"
  },
  {
    id: "41048",
    name: {
      nl: "Ninove",
      fr: "Ninove"
    },
    province: "40000"
  },
  {
    id: "41063",
    name: {
      nl: "Sint-Lievens-Houtem",
      fr: "Sint-Lievens-Houtem"
    },
    province: "40000"
  },
  {
    id: "41081",
    name: {
      nl: "Zottegem",
      fr: "Zottegem"
    },
    province: "40000"
  },
  {
    id: "41082",
    name: {
      nl: "Erpe-Mere",
      fr: "Erpe-Mere"
    },
    province: "40000"
  },
  {
    id: "42003",
    name: {
      nl: "Berlare",
      fr: "Berlare"
    },
    province: "40000"
  },
  {
    id: "42004",
    name: {
      nl: "Buggenhout",
      fr: "Buggenhout"
    },
    province: "40000"
  },
  {
    id: "42006",
    name: {
      nl: "Dendermonde",
      fr: "Termonde"
    },
    province: "40000"
  },
  {
    id: "42008",
    name: {
      nl: "Hamme",
      fr: "Hamme"
    },
    province: "40000"
  },
  {
    id: "42010",
    name: {
      nl: "Laarne",
      fr: "Laarne"
    },
    province: "40000"
  },
  {
    id: "42011",
    name: {
      nl: "Lebbeke",
      fr: "Lebbeke"
    },
    province: "40000"
  },
  {
    id: "42023",
    name: {
      nl: "Waasmunster",
      fr: "Waasmunster"
    },
    province: "40000"
  },
  {
    id: "42025",
    name: {
      nl: "Wetteren",
      fr: "Wetteren"
    },
    province: "40000"
  },
  {
    id: "42026",
    name: {
      nl: "Wichelen",
      fr: "Wichelen"
    },
    province: "40000"
  },
  {
    id: "42028",
    name: {
      nl: "Zele",
      fr: "Zele"
    },
    province: "40000"
  },
  {
    id: "43002",
    name: {
      nl: "Assenede",
      fr: "Assenede"
    },
    province: "40000"
  },
  {
    id: "43005",
    name: {
      nl: "Eeklo",
      fr: "Eeklo"
    },
    province: "40000"
  },
  {
    id: "43007",
    name: {
      nl: "Kaprijke",
      fr: "Kaprijke"
    },
    province: "40000"
  },
  {
    id: "43010",
    name: {
      nl: "Maldegem",
      fr: "Maldegem"
    },
    province: "40000"
  },
  {
    id: "43014",
    name: {
      nl: "Sint-Laureins",
      fr: "Sint-Laureins"
    },
    province: "40000"
  },
  {
    id: "43018",
    name: {
      nl: "Zelzate",
      fr: "Zelzate"
    },
    province: "40000"
  },
  {
    id: "44013",
    name: {
      nl: "Destelbergen",
      fr: "Destelbergen"
    },
    province: "40000"
  },
  {
    id: "44019",
    name: {
      nl: "Evergem",
      fr: "Evergem"
    },
    province: "40000"
  },
  {
    id: "44020",
    name: {
      nl: "Gavere",
      fr: "Gavere"
    },
    province: "40000"
  },
  {
    id: "44021",
    name: {
      nl: "Gent",
      fr: "Gand"
    },
    province: "40000"
  },
  {
    id: "44052",
    name: {
      nl: "Oosterzele",
      fr: "Oosterzele"
    },
    province: "40000"
  },
  {
    id: "44064",
    name: {
      nl: "Sint-Martens-Latem",
      fr: "Sint-Martens-Latem"
    },
    province: "40000"
  },
  {
    id: "44081",
    name: {
      nl: "Zulte",
      fr: "Zulte"
    },
    province: "40000"
  },
  {
    id: "44083",
    name: {
      nl: "Deinze",
      fr: "Deinze"
    },
    province: "40000"
  },
  {
    id: "44084",
    name: {
      nl: "Aalter",
      fr: "Aalter"
    },
    province: "40000"
  },
  {
    id: "44085",
    name: {
      nl: "Lievegem",
      fr: "Lievegem"
    },
    province: "40000"
  },
  {
    id: "44086",
    name: {
      nl: "Nazareth-De Pinte",
      fr: "Nazareth-De Pinte"
    },
    province: "40000"
  },
  {
    id: "44087",
    name: {
      nl: "Lochristi",
      fr: "Lochristi"
    },
    province: "40000"
  },
  {
    id: "44088",
    name: {
      nl: "Merelbeke-Melle",
      fr: "Merelbeke-Melle"
    },
    province: "40000"
  },
  {
    id: "45035",
    name: {
      nl: "Oudenaarde",
      fr: "Audenarde"
    },
    province: "40000"
  },
  {
    id: "45041",
    name: {
      nl: "Ronse",
      fr: "Renaix"
    },
    province: "40000"
  },
  {
    id: "45059",
    name: {
      nl: "Brakel",
      fr: "Brakel"
    },
    province: "40000"
  },
  {
    id: "45060",
    name: {
      nl: "Kluisbergen",
      fr: "Kluisbergen"
    },
    province: "40000"
  },
  {
    id: "45061",
    name: {
      nl: "Wortegem-Petegem",
      fr: "Wortegem-Petegem"
    },
    province: "40000"
  },
  {
    id: "45062",
    name: {
      nl: "Horebeke",
      fr: "Horebeke"
    },
    province: "40000"
  },
  {
    id: "45063",
    name: {
      nl: "Lierde",
      fr: "Lierde"
    },
    province: "40000"
  },
  {
    id: "45064",
    name: {
      nl: "Maarkedal",
      fr: "Maarkedal"
    },
    province: "40000"
  },
  {
    id: "45065",
    name: {
      nl: "Zwalm",
      fr: "Zwalin"
    },
    province: "40000"
  },
  {
    id: "45068",
    name: {
      nl: "Kruisem",
      fr: "Kruisem"
    },
    province: "40000"
  },
  {
    id: "46020",
    name: {
      nl: "Sint-Gillis-Waas",
      fr: "Sint-Gillis-Waas"
    },
    province: "40000"
  },
  {
    id: "46021",
    name: {
      nl: "Sint-Niklaas",
      fr: "Sint-Niklaas"
    },
    province: "40000"
  },
  {
    id: "46024",
    name: {
      nl: "Stekene",
      fr: "Stekene"
    },
    province: "40000"
  },
  {
    id: "46025",
    name: {
      nl: "Temse",
      fr: "Tamise"
    },
    province: "40000"
  },
  {
    id: "46029",
    name: {
      nl: "Lokeren",
      fr: "Lokeren"
    },
    province: "40000"
  },
  {
    id: "46030",
    name: {
      nl: "Beveren-Kruibeke-Zwijndrecht",
      fr: "Beveren-Kruibeke-Zwijndrecht"
    },
    province: "40000"
  },
  {
    id: "51004",
    name: {
      nl: "Aat",
      fr: "Ath"
    },
    province: "50000"
  },
  {
    id: "51008",
    name: {
      nl: "Beloeil",
      fr: "Beloeil"
    },
    province: "50000"
  },
  {
    id: "51009",
    name: {
      nl: "Bernissart",
      fr: "Bernissart"
    },
    province: "50000"
  },
  {
    id: "51012",
    name: {
      nl: "Brugelette",
      fr: "Brugelette"
    },
    province: "50000"
  },
  {
    id: "51014",
    name: {
      nl: "Chi\xE8vres",
      fr: "Chi\xE8vres"
    },
    province: "50000"
  },
  {
    id: "51017",
    name: {
      nl: "Elzele",
      fr: "Ellezelles"
    },
    province: "50000"
  },
  {
    id: "51019",
    name: {
      nl: "Vloesberg",
      fr: "Flobecq"
    },
    province: "50000"
  },
  {
    id: "51065",
    name: {
      nl: "Frasnes-lez-Anvaing",
      fr: "Frasnes-lez-Anvaing"
    },
    province: "50000"
  },
  {
    id: "51067",
    name: {
      nl: "Edingen",
      fr: "Enghien"
    },
    province: "50000"
  },
  {
    id: "51068",
    name: {
      nl: "Opzullik",
      fr: "Silly"
    },
    province: "50000"
  },
  {
    id: "51069",
    name: {
      nl: "Lessen",
      fr: "Lessines"
    },
    province: "50000"
  },
  {
    id: "52010",
    name: {
      nl: "Chapelle-lez-Herlaimont",
      fr: "Chapelle-lez-Herlaimont"
    },
    province: "50000"
  },
  {
    id: "52011",
    name: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    province: "50000"
  },
  {
    id: "52012",
    name: {
      nl: "Ch\xE2telet",
      fr: "Ch\xE2telet"
    },
    province: "50000"
  },
  {
    id: "52015",
    name: {
      nl: "Courcelles",
      fr: "Courcelles"
    },
    province: "50000"
  },
  {
    id: "52018",
    name: {
      nl: "Farciennes",
      fr: "Farciennes"
    },
    province: "50000"
  },
  {
    id: "52021",
    name: {
      nl: "Fleurus",
      fr: "Fleurus"
    },
    province: "50000"
  },
  {
    id: "52022",
    name: {
      nl: "Fontaine-l\u2019Ev\xEAque",
      fr: "Fontaine-l\u2019Ev\xEAque"
    },
    province: "50000"
  },
  {
    id: "52025",
    name: {
      nl: "Gerpinnes",
      fr: "Gerpinnes"
    },
    province: "50000"
  },
  {
    id: "52048",
    name: {
      nl: "Montigny-le-Tilleul",
      fr: "Montigny-le-Tilleul"
    },
    province: "50000"
  },
  {
    id: "52055",
    name: {
      nl: "Pont-\xE0-Celles",
      fr: "Pont-\xE0-Celles"
    },
    province: "50000"
  },
  {
    id: "52074",
    name: {
      nl: "Aiseau-Presles",
      fr: "Aiseau-Presles"
    },
    province: "50000"
  },
  {
    id: "52075",
    name: {
      nl: "Les Bons Villers",
      fr: "Les Bons Villers"
    },
    province: "50000"
  },
  {
    id: "53014",
    name: {
      nl: "Boussu",
      fr: "Boussu"
    },
    province: "50000"
  },
  {
    id: "53020",
    name: {
      nl: "Dour",
      fr: "Dour"
    },
    province: "50000"
  },
  {
    id: "53028",
    name: {
      nl: "Frameries",
      fr: "Frameries"
    },
    province: "50000"
  },
  {
    id: "53039",
    name: {
      nl: "Hensies",
      fr: "Hensies"
    },
    province: "50000"
  },
  {
    id: "53044",
    name: {
      nl: "Jurbeke",
      fr: "Jurbise"
    },
    province: "50000"
  },
  {
    id: "53046",
    name: {
      nl: "Lens",
      fr: "Lens"
    },
    province: "50000"
  },
  {
    id: "53053",
    name: {
      nl: "Bergen",
      fr: "Mons"
    },
    province: "50000"
  },
  {
    id: "53065",
    name: {
      nl: "Quaregnon",
      fr: "Quaregnon"
    },
    province: "50000"
  },
  {
    id: "53068",
    name: {
      nl: "Qui\xE9vrain",
      fr: "Qui\xE9vrain"
    },
    province: "50000"
  },
  {
    id: "53070",
    name: {
      nl: "Saint-Ghislain",
      fr: "Saint-Ghislain"
    },
    province: "50000"
  },
  {
    id: "53082",
    name: {
      nl: "Colfontaine",
      fr: "Colfontaine"
    },
    province: "50000"
  },
  {
    id: "53083",
    name: {
      nl: "Honnelles",
      fr: "Honnelles"
    },
    province: "50000"
  },
  {
    id: "53084",
    name: {
      nl: "Qu\xE9vy",
      fr: "Qu\xE9vy"
    },
    province: "50000"
  },
  {
    id: "55004",
    name: {
      nl: "\u2019s Gravenbrakel",
      fr: "Braine-le-Comte"
    },
    province: "50000"
  },
  {
    id: "55035",
    name: {
      nl: "Le Roeulx",
      fr: "Le Roeulx"
    },
    province: "50000"
  },
  {
    id: "55040",
    name: {
      nl: "Zinnik",
      fr: "Soignies"
    },
    province: "50000"
  },
  {
    id: "55050",
    name: {
      nl: "Ecaussinnes",
      fr: "Ecaussinnes"
    },
    province: "50000"
  },
  {
    id: "55085",
    name: {
      nl: "Seneffe",
      fr: "Seneffe"
    },
    province: "50000"
  },
  {
    id: "55086",
    name: {
      nl: "Manage",
      fr: "Manage"
    },
    province: "50000"
  },
  {
    id: "56001",
    name: {
      nl: "Anderlues",
      fr: "Anderlues"
    },
    province: "50000"
  },
  {
    id: "56005",
    name: {
      nl: "Beaumont",
      fr: "Beaumont"
    },
    province: "50000"
  },
  {
    id: "56016",
    name: {
      nl: "Chimay",
      fr: "Chimay"
    },
    province: "50000"
  },
  {
    id: "56022",
    name: {
      nl: "Erquelinnes",
      fr: "Erquelinnes"
    },
    province: "50000"
  },
  {
    id: "56029",
    name: {
      nl: "Froidchapelle",
      fr: "Froidchapelle"
    },
    province: "50000"
  },
  {
    id: "56044",
    name: {
      nl: "Lobbes",
      fr: "Lobbes"
    },
    province: "50000"
  },
  {
    id: "56049",
    name: {
      nl: "Merbes-le-Ch\xE2teau",
      fr: "Merbes-le-Ch\xE2teau"
    },
    province: "50000"
  },
  {
    id: "56051",
    name: {
      nl: "Momignies",
      fr: "Momignies"
    },
    province: "50000"
  },
  {
    id: "56078",
    name: {
      nl: "Thuin",
      fr: "Thuin"
    },
    province: "50000"
  },
  {
    id: "56086",
    name: {
      nl: "Ham-sur-Heure-Nalinnes",
      fr: "Ham-sur-Heure-Nalinnes"
    },
    province: "50000"
  },
  {
    id: "56088",
    name: {
      nl: "Sivry-Rance",
      fr: "Sivry-Rance"
    },
    province: "50000"
  },
  {
    id: "57003",
    name: {
      nl: "Antoing",
      fr: "Antoing"
    },
    province: "50000"
  },
  {
    id: "57018",
    name: {
      nl: "Celles",
      fr: "Celles"
    },
    province: "50000"
  },
  {
    id: "57027",
    name: {
      nl: "Estaimpuis",
      fr: "Estaimpuis"
    },
    province: "50000"
  },
  {
    id: "57062",
    name: {
      nl: "Pecq",
      fr: "Pecq"
    },
    province: "50000"
  },
  {
    id: "57064",
    name: {
      nl: "P\xE9ruwelz",
      fr: "P\xE9ruwelz"
    },
    province: "50000"
  },
  {
    id: "57072",
    name: {
      nl: "Rumes",
      fr: "Rumes"
    },
    province: "50000"
  },
  {
    id: "57081",
    name: {
      nl: "Doornik",
      fr: "Tournai"
    },
    province: "50000"
  },
  {
    id: "57093",
    name: {
      nl: "Brunehaut",
      fr: "Brunehaut"
    },
    province: "50000"
  },
  {
    id: "57094",
    name: {
      nl: "Leuze-en-Hainaut",
      fr: "Leuze-en-Hainaut"
    },
    province: "50000"
  },
  {
    id: "57095",
    name: {
      nl: "Mont-de-l\u2019Enclus",
      fr: "Mont-de-l\u2019Enclus"
    },
    province: "50000"
  },
  {
    id: "57096",
    name: {
      nl: "Moeskroen",
      fr: "Mouscron"
    },
    province: "50000"
  },
  {
    id: "57097",
    name: {
      nl: "Komen-Waasten",
      fr: "Comines-Warneton"
    },
    province: "50000"
  },
  {
    id: "58001",
    name: {
      nl: "La Louvi\xE8re",
      fr: "La Louvi\xE8re"
    },
    province: "50000"
  },
  {
    id: "58002",
    name: {
      nl: "Binche",
      fr: "Binche"
    },
    province: "50000"
  },
  {
    id: "58003",
    name: {
      nl: "Estinnes",
      fr: "Estinnes"
    },
    province: "50000"
  },
  {
    id: "58004",
    name: {
      nl: "Morlanwelz",
      fr: "Morlanwelz"
    },
    province: "50000"
  },
  {
    id: "61003",
    name: {
      nl: "Amay",
      fr: "Amay"
    },
    province: "60000"
  },
  {
    id: "61010",
    name: {
      nl: "Burdinne",
      fr: "Burdinne"
    },
    province: "60000"
  },
  {
    id: "61012",
    name: {
      nl: "Clavier",
      fr: "Clavier"
    },
    province: "60000"
  },
  {
    id: "61019",
    name: {
      nl: "Ferri\xE8res",
      fr: "Ferri\xE8res"
    },
    province: "60000"
  },
  {
    id: "61024",
    name: {
      nl: "Hamoir",
      fr: "Hamoir"
    },
    province: "60000"
  },
  {
    id: "61028",
    name: {
      nl: "H\xE9ron",
      fr: "H\xE9ron"
    },
    province: "60000"
  },
  {
    id: "61031",
    name: {
      nl: "Hoei",
      fr: "Huy"
    },
    province: "60000"
  },
  {
    id: "61039",
    name: {
      nl: "Marchin",
      fr: "Marchin"
    },
    province: "60000"
  },
  {
    id: "61041",
    name: {
      nl: "Modave",
      fr: "Modave"
    },
    province: "60000"
  },
  {
    id: "61043",
    name: {
      nl: "Nandrin",
      fr: "Nandrin"
    },
    province: "60000"
  },
  {
    id: "61048",
    name: {
      nl: "Ouffet",
      fr: "Ouffet"
    },
    province: "60000"
  },
  {
    id: "61063",
    name: {
      nl: "Verlaine",
      fr: "Verlaine"
    },
    province: "60000"
  },
  {
    id: "61068",
    name: {
      nl: "Villers-Le-Bouillet",
      fr: "Villers-Le-Bouillet"
    },
    province: "60000"
  },
  {
    id: "61072",
    name: {
      nl: "Wanze",
      fr: "Wanze"
    },
    province: "60000"
  },
  {
    id: "61079",
    name: {
      nl: "Anthisnes",
      fr: "Anthisnes"
    },
    province: "60000"
  },
  {
    id: "61080",
    name: {
      nl: "Engis",
      fr: "Engis"
    },
    province: "60000"
  },
  {
    id: "61081",
    name: {
      nl: "Tinlot",
      fr: "Tinlot"
    },
    province: "60000"
  },
  {
    id: "62003",
    name: {
      nl: "Ans",
      fr: "Ans"
    },
    province: "60000"
  },
  {
    id: "62006",
    name: {
      nl: "Awans",
      fr: "Awans"
    },
    province: "60000"
  },
  {
    id: "62009",
    name: {
      nl: "Aywaille",
      fr: "Aywaille"
    },
    province: "60000"
  },
  {
    id: "62011",
    name: {
      nl: "Bitsingen",
      fr: "Bassenge"
    },
    province: "60000"
  },
  {
    id: "62015",
    name: {
      nl: "Beyne-Heusay",
      fr: "Beyne-Heusay"
    },
    province: "60000"
  },
  {
    id: "62022",
    name: {
      nl: "Chaudfontaine",
      fr: "Chaudfontaine"
    },
    province: "60000"
  },
  {
    id: "62026",
    name: {
      nl: "Comblain-au-Pont",
      fr: "Comblain-au-Pont"
    },
    province: "60000"
  },
  {
    id: "62027",
    name: {
      nl: "Dalhem",
      fr: "Dalhem"
    },
    province: "60000"
  },
  {
    id: "62032",
    name: {
      nl: "Esneux",
      fr: "Esneux"
    },
    province: "60000"
  },
  {
    id: "62038",
    name: {
      nl: "Fl\xE9ron",
      fr: "Fl\xE9ron"
    },
    province: "60000"
  },
  {
    id: "62051",
    name: {
      nl: "Herstal",
      fr: "Herstal"
    },
    province: "60000"
  },
  {
    id: "62060",
    name: {
      nl: "Juprelle",
      fr: "Juprelle"
    },
    province: "60000"
  },
  {
    id: "62063",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    province: "60000"
  },
  {
    id: "62079",
    name: {
      nl: "Oupeye",
      fr: "Oupeye"
    },
    province: "60000"
  },
  {
    id: "62093",
    name: {
      nl: "Saint-Nicolas",
      fr: "Saint-Nicolas"
    },
    province: "60000"
  },
  {
    id: "62096",
    name: {
      nl: "Seraing",
      fr: "Seraing"
    },
    province: "60000"
  },
  {
    id: "62099",
    name: {
      nl: "Soumagne",
      fr: "Soumagne"
    },
    province: "60000"
  },
  {
    id: "62100",
    name: {
      nl: "Sprimont",
      fr: "Sprimont"
    },
    province: "60000"
  },
  {
    id: "62108",
    name: {
      nl: "Wezet",
      fr: "Vis\xE9"
    },
    province: "60000"
  },
  {
    id: "62118",
    name: {
      nl: "Gr\xE2ce-Hollogne",
      fr: "Gr\xE2ce-Hollogne"
    },
    province: "60000"
  },
  {
    id: "62119",
    name: {
      nl: "Blegny",
      fr: "Blegny"
    },
    province: "60000"
  },
  {
    id: "62120",
    name: {
      nl: "Fl\xE9malle",
      fr: "Fl\xE9malle"
    },
    province: "60000"
  },
  {
    id: "62121",
    name: {
      nl: "Neupr\xE9",
      fr: "Neupr\xE9"
    },
    province: "60000"
  },
  {
    id: "62122",
    name: {
      nl: "Trooz",
      fr: "Trooz"
    },
    province: "60000"
  },
  {
    id: "63001",
    name: {
      nl: "Amel",
      fr: "Ambl\xE8ve"
    },
    province: "60000"
  },
  {
    id: "63003",
    name: {
      nl: "Aubel",
      fr: "Aubel"
    },
    province: "60000"
  },
  {
    id: "63004",
    name: {
      nl: "Baelen",
      fr: "Baelen"
    },
    province: "60000"
  },
  {
    id: "63012",
    name: {
      nl: "B\xFCllingen",
      fr: "Bullange"
    },
    province: "60000"
  },
  {
    id: "63013",
    name: {
      nl: "B\xFCtgenbach",
      fr: "Butgenbach"
    },
    province: "60000"
  },
  {
    id: "63020",
    name: {
      nl: "Dison",
      fr: "Dison"
    },
    province: "60000"
  },
  {
    id: "63023",
    name: {
      nl: "Eupen",
      fr: "Eupen"
    },
    province: "60000"
  },
  {
    id: "63035",
    name: {
      nl: "Herve",
      fr: "Herve"
    },
    province: "60000"
  },
  {
    id: "63038",
    name: {
      nl: "Jalhay",
      fr: "Jalhay"
    },
    province: "60000"
  },
  {
    id: "63040",
    name: {
      nl: "Kelmis",
      fr: "La Calamine"
    },
    province: "60000"
  },
  {
    id: "63045",
    name: {
      nl: "Lierneux",
      fr: "Lierneux"
    },
    province: "60000"
  },
  {
    id: "63046",
    name: {
      nl: "Limburg",
      fr: "Limbourg"
    },
    province: "60000"
  },
  {
    id: "63048",
    name: {
      nl: "Lontzen",
      fr: "Lontzen"
    },
    province: "60000"
  },
  {
    id: "63049",
    name: {
      nl: "Malmedy",
      fr: "Malmedy"
    },
    province: "60000"
  },
  {
    id: "63057",
    name: {
      nl: "Olne",
      fr: "Olne"
    },
    province: "60000"
  },
  {
    id: "63058",
    name: {
      nl: "Pepinster",
      fr: "Pepinster"
    },
    province: "60000"
  },
  {
    id: "63061",
    name: {
      nl: "Raeren",
      fr: "Raeren"
    },
    province: "60000"
  },
  {
    id: "63067",
    name: {
      nl: "Sankt Vith",
      fr: "Saint-Vith"
    },
    province: "60000"
  },
  {
    id: "63072",
    name: {
      nl: "Spa",
      fr: "Spa"
    },
    province: "60000"
  },
  {
    id: "63073",
    name: {
      nl: "Stavelot",
      fr: "Stavelot"
    },
    province: "60000"
  },
  {
    id: "63075",
    name: {
      nl: "Stoumont",
      fr: "Stoumont"
    },
    province: "60000"
  },
  {
    id: "63076",
    name: {
      nl: "Theux",
      fr: "Theux"
    },
    province: "60000"
  },
  {
    id: "63079",
    name: {
      nl: "Verviers",
      fr: "Verviers"
    },
    province: "60000"
  },
  {
    id: "63080",
    name: {
      nl: "Weismes",
      fr: "Waimes"
    },
    province: "60000"
  },
  {
    id: "63084",
    name: {
      nl: "Welkenraedt",
      fr: "Welkenraedt"
    },
    province: "60000"
  },
  {
    id: "63086",
    name: {
      nl: "Trois-Ponts",
      fr: "Trois-Ponts"
    },
    province: "60000"
  },
  {
    id: "63087",
    name: {
      nl: "Burg-Reuland",
      fr: "Burg-Reuland"
    },
    province: "60000"
  },
  {
    id: "63088",
    name: {
      nl: "Plombi\xE8res",
      fr: "Plombi\xE8res"
    },
    province: "60000"
  },
  {
    id: "63089",
    name: {
      nl: "Thimister-Clermont",
      fr: "Thimister-Clermont"
    },
    province: "60000"
  },
  {
    id: "64008",
    name: {
      nl: "Berloz",
      fr: "Berloz"
    },
    province: "60000"
  },
  {
    id: "64015",
    name: {
      nl: "Braives",
      fr: "Braives"
    },
    province: "60000"
  },
  {
    id: "64021",
    name: {
      nl: "Crisn\xE9e",
      fr: "Crisn\xE9e"
    },
    province: "60000"
  },
  {
    id: "64023",
    name: {
      nl: "Donceel",
      fr: "Donceel"
    },
    province: "60000"
  },
  {
    id: "64025",
    name: {
      nl: "Fexhe-le-Haut-Clocher",
      fr: "Fexhe-le-Haut-Clocher"
    },
    province: "60000"
  },
  {
    id: "64029",
    name: {
      nl: "Geer",
      fr: "Geer"
    },
    province: "60000"
  },
  {
    id: "64034",
    name: {
      nl: "Hannuit",
      fr: "Hannut"
    },
    province: "60000"
  },
  {
    id: "64047",
    name: {
      nl: "Lijsem",
      fr: "Lincent"
    },
    province: "60000"
  },
  {
    id: "64056",
    name: {
      nl: "Oerle",
      fr: "Oreye"
    },
    province: "60000"
  },
  {
    id: "64063",
    name: {
      nl: "Remicourt",
      fr: "Remicourt"
    },
    province: "60000"
  },
  {
    id: "64065",
    name: {
      nl: "Saint-Georges-sur-Meuse",
      fr: "Saint-Georges-sur-Meuse"
    },
    province: "60000"
  },
  {
    id: "64074",
    name: {
      nl: "Borgworm",
      fr: "Waremme"
    },
    province: "60000"
  },
  {
    id: "64075",
    name: {
      nl: "Wasseiges",
      fr: "Wasseiges"
    },
    province: "60000"
  },
  {
    id: "64076",
    name: {
      nl: "Faimes",
      fr: "Faimes"
    },
    province: "60000"
  },
  {
    id: "71002",
    name: {
      nl: "As",
      fr: "As"
    },
    province: "70000"
  },
  {
    id: "71004",
    name: {
      nl: "Beringen",
      fr: "Beringen"
    },
    province: "70000"
  },
  {
    id: "71011",
    name: {
      nl: "Diepenbeek",
      fr: "Diepenbeek"
    },
    province: "70000"
  },
  {
    id: "71016",
    name: {
      nl: "Genk",
      fr: "Genk"
    },
    province: "70000"
  },
  {
    id: "71017",
    name: {
      nl: "Gingelom",
      fr: "Gingelom"
    },
    province: "70000"
  },
  {
    id: "71020",
    name: {
      nl: "Halen",
      fr: "Halen"
    },
    province: "70000"
  },
  {
    id: "71024",
    name: {
      nl: "Herk-de-Stad",
      fr: "Herck-la-Ville"
    },
    province: "70000"
  },
  {
    id: "71034",
    name: {
      nl: "Leopoldsburg",
      fr: "Bourg-L\xE9opold"
    },
    province: "70000"
  },
  {
    id: "71037",
    name: {
      nl: "Lummen",
      fr: "Lummen"
    },
    province: "70000"
  },
  {
    id: "71045",
    name: {
      nl: "Nieuwerkerken",
      fr: "Nieuwerkerken"
    },
    province: "70000"
  },
  {
    id: "71053",
    name: {
      nl: "Sint-Truiden",
      fr: "Saint-Trond"
    },
    province: "70000"
  },
  {
    id: "71066",
    name: {
      nl: "Zonhoven",
      fr: "Zonhoven"
    },
    province: "70000"
  },
  {
    id: "71067",
    name: {
      nl: "Zutendaal",
      fr: "Zutendaal"
    },
    province: "70000"
  },
  {
    id: "71070",
    name: {
      nl: "Heusden-Zolder",
      fr: "Heusden-Zolder"
    },
    province: "70000"
  },
  {
    id: "71071",
    name: {
      nl: "Tessenderlo-Ham",
      fr: "Tessenderlo-Ham"
    },
    province: "70000"
  },
  {
    id: "71072",
    name: {
      nl: "Hasselt",
      fr: "Hasselt"
    },
    province: "70000"
  },
  {
    id: "72003",
    name: {
      nl: "Bocholt",
      fr: "Bocholt"
    },
    province: "70000"
  },
  {
    id: "72004",
    name: {
      nl: "Bree",
      fr: "Bree"
    },
    province: "70000"
  },
  {
    id: "72018",
    name: {
      nl: "Kinrooi",
      fr: "Kinrooi"
    },
    province: "70000"
  },
  {
    id: "72020",
    name: {
      nl: "Lommel",
      fr: "Lommel"
    },
    province: "70000"
  },
  {
    id: "72021",
    name: {
      nl: "Maaseik",
      fr: "Maaseik"
    },
    province: "70000"
  },
  {
    id: "72030",
    name: {
      nl: "Peer",
      fr: "Peer"
    },
    province: "70000"
  },
  {
    id: "72037",
    name: {
      nl: "Hamont-Achel",
      fr: "Hamont-Achel"
    },
    province: "70000"
  },
  {
    id: "72038",
    name: {
      nl: "Hechtel-Eksel",
      fr: "Hechtel-Eksel"
    },
    province: "70000"
  },
  {
    id: "72039",
    name: {
      nl: "Houthalen-Helchteren",
      fr: "Houthalen-Helchteren"
    },
    province: "70000"
  },
  {
    id: "72041",
    name: {
      nl: "Dilsen-Stokkem",
      fr: "Dilsen-Stokkem"
    },
    province: "70000"
  },
  {
    id: "72042",
    name: {
      nl: "Oudsbergen",
      fr: "Oudsbergen"
    },
    province: "70000"
  },
  {
    id: "72043",
    name: {
      nl: "Pelt",
      fr: "Pelt"
    },
    province: "70000"
  },
  {
    id: "73001",
    name: {
      nl: "Alken",
      fr: "Alken"
    },
    province: "70000"
  },
  {
    id: "73022",
    name: {
      nl: "Heers",
      fr: "Heers"
    },
    province: "70000"
  },
  {
    id: "73028",
    name: {
      nl: "Herstappe",
      fr: "Herstappe"
    },
    province: "70000"
  },
  {
    id: "73042",
    name: {
      nl: "Lanaken",
      fr: "Lanaken"
    },
    province: "70000"
  },
  {
    id: "73066",
    name: {
      nl: "Riemst",
      fr: "Riemst"
    },
    province: "70000"
  },
  {
    id: "73098",
    name: {
      nl: "Wellen",
      fr: "Wellen"
    },
    province: "70000"
  },
  {
    id: "73107",
    name: {
      nl: "Maasmechelen",
      fr: "Maasmechelen"
    },
    province: "70000"
  },
  {
    id: "73109",
    name: {
      nl: "Voeren",
      fr: "Fourons"
    },
    province: "70000"
  },
  {
    id: "73110",
    name: {
      nl: "Bilzen-Hoeselt",
      fr: "Bilzen-Hoeselt"
    },
    province: "70000"
  },
  {
    id: "73111",
    name: {
      nl: "Tongeren-Borgloon",
      fr: "Tongres-Looz"
    },
    province: "70000"
  },
  {
    id: "81001",
    name: {
      nl: "Aarlen",
      fr: "Arlon"
    },
    province: "80000"
  },
  {
    id: "81003",
    name: {
      nl: "Attert",
      fr: "Attert"
    },
    province: "80000"
  },
  {
    id: "81004",
    name: {
      nl: "Aubange",
      fr: "Aubange"
    },
    province: "80000"
  },
  {
    id: "81013",
    name: {
      nl: "Martelange",
      fr: "Martelange"
    },
    province: "80000"
  },
  {
    id: "81015",
    name: {
      nl: "Messancy",
      fr: "Messancy"
    },
    province: "80000"
  },
  {
    id: "82009",
    name: {
      nl: "Fauvillers",
      fr: "Fauvillers"
    },
    province: "80000"
  },
  {
    id: "82014",
    name: {
      nl: "Houffalize",
      fr: "Houffalize"
    },
    province: "80000"
  },
  {
    id: "82032",
    name: {
      nl: "Vielsalm",
      fr: "Vielsalm"
    },
    province: "80000"
  },
  {
    id: "82036",
    name: {
      nl: "Vaux-sur-S\xFBre",
      fr: "Vaux-sur-S\xFBre"
    },
    province: "80000"
  },
  {
    id: "82037",
    name: {
      nl: "Gouvy",
      fr: "Gouvy"
    },
    province: "80000"
  },
  {
    id: "82038",
    name: {
      nl: "Sainte-Ode",
      fr: "Sainte-Ode"
    },
    province: "80000"
  },
  {
    id: "82039",
    name: {
      nl: "Bastenaken",
      fr: "Bastogne"
    },
    province: "80000"
  },
  {
    id: "83012",
    name: {
      nl: "Durbuy",
      fr: "Durbuy"
    },
    province: "80000"
  },
  {
    id: "83013",
    name: {
      nl: "Erez\xE9e",
      fr: "Erez\xE9e"
    },
    province: "80000"
  },
  {
    id: "83028",
    name: {
      nl: "Hotton",
      fr: "Hotton"
    },
    province: "80000"
  },
  {
    id: "83031",
    name: {
      nl: "La Roche-en-Ardenne",
      fr: "La Roche-en-Ardenne"
    },
    province: "80000"
  },
  {
    id: "83034",
    name: {
      nl: "Marche-en-Famenne",
      fr: "Marche-en-Famenne"
    },
    province: "80000"
  },
  {
    id: "83040",
    name: {
      nl: "Nassogne",
      fr: "Nassogne"
    },
    province: "80000"
  },
  {
    id: "83044",
    name: {
      nl: "Rendeux",
      fr: "Rendeux"
    },
    province: "80000"
  },
  {
    id: "83049",
    name: {
      nl: "Tenneville",
      fr: "Tenneville"
    },
    province: "80000"
  },
  {
    id: "83055",
    name: {
      nl: "Manhay",
      fr: "Manhay"
    },
    province: "80000"
  },
  {
    id: "84009",
    name: {
      nl: "Bertrix",
      fr: "Bertrix"
    },
    province: "80000"
  },
  {
    id: "84010",
    name: {
      nl: "Bouillon",
      fr: "Bouillon"
    },
    province: "80000"
  },
  {
    id: "84016",
    name: {
      nl: "Daverdisse",
      fr: "Daverdisse"
    },
    province: "80000"
  },
  {
    id: "84029",
    name: {
      nl: "Herbeumont",
      fr: "Herbeumont"
    },
    province: "80000"
  },
  {
    id: "84033",
    name: {
      nl: "L\xE9glise",
      fr: "L\xE9glise"
    },
    province: "80000"
  },
  {
    id: "84035",
    name: {
      nl: "Libin",
      fr: "Libin"
    },
    province: "80000"
  },
  {
    id: "84043",
    name: {
      nl: "Neufch\xE2teau",
      fr: "Neufch\xE2teau"
    },
    province: "80000"
  },
  {
    id: "84050",
    name: {
      nl: "Paliseul",
      fr: "Paliseul"
    },
    province: "80000"
  },
  {
    id: "84059",
    name: {
      nl: "Saint-Hubert",
      fr: "Saint-Hubert"
    },
    province: "80000"
  },
  {
    id: "84068",
    name: {
      nl: "Tellin",
      fr: "Tellin"
    },
    province: "80000"
  },
  {
    id: "84075",
    name: {
      nl: "Wellin",
      fr: "Wellin"
    },
    province: "80000"
  },
  {
    id: "84077",
    name: {
      nl: "Libramont-Chevigny",
      fr: "Libramont-Chevigny"
    },
    province: "80000"
  },
  {
    id: "85007",
    name: {
      nl: "Chiny",
      fr: "Chiny"
    },
    province: "80000"
  },
  {
    id: "85009",
    name: {
      nl: "Etalle",
      fr: "Etalle"
    },
    province: "80000"
  },
  {
    id: "85011",
    name: {
      nl: "Florenville",
      fr: "Florenville"
    },
    province: "80000"
  },
  {
    id: "85024",
    name: {
      nl: "Meix-devant-Virton",
      fr: "Meix-devant-Virton"
    },
    province: "80000"
  },
  {
    id: "85026",
    name: {
      nl: "Musson",
      fr: "Musson"
    },
    province: "80000"
  },
  {
    id: "85034",
    name: {
      nl: "Saint-L\xE9ger",
      fr: "Saint-L\xE9ger"
    },
    province: "80000"
  },
  {
    id: "85039",
    name: {
      nl: "Tintigny",
      fr: "Tintigny"
    },
    province: "80000"
  },
  {
    id: "85045",
    name: {
      nl: "Virton",
      fr: "Virton"
    },
    province: "80000"
  },
  {
    id: "85046",
    name: {
      nl: "Habay",
      fr: "Habay"
    },
    province: "80000"
  },
  {
    id: "85047",
    name: {
      nl: "Rouvroy",
      fr: "Rouvroy"
    },
    province: "80000"
  },
  {
    id: "91005",
    name: {
      nl: "Anh\xE9e",
      fr: "Anh\xE9e"
    },
    province: "90000"
  },
  {
    id: "91013",
    name: {
      nl: "Beauraing",
      fr: "Beauraing"
    },
    province: "90000"
  },
  {
    id: "91015",
    name: {
      nl: "Bi\xE8vre",
      fr: "Bi\xE8vre"
    },
    province: "90000"
  },
  {
    id: "91030",
    name: {
      nl: "Ciney",
      fr: "Ciney"
    },
    province: "90000"
  },
  {
    id: "91034",
    name: {
      nl: "Dinant",
      fr: "Dinant"
    },
    province: "90000"
  },
  {
    id: "91054",
    name: {
      nl: "Gedinne",
      fr: "Gedinne"
    },
    province: "90000"
  },
  {
    id: "91059",
    name: {
      nl: "Hamois",
      fr: "Hamois"
    },
    province: "90000"
  },
  {
    id: "91064",
    name: {
      nl: "Havelange",
      fr: "Havelange"
    },
    province: "90000"
  },
  {
    id: "91072",
    name: {
      nl: "Houyet",
      fr: "Houyet"
    },
    province: "90000"
  },
  {
    id: "91103",
    name: {
      nl: "Onhaye",
      fr: "Onhaye"
    },
    province: "90000"
  },
  {
    id: "91114",
    name: {
      nl: "Rochefort",
      fr: "Rochefort"
    },
    province: "90000"
  },
  {
    id: "91120",
    name: {
      nl: "Somme-Leuze",
      fr: "Somme-Leuze"
    },
    province: "90000"
  },
  {
    id: "91141",
    name: {
      nl: "Yvoir",
      fr: "Yvoir"
    },
    province: "90000"
  },
  {
    id: "91142",
    name: {
      nl: "Hasti\xE8re",
      fr: "Hasti\xE8re"
    },
    province: "90000"
  },
  {
    id: "91143",
    name: {
      nl: "Vresse-sur-Semois",
      fr: "Vresse-sur-Semois"
    },
    province: "90000"
  },
  {
    id: "92003",
    name: {
      nl: "Andenne",
      fr: "Andenne"
    },
    province: "90000"
  },
  {
    id: "92006",
    name: {
      nl: "Assesse",
      fr: "Assesse"
    },
    province: "90000"
  },
  {
    id: "92035",
    name: {
      nl: "Eghez\xE9e",
      fr: "Eghez\xE9e"
    },
    province: "90000"
  },
  {
    id: "92045",
    name: {
      nl: "Floreffe",
      fr: "Floreffe"
    },
    province: "90000"
  },
  {
    id: "92048",
    name: {
      nl: "Fosses-la-Ville",
      fr: "Fosses-la-Ville"
    },
    province: "90000"
  },
  {
    id: "92054",
    name: {
      nl: "Gesves",
      fr: "Gesves"
    },
    province: "90000"
  },
  {
    id: "92087",
    name: {
      nl: "Mettet",
      fr: "Mettet"
    },
    province: "90000"
  },
  {
    id: "92094",
    name: {
      nl: "Namen",
      fr: "Namur"
    },
    province: "90000"
  },
  {
    id: "92097",
    name: {
      nl: "Ohey",
      fr: "Ohey"
    },
    province: "90000"
  },
  {
    id: "92101",
    name: {
      nl: "Profondeville",
      fr: "Profondeville"
    },
    province: "90000"
  },
  {
    id: "92114",
    name: {
      nl: "Sombreffe",
      fr: "Sombreffe"
    },
    province: "90000"
  },
  {
    id: "92137",
    name: {
      nl: "Sambreville",
      fr: "Sambreville"
    },
    province: "90000"
  },
  {
    id: "92138",
    name: {
      nl: "Fernelmont",
      fr: "Fernelmont"
    },
    province: "90000"
  },
  {
    id: "92140",
    name: {
      nl: "Jemeppe-sur-Sambre",
      fr: "Jemeppe-sur-Sambre"
    },
    province: "90000"
  },
  {
    id: "92141",
    name: {
      nl: "La Bruy\xE8re",
      fr: "La Bruy\xE8re"
    },
    province: "90000"
  },
  {
    id: "92142",
    name: {
      nl: "Gembloux",
      fr: "Gembloux"
    },
    province: "90000"
  },
  {
    id: "93010",
    name: {
      nl: "Cerfontaine",
      fr: "Cerfontaine"
    },
    province: "90000"
  },
  {
    id: "93014",
    name: {
      nl: "Couvin",
      fr: "Couvin"
    },
    province: "90000"
  },
  {
    id: "93018",
    name: {
      nl: "Doische",
      fr: "Doische"
    },
    province: "90000"
  },
  {
    id: "93022",
    name: {
      nl: "Florennes",
      fr: "Florennes"
    },
    province: "90000"
  },
  {
    id: "93056",
    name: {
      nl: "Philippeville",
      fr: "Philippeville"
    },
    province: "90000"
  },
  {
    id: "93088",
    name: {
      nl: "Walcourt",
      fr: "Walcourt"
    },
    province: "90000"
  },
  {
    id: "93090",
    name: {
      nl: "Viroinval",
      fr: "Viroinval"
    },
    province: "90000"
  }
];

// src/territory.ts
var judicialAreas = judicial_areas_default;
var arrondissements = arrondissements_default;
var municipalities = municipalities_default;
var cantons = cantons_default;
var byId = (items) => new Map(items.map((item) => [item.id, item]));
var judicialAreasById = byId(judicialAreas);
var arrondissementsById = byId(arrondissements);
var municipalitiesById = byId(municipalities);
var cantonsById = byId(cantons);
var cantonsByMunicipality = /* @__PURE__ */ new Map();
for (const canton of cantons) {
  for (const { municipality } of canton.municipalities) {
    cantonsByMunicipality.set(municipality, [
      ..._nullishCoalesce(cantonsByMunicipality.get(municipality), () => ( [])),
      canton
    ]);
  }
}
function getJudicialArea(id) {
  return judicialAreasById.get(id);
}
function getArrondissement(id) {
  return arrondissementsById.get(id);
}
function getMunicipality(id) {
  return municipalitiesById.get(id);
}
function getCanton(id) {
  return cantonsById.get(id);
}
function getCantonsForMunicipality(id) {
  return [..._nullishCoalesce(cantonsByMunicipality.get(id), () => ( []))];
}











exports.judicialAreas = judicialAreas; exports.arrondissements = arrondissements; exports.municipalities = municipalities; exports.cantons = cantons; exports.getJudicialArea = getJudicialArea; exports.getArrondissement = getArrondissement; exports.getMunicipality = getMunicipality; exports.getCanton = getCanton; exports.getCantonsForMunicipality = getCantonsForMunicipality;
