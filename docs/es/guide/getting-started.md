<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
</script>

# Primeros pasos {#getting-started}

## Instalación {#install}

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

El paquete es ESM, incluye sus propias definiciones de tipos, no tiene dependencias en tiempo de
ejecución y funciona en navegadores y en Node 22.12 o posterior, donde también se puede cargar
con `require()`. Se prueba en Node 22.12, 22, 24 y 26.

### Importa solo lo que necesitas {#import-only-what-you-need}

Los datos van empaquetados dentro del JavaScript, así que importar desde la raíz del paquete
carga todos los conjuntos de datos. Cada conjunto tiene su propio entry point, y los tribunales y
los cantones (con el texto legal de sus territorios) son con diferencia los más grandes:

```ts
import { getInterestRate } from 'belgica/interest-rates'
import { getCourt } from 'belgica/courts'
import { getCanton } from 'belgica/territory'
import { getMunicipalitiesForPostalCode } from 'belgica/postal-codes'
```

Los [límites de los cantones](/es/data/canton-boundaries) son la excepción: un millón de
posiciones de geometría, solo en `belgica/canton-boundaries`, que la raíz del paquete nunca
carga.

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">JavaScript cargado</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ kb(s.raw) }}</td><td style="text-align:right">{{ kb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Los tamaños se miden a partir de la build cuando se construye el sitio (primero <code>pnpm build</code>).</p>

## Un primer vistazo {#a-first-look}

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
getCantonsForMunicipality('44021') // Gent 1–5: ciudad dividida, ver el `territory` de cada cantón
getCanton('oudergem').seat.nl // 'Etterbeek'

getInterestRate('2024-06-15', 'legal') // { rate: 5.75, period: { from: '2024-01-01', to: '2024-12-31' } }
getInterestRate(new Date(2014, 5, 15), 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Tareas habituales {#common-tasks}

### ¿Qué justice de paix corresponde a una dirección? {#which-justice-of-the-peace-handles-an-address}

La justice de paix (vredegerecht) es el juzgado de paz de un cantón judicial. Busca el código
REFNIS del municipio y obtén sus cantones, y luego el tribunal del cantón.

```ts
import { getCantonsForMunicipality, getJusticeOfThePeace } from 'belgica'

const cantons = getCantonsForMunicipality('44088')
if (cantons.length === 1) {
    const court = getJusticeOfThePeace(cantons[0].id) // cada cantón tiene su tribunal
}

// En el día en que se notificó la citación, en lugar de hoy
getCantonsForMunicipality('44088', { on: '2025-09-15' })
```

Cuando una ciudad está dividida entre varios cantones (Antwerpen, Gent, Brussel, Luik, …),
obtienes más de un resultado. Decide la dirección postal, y el `territory` de cada cantón
contiene la descripción legal de su parte. Pruébalo en la
[página del territorio](/es/data/territory#find-the-canton-for-a-municipality).

Con las coordenadas de la dirección, los [límites de los cantones](/es/data/canton-boundaries)
lo resuelven:

```ts
import { findCantonsAt } from 'belgica/canton-boundaries'

const [canton] = findCantonsAt(3.7268, 51.053) // longitud, latitud: gent-1
const court = getJusticeOfThePeace(canton.id)
```

### ¿Qué tribunal para un municipio? {#which-court-for-a-municipality}

Todo tribunal que no sea una justice de paix enumera los cantones que cubre (`cantons`), tal como
los fija la ley. `findCourtsWithJurisdiction` busca en ellos los cantones de un municipio.

```ts
import { findCourtsWithJurisdiction, getDivisions } from 'belgica'

findCourtsWithJurisdiction('23088', 'police-court') // [police-court-vilvoorde], no Bruselas
findCourtsWithJurisdiction('21004', 'labour-court') // el tribunal neerlandófono y el francófono de Bruselas

// El tribunal en su conjunto; qué división conoce del asunto aún no está en los datos
const [court] = findCourtsWithJurisdiction('44021', 'enterprise-court')
getDivisions(court.id) // enterprise-court-gent-gent, enterprise-court-gent-brugge, …
```

#### A partir de un código postal {#from-a-postal-code}

Una dirección viene con un código postal, no con un código REFNIS. `findCourtsForPostalCode` va
del código postal al municipio ([códigos postales](/es/data/postal-codes)) y de ahí a las
justices de paix y a los tribunales de un tipo. Responde por municipio: tres códigos postales
(`1040`, `1050`, `1804`) pertenecen a dos municipios, y entonces decide la calle.

```ts
import { findCourtsForPostalCode, getMunicipalitiesForPostalCode } from 'belgica'

const [gent] = findCourtsForPostalCode('9050', 'labour-court')
gent.municipality.name.nl // 'Gent'
gent.courts.map((c) => c.id) // ['labour-court-gent']
gent.justicesOfThePeace.map((c) => c.canton.id) // ['gent-1', …, 'gent-5']: decide la calle

findCourtsForPostalCode('1040', 'police-court').map((r) => r.municipality.name.nl) // ['Brussel', 'Etterbeek']
getMunicipalitiesForPostalCode('9050').map((m) => m.id) // ['44021']
```

En una ciudad dividida entre cantones, el código postal reduce la pregunta al municipio; el
cantón sigue necesitando la calle, y sus límites son prosa legal hasta que
[#29](https://github.com/pieterjanscheir/belgica/issues/29) los añada como geometría.

### Intereses debidos en un día {#interest-due-on-a-day}

```ts
import { getInterestRate, getLatestKnownRateDate } from 'belgica'

const result = getInterestRate(new Date(), 'commercial')
if (!result) {
    console.warn(`No rate on file; latest known day is ${getLatestKnownRateDate('commercial')}`)
}
```

`getInterestRate` devuelve `null` para un día sin tipo registrado, de modo que puedes avisar en
lugar de usar 0 % sin decir nada. Lanza un `RangeError` para un día mal formado como
`'2024-6-1'`: pasa `YYYY-MM-DD` o un `Date`.

### Nombres de tribunales en otra lengua {#court-names-in-another-language}

Los nombres son los que publica cada tribunal, en cada lengua en la que tiene página. Un
tribunal de Flandes publica solo en neerlandés; los tribunales bilingües de Bruselas en
neerlandés y francés; los tribunales de Eupen en alemán y francés.

```ts
getCourt('court-of-appeal-brussel').name.fr // "Cour d'appel de Bruxelles"
getCourt('police-court-eupen-sankt-vith').name.de // 'Polizeigericht Eupen, Abteilung Sankt Vith'
```

## JSON sin procesar {#raw-json}

Los archivos de datos también se exportan:

```ts
import courts from 'belgica/data/courts.json' with { type: 'json' }
```

## Los ids son API pública {#ids-are-public-api}

Los proyectos guardan ids como `justice-of-the-peace-gent-1` u `oost-vlaanderen`, así que nunca
cambian dentro de una versión mayor (ver [identificadores](./identifiers)), y las versiones
siguen estas reglas:

| Cambio                     | Versión |
| -------------------------- | ------- |
| Añadir datos               | minor   |
| Corregir un valor          | patch   |
| Eliminar o renombrar un id | major   |
