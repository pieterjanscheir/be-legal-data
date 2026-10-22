# Conjuntos de dados {#datasets}

Cada conjunto de dados é um ficheiro JSON em `data/`, descrito por um
[JSON Schema](/pt/guide/schema) e listado em [`datapackage.json`](/pt/guide/schema#datapackage-json)
com as suas fontes oficiais, a licença e a data em que foi verificado pela última vez face a elas.

| Conjunto de dados                              | Registos | Para que serve                                                                                               |
| ---------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| [Áreas judiciais](./territory#judicial-areas)  | 5        | Que hof van beroep / cour d'appel (e que arbeidshof / cour du travail) julga um recurso                      |
| [Arrondissements](./territory#arrondissements) | 12       | Agrupar tribunais, ministério público e oficiais de justiça; a unidade da maioria das regras de competência  |
| [Cantões](./territory#cantons)                 | 162      | Que justice de paix / vredegerecht é competente para uma morada                                              |
| [Limites dos cantões](./canton-boundaries)     | 162      | O cantão de um ponto numa cidade dividida; os cantões num mapa (GeoJSON)                                     |
| [Municípios](./territory#municipalities)       | 565      | Ligar qualquer morada ou estatística belga ao mapa judicial pelo código REFNIS                               |
| [Regiões](./territory#regions)                 | 3        | A região de um município, pelo código REFNIS, com o nome em três línguas                                     |
| [Províncias](./territory#provinces)            | 10       | A província de um município (nenhuma em Bruxelas), com a respetiva região                                    |
| [Códigos postais](./postal-codes)              | 1 152    | Do código postal de uma morada ao seu município, e daí aos seus cantões e tribunais                          |
| [Tribunais](./courts)                          | 347      | Nomes, moradas e contactos das secretarias para escrever, apresentar peças ou pagar a qualquer tribunal      |
| [Prisões](./prisons)                           | 39       | Moradas e contactos de cada prisão e casa de detenção                                                        |
| [Maisons de justice](./houses-of-justice)      | 27       | Liberdade condicional e penas na comunidade, apoio às vítimas e estudos sociais para os tribunais de família |
| [Taxas de juro](./interest-rates)              | 2 séries | Calcular juros de mora sobre um crédito                                                                      |

## Como os conjuntos de dados se relacionam {#how-the-datasets-fit-together}

```
Área judicial ──< Arrondissement ──< Cantão >──< Município (REFNIS) ──< Código postal
      │                 │              │  │
      │                 │              │  └── Limite do cantão   a geometria do cantão (NGI)
      └──────────── Tribunal ──────────┘  um justice de paix liga-se ao seu cantão,
                        │                 e a morada de cada tribunal ao seu município
                        └──< Divisão      uma divisão liga-se ao seu tribunal
```

`──<` lê-se "tem vários". Um município está normalmente num único cantão; as cidades divididas
(Antwerpen, Gent, Brussel, Luik, …) estão em vários. Do lado administrativo, `Região ──<
Província ──< Município`, exceto que a Região de Bruxelas-Capital não tem província e contém
diretamente os seus 19 municípios.

Os registos ligam-se uns aos outros por id, nunca por nome: um tribunal tem um id
`judicialArea` e, quando a sua área é um único arrondissement, um id `arrondissement`; um cantão
lista os códigos REFNIS dos seus municípios; um código postal e a morada de um tribunal têm o
código REFNIS do seu município. Os nomes mudam de grafia entre fontes e línguas; os ids não.

## Porque são úteis estes dados {#why-this-data-is-useful}

O trabalho jurídico na Bélgica esbarra uma e outra vez nas mesmas pesquisas, e as fontes oficiais
são difíceis de usar a partir de código:

- **Competência.** O justice de paix / vredegerecht, o tribunal de police / politierechtbank e
  muitos outros tribunais são competentes em razão do território. A lei (o anexo ao Gerechtelijk
  Wetboek / Code judiciaire) descreve essas áreas em prosa, em parte rua a rua. `cantons.json`
  transforma isso numa pesquisa de município para cantão, e guarda o texto legal das cidades
  divididas; `canton-boundaries.json` acrescenta a geometria do NGI, para que um ponto numa cidade
  dividida encontre o seu cantão.
- **Nomes e moradas corretos.** Citações, conclusões e cartas têm de se dirigir ao tribunal certo
  tal como ele próprio se designa, como `Vredegerecht Gent 1` ou
  `Ondernemingsrechtbank Gent - afdeling Brugge`, e chegar à secretaria certa. Os nomes são
  retirados das próprias páginas dos tribunais, em todas as línguas em que publicam.
- **Cálculo de juros.** Os pedidos por atraso de pagamento usam a taxa legal ou, entre empresas,
  a taxa das transações comerciais. Ambas mudam todos os anos ou semestres, e a transição de
  2013–2015 depende da data do contrato. Errar um período altera o montante pedido.
- **Cruzar outros dados.** Os códigos REFNIS são o que usam o Statbel, as regiões e a maioria dos
  dados abertos. Associá-los a cantões e arrondissements permite colocar no mapa judicial dados de
  volume processual, de população ou de moradas.

## O que (ainda) não está incluído {#what-isn-t-in-it-yet}

Veja as [lacunas conhecidas](./known-gaps) para as limitações dos dados atuais e o
[roadmap](./roadmap) para os conjuntos de dados previstos: os tribunais superiores, o histórico,
os oficiais de justiça (gerechtsdeurwaarders / huissiers de justice), as zonas de polícia e as
repartições do cadastro e das hipotecas.

::: warning Dados de referência, não aconselhamento jurídico
Os dados são verificados face às fontes oficiais, mas as fontes mudam e há erros. Consulte a
fonte oficial antes de confiar num valor, e
[comunique qualquer erro](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml).
:::
