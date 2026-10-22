import Link from 'next/link'
import { getContact, formatPhoneNumber, type Court } from 'belgica'
import { courtName } from '@/lib/data'
import { courtTypeLabel } from '@/lib/labels'
import { Name } from './Name'

/** A court in a list: its name, type, city and first phone and email */
export function CourtCard({ court, note }: { court: Court; note?: string }) {
    const phone = getContact(court, 'phone')
    const email = getContact(court, 'email')
    return (
        <Link href={`/courts/${court.id}/`} className="card">
            <span className="card-type">{courtTypeLabel[court.type]}</span>
            <strong>
                <Name value={courtName(court)} />
            </strong>
            {court.address && (
                <span className="muted">
                    {court.address.street}, {court.address.postalCode} {court.address.city}
                </span>
            )}
            {(phone ?? email) && (
                <span className="muted small">
                    {phone && formatPhoneNumber(phone)}
                    {phone && email && ' · '}
                    {email}
                </span>
            )}
            {note && <span className="pill warn-pill">{note}</span>}
        </Link>
    )
}
