import { formatIban, formatPhoneNumber, type Address, type Contact } from 'belgica'
import Link from 'next/link'

const typeLabel: Record<Contact['type'], string> = {
    phone: 'Phone',
    fax: 'Fax',
    email: 'Email',
    'bank-account': 'Bank account',
}

function value(contact: Contact) {
    switch (contact.type) {
        case 'phone':
            return <a href={`tel:${contact.value}`}>{formatPhoneNumber(contact.value)}</a>
        case 'fax':
            return formatPhoneNumber(contact.value)
        case 'email':
            return <a href={`mailto:${contact.value}`}>{contact.value}</a>
        case 'bank-account':
            return <span className="mono">{formatIban(contact.value)}</span>
    }
}

export function Contacts({ contacts }: { contacts: readonly Contact[] }) {
    if (!contacts.length) return <p className="muted">No contacts published.</p>
    return (
        <dl className="contacts">
            {contacts.map((c, i) => (
                <div key={i}>
                    <dt>
                        {typeLabel[c.type]}
                        {c.label && <span className="muted"> · {c.label}</span>}
                    </dt>
                    <dd>
                        {value(c)}
                        {c.note && <span className="muted"> ({c.note})</span>}
                    </dd>
                </div>
            ))}
        </dl>
    )
}

export function AddressLines({ address }: { address: Address }) {
    return (
        <address>
            {address.building && (
                <>
                    {address.building}
                    <br />
                </>
            )}
            {address.street}
            <br />
            {address.municipality ?
                <Link href={`/municipalities/${address.municipality}/`}>
                    {address.postalCode} {address.city}
                </Link>
            :   `${address.postalCode} ${address.city}`}
        </address>
    )
}
