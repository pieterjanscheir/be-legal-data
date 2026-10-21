/**
 * German canton names, each from an official German text that names the canton. The annex to
 * the Judicial Code has no German translation (the ZDDÜ hasn't translated its canton list, nor
 * art. 38 of the law of 25 December 2017 that set it), so a canton gets a German name only when
 * another official German text gives one. Names are copied as the text spells them. Never add
 * a name translated by hand: a canton without a source keeps no German name.
 *
 * `scripts/build-cantons.ts` applies these to data/cantons.json; test/data.test.ts checks that
 * the data matches.
 */
import type { SourceRef } from '../src/common.ts'

export interface GermanCantonName {
    name: string
    source: SourceRef
}

// Ministerieller Erlass vom 31. Oktober 2023 über die Beibehaltung des Sitzungsorts Sankt Vith
// im zweiten Gerichtskanton Eupen-Sankt Vith, German translation by the ZDDÜ (Belgisches
// Staatsblatt of 18 July 2024, numac 2024006205). It names the second canton; the first has the
// same name in the annex, only the number differs.
const eupenSanktVith: GermanCantonName = {
    name: 'Eupen-Sankt Vith',
    source: {
        url: 'https://www.ejustice.just.fgov.be/mopdf/2024/07/18_1.pdf#page=124',
        retrieved: '2026-10-21',
    },
}

/** By canton id */
export const germanCantonNames: Readonly<Record<string, GermanCantonName>> = {
    'eupen-sankt-vith-1': eupenSanktVith,
    'eupen-sankt-vith-2': eupenSanktVith,
}
