<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
    interestRates,
    getInterestRate,
    getLatestKnownRateDate,
    type InterestType,
} from '../../../src'

const type = ref<InterestType>('legal')
// Set on mount so the prerendered page doesn't freeze the build date
const date = ref('2026-01-01')
onMounted(() => {
    date.value = new Date().toISOString().slice(0, 10)
})
const after2013 = ref(false)

const result = computed(() =>
    getInterestRate(date.value, type.value, { contractAfter20130316: after2013.value }),
)
const latest = computed(() => getLatestKnownRateDate(type.value))
const series = computed(() => interestRates[type.value])
const periods = computed(() => [...series.value.periods].reverse())

const fmt = (rate: number) => `${rate.toLocaleString('nl-BE')} %`
</script>

<template>
    <div class="bld-panel">
        <div class="bld-controls">
            <label>
                Rate
                <select v-model="type">
                    <option value="legal">Legal (wettelijke interest)</option>
                    <option value="commercial">Commercial transactions</option>
                </select>
            </label>
            <label>
                Day
                <input v-model="date" type="date" />
            </label>
            <label v-if="type === 'commercial'">
                <input v-model="after2013" type="checkbox" />
                Contract concluded on or after 16 March 2013
            </label>
        </div>
        <p v-if="result" class="bld-result">{{ fmt(result.rate) }}</p>
        <p v-else class="bld-result">No rate on file</p>
        <p class="bld-muted">
            <template v-if="result"
                >Period {{ result.period.from }} to {{ result.period.to }}.
            </template>
            Latest day covered: {{ latest }}.
        </p>
        <pre
            class="bld-muted"
        ><code>getInterestRate('{{ date }}', '{{ type }}'{{ type === 'commercial' && after2013 ? ', { contractAfter20130316: true }' : '' }})</code></pre>
    </div>

    <p class="bld-muted">{{ series.description }} Source: {{ series.source }}</p>

    <table>
        <thead>
            <tr>
                <th>From</th>
                <th>To</th>
                <th>Rate</th>
                <th v-if="type === 'commercial'">Contracts before 16/3/2013</th>
                <th>Note</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in periods" :key="p.from">
                <td>{{ p.from }}</td>
                <td>{{ p.to }}</td>
                <td>{{ fmt(p.rate) }}</td>
                <td v-if="type === 'commercial'">
                    {{
                        p.rateForContractsBefore20130316 !== undefined ?
                            fmt(p.rateForContractsBefore20130316)
                        :   ''
                    }}
                </td>
                <td class="bld-muted">{{ p.note }}</td>
            </tr>
        </tbody>
    </table>
</template>
