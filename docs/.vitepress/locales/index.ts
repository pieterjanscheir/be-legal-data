import type { LocaleFile } from './types'
import de from './de'
import es from './es'
import it from './it'
import pt from './pt'
import pl from './pl'
import tr from './tr'
import uk from './uk'
import zh from './zh'
import ja from './ja'
import ar from './ar'

/** The languages beyond English, Dutch and French, keyed by their folder under docs/, in menu order */
export const extraLocales: Record<string, LocaleFile> = { de, es, it, pt, pl, tr, uk, zh, ja, ar }
