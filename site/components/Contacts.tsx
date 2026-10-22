import { useTranslations } from 'next-intl'
import { formatIban, formatPhoneNumber, type Address, type Contact } from 'belgica'
import { Link } from '@/i18n/navigation'

function value(contact: Contact) {
    switch (contact.type) {
        case 'phone':
            return (
                <a href={`tel:${contact.value}`} dir="ltr">
                    {formatPhoneNumber(contact.value)}
                </a>
            )
        case 'fax':
            return <span dir="ltr">{formatPhoneNumber(contact.value)}</span>
        case 'email':
            return <a href={`mailto:${contact.value}`}>{contact.value}</a>
        case 'bank-account':
            return (
                <span className="mono" dir="ltr">
                    {formatIban(contact.value)}
                </span>
            )
    }
}

export function Contacts({ contacts }: { contacts: readonly Contact[] }) {
    const t = useTranslations('contacts')
    if (!contacts.length) return <p className="muted">{t('none')}</p>
    return (
        <dl className="contacts">
            {contacts.map((c, i) => (
                <div key={i}>
                    <dt>
                        {t(c.type)}
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
