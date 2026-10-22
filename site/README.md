# belgica explorer

A Next.js site built on the package, deployed with the docs at
https://pieterjanscheir.github.io/belgica/explore/. It's a static export: every page is rendered
from the package's data at build time, so it needs no server.

```bash
pnpm build          # the package, which the site imports from the workspace
pnpm site:dev       # http://localhost:3000
pnpm site:build     # out/; SITE_BASE=/belgica/explore for the path it's served under
```

- `scripts/build-map.ts` simplifies the canton boundaries (23 MB) into `public/canton-map.json`
  (under 200 kB), which every map loads once.
- `app/search-index.json/route.ts` writes the search box's index at build time.
- Names render in Dutch, French and German at once; the header's switch picks one with CSS, so the
  pages stay static.
