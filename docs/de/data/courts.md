<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const labels = {
    'justice-of-the-peace': 'Friedensgericht',
    'police-court': 'Polizeigericht',
    'court-of-first-instance': 'Gericht erster Instanz',
    'enterprise-court': 'Unternehmensgericht',
    'labour-court': 'Arbeitsgericht',
    'court-of-appeal': 'Appellationshof',
    'labour-court-of-appeal': 'Arbeitsgerichtshof',
    'court-of-assize': 'Assisenhof',
}

const areas = {
    'justice-of-the-peace': 'Ein Kanton; Philippeville hat zwei Sitze',
    'police-court': 'Ein Gerichtsbezirk (Brüssel nach Sprache geteilt, Halle, Vilvoorde)',
    'court-of-first-instance': 'Ein Gerichtsbezirk (Brüssel nach Sprache geteilt)',
    'enterprise-court': 'Ein Gerichtsbezirk oder der Bereich eines Appellationshofs',
    'labour-court': 'Ein Gerichtsbezirk oder der Bereich eines Appellationshofs',
    'court-of-appeal': 'Ein Gerichtsbereich',
    'labour-court-of-appeal': 'Ein Gerichtsbereich',
    'court-of-assize': 'Eine Provinz oder Brüssel-Hauptstadt',
}
</script>

# Gerichte {#courts}

Datei: `data/courts.json`. Jedes Gericht der rechtsprechenden Gewalt, das das eigene Portal der
Gerichtshöfe und Gerichte, [tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be),
aufführt: {{ stats.courts.total }} heute geltende Einträge<span v-if="stats.courts.retired"> und
{{ stats.courts.retired }} beendete Versionen, die das Portal nicht mehr aufführt</span>. Die Zahlen
auf dieser Seite werden beim Bauen der Website aus den Daten berechnet.

<table>
<thead><tr><th>Art</th><th style="text-align:right">Gerichte</th><th style="text-align:right">Abteilungen oder Sitze</th><th>Gebiet</th></tr></thead>
<tbody>
<tr v-for="t in stats.courts.byType" :key="t.type">
<td>{{ labels[t.type] }}</td><td style="text-align:right">{{ t.courts }}</td><td style="text-align:right">{{ t.divisions }}</td><td>{{ areas[t.type] }}</td>
</tr>
</tbody>
</table>

Nicht auf dem Portal und daher noch nicht hier: der Kassationshof, der Verfassungsgerichtshof und
der Staatsrat sowie die Disziplinargerichte.

## Wozu es dient {#why-it-s-useful}

- **Schriftstücke adressieren.** Ladungen, Antragschriften und Schriftsätze nennen das Gericht so,
  wie es sich selbst nennt; Briefe und Einreichungen gehen an die Kanzlei (griffie / greffe) unter
  ihrer Adresse.
- **Die richtige Kanzlei erreichen.** Größere Gerichte haben eine Kanzlei pro Sachgebiet
  (Zivilsachen, Strafsachen, Familie, das Register der juristischen Personen …), jede mit eigener
  Telefonnummer, E-Mail-Adresse und manchmal Bankverbindung. Die Daten halten sie auseinander, mit
  der Bezeichnung, die das Gericht selbst verwendet.
- **Gebühren bezahlen.** Kanzleien, die eine Bankverbindung für Gerichtsgebühren und Hinterlegungen
  veröffentlichen, haben sie in den Daten, mit geprüfter Prüfsumme.
- **Formulare bauen.** Eine Gerichtsauswahl braucht eine vollständige Liste mit stabilen IDs,
  verknüpft mit Kantonen, Gerichtsbezirken und Gerichtsbereichen und mit dem Gericht, zu dem eine
  Abteilung gehört.
- **Auf Rechtsprechung verweisen.** `ecli` gibt den Code an, den die Entscheidungen des Gerichts in
  ihrem European Case Law Identifier tragen (`ECLI:BE:HBGNT:…`).

## Quelle und Aktualisierungen {#source-and-updates}

|                   |                                                                                                                            |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Quelle            | [tribunaux-rechtbanken.be](https://www.tribunaux-rechtbanken.be), das Portal des Kollegiums der Gerichtshöfe und Gerichte  |
| Gebaut durch      | `scripts/parse` aus wöchentlichen Snapshots der Seite und der Kontaktseite jedes Gerichts                                  |
| Ändert sich, wenn | Ein Gericht umzieht, seine Kontaktdaten oder Zeiten ändert oder das Portal ein Gericht hinzufügt oder umbenennt            |
| Geprüft           | Jede Woche, durch den [sources-Workflow](/de/guide/data-quality#how-the-data-is-built); Änderungen kommen als Pull Request |

Jeder Eintrag nennt die Seiten, aus denen er gelesen wurde, und den Tag, an dem der Inhalt jeder
Seite zuerst gesehen wurde (`sources`). Kontaktdaten ändern sich häufiger als alles andere in
diesem Package: Wenn es darauf ankommt, prüfen Sie die Seite des Gerichts (`website`).

<CourtList />

## Felder {#fields}

| Feld               | Typ                                   | Beschreibung                                                                                                                                                                                                                                |
| ------------------ | ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | `CourtId`                             | Stabile ID: der `type`, dann der Ort in der eigenen Sprache des Gerichts: `justice-of-the-peace-gent-1`, `police-court-brussel-fr`, `enterprise-court-gent-brugge`. Siehe [Identifikatoren](/de/guide/identifiers)                          |
| `validFrom`        | string?                               | Erster Tag, an dem der Eintrag gilt, `YYYY-MM-DD`: der Tag, an dem das Portal ihn zuerst aufführte. Fehlend: seit Beginn des abgedeckten Zeitraums                                                                                          |
| `validTo`          | string?                               | Letzter Tag, an dem der Eintrag gilt: der Tag vor der wöchentlichen Prüfung, die ihn nicht mehr auf dem Portal fand. Fehlend: gilt weiterhin                                                                                                |
| `type`             | `CourtType`                           | `justice-of-the-peace`, `police-court`, `court-of-first-instance`, `enterprise-court`, `labour-court`, `court-of-appeal`, `labour-court-of-appeal`, `court-of-assize`                                                                       |
| `kind`             | `'court'` \| `'division'` \| `'seat'` | Das Gericht selbst, eine seiner Abteilungen (afdeling, division, Abteilung) oder einer der Orte, an denen ein Friedensgericht seinen Sitz hat                                                                                               |
| `court`            | `CourtId`?                            | Bei einer Abteilung oder einem Sitz: das Gericht, zu dem sie gehört                                                                                                                                                                         |
| `name`             | `{ nl?, fr?, de? }`                   | Der Name, wie das Gericht ihn veröffentlicht, in jeder Sprache, in der es eine Seite hat: `Vredegerecht Gent 1`, `Tribunal de l'entreprise du Hainaut - division Mons`                                                                      |
| `judicialArea`     | `JudicialAreaId`                      | Der Gerichtsbereich                                                                                                                                                                                                                         |
| `arrondissement`   | `ArrondissementId`?                   | Der Gerichtsbezirk, für ein Gericht oder eine Abteilung, dessen Gebiet ein Gerichtsbezirk ist oder in einem liegt                                                                                                                           |
| `canton`           | `CantonId`?                           | Bei einem Friedensgericht: der Kanton, für den es zuständig ist                                                                                                                                                                             |
| `cantons`          | `CantonId[]`?                         | Bei jedem anderen Gericht (nicht seinen Abteilungen): die Kantone, die es abdeckt, wie die Anlage zum Gerichtsgesetzbuch (Art. 3–5) und Art. 114 des Gesetzbuchs sie festlegen                                                              |
| `ecli`             | `string[]`?                           | Die ECLI-Codes des Gerichts, einer pro Sprache, in der es urteilt; nur Codes, die in veröffentlichten Entscheidungen vorkommen                                                                                                              |
| `address`          | `Address`?                            | Wo sich die Kanzlei befindet, mit der Gemeinde, zu der ihre Postleitzahl gehört (`municipality`, per REFNIS-Code). Fehlt, wenn das Gericht keine einheitliche Adresse veröffentlicht (ein Gericht, dessen Abteilungen je eine eigene haben) |
| `contacts`         | `Contact[]`                           | Telefon, Fax, E-Mail und Bankverbindung, jeweils mit der Kanzlei, zu der sie gehören (`label`), und dem damit veröffentlichten Text (`note`)                                                                                                |
| `openingHours`     | string?                               | Öffnungszeiten der Kanzlei in der OpenStreetMap-Syntax [`opening_hours`](https://wiki.openstreetmap.org/wiki/Key:opening_hours): `Mo-Fr 08:30-12:30,13:30-16:00`, nur wenn der veröffentlichte Text genau das sagt                          |
| `openingHoursText` | `{ nl?, fr?, de? }`?                  | Die Öffnungszeiten wie veröffentlicht, pro Sprache                                                                                                                                                                                          |
| `website`          | `{ nl?, fr?, de? }`                   | Die Seite des Gerichts auf dem Portal, pro Sprache                                                                                                                                                                                          |
| `sources`          | `{ url, retrieved }[]`                | Die Seiten, aus denen der Eintrag gelesen wurde, und wann ihr Inhalt zuerst gesehen wurde                                                                                                                                                   |

::: tip Neue Gerichtstypen
`type` kann neue Werte erhalten (etwa den Kassationshof). Wenn Sie mit `switch` darauf verzweigen,
behalten Sie einen `default`-Zweig, damit ein neuer Typ Ihren Code nicht bricht.
:::

## Struktur {#shape}

```ts
interface Court {
    id: CourtId
    validFrom?: string
    validTo?: string
    type: CourtType
    kind: 'court' | 'division' | 'seat'
    court?: CourtId
    name: Partial<Translated>
    judicialArea: JudicialAreaId
    arrondissement?: ArrondissementId
    canton?: CantonId
    cantons?: CantonId[]
    ecli?: string[]
    address?: Address
    contacts: Contact[]
    openingHours?: string
    openingHoursText?: Partial<Translated>
    website: Partial<Record<Locale, string>>
    sources: SourceRef[]
}

interface Address {
    building?: string
    street: string // wie veröffentlicht, mit Nummer, Briefkasten oder Etage: 'Beverstraat 7B (eerste verdieping)'
    postalCode: string
    city: string
    municipality?: MunicipalityId // über die Postleitzahl; siehe die Seite Postleitzahlen
}

interface Contact {
    type: 'phone' | 'fax' | 'email' | 'bank-account'
    value: string // kanonisch: E.164, E-Mail kleingeschrieben, elektronische IBAN
    label?: string // die Kanzlei oder der Dienst: 'Burgerlijke griffie', 'Greffe pénal'
    note?: string // mit dem Wert veröffentlichter Text: 'druk 1', 'tapez 2'
}
```

## Hilfsfunktionen {#helpers}

```ts
getCourt('justice-of-the-peace-gent-1')
getJusticeOfThePeace('gent-1') // dasselbe Gericht, über die Kanton-ID
getDivisions('enterprise-court-gent') // seine acht Abteilungen
getCourtsForCanton('gent-1') // sein Friedensgericht und je ein Gericht jedes anderen Typs
findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], per REFNIS-Code
findCourts({ type: 'police-court', kind: 'court', judicialArea: 'gent' })
getContact(court, 'email', 'Greffe pénal') // der Wert des ersten passenden Kontakts
formatPhoneNumber('+3253820701') // '053 82 07 01'
formatIban('BE73679200844560') // 'BE73 6792 0084 4560'
```

## Wie die Daten gelesen werden {#how-the-data-is-read}

Das Portal hat eine Seite pro Gericht und pro Abteilung, in der Sprache des Gerichts; zweisprachige
Gerichte in Brüssel haben eine Seite auf Niederländisch und eine auf Französisch, die Gerichte in
Eupen eine auf Französisch und eine auf Deutsch. Der Parser:

1. liest Typ und Ort des Gerichts aus seinem Namen (`Politierechtbank Limburg - afdeling Genk`),
   und den Kanton eines Friedensgerichts aus seinem Namen und seiner Nummer;
2. führt die Sprachfassungen eines Gerichts zu einem Eintrag zusammen: Namen, Seiten und
   Öffnungszeiten pro Sprache; Adresse und Kontakte aus der ersten Sprache (Niederländisch in
   Brüssel, Deutsch in Eupen), ergänzt um jeden Wert, den nur die andere Seite hat;
3. liest die Kontaktblöcke der Kanzleien und hält jeden Wert bei seiner Kanzlei;
4. wandelt die veröffentlichten Öffnungszeiten nur dann in `opening_hours`-Syntax um, wenn jedes
   Wort verstanden wird und jede Sprache dasselbe sagt. Text mit einer Anmerkung oder einer
   vorübergehenden Regelung („OPGELET: tot 31 december…“) behält nur den veröffentlichten Text;
5. gibt jedem Gericht die Kantone, die das Gesetz ihm zuweist (`cantons`), aus einer Tabelle der
   Anlage zum Gerichtsgesetzbuch in `scripts/parse/jurisdictions.ts`, und leitet daraus seinen
   `arrondissement` ab. Tabelle und Portal prüfen sich gegenseitig: Ein Gericht auf dem Portal,
   das in der Gesetzestabelle fehlt, oder umgekehrt, stoppt den Build.

Er schreibt nichts, wenn eine Seite nicht zugeordnet werden kann (eine unbekannte Gerichtsart, ein
Friedensgericht ohne Kanton), ein Kanton kein Gericht hat oder Gesetzestabelle und Portal sich
uneins sind, welche Gerichte existieren. Was er nicht lesen kann (eine Telefonnummer ohne Vorwahl,
eine als Satz geschriebene Adresse), wird mit dem wöchentlichen Pull Request gemeldet und aus den
Daten weggelassen, statt geraten zu werden.

## Kanonische Werte {#canonical-values}

| Wert           | Gespeichert als                                  | Warum                                                                                                                                                            |
| -------------- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Telefonnummer  | E.164: `+3253820701`                             | Eine Form pro Nummer, von überall wählbar, `tel:`-Links funktionieren unverändert                                                                                |
| IBAN           | Elektronisches Format: `BE73679200844560`        | Die Form, die Zahlungssysteme annehmen; die Prüfsumme wird beim Lesen und in den Tests geprüft                                                                   |
| E-Mail         | Kleingeschrieben                                 | Vergleiche und Deduplizierung funktionieren                                                                                                                      |
| Öffnungszeiten | `opening_hours`: `Mo-Fr 08:30-12:30,13:30-16:00` | Der OpenStreetMap-Standard, mit Parsern in vielen Sprachen (z. B. [opening_hours.js](https://github.com/opening-hours/opening_hours.js)) und ohne eigene Sprache |
| Straße         | Wie veröffentlicht                               | Nummern, Briefkästen und Etagen werden auf zu viele Arten geschrieben (`Canadaplein ZN`, `Rue de Bruxelles 2 - 3`), um sie ohne Raten aufzuteilen                |
