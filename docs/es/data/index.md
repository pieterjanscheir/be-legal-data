# Conjuntos de datos {#datasets}

Cada conjunto de datos es un archivo JSON en `data/`, descrito por un [JSON Schema](/es/guide/schema)
y registrado en [`datapackage.json`](/es/guide/schema#datapackage-json) con sus fuentes oficiales,
su licencia y la fecha en que se contrastó con ellas por última vez.

| Conjunto de datos                                   | Registros | Para qué lo usarías                                                                                                |
| --------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------ |
| [Áreas judiciales](./territory#judicial-areas)      | 5         | Qué cour d'appel (y qué cour du travail) conoce de un recurso                                                      |
| [Distritos judiciales](./territory#arrondissements) | 12        | Agrupar tribunales, fiscalías y huissiers de justice; la unidad que usan la mayoría de las reglas de competencia   |
| [Cantones](./territory#cantons)                     | 162       | Qué justice de paix (vredegerecht) es competente para una dirección                                                |
| [Límites de los cantones](./canton-boundaries)      | 162       | El cantón de un punto en una ciudad dividida; los cantones en un mapa (GeoJSON)                                    |
| [Municipios](./territory#municipalities)            | 565       | Cruzar cualquier dirección o estadística belga con el mapa judicial mediante el código REFNIS                      |
| [Regiones](./territory#regions)                     | 3         | La región de un municipio, por código REFNIS, con su nombre en tres lenguas                                        |
| [Provincias](./territory#provinces)                 | 10        | La provincia de un municipio (ninguna en Bruselas), con su región                                                  |
| [Códigos postales](./postal-codes)                  | 1 152     | Del código postal de una dirección a su municipio, y de ahí a sus cantones y tribunales                            |
| [Tribunales](./courts)                              | 347       | Nombres, direcciones y contactos de las secretarías para escribir, presentar escritos o pagar a cualquier tribunal |
| [Prisiones](./prisons)                              | 39        | Direcciones y contactos de cada prisión y casa de detención                                                        |
| [Maisons de justice](./houses-of-justice)           | 27        | Libertad vigilada, atención a las víctimas y estudios sociales para los tribunales de familia                      |
| [Tipos de interés](./interest-rates)                | 2 series  | Calcular los intereses de demora de una reclamación                                                                |

## Cómo encajan los conjuntos de datos {#how-the-datasets-fit-together}

```
Área judicial ──< Distrito judicial ──< Cantón >──< Municipio (REFNIS) ──< Código postal
      │                   │               │  │
      │                   │               │  └── Límite del cantón   la geometría del cantón (NGI)
      └────────────── Tribunal ───────────┘  una justice de paix se vincula a su cantón,
                          │                  y la dirección de cada tribunal a su municipio
                          └──< División      una división se vincula a su tribunal
```

`──<` se lee "tiene varios". Un municipio suele estar en un solo cantón; las ciudades divididas
(Antwerpen, Gent, Brussel, Luik, …) están en varios. En el lado administrativo,
`Región ──< Provincia ──< Municipio`, salvo que la Región de Bruselas-Capital no tiene provincia
y contiene directamente sus 19 municipios.

Los registros se vinculan entre sí por id, nunca por nombre: un tribunal tiene un id
`judicialArea` y, cuando su área es un distrito judicial, un id `arrondissement`; un cantón
enumera los códigos REFNIS de sus municipios; un código postal y la dirección de un tribunal
llevan el código REFNIS de su municipio. Los nombres cambian de grafía entre fuentes y lenguas;
los ids no.

## Por qué son útiles estos datos {#why-this-data-is-useful}

El trabajo jurídico en Bélgica tropieza una y otra vez con las mismas búsquedas, y las fuentes
oficiales son difíciles de usar desde el código:

- **Competencia.** La justice de paix, el tribunal de police y muchos otros tribunales son
  competentes por razón del lugar. La ley (el anexo del Code judiciaire / Gerechtelijk Wetboek)
  describe esas áreas en prosa, en parte calle por calle. `cantons.json` lo convierte en una
  búsqueda de municipio a cantón, y conserva el texto legal de las ciudades divididas;
  `canton-boundaries.json` añade la geometría del NGI, de modo que un punto en una ciudad dividida
  encuentra su cantón.
- **Nombres y direcciones correctos.** Las citaciones, los escritos de conclusiones y las cartas
  deben dirigirse al tribunal correcto tal como se denomina a sí mismo, como `Vredegerecht Gent 1`
  o `Ondernemingsrechtbank Gent - afdeling Brugge`, y llegar a la secretaría correcta. Los nombres
  se toman de las propias páginas de los tribunales, en cada lengua en que publican.
- **Cálculo de intereses.** Las reclamaciones por demora en el pago usan el tipo de interés legal
  o, entre empresas, el tipo de las operaciones comerciales. Ambos cambian cada año o cada
  semestre, y la transición de 2013–2015 depende de la fecha del contrato. Equivocarse en un
  periodo cambia el importe reclamado.
- **Cruzar otros datos.** Los códigos REFNIS son lo que usan Statbel, las regiones y la mayoría de
  los datos abiertos. Relacionarlos con cantones y distritos judiciales permite situar volumen de
  asuntos, población o direcciones en el mapa judicial.

## Lo que (aún) no contiene {#what-isn-t-in-it-yet}

Consulta las [lagunas conocidas](./known-gaps) para las limitaciones de los datos actuales y la
[hoja de ruta](./roadmap) para los conjuntos de datos previstos: los tribunales superiores, la
historia, los huissiers de justice (gerechtsdeurwaarders), las zonas de policía y las oficinas del
catastro y de hipotecas.

::: warning Datos de referencia, no asesoramiento jurídico
Los datos se contrastan con las fuentes oficiales, pero las fuentes cambian y los errores
ocurren. Consulta la fuente oficial antes de basarte en un valor, e
[informa de cualquier error](https://github.com/pieterjanscheir/belgica/issues/new?template=data-correction.yml).
:::
