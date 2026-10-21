<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    courts,
    arrondissements,
    formatPhoneNumber,
    formatIban,
    getArrondissement,
    getJudicialArea,
    type Court,
    type CourtType,
} from '../../../src'

const types: [CourtType, string][] = [
    ['justice-of-the-peace', 'Justice of the peace'],
    ['police-court', 'Police court'],
    ['court-of-first-instance', 'Court of first instance'],
    ['enterprise-court', 'Enterprise court'],
    ['labour-court', 'Labour court'],
    ['court-of-appeal', 'Court of appeal'],
    ['labour-court-of-appeal', 'Labour court of appeal'],
    ['court-of-assize', 'Court of assize'],
]

const type = ref<CourtType | ''>('')
const arrondissement = ref('')
const query = ref('')
const limit = ref(50)

const name = (c: Court) => c.name.nl ?? c.name.fr ?? c.name.de ?? c.id
const where = (c: Court) =>
    c.arrondissement ?
        getArrondissement(c.arrondissement)?.name.nl
    :   `${getJudicialArea(c.judicialArea)?.name.nl ?? ''} (judicial area)`

const rows = computed(() => {
    const q = query.value.trim().toLowerCase()
    return courts.filter(
        (c) =>
            (!type.value || c.type === type.value) &&
            (!arrondissement.value || c.arrondissement === arrondissement.value) &&
            (!q ||
                c.id.includes(q) ||
                Object.values(c.name).some((n) => n.toLowerCase().includes(q)) ||
                c.address?.city.toLowerCase().includes(q)),
    )
})
</script>

<template>
    <div class="bld-panel">
        <div class="bld-controls">
            <label>
                Search
                <input v-model="query" placeholder="Name, city or id" />
            </label>
            <label>
                Type
                <select v-model="type">
                    <option value="">All</option>
                    <option v-for="[value, label] in types" :key="value" :value="value">
                        {{ label }}
                    </option>
                </select>
            </label>
            <label>
                Arrondissement
                <select v-model="arrondissement">
                    <option value="">All</option>
                    <option v-for="a in arrondissements" :key="a.id" :value="a.id">
                        {{ a.name.nl }}
                    </option>
                </select>
            </label>
        </div>
        <p class="bld-muted">
            {{ rows.length }} of {{ courts.length }} courts, divisions and seats
        </p>
        <table>
            <thead>
                <tr>
                    <th>Name, as published</th>
                    <th>Address</th>
                    <th>Contacts</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="c in rows.slice(0, limit)" :key="c.id">
                    <td>
                        <template v-for="(n, lang) in c.name" :key="lang">
                            <a :href="c.website[lang]">{{ n }}</a
                            ><br />
                        </template>
                        <code>{{ c.id }}</code
                        ><br />
                        <span class="bld-muted">{{ where(c) }}</span>
                    </td>
                    <td>
                        <template v-if="c.address">
                            <span v-if="c.address.building">{{ c.address.building }}<br /></span>
                            {{ c.address.street }}<br />
                            {{ c.address.postalCode }} {{ c.address.city }}
                        </template>
                        <span v-else class="bld-muted">No single address</span>
                        <div v-if="c.openingHours" class="bld-muted">
                            <code>{{ c.openingHours }}</code>
                        </div>
                    </td>
                    <td>
                        <div v-for="k in c.contacts.slice(0, 6)" :key="k.type + k.value + k.label">
                            <a v-if="k.type === 'email'" :href="'mailto:' + k.value">{{
                                k.value
                            }}</a>
                            <span v-else-if="k.type === 'bank-account'">{{
                                formatIban(k.value)
                            }}</span>
                            <a v-else :href="'tel:' + k.value"
                                >{{ k.type === 'fax' ? 'fax ' : ''
                                }}{{ formatPhoneNumber(k.value) }}</a
                            >
                            <span v-if="k.label || k.note" class="bld-muted">
                                ({{ [k.label, k.note].filter(Boolean).join(': ') }})</span
                            >
                        </div>
                        <div v-if="c.contacts.length > 6" class="bld-muted">
                            and {{ c.contacts.length - 6 }} more
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
        <button v-if="rows.length > limit" class="bld-more" @click="limit += 50">Show more</button>
    </div>
</template>
