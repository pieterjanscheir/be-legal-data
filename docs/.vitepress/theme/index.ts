import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import CantonLookup from '../components/CantonLookup.vue'
import CourtList from '../components/CourtList.vue'
import InterestRates from '../components/InterestRates.vue'
import DataStats from '../components/DataStats.vue'
import './style.css'

export default {
    extends: DefaultTheme,
    enhanceApp({ app }) {
        app.component('CantonLookup', CantonLookup)
        app.component('CourtList', CourtList)
        app.component('InterestRates', InterestRates)
        app.component('DataStats', DataStats)
    },
} satisfies Theme
