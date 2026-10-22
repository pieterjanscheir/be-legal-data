<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# Territorio e cantoni {#territory-and-cantons}

La mappa giudiziaria del Belgio ha tre livelli: i **distretti giudiziari** (rechtsgebieden /
ressorts, uno per ogni hof van beroep / cour d'appel, la corte d'appello) contengono gli
**arrondissement** giudiziari (circoscrizioni intermedie, mantenute con il loro nome belga), che
contengono i **cantoni** (ciascuno con un vredegerecht / justice de paix, il giudice di pace). I
cantoni sono definiti in termini di **comuni**. Accanto alla mappa giudiziaria c'è quella
amministrativa: ogni comune si trova in una **regione** e, fuori da Bruxelles, in una
**provincia**.

## Perché è utile {#why-it-s-useful}

- **Quale giudice di pace?** Le controversie in materia di locazione, le cause di modesto
  valore, la tutela e le liti di vicinato vanno davanti al giudice di pace, di solito quello del
  cantone in cui risiede il convenuto o si trova l'immobile. Sbagliare cantone significa
  depositare la domanda presso il tribunale sbagliato.
- **Quale arrondissement?** Il rechtbank van eerste aanleg / tribunal de première instance, il
  ondernemingsrechtbank / tribunal de l'entreprise e l'arbeidsrechtbank / tribunal du travail,
  la procura, e il territorio in cui può operare un ufficiale giudiziario sono tutti organizzati
  per arrondissement.
- **Quale corte d'appello?** Gli appelli vanno allo hof van beroep / cour d'appel del distretto
  giudiziario.
- **Collegare dati.** Tutto ciò che ha un codice REFNIS (statistiche di Statbel, open data
  regionali, registri degli indirizzi) può essere collocato sulla mappa giudiziaria.

La legge descrive i cantoni in prosa ("la parte del territorio della città di Antwerpen
delimitata dalle linee mediane del Brouwersvliet…"). Questi file la trasformano in dati,
conservando il testo di legge per i casi in cui solo il testo può decidere.

## Fonte e aggiornamenti {#source-and-updates}

|               |                                                                                                                                                                                                                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte         | Allegato al Gerechtelijk Wetboek / Code judiciaire, "Gebiedsomschrijving en zetel van hoven en rechtbanken" ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), in neerlandese e francese; open data di Statbel per comuni, province e regioni |
| Costruito da  | `pnpm build:cantons` (cantoni, comuni); snapshot settimanali + `pnpm build:data` (regioni, province); a mano (distretti, arrondissement)                                                                                                                                                      |
| Cambia quando | Una legge modifica l'allegato; dei comuni si fondono (2019, 2025)                                                                                                                                                                                                                             |
| Copre         | Dal 1° gennaio 2025: le ricerche per un giorno precedente lanciano un `RangeError` ([tempo](/it/api#time))                                                                                                                                                                                    |
| Verificato    | Ricostruito a mano con `pnpm build:cantons`: ejustice rifiuta i server di GitHub ([qualità dei dati](/it/guide/data-quality))                                                                                                                                                                 |
| Licenza       | CC BY 4.0; dati sui comuni © Statbel, CC BY 4.0                                                                                                                                                                                                                                               |

## Trova il cantone di un comune {#find-the-canton-for-a-municipality}

<CantonLookup />

## Distretti giudiziari {#judicial-areas}

Le 5 aree delle corti d'appello (rechtsgebieden / ressorts). File: `data/judicial-areas.json`.
Fonte: allegato al Gerechtelijk Wetboek (Ger.W. bijvoegsel), art. 5.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="a in judicialAreas" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface JudicialArea {
    id: JudicialAreaId // 'gent'
    name: Translated // { nl, fr, de }
}
```

## Arrondissement {#arrondissements}

I 12 arrondissement giudiziari. File: `data/arrondissements.json`. Fonte: Ger.W. bijvoegsel
art. 4.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>Distretto giudiziario</th></tr></thead>
<tbody>
<tr v-for="a in arrondissements" :key="a.id">
<td><code>{{ a.id }}</code></td><td>{{ a.name.nl }}</td><td>{{ a.name.fr }}</td><td>{{ a.name.de }}</td>
<td>{{ getJudicialArea(a.judicialArea)?.name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Arrondissement {
    id: ArrondissementId // 'oost-vlaanderen'
    name: Translated
    judicialArea: JudicialAreaId
}
```

## Cantoni {#cantons}

Tutti i 162 cantoni giudiziari: ciascuno è l'area di un giudice di pace. File:
`data/cantons.json` (generato dall'allegato al Gerechtelijk Wetboek, art. 1).

### Campi {#fields}

| Campo            | Tipo                           | Descrizione                                                                                                           |
| ---------------- | ------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Id stabile nella lingua locale, con un numero per i luoghi con più cantoni: `gent-1`, `merelbeke-melle`, `wavre-1`    |
| `arrondissement` | string                         | Id dell'arrondissement                                                                                                |
| `name`           | `{ nl, fr }`                   | Nome del cantone come lo indica l'allegato                                                                            |
| `number`         | number?                        | Numero del cantone nei luoghi che ne hanno più di uno (Gent 1–5)                                                      |
| `seat`           | `{ nl, fr }`                   | Dove ha sede il giudice di pace; può differire dal nome                                                               |
| `municipalities` | `{ municipality, partial? }[]` | Comuni coperti, per codice REFNIS; `partial: true` quando ne è coperta solo una parte                                 |
| `territory`      | `{ nl, fr }`                   | L'area del cantone, alla lettera dall'allegato                                                                        |
| `legalBasis`     | `{ url, provision }`           | Dove la legge lo definisce: l'ELI dell'allegato e la sezione, per esempio `Bijvoegsel art. 1, afdeling 6.15` (Gent 4) |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; di solito la sede, ma non sempre
    number?: number // per i luoghi con più cantoni (Gent 1–5, …)
    seat: Bilingual // dove ha sede il giudice di pace
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // l'area del cantone, alla lettera dall'allegato
    legalBasis: { url: string; provision: string } // l'ELI dell'allegato, e la sezione
}
```

- **Gli id** seguono la lingua locale: neerlandese nelle Fiandre e a Bruxelles, francese in
  Vallonia, tedesco nella zona di Eupen; Bruxelles, che è bilingue, prende il nome neerlandese.
  Vedi [identificatori](/it/guide/identifiers). Il giudice di pace si collega al suo cantone
  tramite il proprio campo `canton`.
- **Nome e sede possono differire**: il cantone `oudergem` ha sede a Etterbeek.
- **`partial: true`** indica un comune suddiviso tra più cantoni. Il testo `territory` dice
  allora quale parte (vie, numeri civici, corsi d'acqua) appartiene a questo cantone.
- I nomi sono solo in neerlandese e in francese: l'allegato non ha un testo tedesco consolidato.

### Comuni suddivisi {#split-municipalities}

55 cantoni coprono solo una parte di un comune. Per questi, il cantone non si può determinare a
partire dal solo comune: dipende dalla via (e talvolta dal numero civico). Il testo `territory`
indica i confini. Con le coordinate dell'indirizzo, `findCantonsAt(lon, lat)` di
`belgica/canton-boundaries` trova il cantone nei [confini dei cantoni](./canton-boundaries)
dell'NGI; senza coordinate, mostra i cantoni candidati e il loro testo, e lascia decidere a una
persona. Dove geometria e testo non concordano, la legge è il testo.

## Comuni {#municipalities}

I 565 comuni con il loro codice REFNIS (NIS) di Statbel. File: `data/municipalities.json`
(generato da Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // il codice REFNIS: '44021' per Gent
    name: Bilingual
    province: ProvinceId | '04000' // codice REFNIS della provincia; '04000' a Bruxelles
    region: RegionId // codice REFNIS della regione
}
```

I 19 comuni della Regione di Bruxelles-Capitale non hanno provincia. Il loro `province` è
`04000`, il codice della regione, che è ciò che Statbel mette nella colonna della provincia nei
propri file, e `getProvinceForMunicipality` restituisce `undefined` per questi comuni;
`getRegionForMunicipality` fornisce la regione. I codici sono elencati qui sotto, a partire dai
dati.

## Regioni {#regions}

Le 3 regioni (gewesten, régions). File: `data/regions.json` (generato dall'elenco dei codici
REFNIS di Statbel; nomi come li pubblica Statbel). © Statbel, CC BY 4.0.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th></tr></thead>
<tbody>
<tr v-for="r in regions" :key="r.id">
<td><code>{{ r.id }}</code></td><td>{{ r.name.nl }}</td><td>{{ r.name.fr }}</td><td>{{ r.name.de }}</td>
</tr>
</tbody>
</table>

```ts
interface Region {
    id: RegionId // il codice REFNIS: '02000', '03000', '04000'
    name: Translated // { nl, fr, de }, come li pubblica Statbel
    sources: SourceRef[] // l'elenco dei codici REFNIS di Statbel
}
```

## Province {#provinces}

Le 10 province, con la loro regione. File: `data/provinces.json` (generato dall'elenco dei codici
REFNIS di Statbel). © Statbel, CC BY 4.0. La Regione di Bruxelles-Capitale non ha province; la
provincia del Brabante, soppressa il 31 dicembre 1994, è anteriore alla copertura dei dati.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>Regione</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // il codice REFNIS: '40000' per Oost-Vlaanderen
    name: Translated // { nl, fr, de }, come li pubblica Statbel
    region: RegionId
    sources: SourceRef[] // l'elenco dei codici REFNIS di Statbel
}
```

I nomi sono quelli di Statbel, compresa la parola per il tipo di unità (`Provincie
Oost-Vlaanderen`, `Province de Flandre orientale`, `Provinz Ostflandern`): il package memorizza i
valori come la fonte li pubblica, e non li abbrevia.
