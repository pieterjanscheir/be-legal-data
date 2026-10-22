import { searchEntries } from '@/lib/data'

// Written once at build time as a static file; the search box loads it on first use
export const dynamic = 'force-static'

export function GET() {
    return Response.json(searchEntries())
}
