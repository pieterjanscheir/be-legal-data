import type { ReactNode } from 'react'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'

/**
 * The messages of these namespaces, for the client components inside. Every page ships its
 * client messages in its HTML and its RSC payloads, so each passes only the namespaces its
 * client components read, not the whole file.
 */
export async function ClientMessages({
    namespaces,
    children,
}: {
    namespaces: readonly string[]
    children: ReactNode
}) {
    const all = await getMessages()
    const messages = Object.fromEntries(namespaces.map((n) => [n, all[n]]))
    return <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
}
