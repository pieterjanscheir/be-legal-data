// The two line terminators JSON allows in strings but older JavaScript engines don't, and their
// escapes: a backslash, then u and the code
const terminators = [0x2028, 0x2029].map(
    (code) => [String.fromCharCode(code), `\\u${code.toString(16)}`] as const,
)

/**
 * A value as a JavaScript literal that is safe inside an inline <script>: JSON, with `<` escaped
 * so the value can't close the script tag, and U+2028 and U+2029 escaped
 */
export function scriptLiteral(value: unknown): string {
    let literal = JSON.stringify(value).replaceAll('<', '\\u003c')
    for (const [character, escape] of terminators) literal = literal.replaceAll(character, escape)
    return literal
}
