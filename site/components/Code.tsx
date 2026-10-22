/** The package call behind a section, so every view shows how it's built */
export function Code({ children, title = 'With belgica' }: { children: string; title?: string }) {
    return (
        <figure className="code">
            <figcaption>{title}</figcaption>
            <pre>
                <code>{children.trim()}</code>
            </pre>
        </figure>
    )
}
