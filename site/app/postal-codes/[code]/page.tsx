import type { Metadata } from 'next'
import Link from 'next/link'
import { findCourtsForPostalCode, getPostalCodes } from 'belgica'
import { Code } from '@/components/Code'
import { Competence } from '@/components/Competence'
import { bilingual, postalCodeList } from '@/lib/data'

export const dynamicParams = false
export const generateStaticParams = () => postalCodeList.map((code) => ({ code }))

interface Props {
    params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { code } = await params
    const names = findCourtsForPostalCode(code, 'police-court').map((e) => e.municipality.name.nl)
    return { title: `${code} ${names.join(', ')}: courts` }
}

export default async function PostalCodePage({ params }: Props) {
    const { code } = await params
    const entries = findCourtsForPostalCode(code, 'police-court')
    return (
        <>
            <p className="crumbs">
                <Link href="/">Search</Link> / Postal code
            </p>
            <h1>
                {code}{' '}
                <span className="muted">
                    {entries.map((e) => bilingual(e.municipality.name)).join(' · ')}
                </span>
            </h1>
            {entries.length > 1 && (
                <p className="note">
                    {code} belongs to {entries.length} municipalities: the street decides which. The
                    courts are listed for each.
                </p>
            )}
            {entries.map(({ municipality }) => (
                <section key={municipality.id} className="block">
                    <h2>
                        <Link href={`/municipalities/${municipality.id}/`}>
                            {bilingual(municipality.name)}
                        </Link>{' '}
                        <span className="muted small">
                            REFNIS {municipality.id} · postal codes{' '}
                            {getPostalCodes(municipality.id)
                                .map((p) => p.postalCode)
                                .join(', ')}
                        </span>
                    </h2>
                    <Competence municipality={municipality.id} />
                </section>
            ))}
            <Code>{`
import { findCourtsForPostalCode } from 'belgica'

const [${entries.length > 1 ? 'first, second' : 'entry'}] = findCourtsForPostalCode('${code}', 'police-court')
${entries.length > 1 ? 'first' : 'entry'}.justicesOfThePeace // ${entries[0]?.justicesOfThePeace.length} canton(s)`}</Code>
        </>
    )
}
