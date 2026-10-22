'use client'

import { useEffect, useState } from 'react'
import type { Locale } from 'belgica'
import { locales } from '@/lib/labels'

/** Sets html[data-lang], which picks the language every <Name> shows; remembered per browser */
export function LanguageSwitch() {
    const [lang, setLang] = useState<Locale>('nl')
    useEffect(() => {
        setLang((document.documentElement.dataset.lang as Locale | undefined) ?? 'nl')
    }, [])
    function choose(l: Locale) {
        setLang(l)
        document.documentElement.dataset.lang = l
        try {
            localStorage.setItem('belgica-lang', l)
        } catch {
            // Storage blocked: the choice lasts for this page
        }
    }
    return (
        <div className="lang" role="group" aria-label="Language of names">
            {locales.map((l) => (
                <button
                    key={l}
                    type="button"
                    aria-pressed={lang === l}
                    onClick={() => {
                        choose(l)
                    }}
                >
                    {l.toUpperCase()}
                </button>
            ))}
        </div>
    )
}

/** Runs before the first paint so names don't flash in the wrong language */
export const languageScript = `try{var l=localStorage.getItem('belgica-lang');if(!l){var n=(navigator.language||'').slice(0,2);l=['nl','fr','de'].indexOf(n)>=0?n:'nl'}document.documentElement.dataset.lang=l}catch(e){document.documentElement.dataset.lang='nl'}`
