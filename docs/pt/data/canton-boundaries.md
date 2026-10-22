# Limites dos cantões {#canton-boundaries}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`
const mb = (bytes) => `${(bytes / 1024 / 1024).toFixed(1)} MB`
</script>

Ficheiro: `data/canton-boundaries.json`. O limite de cada um dos {{ stats.cantons }} cantões
judiciais como geometria GeoJSON, tal como o Nationaal Geografisch Instituut / Institut
géographique national (NGI), o instituto geográfico nacional belga, o digitalizou a partir do
anexo ao Gerechtelijk Wetboek / Code judiciaire.

## Porque é útil {#why-it-s-useful}

- **O cantão de uma morada numa cidade dividida.** {{ stats.splitCantons }} cantões abrangem só
  parte de um município (Antwerpen, Gent, Brussel, Luik, Charleroi, …), e
  `getCantonsForMunicipality` só pode listar os candidatos. Com a morada geocodificada,
  `findCantonsAt(lon, lat)` dá o único cantão, e portanto o justice de paix / vredegerecht.
- **Mapas.** A geometria é GeoJSON standard em WGS 84: desenhe os cantões num mapa, cruze-os com
  outros dados geográficos, ou carregue-os no PostGIS, no QGIS ou numa folha de cálculo com mapa.
- **Verificar o texto legal.** Os polígonos do NGI são uma segunda leitura do mesmo anexo, ao
  lado do texto `territory` de cada cantão.

::: warning O texto legal prevalece
O limite é a interpretação do NGI do anexo ao Gerechtelijk Wetboek / Code judiciaire,
digitalizada sobre os limites cadastrais dos municípios, cursos de água e estradas. O próprio
anexo, citado textualmente no `territory` de cada cantão, é a lei. Para um ponto perto de uma
linha de limite, leia o texto; ele indica as ruas e os números de porta.
:::

## Fonte e atualizações {#source-and-updates}

|                |                                                                                                                                                                                                                                                             |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte          | NGI, [Judicial cantons and arrondissements](https://www.geo.be/catalog/details/e1f61c40-623a-11eb-9e7c-186571a04de3) (Territorial Divisions) em geo.be: o GeoPackage em WGS 84 (EPSG:4326), tipo de feature `judicialcanton`, revisto a 16 de julho de 2026 |
| Licença        | © NGI, [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)                                                                                                                                                                                            |
| Construído por | `scripts/parse/boundaries.ts` a partir do snapshot semanal do GeoPackage                                                                                                                                                                                    |
| Muda quando    | O NGI publica uma nova versão: todos os anos, quando os limites municipais do FOD Financiën / SPF Finances são atualizados, ou quando uma lei altera o anexo                                                                                                |
| Cobre          | De 21 de outubro de 2026 em diante, o dia em que o ficheiro foi lido pela primeira vez: as pesquisas para um dia anterior lançam um `RangeError` ([tempo](/pt/api#time))                                                                                    |
| Verificado     | Todas as semanas, pelo [workflow sources](/pt/guide/data-quality#how-the-data-is-built): a build falha quando um cantão não tem limite ou quando um limite não corresponde a nenhum cantão                                                                  |

Como o NGI traçou os limites, nas suas próprias palavras: onde o anexo se refere a limites
municipais, usou os limites cadastrais do FOD Financiën / SPF Finances; onde se refere a cursos
de água ou estradas, os dados topográficos do próprio NGI; onde se refere a antigos municípios,
os limites destes segundo o NGI. A escala é 1:10 000.

## Campos {#fields}

| Campo                  | Tipo                   | Descrição                                                                                                                                                                 |
| ---------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `CantonId`             | O id do cantão: um cantão tem um único limite, que usa a sua chave                                                                                                        |
| `validFrom`, `validTo` | string?                | Os dias em que o registo se aplica; nenhum: desde o início da cobertura, ou ainda se aplica. Veja [tempo](/pt/api#time)                                                   |
| `canton`               | `CantonId`             | O cantão a que o limite pertence                                                                                                                                          |
| `ngiId`                | string                 | O identificador do objeto no NGI (o seu `tgid`), um GUID                                                                                                                  |
| `cantonCode`           | `{ nl, fr }`           | O código do cantão nos dados do NGI: seis algarismos (`248112` para Gent 1), com um prefixo `N` ou `F` por língua em Bruxelas-Capital e em Sint-Genesius-Rode (`N238104`) |
| `geometry`             | `MultiPolygon`         | GeoJSON ([RFC 7946](https://www.rfc-editor.org/rfc/rfc7946)): WGS 84, longitude primeiro, anéis exteriores no sentido anti-horário, buracos no sentido horário            |
| `sources`              | `{ url, retrieved }[]` | O ficheiro do NGI de onde o registo foi lido                                                                                                                              |

```ts
interface CantonBoundary {
    id: CantonId // 'gent-1'
    canton: CantonId // 'gent-1'
    ngiId: string // '{3905ED53-F233-4C4E-8225-4E43FEC7C541}'
    cantonCode: Bilingual // { nl: '248114', fr: '248114' }
    geometry: MultiPolygon // { type: 'MultiPolygon', coordinates: [[[[lon, lat], …]]] }
    sources: SourceRef[]
}
```

A geometria é a do NGI, vértice a vértice: nada é simplificado. As coordenadas são arredondadas a
7 casas decimais, cerca de um centímetro, abaixo da precisão da própria fonte. Cada limite é um
único `MultiPolygon`, mesmo quando tem um só polígono, para que todos os registos tenham a mesma
forma.

### Como os cantões são associados às features do NGI {#how-cantons-are-matched-to-the-ngi-s-features}

O NGI dá a cada feature um nome em neerlandês e em francês (`Eerste gerechtelijk kanton Gent`,
`Premier canton judiciaire de Gand`). Uma feature é o limite de um cantão quando os dois nomes,
convertidos num id da [forma habitual](/pt/guide/identifiers), dão esse cantão e coincidem no seu
número. Sete features têm o nome local nas duas línguas onde o anexo usa um exónimo
(`Canton judiciaire de Halle`, onde o anexo diz `Hal`; `Gerechtelijk kanton Huy`, onde diz
`Hoei`); essas são associadas pelo seu código de cantão em `CANTON_ALIASES` no parser. Qualquer
outro caso interrompe a build.

## Tamanho {#size}

Os limites são de longe o maior conjunto de dados: cerca de um milhão de posições. Têm o seu
próprio entry point, `belgica/canton-boundaries`, e a raiz do pacote não os reexporta, por isso
nada os carrega a não ser que os peça:

<table v-if="stats.sizes">
<thead><tr><th>Entry point</th><th style="text-align:right">JavaScript carregado</th><th style="text-align:right">gzip</th></tr></thead>
<tbody>
<tr v-for="s in stats.sizes.filter((s) => s.entry === 'belgica' || s.entry.endsWith('canton-boundaries'))" :key="s.entry">
<td><code>{{ s.entry }}</code></td><td style="text-align:right">{{ mb(s.raw) }}</td><td style="text-align:right">{{ mb(s.gzip) }}</td>
</tr>
</tbody>
</table>
<p v-else class="bld-muted">Os tamanhos são medidos a partir da build quando o site é gerado (primeiro <code>pnpm build</code>).</p>

O ficheiro em bruto, `data/canton-boundaries.json`, está no pacote npm e em cada release, por isso
o Python, o PostGIS e as ferramentas SIG podem lê-lo sem o JavaScript.

## Encontrar o cantão de um ponto {#finding-the-canton-of-a-point}

```ts
import { findCantonsAt, getCantonBoundary } from 'belgica/canton-boundaries'
import { getJusticeOfThePeace } from 'belgica/courts'

// Primeiro a longitude, depois a latitude, pela ordem do GeoJSON
const [canton] = findCantonsAt(3.7268, 51.053) // Sint-Baafskathedraal, Gent → gent-1
getJusticeOfThePeace(canton.id).address // onde apresentar

findCantonsAt(2.3522, 48.8566) // [] : Paris, fora da Bélgica
getCantonBoundary('gent-1').geometry // o MultiPolygon
```

`findCantonsAt` devolve um cantão para um ponto na Bélgica, nenhum fora dela, e os dois cantões
para um ponto exatamente sobre a linha entre ambos. Não precisa de nenhuma dependência: um simples
teste de ponto em polígono sobre os limites, cerca de um milissegundo por pesquisa. A
geocodificação da morada (rua e número para coordenadas) fica a seu cargo: os registos de moradas
das regiões (o Adressenregister da Flandres, o UrbIS de Bruxelas, o ICAR da Valónia) e os dados
federais de moradas BeSt em geo.be fazem isso.

## Noutras linguagens {#in-other-languages}

O ficheiro é geometria GeoJSON simples por registo, por isso qualquer SIG o lê. Em Python com
Shapely:

```python
import json
from shapely.geometry import Point, shape

boundaries = json.load(open("data/canton-boundaries.json"))
polygons = {b["canton"]: shape(b["geometry"]) for b in boundaries}

def cantons_at(lon: float, lat: float) -> list[str]:
    point = Point(lon, lat)
    return [canton for canton, polygon in polygons.items() if polygon.covers(point)]

cantons_at(3.7268, 51.053)  # ['gent-1']
```
