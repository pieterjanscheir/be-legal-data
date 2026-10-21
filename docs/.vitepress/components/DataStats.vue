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
    toDay,
} from '../../../src'

// Today's records: the files also hold retired versions
const today = toDay(new Date())
const courts = findCourts({})
const prisons = allPrisons.filter((p) => appliesOn(p, today))
const housesOfJustice = allHouses.filter((h) => appliesOn(h, today))
const splitCantons = cantons.filter((c) => c.municipalities.some((m) => m.partial)).length
</script>

<template>
    <table>
        <thead>
            <tr>
                <th>Dataset</th>
                <th>Records</th>
                <th>Page</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Judicial areas</td>
                <td>{{ judicialAreas.length }}</td>
                <td><a :href="withBase('/data/territory#judicial-areas')">Territory</a></td>
            </tr>
            <tr>
                <td>Arrondissements</td>
                <td>{{ arrondissements.length }}</td>
                <td><a :href="withBase('/data/territory#arrondissements')">Territory</a></td>
            </tr>
            <tr>
                <td>Cantons</td>
                <td>
                    {{ cantons.length }} ({{ splitCantons }} cover part of a split municipality)
                </td>
                <td><a :href="withBase('/data/territory#cantons')">Territory</a></td>
            </tr>
            <tr>
                <td>Municipalities</td>
                <td>{{ municipalities.length }}</td>
                <td><a :href="withBase('/data/territory#municipalities')">Territory</a></td>
            </tr>
            <tr>
                <td>Courts</td>
                <td>
                    {{ courts.length }} ({{ courts.filter((c) => c.kind === 'court').length }}
                    courts, the rest divisions and seats)
                </td>
                <td><a :href="withBase('/data/courts')">Courts</a></td>
            </tr>
            <tr>
                <td>Prisons</td>
                <td>{{ prisons.length }}</td>
                <td><a :href="withBase('/data/prisons')">Prisons</a></td>
            </tr>
            <tr>
                <td>Houses of justice</td>
                <td>{{ housesOfJustice.length }}</td>
                <td><a :href="withBase('/data/houses-of-justice')">Houses of justice</a></td>
            </tr>
        </tbody>
    </table>
</template>
