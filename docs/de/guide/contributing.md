# Mitwirken {#contributing}

## Daten aktualisieren {#updating-data}

Die Gerichte, Gefängnisse, Justizhäuser und Kantonsgrenzen werden jede Woche aus den amtlichen
Quellen gebaut ([wie](./data-quality#how-the-data-is-built)): Bearbeiten Sie sie nicht von Hand.
Korrigieren Sie den Parser in `scripts/parse` oder, wenn die Quelle selbst falsch ist, melden Sie
es dem Gericht. Der wöchentliche Pull Request wird wie jeder andere geprüft: Vergleichen Sie den
Diff mit den Quellen, bevor Sie mergen.

Für die von Hand gepflegten Datensätze (Gerichtsbereiche, Gerichtsbezirke, Zinssätze):

1. Bearbeiten Sie das JSON in `data/`. Behalten Sie die bestehenden IDs: Projekte speichern sie.
2. Aktualisieren Sie `lastReviewed` des Datensatzes in `datapackage.json`, wenn Sie ihn mit seinen
   Quellen abgeglichen haben.
3. `pnpm check`: generiert die ID-Typen und Schemas neu, prüft Typen, Lint und Formatierung, baut,
   führt die Tests mit Coverage aus und lintet das Package. Es schlägt fehl, wenn die generierten
   Dateien nicht committet sind.
4. Fügen Sie in `CHANGELOG.md` unter Unreleased eine Zeile hinzu und committen Sie (einschließlich
   `schema/`, `src/ids.generated.ts` und `ids.lock.json`). Die Build-Ausgabe (`dist/`) wird nicht
   committet: Sie wird für jedes Release gebaut und auf npm veröffentlicht.

Eine veröffentlichte ID bleibt: `ids.lock.json` listet sie alle auf, und die Tests schlagen fehl,
wenn eine in den Daten fehlt. Hat eine Quelle einen Eintrag umbenannt, ordnen Sie den neuen Namen
im Parser der bestehenden ID zu; ist der Eintrag beendet, behalten Sie ihn mit einem `validTo`.
Siehe [Identifikatoren](./identifiers#stability).

### Kantone und Gemeinden {#cantons-and-municipalities}

`data/cantons.json` und `data/municipalities.json` sind generiert; bearbeiten Sie sie nicht von
Hand. Führen Sie `pnpm build:cantons` aus (braucht Netzwerkzugang und `unzip`). Es liest:

- die Anlage zum Gerichtsgesetzbuch, „Gebiedsomschrijving en zetel van hoven en rechtbanken“
  ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  auf Niederländisch und Französisch;
- die Datei von Statbel zur Bevölkerung pro Gemeinde, für die aktuellen Gemeinden und
  REFNIS-Codes.

Es parst den niederländischen und den französischen Text getrennt und schreibt nichts, solange sie
nicht übereinstimmen und nicht jede Gemeinde genau einmal abgedeckt ist (oder auf mehrere Kantone
aufgeteilt). Exonyme, die die Anlage verwendet, Statbel aber nicht (`Gembloers`, `Saint-Nicolas`,
…), Tippfehler in der Anlage und Grenzangaben, die es nicht auseinanderhalten kann, stehen oben im
Skript.

Führen Sie es erneut aus, nachdem ein Gesetz die Anlage ändert oder Gemeinden fusionieren.
Kanton-IDs folgen der Landessprache (Niederländisch in Flandern und Brüssel, Französisch in der
Wallonie, Deutsch um Eupen); das Friedensgericht des Kantons `x` hat die ID
`justice-of-the-peace-x` und verweist über sein Feld `canton` darauf.

### Gescrapte Datensätze {#scraped-datasets}

```bash
pnpm fetch:sources            # jede Quelle nach .sources/ (etwa 20 Minuten, höflich)
pnpm fetch:sources courts     # oder eine Quelle
pnpm build:data               # Gerichte, Gefängnisse, Justizhäuser, Postleitzahlen, Regionen und Provinzen aus .sources/ neu bauen
```

Die Kantonsgrenzen stammen aus dem GeoPackage des NGI (Quelle `ngi`), gelesen mit dem eingebauten
SQLite von Node; benennt das NGI einen Kanton um, ordnen Sie seinen Code in `CANTON_ALIASES` in
`scripts/parse/boundaries.ts` der ID zu.

Oder checken Sie die neuesten Snapshots aus, statt sie abzurufen:
`git worktree add .sources origin/sources`.

Eine Quelle ist ein Walk in `scripts/sources/catalog.ts`; ein Parser liest ihre Snapshots in
`scripts/parse`. Ändert eine Website ihr Markup, zeigen die Parsertests in `test/parse` (an
gekürzten Kopien echter Seiten in `test/fixtures/sources`), was kaputtgegangen ist.

### Neue Zinssätze {#new-interest-rates}

- **Handelsgeschäfte**: Der FÖD Finanzen (FOD Financiën) veröffentlicht den Zinssatz pro
  Halbjahr. Fügen Sie einen Zeitraum mit `from`, `to`, `rate` und dem Datum des Staatsblatts in
  `note` hinzu.
- **Gesetzlicher Zinssatz**: pro Kalenderjahr veröffentlicht. Fügen Sie einen Zeitraum für das
  Jahr hinzu.

## Einen Datensatz hinzufügen {#adding-a-dataset}

Jeder Datensatz wird gleich behandelt, damit Nutzer sich darauf verlassen können:

1. **Daten**: `data/<name>.json`, ein Array von Einträgen. Jeder Wert aus einer amtlichen Quelle.
2. **IDs**: Folgen Sie den [Regeln für Identifikatoren](./identifiers): ein amtlicher Code, wenn
   es einen gibt, sonst Kebab-Case in Kleinbuchstaben aus dem Namen in der Landessprache
   (`scripts/id.ts`).
3. **Verweise, keine Kopien**: Verweisen Sie per ID auf Gerichtsbezirke, Kantone und Gemeinden,
   und verwenden Sie die gemeinsamen Typen wieder (`Translated`, `Address`, `Contact`,
   `SourceRef`).
4. **Quellen**: ein `sources: [{ url, retrieved }]` an jedem Eintrag und ein Eintrag in
   `datapackage.json` mit den Quellen des Datensatzes, Lizenz, `lastReviewed` und
   `reviewEveryMonths`.
5. **Typen und Hilfsfunktionen**: `src/<name>.ts`, exportiert aus `src/index.ts`, plus ein Entry
   Point in `tsup.config.ts` und in den `exports` von `package.json`.
6. **Schema**: Fügen Sie den Dateityp zu `scripts/schema-types.ts` und `scripts/build-schemas.ts`
   hinzu.
7. **Quelle und Parser**: ein Walk in `scripts/sources/catalog.ts`, der die amtlichen Seiten
   abruft, und ein Parser in `scripts/parse`, der die Datei aus den Snapshots baut, mit Fixtures
   und Tests. Er liest nur, was er sicher lesen kann, und meldet den Rest.
8. **Tests**: eindeutige IDs, auflösbare Verweise und die Anzahl, die die amtliche Quelle angibt.
9. **Dokumentation**: eine Seite unter `docs/data/` mit dem Nutzen, Quelle und Aktualisierungen
   sowie einer Feldtabelle.

## Prüfungen {#checks}

| Befehl                      | Was er tut                                                                                                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                | Alles, was CI ausführt: `generate`, `typecheck`, `lint`, `build`, `test:coverage`, `test:package`, `lint:package` und eine Prüfung, dass die generierten Dateien committet sind |
| `pnpm test`                 | Unit-, Integritäts-, Schema- und Typtests auf dem Quellcode (kein Build nötig)                                                                                                  |
| `pnpm test:package`         | Smoke-Tests des gebauten Package mit `import` und `require()`: zuerst `pnpm build` ausführen                                                                                    |
| `pnpm test:coverage`        | Dasselbe, schlägt aber unter 100 % Abdeckung von `src/` fehl                                                                                                                    |
| `pnpm lint` / `pnpm format` | ESLint und Prettier: prüfen / korrigieren                                                                                                                                       |
| `pnpm generate`             | Generiert `src/ids.generated.ts` (ID-Typen) und `schema/` aus den Daten und Typen neu und fügt neue IDs zu `ids.lock.json` hinzu                                                |
| `pnpm lint:package`         | `publint` und `arethetypeswrong` auf dem gepackten Package                                                                                                                      |
| `pnpm test:freshness`       | Datumsbezogene Prüfungen: fehlende Zinssätze, überfällige Prüfungen. Nicht Teil von `check`; `FRESHNESS_ONLINE=1` prüft auch die Quell-URLs                                     |
| `pnpm fetch:sources`        | Ruft die amtlichen Quellen nach `.sources/` ab                                                                                                                                  |
| `pnpm build:data`           | Baut Gerichte, Gefängnisse, Justizhäuser, Postleitzahlen, Regionen, Provinzen und Kantonsgrenzen aus `.sources/` neu                                                            |
| `pnpm build:csv`            | Schreibt die Daten als CSV-Tabellen nach `csv/`                                                                                                                                 |

## Ein Release erstellen {#releasing}

1. Verschieben Sie die Einträge unter Unreleased in `CHANGELOG.md` unter die neue Version.
2. Erhöhen Sie `version` in `package.json` und committen Sie.
3. Taggen und pushen: `git tag v0.3.0 && git push && git push --tags`.

Der Release-Workflow führt `pnpm check` aus, veröffentlicht den Tag mit Provenance auf npm und
erstellt ein GitHub-Release mit den Daten, Schemas und CSV-Tabellen als Anhang. Der Tag muss mit
`version` übereinstimmen.

## Diese Website {#this-website}

Die Website liegt in `docs/` und wird mit [VitePress](https://vitepress.dev) gebaut. Die
interaktiven Tabellen importieren das eigene `src/` und `data/` des Package und zeigen daher immer
die Daten im Repository.

```bash
pnpm docs:dev      # lokaler Server mit Hot Reload
pnpm docs:build    # statische Website in docs/.vitepress/dist
pnpm docs:preview  # die gebaute Website ausliefern
```

Jeder Push auf `main` deployt sie auf GitHub Pages. CI baut sie bei jedem Pull Request, sodass eine
kaputte Seite vor dem Mergen auffällt.

### Übersetzungen {#translations}

Die englischen Seiten in `docs/` sind die maßgebliche Quelle. Jede andere Sprache hat denselben
Baum in einem eigenen Ordner: Niederländisch (`docs/nl/`) und Französisch (`docs/fr/`) sowie
Deutsch, Spanisch, Italienisch, Portugiesisch, Polnisch, Türkisch, Arabisch, Ukrainisch,
Chinesisch und Japanisch (`docs/de/`, `docs/es/` usw.). Sie sind Übersetzungen der englischen
Seite und werden nach deren Änderung aktualisiert. Wenn Sie eine englische Seite ändern, ändern
Sie dieselbe Seite auch in `docs/nl/` und `docs/fr/`, oder sagen Sie im Pull Request, dass die
Übersetzungen hinterherhinken; die anderen Sprachen dürfen ein Release zurückliegen. Die Texte des
Themes und der interaktiven Komponenten in diesen anderen Sprachen stehen in
`docs/.vitepress/locales/`.

Code, IDs, Feldnamen und amtliche Namen bleiben in jeder Sprache, wie sie sind, und jede
Überschrift behält den englischen Anker (`## Überschrift {#english-anchor}`), damit Querverweise
und die Sprachauswahl weiter funktionieren. Eine belgische Einrichtung oder ein juristischer
Begriff behält seinen amtlichen niederländischen oder französischen Namen (oder den deutschen, wo
Belgien einen veröffentlicht) statt einer erfundenen Übersetzung: Eine chinesische Seite sagt
vredegerecht / justice de paix, kein ausgedachtes Wort dafür. Das Changelog wird nur auf Englisch
gepflegt.
