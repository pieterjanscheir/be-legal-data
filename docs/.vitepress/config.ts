import { defineConfig } from 'vitepress'
import pkg from '../../package.json'

const repo = 'https://github.com/pieterjanscheir/be-legal-data'
// GitHub Pages serves the site from /be-legal-data/; DOCS_BASE overrides it for a custom domain
const base = process.env.DOCS_BASE ?? '/be-legal-data/'

export default defineConfig({
    title: 'be-legal-data',
    description: pkg.description,
    lang: 'en',
    base,
    cleanUrls: true,
    lastUpdated: true,
    head: [['link', { rel: 'icon', href: `${base}favicon.svg` }]],
    themeConfig: {
        logo: '/favicon.svg',
        nav: [
            { text: 'Guide', link: '/guide/getting-started' },
            { text: 'Data', link: '/data/territory' },
            { text: 'API', link: '/api' },
            {
                text: `v${pkg.version}`,
                items: [
                    { text: 'npm', link: 'https://www.npmjs.com/package/be-legal-data' },
                    { text: 'Releases', link: `${repo}/tags` },
                ],
            },
        ],
        sidebar: [
            {
                text: 'Guide',
                items: [
                    { text: 'Getting started', link: '/guide/getting-started' },
                    { text: 'Without JavaScript', link: '/guide/raw-json' },
                    { text: 'Contributing', link: '/guide/contributing' },
                ],
            },
            {
                text: 'Data',
                items: [
                    { text: 'Territory & cantons', link: '/data/territory' },
                    { text: 'Courts', link: '/data/courts' },
                    { text: 'Interest rates', link: '/data/interest-rates' },
                    { text: 'Known gaps', link: '/data/known-gaps' },
                ],
            },
            { text: 'API reference', link: '/api' },
        ],
        socialLinks: [
            { icon: 'github', link: repo },
            { icon: 'npm', link: 'https://www.npmjs.com/package/be-legal-data' },
        ],
        editLink: {
            pattern: `${repo}/edit/main/docs/:path`,
            text: 'Edit this page on GitHub',
        },
        search: { provider: 'local' },
        outline: [2, 3],
        footer: {
            message:
                'Code under MIT, data under CC BY 4.0. Reference data, not legal advice: check the official sources.',
            copyright: '© Pieter-Jan Scheir',
        },
    },
})
