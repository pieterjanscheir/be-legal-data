import { useTranslations } from 'next-intl'

/** The package call behind a section, so every view shows how it's built */
export function Code({ children }: { children: string }) {
    const t = useTranslations('code')
    return (
        <figure className="code">
            <figcaption>{t('caption')}</figcaption>
            <pre dir="ltr">
                <code>{children.trim()}</code>
            </pre>
        </figure>
    )
}
