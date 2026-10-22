# Roadmap {#roadmap}

Os conjuntos de dados previstos, com a issue que especifica cada um. Cada issue lista as fontes
oficiais, os campos propostos e o que significa "concluído". A ajuda é bem-vinda: escolha um e
siga as [convenções](/pt/guide/contributing#adding-a-dataset).

## Previstos {#planned}

| Conjunto de dados                                                                                                                                                    | Para que serve                                                                                                              | Issue                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Os outros tribunais**: Hof van Cassatie / Cour de cassation, Grondwettelijk Hof / Cour constitutionnelle, Raad van State / Conseil d'État, tribunais disciplinares | Os tribunais superiores não estão no portal dos tribunais, por isso precisam das suas próprias fontes                       | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **A maison de justice / Justizhaus de Eupen** (Comunidade germanófona)                                                                                               | A única maison de justice que os dados ainda não têm                                                                        | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Histórico**: quando mudaram cantões, municípios e tribunais                                                                                                        | O modelo tem períodos de validade e pesquisas por dia; as versões anteriores ainda precisam dos dados                       | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Morada → coordenadas**                                                                                                                                             | Os [limites dos cantões](./canton-boundaries) encontram o cantão de um ponto; a geocodificação da morada é o passo em falta | [#66](https://github.com/pieterjanscheir/belgica/issues/66) |
| **Escritórios de oficiais de justiça** (gerechtsdeurwaarders / huissiers de justice)                                                                                 | Encontrar um oficial de justiça num arrondissement para citações ou execuções                                               | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Zonas de polícia** (politiezones / zones de police)                                                                                                                | Que zona trata de um município: queixas, cópias de autos                                                                    | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Repartições do cadastro e da segurança jurídica** (kadaster, antigos hypotheekkantoren)                                                                            | Pedir certidões hipotecárias e extratos cadastrais à repartição competente                                                  | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## A considerar {#worth-considering}

Cada um tem a sua issue, aproximadamente pela ordem da frequência com que seriam usados:

- **Subdivisões dos municípios** (deelgemeenten, sections de commune) por código postal. Os
  [códigos postais](./postal-codes) param no município; a lista da bpost indica as localidades
  mas não tem código REFNIS nem licença aberta
  ([#54](https://github.com/pieterjanscheir/belgica/issues/54)).
- **Custas judiciais** (rolrechten / griffierechten) e os escalões da **indemnização processual**
  (rechtsplegingsvergoeding / indemnité de procédure), com os seus períodos de validade e
  indexação, como as taxas de juro
  ([#59](https://github.com/pieterjanscheir/belgica/issues/59),
  [#60](https://github.com/pieterjanscheir/belgica/issues/60)).
- **Férias judiciais e feriados** por ano, para calcular prazos processuais
  ([#61](https://github.com/pieterjanscheir/belgica/issues/61)).
- **Ministério público** (parketten / parquets, arbeidsauditoraten / auditorats du travail) por
  arrondissement ([#55](https://github.com/pieterjanscheir/belgica/issues/55)).
- **Notários e câmaras notariais**, **ordens de advogados** (balies / barreaux)
  ([#56](https://github.com/pieterjanscheir/belgica/issues/56),
  [#57](https://github.com/pieterjanscheir/belgica/issues/57)).
- **Fusões de municípios**: códigos REFNIS antigos → novos para 2019 e 2025, para que dados mais
  antigos possam ser convertidos ([#53](https://github.com/pieterjanscheir/belgica/issues/53)).
- **O índice de saúde** (gezondheidsindex / indice santé) para a indexação das rendas
  ([#62](https://github.com/pieterjanscheir/belgica/issues/62)).

## Porque é que alguns conjuntos de dados ainda não estão aqui {#why-some-datasets-aren-t-here-yet}

Um conjunto de dados jurídicos só é útil se cada valor vier de uma fonte oficial, por isso nada
é acrescentado à mão de memória. Cada conjunto de dados é construído por um script a partir de
snapshots da sua fonte, e a maioria das fontes é obtida todas as semanas pelo GitHub Actions.
Duas não podem sê-lo, por agora: o site do Belgisch Staatsblad / Moniteur belge (ejustice), de
onde vêm os cantões, e o police.be recusam ambos ligações dos servidores do GitHub; são obtidos a
partir de uma máquina normal ([#52](https://github.com/pieterjanscheir/belgica/issues/52)). O
diretório dos oficiais de justiça é construído no browser, por isso precisa de um browser para
ser lido, ou dos dados da Nationale Kamer van Gerechtsdeurwaarders / Chambre nationale des
huissiers de justice ([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
