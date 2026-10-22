<script setup lang="ts">
import { withBase } from 'vitepress'
import {
    appliesOn,
    judicialAreas,
    arrondissements,
    cantons,
    municipalities,
    findCourts,
    prisons as allPrisons,
    housesOfJustice as allHouses,
    postalCodes as allPostalCodes,
    toDay,
} from '../../../src'
import { fmt, useLocale, useStrings } from '../i18n'

const { prefix } = useLocale()
const t = useStrings('DataStats', {
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
        postalCodes: 'Postal codes',
        postalCodesNote: '{n} ({codes} postal codes, {shared} shared by two municipalities)',
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
        postalCodes: 'Postcodes',
        postalCodesNote: '{n} ({codes} postcodes, {shared} gedeeld door twee gemeenten)',
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
        postalCodes: 'Codes postaux',
        postalCodesNote: '{n} ({codes} codes postaux, {shared} partagés par deux communes)',
        territory: 'Territoire',
    },
})

// Links into the pages of the language the reader is in
const link = (path: string) => withBase(`${prefix.value}${path}`)

// Today's records: the files also hold retired versions
const today = toDay(new Date())
const courts = findCourts({})
const prisons = allPrisons.filter((p) => appliesOn(p, today))
const housesOfJustice = allHouses.filter((h) => appliesOn(h, today))
const postalCodes = allPostalCodes.filter((p) => appliesOn(p, today))
const postalCodeCounts = new Map<string, number>()
for (const p of postalCodes)
    postalCodeCounts.set(p.postalCode, (postalCodeCounts.get(p.postalCode) ?? 0) + 1)
const sharedPostalCodes = [...postalCodeCounts.values()].filter((n) => n > 1).length
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
                <td>{{ t.postalCodes }}</td>
                <td>
                    {{
                        fmt(t.postalCodesNote, {
                            n: postalCodes.length,
                            codes: postalCodeCounts.size,
                            shared: sharedPostalCodes,
                        })
                    }}
                </td>
                <td>
                    <a :href="link('/data/postal-codes')">{{ t.postalCodes }}</a>
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
