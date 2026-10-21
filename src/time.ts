/** Days, validity periods and coverage: how records relate to time */

/** When a record applies, both days included. No `validTo`: it still applies. */
export interface Validity {
    /**
     * First day the record applies, YYYY-MM-DD. No `validFrom`: since before the dataset's
     * coverage starts.
     * @format date
     */
    validFrom?: string
    /**
     * Last day the record applies, YYYY-MM-DD
     * @format date
     */
    validTo?: string
}

/** Options for a lookup on a given day */
export interface OnDay {
    /** The day to look up; today by default. A `Date` is read as a local calendar day. */
    on?: Date | string
}

/**
 * Local calendar day as YYYY-MM-DD. Strings must start with a valid YYYY-MM-DD day (a time
 * after it is ignored): days are compared as strings, so '2013-1-15' would otherwise silently
 * fall in the wrong period.
 */
export function toDay(date: Date | string): string {
    if (typeof date === 'string') {
        const match = /^(\d{4})-(\d{2})-(\d{2})(?:$|T)/.exec(date)
        const [y = NaN, m = NaN, d = NaN] = (match ?? []).slice(1).map(Number)
        // Date.UTC rolls an impossible day over ('2013-02-30' → 2 March), which this catches
        const check = new Date(Date.UTC(y, m - 1, d))
        if (check.getUTCMonth() !== m - 1 || check.getUTCDate() !== d) {
            throw new RangeError(`Expected a day as YYYY-MM-DD, got '${date}'`)
        }
        return date.slice(0, 10)
    }
    if (Number.isNaN(date.getTime())) throw new RangeError('Invalid Date')
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${date.getFullYear()}-${m}-${d}`
}

export function appliesOn(record: Validity, day: string): boolean {
    return (
        (record.validFrom === undefined || record.validFrom <= day) &&
        (record.validTo === undefined || day <= record.validTo)
    )
}

/**
 * A record's version as of a day, from its versions sorted by `validFrom`: the one that applies
 * on that day; for a record that has ended, its last version; for one that hasn't started, its
 * first. Never a version that starts later while an earlier one applies.
 */
export function currentVersion<T extends Validity>(
    versions: readonly T[],
    day: string,
): T | undefined {
    return versions.findLast((v) => (v.validFrom ?? '') <= day) ?? versions[0]
}

/**
 * The day to look up, checked against the first day a dataset describes: before it, the data
 * can't say, and a guess would look like an answer.
 */
export function lookupDay(options: OnDay, coverageFrom: string, dataset: string): string {
    const day = toDay(options.on ?? new Date())
    if (day < coverageFrom) {
        throw new RangeError(
            `The ${dataset} data describes ${coverageFrom} onwards; ${day} is before that`,
        )
    }
    return day
}
