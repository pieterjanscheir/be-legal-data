# Taxas de juro {#interest-rates}

Ficheiro: `data/interest-rates.json`. Fonte: FOD Financiën / SPF Finances, publicado no Belgisch
Staatsblad / Moniteur belge.

## Porque é útil {#why-it-s-useful}

Os juros de um pagamento em atraso fazem parte de quase todos os pedidos, e a taxa depende do
dia:

- **Juro legal** (wettelijke interest / intérêt légal) aplica-se às dívidas em geral, e é o que os
  tribunais concedem como juros de mora, salvo se um contrato ou uma lei especial dispuser de
  outro modo.
- **Juro comercial** (Wet 2 augustus 2002) aplica-se aos atrasos de pagamento entre empresas e
  perante autoridades públicas, salvo se o contrato fixar uma taxa mais alta.

Um pedido que abrange vários anos atravessa vários períodos, cada um com a sua taxa. Errar um
período altera o montante pedido, e a transição de 2013–2015 (abaixo) é fácil de passar
despercebida. `getInterestRate` dá a taxa certa para um dia, e devolve `null` em vez de adivinhar
quando a taxa ainda não foi publicada.

## Fonte e atualizações {#source-and-updates}

|                |                                                                                                                                                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Fonte          | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (comercial); aviso anual no Belgisch Staatsblad (legal) |
| Construído por | À mão: acrescenta-se um período quando é publicada uma nova taxa                                                                                                                                                               |
| Muda quando    | Todos os anos civis (legal); todos os semestres (comercial)                                                                                                                                                                    |
| Verificado     | Semanalmente: a verificação de atualidade abre uma issue quando hoje, ou as duas semanas seguintes, não têm taxa                                                                                                               |

- **Legal** (`legal`, wettelijke interest, Wet 5 mei 1865): fixada por ano civil; registada desde 1970.
- **Comercial** (`commercial`, atraso de pagamento nas transações comerciais, Wet 2 augustus
  2002): fixada por semestre; registada desde 2002.

## Consultar uma taxa {#look-up-a-rate}

<InterestRates />

## A regra de contrato de 2013–2015 {#the-2013-2015-contract-rule}

De 2013 a 15 de março de 2015 a taxa comercial depende de quando o contrato foi celebrado. Esses
períodos têm um campo extra `rateForContractsBefore20130316`. Por omissão, `getInterestRate`
devolve a taxa para os contratos mais antigos; passe `{ contractAfter20130316: true }` para
contratos celebrados em ou após 16 de março de 2013.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Períodos em falta {#missing-periods}

`getInterestRate` devolve `null` para um dia sem taxa registada: antes do primeiro período, ou num
período que ainda não foi publicado (ou acrescentado). Use `getLatestKnownRateDate(type)` para
mostrar até onde chegam os dados, e emita um aviso em vez de usar silenciosamente 0 %.

## Forma {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // primeiro dia, inclusive, YYYY-MM-DD
    to: string // último dia, inclusive, YYYY-MM-DD
    rate: number // percentagem
    rateForContractsBefore20130316?: number
    note?: string
}
```
