// Inlined in each page's <head>; kept out of LanguageSwitch.tsx, which is a client module
import { scriptLiteral } from './inline-script'

/**
 * Runs before the first paint so names don't flash in the wrong language: the choice made
 * before, else the site's language when it's Dutch, French or German, else Dutch
 */
export const namesLanguageScript = (siteLocale: string) =>
    `try{var l=localStorage.getItem('belgica-lang');if(!l){l=['nl','fr','de'].indexOf(${scriptLiteral(siteLocale)})>=0?${scriptLiteral(siteLocale)}:'nl'}document.documentElement.dataset.lang=l}catch(e){document.documentElement.dataset.lang='nl'}`
