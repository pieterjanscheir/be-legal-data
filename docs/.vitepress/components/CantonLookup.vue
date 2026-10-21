<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    municipalities,
    getCantonsForMunicipality,
    getArrondissement,
    getJusticeOfThePeace,
    getContact,
} from '../../../src'

const provinces: Record<string, string> = {
    '04000': 'Brussels-Capital Region',
    '10000': 'Antwerpen',
    '20001': 'Vlaams-Brabant',
    '20002': 'Brabant wallon',
    '30000': 'West-Vlaanderen',
    '40000': 'Oost-Vlaanderen',
    '50000': 'Hainaut',
    '60000': 'Liège',
    '70000': 'Limburg',
    '80000': 'Luxembourg',
    '90000': 'Namur',
}

const query = ref('Gent')
const selected = ref<string | null>(null)

const normalize = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()

const matches = computed(() => {
    const q = normalize(query.value.trim())
    if (!q) return []
    return municipalities
        .filter(
            (m) =>
                m.id.startsWith(q) ||
                normalize(m.name.nl).includes(q) ||
                normalize(m.name.fr).includes(q),
        )
        .slice(0, 12)
})

const municipality = computed(() => {
    const id = selected.value ?? matches.value[0]?.id
    return municipalities.find((m) => m.id === id)
})

const cantons = computed(() =>
    municipality.value ? getCantonsForMunicipality(municipality.value.id) : [],
)

function label(m: { name: { nl: string; fr: string } }) {
    return m.name.nl === m.name.fr ? m.name.nl : `${m.name.nl} / ${m.name.fr}`
}
</script>

<template>
    <div class="bld-panel">
        <div class="bld-controls">
            <label>
                Municipality or REFNIS code
                <input
                    v-model="query"
                    placeholder="e.g. Gent, Liège, 44021"
                    @input="selected = null"
                />
            </label>
            <label v-if="matches.length > 1">
                Match
                <select v-model="selected">
                    <option v-for="m in matches" :key="m.id" :value="m.id">
                        {{ label(m) }} ({{ m.id }})
                    </option>
                </select>
            </label>
        </div>

        <p v-if="!municipality" class="bld-muted">No municipality found.</p>
        <template v-else>
            <p>
                <strong>{{ label(municipality) }}</strong>
                <span class="bld-muted">
                    · REFNIS {{ municipality.id }} · {{ provinces[municipality.province] }}
                </span>
                <span v-if="cantons.length > 1" class="bld-badge"
                    >split over {{ cantons.length }} cantons</span
                >
            </p>
            <table>
                <thead>
                    <tr>
                        <th>Canton id</th>
                        <th>Seat</th>
                        <th>Arrondissement</th>
                        <th>Justice of the peace</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="c in cantons" :key="c.id">
                        <td>
                            <code>{{ c.id }}</code>
                        </td>
                        <td>
                            {{ c.seat.nl
                            }}<span v-if="c.seat.fr !== c.seat.nl"> / {{ c.seat.fr }}</span>
                        </td>
                        <td>{{ getArrondissement(c.arrondissement)?.name.nl }}</td>
                        <td>
                            <template v-for="court in [getJusticeOfThePeace(c.id)]" :key="c.id">
                                <template v-if="court">
                                    {{ court.name.nl ?? court.name.fr ?? court.name.de }}<br />
                                    <span class="bld-muted">{{ getContact(court, 'email') }}</span>
                                </template>
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
            <details v-if="cantons.length > 1">
                <summary>Which part of {{ municipality.name.nl }} belongs to which canton?</summary>
                <div v-for="c in cantons" :key="c.id">
                    <h4>
                        <code>{{ c.id }}</code>
                    </h4>
                    <p class="bld-muted">{{ c.territory.nl }}</p>
                </div>
            </details>
        </template>
    </div>
</template>
