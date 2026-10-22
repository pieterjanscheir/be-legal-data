# Designentscheidungen {#design-decisions}

Das Package wurde vor seinen ersten Nutzern neu entworfen, sodass jede Entscheidung nach der Sache
getroffen werden konnte statt aus Rücksicht auf Kompatibilität. Diese Seite hält jede Entscheidung
fest, warum sie getroffen wurde und was daraus folgt. Eine neue Entscheidung erhält einen neuen
Eintrag; eine zurückgenommene wird markiert, nicht gelöscht.

## 1. Die Daten sind das Produkt; der Code ist eine Annehmlichkeit {#_1-the-data-is-the-product-the-code-is-a-convenience}

**Entscheidung.** Die amtlichen Quellen sind die Wahrheit; die JSON-Dateien in `data/` werden
daraus gebaut und sind das Produkt. Sie sind ohne jedes TypeScript nutzbar: aus Python, einer
Tabellenkalkulation (die Releases enthalten CSV-Tabellen) oder mit `jq`. Die Struktur jeder Datei
wird einmal definiert, durch die TypeScript-Typen, und als daraus generiertes JSON Schema
veröffentlicht; CI schlägt fehl, wenn Typen, Schemas und Daten nicht übereinstimmen. Die
Bibliothek fügt Typen, Indizes und Hilfsfunktionen hinzu, und nichts davon ist nötig, um die Daten
zu verstehen.

**Warum.** Referenzdaten überleben den Code um sie herum, und die meisten Nutzer belgischer
juristischer Daten sind keine JavaScript-Projekte.

**Daher.** Jede Datei hat ein [JSON Schema](./schema) und einen Eintrag in `datapackage.json` mit
ihren Quellen und ihrer Lizenz. Feldnamen und Werte werden in der Dokumentation erklärt, nicht nur
im Code.

## 2. Rechtliche Fakten sind Daten, nie berechnet {#_2-legal-facts-are-data-never-computed}

**Entscheidung.** Alles mit rechtlicher Bedeutung (der Name eines Gerichts, das Gebiet eines
Kantons, ein Zinssatz) stammt wörtlich aus einer amtlichen Quelle und wird gespeichert. Code darf
formatieren oder nachschlagen; er darf keine rechtliche Tatsache konstruieren.

**Warum.** Code, der eine Tatsache zusammensetzt, kann auf eine Weise falsch sein, die Tests nicht
erkennen: Die französischen Gerichtsnamen, die ein früheres `formatCourtName` baute, waren falsch
(`Tribunal de paix …`, während die Gerichte sich selbst `Justice de paix …` nennen;
[#10](https://github.com/pieterjanscheir/belgica/issues/10)). Ein gespeicherter Wert kann
an seiner Quelle geprüft werden.

**Daher.** Gerichtsnamen werden so gespeichert, wie jedes Gericht sie veröffentlicht, in jeder
Sprache, in der es veröffentlicht, und `formatCourtName` ist entfernt. Das Gebiet eines Kantons
bleibt wörtlicher Gesetzestext, mit seiner Rechtsgrundlage als ELI-Link. Fehlt eine Quelle, fehlt
das Feld: Nichts wird durch Raten ergänzt. Dasselbe gilt für das Parsen: Ein Öffnungszeitentext
mit einer Anmerkung darin, eine Telefonnummer ohne Vorwahl oder eine als Satz geschriebene Adresse
wird weggelassen, nicht erraten.

## 3. Eine Regel für Identifikatoren {#_3-one-identifier-rule}

**Entscheidung.** Ein amtlicher Code, wenn einer jeden Eintrag abdeckt, sonst Kebab-Case in
Kleinbuchstaben aus dem Namen in der Landessprache; Gerichte sind `type` + Ort. Amtliche Codes,
die nur einige Einträge abdecken (ECLI, OVO), sind Felder. Siehe [Identifikatoren](./identifiers).

## 4. Verweise sind Felder {#_4-links-are-fields}

**Entscheidung.** Einträge verweisen nur über Felder aufeinander, die die ID des anderen Eintrags
enthalten und nach dem Datensatz benannt sind, auf den sie zeigen (`arrondissement`, `canton`,
`municipality`). Keine ID wird aus einer anderen gebildet.

**Warum.** Eine in einem Stringformat versteckte Beziehung bricht still, wenn sich eine der beiden
Seiten ändert. Ein Feld wird vom Schema (das die gültigen IDs aufzählt) und von den Tests
validiert.

**Daher.** Die Adresse eines Gerichts, Gefängnisses oder Justizhauses verweist auf dieselbe Weise
auf ihre Gemeinde (`address.municipality`), über die Postleitzahl in der Umrechnungstabelle von
Statbel, nie über den Ortsnamen ([#28](https://github.com/pieterjanscheir/belgica/issues/28));
ein Postleitzahleintrag verweist auf seine Gemeinde, statt ihren Namen zu kopieren.

## 5. Kanonische Werte, Darstellung im Code {#_5-canonical-values-presentation-in-code}

**Entscheidung.** Jeder Wert wird in einer kanonischen Standardform gespeichert, und die
Formatierung für Menschen ist eine Funktion:

| Wert           | Gespeichert als                 | Standard                         |
| -------------- | ------------------------------- | -------------------------------- |
| Tag            | `2024-06-15`                    | ISO 8601                         |
| Telefon        | `+3253820701`                   | E.164                            |
| IBAN           | `BE73679200844560`              | ISO 13616, elektronisches Format |
| Öffnungszeiten | `Mo-Fr 08:30-12:30,13:30-16:00` | OpenStreetMap `opening_hours`    |
| Sprache        | Schlüssel `nl`, `fr`, `de`      | ISO 639-1                        |

**Warum.** Eine Form pro Wert macht Werte vergleichbar, validierbar (die IBAN-Prüfsumme wird
getestet) und für andere Software nutzbar (`tel:`-Links, Zahlungssysteme, Parser für
Öffnungszeiten). Darstellungskonventionen unterscheiden sich je nach Kontext; die Daten sollten es
nicht.

## 6. Herkunft bei jedem Eintrag {#_6-provenance-on-every-record}

**Entscheidung.** Jeder Datensatz nennt seine Quellen, Lizenz und sein Prüfdatum in
`datapackage.json`; jeder gescrapte Eintrag nennt die Seiten, aus denen er gelesen wurde, und den
Tag, an dem ihr Inhalt zuerst gesehen wurde (`sources: [{ url, retrieved }]`).

**Warum.** „Woher kommt das, und wie alt ist es?“ ist die erste Frage bei juristischen Daten.

## 7. Die Daten werden von Maschinen gebaut, aus aufbewahrten Snapshots {#_7-the-data-is-built-by-machines-from-kept-snapshots}

**Entscheidung.** Jede Woche ruft ein Workflow die amtlichen Quellen ab, bewahrt die Seiten als
Snapshots auf dem Branch `sources` auf, baut die Daten daraus mit den Parsern in `scripts/parse`
neu, testet sie und öffnet einen Pull Request, wenn sie sich geändert haben. Nichts wird von Hand
eingetippt. Ein separater wöchentlicher Job prüft auf fehlende Zinssätze, überfällige Prüfungen
und tote Quellen.

**Warum.** Juristische Daten veralten still; Menschen vergessen, Zeitpläne nicht. Von Hand
eingegebene Daten lassen sich weder prüfen noch neu erzeugen; ein Parser lässt sich testen, und die
Snapshots zeigen genau, was die Quelle an dem Tag sagte. Der Pull Request hält einen Menschen in
der Schleife: Die Daten in `main` ändern sich nie ohne Review.

**Daher.** Snapshots liegen auf einem eigenen Branch, damit die Historie des Package nicht mit
Megabytes an HTML belastet wird. Die Parser werden an gekürzten Kopien echter Seiten getestet. Eine
Seite, die der Parser nicht zuordnen kann, stoppt den Build, statt einen halb richtigen Eintrag zu
erzeugen. Zwei Quellen verweigern sich den Servern von GitHub (ejustice, police.be); sie werden
von einem gewöhnlichen Rechner abgerufen
([#24](https://github.com/pieterjanscheir/belgica/issues/24)).

## 8. Verteilung: nur ESM, Node 22.12+, beim Release gebaut {#_8-distribution-esm-only-node-22-12-built-on-release}

**Entscheidung.** Das Package ist ausschließlich ESM, erfordert Node 22.12 oder neuer, und die
Build-Ausgabe wird nicht committet: Sie wird vom Release-Workflow gebaut und mit Provenance auf
npm veröffentlicht.

**Warum.** Node 18 und 20 sind End of Life. Ab Node 22.12 lädt `require()` ESM, ein separater
CommonJS-Build würde also nur eine zweite Kopie der Daten hinzufügen (das Dual-Package-Hazard) und
mehr Testaufwand bedeuten. Committete Build-Ausgabe veraltet und hat automatische
Dependency-Updates kaputt gemacht.

**Daher.** `import` und `require()` funktionieren beide, getestet auf Node 22.12, 22, 24 und 26.
Jeder Datensatz hat einen eigenen Entry Point, sodass eine App, die nur die Zinssätze braucht,
einige Kilobyte lädt, nicht die Gerichte und den Gesetzestext jedes Kantons (die
[Seite Erste Schritte](./getting-started#import-only-what-you-need) misst jeden Entry Point aus
dem Build).

## 9. Typen, die die Garantien der Daten tragen {#_9-types-that-carry-the-data-s-guarantees}

**Entscheidung.** IDs sind generierte Union-Typen; Datensätze sind `readonly`; Nachschlagen mit
einer bekannten ID gibt den Eintrag zurück, nicht `record | undefined`; geschlossene Vokabulare
(Gerichtstypen, Arten, Kontakttypen) sind Unions. Kontaktbezeichnungen sind Freitext, so wie das
Gericht sie veröffentlicht: Eine geschlossene Liste würde bedeuten, Hunderte Namen von
Kanzleien auf ein paar Wörter abzubilden, und das wäre Raten.

**Warum.** Fehler zeigen sich beim Tippen statt in der Produktion, und die Typen dokumentieren die
Daten.

## 10. Qualitätsschranken {#_10-quality-gates}

**Entscheidung.** Jede Änderung muss bestehen: striktes TypeScript (einschließlich
`noUncheckedIndexedAccess` und `exactOptionalPropertyTypes`), ESLint mit typbewussten strikten
Regeln, Prettier, 100 % Testabdeckung von `src/`, JSON-Schema-Validierung aller Daten,
Integritätstests (IDs, Verweise, Anzahlen, Zeiträume) sowie `publint` + `arethetypeswrong` auf dem
gepackten Package.

**Warum.** Ein Referenz-Package lohnt sich als Abhängigkeit nur, wenn es zuverlässiger ist, als
die Daten von Hand abzuschreiben.

## 11. Zeit ist Teil des Modells {#_11-time-is-part-of-the-model}

**Entscheidung.** Einträge tragen einen Gültigkeitszeitraum (`validFrom`, `validTo`, beide Tage
eingeschlossen), jeder Datensatz gibt an, ab welchem Tag er die Lage beschreibt
(`territoryCoverage`, und `temporalCoverage` in `datapackage.json`), und Nachschlagefunktionen
nehmen einen optionalen Tag: `getCanton(id, { on })`, `getCantonsForMunicipality(refnis, { on })`.
Ein Tag vor dem abgedeckten Zeitraum wirft einen `RangeError`.

**Warum.** Rechtsfragen betreffen einen Tag: welches Gericht zuständig war, als die Ladung
zugestellt wurde, welcher Zinssatz galt, als die Rechnung fällig wurde. Kantone, Gemeinden und
Gerichte ändern sich; ein Modell, das nur „jetzt“ kennt, beantwortet Fragen über die Vergangenheit
mit der Karte von heute und sieht dabei richtig aus. Zeit später hinzuzufügen, würde jede ID und
jede Nachschlagefunktion ändern; deshalb steckt sie im Modell, bevor die Historie in den Daten ist
([#27](https://github.com/pieterjanscheir/belgica/issues/27)).

**Daher.** Zinssätze haben bereits Zeiträume. Nachschlagen per ID ohne Tag liefert die heutige
Version, sodass bekannte IDs ihren Nicht-`undefined`-Typ behalten; mit einem Tag kann es nichts
finden. Jeder Datensatz trägt den Zeitraum, nicht nur das Gebiet: Ein gescrapter Eintrag, den die
Quelle nicht mehr aufführt, wird mit einem `validTo` beendet statt gelöscht
(`scripts/parse/retire.ts`), sodass eine einmal veröffentlichte ID bleibt und ein Gericht, das
schließt, immer noch das Gericht ist, das die Ladung vom letzten Jahr nannte.

## 12. Releases tragen die Daten, nicht nur das Package {#_12-releases-carry-the-data-not-only-the-package}

**Entscheidung.** Jedes GitHub-Release enthält die Daten als JSON und als CSV-Tabellen, mit den
Schemas und `datapackage.json`, in einem Zip. npm ist ein Weg zu den Daten, nicht der einzige.

**Warum.** Die Menschen, die belgische juristische Referenzdaten am meisten brauchen, arbeiten in
Tabellenkalkulationen und anderen Sprachen, nicht in JavaScript.

## 13. Geometrie ist eine zweite Quelle, und der Text gewinnt {#_13-geometry-is-a-second-source-and-the-text-wins}

**Entscheidung.** Die Kantonsgrenzen sind die Digitalisierung der Anlage zum Gerichtsgesetzbuch
durch das Nationale Geographische Institut, übernommen wie veröffentlicht (Punkt für Punkt, ohne
Vereinfachung, Koordinaten auf den Zentimeter) und den Kantonen über den Namen in beiden Sprachen
zugeordnet, mit einer expliziten Aliastabelle für den Rest. Der `territory`-Text des Kantons
bleibt das Gesetz: Wo Geometrie und Text voneinander abweichen, gewinnt der Text. Die Geometrie
hat einen eigenen Entry Point, und der Root des Package exportiert sie nicht erneut.

**Warum.** Die Polygone des NGI sind eine amtliche Lesart desselben Texts; sie lassen sich also
zitieren und nachbauen. Eine hier aus Straßendaten abgeleitete Grenze wäre eine dritte Lesart, die
niemand prüfen kann. Vereinfachung würde die Linie verschieben, und die Linien zählen am meisten
dort, wo Kantone aneinandergrenzen. Eine Million Positionen würden jeden anderen Datensatz in den
Schatten stellen, also soll niemand sie versehentlich laden.

**Daher.** `findCantonsAt(lon, lat)` antwortet aus der Geometrie, und die Dokumentation sagt das;
ein Punkt nahe an einer Linie ist ein Fall für den Text. Der wöchentliche Build schlägt fehl, wenn
ein Kanton keine Grenze hat oder ein Feature zu keinem Kanton passt
([#29](https://github.com/pieterjanscheir/belgica/issues/29)).

## Noch nicht entschieden {#not-decided-yet}

| Frage                                                              | Issue                                                                                         |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Historie vor dem 1. Januar 2025                                    | [#27](https://github.com/pieterjanscheir/belgica/issues/27)                                   |
| Zinsberechnung über einen Zeitraum (Tageszählung, Kapitalisierung) | Nicht geplant, bis sich die Methode auf Rechtsprechung oder amtliche Leitlinien stützen lässt |
