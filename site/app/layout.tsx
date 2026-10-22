import type { ReactNode } from 'react'
import './globals.css'

// Each language's layout (app/[locale]/layout.tsx) renders <html>, with its lang and dir
export default function RootLayout({ children }: { children: ReactNode }) {
    return children
}
