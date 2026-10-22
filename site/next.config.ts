import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

// A static export: every page is built from the package's data at build time, in every language,
// so the site needs no server. SITE_BASE is the path it's served under, if not the root.
const base = process.env['SITE_BASE'] ?? ''

const config: NextConfig = {
    output: 'export',
    basePath: base,
    trailingSlash: true,
    env: { NEXT_PUBLIC_SITE_BASE: base },
}

export default createNextIntlPlugin('./i18n/request.ts')(config)
