# Contribuir {#contributing}

## Actualizar los datos {#updating-data}

Los tribunales, las prisiones, las maisons de justice / justitiehuizen y los límites de los
cantones se construyen cada semana a partir de las fuentes oficiales
([cómo](./data-quality#how-the-data-is-built)): no los edites a mano. Corrige el parser en
`scripts/parse` o, si la propia fuente está mal, comunícaselo al tribunal. El pull request
semanal se revisa como cualquier otro: compara el diff con las fuentes antes de fusionarlo.

Para los conjuntos de datos que se mantienen a mano (áreas judiciales, distritos judiciales,
tipos de interés):

1. Edita el JSON de `data/`. Conserva los ids existentes: los proyectos los guardan.
2. Actualiza `lastReviewed` del conjunto de datos en `datapackage.json` si lo has contrastado con
   sus fuentes.
3. `pnpm check`: regenera los tipos de id y los esquemas, comprueba tipos, lint y formato,
   construye, ejecuta los tests con cobertura y el lint del paquete. Falla cuando los archivos
   generados no están en el commit.
4. Añade una línea a `CHANGELOG.md` bajo Unreleased y haz commit (incluidos `schema/`,
   `src/ids.generated.ts` e `ids.lock.json`). El resultado de la build (`dist/`) no se incluye en
   el repositorio: se construye en cada release y se publica en npm.

Un id que se ha publicado se queda: `ids.lock.json` los enumera todos y los tests fallan cuando
falta uno en los datos. Si una fuente ha renombrado un registro, asigna el nombre nuevo al id
existente en el parser; si el registro ha terminado, consérvalo con un `validTo`. Ver
[identificadores](./identifiers#stability).

### Cantones y municipios {#cantons-and-municipalities}

`data/cantons.json` y `data/municipalities.json` son generados; no los edites a mano. Ejecuta
`pnpm build:cantons` (necesita acceso a la red y `unzip`). Lee:

- el anexo del Code judiciaire (Gerechtelijk Wetboek), "Gebiedsomschrijving en zetel van hoven
  en rechtbanken"
  ([ELI, numac 1967101058](https://www.ejustice.just.fgov.be/eli/wet/1967/10/10/1967101058/justel)),
  en neerlandés y francés;
- el archivo de población por municipio de Statbel, para los municipios actuales y los códigos
  REFNIS.

Analiza los textos neerlandés y francés por separado y se niega a escribir nada si no coinciden y
cada municipio no está cubierto exactamente una vez (o dividido entre varios cantones). Los
exónimos que usa el anexo pero no Statbel (`Gembloers`, `Saint-Nicolas`, …), las erratas del
anexo y las menciones de límites que no sabe distinguir se enumeran al principio del script.

Vuelve a ejecutarlo cuando una ley modifique el anexo o se fusionen municipios. Los ids de los
cantones siguen la lengua local (neerlandés en Flandes y Bruselas, francés en Valonia, alemán en
torno a Eupen); la justice de paix (vredegerecht) del cantón `x` tiene el id
`justice-of-the-peace-x` y se vincula a él mediante su campo `canton`.

### Conjuntos de datos extraídos {#scraped-datasets}

```bash
pnpm fetch:sources            # todas las fuentes en .sources/ (unos 20 minutos, con educación)
pnpm fetch:sources courts     # o una sola fuente
pnpm build:data               # reconstruye tribunales, prisiones, maisons de justice, códigos postales, regiones y provincias a partir de .sources/
```

Los límites de los cantones proceden del GeoPackage del NGI (fuente `ngi`), leído con el SQLite
propio de Node; cuando el NGI renombra un cantón, asigna su código al id en `CANTON_ALIASES` en
`scripts/parse/boundaries.ts`.

O haz checkout de las últimas capturas en lugar de descargarlas:
`git worktree add .sources origin/sources`.

Una fuente es un recorrido en `scripts/sources/catalog.ts`; un parser lee sus capturas en
`scripts/parse`. Cuando un sitio cambia su marcado, los tests de los parsers en `test/parse`
(con copias recortadas de páginas reales en `test/fixtures/sources`) muestran qué se ha roto.

### Nuevos tipos de interés {#new-interest-rates}

- **Comercial**: el FOD Financiën / SPF Finances publica el tipo por semestre. Añade un periodo
  con `from`, `to`, `rate` y la fecha del Staatsblad (Moniteur belge) en `note`.
- **Legal**: se publica por año natural. Añade un periodo para el año.

## Añadir un conjunto de datos {#adding-a-dataset}

Todos los conjuntos de datos reciben el mismo trato, para que los usuarios puedan confiar en
ellos:

1. **Datos**: `data/<name>.json`, un array de registros. Cada valor procede de una fuente oficial.
2. **Ids**: sigue las [reglas de identificadores](./identifiers): un código oficial cuando existe
   uno; si no, kebab-case en minúsculas a partir del nombre en la lengua local (`scripts/id.ts`).
3. **Vínculos, no copias**: refiérete a distritos judiciales, cantones y municipios por id, y
   reutiliza los tipos compartidos (`Translated`, `Address`, `Contact`, `SourceRef`).
4. **Fuentes**: un `sources: [{ url, retrieved }]` en cada registro, y una entrada en
   `datapackage.json` con las fuentes, la licencia, `lastReviewed` y `reviewEveryMonths` del
   conjunto de datos.
5. **Tipos y helpers**: `src/<name>.ts`, exportado desde `src/index.ts`, más un entry point en
   `tsup.config.ts` y en los `exports` de `package.json`.
6. **Esquema**: añade el tipo del archivo a `scripts/schema-types.ts` y a
   `scripts/build-schemas.ts`.
7. **Fuente y parser**: un recorrido en `scripts/sources/catalog.ts` que descarga las páginas
   oficiales, y un parser en `scripts/parse` que construye el archivo a partir de las capturas,
   con fixtures y tests. Solo lee lo que puede leer con certeza e informa del resto.
8. **Tests**: ids únicos, referencias que se resuelven y el recuento que da la fuente oficial.
9. **Documentación**: una página en `docs/data/` con para qué sirve, fuente y actualizaciones, y
   una tabla de campos.

## Comprobaciones {#checks}

| Comando                     | Qué hace                                                                                                                                                                                  |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pnpm check`                | Todo lo que ejecuta la CI: `generate`, `typecheck`, `lint`, `build`, `test:coverage`, `test:package`, `lint:package`, y una comprobación de que los archivos generados están en el commit |
| `pnpm test`                 | Tests unitarios, de integridad, de esquema y de tipos sobre el código fuente (sin build)                                                                                                  |
| `pnpm test:package`         | Smoke tests del paquete construido con `import` y `require()`: ejecuta antes `pnpm build`                                                                                                 |
| `pnpm test:coverage`        | Lo mismo, y falla por debajo del 100 % de cobertura de `src/`                                                                                                                             |
| `pnpm lint` / `pnpm format` | ESLint y Prettier: comprobar / corregir                                                                                                                                                   |
| `pnpm generate`             | Regenera `src/ids.generated.ts` (tipos de id) y `schema/` a partir de los datos y los tipos, y añade los ids nuevos a `ids.lock.json`                                                     |
| `pnpm lint:package`         | `publint` y `arethetypeswrong` sobre el paquete empaquetado                                                                                                                               |
| `pnpm test:freshness`       | Comprobaciones basadas en fechas: tipos que faltan, revisiones atrasadas. No forma parte de `check`; `FRESHNESS_ONLINE=1` comprueba también las URLs de las fuentes                       |
| `pnpm fetch:sources`        | Descarga las fuentes oficiales en `.sources/`                                                                                                                                             |
| `pnpm build:data`           | Reconstruye los tribunales, prisiones, maisons de justice, códigos postales, regiones, provincias y límites de los cantones a partir de `.sources/`                                       |
| `pnpm build:csv`            | Escribe los datos como tablas CSV en `csv/`                                                                                                                                               |

## Publicar una versión {#releasing}

1. Mueve las entradas de Unreleased de `CHANGELOG.md` bajo la nueva versión.
2. Sube `version` en `package.json` y haz commit.
3. Crea el tag y haz push: `git tag v0.3.0 && git push && git push --tags`.

El workflow de release ejecuta `pnpm check`, publica el tag en npm con provenance y crea una
release de GitHub con los datos, los esquemas y las tablas CSV adjuntos. El tag tiene que
coincidir con `version`.

## Este sitio web {#this-website}

El sitio vive en `docs/` y se construye con [VitePress](https://vitepress.dev). Las tablas
interactivas importan el propio `src/` y `data/` del paquete, así que siempre muestran los datos
del repositorio.

```bash
pnpm docs:dev      # servidor local con recarga en caliente
pnpm docs:build    # sitio estático en docs/.vitepress/dist
pnpm docs:preview  # sirve el sitio construido
```

Cada push a `main` lo despliega en GitHub Pages. La CI lo construye en cada pull request, así que
una página rota se detecta antes de fusionar.

### Traducciones {#translations}

Las páginas en inglés de `docs/` son la fuente de verdad. Cada una de las demás lenguas tiene el
mismo árbol en su propia carpeta: neerlandés (`docs/nl/`) y francés (`docs/fr/`), y alemán,
español, italiano, portugués, polaco, turco, árabe, ucraniano, chino y japonés (`docs/de/`,
`docs/es/`, etc.). Son traducciones de la página en inglés y se actualizan después de que esta
cambie. Cuando cambies una página en inglés, cambia también la misma página en `docs/nl/` y
`docs/fr/`, o indica en el pull request que las traducciones van con retraso; las demás lenguas
pueden ir una release por detrás. Los textos del tema y de los componentes interactivos en esas
otras lenguas están en `docs/.vitepress/locales/`.

El código, los ids, los nombres de los campos y los nombres oficiales se quedan como están en
todas las lenguas, y cada encabezado conserva el ancla inglesa (`## Encabezado {#english-anchor}`)
para que los enlaces entre páginas y el selector de idioma sigan funcionando. Una institución o un
término jurídico belga conserva su nombre oficial neerlandés o francés (o alemán, donde Bélgica
publica uno) en lugar de una traducción inventada: una página en chino dice vredegerecht / justice
de paix, no una palabra fabricada para ello. El registro de cambios se mantiene solo en inglés.
