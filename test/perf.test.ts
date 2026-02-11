/**
 * Test suite for performance-focused string functions, covering edge cases
 * and behavior differences from native helpers.
 */
import { fastRepeat, fastPadLeft } from '../src/perf.js';

describe('fastRepeat', () => {
  test('should return empty string when count is 0', () => {
    expect(fastRepeat('abc', 0)).toBe('');
  });

  test('should return the input when count is 1', () => {
    expect(fastRepeat('abc', 1)).toBe('abc');
  });

  test('should handle large counts', () => {
    // Large repeat counts should still match native repeat().
    const input = 'ab';
    const count = 10000;
    expect(fastRepeat(input, count)).toBe(input.repeat(count));
  });

  test('should handle unicode strings', () => {
    // Unicode strings should repeat without corruption.
    const input = '😀✓';
    const count = 5;
    expect(fastRepeat(input, count)).toBe(input.repeat(count));
  });

  test('should return empty string for negative count', () => {
    expect(fastRepeat('abc', -3)).toBe('');
  });

  test('should return empty string for non-finite counts', () => {
    // Non-finite counts are rejected to avoid infinite work.
    expect(fastRepeat('abc', Number.POSITIVE_INFINITY)).toBe('');
    expect(fastRepeat('abc', Number.NaN)).toBe('');
  });

  test('should floor non-integer counts', () => {
    // Non-integer counts are floored to the nearest lower integer.
    expect(fastRepeat('ab', 2.9)).toBe('abab');
  });

  test('should handle empty input', () => {
    expect(fastRepeat('', 5)).toBe('');
  });

  test('should match native repeat for various counts', () => {
    const input = 'xyz';
    expect(fastRepeat(input, 2)).toBe(input.repeat(2));
    expect(fastRepeat(input, 7)).toBe(input.repeat(7));
  });
});

describe('fastPadLeft', () => {
  test('should return original string when already long enough', () => {
    expect(fastPadLeft('hello', 3)).toBe('hello');
    expect(fastPadLeft('hello', 5)).toBe('hello');
  });

  test('should pad with spaces by default', () => {
    expect(fastPadLeft('hi', 5)).toBe('   hi');
  });

  test('should pad with custom character', () => {
    expect(fastPadLeft('hi', 5, '0')).toBe('000hi');
  });

  test('should handle empty input', () => {
    expect(fastPadLeft('', 3, '*')).toBe('***');
  });

  test('should handle unicode input', () => {
    // Code unit length determines padding when input contains emoji.
    expect(fastPadLeft('😀', 3, '✓')).toBe('✓😀');
  });

  test('should not mutate the input', () => {
    const input = 'test';
    fastPadLeft(input, 6, '-');
    expect(input).toBe('test');
  });
});
