/**
 * Test suite for string similarity comparison functions.
 * 
 * This file provides comprehensive test coverage for the similarity module functions:
 * - similarity: Calculates string similarity using Levenshtein distance algorithm
 * 
 * The function returns a score between 0 and 1:
 * - 1.0 = identical strings
 * - 0.5 = strings are 50% similar
 * - 0.0 = completely different strings or one/both are empty
 * 
 * Algorithm uses dynamic programming to compute edit distance (insertions, deletions, substitutions).
 * Tests cover identical strings, similar strings, completely different strings, edge cases,
 * and various string lengths.
 */
import { similarity } from '../src/similarity.js';

describe('similarity', () => {
  test('should return 1 for identical strings', () => {
    // Perfect match: identical strings always have similarity of 1.0
    expect(similarity('hello', 'hello')).toBe(1);
  });

  test('should return 1 for identical empty strings', () => {
    expect(similarity('', '')).toBe(1);
  });

  test('should return 0 for completely different strings', () => {
    expect(similarity('abc', 'def')).toBe(0);
  });

  test('should return 0 if first string is empty', () => {
    // Edge case: any non-empty string compared to empty is completely different
    expect(similarity('', 'hello')).toBe(0);
  });

  test('should return 0 if second string is empty', () => {
    // Edge case: any non-empty string compared to empty is completely different
    expect(similarity('hello', '')).toBe(0);
  });

  test('should calculate similarity for single character difference', () => {
    // One substitution needed: 'hello' vs 'hallo' differs by one character
    expect(similarity('hello', 'hallo')).toBeCloseTo(0.8, 1);
  });

  test('should be symmetric for similar strings', () => {
    // Validates symmetry: similarity(a, b) should equal similarity(b, a)
    expect(similarity('cat', 'car')).toBe(similarity('car', 'cat'));
  });

  test('should calculate partial similarity', () => {
    // Two characters different: 'abc' vs 'def' shares no characters
    const result = similarity('abc', 'def');
    expect(result).toBeLessThan(1);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  test('should handle single character strings', () => {
    expect(similarity('a', 'a')).toBe(1);
  });

  test('should return low similarity for different single characters', () => {
    expect(similarity('a', 'b')).toBe(0);
  });

  test('should calculate similarity for strings with one insertion needed', () => {
    // One insertion: 'cat' vs 'cats' requires adding 's'
    const result = similarity('cat', 'cats');
    expect(result).toBeGreaterThan(0.5);
    expect(result).toBeLessThan(1);
  });

  test('should calculate similarity for strings with one deletion needed', () => {
    // One deletion: 'cats' vs 'cat' requires removing 's'
    const result = similarity('cats', 'cat');
    expect(result).toBeGreaterThan(0.5);
    expect(result).toBeLessThan(1);
  });

  test('should calculate similarity for strings with similar prefixes', () => {
    // Common prefix: 'kitten' vs 'sitting' share several characters
    const result = similarity('kitten', 'sitting');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should calculate similarity for reversed strings', () => {
    // Validates edit distance: reversing a string requires multiple edits
    const result = similarity('abc', 'cba');
    expect(result).toBeLessThan(1);
    expect(result).toBeGreaterThanOrEqual(0);
  });

  test('should handle case sensitivity', () => {
    // Validates case sensitivity: 'Hello' and 'hello' differ by capitalization
    const result = similarity('Hello', 'hello');
    expect(result).toBeLessThan(1);
  });

  test('should calculate similarity for strings of different lengths', () => {
    // Different lengths: algorithm normalizes by max(length1, length2)
    const result = similarity('short', 'verylongstring');
    expect(result).toBeLessThan(1);
  });

  test('should handle strings with spaces', () => {
    expect(similarity('hello world', 'hello world')).toBe(1);
  });

  test('should handle strings with special characters', () => {
    expect(similarity('hello!', 'hello!')).toBe(1);
  });

  test('should calculate similarity for strings with numbers', () => {
    expect(similarity('abc123', 'abc456')).toBeCloseTo(0.5, 1);
  });

  test('should be reflexive (string with itself)', () => {
    // Reflexivity: a string should always have similarity 1 with itself
    const str = 'antidisestablishmentarianism';
    expect(similarity(str, str)).toBe(1);
  });

  test('should calculate similarity for common words with typos', () => {
    // Real-world use case: detecting typos in words
    const result = similarity('received', 'recieved');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle very long strings', () => {
    // Performance check: algorithm should handle long strings correctly
    const str1 = 'a'.repeat(100);
    const str2 = 'a'.repeat(100);
    expect(similarity(str1, str2)).toBe(1);
  });

  test('should handle very different long strings', () => {
    // Edge case: very long completely different strings
    const str1 = 'a'.repeat(50);
    const str2 = 'b'.repeat(50);
    expect(similarity(str1, str2)).toBe(0);
  });

  test('should calculate similarity for strings with common substring', () => {
    // Common substring: 'Saturday' and 'Sunday' both contain 'day'
    const result = similarity('Saturday', 'Sunday');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should return score closer to 1 for very similar strings', () => {
    // Validates sensitivity: small differences result in scores close to 1
    const result = similarity('abcdefghij', 'abcdefghik');
    expect(result).toBeGreaterThan(0.8);
  });

  // Edge cases and boundary conditions
  test('should handle strings with only whitespace', () => {
    expect(similarity('   ', '   ')).toBe(1);
  });

  test('should handle strings with different whitespace', () => {
    const result = similarity('hello world', 'helloworld');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle tab characters', () => {
    expect(similarity('hello\tworld', 'hello\tworld')).toBe(1);
  });

  test('should handle newline characters', () => {
    expect(similarity('hello\nworld', 'hello\nworld')).toBe(1);
  });

  test('should handle carriage return characters', () => {
    expect(similarity('hello\rworld', 'hello\rworld')).toBe(1);
  });

  test('should handle mixed whitespace characters', () => {
    const result = similarity('hello \t\n world', 'hello world');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle unicode characters', () => {
    expect(similarity('café', 'café')).toBe(1);
  });

  test('should handle similar unicode strings', () => {
    const result = similarity('café', 'cafe');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle emoji characters', () => {
    expect(similarity('hello 😀', 'hello 😀')).toBe(1);
  });

  test('should handle different emoji', () => {
    const result = similarity('hello 😀', 'hello 😢');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle strings with multiple emoji', () => {
    const str1 = '😀😁😂';
    const str2 = '😀😁😂';
    expect(similarity(str1, str2)).toBe(1);
  });

  test('should handle strings with numbers and letters', () => {
    expect(similarity('test123', 'test123')).toBe(1);
  });

  test('should handle similar numeric strings', () => {
    const result = similarity('123456', '123457');
    expect(result).toBeGreaterThan(0.8);
  });

  test('should handle strings with special characters only', () => {
    expect(similarity('!@#$%', '!@#$%')).toBe(1);
  });

  test('should handle similar special character strings', () => {
    const result = similarity('!@#$%', '!@#$&');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle punctuation differences', () => {
    const result = similarity('hello,world', 'hello.world');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should calculate similarity for anagrams', () => {
    // Anagrams differ in order, requiring multiple edits
    const result = similarity('listen', 'silent');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle single insertion at beginning', () => {
    const result = similarity('test', 'atest');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle single insertion at end', () => {
    const result = similarity('test', 'testa');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle single insertion in middle', () => {
    const result = similarity('test', 'teast');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle multiple insertions', () => {
    const result = similarity('cat', 'carpet');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle multiple deletions', () => {
    const result = similarity('carpet', 'cat');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle multiple substitutions', () => {
    const result = similarity('abc', 'xyz');
    expect(result).toBeLessThan(0.5);
  });

  test('should calculate similarity for substrings', () => {
    const result = similarity('hello', 'helloworld');
    expect(result).toBeGreaterThanOrEqual(0.5);
  });

  test('should handle repeated characters', () => {
    expect(similarity('aaa', 'aaa')).toBe(1);
  });

  test('should handle similar repeated character strings', () => {
    const result = similarity('aaa', 'aaaa');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle completely different repeated characters', () => {
    const result = similarity('aaa', 'bbb');
    expect(result).toBe(0);
  });

  test('should handle palindromes', () => {
    expect(similarity('racecar', 'racecar')).toBe(1);
  });

  test('should handle almost palindromes', () => {
    const result = similarity('racecar', 'racexar');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle mixed case with unicode', () => {
    const result = similarity('Café', 'café');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle very short strings with maximum difference', () => {
    const result = similarity('a', 'zzz');
    expect(result).toBeLessThan(1);
  });

  test('should handle strings with leading spaces', () => {
    const result = similarity('  hello', 'hello');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle strings with trailing spaces', () => {
    const result = similarity('hello  ', 'hello');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle strings with both leading and trailing spaces', () => {
    const result = similarity('  hello  ', 'hello');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle duplicate consecutive characters', () => {
    const result = similarity('hello', 'hellooo');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle string with mixed case and numbers', () => {
    const result = similarity('Test123', 'test456');
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThan(1);
  });

  test('should handle comparison with itself multiple times', () => {
    const str = 'consistency';
    expect(similarity(str, str)).toBe(1);
    expect(similarity(str, str)).toBe(1);
  });

  test('should handle very long similar strings', () => {
    const str1 = 'a'.repeat(100) + 'b';
    const str2 = 'a'.repeat(100) + 'c';
    expect(similarity(str1, str2)).toBeGreaterThan(0.9);
  });

  test('should handle strings with all same character except one', () => {
    const result = similarity('aaaaaaa', 'aaaaaab');
    expect(result).toBeGreaterThan(0.8);
  });

  test('should handle strings differing only in first character', () => {
    const result = similarity('xhello', 'yhello');
    expect(result).toBeGreaterThan(0.7);
  });

  test('should handle strings differing only in last character', () => {
    const result = similarity('hellox', 'helloy');
    expect(result).toBeGreaterThan(0.7);
  });

  test('should handle strings with only vowels vs consonants', () => {
    const result = similarity('aeiou', 'bcdfg');
    expect(result).toBe(0);
  });

  test('should handle two-character strings', () => {
    expect(similarity('ab', 'ab')).toBe(1);
  });

  test('should handle two-character strings with one difference', () => {
    const result = similarity('ab', 'ac');
    expect(result).toBeCloseTo(0.5, 1);
  });

  test('should handle numeric string comparison', () => {
    const result = similarity('12345', '12346');
    expect(result).toBeGreaterThanOrEqual(0.8);
  });

  test('should calculate similarity for scientific notation strings', () => {
    const result = similarity('1e10', '1e11');
    expect(result).toBeGreaterThan(0.5);
  });

  test('should handle URL-like strings', () => {
    const result = similarity(
      'https://example.com/path',
      'https://example.com/path'
    );
    expect(result).toBe(1);
  });

  test('should handle email-like strings', () => {
    const result = similarity('test@example.com', 'test@example.com');
    expect(result).toBe(1);
  });

  test('should handle similar email strings with typo', () => {
    const result = similarity('test@example.com', 'test@exampel.com');
    expect(result).toBeGreaterThan(0.8);
  });

  test('should handle path-like strings', () => {
    const result = similarity('/path/to/file', '/path/to/file');
    expect(result).toBe(1);
  });

  test('should handle similar path strings', () => {
    const result = similarity('/path/to/file', '/path/to/file/');
    expect(result).toBeGreaterThan(0.9);
  });

  test('should handle JSON-like strings', () => {
    const result = similarity('{"key":"value"}', '{"key":"value"}');
    expect(result).toBe(1);
  });

  test('should handle CSV-like strings', () => {
    const result = similarity('a,b,c', 'a,b,c');
    expect(result).toBe(1);
  });

  test('should handle strings with escape sequences', () => {
    const result = similarity('hello\\nworld', 'hello\\nworld');
    expect(result).toBe(1);
  });

  test('should handle very different lengths symmetrically', () => {
    const result1 = similarity('a', 'verylongstring');
    const result2 = similarity('verylongstring', 'a');
    expect(result1).toBe(result2);
  });
});
