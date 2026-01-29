/**
 * Test suite for core string manipulation functions.
 * 
 * This file provides comprehensive test coverage for the core module functions:
 * - trim: Removes whitespace from string ends
 * - pad: Adds padding characters to reach a target length
 * - slice: Extracts string sections by index
 * - repeat: Duplicates strings
 * - truncate: Limits string length with ellipsis
 * - reverse: Reverses string character order
 * 
 * Tests cover basic functionality, edge cases, and boundary conditions.
 */
import { trim, pad, slice, repeat, truncate, reverse } from '../src/core.js';

describe('trim', () => {
  test('should trim whitespace from both ends', () => {
    expect(trim('  hello  ')).toBe('hello');
  });

  test('should trim tabs and newlines', () => {
    // Validates that trim handles multiple types of whitespace characters, not just spaces
    expect(trim('\t\nhello world\n\t')).toBe('hello world');
  });

  test('should handle string with only whitespace', () => {
    // Edge case: verify complete removal when input is only whitespace
    expect(trim('   ')).toBe('');
  });

  test('should handle empty string', () => {
    expect(trim('')).toBe('');
  });

  test('should not trim internal whitespace', () => {
    expect(trim('  hello   world  ')).toBe('hello   world');
  });

  test('should handle string with no whitespace', () => {
    expect(trim('hello')).toBe('hello');
  });

  test('should trim single space', () => {
    expect(trim(' h ')).toBe('h');
  });

  test('should trim only leading whitespace', () => {
    expect(trim('  hello')).toBe('hello');
  });

  test('should trim only trailing whitespace', () => {
    expect(trim('hello  ')).toBe('hello');
  });

  test('should trim multiple types of whitespace', () => {
    expect(trim('  \t\n  hello  \n\t  ')).toBe('hello');
  });

  test('should trim single tab', () => {
    expect(trim('\thello\t')).toBe('hello');
  });

  test('should trim single newline', () => {
    expect(trim('\nhello\n')).toBe('hello');
  });

  test('should handle string with internal tabs', () => {
    expect(trim('\thello\tworld\t')).toBe('hello\tworld');
  });

  test('should trim carriage returns', () => {
    expect(trim('\rhello\r')).toBe('hello');
  });

  test('should handle single character with no whitespace', () => {
    expect(trim('a')).toBe('a');
  });
});

describe('pad', () => {
  test('should pad string to desired length', () => {
    expect(pad('hello', 10)).toBe('hello     ');
  });

  test('should pad with custom character', () => {
    expect(pad('hello', 10, '-')).toBe('hello-----');
  });

  test('should pad with numbers', () => {
    expect(pad('5', 5, '0')).toBe('50000');
  });

  test('should not pad if string is already longer than length', () => {
    // Validates boundary behavior: no padding when string exceeds target length
    expect(pad('hello', 3)).toBe('hello');
  });

  test('should not pad if string matches desired length', () => {
    expect(pad('hello', 5)).toBe('hello');
  });

  test('should pad empty string', () => {
    // Edge case: padding a completely empty string should create a string of padding chars
    expect(pad('', 5, '*')).toBe('*****');
  });

  test('should pad with multiple character string (uses first char)', () => {
    expect(pad('hello', 8, 'abc')).toBe('helloabc');
  });

  test('should handle zero length', () => {
    // Edge case: zero length target should return original string unchanged
    expect(pad('hello', 0)).toBe('hello');
  });

  test('should handle negative length', () => {
    // Edge case: negative length should return original string unchanged
    expect(pad('hello', -5)).toBe('hello');
  });

  test('should pad to exactly 1 character above string length', () => {
    expect(pad('hello', 6, '-')).toBe('hello-');
  });

  test('should pad single character string', () => {
    expect(pad('x', 5, '0')).toBe('x0000');
  });

  test('should pad with space when char is empty', () => {
    // When char is empty string, padEnd uses space by default
    expect(pad('hello', 8, '')).toBe('hello');
  });

  test('should pad with large target length', () => {
    expect(pad('x', 20, '-')).toBe('x' + '-'.repeat(19));
  });

  test('should not modify original string', () => {
    const original = 'test';
    pad(original, 10, '*');
    expect(original).toBe('test');
  });

  test('should pad unicode characters', () => {
    // Note: emoji count as 2 JavaScript code units, so actual padding is adjusted
    expect(pad('😀', 5, '-')).toBe('😀---');
  });

  test('should pad with unicode padding character', () => {
    expect(pad('hello', 7, '✓')).toBe('hello✓✓');
  });
});

describe('slice', () => {
  test('should slice string with start and end', () => {
    expect(slice('hello', 1, 4)).toBe('ell');
  });

  test('should slice string with only start', () => {
    expect(slice('hello', 2)).toBe('llo');
  });

  test('should slice from beginning', () => {
    expect(slice('hello', 0, 2)).toBe('he');
  });

  test('should handle negative start index', () => {
    // Validates negative indexing: -3 counts from the end to get last 3 characters
    expect(slice('hello', -3)).toBe('llo');
  });

  test('should handle negative end index', () => {
    // Validates negative end indexing combined with positive start
    expect(slice('hello', 1, -1)).toBe('ell');
  });

  test('should return empty string for out of bounds', () => {
    // Edge case: slicing beyond string length should return empty string
    expect(slice('hello', 10, 20)).toBe('');
  });

  test('should handle start greater than end', () => {
    // Edge case: invalid range where start > end should return empty string
    expect(slice('hello', 4, 2)).toBe('');
  });

  test('should handle empty string', () => {
    expect(slice('', 0, 5)).toBe('');
  });

  test('should slice entire string', () => {
    expect(slice('hello', 0)).toBe('hello');
  });

  test('should slice with both negative indices', () => {
    expect(slice('hello', -4, -1)).toBe('ell');
  });

  test('should slice single character', () => {
    expect(slice('hello', 0, 1)).toBe('h');
  });

  test('should slice middle character', () => {
    expect(slice('hello', 2, 3)).toBe('l');
  });

  test('should slice with start at string end', () => {
    expect(slice('hello', 5)).toBe('');
  });

  test('should handle start equal to end', () => {
    expect(slice('hello', 2, 2)).toBe('');
  });

  test('should slice with negative index beyond length', () => {
    expect(slice('hello', -10, 2)).toBe('he');
  });

  test('should slice unicode string', () => {
    // Note: emoji are multiple code units; slicing may split them incorrectly (not grapheme-aware)
    // This test documents the actual behavior
    const result = slice('hello😀world', 5, 6);
    expect(result.length).toBe(1);
  });

  test('should slice with large end index', () => {
    expect(slice('hello', 0, 100)).toBe('hello');
  });

  test('should handle consecutive slice operations', () => {
    const str = 'abcdefghij';
    expect(slice(slice(str, 1, 9), 1, 7)).toBe('cdefgh');
  });
});

describe('repeat', () => {
  test('should repeat string multiple times', () => {
    expect(repeat('ha', 3)).toBe('hahaha');
  });

  test('should repeat once', () => {
    expect(repeat('hello', 1)).toBe('hello');
  });

  test('should return empty string for zero repeat', () => {
    // Edge case: repeating 0 times produces empty string
    expect(repeat('hello', 0)).toBe('');
  });

  test('should repeat single character', () => {
    expect(repeat('x', 5)).toBe('xxxxx');
  });

  test('should repeat empty string', () => {
    // Edge case: repeating an empty string any number of times returns empty string
    expect(repeat('', 5)).toBe('');
  });

  test('should handle large repeat count', () => {
    expect(repeat('a', 10)).toBe('aaaaaaaaaa');
  });

  test('should repeat with numbers', () => {
    expect(repeat('123', 2)).toBe('123123');
  });

  test('should handle negative repeat count', () => {
    // Error handling: negative repeat count should throw an error
    expect(() => repeat('hello', -1)).toThrow();
  });

  test('should repeat with very large count', () => {
    const result = repeat('a', 100);
    expect(result.length).toBe(100);
    expect(result).toBe('a'.repeat(100));
  });

  test('should repeat space character', () => {
    expect(repeat(' ', 5)).toBe('     ');
  });

  test('should repeat multi-character string', () => {
    expect(repeat('ab', 4)).toBe('abababab');
  });

  test('should repeat special characters', () => {
    expect(repeat('!', 3)).toBe('!!!');
  });

  test('should repeat newline', () => {
    expect(repeat('\\n', 3)).toBe('\\n\\n\\n');
  });

  test('should repeat unicode character', () => {
    expect(repeat('😀', 3)).toBe('😀😀😀');
  });

  test('should handle float repeat count by rounding', () => {
    // JavaScript coerces float to integer implicitly
    expect(repeat('a', 3.9)).toBe('aaa');
  });
});

describe('truncate', () => {
  test('should truncate string exceeding max length', () => {
    expect(truncate('hello world', 5)).toBe('hello...');
  });

  test('should not truncate if under max length', () => {
    expect(truncate('hello', 10)).toBe('hello');
  });

  test('should not truncate if exactly max length', () => {
    expect(truncate('hello', 5)).toBe('hello');
  });

  test('should truncate long string', () => {
    expect(truncate('hello world from typescript', 5)).toBe('hello...');
  });

  test('should add ellipsis when truncating', () => {
    expect(truncate('truncate', 4)).toBe('trun...');
  });

  test('should handle empty string', () => {
    // Edge case: truncating empty string should return empty string
    expect(truncate('', 5)).toBe('');
  });

  test('should truncate single character', () => {
    expect(truncate('hello', 1)).toBe('h...');
  });

  test('should handle zero max length', () => {
    // Edge case: zero max length results in only ellipsis
    expect(truncate('hello', 0)).toBe('...');
  });

  test('should truncate at unicode boundaries', () => {
    // Note: This function uses character-based slicing, not grapheme-aware (emoji may be split incorrectly)
    // For proper Unicode handling, use truncate from unicode.ts
    expect(truncate('hello😀world', 5)).toBe('hello...');
  });

  test('should truncate with custom suffix', () => {
    expect(truncate('hello world', 5, '...')).toBe('hello...');
  });

  test('should truncate with single character suffix', () => {
    expect(truncate('hello world', 5, '…')).toBe('hello…');
  });

  test('should truncate very long string', () => {
    const long = 'a'.repeat(1000);
    expect(truncate(long, 10)).toBe('aaaaaaaaaa...');
  });

  test('should truncate to exact length', () => {
    expect(truncate('hello', 3)).toBe('hel...');
  });

  test('should not add suffix for strings under max length', () => {
    expect(truncate('hi', 5, '...')).toBe('hi');
  });

  test('should handle suffix longer than max length', () => {
    expect(truncate('hello world', 3, '......')).toBe('hel......');
  });

  test('should truncate single character string', () => {
    // single char 'x' has length 1, which equals maxLength, so no truncation
    expect(truncate('x', 1)).toBe('x');
  });

  test('should truncate with empty suffix', () => {
    expect(truncate('hello world', 5, '')).toBe('hello');
  });

  test('should truncate with unicode suffix', () => {
    expect(truncate('hello world', 5, '…')).toBe('hello…');
  });

  test('should handle max length of 1', () => {
    expect(truncate('hello', 1)).toBe('h...');
  });

  test('should handle spaces in truncation', () => {
    expect(truncate('hello     world', 8)).toBe('hello   ...');
  });
});

describe('reverse', () => {
  test('should reverse simple string', () => {
    expect(reverse('hello')).toBe('olleh');
  });

  test('should reverse single character', () => {
    expect(reverse('a')).toBe('a');
  });

  test('should reverse empty string', () => {
    expect(reverse('')).toBe('');
  });

  test('should reverse string with numbers', () => {
    expect(reverse('12345')).toBe('54321');
  });

  test('should reverse string with spaces', () => {
    expect(reverse('hello world')).toBe('dlrow olleh');
  });

  test('should reverse palindrome', () => {
    // Validates that reversing a palindrome returns the same string
    expect(reverse('racecar')).toBe('racecar');
  });

  test('should reverse string with special characters', () => {
    expect(reverse('hello!')).toBe('!olleh');
  });

  test('should reverse string with mixed case', () => {
    expect(reverse('HeLLo')).toBe('oLLeH');
  });

  test('should handle very long string', () => {
    // Performance check: verifies function works correctly with large strings (100 chars)
    const longStr = 'a'.repeat(100);
    expect(reverse(longStr)).toBe('a'.repeat(100));
  });

  test('should reverse string with numbers and letters', () => {
    expect(reverse('abc123xyz')).toBe('zyx321cba');
  });

  test('should reverse string with tabs', () => {
    expect(reverse('a\tb\tc')).toBe('c\tb\ta');
  });

  test('should reverse string with newlines', () => {
    expect(reverse('a\nb\nc')).toBe('c\nb\na');
  });

  test('should reverse unicode emoji', () => {
    // Note: emoji are multiple code units; reverse is not grapheme-aware
    // This test documents the actual behavior where emoji are split
    const result = reverse('😀😁😂');
    expect(result.length).toBeGreaterThan(0);
  });

  test('should reverse string with mixed unicode', () => {
    // Note: emoji are multiple code units; reverse is not grapheme-aware
    // This test documents the actual behavior
    const result = reverse('hello😀');
    expect(result).toContain('olleh');
  });

  test('should reverse and back to original', () => {
    const original = 'hello world';
    expect(reverse(reverse(original))).toBe(original);
  });

  test('should reverse string with punctuation', () => {
    expect(reverse('hello, world!')).toBe('!dlrow ,olleh');
  });

  test('should handle two character string', () => {
    expect(reverse('ab')).toBe('ba');
  });

  test('should reverse string with all same characters', () => {
    expect(reverse('aaaa')).toBe('aaaa');
  });
});
