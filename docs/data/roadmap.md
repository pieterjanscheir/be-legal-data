# Roadmap

Datasets that are planned, with the issue that specifies each one. Each issue lists the
official sources, the proposed fields and what "done" means. Help is welcome: pick one and
follow the [conventions](/guide/contributing#adding-a-dataset).

## Planned

| Dataset                                                                                               | Why it's useful                                                                                                    | Issue                                                       |
| ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- |
| **The other courts**: Court of Cassation, Constitutional Court, Council of State, disciplinary courts | The highest courts aren't on the courts' portal, so they need their own sources                                    | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **The house of justice in Eupen** (German-speaking Community)                                         | The one house of justice the data doesn't have yet                                                                 | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **History**: when cantons, municipalities and courts changed                                          | The model has validity periods and lookups by day; the earlier versions still need the data                        | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Address → coordinates**                                                                             | The [canton boundaries](./canton-boundaries) find the canton of a point; geocoding the address is the missing step | [#28](https://github.com/pieterjanscheir/belgica/issues/28) |
| **Bailiff offices** (gerechtsdeurwaarders / huissiers de justice)                                     | Find a bailiff in an arrondissement for service or enforcement                                                     | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Police zones** (politiezones / zones de police)                                                     | Which zone handles a municipality: complaints, copies of reports                                                   | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Cadastre and legal-certainty offices** (kadaster, former hypotheekkantoren)                         | Request mortgage certificates and cadastral extracts from the competent office                                     | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## Worth considering

Collected in [#9](https://github.com/pieterjanscheir/belgica/issues/9), roughly in order
of how often they'd be used:

- **Sub-municipalities** (deelgemeenten, sections de commune) per postal code. The
  [postal codes](./postal-codes) stop at the municipality; bpost's list names the localities but
  has no REFNIS code and no open licence.
- **Court fees** (rolrechten / griffierechten) and the **procedural indemnity**
  (rechtsplegingsvergoeding) brackets, with their validity periods and indexation, like the
  interest rates.
- **Judicial holidays and public holidays** per year, for computing procedural deadlines.
- **Prosecutors' offices** (parketten, arbeidsauditoraten) per arrondissement.
- **Notaries and notarial chambers**, **bars** (balies / barreaux).
- **Municipality mergers**: old → new REFNIS codes for 2019 and 2025, so older data can be
  mapped.
- **The health index** (gezondheidsindex) for rent indexation.

## Why some datasets aren't here yet

A legal dataset is only useful if every value comes from an official source, so nothing is
added by hand from memory. Each dataset is built by a script from snapshots of its source, and
most sources are fetched every week by GitHub Actions. Two can't be, for now: the site of the
Belgian Official Journal (ejustice), which the cantons come from, and police.be both refuse
connections from GitHub's servers; they're fetched from a regular machine instead
([#24](https://github.com/pieterjanscheir/belgica/issues/24)). The bailiffs' directory is
built in the browser, so it needs a browser to read, or the National Chamber's data
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
