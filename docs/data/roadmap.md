# Roadmap

Datasets that are planned, with the issue that specifies each one. Each issue lists the
official sources, the proposed fields and what "done" means. Help is welcome: pick one and
follow the [conventions](/guide/contributing#adding-a-dataset).

## Planned

| Dataset                                                                                                                                                                                                 | Why it's useful                                                                          | Issue                                                             |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| **Remaining courts**: all justices of the peace, police courts, courts of first instance, enterprise and labour courts, courts of appeal, labour courts of appeal, courts of assize, Court of Cassation | Address and file with any court, not just those in East and West Flanders                | [#4](https://github.com/pieterjanscheir/be-legal-data/issues/4)   |
| **Court sources and contact checks**: a source URL and check date per court, website, phone numbers in E.164                                                                                            | Know where every value came from and how old it is                                       | [#5](https://github.com/pieterjanscheir/be-legal-data/issues/5)   |
| **Prisons** (gevangenissen / prisons)                                                                                                                                                                   | Serve documents on and visit detainees; competence of the sentence implementation courts | [#2](https://github.com/pieterjanscheir/be-legal-data/issues/2)   |
| **Houses of justice** (justitiehuizen / maisons de justice)                                                                                                                                             | Probation, mediation, victim support, social studies ordered by family courts            | [#3](https://github.com/pieterjanscheir/be-legal-data/issues/3)   |
| **Bailiff offices** (gerechtsdeurwaarders / huissiers de justice)                                                                                                                                       | Find a bailiff competent in an arrondissement for service or enforcement                 | [#6](https://github.com/pieterjanscheir/be-legal-data/issues/6)   |
| **Police zones** (politiezones / zones de police)                                                                                                                                                       | Which zone handles a municipality: complaints, copies of reports                         | [#7](https://github.com/pieterjanscheir/be-legal-data/issues/7)   |
| **Cadastre and legal-certainty offices** (kadaster, former hypotheekkantoren)                                                                                                                           | Request mortgage certificates and cadastral extracts from the competent office           | [#8](https://github.com/pieterjanscheir/be-legal-data/issues/8)   |
| **French and German court names**: verify `formatCourtName`                                                                                                                                             | Correct official names in every language                                                 | [#10](https://github.com/pieterjanscheir/be-legal-data/issues/10) |

## Worth considering

Collected in [#9](https://github.com/pieterjanscheir/be-legal-data/issues/9), roughly in order
of how often they'd be used:

- **Postal codes → municipality (REFNIS)**, with sub-municipalities (deelgemeenten). Addresses
  come with a postal code, not a REFNIS code; this is the missing link for "which court for this
  address?".
- **Court fees** (rolrechten / griffierechten) and the **procedural indemnity**
  (rechtsplegingsvergoeding) brackets, with their validity periods and indexation, like the
  interest rates.
- **Judicial holidays and public holidays** per year, for computing procedural deadlines.
- **Prosecutors' offices** (parketten, arbeidsauditoraten) per arrondissement.
- **Notaries and notarial chambers**, **bars** (balies / barreaux).
- **Municipality mergers**: old → new REFNIS codes for 2019 and 2025, so older data can be
  mapped.
- **Provinces and regions** as their own dataset (today only codes).
- **The health index** (gezondheidsindex) for rent indexation.

## Why some datasets aren't here yet

The session that planned these couldn't reach the official websites to collect the data, and
a legal dataset is only useful if every value comes from an official source. So each one is
an issue with a precise spec rather than a guess. Every new dataset ships with a script that
rebuilds it from the source where possible, so the weekly freshness check can keep it up to date.
