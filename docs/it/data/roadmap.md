# Roadmap {#roadmap}

Dataset previsti, con la issue che specifica ciascuno di essi. Ogni issue elenca le fonti
ufficiali, i campi proposti e che cosa significa "fatto". L'aiuto è benvenuto: scegline uno e
segui le [convenzioni](/it/guide/contributing#adding-a-dataset).

## Previsti {#planned}

| Dataset                                                                                                                                                                | Perché è utile                                                                                                                     | Issue                                                       |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Le altre giurisdizioni**: Hof van Cassatie / Cour de cassation, Grondwettelijk Hof / Cour constitutionnelle, Raad van State / Conseil d'État, tribunali disciplinari | Le giurisdizioni supreme non sono sul portale dei tribunali, quindi servono fonti proprie                                          | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **La justitiehuis / maison de justice di Eupen** (Comunità germanofona)                                                                                                | L'unica sede che i dati non hanno ancora                                                                                           | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Storia**: quando sono cambiati cantoni, comuni e tribunali                                                                                                           | Il modello ha periodi di validità e ricerche per giorno; mancano ancora i dati delle versioni precedenti                           | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Indirizzo → coordinate**                                                                                                                                             | I [confini dei cantoni](./canton-boundaries) trovano il cantone di un punto; la geocodifica dell'indirizzo è il passaggio mancante | [#28](https://github.com/pieterjanscheir/belgica/issues/28) |
| **Uffici degli ufficiali giudiziari** (gerechtsdeurwaarders / huissiers de justice)                                                                                    | Trovare un ufficiale giudiziario in un arrondissement per notifiche o esecuzioni                                                   | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Zone di polizia** (politiezones / zones de police)                                                                                                                   | Quale zona è competente per un comune: denunce, copie di verbali                                                                   | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Uffici del catasto e della sicurezza giuridica** (kadaster, ex hypotheekkantoren)                                                                                    | Richiedere certificati ipotecari ed estratti catastali all'ufficio competente                                                      | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## Da valutare {#worth-considering}

Raccolti in [#9](https://github.com/pieterjanscheir/belgica/issues/9), all'incirca in ordine di
quanto spesso verrebbero usati:

- **Frazioni** (deelgemeenten, sections de commune) per codice postale. I
  [codici postali](./postal-codes) si fermano al comune; l'elenco di bpost nomina le località ma
  non ha codice REFNIS né licenza aperta.
- **Diritti di cancelleria** (rolrechten / griffierechten) e gli scaglioni della
  **rechtsplegingsvergoeding / indemnité de procédure** (l'indennità di procedura), con i loro
  periodi di validità e l'indicizzazione, come i tassi d'interesse.
- **Ferie giudiziarie e giorni festivi** per anno, per calcolare i termini processuali.
- **Procure** (parketten, arbeidsauditoraten) per arrondissement.
- **Notai e camere notarili**, **ordini degli avvocati** (balies / barreaux).
- **Fusioni di comuni**: codici REFNIS vecchi → nuovi per il 2019 e il 2025, così i dati più
  vecchi possono essere ricondotti.
- **L'indice sanitario** (gezondheidsindex / indice santé) per l'indicizzazione degli affitti.

## Perché alcuni dataset non ci sono ancora {#why-some-datasets-aren-t-here-yet}

Un dataset giuridico è utile solo se ogni valore proviene da una fonte ufficiale, quindi nulla
viene aggiunto a mano a memoria. Ogni dataset è costruito da uno script a partire dagli snapshot
della sua fonte, e la maggior parte delle fonti viene scaricata ogni settimana da GitHub Actions.
Due, per ora, non possono esserlo: il sito del Belgisch Staatsblad / Moniteur belge (ejustice),
da cui provengono i cantoni, e police.be rifiutano entrambi le connessioni dai server di GitHub;
vengono invece scaricati da una macchina normale
([#24](https://github.com/pieterjanscheir/belgica/issues/24)). L'elenco degli ufficiali
giudiziari è costruito nel browser, quindi per leggerlo serve un browser, oppure i dati della
Nationale Kamer van Gerechtsdeurwaarders / Chambre nationale des huissiers de justice
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
