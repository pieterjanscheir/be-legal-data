# Identifiants {#identifiers}

Chaque enregistrement a un `id`. Les autres enregistrements, votre base de données et vos URL s'y
réfèrent ; un identifiant doit donc être juste une fois pour toutes et ne plus jamais changer.
Cette page expose les règles, la raison d'être de chacune, et ce qui se passe quand la loi
modifie la chose qu'un identifiant désigne.

## Les règles {#the-rules}

1. **Chaque enregistrement a un champ `id`**, unique au sein de son jeu de données. Le code
   générique (un index, un cache, un formulaire) traite chaque jeu de données de la même façon.
2. **Un code officiel l'emporte, s'il couvre tous les enregistrements.** Là où les autorités
   attribuent un code à chaque enregistrement d'un jeu de données, l'identifiant _est_ ce code :
   les communes utilisent leur code REFNIS de Statbel (`44021` pour Gand). Un code qui ne couvre
   qu'une partie des enregistrements est conservé comme champ : les tribunaux ont leur code ECLI
   dans `ecli`, les maisons de justice flamandes leur numéro OVO dans `ovo` (voir
   [pourquoi](#why-not-the-official-court-codes)).
3. **Sinon, du kebab-case ASCII en minuscules** : `^[a-z0-9]+(-[a-z0-9]+)*$`, construit par
   [`scripts/id.ts`](https://github.com/pieterjanscheir/be-legal-data/blob/main/scripts/id.ts) :
   les accents sont supprimés, tout ce qui n'est ni lettre ni chiffre devient un seul tiret.
   `Merelbeke-Melle` → `merelbeke-melle`, `Braine-l'Alleud` → `braine-l-alleud`,
   `Liège` → `liege`.
4. **À partir du nom officiel dans la langue locale** : le néerlandais en Flandre, le français en
   Wallonie, l'allemand autour d'Eupen. Bruxelles est officiellement bilingue et requiert un choix
   fixe : le néerlandais.
5. **Un numéro est un suffixe** : les lieux comptant plusieurs cantons reçoivent `gent-1` …
   `gent-5`.
6. **Les tribunaux sont `type` + lieu** : `justice-of-the-peace-gent-1`, `court-of-appeal-liege`.
   Une justice de paix reprend l'identifiant de son canton. Les deux tribunaux d'un même type à
   Bruxelles, un par langue, ajoutent `-nl` ou `-fr` (`police-court-brussel-fr`). Une division ou
   un siège ajoute son propre lieu à l'identifiant de son tribunal (`enterprise-court-gent-brugge`).
   Le préfixe garde les identifiants uniques quand Gand a une justice de paix, un tribunal de
   l'entreprise et un tribunal du travail, et il est exactement le `type` de l'enregistrement, de
   sorte qu'il n'a jamais besoin d'un second vocabulaire.
7. **Les prisons et les maisons de justice sont leur nom** dans la langue locale, sans article :
   `gevangenis-gent`, `prison-lantin`, `justitiehuis-gent`, `maison-justice-arlon`. Leur nom dit
   déjà ce qu'elles sont, et deux institutions dans une même ville (la prison centrale et la
   prison auxiliaire de Louvain) se distinguent par leur nom.
8. **Les liens sont des champs, jamais des chaînes dérivées.** Une justice de paix a un champ
   `canton` ; un canton liste des `{ municipality }` ; un arrondissement a un `judicialArea`.
   Chacun contient l'identifiant de l'enregistrement visé, et le champ est nommé d'après le jeu de
   données qu'il vise.

Tout cela est imposé par des tests (`test/ids.test.ts`) et par les [JSON Schema](./schema), qui
listent les identifiants valides, de sorte qu'un lien pendant échoue à la validation.

## Les identifiants {#the-ids}

| Jeu de données      | Exemples                                                                                                                  | Règle                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------- | ----------------------- |
| Ressorts            | `antwerpen`, `brussel`, `gent`, `liege`, `mons`                                                                           | Nom local               |
| Arrondissements     | `oost-vlaanderen`, `brabant-wallon`, `eupen`                                                                              | Nom local               |
| Cantons             | `gent-1`, `merelbeke-melle`, `wavre-1`, `oudergem`, `eupen-sankt-vith-1`                                                  | Nom local + numéro      |
| Limites des cantons | `gent-1` : une limite par canton, avec l'identifiant du canton, et `canton` comme lien                                    | L'identifiant du canton |
| Communes            | `44021`, `21004`                                                                                                          | Code REFNIS             |
| Cours et tribunaux  | `justice-of-the-peace-gent-1`, `enterprise-court-gent-brugge`, `police-court-brussel-fr`, `police-court-eupen-sankt-vith` | Type + lieu             |
| Prisons             | `gevangenis-gent`, `prison-lantin`, `detentiehuis-kortrijk`                                                               | Nom local               |
| Maisons de justice  | `justitiehuis-gent`, `maison-justice-arlon`                                                                               | Nom local               |
| Taux d'intérêt      | `legal`, `commercial`                                                                                                     | Clés fixes              |

## Pourquoi ces choix {#why-these-choices}

**Pourquoi le kebab-case ?** Les identifiants finissent dans des URL (`/cantons/gent-1`), des noms
de fichiers, des classes CSS, des clés de base de données et des lignes de journal. Les
minuscules évitent les collisions sur les systèmes insensibles à la casse (les systèmes de
fichiers de macOS et Windows, de nombreuses collations de bases de données) : `Gent1` et `gent1`
seraient deux identifiants dans les données et un seul fichier sur le disque. Les tirets gardent
les limites de mots lisibles sans majuscules, et le jeu de caractères n'a besoin d'aucun
échappement nulle part.

**Pourquoi des identifiants lisibles plutôt que des numéros ou des UUID ?** Un jeu de données de
référence est lu par des personnes : `justice-of-the-peace-gent-1` dans une ligne de base de
données ou un message d'erreur vous dit de quoi il s'agit. Les identifiants sont aussi stables
que des numéros le seraient, parce qu'ils ne changent que lorsque la loi modifie la chose qu'ils
désignent (voir ci-dessous), et un nouvel identifiant est alors le bon résultat.

**Pourquoi la langue locale, et pas l'anglais ?** Des noms anglais existent pour une poignée de
lieux (Ghent, Antwerp, Liege) et pas pour les 162 cantons ; des identifiants anglais
impliqueraient donc deux règles. Le nom local est aussi celui que l'institution utilise
elle-même, et c'est celui des textes officiels.

**Pourquoi des codes officiels ?** Le REFNIS est ce qu'utilisent Statbel, les régions et presque
tous les jeux de données belges. Avec le code comme identifiant, les joindre aux cantons et aux
tribunaux ne demande aucune table de correspondance.

**Pourquoi `type` dans les identifiants de tribunaux ?** Dans un même lieu, il y a plusieurs
tribunaux, et les types de tribunaux vont s'étoffer (tribunaux de police, tribunaux du travail,
tribunaux de première instance…). Les champs propres d'un tribunal disent ce qu'il est ;
l'identifiant n'a besoin que d'être unique et reconnaissable, et le type assure les deux.

**Pourquoi pas les codes officiels des tribunaux ?** Les tribunaux ont deux codes officiels, et
aucun ne couvre tous les tribunaux. Les codes ECLI (`HBGNT` pour la cour d'appel de Gand)
existent par juridiction et par langue, pas par division, et aucun n'apparaît dans les décisions
publiées des justices de paix. Les numéros d'entreprise (BCE) appartiennent au SPF Justice ; ses
unités d'établissement suivent les bâtiments, pas les tribunaux, et changent quand un tribunal
déménage. Une règle qui vaut pour chaque enregistrement l'emporte sur deux règles ; les codes
ECLI sont donc un champ (`ecli`), et l'identifiant suit la règle 6.

**Pourquoi des liens explicites ?** L'ancien schéma construisait l'identifiant d'un tribunal en
concaténant `Vredegerecht` et l'identifiant du canton. Cela cache une relation dans le format
d'une chaîne, qui se brise dès qu'un tribunal dessert deux cantons ou qu'un nom change. Un champ
`canton` est vérifié par le schéma et par les tests, et peut être suivi dans les deux sens.

## En TypeScript {#in-typescript}

Chaque jeu de données a un type d'identifiant généré (`CantonId`, `CourtId`, `MunicipalityId`,
`ArrondissementId`, `JudicialAreaId`, `PrisonId`, `HouseOfJusticeId`), régénéré à partir des
données par `pnpm build:ids` :

```ts
import { getCanton, type CantonId } from 'be-legal-data'

getCanton('gent-1') // Canton : un identifiant connu trouve toujours son enregistrement
getCanton(userInput) // Canton | undefined : toute autre chaîne peut ne rien trouver

const id: CantonId = 'gent1' // erreur de compilation : ce n'est pas un identifiant de canton
```

Utilisez les types d'identifiants pour les valeurs que vous stockez, pour qu'une faute de frappe
ou un identifiant supprimé soit détecté lors de la mise à jour.

## Quand la loi change un identifiant {#when-the-law-changes-an-id}

Les cantons et les communes changent bel et bien : des communes ont fusionné en 2019 et en 2025,
et des lois redessinent les cantons. Les enregistrements portent une période de validité
(`validFrom`, `validTo`), de sorte qu'un changement ajoute de l'historique au lieu de l'effacer :

1. L'ancien enregistrement reste, avec un `validTo` ; le nouveau reçoit un nouvel identifiant et
   un `validFrom`. Un identifiant n'est jamais réutilisé pour autre chose, si bien qu'un
   identifiant stocké il y a des années trouve toujours ce qu'il désignait.
2. Sans jour, les recherches répondent pour aujourd'hui : une recherche par identifiant donne la
   version qui s'applique aujourd'hui (la dernière, pour un enregistrement qui a pris fin), et les
   listes telles que `getCantonsForMunicipality` uniquement ce qui s'applique aujourd'hui. Avec
   `{ on }`, les deux répondent pour ce jour-là.
3. Le changelog liste chaque nouvel identifiant et les identifiants qu'il remplace.

Un simple changement de nom, comme une correction orthographique, ne change pas l'identifiant.
L'historique antérieur au 1er janvier 2025 n'est pas encore dans les données
([#27](https://github.com/pieterjanscheir/be-legal-data/issues/27)) : une recherche pour un jour
antérieur lève une `RangeError` plutôt que de répondre avec la carte d'aujourd'hui.

## Stabilité {#stability}

Les identifiants font partie de l'API publique. Ajouter des enregistrements est une version
mineure, corriger une valeur un patch, et supprimer ou renommer un identifiant une version
majeure. La version 0.3.0 remplace les anciens identifiants en PascalCase (`VredegerechtGent1`,
`EastFlanders`) par ce schéma avant que le package n'ait le moindre utilisateur ; le
[Changelog](./changelog) liste la correspondance.
