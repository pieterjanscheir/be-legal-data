# Hoja de ruta {#roadmap}

Conjuntos de datos previstos, con el issue que especifica cada uno. Cada issue enumera las
fuentes oficiales, los campos propuestos y qué significa "terminado". Toda ayuda es bienvenida:
elige uno y sigue las [convenciones](/es/guide/contributing#adding-a-dataset).

## Previstos {#planned}

| Conjunto de datos                                                                                                                                                       | Para qué sirve                                                                                                                      | Issue                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Los demás tribunales**: Cour de cassation / Hof van Cassatie, Cour constitutionnelle / Grondwettelijk Hof, Conseil d'État / Raad van State, tribunales disciplinarios | Los tribunales superiores no están en el portal de los tribunales, así que necesitan sus propias fuentes                            | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **La maison de justice / Justizhaus de Eupen** (Comunidad germanófona)                                                                                                  | La única maison de justice que los datos aún no tienen                                                                              | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Historia**: cuándo cambiaron los cantones, los municipios y los tribunales                                                                                            | El modelo tiene periodos de validez y búsquedas por día; a las versiones anteriores aún les faltan los datos                        | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Dirección → coordenadas**                                                                                                                                             | Los [límites de los cantones](./canton-boundaries) encuentran el cantón de un punto; geocodificar la dirección es el paso que falta | [#66](https://github.com/pieterjanscheir/belgica/issues/66) |
| **Oficinas de huissiers de justice** (gerechtsdeurwaarders, los agentes judiciales de notificación y ejecución)                                                         | Encontrar un huissier de justice en un distrito judicial para una notificación o una ejecución                                      | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Zonas de policía** (politiezones / zones de police)                                                                                                                   | Qué zona corresponde a un municipio: denuncias, copias de atestados                                                                 | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Oficinas del catastro y de seguridad jurídica** (kadaster, antiguos hypotheekkantoren)                                                                                | Pedir certificados hipotecarios y extractos catastrales a la oficina competente                                                     | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## Vale la pena considerar {#worth-considering}

Cada uno tiene su propio issue, más o menos por orden de la frecuencia con que se usarían:

- **Secciones de municipio** (deelgemeenten, sections de commune) por código postal. Los
  [códigos postales](./postal-codes) se detienen en el municipio; la lista de bpost nombra las
  localidades pero no tiene código REFNIS ni licencia abierta
  ([#54](https://github.com/pieterjanscheir/belgica/issues/54)).
- **Tasas judiciales** (rolrechten / griffierechten) y los tramos de la **indemnización procesal**
  (rechtsplegingsvergoeding / indemnité de procédure), con sus periodos de validez y su
  indexación, como los tipos de interés
  ([#59](https://github.com/pieterjanscheir/belgica/issues/59),
  [#60](https://github.com/pieterjanscheir/belgica/issues/60)).
- **Vacaciones judiciales y días festivos** por año, para calcular los plazos procesales
  ([#61](https://github.com/pieterjanscheir/belgica/issues/61)).
- **Fiscalías** (parketten, arbeidsauditoraten) por distrito judicial
  ([#55](https://github.com/pieterjanscheir/belgica/issues/55)).
- **Notarios y cámaras de notarios**, **colegios de abogados** (balies / barreaux)
  ([#56](https://github.com/pieterjanscheir/belgica/issues/56),
  [#57](https://github.com/pieterjanscheir/belgica/issues/57)).
- **Fusiones de municipios**: códigos REFNIS antiguos → nuevos para 2019 y 2025, para poder
  relacionar datos más antiguos ([#53](https://github.com/pieterjanscheir/belgica/issues/53)).
- **El índice de salud** (gezondheidsindex / indice santé) para la indexación de los alquileres
  ([#62](https://github.com/pieterjanscheir/belgica/issues/62)).

## Por qué algunos conjuntos de datos aún no están aquí {#why-some-datasets-aren-t-here-yet}

Un conjunto de datos jurídico solo es útil si cada valor procede de una fuente oficial, así que
nada se añade a mano de memoria. Cada conjunto de datos lo construye un script a partir de
capturas de su fuente, y la mayoría de las fuentes las descarga cada semana GitHub Actions. Dos no
pueden, por ahora: el sitio del Moniteur belge / Belgisch Staatsblad (ejustice), de donde
proceden los cantones, y police.be rechazan ambos las conexiones desde los servidores de GitHub;
se descargan en cambio desde una máquina normal
([#52](https://github.com/pieterjanscheir/belgica/issues/52)). El directorio de los huissiers de
justice se construye en el navegador, así que hace falta un navegador para leerlo, o los datos de
la Chambre nationale des huissiers de justice
([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
