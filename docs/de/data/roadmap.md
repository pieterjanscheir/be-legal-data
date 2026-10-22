# Roadmap {#roadmap}

Geplante Datensätze, jeweils mit dem Issue, das sie beschreibt. Jedes Issue nennt die amtlichen
Quellen, die vorgeschlagenen Felder und was „fertig“ bedeutet. Hilfe ist willkommen: Wählen Sie
eines aus und folgen Sie den [Konventionen](/de/guide/contributing#adding-a-dataset).

## Geplant {#planned}

| Datensatz                                                                                       | Wozu er dient                                                                                                                   | Issue                                                       |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Die übrigen Gerichte**: Kassationshof, Verfassungsgerichtshof, Staatsrat, Disziplinargerichte | Die höchsten Gerichte stehen nicht auf dem Portal der Gerichte und brauchen daher eigene Quellen                                | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **Das Justizhaus in Eupen** (Deutschsprachige Gemeinschaft)                                     | Das einzige Justizhaus, das noch nicht in den Daten ist                                                                         | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Historie**: wann sich Kantone, Gemeinden und Gerichte geändert haben                          | Das Modell hat Gültigkeitszeiträume und Nachschlagen pro Tag; für die früheren Versionen fehlen noch die Daten                  | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Adresse → Koordinaten**                                                                       | Die [Kantonsgrenzen](./canton-boundaries) finden den Kanton eines Punktes; das Geocodieren der Adresse ist der fehlende Schritt | [#66](https://github.com/pieterjanscheir/belgica/issues/66) |
| **Gerichtsvollzieher-Kanzleien** (gerechtsdeurwaarders / huissiers de justice)                  | Einen Gerichtsvollzieher in einem Gerichtsbezirk für Zustellung oder Vollstreckung finden                                       | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Polizeizonen** (politiezones / zones de police)                                               | Welche Zone für eine Gemeinde zuständig ist: Anzeigen, Kopien von Protokollen                                                   | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Kataster- und Rechtssicherheitsämter** (kadaster, ehemalige hypotheekkantoren)                | Hypothekenbescheinigungen und Katasterauszüge beim zuständigen Amt anfordern                                                    | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## Erwägenswert {#worth-considering}

Jeweils mit eigenem Issue, ungefähr danach geordnet, wie oft sie gebraucht würden:

- **Teilgemeinden** (deelgemeenten / sections de commune) pro Postleitzahl. Die
  [Postleitzahlen](./postal-codes) enden bei der Gemeinde; die Liste von bpost nennt die
  Ortschaften, hat aber keinen REFNIS-Code und keine offene Lizenz
  ([#54](https://github.com/pieterjanscheir/belgica/issues/54)).
- **Gerichtsgebühren** (rolrechten / griffierechten) und die Stufen der
  **Verfahrensentschädigung** (rechtsplegingsvergoeding), mit ihren Gültigkeitszeiträumen und ihrer
  Indexierung, wie die Zinssätze
  ([#59](https://github.com/pieterjanscheir/belgica/issues/59),
  [#60](https://github.com/pieterjanscheir/belgica/issues/60)).
- **Gerichtsferien und gesetzliche Feiertage** pro Jahr, zur Berechnung von Verfahrensfristen
  ([#61](https://github.com/pieterjanscheir/belgica/issues/61)).
- **Staatsanwaltschaften** (parketten / arbeidsauditoraten) pro Gerichtsbezirk
  ([#55](https://github.com/pieterjanscheir/belgica/issues/55)).
- **Notare und Notarkammern**, **Rechtsanwaltskammern** (balies / barreaux)
  ([#56](https://github.com/pieterjanscheir/belgica/issues/56),
  [#57](https://github.com/pieterjanscheir/belgica/issues/57)).
- **Gemeindefusionen**: alte → neue REFNIS-Codes für 2019 und 2025, damit ältere Daten zugeordnet
  werden können ([#53](https://github.com/pieterjanscheir/belgica/issues/53)).
- **Der Gesundheitsindex** (gezondheidsindex) für die Indexierung von Mieten
  ([#62](https://github.com/pieterjanscheir/belgica/issues/62)).

## Warum manche Datensätze noch fehlen {#why-some-datasets-aren-t-here-yet}

Ein juristischer Datensatz ist nur nützlich, wenn jeder Wert aus einer amtlichen Quelle stammt;
deshalb wird nichts aus dem Gedächtnis von Hand hinzugefügt. Jeder Datensatz wird von einem Skript
aus Snapshots seiner Quelle gebaut, und die meisten Quellen werden jede Woche von GitHub Actions
abgerufen. Zwei können das vorerst nicht: Die Website des Belgischen Staatsblatts (ejustice), aus
der die Kantone stammen, und police.be verweigern beide Verbindungen von den Servern von GitHub;
sie werden stattdessen von einem gewöhnlichen Rechner abgerufen
([#52](https://github.com/pieterjanscheir/belgica/issues/52)). Das Verzeichnis der
Gerichtsvollzieher wird im Browser aufgebaut; zum Lesen braucht es also einen Browser oder die
Daten der Nationalen Kammer der Gerichtsvollzieher
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
