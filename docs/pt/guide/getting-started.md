<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Primeiros passos {#getting-started}

## Instalação {#install}

::: code-group

```bash [pnpm]
pnpm add belgica
```

```bash [npm]
npm install belgica
```

```bash [yarn]
yarn add belgica
```

:::

O pacote é ESM, traz as suas próprias definições de tipos, não tem dependências em runtime e
funciona em browsers e em Node 22.12 ou posterior, onde também pode ser carregado com
`require()`. É testado em Node 22.12, 22, 24 e 26.

### Importe só o que precisa {#import-only-what-you-need}

Os dados estão incluídos no JavaScript, por isso importar a partir da raiz do pacote carrega
todos os conjuntos de dados. Cada conjunto de dados tem o seu próprio entry point, e os
tribunais e os cantões (com o texto legal dos seus territórios) são de longe os maiores:

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

Os [limites dos cantões](/pt/data/canton-boundaries) são a exceção: um milhão de posições de
geometria, apenas em `belgica/canton-boundaries`, nunca carregados pela raiz do pacote.

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">JavaScript carregado</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Os tamanhos são medidos a partir da build quando o site é gerado (primeiro <code>pnpm build</code>).</p>

## Um primeiro olhar {#a-first-look}

```ts
import {
    getCourt,
    findCourts,
    getCanton,
    getCantonsForMunicipality,
    getInterestRate,
} from 'belgica'

getCourt('justice-of-the-peace-gent-1').name.nl // 'Vredegerecht Gent 1'
findCourts({ type: 'enterprise-court', arrondissement: 'west-vlaanderen' })

getCantonsForMunicipality('44088') // [Canton merelbeke-melle]
getCantonsForMunicipality('44021') // Gent 1–5: cidade dividida, veja o `territory` de cada cantão
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Tarefas comuns {#common-tasks}

### Que justice de paix é competente para uma morada? {#which-justice-of-the-peace-handles-an-address}

O justice de paix / vredegerecht (o tribunal de proximidade de cada cantão) encontra-se assim:
procure o código REFNIS do município e obtenha os seus cantões, depois o tribunal do cantão.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // cada cantão tem o seu tribunal
}

// No dia em que a citação foi notificada, em vez de hoje
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Quando uma cidade está dividida por vários cantões (Antwerpen, Gent, Brussel, Luik, …), obtém
mais do que um resultado. Decide a morada exata, e o `territory` de cada cantão contém a
descrição legal da sua parte. Experimente na
[página do território](/pt/data/territory#find-the-canton-for-a-municipality).

Com as coordenadas da morada, os [limites dos cantões](/pt/data/canton-boundaries) resolvem a
questão:

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // longitude, latitude: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### Que tribunal para um município? {#which-court-for-a-municipality}

Cada tribunal que não seja um justice de paix lista os cantões que abrange (`cantons`), tal como
a lei os fixa. `findCompetentCourts` procura neles os cantões de um município.

```ts
import { findCompetentCourts, getDivisions } from 'belgica'

findCompetentCourts('23088', 'police-court') // [police-court-vilvoorde], não Bruxelas
findCompetentCourts('21004', 'labour-court') // o tribunal neerlandófono e o francófono de Bruxelas

// O tribunal como um todo; que divisão julga o processo ainda não está nos dados
const [court] = findCompetentCourts('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### A partir de um código postal {#from-a-postal-code}

Uma morada vem com um código postal, não com um código REFNIS. `findCourtsForPostalCode` vai do
código postal ao município ([códigos postais](/pt/data/postal-codes)) e daí aos justices de paix
e aos tribunais de um tipo. Responde por município: três códigos postais (`1040`, `1050`,
`1804`) pertencem a dois municípios, e então decide a rua.

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']: decide a rua

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

Numa cidade dividida por cantões, o código postal reduz a questão ao município; o cantão continua
a depender da rua, e os seus limites são texto jurídico até que
[#29](https://github.com/pieterjanscheir/belgica/issues/29) os acrescente como geometria.

### Juros devidos num dia {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` devolve `null` para um dia sem taxa registada, para que possa emitir um aviso
em vez de usar silenciosamente 0 %. Lança um `RangeError` para um dia mal formado como
`'2024-6-1'`: passe `YYYY-MM-DD` ou um `Date`.

### Nomes dos tribunais noutra língua {#court-names-in-another-language}

Os nomes são os que cada tribunal publica, em todas as línguas em que tem uma página. Um tribunal
na Flandres publica só em neerlandês; os tribunais bilingues de Bruxelas em neerlandês e
francês; os tribunais de Eupen em alemão e francês.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## JSON em bruto {#raw-json}

Os ficheiros de dados também são exportados:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## Os ids são API pública {#ids-are-public-api}

Os projetos guardam ids como `justice-of-the-peace-gent-1` ou `oost-vlaanderen`, por isso nunca
mudam dentro de uma versão major (veja [identificadores](./identifiers)), e as versões seguem
estas regras:

| Alteração                 | Versão |
| ------------------------- | ------ |
| Acrescentar dados         | minor  |
| Corrigir um valor         | patch  |
| Remover ou renomear um id | major  |
