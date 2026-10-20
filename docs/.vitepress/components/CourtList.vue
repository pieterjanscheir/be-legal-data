<script setup lang="ts">
import { computed, ref } from 'vue'
import {
    courts,
    arrondissements,
    formatCourtName,
    getArrondissement,
    type CourtType,
    type Locale,
} from '../../../src'

const type = ref<CourtType | ''>('')
const arrondissement = ref('')
const locale = ref<Locale>('nl')
const query = ref('')

const used = arrondissements.filter((a) => courts.some((c) => c.arrondissement === a.id))

const rows = computed(() => {
    const q = query.value.trim().toLowerCase()
    return courts.filter(
        (c) =>
            (!type.value || c.type === type.value) &&
            (!arrondissement.value || c.arrondissement === arrondissement.value) &&
            (!q || c.id.toLowerCase().includes(q) || formatCourtName(c, locale.value).toLowerCase().includes(q)),
    )
})
</script>

<template>
    <div class="bld-panel">
        <div class="bld-controls">
            <label>
                Search
                <input v-model="query" placeholder="Name or id" />
            </label>
            <label>
                Type
                <select v-model="type">
                    <option value="">All</option>
                    <option value="justice-of-the-peace">Justice of the peace</option>
                    <option value="enterprise-court">Enterprise court</option>
                </select>
            </label>
            <label>
                Arrondissement
                <select v-model="arrondissement">
                    <option value="">All</option>
                    <option v-for="a in used" :key="a.id" :value="a.id">{{ a.name.nl }}</option>
                </select>
            </label>
            <label>
                Language
                <select v-model="locale">
                    <option value="nl">nl</option>
                    <option value="fr">fr</option>
                    <option value="de">de</option>
                </select>
            </label>
        </div>
        <p class="bld-muted">{{ rows.length }} of {{ courts.length }} courts</p>
        <table>
            <thead>
                <tr>
                    <th>Name (<code>formatCourtName</code>)</th>
                    <th>Id</th>
                    <th>Address</th>
                    <th>Contact</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="c in rows" :key="c.id">
                    <td>
                        {{ formatCourtName(c, locale) }}<br />
                        <span class="bld-muted">{{ getArrondissement(c.arrondissement)?.name[locale] }}</span>
                    </td>
                    <td><code>{{ c.id }}</code></td>
                    <td>
                        <span v-if="c.address.building">{{ c.address.building }}<br /></span>
                        {{ c.address.street }} {{ c.address.houseNumber }}<br />
                        {{ c.address.postalCode }} {{ c.address.city }}
                    </td>
                    <td>
                        <div v-for="k in c.contacts" :key="k.type + k.value + k.label">
                            <a v-if="k.type === 'email'" :href="'mailto:' + k.value">{{ k.value }}</a>
                            <span v-else>{{ k.value }}</span>
                            <span v-if="k.label" class="bld-muted"> ({{ k.label }})</span>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
