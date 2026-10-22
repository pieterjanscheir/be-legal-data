# Códigos postales {#postal-codes}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Archivo: `data/postal-codes.json`. Los {{ stats.postalCodes.codes }} códigos postales belgas,
cada uno vinculado al municipio al que pertenece mediante el código REFNIS:
{{ stats.postalCodes.records }} registros, porque {{ stats.postalCodes.shared }} códigos postales
pertenecen a dos municipios.

## Para qué sirve {#why-it-s-useful}

- **De una dirección al mapa judicial.** Las direcciones vienen con un código postal, no con un
  código REFNIS. El código postal da el municipio, y el municipio da sus cantones y tribunales:
  `findCourtsForPostalCode('9050', 'labour-court')` responde a "¿qué tribunal para esta
  dirección?" hasta donde puede el código postal.
- **Los códigos postales de un municipio.** Validar un formulario, preparar un envío postal,
  comprobar que una dirección y un código REFNIS coinciden: `getPostalCodes('44021')`.
- **El municipio de cada tribunal, prisión y maison de justice.** Su `address.municipality` es
  este vínculo, aplicado al código postal de la dirección publicada
  ([#28](https://github.com/pieterjanscheir/belgica/issues/28)).

## Fuente y actualizaciones {#source-and-updates}

|               |                                                                                                                                                                                                                                                 |
| ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fuente        | La [tabla de conversión de códigos postales a códigos REFNIS](https://statbel.fgov.be/nl/over-statbel/methodologie/classificaties/geografie) de Statbel, la tabla vigente desde el 1 de enero de 2025 (`…_va01012025.xlsx`)                     |
| Generado por  | `scripts/parse/postal-codes.ts`, a partir de las capturas semanales. La build falla cuando un código apunta a un código REFNIS que no está en `municipalities.json`, o cuando un municipio no tiene código                                      |
| Cambia cuando | Statbel publica una nueva tabla: se fusionan municipios, bpost añade o retira un código postal                                                                                                                                                  |
| Cubre         | Desde el 1 de enero de 2025: las búsquedas para un día anterior lanzan un `RangeError` ([tiempo](/es/api#time)). Una tabla posterior da un `validTo` a los pares que elimina y un `validFrom` a los que añade, el día en que se aplica la tabla |
| Comprobado    | Cada semana, mediante el [workflow de fuentes](/es/guide/data-quality#how-the-data-is-built)                                                                                                                                                    |
| Licencia      | © Statbel, [CC BY 4.0](https://statbel.fgov.be/en/cc-40)                                                                                                                                                                                        |

Statbel construye la tabla a partir de las oficinas postales de bpost y de los municipios del SPF
Finances / FOD Financiën. También lleva un nombre de municipio por fila, que aquí no se guarda:
difiere de la propia lista REFNIS de Statbel en algunos casos (`Tongeren-Borgloon` donde la lista
dice `Tongres-Looz`, y `Saint-Nicolas` para Sint-Niklaas), y un registro se vincula a su municipio
en lugar de copiarlo. `getMunicipality(record.municipality).name` tiene los nombres.

## Códigos postales compartidos {#shared-postal-codes}

Un municipio tiene varios códigos postales (Gent tiene diez), y un código postal pertenece a un
solo municipio, con tres excepciones:

| Código postal | Municipios                                      |
| ------------- | ----------------------------------------------- |
| `1040`        | Brussel (`21004`) y Etterbeek (`21005`)         |
| `1050`        | Brussel (`21004`) y Elsene (`21009`)            |
| `1804`        | Vilvoorde (`23088`) y Zemst (`23096`): Cargovil |

En estos casos decide la calle. `getMunicipalitiesForPostalCode` devuelve ambos municipios, y
`findCourtsForPostalCode` responde por municipio, de modo que un código compartido nunca se
resuelve en silencio a uno de ellos.

## Campos {#fields}

| Campo                  | Tipo             | Descripción                                                                                                                                                                               |
| ---------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PostalCodeId`   | El código postal y el código REFNIS, unidos: `9000-44021`. Ninguno de los dos nombra por sí solo un registro; juntos son oficiales y únicos. Ver [identificadores](/es/guide/identifiers) |
| `validFrom`, `validTo` | string?          | Los días en que se aplica el par, según las tablas de Statbel; ausentes: desde el inicio de la cobertura, o sigue vigente. Ver [tiempo](/es/api#time)                                     |
| `postalCode`           | string           | El código postal de cuatro dígitos                                                                                                                                                        |
| `municipality`         | `MunicipalityId` | El municipio al que pertenece el código postal, por código REFNIS                                                                                                                         |

```ts
interface PostalCode {
    id: PostalCodeId // '9000-44021'
    validFrom?: string
    validTo?: string
    postalCode: string // '9000'
    municipality: MunicipalityId // '44021'
}
```

## Lo que no contiene {#what-isn-t-in-it}

- **Las secciones de municipio** (deelgemeenten, sections de commune): la tabla de Statbel se
  detiene en el municipio. La propia lista de códigos postales de bpost nombra las localidades,
  pero no lleva código REFNIS y se publica bajo las condiciones de uso de bpost (todos los
  derechos reservados), no bajo una licencia abierta, así que no se usa.
- **La calle.** En una ciudad dividida entre cantones (Antwerpen, Gent, Brussel, Luik, …) el
  código postal da el municipio, y el municipio da varios cantones; entonces decide la calle, y
  los límites solo existen como prosa legal en el `territory` de cada cantón hasta que
  [#29](https://github.com/pieterjanscheir/belgica/issues/29) los añada como geometría.

## Helpers {#helpers}

```ts
import { getMunicipalitiesForPostalCode, getPostalCodes } from 'belgica/postal-codes'
import { findCourtsForPostalCode } from 'belgica'

getMunicipalitiesForPostalCode('9050').map((m) => m.name.nl) // ['Gent']
getMunicipalitiesForPostalCode('1040').map((m) => m.name.nl) // ['Brussel', 'Etterbeek']
getPostalCodes('44021').map((p) => p.postalCode) // ['9000', '9030', '9031', …]

// Por municipio: sus justices de paix, y sus tribunales del tipo pedido
findCourtsForPostalCode('9050', 'labour-court')
// [{ municipality: Gent, justicesOfThePeace: [gent-1 … gent-5], courts: [labour-court-gent] }]
```
