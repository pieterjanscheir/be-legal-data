import Link from 'next/link'
import { housesOfJustice, interestRates, prisons } from 'belgica'
import { CantonMap } from '@/components/CantonMap'
import { Code } from '@/components/Code'
import { Search } from '@/components/Search'
import { currentCantons, currentCourts, currentMunicipalities, postalCodeList } from '@/lib/data'

const examples = [
    ['9000', 'Gent: one municipality, five cantons'],
    ['1050', 'Elsene and Brussels share it'],
    ['4700', 'Eupen: courts in German'],
] as const

export default function Home() {
    const stats = [
        [currentCourts.length, 'courts, divisions and seats', '/courts/'],
        [currentCantons.length, 'judicial cantons', '/cantons/'],
        [currentMunicipalities.length, 'municipalities', '/municipalities/'],
        [postalCodeList.length, 'postal codes', '/municipalities/'],
        [prisons.length + housesOfJustice.length, 'prisons and houses of justice', '/places/'],
        [
            interestRates.legal.periods.length + interestRates.commercial.periods.length,
            'interest-rate periods since 1970',
            '/interest/',
        ],
    ] as const
    return (
        <>
            <section className="hero">
                <div>
                    <p className="eyebrow">Built with the belgica package</p>
                    <h1>Which court is competent, where?</h1>
                    <p className="lede">
                        Enter a postal code or a municipality to find its justice of the peace,
                        police court and every other court with their registries&apos; contacts. Or
                        browse the courts, the canton map and the interest rates, all read from the
                        package&apos;s data.
                    </p>
                    <Search placeholder="Postal code, municipality, canton or court" />
                    <p className="examples">
                        Try{' '}
                        {examples.map(([code, note], i) => (
                            <span key={code}>
                                {i > 0 && ' · '}
                                <Link href={`/postal-codes/${code}/`}>{code}</Link>{' '}
                                <span className="muted">({note})</span>
                            </span>
                        ))}
                    </p>
                </div>
                <div className="hero-map">
                    <CantonMap label="Map of Belgium's 162 judicial cantons" />
                </div>
            </section>

            <section className="stats" aria-label="What's in the data">
                {stats.map(([n, label, href]) => (
                    <Link key={label} href={href} className="stat">
                        <strong>{n}</strong>
                        <span>{label}</span>
                    </Link>
                ))}
            </section>

            <section className="features">
                <article>
                    <h2>
                        <Link href="/postal-codes/9000/">Courts for an address</Link>
                    </h2>
                    <p>
                        From a postal code to its municipalities, their cantons and every competent
                        court. Split cities list each canton with the legal text of its area.
                    </p>
                    <Code>{`
import { findCourtsForPostalCode } from 'belgica'

findCourtsForPostalCode('9000', 'police-court')
// → [{ municipality, justicesOfThePeace, courts }]`}</Code>
                </article>
                <article>
                    <h2>
                        <Link href="/cantons/">Canton map</Link>
                    </h2>
                    <p>
                        The NGI&apos;s boundary of every canton, to find the canton of a point and
                        draw it. Every canton has its legal basis and its municipalities.
                    </p>
                    <Code>{`
import { findCantonsAt } from 'belgica/canton-boundaries'

findCantonsAt(3.7174, 51.0543) // Gent, Korenmarkt
// → [{ id: 'gent-1', … }]`}</Code>
                </article>
                <article>
                    <h2>
                        <Link href="/interest/">Interest calculator</Link>
                    </h2>
                    <p>
                        The legal and commercial rates since 1970, with the rule for contracts from
                        before 16 March 2013. The calculator loads only{' '}
                        <code>belgica/interest-rates</code>.
                    </p>
                    <Code>{`
import { getInterestRate } from 'belgica/interest-rates'

getInterestRate('2026-03-01', 'commercial')
// → { rate: 10.5, period: { from: '2026-01-01', … } }`}</Code>
                </article>
                <article>
                    <h2>
                        <Link href="/courts/">Every court, in three languages</Link>
                    </h2>
                    <p>
                        Names as each court publishes them, addresses, phone numbers in national
                        form, IBANs, opening hours and ECLI codes. Switch NL · FR · DE at the top.
                    </p>
                    <Code>{`
import { getCourt, formatCourtName, formatPhoneNumber } from 'belgica'

const court = getCourt('justice-of-the-peace-gent-1')
formatCourtName(court, 'fr', { style: 'canton' })
// → 'Justice de paix 1er canton Gand'`}</Code>
                </article>
            </section>
        </>
    )
}
