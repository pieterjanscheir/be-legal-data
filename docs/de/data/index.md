# Datensätze {#datasets}

Jeder Datensatz ist eine JSON-Datei in `data/`, beschrieben durch ein [JSON Schema](/de/guide/schema)
und in [`datapackage.json`](/de/guide/schema#datapackage-json) aufgeführt, mit seinen amtlichen
Quellen, seiner Lizenz und dem Datum, an dem er zuletzt mit ihnen abgeglichen wurde.

| Datensatz                                      | Einträge | Wofür Sie ihn verwenden                                                                                            |
| ---------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------ |
| [Gerichtsbereiche](./territory#judicial-areas) | 5        | Welcher Appellationshof (und Arbeitsgerichtshof) über eine Berufung entscheidet                                    |
| [Gerichtsbezirke](./territory#arrondissements) | 12       | Gerichte, Staatsanwaltschaften und Gerichtsvollzieher gruppieren; die Einheit der meisten Zuständigkeitsregeln     |
| [Kantone](./territory#cantons)                 | 162      | Welches Friedensgericht für eine Adresse zuständig ist                                                             |
| [Kantonsgrenzen](./canton-boundaries)          | 162      | Der Kanton eines Punktes in einer geteilten Stadt; die Kantone auf einer Karte (GeoJSON)                           |
| [Gemeinden](./territory#municipalities)        | 565      | Jede belgische Adresse oder Statistik über den REFNIS-Code mit der Gerichtslandkarte verknüpfen                    |
| [Regionen](./territory#regions)                | 3        | Die Region einer Gemeinde, per REFNIS-Code, in drei Sprachen benannt                                               |
| [Provinzen](./territory#provinces)             | 10       | Die Provinz einer Gemeinde (keine in Brüssel), mit ihrer Region                                                    |
| [Postleitzahlen](./postal-codes)               | 1 152    | Von der Postleitzahl einer Adresse zu ihrer Gemeinde und weiter zu deren Kantonen und Gerichten                    |
| [Gerichte](./courts)                           | 347      | Namen, Adressen und Kontaktdaten der Kanzleien, um jedes Gericht anzuschreiben, dort einzureichen oder zu bezahlen |
| [Gefängnisse](./prisons)                       | 39       | Adressen und Kontaktdaten jedes Gefängnisses und jedes Detentionshauses                                            |
| [Justizhäuser](./houses-of-justice)            | 27       | Bewährungshilfe, Opferaufnahme und Sozialuntersuchungen für die Familiengerichte                                   |
| [Zinssätze](./interest-rates)                  | 2 Reihen | Verzugszinsen auf eine Forderung berechnen                                                                         |

## Wie die Datensätze zusammenhängen {#how-the-datasets-fit-together}

```
Gerichtsbereich ──< Gerichtsbezirk ──< Kanton >──< Gemeinde (REFNIS) ──< Postleitzahl
      │                   │              │  │
      │                   │              │  └── Kantonsgrenze  die Geometrie des Kantons (NGI)
      └────────────── Gericht ───────────┘  ein Friedensgericht verweist auf seinen Kanton,
                          │                 und die Adresse jedes Gerichts auf seine Gemeinde
                          └──< Abteilung    eine Abteilung verweist auf ihr Gericht
```

`──<` liest sich als „hat mehrere“. Eine Gemeinde liegt meist in einem Kanton; geteilte Städte
(Antwerpen, Gent, Brüssel, Lüttich, …) liegen in mehreren. Auf der Verwaltungsseite gilt
`Region ──< Provinz ──< Gemeinde`, außer dass die Region Brüssel-Hauptstadt keine Provinz hat und
ihre 19 Gemeinden direkt umfasst.

Einträge verweisen per ID aufeinander, nie per Name: Ein Gericht hat eine `judicialArea`-ID und,
wenn sein Gebiet ein Gerichtsbezirk ist, eine `arrondissement`-ID; ein Kanton listet die
REFNIS-Codes seiner Gemeinden auf; eine Postleitzahl und die Adresse eines Gerichts tragen den
REFNIS-Code ihrer Gemeinde. Namen werden je nach Quelle und Sprache anders geschrieben; IDs nicht.

## Wozu diese Daten dienen {#why-this-data-is-useful}

Juristische Arbeit in Belgien stößt immer wieder auf dieselben Nachschlagefragen, und die amtlichen
Quellen sind aus Code heraus schwer zu nutzen:

- **Zuständigkeit.** Das Friedensgericht, das Polizeigericht und viele andere Gerichte sind
  örtlich zuständig. Das Gesetz (die Anlage zum Gerichtsgesetzbuch) beschreibt diese Gebiete in
  Fließtext, teils Straße für Straße. `cantons.json` macht daraus ein Nachschlagen von der Gemeinde
  zum Kanton und bewahrt den Gesetzestext für die geteilten Städte; `canton-boundaries.json` fügt
  die Geometrie des NGI hinzu, sodass ein Punkt in einer geteilten Stadt seinen Kanton findet.
- **Korrekte Namen und Adressen.** Ladungen, Schriftsätze und Briefe müssen das richtige Gericht
  so ansprechen, wie es sich selbst nennt, etwa `Vredegerecht Gent 1` oder
  `Ondernemingsrechtbank Gent - afdeling Brugge`, und bei der richtigen Kanzlei ankommen. Die
  Namen stammen von den eigenen Seiten der Gerichte, in jeder Sprache, in der sie veröffentlichen.
- **Zinsberechnungen.** Forderungen wegen Zahlungsverzug verwenden den gesetzlichen Zinssatz oder,
  zwischen Unternehmen, den Zinssatz für Handelsgeschäfte. Beide ändern sich jedes Jahr bzw. jedes
  Halbjahr, und der Übergang 2013–2015 hängt vom Vertragsdatum ab. Ein falscher Zeitraum ändert den
  geforderten Betrag.
- **Andere Daten verknüpfen.** REFNIS-Codes verwenden Statbel, die Regionen und die meisten offenen
  Daten. Wenn Sie sie Kantonen und Gerichtsbezirken zuordnen, können Sie Fallzahlen, Bevölkerungs-
  oder Adressdaten auf die Gerichtslandkarte bringen.

## Was (noch) nicht enthalten ist {#what-isn-t-in-it-yet}

Siehe [bekannte Lücken](./known-gaps) für die Grenzen der aktuellen Daten und die
[Roadmap](./roadmap) für geplante Datensätze: die höchsten Gerichte, Historie, Gerichtsvollzieher,
Polizeizonen sowie die Kataster- und Hypothekenämter.

::: warning Referenzdaten, keine Rechtsberatung
Die Daten werden mit amtlichen Quellen abgeglichen, aber Quellen ändern sich und Fehler passieren.
Prüfen Sie die amtliche Quelle, bevor Sie sich auf einen Wert verlassen, und
[melden Sie, was falsch ist](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml).
:::
