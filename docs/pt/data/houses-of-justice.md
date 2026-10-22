<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Maisons de justice {#houses-of-justice}

Ficheiro: `data/houses-of-justice.json`. As maisons de justice / justitiehuizen (os serviços de
justiça das Comunidades) das Comunidades flamenga e francesa: {{ stats.housesOfJustice }}
registos.

As maisons de justice orientam e acompanham autores de infrações por conta dos tribunais e do
ministério público (liberdade condicional, vigilância eletrónica, trabalho a favor da
comunidade), acolhem vítimas e elaboram estudos sociais para os tribunais de família. São geridas
pelas Comunidades desde 2015.

## Porque é útil {#why-it-s-useful}

- **Direito da família.** Um tribunal de família ordena um estudo social à maison de justice da
  área da família; advogados e partes precisam dos seus contactos.
- **Direito penal.** As condições da liberdade condicional, as penas alternativas e a vigilância
  eletrónica são acompanhadas pela maison de justice; o acolhimento das vítimas também.
- **Ligações.** As justitiehuizen flamengas têm o seu número OVO, o identificador no registo
  flamengo de organizações ([Wegwijs](https://wegwijs.vlaanderen.be)), por isso os dados cruzam-se
  com outros dados do governo flamengo.

## Fonte e atualizações {#source-and-updates}

|                |                                                                                                                                                                                                                                                        |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fonte          | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen) (Comunidade flamenga) e [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/) (Comunidade francesa) |
| Construído por | `scripts/parse` a partir dos snapshots semanais                                                                                                                                                                                                        |
| Verificado     | Todas as semanas, pelo [workflow sources](/pt/guide/data-quality#how-the-data-is-built)                                                                                                                                                                |

Ainda não está nos dados: a maison de justice / Justizhaus da Comunidade germanófona em Eupen
([#3](https://github.com/pieterjanscheir/belgica/issues/3)). Bruxelas tem uma justitiehuis
flamenga (`justitiehuis-brussel`) e uma maison de justice francófona (`maison-justice-bruxelles`).

## Campos {#fields}

| Campo                  | Tipo                                    | Descrição                                                                                                                                          |
| ---------------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `HouseOfJusticeId`                      | A partir do nome, sem artigos: `justitiehuis-gent`, `maison-justice-arlon`                                                                         |
| `validFrom`, `validTo` | string?                                 | Os dias em que o registo se aplica, tal como o site o listava; nenhum: desde o início da cobertura, ou ainda se aplica. Veja [tempo](/pt/api#time) |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | A Comunidade que a gere                                                                                                                            |
| `name`                 | `{ nl }` ou `{ fr }`                    | Na língua da Comunidade                                                                                                                            |
| `ovo`                  | string?                                 | Número OVO no registo flamengo de organizações, para as justitiehuizen flamengas: `OVO001917`                                                      |
| `address`              | `Address`                               | Com o município a que pertence o seu código postal (`municipality`, por código REFNIS)                                                             |
| `contacts`             | `Contact[]`                             | Telefone, fax e e-mail; o serviço de apoio às vítimas de uma maison de justice francófona tem os seus próprios contactos, com etiqueta             |
| `website`              | `{ nl }` ou `{ fr }`                    | A página onde está listada                                                                                                                         |
| `sources`              | `{ url, retrieved }[]`                  | As páginas de onde o registo foi lido                                                                                                              |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
