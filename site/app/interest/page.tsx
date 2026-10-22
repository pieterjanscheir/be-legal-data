import type { Metadata } from 'next'
import { interestRates } from 'belgica/interest-rates'
import { Code } from '@/components/Code'
import { InterestCalculator } from '@/components/InterestCalculator'

export const metadata: Metadata = { title: 'Interest calculator' }

export default function Interest() {
    return (
        <>
            <h1>Interest calculator</h1>
            <p className="lede">
                Simple interest at the legal rate or the rate for commercial transactions, split
                over the rate periods it crosses: days × principal × rate ÷ 365. The calculator runs
                in your browser on <code>belgica/interest-rates</code> alone, without the court or
                territory data.
            </p>
            <InterestCalculator />
            <Code>{`
import { getInterestRate, getLatestKnownRateDate, interestRates } from 'belgica/interest-rates'

getInterestRate('2014-06-01', 'commercial', { contractAfter20130316: true })
getLatestKnownRateDate('legal') // '${interestRates.legal.periods.at(-1)?.to ?? ''}'`}</Code>
            <section className="block">
                <h2>Sources</h2>
                <p className="muted">
                    Legal rate: {interestRates.legal.source}. Commercial rate:{' '}
                    {interestRates.commercial.source}.
                </p>
                <p className="muted small">
                    A calculation aid, not legal advice: a judgment or contract can set other rules,
                    such as capitalised interest.
                </p>
            </section>
        </>
    )
}
