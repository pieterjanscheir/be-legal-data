# Calidad y actualidad de los datos {#data-quality-freshness}

Los datos jurídicos de referencia se quedan obsoletos sin hacer ruido: se publica un nuevo tipo
de interés, un tribunal se traslada, una ley fusiona dos cantones. Esta página explica cómo se
mantiene al día el paquete y hasta qué punto puedes confiar en cada conjunto de datos.

## De dónde procede cada conjunto de datos {#where-each-dataset-comes-from}

| Conjunto de datos                      | Fuente                                                             | Cómo se construye                     | Cambia cuando                                                   | Revisar cada |
| -------------------------------------- | ------------------------------------------------------------------ | ------------------------------------- | --------------------------------------------------------------- | ------------ |
| Áreas judiciales, distritos judiciales | Code judiciaire (Gerechtelijk Wetboek), anexo arts. 4–5            | A mano                                | Una ley redibuja el mapa judicial (raro; la última vez en 2014) | 24 meses     |
| Cantones                               | Code judiciaire, anexo art. 1 (nl + fr)                            | Generado: `pnpm build:cantons`        | Una ley modifica el anexo; se fusionan municipios               | 12 meses     |
| Límites de los cantones                | NGI (geo.be)                                                       | Semanal: capturas + `pnpm build:data` | El NGI publica una nueva versión                                | Semanal      |
| Municipios                             | Datos abiertos de Statbel                                          | Generado: `pnpm build:cantons`        | Se fusionan municipios (2019, 2025)                             | 12 meses     |
| Regiones, provincias                   | Lista de códigos REFNIS de Statbel                                 | Semanal: capturas + `pnpm build:data` | Statbel cambia su registro (la última vez en 1995)              | Semanal      |
| Tribunales                             | tribunaux-rechtbanken.be                                           | Semanal: capturas + `pnpm build:data` | Un tribunal se traslada o cambia sus contactos u horarios       | Semanal      |
| Prisiones                              | justitie.belgium.be                                                | Semanal: capturas + `pnpm build:data` | Una prisión abre, cierra o cambia sus contactos                 | Semanal      |
| Maisons de justice / justitiehuizen    | vlaanderen.be, maisonsdejustice.be                                 | Semanal: capturas + `pnpm build:data` | Una casa se traslada o cambia sus contactos                     | Semanal      |
| Códigos postales                       | Tabla de conversión de Statbel                                     | Semanal: capturas + `pnpm build:data` | Statbel publica una nueva tabla (fusiones, códigos nuevos)      | Semanal      |
| Tipos de interés                       | FOD Financiën / SPF Finances, Moniteur belge (Belgisch Staatsblad) | A mano                                | Cada año (legal) y cada semestre (comercial)                    | 6 meses      |

Los conjuntos de datos generados nunca se editan a mano. `pnpm build:cantons` analiza el texto
oficial y se niega a escribir nada si las versiones neerlandesa y francesa no coinciden y no
están cubiertos todos los municipios; `pnpm build:data` se niega cuando una página no se puede
ubicar, un cantón no tiene tribunal o un cantón no tiene límite en el archivo del NGI.

## Cómo se construyen los datos {#how-the-data-is-built}

```
sitio oficial ──fetch──> capturas (rama sources) ──parse──> data/*.json ──> pull request
```

1. **Descarga.** Cada lunes el [workflow de fuentes](https://github.com/pieterjanscheir/belgica/actions/workflows/sources.yml)
   descarga cada página de las fuentes (`scripts/sources`), con educación: una petición por
   segundo y por sitio, con un user agent que nombra el proyecto. Guarda cada página en la rama
   `sources`, con un índice de lo que se descargó, cuándo y un hash de su contenido. Una página
   solo se vuelve a guardar cuando cambia su contenido, así que el historial de la rama muestra
   qué cambió y qué día. Una página que falla (un error del servidor, un 404) conserva su última
   captura válida y detiene la ejecución, lo que abre un issue: los datos nunca se reconstruyen a
   partir de una imagen incompleta. Una página a la que la fuente ya no enlaza se elimina de las
   capturas; su registro se queda en los datos, retirado con un `validTo` (el día anterior a la
   comprobación que no la encontró), de modo que su id sigue funcionando y una búsqueda para un
   día anterior la sigue encontrando. Una página que aparece recibe un registro con un
   `validFrom`.
2. **Análisis.** `pnpm build:data` lee las capturas (`scripts/parse`) y escribe los tribunales,
   las prisiones, las maisons de justice y los límites de los cantones. Informa de lo que no sabe
   leer, y falla cuando una página no se puede ubicar.
3. **Tests.** El workflow comprueba los tipos y ejecuta los tests sobre los datos nuevos.
4. **Revisión.** Cuando los datos han cambiado, abre o actualiza un pull request con el diff y la
   lista de valores ilegibles. Una persona lo contrasta con las fuentes y lo fusiona.

Para ejecutarlo tú mismo: `pnpm fetch:sources` (escribe `.sources/`), y luego `pnpm build:data`.

Los cantones y los municipios se reconstruyen a mano con `pnpm build:cantons`: el sitio del
Moniteur belge / Belgisch Staatsblad (el diario oficial belga) rechaza los servidores de GitHub
([#52](https://github.com/pieterjanscheir/belgica/issues/52)).

## Comprobaciones automáticas {#automatic-checks}

### En cada cambio (CI) {#on-every-change-ci}

- **Validación de esquemas**: cada archivo de datos cumple su [JSON Schema](./schema).
- **Integridad**: los ids son únicos y están bien formados; cada referencia (distrito judicial,
  cantón, municipio, tribunal, límite) apunta a un registro que existe; cada cantón tiene un
  límite, GeoJSON válido dentro de Bélgica que suma la superficie del país sin solapamientos;
  cada municipio está en exactamente un cantón o dividido entre varios; cada cantón queda dentro
  de las provincias de su distrito judicial; cada cantón tiene exactamente una justice de paix
  (vredegerecht); cada división tiene el tipo y el área de su tribunal; cada tipo de tribunal
  tiene el número de tribunales que fija la ley; cada cantón depende de un tribunal de cada tipo
  (uno por lengua en Bruselas), y los cantones de un tribunal están en su distrito judicial y su
  área judicial.
- **Parsers**: probados de principio a fin con copias recortadas de páginas reales
  (`test/fixtures/sources`), y cada lector (números de teléfono, IBANs, direcciones, horarios)
  con las formas vistas en las fuentes y con lo que debe rechazar.
- **Tipos de interés**: los periodos están ordenados, nunca se solapan y no dejan huecos; el tipo
  legal va por año natural y el comercial por semestre; el tipo de 2013–2015 según la fecha del
  contrato solo aparece en ese intervalo.
- **Datos de contacto**: cada IBAN supera su dígito de control ISO 13616, los números de teléfono
  son números belgas E.164, las direcciones de correo están en minúsculas y los horarios cumplen
  la sintaxis `opening_hours`.
- **Código**: TypeScript estricto (incluidos el acceso a índices no comprobado y las propiedades
  opcionales exactas), ESLint con reglas con información de tipos, Prettier y 100 % de cobertura
  de tests de `src/`.
- **Empaquetado**: el paquete construido se carga con `import` y con `require()`, desde cada
  entry point, en Node 22.12, 22, 24 y 26; `publint` y `arethetypeswrong` comprueban los
  `exports` y las declaraciones de tipos.

### Cada semana (programado) {#every-week-scheduled}

El [workflow de actualidad](https://github.com/pieterjanscheir/belgica/actions/workflows/freshness.yml)
se ejecuta cada lunes y abre un issue con la etiqueta
[`data-freshness`](https://github.com/pieterjanscheir/belgica/issues?q=label%3Adata-freshness)
cuando encuentra algo:

- **Tipos que faltan**: no hay tipo legal o comercial para hoy, o no hay tipo comercial para las
  dos próximas semanas (el FOD Financiën / SPF Finances lo publica antes de que empiece el
  semestre).
- **Revisiones atrasadas**: la fecha `lastReviewed` de un conjunto de datos en
  `datapackage.json` es más antigua que su `reviewEveryMonths`.
- **Fuentes caídas**: una URL de fuente oficial de `datapackage.json` ya no responde.

Ejecútalas tú mismo con `pnpm test:freshness` (añade `FRESHNESS_ONLINE=1` para comprobar las
URLs).

## Cómo leer un valor {#how-to-read-a-value}

- **Ausente no es cero.** `getInterestRate` devuelve `null` para un día sin tipo registrado, en
  lugar de adivinar; un campo que la fuente no da (la dirección de un tribunal, un horario legible
  por máquina) falta en lugar de rellenarse. Gestiona ambos casos.
- **Demasiado pronto es un error.** Una búsqueda para un día anterior a la cobertura de un
  conjunto de datos lanza un `RangeError`: los datos no lo pueden decir, y la respuesta de hoy
  parecería la correcta.
- **Los datos de contacto son los menos estables.** Los números de teléfono, las direcciones de
  correo y los horarios cambian sin previo aviso. Cada registro dice de qué páginas se leyó y
  cuándo (`sources`); consulta la página del tribunal (`website`) cuando importe.
- **Prevalece el texto legal.** Para los municipios divididos, el `territory` del cantón es el
  propio texto de la ley, literal. Cuando un resumen, o el [límite](/es/data/canton-boundaries)
  del NGI, y el texto discrepan, el texto tiene razón.

## Informar de un error {#reporting-a-mistake}

[Abre una corrección de datos](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml)
con el id del registro y un enlace a la fuente oficial. Las correcciones se publican como
versiones patch.
