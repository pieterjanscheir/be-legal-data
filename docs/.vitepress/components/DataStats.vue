<script setup lang="ts">
import { withBase } from 'vitepress'
import {
    judicialAreas,
    arrondissements,
    cantons,
    municipalities,
    courts,
    prisons,
    housesOfJustice,
} from '../../../src'
import { fmt, useLocale, useStrings } from '../i18n'

const { prefix } = useLocale()
const t = useStrings({
    root: {
        dataset: 'Dataset',
        records: 'Records',
        page: 'Page',
        judicialAreas: 'Judicial areas',
        arrondissements: 'Arrondissements',
        cantons: 'Cantons',
        cantonsNote: '{n} ({split} cover part of a split municipality)',
        municipalities: 'Municipalities',
        courts: 'Courts',
        courtsNote: '{n} ({courts} courts, the rest divisions and seats)',
        prisons: 'Prisons',
        housesOfJustice: 'Houses of justice',
        territory: 'Territory',
    },
    nl: {
        dataset: 'Dataset',
        records: 'Records',
        page: 'Pagina',
        judicialAreas: 'Rechtsgebieden',
        arrondissements: 'Arrondissementen',
        cantons: 'Kantons',
        cantonsNote: '{n} ({split} beslaan een deel van een gesplitste gemeente)',
        municipalities: 'Gemeenten',
        courts: 'Hoven en rechtbanken',
        courtsNote: '{n} ({courts} hoven en rechtbanken, de rest afdelingen en zetels)',
        prisons: 'Gevangenissen',
        housesOfJustice: 'Justitiehuizen',
        territory: 'Territorium',
    },
    fr: {
        dataset: 'Jeu de données',
        records: 'Enregistrements',
        page: 'Page',
        judicialAreas: 'Ressorts',
        arrondissements: 'Arrondissements',
        cantons: 'Cantons',
        cantonsNote: "{n} ({split} couvrent une partie d'une commune scindée)",
        municipalities: 'Communes',
        courts: 'Cours et tribunaux',
        courtsNote: '{n} ({courts} cours et tribunaux, le reste divisions et sièges)',
        prisons: 'Prisons',
        housesOfJustice: 'Maisons de justice',
        territory: 'Territoire',
    },
})

// Links into the pages of the language the reader is in
const link = (path: string) => withBase(`${prefix.value}${path}`)

const splitCantons = cantons.filter((c) => c.municipalities.some((m) => m.partial)).length
const wholeCourts = courts.filter((c) => c.kind === 'court').length
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>{{ t.dataset }}</th>
                <th>{{ t.records }}</th>
                <th>{{ t.page }}</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>{{ t.judicialAreas }}</td>
                <td>{{ judicialAreas.length }}</td>
                <td>
                    <a :href="link('/data/territory#judicial-areas')">{{ t.territory }}</a>
                </td>
            </tr>
            <tr>
                <td>{{ t.arrondissements }}</td>
                <td>{{ arrondissements.length }}</td>
                <td>
                    <a :href="link('/data/territory#arrondissements')">{{ t.territory }}</a>
                </td>
            </tr>
            <tr>
                <td>{{ t.cantons }}</td>
                <td>{{ fmt(t.cantonsNote, { n: cantons.length, split: splitCantons }) }}</td>
                <td>
                    <a :href="link('/data/territory#cantons')">{{ t.territory }}</a>
                </td>
            </tr>
            <tr>
                <td>{{ t.municipalities }}</td>
                <td>{{ municipalities.length }}</td>
                <td>
                    <a :href="link('/data/territory#municipalities')">{{ t.territory }}</a>
                </td>
            </tr>
            <tr>
                <td>{{ t.courts }}</td>
                <td>{{ fmt(t.courtsNote, { n: courts.length, courts: wholeCourts }) }}</td>
                <td>
                    <a :href="link('/data/courts')">{{ t.courts }}</a>
                </td>
            </tr>
            <tr>
                <td>{{ t.prisons }}</td>
                <td>{{ prisons.length }}</td>
                <td>
                    <a :href="link('/data/prisons')">{{ t.prisons }}</a>
                </td>
            </tr>
            <tr>
                <td>{{ t.housesOfJustice }}</td>
                <td>{{ housesOfJustice.length }}</td>
                <td>
                    <a :href="link('/data/houses-of-justice')">{{ t.housesOfJustice }}</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
