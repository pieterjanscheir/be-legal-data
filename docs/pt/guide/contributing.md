# Contribuir {#contributing}

## Atualizar dados {#updating-data}

Os tribunais, as prisões, as maisons de justice / justitiehuizen e os limites dos cantões são
construídos a partir das fontes oficiais todas as semanas ([como](./data-quality#how-the-data-is-built)):
não os edite à mão. Corrija o parser em `scripts/parse` ou, se a própria fonte estiver errada,
comunique-o ao tribunal. O pull request semanal é revisto como qualquer outro: compare o diff com
as fontes antes de fazer o merge.

Para os conjuntos de dados mantidos à mão (áreas judiciais, arrondissements, taxas de juro):

1. Edite o JSON em `data/`. Mantenha os ids existentes: os projetos guardam-nos.
2. Atualize o `lastReviewed` do conjunto de dados em `datapackage.json` se o verificou face às
   suas fontes.
3. `pnpm check`: regenera os tipos de id e os schemas, verifica tipos, lint e formatação, faz a
   build, corre os testes com cobertura e o lint do pacote. Falha quando os ficheiros gerados não
   estão incluídos no commit.
4. Acrescente uma linha ao `CHANGELOG.md` em Unreleased, e faça commit (incluindo `schema/`,
   `src/ids.generated.ts` e `ids.lock.json`). O resultado da build (`dist/`) não vai para o
   commit: é construído em cada release e publicado no npm.

Um id que foi publicado permanece: `ids.lock.json` lista-os todos e os testes falham quando um
falta nos dados. Se uma fonte mudou o nome de um registo, associe o novo nome ao id existente no
parser; se o registo terminou, mantenha-o com um `validTo`. Veja
[identificadores](./identifiers#stability).

### Cantões e municípios {#cantons-and-municipalities}

`data/cantons.json` e `data/municipalities.json` são gerados; não os edite à mão. Corra
`pnpm build:cantons` (precisa de acesso à rede e de `unzip`). Lê:

- o anexo ao Gerechtelijk Wetboek / Code judiciaire, "Gebiedsomschrijving en zetel van hoven en
  rechtbanken"
  ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  em neerlandês e francês;
- o ficheiro de população por município do Statbel, para os municípios atuais e os códigos
  REFNIS.

Faz o parsing dos textos neerlandês e francês em separado e recusa-se a escrever o que quer que
seja, a menos que coincidam e cada município esteja coberto exatamente uma vez (ou dividido por
vários cantões). Os exónimos que o anexo usa mas o Statbel não (`Gembloers`, `Saint-Nicolas`, …),
as gralhas no anexo e as menções de limites que não consegue distinguir estão listados no topo do
script.

Volte a corrê-lo depois de uma lei alterar o anexo ou de municípios se fundirem. Os ids dos
cantões seguem a língua local (neerlandês na Flandres e em Bruxelas, francês na Valónia, alemão
na zona de Eupen); o justice de paix / vredegerecht do cantão `x` tem o id
`justice-of-the-peace-x` e liga-se a ele através do seu campo `canton`.

### Conjuntos de dados obtidos por scraping {#scraped-datasets}

```bash
pnpm fetch:sources            # todas as fontes para .sources/ (cerca de 20 minutos, com cortesia)
pnpm fetch:sources courts     # ou uma só fonte
pnpm build:data               # reconstrói os tribunais, prisões, maisons de justice, códigos postais, regiões e províncias a partir de .sources/
```

Os limites dos cantões vêm do GeoPackage do NGI (fonte `ngi`), lido com o SQLite do próprio
Node; quando o NGI muda o nome de um cantão, associe o seu código ao id em `CANTON_ALIASES` em
`scripts/parse/boundaries.ts`.

Ou faça checkout dos snapshots mais recentes em vez de os ir buscar:
`git worktree add .sources origin/sources`.

Uma fonte é um percurso em `scripts/sources/catalog.ts`; um parser lê os seus snapshots em
`scripts/parse`. Quando um site muda o seu markup, os testes dos parsers em `test/parse` (em
cópias reduzidas de páginas reais em `test/fixtures/sources`) mostram o que se partiu.

### Novas taxas de juro {#new-interest-rates}

- **Comercial**: o FOD Financiën / SPF Finances publica a taxa por semestre. Acrescente um
  período com `from`, `to`, `rate`, e a data do Staatsblad em `note`.
- **Legal**: publicada por ano civil. Acrescente um período para o ano.

## Acrescentar um conjunto de dados {#adding-a-dataset}

Todos os conjuntos de dados recebem o mesmo tratamento, para que os utilizadores possam contar
com ele:

1. **Dados**: `data/<name>.json`, um array de registos. Cada valor vem de uma fonte oficial.
2. **Ids**: siga as [regras dos identificadores](./identifiers): um código oficial quando existe,
   caso contrário kebab-case em minúsculas a partir do nome na língua local (`scripts/id.ts`).
3. **Ligações, não cópias**: refira-se a arrondissements, cantões e municípios pelo id, e
   reutilize os tipos partilhados (`Translated`, `Address`, `Contact`, `SourceRef`).
4. **Fontes**: um `sources: [{ url, retrieved }]` em cada registo, e uma entrada em
   `datapackage.json` com as fontes do conjunto de dados, a licença, `lastReviewed` e
   `reviewEveryMonths`.
5. **Tipos e funções auxiliares**: `src/<name>.ts`, exportado a partir de `src/index.ts`, mais um
   entry point em `tsup.config.ts` e nos `exports` do `package.json`.
6. **Schema**: acrescente o tipo do ficheiro a `scripts/schema-types.ts` e a
   `scripts/build-schemas.ts`.
7. **Fonte e parser**: um percurso em `scripts/sources/catalog.ts` que vai buscar as páginas
   oficiais, e um parser em `scripts/parse` que constrói o ficheiro a partir dos snapshots, com
   fixtures e testes. Lê só o que consegue ler com certeza e indica o resto.
8. **Testes**: ids únicos, referências que se resolvem, e a contagem que a fonte oficial dá.
9. **Documentação**: uma página em `docs/data/` com a sua utilidade, a fonte e as atualizações, e
   uma tabela de campos.

## Verificações {#checks}

| Comando                     | O que faz                                                                                                                                                                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                | Tudo o que a CI corre: `generate`, `typecheck`, `lint`, `build`, `test:coverage`, `test:package`, `lint:package`, e uma verificação de que os ficheiros gerados estão no commit |
| `pnpm test`                 | Testes unitários, de integridade, de schema e de tipos sobre o código-fonte (sem build)                                                                                         |
| `pnpm test:package`         | Smoke tests do pacote construído com `import` e `require()`: corra `pnpm build` primeiro                                                                                        |
| `pnpm test:coverage`        | O mesmo, falhando abaixo de 100 % de cobertura de `src/`                                                                                                                        |
| `pnpm lint` / `pnpm format` | ESLint e Prettier: verificar / corrigir                                                                                                                                         |
| `pnpm generate`             | Regenera `src/ids.generated.ts` (tipos de id) e `schema/` a partir dos dados e dos tipos, e acrescenta os novos ids a `ids.lock.json`                                           |
| `pnpm lint:package`         | `publint` e `arethetypeswrong` sobre o pacote empacotado                                                                                                                        |
| `pnpm test:freshness`       | Verificações baseadas em datas: taxas em falta, revisões em atraso. Não faz parte de `check`; `FRESHNESS_ONLINE=1` verifica também os URLs das fontes                           |
| `pnpm fetch:sources`        | Vai buscar as fontes oficiais para `.sources/`                                                                                                                                  |
| `pnpm build:data`           | Reconstrói os tribunais, prisões, maisons de justice, códigos postais, regiões, províncias e limites dos cantões a partir de `.sources/`                                        |
| `pnpm build:csv`            | Escreve os dados como tabelas CSV em `csv/`                                                                                                                                     |

## Publicar uma release {#releasing}

1. Mova as entradas Unreleased do `CHANGELOG.md` para a nova versão.
2. Aumente a `version` em `package.json` e faça commit.
3. Crie a tag e faça push: `git tag v0.3.0 && git push && git push --tags`.

O workflow de release corre `pnpm check`, publica a tag no npm com provenance, e cria uma release
no GitHub com os dados, os schemas e as tabelas CSV em anexo. A tag tem de corresponder à
`version`.

## Este site {#this-website}

O site vive em `docs/` e é construído com [VitePress](https://vitepress.dev). As tabelas
interativas importam o próprio `src/` e `data/` do pacote, por isso mostram sempre os dados que
estão no repositório.

```bash
pnpm docs:dev      # servidor local com hot reload
pnpm docs:build    # site estático em docs/.vitepress/dist
pnpm docs:preview  # serve o site construído
```

Cada push para `main` publica-o no GitHub Pages. A CI constrói-o em cada pull request, por isso
uma página partida é detetada antes do merge.

### Traduções {#translations}

As páginas em inglês em `docs/` são a fonte de verdade. Cada uma das outras línguas tem a mesma
árvore na sua própria pasta: neerlandês (`docs/nl/`) e francês (`docs/fr/`), e alemão, espanhol,
italiano, português, polaco, turco, árabe, ucraniano, chinês e japonês (`docs/de/`, `docs/es/`,
e assim por diante). São traduções da página inglesa e são atualizadas depois de esta mudar.
Quando alterar uma página inglesa, altere também a mesma página em `docs/nl/` e `docs/fr/`, ou
indique no pull request que as traduções estão atrasadas; as outras línguas podem ficar uma
release atrás. As palavras do tema e dos componentes interativos nessas outras línguas estão em
`docs/.vitepress/locales/`.

O código, os ids, os nomes dos campos e os nomes oficiais ficam como estão em todas as línguas, e
cada título mantém a âncora inglesa (`## Heading {#english-anchor}`) para que as ligações
cruzadas e o seletor de idioma continuem a funcionar. Uma instituição ou um termo jurídico belga
mantém o seu nome oficial em neerlandês ou francês (ou em alemão, quando a Bélgica publica um) em
vez de uma tradução inventada: uma página em chinês diz vredegerecht / justice de paix, não uma
palavra inventada para isso. O changelog é mantido apenas em inglês.
