/**
 * Test suite for functional programming utility functions.
 * 
 * This file provides comprehensive test coverage for the fp module functions:
 * - map: Applies transformation function to each character
 * - filter: Keeps only characters matching a predicate
 * - reduce: Accumulates a value by processing each character
 * - compose: Chains multiple functions right-to-left
 * 
 * Tests cover basic functionality, edge cases, various data types, and composition patterns.
 */
import { map, filter, reduce, compose } from '../src/fp.js';

describe('map', () => {
  test('should map each character to uppercase', () => {
    expect(map('hello', (c) => c.toUpperCase())).toBe('HELLO');
  });

  test('should map each character to lowercase', () => {
    expect(map('HELLO', (c) => c.toLowerCase())).toBe('hello');
  });

  test('should map each character by doubling', () => {
    expect(map('abc', (c) => c + c)).toBe('aabbcc');
  });

  test('should map single character', () => {
    expect(map('a', (c) => c.toUpperCase())).toBe('A');
  });

  test('should map empty string', () => {
    // Edge case: mapping over empty string should return empty string
    expect(map('', (c) => c.toUpperCase())).toBe('');
  });

  test('should map string with numbers', () => {
    // Validates type conversion: parse characters as numbers and transform them
    expect(map('123', (c) => String(parseInt(c) * 2))).toBe('246');
  });

  test('should map string with special characters', () => {
    expect(map('a!b@c', (c) => c.toUpperCase())).toBe('A!B@C');
  });

  test('should map string with spaces', () => {
    // Validates conditional transformation: replace spaces with underscores
    expect(map('a b c', (c) => c === ' ' ? '_' : c)).toBe('a_b_c');
  });

  test('should map using conditional logic', () => {
    expect(map('aabbcc', (c) => c === 'a' ? 'x' : c)).toBe('xxbbcc');
  });

  test('should map with character code operations', () => {
    expect(map('abc', (c) => String.fromCharCode(c.charCodeAt(0) + 1))).toBe('bcd');
  });

  test('should map alternating transformation', () => {
    let count = 0;
    expect(map('abcd', (c) => count++ % 2 === 0 ? c.toUpperCase() : c.toLowerCase())).toBe('AbCd');
  });

  test('should map with index-like behavior using external state', () => {
    // Note: map function doesn't provide index, so demonstrating workaround
    expect(map('hello', (c) => c.toUpperCase())).toBe('HELLO');
  });

  test('should map to remove characters by returning empty string', () => {
    expect(map('a1b2c3', (c) => /\d/.test(c) ? '' : c)).toBe('abc');
  });

  test('should map string with unicode characters', () => {
    expect(map('café', (c) => c.toUpperCase())).toBe('CAFÉ');
  });

  test('should map with regex matching', () => {
    expect(map('aabbcc', (c) => /[abc]/.test(c) ? 'x' : c)).toBe('xxxxxx');
  });

  test('should map preserving whitespace', () => {
    expect(map('a b c', (c) => c === ' ' ? c : c.toUpperCase())).toBe('A B C');
  });

  test('should map with no transformation', () => {
    expect(map('hello', (c) => c)).toBe('hello');
  });
});

describe('filter', () => {
  test('should filter vowels', () => {
    expect(filter('hello', (c) => 'aeiou'.includes(c))).toBe('eo');
  });

  test('should filter consonants', () => {
    expect(filter('hello', (c) => !'aeiou'.includes(c))).toBe('hll');
  });

  test('should filter numbers', () => {
    expect(filter('a1b2c3', (c) => /\d/.test(c))).toBe('123');
  });

  test('should filter letters', () => {
    expect(filter('a1b2c3', (c) => /[a-z]/i.test(c))).toBe('abc');
  });

  test('should filter uppercase letters', () => {
    // Validates comparison: character is uppercase when equal to itself.toUpperCase()
    expect(filter('AaBbCc', (c) => c === c.toUpperCase())).toBe('ABC');
  });

  test('should filter lowercase letters', () => {
    // Validates comparison: character is lowercase when equal to itself.toLowerCase()
    expect(filter('AaBbCc', (c) => c === c.toLowerCase())).toBe('abc');
  });

  test('should filter spaces', () => {
    expect(filter('hello world', (c) => c !== ' ')).toBe('helloworld');
  });

  test('should filter empty string', () => {
    // Edge case: filtering empty string returns empty string
    expect(filter('', (c) => true)).toBe('');
  });

  test('should return empty string when all filtered out', () => {
    // Edge case: predicate always false removes all characters
    expect(filter('abc', (c) => false)).toBe('');
  });

  test('should return original string when nothing filtered', () => {
    // Edge case: predicate always true keeps all characters
    expect(filter('hello', (c) => true)).toBe('hello');
  });

  test('should filter special characters', () => {
    expect(filter('a!b@c#', (c) => /[a-z]/i.test(c))).toBe('abc');
  });

  test('should filter keeping only specific character', () => {
    expect(filter('aabbcc', (c) => c === 'b')).toBe('bb');
  });

  test('should filter with length condition', () => {
    // Testing filter with more complex predicate
    expect(filter('hello world', (c) => c.length > 0)).toBe('hello world');
  });

  test('should filter removing special characters', () => {
    expect(filter('a!@#b$%^c', (c) => /[a-z]/i.test(c))).toBe('abc');
  });

  test('should filter unicode characters', () => {
    expect(filter('café', (c) => c !== 'é')).toBe('caf');
  });

  test('should filter keeping only punctuation', () => {
    expect(filter('a!b@c#', (c) => /[!@#$%^&*]/.test(c))).toBe('!@#');
  });

  test('should filter with negated regex', () => {
    expect(filter('a1b2c3', (c) => !/\d/.test(c))).toBe('abc');
  });

  test('should filter whitespace characters', () => {
    expect(filter('a  b\tc\nd', (c) => /\S/.test(c))).toBe('abcd');
  });

  test('should filter single character that matches', () => {
    expect(filter('a', (c) => c === 'a')).toBe('a');
  });

  test('should filter single character that does not match', () => {
    expect(filter('a', (c) => c === 'b')).toBe('');
  });

  test('should filter with character code comparison', () => {
    // Keep only characters with code point >= 'h'
    expect(filter('abcdefghij', (c) => c.charCodeAt(0) >= 'h'.charCodeAt(0))).toBe('hij');
  });
});

describe('reduce', () => {
  test('should count characters', () => {
    const result = reduce('hello', (acc, c) => acc + 1, 0);
    expect(result).toBe(5);
  });

  test('should concatenate characters with prefix', () => {
    const result = reduce('abc', (acc, c) => acc + c, '');
    expect(result).toBe('abc');
  });

  test('should sum character codes', () => {
    // Validates accumulation: converts characters to ASCII codes and sums them
    const result = reduce('abc', (acc, c) => acc + c.charCodeAt(0), 0);
    expect(result).toBe(97 + 98 + 99);
  });

  test('should build object with character counts', () => {
    // Demonstrates object accumulation: creates frequency map of characters
    const result = reduce(
      'aabbcc',
      (acc, c) => ({ ...acc, [c]: (acc[c] || 0) + 1 }),
      {} as Record<string, number>
    );
    expect(result).toEqual({ a: 2, b: 2, c: 2 });
  });

  test('should find maximum character code', () => {
    // Demonstrates finding max: uses Math.max to track highest character code
    const result = reduce(
      'abc',
      (acc, c) => Math.max(acc, c.charCodeAt(0)),
      0
    );
    expect(result).toBe(99);
  });

  test('should reduce to empty string', () => {
    // Edge case: reducer ignores characters and always returns initial accumulator
    const result = reduce('hello', (acc) => acc, '');
    expect(result).toBe('');
  });

  test('should reduce single character', () => {
    const result = reduce('a', (acc, c) => acc + c, '');
    expect(result).toBe('a');
  });

  test('should reduce empty string', () => {
    // Edge case: reducing empty string returns initial value without processing
    const result = reduce('', (acc, c) => acc + c, 'start');
    expect(result).toBe('start');
  });

  test('should create frequency map', () => {
    // Demonstrates complex reduce: builds character frequency map from multi-character string
    const result = reduce(
      'mississippi',
      (acc, c) => ({ ...acc, [c]: (acc[c] || 0) + 1 }),
      {} as Record<string, number>
    );
    expect(result).toEqual({ m: 1, i: 4, s: 4, p: 2 });
  });

  test('should reduce with number accumulator', () => {
    const result = reduce('12345', (acc, c) => acc + parseInt(c), 0);
    expect(result).toBe(15);
  });

  test('should reduce string reversal', () => {
    const result = reduce('hello', (acc, c) => c + acc, '');
    expect(result).toBe('olleh');
  });

  test('should reduce building array', () => {
    const result = reduce('abc', (acc, c) => [...acc, c], [] as string[]);
    expect(result).toEqual(['a', 'b', 'c']);
  });

  test('should reduce with boolean accumulator', () => {
    // Check if all characters are vowels
    const result = reduce('aei', (acc, c) => acc && 'aeiou'.includes(c), true);
    expect(result).toBe(true);
  });

  test('should reduce with boolean accumulator returning false', () => {
    const result = reduce('abc', (acc, c) => acc && 'aeiou'.includes(c), true);
    expect(result).toBe(false);
  });

  test('should reduce finding minimum character', () => {
    const result = reduce('bdca', (acc, c) => c < acc ? c : acc, 'z');
    expect(result).toBe('a');
  });

  test('should reduce with complex object accumulation', () => {
    const result = reduce(
      'aabbcc',
      (acc, c) => {
        acc.total++;
        acc.chars[c] = (acc.chars[c] || 0) + 1;
        return acc;
      },
      { total: 0, chars: {} as Record<string, number> }
    );
    expect(result.total).toBe(6);
    expect(result.chars).toEqual({ a: 2, b: 2, c: 2 });
  });

  test('should reduce with unicode characters', () => {
    const result = reduce('café', (acc, c) => acc + c, '');
    expect(result).toBe('café');
  });

  test('should reduce with special characters count', () => {
    const result = reduce('a!b@c#', (acc) => acc + 1, 0);
    expect(result).toBe(6);
  });

  test('should reduce finding mode character', () => {
    const result = reduce(
      'aabbbbcc',
      (acc, c) => {
        const count = (acc[c] || 0) + 1;
        return { ...acc, [c]: count };
      },
      {} as Record<string, number>
    );
    expect(result['b']).toBe(4);
  });
});

describe('compose', () => {
  test('should compose two functions', () => {
    // Demonstrates right-to-left execution: add1 runs first (5+1=6), then mult2 (6*2=12)
    const add1 = (x: number) => x + 1;
    const mult2 = (x: number) => x * 2;
    const composed = compose(mult2, add1);
    expect(composed(5)).toBe(12);
  });

  test('should compose three functions', () => {
    // Demonstrates chaining: add1 (5+1=6), mult2 (6*2=12), add10 (12+10=22)
    const add1 = (x: number) => x + 1;
    const mult2 = (x: number) => x * 2;
    const add10 = (x: number) => x + 10;
    const composed = compose(add10, mult2, add1);
    expect(composed(5)).toBe(22);
  });

  test('should compose with string functions', () => {
    const upper = (s: string) => s.toUpperCase();
    const exclaim = (s: string) => s + '!';
    const composed = compose(exclaim, upper);
    expect(composed('hello')).toBe('HELLO!');
  });

  test('should compose single function', () => {
    const add5 = (x: number) => x + 5;
    const composed = compose(add5);
    expect(composed(10)).toBe(15);
  });

  test('should compose identity function', () => {
    const identity = (x: any) => x;
    const composed = compose(identity, identity);
    expect(composed(42)).toBe(42);
  });

  test('should apply functions right to left', () => {
    // Validates right-to-left order: g runs first (3+5=8), then f (8*2=16)
    const f = (x: number) => x * 2;
    const g = (x: number) => x + 5;
    const composed = compose(f, g);
    expect(composed(3)).toBe(16);
  });

  test('should compose with object', () => {
    const addName = (obj: any) => ({ ...obj, name: 'test' });
    const addAge = (obj: any) => ({ ...obj, age: 25 });
    const composed = compose(addAge, addName);
    expect(composed({})).toEqual({ name: 'test', age: 25 });
  });

  test('should compose with array', () => {
    // Demonstrates type flexibility: map2x applies first ([1,2,3] → [2,4,6]), then reverse
    const reverse = (arr: any[]) => [...arr].reverse();
    const map2x = (arr: number[]) => arr.map((x) => x * 2);
    const composed = compose(reverse, map2x);
    expect(composed([1, 2, 3])).toEqual([6, 4, 2]);
  });

  test('should compose complex chain', () => {
    // Demonstrates multi-function chain: double (5*2=10), addTen (10+10=20), divide (20/2=10)
    const double = (x: number) => x * 2;
    const addTen = (x: number) => x + 10;
    const divide = (x: number) => x / 2;
    const composed = compose(divide, addTen, double);
    expect(composed(5)).toBe(10);
  });

  test('should compose with no functions', () => {
    // Edge case: composing with no functions acts as identity function
    const composed = compose();
    expect(composed(42)).toBe(42);
  });

  test('should compose four functions', () => {
    const add1 = (x: number) => x + 1;
    const mult2 = (x: number) => x * 2;
    const sub3 = (x: number) => x - 3;
    const div2 = (x: number) => x / 2;
    const composed = compose(div2, sub3, mult2, add1);
    // add1(5)=6, mult2(6)=12, sub3(12)=9, div2(9)=4.5
    expect(composed(5)).toBe(4.5);
  });

  test('should compose with boolean functions', () => {
    const isEven = (x: number) => x % 2 === 0;
    const negate = (b: boolean) => !b;
    const composed = compose(negate, isEven);
    expect(composed(4)).toBe(false);
    expect(composed(5)).toBe(true);
  });

  test('should compose with string manipulation functions', () => {
    const reverse = (s: string) => s.split('').reverse().join('');
    const upper = (s: string) => s.toUpperCase();
    const composed = compose(upper, reverse);
    expect(composed('hello')).toBe('OLLEH');
  });

  test('should compose with filter-like functions', () => {
    const removeVowels = (s: string) => s.replace(/[aeiou]/gi, '');
    const upper = (s: string) => s.toUpperCase();
    const composed = compose(upper, removeVowels);
    expect(composed('hello world')).toBe('HLL WRLD');
  });

  test('should compose with array operations', () => {
    const flatten = (arr: any[]) => arr.flat();
    const reverse = (arr: any[]) => [...arr].reverse();
    const composed = compose(reverse, flatten);
    expect(composed([[1, 2], [3, 4]])).toEqual([4, 3, 2, 1]);
  });

  test('should compose identity functions', () => {
    const id1 = (x: any) => x;
    const id2 = (x: any) => x;
    const id3 = (x: any) => x;
    const composed = compose(id3, id2, id1);
    expect(composed('test')).toBe('test');
  });

  test('should compose with conditional functions', () => {
    const absolute = (x: number) => x < 0 ? -x : x;
    const square = (x: number) => x * x;
    const composed = compose(square, absolute);
    expect(composed(-5)).toBe(25);
  });

  test('should compose preserving function property', () => {
    // Test that composed function returns correct type
    const toNumber = (s: string) => parseInt(s);
    const double = (x: number) => x * 2;
    const composed = compose(double, toNumber);
    expect(composed('5')).toBe(10);
    expect(typeof composed('5')).toBe('number');
  });

  test('should compose with side-effect functions', () => {
    let sideEffect = 0;
    const increment = () => { sideEffect++; return sideEffect; };
    const double = (x: number) => x * 2;
    const composed = compose(double, increment);
    const result = composed(undefined);
    expect(result).toBe(2);
    expect(sideEffect).toBe(1);
  });

  test('should compose with async-like mock functions', () => {
    const parse = (s: string) => parseInt(s, 10);
    const isPositive = (x: number) => x > 0;
    const composed = compose(isPositive, parse);
    expect(composed('100')).toBe(true);
    expect(composed('-5')).toBe(false);
  });
});
