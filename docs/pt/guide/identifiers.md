# Identificadores {#identifiers}

Cada registo tem um `id`. Outros registos, a sua base de dados e os seus URLs referem-se a ele,
por isso um id tem de estar certo uma vez e depois nunca mais mudar. Esta página expõe as regras,
porque existe cada uma e o que acontece quando a lei altera aquilo que um id designa.

## As regras {#the-rules}

1. **Cada registo tem um campo `id`**, único dentro do seu conjunto de dados. O código genérico
   (um índice, uma cache, um formulário) trata todos os conjuntos de dados da mesma maneira.
2. **Um código oficial prevalece, se cobrir todos os registos.** Quando as autoridades atribuem
   um código a cada registo de um conjunto de dados, o id _é_ esse código: os municípios usam o
   seu código REFNIS do Statbel (`44021` para Gent). Um código que só cobre alguns registos é
   guardado antes como campo: os tribunais têm os seus códigos ECLI em `ecli`, as justitiehuizen
   flamengas o seu número OVO em `ovo` (veja [porquê](#why-not-the-official-court-codes)).
3. **Caso contrário, kebab-case ASCII em minúsculas**: `^[a-z0-9]+(-[a-z0-9]+)*$`, construído por
   [`scripts/id.ts`](https://github.com/pieterjanscheir/belgica/blob/main/scripts/id.ts): os
   acentos são removidos, e tudo o resto que não seja letra ou algarismo passa a um único hífen.
   `Merelbeke-Melle` → `merelbeke-melle`, `Braine-l'Alleud` → `braine-l-alleud`,
   `Liège` → `liege`.
4. **A partir do nome oficial na língua local**: neerlandês na Flandres, francês na Valónia,
   alemão na zona de Eupen. Bruxelas é oficialmente bilingue e precisa de uma escolha fixa: o
   neerlandês.
5. **Um número é um sufixo**: os locais com vários cantões recebem `gent-1` … `gent-5`.
6. **Os tribunais são `type` + local**: `justice-of-the-peace-gent-1`, `court-of-appeal-liege`.
   Um justice de paix / vredegerecht usa o id do seu cantão. Os dois tribunais do mesmo tipo em
   Bruxelas, um por língua, acrescentam `-nl` ou `-fr` (`police-court-brussel-fr`). Uma divisão
   ou sede acrescenta o seu próprio local ao id do seu tribunal (`enterprise-court-gent-brugge`).
   O prefixo mantém os ids únicos quando Gent tem um vredegerecht, uma ondernemingsrechtbank e
   uma arbeidsrechtbank, e é exatamente o `type` do registo, por isso nunca precisa de um segundo
   vocabulário.
7. **As prisões e as maisons de justice / justitiehuizen são o seu nome** na língua local, sem
   artigos: `gevangenis-gent`, `prison-lantin`, `justitiehuis-gent`, `maison-justice-arlon`. Os
   seus nomes já dizem o que são, e duas instituições na mesma cidade (a prisão central e a
   prisão auxiliar de Leuven) distinguem-se pelo nome.
8. **As ligações são campos, nunca strings derivadas.** Um justice de paix tem um campo `canton`;
   um cantão lista `{ municipality }`; um arrondissement tem um `judicialArea`. Cada um contém o
   id do registo para que aponta, e o campo tem o nome do conjunto de dados para onde aponta.

Todas estas regras são garantidas por testes (`test/ids.test.ts`) e pelos
[JSON Schemas](./schema), que listam os ids válidos, por isso uma ligação pendente falha a
validação.

## Os ids {#the-ids}

| Conjunto de dados   | Exemplos                                                                                                                  | Regra                         |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Áreas judiciais     | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                                                                           | Nome local                    |
| Arrondissements     | `oost-vlaanderen`, `brabant-wallon`, `eupen`                                                                              | Nome local                    |
| Cantões             | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1`                                                  | Nome local + número           |
| Limites dos cantões | `gent-1`: um limite por cantão, com o id do cantão, e `canton` como ligação                                               | O id do cantão                |
| Municípios          | `44021`, `21004`                                                                                                          | Código REFNIS                 |
| Províncias          | `10000`, `40000`                                                                                                          | Código REFNIS                 |
| Regiões             | `02000`, `03000`, `04000`                                                                                                 | Código REFNIS                 |
| Códigos postais     | `9000-44021`, `1040-21005`                                                                                                | Código postal + código REFNIS |
| Tribunais           | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`, `police-court-brussel-fr`, `police-court-eupen-sankt-vith` | Tipo + local                  |
| Prisões             | `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                               | Nome local                    |
| Maisons de justice  | `justitiehuis-gent`, `maison-justice-arlon`                                                                               | Nome local                    |
| Taxas de juro       | `legal`, `commercial`                                                                                                     | Chaves fixas                  |

## Porquê estas escolhas {#why-these-choices}

**Porquê kebab-case?** Os ids acabam em URLs (`/cantons/gent-1`), nomes de ficheiros, classes
CSS, chaves de bases de dados e linhas de log. As minúsculas evitam colisões em sistemas que não
distinguem maiúsculas (os sistemas de ficheiros do macOS e do Windows, muitas collations de bases
de dados): `Gent1` e `gent1` seriam dois ids nos dados e um só ficheiro no disco. Os hífenes
mantêm as fronteiras entre palavras legíveis sem maiúsculas, e o conjunto de caracteres não
precisa de escaping em lado nenhum.

**Porquê ids legíveis em vez de números ou UUIDs?** Um conjunto de dados de referência é lido por
pessoas: `justice-of-the-peace-gent-1` numa linha de base de dados ou numa mensagem de erro diz o
que é. Os ids são tão estáveis como seriam números, porque só mudam quando a lei altera aquilo que
designam (veja abaixo), e nesse caso um novo id é o resultado certo.

**Porquê a língua local e não o inglês?** Há nomes ingleses para um punhado de locais (Ghent,
Antwerp, Liege) e não para os 162 cantões, por isso ids em inglês significariam duas regras. O
nome local é também o que a própria instituição usa, e é o que consta dos textos oficiais.

**Porquê códigos oficiais?** O REFNIS é o que usam o Statbel, as regiões e quase todos os
conjuntos de dados belgas. Com o código como id, cruzar qualquer um deles com cantões e tribunais
não precisa de tabela de correspondência.

**Porquê dois códigos para um código postal?** Um código postal por si só não designa um
registo: `1040` pertence a Brussel e a Etterbeek, e cada par é um registo próprio com a sua
própria validade. O par de códigos oficiais, `1040-21005`, é único e mantém-se até que a tabela
do Statbel altere o par, que é exatamente quando um novo registo é o certo. O município é também
um campo (`municipality`), como pede a regra 8: o id é uma chave, não algo para partir.

**Porquê o `type` nos ids dos tribunais?** Num mesmo local há vários tribunais, e os tipos de
tribunal vão aumentar (politierechtbanken / tribunaux de police, arbeidsrechtbanken / tribunaux
du travail, rechtbanken van eerste aanleg / tribunaux de première instance…). Os próprios campos
de um tribunal dizem o que ele é; o id só precisa de ser único e reconhecível, e o tipo faz as
duas coisas.

**Porquê não os códigos oficiais dos tribunais?** Os tribunais têm dois códigos oficiais, e
nenhum cobre todos os tribunais. Os códigos ECLI (`HBGNT` para o hof van beroep de Gent) existem
por tribunal e por língua, não por divisão, e nenhum aparece nas decisões publicadas dos justices
de paix. Os números de empresa (KBO) pertencem ao FOD Justitie / SPF Justice; as suas unidades
de estabelecimento seguem edifícios, não tribunais, e mudam quando um tribunal se muda. Uma regra
válida para todos os registos é melhor do que duas regras, por isso os códigos ECLI são um campo
(`ecli`), e o id segue a regra 6.

**Porquê ligações explícitas?** O esquema antigo construía o id de um tribunal concatenando
`Vredegerecht` e o id do cantão. Isso esconde uma relação no formato de uma string, que se parte
no momento em que um tribunal serve dois cantões ou um nome muda. Um campo `canton` é verificado
pelo schema e pelos testes, e pode ser seguido nos dois sentidos.

## Em TypeScript {#in-typescript}

Cada conjunto de dados tem um tipo de id gerado (`CantonId`, `CourtId`, `MunicipalityId`,
`ProvinceId`, `RegionId`, `ArrondissementId`, `JudicialAreaId`, `PrisonId`, `HouseOfJusticeId`,
`PostalCodeId`), regenerado a partir dos dados por `pnpm build:ids`:

```ts
import { getCanton, type CantonId } from 'belgica'

getCanton('gent-1') // Canton: um id conhecido encontra sempre o seu registo
getCanton(userInput) // Canton | undefined: qualquer outra string pode não encontrar

const id: CantonId = 'gent1' // erro de compilação: não é um id de cantão
```

Use os tipos de id para os valores que guarda, para que uma gralha ou um id removido seja
detetado quando atualizar.

## Quando a lei altera um id {#when-the-law-changes-an-id}

Cantões e municípios mudam mesmo: houve fusões de municípios em 2019 e 2025, e há leis que
redesenham cantões. Os registos têm um período de validade (`validFrom`, `validTo`), por isso uma
alteração acrescenta histórico em vez de o apagar:

1. O registo antigo fica, com um `validTo`; o novo recebe um novo id e um `validFrom`. Um id
   nunca é reutilizado para outra coisa, por isso um id guardado há anos continua a encontrar
   aquilo que significava.
2. Sem um dia, as pesquisas respondem para hoje: uma pesquisa por id devolve a versão que se
   aplica hoje (a última, para um registo que terminou), e listas como
   `getCantonsForMunicipality` só o que se aplica hoje. Com `{ on }` ambas respondem para esse
   dia.
3. O changelog lista cada novo id e os ids que substitui.

Uma simples mudança de nome, como uma correção ortográfica, não altera o id. O histórico anterior
a 1 de janeiro de 2025 ainda não está nos dados
([#27](https://github.com/pieterjanscheir/belgica/issues/27)): uma pesquisa para um dia anterior
lança um `RangeError` em vez de responder com o mapa de hoje.

## Os ids são opacos {#ids-are-opaque}

Um id é uma chave, não um formato. `court-of-first-instance-luxembourg-marche-en-famenne` não pode
ser decomposto de volta em tipo, local e divisão, porque o tipo, o local e o sufixo de língua usam
todos o mesmo hífen. Não faça parsing de ids: cada parte de um id é também um campo (`type`,
`court`, `canton`, `arrondissement`), e são os campos que os schemas e os testes verificam.

## Estabilidade {#stability}

Os ids são API pública. Acrescentar registos é uma versão minor, corrigir um valor um patch, e
remover ou renomear um id uma versão major. A versão 0.3.0 substitui os ids anteriores em
PascalCase (`VredegerechtGent1`, `EastFlanders`) por este esquema antes de o pacote ter
utilizadores; o [changelog](./changelog) lista a correspondência.

A promessa é verificada, não apenas feita. `ids.lock.json` lista cada id que o pacote já
publicou, por conjunto de dados; `pnpm generate` acrescenta-lhe os novos ids e nunca remove
nenhum, e `test/ids.test.ts` falha quando um id bloqueado falta nos dados. Assim, um scraper que
lê uma página com novo título, uma lista de cantões regenerada ou uma edição à mão não pode
eliminar nem renomear um id sem que se dê por isso: o pull request semanal de dados falha, e uma
pessoa associa o novo nome ao id existente no parser, ou termina o registo com um `validTo`.
Retirar um id do lock é um ato deliberado, para uma versão major, com o id e o seu substituto no
changelog.
