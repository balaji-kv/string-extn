/**
 * Test suite for string difference/comparison functions.
 * 
 * This file provides comprehensive test coverage for the diff module functions:
 * - diff: Compares two strings and returns character differences
 * 
 * The function identifies characters that are unique to each string:
 * - Characters prefixed with '-' appear in the first string only
 * - Characters prefixed with '+' appear in the second string only
 * 
 * Tests cover basic comparisons, edge cases, duplicates handling,
 * special characters, and empty string scenarios.
 */
import { diff } from '../src/diff.js';

describe('diff', () => {
  test('should identify differences between two simple strings', () => {
    expect(diff('abc', 'bcd')).toEqual(['-a', '+d']);
  });

  test('should identify single character difference', () => {
    expect(diff('hello', 'hallo')).toEqual(['-e', '+a']);
  });

  test('should return empty array for identical strings', () => {
    // Edge case: no differences means no characters are unique to either string
    expect(diff('hello', 'hello')).toEqual([]);
  });

  test('should identify multiple differences', () => {
    expect(diff('abc', 'def')).toEqual(['-a', '-b', '-c', '+d', '+e', '+f']);
  });

  test('should handle empty first string', () => {
    // Edge case: first string empty, all chars from second are additions
    expect(diff('', 'abc')).toEqual(['+a', '+b', '+c']);
  });

  test('should handle empty second string', () => {
    // Edge case: second string empty, all chars from first are deletions
    expect(diff('abc', '')).toEqual(['-a', '-b', '-c']);
  });

  test('should handle both strings empty', () => {
    // Edge case: both empty means no differences
    expect(diff('', '')).toEqual([]);
  });

  test('should ignore duplicate characters in comparison', () => {
    // Feature: uses Set internally, so duplicates are counted only once
    expect(diff('aaa', 'bbb')).toEqual(['-a', '+b']);
  });

  test('should handle duplicate characters in first string', () => {
    // Validates set behavior: 'aaa' becomes set {'a'}, compared against 'ab'
    expect(diff('aaa', 'ab')).toEqual(['+b']);
  });

  test('should handle duplicate characters in second string', () => {
    // Validates set behavior: 'ab' compared against 'bbb' which becomes set {'b'}
    expect(diff('ab', 'bbb')).toEqual(['-a']);
  });

  test('should handle strings with special characters', () => {
    expect(diff('hello!', 'hello?')).toEqual(['-!', '+?']);
  });

  test('should handle strings with numbers', () => {
    expect(diff('123', '456')).toEqual(['-1', '-2', '-3', '+4', '+5', '+6']);
  });

  test('should handle strings with spaces', () => {
    expect(diff('a b', 'a-b')).toEqual(['-' + ' ', '+-']);
  });

  test('should handle mixed case characters as different', () => {
    // Validates case sensitivity: 'A' and 'a' are treated as different characters
    expect(diff('A', 'a')).toEqual(['-A', '+a']);
  });

  test('should handle single character strings', () => {
    expect(diff('a', 'b')).toEqual(['-a', '+b']);
  });

  test('should handle case with overlapping characters', () => {
    // Validates set intersection: common characters excluded, only unique ones returned
    expect(diff('abc', 'bcd')).toEqual(['-a', '+d']);
  });

  test('should handle strings with only common characters', () => {
    // Edge case: all characters common, different order doesn't matter (uses sets)
    expect(diff('abc', 'cba')).toEqual([]);
  });

  test('should handle long strings', () => {
    expect(diff('abcdef', 'ghijkl')).toEqual([
      '-a', '-b', '-c', '-d', '-e', '-f',
      '+g', '+h', '+i', '+j', '+k', '+l'
    ]);
  });

  test('should handle strings with repeated unique characters', () => {
    // Validates set behavior: 'aaabbb' becomes {'a', 'b'} vs 'bbbccc' becomes {'b', 'c'}
    expect(diff('aaabbb', 'bbbccc')).toEqual(['-a', '+c']);
  });

  test('should handle single character repeated many times vs different single char', () => {
    expect(diff('aaaa', 'b')).toEqual(['-a', '+b']);
  });

  test('should handle strings with unicode characters', () => {
    expect(diff('café', 'cafe')).toEqual(['-é', '+e']);
  });

  test('should handle strings with emoji', () => {
    // Note: emoji are multiple code units and may be split (not grapheme-aware)
    // This test documents the actual behavior
    const result = diff('hello😀', 'hello😁');
    expect(result.length).toBeGreaterThan(0);
  });

  test('should handle whitespace characters', () => {
    expect(diff('hello world', 'hello\tworld')).toEqual(['-' + ' ', '+\t']);
  });

  test('should handle tabs and newlines', () => {
    expect(diff('a\tb', 'a\nb')).toEqual(['-\t', '+\n']);
  });

  test('should handle carriage returns', () => {
    expect(diff('a\rb', 'a\nb')).toEqual(['-\r', '+\n']);
  });

  test('should handle strings with punctuation', () => {
    expect(diff('hello,world', 'hello.world')).toEqual(['-,', '+.']);
  });

  test('should handle numbers mixed with letters', () => {
    expect(diff('test123', 'test456')).toEqual(['-1', '-2', '-3', '+4', '+5', '+6']);
  });

  test('should handle very long identical strings', () => {
    const longStr = 'a'.repeat(1000);
    expect(diff(longStr, longStr)).toEqual([]);
  });

  test('should handle very long different strings', () => {
    const str1 = 'a'.repeat(100);
    const str2 = 'b'.repeat(100);
    expect(diff(str1, str2)).toEqual(['-a', '+b']);
  });

  test('should return deletions before additions', () => {
    // Validates order: deletions come first, then additions
    const result = diff('aab', 'bbc');
    const deletions = result.filter(x => x.startsWith('-'));
    const additions = result.filter(x => x.startsWith('+'));
    expect(deletions.length).toBeGreaterThan(0);
    expect(additions.length).toBeGreaterThan(0);
    expect(result.indexOf(deletions[0]) < result.indexOf(additions[0])).toBe(true);
  });

  test('should handle strings with all same characters vs different chars', () => {
    expect(diff('aaaa', 'bbbb')).toEqual(['-a', '+b']);
  });

  test('should handle subset relationship (first is subset of second)', () => {
    expect(diff('abc', 'abcdef')).toEqual(['+d', '+e', '+f']);
  });

  test('should handle subset relationship (second is subset of first)', () => {
    expect(diff('abcdef', 'abc')).toEqual(['-d', '-e', '-f']);
  });

  test('should handle strings with only digits', () => {
    expect(diff('123', '234')).toEqual(['-1', '+4']);
  });

  test('should handle strings with mixed case letters', () => {
    expect(diff('AaBb', 'AaBc')).toEqual(['-b', '+c']);
  });

  test('should not include duplicate items in result', () => {
    const result = diff('aabbcc', 'aaddee');
    // Each character should appear at most once with each prefix
    const deletions = result.filter(x => x.startsWith('-'));
    const deletionChars = deletions.map(x => x.substring(1));
    expect(new Set(deletionChars).size).toBe(deletionChars.length);
  });

  test('should handle hyphen characters', () => {
    expect(diff('a-b', 'a_b')).toEqual(['-' + '-', '+' + '_']);
  });

  test('should handle equal signs', () => {
    expect(diff('a=b', 'a!=b')).toEqual(['+!']);
  });

  test('should handle parentheses and brackets', () => {
    expect(diff('(a)', '[a]')).toEqual(['-' + '(', '-' + ')', '+' + '[', '+' + ']']);
  });

  test('should handle strings with only special characters', () => {
    expect(diff('!@#', '$%^')).toEqual(['-!', '-@', '-#', '+$', '+%', '+^']);
  });
});
