/**
 * Test suite for string masking and redaction functions.
 * 
 * This file provides comprehensive test coverage for the mask module functions:
 * - mask: Masks input string by replacing characters with a mask character, keeping last N visible
 * - redact: Redacts portions matching regex patterns by replacing with '[REDACTED]'
 * 
 * Tests cover:
 * - mask: varying visible lengths, custom mask characters, edge cases with short strings
 * - redact: single and multiple patterns, pattern matching, complex regex patterns
 */
import { mask, redact } from '../src/mask.js';

describe('mask', () => {
  test('should mask string with default parameters', () => {
    // Default: 4 visible characters, mask char is '*'
    expect(mask('1234567890')).toBe('******7890');
  });

  test('should mask string with custom visible count', () => {
    expect(mask('1234567890', 6)).toBe('****567890');
  });

  test('should mask string with custom mask character', () => {
    expect(mask('password', 2, '#')).toBe('######rd');
  });

  test('should mask credit card number', () => {
    // Common use case: mask all but last 4 digits of card
    expect(mask('4532015112830366', 4)).toBe('************0366');
  });

  test('should return all masked characters if input shorter than visible', () => {
    // Edge case: if string length <= visible, entire string is masked
    expect(mask('abc', 4)).toBe('***');
  });

  test('should mask single character', () => {
    expect(mask('a', 4)).toBe('*');
  });

  test('should mask empty string', () => {
    expect(mask('', 4)).toBe('');
  });

  test('should show zero visible characters', () => {
    // Edge case: visible = 0 means all characters are masked
    expect(mask('hello', 0)).toBe('*****');
  });

  test('should show all characters when visible equals string length', () => {
    // Edge case: visible matches length, so no masking occurs
    expect(mask('hello', 5)).toBe('hello');
  });

  test('should show all characters when visible exceeds string length', () => {
    // Edge case: visible > length, so entire string is shown unmasked
    expect(mask('hello', 10)).toBe('hello');
  });

  test('should mask with single character mask char', () => {
    expect(mask('secret', 2, '-')).toBe('----et');
  });

  test('should use first character of multi-char mask string', () => {
    // Validates behavior: if maskChar is multiple chars, only first is used
    expect(mask('hello', 2, '###')).toBe('###lo');
  });

  test('should mask phone number', () => {
    expect(mask('5551234567', 4)).toBe('******4567');
  });

  test('should mask with different characters', () => {
    expect(mask('12345678', 4, 'X')).toBe('XXXX5678');
  });

  test('should mask string with spaces', () => {
    expect(mask('hello world', 5)).toBe('******world');
  });

  test('should mask string with numbers', () => {
    expect(mask('1234567890', 3)).toBe('*******890');
  });

  test('should mask very long string', () => {
    const longStr = 'a'.repeat(1000);
    expect(mask(longStr, 4)).toBe('*'.repeat(996) + 'aaaa');
  });

  test('should mask with negative visible should mask all', () => {
    expect(mask('hello', -1)).toBe('*****');
  });

  test('should mask string with special characters', () => {
    expect(mask('test@example.com', 3)).toBe('*'.repeat(13) + 'com');
  });

  test('should mask with unicode mask character', () => {
    expect(mask('hello', 2, '✓')).toBe('✓✓✓lo');
  });

  test('should mask with space as mask character', () => {
    expect(mask('hello', 2, ' ')).toBe('   lo');
  });

  test('should mask using digit as mask character', () => {
    expect(mask('hello', 2, '0')).toBe('000lo');
  });

  test('should mask very short visible count', () => {
    expect(mask('abcdefgh', 1)).toBe('*******h');
  });

  test('should mask exactly length - 1 visible', () => {
    expect(mask('hello', 4)).toBe('*ello');
  });

  test('should mask with empty mask character defaults to asterisk', () => {
    expect(mask('hello', 2, '')).toBe('***lo');
  });

  test('should mask with null-like mask character defaults to asterisk', () => {
    // maskChar is provided but empty string should use first char (which defaults to *)
    const result = mask('test', 1, '');
    expect(result).toBe('***t');
  });

  test('should preserve visible characters exactly', () => {
    expect(mask('0123456789', 5)).toBe('*****56789');
    expect(mask('0123456789', 1)).toBe('*********9');
  });

  test('should mask credit card with custom mask char', () => {
    expect(mask('4532015112830366', 4, '#')).toBe('############0366');
  });

  test('should mask password', () => {
    expect(mask('MySecurePass123', 3)).toBe('*'.repeat(12) + '123');
  });

  test('should handle exact visible equals length boundary', () => {
    expect(mask('test', 4)).toBe('test');
  });

  test('should handle exact visible equals length minus one', () => {
    expect(mask('test', 3)).toBe('*est');
  });
});

describe('redact', () => {
  test('should redact email domain', () => {
    expect(redact('Contact: john@example.com', [/@[\w.]+/])).toBe('Contact: john[REDACTED]');
  });

  test('should redact phone number', () => {
    expect(redact('Phone: 123-456-7890', [/\d{3}-\d{3}-\d{4}/])).toBe('Phone: [REDACTED]');
  });

  test('should redact multiple patterns', () => {
    // Validates sequential replacement: patterns applied in order
    expect(redact('Name: Alice, ID: 12345', [/Alice/, /12345/])).toBe('Name: [REDACTED], ID: [REDACTED]');
  });

  test('should redact numbers', () => {
    expect(redact('SSN: 123-45-6789', [/\d{3}-\d{2}-\d{4}/])).toBe('SSN: [REDACTED]');
  });

  test('should redact with empty pattern array', () => {
    // Edge case: no patterns means nothing is redacted
    expect(redact('secret data', [])).toBe('secret data');
  });

  test('should redact matching single word', () => {
    expect(redact('password: mySecret123', [/mySecret/])).toBe('password: [REDACTED]123');
  });

  test('should redact case-sensitive pattern', () => {
    // Validates case sensitivity: pattern must match exactly
    expect(redact('Hello hello', [/Hello/])).toBe('[REDACTED] hello');
  });

  test('should redact with case-insensitive pattern', () => {
    expect(redact('Hello hello', [/hello/i])).toBe('[REDACTED] [REDACTED]');
  });

  test('should redact all occurrences of pattern', () => {
    // Validates global replacement: all matches are replaced, not just first
    expect(redact('email1@test.com email2@test.com', [/@test\.com/g])).toBe('email1[REDACTED] email2[REDACTED]');
  });

  test('should handle pattern matching nothing', () => {
    // Edge case: pattern doesn't match, string unchanged
    expect(redact('hello world', [/xyz/])).toBe('hello world');
  });

  test('should redact multiple patterns sequentially', () => {
    // Validates order: first pattern applied, then second pattern on result
    expect(redact('Name: John, Age: 30', [/John/, /30/])).toBe('Name: [REDACTED], Age: [REDACTED]');
  });

  test('should redact special characters', () => {
    expect(redact('Email: test@example.com!', [/@example\.com/])).toBe('Email: test[REDACTED]!');
  });

  test('should redact digits', () => {
    expect(redact('Code: 42-ABC-99', [/\d+/g])).toBe('Code: [REDACTED]-ABC-[REDACTED]');
  });

  test('should redact multiple patterns with overlapping matches', () => {
    // Validates sequential application: first pattern replaces, second pattern operates on result
    const result = redact('REDACTED word REDACTED', [/REDACTED/g, /\[REDACTED\]/g]);
    expect(result).toBe('[REDACTED] word [REDACTED]');
  });

  test('should preserve non-matching content', () => {
    expect(redact('Hello World 123', [/\d+/])).toBe('Hello World [REDACTED]');
  });

  test('should handle empty string', () => {
    expect(redact('', [/anything/])).toBe('');
  });

  test('should redact with complex regex pattern', () => {
    // Complex pattern: matches word boundaries and specific characters
    expect(redact('Contact info: john.doe@company.com or 555-1234', [/[\w.]+@[\w.]+/])).toBe('Contact info: [REDACTED] or 555-1234');
  });

  test('should redact url from text', () => {
    expect(redact('Visit https://example.com for more', [/https?:\/\/\S+/])).toBe('Visit [REDACTED] for more');
  });

  test('should redact credit card pattern', () => {
    expect(redact('Card: 4532-0151-1283-0366', [/\d{4}-\d{4}-\d{4}-\d{4}/])).toBe('Card: [REDACTED]');
  });

  test('should redact ipv4 address', () => {
    expect(redact('IP: 192.168.1.1', [/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/])).toBe('IP: [REDACTED]');
  });

  test('should redact with word boundary pattern', () => {
    expect(redact('Hello world hello', [/\bhello\b/i])).toBe('[REDACTED] world [REDACTED]');
  });

  test('should redact multiple occurrences of single pattern', () => {
    expect(redact('secret secret secret', [/secret/g])).toBe('[REDACTED] [REDACTED] [REDACTED]');
  });

  test('should handle pattern with alternation', () => {
    expect(redact('apple banana cherry', [/(apple|banana)/g])).toBe('[REDACTED] [REDACTED] cherry');
  });

  test('should redact with lookahead pattern', () => {
    // The redact function adds 'g' flag automatically, making it global
    expect(redact('test123 hello456', [/\w+(?=\d+)/g])).toBe('[REDACTED]3 [REDACTED]6');
  });

  test('should redact whitespace pattern', () => {
    expect(redact('hello    world', [/\s+/])).toBe('hello[REDACTED]world');
  });

  test('should redact unicode characters', () => {
    // Unicode accents are different characters, so café is case-insensitive match on both
    expect(redact('Café café', [/café/i])).toBe('[REDACTED] [REDACTED]');
  });

  test('should redact with character class', () => {
    expect(redact('user123admin456', [/[a-z]+\d+/g])).toBe('[REDACTED][REDACTED]');
  });

  test('should redact beginning of string', () => {
    expect(redact('secret: mydata', [/^secret:/])).toBe('[REDACTED] mydata');
  });

  test('should redact end of string', () => {
    expect(redact('mydata: secret', [/secret$/])).toBe('mydata: [REDACTED]');
  });

  test('should apply patterns in sequence on result', () => {
    // First pattern replaces 'a' with [REDACTED], then second pattern finds [REDACTED]
    expect(redact('banana', [/a/g, /\[REDACTED\]/])).toBe('b[REDACTED]n[REDACTED]n[REDACTED]');
  });

  test('should redact with negated character class', () => {
    // The redact function adds 'g' flag automatically, making it global match
    expect(redact('a1b2c3', [/[^0-9]+/])).toBe('[REDACTED]1[REDACTED]2[REDACTED]3');
  });

  test('should redact quantified pattern', () => {
    expect(redact('aaaaabbbbbccccc', [/a{5}|b{5}|c{5}/])).toBe('[REDACTED][REDACTED][REDACTED]');
  });

  test('should redact optional pattern', () => {
    expect(redact('color colour', [/colou?r/g])).toBe('[REDACTED] [REDACTED]');
  });

  test('should handle string with only redacted content', () => {
    expect(redact('secret', [/secret/])).toBe('[REDACTED]');
  });

  test('should preserve spacing around redactions', () => {
    expect(redact('  secret  ', [/secret/])).toBe('  [REDACTED]  ');
  });

  test('should redact multiple patterns on same match', () => {
    // Even though both patterns match, they apply sequentially
    const result = redact('test', [/test/, /test/]);
    expect(result).toBe('[REDACTED]');
  });

  test('should redact with complex nested groups', () => {
    expect(redact('(hello)', [/\([^)]+\)/])).toBe('[REDACTED]');
  });
});
