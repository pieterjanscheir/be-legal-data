<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

# Maisons de justice {#houses-of-justice}

Archivo: `data/houses-of-justice.json`. Las maisons de justice (justitiehuizen; literalmente,
"casas de justicia") de las Comunidades flamenca y francesa: {{ stats.housesOfJustice }} registros.

Las maisons de justice orientan y supervisan a los infractores por encargo de los tribunales y de
la fiscalía (libertad a prueba, vigilancia electrónica, trabajos en beneficio de la comunidad),
atienden a las víctimas y redactan estudios sociales para los tribunaux de la famille (tribunales
de familia). Las gestionan las Comunidades desde 2015.

## Para qué sirve {#why-it-s-useful}

- **Derecho de familia.** Un tribunal de la famille encarga un estudio social a la maison de
  justice del área de la familia; los abogados y las partes necesitan sus datos de contacto.
- **Derecho penal.** Las condiciones de la libertad a prueba, las penas alternativas y la
  vigilancia electrónica las sigue la maison de justice; también la atención a las víctimas.
- **Vínculos.** Los justitiehuizen flamencos llevan su número OVO, el identificador en el
  registro flamenco de organizaciones ([Wegwijs](https://wegwijs.vlaanderen.be)), de modo que los
  datos se pueden cruzar con otros datos del gobierno flamenco.

## Fuente y actualizaciones {#source-and-updates}

|              |                                                                                                                                                                                                                                                      |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fuente       | [vlaanderen.be: Justitiehuizen](https://www.vlaanderen.be/agentschap-justitie-en-handhaving/justitie/justitiehuizen) (Comunidad flamenca) y [maisonsdejustice.be](https://www.maisonsdejustice.be/menu-de-droite/trouverunemj/) (Comunidad francesa) |
| Generado por | `scripts/parse`, a partir de las capturas semanales                                                                                                                                                                                                  |
| Comprobado   | Cada semana, mediante el [workflow de fuentes](/es/guide/data-quality#how-the-data-is-built)                                                                                                                                                         |

Aún no está en los datos: la maison de justice / Justizhaus de la Comunidad germanófona en Eupen
([#3](https://github.com/pieterjanscheir/belgica/issues/3)). Bruselas tiene tanto un justitiehuis
flamenco (`justitiehuis-brussel`) como una maison de justice francófona
(`maison-justice-bruxelles`).

## Campos {#fields}

| Campo                  | Tipo                                    | Descripción                                                                                                                                               |
| ---------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `HouseOfJusticeId`                      | A partir del nombre, sin artículos: `justitiehuis-gent`, `maison-justice-arlon`                                                                           |
| `validFrom`, `validTo` | string?                                 | Los días en que se aplica el registro, según lo mostraba el sitio; ausentes: desde el inicio de la cobertura, o sigue vigente. Ver [tiempo](/es/api#time) |
| `community`            | `'flemish'` \| `'french'` \| `'german'` | La Comunidad que la gestiona                                                                                                                              |
| `name`                 | `{ nl }` o `{ fr }`                     | En la lengua de la Comunidad                                                                                                                              |
| `ovo`                  | string?                                 | Número OVO en el registro flamenco de organizaciones, para los justitiehuizen flamencos: `OVO001917`                                                      |
| `address`              | `Address`                               | Con el municipio al que pertenece su código postal (`municipality`, por código REFNIS)                                                                    |
| `contacts`             | `Contact[]`                             | Teléfono, fax y correo electrónico; el servicio de atención a las víctimas de una maison de justice francófona tiene sus propios contactos etiquetados    |
| `website`              | `{ nl }` o `{ fr }`                     | La página en la que figura                                                                                                                                |
| `sources`              | `{ url, retrieved }[]`                  | Las páginas de las que se leyó el registro                                                                                                                |

```ts
import { getHouseOfJustice, getContact } from 'belgica/houses-of-justice'

getHouseOfJustice('justitiehuis-gent').ovo // 'OVO001917'
getContact(getHouseOfJustice('maison-justice-arlon'), 'email', "service d'accueil des victimes")
```
