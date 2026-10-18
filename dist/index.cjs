"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  arrondissements: () => arrondissements,
  cantons: () => cantons,
  courts: () => courts,
  findCourts: () => findCourts,
  formatCourtName: () => formatCourtName,
  getArrondissement: () => getArrondissement,
  getCanton: () => getCanton,
  getCantonsForMunicipality: () => getCantonsForMunicipality,
  getContact: () => getContact,
  getCourt: () => getCourt,
  getInterestRate: () => getInterestRate,
  getJudicialArea: () => getJudicialArea,
  getLatestKnownRateDate: () => getLatestKnownRateDate,
  getMunicipality: () => getMunicipality,
  interestRates: () => interestRates,
  judicialAreas: () => judicialAreas,
  municipalities: () => municipalities
});
module.exports = __toCommonJS(index_exports);

// data/arrondissements.json
var arrondissements_default = [
  {
    id: "Antwerp",
    name: {
      nl: "Antwerpen",
      fr: "Anvers",
      de: "Antwerpen"
    },
    judicialArea: "Antwerp"
  },
  {
    id: "Limburg",
    name: {
      nl: "Limburg",
      fr: "Limbourg",
      de: "Limburg"
    },
    judicialArea: "Antwerp"
  },
  {
    id: "Brussels",
    name: {
      nl: "Brussel",
      fr: "Bruxelles",
      de: "Br\xFCssel"
    },
    judicialArea: "Brussels"
  },
  {
    id: "Leuven",
    name: {
      nl: "Leuven",
      fr: "Louvain",
      de: "L\xF6wen"
    },
    judicialArea: "Brussels"
  },
  {
    id: "WalloonBrabant",
    name: {
      nl: "Waals-Brabant",
      fr: "Brabant wallon",
      de: "Wallonisch-Brabant"
    },
    judicialArea: "Brussels"
  },
  {
    id: "EastFlanders",
    name: {
      nl: "Oost-Vlaanderen",
      fr: "Flandre orientale",
      de: "Ostflandern"
    },
    judicialArea: "Ghent"
  },
  {
    id: "WestFlanders",
    name: {
      nl: "West-Vlaanderen",
      fr: "Flandre occidentale",
      de: "Westflandern"
    },
    judicialArea: "Ghent"
  },
  {
    id: "Liege",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge",
      de: "L\xFCttich"
    },
    judicialArea: "Liege"
  },
  {
    id: "Eupen",
    name: {
      nl: "Eupen",
      fr: "Eupen",
      de: "Eupen"
    },
    judicialArea: "Liege"
  },
  {
    id: "Luxembourg",
    name: {
      nl: "Luxemburg",
      fr: "Luxembourg",
      de: "Luxemburg"
    },
    judicialArea: "Liege"
  },
  {
    id: "Namur",
    name: {
      nl: "Namen",
      fr: "Namur",
      de: "Namur"
    },
    judicialArea: "Liege"
  },
  {
    id: "Hainaut",
    name: {
      nl: "Henegouwen",
      fr: "Hainaut",
      de: "Hennegau"
    },
    judicialArea: "Mons"
  }
];

// data/cantons.json
var cantons_default = [
  {
    id: "Antwerpen1",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Antwerpen begrensd door de middellijnen van de Brouwersvliet (onpare nummers), de Oude-Leeuwenrui (onpare nummers), de Ankerrui (onpare nummers), de Zwedenstraat (pare nummers), de Itali\xEBlei (onpare nummers), de De Keyserlei (onpare nummers), de Pelikaanstraat (pare nummers), de Gemeentestraat (onpare nummers), de Carnotstraat (onpare nummers), de Kerkstraat (onpare nummers), de Pothoekstraat (onpare nummers) en de Schijnpoortweg (onpare nummers) en het gedeelte van het grondgebied van de stad Antwerpen gelegen op de rechteroever van de Schelde ten noorden van een lijn die loopt vanaf de Scheldekaaien en het verlengde vormt van de middellijn van de Brouwersvliet, doch behoudens (1) het gedeelte van het grondgebied van de stad Antwerpen grenzende aan de deelgemeente Merksem van de Stad Antwerpen en omsloten door het Straatsburgdok, Noorderlaan (pare nummers), Ekersesteenweg tot de A12, de A12 tot verkeersknooppunt met de E19, de E19 en behoudens (2) het gedeelte van het grondgebied van de stad Antwerpen tussen de A12 en de deelgemeente Ekeren van de Stad Antwerpen",
      fr: "La partie du territoire de la ville d'Anvers d\xE9limit\xE9e par les lignes m\xE9dianes des Brouwersvliet (num\xE9ros impairs), Oude-Leeuwenrui (num\xE9ros impairs), Ankerrui (num\xE9ros impairs), Zwedenstraat (num\xE9ros pairs), Itali\xEBlei (num\xE9ros impairs), De Keyserlei (num\xE9ros impairs), Pelikanstraat (num\xE9ros pairs), Gemeentestraat (num\xE9ros impairs), Carnotstraat (num\xE9ros impairs), Kerkstraat (num\xE9ros impairs), Pothoekstraat (num\xE9ros impairs) et Schijnpoortweg (num\xE9ros impairs) et la partie du territoire de la ville d'Anvers situ\xE9e sur la rive droite de l'Escaut au nord d'une ligne partant des quais de l'Escaut et prolongeant la ligne m\xE9diane du Brouwersvliet, \xE0 l'exception, cependant, (1) de la partie du territoire de la ville d'Anvers limitrophe \xE0 l'ancienne commune de Merksem de la ville d'Anvers et entour\xE9e par le Straatsburgdok, Noorderlaan (num\xE9ros pairs), Ekersesteenweg jusqu'\xE0 l'A12, l'A12 jusqu'au croisement avec l'E19, l'E19 et \xE0 l'exception (2) de la partie du territoire de la ville d'Anvers situ\xE9e entre l'A12 et l'ancienne commune d'Ekeren de la ville d'Anvers"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.1"
  },
  {
    id: "Antwerpen2",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Antwerpen begrensd door de middellijn van de Blauwmoezelstraat, de Lijnwaadmarkt, de Korte Nieuwstraat, de Lange Nieuwstraat, de Kipdorpbrug, de Frankrijklei, de Mechelsesteenweg, de Aarschotstraat, de Teichmannstraat, de Isabella Brantstraat, de Ballaertstraat, de Pyckestraat, de Oude-Kerkstraat, de Lange Elzenstraat, de Kielsevest, de Hobokensevest, een lijn die het verlengde vormt van de middellijn van de Hobokensevest tussen nrs. 9 en 10 van de Scheldekaaien, de Scheldekaaien, een lijn die het verlengde vormt van de middellijn van de Van der Sweepstraat tussen nrs. 13a en 13b van de Scheldekaaien, de middellijn van de Van der Sweepstraat, de Vlaamse Kaai, de Kronenburgstraat, de Begijnenstraat, de Bredestraat, de Kleine-Markt, de Kammenstraat, de Oude Koornmarkt, de Quinten Matsijsdoorgang en de lijn die de verbinding vormt van de middellijn van de Quinten Matsijsdoorgang tot de middellijn van de Blauwmoezelstraat",
      fr: "La partie du territoire de la ville d'Anvers d\xE9limit\xE9e par la ligne m\xE9diane des Blauwmoezelstraat, Lijnwaadmarkt, Korte Nieuwstraat, Lange Nieuwstraat, Kipdorpbrug, Frankrijklei, Mechelsesteenweg, Aarschotstraat, Teichmannstraat, Isabella Brantstraat, Ballaertstraat, Pyckestraat, Oude-Kerkstraat, Lange Elzenstraat, Kielsevest, Hobokensevest, une ligne prolongeant la ligne m\xE9diane du Hobokensevest entre les num\xE9ros 9 et 10 des quais de l'Escaut, les quais de l'Escaut, une ligne prolongeant la ligne m\xE9diane de la Van der Sweepstraat entre les num\xE9ros 13a et 13b des quais de l'Escaut, la ligne m\xE9diane des Van der Sweepstraat, Vlaamse Kaai, Kronenburgstraat, Begijnenstraat, Bredestraat, Kleine-Markt, Kammenstraat, Oude Koornmarkt, Quinten Matsijsdoorgang et la ligne reliant la ligne m\xE9diane du Quinten Matsijsdoorgang \xE0 la ligne m\xE9diane de la Blauwmoezelstraat"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.2"
  },
  {
    id: "Antwerpen3",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeente Hoboken van de stad Antwerpen en het gedeelte van het grondgebied van de stad Antwerpen begrensd door een lijn die loopt vanaf de Scheldekaaien tussen nrs. 9 en 10 (deel Herbouvillekaai) en het verlengde vormt van de middellijn van de Hobokensevest, en door de middellijn van de Hobokensevest, de Kielsevest (oneven nummers van 1 tot 53), de Desguinlei (onpare nummers vanaf 39 tot einde), de Jan Van Rijswijcklaan (pare nummers vanaf 162 tot einde), de Boomsesteenweg (pare nummers tot aan de Jules Moretuslei), de Jules Moretuslei (vanaf Boomsesteenweg tot de Krijgsbaan), vervolgens de volledige Krijgsbaan en de Sint Bernardsesteenweg en vanaf de scheidingslijn van de deelgemeenten Wilrijk en Hoboken van de stad Antwerpen, met name vanaf de Van Praetstraat tot de Scheldekaaien",
      fr: "L'ancienne commune de Hoboken de la ville d'Anvers et la partie du territoire de la ville d'Anvers d\xE9limit\xE9e par une ligne partant des quais de l'Escaut entre les num\xE9ros 9 et 10 (partie Herbouvillekaai) et prolongeant la ligne m\xE9diane du Hobokensevest, et via la ligne m\xE9diane des Hobokensevest, Kielsevest (num\xE9ros impairs de 1 \xE0 53), Desguinlei (num\xE9ros impairs de 39 jusqu'\xE0 la fin), Jan Van Rijswijcklaan (num\xE9ros pairs de 162 jusqu'\xE0 la fin), Boomsesteenweg (num\xE9ros pairs jusqu'\xE0 la Jules Moretuslei), Jules Moretuslei (depuis Boomsesteenweg jusqu'au Krijgsbaan), puis l'entier Krijgsbaan et la Sint Bernardsesteenweg et \xE0 partir de la ligne de s\xE9paration des anciennes communes de Wilrijk et de Hoboken de la ville d'Anvers, notamment \xE0 partir de la Van Praetstraat jusqu'aux quais de l'Escaut"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.3"
  },
  {
    id: "Antwerpen4",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeente Borgerhout van de stad Antwerpen en het gedeelte van het grondgebied van de stad Antwerpen begrensd door de middellijn van de Plantijn en Moretuslei (onpare nummers), de Simonsstraat (onpare nummers), de Pelikaanstraat (onpare nummers), het Koningin Astridplein, de Gemeentestraat (pare nummers), de Carnotstraat (pare nummers), de Kerkstraat (pare nummers), de Pothoekstraat (pare nummers) en de Schijnpoortweg (pare nummers)",
      fr: "L'ancienne commune de Borgerhout de la ville d'Anvers et la partie du territoire de la ville d'Anvers d\xE9limit\xE9e par la ligne m\xE9diane des Plantijn et Moretuslei (num\xE9ros impairs), Simonsstraat (num\xE9ros impairs), Pelikaanstraat (num\xE9ros impairs), Koningin Astridplein, Gemeentestraat (num\xE9ros pairs), Carnotstraat (num\xE9ros pairs), Kerkstraat (num\xE9ros pairs), Pothoekstraat (num\xE9ros pairs) et Schijnpoortweg (num\xE9ros pairs)"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.4"
  },
  {
    id: "Antwerpen5",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Antwerpen gelegen op de linkeroever van de Schelde en het deel van het grondgebied van de stad Antwerpen (rechteroever) begrensd door een lijn die loopt vanaf de Scheldekaaien en die het verlengde vormt van de middellijn van de Brouwersvliet, de middellijn van de Brouwersvliet, de Oude-Leeuwenrui, de Ankerrui, de Zwedenstraat, de Itali\xEBlei, de Kipdorpbrug, de Lange Nieuwstraat, de Korte Nieuwstraat, de Lijnwaadmarkt, de Blauwmoezelstraat, een lijn die de verbinding vormt van de middellijn van de Blauwmoezelstraat tot de middellijn van de Quinten Matsijsdoorgang, de middellijn van de Quinten Matsijsdoorgang, de Oude-Koornmarkt, de Kammenstraat, de Kleine-Markt, de Bredestraat, de Begijnenstraat, de Kronenburgstraat, de Vlaamse kaai, de Van der Sweepstraat, een lijn die het verlengde vormt van de Van der Sweepstraat tussen nrs. 13a en 13b van de Scheldekaaien en de nrs. 13b tot 25 van de Scheldekaaien",
      fr: "La partie du territoire de la ville d'Anvers situ\xE9e sur la rive gauche de l'Escaut et la partie du territoire de la ville d'Anvers (rive droite) d\xE9limit\xE9e par une ligne partant des quais de l'Escaut et prolongeant la ligne m\xE9diane des Brouwersvliet, la ligne m\xE9diane des Brouwersvliet, Oude-Leeuwenrui, Ankerrui, Zwedenstraat, Itali\xEBlei, Kipdorpbrug, Lange Nieuwstraat, Korte Nieuwstraat, Lijnwaadmarkt, Blauwmoezelstraat, une ligne reliant la ligne m\xE9diane de la Blauwmoezelstraat \xE0 la ligne m\xE9diane du Quinten Matsijsdoorgang, la ligne m\xE9diane des Quinten Matsijsdoorgang, Oude-Koornmarkt, Kammenstraat, Kleine-Markt, Bredestraat, Begijnenstraat, Kronenburgstraat, Vlaamse kaai, Van der Sweepstraat, une ligne prolongeant la Van der Sweepstraat entre les num\xE9ros 13a et 13b des quais de l'Escaut et les num\xE9ros 13b \xE0 25 des quais de l'Escaut"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.5"
  },
  {
    id: "Antwerpen6",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Antwerpen begrensd door de middellijnen van de Generaal Lemanstraat (onpare nummers) tot aan de grens met het district Berchem, de Desguinlei (pare nummers vanaf grens district Berchem tot aan grens met 2de kanton zijnde hoek Desguinlei-Lange Elzenstraat), de Lange Elzenstraat (onpare nummers 103 tot einde), de Oudekerkstraat (onpare nummers), de Pyckestraat (onpare nummers), de Ballaarstraat (onpare nummers), de Isabella Brantstraat (onpare nummers), de Teichmannstraat (onpare nummers), de Aarschotstraat (onpare nummers), de Mechelsesteenweg (onpare nummers 3 tot en met einde - pare nummers 128 tot en met einde), de Frankrijklei (onpare nummers vanaf de hoek met Mechelsesteenweg tot de hoek met De Keyserlei), de De Keyserlei (pare nummers vanaf hoek met Frankrijklei tot de hoek met Pelikaanstraat), de Pelikaanstraat (pare nummers), de Simonsstraat (pare nummers) uitmondend in de Plantin en Moretuslei, de Plantin en Moretuslei (pare nummers) tot de grens met het district Berchem en de grens met district Borgerhout",
      fr: "La partie du territoire de la ville d'Anvers d\xE9limit\xE9e par les lignes m\xE9dianes de la Generaal Lemanstraat (num\xE9ros impairs) jusqu'\xE0 la fronti\xE8re avec le district de Berchem, Desguinlei (num\xE9ros pairs depuis la fronti\xE8re du district de Berchem jusqu'\xE0 la fronti\xE8re avec le 2\xE8me canton \xE9tant le coin du Desguinlei-Lange Elzenstraat), Lange Elzenstraat (num\xE9ros impairs du 103 jusqu'\xE0 la fin), Oudekerkstraat (num\xE9ros impairs), Pyckestraat (num\xE9ros impairs), Ballaarstraat (num\xE9ros impairs), Isabella Brantstraat (num\xE9ros impairs), Teichmannstraat (num\xE9ros impairs), Aarschotstraat (num\xE9ros impairs), Mechelsesteenweg (num\xE9ros impairs, du 3 jusqu'\xE0 la fin - num\xE9ros pairs du 128 jusqu'\xE0 la fin), Frankrijklei (num\xE9ros impairs depuis le coin avec Mechelsesteenweg jusqu'au coin avec De Keyserlei), De Keyserlei (num\xE9ros pairs depuis le coin avec Frankrijklei jusqu'au coin avec Pelikaanstraat), Pelikaanstraat (num\xE9ros pairs), Simonsstraat (num\xE9ros pairs) d\xE9bouchant sur Plantin et Moretuslei, Plantin et Moretuslei (num\xE9ros pairs) jusqu'\xE0 la fronti\xE8re avec le district de Berchem et la fronti\xE8re avec le district de Borgerhout"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.6"
  },
  {
    id: "Antwerpen7",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeente Wilrijk van de stad Antwerpen, uitgezonderd het gedeelte begrensd door de middellijn van de Jules Moretuslei tussen de Boomsesteenweg en de Krijgsbaan en de middellijn van de Jan Van Rijswijcklaan en de Boomsesteenweg, het gedeelte van het grondgebied van de stad Antwerpen begrensd in het noordwesten door de middellijn van de Jan Van Rijswijcklaan en verder door de middellijn van de Desguinlei tussen de Jan Van Rijswijcklaan en de grens van de deelgemeente Berchem van de stad Antwerpen, en het westelijke gedeelte van de deelgemeente Berchem, begrensd door de middellijn van de Singel",
      fr: "L'ancienne commune de Wilrijk de la ville d'Anvers, except\xE9 la partie d\xE9limit\xE9e par la ligne m\xE9diane de la Jules Moretuslei entre la Boomsesteenweg et la Krijgsbaan et la ligne m\xE9diane de la Jan Van Rijswijcklaan et la Boomsesteenweg, la partie du territoire de la ville d'Anvers d\xE9limit\xE9e, dans le nord-ouest, par la ligne m\xE9diane de la Jan Van Rijswijcklaan et plus loin par la ligne m\xE9diane de Desguinlei entre Jan Van Rijswijcklaan et la fronti\xE8re de l'ancienne commune de Berchem de la ville d'Anvers, et la partie ouest de l'ancienne commune de Berchem, d\xE9limit\xE9e par la ligne m\xE9diane de Singel"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.7"
  },
  {
    id: "Merksem",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      },
      {
        refnis: "11040"
      },
      {
        refnis: "11050"
      }
    ],
    territory: {
      nl: "De gemeenten Schoten, Wijnegem en de deelgemeente Merksem van de stad Antwerpen en het gebied langs Noorderlaan en omsloten door de haven in het westen, het Albertkanaal in het zuiden, de Ring en de Spoorlijn 12 Antwerpen - Lage Zwaluwe in het oosten (de grens met Merksem) en de A12 in het noorden (de wijk Rozemaai en het natuurgebied Oude Landen)",
      fr: "Les communes de Schoten, de Wijnegem et l'ancienne commune de Merksem de la ville d'Anvers et le territoire longeant Noorderlaan et entour\xE9 par le port \xE0 l'ouest, le canal Albert au sud, le Ring et la ligne de chemin de fer 12 Anvers - Lage Zwaluwe \xE0 l'est (la fronti\xE8re avec Merksem) et l'A12 au nord (le quartier Rozemaai et le domaine naturel Oude Landen)"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.8"
  },
  {
    id: "Deurne",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeenten Borsbeek en Deurne van de stad Antwerpen",
      fr: "Les anciennes communes de Borsbeek et de Deurne de la ville d'Anvers"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.9"
  },
  {
    id: "Boom",
    arrondissement: "Antwerp",
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
        refnis: "11001"
      },
      {
        refnis: "11005"
      },
      {
        refnis: "11018"
      },
      {
        refnis: "11030"
      },
      {
        refnis: "11037"
      },
      {
        refnis: "11038"
      }
    ],
    territory: {
      nl: "De gemeenten Aartselaar, Boom, Hemiksem, Niel, Rumst en Schelle",
      fr: "Les communes d'Aartselaar, de Boom, de Hemiksem, de Niel, de Rumst et de Schelle"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.10"
  },
  {
    id: "Brasschaat",
    arrondissement: "Antwerp",
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
        refnis: "11008"
      },
      {
        refnis: "11009"
      },
      {
        refnis: "11039"
      }
    ],
    territory: {
      nl: "De gemeenten Brasschaat, Brecht en Schilde",
      fr: "Les communes de Brasschaat, de Brecht et de Schilde"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.11"
  },
  {
    id: "Kapellen",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      },
      {
        refnis: "11016"
      },
      {
        refnis: "11022"
      },
      {
        refnis: "11023"
      },
      {
        refnis: "11044"
      },
      {
        refnis: "11053"
      }
    ],
    territory: {
      nl: "De gemeenten Essen, Kalmthout, Kapellen, Stabroek, Wuustwezel en de deelgemeenten Berendrecht, Lillo, Ekeren en Zandvliet van de stad Antwerpen en het gedeelte ten noorden van de A12 dat grenst aan Ekeren",
      fr: "Les communes d'Essen, de Kalmthout, de Kapellen, de Stabroek, de Wuustwezel et les anciennes communes de Berendrecht, de Lillo, de Ekeren et de Zandvliet de la ville d'Anvers et la partie au nord de l'A12 adjacente \xE0 Ekeren"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.12"
  },
  {
    id: "Kontich",
    arrondissement: "Antwerp",
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
        refnis: "11002",
        partial: true
      },
      {
        refnis: "11004"
      },
      {
        refnis: "11013"
      },
      {
        refnis: "11021"
      },
      {
        refnis: "11024"
      },
      {
        refnis: "11025"
      },
      {
        refnis: "11029"
      }
    ],
    territory: {
      nl: "De stad Mortsel, de gemeenten Boechout, Edegem, Hove, Kontich, Lint en het deel buiten de Singel van de deelgemeente Berchem van de stad Antwerpen",
      fr: "La ville de Mortsel, les communes de Boechout, d'Edegem, de Hove, de Kontich, de Lint et la partie hors de Singel de l'ancienne commune de Berchem de la ville d'Anvers"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.13"
  },
  {
    id: "Zandhoven",
    arrondissement: "Antwerp",
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
        refnis: "11035"
      },
      {
        refnis: "11052"
      },
      {
        refnis: "11054"
      },
      {
        refnis: "11055"
      },
      {
        refnis: "11057"
      }
    ],
    territory: {
      nl: "De gemeenten Malle, Ranst, Wommelgem, Zandhoven en Zoersel",
      fr: "Les communes de Malle, de Ranst, de Wommelgem, de Zandhoven et de Zoersel"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.14"
  },
  {
    id: "HeistOpDenBerg",
    arrondissement: "Antwerp",
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
        refnis: "12014"
      },
      {
        refnis: "12029"
      },
      {
        refnis: "13012"
      },
      {
        refnis: "13016"
      }
    ],
    territory: {
      nl: "De gemeenten Heist-op-den-Berg, Herenthout, Hulshout en Putte",
      fr: "Les communes de Heist-op-den-Berg, de Herenthout, de Hulshout et de Putte"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.15"
  },
  {
    id: "Lier",
    arrondissement: "Antwerp",
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
        refnis: "12002"
      },
      {
        refnis: "12009"
      },
      {
        refnis: "12021"
      },
      {
        refnis: "12026"
      }
    ],
    territory: {
      nl: "De stad Lier en de gemeenten Berlaar, Duffel en Nijlen",
      fr: "La ville de Lierre et les communes de Berlaar, de Duffel et de Nijlen"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.16"
  },
  {
    id: "Mechelen",
    arrondissement: "Antwerp",
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
        refnis: "12005"
      },
      {
        refnis: "12025"
      },
      {
        refnis: "12035"
      }
    ],
    territory: {
      nl: "De stad Mechelen en de gemeenten Bonheiden en Sint-Katelijne-Waver",
      fr: "La ville de Malines et les communes de Bonheiden et de Sint-Katelijne-Waver"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.17"
  },
  {
    id: "Willebroek",
    arrondissement: "Antwerp",
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
        refnis: "12007"
      },
      {
        refnis: "12040"
      },
      {
        refnis: "12041"
      }
    ],
    territory: {
      nl: "De gemeenten Bornem, Puurs-Sint-Amands en Willebroek",
      fr: "Les communes de Bornem, de Puurs-Sint-Amands et de Willebroek"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.18"
  },
  {
    id: "MolGeel1",
    arrondissement: "Antwerp",
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
        refnis: "13003"
      },
      {
        refnis: "13006"
      },
      {
        refnis: "13021"
      },
      {
        refnis: "13025"
      },
      {
        refnis: "13036"
      }
    ],
    territory: {
      nl: "De gemeenten Balen, Dessel, Meerhout, Mol en Retie",
      fr: "Les communes de Balen, de Dessel, de Meerhout, de Mol et de Retie"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.19"
  },
  {
    id: "MolGeel2",
    arrondissement: "Antwerp",
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
        refnis: "13008"
      },
      {
        refnis: "13017"
      }
    ],
    territory: {
      nl: "De stad Geel en de gemeente Kasterlee",
      fr: "La ville de Geel et la commune de Kasterlee"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.20"
  },
  {
    id: "Turnhout1",
    arrondissement: "Antwerp",
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
        refnis: "13023"
      },
      {
        refnis: "13040"
      },
      {
        refnis: "13046"
      }
    ],
    territory: {
      nl: "De stad Turnhout en de gemeenten Merksplas en Vosselaar",
      fr: "La ville de Turnhout et les communes de Merksplas et de Vosselaar"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.21"
  },
  {
    id: "Turnhout2",
    arrondissement: "Antwerp",
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
        refnis: "13001"
      },
      {
        refnis: "13002"
      },
      {
        refnis: "13004"
      },
      {
        refnis: "13014"
      },
      {
        refnis: "13019"
      },
      {
        refnis: "13031"
      },
      {
        refnis: "13035"
      },
      {
        refnis: "13037"
      }
    ],
    territory: {
      nl: "De stad Hoogstraten en de gemeenten Arendonk, Baarle-Hertog, Beerse, Lille, Oud-Turnhout, Ravels en Rijkevorsel",
      fr: "La ville de Hoogstraten et les communes d'Arendonk, de Baerle-Duc, de Beerse, de Lille, de Oud-Turnhout, de Ravels et de Rijkevorsel"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.22"
  },
  {
    id: "Westerlo",
    arrondissement: "Antwerp",
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
        refnis: "13010"
      },
      {
        refnis: "13011"
      },
      {
        refnis: "13013"
      },
      {
        refnis: "13029"
      },
      {
        refnis: "13044"
      },
      {
        refnis: "13049"
      },
      {
        refnis: "13053"
      }
    ],
    territory: {
      nl: "De stad Herentals en de gemeenten Grobbendonk, Herselt, Laakdal, Olen, Vorselaar en Westerlo",
      fr: "La ville de Herentals et les communes de Grobbendonk, de Herselt, de Laakdal, d'Olen, de Vorselaar et de Westerlo"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 1.23"
  },
  {
    id: "Beringen",
    arrondissement: "Limburg",
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
        refnis: "71004"
      },
      {
        refnis: "71034"
      },
      {
        refnis: "71070"
      },
      {
        refnis: "71071"
      }
    ],
    territory: {
      nl: "De stad Beringen en de gemeenten Tessenderlo-Ham, Heusden-Zolder en Leopoldsburg",
      fr: "La ville de Beringen et les communes de Tessenderlo-Ham, de Heusden-Zolder et de Bourg-Leopold"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.1"
  },
  {
    id: "Hasselt1",
    arrondissement: "Limburg",
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
        refnis: "71011"
      },
      {
        refnis: "71072",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Diepenbeek , de deelgemeente Kortessem van de stad Hasselt en het gedeelte van het grondgebied van de stad Hasselt dat gelegen is ten oosten van de middellijn van de Kempische Steenweg, Herckenrodesingel, Hendrik Van Veldekesingel, Boerenkrijgsingel en de Sint-Truidersteenweg",
      fr: "La commune de Diepenbeek , l'ancienne commune de Kortessem de la ville de Hasselt ainsi que la partie du territoire de la ville de Hasselt situ\xE9e \xE0 l'est de la ligne m\xE9diane des Kempische Steenweg, Herckenrodesingel, Hendrik Van Veldekesingel, Boerenkrijgsingel et Sint-Truidersteenweg"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.2"
  },
  {
    id: "Hasselt2",
    arrondissement: "Limburg",
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
        refnis: "71020"
      },
      {
        refnis: "71024"
      },
      {
        refnis: "71037"
      },
      {
        refnis: "71072",
        partial: true
      }
    ],
    territory: {
      nl: "De steden Halen, Herk-de-Stad, de gemeente Lummen en het gedeelte van het grondgebied van de stad Hasselt dat ligt ten westen van de middellijn van de Kempische Steenweg, de Herckenrodesingel, de Hendrik Van Veldekesingel, de Boerenkrijgsingel en de Sint-Truidersteenweg",
      fr: "Les villes de Halen, de Herck-la-Ville, la commune de Lummen et la partie du territoire de la ville de Hasselt situ\xE9e \xE0 l'ouest de la ligne m\xE9diane des Kempische Steenweg, Herckenrodesingel, Hendrik Van Veldekesingel, Boerenkrijgsingel et Sint-Truidersteenweg"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.3"
  },
  {
    id: "HouthalenHelchteren",
    arrondissement: "Limburg",
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
        refnis: "71066"
      },
      {
        refnis: "72030"
      },
      {
        refnis: "72038"
      },
      {
        refnis: "72039"
      }
    ],
    territory: {
      nl: "De stad Peer en de gemeenten Hechtel-Eksel, Houthalen-Helchteren en Zonhoven",
      fr: "La ville de Peer et les communes de Hechtel-Eksel, de Houthalen-Helchteren et de Zonhoven"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.4"
  },
  {
    id: "Pelt",
    arrondissement: "Limburg",
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
        refnis: "72020"
      },
      {
        refnis: "72037"
      },
      {
        refnis: "72043"
      }
    ],
    territory: {
      nl: "De steden Hamont-Achel, Lommel en de gemeente Pelt",
      fr: "Les villes de Hamont-Achel, de Lommel et la commune de Pelt"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.5"
  },
  {
    id: "SintTruiden",
    arrondissement: "Limburg",
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
        refnis: "71017"
      },
      {
        refnis: "71045"
      },
      {
        refnis: "71053"
      }
    ],
    territory: {
      nl: "De stad Sint-Truiden en de gemeenten Gingelom en Nieuwerkerken",
      fr: "La ville de Saint-Trond et les communes de Gingelom et de Nieuwerkerken"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.6"
  },
  {
    id: "BilzenHoeselt",
    arrondissement: "Limburg",
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
        refnis: "73066"
      },
      {
        refnis: "73110"
      }
    ],
    territory: {
      nl: "De stad Bilzen-Hoeselt en de gemeente Riemst",
      fr: "La ville de Bilzen-Hoeselt et la commune de Riemst"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.7"
  },
  {
    id: "Bree",
    arrondissement: "Limburg",
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
        refnis: "72003"
      },
      {
        refnis: "72004"
      },
      {
        refnis: "72018"
      },
      {
        refnis: "72021"
      },
      {
        refnis: "72042"
      }
    ],
    territory: {
      nl: "De steden Bree, Maaseik en de gemeenten Bocholt, Kinrooi en Oudsbergen",
      fr: "Les villes de Bree, de Maaseik et les communes de Bocholt, de Kinrooi et d'Oudsbergen"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.8"
  },
  {
    id: "Genk",
    arrondissement: "Limburg",
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
        refnis: "71002"
      },
      {
        refnis: "71016"
      },
      {
        refnis: "71067"
      }
    ],
    territory: {
      nl: "De stad Genk en de gemeenten As en Zutendaal",
      fr: "La ville de Genk et les communes d'As et de Zutendaal"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.9"
  },
  {
    id: "Maasmechelen",
    arrondissement: "Limburg",
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
        refnis: "72041"
      },
      {
        refnis: "73042"
      },
      {
        refnis: "73107"
      }
    ],
    territory: {
      nl: "De stad Dilsen-Stokkem en de gemeenten Lanaken en Maasmechelen",
      fr: "La ville de Dilsen-Stokkem et les communes de Lanaken et de Maasmechelen"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.10"
  },
  {
    id: "TongerenBorgloon",
    arrondissement: "Limburg",
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
        refnis: "73001"
      },
      {
        refnis: "73022"
      },
      {
        refnis: "73028"
      },
      {
        refnis: "73098"
      },
      {
        refnis: "73109"
      },
      {
        refnis: "73111"
      }
    ],
    territory: {
      nl: "De stad Tongeren-Borgloon en de gemeenten Alken, Heers, Herstappe, Voeren en Wellen",
      fr: "La ville de Tongres-Looz et les communes d'Alken, de Heers, de Herstappe, de Fourons et de Wellen"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 2.11"
  },
  {
    id: "BraineLAlleud",
    arrondissement: "WalloonBrabant",
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
        refnis: "25014"
      },
      {
        refnis: "25015"
      },
      {
        refnis: "25110"
      }
    ],
    territory: {
      nl: "De gemeenten Eigenbrakel, Kasteelbrakel en Waterloo",
      fr: "Les communes de Braine-l'Alleud, de Braine-le-Ch\xE2teau et de Waterloo"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 3.1"
  },
  {
    id: "Jodoigne",
    arrondissement: "WalloonBrabant",
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
        refnis: "25005"
      },
      {
        refnis: "25037"
      },
      {
        refnis: "25043"
      },
      {
        refnis: "25048"
      },
      {
        refnis: "25084"
      },
      {
        refnis: "25118"
      },
      {
        refnis: "25120"
      },
      {
        refnis: "25122"
      }
    ],
    territory: {
      nl: "De stad Geldenaken en de gemeenten Bevekom, Graven, H\xE9lecine, Incourt, Orp-Jauche, Perwijs en Ramillies",
      fr: "La ville de Jodoigne et les communes de Beauvechain, de Grez-Doiceau, de H\xE9lecine, de Incourt, d'Orp-Jauche, de Perwez et de Ramillies"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 3.2"
  },
  {
    id: "Nivelles",
    arrondissement: "WalloonBrabant",
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
        refnis: "25031"
      },
      {
        refnis: "25044"
      },
      {
        refnis: "25072"
      },
      {
        refnis: "25105"
      },
      {
        refnis: "25107"
      },
      {
        refnis: "25119"
      },
      {
        refnis: "25123"
      }
    ],
    territory: {
      nl: "De steden Genepi\xEBn, Nijvel, Tubeke en de gemeenten Itter, Lasne, Roosbeek en Villers-la-Ville",
      fr: "Les villes de Genappe, de Nivelles, de Tubize et les communes d'Ittre, de Lasne, de Rebecq et de Villers-la-Ville"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 3.3"
  },
  {
    id: "Wavre1",
    arrondissement: "WalloonBrabant",
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
        refnis: "25050"
      },
      {
        refnis: "25091"
      },
      {
        refnis: "25112"
      }
    ],
    territory: {
      nl: "De stad Waver en de gemeenten Rixensart en Terhulpen",
      fr: "La ville de Wavre et les communes de Rixensart et de La Hulpe"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 3.4"
  },
  {
    id: "Wavre2",
    arrondissement: "WalloonBrabant",
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
        refnis: "25018"
      },
      {
        refnis: "25023"
      },
      {
        refnis: "25068"
      },
      {
        refnis: "25117"
      },
      {
        refnis: "25121"
      },
      {
        refnis: "25124"
      }
    ],
    territory: {
      nl: "De stad Ottignies-Louvain-la-Neuve en de gemeenten Chastre, Chaumont-Gistoux, Court-Saint-Etienne, Mont-Saint-Guibert en Walhain",
      fr: "La ville d'Ottignies-Louvain-la-Neuve et les communes de Chastre, de Chaumont-Gistoux, de Court-Saint-Etienne, de Mont-Saint-Guibert et de Walhain"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 3.5"
  },
  {
    id: "Anderlecht1",
    arrondissement: "Brussels",
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
        refnis: "21001",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de gemeente Anderlecht gelegen ten oosten van de middellijn van de Louis Mettewielaan, de Prins van Luiklaan, de Cyriel Buyssestraat, de Edmond Delcourtstraat, de Jef Dillensquare, de de Formanoirstraat, de Veeweidestraat en de Bergensesteenweg",
      fr: "La partie du territoire de la commune d'Anderlecht situ\xE9e \xE0 l'est de la ligne m\xE9diane des boulevard Louis Mettewie, boulevard Prince de Li\xE8ge, rue Cyriel Buysse, rue Edmond Delcourt, square Jef Dillen, rue de Formanoir, rue de Veeweyde et chauss\xE9e de Mons"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.1"
  },
  {
    id: "Anderlecht2",
    arrondissement: "Brussels",
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
        refnis: "21001",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de gemeente Anderlecht gelegen ten westen van de middellijn van de Louis Mettewielaan, de Prins van Luiklaan, de Cyriel Buyssestraat, de Edmond Delcourtstraat, de Jef Dillensquare, de de Formanoirstraat, de Veeweidestraat en de Bergensesteenweg",
      fr: "La partie du territoire de la commune d'Anderlecht situ\xE9e \xE0 l'ouest de la ligne m\xE9diane des boulevard Louis Mettewie, boulevard Prince de Li\xE8ge, rue Cyriel Buysse, rue Edmond Delcourt, square Jef Dillen, rue de Formanoir, rue de Veeweyde et chauss\xE9e de Mons,"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.2"
  },
  {
    id: "Oudergem",
    arrondissement: "Brussels",
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
        refnis: "21002"
      },
      {
        refnis: "21017"
      }
    ],
    territory: {
      nl: "De gemeenten Oudergem en Watermaal-Bosvoorde",
      fr: "Les communes d'Auderghem et de Watermael-Boitsfort"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.3"
  },
  {
    id: "Brussel1",
    arrondissement: "Brussels",
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
        refnis: "21004",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brussel begrensd door de middellijnen van de Maurice Lemonnierlaan, het Fontainasplein, de Anspachlaan, de Kiekenmarkt, de Grasmarkt, de Bergstraat, de Berlaimontlaan, de Collegialestraat, de Wilde Woudstraat, Treurenberg, de Wetstraat, de Regentlaan en door de scheidingslijn tussen de stad Brussel en de gemeente Elsene vormt, samen met heel het grondgebied van de stad Brussel gelegen tussen het zuidwesten van het Louisaplein en de scheidingslijn tussen de stad Brussel en de gemeente Sint-Gillis",
      fr: "La partie du territoire de la ville de Bruxelles d\xE9limit\xE9e par les lignes m\xE9dianes des boulevard Maurice Lemonnier, place Fontainas, boulevard Anspach, rue March\xE9-aux-Poulets, rue du March\xE9-aux-Herbes, rue Montagne, boulevard Berlaimont, rue Coll\xE9giale, rue du Bois Sauvage, Treurenberg, rue de la Loi, boulevard du R\xE9gent et par la ligne de s\xE9paration entre la ville de Bruxelles et la commune d'Ixelles et l'ensemble du territoire de la ville de Bruxelles situ\xE9 entre le sud-est de la place Louise et la ligne de s\xE9paration entre la ville de Bruxelles et la commune de Saint-Gilles"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.4"
  },
  {
    id: "Brussel2",
    arrondissement: "Brussels",
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
        refnis: "21004",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brussel begrensd door de middellijnen van het Saincteletteplein, de Sainctelettesquare, het IJzerplein en de lijn die de Antwerpselaan van de Boudewijnlaan scheidt tot de middellijn van de Adolphe Maxlaan, de scheidingslijn tussen de stad Brussel en de gemeente Sint-Joost-ten-Node, de scheidingslijn tussen de stad Brussel en de gemeente Schaarbeek, de scheidingslijn tussen de stad Brussel en de gemeente Etterbeek, de scheidingslijn tussen de stad Brussel en de gemeente Elsene en de middellijnen van de Regentlaan, de Wetstraat, het deel van de Koningsstraat tot aan Treurenberg, Treurenberg, de Wilde Woudstraat, de Collegialestraat, de Berlaimontlaan, de Bergstraat, de Grasmarkt, de Kiekenmarkt, de Anspachlaan, het Fontainasplein en de Maurice Lemonnierlaan tot aan de grens van de stad Brussel",
      fr: "La partie du territoire de la ville de Bruxelles d\xE9limit\xE9e par les lignes m\xE9dianes des place Sainctelette, square Sainctelette, place de l'Yser et la ligne qui s\xE9pare le boulevard d'Anvers du boulevard Baudouin jusqu'\xE0 la ligne m\xE9diane du boulevard Adolphe Max, la ligne de s\xE9paration entre la ville de Bruxelles et la commune de Saint-Josse-ten-Noode, la ligne de s\xE9paration entre la ville de Bruxelles et la commune de Schaerbeek, la ligne de s\xE9paration entre la ville de Bruxelles et la commune d'Etterbeek, la ligne de s\xE9paration entre la ville de Bruxelles et la commune d'Ixelles et les lignes m\xE9dianes du boulevard du R\xE9gent, de la rue de la Loi, de la partie de la rue Royale jusqu'au Treurenberg, les Treurenberg, rue du Bois Sauvage, rue Coll\xE9giale, avenue Berlaimont, rue Montagne, rue du March\xE9-aux-Herbes, rue du March\xE9-aux-Poulets, boulevard Anspach, place Fontainas et boulevard Maurice Lemonnier jusqu'aux limites de la ville de Bruxelles"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.5"
  },
  {
    id: "Brussel3",
    arrondissement: "Brussels",
    name: {
      nl: "Brussel",
      fr: "judicaire de Bruxelles"
    },
    number: 3,
    seat: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    municipalities: [
      {
        refnis: "21004",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brussel begrensd ten oosten door de middellijn van het Saincteletteplein, de Willebroekse vaart, de van Praetbrug, de Jules van Praetlaan en de Meiselaan",
      fr: "La partie du territoire de la ville de Bruxelles d\xE9limit\xE9e \xE0 l'est par la ligne m\xE9diane de la place Sainctelette, du canal de Willebroek, du pont van Praet, de l'avenue Jules van Praet et de l'avenue de Meysse"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.6"
  },
  {
    id: "Brussel4",
    arrondissement: "Brussels",
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
        refnis: "21004",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brussel begrensd ten westen door de middellijn van het Saincteletteplein, de Willebroekse vaart, de van Praetbrug, de Jules van Praetlaan en de Meiselaan, ten zuiden door de middellijn van het Saincteletteplein, de Sainctelettesquare, het IJzerplein en door de lijn die de scheiding vormt tussen de Antwerpselaan en de Boudewijnlaan",
      fr: "La partie du territoire de la ville de Bruxelles d\xE9limit\xE9e \xE0 l'ouest par la ligne m\xE9diane de la place Sainctelette, du canal de Willebroek, du pont van Praet, de l'avenue Jules van Praet et de l'avenue de Meysse, au sud par la ligne m\xE9diane de la place Sainctelette, du square Sainctelette, de la place de l'Yser et par la ligne de s\xE9paration entre le boulevard d'Anvers et le boulevard Baudouin"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.7"
  },
  {
    id: "Etterbeek",
    arrondissement: "Brussels",
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
        refnis: "21005"
      }
    ],
    territory: {
      nl: "De gemeente Etterbeek",
      fr: "La commune d'Etterbeek"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.8"
  },
  {
    id: "Vorst",
    arrondissement: "Brussels",
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
        refnis: "21007"
      }
    ],
    territory: {
      nl: "De gemeente Vorst",
      fr: "La commune de Forest"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.9"
  },
  {
    id: "Elsene",
    arrondissement: "Brussels",
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
        refnis: "21009"
      }
    ],
    territory: {
      nl: "De gemeente Elsene",
      fr: "La commune d'Ixelles"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.10"
  },
  {
    id: "Ganshoren",
    arrondissement: "Brussels",
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
        refnis: "21003"
      },
      {
        refnis: "21008"
      },
      {
        refnis: "21011"
      }
    ],
    territory: {
      nl: "De gemeenten Sint-Agatha-Berchem, Ganshoren en Koekelberg",
      fr: "Les communes de Berchem-Sainte-Agathe, de Ganshoren et de Koekelberg"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.11"
  },
  {
    id: "Jette",
    arrondissement: "Brussels",
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
        refnis: "21010"
      }
    ],
    territory: {
      nl: "De gemeente Jette",
      fr: "La commune de Jette"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.12"
  },
  {
    id: "SintJansMolenbeek",
    arrondissement: "Brussels",
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
        refnis: "21012"
      }
    ],
    territory: {
      nl: "De gemeente Sint-Jans-Molenbeek",
      fr: "La commune de Molenbeek-Saint-Jean"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.13"
  },
  {
    id: "SintGillis",
    arrondissement: "Brussels",
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
        refnis: "21013"
      }
    ],
    territory: {
      nl: "De gemeente Sint-Gillis",
      fr: "La commune de Saint-Gilles"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.14"
  },
  {
    id: "SintJoostTenNode",
    arrondissement: "Brussels",
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
        refnis: "21006"
      },
      {
        refnis: "21014"
      }
    ],
    territory: {
      nl: "De gemeenten Evere en Sint-Joost-ten-Node",
      fr: "Les communes d'Evere et de Saint-Josse-ten-Noode"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.15"
  },
  {
    id: "Schaarbeek1",
    arrondissement: "Brussels",
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
        refnis: "21015",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de gemeente Schaarbeek gelegen links van de middellijn van de Paviljoenstraat, de Vleugelsstraat, de Jeruzalemstraat, de Azalealaan, de Ernest Cambierlaan, de Leuvense Steenweg, van het Generaal Meiserplein tot aan de grens met de gemeente Sint-Joost-ten-Node",
      fr: "La partie du territoire de la commune de Schaerbeek situ\xE9e \xE0 gauche des lignes m\xE9dianes des rue du Pavillon, rue des Ailes, rue de J\xE9rusalem, avenue des Azal\xE9es, avenue Ernest Cambier, chauss\xE9e de Louvain, de la place G\xE9n\xE9ral Meiser jusqu'\xE0 la fronti\xE8re avec la commune de Saint-Josse-ten-Noode"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.16"
  },
  {
    id: "Schaarbeek2",
    arrondissement: "Brussels",
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
        refnis: "21015",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de gemeente Schaarbeek gelegen rechts van de middellijn van de Paviljoenstraat, de Vleugelsstraat, de Jeruzalemstraat, de Azalealaan, de Ernest Cambierlaan, de Leuvense Steenweg, van het Generaal Meiserplein tot aan de grens met de gemeente Sint-Joost-ten-Node",
      fr: "La partie du territoire de la commune de Schaerbeek situ\xE9e \xE0 droite des lignes m\xE9dianes des rue du Pavillon, rue des Ailes, rue de J\xE9rusalem, avenue des Azal\xE9es, avenue Ernest Cambier, chauss\xE9e de Louvain, de la place G\xE9n\xE9ral Meiser jusqu'\xE0 la fronti\xE8re avec la commune de Saint-Josse-ten-Noode"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.17"
  },
  {
    id: "Ukkel",
    arrondissement: "Brussels",
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
        refnis: "21016"
      }
    ],
    territory: {
      nl: "De gemeente Ukkel",
      fr: "La commune d'Uccle"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.18"
  },
  {
    id: "SintPietersWoluwe",
    arrondissement: "Brussels",
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
        refnis: "21018"
      },
      {
        refnis: "21019"
      }
    ],
    territory: {
      nl: "De gemeenten Sint-Lambrechts-Woluwe en Sint-Pieters-Woluwe",
      fr: "Les communes de Woluw\xE9-Saint-Lambert et de Woluw\xE9-Saint-Pierre"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 4.19"
  },
  {
    id: "Asse",
    arrondissement: "Brussels",
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
        refnis: "23002"
      },
      {
        refnis: "23052"
      },
      {
        refnis: "23060"
      },
      {
        refnis: "23086"
      },
      {
        refnis: "23105"
      }
    ],
    territory: {
      nl: "De gemeenten Affligem, Asse, Merchtem, Opwijk en Ternat",
      fr: "Les communes d'Affligem, d'Asse, de Merchtem, d'Opwijk et de Ternat"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.1"
  },
  {
    id: "Halle",
    arrondissement: "Brussels",
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
        refnis: "23003"
      },
      {
        refnis: "23027"
      },
      {
        refnis: "23064"
      },
      {
        refnis: "23077"
      }
    ],
    territory: {
      nl: "De stad Halle en de gemeenten Beersel, Pepingen en Sint-Pieters-Leeuw",
      fr: "La ville de Hal et les communes de Beersel, de Pepingen et de Leeuw-Saint-Pierre"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.2"
  },
  {
    id: "SintGenesiusRode",
    arrondissement: "Brussels",
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
        refnis: "23098"
      },
      {
        refnis: "23099"
      },
      {
        refnis: "23100"
      },
      {
        refnis: "23101"
      },
      {
        refnis: "23103"
      }
    ],
    territory: {
      nl: "De gemeenten Drogenbos, Kraainem, Linkebeek, Sint-Genesius-Rode en Wezembeek-Oppem",
      fr: "Les communes de Drogenbos, de Kraainem, de Linkebeek, de Rhode-Saint-Gen\xE8se et de Wezembeek-Oppem"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.3"
  },
  {
    id: "Lennik",
    arrondissement: "Brussels",
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
        refnis: "23009"
      },
      {
        refnis: "23016"
      },
      {
        refnis: "23044"
      },
      {
        refnis: "23097"
      },
      {
        refnis: "23104"
      },
      {
        refnis: "23106"
      }
    ],
    territory: {
      nl: "De gemeenten Bever, Dilbeek, Pajottegem, Lennik, Liedekerke en Roosdaal",
      fr: "Les communes de Bi\xE9v\xE8ne, de Dilbeek, de Pajottegem, de Lennik, de Liedekerke et de Roosdaal"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.4"
  },
  {
    id: "Meise",
    arrondissement: "Brussels",
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
        refnis: "23025"
      },
      {
        refnis: "23039"
      },
      {
        refnis: "23045"
      },
      {
        refnis: "23050"
      },
      {
        refnis: "23102"
      }
    ],
    territory: {
      nl: "De gemeenten Grimbergen, Kapelle-op-den-Bos, Londerzeel, Meise en Wemmel",
      fr: "Les communes de Grimbergen, de Kapelle-op-den-Bos, de Londerzeel, de Meise et de Wemmel"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.5"
  },
  {
    id: "Zaventem",
    arrondissement: "Brussels",
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
        refnis: "23033"
      },
      {
        refnis: "23062"
      },
      {
        refnis: "23081"
      },
      {
        refnis: "23094"
      }
    ],
    territory: {
      nl: "De gemeenten Hoeilaart, Overijse, Steenokkerzeel en Zaventem",
      fr: "Les communes de Hoeilaart, de Overijse, de Steenokkerzeel et de Zaventem"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.6"
  },
  {
    id: "Vilvoorde",
    arrondissement: "Brussels",
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
        refnis: "23038"
      },
      {
        refnis: "23047"
      },
      {
        refnis: "23088"
      },
      {
        refnis: "23096"
      }
    ],
    territory: {
      nl: "De stad Vilvoorde en de gemeenten Kampenhout, Machelen en Zemst",
      fr: "La ville de Vilvorde et les communes de Kampenhout, de Machelen et de Zemst"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.7"
  },
  {
    id: "Aarschot",
    arrondissement: "Leuven",
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
        refnis: "24001"
      },
      {
        refnis: "24007"
      },
      {
        refnis: "24014"
      },
      {
        refnis: "24033"
      },
      {
        refnis: "24048"
      },
      {
        refnis: "24094"
      },
      {
        refnis: "24109"
      }
    ],
    territory: {
      nl: "De stad Aarschot en de gemeenten Begijnendijk, Boortmeerbeek, Haacht, Keerbergen, Rotselaar en Tremelo",
      fr: "La ville d'Aarschot et les communes de Begijnendijk, de Boortmeerbeek, de Haacht, de Keerbergen, de Rotselaar et de Tremelo"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.9"
  },
  {
    id: "Diest",
    arrondissement: "Leuven",
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
        refnis: "24008"
      },
      {
        refnis: "24020"
      },
      {
        refnis: "24134"
      },
      {
        refnis: "24135"
      }
    ],
    territory: {
      nl: "De steden Diest, Scherpenheuvel-Zichem en de gemeenten Bekkevoort en Tielt-Winge",
      fr: "Les villes de Diest, de Montaigu-Zichem et les communes de Bekkevoort et de Tielt-Winge"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.10"
  },
  {
    id: "Zoutleeuw",
    arrondissement: "Leuven",
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
        refnis: "24028"
      },
      {
        refnis: "24054"
      },
      {
        refnis: "24059"
      },
      {
        refnis: "24130"
      },
      {
        refnis: "24133"
      },
      {
        refnis: "24137"
      }
    ],
    territory: {
      nl: "De steden Landen, Zoutleeuw en de gemeenten Glabbeek, Geetbets, Kortenaken en Linter",
      fr: "Les villes de Landen, de L\xE9au et les communes de Glabbeek, de Geetbets, de Kortenaken et de Linter"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.11"
  },
  {
    id: "Leuven1",
    arrondissement: "Leuven",
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
        refnis: "24038"
      },
      {
        refnis: "24055"
      },
      {
        refnis: "24062",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeenten Herent, Kortenberg en het gedeelte van het grondgebied van de stad Leuven gelegen ten noorden van de lijn die het verlengde vormt van de middellijn van de Diestsestraat en de Diestsesteenweg tot de grens van de stad Leuven; van de middellijn van de Diestsestraat en de Diestsesteenweg, een lijn die de verbinding vormt tussen de middellijn van de Diestsestraat en de Diestsesteenweg tot de middellijn van de Grote Markt en de de middellijnen van de Grote markt, Brusselsestraat en de Brusselsesteenweg tot de grens van de stad Leuven",
      fr: "Les communes de Herent, de Kortenberg et la partie du territoire de la ville de Louvain situ\xE9e au nord de la ligne qui constitue le prolongement de la m\xE9diane de la Diestsestraat et de la Diestsesteenweg jusqu'\xE0 la limite de la ville de Louvain; de la m\xE9diane de la Diestsestraat et de la Diestsesteenweg, une ligne qui forme la jonction entre la m\xE9diane de la Diestsestraat et de la Diestsesteenweg jusqu'\xE0 la m\xE9diane du Grote Markt et les m\xE9dianes du Grote Markt, de la Brusselsestraat et de la Brusselsesteenweg jusqu'\xE0 la limite de la ville de Louvain"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.12"
  },
  {
    id: "Leuven2",
    arrondissement: "Leuven",
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
        refnis: "24011"
      },
      {
        refnis: "24043"
      },
      {
        refnis: "24062",
        partial: true
      },
      {
        refnis: "24086"
      }
    ],
    territory: {
      nl: "De gemeenten Bierbeek, Holsbeek, Oud-Heverlee en het gedeelte van het grondgebied van de stad Leuven gelegen ten zuiden van de lijn die het verlengde vormt van de middellijnen van de Diestsestraat en de Diestsesteenweg tot de grens van de stad Leuven; van de middellijn van de Diestsestraat en de Diestsesteenweg, een lijn die de verbinding vormt tussen de middellijn van de Diestsestraat en de Diestsesteenweg tot de middellijn van de Grote Markt en de Naamsestraat ten oosten van de Grote Markt en de Naamsesteenweg tot de grens van de stad Leuven",
      fr: "Les communes de Bierbeek, de Holsbeek, de Oud-Heverlee et la partie du territoire de la ville de Louvain situ\xE9e au sud de la ligne qui constitue le prolongement des lignes m\xE9dianes de la Diestsestraat et de la Diestsesteenweg jusqu'\xE0 la limite de la ville de Louvain; de la m\xE9diane de la Diestsestraat et de la Diestsesteenweg, une ligne qui forme la jonction entre la m\xE9diane de la Diestsestraat et de la Diestsesteenweg jusqu'\xE0 la m\xE9diane du Grote Markt et de la Naamsestraat \xE0 l'est du Grote Markt, et de la Naamsesteenweg jusqu'\xE0 la limite de la ville de Louvain"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.13"
  },
  {
    id: "Leuven3",
    arrondissement: "Leuven",
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
        refnis: "24009"
      },
      {
        refnis: "24045"
      },
      {
        refnis: "24062",
        partial: true
      },
      {
        refnis: "24104"
      }
    ],
    territory: {
      nl: "De gemeenten Bertem, Huldenberg, Tervuren, en het gedeelte van het grondgebied van de stad Leuven gelegen ten zuiden van de lijn die de verbinding vormt van de lijn die het verlengde vormt van de middellijn van de Brusselsestraat en de Brusselsesteenweg tot de grens van de stad Leuven ten westen van de middellijnen van de Naamsestraat en de Naamsesteenweg en de middellijn van de Grote Markt tot aan de grens van de stad Leuven",
      fr: "Les communes de Bertem, de Huldenberg, de Tervuren et la partie du territoire de la ville de Louvain situ\xE9e au sud de la ligne qui forme la jonction de la ligne qui constitue le prolongement de la m\xE9diane de la Brusselsestraat et de la Brusselsesteenweg jusqu'\xE0 la limite de la ville de Louvain et \xE0 l'ouest des m\xE9dianes de la Naamsestraat et de la Naamsesteenweg et de la m\xE9diane du Grote Markt jusqu'\xE0 la limite de la ville de Louvain,"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.14"
  },
  {
    id: "Tienen",
    arrondissement: "Leuven",
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
        refnis: "24016"
      },
      {
        refnis: "24041"
      },
      {
        refnis: "24066"
      },
      {
        refnis: "24107"
      }
    ],
    territory: {
      nl: "De stad Tienen en de gemeenten Boutersem, Hoegaarden en Lubbeek",
      fr: "La ville de Tirlemont et les communes de Boutersem, de Hoegaarden et de Lubbeek"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 5.15"
  },
  {
    id: "Aalst1",
    arrondissement: "EastFlanders",
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
        refnis: "41002",
        partial: true
      },
      {
        refnis: "41082"
      }
    ],
    territory: {
      nl: "De gemeente Erpe-Mere, het gedeelte van het grondgebied van de stad Aalst ten westen van de Dender en de deelgemeente Nieuwerkerken van de stad Aalst",
      fr: "La commune d'Erpe-Mere, la partie du territoire de la ville d'Alost situ\xE9e \xE0 l'ouest de la Dendre et l'ancienne commune de Nieuwerkerken de la ville d'Alost"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.1"
  },
  {
    id: "Aalst2",
    arrondissement: "EastFlanders",
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
        refnis: "41002",
        partial: true
      },
      {
        refnis: "41034"
      }
    ],
    territory: {
      nl: "De gemeente Lede, het gedeelte van het grondgebied van de stad Aalst ten oosten van de Dender en de deelgemeenten Baardegem, Erembodegem, Gijzegem, Herdersem, Hofstade, Meldert en Moorsel van de stad Aalst",
      fr: "La commune de Lede, la partie du territoire de la ville d'Alost situ\xE9e \xE0 l'est de la Dendre et les anciennes communes de Baardegem, de Erembodegem, de Gijzegem, de Herdersem, de Hofstade, de Meldert et de Moorsel de la ville d'Alost"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.2"
  },
  {
    id: "BeverenKruibekeZwijndrecht",
    arrondissement: "EastFlanders",
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
        refnis: "46020"
      },
      {
        refnis: "46030"
      }
    ],
    territory: {
      nl: "De gemeenten Beveren-Kruibeke-Zwijndrecht en Sint-Gillis-Waas",
      fr: "Les communes de Beveren-Kruibeke-Zwijndrecht et de Sint-Gillis-Waas"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.3"
  },
  {
    id: "Dendermonde",
    arrondissement: "EastFlanders",
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
        refnis: "42004"
      },
      {
        refnis: "42006"
      },
      {
        refnis: "42011"
      }
    ],
    territory: {
      nl: "De stad Dendermonde en de gemeenten Buggenhout en Lebbeke",
      fr: "La ville de Termonde et les communes de Buggenhout et de Lebbeke"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.4"
  },
  {
    id: "Hamme",
    arrondissement: "EastFlanders",
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
        refnis: "42008"
      },
      {
        refnis: "42023"
      },
      {
        refnis: "42028"
      },
      {
        refnis: "46025"
      }
    ],
    territory: {
      nl: "De gemeenten Hamme, Temse, Waasmunster en Zele",
      fr: "Les communes de Hamme, de Tamise, de Waasmunster et de Zele"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.5"
  },
  {
    id: "Lokeren",
    arrondissement: "EastFlanders",
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
        refnis: "46024"
      },
      {
        refnis: "46029"
      }
    ],
    territory: {
      nl: "De stad Lokeren , de deelgemeente Moerbeke van de stad Lokeren en de gemeente Stekene",
      fr: "La ville de Lokeren , l'ancienne commune de Moerbeke de la Ville de Lokeren et la commune de Stekene"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.6"
  },
  {
    id: "Ninove",
    arrondissement: "EastFlanders",
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
        refnis: "41011"
      },
      {
        refnis: "41024"
      },
      {
        refnis: "41048"
      }
    ],
    territory: {
      nl: "De stad Ninove en de gemeenten Denderleeuw en Haaltert",
      fr: "La ville de Ninove et les communes de Denderleeuw et de Haaltert"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.7"
  },
  {
    id: "SintNiklaas",
    arrondissement: "EastFlanders",
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
        refnis: "46021"
      }
    ],
    territory: {
      nl: "De stad Sint-Niklaas",
      fr: "La ville de Saint-Nicolas"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.8"
  },
  {
    id: "Wetteren",
    arrondissement: "EastFlanders",
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
        refnis: "42003"
      },
      {
        refnis: "42010"
      },
      {
        refnis: "42025"
      },
      {
        refnis: "42026"
      }
    ],
    territory: {
      nl: "De gemeenten Berlare, Laarne, Wetteren en Wichelen",
      fr: "Les communes de Berlare, de Laarne, de Wetteren et de Wichelen"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.9"
  },
  {
    id: "Deinze",
    arrondissement: "EastFlanders",
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
        refnis: "44081"
      },
      {
        refnis: "44083"
      },
      {
        refnis: "44084"
      }
    ],
    territory: {
      nl: "De stad Deinze en de gemeenten Aalter en Zulte",
      fr: "La ville de Deinze et les communes de Aalter et de Zulte"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.10"
  },
  {
    id: "Eeklo",
    arrondissement: "EastFlanders",
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
        refnis: "43005"
      },
      {
        refnis: "43007"
      },
      {
        refnis: "43010"
      },
      {
        refnis: "43014"
      },
      {
        refnis: "44085"
      }
    ],
    territory: {
      nl: "De stad Eeklo en de gemeenten Kaprijke, Lievegem, Maldegem en Sint-Laureins",
      fr: "La ville d'Eeklo et les communes de Kaprijke, de Lievegem, de Maldegem et de Sint-Laureins"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.11"
  },
  {
    id: "Gent1",
    arrondissement: "EastFlanders",
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
        refnis: "44021",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Gent beginnend onder de torens van het Rabot, het kanaal de Lieve tot aan de Lievebrug, de middellijn van de Lievestraat, de middellijn van de Lange Steenstraat, de middellijn van de Grauwpoort tot aan het Sluizeken, de middellijn van het Sluizeken tot tegen de Achterleie, de zuidelijke grens van Achterleie tot aan de Leie, de Leie langs de Achterleie, de Leie tot aan de Slachthuisbrug, de Slachthuisbrug tot het kruispunt met de Koepoortkaai, de Koepoortkaai, de Filips Van Artveldestraat tot aan het Sint-Annaplein, de noordelijke grens van het Sint-Annaplein, de middellijnen van de Brabantdam tot aan de kruising met de Kortedagsteeg, de middellijn van de Kortedagsteeg, de middellijn van de Walpoortstraat, de middellijn van de Sint-Pietersnieuwstraat, het deel van het Sint-Pietersplein dat de verbinding vormt tussen de Sint-Pietersnieuwstraat en de Overpoortstraat, de middellijn van de Overpoortstraat, de middellijn van de Normaalschoolstraat, de middellijn van de Ottergemsesteenweg tot aan de spoorweglijn onmiddellijk ten zuiden van de Burggravenlaan, de spoorweg in oostelijke richting tot aan de Schelde en verder de Schelde in zuidelijke richting tot aan de Ringvaart, dan van de Ringvaart in noordwestelijke richting tot aan de Maaltebrug/kruising met de Kortrijksesteenweg, de zuidelijke grens van de Kortrijksesteenweg tot aan De Sterre - kruising N60/N43 met de Voskenslaan, de oostelijke grens van de Voskenslaan, de noordoostelijke grens van de Sint-Denijslaan volgend tot aan het kruispunt met de Valentin Vaerewyckweg, verder volgend noordelijk naar de parking Gent Sint-Pietersstation tot aan de kruising met de Koningin Fabiolalaan, de noordoostelijke grens van de Koningin Fabiolalaan over de kruising met de Gordunakaai tot aan de Ringvaart in zuidoostelijke richting, de Leie in noordelijke richting langs de Gordunakaai tot aan de splitsing ter hoogte van Aan De Bocht, met verder als grens de Leie in noordelijke richting langs Aan de Bocht, langs de Belv\xE9d\xE8reweg, langs de Constant Dosscheweg, verder noordelijk langs de Leie tot aan de kruising van de Leie met Einde Were, de zuidelijke grens van Einde Were tot aan de kruising met Overzet en Nieuwe Wandeling, de noordelijke grens van de Nieuwe Wandeling, de middellijn van de Contributiestraat en de middellijn van de Begijnhoflaan tot aan de torens aan het Rabot",
      fr: "La partie du territoire de la ville de Gand d\xE9butant sous les tours du Rabot, le canal de Lieve jusqu'au Lievebrug, la ligne m\xE9diane de la Lievestraat, la ligne m\xE9diane de la Lange Steenstraat, la ligne m\xE9diane du Grauwpoort jusqu'au Sluizeken, la ligne m\xE9diane du Sluizeken jusqu'\xE0 l'Achterleie, la fronti\xE8re sud de l'Achterleie jusqu'\xE0 la Lys, la Lys le long de l'Achterleie, la Lys jusqu'au Slachthuisbrug, le Slachthuisbrug jusqu'au croisement avec le Koepoortkaai, le Koepoortkaai, la Filips Van Artveldestraat jusqu'\xE0 Sint-Annaplein, la fronti\xE8re nord de la Sint-Annaplein, la ligne m\xE9diane de Brabantdam jusqu'au croisement avec le Kortedagsteeg, la ligne m\xE9diane du Kortedagsteeg, la ligne m\xE9diane de la Walpoortstraat, la ligne m\xE9diane de la Sint-Pietersnieuwstraat, la partie de la Sint-Pietersplein reliant la Sint-Pietersnieuwstraat \xE0 l'Overpoortstraat, la ligne m\xE9diane de l'Overpoortstraat, la ligne m\xE9diane de la Normaalschoolstraat, la ligne m\xE9diane de l'Ottergemsesteenweg jusqu\xE0 la ligne de chemin de fer imm\xE9diatement au sud de la Burggravenlaan, la ligne de chemin de fer en direction de l'est vers l'Escaut et apr\xE8s l'Escaut en direction du sud vers le Ringvaart, puis du Ringvaart en direction du nord-ouest jusqu'au Maaltebrug/croisement avec la Kortrijksesteenweg, la limite sud de la Kortrijksesteenweg jusqu'\xE0 De Sterre - croisement N60/N43 avec la Voskenslaan, la limite est de la Voskenslaan, la limite nord-est de la Sint-Denijslaan jusqu'au carrefour avec la Valentin Vaerewyckweg, puis en direction du nord vers le parking de la gare de Gand Saint-Pierre jusqu'au croisement avec la Koningin Fabiolalaan, la limite nord-est de la Koningin Fabiolalaan au croisement avec le Gordunakaai jusqu'au Ringvaart en direction du sud-est, la Lys en direction du nord le long du Gordunakaai jusqu'\xE0 la s\xE9paration \xE0 hauteur de Aan De Bocht, avec comme limite ensuite la Lys en direction du nord le long d'Aan De Bocht, le long de la Belv\xE9d\xE8reweg, le long de la Constant Dosscheweg, puis en direction du nord le long de la Lys jusqu'au croisement de la Lys avec l'Einde Were, la limite sud de l'Einde Were jusqu'au croisement avec l'Overzet et la Nieuwe Wandeling, la limite nord de la Nieuwe Wandeling, la ligne m\xE9diane de la Contributiestraat et la ligne m\xE9diane de la Begijnhoflaan jusqu'aux tours du Rabot"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.12"
  },
  {
    id: "Gent2",
    arrondissement: "EastFlanders",
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
        refnis: "44021",
        partial: true
      },
      {
        refnis: "44064"
      },
      {
        refnis: "44086"
      }
    ],
    territory: {
      nl: "De gemeenten Sint-Martens-Latem en Nazareth-De Pinte, de deelgemeenten Drongen, Zwijnaarde, Sint-Denijs-Westrem en Afsnee en het gedeelte van het grondgebied van de stad Gent beginnend aan de grens met de gemeente Lovendegem aan het kanaal Gent-Oostende, verder zuidelijk tot aan de Contributiebrug, de noordwestelijke grens van de Nieuwe Wandeling tot aan de kruising met Einde Were, de zuidelijke grens van Einde Were tot aan de kruising met de Leie, met verder als grens de Leie in zuidelijke richting, langs de Constant Dosscheweg, langs de Belv\xE9d\xE8reweg, langs Aan de Bocht tot aan het kruispunt van de Gordunakaai met de Koningin Fabiolalaan en vanaf daar, de noordoostelijke grens van de Koningin Fabiolalaan tot aan en zuidelijk over de parking Gent Sint-Pietersstation, de noordoostelijke grens van de Sint-Denijslaan volgend, langs de oostelijke grens van de Voskenslaan tot aan De Sterre (kruising Voskenslaan met N60/N43), de zuidelijke grens van de Kortrijksesteenweg tot aan de Ringvaart in zuidoostelijke richting tot aan de grens met de gemeente Merelbeke-Melle",
      fr: "Les communes de Sint-Martens-Latem et de Nazareth-De Pinte, les anciennes communes de Drongen, de Zwijnaarde, de Sint-Denijs-Westrem et de Afsnee et la partie de la ville de Gand d\xE9butant \xE0 la limite avec la commune de Lovendegem au canal Gand-Ostende, ensuite en direction du sud jusqu'au Contributiebrug, la limite nord-ouest de la Nieuwe Wandeling jusqu'au croisement avec l'Einde Were, la limite sud de l'Einde Were jusqu'au croisement avec la Lys, avec ensuite comme limite la Lys en direction du sud, le long de la Constant Dosscheweg, le long de la Belv\xE9d\xE8reweg, le long de l'Aan de Bocht jusqu'au croisement du Gordunakaai avec la Koningin Fabiolalaan et de l\xE0, la limite nord-est de la Koningin Fabiolalaan jusque et au sud du parking de la gare de Gand Saint-Pierre, la limite nord-est de la Sint-Denijslaan suivant, le long de la limite est de la Voskenslaan jusqu'\xE0 De Sterre (croisement Voskenslaan avec N60/N43), la limite sud de la Kortrijksesteenweg jusqu'au Ringvaart en direction du sud-est jusqu'\xE0 la limite avec la commune de Merelbeke-Melle"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.13"
  },
  {
    id: "Gent3",
    arrondissement: "EastFlanders",
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
        refnis: "44021",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeente Mariakerke, het gedeelte van het grondgebied van de stad Gent dat begint aan de Ringvaart en de grens tussen de deelgemeente Mariakerke en Wondelgem, de grens tussen de deelgemeente Mariakerke en Wondelgem in zuidelijke richting tot aan het fietspad langs de Zandstraat, het fietspad in westelijke richting tot aan het kanaal Gent-Oostende, het kanaal Gent-Oostende in zuidelijke richting tot aan het Verbindingskanaal, dan het Verbindingskanaal, het Tolhuisdok, de Voorhaven en het kanaal Gent-Terneuzen in noordelijke richting tot aan de grens met de gemeente Zelzate en vervolgens de grens met de gemeente Zelzate in westelijke richting tot aan de grens met de gemeente Evergem",
      fr: "L'ancienne commune de Mariakerke, la partie du territoire de la ville de Gand d\xE9butant au Ringvaart et la limite entre l'ancienne commune de Mariakerke et Wondelgem, la limite entre l'ancienne commune de Mariakerke et Wondelgem en direction du sud jusqu'\xE0 la piste cyclable le long de la Zandstraat, la piste cyclable en direction de l'ouest jusqu'au canal Gand-Ostende, le canal Gand-Ostende en direction du sud jusqu'au Verbindingskanaal, ensuite le Verbindingskanaal, le Tolhuisdok, le Voorhaven et le canal Gand-Terneuzen en direction du nord jusqu'\xE0 la limite avec la commune de Zelzate et ensuite la limite avec la commune de Zelzate en direction de l'ouest jusqu'\xE0 la limite avec la commune d'Evergem"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.14"
  },
  {
    id: "Gent4",
    arrondissement: "EastFlanders",
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
        refnis: "44021",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Gent dat begint aan de grens met de gemeente Zelzate, het kanaal Gent-Terneuzen in zuidelijke richting, de Voorhaven, het Tolhuisdok en het Verbindingskanaal tot aan het kanaal Gent-Oostende, het kanaal Gent-Oostende zuidelijk tot aan de Contributiebrug, de middellijn van de Contributiestraat, de middellijn van de Begijnhoflaan tot aan de torens van het Rabot, onder de torens van het Rabot het kanaal de Lieve tot aan de Lievebrug, dan de middellijn van de Lievestraat, de middellijn van de Lange Steenstraat, de middellijn van de Grauwpoort tot aan het Sluizeken, de middellijn van het Sluizeken tot tegen de Achterleie, de Achterleie tot aan de Leie en dan de Leie tot voor Portus Gandae, de waterweg in oostelijke richting naar het Octrooiplein, dwars door het Octrooiplein en het Antwerpenplein, door de middellijn van de Dendermondsesteenweg tot aan de grens met de gemeente Destelbergen en verder de grens met de gemeenten Lochristi en Zelzate",
      fr: "La partie du territoire de la ville de Gand d\xE9butant \xE0 la limite avec la commune de Zelzate, le canal Gand-Terneuzen en direction du sud, le Voorhaven, le Tolhuisdok et le Verbindingskanaal jusqu'au canal Gand-Ostende, le canal Gand-Ostende en direction du sud jusqu'au Contributiebrug, la ligne m\xE9diane de la Contributiestraat, la ligne m\xE9diane de la Begijnhoflaan jusqu'aux tours du Rabot, sous les tours du Rabot le canal de Lieve jusqu'au Lievebrug, ensuite la ligne m\xE9diane de la Lievestraat, la ligne m\xE9diane de la Lange Steenstraat, la ligne m\xE9diane de la Grauwpoort jusqu'au Sluizeken, la ligne m\xE9diane du Sluizeken jusqu'\xE0 l'Achterleie, l'Achterleie jusqu'\xE0 la Lys, ensuite la Lys jusque devant le Portus Gandae, la voie navigable en direction de l'est vers l'Octrooiplein, \xE0 travers l'Octrooiplein et l'Antwerpenplein, par la ligne m\xE9diane de la Dendermondsesteenweg jusqu'\xE0 la limite de la commune de Destelbergen et au-del\xE0 de la limite des communes de Lochristi et de Zelzate"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.15"
  },
  {
    id: "Gent5",
    arrondissement: "EastFlanders",
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
        refnis: "44013"
      },
      {
        refnis: "44021",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Destelbergen en het gedeelte van het grondgebied van de stad Gent beginnend aan de grens met de gemeente Destelbergen, de middellijn van de Dendermondsesteenweg tot aan het Antwerpenplein, de middellijn van het Antwerpenplein dwars door het Octrooiplein, de waterweg tussen het Octrooiplein en de Leie, de Leie tot aan de Slachthuisbrug, de Slachthuisbrug tot het kruispunt met de Koepoortkaai, verder de oostelijke grens van de Koepoortkaai en de Filips Van Artveldestraat tot aan het Sint-Annaplein, de noordelijke grens van het Sint-Annaplein, de middellijnen van de Brabantdam tot aan de kruising met de Kortedagsteeg, de middellijn van de Kortedagsteeg, de middellijn van de Walpoortstraat, de middellijn van de Sint-Pietersnieuwstraat, het deel van het Sint-Pietersplein dat de verbinding vormt tussen de Sint-Pietersnieuwstraat en de Overpoortstraat, de middellijn van de Overpoortstraat, de middellijn van de Normaalschoolstraat, de middellijn van de Ottergemsesteenweg tot aan de spoorweglijn onmiddellijk ten zuiden van de Burggravenlaan, de spoorweg in oostelijke richting tot aan de Schelde en verder de Schelde in zuidelijke richting tot aan tot aan de grens met de gemeente Merelbeke-Melle",
      fr: "La commune de Destelbergen et la partie du territoire de la ville de Gand d\xE9butant \xE0 la limite de la commune de Destelbergen, la ligne m\xE9diane de la Dendermondsesteenweg jusqu'\xE0 l'Antwerpenplein, la ligne m\xE9diane de l'Antwerpenplein \xE0 travers l'Octrooiplein, la voie navigable entre l'Octrooiplein et la Lys, la Lys jusqu'au Slachthuisbrug, le Slachthuisbrug jusqu'au croisement avec le Koepoortkaai, ensuite la limite est du Koepoortkaai et la Filips Van Artveldestraat jusqu'\xE0 la Sint-Annaplein, la limite nord de la Sint-Annaplein, la ligne m\xE9diane du Brabantdam jusqu'au croisement avec le Kortedagsteeg, la ligne m\xE9diane du Kortedagsteeg, la ligne m\xE9diane de la Walpoortstraat, la ligne m\xE9diane de la Sint-Pietersnieuwstraat, la partie de la Sint-Pietersplein reliant la Sint-Pietersnieuwstraat \xE0 l'Overpoortstraat, la ligne m\xE9diane de l'Overpoortstraat, la ligne m\xE9diane de la Normaalschoolstraat, la ligne m\xE9diane de la Ottergemsesteenweg jusqu'\xE0 la ligne de chemin de fer imm\xE9diatement au sud de la Burggravenlaan, la ligne de chemin de fer en direction de l'est jusqu'\xE0 l'Escaut et au-del\xE0 de l'Escaut en direction du sud jusqu'\xE0 la limite de la commune de Merelbeke-Melle"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.16"
  },
  {
    id: "MerelbekeMelle",
    arrondissement: "EastFlanders",
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
        refnis: "44020"
      },
      {
        refnis: "44052"
      },
      {
        refnis: "44088"
      }
    ],
    territory: {
      nl: "De gemeenten Gavere, Merelbeke-Melle en Oosterzele",
      fr: "Les communes de Gavere Merelbeke-Melle et d'Oosterzele"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.17"
  },
  {
    id: "Zelzate",
    arrondissement: "EastFlanders",
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
        refnis: "43002"
      },
      {
        refnis: "43018"
      },
      {
        refnis: "44019"
      },
      {
        refnis: "44087"
      }
    ],
    territory: {
      nl: "De gemeenten Assenede, Evergem, Lochristi en Zelzate",
      fr: "Les communes d'Assenede, d'Evergem, de Lochristi et de Zelzate"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.18"
  },
  {
    id: "Geraardsbergen",
    arrondissement: "EastFlanders",
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
        refnis: "41018"
      },
      {
        refnis: "45041"
      },
      {
        refnis: "45059"
      }
    ],
    territory: {
      nl: "De steden Geraardsbergen, Ronse en de gemeente Brakel",
      fr: "Les villes de Grammont, de Renaix et la commune de Brakel"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.19"
  },
  {
    id: "Oudenaarde",
    arrondissement: "EastFlanders",
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
        refnis: "45035"
      },
      {
        refnis: "45060"
      },
      {
        refnis: "45061"
      },
      {
        refnis: "45062"
      },
      {
        refnis: "45064"
      },
      {
        refnis: "45065"
      },
      {
        refnis: "45068"
      }
    ],
    territory: {
      nl: "De stad Oudenaarde en de gemeenten Horebeke, Kluisbergen, Kruisem, Maarkedal, Wortegem-Petegem en Zwalm",
      fr: "La ville d'Audenarde et les communes de Horebeke, de Kluisbergen, de Kruisem, de Maarkedal, de Wortegem-Petegem et de Zwalm"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.20"
  },
  {
    id: "Herzele",
    arrondissement: "EastFlanders",
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
        refnis: "41027"
      },
      {
        refnis: "41063"
      },
      {
        refnis: "41081"
      },
      {
        refnis: "45063"
      }
    ],
    territory: {
      nl: "De stad Zottegem en de gemeenten Herzele, Lierde en Sint-Lievens-Houtem",
      fr: "La ville de Zottegem et les communes de Herzele, de Lierde et de Sint-Lievens-Houtem"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 6.21"
  },
  {
    id: "Brugge1",
    arrondissement: "WestFlanders",
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
        refnis: "31003"
      },
      {
        refnis: "31005",
        partial: true
      },
      {
        refnis: "31022"
      }
    ],
    territory: {
      nl: "De gemeenten Beernem, Oostkamp en het gedeelte van het grondgebied van de stad Brugge begrensd door de middellijn van het kanaal Gent-Brugge-Oostende en de middellijn van het kanaal Brugge-Damme",
      fr: "Les communes de Beernem, d'Oostkamp et la partie du territoire de la ville de Bruges d\xE9limit\xE9e par la ligne m\xE9diane du canal Gand-Bruges-Ostende et la ligne m\xE9diane du canal Bruges-Damme"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.1"
  },
  {
    id: "Brugge2",
    arrondissement: "WestFlanders",
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
        refnis: "31004"
      },
      {
        refnis: "31005",
        partial: true
      },
      {
        refnis: "31012"
      },
      {
        refnis: "31042"
      },
      {
        refnis: "35029"
      }
    ],
    territory: {
      nl: "De stad Blankenberge, de gemeenten De Haan, Jabbeke en Zuienkerke en het gedeelte van het grondgebied van de stad Brugge begrensd door de middellijn van het Boudewijnkanaal en de middellijn van het kanaal Gent-Brugge-Oostende",
      fr: "La ville de Blankenberge, les communes de De Haan, de Jabbeke et de Zuienkerke et la partie du territoire de la ville de Bruges d\xE9limit\xE9e par la ligne m\xE9diane du canal Baudouin et la ligne m\xE9diane du canal Gand-Bruges-Ostende"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.2"
  },
  {
    id: "Brugge3",
    arrondissement: "WestFlanders",
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
        refnis: "31005",
        partial: true
      },
      {
        refnis: "31006"
      },
      {
        refnis: "31043"
      }
    ],
    territory: {
      nl: "De stad Damme, de gemeente Knokke-Heist en het gedeelte van het grondgebied van de stad Brugge begrensd door de middellijn van het kanaal Brugge-Damme, de middellijn van het kanaal Gent-Brugge-Oostende en de middellijn van het Boudewijnkanaal",
      fr: "La ville de Damme, la commune de Knokke-Heist et la partie du territoire de la ville de Bruges d\xE9limit\xE9e par la ligne m\xE9diane du canal de Bruges-Damme, la ligne m\xE9diane du canal de Gand-Bruges-Ostende et la ligne m\xE9diane du canal Baudouin"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.3"
  },
  {
    id: "Brugge4",
    arrondissement: "WestFlanders",
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
        refnis: "31005",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Brugge ten noorden en ten oosten begrensd door de middellijn van het kanaal Gent-Brugge-Oostende",
      fr: "La partie du territoire de la ville de Bruges d\xE9limit\xE9e au nord et \xE0 l'est par la ligne m\xE9diane du canal Gand-Bruges-Ostende"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.4"
  },
  {
    id: "Oostende1",
    arrondissement: "WestFlanders",
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
        refnis: "35002"
      },
      {
        refnis: "35013",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Bredene en het gedeelte van het grondgebied van de stad Oostende gelegen ten oosten van de middellijn van de Koninginnelaan van de dijk tot aan de Torhoutsesteenweg en ten zuiden van de middellijn van de Torhoutsesteenweg vanaf de Koninginnelaan tot aan de grens van de stad",
      fr: "La commune de Bredene et la partie du territoire de la ville d'Ostende situ\xE9e \xE0 l'est de la ligne m\xE9diane de la Koninginnelaan de la digue jusqu'\xE0 la Torhoutsesteenweg et au sud de la ligne m\xE9diane de la Torhoutsesteenweg depuis la Koninginnelaan jusqu'\xE0 la limite de la ville"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.5"
  },
  {
    id: "Oostende2",
    arrondissement: "WestFlanders",
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
        refnis: "35005"
      },
      {
        refnis: "35011"
      },
      {
        refnis: "35013",
        partial: true
      },
      {
        refnis: "35014"
      }
    ],
    territory: {
      nl: "De steden Oudenburg, Gistel, de gemeente Middelkerke en het gedeelte van het grondgebied van de stad Oostende gelegen ten westen van de middellijn van de Koninginnelaan, van de dijk tot aan de Torhoutsesteenweg, en ten noorden van de middellijn van de Torhoutsesteenweg vanaf de Koninginnelaan tot aan de grens van de stad",
      fr: "Les villes d'Oudenburg, de Gistel, la commune de Middelkerke et la partie du territoire de la ville d'Ostende situ\xE9e \xE0 l'ouest de la ligne m\xE9diane de la Koninginnelaan, de la digue jusqu'\xE0 la Torhoutsesteenweg, et au nord de la ligne m\xE9diane de la Torhoutsesteenweg \xE0 partir de la Koninginnelaan jusqu'\xE0 la limite de la ville"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.6"
  },
  {
    id: "Tielt",
    arrondissement: "WestFlanders",
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
        refnis: "37002"
      },
      {
        refnis: "37011"
      },
      {
        refnis: "37020"
      },
      {
        refnis: "37021"
      },
      {
        refnis: "37022"
      }
    ],
    territory: {
      nl: "De stad Tielt en de gemeenten Ardooie, Dentergem, Pittem en Wingene",
      fr: "La ville de Tielt et les communes d'Ardooie, de Dentergem, de Pittem et de Wingene"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.7"
  },
  {
    id: "Torhout",
    arrondissement: "WestFlanders",
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
        refnis: "31033"
      },
      {
        refnis: "31040"
      },
      {
        refnis: "32010"
      },
      {
        refnis: "32011"
      },
      {
        refnis: "35006"
      },
      {
        refnis: "36011"
      }
    ],
    territory: {
      nl: "De stad Torhout en de gemeenten Ichtegem, Koekelare, Kortemark, Lichtervelde en Zedelgem",
      fr: "La ville de Torhout et les communes d'Ichtegem, de Koekelare, de Kortemark, de Lichtervelde et de Zedelgem"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.8"
  },
  {
    id: "Ieper",
    arrondissement: "WestFlanders",
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
        refnis: "33011"
      },
      {
        refnis: "33037"
      },
      {
        refnis: "33040"
      },
      {
        refnis: "36019"
      }
    ],
    territory: {
      nl: "De stad Ieper en de gemeenten Langemark-Poelkapelle, Staden en Zonnebeke",
      fr: "La ville d'Ypres et les communes de Langemark-Poelkapelle, de Staden et de Zonnebeke"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.9"
  },
  {
    id: "Poperinge",
    arrondissement: "WestFlanders",
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
        refnis: "32006"
      },
      {
        refnis: "32030"
      },
      {
        refnis: "33016"
      },
      {
        refnis: "33021"
      },
      {
        refnis: "33039"
      },
      {
        refnis: "33041"
      }
    ],
    territory: {
      nl: "De steden Lo-Reninge, Poperinge, Mesen en de gemeenten Heuvelland, Houthulst en Vleteren",
      fr: "Les villes de Lo-Reninge, de Poperinge, de Messines et les communes de Heuvelland, de Houthulst et de Vleteren"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.10"
  },
  {
    id: "Izegem",
    arrondissement: "WestFlanders",
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
        refnis: "34025"
      },
      {
        refnis: "36007"
      },
      {
        refnis: "36008"
      },
      {
        refnis: "36010"
      }
    ],
    territory: {
      nl: "De stad Izegem en de gemeenten Ingelmunster, Ledegem en Lendelede",
      fr: "La ville d'Izegem et les communes d'Ingelmunster, de Ledegem et de Lendelede"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.11"
  },
  {
    id: "Kortrijk1",
    arrondissement: "WestFlanders",
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
        refnis: "34022",
        partial: true
      },
      {
        refnis: "34023"
      }
    ],
    territory: {
      nl: "De gemeente Kuurne en het gedeelte van het grondgebied van de stad Kortrijk boven de E17",
      fr: "La commune de Kuurne et la partie du territoire de la ville de Courtrai situ\xE9e au-del\xE0 de la E17"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.12"
  },
  {
    id: "Kortrijk2",
    arrondissement: "WestFlanders",
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
        refnis: "34002"
      },
      {
        refnis: "34003"
      },
      {
        refnis: "34009"
      },
      {
        refnis: "34022",
        partial: true
      },
      {
        refnis: "34042"
      },
      {
        refnis: "34043"
      }
    ],
    territory: {
      nl: "De gemeenten Anzegem, Avelgem, Deerlijk, Spiere-Helkijn, Zwevegem en het gedeelte van het grondgebied van de stad Kortrijk onder de E17",
      fr: "Les communes d'Anzegem, d'Avelgem, de Deerlijk, d'Espierres-Helchin, de Zwevegem et la partie du territoire de la ville de Courtrai en-de\xE7\xE0 de la E17"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.13"
  },
  {
    id: "Menen",
    arrondissement: "WestFlanders",
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
        refnis: "33029"
      },
      {
        refnis: "34027"
      },
      {
        refnis: "34041"
      },
      {
        refnis: "36012"
      }
    ],
    territory: {
      nl: "De steden Menen, Wervik en de gemeenten Moorslede en Wevelgem",
      fr: "Les villes de Menin, de Wervik et les communes de Moorslede et de Wevelgem"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.14"
  },
  {
    id: "Roeselare",
    arrondissement: "WestFlanders",
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
        refnis: "36006"
      },
      {
        refnis: "36015"
      }
    ],
    territory: {
      nl: "De stad Roeselare en de gemeente Hooglede",
      fr: "La ville de Roulers et la commune de Hooglede"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.15"
  },
  {
    id: "Waregem",
    arrondissement: "WestFlanders",
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
        refnis: "34013"
      },
      {
        refnis: "34040"
      },
      {
        refnis: "37010"
      },
      {
        refnis: "37017"
      }
    ],
    territory: {
      nl: "De steden Harelbeke en Waregem en de gemeenten Oostrozebeke en Wielsbeke",
      fr: "Les villes de Harelbeke et de Waregem et les communes d'Oostrozebeke et de Wielsbeke"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.16"
  },
  {
    id: "Veurne",
    arrondissement: "WestFlanders",
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
        refnis: "32003"
      },
      {
        refnis: "38002"
      },
      {
        refnis: "38008"
      },
      {
        refnis: "38014"
      },
      {
        refnis: "38016"
      },
      {
        refnis: "38025"
      }
    ],
    territory: {
      nl: "De steden Diksmuide, Nieuwpoort, Veurne en de gemeenten Alveringem, De Panne en Koksijde",
      fr: "Les villes de Dixmude, de Nieuport, de Furnes et les communes d'Alveringem, de La Panne et de Coxyde"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 7.17"
  },
  {
    id: "EupenSanktVith1",
    arrondissement: "Eupen",
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
        refnis: "63023"
      },
      {
        refnis: "63040"
      },
      {
        refnis: "63048"
      },
      {
        refnis: "63061"
      }
    ],
    territory: {
      nl: "De stad Eupen en de gemeenten Kelmis, Lontzen en Raeren",
      fr: "La ville d'Eupen et les communes de La Calamine, de Lontzen et de Raeren"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.1"
  },
  {
    id: "EupenSanktVith2",
    arrondissement: "Eupen",
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
        refnis: "63001"
      },
      {
        refnis: "63012"
      },
      {
        refnis: "63013"
      },
      {
        refnis: "63067"
      },
      {
        refnis: "63087"
      }
    ],
    territory: {
      nl: "De stad Sankt-Vith en de gemeenten Amel, B\xFCllingen, Burg-Reuland en Butgenbach",
      fr: "La ville de Saint-Vith et les communes d'Ambl\xE8ve, de Bullange, de Burg-Reuland et de Butgenbach"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.2"
  },
  {
    id: "Huy1",
    arrondissement: "Liege",
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
        refnis: "61012"
      },
      {
        refnis: "61031"
      },
      {
        refnis: "61039"
      },
      {
        refnis: "61041"
      },
      {
        refnis: "61043"
      },
      {
        refnis: "61048"
      },
      {
        refnis: "61079"
      },
      {
        refnis: "61081"
      },
      {
        refnis: "62121"
      }
    ],
    territory: {
      nl: "De stad Hoei en de gemeenten Anthisnes, Clavier, Marchin, Modave, Nandrin, Neupr\xE9, Ouffet en Tinlot",
      fr: "La ville de Huy et les communes d'Anthisnes, de Clavier, de Marchin, de Modave, de Nandrin, de Neupr\xE9, de Ouffet et de Tinlot"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.3"
  },
  {
    id: "Huy2",
    arrondissement: "Liege",
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
        refnis: "61003"
      },
      {
        refnis: "61010"
      },
      {
        refnis: "61028"
      },
      {
        refnis: "61063"
      },
      {
        refnis: "61068"
      },
      {
        refnis: "61072"
      },
      {
        refnis: "64015"
      },
      {
        refnis: "64065"
      },
      {
        refnis: "64075"
      }
    ],
    territory: {
      nl: "De gemeenten Amay, Braives, Burdinne, H\xE9ron, Saint-Georges-sur-Meuse, Villers-le-Bouillet, Verlaine, Wanze en Wasseiges",
      fr: "Les communes d'Amay, de Braives, de Burdinne, de H\xE9ron, de Saint-Georges-sur-Meuse, de Villers-le-Bouillet, de Verlaine, de Wanze et de Wasseiges"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.4"
  },
  {
    id: "Fleron",
    arrondissement: "Liege",
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
        refnis: "62015"
      },
      {
        refnis: "62022"
      },
      {
        refnis: "62038"
      },
      {
        refnis: "62099"
      }
    ],
    territory: {
      nl: "De gemeenten Beyne-Heusay, Chaudfontaine, Fl\xE9ron en Soumagne",
      fr: "Les communes de Beyne-Heusay, de Chaudfontaine, de Fl\xE9ron et de Soumagne"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.5"
  },
  {
    id: "GraceHollogne",
    arrondissement: "Liege",
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
        refnis: "61080"
      },
      {
        refnis: "62006"
      },
      {
        refnis: "62118"
      },
      {
        refnis: "62120"
      }
    ],
    territory: {
      nl: "De gemeenten Awans, Engis, Fl\xE9malle en Gr\xE2ce-Hollogne",
      fr: "Les communes d'Awans, d'Engis, de Fl\xE9malle et de Gr\xE2ce-Hollogne"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.6"
  },
  {
    id: "Herstal",
    arrondissement: "Liege",
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
        refnis: "62051"
      },
      {
        refnis: "62079"
      }
    ],
    territory: {
      nl: "De gemeenten Herstal en Oupeye",
      fr: "Les communes de Herstal et d'Oupeye"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.7"
  },
  {
    id: "Liege1",
    arrondissement: "Liege",
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
        refnis: "62063",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Luik gelegen ten oosten van de middellijnen van de Vesder (rechteroever), de Ourthe (rechteroever) en de Maas (rechteroever vanaf de pont de F\xE9tinne)",
      fr: "La partie du territoire de la ville de Li\xE8ge situ\xE9e \xE0 l'est des lignes m\xE9dianes de la Vesdre (rive droite), de l'Ourthe (rive droite) et de la Meuse (rive droite \xE0 partir du pont de F\xE9tinne)"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.8"
  },
  {
    id: "Liege2",
    arrondissement: "Liege",
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
        refnis: "62063",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Luik begrensd door de middellijnen van de rue Saint-Gilles, de rue Saint-Laurent, de rue Mont Saint-Martin, de rue Saint-Hubert, de rue Sainte-Croix, een lijn die de verbinding vormt tussen de middellijn van de rue Sainte-Croix en de middellijn van de rue du Palais, de rue des Mineurs, de rue du Pont, een lijn die de verbinding vormt tussen de middellijn van de rue du Pont en de middellijn van de Maas (linkeroever) tot de zuidgrens van de stad Luik, evenals het gedeelte van het grondgebied van de stad Luik begrensd door de middellijnen van de rue de la Tonne, de rue des XIV Verges, de rue de Vis\xE9 Voie tot de noordgrens van de stad Luik",
      fr: "La partie du territoire de la ville de Li\xE8ge d\xE9limit\xE9e par les lignes m\xE9dianes de la rue Saint-Gilles, rue Saint-Laurent, rue Mont Saint-Martin, rue Saint-Hubert, rue Sainte-Croix, une ligne reliant la ligne m\xE9diane de la rue Sainte-Croix \xE0 la ligne m\xE9diane de la rue du Palais, rue des Mineurs, rue du Pont, une ligne reliant la ligne m\xE9diane de la rue du Pont \xE0 la ligne m\xE9diane de la Meuse (rive gauche) jusqu'\xE0 la limite sud de la ville de Li\xE8ge ainsi que la partie du territoire de la ville de Li\xE8ge d\xE9limit\xE9e par les lignes m\xE9dianes de la rue de la Tonne, rue des XIV Verges, rue Vis\xE9 Voie jusqu'\xE0 la limite nord de la ville de Li\xE8ge"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.9"
  },
  {
    id: "Liege3",
    arrondissement: "Liege",
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
        refnis: "62063",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Luik begrensd ten noorden door de middellijnen van de rue de la Tonne, de rue des XIV Verges, de rue Vis\xE9 Voie en de gemeente Herstal, ten oosten door de middellijn van de Maas, ten zuiden door de middellijnen van de rue Saint-Gilles, de rue Saint-Laurent, de rue Mont Saint-Martin, de rue Saint-Hubert, de rue Sainte-Croix, een lijn die de verbinding vormt tussen de middellijn van de rue Sainte-Croix en de middellijn van de rue du Palais, de rue des Mineurs, de rue du Pont, een lijn die de verbinding vormt tussen de middellijn van de rue du Pont en de middellijn van de Maas (linkeroever)",
      fr: "La partie du territoire de la ville de Li\xE8ge d\xE9limit\xE9e au nord par les lignes m\xE9dianes de la rue de la Tonne, rue des XIV Verges, rue Vis\xE9 Voie et la commune de Herstal, \xE0 l'est par la ligne m\xE9diane de la Meuse, au sud par les lignes m\xE9dianes de la rue Saint-Gilles, rue Saint-Laurent, rue Mont Saint-Martin, rue Saint-Hubert, rue Sainte-Croix, une ligne reliant la ligne m\xE9diane de la rue Sainte-Croix \xE0 la ligne m\xE9diane de la rue du Palais, rue des Mineurs, rue du Pont, une ligne reliant la ligne m\xE9diane de la rue du Pont \xE0 la ligne m\xE9diane de la Meuse (rive gauche)"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.10"
  },
  {
    id: "Liege4",
    arrondissement: "Liege",
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
        refnis: "62003"
      },
      {
        refnis: "62063",
        partial: true
      },
      {
        refnis: "62093"
      }
    ],
    territory: {
      nl: "De gemeenten Ans, Saint-Nicolas en het gedeelte van het grondgebied van de stad Luik gelegen tussen het westen van de middellijn van de Ourthe (linkeroever) en de Maas (tot de pont de Fragn\xE9e)",
      fr: "Les communes d'Ans, de Saint Nicolas et la partie du territoire de la Ville de Li\xE8ge repris entre l'ouest de la ligne m\xE9diane de l'Ourthe (rive gauche) et de la Meuse (jusqu'au pont de Fragn\xE9e)"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.11"
  },
  {
    id: "Seraing",
    arrondissement: "Liege",
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
        refnis: "62096"
      }
    ],
    territory: {
      nl: "De stad Seraing",
      fr: "La ville de Seraing"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.12"
  },
  {
    id: "Sprimont",
    arrondissement: "Liege",
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
        refnis: "61019"
      },
      {
        refnis: "61024"
      },
      {
        refnis: "62009"
      },
      {
        refnis: "62026"
      },
      {
        refnis: "62032"
      },
      {
        refnis: "62100"
      },
      {
        refnis: "62122"
      }
    ],
    territory: {
      nl: "De gemeenten Aywaille, Comblain-au-Pont, Esneux, Ferri\xE8res, Hamoir, Sprimont en Trooz",
      fr: "Les communes d'Aywaille, de Comblain-au-Pont, d'Esneux, de Ferri\xE8res, de Hamoir, de Sprimont et de Trooz"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.13"
  },
  {
    id: "Vise",
    arrondissement: "Liege",
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
        refnis: "62011"
      },
      {
        refnis: "62027"
      },
      {
        refnis: "62060"
      },
      {
        refnis: "62108"
      },
      {
        refnis: "62119"
      }
    ],
    territory: {
      nl: "De stad Wezet en de gemeenten Bitsingen, Bl\xE9gny, Dalhem en Juprelle",
      fr: "La ville de Vis\xE9 et les communes de Bassenge, de Bl\xE9gny, de Dalhem et de Juprelle"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.14"
  },
  {
    id: "Waremme",
    arrondissement: "Liege",
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
        refnis: "64008"
      },
      {
        refnis: "64021"
      },
      {
        refnis: "64023"
      },
      {
        refnis: "64025"
      },
      {
        refnis: "64029"
      },
      {
        refnis: "64034"
      },
      {
        refnis: "64047"
      },
      {
        refnis: "64056"
      },
      {
        refnis: "64063"
      },
      {
        refnis: "64074"
      },
      {
        refnis: "64076"
      }
    ],
    territory: {
      nl: "De steden Borgworm, Hannuit en de gemeenten Berloz, Crisn\xE9e, Donceel, Faimes, Fexhe-le-Haut-Clocher, Geer, Lijsem, Oerle en Remicourt",
      fr: "Les villes de Waremme, de Hannut et les communes de Berloz, de Crisn\xE9e, de Donceel, de Faimes, de Fexhe-le-Haut-Clocher, de Geer, de Lincent, d'Oreye et de Remicourt"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.15"
  },
  {
    id: "Limbourg",
    arrondissement: "Liege",
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
        refnis: "63003"
      },
      {
        refnis: "63004"
      },
      {
        refnis: "63038"
      },
      {
        refnis: "63046"
      },
      {
        refnis: "63084"
      },
      {
        refnis: "63088"
      },
      {
        refnis: "63089"
      }
    ],
    territory: {
      nl: "De stad Limburg en de gemeenten Aubel, Baelen, Jalhay, Plombi\xE8res, Thimister-Clermont en Welkenraedt",
      fr: "La ville de Limbourg et les communes d'Aubel, de Baelen, de Jalhay, de Plombi\xE8res, de Thimister-Clermont et de Welkenraedt"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.16"
  },
  {
    id: "Spa",
    arrondissement: "Liege",
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
        refnis: "63045"
      },
      {
        refnis: "63049"
      },
      {
        refnis: "63072"
      },
      {
        refnis: "63073"
      },
      {
        refnis: "63075"
      },
      {
        refnis: "63080"
      },
      {
        refnis: "63086"
      }
    ],
    territory: {
      nl: "De steden Malmedy, Stavelot en de gemeenten Lierneux, Spa, Stoumont, Trois-Ponts en Weismes",
      fr: "Les villes de Malm\xE9dy, de Stavelot et les communes de Lierneux, de Spa, de Stoumont, de Trois-Ponts et de Waimes"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.17"
  },
  {
    id: "Verviers1",
    arrondissement: "Liege",
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
        refnis: "63020"
      },
      {
        refnis: "63035"
      },
      {
        refnis: "63057"
      },
      {
        refnis: "63058"
      },
      {
        refnis: "63079",
        partial: true
      }
    ],
    territory: {
      nl: "De stad Herve, de gemeenten Dison, Olne, Pepinster en het gedeelte van het grondgebied van de stad Verviers gelegen ten noorden van de Vesder",
      fr: "La ville de Herve, les communes de Dison, d'Olne, de Pepinster et la partie du territoire de la ville de Verviers situ\xE9e au nord de la Vesdre"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.18"
  },
  {
    id: "Verviers2",
    arrondissement: "Liege",
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
        refnis: "63076"
      },
      {
        refnis: "63079",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Theux en het gedeelte van het grondgebied van de stad Verviers gelegen ten zuiden van de Vesder",
      fr: "La commune de Theux et la partie du territoire de la ville de Verviers situ\xE9e au sud de la Vesdre"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 8.19"
  },
  {
    id: "Arlon",
    arrondissement: "Luxembourg",
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
        refnis: "81001"
      },
      {
        refnis: "81003"
      },
      {
        refnis: "81004"
      },
      {
        refnis: "81015"
      }
    ],
    territory: {
      nl: "De steden Aarlen en Aubange en de gemeenten Attert en Messancy",
      fr: "Les villes d'Arlon et d'Aubange et les communes d'Attert et de Messancy"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 9.1"
  },
  {
    id: "Virton",
    arrondissement: "Luxembourg",
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
        refnis: "85007"
      },
      {
        refnis: "85009"
      },
      {
        refnis: "85011"
      },
      {
        refnis: "85024"
      },
      {
        refnis: "85026"
      },
      {
        refnis: "85034"
      },
      {
        refnis: "85039"
      },
      {
        refnis: "85045"
      },
      {
        refnis: "85046"
      },
      {
        refnis: "85047"
      }
    ],
    territory: {
      nl: "De steden Chiny, Florenville, Virton en de gemeenten Etalle, Habay, Meix-devant-Virton, Musson, Rouvroy, Saint-L\xE9ger en Tintigny",
      fr: "Les villes de Chiny, de Florenville, de Virton et les communes d'Etalle, de Habay, de Meix-devant-Virton, de Musson, de Rouvroy, de Saint-L\xE9ger et de Tintigny"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 9.2"
  },
  {
    id: "MarcheEnFamenne",
    arrondissement: "Luxembourg",
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
        refnis: "83012"
      },
      {
        refnis: "83013"
      },
      {
        refnis: "83028"
      },
      {
        refnis: "83031"
      },
      {
        refnis: "83034"
      },
      {
        refnis: "83040"
      },
      {
        refnis: "83044"
      },
      {
        refnis: "83049"
      },
      {
        refnis: "83055"
      }
    ],
    territory: {
      nl: "De steden Durbuy, Marche-en-Famenne, La Roche-en-Ardenne en de gemeenten Erez\xE9e, Hotton, Manhay, Nassogne, Rendeux en Tenneville",
      fr: "Les villes de Durbuy, de Marche-en-Famenne, de La Roche-en-Ardenne et les communes d'Erez\xE9e, de Hotton, de Manhay, de Nassogne, de Rendeux et de Tenneville"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 9.3"
  },
  {
    id: "Bastogne",
    arrondissement: "Luxembourg",
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
        refnis: "81013"
      },
      {
        refnis: "82009"
      },
      {
        refnis: "82014"
      },
      {
        refnis: "82032"
      },
      {
        refnis: "82036"
      },
      {
        refnis: "82037"
      },
      {
        refnis: "82038"
      },
      {
        refnis: "82039"
      },
      {
        refnis: "84033"
      }
    ],
    territory: {
      nl: "De steden Bastenaken en Houffalize de deelgemeente Bertogne van de stad Bastenaken en de gemeenten Fauvillers, Gouvy, L\xE9glise, Martelange, Sainte-Ode, Vaux-sur-S\xFBre en Vielsalm",
      fr: "Les villes de Bastogne et de Houffalize l'ancienne commune de Bertogne de la ville de Bastogne et les communes de Fauvillers, de Gouvy, de L\xE9glise, de Martelange, de Sainte-Ode, de Vaux-sur-S\xFBre et de Vielsalm"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 9.4"
  },
  {
    id: "Neufchateau",
    arrondissement: "Luxembourg",
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
        refnis: "84009"
      },
      {
        refnis: "84010"
      },
      {
        refnis: "84016"
      },
      {
        refnis: "84029"
      },
      {
        refnis: "84035"
      },
      {
        refnis: "84043"
      },
      {
        refnis: "84050"
      },
      {
        refnis: "84059"
      },
      {
        refnis: "84068"
      },
      {
        refnis: "84075"
      },
      {
        refnis: "84077"
      }
    ],
    territory: {
      nl: "De steden Bouillon, Neufch\xE2teau, Saint-Hubert en de gemeenten Bertrix, Daverdisse, Herbeumont, Libin, Libramont-Chevigny, Paliseul, Tellin en Wellin",
      fr: "Les villes de Bouillon, de Neufch\xE2teau, de Saint-Hubert et les communes de Bertrix, de Daverdisse, de Herbeumont, de Libin, de Libramont-Chevigny, de Paliseul, de Tellin et de Wellin"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 9.5"
  },
  {
    id: "Dinant",
    arrondissement: "Namur",
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
        refnis: "91005"
      },
      {
        refnis: "91013"
      },
      {
        refnis: "91015"
      },
      {
        refnis: "91034"
      },
      {
        refnis: "91054"
      },
      {
        refnis: "91072"
      },
      {
        refnis: "91141"
      },
      {
        refnis: "91143"
      }
    ],
    territory: {
      nl: "De steden Beauraing, Dinant en de gemeenten Anh\xE9e, Bi\xE8vre, Gedinne, Houyet, Vresse-sur-Semois en Yvoir",
      fr: "Les villes de Beauraing, de Dinant et les communes d'Anh\xE9e, de Bi\xE8vre, de Gedinne, de Houyet, de Vresse-sur-Semois et d'Yvoir"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 10.1"
  },
  {
    id: "Ciney",
    arrondissement: "Namur",
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
        refnis: "91030"
      },
      {
        refnis: "91059"
      },
      {
        refnis: "91064"
      },
      {
        refnis: "91114"
      },
      {
        refnis: "91120"
      }
    ],
    territory: {
      nl: "De steden Ciney, Rochefort en de gemeenten Hamois, Havelange en Somme-Leuze",
      fr: "Les villes de Ciney, de Rochefort et les communes de Hamois, de Havelange et de Somme-Leuze"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 10.2"
  },
  {
    id: "Philippeville",
    arrondissement: "Namur",
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
        refnis: "91103"
      },
      {
        refnis: "91142"
      },
      {
        refnis: "93010"
      },
      {
        refnis: "93014"
      },
      {
        refnis: "93018"
      },
      {
        refnis: "93022"
      },
      {
        refnis: "93056"
      },
      {
        refnis: "93088"
      },
      {
        refnis: "93090"
      }
    ],
    territory: {
      nl: "De steden Couvin, Philippeville, Walcourt en de gemeenten Cerfontaine, Doische, Florennes, Hasti\xE8re, Onhaye en Viroinval",
      fr: "Les villes de Couvin, de Philippeville, de Walcourt et les communes de Cerfontaine, de Doische, de Florennes, de Hasti\xE8re, d'Onhaye et de Viroinval"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 10.3"
  },
  {
    id: "Andenne",
    arrondissement: "Namur",
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
        refnis: "92003"
      },
      {
        refnis: "92006"
      },
      {
        refnis: "92054"
      },
      {
        refnis: "92097"
      },
      {
        refnis: "92138"
      }
    ],
    territory: {
      nl: "De stad Andenne en de gemeenten Assesse, Fernelmont, Gesves en Ohey",
      fr: "La ville d'Andenne et les communes d'Assesse, de Fernelmont, de Gesves et d'Ohey"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 10.4"
  },
  {
    id: "FossesLaVille",
    arrondissement: "Namur",
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
        refnis: "92045"
      },
      {
        refnis: "92048"
      },
      {
        refnis: "92087"
      },
      {
        refnis: "92137"
      }
    ],
    territory: {
      nl: "De stad Fosses-la-Ville en de gemeenten Floreffe, Mettet en Sambreville",
      fr: "La ville de Fosses-la-Ville et les communes de Floreffe, de Mettet et de Sambreville"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 10.5"
  },
  {
    id: "Gembloux",
    arrondissement: "Namur",
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
        refnis: "92035"
      },
      {
        refnis: "92114"
      },
      {
        refnis: "92140"
      },
      {
        refnis: "92141"
      },
      {
        refnis: "92142"
      }
    ],
    territory: {
      nl: "De stad Gembloers en de gemeenten Eghez\xE9e, Jemeppe-sur-Sambre, La Bruy\xE8re en Sombreffe",
      fr: "La ville de Gembloux et les communes d'Eghez\xE9e, de Jemeppe-sur-Sambre, de La Bruy\xE8re et de Sombreffe"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 10.6"
  },
  {
    id: "Namur1",
    arrondissement: "Namur",
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
        refnis: "92094",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeenten Beez, Belgrade, Boninne, Bouge, Champion, Cognel\xE9e, Daussoulx, Flawinne, Gelbress\xE9e, Marche-les-Dames, Saint-Marc, Saint-Servais, Suarl\xE9e, Temploux en Vedrin van de stad Namen en het gedeelte van het grondgebied van de stad Namen gelegen ten noorden van de middellijn van de Samber en de Maas (linkeroevers)",
      fr: "Les anciennes communes de Beez, de Belgrade, de Boninne, de Bouge, de Champion, de Cognel\xE9e, de Daussoulx, de Flawinne, de Gelbress\xE9e, de Marche-les-Dames, de Saint-Marc, de Saint-Servais, de Suarl\xE9e, de Temploux et de Vedrin de la ville de Namur et la partie du territoire de la ville de Namur situ\xE9e au nord de la ligne m\xE9diane de la Sambre et de la Meuse (rives gauches)"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 10.7"
  },
  {
    id: "Namur2",
    arrondissement: "Namur",
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
        refnis: "92094",
        partial: true
      },
      {
        refnis: "92101"
      }
    ],
    territory: {
      nl: "De gemeente Profondeville, de deelgemeenten Dave, Erpent, Jambes, Lives-sur-Meuse, Loyers, Malonne, Naninne, W\xE9pion en Wierde van de stad Namen en het gedeelte van het grondgebied van de stad Namen gelegen ten zuiden van de middellijn van de Samber (rechteroever)",
      fr: "La commune de Profondeville, les anciennes communes de Dave, d'Erpent, de Jambes, de Lives-sur-Meuse, de Loyers, de Malonne, de Naninne, de W\xE9pion et de Wierde de la ville de Namur et la partie du territoire de la ville de Namur situ\xE9e au sud de la ligne m\xE9diane de la Sambre (rive droite)"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 10.8"
  },
  {
    id: "Chimay",
    arrondissement: "Hainaut",
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
        refnis: "56005"
      },
      {
        refnis: "56016"
      },
      {
        refnis: "56022"
      },
      {
        refnis: "56029"
      },
      {
        refnis: "56049"
      },
      {
        refnis: "56051"
      },
      {
        refnis: "56088"
      }
    ],
    territory: {
      nl: "De steden Beaumont, Chimay en de gemeenten Erquelinnes, Froidchapelle, Merbes-le-Ch\xE2teau, Momignies en Sivry-Rance",
      fr: "Les villes de Beaumont, de Chimay et les communes d'Erquelinnes, de Froidchapelle, de Merbes-le-Ch\xE2teau, de Momignies et de Sivry-Rance"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.1"
  },
  {
    id: "Binche",
    arrondissement: "Hainaut",
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
        refnis: "58002"
      },
      {
        refnis: "58003"
      },
      {
        refnis: "58004"
      }
    ],
    territory: {
      nl: "De stad Binche en de gemeenten Estinnes en Morlanwelz",
      fr: "La ville de Binche et les communes d'Estinnes et de Morlanwelz"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.2"
  },
  {
    id: "Charleroi1",
    arrondissement: "Hainaut",
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
        refnis: "52011",
        partial: true
      }
    ],
    territory: {
      nl: "De deelgemeenten Couillet, Dampremy en Gilly van de stad Charleroi alsook het grondgebied van de vroegere stad Charleroi",
      fr: "Les anciennes communes de Couillet, de Dampremy et de Gilly de la ville de Charleroi et le territoire de l'ancienne ville de Charleroi"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.3"
  },
  {
    id: "Charleroi2",
    arrondissement: "Hainaut",
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
        refnis: "52011",
        partial: true
      },
      {
        refnis: "52021"
      },
      {
        refnis: "52075"
      }
    ],
    territory: {
      nl: "De stad Fleurus, de gemeente Les Bons Villers en de deelgemeenten Gosselies, Goutroux, Ransart en Montignies-sur-Sambre van de stad Charleroi",
      fr: "La ville de Fleurus, la commune de Les Bons Villers et les anciennes communes de Gosselies, de Goutroux, de Ransart, et de Montignies-sur-Sambre de la ville de Charleroi"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.4"
  },
  {
    id: "Charleroi3",
    arrondissement: "Hainaut",
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
        refnis: "52011",
        partial: true
      },
      {
        refnis: "52015"
      }
    ],
    territory: {
      nl: "De gemeente Courcelles en de deelgemeenten Jumet, Lodelinsart, Monceau-sur-Sambre en Roux van de stad Charleroi",
      fr: "La commune de Courcelles et les anciennes communes de Jumet, de Lodelinsart, de Monceau-sur-Sambre et de Roux de la ville de Charleroi"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.5"
  },
  {
    id: "Charleroi4",
    arrondissement: "Hainaut",
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
        refnis: "52011",
        partial: true
      },
      {
        refnis: "52022"
      }
    ],
    territory: {
      nl: "De stad Fontaine-l'Ev\xEAque en de deelgemeenten Marchienne-au-Pont, Marcinelle en Mont-sur-Marchienne van de stad Charleroi",
      fr: "La ville de Fontaine-l'Ev\xEAque et les anciennes communes de Marchienne-au-Pont, de Marcinelle et de Mont-sur-Marchienne de la ville de Charleroi"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.6"
  },
  {
    id: "Chatelet",
    arrondissement: "Hainaut",
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
        refnis: "52012"
      },
      {
        refnis: "52018"
      },
      {
        refnis: "52025"
      },
      {
        refnis: "52074"
      }
    ],
    territory: {
      nl: "De stad Ch\xE2telet en de gemeenten Aiseau-Presles, Farciennes en Gerpinnes",
      fr: "La ville de Ch\xE2telet et les communes d'Aiseau-Presles, de Farciennes et de Gerpinnes"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.7"
  },
  {
    id: "Seneffe",
    arrondissement: "Hainaut",
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
        refnis: "52010"
      },
      {
        refnis: "52055"
      },
      {
        refnis: "55085"
      },
      {
        refnis: "55086"
      }
    ],
    territory: {
      nl: "De gemeenten Chapelle-lez-Herlaimont, Manage, Pont-\xE0-Celles en Seneffe",
      fr: "Les communes de Chapelle-lez-Herlaimont, de Manage, de Pont-\xE0-Celles et de Seneffe"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.8"
  },
  {
    id: "Thuin",
    arrondissement: "Hainaut",
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
        refnis: "52048"
      },
      {
        refnis: "56001"
      },
      {
        refnis: "56044"
      },
      {
        refnis: "56078"
      },
      {
        refnis: "56086"
      }
    ],
    territory: {
      nl: "De stad Thuin en de gemeenten Anderlues, Ham-sur-Heure-Nalinnes, Lobbes en Montigny-le-Tilleul",
      fr: "La ville de Thuin et les communes d'Anderlues, de Ham-sur-Heure-Nalinnes, de Lobbes et de Montigny-le-Tilleul"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.9"
  },
  {
    id: "BoussuColfontaine1",
    arrondissement: "Hainaut",
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
        refnis: "53014"
      },
      {
        refnis: "53039"
      },
      {
        refnis: "53065"
      },
      {
        refnis: "53068"
      },
      {
        refnis: "53070"
      },
      {
        refnis: "53083"
      }
    ],
    territory: {
      nl: "De stad Saint-Ghislain en de gemeenten Boussu, Hensies, Honnelles, Quaregnon en Qui\xE9vrain",
      fr: "La ville de Saint-Ghislain et les communes de Boussu, de Hensies, de Honnelles, de Quaregnon et de Qui\xE9vrain"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.10"
  },
  {
    id: "BoussuColfontaine2",
    arrondissement: "Hainaut",
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
        refnis: "53020"
      },
      {
        refnis: "53028"
      },
      {
        refnis: "53082"
      },
      {
        refnis: "53084"
      }
    ],
    territory: {
      nl: "De gemeenten Colfontaine, Dour, Frameries en Qu\xE9vy",
      fr: "Les communes de Colfontaine, de Dour, de Frameries et de Qu\xE9vy"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.11"
  },
  {
    id: "LaLouviere",
    arrondissement: "Hainaut",
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
        refnis: "58001"
      }
    ],
    territory: {
      nl: "De stad La Louvi\xE8re",
      fr: "La ville de La Louvi\xE8re"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.12"
  },
  {
    id: "Mons1",
    arrondissement: "Hainaut",
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
        refnis: "53053",
        partial: true
      }
    ],
    territory: {
      nl: "Het gedeelte van het grondgebied van de stad Bergen ten noorden van de grens van de deelgemeente Havr\xE9 van de stad Bergen tot aan de plaats met de naam &quot;La Cl\xE9 du Bois &quot;, ten noorden van de middellijn van de chauss\xE9e du Roeulx tot aan het kruispunt met de avenue Reine Astrid op de plaats met de naam &quot;Carrefour Saint-Fiacre &quot;, ten noorden van de middellijn van de avenue Reine Astrid, de place des Flandres, de rue Baudouin de Constantinople, de rue d'Havr\xE9, de rue du Hautbois, de rue de Houdain en de rue des Fripiers en ten westen van de middellijn van de Grand'Rue, de rue de Bertaimont en de avenue Jean d'Avesnes, verder ten noorden van de middellijn van de place des Chasseurs, de boulevard Sainctelette, de place des Alli\xE9s en van de N 22 tot aan het kruispunt met de oprit van de autosnelweg E10-E41, ten oosten van de middellijn van die oprit tot aan het kruispunt ervan met de autosnelweg, ten noorden van de vroegere grens van de deelgemeenten Ghlin en Jemappes van de stad Bergen",
      fr: "La partie du territoire de la ville de Mons situ\xE9e au nord de la limite de l'ancienne commune d'Havr\xE9 de la ville de Mons jusqu'au lieu-dit &quot;La Cl\xE9 du Bois &quot;et ensuite au nord de la ligne m\xE9diane de la chauss\xE9e du Roeulx jusqu'\xE0 sa jonction avec l'avenue Reine Astrid au lieu-dit &quot;Carrefour Saint-Fiacre&quot;, puis au nord de la ligne m\xE9diane de l'avenue Reine Astrid, de la place des Flandres, de la rue Baudouin de Constantinople, de la rue d'Havr\xE9, de la rue du Hautbois, de la rue de Houdain et la rue des Fripiers et ensuite \xE0 l'ouest de la ligne m\xE9diane de la Grand'Rue, de la rue de Bertaimont et de l'avenue Jean d'Avesnes puis au nord de la ligne m\xE9diane de la place des Chasseurs, du boulevard Sainctelette, de la place des Alli\xE9s et de la route Nationale 22 jusqu'\xE0 sa jonction avec la bretelle de l'autoroute E10-E41, \xE0 l'est de la ligne m\xE9diane de cette bretelle jusqu'\xE0 sa jonction avec l'autoroute, puis au nord de l'ancienne limite des anciennes communes de Ghlin et de Jemappes de la ville de Mons"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.13"
  },
  {
    id: "Mons2",
    arrondissement: "Hainaut",
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
        refnis: "53044"
      },
      {
        refnis: "53053",
        partial: true
      }
    ],
    territory: {
      nl: "De gemeente Jurbeke en het gedeelte van het grondgebied van de stad Bergen ten zuiden van de middellijn van de grens van de deelgemeente Havr\xE9 van de stad Bergen tot aan de plaats met de naam &quot;La Cl\xE9 du Bois&quot;, ten zuiden van de middellijn van de chauss\xE9e du Roeulx tot aan het kruispunt met de avenue Reine Astrid op de plaats met de naam &quot;Carrefour Saint-Fiacre&quot;, ten zuiden van de middellijn van de avenue Reine Astrid, de place des Flandres, de rue Baudouin de Constantinople, de rue d'Havr\xE9, de rue du Hautbois, de rue de Houdain en de rue des Fripiers en ten oosten van de middellijn van de Grand'Rue, de rue de Bertaimont en de avenue Jean d'Avesnes, verder ten zuiden van de middellijn van de place des Chasseurs, de boulevard Sainctelette, de place des Alli\xE9s en van de N 22 tot aan het kruispunt met de oprit van de autosnelweg E10-E41, ten westen van de middellijn van die oprit tot aan het kruispunt ervan met de autosnelweg, ten zuiden van de vroegere grens van de deelgemeenten Ghlin en Jemappes van de stad Bergen",
      fr: "La commune de Jurbise et la partie du territoire de la ville de Mons situ\xE9e au sud de la ligne m\xE9diane de la limite de l'ancienne commune d'Havr\xE9 de la ville de Mons jusqu'au lieu-dit &quot;La Cl\xE9 du Bois&quot; et ensuite au sud de la ligne m\xE9diane de la chauss\xE9e du Roeulx jusqu'\xE0 sa jonction avec l'avenue Reine Astrid au lieu-dit &quot;Carrefour Saint-Fiacre&quot;, puis au sud de la ligne m\xE9diane de l'avenue Reine Astrid, de la place des Flandres, de la rue Baudouin de Constantinople, de la rue d'Havr\xE9, de la rue du Hautbois, de la rue de Houdain et la rue des Fripiers et ensuite \xE0 l'est de la ligne m\xE9diane de la Grand'Rue, de la rue de Bertaimont et de l'avenue Jean d'Avesnes puis au sud de la ligne m\xE9diane de la place des Chasseurs, du boulevard Sainctelette, de la place des Alli\xE9s et de la route Nationale 22 jusqu'\xE0 sa jonction avec la bretelle de l'autoroute E10-E41, \xE0 l'ouest de la ligne m\xE9diane de cette bretelle jusqu'\xE0 sa jonction avec l'autoroute, puis au sud de l'ancienne limite des anciennes communes de Ghlin et de Jemappes de la ville de Mons"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.14"
  },
  {
    id: "Soignies",
    arrondissement: "Hainaut",
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
        refnis: "53046"
      },
      {
        refnis: "55004"
      },
      {
        refnis: "55035"
      },
      {
        refnis: "55040"
      },
      {
        refnis: "55050"
      }
    ],
    territory: {
      nl: "De steden Le Roeulx, `s Gravenbrakel, Zinnik en de gemeenten Ecaussinnes en Lens",
      fr: "Les villes de Le Roeulx, de Braine-le-Comte, de Soignies et les communes d'Ecaussinnes et de Lens"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.15"
  },
  {
    id: "Ath",
    arrondissement: "Hainaut",
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
        refnis: "51004"
      },
      {
        refnis: "51012"
      },
      {
        refnis: "51017"
      },
      {
        refnis: "51019"
      },
      {
        refnis: "51067"
      },
      {
        refnis: "51068"
      },
      {
        refnis: "51069"
      }
    ],
    territory: {
      nl: "De steden Aat, Edingen, Lessen en de gemeenten Brugelette, Elzele, Opzullik en Vloesberg",
      fr: "Les villes d'Ath, d'Enghien, de Lessines et les communes de Brugelette, de Ellezelles, de Silly et de Flobecq"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.16"
  },
  {
    id: "Mouscron",
    arrondissement: "Hainaut",
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
        refnis: "57096"
      },
      {
        refnis: "57097"
      }
    ],
    territory: {
      nl: "De steden Komen-Waasten en Moeskroen",
      fr: "Les villes de Comines-Warneton et de Mouscron"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.17"
  },
  {
    id: "LeuzeEnHainaut",
    arrondissement: "Hainaut",
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
        refnis: "51008"
      },
      {
        refnis: "51009"
      },
      {
        refnis: "51014"
      },
      {
        refnis: "57064"
      },
      {
        refnis: "57094"
      }
    ],
    territory: {
      nl: "De steden Chi\xE8vres, Leuze-en-Hainaut, P\xE9ruwelz en de gemeenten Beloeil en Bernissart",
      fr: "Les villes de Chi\xE8vres, de Leuze-en-Hainaut, de P\xE9ruwelz et les communes de Beloeil et de Bernissart"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.18"
  },
  {
    id: "Tournai1",
    arrondissement: "Hainaut",
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
        refnis: "51065"
      },
      {
        refnis: "57003"
      },
      {
        refnis: "57018"
      },
      {
        refnis: "57081",
        partial: true
      },
      {
        refnis: "57095"
      }
    ],
    territory: {
      nl: "De stad Antoing en de gemeenten Celles, Frasnes-lez-Anvaing en Mont-de-l'Enclus en het gedeelte van het grondgebied van de stad Doornik gelegen op de rechteroever van de Schelde",
      fr: "La ville d'Antoing et les communes de Celles, de Frasnes-lez-Anvaing et de Mont-de-l'Enclus et la partie du territoire de la ville de Tournai situ\xE9e sur la rive droite de l'Escaut"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.19"
  },
  {
    id: "Tournai2",
    arrondissement: "Hainaut",
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
        refnis: "57027"
      },
      {
        refnis: "57062"
      },
      {
        refnis: "57072"
      },
      {
        refnis: "57081",
        partial: true
      },
      {
        refnis: "57093"
      }
    ],
    territory: {
      nl: "De gemeenten Brunehaut, Estaimpuis, Pecq, Rumes en het gedeelte van het grondgebied van de stad Doornik gelegen op de linkeroever van de Schelde",
      fr: "Les communes de Brunehaut, d'Estaimpuis, de Pecq, de Rumes et la partie du territoire de la ville de Tournai situ\xE9e sur la rive gauche de l'Escaut"
    },
    source: "Ger.W. bijvoegsel art. 1, afdeling 11.20"
  }
];

// data/judicial-areas.json
var judicial_areas_default = [
  {
    id: "Antwerp",
    name: {
      nl: "Antwerpen",
      fr: "Anvers",
      de: "Antwerpen"
    }
  },
  {
    id: "Brussels",
    name: {
      nl: "Brussel",
      fr: "Bruxelles",
      de: "Br\xFCssel"
    }
  },
  {
    id: "Ghent",
    name: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    }
  },
  {
    id: "Liege",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge",
      de: "L\xFCttich"
    }
  },
  {
    id: "Mons",
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
    refnis: "11001",
    name: {
      nl: "Aartselaar",
      fr: "Aartselaar"
    },
    province: "10000"
  },
  {
    refnis: "11002",
    name: {
      nl: "Antwerpen",
      fr: "Anvers"
    },
    province: "10000"
  },
  {
    refnis: "11004",
    name: {
      nl: "Boechout",
      fr: "Boechout"
    },
    province: "10000"
  },
  {
    refnis: "11005",
    name: {
      nl: "Boom",
      fr: "Boom"
    },
    province: "10000"
  },
  {
    refnis: "11008",
    name: {
      nl: "Brasschaat",
      fr: "Brasschaat"
    },
    province: "10000"
  },
  {
    refnis: "11009",
    name: {
      nl: "Brecht",
      fr: "Brecht"
    },
    province: "10000"
  },
  {
    refnis: "11013",
    name: {
      nl: "Edegem",
      fr: "Edegem"
    },
    province: "10000"
  },
  {
    refnis: "11016",
    name: {
      nl: "Essen",
      fr: "Essen"
    },
    province: "10000"
  },
  {
    refnis: "11018",
    name: {
      nl: "Hemiksem",
      fr: "Hemiksem"
    },
    province: "10000"
  },
  {
    refnis: "11021",
    name: {
      nl: "Hove",
      fr: "Hove"
    },
    province: "10000"
  },
  {
    refnis: "11022",
    name: {
      nl: "Kalmthout",
      fr: "Kalmthout"
    },
    province: "10000"
  },
  {
    refnis: "11023",
    name: {
      nl: "Kapellen",
      fr: "Kapellen"
    },
    province: "10000"
  },
  {
    refnis: "11024",
    name: {
      nl: "Kontich",
      fr: "Kontich"
    },
    province: "10000"
  },
  {
    refnis: "11025",
    name: {
      nl: "Lint",
      fr: "Lint"
    },
    province: "10000"
  },
  {
    refnis: "11029",
    name: {
      nl: "Mortsel",
      fr: "Mortsel"
    },
    province: "10000"
  },
  {
    refnis: "11030",
    name: {
      nl: "Niel",
      fr: "Niel"
    },
    province: "10000"
  },
  {
    refnis: "11035",
    name: {
      nl: "Ranst",
      fr: "Ranst"
    },
    province: "10000"
  },
  {
    refnis: "11037",
    name: {
      nl: "Rumst",
      fr: "Rumst"
    },
    province: "10000"
  },
  {
    refnis: "11038",
    name: {
      nl: "Schelle",
      fr: "Schelle"
    },
    province: "10000"
  },
  {
    refnis: "11039",
    name: {
      nl: "Schilde",
      fr: "Schilde"
    },
    province: "10000"
  },
  {
    refnis: "11040",
    name: {
      nl: "Schoten",
      fr: "Schoten"
    },
    province: "10000"
  },
  {
    refnis: "11044",
    name: {
      nl: "Stabroek",
      fr: "Stabroek"
    },
    province: "10000"
  },
  {
    refnis: "11050",
    name: {
      nl: "Wijnegem",
      fr: "Wijnegem"
    },
    province: "10000"
  },
  {
    refnis: "11052",
    name: {
      nl: "Wommelgem",
      fr: "Wommelgem"
    },
    province: "10000"
  },
  {
    refnis: "11053",
    name: {
      nl: "Wuustwezel",
      fr: "Wuustwezel"
    },
    province: "10000"
  },
  {
    refnis: "11054",
    name: {
      nl: "Zandhoven",
      fr: "Zandhoven"
    },
    province: "10000"
  },
  {
    refnis: "11055",
    name: {
      nl: "Zoersel",
      fr: "Zoersel"
    },
    province: "10000"
  },
  {
    refnis: "11057",
    name: {
      nl: "Malle",
      fr: "Malle"
    },
    province: "10000"
  },
  {
    refnis: "12002",
    name: {
      nl: "Berlaar",
      fr: "Berlaar"
    },
    province: "10000"
  },
  {
    refnis: "12005",
    name: {
      nl: "Bonheiden",
      fr: "Bonheiden"
    },
    province: "10000"
  },
  {
    refnis: "12007",
    name: {
      nl: "Bornem",
      fr: "Bornem"
    },
    province: "10000"
  },
  {
    refnis: "12009",
    name: {
      nl: "Duffel",
      fr: "Duffel"
    },
    province: "10000"
  },
  {
    refnis: "12014",
    name: {
      nl: "Heist-op-den-Berg",
      fr: "Heist-op-den-Berg"
    },
    province: "10000"
  },
  {
    refnis: "12021",
    name: {
      nl: "Lier",
      fr: "Lierre"
    },
    province: "10000"
  },
  {
    refnis: "12025",
    name: {
      nl: "Mechelen",
      fr: "Malines"
    },
    province: "10000"
  },
  {
    refnis: "12026",
    name: {
      nl: "Nijlen",
      fr: "Nijlen"
    },
    province: "10000"
  },
  {
    refnis: "12029",
    name: {
      nl: "Putte",
      fr: "Putte"
    },
    province: "10000"
  },
  {
    refnis: "12035",
    name: {
      nl: "Sint-Katelijne-Waver",
      fr: "Sint-Katelijne-Waver"
    },
    province: "10000"
  },
  {
    refnis: "12040",
    name: {
      nl: "Willebroek",
      fr: "Willebroek"
    },
    province: "10000"
  },
  {
    refnis: "12041",
    name: {
      nl: "Puurs-Sint-Amands",
      fr: "Puurs-Sint-Amands"
    },
    province: "10000"
  },
  {
    refnis: "13001",
    name: {
      nl: "Arendonk",
      fr: "Arendonk"
    },
    province: "10000"
  },
  {
    refnis: "13002",
    name: {
      nl: "Baarle-Hertog",
      fr: "Baerle-Duc"
    },
    province: "10000"
  },
  {
    refnis: "13003",
    name: {
      nl: "Balen",
      fr: "Balen"
    },
    province: "10000"
  },
  {
    refnis: "13004",
    name: {
      nl: "Beerse",
      fr: "Beerse"
    },
    province: "10000"
  },
  {
    refnis: "13006",
    name: {
      nl: "Dessel",
      fr: "Dessel"
    },
    province: "10000"
  },
  {
    refnis: "13008",
    name: {
      nl: "Geel",
      fr: "Geel"
    },
    province: "10000"
  },
  {
    refnis: "13010",
    name: {
      nl: "Grobbendonk",
      fr: "Grobbendonk"
    },
    province: "10000"
  },
  {
    refnis: "13011",
    name: {
      nl: "Herentals",
      fr: "Herentals"
    },
    province: "10000"
  },
  {
    refnis: "13012",
    name: {
      nl: "Herenthout",
      fr: "Herenthout"
    },
    province: "10000"
  },
  {
    refnis: "13013",
    name: {
      nl: "Herselt",
      fr: "Herselt"
    },
    province: "10000"
  },
  {
    refnis: "13014",
    name: {
      nl: "Hoogstraten",
      fr: "Hoogstraten"
    },
    province: "10000"
  },
  {
    refnis: "13016",
    name: {
      nl: "Hulshout",
      fr: "Hulshout"
    },
    province: "10000"
  },
  {
    refnis: "13017",
    name: {
      nl: "Kasterlee",
      fr: "Kasterlee"
    },
    province: "10000"
  },
  {
    refnis: "13019",
    name: {
      nl: "Lille",
      fr: "Lille"
    },
    province: "10000"
  },
  {
    refnis: "13021",
    name: {
      nl: "Meerhout",
      fr: "Meerhout"
    },
    province: "10000"
  },
  {
    refnis: "13023",
    name: {
      nl: "Merksplas",
      fr: "Merksplas"
    },
    province: "10000"
  },
  {
    refnis: "13025",
    name: {
      nl: "Mol",
      fr: "Mol"
    },
    province: "10000"
  },
  {
    refnis: "13029",
    name: {
      nl: "Olen",
      fr: "Olen"
    },
    province: "10000"
  },
  {
    refnis: "13031",
    name: {
      nl: "Oud-Turnhout",
      fr: "Oud-Turnhout"
    },
    province: "10000"
  },
  {
    refnis: "13035",
    name: {
      nl: "Ravels",
      fr: "Ravels"
    },
    province: "10000"
  },
  {
    refnis: "13036",
    name: {
      nl: "Retie",
      fr: "Retie"
    },
    province: "10000"
  },
  {
    refnis: "13037",
    name: {
      nl: "Rijkevorsel",
      fr: "Rijkevorsel"
    },
    province: "10000"
  },
  {
    refnis: "13040",
    name: {
      nl: "Turnhout",
      fr: "Turnhout"
    },
    province: "10000"
  },
  {
    refnis: "13044",
    name: {
      nl: "Vorselaar",
      fr: "Vorselaar"
    },
    province: "10000"
  },
  {
    refnis: "13046",
    name: {
      nl: "Vosselaar",
      fr: "Vosselaar"
    },
    province: "10000"
  },
  {
    refnis: "13049",
    name: {
      nl: "Westerlo",
      fr: "Westerlo"
    },
    province: "10000"
  },
  {
    refnis: "13053",
    name: {
      nl: "Laakdal",
      fr: "Laakdal"
    },
    province: "10000"
  },
  {
    refnis: "21001",
    name: {
      nl: "Anderlecht",
      fr: "Anderlecht"
    },
    province: "04000"
  },
  {
    refnis: "21002",
    name: {
      nl: "Oudergem",
      fr: "Auderghem"
    },
    province: "04000"
  },
  {
    refnis: "21003",
    name: {
      nl: "Sint-Agatha-Berchem",
      fr: "Berchem-Sainte-Agathe"
    },
    province: "04000"
  },
  {
    refnis: "21004",
    name: {
      nl: "Brussel",
      fr: "Bruxelles"
    },
    province: "04000"
  },
  {
    refnis: "21005",
    name: {
      nl: "Etterbeek",
      fr: "Etterbeek"
    },
    province: "04000"
  },
  {
    refnis: "21006",
    name: {
      nl: "Evere",
      fr: "Evere"
    },
    province: "04000"
  },
  {
    refnis: "21007",
    name: {
      nl: "Vorst",
      fr: "Forest"
    },
    province: "04000"
  },
  {
    refnis: "21008",
    name: {
      nl: "Ganshoren",
      fr: "Ganshoren"
    },
    province: "04000"
  },
  {
    refnis: "21009",
    name: {
      nl: "Elsene",
      fr: "Ixelles"
    },
    province: "04000"
  },
  {
    refnis: "21010",
    name: {
      nl: "Jette",
      fr: "Jette"
    },
    province: "04000"
  },
  {
    refnis: "21011",
    name: {
      nl: "Koekelberg",
      fr: "Koekelberg"
    },
    province: "04000"
  },
  {
    refnis: "21012",
    name: {
      nl: "Sint-Jans-Molenbeek",
      fr: "Molenbeek-Saint-Jean"
    },
    province: "04000"
  },
  {
    refnis: "21013",
    name: {
      nl: "Sint-Gillis",
      fr: "Saint-Gilles"
    },
    province: "04000"
  },
  {
    refnis: "21014",
    name: {
      nl: "Sint-Joost-ten-Node",
      fr: "Saint-Josse-ten-Noode"
    },
    province: "04000"
  },
  {
    refnis: "21015",
    name: {
      nl: "Schaarbeek",
      fr: "Schaerbeek"
    },
    province: "04000"
  },
  {
    refnis: "21016",
    name: {
      nl: "Ukkel",
      fr: "Uccle"
    },
    province: "04000"
  },
  {
    refnis: "21017",
    name: {
      nl: "Watermaal-Bosvoorde",
      fr: "Watermael-Boitsfort"
    },
    province: "04000"
  },
  {
    refnis: "21018",
    name: {
      nl: "Sint-Lambrechts-Woluwe",
      fr: "Woluwe-Saint-Lambert"
    },
    province: "04000"
  },
  {
    refnis: "21019",
    name: {
      nl: "Sint-Pieters-Woluwe",
      fr: "Woluwe-Saint-Pierre"
    },
    province: "04000"
  },
  {
    refnis: "23002",
    name: {
      nl: "Asse",
      fr: "Asse"
    },
    province: "20001"
  },
  {
    refnis: "23003",
    name: {
      nl: "Beersel",
      fr: "Beersel"
    },
    province: "20001"
  },
  {
    refnis: "23009",
    name: {
      nl: "Bever",
      fr: "Bi\xE9v\xE8ne"
    },
    province: "20001"
  },
  {
    refnis: "23016",
    name: {
      nl: "Dilbeek",
      fr: "Dilbeek"
    },
    province: "20001"
  },
  {
    refnis: "23025",
    name: {
      nl: "Grimbergen",
      fr: "Grimbergen"
    },
    province: "20001"
  },
  {
    refnis: "23027",
    name: {
      nl: "Halle",
      fr: "Hal"
    },
    province: "20001"
  },
  {
    refnis: "23033",
    name: {
      nl: "Hoeilaart",
      fr: "Hoeilaart"
    },
    province: "20001"
  },
  {
    refnis: "23038",
    name: {
      nl: "Kampenhout",
      fr: "Kampenhout"
    },
    province: "20001"
  },
  {
    refnis: "23039",
    name: {
      nl: "Kapelle-op-den-Bos",
      fr: "Kapelle-op-den-Bos"
    },
    province: "20001"
  },
  {
    refnis: "23044",
    name: {
      nl: "Liedekerke",
      fr: "Liedekerke"
    },
    province: "20001"
  },
  {
    refnis: "23045",
    name: {
      nl: "Londerzeel",
      fr: "Londerzeel"
    },
    province: "20001"
  },
  {
    refnis: "23047",
    name: {
      nl: "Machelen",
      fr: "Machelen"
    },
    province: "20001"
  },
  {
    refnis: "23050",
    name: {
      nl: "Meise",
      fr: "Meise"
    },
    province: "20001"
  },
  {
    refnis: "23052",
    name: {
      nl: "Merchtem",
      fr: "Merchtem"
    },
    province: "20001"
  },
  {
    refnis: "23060",
    name: {
      nl: "Opwijk",
      fr: "Opwijk"
    },
    province: "20001"
  },
  {
    refnis: "23062",
    name: {
      nl: "Overijse",
      fr: "Overijse"
    },
    province: "20001"
  },
  {
    refnis: "23064",
    name: {
      nl: "Pepingen",
      fr: "Pepingen"
    },
    province: "20001"
  },
  {
    refnis: "23077",
    name: {
      nl: "Sint-Pieters-Leeuw",
      fr: "Sint-Pieters-Leeuw"
    },
    province: "20001"
  },
  {
    refnis: "23081",
    name: {
      nl: "Steenokkerzeel",
      fr: "Steenokkerzeel"
    },
    province: "20001"
  },
  {
    refnis: "23086",
    name: {
      nl: "Ternat",
      fr: "Ternat"
    },
    province: "20001"
  },
  {
    refnis: "23088",
    name: {
      nl: "Vilvoorde",
      fr: "Vilvorde"
    },
    province: "20001"
  },
  {
    refnis: "23094",
    name: {
      nl: "Zaventem",
      fr: "Zaventem"
    },
    province: "20001"
  },
  {
    refnis: "23096",
    name: {
      nl: "Zemst",
      fr: "Zemst"
    },
    province: "20001"
  },
  {
    refnis: "23097",
    name: {
      nl: "Roosdaal",
      fr: "Roosdaal"
    },
    province: "20001"
  },
  {
    refnis: "23098",
    name: {
      nl: "Drogenbos",
      fr: "Drogenbos"
    },
    province: "20001"
  },
  {
    refnis: "23099",
    name: {
      nl: "Kraainem",
      fr: "Kraainem"
    },
    province: "20001"
  },
  {
    refnis: "23100",
    name: {
      nl: "Linkebeek",
      fr: "Linkebeek"
    },
    province: "20001"
  },
  {
    refnis: "23101",
    name: {
      nl: "Sint-Genesius-Rode",
      fr: "Rhode-Saint-Gen\xE8se"
    },
    province: "20001"
  },
  {
    refnis: "23102",
    name: {
      nl: "Wemmel",
      fr: "Wemmel"
    },
    province: "20001"
  },
  {
    refnis: "23103",
    name: {
      nl: "Wezembeek-Oppem",
      fr: "Wezembeek-Oppem"
    },
    province: "20001"
  },
  {
    refnis: "23104",
    name: {
      nl: "Lennik",
      fr: "Lennik"
    },
    province: "20001"
  },
  {
    refnis: "23105",
    name: {
      nl: "Affligem",
      fr: "Affligem"
    },
    province: "20001"
  },
  {
    refnis: "23106",
    name: {
      nl: "Pajottegem",
      fr: "Pajottegem"
    },
    province: "20001"
  },
  {
    refnis: "24001",
    name: {
      nl: "Aarschot",
      fr: "Aarschot"
    },
    province: "20001"
  },
  {
    refnis: "24007",
    name: {
      nl: "Begijnendijk",
      fr: "Begijnendijk"
    },
    province: "20001"
  },
  {
    refnis: "24008",
    name: {
      nl: "Bekkevoort",
      fr: "Bekkevoort"
    },
    province: "20001"
  },
  {
    refnis: "24009",
    name: {
      nl: "Bertem",
      fr: "Bertem"
    },
    province: "20001"
  },
  {
    refnis: "24011",
    name: {
      nl: "Bierbeek",
      fr: "Bierbeek"
    },
    province: "20001"
  },
  {
    refnis: "24014",
    name: {
      nl: "Boortmeerbeek",
      fr: "Boortmeerbeek"
    },
    province: "20001"
  },
  {
    refnis: "24016",
    name: {
      nl: "Boutersem",
      fr: "Boutersem"
    },
    province: "20001"
  },
  {
    refnis: "24020",
    name: {
      nl: "Diest",
      fr: "Diest"
    },
    province: "20001"
  },
  {
    refnis: "24028",
    name: {
      nl: "Geetbets",
      fr: "Geetbets"
    },
    province: "20001"
  },
  {
    refnis: "24033",
    name: {
      nl: "Haacht",
      fr: "Haacht"
    },
    province: "20001"
  },
  {
    refnis: "24038",
    name: {
      nl: "Herent",
      fr: "Herent"
    },
    province: "20001"
  },
  {
    refnis: "24041",
    name: {
      nl: "Hoegaarden",
      fr: "Hoegaarden"
    },
    province: "20001"
  },
  {
    refnis: "24043",
    name: {
      nl: "Holsbeek",
      fr: "Holsbeek"
    },
    province: "20001"
  },
  {
    refnis: "24045",
    name: {
      nl: "Huldenberg",
      fr: "Huldenberg"
    },
    province: "20001"
  },
  {
    refnis: "24048",
    name: {
      nl: "Keerbergen",
      fr: "Keerbergen"
    },
    province: "20001"
  },
  {
    refnis: "24054",
    name: {
      nl: "Kortenaken",
      fr: "Kortenaken"
    },
    province: "20001"
  },
  {
    refnis: "24055",
    name: {
      nl: "Kortenberg",
      fr: "Kortenberg"
    },
    province: "20001"
  },
  {
    refnis: "24059",
    name: {
      nl: "Landen",
      fr: "Landen"
    },
    province: "20001"
  },
  {
    refnis: "24062",
    name: {
      nl: "Leuven",
      fr: "Louvain"
    },
    province: "20001"
  },
  {
    refnis: "24066",
    name: {
      nl: "Lubbeek",
      fr: "Lubbeek"
    },
    province: "20001"
  },
  {
    refnis: "24086",
    name: {
      nl: "Oud-Heverlee",
      fr: "Oud-Heverlee"
    },
    province: "20001"
  },
  {
    refnis: "24094",
    name: {
      nl: "Rotselaar",
      fr: "Rotselaar"
    },
    province: "20001"
  },
  {
    refnis: "24104",
    name: {
      nl: "Tervuren",
      fr: "Tervuren"
    },
    province: "20001"
  },
  {
    refnis: "24107",
    name: {
      nl: "Tienen",
      fr: "Tirlemont"
    },
    province: "20001"
  },
  {
    refnis: "24109",
    name: {
      nl: "Tremelo",
      fr: "Tremelo"
    },
    province: "20001"
  },
  {
    refnis: "24130",
    name: {
      nl: "Zoutleeuw",
      fr: "L\xE9au"
    },
    province: "20001"
  },
  {
    refnis: "24133",
    name: {
      nl: "Linter",
      fr: "Linter"
    },
    province: "20001"
  },
  {
    refnis: "24134",
    name: {
      nl: "Scherpenheuvel-Zichem",
      fr: "Montaigu-Zichem"
    },
    province: "20001"
  },
  {
    refnis: "24135",
    name: {
      nl: "Tielt-Winge",
      fr: "Tielt-Winge"
    },
    province: "20001"
  },
  {
    refnis: "24137",
    name: {
      nl: "Glabbeek",
      fr: "Glabbeek"
    },
    province: "20001"
  },
  {
    refnis: "25005",
    name: {
      nl: "Bevekom",
      fr: "Beauvechain"
    },
    province: "20002"
  },
  {
    refnis: "25014",
    name: {
      nl: "Eigenbrakel",
      fr: "Braine-l\u2019Alleud"
    },
    province: "20002"
  },
  {
    refnis: "25015",
    name: {
      nl: "Kasteelbrakel",
      fr: "Braine-le-Ch\xE2teau"
    },
    province: "20002"
  },
  {
    refnis: "25018",
    name: {
      nl: "Chaumont-Gistoux",
      fr: "Chaumont-Gistoux"
    },
    province: "20002"
  },
  {
    refnis: "25023",
    name: {
      nl: "Court-Saint-Etienne",
      fr: "Court-Saint-Etienne"
    },
    province: "20002"
  },
  {
    refnis: "25031",
    name: {
      nl: "Genepi\xEBn",
      fr: "Genappe"
    },
    province: "20002"
  },
  {
    refnis: "25037",
    name: {
      nl: "Graven",
      fr: "Grez-Doiceau"
    },
    province: "20002"
  },
  {
    refnis: "25043",
    name: {
      nl: "Incourt",
      fr: "Incourt"
    },
    province: "20002"
  },
  {
    refnis: "25044",
    name: {
      nl: "Itter",
      fr: "Ittre"
    },
    province: "20002"
  },
  {
    refnis: "25048",
    name: {
      nl: "Geldenaken",
      fr: "Jodoigne"
    },
    province: "20002"
  },
  {
    refnis: "25050",
    name: {
      nl: "Terhulpen",
      fr: "La Hulpe"
    },
    province: "20002"
  },
  {
    refnis: "25068",
    name: {
      nl: "Mont-Saint-Guibert",
      fr: "Mont-Saint-Guibert"
    },
    province: "20002"
  },
  {
    refnis: "25072",
    name: {
      nl: "Nijvel",
      fr: "Nivelles"
    },
    province: "20002"
  },
  {
    refnis: "25084",
    name: {
      nl: "Perwijs",
      fr: "Perwez"
    },
    province: "20002"
  },
  {
    refnis: "25091",
    name: {
      nl: "Rixensart",
      fr: "Rixensart"
    },
    province: "20002"
  },
  {
    refnis: "25105",
    name: {
      nl: "Tubeke",
      fr: "Tubize"
    },
    province: "20002"
  },
  {
    refnis: "25107",
    name: {
      nl: "Villers-la-Ville",
      fr: "Villers-la-Ville"
    },
    province: "20002"
  },
  {
    refnis: "25110",
    name: {
      nl: "Waterloo",
      fr: "Waterloo"
    },
    province: "20002"
  },
  {
    refnis: "25112",
    name: {
      nl: "Waver",
      fr: "Wavre"
    },
    province: "20002"
  },
  {
    refnis: "25117",
    name: {
      nl: "Chastre",
      fr: "Chastre"
    },
    province: "20002"
  },
  {
    refnis: "25118",
    name: {
      nl: "H\xE9l\xE9cine",
      fr: "H\xE9l\xE9cine"
    },
    province: "20002"
  },
  {
    refnis: "25119",
    name: {
      nl: "Lasne",
      fr: "Lasne"
    },
    province: "20002"
  },
  {
    refnis: "25120",
    name: {
      nl: "Orp-Jauche",
      fr: "Orp-Jauche"
    },
    province: "20002"
  },
  {
    refnis: "25121",
    name: {
      nl: "Ottignies-Louvain-la-Neuve",
      fr: "Ottignies-Louvain-la-Neuve"
    },
    province: "20002"
  },
  {
    refnis: "25122",
    name: {
      nl: "Ramillies",
      fr: "Ramillies"
    },
    province: "20002"
  },
  {
    refnis: "25123",
    name: {
      nl: "Rebecq",
      fr: "Rebecq"
    },
    province: "20002"
  },
  {
    refnis: "25124",
    name: {
      nl: "Walhain",
      fr: "Walhain"
    },
    province: "20002"
  },
  {
    refnis: "31003",
    name: {
      nl: "Beernem",
      fr: "Beernem"
    },
    province: "30000"
  },
  {
    refnis: "31004",
    name: {
      nl: "Blankenberge",
      fr: "Blankenberge"
    },
    province: "30000"
  },
  {
    refnis: "31005",
    name: {
      nl: "Brugge",
      fr: "Bruges"
    },
    province: "30000"
  },
  {
    refnis: "31006",
    name: {
      nl: "Damme",
      fr: "Damme"
    },
    province: "30000"
  },
  {
    refnis: "31012",
    name: {
      nl: "Jabbeke",
      fr: "Jabbeke"
    },
    province: "30000"
  },
  {
    refnis: "31022",
    name: {
      nl: "Oostkamp",
      fr: "Oostkamp"
    },
    province: "30000"
  },
  {
    refnis: "31033",
    name: {
      nl: "Torhout",
      fr: "Torhout"
    },
    province: "30000"
  },
  {
    refnis: "31040",
    name: {
      nl: "Zedelgem",
      fr: "Zedelgem"
    },
    province: "30000"
  },
  {
    refnis: "31042",
    name: {
      nl: "Zuienkerke",
      fr: "Zuienkerke"
    },
    province: "30000"
  },
  {
    refnis: "31043",
    name: {
      nl: "Knokke-Heist",
      fr: "Knokke-Heist"
    },
    province: "30000"
  },
  {
    refnis: "32003",
    name: {
      nl: "Diksmuide",
      fr: "Dixmude"
    },
    province: "30000"
  },
  {
    refnis: "32006",
    name: {
      nl: "Houthulst",
      fr: "Houthulst"
    },
    province: "30000"
  },
  {
    refnis: "32010",
    name: {
      nl: "Koekelare",
      fr: "Koekelare"
    },
    province: "30000"
  },
  {
    refnis: "32011",
    name: {
      nl: "Kortemark",
      fr: "Kortemark"
    },
    province: "30000"
  },
  {
    refnis: "32030",
    name: {
      nl: "Lo-Reninge",
      fr: "Lo-Reninge"
    },
    province: "30000"
  },
  {
    refnis: "33011",
    name: {
      nl: "Ieper",
      fr: "Ypres"
    },
    province: "30000"
  },
  {
    refnis: "33016",
    name: {
      nl: "Mesen",
      fr: "Messines"
    },
    province: "30000"
  },
  {
    refnis: "33021",
    name: {
      nl: "Poperinge",
      fr: "Poperinge"
    },
    province: "30000"
  },
  {
    refnis: "33029",
    name: {
      nl: "Wervik",
      fr: "Wervik"
    },
    province: "30000"
  },
  {
    refnis: "33037",
    name: {
      nl: "Zonnebeke",
      fr: "Zonnebeke"
    },
    province: "30000"
  },
  {
    refnis: "33039",
    name: {
      nl: "Heuvelland",
      fr: "Heuvelland"
    },
    province: "30000"
  },
  {
    refnis: "33040",
    name: {
      nl: "Langemark-Poelkapelle",
      fr: "Langemark-Poelkapelle"
    },
    province: "30000"
  },
  {
    refnis: "33041",
    name: {
      nl: "Vleteren",
      fr: "Vleteren"
    },
    province: "30000"
  },
  {
    refnis: "34002",
    name: {
      nl: "Anzegem",
      fr: "Anzegem"
    },
    province: "30000"
  },
  {
    refnis: "34003",
    name: {
      nl: "Avelgem",
      fr: "Avelgem"
    },
    province: "30000"
  },
  {
    refnis: "34009",
    name: {
      nl: "Deerlijk",
      fr: "Deerlijk"
    },
    province: "30000"
  },
  {
    refnis: "34013",
    name: {
      nl: "Harelbeke",
      fr: "Harelbeke"
    },
    province: "30000"
  },
  {
    refnis: "34022",
    name: {
      nl: "Kortrijk",
      fr: "Courtrai"
    },
    province: "30000"
  },
  {
    refnis: "34023",
    name: {
      nl: "Kuurne",
      fr: "Kuurne"
    },
    province: "30000"
  },
  {
    refnis: "34025",
    name: {
      nl: "Lendelede",
      fr: "Lendelede"
    },
    province: "30000"
  },
  {
    refnis: "34027",
    name: {
      nl: "Menen",
      fr: "Menin"
    },
    province: "30000"
  },
  {
    refnis: "34040",
    name: {
      nl: "Waregem",
      fr: "Waregem"
    },
    province: "30000"
  },
  {
    refnis: "34041",
    name: {
      nl: "Wevelgem",
      fr: "Wevelgem"
    },
    province: "30000"
  },
  {
    refnis: "34042",
    name: {
      nl: "Zwevegem",
      fr: "Zwevegem"
    },
    province: "30000"
  },
  {
    refnis: "34043",
    name: {
      nl: "Spiere-Helkijn",
      fr: "Espierres-Helchin"
    },
    province: "30000"
  },
  {
    refnis: "35002",
    name: {
      nl: "Bredene",
      fr: "Bredene"
    },
    province: "30000"
  },
  {
    refnis: "35005",
    name: {
      nl: "Gistel",
      fr: "Gistel"
    },
    province: "30000"
  },
  {
    refnis: "35006",
    name: {
      nl: "Ichtegem",
      fr: "Ichtegem"
    },
    province: "30000"
  },
  {
    refnis: "35011",
    name: {
      nl: "Middelkerke",
      fr: "Middelkerke"
    },
    province: "30000"
  },
  {
    refnis: "35013",
    name: {
      nl: "Oostende",
      fr: "Ostende"
    },
    province: "30000"
  },
  {
    refnis: "35014",
    name: {
      nl: "Oudenburg",
      fr: "Oudenburg"
    },
    province: "30000"
  },
  {
    refnis: "35029",
    name: {
      nl: "De Haan",
      fr: "De Haan"
    },
    province: "30000"
  },
  {
    refnis: "36006",
    name: {
      nl: "Hooglede",
      fr: "Hooglede"
    },
    province: "30000"
  },
  {
    refnis: "36007",
    name: {
      nl: "Ingelmunster",
      fr: "Ingelmunster"
    },
    province: "30000"
  },
  {
    refnis: "36008",
    name: {
      nl: "Izegem",
      fr: "Izegem"
    },
    province: "30000"
  },
  {
    refnis: "36010",
    name: {
      nl: "Ledegem",
      fr: "Ledegem"
    },
    province: "30000"
  },
  {
    refnis: "36011",
    name: {
      nl: "Lichtervelde",
      fr: "Lichtervelde"
    },
    province: "30000"
  },
  {
    refnis: "36012",
    name: {
      nl: "Moorslede",
      fr: "Moorslede"
    },
    province: "30000"
  },
  {
    refnis: "36015",
    name: {
      nl: "Roeselare",
      fr: "Roulers"
    },
    province: "30000"
  },
  {
    refnis: "36019",
    name: {
      nl: "Staden",
      fr: "Staden"
    },
    province: "30000"
  },
  {
    refnis: "37002",
    name: {
      nl: "Dentergem",
      fr: "Dentergem"
    },
    province: "30000"
  },
  {
    refnis: "37010",
    name: {
      nl: "Oostrozebeke",
      fr: "Oostrozebeke"
    },
    province: "30000"
  },
  {
    refnis: "37011",
    name: {
      nl: "Pittem",
      fr: "Pittem"
    },
    province: "30000"
  },
  {
    refnis: "37017",
    name: {
      nl: "Wielsbeke",
      fr: "Wielsbeke"
    },
    province: "30000"
  },
  {
    refnis: "37020",
    name: {
      nl: "Ardooie",
      fr: "Ardooie"
    },
    province: "30000"
  },
  {
    refnis: "37021",
    name: {
      nl: "Wingene",
      fr: "Wingene"
    },
    province: "30000"
  },
  {
    refnis: "37022",
    name: {
      nl: "Tielt",
      fr: "Tielt"
    },
    province: "30000"
  },
  {
    refnis: "38002",
    name: {
      nl: "Alveringem",
      fr: "Alveringem"
    },
    province: "30000"
  },
  {
    refnis: "38008",
    name: {
      nl: "De Panne",
      fr: "La Panne"
    },
    province: "30000"
  },
  {
    refnis: "38014",
    name: {
      nl: "Koksijde",
      fr: "Koksijde"
    },
    province: "30000"
  },
  {
    refnis: "38016",
    name: {
      nl: "Nieuwpoort",
      fr: "Nieuport"
    },
    province: "30000"
  },
  {
    refnis: "38025",
    name: {
      nl: "Veurne",
      fr: "Furnes"
    },
    province: "30000"
  },
  {
    refnis: "41002",
    name: {
      nl: "Aalst",
      fr: "Alost"
    },
    province: "40000"
  },
  {
    refnis: "41011",
    name: {
      nl: "Denderleeuw",
      fr: "Denderleeuw"
    },
    province: "40000"
  },
  {
    refnis: "41018",
    name: {
      nl: "Geraardsbergen",
      fr: "Grammont"
    },
    province: "40000"
  },
  {
    refnis: "41024",
    name: {
      nl: "Haaltert",
      fr: "Haaltert"
    },
    province: "40000"
  },
  {
    refnis: "41027",
    name: {
      nl: "Herzele",
      fr: "Herzele"
    },
    province: "40000"
  },
  {
    refnis: "41034",
    name: {
      nl: "Lede",
      fr: "Lede"
    },
    province: "40000"
  },
  {
    refnis: "41048",
    name: {
      nl: "Ninove",
      fr: "Ninove"
    },
    province: "40000"
  },
  {
    refnis: "41063",
    name: {
      nl: "Sint-Lievens-Houtem",
      fr: "Sint-Lievens-Houtem"
    },
    province: "40000"
  },
  {
    refnis: "41081",
    name: {
      nl: "Zottegem",
      fr: "Zottegem"
    },
    province: "40000"
  },
  {
    refnis: "41082",
    name: {
      nl: "Erpe-Mere",
      fr: "Erpe-Mere"
    },
    province: "40000"
  },
  {
    refnis: "42003",
    name: {
      nl: "Berlare",
      fr: "Berlare"
    },
    province: "40000"
  },
  {
    refnis: "42004",
    name: {
      nl: "Buggenhout",
      fr: "Buggenhout"
    },
    province: "40000"
  },
  {
    refnis: "42006",
    name: {
      nl: "Dendermonde",
      fr: "Termonde"
    },
    province: "40000"
  },
  {
    refnis: "42008",
    name: {
      nl: "Hamme",
      fr: "Hamme"
    },
    province: "40000"
  },
  {
    refnis: "42010",
    name: {
      nl: "Laarne",
      fr: "Laarne"
    },
    province: "40000"
  },
  {
    refnis: "42011",
    name: {
      nl: "Lebbeke",
      fr: "Lebbeke"
    },
    province: "40000"
  },
  {
    refnis: "42023",
    name: {
      nl: "Waasmunster",
      fr: "Waasmunster"
    },
    province: "40000"
  },
  {
    refnis: "42025",
    name: {
      nl: "Wetteren",
      fr: "Wetteren"
    },
    province: "40000"
  },
  {
    refnis: "42026",
    name: {
      nl: "Wichelen",
      fr: "Wichelen"
    },
    province: "40000"
  },
  {
    refnis: "42028",
    name: {
      nl: "Zele",
      fr: "Zele"
    },
    province: "40000"
  },
  {
    refnis: "43002",
    name: {
      nl: "Assenede",
      fr: "Assenede"
    },
    province: "40000"
  },
  {
    refnis: "43005",
    name: {
      nl: "Eeklo",
      fr: "Eeklo"
    },
    province: "40000"
  },
  {
    refnis: "43007",
    name: {
      nl: "Kaprijke",
      fr: "Kaprijke"
    },
    province: "40000"
  },
  {
    refnis: "43010",
    name: {
      nl: "Maldegem",
      fr: "Maldegem"
    },
    province: "40000"
  },
  {
    refnis: "43014",
    name: {
      nl: "Sint-Laureins",
      fr: "Sint-Laureins"
    },
    province: "40000"
  },
  {
    refnis: "43018",
    name: {
      nl: "Zelzate",
      fr: "Zelzate"
    },
    province: "40000"
  },
  {
    refnis: "44013",
    name: {
      nl: "Destelbergen",
      fr: "Destelbergen"
    },
    province: "40000"
  },
  {
    refnis: "44019",
    name: {
      nl: "Evergem",
      fr: "Evergem"
    },
    province: "40000"
  },
  {
    refnis: "44020",
    name: {
      nl: "Gavere",
      fr: "Gavere"
    },
    province: "40000"
  },
  {
    refnis: "44021",
    name: {
      nl: "Gent",
      fr: "Gand"
    },
    province: "40000"
  },
  {
    refnis: "44052",
    name: {
      nl: "Oosterzele",
      fr: "Oosterzele"
    },
    province: "40000"
  },
  {
    refnis: "44064",
    name: {
      nl: "Sint-Martens-Latem",
      fr: "Sint-Martens-Latem"
    },
    province: "40000"
  },
  {
    refnis: "44081",
    name: {
      nl: "Zulte",
      fr: "Zulte"
    },
    province: "40000"
  },
  {
    refnis: "44083",
    name: {
      nl: "Deinze",
      fr: "Deinze"
    },
    province: "40000"
  },
  {
    refnis: "44084",
    name: {
      nl: "Aalter",
      fr: "Aalter"
    },
    province: "40000"
  },
  {
    refnis: "44085",
    name: {
      nl: "Lievegem",
      fr: "Lievegem"
    },
    province: "40000"
  },
  {
    refnis: "44086",
    name: {
      nl: "Nazareth-De Pinte",
      fr: "Nazareth-De Pinte"
    },
    province: "40000"
  },
  {
    refnis: "44087",
    name: {
      nl: "Lochristi",
      fr: "Lochristi"
    },
    province: "40000"
  },
  {
    refnis: "44088",
    name: {
      nl: "Merelbeke-Melle",
      fr: "Merelbeke-Melle"
    },
    province: "40000"
  },
  {
    refnis: "45035",
    name: {
      nl: "Oudenaarde",
      fr: "Audenarde"
    },
    province: "40000"
  },
  {
    refnis: "45041",
    name: {
      nl: "Ronse",
      fr: "Renaix"
    },
    province: "40000"
  },
  {
    refnis: "45059",
    name: {
      nl: "Brakel",
      fr: "Brakel"
    },
    province: "40000"
  },
  {
    refnis: "45060",
    name: {
      nl: "Kluisbergen",
      fr: "Kluisbergen"
    },
    province: "40000"
  },
  {
    refnis: "45061",
    name: {
      nl: "Wortegem-Petegem",
      fr: "Wortegem-Petegem"
    },
    province: "40000"
  },
  {
    refnis: "45062",
    name: {
      nl: "Horebeke",
      fr: "Horebeke"
    },
    province: "40000"
  },
  {
    refnis: "45063",
    name: {
      nl: "Lierde",
      fr: "Lierde"
    },
    province: "40000"
  },
  {
    refnis: "45064",
    name: {
      nl: "Maarkedal",
      fr: "Maarkedal"
    },
    province: "40000"
  },
  {
    refnis: "45065",
    name: {
      nl: "Zwalm",
      fr: "Zwalin"
    },
    province: "40000"
  },
  {
    refnis: "45068",
    name: {
      nl: "Kruisem",
      fr: "Kruisem"
    },
    province: "40000"
  },
  {
    refnis: "46020",
    name: {
      nl: "Sint-Gillis-Waas",
      fr: "Sint-Gillis-Waas"
    },
    province: "40000"
  },
  {
    refnis: "46021",
    name: {
      nl: "Sint-Niklaas",
      fr: "Sint-Niklaas"
    },
    province: "40000"
  },
  {
    refnis: "46024",
    name: {
      nl: "Stekene",
      fr: "Stekene"
    },
    province: "40000"
  },
  {
    refnis: "46025",
    name: {
      nl: "Temse",
      fr: "Tamise"
    },
    province: "40000"
  },
  {
    refnis: "46029",
    name: {
      nl: "Lokeren",
      fr: "Lokeren"
    },
    province: "40000"
  },
  {
    refnis: "46030",
    name: {
      nl: "Beveren-Kruibeke-Zwijndrecht",
      fr: "Beveren-Kruibeke-Zwijndrecht"
    },
    province: "40000"
  },
  {
    refnis: "51004",
    name: {
      nl: "Aat",
      fr: "Ath"
    },
    province: "50000"
  },
  {
    refnis: "51008",
    name: {
      nl: "Beloeil",
      fr: "Beloeil"
    },
    province: "50000"
  },
  {
    refnis: "51009",
    name: {
      nl: "Bernissart",
      fr: "Bernissart"
    },
    province: "50000"
  },
  {
    refnis: "51012",
    name: {
      nl: "Brugelette",
      fr: "Brugelette"
    },
    province: "50000"
  },
  {
    refnis: "51014",
    name: {
      nl: "Chi\xE8vres",
      fr: "Chi\xE8vres"
    },
    province: "50000"
  },
  {
    refnis: "51017",
    name: {
      nl: "Elzele",
      fr: "Ellezelles"
    },
    province: "50000"
  },
  {
    refnis: "51019",
    name: {
      nl: "Vloesberg",
      fr: "Flobecq"
    },
    province: "50000"
  },
  {
    refnis: "51065",
    name: {
      nl: "Frasnes-lez-Anvaing",
      fr: "Frasnes-lez-Anvaing"
    },
    province: "50000"
  },
  {
    refnis: "51067",
    name: {
      nl: "Edingen",
      fr: "Enghien"
    },
    province: "50000"
  },
  {
    refnis: "51068",
    name: {
      nl: "Opzullik",
      fr: "Silly"
    },
    province: "50000"
  },
  {
    refnis: "51069",
    name: {
      nl: "Lessen",
      fr: "Lessines"
    },
    province: "50000"
  },
  {
    refnis: "52010",
    name: {
      nl: "Chapelle-lez-Herlaimont",
      fr: "Chapelle-lez-Herlaimont"
    },
    province: "50000"
  },
  {
    refnis: "52011",
    name: {
      nl: "Charleroi",
      fr: "Charleroi"
    },
    province: "50000"
  },
  {
    refnis: "52012",
    name: {
      nl: "Ch\xE2telet",
      fr: "Ch\xE2telet"
    },
    province: "50000"
  },
  {
    refnis: "52015",
    name: {
      nl: "Courcelles",
      fr: "Courcelles"
    },
    province: "50000"
  },
  {
    refnis: "52018",
    name: {
      nl: "Farciennes",
      fr: "Farciennes"
    },
    province: "50000"
  },
  {
    refnis: "52021",
    name: {
      nl: "Fleurus",
      fr: "Fleurus"
    },
    province: "50000"
  },
  {
    refnis: "52022",
    name: {
      nl: "Fontaine-l\u2019Ev\xEAque",
      fr: "Fontaine-l\u2019Ev\xEAque"
    },
    province: "50000"
  },
  {
    refnis: "52025",
    name: {
      nl: "Gerpinnes",
      fr: "Gerpinnes"
    },
    province: "50000"
  },
  {
    refnis: "52048",
    name: {
      nl: "Montigny-le-Tilleul",
      fr: "Montigny-le-Tilleul"
    },
    province: "50000"
  },
  {
    refnis: "52055",
    name: {
      nl: "Pont-\xE0-Celles",
      fr: "Pont-\xE0-Celles"
    },
    province: "50000"
  },
  {
    refnis: "52074",
    name: {
      nl: "Aiseau-Presles",
      fr: "Aiseau-Presles"
    },
    province: "50000"
  },
  {
    refnis: "52075",
    name: {
      nl: "Les Bons Villers",
      fr: "Les Bons Villers"
    },
    province: "50000"
  },
  {
    refnis: "53014",
    name: {
      nl: "Boussu",
      fr: "Boussu"
    },
    province: "50000"
  },
  {
    refnis: "53020",
    name: {
      nl: "Dour",
      fr: "Dour"
    },
    province: "50000"
  },
  {
    refnis: "53028",
    name: {
      nl: "Frameries",
      fr: "Frameries"
    },
    province: "50000"
  },
  {
    refnis: "53039",
    name: {
      nl: "Hensies",
      fr: "Hensies"
    },
    province: "50000"
  },
  {
    refnis: "53044",
    name: {
      nl: "Jurbeke",
      fr: "Jurbise"
    },
    province: "50000"
  },
  {
    refnis: "53046",
    name: {
      nl: "Lens",
      fr: "Lens"
    },
    province: "50000"
  },
  {
    refnis: "53053",
    name: {
      nl: "Bergen",
      fr: "Mons"
    },
    province: "50000"
  },
  {
    refnis: "53065",
    name: {
      nl: "Quaregnon",
      fr: "Quaregnon"
    },
    province: "50000"
  },
  {
    refnis: "53068",
    name: {
      nl: "Qui\xE9vrain",
      fr: "Qui\xE9vrain"
    },
    province: "50000"
  },
  {
    refnis: "53070",
    name: {
      nl: "Saint-Ghislain",
      fr: "Saint-Ghislain"
    },
    province: "50000"
  },
  {
    refnis: "53082",
    name: {
      nl: "Colfontaine",
      fr: "Colfontaine"
    },
    province: "50000"
  },
  {
    refnis: "53083",
    name: {
      nl: "Honnelles",
      fr: "Honnelles"
    },
    province: "50000"
  },
  {
    refnis: "53084",
    name: {
      nl: "Qu\xE9vy",
      fr: "Qu\xE9vy"
    },
    province: "50000"
  },
  {
    refnis: "55004",
    name: {
      nl: "\u2019s Gravenbrakel",
      fr: "Braine-le-Comte"
    },
    province: "50000"
  },
  {
    refnis: "55035",
    name: {
      nl: "Le Roeulx",
      fr: "Le Roeulx"
    },
    province: "50000"
  },
  {
    refnis: "55040",
    name: {
      nl: "Zinnik",
      fr: "Soignies"
    },
    province: "50000"
  },
  {
    refnis: "55050",
    name: {
      nl: "Ecaussinnes",
      fr: "Ecaussinnes"
    },
    province: "50000"
  },
  {
    refnis: "55085",
    name: {
      nl: "Seneffe",
      fr: "Seneffe"
    },
    province: "50000"
  },
  {
    refnis: "55086",
    name: {
      nl: "Manage",
      fr: "Manage"
    },
    province: "50000"
  },
  {
    refnis: "56001",
    name: {
      nl: "Anderlues",
      fr: "Anderlues"
    },
    province: "50000"
  },
  {
    refnis: "56005",
    name: {
      nl: "Beaumont",
      fr: "Beaumont"
    },
    province: "50000"
  },
  {
    refnis: "56016",
    name: {
      nl: "Chimay",
      fr: "Chimay"
    },
    province: "50000"
  },
  {
    refnis: "56022",
    name: {
      nl: "Erquelinnes",
      fr: "Erquelinnes"
    },
    province: "50000"
  },
  {
    refnis: "56029",
    name: {
      nl: "Froidchapelle",
      fr: "Froidchapelle"
    },
    province: "50000"
  },
  {
    refnis: "56044",
    name: {
      nl: "Lobbes",
      fr: "Lobbes"
    },
    province: "50000"
  },
  {
    refnis: "56049",
    name: {
      nl: "Merbes-le-Ch\xE2teau",
      fr: "Merbes-le-Ch\xE2teau"
    },
    province: "50000"
  },
  {
    refnis: "56051",
    name: {
      nl: "Momignies",
      fr: "Momignies"
    },
    province: "50000"
  },
  {
    refnis: "56078",
    name: {
      nl: "Thuin",
      fr: "Thuin"
    },
    province: "50000"
  },
  {
    refnis: "56086",
    name: {
      nl: "Ham-sur-Heure-Nalinnes",
      fr: "Ham-sur-Heure-Nalinnes"
    },
    province: "50000"
  },
  {
    refnis: "56088",
    name: {
      nl: "Sivry-Rance",
      fr: "Sivry-Rance"
    },
    province: "50000"
  },
  {
    refnis: "57003",
    name: {
      nl: "Antoing",
      fr: "Antoing"
    },
    province: "50000"
  },
  {
    refnis: "57018",
    name: {
      nl: "Celles",
      fr: "Celles"
    },
    province: "50000"
  },
  {
    refnis: "57027",
    name: {
      nl: "Estaimpuis",
      fr: "Estaimpuis"
    },
    province: "50000"
  },
  {
    refnis: "57062",
    name: {
      nl: "Pecq",
      fr: "Pecq"
    },
    province: "50000"
  },
  {
    refnis: "57064",
    name: {
      nl: "P\xE9ruwelz",
      fr: "P\xE9ruwelz"
    },
    province: "50000"
  },
  {
    refnis: "57072",
    name: {
      nl: "Rumes",
      fr: "Rumes"
    },
    province: "50000"
  },
  {
    refnis: "57081",
    name: {
      nl: "Doornik",
      fr: "Tournai"
    },
    province: "50000"
  },
  {
    refnis: "57093",
    name: {
      nl: "Brunehaut",
      fr: "Brunehaut"
    },
    province: "50000"
  },
  {
    refnis: "57094",
    name: {
      nl: "Leuze-en-Hainaut",
      fr: "Leuze-en-Hainaut"
    },
    province: "50000"
  },
  {
    refnis: "57095",
    name: {
      nl: "Mont-de-l\u2019Enclus",
      fr: "Mont-de-l\u2019Enclus"
    },
    province: "50000"
  },
  {
    refnis: "57096",
    name: {
      nl: "Moeskroen",
      fr: "Mouscron"
    },
    province: "50000"
  },
  {
    refnis: "57097",
    name: {
      nl: "Komen-Waasten",
      fr: "Comines-Warneton"
    },
    province: "50000"
  },
  {
    refnis: "58001",
    name: {
      nl: "La Louvi\xE8re",
      fr: "La Louvi\xE8re"
    },
    province: "50000"
  },
  {
    refnis: "58002",
    name: {
      nl: "Binche",
      fr: "Binche"
    },
    province: "50000"
  },
  {
    refnis: "58003",
    name: {
      nl: "Estinnes",
      fr: "Estinnes"
    },
    province: "50000"
  },
  {
    refnis: "58004",
    name: {
      nl: "Morlanwelz",
      fr: "Morlanwelz"
    },
    province: "50000"
  },
  {
    refnis: "61003",
    name: {
      nl: "Amay",
      fr: "Amay"
    },
    province: "60000"
  },
  {
    refnis: "61010",
    name: {
      nl: "Burdinne",
      fr: "Burdinne"
    },
    province: "60000"
  },
  {
    refnis: "61012",
    name: {
      nl: "Clavier",
      fr: "Clavier"
    },
    province: "60000"
  },
  {
    refnis: "61019",
    name: {
      nl: "Ferri\xE8res",
      fr: "Ferri\xE8res"
    },
    province: "60000"
  },
  {
    refnis: "61024",
    name: {
      nl: "Hamoir",
      fr: "Hamoir"
    },
    province: "60000"
  },
  {
    refnis: "61028",
    name: {
      nl: "H\xE9ron",
      fr: "H\xE9ron"
    },
    province: "60000"
  },
  {
    refnis: "61031",
    name: {
      nl: "Hoei",
      fr: "Huy"
    },
    province: "60000"
  },
  {
    refnis: "61039",
    name: {
      nl: "Marchin",
      fr: "Marchin"
    },
    province: "60000"
  },
  {
    refnis: "61041",
    name: {
      nl: "Modave",
      fr: "Modave"
    },
    province: "60000"
  },
  {
    refnis: "61043",
    name: {
      nl: "Nandrin",
      fr: "Nandrin"
    },
    province: "60000"
  },
  {
    refnis: "61048",
    name: {
      nl: "Ouffet",
      fr: "Ouffet"
    },
    province: "60000"
  },
  {
    refnis: "61063",
    name: {
      nl: "Verlaine",
      fr: "Verlaine"
    },
    province: "60000"
  },
  {
    refnis: "61068",
    name: {
      nl: "Villers-Le-Bouillet",
      fr: "Villers-Le-Bouillet"
    },
    province: "60000"
  },
  {
    refnis: "61072",
    name: {
      nl: "Wanze",
      fr: "Wanze"
    },
    province: "60000"
  },
  {
    refnis: "61079",
    name: {
      nl: "Anthisnes",
      fr: "Anthisnes"
    },
    province: "60000"
  },
  {
    refnis: "61080",
    name: {
      nl: "Engis",
      fr: "Engis"
    },
    province: "60000"
  },
  {
    refnis: "61081",
    name: {
      nl: "Tinlot",
      fr: "Tinlot"
    },
    province: "60000"
  },
  {
    refnis: "62003",
    name: {
      nl: "Ans",
      fr: "Ans"
    },
    province: "60000"
  },
  {
    refnis: "62006",
    name: {
      nl: "Awans",
      fr: "Awans"
    },
    province: "60000"
  },
  {
    refnis: "62009",
    name: {
      nl: "Aywaille",
      fr: "Aywaille"
    },
    province: "60000"
  },
  {
    refnis: "62011",
    name: {
      nl: "Bitsingen",
      fr: "Bassenge"
    },
    province: "60000"
  },
  {
    refnis: "62015",
    name: {
      nl: "Beyne-Heusay",
      fr: "Beyne-Heusay"
    },
    province: "60000"
  },
  {
    refnis: "62022",
    name: {
      nl: "Chaudfontaine",
      fr: "Chaudfontaine"
    },
    province: "60000"
  },
  {
    refnis: "62026",
    name: {
      nl: "Comblain-au-Pont",
      fr: "Comblain-au-Pont"
    },
    province: "60000"
  },
  {
    refnis: "62027",
    name: {
      nl: "Dalhem",
      fr: "Dalhem"
    },
    province: "60000"
  },
  {
    refnis: "62032",
    name: {
      nl: "Esneux",
      fr: "Esneux"
    },
    province: "60000"
  },
  {
    refnis: "62038",
    name: {
      nl: "Fl\xE9ron",
      fr: "Fl\xE9ron"
    },
    province: "60000"
  },
  {
    refnis: "62051",
    name: {
      nl: "Herstal",
      fr: "Herstal"
    },
    province: "60000"
  },
  {
    refnis: "62060",
    name: {
      nl: "Juprelle",
      fr: "Juprelle"
    },
    province: "60000"
  },
  {
    refnis: "62063",
    name: {
      nl: "Luik",
      fr: "Li\xE8ge"
    },
    province: "60000"
  },
  {
    refnis: "62079",
    name: {
      nl: "Oupeye",
      fr: "Oupeye"
    },
    province: "60000"
  },
  {
    refnis: "62093",
    name: {
      nl: "Saint-Nicolas",
      fr: "Saint-Nicolas"
    },
    province: "60000"
  },
  {
    refnis: "62096",
    name: {
      nl: "Seraing",
      fr: "Seraing"
    },
    province: "60000"
  },
  {
    refnis: "62099",
    name: {
      nl: "Soumagne",
      fr: "Soumagne"
    },
    province: "60000"
  },
  {
    refnis: "62100",
    name: {
      nl: "Sprimont",
      fr: "Sprimont"
    },
    province: "60000"
  },
  {
    refnis: "62108",
    name: {
      nl: "Wezet",
      fr: "Vis\xE9"
    },
    province: "60000"
  },
  {
    refnis: "62118",
    name: {
      nl: "Gr\xE2ce-Hollogne",
      fr: "Gr\xE2ce-Hollogne"
    },
    province: "60000"
  },
  {
    refnis: "62119",
    name: {
      nl: "Blegny",
      fr: "Blegny"
    },
    province: "60000"
  },
  {
    refnis: "62120",
    name: {
      nl: "Fl\xE9malle",
      fr: "Fl\xE9malle"
    },
    province: "60000"
  },
  {
    refnis: "62121",
    name: {
      nl: "Neupr\xE9",
      fr: "Neupr\xE9"
    },
    province: "60000"
  },
  {
    refnis: "62122",
    name: {
      nl: "Trooz",
      fr: "Trooz"
    },
    province: "60000"
  },
  {
    refnis: "63001",
    name: {
      nl: "Amel",
      fr: "Ambl\xE8ve"
    },
    province: "60000"
  },
  {
    refnis: "63003",
    name: {
      nl: "Aubel",
      fr: "Aubel"
    },
    province: "60000"
  },
  {
    refnis: "63004",
    name: {
      nl: "Baelen",
      fr: "Baelen"
    },
    province: "60000"
  },
  {
    refnis: "63012",
    name: {
      nl: "B\xFCllingen",
      fr: "Bullange"
    },
    province: "60000"
  },
  {
    refnis: "63013",
    name: {
      nl: "B\xFCtgenbach",
      fr: "Butgenbach"
    },
    province: "60000"
  },
  {
    refnis: "63020",
    name: {
      nl: "Dison",
      fr: "Dison"
    },
    province: "60000"
  },
  {
    refnis: "63023",
    name: {
      nl: "Eupen",
      fr: "Eupen"
    },
    province: "60000"
  },
  {
    refnis: "63035",
    name: {
      nl: "Herve",
      fr: "Herve"
    },
    province: "60000"
  },
  {
    refnis: "63038",
    name: {
      nl: "Jalhay",
      fr: "Jalhay"
    },
    province: "60000"
  },
  {
    refnis: "63040",
    name: {
      nl: "Kelmis",
      fr: "La Calamine"
    },
    province: "60000"
  },
  {
    refnis: "63045",
    name: {
      nl: "Lierneux",
      fr: "Lierneux"
    },
    province: "60000"
  },
  {
    refnis: "63046",
    name: {
      nl: "Limburg",
      fr: "Limbourg"
    },
    province: "60000"
  },
  {
    refnis: "63048",
    name: {
      nl: "Lontzen",
      fr: "Lontzen"
    },
    province: "60000"
  },
  {
    refnis: "63049",
    name: {
      nl: "Malmedy",
      fr: "Malmedy"
    },
    province: "60000"
  },
  {
    refnis: "63057",
    name: {
      nl: "Olne",
      fr: "Olne"
    },
    province: "60000"
  },
  {
    refnis: "63058",
    name: {
      nl: "Pepinster",
      fr: "Pepinster"
    },
    province: "60000"
  },
  {
    refnis: "63061",
    name: {
      nl: "Raeren",
      fr: "Raeren"
    },
    province: "60000"
  },
  {
    refnis: "63067",
    name: {
      nl: "Sankt Vith",
      fr: "Saint-Vith"
    },
    province: "60000"
  },
  {
    refnis: "63072",
    name: {
      nl: "Spa",
      fr: "Spa"
    },
    province: "60000"
  },
  {
    refnis: "63073",
    name: {
      nl: "Stavelot",
      fr: "Stavelot"
    },
    province: "60000"
  },
  {
    refnis: "63075",
    name: {
      nl: "Stoumont",
      fr: "Stoumont"
    },
    province: "60000"
  },
  {
    refnis: "63076",
    name: {
      nl: "Theux",
      fr: "Theux"
    },
    province: "60000"
  },
  {
    refnis: "63079",
    name: {
      nl: "Verviers",
      fr: "Verviers"
    },
    province: "60000"
  },
  {
    refnis: "63080",
    name: {
      nl: "Weismes",
      fr: "Waimes"
    },
    province: "60000"
  },
  {
    refnis: "63084",
    name: {
      nl: "Welkenraedt",
      fr: "Welkenraedt"
    },
    province: "60000"
  },
  {
    refnis: "63086",
    name: {
      nl: "Trois-Ponts",
      fr: "Trois-Ponts"
    },
    province: "60000"
  },
  {
    refnis: "63087",
    name: {
      nl: "Burg-Reuland",
      fr: "Burg-Reuland"
    },
    province: "60000"
  },
  {
    refnis: "63088",
    name: {
      nl: "Plombi\xE8res",
      fr: "Plombi\xE8res"
    },
    province: "60000"
  },
  {
    refnis: "63089",
    name: {
      nl: "Thimister-Clermont",
      fr: "Thimister-Clermont"
    },
    province: "60000"
  },
  {
    refnis: "64008",
    name: {
      nl: "Berloz",
      fr: "Berloz"
    },
    province: "60000"
  },
  {
    refnis: "64015",
    name: {
      nl: "Braives",
      fr: "Braives"
    },
    province: "60000"
  },
  {
    refnis: "64021",
    name: {
      nl: "Crisn\xE9e",
      fr: "Crisn\xE9e"
    },
    province: "60000"
  },
  {
    refnis: "64023",
    name: {
      nl: "Donceel",
      fr: "Donceel"
    },
    province: "60000"
  },
  {
    refnis: "64025",
    name: {
      nl: "Fexhe-le-Haut-Clocher",
      fr: "Fexhe-le-Haut-Clocher"
    },
    province: "60000"
  },
  {
    refnis: "64029",
    name: {
      nl: "Geer",
      fr: "Geer"
    },
    province: "60000"
  },
  {
    refnis: "64034",
    name: {
      nl: "Hannuit",
      fr: "Hannut"
    },
    province: "60000"
  },
  {
    refnis: "64047",
    name: {
      nl: "Lijsem",
      fr: "Lincent"
    },
    province: "60000"
  },
  {
    refnis: "64056",
    name: {
      nl: "Oerle",
      fr: "Oreye"
    },
    province: "60000"
  },
  {
    refnis: "64063",
    name: {
      nl: "Remicourt",
      fr: "Remicourt"
    },
    province: "60000"
  },
  {
    refnis: "64065",
    name: {
      nl: "Saint-Georges-sur-Meuse",
      fr: "Saint-Georges-sur-Meuse"
    },
    province: "60000"
  },
  {
    refnis: "64074",
    name: {
      nl: "Borgworm",
      fr: "Waremme"
    },
    province: "60000"
  },
  {
    refnis: "64075",
    name: {
      nl: "Wasseiges",
      fr: "Wasseiges"
    },
    province: "60000"
  },
  {
    refnis: "64076",
    name: {
      nl: "Faimes",
      fr: "Faimes"
    },
    province: "60000"
  },
  {
    refnis: "71002",
    name: {
      nl: "As",
      fr: "As"
    },
    province: "70000"
  },
  {
    refnis: "71004",
    name: {
      nl: "Beringen",
      fr: "Beringen"
    },
    province: "70000"
  },
  {
    refnis: "71011",
    name: {
      nl: "Diepenbeek",
      fr: "Diepenbeek"
    },
    province: "70000"
  },
  {
    refnis: "71016",
    name: {
      nl: "Genk",
      fr: "Genk"
    },
    province: "70000"
  },
  {
    refnis: "71017",
    name: {
      nl: "Gingelom",
      fr: "Gingelom"
    },
    province: "70000"
  },
  {
    refnis: "71020",
    name: {
      nl: "Halen",
      fr: "Halen"
    },
    province: "70000"
  },
  {
    refnis: "71024",
    name: {
      nl: "Herk-de-Stad",
      fr: "Herck-la-Ville"
    },
    province: "70000"
  },
  {
    refnis: "71034",
    name: {
      nl: "Leopoldsburg",
      fr: "Bourg-L\xE9opold"
    },
    province: "70000"
  },
  {
    refnis: "71037",
    name: {
      nl: "Lummen",
      fr: "Lummen"
    },
    province: "70000"
  },
  {
    refnis: "71045",
    name: {
      nl: "Nieuwerkerken",
      fr: "Nieuwerkerken"
    },
    province: "70000"
  },
  {
    refnis: "71053",
    name: {
      nl: "Sint-Truiden",
      fr: "Saint-Trond"
    },
    province: "70000"
  },
  {
    refnis: "71066",
    name: {
      nl: "Zonhoven",
      fr: "Zonhoven"
    },
    province: "70000"
  },
  {
    refnis: "71067",
    name: {
      nl: "Zutendaal",
      fr: "Zutendaal"
    },
    province: "70000"
  },
  {
    refnis: "71070",
    name: {
      nl: "Heusden-Zolder",
      fr: "Heusden-Zolder"
    },
    province: "70000"
  },
  {
    refnis: "71071",
    name: {
      nl: "Tessenderlo-Ham",
      fr: "Tessenderlo-Ham"
    },
    province: "70000"
  },
  {
    refnis: "71072",
    name: {
      nl: "Hasselt",
      fr: "Hasselt"
    },
    province: "70000"
  },
  {
    refnis: "72003",
    name: {
      nl: "Bocholt",
      fr: "Bocholt"
    },
    province: "70000"
  },
  {
    refnis: "72004",
    name: {
      nl: "Bree",
      fr: "Bree"
    },
    province: "70000"
  },
  {
    refnis: "72018",
    name: {
      nl: "Kinrooi",
      fr: "Kinrooi"
    },
    province: "70000"
  },
  {
    refnis: "72020",
    name: {
      nl: "Lommel",
      fr: "Lommel"
    },
    province: "70000"
  },
  {
    refnis: "72021",
    name: {
      nl: "Maaseik",
      fr: "Maaseik"
    },
    province: "70000"
  },
  {
    refnis: "72030",
    name: {
      nl: "Peer",
      fr: "Peer"
    },
    province: "70000"
  },
  {
    refnis: "72037",
    name: {
      nl: "Hamont-Achel",
      fr: "Hamont-Achel"
    },
    province: "70000"
  },
  {
    refnis: "72038",
    name: {
      nl: "Hechtel-Eksel",
      fr: "Hechtel-Eksel"
    },
    province: "70000"
  },
  {
    refnis: "72039",
    name: {
      nl: "Houthalen-Helchteren",
      fr: "Houthalen-Helchteren"
    },
    province: "70000"
  },
  {
    refnis: "72041",
    name: {
      nl: "Dilsen-Stokkem",
      fr: "Dilsen-Stokkem"
    },
    province: "70000"
  },
  {
    refnis: "72042",
    name: {
      nl: "Oudsbergen",
      fr: "Oudsbergen"
    },
    province: "70000"
  },
  {
    refnis: "72043",
    name: {
      nl: "Pelt",
      fr: "Pelt"
    },
    province: "70000"
  },
  {
    refnis: "73001",
    name: {
      nl: "Alken",
      fr: "Alken"
    },
    province: "70000"
  },
  {
    refnis: "73022",
    name: {
      nl: "Heers",
      fr: "Heers"
    },
    province: "70000"
  },
  {
    refnis: "73028",
    name: {
      nl: "Herstappe",
      fr: "Herstappe"
    },
    province: "70000"
  },
  {
    refnis: "73042",
    name: {
      nl: "Lanaken",
      fr: "Lanaken"
    },
    province: "70000"
  },
  {
    refnis: "73066",
    name: {
      nl: "Riemst",
      fr: "Riemst"
    },
    province: "70000"
  },
  {
    refnis: "73098",
    name: {
      nl: "Wellen",
      fr: "Wellen"
    },
    province: "70000"
  },
  {
    refnis: "73107",
    name: {
      nl: "Maasmechelen",
      fr: "Maasmechelen"
    },
    province: "70000"
  },
  {
    refnis: "73109",
    name: {
      nl: "Voeren",
      fr: "Fourons"
    },
    province: "70000"
  },
  {
    refnis: "73110",
    name: {
      nl: "Bilzen-Hoeselt",
      fr: "Bilzen-Hoeselt"
    },
    province: "70000"
  },
  {
    refnis: "73111",
    name: {
      nl: "Tongeren-Borgloon",
      fr: "Tongres-Looz"
    },
    province: "70000"
  },
  {
    refnis: "81001",
    name: {
      nl: "Aarlen",
      fr: "Arlon"
    },
    province: "80000"
  },
  {
    refnis: "81003",
    name: {
      nl: "Attert",
      fr: "Attert"
    },
    province: "80000"
  },
  {
    refnis: "81004",
    name: {
      nl: "Aubange",
      fr: "Aubange"
    },
    province: "80000"
  },
  {
    refnis: "81013",
    name: {
      nl: "Martelange",
      fr: "Martelange"
    },
    province: "80000"
  },
  {
    refnis: "81015",
    name: {
      nl: "Messancy",
      fr: "Messancy"
    },
    province: "80000"
  },
  {
    refnis: "82009",
    name: {
      nl: "Fauvillers",
      fr: "Fauvillers"
    },
    province: "80000"
  },
  {
    refnis: "82014",
    name: {
      nl: "Houffalize",
      fr: "Houffalize"
    },
    province: "80000"
  },
  {
    refnis: "82032",
    name: {
      nl: "Vielsalm",
      fr: "Vielsalm"
    },
    province: "80000"
  },
  {
    refnis: "82036",
    name: {
      nl: "Vaux-sur-S\xFBre",
      fr: "Vaux-sur-S\xFBre"
    },
    province: "80000"
  },
  {
    refnis: "82037",
    name: {
      nl: "Gouvy",
      fr: "Gouvy"
    },
    province: "80000"
  },
  {
    refnis: "82038",
    name: {
      nl: "Sainte-Ode",
      fr: "Sainte-Ode"
    },
    province: "80000"
  },
  {
    refnis: "82039",
    name: {
      nl: "Bastenaken",
      fr: "Bastogne"
    },
    province: "80000"
  },
  {
    refnis: "83012",
    name: {
      nl: "Durbuy",
      fr: "Durbuy"
    },
    province: "80000"
  },
  {
    refnis: "83013",
    name: {
      nl: "Erez\xE9e",
      fr: "Erez\xE9e"
    },
    province: "80000"
  },
  {
    refnis: "83028",
    name: {
      nl: "Hotton",
      fr: "Hotton"
    },
    province: "80000"
  },
  {
    refnis: "83031",
    name: {
      nl: "La Roche-en-Ardenne",
      fr: "La Roche-en-Ardenne"
    },
    province: "80000"
  },
  {
    refnis: "83034",
    name: {
      nl: "Marche-en-Famenne",
      fr: "Marche-en-Famenne"
    },
    province: "80000"
  },
  {
    refnis: "83040",
    name: {
      nl: "Nassogne",
      fr: "Nassogne"
    },
    province: "80000"
  },
  {
    refnis: "83044",
    name: {
      nl: "Rendeux",
      fr: "Rendeux"
    },
    province: "80000"
  },
  {
    refnis: "83049",
    name: {
      nl: "Tenneville",
      fr: "Tenneville"
    },
    province: "80000"
  },
  {
    refnis: "83055",
    name: {
      nl: "Manhay",
      fr: "Manhay"
    },
    province: "80000"
  },
  {
    refnis: "84009",
    name: {
      nl: "Bertrix",
      fr: "Bertrix"
    },
    province: "80000"
  },
  {
    refnis: "84010",
    name: {
      nl: "Bouillon",
      fr: "Bouillon"
    },
    province: "80000"
  },
  {
    refnis: "84016",
    name: {
      nl: "Daverdisse",
      fr: "Daverdisse"
    },
    province: "80000"
  },
  {
    refnis: "84029",
    name: {
      nl: "Herbeumont",
      fr: "Herbeumont"
    },
    province: "80000"
  },
  {
    refnis: "84033",
    name: {
      nl: "L\xE9glise",
      fr: "L\xE9glise"
    },
    province: "80000"
  },
  {
    refnis: "84035",
    name: {
      nl: "Libin",
      fr: "Libin"
    },
    province: "80000"
  },
  {
    refnis: "84043",
    name: {
      nl: "Neufch\xE2teau",
      fr: "Neufch\xE2teau"
    },
    province: "80000"
  },
  {
    refnis: "84050",
    name: {
      nl: "Paliseul",
      fr: "Paliseul"
    },
    province: "80000"
  },
  {
    refnis: "84059",
    name: {
      nl: "Saint-Hubert",
      fr: "Saint-Hubert"
    },
    province: "80000"
  },
  {
    refnis: "84068",
    name: {
      nl: "Tellin",
      fr: "Tellin"
    },
    province: "80000"
  },
  {
    refnis: "84075",
    name: {
      nl: "Wellin",
      fr: "Wellin"
    },
    province: "80000"
  },
  {
    refnis: "84077",
    name: {
      nl: "Libramont-Chevigny",
      fr: "Libramont-Chevigny"
    },
    province: "80000"
  },
  {
    refnis: "85007",
    name: {
      nl: "Chiny",
      fr: "Chiny"
    },
    province: "80000"
  },
  {
    refnis: "85009",
    name: {
      nl: "Etalle",
      fr: "Etalle"
    },
    province: "80000"
  },
  {
    refnis: "85011",
    name: {
      nl: "Florenville",
      fr: "Florenville"
    },
    province: "80000"
  },
  {
    refnis: "85024",
    name: {
      nl: "Meix-devant-Virton",
      fr: "Meix-devant-Virton"
    },
    province: "80000"
  },
  {
    refnis: "85026",
    name: {
      nl: "Musson",
      fr: "Musson"
    },
    province: "80000"
  },
  {
    refnis: "85034",
    name: {
      nl: "Saint-L\xE9ger",
      fr: "Saint-L\xE9ger"
    },
    province: "80000"
  },
  {
    refnis: "85039",
    name: {
      nl: "Tintigny",
      fr: "Tintigny"
    },
    province: "80000"
  },
  {
    refnis: "85045",
    name: {
      nl: "Virton",
      fr: "Virton"
    },
    province: "80000"
  },
  {
    refnis: "85046",
    name: {
      nl: "Habay",
      fr: "Habay"
    },
    province: "80000"
  },
  {
    refnis: "85047",
    name: {
      nl: "Rouvroy",
      fr: "Rouvroy"
    },
    province: "80000"
  },
  {
    refnis: "91005",
    name: {
      nl: "Anh\xE9e",
      fr: "Anh\xE9e"
    },
    province: "90000"
  },
  {
    refnis: "91013",
    name: {
      nl: "Beauraing",
      fr: "Beauraing"
    },
    province: "90000"
  },
  {
    refnis: "91015",
    name: {
      nl: "Bi\xE8vre",
      fr: "Bi\xE8vre"
    },
    province: "90000"
  },
  {
    refnis: "91030",
    name: {
      nl: "Ciney",
      fr: "Ciney"
    },
    province: "90000"
  },
  {
    refnis: "91034",
    name: {
      nl: "Dinant",
      fr: "Dinant"
    },
    province: "90000"
  },
  {
    refnis: "91054",
    name: {
      nl: "Gedinne",
      fr: "Gedinne"
    },
    province: "90000"
  },
  {
    refnis: "91059",
    name: {
      nl: "Hamois",
      fr: "Hamois"
    },
    province: "90000"
  },
  {
    refnis: "91064",
    name: {
      nl: "Havelange",
      fr: "Havelange"
    },
    province: "90000"
  },
  {
    refnis: "91072",
    name: {
      nl: "Houyet",
      fr: "Houyet"
    },
    province: "90000"
  },
  {
    refnis: "91103",
    name: {
      nl: "Onhaye",
      fr: "Onhaye"
    },
    province: "90000"
  },
  {
    refnis: "91114",
    name: {
      nl: "Rochefort",
      fr: "Rochefort"
    },
    province: "90000"
  },
  {
    refnis: "91120",
    name: {
      nl: "Somme-Leuze",
      fr: "Somme-Leuze"
    },
    province: "90000"
  },
  {
    refnis: "91141",
    name: {
      nl: "Yvoir",
      fr: "Yvoir"
    },
    province: "90000"
  },
  {
    refnis: "91142",
    name: {
      nl: "Hasti\xE8re",
      fr: "Hasti\xE8re"
    },
    province: "90000"
  },
  {
    refnis: "91143",
    name: {
      nl: "Vresse-sur-Semois",
      fr: "Vresse-sur-Semois"
    },
    province: "90000"
  },
  {
    refnis: "92003",
    name: {
      nl: "Andenne",
      fr: "Andenne"
    },
    province: "90000"
  },
  {
    refnis: "92006",
    name: {
      nl: "Assesse",
      fr: "Assesse"
    },
    province: "90000"
  },
  {
    refnis: "92035",
    name: {
      nl: "Eghez\xE9e",
      fr: "Eghez\xE9e"
    },
    province: "90000"
  },
  {
    refnis: "92045",
    name: {
      nl: "Floreffe",
      fr: "Floreffe"
    },
    province: "90000"
  },
  {
    refnis: "92048",
    name: {
      nl: "Fosses-la-Ville",
      fr: "Fosses-la-Ville"
    },
    province: "90000"
  },
  {
    refnis: "92054",
    name: {
      nl: "Gesves",
      fr: "Gesves"
    },
    province: "90000"
  },
  {
    refnis: "92087",
    name: {
      nl: "Mettet",
      fr: "Mettet"
    },
    province: "90000"
  },
  {
    refnis: "92094",
    name: {
      nl: "Namen",
      fr: "Namur"
    },
    province: "90000"
  },
  {
    refnis: "92097",
    name: {
      nl: "Ohey",
      fr: "Ohey"
    },
    province: "90000"
  },
  {
    refnis: "92101",
    name: {
      nl: "Profondeville",
      fr: "Profondeville"
    },
    province: "90000"
  },
  {
    refnis: "92114",
    name: {
      nl: "Sombreffe",
      fr: "Sombreffe"
    },
    province: "90000"
  },
  {
    refnis: "92137",
    name: {
      nl: "Sambreville",
      fr: "Sambreville"
    },
    province: "90000"
  },
  {
    refnis: "92138",
    name: {
      nl: "Fernelmont",
      fr: "Fernelmont"
    },
    province: "90000"
  },
  {
    refnis: "92140",
    name: {
      nl: "Jemeppe-sur-Sambre",
      fr: "Jemeppe-sur-Sambre"
    },
    province: "90000"
  },
  {
    refnis: "92141",
    name: {
      nl: "La Bruy\xE8re",
      fr: "La Bruy\xE8re"
    },
    province: "90000"
  },
  {
    refnis: "92142",
    name: {
      nl: "Gembloux",
      fr: "Gembloux"
    },
    province: "90000"
  },
  {
    refnis: "93010",
    name: {
      nl: "Cerfontaine",
      fr: "Cerfontaine"
    },
    province: "90000"
  },
  {
    refnis: "93014",
    name: {
      nl: "Couvin",
      fr: "Couvin"
    },
    province: "90000"
  },
  {
    refnis: "93018",
    name: {
      nl: "Doische",
      fr: "Doische"
    },
    province: "90000"
  },
  {
    refnis: "93022",
    name: {
      nl: "Florennes",
      fr: "Florennes"
    },
    province: "90000"
  },
  {
    refnis: "93056",
    name: {
      nl: "Philippeville",
      fr: "Philippeville"
    },
    province: "90000"
  },
  {
    refnis: "93088",
    name: {
      nl: "Walcourt",
      fr: "Walcourt"
    },
    province: "90000"
  },
  {
    refnis: "93090",
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
function getJudicialArea(id) {
  return judicialAreas.find((a) => a.id === id);
}
function getArrondissement(id) {
  return arrondissements.find((a) => a.id === id);
}
function getMunicipality(refnis) {
  return municipalities.find((m) => m.refnis === refnis);
}
function getCanton(id) {
  return cantons.find((c) => c.id === id);
}
function getCantonsForMunicipality(refnis) {
  return cantons.filter((c) => c.municipalities.some((m) => m.refnis === refnis));
}

// data/courts.json
var courts_default = [
  {
    id: "VredegerechtAalst1",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Aalst",
      fr: "Alost",
      de: "Aalst"
    },
    canton: 1,
    address: {
      street: "Dokter Andr\xE9 Sierensstraat",
      houseNumber: "16 bus 3B",
      postalCode: "9300",
      city: "Aalst"
    },
    contacts: [
      {
        type: "phone",
        value: "053 82 07 01"
      },
      {
        type: "email",
        value: "vred.aalst@just.fgov.be"
      }
    ],
    bankAccount: "BE73 6792 0084 4560",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtAalst2",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Aalst",
      fr: "Alost",
      de: "Aalst"
    },
    canton: 2,
    address: {
      street: "Dokter Andr\xE9 Sierensstraat",
      houseNumber: "16 bus 3C",
      postalCode: "9300",
      city: "Aalst"
    },
    contacts: [
      {
        type: "phone",
        value: "053 82 07 01"
      },
      {
        type: "email",
        value: "vred.aalst@just.fgov.be"
      }
    ],
    bankAccount: "BE73 6792 0084 4560",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtBeverenKruibekeZwijndrecht",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Beveren-Kruibeke-Zwijndrecht",
      fr: "Beveren-Cruybeke-Zwijndrecht",
      de: "Beveren-Kruibeke-Zwijndrecht"
    },
    address: {
      street: "Gravendreef",
      houseNumber: "3",
      postalCode: "9120",
      city: "Beveren"
    },
    contacts: [
      {
        type: "phone",
        value: "03 775 70 87"
      },
      {
        type: "email",
        value: "vred.beveren@just.fgov.be"
      }
    ],
    bankAccount: "BE29 6792 0084 4964",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtDeinze",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Deinze",
      fr: "Deinze",
      de: "Deinze"
    },
    address: {
      street: "Emiel Clausplein",
      houseNumber: "4",
      postalCode: "9800",
      city: "Deinze"
    },
    contacts: [
      {
        type: "phone",
        value: "09 386 26 34"
      },
      {
        type: "email",
        value: "vred.deinze@just.fgov.be"
      }
    ],
    bankAccount: "BE74 6792 0084 8907",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtDendermonde",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Dendermonde",
      fr: "Termonde",
      de: "Dendermonde"
    },
    address: {
      street: "Noordlaan",
      houseNumber: "31/2",
      postalCode: "9200",
      city: "Dendermonde"
    },
    contacts: [
      {
        type: "phone",
        value: "052 25 96 00"
      },
      {
        type: "email",
        value: "vred.dendermonde@just.fgov.be"
      }
    ],
    bankAccount: "BE93 6792 0084 5267",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtEeklo",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Eeklo",
      fr: "Eeklo",
      de: "Eeklo"
    },
    address: {
      street: "Stationsstraat",
      houseNumber: "21",
      postalCode: "9900",
      city: "Eeklo"
    },
    contacts: [
      {
        type: "phone",
        value: "09 377 17 00"
      },
      {
        type: "email",
        value: "vred.eeklo@just.fgov.be"
      }
    ],
    bankAccount: "BE52 6792 0084 9109",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtGent1",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    canton: 1,
    address: {
      street: "Opge\xEBistenlaan",
      houseNumber: "401/F",
      postalCode: "9000",
      city: "Gent"
    },
    contacts: [
      {
        type: "phone",
        value: "09 234 55 00"
      },
      {
        type: "email",
        value: "vred.gent1@just.fgov.be"
      }
    ],
    bankAccount: "BE12 6792 0084 7792",
    openingHours: "ma - vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtGent2",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    canton: 2,
    address: {
      street: "Opge\xEBistenlaan",
      houseNumber: "401/F",
      postalCode: "9000",
      city: "Gent"
    },
    contacts: [
      {
        type: "phone",
        value: "09 234 55 00"
      },
      {
        type: "email",
        value: "vred.gent2@just.fgov.be"
      }
    ],
    bankAccount: "BE12 6792 0084 7792",
    openingHours: "ma - vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtGent3",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    canton: 3,
    address: {
      street: "Opge\xEBistenlaan",
      houseNumber: "401/F",
      postalCode: "9000",
      city: "Gent"
    },
    contacts: [
      {
        type: "phone",
        value: "09 234 55 00"
      },
      {
        type: "email",
        value: "vred.gent3@just.fgov.be"
      }
    ],
    bankAccount: "BE12 6792 0084 7792",
    openingHours: "ma - vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtGent4",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    canton: 4,
    address: {
      street: "Opge\xEBistenlaan",
      houseNumber: "401/F",
      postalCode: "9000",
      city: "Gent"
    },
    contacts: [
      {
        type: "phone",
        value: "09 234 55 00"
      },
      {
        type: "email",
        value: "vred.gent4@just.fgov.be"
      }
    ],
    bankAccount: "BE12 6792 0084 7792",
    openingHours: "ma - vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtGent5",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    canton: 5,
    address: {
      street: "Opge\xEBistenlaan",
      houseNumber: "401/F",
      postalCode: "9000",
      city: "Gent"
    },
    contacts: [
      {
        type: "phone",
        value: "09 234 55 00"
      },
      {
        type: "email",
        value: "vred.gent5@just.fgov.be"
      }
    ],
    bankAccount: "BE12 6792 0084 7792",
    openingHours: "ma - vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtGeraardsbergen",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Geraardsbergen",
      fr: "Grammont",
      de: "Geraardsbergen"
    },
    address: {
      street: "Kasteelstraat",
      houseNumber: "58",
      postalCode: "9660",
      city: "Brakel"
    },
    contacts: [
      {
        type: "phone",
        value: "055 42 34 25"
      },
      {
        type: "email",
        value: "vred.geraardsbergen@just.fgov.be"
      }
    ],
    bankAccount: "BE79 6792 0084 1833",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtHamme",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Hamme",
      fr: "Hamme",
      de: "Hamme"
    },
    address: {
      street: "Meulenbroekstraat",
      houseNumber: "20",
      postalCode: "9220",
      city: "Hamme"
    },
    contacts: [
      {
        type: "phone",
        value: "052 25 01 80"
      },
      {
        type: "email",
        value: "vred.hamme@just.fgov.be"
      }
    ],
    bankAccount: "BE60 6792 0084 5570",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtHerzele",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Herzele",
      fr: "Herzele",
      de: "Herzele"
    },
    address: {
      street: "Stationsstraat",
      houseNumber: "6-8",
      postalCode: "9550",
      city: "Herzele"
    },
    contacts: [
      {
        type: "phone",
        value: "053 62 21 08"
      },
      {
        type: "email",
        value: "vred.herzele@just.fgov.be"
      }
    ],
    bankAccount: "BE57 6792 0084 2035",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtLokeren",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Lokeren",
      fr: "Lokeren",
      de: "Lokeren"
    },
    address: {
      street: "Markt",
      houseNumber: "8",
      postalCode: "9160",
      city: "Lokeren"
    },
    contacts: [
      {
        type: "phone",
        value: "09 348 25 44"
      },
      {
        type: "email",
        value: "vred.lokeren@just.fgov.be"
      }
    ],
    bankAccount: "BE82 6792 0084 5368",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtMerelbekeMelle",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Merelbeke-Melle",
      fr: "Merelbeke-Melle",
      de: "Merelbeke-Melle"
    },
    address: {
      street: "Hundelgemsesteenweg",
      houseNumber: "622-624",
      postalCode: "9820",
      city: "Merelbeke"
    },
    contacts: [
      {
        type: "phone",
        value: "09 210 49 10"
      },
      {
        type: "email",
        value: "vred.merelbeke@just.fgov.be"
      }
    ],
    bankAccount: "BE10 6792 0084 8604",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtNinove",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Ninove",
      fr: "Ninove",
      de: "Ninove"
    },
    address: {
      street: "Onderwijslaan",
      houseNumber: "71",
      postalCode: "9400",
      city: "Ninove"
    },
    contacts: [
      {
        type: "phone",
        value: "054 33 78 56"
      },
      {
        type: "email",
        value: "vred.ninove@just.fgov.be"
      }
    ],
    bankAccount: "BE38 6792 0084 5772",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtOudenaarde",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Oudenaarde",
      fr: "Audenarde",
      de: "Oudenaarde"
    },
    address: {
      street: "Bevrijdingstraat",
      houseNumber: "7 B",
      postalCode: "9700",
      city: "Oudenaarde"
    },
    contacts: [
      {
        type: "phone",
        value: "055 33 55 00"
      },
      {
        type: "email",
        value: "vred.oudenaarde@just.fgov.be"
      }
    ],
    bankAccount: "BE13 6792 0084 2439",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtSintNiklaas",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Sint-Niklaas",
      fr: "Saint-Nicolas",
      de: "Sint-Niklaas"
    },
    address: {
      street: "Kazernestraat",
      houseNumber: "4",
      postalCode: "9100",
      city: "Sint-Niklaas"
    },
    contacts: [
      {
        type: "phone",
        value: "03 760 94 32"
      },
      {
        type: "email",
        value: "vred.stniklaas@just.fgov.be"
      }
    ],
    bankAccount: "BE16 6792 0084 5974",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtWetteren",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Wetteren",
      fr: "Wetteren",
      de: "Wetteren"
    },
    address: {
      street: "Gentsesteenweg",
      houseNumber: "90",
      postalCode: "9230",
      city: "Wetteren"
    },
    contacts: [
      {
        type: "phone",
        value: "02 542 83 76"
      },
      {
        type: "email",
        value: "vred.wetteren@just.fgov.be"
      }
    ],
    bankAccount: "BE69 6792 0084 6378",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtZelzate",
    type: "justice-of-the-peace",
    arrondissement: "EastFlanders",
    name: {
      nl: "Zelzate",
      fr: "Zelzate",
      de: "Zelzate"
    },
    address: {
      street: "Suikerkaai",
      houseNumber: "10",
      postalCode: "9060",
      city: "Zelzate"
    },
    contacts: [
      {
        type: "phone",
        value: "09 345 72 32"
      },
      {
        type: "email",
        value: "vred.zelzate@just.fgov.be"
      }
    ],
    bankAccount: "BE30 6792 0084 9311",
    openingHours: "ma-vrij: 08u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtBrugge1",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Brugge",
      fr: "Bruges",
      de: "Br\xFCgge"
    },
    canton: 1,
    address: {
      street: "Kazernevest",
      houseNumber: "4",
      postalCode: "8000",
      city: "Brugge"
    },
    contacts: [
      {
        type: "phone",
        value: "050 47 33 50",
        label: "A-rol"
      },
      {
        type: "phone",
        value: "050 47 33 60",
        label: "B-rol"
      },
      {
        type: "email",
        value: "vred.brugge@just.fgov.be"
      }
    ],
    bankAccount: "BE47 6792 0083 6880",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtBrugge2",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Brugge",
      fr: "Bruges",
      de: "Br\xFCgge"
    },
    canton: 2,
    address: {
      street: "Kazernevest",
      houseNumber: "4",
      postalCode: "8000",
      city: "Brugge"
    },
    contacts: [
      {
        type: "phone",
        value: "050 47 33 50",
        label: "A-rol"
      },
      {
        type: "phone",
        value: "050 47 33 60",
        label: "B-rol"
      },
      {
        type: "email",
        value: "vred.brugge@just.fgov.be"
      }
    ],
    bankAccount: "BE47 6792 0083 6880",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtBrugge3",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Brugge",
      fr: "Bruges",
      de: "Br\xFCgge"
    },
    canton: 3,
    address: {
      street: "Kazernevest",
      houseNumber: "4",
      postalCode: "8000",
      city: "Brugge"
    },
    contacts: [
      {
        type: "phone",
        value: "050 47 33 50",
        label: "A-rol"
      },
      {
        type: "phone",
        value: "050 47 33 60",
        label: "B-rol"
      },
      {
        type: "email",
        value: "vred.brugge@just.fgov.be"
      }
    ],
    bankAccount: "BE47 6792 0083 6880",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtBrugge4",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Brugge",
      fr: "Bruges",
      de: "Br\xFCgge"
    },
    canton: 4,
    address: {
      street: "Kazernevest",
      houseNumber: "4",
      postalCode: "8000",
      city: "Brugge"
    },
    contacts: [
      {
        type: "phone",
        value: "050 47 33 50",
        label: "A-rol"
      },
      {
        type: "phone",
        value: "050 47 33 60",
        label: "B-rol"
      },
      {
        type: "email",
        value: "vred.brugge@just.fgov.be"
      }
    ],
    bankAccount: "BE47 6792 0083 6880",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtIeper",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Ieper",
      fr: "Ypres",
      de: "Ypern"
    },
    address: {
      street: "Korte Meersstraat",
      houseNumber: "18",
      postalCode: "8900",
      city: "Ieper"
    },
    contacts: [
      {
        type: "phone",
        value: "057/224 050"
      },
      {
        type: "email",
        value: "vred.ieper@just.fgov.be"
      }
    ],
    bankAccount: "BE50 6792 0084 0318",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtIzegem",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Izegem",
      fr: "Izegem",
      de: "Izegem"
    },
    address: {
      street: "Kasteelstraat",
      houseNumber: "15",
      postalCode: "8870",
      city: "Izegem"
    },
    contacts: [
      {
        type: "phone",
        value: "051 30 26 10"
      },
      {
        type: "email",
        value: "vred.izegem@just.fgov.be"
      }
    ],
    bankAccount: "BE10 6792 0083 8904",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtKortrijk1",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Kortrijk",
      fr: "Courtrai",
      de: "Kortrijk"
    },
    canton: 1,
    address: {
      building: "Gerechtsgebouw II",
      street: "Beheerstraat",
      houseNumber: "41",
      postalCode: "8500",
      city: "Kortrijk"
    },
    contacts: [
      {
        type: "phone",
        value: "056 26 96 68"
      },
      {
        type: "phone",
        value: "056 269 885",
        label: "B-rol"
      },
      {
        type: "email",
        value: "vred.kortrijk@just.fgov.be"
      }
    ],
    bankAccount: "BE41 6792 0083 9510",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtKortrijk2",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Kortrijk",
      fr: "Courtrai",
      de: "Kortrijk"
    },
    canton: 2,
    address: {
      building: "Gerechtsgebouw II",
      street: "Beheerstraat",
      houseNumber: "41",
      postalCode: "8500",
      city: "Kortrijk"
    },
    contacts: [
      {
        type: "phone",
        value: "056 26 96 68"
      },
      {
        type: "phone",
        value: "056 269 885",
        label: "B-rol"
      },
      {
        type: "email",
        value: "vred.kortrijk@just.fgov.be"
      }
    ],
    bankAccount: "BE41 6792 0083 9510",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtMenen",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Menen",
      fr: "Menin",
      de: "Menen"
    },
    address: {
      street: "Volkslaan",
      houseNumber: "302/0101",
      postalCode: "8930",
      city: "Menen"
    },
    contacts: [
      {
        type: "phone",
        value: "02 557 42 90"
      },
      {
        type: "email",
        value: "vred.menen@just.fgov.be"
      }
    ],
    bankAccount: "BE19 6792 0083 9712",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtOostende1",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Oostende",
      fr: "Ostende",
      de: "Ostende"
    },
    canton: 1,
    address: {
      street: "Canadaplein",
      houseNumber: "1",
      postalCode: "8400",
      city: "Oostende"
    },
    contacts: [
      {
        type: "phone",
        value: "059 55 36 00"
      },
      {
        type: "email",
        value: "vred.oostende@just.fgov.be"
      }
    ],
    bankAccount: "BE14 6792 0083 7183",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtOostende2",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Oostende",
      fr: "Ostende",
      de: "Ostende"
    },
    canton: 2,
    address: {
      street: "Canadaplein",
      houseNumber: "1",
      postalCode: "8400",
      city: "Oostende"
    },
    contacts: [
      {
        type: "phone",
        value: "059 55 36 00"
      },
      {
        type: "email",
        value: "vred.oostende@just.fgov.be"
      }
    ],
    bankAccount: "BE14 6792 0083 7183",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtPoperinge",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Poperinge",
      fr: "Poperinge",
      de: "Poperinge"
    },
    address: {
      street: "Burgemeester Bertenplein",
      houseNumber: "21",
      postalCode: "8970",
      city: "Poperinge"
    },
    contacts: [
      {
        type: "phone",
        value: "057 33 38 10"
      },
      {
        type: "email",
        value: "vred.poperinge@just.fgov.be"
      }
    ],
    bankAccount: "BE06 6792 0084 0722",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtRoeselare",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Roeselare",
      fr: "Roulers",
      de: "Roeselare"
    },
    address: {
      street: "Rondekomstraat",
      houseNumber: "22",
      postalCode: "8800",
      city: "Roeselare"
    },
    contacts: [
      {
        type: "phone",
        value: "051 26 92 20"
      },
      {
        type: "email",
        value: "vred.roeselare@just.fgov.be"
      }
    ],
    bankAccount: "BE63 6792 0083 9308",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtTielt",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Tielt",
      fr: "Tielt",
      de: "Tielt"
    },
    address: {
      street: "Tramstraat",
      houseNumber: "48",
      postalCode: "8700",
      city: "Tielt"
    },
    contacts: [
      {
        type: "phone",
        value: "051 26 92 20"
      },
      {
        type: "email",
        value: "vred.tielt@just.fgov.be"
      }
    ],
    bankAccount: "BE89 6792 0083 7385",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtTorhout",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Torhout",
      fr: "Torhout",
      de: "Torhout"
    },
    address: {
      street: "Elisabethlaan",
      houseNumber: "29",
      postalCode: "8820",
      city: "Torhout"
    },
    contacts: [
      {
        type: "phone",
        value: "050 21 22 02"
      },
      {
        type: "email",
        value: "vred.torhout@just.fgov.be"
      }
    ],
    bankAccount: "BE67 6792 0083 7587",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtVeurne",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Veurne",
      fr: "Furnes",
      de: "Veurne"
    },
    address: {
      street: "Peter Benoitlaan",
      houseNumber: "2",
      postalCode: "8630",
      city: "Veurne"
    },
    contacts: [
      {
        type: "phone",
        value: "058 29 64 20"
      },
      {
        type: "email",
        value: "vred.veurne@just.fgov.be"
      }
    ],
    bankAccount: "BE50 6792 0085 0018",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "VredegerechtWaregem",
    type: "justice-of-the-peace",
    arrondissement: "WestFlanders",
    name: {
      nl: "Waregem",
      fr: "Waregem",
      de: "Waregem"
    },
    address: {
      street: "Stationsstraat",
      houseNumber: "127",
      postalCode: "8790",
      city: "Waregem"
    },
    contacts: [
      {
        type: "phone",
        value: "056/67.60.60"
      },
      {
        type: "email",
        value: "vred.waregem@just.fgov.be"
      }
    ],
    bankAccount: "BE85 6792 0083 9106",
    openingHours: "ma-vrij: 8u30 - 12u30 en 13u30 - 16u00"
  },
  {
    id: "OndernemingsrechtbankGentBrugge",
    type: "enterprise-court",
    arrondissement: "WestFlanders",
    name: {
      nl: "Brugge",
      fr: "Bruges",
      de: "Br\xFCgge"
    },
    seat: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    address: {
      street: "Kazernevest",
      houseNumber: "3",
      postalCode: "8000",
      city: "Brugge"
    },
    contacts: [
      {
        type: "phone",
        value: "050 47 30 50",
        label: "griffie"
      },
      {
        type: "email",
        value: "orb.brugge.griffie@just.fgov.be",
        label: "griffie"
      },
      {
        type: "phone",
        value: "050 47 30 40",
        label: "rechtspersonenregister"
      },
      {
        type: "email",
        value: "orb.brugge.rpr@just.fgov.be",
        label: "rechtspersonenregister"
      }
    ]
  },
  {
    id: "OndernemingsrechtbankGentDendermonde",
    type: "enterprise-court",
    arrondissement: "EastFlanders",
    name: {
      nl: "Dendermonde",
      fr: "Termonde",
      de: "Dendermonde"
    },
    seat: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    address: {
      street: "Noordlaan",
      houseNumber: "31/1",
      postalCode: "9200",
      city: "Dendermonde"
    },
    contacts: [
      {
        type: "phone",
        value: "02/682.06.81",
        label: "griffie"
      },
      {
        type: "email",
        value: "orb.dendermonde.griffie@just.fgov.be",
        label: "griffie"
      },
      {
        type: "phone",
        value: "02/682.06.81",
        label: "rechtspersonenregister"
      },
      {
        type: "email",
        value: "orb.dendermonde.rpr@just.fgov.be",
        label: "rechtspersonenregister"
      }
    ]
  },
  {
    id: "OndernemingsrechtbankGentGent",
    type: "enterprise-court",
    arrondissement: "EastFlanders",
    name: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    seat: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    address: {
      street: "Opge\xEBistenlaan",
      houseNumber: "401/E",
      postalCode: "9000",
      city: "Gent"
    },
    contacts: [
      {
        type: "phone",
        value: "02 682 01 58",
        label: "griffie"
      },
      {
        type: "email",
        value: "orb.gent.griffie@just.fgov.be",
        label: "griffie"
      },
      {
        type: "phone",
        value: "02 682 01 58",
        label: "rechtspersonenregister"
      },
      {
        type: "email",
        value: "orb.gent.rpr@just.fgov.be",
        label: "rechtspersonenregister"
      }
    ]
  },
  {
    id: "OndernemingsrechtbankGentIeper",
    type: "enterprise-court",
    arrondissement: "WestFlanders",
    name: {
      nl: "Ieper",
      fr: "Ypres",
      de: "Ypern"
    },
    seat: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    address: {
      street: "Grote Markt",
      houseNumber: "1",
      postalCode: "8900",
      city: "Ieper"
    },
    contacts: [
      {
        type: "phone",
        value: "02/682.05.06",
        label: "griffie"
      },
      {
        type: "email",
        value: "orb.ieper@just.fgov.be",
        label: "griffie"
      },
      {
        type: "phone",
        value: "02/682.05.06",
        label: "rechtspersonenregister"
      },
      {
        type: "email",
        value: "orb.ieper.rpr@just.fgov.be",
        label: "rechtspersonenregister"
      }
    ]
  },
  {
    id: "OndernemingsrechtbankGentKortrijk",
    type: "enterprise-court",
    arrondissement: "WestFlanders",
    name: {
      nl: "Kortrijk",
      fr: "Courtrai",
      de: "Kortrijk"
    },
    seat: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    address: {
      street: "Beheerstraat",
      houseNumber: "41",
      postalCode: "8500",
      city: "Kortrijk"
    },
    contacts: [
      {
        type: "phone",
        value: "056 26 96 01",
        label: "griffie"
      },
      {
        type: "email",
        value: "orb.kortrijk.griffie@just.fgov.be",
        label: "griffie"
      },
      {
        type: "phone",
        value: "056 26 96 00",
        label: "rechtspersonenregister"
      },
      {
        type: "email",
        value: "orb.kortrijk.rpr@just.fgov.be",
        label: "rechtspersonenregister"
      }
    ]
  },
  {
    id: "OndernemingsrechtbankGentOostende",
    type: "enterprise-court",
    arrondissement: "WestFlanders",
    name: {
      nl: "Oostende",
      fr: "Ostende",
      de: "Ostende"
    },
    seat: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    address: {
      street: "Canadaplein",
      postalCode: "8400",
      city: "Oostende"
    },
    contacts: [
      {
        type: "phone",
        value: "059 55 36 40",
        label: "griffie"
      },
      {
        type: "email",
        value: "orb.oostende@just.fgov.be",
        label: "griffie"
      },
      {
        type: "phone",
        value: "059 55 36 46",
        label: "rechtspersonenregister"
      },
      {
        type: "email",
        value: "orb.oostende.rpr@just.fgov.be",
        label: "rechtspersonenregister"
      }
    ]
  },
  {
    id: "OndernemingsrechtbankGentOudenaarde",
    type: "enterprise-court",
    arrondissement: "EastFlanders",
    name: {
      nl: "Oudenaarde",
      fr: "Audenarde",
      de: "Oudenaarde"
    },
    seat: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    address: {
      street: "Bekstraat",
      houseNumber: "14",
      postalCode: "9700",
      city: "Oudenaarde"
    },
    contacts: [
      {
        type: "phone",
        value: "02/682.05.12",
        label: "griffie"
      },
      {
        type: "email",
        value: "orb.oudenaarde.griffie@just.fgov.be",
        label: "griffie"
      },
      {
        type: "phone",
        value: "02/682.05.12",
        label: "rechtspersonenregister"
      },
      {
        type: "email",
        value: "orb.oudenaarde.rpr@just.fgov.be",
        label: "rechtspersonenregister"
      }
    ]
  },
  {
    id: "OndernemingsrechtbankGentVeurne",
    type: "enterprise-court",
    arrondissement: "WestFlanders",
    name: {
      nl: "Veurne",
      fr: "Furnes",
      de: "Veurne"
    },
    seat: {
      nl: "Gent",
      fr: "Gand",
      de: "Gent"
    },
    address: {
      street: "Peter Benoitlaan",
      houseNumber: "2",
      postalCode: "8630",
      city: "Veurne"
    },
    contacts: [
      {
        type: "phone",
        value: "058 29 64 39",
        label: "griffie"
      },
      {
        type: "email",
        value: "orb.veurne@just.fgov.be",
        label: "griffie"
      },
      {
        type: "phone",
        value: "058 29 64 41",
        label: "rechtspersonenregister"
      },
      {
        type: "email",
        value: "orb.veurne.rpr@just.fgov.be",
        label: "rechtspersonenregister"
      }
    ]
  }
];

// src/courts.ts
var courts = courts_default;
function getCourt(id) {
  return courts.find((c) => c.id === id);
}
function findCourts(filter) {
  return courts.filter(
    (c) => (!filter.type || c.type === filter.type) && (!filter.arrondissement || c.arrondissement === filter.arrondissement)
  );
}
function getContact(court, type, label) {
  return court.contacts.find(
    (c) => c.type === type && (label === void 0 || c.label === label)
  )?.value;
}
var courtNameParts = {
  nl: {
    peace: "Vredegerecht",
    canton: "kanton",
    enterprise: "Ondernemingsrechtbank",
    division: "afdeling",
    of: ""
  },
  fr: {
    peace: "Tribunal de paix",
    canton: "canton",
    enterprise: "Tribunal de l'entreprise",
    division: "division",
    of: "de "
  },
  de: {
    peace: "Friedensgericht",
    canton: "Kanton",
    enterprise: "Unternehmensgericht",
    division: "Abteilung",
    of: ""
  }
};
function formatCourtName(court, locale = "nl") {
  const t = courtNameParts[locale];
  if (court.type === "enterprise-court") {
    return `${t.enterprise} ${t.of}${court.seat[locale]} - ${t.division} ${court.name[locale]}`;
  }
  return court.canton ? `${t.peace} ${court.canton}e ${t.canton} ${court.name[locale]}` : `${t.peace} ${t.canton} ${court.name[locale]}`;
}

// data/interest-rates.json
var interest_rates_default = {
  legal: {
    description: "Wettelijke interestvoet (Wet 5 mei 1865), per kalenderjaar.",
    source: "FOD Financi\xEBn (financien.belgium.be), bekendgemaakt in het Belgisch Staatsblad",
    periods: [
      {
        from: "1970-07-01",
        to: "1974-10-31",
        rate: 6.5
      },
      {
        from: "1974-11-01",
        to: "1981-07-31",
        rate: 8
      },
      {
        from: "1981-08-01",
        to: "1985-07-31",
        rate: 12
      },
      {
        from: "1985-08-01",
        to: "1986-07-31",
        rate: 10
      },
      {
        from: "1986-08-01",
        to: "1996-08-31",
        rate: 8
      },
      {
        from: "1996-09-01",
        to: "2006-12-31",
        rate: 7
      },
      {
        from: "2007-01-01",
        to: "2007-12-31",
        rate: 6
      },
      {
        from: "2008-01-01",
        to: "2008-12-31",
        rate: 7
      },
      {
        from: "2009-01-01",
        to: "2009-12-31",
        rate: 5.5
      },
      {
        from: "2010-01-01",
        to: "2010-12-31",
        rate: 3.25
      },
      {
        from: "2011-01-01",
        to: "2011-12-31",
        rate: 3.75
      },
      {
        from: "2012-01-01",
        to: "2012-12-31",
        rate: 4.25
      },
      {
        from: "2013-01-01",
        to: "2013-12-31",
        rate: 2.75
      },
      {
        from: "2014-01-01",
        to: "2014-12-31",
        rate: 2.75
      },
      {
        from: "2015-01-01",
        to: "2015-12-31",
        rate: 2.5
      },
      {
        from: "2016-01-01",
        to: "2016-12-31",
        rate: 2.25
      },
      {
        from: "2017-01-01",
        to: "2017-12-31",
        rate: 2
      },
      {
        from: "2018-01-01",
        to: "2018-12-31",
        rate: 2
      },
      {
        from: "2019-01-01",
        to: "2019-12-31",
        rate: 2
      },
      {
        from: "2020-01-01",
        to: "2020-12-31",
        rate: 1.75
      },
      {
        from: "2021-01-01",
        to: "2021-12-31",
        rate: 1.75
      },
      {
        from: "2022-01-01",
        to: "2022-12-31",
        rate: 1.5
      },
      {
        from: "2023-01-01",
        to: "2023-12-31",
        rate: 5.25
      },
      {
        from: "2024-01-01",
        to: "2024-12-31",
        rate: 5.75
      },
      {
        from: "2025-01-01",
        to: "2025-12-31",
        rate: 4.5
      },
      {
        from: "2026-01-01",
        to: "2026-12-31",
        rate: 4.5
      }
    ]
  },
  commercial: {
    description: "Rentevoet betalingsachterstand handelstransacties (Wet 2 augustus 2002), per semester. Tussen 2013 en 15 maart 2015 hangt de rentevoet af van de datum van het contract.",
    source: "https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties",
    periods: [
      {
        from: "2002-07-01",
        to: "2002-12-31",
        rate: 10.5,
        note: "tweede semester 2002: 10,5 % (B.S.: 03/10/02)"
      },
      {
        from: "2003-01-01",
        to: "2003-06-30",
        rate: 10,
        note: "eerste semester 2003: 10 % (B.S.: 14/02/03)"
      },
      {
        from: "2003-07-01",
        to: "2003-12-31",
        rate: 9.5,
        note: "tweede semester 2003: 9,5% (B.S.: 17/07/03)"
      },
      {
        from: "2004-01-01",
        to: "2004-06-30",
        rate: 9.5,
        note: "eerste semester 2004: 9,5 % (B.S.: 26/01/04)"
      },
      {
        from: "2004-07-01",
        to: "2004-12-31",
        rate: 9.5,
        note: "tweede semester 2004: 9,5 % (B.S.: 10/08/04)"
      },
      {
        from: "2005-01-01",
        to: "2005-06-30",
        rate: 9.5,
        note: "eerste semester 2005: 9,5 % (B.S.: 26/01/05)"
      },
      {
        from: "2005-07-01",
        to: "2005-12-31",
        rate: 9.5,
        note: "tweede semester 2005: 9,5 % (B.S.: 09/08/05)"
      },
      {
        from: "2006-01-01",
        to: "2006-06-30",
        rate: 9.5,
        note: "eerste semester 2006: 9,5 % (B.S.: 26/01/06)"
      },
      {
        from: "2006-07-01",
        to: "2006-12-31",
        rate: 10,
        note: "tweede semester 2006: 10 % (B.S.: 25/07/06)"
      },
      {
        from: "2007-01-01",
        to: "2007-06-30",
        rate: 11,
        note: "eerste semester 2007: 11 % (B.S.: 30/01/07)"
      },
      {
        from: "2007-07-01",
        to: "2007-12-31",
        rate: 11.5,
        note: "tweede semester 2007: 11,5 % (B.S.: 27/07/07)"
      },
      {
        from: "2008-01-01",
        to: "2008-06-30",
        rate: 11.5,
        note: "eerste semester 2008: 11,5 % (B.S.: 14/01/08)"
      },
      {
        from: "2008-07-01",
        to: "2008-12-31",
        rate: 11.5,
        note: "tweede semester 2008: 11,5 % (B.S.: 31/07/08)"
      },
      {
        from: "2009-01-01",
        to: "2009-06-30",
        rate: 9.5,
        note: "eerste semester 2009: 9,5 % (B.S.: 27/01/09)"
      },
      {
        from: "2009-07-01",
        to: "2009-12-31",
        rate: 8,
        note: "tweede semester 2009: 8 % (B.S.: 22/07/09)"
      },
      {
        from: "2010-01-01",
        to: "2010-06-30",
        rate: 8,
        note: "eerste semester 2010: 8 % (B.S.: 01/02/10)"
      },
      {
        from: "2010-07-01",
        to: "2010-12-31",
        rate: 8,
        note: "tweede semester 2010: 8 % (B.S.: 30/07/10)"
      },
      {
        from: "2011-01-01",
        to: "2011-06-30",
        rate: 8,
        note: "eerste semester 2011: 8 % (B.S.: 31/01/11)"
      },
      {
        from: "2011-07-01",
        to: "2011-12-31",
        rate: 8.5,
        note: "tweede semester 2011: 8,5 % (B.S.: 25/07/11)"
      },
      {
        from: "2012-01-01",
        to: "2012-06-30",
        rate: 8,
        note: "eerste semester 2012: 8 % (B.S.: 30/01/12)"
      },
      {
        from: "2012-07-01",
        to: "2012-12-31",
        rate: 8,
        note: "tweede semester 2012: 8 % (B.S.: 22/08/12)"
      },
      {
        from: "2013-01-01",
        to: "2013-06-30",
        rate: 9,
        rateForContractsBefore20130316: 8,
        note: "eerste semester 2013"
      },
      {
        from: "2013-07-01",
        to: "2013-12-31",
        rate: 8.5,
        rateForContractsBefore20130316: 7.5,
        note: "tweede semester 2013"
      },
      {
        from: "2014-01-01",
        to: "2014-06-30",
        rate: 8.5,
        rateForContractsBefore20130316: 7.5,
        note: "eerste semester 2014"
      },
      {
        from: "2014-07-01",
        to: "2014-12-31",
        rate: 8.5,
        rateForContractsBefore20130316: 7.5,
        note: "tweede semester 2014"
      },
      {
        from: "2015-01-01",
        to: "2015-03-15",
        rate: 8.5,
        rateForContractsBefore20130316: 7.5,
        note: "eerste semester 2015 (tot en met 15 maart)"
      },
      {
        from: "2015-03-16",
        to: "2015-06-30",
        rate: 8.5,
        note: "eerste semester 2015 (vanaf 16 maart)"
      },
      {
        from: "2015-07-01",
        to: "2015-12-31",
        rate: 8.5,
        note: "tweede semester 2015: 8,5 % (B.S. 13/08/2015)"
      },
      {
        from: "2016-01-01",
        to: "2016-06-30",
        rate: 8.5,
        note: "eerste semester 2016: 8,5 % (B.S. 01/02/2016)"
      },
      {
        from: "2016-07-01",
        to: "2016-12-31",
        rate: 8,
        note: "tweede semester 2016: 8 % (B.S. 11/08/2016)"
      },
      {
        from: "2017-01-01",
        to: "2017-06-30",
        rate: 8,
        note: "eerste semester 2017: 8 % (B.S. 30/01/2017)"
      },
      {
        from: "2017-07-01",
        to: "2017-12-31",
        rate: 8,
        note: "tweede semester 2017: 8 % (B.S. 13/07/2017)"
      },
      {
        from: "2018-01-01",
        to: "2018-06-30",
        rate: 8,
        note: "eerste semester 2018: 8 % (B.S. 24/01/2018)"
      },
      {
        from: "2018-07-01",
        to: "2018-12-31",
        rate: 8,
        note: "tweede semester 2018: 8 % (B.S. 25/07/2018)"
      },
      {
        from: "2019-01-01",
        to: "2019-06-30",
        rate: 8,
        note: "eerste semester 2019: 8 % (B.S. 29/01/2019)"
      },
      {
        from: "2019-07-01",
        to: "2019-12-31",
        rate: 8,
        note: "tweede semester 2019: 8 % (B.S. 18/07/2019)"
      },
      {
        from: "2020-01-01",
        to: "2020-06-30",
        rate: 8,
        note: "eerste semester 2020: 8 % (B.S. 06/02/2020)"
      },
      {
        from: "2020-07-01",
        to: "2020-12-31",
        rate: 8,
        note: "tweede semester 2020: 8% (B.S. 24/08/2020)"
      },
      {
        from: "2021-01-01",
        to: "2021-06-30",
        rate: 8,
        note: "eerste semester 2021: 8 % (B.S. 24/02/2021)"
      },
      {
        from: "2021-07-01",
        to: "2021-12-31",
        rate: 8,
        note: "tweede semester 2021: 8% (B.S. 02/08/2021)"
      },
      {
        from: "2022-01-01",
        to: "2022-06-30",
        rate: 8,
        note: "eerste semester 2022: 8 % (B.S. 24/02/2022)"
      },
      {
        from: "2022-07-01",
        to: "2022-12-31",
        rate: 8,
        note: "tweede semester 2022: 8% (B.S. 25/08/2022)"
      },
      {
        from: "2023-01-01",
        to: "2023-06-30",
        rate: 10.5,
        note: "eerste semester 2023: 10,5 % (B.S. 17/03/2023)"
      },
      {
        from: "2023-07-01",
        to: "2023-12-31",
        rate: 12,
        note: "tweede semester 2023: 12% (B.S. 29/09/2023)"
      },
      {
        from: "2024-01-01",
        to: "2024-06-30",
        rate: 12.5,
        note: "eerste semester 2024: 12,5 % (B.S. 19/02/2024)"
      },
      {
        from: "2024-07-01",
        to: "2024-12-31",
        rate: 12.5,
        note: "tweede semester 2024: 12,5 % (B.S. 30/07/2024)"
      },
      {
        from: "2025-01-01",
        to: "2025-06-30",
        rate: 11.5,
        note: "eerste semester 2025: 11,5 % (B.S. 04/04/2025)"
      },
      {
        from: "2025-07-01",
        to: "2025-12-31",
        rate: 10.5,
        note: "tweede semester 2025: 10,5 %"
      },
      {
        from: "2026-01-01",
        to: "2026-06-30",
        rate: 10.5,
        note: "eerste semester 2026: 10,5 %"
      },
      {
        from: "2026-07-01",
        to: "2026-12-31",
        rate: 10.5,
        note: "tweede semester 2026: 10,5 %"
      }
    ]
  }
};

// src/interest-rates.ts
var interestRates = interest_rates_default;
function toDay(date) {
  if (typeof date === "string") return date.slice(0, 10);
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}
function getInterestRate(date, type, options = {}) {
  const day = toDay(date);
  const period = interestRates[type].periods.find(
    (p) => p.from <= day && day <= p.to
  );
  if (!period) return null;
  const rate = !options.contractAfter20130316 && period.rateForContractsBefore20130316 !== void 0 ? period.rateForContractsBefore20130316 : period.rate;
  return { rate, period: { from: period.from, to: period.to } };
}
function getLatestKnownRateDate(type) {
  return interestRates[type].periods.reduce(
    (latest, p) => p.to > latest ? p.to : latest,
    ""
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  arrondissements,
  cantons,
  courts,
  findCourts,
  formatCourtName,
  getArrondissement,
  getCanton,
  getCantonsForMunicipality,
  getContact,
  getCourt,
  getInterestRate,
  getJudicialArea,
  getLatestKnownRateDate,
  getMunicipality,
  interestRates,
  judicialAreas,
  municipalities
});
