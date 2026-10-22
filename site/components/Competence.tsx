import { useTranslations } from 'next-intl'
import { findCourtsWithJurisdiction, findJusticesOfThePeace, type CourtType } from 'belgica'
import { Link } from '@/i18n/navigation'
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
    const t = useTranslations('competence')
    return (
        <>
            <h3>{t('justiceOfThePeace')}</h3>
            {split && <p className="note">{t('split', { count: justices.length })}</p>}
            <div className={split ? 'split' : 'cards'}>
                {justices.map(({ canton, court, partial }) => (
                    <div key={canton.id}>
                        <CourtCard court={court} />
                        {partial && (
                            <details className="territory">
                                <summary>
                                    {t.rich('areaOf', {
                                        name: cantonName(canton),
                                        link: (c) => (
                                            <Link href={`/cantons/${canton.id}/`}>{c}</Link>
                                        ),
                                    })}
                                </summary>
                                <p lang="nl">{canton.territory.nl}</p>
                            </details>
                        )}
                    </div>
                ))}
            </div>
            <h3>{t('otherCourts')}</h3>
            <div className="cards">
                {otherTypes.flatMap((type) =>
                    findCourtsWithJurisdiction(municipality, type).map((court) => (
                        <CourtCard key={court.id} court={court} />
                    )),
                )}
            </div>
            <p className="muted small">{t('divisionNote')}</p>
        </>
    )
}
