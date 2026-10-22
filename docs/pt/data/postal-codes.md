# Códigos postais {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Ficheiro: `data/postal-codes.json`. Os {{ stats.postalCodes.codes }} códigos postais belgas, cada
um ligado pelo código REFNIS ao município a que pertence: {{ stats.postalCodes.records }}
registos, porque {{ stats.postalCodes.shared }} códigos postais pertencem a dois municípios.

## Porque é útil {#why-it-s-useful}

- **De uma morada ao mapa judicial.** As moradas vêm com um código postal, não com um código
  REFNIS. O código postal dá o município, e o município dá os seus cantões e tribunais:
  `findCourtsForPostalCode('9050', 'labour-court')` responde a "que tribunal para esta morada?"
  até onde o código postal permite.
- **Os códigos postais de um município.** Validar um formulário, endereçar um envio, verificar
  que uma morada e um código REFNIS coincidem: `getPostalCodes('44021')`.
- **O município de cada tribunal, prisão e maison de justice.** O seu `address.municipality` é
  esta ligação, aplicada ao código postal da morada publicada
  ([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

## Fonte e atualizações {#source-and-updates}

|                |                                                                                                                                                                                                                                                                |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte          | A [tabela de conversão de códigos postais para códigos REFNIS](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie) do Statbel, a tabela válida a partir de 1 de janeiro de 2025 (`…_va01012025.xlsx`)                               |
| Construído por | `scripts/parse/postal-codes.ts` a partir dos snapshots semanais. A build falha quando um código aponta para um código REFNIS que não está em `municipalities.json`, ou quando um município não tem código                                                      |
| Muda quando    | O Statbel publica uma nova tabela: municípios fundem-se, a bpost acrescenta ou retira um código postal                                                                                                                                                         |
| Cobre          | De 1 de janeiro de 2025 em diante: as pesquisas para um dia anterior lançam um `RangeError` ([tempo](/pt/api#time)). Uma tabela posterior dá um `validTo` aos pares que deixa cair e um `validFrom` aos pares que acrescenta, no dia em que a tabela se aplica |
| Verificado     | Todas as semanas, pelo [workflow sources](/pt/guide/data-quality#how-the-data-is-built)                                                                                                                                                                        |
| Licença        | © Statbel, [CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                                                                                       |

O Statbel constrói a tabela a partir das estações de correio da bpost e dos municípios do
FOD Financiën / SPF Finances. A tabela tem também um nome de município por linha, que não é
guardado aqui: difere da própria lista REFNIS do Statbel em alguns pontos (`Tongeren-Borgloon`
onde a lista diz `Tongres-Looz`, e `Saint-Nicolas` para Sint-Niklaas), e um registo liga-se ao seu
município em vez de o copiar. `getMunicipality(record.municipality).name` tem os nomes.

## Códigos postais partilhados {#shared-postal-codes}

Um município tem vários códigos postais (Gent tem dez), e um código postal pertence a um único
município, com três exceções:

| Código postal | Municípios                                      |
| ------------- | ----------------------------------------------- |
| `1040`        | Brussel (`21004`) e Etterbeek (`21005`)         |
| `1050`        | Brussel (`21004`) e Elsene (`21009`)            |
| `1804`        | Vilvoorde (`23088`) e Zemst (`23096`): Cargovil |

Nestes casos, decide a rua. `getMunicipalitiesForPostalCode` devolve os dois municípios, e
`findCourtsForPostalCode` responde por município, por isso um código partilhado nunca é atribuído
silenciosamente a um deles.

## Campos {#fields}

| Campo                  | Tipo             | Descrição                                                                                                                                                                                    |
| ---------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PostalCodeId`   | O código postal e o código REFNIS, unidos: `9000-44021`. Nenhum deles sozinho designa um registo; juntos são ao mesmo tempo oficiais e únicos. Veja [identificadores](/pt/guide/identifiers) |
| `validFrom`, `validTo` | string?          | Os dias em que o par se aplica, tal como as tabelas do Statbel os dão; nenhum: desde o início da cobertura, ou ainda se aplica. Veja [tempo](/pt/api#time)                                   |
| `postalCode`           | string           | O código postal de quatro algarismos                                                                                                                                                         |
| `municipality`         | `MunicipalityId` | O município a que o código postal pertence, por código REFNIS                                                                                                                                |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## O que não está incluído {#what-isn-t-in-it}

- **As subdivisões dos municípios** (deelgemeenten, sections de commune): a tabela do Statbel
  para no município. A própria lista de códigos postais da bpost indica as localidades, mas não
  tem código REFNIS e é publicada sob os termos de utilização da bpost (todos os direitos
  reservados), não sob uma licença aberta, por isso não é usada.
- **A rua.** Numa cidade dividida por cantões (Antwerpen, Gent, Brussel, Luik, …) o código postal
  dá o município, e o município dá vários cantões; decide então a rua, e os limites só existem
  como texto jurídico no `territory` de cada cantão até que
  [#29](https://github.com/pieterjanscheir/belgica/issues/29) os acrescente como geometria.

## Funções auxiliares {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// Por município: os seus justices de paix, e os seus tribunais do tipo pedido
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
