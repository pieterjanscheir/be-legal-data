import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'

/** Link, usePathname and useRouter that keep the page's language in the path */
export const { Link, usePathname, useRouter, getPathname } = createNavigation(routing)
