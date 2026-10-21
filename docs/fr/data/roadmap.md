# Feuille de route {#roadmap}

Les jeux de données prévus, avec l'issue qui spécifie chacun d'eux. Chaque issue liste les
sources officielles, les champs proposés et ce que « terminé » veut dire. L'aide est la
bienvenue : choisissez-en un et suivez les [conventions](/fr/guide/contributing#adding-a-dataset).

## Prévus {#planned}

| Jeu de données                                                                                                       | À quoi ça sert                                                                                                          | Issue                                                       |
| -------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Les autres juridictions** : Cour de cassation, Cour constitutionnelle, Conseil d'État, juridictions disciplinaires | Les juridictions suprêmes ne sont pas sur le portail des cours et tribunaux ; il leur faut donc leurs propres sources   | [#4](https://github.com/pieterjanscheir/belgica/issues/4)   |
| **La maison de justice d'Eupen** (Communauté germanophone)                                                           | La seule maison de justice que les données n'ont pas encore                                                             | [#3](https://github.com/pieterjanscheir/belgica/issues/3)   |
| **Historique** : quand les cantons, les communes et les juridictions ont changé                                      | Le modèle a des périodes de validité et des recherches par jour ; les versions antérieures attendent encore les données | [#27](https://github.com/pieterjanscheir/belgica/issues/27) |
| **Limites des cantons** en géométrie                                                                                 | Trouver le canton d'une adresse dans une ville scindée ; l'IGN publie les limites sur geo.be                            | [#29](https://github.com/pieterjanscheir/belgica/issues/29) |
| **Adresse → commune**                                                                                                | Les adresses viennent avec un code postal, pas avec un code REFNIS                                                      | [#28](https://github.com/pieterjanscheir/belgica/issues/28) |
| **Études d'huissiers de justice** (gerechtsdeurwaarders / huissiers de justice)                                      | Trouver un huissier dans un arrondissement pour une signification ou une exécution                                      | [#6](https://github.com/pieterjanscheir/belgica/issues/6)   |
| **Zones de police** (politiezones / zones de police)                                                                 | Quelle zone couvre une commune : plaintes, copies de procès-verbaux                                                     | [#7](https://github.com/pieterjanscheir/belgica/issues/7)   |
| **Cadastre et bureaux de la sécurité juridique** (kadaster, anciens hypotheekkantoren)                               | Demander des certificats hypothécaires et des extraits cadastraux au bureau compétent                                   | [#8](https://github.com/pieterjanscheir/belgica/issues/8)   |

## À envisager {#worth-considering}

Rassemblés dans [#9](https://github.com/pieterjanscheir/belgica/issues/9), à peu près
par ordre de fréquence d'utilisation :

- **Codes postaux → commune (REFNIS)**, avec les sections de commune (deelgemeenten). Les
  adresses viennent avec un code postal, pas avec un code REFNIS ; c'est le chaînon manquant pour
  « quel tribunal pour cette adresse ? ».
- **Droits de mise au rôle et droits de greffe** (rolrechten / griffierechten) et les tranches
  de l'**indemnité de procédure** (rechtsplegingsvergoeding), avec leurs périodes de validité et
  leur indexation, comme les taux d'intérêt.
- **Vacances judiciaires et jours fériés** par année, pour le calcul des délais de procédure.
- **Parquets et auditorats du travail** (parketten, arbeidsauditoraten) par arrondissement.
- **Notaires et chambres des notaires**, **barreaux** (balies / barreaux).
- **Fusions de communes** : anciens → nouveaux codes REFNIS pour 2019 et 2025, pour pouvoir
  convertir des données plus anciennes.
- **Provinces et régions** comme jeu de données à part entière (aujourd'hui seulement des codes).
- **L'indice santé** (gezondheidsindex) pour l'indexation des loyers.

## Pourquoi certains jeux de données ne sont pas encore là {#why-some-datasets-aren-t-here-yet}

Un jeu de données juridiques n'est utile que si chaque valeur vient d'une source officielle ;
rien n'est donc ajouté à la main, de mémoire. Chaque jeu de données est construit par un script
à partir d'instantanés de sa source, et la plupart des sources sont récupérées chaque semaine par
GitHub Actions. Deux ne peuvent pas l'être, pour l'instant : le site du Moniteur belge
(ejustice), d'où viennent les cantons, et police.be refusent tous deux les connexions depuis les
serveurs de GitHub ; ils sont récupérés depuis une machine ordinaire à la place
([#24](https://github.com/pieterjanscheir/belgica/issues/24)). L'annuaire des huissiers
est construit dans le navigateur, il faut donc un navigateur pour le lire, ou les données de la
Chambre nationale ([#6](https://github.com/pieterjanscheir/belgica/issues/6)).
