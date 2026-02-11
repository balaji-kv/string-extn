/**
 * Test suite for internationalization helpers, covering locale-aware comparison
 * and Unicode normalization edge cases.
 */
import { localeCompare, normalizeUnicode } from '../src/intl.js';

describe('localeCompare', () => {
  test('should return 0 for identical strings', () => {
    expect(localeCompare('alpha', 'alpha')).toBe(0);
  });

  test('should order different strings (ascending)', () => {
    expect(localeCompare('a', 'b')).toBeLessThan(0);
  });

  test('should order different strings (descending)', () => {
    expect(localeCompare('b', 'a')).toBeGreaterThan(0);
  });

  test('should be case-insensitive with base sensitivity (default)', () => {
    // Base sensitivity ignores case differences.
    expect(localeCompare('a', 'A')).toBe(0);
  });

  test('should be accent-insensitive with base sensitivity', () => {
    // Base sensitivity treats diacritics as equivalent.
    expect(localeCompare('resume', 'résumé')).toBe(0);
  });

  test('should be accent-sensitive with accent sensitivity', () => {
    // Accent sensitivity distinguishes diacritics.
    expect(localeCompare('resume', 'résumé', 'en', 'accent')).not.toBe(0);
  });

  test('should be case-sensitive with case sensitivity', () => {
    // Case sensitivity distinguishes upper/lowercase.
    expect(localeCompare('a', 'A', 'en', 'case')).not.toBe(0);
  });

  test('should be fully sensitive with variant sensitivity', () => {
    expect(localeCompare('a', 'A', 'en', 'variant')).not.toBe(0);
    expect(localeCompare('resume', 'résumé', 'en', 'variant')).not.toBe(0);
  });

  test('should handle empty strings', () => {
    expect(localeCompare('', '')).toBe(0);
    expect(localeCompare('', 'a')).toBeLessThan(0);
    expect(localeCompare('a', '')).toBeGreaterThan(0);
  });

  test('should respect provided locale without throwing', () => {
    // Locale-specific collation behavior can vary; assert it returns a number.
    const result = localeCompare('straße', 'strasse', 'de', 'base');
    expect(typeof result).toBe('number');
  });

  test('should handle unicode input', () => {
    // Unicode comparison should work without errors.
    expect(localeCompare('你好', '再见')).toBeLessThan(0);
  });
});

describe('normalizeUnicode', () => {
  test('should normalize to NFC by default', () => {
    // Combining mark sequence should compose to NFC.
    const input = 'e\u0301';
    expect(normalizeUnicode(input)).toBe('\u00e9');
  });

  test('should normalize to NFD', () => {
    // NFC composed form should decompose to NFD.
    const input = '\u00e9';
    expect(normalizeUnicode(input, 'NFD')).toBe('e\u0301');
  });

  test('should normalize to NFKC', () => {
    // Compatibility characters should compose to their canonical equivalents.
    const input = '\u212b';
    expect(normalizeUnicode(input, 'NFKC')).toBe('\u00c5');
  });

  test('should normalize to NFKD', () => {
    // Compatibility characters should decompose into base + combining mark.
    const input = '\u212b';
    expect(normalizeUnicode(input, 'NFKD')).toBe('A\u030a');
  });

  test('should handle empty string', () => {
    expect(normalizeUnicode('')).toBe('');
  });

  test('should be idempotent', () => {
    // Normalizing an already-normalized string should be stable.
    const input = 'e\u0301';
    const once = normalizeUnicode(input, 'NFC');
    const twice = normalizeUnicode(once, 'NFC');
    expect(twice).toBe(once);
  });

  test('should handle unicode emoji input', () => {
    // Emoji are already in NFC form and should remain unchanged.
    const input = '😀👍';
    expect(normalizeUnicode(input, 'NFC')).toBe(input);
  });
});
