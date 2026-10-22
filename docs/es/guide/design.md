# Decisiones de diseño {#design-decisions}

El paquete se rediseñó antes de tener sus primeros usuarios, así que cada decisión pudo tomarse
por sus méritos y no por compatibilidad. Esta página recoge cada decisión, por qué se tomó y qué
se deriva de ella. Una decisión nueva recibe una entrada nueva; una revertida se marca, no se
borra.

## 1. Los datos son el producto; el código es una comodidad {#_1-the-data-is-the-product-the-code-is-a-convenience}

**Decisión.** Las fuentes oficiales son la verdad; los archivos JSON de `data/` se construyen a
partir de ellas y son el producto. Se pueden usar sin nada del TypeScript: desde Python, una hoja
de cálculo (las releases incluyen tablas CSV) o `jq`. La estructura de cada archivo se define una
sola vez, en los tipos de TypeScript, y se publica como un JSON Schema generado a partir de
ellos; la CI falla cuando los tipos, los esquemas y los datos no coinciden. La librería añade
tipos, índices y helpers, y nada de ella hace falta para entender los datos.

**Por qué.** Los datos de referencia sobreviven al código que los rodea, y la mayoría de quienes
consumen datos jurídicos belgas no son proyectos de JavaScript.

**Por tanto.** Cada archivo tiene un [JSON Schema](./schema) y una entrada en `datapackage.json`
con sus fuentes y su licencia. Los nombres y valores de los campos se explican en la
documentación, no solo en el código.

## 2. Los hechos jurídicos son datos, nunca se calculan {#_2-legal-facts-are-data-never-computed}

**Decisión.** Todo lo que tiene significado jurídico (el nombre de un tribunal, el territorio de
un cantón, un tipo de interés) procede literalmente de una fuente oficial y se almacena. El
código puede formatear o buscar; no puede construir un hecho jurídico.

**Por qué.** El código que ensambla un hecho puede equivocarse de formas que los tests no
detectan: los nombres franceses de tribunales que construía un antiguo `formatCourtName` eran
incorrectos (`Tribunal de paix …`, cuando los tribunales se llaman a sí mismos `Justice de paix …`; [#10](https://github.com/pieterjanscheir/belgica/issues/10)).
Un valor almacenado se puede contrastar con su fuente.

**Por tanto.** Los nombres de los tribunales se guardan tal como los publica cada tribunal, en
cada lengua en que publica, y `formatCourtName` ha desaparecido. Los territorios de los cantones
siguen siendo texto legal literal, con su base legal como enlace ELI. Donde falta una fuente,
falta el campo: nada se rellena por conjetura. Lo mismo vale para el análisis: un texto de
horario con una nota, un número de teléfono sin prefijo o una dirección escrita como frase se
deja fuera, no se adivina.

## 3. Una sola regla para los identificadores {#_3-one-identifier-rule}

**Decisión.** Un código oficial cuando uno cubre todos los registros; si no, kebab-case en
minúsculas a partir del nombre en la lengua local; los tribunales son `type` + lugar. Los
códigos oficiales que solo cubren algunos registros (ECLI, OVO) son campos. Ver
[identificadores](./identifiers).

## 4. Los vínculos son campos {#_4-links-are-fields}

**Decisión.** Los registros se refieren unos a otros solo mediante campos que contienen el id del
otro registro, con el nombre del conjunto de datos al que apuntan (`arrondissement`, `canton`,
`municipality`). Ningún id se construye a partir de otro.

**Por qué.** Una relación escondida en el formato de una cadena se rompe sin avisar cuando
cambia cualquiera de los dos lados. Un campo lo valida el esquema (que enumera los ids válidos) y
los tests.

**Por tanto.** La dirección de un tribunal, una prisión o una maison de justice se vincula a su
municipio de la misma forma (`address.municipality`), a través del código postal en la tabla de
conversión de Statbel, nunca a través del nombre de la ciudad
([#28](https://github.com/pieterjanscheir/belgica/issues/28)); un registro de código postal se
vincula a su municipio en lugar de copiar su nombre.

## 5. Valores canónicos, presentación en el código {#_5-canonical-values-presentation-in-code}

**Decisión.** Cada valor se guarda en una única forma canónica y estándar, y el formato para
personas es una función:

| Valor    | Se guarda como                  | Estándar                         |
| -------- | ------------------------------- | -------------------------------- |
| Día      | `2024-06-15`                    | ISO 8601                         |
| Teléfono | `+3253820701`                   | E.164                            |
| IBAN     | `BE73679200844560`              | Formato electrónico ISO 13616    |
| Horario  | `Mo-Fr 08:30-12:30,13:30-16:00` | `opening_hours` de OpenStreetMap |
| Lengua   | Claves `nl`, `fr`, `de`         | ISO 639-1                        |

**Por qué.** Una sola forma por valor hace que los valores sean comparables, validables (el
dígito de control del IBAN se comprueba en los tests) y utilizables por otro software (enlaces
`tel:`, sistemas de pago, parsers de horarios). Las convenciones de presentación varían según el
contexto; los datos no deberían.

## 6. Procedencia en cada registro {#_6-provenance-on-every-record}

**Decisión.** Cada conjunto de datos enumera sus fuentes, su licencia y su fecha de revisión en
`datapackage.json`; cada registro extraído enumera las páginas de las que se leyó y el día en
que se vio su contenido por primera vez (`sources: [{ url, retrieved }]`).

**Por qué.** "¿De dónde viene esto y qué antigüedad tiene?" es la primera pregunta ante datos
jurídicos.

## 7. Los datos los construyen máquinas, a partir de capturas conservadas {#_7-the-data-is-built-by-machines-from-kept-snapshots}

**Decisión.** Cada semana un workflow descarga las fuentes oficiales, guarda las páginas como
capturas en la rama `sources`, reconstruye los datos a partir de ellas con los parsers de
`scripts/parse`, los prueba y abre un pull request cuando han cambiado. Nada se teclea a mano. Un
job semanal aparte comprueba si faltan tipos de interés, si hay revisiones atrasadas y si hay
fuentes caídas.

**Por qué.** Los datos jurídicos se quedan obsoletos sin avisar; las personas olvidan, los
calendarios no. Los datos introducidos a mano no se pueden comprobar ni rehacer; un parser se
puede probar, y las capturas muestran exactamente lo que decía la fuente ese día. El pull request
mantiene a una persona en el proceso: los datos de `main` nunca cambian sin revisión.

**Por tanto.** Las capturas viven en su propia rama, para que el historial del paquete no cargue
con megabytes de HTML. Los parsers se prueban con copias recortadas de páginas reales. Una página
que el parser no sabe ubicar detiene la build en lugar de producir un registro a medias. Dos
fuentes rechazan los servidores de GitHub (ejustice, police.be); se descargan desde una máquina
normal ([#24](https://github.com/pieterjanscheir/belgica/issues/24)).

## 8. Distribución: solo ESM, Node 22.12+, construido en cada release {#_8-distribution-esm-only-node-22-12-built-on-release}

**Decisión.** El paquete es solo ESM, requiere Node 22.12 o posterior, y el resultado de la build
no se incluye en el repositorio: lo construye y publica en npm el workflow de release, con
provenance.

**Por qué.** Node 18 y 20 han llegado al final de su vida útil. Desde Node 22.12, `require()`
carga ESM, así que una build CommonJS aparte solo añadiría una segunda copia de los datos (el
dual-package hazard) y más cosas que probar. El resultado de build incluido en el repositorio se
queda obsoleto y rompía las actualizaciones automáticas de dependencias.

**Por tanto.** Funcionan tanto `import` como `require()`, probados en Node 22.12, 22, 24 y 26.
Cada conjunto de datos tiene su propio entry point, de modo que una aplicación que solo necesita
los tipos de interés carga unos pocos kilobytes, no los tribunales ni el texto legal de cada
cantón (la [página de primeros pasos](./getting-started#import-only-what-you-need) mide cada uno
a partir de la build).

## 9. Tipos que llevan las garantías de los datos {#_9-types-that-carry-the-data-s-guarantees}

**Decisión.** Los ids son union types generados; los conjuntos de datos son `readonly`; las
búsquedas con un id conocido devuelven el registro, no `record | undefined`; los vocabularios
cerrados (tipos de tribunal, kinds, tipos de contacto) son unions. Las etiquetas de contacto son
texto libre, tal como las publica el tribunal: una lista cerrada obligaría a mapear cientos de
nombres de secretarías a unas pocas palabras, y eso es adivinar.

**Por qué.** Los errores aparecen al escribir el código en lugar de en producción, y los tipos
documentan los datos.

## 10. Controles de calidad {#_10-quality-gates}

**Decisión.** Cada cambio pasa por: TypeScript estricto (incluidos `noUncheckedIndexedAccess` y
`exactOptionalPropertyTypes`), ESLint con reglas estrictas con información de tipos, Prettier,
100 % de cobertura de tests de `src/`, validación con JSON Schema de todos los datos, tests de
integridad (ids, vínculos, recuentos, periodos), y `publint` + `arethetypeswrong` sobre el
paquete empaquetado.

**Por qué.** Un paquete de referencia solo merece que se dependa de él si es más fiable que
copiar los datos a mano.

## 11. El tiempo forma parte del modelo {#_11-time-is-part-of-the-model}

**Decisión.** Los registros llevan un periodo de validez (`validFrom`, `validTo`, ambos días
incluidos), cada conjunto de datos dice a partir de qué día describe la situación
(`territoryCoverage`, y `temporalCoverage` en `datapackage.json`), y las búsquedas aceptan un día
opcional: `getCanton(id, { on })`, `getCantonsForMunicipality(refnis, { on })`. Un día anterior a
la cobertura lanza un `RangeError`.

**Por qué.** Las preguntas jurídicas se refieren a un día: qué tribunal era competente cuando se
notificó la citación, qué tipo se aplicaba cuando venció la factura. Los cantones, los municipios
y los tribunales cambian; un modelo que solo conoce el "ahora" responde a preguntas sobre el
pasado con el mapa de hoy, y parece correcto mientras lo hace. Añadir el tiempo más tarde
cambiaría cada id y cada búsqueda, así que está en el modelo antes de que la historia esté en los
datos ([#27](https://github.com/pieterjanscheir/belgica/issues/27)).

**Por tanto.** Los tipos de interés ya tienen periodos. Una búsqueda por id sin día da la versión
de hoy, de modo que los ids conocidos mantienen su tipo no `undefined`; con un día puede no
encontrar nada. Cada conjunto de datos lleva el periodo, no solo el territorio: un registro
extraído que la fuente deja de mostrar se retira con un `validTo` en lugar de borrarse
(`scripts/parse/retire.ts`), de modo que un id, una vez publicado, se queda, y un tribunal que
cierra sigue siendo el tribunal que nombraba la citación del año pasado.

## 12. Las releases llevan los datos, no solo el paquete {#_12-releases-carry-the-data-not-only-the-package}

**Decisión.** Cada release de GitHub tiene los datos en JSON y como tablas CSV, con los esquemas
y `datapackage.json`, en un único zip. npm es una forma de obtener los datos, no la única.

**Por qué.** Las personas que más necesitan datos jurídicos de referencia belgas trabajan con
hojas de cálculo y otros lenguajes, no con JavaScript.

## 13. La geometría es una segunda fuente, y prevalece el texto {#_13-geometry-is-a-second-source-and-the-text-wins}

**Decisión.** Los límites de los cantones son la digitalización del NGI (Institut géographique
national / Nationaal Geografisch Instituut) del anexo del Code judiciaire (Gerechtelijk Wetboek),
tomada tal como se publica (vértice por vértice, sin simplificación, coordenadas al centímetro) y
emparejada con los cantones por nombre en ambas lenguas, con una tabla explícita de alias para el
resto. El texto `territory` del cantón sigue siendo la ley: donde la geometría y el texto
discrepan, prevalece el texto. La geometría tiene su propio entry point y la raíz del paquete no
la reexporta.

**Por qué.** Los polígonos del NGI son una lectura oficial del mismo texto, así que se pueden
citar y reconstruir; un límite derivado aquí a partir de datos de calles sería una tercera
lectura que nadie puede comprobar. Simplificar movería la línea, y las líneas importan sobre todo
donde se tocan los cantones. Un millón de posiciones empequeñecería cualquier otro conjunto de
datos, así que nadie debería cargarlas por accidente.

**Por tanto.** `findCantonsAt(lon, lat)` responde a partir de la geometría y la documentación lo
dice; un punto cerca de una línea es un caso para el texto. La build semanal falla cuando un
cantón no tiene límite o un feature no corresponde a ningún cantón
([#29](https://github.com/pieterjanscheir/belgica/issues/29)).

## Pendiente de decidir {#not-decided-yet}

| Pregunta                                                                | Issue                                                                                        |
| ----------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Historia anterior al 1 de enero de 2025                                 | [#27](https://github.com/pieterjanscheir/belgica/issues/27)                                  |
| Cálculo de intereses sobre un periodo (cómputo de días, capitalización) | No previsto hasta que el método pueda basarse en jurisprudencia o en orientaciones oficiales |
