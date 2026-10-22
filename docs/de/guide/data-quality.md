# Datenqualität und Aktualität {#data-quality-freshness}

Juristische Referenzdaten veralten still: Ein neuer Zinssatz wird veröffentlicht, ein Gericht
zieht um, ein Gesetz legt zwei Kantone zusammen. Diese Seite erklärt, wie das Package auf dem
Laufenden bleibt und wie weit Sie jedem Datensatz vertrauen können.

## Woher jeder Datensatz stammt {#where-each-dataset-comes-from}

| Datensatz                         | Quelle                                               | Wie gebaut                                 | Ändert sich, wenn                                                    | Prüfung        |
| --------------------------------- | ---------------------------------------------------- | ------------------------------------------ | -------------------------------------------------------------------- | -------------- |
| Gerichtsbereiche, Gerichtsbezirke | Gerichtsgesetzbuch, Anlage Art. 4–5                  | Von Hand                                   | Ein Gesetz die Gerichtslandkarte neu zeichnet (selten; zuletzt 2014) | Alle 24 Monate |
| Kantone                           | Gerichtsgesetzbuch, Anlage Art. 1 (nl + fr)          | Generiert: `pnpm build:cantons`            | Ein Gesetz die Anlage ändert; Gemeinden fusionieren                  | Alle 12 Monate |
| Kantonsgrenzen                    | NGI (geo.be)                                         | Wöchentlich: Snapshots + `pnpm build:data` | Das NGI eine neue Version veröffentlicht                             | Wöchentlich    |
| Gemeinden                         | Open Data von Statbel                                | Generiert: `pnpm build:cantons`            | Gemeinden fusionieren (2019, 2025)                                   | Alle 12 Monate |
| Regionen, Provinzen               | REFNIS-Codeliste von Statbel                         | Wöchentlich: Snapshots + `pnpm build:data` | Statbel sein Register ändert (zuletzt 1995)                          | Wöchentlich    |
| Gerichte                          | tribunaux-rechtbanken.be                             | Wöchentlich: Snapshots + `pnpm build:data` | Ein Gericht umzieht oder seine Kontaktdaten oder Zeiten ändert       | Wöchentlich    |
| Gefängnisse                       | justitie.belgium.be                                  | Wöchentlich: Snapshots + `pnpm build:data` | Ein Gefängnis öffnet, schließt oder seine Kontaktdaten ändert        | Wöchentlich    |
| Justizhäuser                      | vlaanderen.be, maisonsdejustice.be                   | Wöchentlich: Snapshots + `pnpm build:data` | Ein Justizhaus umzieht oder seine Kontaktdaten ändert                | Wöchentlich    |
| Postleitzahlen                    | Umrechnungstabelle von Statbel                       | Wöchentlich: Snapshots + `pnpm build:data` | Statbel eine neue Tabelle veröffentlicht (Fusionen, neue Codes)      | Wöchentlich    |
| Zinssätze                         | FÖD Finanzen (FOD Financiën), Belgisches Staatsblatt | Von Hand                                   | Jedes Jahr (gesetzlich) und jedes Halbjahr (Handelsgeschäfte)        | Alle 6 Monate  |

Generierte Datensätze werden nie von Hand bearbeitet. `pnpm build:cantons` parst den amtlichen
Text und schreibt nichts, solange die niederländische und die französische Fassung nicht
übereinstimmen und nicht jede Gemeinde abgedeckt ist; `pnpm build:data` bricht ab, wenn eine Seite
nicht zugeordnet werden kann, ein Kanton kein Gericht hat oder ein Kanton keine Grenze in der Datei
des NGI hat.

## Wie die Daten gebaut werden {#how-the-data-is-built}

```
official site ──fetch──> snapshots (sources branch) ──parse──> data/*.json ──> pull request
```

1. **Abrufen.** Jeden Montag ruft der [sources-Workflow](https://github.com/pieterjanscheir/belgica/actions/workflows/sources.yml)
   jede Seite der Quellen ab (`scripts/sources`), höflich: eine Anfrage pro Sekunde und Website,
   mit einem User Agent, der das Projekt nennt. Jede Seite wird auf dem Branch `sources`
   aufbewahrt, mit einem Index dessen, was wann abgerufen wurde, und einem Hash des Inhalts. Eine
   Seite wird nur dann erneut gespeichert, wenn sich ihr Inhalt ändert; die Historie des Branch
   zeigt also, was sich an welchem Tag geändert hat. Eine Seite, deren Abruf fehlschlägt (ein
   Serverfehler, ein 404), behält ihren letzten guten Snapshot und stoppt den Lauf, was ein Issue
   öffnet: Die Daten werden nie aus einem unvollständigen Bild neu gebaut. Eine Seite, auf die die
   Quelle nicht mehr verlinkt, fällt aus den Snapshots; ihr Eintrag bleibt in den Daten, beendet
   mit einem `validTo` (dem Tag vor der Prüfung, die sie nicht mehr fand), sodass ihre ID weiter
   funktioniert und Nachschlagen für einen früheren Tag sie noch findet. Eine neu erscheinende
   Seite erhält einen Eintrag mit einem `validFrom`.
2. **Parsen.** `pnpm build:data` liest die Snapshots (`scripts/parse`) und schreibt die Gerichte,
   Gefängnisse, Justizhäuser und Kantonsgrenzen. Es meldet, was es nicht lesen kann, und schlägt
   fehl, wenn eine Seite nicht zugeordnet werden kann.
3. **Testen.** Der Workflow führt die Typprüfung und die Tests auf den neuen Daten aus.
4. **Review.** Haben sich die Daten geändert, öffnet oder aktualisiert er einen Pull Request mit dem
   Diff und der Liste unlesbarer Werte. Ein Mensch prüft ihn anhand der Quellen und merget ihn.

Um es selbst auszuführen: `pnpm fetch:sources` (schreibt `.sources/`), dann `pnpm build:data`.

Die Kantone und Gemeinden werden von Hand mit `pnpm build:cantons` neu gebaut: Die Website des
Belgischen Staatsblatts verweigert sich den Servern von GitHub
([#52](https://github.com/pieterjanscheir/belgica/issues/52)).

## Automatische Prüfungen {#automatic-checks}

### Bei jeder Änderung (CI) {#on-every-change-ci}

- **Schemavalidierung**: Jede Datendatei entspricht ihrem [JSON Schema](./schema).
- **Integrität**: IDs sind eindeutig und wohlgeformt; jeder Verweis (Gerichtsbezirk, Kanton,
  Gemeinde, Gericht, Grenze) zeigt auf einen existierenden Eintrag; jeder Kanton hat genau eine
  Grenze, gültiges GeoJSON innerhalb Belgiens, das ohne Überlappungen die Fläche des Landes ergibt;
  jede Gemeinde liegt in genau einem Kanton oder ist auf mehrere aufgeteilt; jeder Kanton bleibt
  innerhalb der Provinzen seines Gerichtsbezirks; jeder Kanton hat genau ein Friedensgericht; jede
  Abteilung hat Typ und Bereich ihres Gerichts; jede Gerichtsart hat die vom Gesetz festgelegte
  Anzahl Gerichte; jeder Kanton fällt unter ein Gericht jedes Typs (eines pro Sprache in
  Brüssel), und die Kantone eines Gerichts liegen in seinem Gerichtsbezirk und Gerichtsbereich.
- **Parser**: Ende zu Ende getestet an gekürzten Kopien echter Seiten (`test/fixtures/sources`),
  und jeder Leser (Telefonnummern, IBANs, Adressen, Öffnungszeiten) an den Formen, die in den
  Quellen vorkommen, und an dem, was er ablehnen muss.
- **Zinssätze**: Zeiträume sind sortiert, überlappen nie und lassen keine Lücken; der gesetzliche
  Zinssatz läuft pro Kalenderjahr und der Zinssatz für Handelsgeschäfte pro Halbjahr; der Zinssatz
  nach Vertragsdatum von 2013–2015 erscheint nur in diesem Zeitfenster.
- **Kontaktdaten**: Jede IBAN besteht ihre ISO-13616-Prüfsumme, Telefonnummern sind belgische
  E.164-Nummern, E-Mail-Adressen sind kleingeschrieben, und Öffnungszeiten entsprechen der
  `opening_hours`-Syntax.
- **Code**: striktes TypeScript (einschließlich unchecked index access und exact optional
  properties), ESLint mit typbewussten Regeln, Prettier und 100 % Testabdeckung von `src/`.
- **Packaging**: Das gebaute Package lädt mit `import` und mit `require()`, aus jedem Entry Point,
  auf Node 22.12, 22, 24 und 26; `publint` und `arethetypeswrong` prüfen die `exports` und die
  Typdeklarationen.

### Jede Woche (geplant) {#every-week-scheduled}

Der [freshness-Workflow](https://github.com/pieterjanscheir/belgica/actions/workflows/freshness.yml)
läuft jeden Montag und öffnet ein Issue mit dem Label
[`data-freshness`](https://github.com/pieterjanscheir/belgica/issues?q=label%3Adata-freshness),
wenn er etwas findet:

- **Fehlende Zinssätze**: kein gesetzlicher Zinssatz oder Zinssatz für Handelsgeschäfte für heute,
  oder kein Zinssatz für Handelsgeschäfte für die nächsten zwei Wochen (der FÖD Finanzen
  veröffentlicht ihn vor Beginn des Halbjahres).
- **Überfällige Prüfungen**: Das `lastReviewed`-Datum eines Datensatzes in `datapackage.json` ist
  älter als sein `reviewEveryMonths`.
- **Tote Quellen**: Eine amtliche Quell-URL in `datapackage.json` antwortet nicht mehr.

Führen Sie sie selbst mit `pnpm test:freshness` aus (fügen Sie `FRESHNESS_ONLINE=1` hinzu, um auch
die URLs zu prüfen).

## Wie man einen Wert liest {#how-to-read-a-value}

- **Fehlend ist nicht null.** `getInterestRate` gibt für einen Tag ohne hinterlegten Zinssatz
  `null` zurück, statt zu raten; ein Feld, das die Quelle nicht liefert (die Adresse eines
  Gerichts, maschinenlesbare Öffnungszeiten), fehlt, statt ausgefüllt zu werden. Behandeln Sie
  beides.
- **Zu früh ist ein Fehler.** Nachschlagen für einen Tag vor dem abgedeckten Zeitraum eines
  Datensatzes wirft einen `RangeError`: Die Daten können es nicht sagen, und die heutige Antwort
  sähe aus wie die richtige.
- **Kontaktdaten sind am wenigsten stabil.** Telefonnummern, E-Mail-Adressen und Öffnungszeiten
  ändern sich ohne Ankündigung. Jeder Eintrag sagt, aus welchen Seiten er wann gelesen wurde
  (`sources`); prüfen Sie die Seite des Gerichts (`website`), wenn es darauf ankommt.
- **Der Gesetzestext gewinnt.** Bei geteilten Gemeinden ist `territory` des Kantons der Text des
  Gesetzes selbst, wörtlich. Weichen eine Zusammenfassung oder die [Grenze](/de/data/canton-boundaries)
  des NGI vom Text ab, hat der Text recht.

## Einen Fehler melden {#reporting-a-mistake}

[Öffnen Sie eine Datenkorrektur](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)
mit der ID des Eintrags und einem Link zur amtlichen Quelle. Korrekturen erscheinen als
Patch-Versionen.
