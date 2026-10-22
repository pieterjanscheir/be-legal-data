<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import {
    interestRates,
    getInterestRate,
    getLatestKnownRateDate,
    type InterestType,
} from '../../../src'
import { fmt, useLocale, usePageLang, useStrings } from '../i18n'

const { locale } = useLocale()
const t = useStrings('InterestRates', {
    root: {
        rate: 'Rate',
        legal: 'Legal (wettelijke interest)',
        commercial: 'Commercial transactions',
        day: 'Day',
        after2013: 'Contract concluded on or after 16 March 2013',
        noRate: 'No rate on file',
        period: 'Period {from} to {to}.',
        latest: 'Latest day covered: {date}.',
        source: 'Source: {source}',
        from: 'From',
        to: 'To',
        rateHeader: 'Rate',
        before2013: 'Contracts before 16/3/2013',
        note: 'Note',
    },
    nl: {
        rate: 'Rentevoet',
        legal: 'Wettelijke interest',
        commercial: 'Handelstransacties',
        day: 'Dag',
        after2013: 'Overeenkomst gesloten op of na 16 maart 2013',
        noRate: 'Geen rentevoet bekend',
        period: 'Periode {from} tot {to}.',
        latest: 'Laatste gedekte dag: {date}.',
        source: 'Bron: {source}',
        from: 'Van',
        to: 'Tot',
        rateHeader: 'Rentevoet',
        before2013: 'Overeenkomsten van vóór 16/3/2013',
        note: 'Opmerking',
    },
    fr: {
        rate: 'Taux',
        legal: 'Intérêt légal',
        commercial: 'Transactions commerciales',
        day: 'Jour',
        after2013: 'Contrat conclu le 16 mars 2013 ou après',
        noRate: 'Aucun taux connu',
        period: 'Période du {from} au {to}.',
        latest: 'Dernier jour couvert : {date}.',
        source: 'Source : {source}',
        from: 'Du',
        to: 'Au',
        rateHeader: 'Taux',
        before2013: 'Contrats antérieurs au 16/3/2013',
        note: 'Remarque',
    },
})

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

// Belgian number formatting in English (5,75 %), the page's own everywhere else
const pageLang = usePageLang()
const numberLocale = computed(() => (locale.value === 'root' ? 'nl-BE' : pageLang.value))
const fmtRate = (rate: number) => `${rate.toLocaleString(numberLocale.value)} %`
</script>

<template>
    <div class="bld-panel">
        <div class="bld-controls">
            <label>
                {{ t.rate }}
                <select v-model="type">
                    <option value="legal">{{ t.legal }}</option>
                    <option value="commercial">{{ t.commercial }}</option>
                </select>
            </label>
            <label>
                {{ t.day }}
                <input v-model="date" type="date" />
            </label>
            <label v-if="type === 'commercial'">
                <input v-model="after2013" type="checkbox" />
                {{ t.after2013 }}
            </label>
        </div>
        <p v-if="result" class="bld-result">{{ fmtRate(result.rate) }}</p>
        <p v-else class="bld-result">{{ t.noRate }}</p>
        <p class="bld-muted">
            <template v-if="result"
                >{{ fmt(t.period, { from: result.period.from, to: result.period.to }) }}
            </template>
            {{ fmt(t.latest, { date: latest }) }}
        </p>
        <pre
            class="bld-muted"
        ><code>getInterestRate('{{ date }}', '{{ type }}'{{ type === 'commercial' && after2013 ? ', { contractAfter20130316: true }' : '' }})</code></pre>
    </div>

    <p class="bld-muted">{{ series.description }} {{ fmt(t.source, { source: series.source }) }}</p>

    <table>
        <thead>
            <tr>
                <th>{{ t.from }}</th>
                <th>{{ t.to }}</th>
                <th>{{ t.rateHeader }}</th>
                <th v-if="type === 'commercial'">{{ t.before2013 }}</th>
                <th>{{ t.note }}</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="p in periods" :key="p.from">
                <td>{{ p.from }}</td>
                <td>{{ p.to }}</td>
                <td>{{ fmtRate(p.rate) }}</td>
                <td v-if="type === 'commercial'">
                    {{
                        p.rateForContractsBefore20130316 !== undefined ?
                            fmtRate(p.rateForContractsBefore20130316)
                        :   ''
                    }}
                </td>
                <td class="bld-muted">{{ p.note }}</td>
            </tr>
        </tbody>
    </table>
</template>
