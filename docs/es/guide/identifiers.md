# Identificadores {#identifiers}

Cada registro tiene un `id`. Otros registros, tu base de datos y tus URLs se refieren a él, así
que un id tiene que ser correcto una vez y no cambiar nunca. Esta página expone las reglas, por
qué existe cada una y qué ocurre cuando la ley cambia aquello que nombra un id.

## Las reglas {#the-rules}

1. **Cada registro tiene un campo `id`**, único dentro de su conjunto de datos. El código
   genérico (un índice, una caché, un formulario) trata todos los conjuntos de datos igual.
2. **Un código oficial gana, si cubre todos los registros.** Cuando las autoridades asignan un
   código a cada registro de un conjunto de datos, el id _es_ ese código: los municipios usan su
   código REFNIS de Statbel (`44021` para Gent). Un código que solo cubre algunos registros se
   guarda en cambio como campo: los tribunales tienen sus códigos ECLI en `ecli`, los
   justitiehuizen flamencos su número OVO en `ovo` (ver [por qué](#why-not-the-official-court-codes)).
3. **Si no, ASCII en kebab-case y minúsculas**: `^[a-z0-9]+(-[a-z0-9]+)*$`, generado por
   [`scripts/id.ts`](https://github.com/pieterjanscheir/belgica/blob/main/scripts/id.ts):
   se quitan los acentos, y todo lo que no es letra ni dígito se convierte en un guion.
   `Merelbeke-Melle` → `merelbeke-melle`, `Braine-l'Alleud` → `braine-l-alleud`,
   `Liège` → `liege`.
4. **A partir del nombre oficial en la lengua local**: neerlandés en Flandes, francés en Valonia,
   alemán en torno a Eupen. Bruselas es oficialmente bilingüe y necesita una elección fija: el
   neerlandés.
5. **Un número es un sufijo**: los lugares con varios cantones reciben `gent-1` … `gent-5`.
6. **Los tribunales son `type` + lugar**: `justice-of-the-peace-gent-1`, `court-of-appeal-liege`.
   Una justice de paix (vredegerecht, el juzgado de paz de un cantón) toma el id de su cantón.
   Los dos tribunales de un mismo tipo en Bruselas, uno por lengua, añaden `-nl` o `-fr`
   (`police-court-brussel-fr`). Una división o sede añade su propio lugar al id de su tribunal
   (`enterprise-court-gent-brugge`). El prefijo mantiene los ids únicos cuando Gent tiene una
   justice de paix, un tribunal de l'entreprise y un tribunal du travail, y es exactamente el
   `type` del registro, así que nunca necesita un segundo vocabulario.
7. **Las prisiones y las maisons de justice / justitiehuizen son su nombre** en la lengua local,
   sin artículos: `gevangenis-gent`, `prison-lantin`, `justitiehuis-gent`,
   `maison-justice-arlon`. Sus nombres ya dicen lo que son, y dos instituciones de una misma
   ciudad (la prisión central y la prisión auxiliar de Leuven) se distinguen por el nombre.
8. **Los vínculos son campos, nunca cadenas derivadas.** Una justice de paix tiene un campo
   `canton`; un cantón enumera `{ municipality }`; un distrito judicial tiene un `judicialArea`.
   Cada uno contiene el id del registro al que apunta, y el campo lleva el nombre del conjunto de
   datos al que apunta.

Todo esto lo hacen cumplir los tests (`test/ids.test.ts`) y los [JSON Schemas](./schema), que
enumeran los ids válidos, de modo que un vínculo colgante no pasa la validación.

## Los ids {#the-ids}

| Conjunto de datos       | Ejemplos                                                                                                                  | Regla                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| Áreas judiciales        | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                                                                           | Nombre local                  |
| Distritos judiciales    | `oost-vlaanderen`, `brabant-wallon`, `eupen`                                                                              | Nombre local                  |
| Cantones                | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1`                                                  | Nombre local + número         |
| Límites de los cantones | `gent-1`: un límite por cantón, con el id del cantón, y `canton` como vínculo                                             | El id del cantón              |
| Municipios              | `44021`, `21004`                                                                                                          | Código REFNIS                 |
| Provincias              | `10000`, `40000`                                                                                                          | Código REFNIS                 |
| Regiones                | `02000`, `03000`, `04000`                                                                                                 | Código REFNIS                 |
| Códigos postales        | `9000-44021`, `1040-21005`                                                                                                | Código postal + código REFNIS |
| Tribunales              | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`, `police-court-brussel-fr`, `police-court-eupen-sankt-vith` | Tipo + lugar                  |
| Prisiones               | `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                               | Nombre local                  |
| Maisons de justice      | `justitiehuis-gent`, `maison-justice-arlon`                                                                               | Nombre local                  |
| Tipos de interés        | `legal`, `commercial`                                                                                                     | Claves fijas                  |

## Por qué estas decisiones {#why-these-choices}

**¿Por qué kebab-case?** Los ids acaban en URLs (`/cantons/gent-1`), nombres de archivo, clases
CSS, claves de base de datos y líneas de log. Las minúsculas evitan colisiones en sistemas que no
distinguen mayúsculas (los sistemas de archivos de macOS y Windows, muchas collations de bases de
datos): `Gent1` y `gent1` serían dos ids en los datos y un solo archivo en disco. Los guiones
mantienen legibles los límites entre palabras sin mayúsculas, y el conjunto de caracteres no
necesita escaparse en ningún sitio.

**¿Por qué ids legibles en lugar de números o UUIDs?** Un conjunto de datos de referencia lo
leen personas: `justice-of-the-peace-gent-1` en una fila de base de datos o en un mensaje de
error te dice qué es. Los ids son tan estables como lo serían los números, porque solo cambian
cuando la ley cambia aquello que nombran (ver más abajo), y entonces un id nuevo es el resultado
correcto.

**¿Por qué la lengua local y no el inglés?** Existen nombres en inglés (o en español: Gante,
Amberes, Lieja) para un puñado de lugares, y no para los 162 cantones, así que unos ids en inglés
supondrían dos reglas. El nombre local es además el que usa la propia institución, y es el que
aparece en los textos oficiales.

**¿Por qué códigos oficiales?** REFNIS es lo que usan Statbel, las regiones y casi todos los
conjuntos de datos belgas. Con el código como id, cruzar cualquiera de ellos con cantones y
tribunales no necesita ninguna tabla de correspondencias.

**¿Por qué dos códigos para un código postal?** Un código postal por sí solo no nombra un
registro: `1040` pertenece a Brussel y a Etterbeek, y cada par es su propio registro con su
propia validez. El par de códigos oficiales, `1040-21005`, es único y sigue siendo lo que es
hasta que la tabla de Statbel cambie el par, que es exactamente cuando procede un registro nuevo.
El municipio también es un campo (`municipality`), como pide la regla 8: el id es una clave, no
algo que haya que partir.

**¿Por qué `type` en los ids de los tribunales?** En un mismo lugar hay varios tribunales, y los
tipos de tribunal irán creciendo (tribunaux de police, tribunaux du travail, tribunaux de
première instance…). Los campos de un tribunal dicen lo que es; el id solo tiene que ser único y
reconocible, y el tipo consigue ambas cosas.

**¿Por qué no los códigos oficiales de los tribunales?** Los tribunales tienen dos códigos
oficiales, y ninguno cubre todos los tribunales. Los códigos ECLI (`HBGNT` para la cour d'appel /
hof van beroep de Gent) existen por tribunal y por lengua, no por división, y ninguno aparece en
las resoluciones publicadas de las justices de paix. Los números de empresa (BCE / KBO)
pertenecen al SPF Justice / FOD Justitie; sus unidades de establecimiento siguen a los edificios,
no a los tribunales, y cambian cuando un tribunal se traslada. Una regla que vale para todos los
registros es mejor que dos reglas, así que los códigos ECLI son un campo (`ecli`), y el id sigue
la regla 6.

**¿Por qué vínculos explícitos?** El esquema antiguo construía el id de un tribunal concatenando
`Vredegerecht` y el id del cantón. Eso esconde una relación en el formato de una cadena, que se
rompe en cuanto un tribunal sirve a dos cantones o cambia un nombre. Un campo `canton` lo
comprueban el esquema y los tests, y se puede seguir en ambas direcciones.

## En TypeScript {#in-typescript}

Cada conjunto de datos tiene un tipo de id generado (`CantonId`, `CourtId`, `MunicipalityId`,
`ProvinceId`, `RegionId`, `ArrondissementId`, `JudicialAreaId`, `PrisonId`, `HouseOfJusticeId`,
`PostalCodeId`), regenerado a partir de los datos con `pnpm build:ids`:

```ts
import { getCanton, type CantonId } from 'belgica'

getCanton('gent-1') // Canton: un id conocido siempre encuentra su registro
getCanton(userInput) // Canton | undefined: cualquier otra cadena puede que no

const id: CantonId = 'gent1' // error de compilación: no es un id de cantón
```

Usa los tipos de id para los valores que guardas, de modo que una errata o un id eliminado se
detecte al actualizar.

## Cuando la ley cambia un id {#when-the-law-changes-an-id}

Los cantones y los municipios cambian: hubo fusiones de municipios en 2019 y 2025, y las leyes
redibujan cantones. Los registros llevan un periodo de validez (`validFrom`, `validTo`), así que
un cambio añade historia en lugar de borrarla:

1. El registro antiguo se queda, con un `validTo`; el nuevo recibe un id nuevo y un `validFrom`.
   Un id nunca se reutiliza para otra cosa, así que un id guardado hace años sigue encontrando lo
   que significaba.
2. Sin día, las búsquedas responden para hoy: una búsqueda por id da la versión vigente hoy (la
   última, para un registro que ha terminado), y las listas como `getCantonsForMunicipality`
   solo lo que está vigente hoy. Con `{ on }` ambas responden para ese día.
3. El registro de cambios enumera cada id nuevo y los ids a los que sustituye.

Un simple cambio de nombre, como una corrección ortográfica, no cambia el id. La historia
anterior al 1 de enero de 2025 aún no está en los datos
([#27](https://github.com/pieterjanscheir/belgica/issues/27)): una búsqueda para un día anterior
lanza un `RangeError` en lugar de responder con el mapa de hoy.

## Los ids son opacos {#ids-are-opaque}

Un id es una clave, no un formato. `court-of-first-instance-luxembourg-marche-en-famenne` no se
puede volver a partir en tipo, lugar y división, porque el tipo, el lugar y el sufijo de lengua
usan todos el mismo guion. No analices los ids: cada parte de uno es también un campo (`type`,
`court`, `canton`, `arrondissement`), y son los campos lo que comprueban los esquemas y los
tests.

## Estabilidad {#stability}

Los ids son API pública. Añadir registros es una versión minor, corregir un valor un patch, y
eliminar o renombrar un id una versión major. La versión 0.3.0 sustituye los ids anteriores en
PascalCase (`VredegerechtGent1`, `EastFlanders`) por este esquema antes de que el paquete tuviera
usuarios; el [registro de cambios](./changelog) enumera la correspondencia.

La promesa se comprueba, no solo se hace. `ids.lock.json` enumera cada id que el paquete ha
publicado, por conjunto de datos; `pnpm generate` le añade los ids nuevos y nunca quita ninguno,
y `test/ids.test.ts` falla cuando falta en los datos un id bloqueado. Así, un scraper que lee una
página con un título nuevo, una lista de cantones regenerada o una edición a mano no pueden
eliminar ni renombrar un id sin que se note: el pull request semanal de datos falla, y una
persona asigna el nombre nuevo al id existente en el parser, o termina el registro con un
`validTo`. Sacar un id del lock es un acto deliberado, para una versión major, con el id y su
sustituto en el registro de cambios.
