/**
 * Compares two strings using locale-aware collation rules.
 *
 * @param a - The first string to compare.
 * @param b - The second string to compare.
 * @param locale - BCP 47 locale tag used for collation (defaults to "en").
 * @param sensitivity - Controls how differences in case/diacritics are handled.
 * @returns A negative number if `a` sorts before `b`, positive if after, or 0 if equal.
 *
 * Special behavior: Uses `Intl.Collator`, which provides Unicode-aware comparison.
 */
export function localeCompare(
  a: string,
  b: string,
  locale = "en",
  sensitivity: Intl.CollatorOptions["sensitivity"] = "base"
): number {
  return new Intl.Collator(locale, { sensitivity }).compare(a, b);
}

/**
 * Normalizes a string to the specified Unicode normalization form.
 *
 * @param input - The string to normalize.
 * @param form - The Unicode normalization form (NFC, NFD, NFKC, or NFKD).
 * @returns The normalized string.
 *
 * Special behavior: Preserves Unicode text while normalizing code point sequences.
 */
export function normalizeUnicode(
  input: string,
  form: "NFC" | "NFD" | "NFKC" | "NFKD" = "NFC"
): string {
  return input.normalize(form);
}

