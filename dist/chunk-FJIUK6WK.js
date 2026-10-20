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
var courtsById = new Map(courts.map((c) => [c.id, c]));
function getCourt(id) {
  return courtsById.get(id);
}
function getJusticeOfThePeace(cantonId) {
  const court = courtsById.get(`Vredegerecht${cantonId}`);
  return court?.type === "justice-of-the-peace" ? court : void 0;
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

export {
  courts,
  getCourt,
  getJusticeOfThePeace,
  findCourts,
  getContact,
  formatCourtName
};
