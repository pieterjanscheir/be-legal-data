import { findCourtsWithJurisdiction, findJusticesOfThePeace, type CourtType } from 'belgica'
import Link from 'next/link'
import { cantonName } from '@/lib/data'
import { CourtCard } from './CourtCard'

const otherTypes: CourtType[] = [
    'police-court',
    'court-of-first-instance',
    'enterprise-court',
    'labour-court',
    'court-of-appeal',
    'labour-court-of-appeal',
    'court-of-assize',
]

/** The justices of the peace and every other competent court for a municipality */
export function Competence({ municipality }: { municipality: string }) {
    const justices = findJusticesOfThePeace(municipality)
    const split = justices.some((j) => j.partial)
    return (
        <>
            <h3>Justice of the peace</h3>
            {split && (
                <p className="note">
                    This municipality is split over {justices.length} cantons: the street address
                    decides. Each canton&apos;s area, as the Judicial Code describes it:
                </p>
            )}
            <div className={split ? 'split' : 'cards'}>
                {justices.map(({ canton, court, partial }) => (
                    <div key={canton.id}>
                        <CourtCard court={court} />
                        {partial && (
                            <details className="territory">
                                <summary>
                                    Area of canton{' '}
                                    <Link href={`/cantons/${canton.id}/`}>
                                        {cantonName(canton)}
                                    </Link>
                                </summary>
                                <p lang="nl">{canton.territory.nl}</p>
                            </details>
                        )}
                    </div>
                ))}
            </div>
            <h3>Other courts</h3>
            <div className="cards">
                {otherTypes.flatMap((type) =>
                    findCourtsWithJurisdiction(municipality, type).map((court) => (
                        <CourtCard key={court.id} court={court} />
                    )),
                )}
            </div>
            <p className="muted small">
                The court as a whole: which of its divisions hears a case is set by royal decree.
            </p>
        </>
    )
}
