# Prisões {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Ficheiro: `data/prisons.json`. As {{ stats.prisons }} prisões e casas de detenção do
FOD Justitie / SPF Justice (Direção-Geral dos Estabelecimentos Penitenciários).

## Porque é útil {#why-it-s-useful}

- **Escrever a um recluso ou à sua prisão.** Advogados, famílias e serviços precisam da morada e
  do telefone da prisão; os nomes diferem consoante a língua (`Gevangenis van Bergen`,
  `Prison de Mons`, `Gefängnis Mons`).
- **Depositar dinheiro.** Quando o FOD Justitie / SPF Justice publica a conta da prisão para
  dinheiro destinado aos reclusos, ela está nos contactos como `bank-account`, com o dígito de
  controlo verificado.
- **Formulários e processos.** Um id estável por estabelecimento para guardar com um processo, e
  uma lista para escolher.

## Fonte e atualizações {#source-and-updates}

|                |                                                                                                                                                                                           |
| -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fonte          | [FOD Justitie: Belgische gevangenissen](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen), a página de cada prisão em neerlandês, francês e alemão |
| Construído por | `scripts/parse` a partir dos snapshots semanais                                                                                                                                           |
| Muda quando    | Uma prisão abre ou fecha, ou muda os seus dados de contacto                                                                                                                               |
| Verificado     | Todas as semanas, pelo [workflow sources](/pt/guide/data-quality#how-the-data-is-built)                                                                                                   |

## Campos {#fields}

| Campo                  | Tipo                              | Descrição                                                                                                                                          |
| ---------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PrisonId`                        | A partir do nome na língua local, sem artigos: `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                         |
| `validFrom`, `validTo` | string?                           | Os dias em que o registo se aplica, tal como o site o listava; nenhum: desde o início da cobertura, ou ainda se aplica. Veja [tempo](/pt/api#time) |
| `kind`                 | `'prison'` \| `'detention-house'` | Uma casa de detenção acolhe pessoas com penas curtas, perto de casa                                                                                |
| `name`                 | `{ nl, fr, de }`                  | Tal como o FOD Justitie / SPF Justice o publica                                                                                                    |
| `address`              | `Address`                         | Na língua local, com o município a que pertence o seu código postal (`municipality`, por código REFNIS)                                            |
| `contacts`             | `Contact[]`                       | Telefone, fax, e-mail e a conta para dinheiro destinado aos reclusos, quando publicados                                                            |
| `website`              | `{ nl, fr, de }`                  | A página da prisão por língua                                                                                                                      |
| `sources`              | `{ url, retrieved }[]`            | As páginas de onde o registo foi lido                                                                                                              |

O nome do diretor, que as páginas também indicam, fica de fora: muda, e são dados pessoais de que
o pacote não precisa.

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
