/**
 * Applies a transformation function to each character in a string.
 * 
 * @param str - The string to map over.
 * @param fn - A function that takes a character and returns a transformed character.
 * @returns A new string with the transformation applied to each character.
 * 
 * @example
 * map('hello', c => c.toUpperCase()) // => 'HELLO'
 * map('abc', c => c + c) // => 'aabbcc'
 */
export function map(str: string, fn: (c: string) => string): string {
  return str.split('').map(fn).join('');
}

/**
 * Filters characters in a string based on a predicate function.
 * 
 * @param str - The string to filter.
 * @param fn - A predicate function that returns true for characters to keep, false to remove.
 * @returns A new string containing only the characters that satisfy the predicate.
 * 
 * @example
 * filter('hello', c => 'aeiou'.includes(c)) // => 'eo'
 * filter('a1b2c3', c => /\d/.test(c)) // => '123'
 */
export function filter(str: string, fn: (c: string) => boolean): string {
  return str.split('').filter(fn).join('');
}

/**
 * Reduces a string to a single value by applying an accumulator function to each character.
 * 
 * @typeParam T - The type of the accumulated value.
 * @param str - The string to reduce.
 * @param fn - A reducer function that takes the accumulated value and a character, and returns the new accumulated value.
 * @param initial - The initial value for the accumulator.
 * @returns The final accumulated value after processing all characters.
 * 
 * @example
 * reduce('hello', (acc, c) => acc + 1, 0) // => 5 (character count)
 * reduce('abc', (acc, c) => acc + c, '') // => 'abc' (concatenation)
 * reduce('aabbcc', (acc, c) => ({ ...acc, [c]: (acc[c] || 0) + 1 }), {}) // => { a: 2, b: 2, c: 2 }
 */
export function reduce<T>(
  str: string,
  fn: (acc: T, c: string) => T,
  initial: T
): T {
  return str.split('').reduce(fn, initial);
}

/**
 * Composes multiple functions into a single function that applies them right-to-left.
 * 
 * @param fns - Variable number of functions to compose.
 * @returns A new function that applies the composed functions to its argument.
 *          Functions are applied right-to-left (the rightmost function is applied first).
 * 
 * @example
 * const upper = (s: string) => s.toUpperCase();
 * const exclaim = (s: string) => s + '!';
 * const composed = compose(exclaim, upper);
 * composed('hello') // => 'HELLO!' (upper applied first, then exclaim)
 * 
 * @example
 * const add5 = (x: number) => x + 5;
 * const mult2 = (x: number) => x * 2;
 * const composed = compose(mult2, add5);
 * composed(3) // => 16 (add5(3) = 8, then mult2(8) = 16)
 */
export function compose(...fns: Function[]) {
  return (value: any) => fns.reduceRight((acc, fn) => fn(acc), value);
}
