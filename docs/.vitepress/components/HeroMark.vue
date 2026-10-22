<script setup lang="ts">
// The logo at hero size: the b's data cells settle into place over a faint 3 × 4 grid
const size = 52
const gap = 14
const pos = (i: number) => i * (size + gap)

/** [row, column, kind]: the cells of the b; the rest of the grid stays a faint outline */
const cells: [number, number, 'ink' | 'yellow' | 'red'][] = [
    [0, 0, 'ink'],
    [1, 0, 'ink'],
    [2, 0, 'ink'],
    [3, 0, 'ink'],
    [1, 1, 'ink'],
    [1, 2, 'yellow'],
    [2, 2, 'ink'],
    [3, 1, 'ink'],
    [3, 2, 'red'],
]
const ghosts: [number, number][] = [
    [0, 1],
    [0, 2],
    [2, 1],
]
</script>

<template>
    <div class="hero-mark" aria-hidden="true">
        <svg :viewBox="`-24 -24 ${pos(3) - gap + 48} ${pos(4) - gap + 48}`">
            <rect
                v-for="[row, col] in ghosts"
                :key="`g${row}${col}`"
                class="ghost"
                :x="pos(col)"
                :y="pos(row)"
                :width="size"
                :height="size"
                rx="13"
            />
            <rect
                v-for="([row, col, kind], i) in cells"
                :key="`c${row}${col}`"
                :class="['cell', kind]"
                :style="{ animationDelay: `${120 + i * 70}ms` }"
                :x="pos(col)"
                :y="pos(row)"
                :width="size"
                :height="size"
                rx="13"
            />
        </svg>
    </div>
</template>

<style scoped>
/* Centred in the theme's hero image box, over its glow (--vp-home-hero-image-*) */
.hero-mark {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 200px;
    height: 250px;
    transform: translate(-50%, -50%);
}

svg {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: visible;
}

.ghost {
    fill: none;
    stroke: var(--vp-c-divider);
    stroke-width: 2;
    stroke-dasharray: 6 6;
}

.cell {
    transform-box: fill-box;
    transform-origin: center;
    animation: settle 520ms cubic-bezier(0.2, 0.8, 0.2, 1.2) both;
}

.cell.ink {
    fill: var(--bg-ink);
}
.cell.yellow {
    fill: var(--bg-yellow);
}
.cell.red {
    fill: var(--bg-red);
}

/* Movement only, no fade: the mark shows even where the animation never runs */
@keyframes settle {
    from {
        transform: translateY(-14px) scale(0.6);
    }
}

@media (prefers-reduced-motion: reduce) {
    .cell {
        animation: none;
    }
}

@media (min-width: 640px) {
    .hero-mark {
        width: 250px;
        height: 312px;
    }
}

@media (min-width: 960px) {
    .hero-mark {
        width: 270px;
        height: 338px;
    }
}
</style>
