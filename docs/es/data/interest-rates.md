# Tipos de interés {#interest-rates}

Archivo: `data/interest-rates.json`. Fuente: FOD Financiën / SPF Finances (el Servicio Público
Federal de Finanzas), publicado en el Belgisch Staatsblad / Moniteur belge (el diario oficial
belga).

## Para qué sirve {#why-it-s-useful}

Los intereses por demora en el pago forman parte de casi todas las reclamaciones, y el tipo
depende del día:

- **El interés legal** (wettelijke interest, intérêt légal) se aplica a las deudas en general, y
  es lo que los tribunales conceden como interés moratorio salvo que un contrato o una ley
  especial disponga otra cosa.
- **El interés comercial** (Wet 2 augustus 2002) se aplica a la morosidad entre empresas y frente
  a las autoridades públicas, salvo que el contrato fije un tipo más alto.

Una reclamación que abarca varios años atraviesa varios periodos, cada uno con su propio tipo.
Equivocarse en un periodo cambia el importe reclamado, y la transición de 2013–2015 (ver abajo)
es fácil de pasar por alto. `getInterestRate` da el tipo correcto para un día, y devuelve `null`
en lugar de adivinar cuando el tipo aún no se ha publicado.

## Fuente y actualizaciones {#source-and-updates}

|               |                                                                                                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fuente        | [FOD Financiën](https://financien.belgium.be/nl/over_de_fod/structuur_en_diensten/algemene_administraties/thesaurie/rentevoet_betalingsachterstand_handelstransacties) (comercial); aviso anual en el Belgisch Staatsblad (legal) |
| Generado por  | A mano: se añade un periodo cuando se publica un nuevo tipo                                                                                                                                                                       |
| Cambia cuando | Cada año natural (legal); cada semestre (comercial)                                                                                                                                                                               |
| Comprobado    | Semanalmente: la comprobación de actualidad abre un issue cuando hoy, o las dos próximas semanas, no tienen tipo                                                                                                                  |

- **Legal** (`legal`, wettelijke interest, Wet 5 mei 1865): se fija por año natural; registrado
  desde 1970.
- **Comercial** (`commercial`, morosidad en las operaciones comerciales, Wet 2 augustus 2002): se
  fija por semestre; registrado desde 2002.

## Consultar un tipo {#look-up-a-rate}

<InterestRates />

## La regla de los contratos de 2013–2015 {#the-2013-2015-contract-rule}

Desde 2013 hasta el 15 de marzo de 2015, el tipo comercial depende de cuándo se celebró el
contrato. Esos periodos llevan un campo adicional `rateForContractsBefore20130316`. Por defecto
`getInterestRate` devuelve el tipo para los contratos más antiguos; pasa
`{ contractAfter20130316: true }` para los contratos celebrados el 16 de marzo de 2013 o después.

```ts
getInterestRate('2014-06-15', 'commercial') // { rate: 7.5, … }
getInterestRate('2014-06-15', 'commercial', { contractAfter20130316: true }) // { rate: 8.5, … }
```

## Periodos que faltan {#missing-periods}

`getInterestRate` devuelve `null` para un día sin tipo registrado: antes del primer periodo, o un
periodo que aún no se ha publicado (o añadido). Usa `getLatestKnownRateDate(type)` para mostrar
hasta dónde llegan los datos, y avisa en lugar de usar 0 % sin decir nada.

## Estructura {#shape}

```ts
type InterestType = 'legal' | 'commercial'

interface InterestRateSeries {
    description: string
    source: string
    periods: InterestRatePeriod[]
}

interface InterestRatePeriod {
    from: string // primer día, incluido, YYYY-MM-DD
    to: string // último día, incluido, YYYY-MM-DD
    rate: number // porcentaje
    rateForContractsBefore20130316?: number
    note?: string
}
```
