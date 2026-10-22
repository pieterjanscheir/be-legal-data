# Prisiones {#prisons}

<script setup>
import { data as stats } from '../../.vitepress/stats.data'
</script>

Archivo: `data/prisons.json`. Las {{ stats.prisons }} prisiones y casas de detención del SPF
Justice / FOD Justitie (el Servicio Público Federal de Justicia), a través de su Dirección
General de Establecimientos Penitenciarios.

## Para qué sirve {#why-it-s-useful}

- **Escribir a un detenido o a su prisión.** Abogados, familias y servicios necesitan la
  dirección y el teléfono de la prisión; los nombres difieren según la lengua
  (`Gevangenis van Bergen`, `Prison de Mons`, `Gefängnis Mons`).
- **Depositar dinero.** Cuando el SPF Justice publica la cuenta de la prisión para el dinero de
  los detenidos, figura en los contactos como `bank-account`, con el dígito de control verificado.
- **Formularios y expedientes.** Un id estable por establecimiento para guardar con un
  expediente, y una lista entre la que elegir.

## Fuente y actualizaciones {#source-and-updates}

|               |                                                                                                                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Fuente        | [FOD Justitie / SPF Justice: prisiones belgas](https://justitie.belgium.be/nl/themas_en_dossiers/gevangenissen/belgische_gevangenissen), la página de cada prisión en neerlandés, francés y alemán |
| Generado por  | `scripts/parse`, a partir de las capturas semanales                                                                                                                                                |
| Cambia cuando | Una prisión abre o cierra, o cambia sus datos de contacto                                                                                                                                          |
| Comprobado    | Cada semana, mediante el [workflow de fuentes](/es/guide/data-quality#how-the-data-is-built)                                                                                                       |

## Campos {#fields}

| Campo                  | Tipo                              | Descripción                                                                                                                                               |
| ---------------------- | --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`                   | `PrisonId`                        | A partir del nombre en la lengua local, sin artículos: `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                        |
| `validFrom`, `validTo` | string?                           | Los días en que se aplica el registro, según lo mostraba el sitio; ausentes: desde el inicio de la cobertura, o sigue vigente. Ver [tiempo](/es/api#time) |
| `kind`                 | `'prison'` \| `'detention-house'` | Una casa de detención (detentiehuis / maison de détention) aloja a personas con penas cortas, cerca de su domicilio                                       |
| `name`                 | `{ nl, fr, de }`                  | Tal como lo publica el SPF Justice                                                                                                                        |
| `address`              | `Address`                         | En la lengua local, con el municipio al que pertenece su código postal (`municipality`, por código REFNIS)                                                |
| `contacts`             | `Contact[]`                       | Teléfono, fax, correo electrónico y la cuenta para el dinero de los detenidos, cuando se publican                                                         |
| `website`              | `{ nl, fr, de }`                  | La página de la prisión por lengua                                                                                                                        |
| `sources`              | `{ url, retrieved }[]`            | Las páginas de las que se leyó el registro                                                                                                                |

El nombre del director, que las páginas también dan, se deja fuera: cambia, y es un dato personal
que el paquete no necesita.

```ts
import { getPrison, prisons } from 'belgica/prisons'

getPrison('gevangenis-gent').name.fr // 'Prison de Gand'
prisons.filter((p) => p.kind === 'detention-house') // Kortrijk, Olen, Vorst
```
