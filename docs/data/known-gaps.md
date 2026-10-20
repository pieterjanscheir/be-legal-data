# Known gaps

- Courts only cover East and West Flanders so far: justices of the peace and the
  Ondernemingsrechtbank Gent. All 162 cantons are in `data/cantons.json`, so the missing justices
  of the peace are known; other court types still need a manifest.
- Canton names and seats are in Dutch and French only: the annex has no consolidated German text.
- Split municipalities (Antwerpen, Gent, Brussel, Luik, …) map to several cantons. Picking the
  right one needs the street address, and the boundaries exist only as legal prose in `territory`.
- The French name of canton Beveren-Kruibeke-Zwijndrecht in `courts.json`
  (`Beveren-Cruybeke-Zwijndrecht`) differs from the annex (`Beveren-Kruibeke-Zwijndrecht`).
- Phone numbers are stored as found, in mixed formats.
- `formatCourtName` builds French and German names that may not match official usage
  (`Tribunal de paix 1e canton Gand`, where Belgian usage is likely *justice de paix* and
  *1er canton*): [#10](https://github.com/pieterjanscheir/be-legal-data/issues/10).
- Courts don't yet record a source URL per record:
  [#5](https://github.com/pieterjanscheir/be-legal-data/issues/5).
- The Ondernemingsrechtbank Gent, division Oostende, has no house number (Canadaplein).

Found something wrong or missing?
[Report a data correction](https://github.com/pieterjanscheir/be-legal-data/issues/new?template=data-correction.yml)
or see [contributing](/guide/contributing). Planned datasets are on the [roadmap](./roadmap).
