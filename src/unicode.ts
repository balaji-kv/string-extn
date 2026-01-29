import GraphemeSplitter from 'grapheme-splitter';

const splitter = new GraphemeSplitter();

/**
 * Counts the number of grapheme clusters (user-perceived characters) in a Unicode string.
 * 
 * This function properly handles complex Unicode characters including:
 * - Emoji with skin tone modifiers (e.g., 👍🏽)
 * - Multi-codepoint emoji sequences (e.g., family emoji 👨‍👩‍👧‍👦)
 * - Flag emoji (e.g., 🇺🇸)
 * - Accented characters and combining marks
 * 
 * @param str - The Unicode string to count.
 * @returns The number of grapheme clusters in the string.
 * 
 * @example
 * lengthUnicode('hello') // => 5
 * lengthUnicode('👍🏽👍') // => 2 (skin tone modifier counted as part of first emoji)
 * lengthUnicode('👨‍👩‍👧‍👦') // => 1 (complex emoji sequence counted as single grapheme)
 */
export function lengthUnicode(str: string): number {
  return splitter.countGraphemes(str);
}

/**
 * Extracts a section of a Unicode string by grapheme cluster indices.
 * 
 * This function correctly slices strings containing complex Unicode characters where
 * multiple codepoints form a single user-perceived character. Use this instead of
 * {@link slice} for proper Unicode-aware slicing.
 * 
 * @param str - The Unicode string to slice.
 * @param start - The starting grapheme cluster index (inclusive). Negative indices count from the end.
 * @param end - The ending grapheme cluster index (exclusive). Negative indices count from the end. Optional.
 * @returns A new string containing the extracted grapheme clusters.
 * 
 * @example
 * unicodeSlice('hello', 1, 4) // => 'ell'
 * unicodeSlice('👍🏽👍😀', 0, 2) // => '👍🏽👍' (correctly handles skin tone modifier)
 * unicodeSlice('😀😁😂', 1) // => '😁😂'
 */
export function unicodeSlice(str: string, start: number, end?: number): string {
  const chars = splitter.splitGraphemes(str);
  return chars.slice(start, end).join('');
}

/**
 * Reverses the order of grapheme clusters in a Unicode string.
 * 
 * This function properly reverses strings containing complex Unicode characters where
 * multiple codepoints form a single user-perceived character. It maintains the integrity
 * of multi-codepoint emoji and other complex grapheme clusters. Use this instead of
 * {@link reverse} for Unicode-aware reversal.
 * 
 * @param str - The Unicode string to reverse.
 * @returns A new string with grapheme clusters in reverse order.
 * 
 * @example
 * reverseUnicode('hello') // => 'olleh'
 * reverseUnicode('👍🏽👍') // => '👍👍🏽' (preserves emoji integrity)
 * reverseUnicode('👨‍👩‍👧‍👦😀') // => '😀👨‍👩‍👧‍👦' (maintains complex emoji as single unit)
 */
export function reverseUnicode(str: string): string {
  return splitter.splitGraphemes(str).reverse().join('');
}
