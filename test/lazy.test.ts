/**
 * Test suite for lazy string manipulation utilities in lazy.ts.
 *
 * Covers LazyString methods and lazy() factory behavior.
 */
import { lazy, LazyString } from '../src/lazy.js';

describe('lazy', () => {
  test('should create a LazyString instance with input', () => {
    const instance = lazy('hello');
    expect(instance).toBeInstanceOf(LazyString);
    expect(instance.execute()).toBe('hello');
  });

  test('should not mutate original input string', () => {
    const input = '  test  ';
    const instance = lazy(input);
    instance.trim().toUpper();
    expect(input).toBe('  test  ');
  });

  test('should support implicit string coercion after execute', () => {
    // Confirms execution returns a plain string suitable for coercion.
    const result = `${lazy('hello').toUpper().execute()}`;
    expect(result).toBe('HELLO');
  });
});

describe('LazyString.map', () => {
  test('should defer custom transformation until execute', () => {
    // Verifies lazy evaluation: nothing runs until execute().
    const instance = lazy('hello').map(value => `${value}!`);
    expect(instance).toBeInstanceOf(LazyString);
    expect(instance.execute()).toBe('hello!');
  });

  test('should allow chaining multiple custom functions', () => {
    const result = lazy('hello')
      .map(value => value.toUpperCase())
      .map(value => `*${value}*`)
      .execute();
    expect(result).toBe('*HELLO*');
  });
});

describe('LazyString.trim', () => {
  test('should trim whitespace from both ends', () => {
    expect(lazy('  hello  ').trim().execute()).toBe('hello');
  });

  test('should trim tabs and newlines', () => {
    // Ensures non-space whitespace is trimmed.
    expect(lazy('\t\nhello world\n\t').trim().execute()).toBe('hello world');
  });

  test('should handle string with only whitespace', () => {
    // Verifies full trimming when the input is only whitespace.
    expect(lazy('   \t\n').trim().execute()).toBe('');
  });

  test('should handle empty string', () => {
    expect(lazy('').trim().execute()).toBe('');
  });

  test('should not trim internal whitespace', () => {
    expect(lazy('  hello   world  ').trim().execute()).toBe('hello   world');
  });
});

describe('LazyString.toUpper', () => {
  test('should convert to upper case', () => {
    expect(lazy('abc').toUpper().execute()).toBe('ABC');
  });

  test('should handle mixed alphanumeric input', () => {
    expect(lazy('AbC123').toUpper().execute()).toBe('ABC123');
  });

  test('should leave non-letters unchanged', () => {
    expect(lazy('123!@').toUpper().execute()).toBe('123!@');
  });

  test('should handle accented characters', () => {
    // Validates Unicode case conversion.
    expect(lazy('éü').toUpper().execute()).toBe('ÉÜ');
  });

  test('should handle empty string', () => {
    expect(lazy('').toUpper().execute()).toBe('');
  });
});

describe('LazyString.toLower', () => {
  test('should convert to lower case', () => {
    expect(lazy('ABC').toLower().execute()).toBe('abc');
  });

  test('should handle mixed alphanumeric input', () => {
    expect(lazy('AbC123').toLower().execute()).toBe('abc123');
  });

  test('should leave non-letters unchanged', () => {
    expect(lazy('123!@').toLower().execute()).toBe('123!@');
  });

  test('should handle accented characters', () => {
    // Validates Unicode case conversion.
    expect(lazy('ÉÜ').toLower().execute()).toBe('éü');
  });

  test('should handle empty string', () => {
    expect(lazy('').toLower().execute()).toBe('');
  });
});

describe('LazyString.execute', () => {
  test('should return original input when no operations', () => {
    expect(lazy('hello').execute()).toBe('hello');
  });

  test('should apply operations in order', () => {
    // Confirms queued operations run in registration order.
    const result = lazy('  AbC  ')
      .trim()
      .toLower()
      .map(value => value.replace('b', 'x'))
      .toUpper()
      .execute();
    expect(result).toBe('AXC');
  });

  test('should be repeatable without changing result', () => {
    // Ensures repeated execute() calls are idempotent.
    const instance = lazy('  hello  ').trim().toUpper();
    expect(instance.execute()).toBe('HELLO');
    expect(instance.execute()).toBe('HELLO');
  });

  test('should allow additional operations after execute', () => {
    // Verifies the pipeline remains mutable after executing once.
    const instance = lazy('hello').toUpper();
    expect(instance.execute()).toBe('HELLO');
    const result = instance.map(value => `${value}!`).execute();
    expect(result).toBe('HELLO!');
  });
});
