<script setup lang="ts">
import { withBase } from 'vitepress'
import { judicialAreas, arrondissements, cantons, municipalities, courts } from '../../../src'

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
                <td>{{ cantons.length }} ({{ splitCantons }} cover part of a split municipality)</td>
                <td><a :href="withBase('/data/territory#cantons')">Territory</a></td>
            </tr>
            <tr>
                <td>Municipalities</td>
                <td>{{ municipalities.length }}</td>
                <td><a :href="withBase('/data/territory#municipalities')">Territory</a></td>
            </tr>
            <tr>
                <td>Courts</td>
                <td>{{ courts.length }}</td>
                <td><a :href="withBase('/data/courts')">Courts</a></td>
            </tr>
        </tbody>
    </table>
</template>
