/**
 * Test suite for stream-related string functions, covering chunking behavior
 * and transform edge cases.
 */
import { chunkString, streamTransform } from '../src/stream.js';

describe('chunkString', () => {
  test('should split into exact chunk sizes', () => {
    expect(chunkString('abcdef', 2)).toEqual(['ab', 'cd', 'ef']);
  });

  test('should include remainder chunk', () => {
    expect(chunkString('abcdefg', 3)).toEqual(['abc', 'def', 'g']);
  });

  test('should handle size = 1', () => {
    expect(chunkString('abc', 1)).toEqual(['a', 'b', 'c']);
  });

  test('should handle size greater than input length', () => {
    expect(chunkString('abc', 10)).toEqual(['abc']);
  });

  test('should throw when size is 0', () => {
    // Guard against invalid sizes that would cause infinite loops.
    expect(() => chunkString('abc', 0)).toThrow('Chunk size must be a positive number.');
  });

  test('should throw when size is negative', () => {
    expect(() => chunkString('abc', -2)).toThrow('Chunk size must be a positive number.');
  });

  test('should throw when size is not finite', () => {
    // Non-finite sizes are rejected explicitly.
    expect(() => chunkString('abc', Number.POSITIVE_INFINITY)).toThrow('Chunk size must be a positive number.');
    expect(() => chunkString('abc', Number.NaN)).toThrow('Chunk size must be a positive number.');
  });

  test('should handle empty input', () => {
    expect(chunkString('', 3)).toEqual([]);
  });

  test('should handle unicode grapheme clusters without splitting surrogate pairs', () => {
    // Chunk size is set to surrogate-pair length to avoid splitting emoji.
    const input = '😀👍';
    expect(chunkString(input, 2)).toEqual(['😀', '👍']);
  });

  test('should floor non-integer sizes via slicing behavior', () => {
    // Non-integer sizes rely on JS slicing behavior for indices.
    expect(chunkString('abcdef', 2.5)).toEqual(['ab', 'cde', 'f']);
  });
});

describe('streamTransform', () => {
  test('should transform and concatenate chunks', () => {
    const chunks = ['a', 'b', 'c'];
    const result = streamTransform(chunks, chunk => chunk.toUpperCase());
    expect(result).toBe('ABC');
  });

  test('should handle empty chunks array', () => {
    expect(streamTransform([], chunk => chunk)).toBe('');
  });

  test('should pass each chunk to transformer in order', () => {
    // Confirms order preservation and per-chunk invocation.
    const chunks = ['x', 'y', 'z'];
    const seen: string[] = [];
    const result = streamTransform(chunks, chunk => {
      seen.push(chunk);
      return `${chunk}-`;
    });

    expect(seen).toEqual(['x', 'y', 'z']);
    expect(result).toBe('x-y-z-');
  });

  test('should handle unicode output', () => {
    const chunks = ['😀', '👍'];
    expect(streamTransform(chunks, chunk => chunk + '✓')).toBe('😀✓👍✓');
  });
});
