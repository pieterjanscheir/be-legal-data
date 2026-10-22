# Identifikatoren {#identifiers}

Jeder Eintrag hat eine `id`. Andere Einträge, Ihre Datenbank und Ihre URLs verweisen darauf; eine
ID muss also einmal richtig sein und sich danach nie mehr ändern. Diese Seite legt die Regeln dar,
warum jede einzelne existiert und was passiert, wenn das Gesetz ändert, was eine ID benennt.

## Die Regeln {#the-rules}

1. **Jeder Eintrag hat ein Feld `id`**, und es ist innerhalb seines Datensatzes eindeutig.
   Generischer Code (ein Index, ein Cache, ein Formular) behandelt jeden Datensatz gleich.
2. **Ein amtlicher Code gewinnt, wenn er jeden Eintrag abdeckt.** Wo die Behörden jedem Eintrag
   eines Datensatzes einen Code zuweisen, _ist_ die ID dieser Code: Gemeinden verwenden ihren
   REFNIS-Code von Statbel (`44021` für Gent). Ein Code, der nur einige Einträge abdeckt, wird
   stattdessen als Feld geführt: Gerichte haben ihre ECLI-Codes in `ecli`, flämische Justizhäuser
   ihre OVO-Nummer in `ovo` (siehe [warum](#why-not-the-official-court-codes)).
3. **Sonst Kebab-Case in Kleinbuchstaben, ASCII**: `^[a-z0-9]+(-[a-z0-9]+)*$`, gebildet von
   [`scripts/id.ts`](https://github.com/pieterjanscheir/belgica/blob/main/scripts/id.ts):
   Akzente entfernt, alles andere, was kein Buchstabe und keine Ziffer ist, wird zu einem
   Bindestrich. `Merelbeke-Melle` → `merelbeke-melle`, `Braine-l'Alleud` → `braine-l-alleud`,
   `Liège` → `liege`.
4. **Aus dem amtlichen Namen in der Landessprache**: Niederländisch in Flandern, Französisch in
   der Wallonie, Deutsch um Eupen. Brüssel ist amtlich zweisprachig und braucht eine feste Wahl:
   Niederländisch.
5. **Eine Nummer ist ein Suffix**: Orte mit mehreren Kantonen erhalten `gent-1` … `gent-5`.
6. **Gerichte sind `type` + Ort**: `justice-of-the-peace-gent-1`, `court-of-appeal-liege`. Ein
   Friedensgericht übernimmt die ID seines Kantons. Die zwei Gerichte eines Typs in Brüssel, eines
   pro Sprache, hängen `-nl` oder `-fr` an (`police-court-brussel-fr`). Eine Abteilung oder ein
   Sitz hängt seinen eigenen Ort an die ID seines Gerichts an (`enterprise-court-gent-brugge`). Das
   Präfix hält IDs eindeutig, wenn Gent ein Friedensgericht, ein Unternehmensgericht und ein
   Arbeitsgericht hat, und es ist genau der `type` des Eintrags, sodass nie ein zweites Vokabular
   nötig ist.
7. **Gefängnisse und Justizhäuser sind ihr Name** in der Landessprache, ohne Artikel:
   `gevangenis-gent`, `prison-lantin`, `justitiehuis-gent`, `maison-justice-arlon`. Ihre Namen
   sagen bereits, was sie sind, und zwei Einrichtungen in einer Stadt (das Zentral- und das
   Hilfsgefängnis von Leuven) unterscheiden sich durch ihren Namen.
8. **Verweise sind Felder, nie abgeleitete Strings.** Ein Friedensgericht hat ein Feld `canton`;
   ein Kanton listet `{ municipality }` auf; ein Gerichtsbezirk hat eine `judicialArea`. Jedes
   enthält die ID des Eintrags, auf den es zeigt, und das Feld ist nach dem Datensatz benannt, in
   den es zeigt.

All das wird durch Tests (`test/ids.test.ts`) und durch die [JSON Schemas](./schema) erzwungen,
die die gültigen IDs aufzählen, sodass ein ins Leere zeigender Verweis die Validierung scheitern
lässt.

## Die IDs {#the-ids}

| Datensatz        | Beispiele                                                                                                                 | Regel                      |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------- | -------------------------- |
| Gerichtsbereiche | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                                                                           | Lokaler Name               |
| Gerichtsbezirke  | `oost-vlaanderen`, `brabant-wallon`, `eupen`                                                                              | Lokaler Name               |
| Kantone          | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1`                                                  | Lokaler Name + Nummer      |
| Kantonsgrenzen   | `gent-1`: eine Grenze pro Kanton, mit der ID des Kantons, und `canton` als Verweis                                        | Die ID des Kantons         |
| Gemeinden        | `44021`, `21004`                                                                                                          | REFNIS-Code                |
| Provinzen        | `10000`, `40000`                                                                                                          | REFNIS-Code                |
| Regionen         | `02000`, `03000`, `04000`                                                                                                 | REFNIS-Code                |
| Postleitzahlen   | `9000-44021`, `1040-21005`                                                                                                | Postleitzahl + REFNIS-Code |
| Gerichte         | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`, `police-court-brussel-fr`, `police-court-eupen-sankt-vith` | Typ + Ort                  |
| Gefängnisse      | `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                               | Lokaler Name               |
| Justizhäuser     | `justitiehuis-gent`, `maison-justice-arlon`                                                                               | Lokaler Name               |
| Zinssätze        | `legal`, `commercial`                                                                                                     | Feste Schlüssel            |

## Warum diese Entscheidungen {#why-these-choices}

**Warum Kebab-Case?** IDs landen in URLs (`/cantons/gent-1`), Dateinamen, CSS-Klassen,
Datenbankschlüsseln und Logzeilen. Kleinbuchstaben vermeiden Kollisionen auf Systemen, die Groß-
und Kleinschreibung nicht unterscheiden (die Dateisysteme von macOS und Windows, viele
Datenbank-Collations): `Gent1` und `gent1` wären zwei IDs in den Daten und eine Datei auf der
Festplatte. Bindestriche halten Wortgrenzen ohne Großbuchstaben lesbar, und der Zeichensatz muss
nirgends escapet werden.

**Warum lesbare IDs statt Nummern oder UUIDs?** Ein Referenzdatensatz wird von Menschen gelesen:
`justice-of-the-peace-gent-1` in einer Datenbankzeile oder einer Fehlermeldung sagt Ihnen, worum
es geht. Die IDs sind so stabil, wie Nummern es wären, denn sie ändern sich nur, wenn das Gesetz
ändert, was sie benennen (siehe unten), und dann ist eine neue ID das richtige Ergebnis.

**Warum die Landessprache, nicht Englisch?** Englische Namen gibt es für eine Handvoll Orte
(Ghent, Antwerp, Liege), nicht aber für die 162 Kantone; englische IDs würden also zwei Regeln
bedeuten. Der lokale Name ist auch der, den die Einrichtung selbst verwendet, und er steht in den
amtlichen Texten.

**Warum amtliche Codes?** REFNIS verwenden Statbel, die Regionen und fast jeder belgische
Datensatz. Mit dem Code als ID braucht es für die Verknüpfung irgendeines davon mit Kantonen und
Gerichten keine Zuordnungstabelle.

**Warum zwei Codes für eine Postleitzahl?** Eine Postleitzahl allein benennt keinen Eintrag:
`1040` gehört zu Brüssel und zu Etterbeek, und jedes Paar ist ein eigener Eintrag mit eigener
Gültigkeit. Das Paar amtlicher Codes, `1040-21005`, ist eindeutig und bleibt, was es ist, bis die
Tabelle von Statbel das Paar ändert, und genau dann ist ein neuer Eintrag richtig. Die Gemeinde
ist zusätzlich ein Feld (`municipality`), wie Regel 8 es verlangt: Die ID ist ein Schlüssel,
nichts zum Zerlegen.

**Warum `type` in den IDs der Gerichte?** An einem Ort gibt es mehrere Gerichte, und die Zahl der
Gerichtstypen wird wachsen (Polizeigerichte, Arbeitsgerichte, Gerichte erster Instanz …). Die
eigenen Felder eines Gerichts sagen, was es ist; die ID muss nur eindeutig und erkennbar sein, und
der Typ leistet beides.

**Warum nicht die amtlichen Codes der Gerichte?** Gerichte haben zwei amtliche Codes, und keiner
deckt jedes Gericht ab. ECLI-Codes (`HBGNT` für den Appellationshof Gent) gibt es pro Gericht und
pro Sprache, nicht pro Abteilung, und keiner erscheint in veröffentlichten Entscheidungen der
Friedensrichter. Unternehmensnummern (KBO/ZDU) gehören dem FÖD Justiz; seine
Niederlassungseinheiten folgen Gebäuden, nicht Gerichten, und ändern sich, wenn ein Gericht
umzieht. Eine Regel, die für jeden Eintrag gilt, schlägt zwei Regeln; deshalb sind die ECLI-Codes
ein Feld (`ecli`), und die ID folgt Regel 6.

**Warum explizite Verweise?** Das alte Schema bildete eine Gerichts-ID, indem es `Vredegerecht`
und die Kanton-ID aneinanderhängte. Das versteckt eine Beziehung in einem Stringformat, das bricht,
sobald ein Gericht zwei Kantone bedient oder sich ein Name ändert. Ein Feld `canton` wird vom
Schema und von den Tests geprüft und kann in beide Richtungen verfolgt werden.

## In TypeScript {#in-typescript}

Jeder Datensatz hat einen generierten ID-Typ (`CantonId`, `CourtId`, `MunicipalityId`,
`ProvinceId`, `RegionId`, `ArrondissementId`, `JudicialAreaId`, `PrisonId`, `HouseOfJusticeId`, `PostalCodeId`),
der von `pnpm build:ids` aus den Daten neu generiert wird:

```ts
import { getCanton, type CantonId } from 'belgica'

getCanton('gent-1') // Canton: eine bekannte ID findet immer ihren Eintrag
getCanton(userInput) // Canton | undefined: ein beliebiger anderer String vielleicht nicht

const id: CantonId = 'gent1' // Compilerfehler: keine Kanton-ID
```

Verwenden Sie die ID-Typen für Werte, die Sie speichern, damit ein Tippfehler oder eine entfernte
ID beim Upgrade auffällt.

## Wenn das Gesetz eine ID ändert {#when-the-law-changes-an-id}

Kantone und Gemeinden ändern sich durchaus: Gemeinden fusionierten 2019 und 2025, und Gesetze
zeichnen Kantone neu. Einträge tragen einen Gültigkeitszeitraum (`validFrom`, `validTo`); eine
Änderung fügt also Historie hinzu, statt sie zu löschen:

1. Der alte Eintrag bleibt, mit einem `validTo`; der neue erhält eine neue ID und ein
   `validFrom`. Eine ID wird nie für etwas anderes wiederverwendet; eine vor Jahren gespeicherte
   ID findet also immer noch, was sie meinte.
2. Ohne Tag antworten Nachschlagefunktionen für heute: Nachschlagen per ID liefert die heute
   geltende Version (die letzte, bei einem beendeten Eintrag), und Listen wie
   `getCantonsForMunicipality` nur das, was heute gilt. Mit `{ on }` antworten beide für diesen
   Tag.
3. Das Changelog nennt jede neue ID und die IDs, die sie ersetzt.

Eine bloße Namensänderung, etwa eine Rechtschreibkorrektur, ändert die ID nicht. Die Historie vor
dem 1. Januar 2025 ist noch nicht in den Daten
([#27](https://github.com/pieterjanscheir/belgica/issues/27)): Nachschlagen für einen früheren
Tag wirft einen `RangeError`, statt mit der Karte von heute zu antworten.

## IDs sind opak {#ids-are-opaque}

Eine ID ist ein Schlüssel, kein Format. `court-of-first-instance-luxembourg-marche-en-famenne`
lässt sich nicht zurück in Typ, Ort und Abteilung zerlegen, weil Typ, Ort und Sprachsuffix alle
denselben Bindestrich verwenden. Parsen Sie IDs nicht: Jeder Teil davon ist auch ein Feld
(`type`, `court`, `canton`, `arrondissement`), und die Felder sind das, was Schemas und Tests
prüfen.

## Stabilität {#stability}

IDs sind öffentliche API. Einträge hinzuzufügen ist eine Minor-Version, einen Wert zu korrigieren
ein Patch, und eine ID zu entfernen oder umzubenennen eine Major-Version. Version 0.3.0 ersetzt
die früheren PascalCase-IDs (`VredegerechtGent1`, `EastFlanders`) durch dieses Schema, bevor das
Package Nutzer hatte; das [Changelog](./changelog) enthält die Zuordnung.

Das Versprechen wird geprüft, nicht nur gegeben. `ids.lock.json` listet jede ID auf, die das
Package veröffentlicht hat, pro Datensatz; `pnpm generate` fügt neue IDs hinzu und entfernt nie
eine, und `test/ids.test.ts` schlägt fehl, wenn eine gesperrte ID in den Daten fehlt. So können ein
Scraper, der eine umbenannte Seite liest, eine neu generierte Kantonsliste oder eine Bearbeitung
von Hand keine ID unbemerkt verlieren oder umbenennen: Der wöchentliche Daten-Pull-Request
schlägt fehl, und ein Mensch ordnet den neuen Namen im Parser der bestehenden ID zu oder beendet
den Eintrag mit einem `validTo`. Eine ID aus dem Lock zu nehmen ist ein bewusster Schritt, für eine
Major-Version, mit der ID und ihrem Ersatz im Changelog.
