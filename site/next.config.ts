import type { NextConfig } from 'next'

// A static export: every page is built from the package's data at build time, so the site needs
// no server. SITE_BASE is the path it's served under, '/belgica/explore' on GitHub Pages.
const base = process.env.SITE_BASE ?? ''

const config: NextConfig = {
    output: 'export',
    basePath: base,
    trailingSlash: true,
    env: { NEXT_PUBLIC_SITE_BASE: base },
}

export default config
