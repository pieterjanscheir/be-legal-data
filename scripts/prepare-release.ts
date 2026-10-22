/**
 * Prepares a release: raises the version in package.json and the Python package, moves the Unreleased section of
 * CHANGELOG.md under the new version with today's date, adds its compare link, and points the
 * docs' raw.githubusercontent.com links at the new tag. Prints the new version.
 *
 *     node scripts/prepare-release.ts patch|minor|major
 *
 * The Prepare release workflow runs it and opens the release pull request; merging that pull
 * request publishes the release. Pick the bump by the id rules at the top of CHANGELOG.md.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const bump = process.argv[2]
if (bump !== 'patch' && bump !== 'minor' && bump !== 'major') {
    throw new Error('Usage: node scripts/prepare-release.ts patch|minor|major')
}

const repository = 'https://github.com/pieterjanscheir/belgica'

const packageJson = readFileSync('package.json', 'utf8')
const previous = (JSON.parse(packageJson) as { version: string }).version
const parts = /^(\d+)\.(\d+)\.(\d+)$/.exec(previous)
if (!parts) throw new Error(`package.json has a version this script can't raise: ${previous}`)
const [major, minor, patch] = parts.slice(1).map(Number) as [number, number, number]
const version =
    bump === 'major' ? `${major + 1}.0.0`
    : bump === 'minor' ? `${major}.${minor + 1}.0`
    : `${major}.${minor}.${patch + 1}`

const changelog = readFileSync('CHANGELOG.md', 'utf8')
const unreleased = /^## \[Unreleased\]\n([\s\S]*?)(?=^## \[)/m.exec(changelog)
if (!unreleased) throw new Error('CHANGELOG.md has no ## [Unreleased] section')
const [section, changes = ''] = unreleased
if (changes.trim() === '') {
    throw new Error('The Unreleased section of CHANGELOG.md is empty: write the changes first')
}
const unreleasedLink = `[Unreleased]: ${repository}/compare/v${previous}...HEAD`
if (!changelog.includes(unreleasedLink)) {
    throw new Error(`CHANGELOG.md has no link ${unreleasedLink}`)
}
const date = new Date().toISOString().slice(0, 10)
writeFileSync(
    'CHANGELOG.md',
    changelog
        // A function, so a `$` in the changelog isn't read as a replacement pattern
        .replace(section, () => `## [Unreleased]\n\n## [${version}] - ${date}\n${changes}`)
        .replace(
            unreleasedLink,
            `[Unreleased]: ${repository}/compare/v${version}...HEAD\n` +
                `[${version}]: ${repository}/compare/v${previous}...v${version}`,
        ),
)

writeFileSync(
    'package.json',
    packageJson.replace(`"version": "${previous}"`, `"version": "${version}"`),
)

// The Python package has the same version: its pyproject.toml and its own entry in uv.lock
for (const [file, from, to] of [
    ['python/pyproject.toml', `version = "${previous}"`, `version = "${version}"`],
    [
        'python/uv.lock',
        `name = "belgica"\nversion = "${previous}"`,
        `name = "belgica"\nversion = "${version}"`,
    ],
] as const) {
    const text = readFileSync(file, 'utf8')
    if (!text.includes(from)) throw new Error(`${file} doesn't have ${from}`)
    writeFileSync(file, text.replace(from, to))
}

// Links to the raw data pinned to a tag or a version, in the README and the docs in every
// language: raw.githubusercontent.com by tag, jsDelivr by npm version
const pinned = [
    [`pieterjanscheir/belgica/v${previous}/`, `pieterjanscheir/belgica/v${version}/`],
    [`npm/belgica@${previous}/`, `npm/belgica@${version}/`],
] as const
const markdown = [
    'README.md',
    ...readdirSync('docs', { recursive: true, encoding: 'utf8' })
        .filter((file) => file.endsWith('.md'))
        .map((file) => join('docs', file)),
]
for (const file of markdown) {
    const text = readFileSync(file, 'utf8')
    const updated = pinned.reduce((t, [from, to]) => t.replaceAll(from, to), text)
    if (updated !== text) writeFileSync(file, updated)
}

console.log(version)
