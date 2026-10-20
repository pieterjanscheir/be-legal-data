"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }// data/interest-rates.json
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
  if (typeof date === "string") {
    const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(date);
    const [y, m2, d2] = (_nullishCoalesce(match, () => ( []))).slice(1).map(Number);
    const check = new Date(Date.UTC(y, m2 - 1, d2));
    if (!match || check.getUTCMonth() !== m2 - 1 || check.getUTCDate() !== d2) {
      throw new RangeError(`Expected a day as YYYY-MM-DD, got '${date}'`);
    }
    return date.slice(0, 10);
  }
  if (Number.isNaN(date.getTime())) throw new RangeError("Invalid Date");
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





exports.interestRates = interestRates; exports.getInterestRate = getInterestRate; exports.getLatestKnownRateDate = getLatestKnownRateDate;
