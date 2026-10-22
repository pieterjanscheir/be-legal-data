# Decisões de design {#design-decisions}

O pacote foi redesenhado antes de ter os primeiros utilizadores, por isso cada escolha pôde ser
feita pelo seu mérito e não por compatibilidade. Esta página regista cada decisão, porque foi
tomada e o que dela decorre. Uma nova decisão recebe uma nova entrada; uma decisão revertida é
marcada, não apagada.

## 1. Os dados são o produto; o código é uma conveniência {#_1-the-data-is-the-product-the-code-is-a-convenience}

**Decisão.** As fontes oficiais são a verdade; os ficheiros JSON em `data/` são construídos a
partir delas e são o produto. Podem ser usados sem nada do TypeScript: a partir de Python, de uma
folha de cálculo (as releases incluem tabelas CSV) ou do `jq`. A estrutura de cada ficheiro é
definida uma única vez, pelos tipos TypeScript, e publicada como um JSON Schema gerado a partir
deles; a CI falha quando os tipos, os schemas e os dados discordam. A biblioteca acrescenta
tipos, índices e funções auxiliares, e nada nela é necessário para compreender os dados.

**Porquê.** Os dados de referência sobrevivem ao código à sua volta, e a maioria dos utilizadores
de dados jurídicos belgas não são projetos JavaScript.

**Por isso.** Cada ficheiro tem um [JSON Schema](./schema) e uma entrada em `datapackage.json`
com as suas fontes e licença. Os nomes e valores dos campos são explicados na documentação, não
só no código.

## 2. Os factos jurídicos são dados, nunca calculados {#_2-legal-facts-are-data-never-computed}

**Decisão.** Tudo o que tem significado jurídico (o nome de um tribunal, o território de um
cantão, uma taxa) vem textualmente de uma fonte oficial e é armazenado. O código pode formatar ou
procurar; não pode construir um facto jurídico.

**Porquê.** Código que monta um facto pode errar de formas que os testes não apanham: os nomes
franceses dos tribunais que uma versão anterior de `formatCourtName` construía estavam errados
(`Tribunal de paix …`, quando os próprios tribunais se chamam `Justice de paix …`;
[#10](https://github.com/pieterjanscheir/belgica/issues/10)). Um valor armazenado pode ser
verificado face à sua fonte.

**Por isso.** Os nomes dos tribunais são armazenados tal como cada tribunal os publica, em todas
as línguas em que publica, e `formatCourtName` desapareceu. Os territórios dos cantões continuam
a ser texto legal literal, com a sua base legal como link ELI. Onde falta uma fonte, falta o
campo: nada é preenchido por adivinhação. O mesmo vale para o parsing: um texto de horário com
uma nota lá dentro, um número de telefone sem o indicativo de zona ou uma morada escrita como
frase fica de fora, não é adivinhado.

## 3. Uma única regra para identificadores {#_3-one-identifier-rule}

**Decisão.** Um código oficial quando há um que cubra todos os registos; caso contrário,
kebab-case em minúsculas a partir do nome na língua local; os tribunais são `type` + local. Os
códigos oficiais que cobrem só alguns registos (ECLI, OVO) são campos. Veja
[identificadores](./identifiers).

## 4. As ligações são campos {#_4-links-are-fields}

**Decisão.** Os registos referem-se uns aos outros apenas através de campos que contêm o id do
outro registo, com o nome do conjunto de dados para onde apontam (`arrondissement`, `canton`,
`municipality`). Nenhum id é construído a partir de outro.

**Porquê.** Uma relação escondida no formato de uma string parte-se sem aviso quando um dos lados
muda. Um campo é validado pelo schema (que lista os ids válidos) e pelos testes.

**Por isso.** A morada de um tribunal, de uma prisão ou de uma maison de justice / justitiehuis
liga-se ao seu município da mesma maneira (`address.municipality`), através do código postal na
tabela de conversão do Statbel, nunca através do nome da cidade
([#28](https://github.com/pieterjanscheir/belgica/issues/28)); um registo de código postal
liga-se ao seu município em vez de copiar o seu nome.

## 5. Valores canónicos, apresentação no código {#_5-canonical-values-presentation-in-code}

**Decisão.** Cada valor é armazenado numa única forma canónica e standard, e a formatação para
pessoas é uma função:

| Valor                  | Armazenado como                 | Standard                         |
| ---------------------- | ------------------------------- | -------------------------------- |
| Dia                    | `2024-06-15`                    | ISO 8601                         |
| Telefone               | `+3253820701`                   | E.164                            |
| IBAN                   | `BE73679200844560`              | Formato eletrónico ISO 13616     |
| Horário de atendimento | `Mo-Fr 08:30-12:30,13:30-16:00` | `opening_hours` do OpenStreetMap |
| Língua                 | chaves `nl`, `fr`, `de`         | ISO 639-1                        |

**Porquê.** Uma forma por valor torna os valores comparáveis, validáveis (o dígito de controlo do
IBAN é testado) e utilizáveis por outro software (links `tel:`, sistemas de pagamento, parsers de
horários). As convenções de apresentação variam com o contexto; os dados não deviam variar.

## 6. Proveniência em cada registo {#_6-provenance-on-every-record}

**Decisão.** Cada conjunto de dados indica as suas fontes, licença e data de revisão em
`datapackage.json`; cada registo obtido por scraping indica as páginas de onde foi lido e o dia
em que o seu conteúdo foi visto pela primeira vez (`sources: [{ url, retrieved }]`).

**Porquê.** "De onde vem isto, e que idade tem?" é a primeira pergunta perante dados jurídicos.

## 7. Os dados são construídos por máquinas, a partir de snapshots guardados {#_7-the-data-is-built-by-machines-from-kept-snapshots}

**Decisão.** Todas as semanas um workflow vai buscar as fontes oficiais, guarda as páginas como
snapshots no branch `sources`, reconstrói os dados a partir delas com os parsers em
`scripts/parse`, testa-os e abre um pull request quando mudaram. Nada é introduzido à mão. Um job
semanal separado verifica taxas de juro em falta, revisões em atraso e fontes mortas.

**Porquê.** Os dados jurídicos ficam desatualizados sem aviso; as pessoas esquecem-se, os
agendamentos não. Dados introduzidos à mão não podem ser verificados nem refeitos; um parser pode
ser testado, e os snapshots mostram exatamente o que a fonte dizia nesse dia. O pull request
mantém uma pessoa no circuito: os dados em `main` nunca mudam sem revisão.

**Por isso.** Os snapshots vivem no seu próprio branch, para que o histórico do pacote não fique
sobrecarregado com megabytes de HTML. Os parsers são testados com cópias reduzidas de páginas
reais. Uma página que o parser não consegue situar interrompe a build em vez de produzir um
registo meio certo. Duas fontes recusam os servidores do GitHub (ejustice, police.be); são
obtidas a partir de uma máquina normal
([#52](https://github.com/pieterjanscheir/belgica/issues/52)).

## 8. Distribuição: só ESM, Node 22.12+, construído na release {#_8-distribution-esm-only-node-22-12-built-on-release}

**Decisão.** O pacote é só ESM, requer Node 22.12 ou posterior, e o resultado da build não é
incluído nos commits: é construído e publicado no npm pelo workflow de release, com provenance.

**Porquê.** O Node 18 e o 20 chegaram ao fim de vida. A partir do Node 22.12, `require()` carrega
ESM, por isso uma build CommonJS separada só acrescentaria uma segunda cópia dos dados (o
dual-package hazard) e mais coisas para testar. Um resultado de build incluído nos commits fica
desatualizado e já estragou atualizações automáticas de dependências.

**Por isso.** `import` e `require()` funcionam ambos, testados em Node 22.12, 22, 24 e 26. Cada
conjunto de dados tem o seu próprio entry point, por isso uma aplicação que só precisa das taxas
de juro carrega alguns kilobytes, e não os tribunais e o texto legal de todos os cantões (a
[página de primeiros passos](./getting-started#import-only-what-you-need) mede cada um a partir
da build).

## 9. Tipos que transportam as garantias dos dados {#_9-types-that-carry-the-data-s-guarantees}

**Decisão.** Os ids são tipos união gerados; os conjuntos de dados são `readonly`; as pesquisas
com um id conhecido devolvem o registo, não `record | undefined`; os vocabulários fechados (tipos
de tribunal, kinds, tipos de contacto) são uniões. As etiquetas dos contactos são texto livre, tal
como o tribunal as publica: uma lista fechada significaria mapear centenas de nomes de secretarias
para meia dúzia de palavras, o que é adivinhar.

**Porquê.** Os erros aparecem enquanto se escreve o código e não em produção, e os tipos
documentam os dados.

## 10. Barreiras de qualidade {#_10-quality-gates}

**Decisão.** Cada alteração passa por: TypeScript estrito (incluindo `noUncheckedIndexedAccess`
e `exactOptionalPropertyTypes`), ESLint com regras estritas conscientes dos tipos, Prettier,
100 % de cobertura de testes de `src/`, validação JSON Schema de todos os dados, testes de
integridade (ids, ligações, contagens, períodos), e `publint` + `arethetypeswrong` no pacote
empacotado.

**Porquê.** Um pacote de referência só vale a pena como dependência se for mais fiável do que
copiar os dados à mão.

## 11. O tempo faz parte do modelo {#_11-time-is-part-of-the-model}

**Decisão.** Os registos têm um período de validade (`validFrom`, `validTo`, ambos os dias
incluídos), cada conjunto de dados indica a partir de que dia descreve a situação
(`territoryCoverage`, e `temporalCoverage` em `datapackage.json`), e as pesquisas aceitam um dia
opcional: `getCanton(id, { on })`, `getCantonsForMunicipality(refnis, { on })`. Um dia anterior
à cobertura lança um `RangeError`.

**Porquê.** As questões jurídicas dizem respeito a um dia: que tribunal era competente quando a
citação foi notificada, que taxa se aplicava quando a fatura venceu. Cantões, municípios e
tribunais mudam; um modelo que só conhece "agora" responde a perguntas sobre o passado com o mapa
de hoje, e parece certo enquanto o faz. Acrescentar o tempo mais tarde mudaria todos os ids e
pesquisas, por isso está no modelo antes de o histórico estar nos dados
([#27](https://github.com/pieterjanscheir/belgica/issues/27)).

**Por isso.** As taxas de juro já têm períodos. Uma pesquisa por id sem dia devolve a versão de
hoje, por isso os ids conhecidos mantêm o seu tipo não-`undefined`; com um dia pode não
encontrar nada. Todos os conjuntos de dados têm o período, não só o território: um registo obtido
por scraping que a fonte deixa de listar é retirado com um `validTo` em vez de ser apagado
(`scripts/parse/retire.ts`), de modo que um id, uma vez publicado, permanece, e um tribunal que
fecha continua a ser o tribunal que a citação do ano passado indicava.

## 12. As releases transportam os dados, não só o pacote {#_12-releases-carry-the-data-not-only-the-package}

**Decisão.** Cada release no GitHub tem os dados em JSON e em tabelas CSV, com os schemas e o
`datapackage.json`, num único zip. O npm é uma forma de obter os dados, não a única.

**Porquê.** As pessoas que mais precisam de dados jurídicos belgas de referência trabalham em
folhas de cálculo e noutras linguagens, não em JavaScript.

## 13. A geometria é uma segunda fonte, e o texto prevalece {#_13-geometry-is-a-second-source-and-the-text-wins}

**Decisão.** Os limites dos cantões são a digitalização, feita pelo Nationaal Geografisch
Instituut / Institut géographique national (NGI), do anexo ao Gerechtelijk Wetboek / Code
judiciaire, tal como publicada (vértice a vértice, sem simplificação, coordenadas ao centímetro)
e associada aos cantões pelo nome nas duas línguas, com uma tabela explícita de aliases para os
restantes. O texto `territory` do cantão continua a ser a lei: onde a geometria e o texto
discordam, o texto prevalece. A geometria tem o seu próprio entry point e a raiz do pacote não a
reexporta.

**Porquê.** Os polígonos do NGI são uma leitura oficial do mesmo texto, por isso podem ser
citados e reconstruídos; um limite derivado aqui a partir de dados de ruas seria uma terceira
leitura que ninguém pode verificar. A simplificação deslocaria a linha, e as linhas importam
sobretudo onde os cantões se tocam. Um milhão de posições ofuscaria todos os outros conjuntos de
dados, por isso ninguém as deve carregar por acidente.

**Por isso.** `findCantonsAt(lon, lat)` responde a partir da geometria e a documentação di-lo;
um ponto perto de uma linha é um caso para o texto. A build semanal falha quando um cantão não
tem limite ou quando uma feature não corresponde a nenhum cantão
([#29](https://github.com/pieterjanscheir/belgica/issues/29)).

## Ainda por decidir {#not-decided-yet}

| Questão                                                                   | Issue                                                                                        |
| ------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Histórico anterior a 1 de janeiro de 2025                                 | [#27](https://github.com/pieterjanscheir/belgica/issues/27)                                  |
| Cálculo de juros ao longo de um período (contagem de dias, capitalização) | Não previsto até que o método possa ser fundamentado em jurisprudência ou orientação oficial |
