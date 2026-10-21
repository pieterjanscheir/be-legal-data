# Without JavaScript

The JSON files in `data/` are the source of truth; the TypeScript only adds types and helpers.
You can read them from any language:

- from the npm package (`node_modules/be-legal-data/data/`);
- as a git submodule;
- from a raw URL pinned to a release tag.

```
https://raw.githubusercontent.com/pieterjanscheir/be-legal-data/v0.3.0/data/cantons.json
```

Pin a tag rather than `main`, so the data only changes when you choose to upgrade.

## Python

```python
import json
from urllib.request import urlopen

BASE = "https://raw.githubusercontent.com/pieterjanscheir/be-legal-data/v0.3.0/data"

cantons = json.load(urlopen(f"{BASE}/cantons.json"))

def cantons_for_municipality(refnis: str) -> list[dict]:
    return [c for c in cantons if any(m["municipality"] == refnis for m in c["municipalities"])]

print([c["id"] for c in cantons_for_municipality("44021")])  # gent-1 … gent-5
```

### Interest rates

Periods are inclusive on both ends and dates are `YYYY-MM-DD`, so string comparison works:

```python
rates = json.load(urlopen(f"{BASE}/interest-rates.json"))

def interest_rate(day: str, kind: str, contract_after_20130316: bool = False) -> float | None:
    for p in rates[kind]["periods"]:
        if p["from"] <= day <= p["to"]:
            older = p.get("rateForContractsBefore20130316")
            return older if older is not None and not contract_after_20130316 else p["rate"]
    return None
```

## CSV

Every [release](https://github.com/pieterjanscheir/be-legal-data/releases) has a zip with the
data as JSON and as CSV tables (UTF-8, comma-separated), with the schemas and
`datapackage.json`. Nested values are tables of their own: a court's contacts are in
`court-contacts.csv`, keyed by court id; a canton's municipalities in
`canton-municipalities.csv`. In Excel, open them with Data > From Text/CSV.

## Files

| File                          | Contents                                                     |
| ----------------------------- | ------------------------------------------------------------ |
| `data/judicial-areas.json`    | The 5 judicial areas (courts of appeal)                      |
| `data/arrondissements.json`   | The 12 judicial arrondissements and their judicial area      |
| `data/cantons.json`           | All 162 judicial cantons                                     |
| `data/municipalities.json`    | The 565 municipalities with REFNIS code, province and region |
| `data/regions.json`           | The 3 regions, named in three languages                      |
| `data/provinces.json`         | The 10 provinces, with their region                          |
| `data/courts.json`            | Every court, division and seat on the courts' portal         |
| `data/prisons.json`           | The prisons and detention houses                             |
| `data/houses-of-justice.json` | The houses of justice of the Flemish and French Communities  |
| `data/postal-codes.json`      | Every postal code with the municipality it belongs to        |
| `data/interest-rates.json`    | Legal and commercial-transaction interest rates              |

The shapes are described on the [data pages](/data/territory) and in the [API reference](/api#types).

## Licence

The data is [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/): reuse it freely,
including commercially, with credit to this project and to the sources listed for each dataset.
Municipality data © Statbel.
