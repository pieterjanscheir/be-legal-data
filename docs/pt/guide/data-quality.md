# Qualidade e atualidade dos dados {#data-quality-freshness}

Os dados jurídicos de referência ficam desatualizados sem fazer barulho: é publicada uma nova taxa
de juro, um tribunal muda de instalações, uma lei funde dois cantões. Esta página explica como o
pacote se mantém a par, e até que ponto pode confiar em cada conjunto de dados.

## De onde vem cada conjunto de dados {#where-each-dataset-comes-from}

| Conjunto de dados                   | Fonte                                                          | Como é construído                      | Muda quando                                                    | Revisão  |
| ----------------------------------- | -------------------------------------------------------------- | -------------------------------------- | -------------------------------------------------------------- | -------- |
| Áreas judiciais, arrondissements    | Gerechtelijk Wetboek / Code judiciaire, anexo art. 4–5         | À mão                                  | Uma lei redesenha o mapa judicial (raro; a última vez em 2014) | 24 meses |
| Cantões                             | Gerechtelijk Wetboek / Code judiciaire, anexo art. 1 (nl + fr) | Gerado: `pnpm build:cantons`           | Uma lei altera o anexo; municípios fundem-se                   | 12 meses |
| Limites dos cantões                 | NGI (geo.be)                                                   | Semanal: snapshots + `pnpm build:data` | O NGI publica uma nova versão                                  | Semanal  |
| Municípios                          | Dados abertos do Statbel                                       | Gerado: `pnpm build:cantons`           | Municípios fundem-se (2019, 2025)                              | 12 meses |
| Regiões, províncias                 | Lista de códigos REFNIS do Statbel                             | Semanal: snapshots + `pnpm build:data` | O Statbel altera o seu registo (a última vez em 1995)          | Semanal  |
| Tribunais                           | tribunaux-rechtbanken.be                                       | Semanal: snapshots + `pnpm build:data` | Um tribunal muda de instalações, de contactos ou de horário    | Semanal  |
| Prisões                             | justitie.belgium.be                                            | Semanal: snapshots + `pnpm build:data` | Uma prisão abre, fecha ou muda de contactos                    | Semanal  |
| Maisons de justice / justitiehuizen | vlaanderen.be, maisonsdejustice.be                             | Semanal: snapshots + `pnpm build:data` | Uma maison de justice muda de instalações ou de contactos      | Semanal  |
| Códigos postais                     | Tabela de conversão do Statbel                                 | Semanal: snapshots + `pnpm build:data` | O Statbel publica uma nova tabela (fusões, novos códigos)      | Semanal  |
| Taxas de juro                       | FOD Financiën, Belgisch Staatsblad                             | À mão                                  | Todos os anos (legal) e todos os semestres (comercial)         | 6 meses  |

Os conjuntos de dados gerados nunca são editados à mão. `pnpm build:cantons` faz o parsing do
texto oficial e recusa-se a escrever o que quer que seja, a menos que as versões neerlandesa e
francesa coincidam e todos os municípios estejam cobertos; `pnpm build:data` recusa-se quando uma
página não pode ser situada, quando um cantão não tem tribunal ou quando um cantão não tem limite
no ficheiro do NGI.

## Como os dados são construídos {#how-the-data-is-built}

```
official site ──fetch──> snapshots (sources branch) ──parse──> data/*.json ──> pull request
```

1. **Obter.** Todas as segundas-feiras o [workflow sources](https://github.com/pieterjanscheir/belgica/actions/workflows/sources.yml)
   vai buscar todas as páginas das fontes (`scripts/sources`), com cortesia: um pedido por
   segundo por site, com um user agent que identifica o projeto. Guarda cada página no branch
   `sources`, com um índice do que foi obtido, quando, e um hash do seu conteúdo. Uma página só
   volta a ser guardada quando o seu conteúdo muda, por isso o histórico do branch mostra o que
   mudou em que dia. Uma página que falha (um erro do servidor, um 404) mantém o seu último
   snapshot bom e interrompe a execução, o que abre uma issue: os dados nunca são reconstruídos a
   partir de uma imagem incompleta. Uma página para a qual a fonte deixou de ter link é retirada
   dos snapshots; o seu registo fica nos dados, retirado com um `validTo` (o dia anterior à
   verificação que não a encontrou), de modo que o seu id continua a funcionar e uma pesquisa para
   um dia anterior ainda o encontra. Uma página que aparece recebe um registo com um `validFrom`.
2. **Fazer o parsing.** `pnpm build:data` lê os snapshots (`scripts/parse`) e escreve os
   tribunais, as prisões, as maisons de justice e os limites dos cantões. Indica o que não
   consegue ler, e falha quando uma página não pode ser situada.
3. **Testar.** O workflow verifica os tipos e corre os testes sobre os novos dados.
4. **Rever.** Quando os dados mudaram, abre ou atualiza um único pull request com o diff e a
   lista de valores ilegíveis. Uma pessoa verifica-o face às fontes e faz o merge.

Para o correr você mesmo: `pnpm fetch:sources` (escreve `.sources/`), depois `pnpm build:data`.

Os cantões e os municípios são reconstruídos à mão com `pnpm build:cantons`: o site do Belgisch
Staatsblad / Moniteur belge (o jornal oficial belga) recusa os servidores do GitHub
([#52](https://github.com/pieterjanscheir/belgica/issues/52)).

## Verificações automáticas {#automatic-checks}

### Em cada alteração (CI) {#on-every-change-ci}

- **Validação de schema**: cada ficheiro de dados corresponde ao seu [JSON Schema](./schema).
- **Integridade**: os ids são únicos e bem formados; cada referência (arrondissement, cantão,
  município, tribunal, limite) aponta para um registo que existe; cada cantão tem um limite,
  GeoJSON válido dentro da Bélgica que soma a área do país sem sobreposições; cada município está
  em exatamente um cantão ou dividido por vários; cada cantão fica dentro das províncias do seu
  arrondissement; cada cantão tem exatamente um justice de paix / vredegerecht; cada divisão tem o
  tipo e a área do seu tribunal; cada tipo de tribunal tem o número de tribunais que a lei fixa;
  cada cantão está sob um tribunal de cada tipo (um por língua em Bruxelas), e os cantões de um
  tribunal ficam no seu arrondissement e na sua área judicial.
- **Parsers**: testados de ponta a ponta em cópias reduzidas de páginas reais
  (`test/fixtures/sources`), e cada leitor (números de telefone, IBANs, moradas, horários) nas
  formas vistas nas fontes e naquilo que tem de recusar.
- **Taxas de juro**: os períodos estão ordenados, nunca se sobrepõem e não deixam lacunas; a
  taxa legal corre por ano civil e a taxa comercial por semestre; a taxa da regra da data do
  contrato de 2013–2015 só aparece nesse intervalo.
- **Dados de contacto**: cada IBAN passa o seu dígito de controlo ISO 13616, os números de
  telefone são números belgas E.164, os endereços de e-mail estão em minúsculas, e os horários
  respeitam a sintaxe `opening_hours`.
- **Código**: TypeScript estrito (incluindo acesso a índices verificado e propriedades opcionais
  exatas), ESLint com regras conscientes dos tipos, Prettier, e 100 % de cobertura de testes de
  `src/`.
- **Empacotamento**: o pacote construído carrega com `import` e com `require()`, a partir de
  cada entry point, em Node 22.12, 22, 24 e 26; `publint` e `arethetypeswrong` verificam os
  `exports` e as declarações de tipos.

### Todas as semanas (agendado) {#every-week-scheduled}

O [workflow freshness](https://github.com/pieterjanscheir/belgica/actions/workflows/freshness.yml)
corre todas as segundas-feiras e abre uma issue com a etiqueta
[`data-freshness`](https://github.com/pieterjanscheir/belgica/issues?q=label%3Adata-freshness)
quando encontra alguma coisa:

- **Taxas em falta**: nenhuma taxa legal ou comercial para hoje, ou nenhuma taxa comercial para
  as duas semanas seguintes (o FOD Financiën / SPF Finances publica-a antes do início do
  semestre).
- **Revisões em atraso**: a data `lastReviewed` de um conjunto de dados em `datapackage.json` é
  mais antiga do que o seu `reviewEveryMonths`.
- **Fontes mortas**: um URL de fonte oficial em `datapackage.json` deixou de responder.

Corra-as você mesmo com `pnpm test:freshness` (acrescente `FRESHNESS_ONLINE=1` para verificar os
URLs).

## Como ler um valor {#how-to-read-a-value}

- **Ausente não é zero.** `getInterestRate` devolve `null` para um dia sem taxa registada, em vez
  de adivinhar; um campo que a fonte não fornece (a morada de um tribunal, horários legíveis por
  máquina) falta em vez de ser preenchido. Trate os dois casos.
- **Cedo demais é um erro.** Uma pesquisa para um dia anterior à cobertura de um conjunto de
  dados lança um `RangeError`: os dados não sabem responder, e a resposta de hoje pareceria a
  certa.
- **Os dados de contacto são os menos estáveis.** Números de telefone, endereços de e-mail e
  horários mudam sem aviso. Cada registo indica de que páginas foi lido e quando (`sources`);
  consulte a página do tribunal (`website`) quando for importante.
- **O texto legal prevalece.** Nos municípios divididos, o `territory` do cantão é o próprio
  texto da lei, literalmente. Quando um resumo, ou o [limite](/pt/data/canton-boundaries) do NGI,
  e o texto discordam, é o texto que está certo.

## Comunicar um erro {#reporting-a-mistake}

[Abra uma correção de dados](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)
com o id do registo e um link para a fonte oficial. As correções são publicadas como versões
patch.
