<script setup>
import { judicialAreas, arrondissements, getJudicialArea, regions, provinces, getRegion } from '../../../src'
</script>

# Territorio y cantones {#territory-and-cantons}

El mapa judicial de Bélgica tiene tres niveles: las **áreas judiciales** (una por cour d'appel /
hof van beroep, el tribunal de apelación) contienen **distritos judiciales** (arrondissements
judiciaires / gerechtelijke arrondissementen), que contienen **cantones judiciales** (cada uno con
una justice de paix / vredegerecht, el juzgado de paz del cantón). Los cantones se definen en
función de los **municipios**. Junto al mapa judicial está el administrativo: cada municipio está
en una **región** y, fuera de Bruselas, en una **provincia**.

## Para qué sirve {#why-it-s-useful}

- **¿Qué justice de paix?** Los litigios de arrendamiento, las reclamaciones de menor cuantía, la
  protección de personas y los conflictos de vecindad van a una justice de paix, normalmente la
  del cantón donde vive el demandado o donde está el inmueble. Equivocarse de cantón significa
  presentar la demanda ante el tribunal equivocado.
- **¿Qué distrito judicial?** Los tribunaux de première instance, los tribunaux de l'entreprise y
  du travail, la fiscalía (parquet / parket) y el territorio en el que puede actuar un huissier de
  justice (gerechtsdeurwaarder) se organizan por distrito judicial.
- **¿Qué cour d'appel?** Los recursos de apelación van a la cour d'appel del área judicial.
- **Cruzar datos.** Todo lo que tiene un código REFNIS (estadísticas de Statbel, datos abiertos
  regionales, registros de direcciones) se puede situar en el mapa judicial.

La ley describe los cantones en prosa ("la parte del territorio de la ciudad de Antwerpen
delimitada por los ejes del Brouwersvliet…"). Estos archivos la convierten en datos y conservan
el texto legal para los casos en que solo el texto puede decidir.

## Fuente y actualizaciones {#source-and-updates}

|               |                                                                                                                                                                                                                                                                                                        |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fuente        | Anexo del Code judiciaire (Gerechtelijk Wetboek), "Gebiedsomschrijving en zetel van hoven en rechtbanken" ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)), en neerlandés y francés; datos abiertos de Statbel para municipios, provincias y regiones |
| Generado por  | `pnpm build:cantons` (cantones, municipios); capturas semanales + `pnpm build:data` (regiones, provincias); a mano (áreas, distritos judiciales)                                                                                                                                                       |
| Cambia cuando | Una ley modifica el anexo; se fusionan municipios (2019, 2025)                                                                                                                                                                                                                                         |
| Cubre         | Desde el 1 de enero de 2025: las búsquedas para un día anterior lanzan un `RangeError` ([tiempo](/es/api#time))                                                                                                                                                                                        |
| Comprobado    | Reconstruido a mano con `pnpm build:cantons`: ejustice rechaza los servidores de GitHub ([calidad de los datos](/es/guide/data-quality))                                                                                                                                                               |
| Licencia      | CC BY 4.0; datos de municipios © Statbel, CC BY 4.0                                                                                                                                                                                                                                                    |

## Buscar el cantón de un municipio {#find-the-canton-for-a-municipality}

<CantonLookup />

## Áreas judiciales {#judicial-areas}

Las 5 áreas de las cours d'appel (rechtsgebieden, ressorts). Archivo: `data/judicial-areas.json`.
Fuente: anexo del Code judiciaire (Ger.W. bijvoegsel), art. 5.

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

## Distritos judiciales {#arrondissements}

Los 12 distritos judiciales (arrondissements). Archivo: `data/arrondissements.json`. Fuente:
Ger.W. bijvoegsel art. 4.

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

## Cantones {#cantons}

Los 162 cantones judiciales: cada uno, el área de una justice de paix. Archivo:
`data/cantons.json` (generado a partir del anexo del Code judiciaire, art. 1).

### Campos {#fields}

| Campo            | Tipo                           | Descripción                                                                                                               |
| ---------------- | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------- |
| `id`             | `CantonId`                     | Id estable en la lengua local, con un número para los lugares con varios cantones: `gent-1`, `merelbeke-melle`, `wavre-1` |
| `arrondissement` | string                         | Id del distrito judicial                                                                                                  |
| `name`           | `{ nl, fr }`                   | Nombre del cantón tal como lo da el anexo                                                                                 |
| `number`         | number?                        | Número del cantón en los lugares que tienen varios (Gent 1–5)                                                             |
| `seat`           | `{ nl, fr }`                   | Dónde tiene su sede la justice de paix; puede diferir del nombre                                                          |
| `municipalities` | `{ municipality, partial? }[]` | Municipios cubiertos, por código REFNIS; `partial: true` cuando solo se cubre una parte                                   |
| `territory`      | `{ nl, fr }`                   | El área del cantón, literal del anexo                                                                                     |
| `legalBasis`     | `{ url, provision }`           | Dónde lo define la ley: el ELI del anexo y la sección, p. ej. `Bijvoegsel art. 1, afdeling 6.15` (Gent 4)                 |

```ts
interface Canton {
    id: CantonId // 'gent-1', 'merelbeke-melle'
    arrondissement: ArrondissementId
    name: Bilingual // { nl, fr }; normalmente la sede, pero no siempre
    number?: number // para lugares con varios cantones (Gent 1–5, …)
    seat: Bilingual // dónde tiene su sede la justice de paix
    municipalities: { municipality: MunicipalityId; partial?: boolean }[]
    territory: Bilingual // el área del cantón, literal del anexo
    legalBasis: { url: string; provision: string } // el ELI del anexo, y la sección
}
```

- **Los ids** siguen la lengua local: neerlandés en Flandes y Bruselas, francés en Valonia,
  alemán en torno a Eupen; Bruselas, que es bilingüe, toma el nombre neerlandés. Ver
  [identificadores](/es/guide/identifiers). La justice de paix se vincula a su cantón mediante su
  campo `canton`.
- **El nombre y la sede pueden diferir**: el cantón `oudergem` tiene su sede en Etterbeek.
- **`partial: true`** marca un municipio dividido entre varios cantones. El texto `territory`
  dice entonces qué parte (calles, números, cursos de agua) pertenece a este cantón.
- Los nombres están solo en neerlandés y francés: el anexo no tiene texto alemán consolidado.

### Municipios divididos {#split-municipalities}

55 cantones cubren solo parte de un municipio. Para ellos, el cantón no se puede determinar solo
a partir del municipio: depende de la calle (y a veces del número de la casa). El texto
`territory` nombra los límites. Con las coordenadas de la dirección, `findCantonsAt(lon, lat)` de
`belgica/canton-boundaries` encuentra el cantón en los
[límites de los cantones](./canton-boundaries) del NGI; sin ellas, muestra los cantones
candidatos y su texto, y deja que decida una persona. Donde la geometría y el texto discrepan, el
texto es la ley.

## Municipios {#municipalities}

Los 565 municipios con su código REFNIS (NIS) de Statbel. Archivo: `data/municipalities.json`
(generado a partir de Statbel). © Statbel, CC BY 4.0.

```ts
interface Municipality {
    id: MunicipalityId // el código REFNIS: '44021' para Gent
    name: Bilingual
    province: ProvinceId | '04000' // código REFNIS de la provincia; '04000' en Bruselas
    region: RegionId // código REFNIS de la región
}
```

Los 19 municipios de la Región de Bruselas-Capital no tienen provincia. Su `province` es `04000`,
el código de la región, que es lo que Statbel pone en la columna de provincia de sus propios
archivos, y `getProvinceForMunicipality` devuelve `undefined` para ellos;
`getRegionForMunicipality` da la región. Los códigos se enumeran abajo, a partir de los datos.

## Regiones {#regions}

Las 3 regiones (gewesten, régions). Archivo: `data/regions.json` (generado a partir de la lista de
códigos REFNIS de Statbel; nombres tal como los publica Statbel). © Statbel, CC BY 4.0.

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
    id: RegionId // el código REFNIS: '02000', '03000', '04000'
    name: Translated // { nl, fr, de }, tal como los publica Statbel
    sources: SourceRef[] // la lista de códigos REFNIS de Statbel
}
```

## Provincias {#provinces}

Las 10 provincias, con su región. Archivo: `data/provinces.json` (generado a partir de la lista
de códigos REFNIS de Statbel). © Statbel, CC BY 4.0. La Región de Bruselas-Capital no tiene
provincia; la provincia de Brabante, que dejó de existir el 31 de diciembre de 1994, es anterior a
la cobertura de los datos.

<table>
<thead><tr><th>Id (REFNIS)</th><th>nl</th><th>fr</th><th>de</th><th>Región</th></tr></thead>
<tbody>
<tr v-for="p in provinces" :key="p.id">
<td><code>{{ p.id }}</code></td><td>{{ p.name.nl }}</td><td>{{ p.name.fr }}</td><td>{{ p.name.de }}</td>
<td>{{ getRegion(p.region).name.nl }}</td>
</tr>
</tbody>
</table>

```ts
interface Province {
    id: ProvinceId // el código REFNIS: '40000' para Oost-Vlaanderen
    name: Translated // { nl, fr, de }, tal como los publica Statbel
    region: RegionId
    sources: SourceRef[] // la lista de códigos REFNIS de Statbel
}
```

Los nombres son los de Statbel, incluida la palabra para el tipo de unidad
(`Provincie Oost-Vlaanderen`, `Province de Flandre orientale`, `Provinz Ostflandern`): el paquete
guarda los valores tal como los publica la fuente, y no los acorta.
