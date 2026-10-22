<script setup lang="ts">
import { computed, ref, shallowRef } from 'vue'
import {
    getCanton,
    getCourtsForCanton,
    getMunicipality,
    type Canton,
    type Court,
    type CourtType,
} from '../../../src'
import type { CantonBoundary } from '../../../src/canton-boundaries'
import { geocode, type AddressCandidate, type GeocodeSource } from '../geocode'
import { fmt, inLang, useLocale, useStrings } from '../i18n'

const { dataLang } = useLocale()
const t = useStrings('AddressLookup', {
    root: {
        address: 'Address',
        placeholder: 'Street and number, postal code and municipality',
        find: 'Find the courts',
        examples: 'Try',
        searching: 'Looking up the address…',
        none: 'No address found. Check the spelling, and give the postal code.',
        failed: "Couldn't reach {source}: {error}",
        match: 'Match',
        streetOnly:
            'The register knows the street but not this house number: the point is somewhere on the street, which may itself be the boundary between two cantons. Check the number.',
        canton: 'Canton',
        outside: 'This point lies in no canton: is it in Belgium?',
        onLine: 'The address lies on the boundary between {cantons}: the courts of each are listed, and the law decides. Read each canton’s area below.',
        near: 'The address is {m} m from the boundary with {other}. The NGI drew the boundary from the law, and the law decides: read both cantons’ areas below.',
        split: '{name} is split over several cantons; the address decides which.',
        legalText: 'The canton’s area in the law',
        courts: 'Courts for this address',
        map: 'Show on OpenStreetMap',
        source: 'Address from {register}. Reference data, not legal advice.',
        'type.justice-of-the-peace': 'Justice of the peace',
        'type.police-court': 'Police court',
        'type.court-of-first-instance': 'Court of first instance',
        'type.enterprise-court': 'Enterprise court',
        'type.labour-court': 'Labour court',
        'type.court-of-appeal': 'Court of appeal',
        'type.labour-court-of-appeal': 'Labour court of appeal',
        'type.court-of-assize': 'Court of assize',
    },
    nl: {
        address: 'Adres',
        placeholder: 'Straat en nummer, postcode en gemeente',
        find: 'Zoek de rechtbanken',
        examples: 'Probeer',
        searching: 'Adres opzoeken…',
        none: 'Geen adres gevonden. Controleer de spelling en geef de postcode.',
        failed: '{source} niet bereikbaar: {error}',
        match: 'Resultaat',
        streetOnly:
            'Het register kent de straat maar niet dit huisnummer: het punt ligt ergens in de straat, die zelf de grens tussen twee kantons kan zijn. Controleer het nummer.',
        canton: 'Kanton',
        outside: 'Dit punt ligt in geen enkel kanton: ligt het in België?',
        onLine: 'Het adres ligt op de grens tussen {cantons}: de rechtbanken van elk staan hieronder, en de wet beslist. Lees hieronder het gebied van elk kanton.',
        near: 'Het adres ligt {m} m van de grens met {other}. Het NGI tekende de grens naar de wet, en de wet beslist: lees hieronder het gebied van beide kantons.',
        split: '{name} is verdeeld over meerdere kantons; het adres beslist welk.',
        legalText: 'Het gebied van het kanton volgens de wet',
        courts: 'Rechtbanken voor dit adres',
        map: 'Toon op OpenStreetMap',
        source: 'Adres uit {register}. Referentiedata, geen juridisch advies.',
        'type.justice-of-the-peace': 'Vredegerecht',
        'type.police-court': 'Politierechtbank',
        'type.court-of-first-instance': 'Rechtbank van eerste aanleg',
        'type.enterprise-court': 'Ondernemingsrechtbank',
        'type.labour-court': 'Arbeidsrechtbank',
        'type.court-of-appeal': 'Hof van beroep',
        'type.labour-court-of-appeal': 'Arbeidshof',
        'type.court-of-assize': 'Hof van assisen',
    },
    fr: {
        address: 'Adresse',
        placeholder: 'Rue et numéro, code postal et commune',
        find: 'Trouver les juridictions',
        examples: 'Essayez',
        searching: 'Recherche de l’adresse…',
        none: 'Aucune adresse trouvée. Vérifiez l’orthographe et indiquez le code postal.',
        failed: '{source} injoignable : {error}',
        match: 'Résultat',
        streetOnly:
            'Le registre connaît la rue mais pas ce numéro : le point est quelque part dans la rue, qui peut elle-même être la limite entre deux cantons. Vérifiez le numéro.',
        canton: 'Canton',
        outside: 'Ce point ne se trouve dans aucun canton : est-il en Belgique ?',
        onLine: 'L’adresse se trouve sur la limite entre {cantons} : les juridictions de chacun sont listées, et la loi décide. Lisez ci-dessous le territoire de chaque canton.',
        near: 'L’adresse est à {m} m de la limite avec {other}. L’IGN a tracé la limite d’après la loi, et la loi décide : lisez ci-dessous le territoire des deux cantons.',
        split: '{name} est répartie sur plusieurs cantons ; l’adresse décide lequel.',
        legalText: 'Le territoire du canton selon la loi',
        courts: 'Juridictions pour cette adresse',
        map: 'Voir sur OpenStreetMap',
        source: 'Adresse issue de {register}. Données de référence, pas un avis juridique.',
        'type.justice-of-the-peace': 'Justice de paix',
        'type.police-court': 'Tribunal de police',
        'type.court-of-first-instance': 'Tribunal de première instance',
        'type.enterprise-court': 'Tribunal de l’entreprise',
        'type.labour-court': 'Tribunal du travail',
        'type.court-of-appeal': 'Cour d’appel',
        'type.labour-court-of-appeal': 'Cour du travail',
        'type.court-of-assize': 'Cour d’assises',
    },
})

const REGISTERS: Record<GeocodeSource, string> = {
    flanders: 'the Adressenregister (Digitaal Vlaanderen, Geolocation API)',
    brussels: 'UrbIS (paradigm.brussels)',
    wallonia: 'ICAR (SPW, geocodeWS)',
}

// Addresses in split cities, one per region
const EXAMPLES = [
    'Kerkstraat 10, 2060 Antwerpen',
    'Rue de la Loi 16, 1000 Bruxelles',
    'Place Saint-Lambert 18, 4000 Liège',
]

const COURT_ORDER: CourtType[] = [
    'justice-of-the-peace',
    'police-court',
    'court-of-first-instance',
    'enterprise-court',
    'labour-court',
    'court-of-appeal',
    'labour-court-of-appeal',
    'court-of-assize',
]

/** Within this distance of another canton, the boundary is too close to call from the map */
const NEAR_METRES = 25

const query = ref('')
const loading = ref(false)
const candidates = ref<AddressCandidate[]>([])
const failed = ref<{ source: GeocodeSource; error: string }[]>([])
const searched = ref(false)
const selected = ref(0)

// The boundaries are megabytes: loaded on the first search, not with the page
type Boundaries = typeof import('../../../src/canton-boundaries')
const boundaries = shallowRef<Boundaries>()

let controller: AbortController | undefined

async function search(address = query.value) {
    query.value = address
    if (!address.trim()) return
    controller?.abort()
    // Only the latest search writes its results: an earlier one can finish after it starts
    const current = new AbortController()
    controller = current
    loading.value = true
    try {
        const [result] = await Promise.all([
            geocode(address, current.signal),
            boundaries.value ??
                import('../../../src/canton-boundaries').then((m) => (boundaries.value = m)),
        ])
        if (controller !== current) return
        candidates.value = result.candidates
        failed.value = result.failed
        selected.value = 0
        searched.value = true
    } catch (error) {
        if ((error as Error).name !== 'AbortError') throw error
    } finally {
        if (controller === current) loading.value = false
    }
}

const candidate = computed(() => candidates.value[selected.value])

const cantons = computed<Canton[]>(() =>
    candidate.value && boundaries.value ?
        boundaries.value.findCantonsAt(candidate.value.longitude, candidate.value.latitude)
    :   [],
)

// Distances in metres on a plane tangent at the point: plenty for tens of metres
function toMetres(lon: number, lat: number, origin: AddressCandidate): [number, number] {
    const k = Math.cos((origin.latitude * Math.PI) / 180)
    return [(lon - origin.longitude) * 111_320 * k, (lat - origin.latitude) * 110_574]
}

function distanceToSegment(a: [number, number], b: [number, number]): number {
    // The point is the origin
    const [dx, dy] = [b[0] - a[0], b[1] - a[1]]
    const length2 = dx * dx + dy * dy
    const t = length2 ? Math.max(0, Math.min(1, -(a[0] * dx + a[1] * dy) / length2)) : 0
    return Math.hypot(a[0] + t * dx, a[1] + t * dy)
}

/** Metres from the point to the nearest edge of a boundary, or Infinity when far away */
function distanceTo(boundary: CantonBoundary, at: AddressCandidate): number {
    // About 100 m in degrees: a cheap first filter on each vertex
    const margin = 0.0015
    let best = Infinity
    for (const ring of boundary.geometry.coordinates.flat()) {
        for (let i = 1; i < ring.length; i++) {
            const [p, q] = [ring[i - 1]!, ring[i]!]
            if (Math.abs(p[0] - at.longitude) > margin && Math.abs(q[0] - at.longitude) > margin)
                continue
            if (Math.abs(p[1] - at.latitude) > margin && Math.abs(q[1] - at.latitude) > margin)
                continue
            best = Math.min(
                best,
                distanceToSegment(toMetres(p[0], p[1], at), toMetres(q[0], q[1], at)),
            )
        }
    }
    return best
}

/** Other cantons whose boundary lies within NEAR_METRES of the point, nearest first */
const nearby = computed(() => {
    const at = candidate.value
    const lib = boundaries.value
    if (!at || !lib) return []
    const inside = new Set(cantons.value.map((c) => c.id))
    return lib.cantonBoundaries
        .filter((b) => !b.validTo && !inside.has(b.canton))
        .map((b) => ({ canton: b.canton, metres: distanceTo(b, at) }))
        .filter((n) => n.metres <= NEAR_METRES)
        .sort((a, b) => a.metres - b.metres)
})

// A point on the line between two cantons gets both, and the courts of each
const courts = computed(() => {
    const found = new Map(
        cantons.value.flatMap((c) => getCourtsForCanton(c.id)).map((court) => [court.id, court]),
    )
    return [...found.values()].sort(
        (a, b) => COURT_ORDER.indexOf(a.type) - COURT_ORDER.indexOf(b.type),
    )
})

const splitMunicipality = computed(() =>
    cantons.value[0]?.municipalities.find((m) => m.partial === true),
)

/** 'Antwerpen 4': the name alone doesn't tell a city's cantons apart */
function cantonName(canton: Canton | undefined): string {
    if (!canton) return ''
    const name = inLang(canton.name, dataLang.value)
    return canton.number ? `${name} ${canton.number}` : name
}

function typeLabel(court: Court): string {
    return (t.value as Record<string, string>)[`type.${court.type}`] ?? court.type
}

const osm = computed(() => {
    const c = candidate.value
    return c ?
            `https://www.openstreetmap.org/?mlat=${c.latitude}&mlon=${c.longitude}#map=19/${c.latitude}/${c.longitude}`
        :   ''
})
</script>

<template>
    <div class="bld-panel">
        <form class="bld-controls" @submit.prevent="search()">
            <label class="bld-address">
                {{ t.address }}
                <input v-model="query" :placeholder="t.placeholder" autocomplete="street-address" />
            </label>
            <button type="submit" class="bld-more" :disabled="loading">{{ t.find }}</button>
        </form>
        <p class="bld-muted">
            {{ t.examples }}:
            <template v-for="(example, i) in EXAMPLES" :key="example">
                <a href="#" @click.prevent="search(example)">{{ example }}</a
                ><span v-if="i < EXAMPLES.length - 1"> · </span>
            </template>
        </p>

        <p v-if="loading" class="bld-muted">{{ t.searching }}</p>
        <p v-for="f in failed" :key="f.source" class="bld-warning">
            {{ fmt(t.failed, { source: REGISTERS[f.source], error: f.error }) }}
        </p>

        <template v-if="searched && !loading">
            <p v-if="!candidate" class="bld-muted">{{ t.none }}</p>
            <template v-else>
                <div v-if="candidates.length > 1" class="bld-controls">
                    <label>
                        {{ t.match }}
                        <select v-model="selected">
                            <option v-for="(c, i) in candidates" :key="i" :value="i">
                                {{ c.label }}
                            </option>
                        </select>
                    </label>
                </div>
                <p>
                    <strong>{{ candidate.label }}</strong>
                    <span class="bld-muted">
                        · {{ candidate.latitude.toFixed(6) }},
                        {{ candidate.longitude.toFixed(6) }} ·
                        <a :href="osm" target="_blank" rel="noopener">{{ t.map }}</a>
                    </span>
                </p>
                <p v-if="!candidate.precise" class="bld-warning">{{ t.streetOnly }}</p>

                <p v-if="!cantons.length" class="bld-warning">{{ t.outside }}</p>
                <template v-else>
                    <p class="bld-result">
                        <template v-for="(c, i) in cantons" :key="c.id">
                            <span v-if="i"> / </span>{{ cantonName(c) }}
                            <code class="bld-muted">{{ c.id }}</code>
                        </template>
                    </p>
                    <p v-if="cantons.length > 1" class="bld-warning">
                        {{ fmt(t.onLine, { cantons: cantons.map(cantonName).join(' / ') }) }}
                    </p>
                    <p v-if="splitMunicipality" class="bld-muted">
                        {{
                            fmt(t.split, {
                                name: inLang(
                                    getMunicipality(splitMunicipality.municipality)?.name,
                                    dataLang,
                                ),
                            })
                        }}
                    </p>
                    <p v-for="n in nearby.slice(0, 1)" :key="n.canton" class="bld-warning">
                        {{
                            fmt(t.near, {
                                m: Math.round(n.metres),
                                other: cantonName(getCanton(n.canton)),
                            })
                        }}
                    </p>

                    <h4>{{ t.courts }}</h4>
                    <table>
                        <tbody>
                            <tr v-for="court in courts" :key="court.id">
                                <td>{{ typeLabel(court) }}</td>
                                <td>
                                    {{ inLang(court.name, dataLang) }}
                                    <div v-if="court.address" class="bld-muted">
                                        {{ court.address.street }}, {{ court.address.postalCode }}
                                        {{ court.address.city }}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <details v-if="splitMunicipality || nearby.length || cantons.length > 1">
                        <summary>{{ t.legalText }}</summary>
                        <div v-for="c in cantons" :key="c.id">
                            <h4>
                                <code>{{ c.id }}</code>
                            </h4>
                            <p class="bld-muted">{{ c.territory[dataLang] }}</p>
                        </div>
                        <div v-for="n in nearby" :key="n.canton">
                            <h4>
                                <code>{{ n.canton }}</code>
                            </h4>
                            <p class="bld-muted">{{ getCanton(n.canton)?.territory[dataLang] }}</p>
                        </div>
                    </details>
                </template>
                <p class="bld-muted">
                    {{ fmt(t.source, { register: REGISTERS[candidate.source] }) }}
                </p>
            </template>
        </template>
    </div>
</template>

<style scoped>
.bld-address {
    flex: 1 1 320px;
}
.bld-address input {
    flex: 1;
}
.bld-warning {
    border-left: 3px solid var(--vp-c-warning-1);
    padding: 4px 10px;
    background: var(--vp-c-warning-soft);
    border-radius: 4px;
    font-size: 14px;
}
</style>
