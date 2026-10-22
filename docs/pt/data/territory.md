<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# Território e cantões {#territory-and-cantons}

O mapa judicial belga tem três níveis: as **áreas judiciais** (uma por hof van beroep / cour
d'appel, o tribunal de recurso) contêm **arrondissements** (as circunscrições judiciais), que
contêm **cantões** (cada um com um justice de paix / vredegerecht, o juiz de paz). Os cantões são
definidos em termos de **municípios**. Ao lado do mapa judicial, o administrativo: cada município
fica numa **região** e, fora de Bruxelas, numa **província**.

## Porque é útil {#why-it-s-useful}

- **Que justice de paix?** Litígios de arrendamento, pequenas causas, tutela e conflitos de
  vizinhança vão para um justice de paix / vredegerecht, normalmente o do cantão onde o réu reside
  ou onde fica o imóvel. Errar o cantão significa uma ação apresentada no tribunal errado.
- **Que arrondissement?** Os tribunaux de première instance / rechtbanken van eerste aanleg, os
  tribunaux de l'entreprise / ondernemingsrechtbanken e os tribunaux du travail /
  arbeidsrechtbanken, o ministério público e o território onde um oficial de justiça pode atuar
  estão todos organizados por arrondissement.
- **Que cour d'appel?** Os recursos vão para o hof van beroep / cour d'appel da área judicial.
- **Cruzar dados.** Tudo o que tenha um código REFNIS (estatísticas do Statbel, dados abertos
  regionais, registos de moradas) pode ser colocado no mapa judicial.

A lei descreve os cantões em prosa ("a parte do território da cidade de Antwerpen delimitada
pelas linhas centrais do Brouwersvliet…"). Estes ficheiros transformam-na em dados, mantendo o
texto legal para os casos em que só o texto pode decidir.

## Fonte e atualizações {#source-and-updates}

|                |                                                                                                                                                                                                                                                                                                     |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte          | Anexo ao Gerechtelijk Wetboek / Code judiciaire, "Gebiedsomschrijving en zetel van hoven en rechtbanken" ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), em neerlandês e francês; dados abertos do Statbel para municípios, províncias e regiões |
| Construído por | `pnpm build:cantons` (cantões, municípios); snapshots semanais + `pnpm build:data` (regiões, províncias); à mão (áreas, arrondissements)                                                                                                                                                            |
| Muda quando    | Uma lei altera o anexo; municípios fundem-se (2019, 2025)                                                                                                                                                                                                                                           |
| Cobre          | De 1 de janeiro de 2025 em diante: as pesquisas para um dia anterior lançam um `RangeError` ([tempo](/pt/api#time))                                                                                                                                                                                 |
| Verificado     | Reconstruído à mão com `pnpm build:cantons`: o ejustice recusa os servidores do GitHub ([qualidade dos dados](/pt/guide/data-quality))                                                                                                                                                              |
| Licença        | CC BY 4.0; dados dos municípios © Statbel, CC BY 4.0                                                                                                                                                                                                                                                |

## Encontrar o cantão de um município {#find-the-canton-for-a-municipality}

<CantonLookup />

## Áreas judiciais {#judicial-areas}

As 5 áreas dos hoven van beroep / cours d'appel (rechtsgebieden / ressorts). Ficheiro:
`data/judicial-areas.json`. Fonte: anexo ao Gerechtelijk Wetboek (Ger.W. bijvoegsel), art. 5.

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

## Arrondissements {#arrondissements}

Os 12 arrondissements judiciais. Ficheiro: `data/arrondissements.json`. Fonte: Ger.W.
bijvoegsel art. 4.

<table>
<thead><tr><th>Id</th><th>nl</th><th>fr</th><th>de</th><th>Área judicial</th></tr></thead>
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

## Cantões {#cantons}

Os 162 cantões judiciais: cada um é a área de um justice de paix. Ficheiro: `data/cantons.json`
(gerado a partir do anexo ao Gerechtelijk Wetboek, art. 1).

### Campos {#fields}

| Campo            | Tipo                           | Descrição                                                                                                           |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Id estável na língua local, com um número para os locais com vários cantões: `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | Id do arrondissement                                                                                                |
| `name`           | `{ nl, fr }`                   | Nome do cantão tal como o anexo o dá                                                                                |
| `number`         | number?                        | Número do cantão nos locais com vários (Gent 1–5)                                                                   |
| `seat`           | `{ nl, fr }`                   | Onde o justice de paix tem sede; pode ser diferente do nome                                                         |
| `municipalities` | `{ municipality, partial? }[]` | Municípios abrangidos, por código REFNIS; `partial: true` quando só uma parte o é                                   |
| `territory`      | `{ nl, fr }`                   | A área do cantão, textualmente a partir do anexo                                                                    |
| `legalBasis`     | `{ url, provision }`           | Onde a lei o define: o ELI do anexo e a secção, p. ex. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)                  |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; normalmente a sede, mas nem sempre
    number?: number // para locais com vários cantões (Gent 1–5, …)
    seat: Bilingual // onde o justice de paix tem sede
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // a área do cantão, textualmente a partir do anexo
    legalBasis: { url: string; provision: string } // o ELI do anexo, e a secção
}
```

- **Os ids** seguem a língua local: neerlandês na Flandres e em Bruxelas, francês na Valónia,
  alemão na zona de Eupen; Bruxelas, que é bilingue, recebe o nome neerlandês. Veja
  [identificadores](/pt/guide/identifiers). O justice de paix liga-se ao seu cantão através do
  seu campo `canton`.
- **O nome e a sede podem diferir**: o cantão `oudergem` tem sede em Etterbeek.
- **`partial: true`** assinala um município dividido por vários cantões. O texto `territory`
  diz então que parte (ruas, números, cursos de água) pertence a este cantão.
- Os nomes estão só em neerlandês e francês: o anexo não tem texto consolidado em alemão.

### Municípios divididos {#split-municipalities}

55 cantões abrangem só parte de um município. Para estes, o cantão não pode ser determinado
apenas a partir do município: depende da rua (e por vezes do número de porta). O texto
`territory` indica os limites. Com as coordenadas da morada, `findCantonsAt(lon, lat)` de
`belgica/canton-boundaries` encontra o cantão nos [limites dos cantões](./canton-boundaries) do
NGI; sem elas, mostre os cantões candidatos e o seu texto, e deixe uma pessoa decidir. Onde a
geometria e o texto discordam, o texto é a lei.

## Municípios {#municipalities}

Os 565 municípios com o seu código REFNIS (NIS) do Statbel. Ficheiro: `data/municipalities.json`
(gerado a partir do Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // o código REFNIS: '44021' para Gent
    name: Bilingual
    province: ProvinceId | '04000' // código REFNIS da província; '04000' em Bruxelas
    region: RegionId // código REFNIS da região
}
```

Os 19 municípios da Região de Bruxelas-Capital não têm província. O seu `province` é `04000`, o
código da região, que é o que o Statbel coloca na coluna da província nos seus próprios
ficheiros, e `getProvinceForMunicipality` devolve `undefined` para eles; `getRegionForMunicipality`
dá a região. Os códigos estão listados abaixo, a partir dos dados.

## Regiões {#regions}

As 3 regiões (gewesten, régions). Ficheiro: `data/regions.json` (gerado a partir da lista de
códigos REFNIS do Statbel; nomes tal como o Statbel os publica). © Statbel, CC BY 4.0.

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
    id: RegionId // o código REFNIS: '02000', '03000', '04000'
    name: Translated // { nl, fr, de }, tal como o Statbel os publica
    sources: SourceRef[] // a lista de códigos REFNIS do Statbel
}
```

## Províncias {#provinces}

As 10 províncias, com a respetiva região. Ficheiro: `data/provinces.json` (gerado a partir da
lista de códigos REFNIS do Statbel). © Statbel, CC BY 4.0. A Região de Bruxelas-Capital não tem
província; a província de Brabant, que terminou a 31 de dezembro de 1994, é anterior à cobertura
dos dados.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>Região</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // o código REFNIS: '40000' para Oost-Vlaanderen
    name: Translated // { nl, fr, de }, tal como o Statbel os publica
    region: RegionId
    sources: SourceRef[] // a lista de códigos REFNIS do Statbel
}
```

Os nomes são os do Statbel, incluindo a palavra para o tipo de unidade (`Provincie
Oost-Vlaanderen`, `Province de Flandre orientale`, `Provinz Ostflandern`): o pacote guarda os
valores tal como a fonte os publica, e não os encurta.
