/**
 * Test suite for string case conversion functions.
 * 
 * This file provides comprehensive test coverage for the case module functions:
 * - toCamelCase: Converts strings to camelCase (first letter lowercase, subsequent words capitalized)
 * - toKebabCase: Converts strings to kebab-case (lowercase with hyphens)
 * - toSnakeCase: Converts strings to snake_case (lowercase with underscores)
 * - toTitleCase: Converts strings to Title Case (capitalize first letter of each word)
 * 
 * Tests cover various input formats (camelCase, kebab-case, snake_case, spaces),
 * edge cases (empty strings, single characters), and special characters.
 */
import { toCamelCase, toKebabCase, toSnakeCase, toTitleCase } from '../src/case.js';

describe('toCamelCase', () => {
  test('should convert kebab-case to camelCase', () => {
    expect(toCamelCase('hello-world')).toBe('helloWorld');
  });

  test('should convert snake_case to camelCase', () => {
    expect(toCamelCase('hello_world')).toBe('helloWorld');
  });

  test('should convert space-separated to camelCase', () => {
    expect(toCamelCase('hello world')).toBe('helloWorld');
  });

  test('should handle already camelCase string', () => {
    expect(toCamelCase('helloWorld')).toBe('helloworld');
  });

  test('should convert multiple separators', () => {
    // Validates handling of multiple delimiters: converts all separators to camelCase format
    expect(toCamelCase('hello-world_test')).toBe('helloWorldTest');
  });

  test('should convert consecutive separators', () => {
    // Edge case: multiple consecutive separators should be handled as single separator
    expect(toCamelCase('hello---world')).toBe('helloWorld');
  });

  test('should handle single character', () => {
    expect(toCamelCase('a')).toBe('a');
  });

  test('should handle empty string', () => {
    expect(toCamelCase('')).toBe('');
  });

  test('should convert string starting with separator', () => {
    // Edge case: leading separators are removed in the process
    expect(toCamelCase('-hello-world')).toBe('helloWorld');
  });

  test('should convert string ending with separator', () => {
    // Edge case: trailing separators are removed in the process
    expect(toCamelCase('hello-world-')).toBe('helloWorld');
  });

  test('should convert with mixed separators', () => {
    expect(toCamelCase('hello-world_foo bar')).toBe('helloWorldFooBar');
  });

  test('should convert uppercase to camelCase', () => {
    expect(toCamelCase('HELLO_WORLD')).toBe('helloWorld');
  });

  test('should convert single word with separator', () => {
    expect(toCamelCase('_hello_')).toBe('hello');
  });

  test('should handle numbers in conversion', () => {
    expect(toCamelCase('hello-123-world')).toBe('hello123World');
  });

  test('should handle leading numbers', () => {
    expect(toCamelCase('123-hello')).toBe('123Hello');
  });

  test('should handle multiple consecutive separators at start', () => {
    expect(toCamelCase('---hello---world---')).toBe('helloWorld');
  });

  test('should preserve case of non-leading characters after separators', () => {
    expect(toCamelCase('hello-WORLD')).toBe('helloWorld');
  });

  test('should handle tabs and newlines as separators', () => {
    expect(toCamelCase('hello\t\nworld')).toBe('helloWorld');
  });

  test('should handle string with only separators', () => {
    expect(toCamelCase('---___   ')).toBe('');
  });

  test('should handle single separator', () => {
    expect(toCamelCase('-')).toBe('');
  });

  test('should handle two-letter words', () => {
    expect(toCamelCase('ab-cd-ef')).toBe('abCdEf');
  });

  test('should handle numbers with letters', () => {
    expect(toCamelCase('hello123-world456')).toBe('hello123World456');
  });
});

describe('toKebabCase', () => {
  test('should convert camelCase to kebab-case', () => {
    expect(toKebabCase('helloWorld')).toBe('hello-world');
  });

  test('should convert snake_case to kebab-case', () => {
    expect(toKebabCase('hello_world')).toBe('hello-world');
  });

  test('should convert space-separated to kebab-case', () => {
    expect(toKebabCase('hello world')).toBe('hello-world');
  });

  test('should convert multiple uppercase letters', () => {
    // Validates handling of consecutive capitals: inserts hyphen before each capital
    expect(toKebabCase('helloWORLD')).toBe('hello-w-o-r-l-d');
  });

  test('should convert to lowercase', () => {
    expect(toKebabCase('HELLO')).toBe('hello');
  });

  test('should handle single character', () => {
    expect(toKebabCase('a')).toBe('a');
  });

  test('should handle empty string', () => {
    expect(toKebabCase('')).toBe('');
  });

  test('should convert consecutive spaces', () => {
    // Edge case: multiple spaces treated as multiple delimiters, normalized to single hyphen
    expect(toKebabCase('hello   world')).toBe('hello-world');
  });

  test('should convert mixed separators', () => {
    expect(toKebabCase('helloWorld_test foo')).toBe('hello-world-test-foo');
  });

  test('should handle numbers', () => {
    expect(toKebabCase('hello123World')).toBe('hello123-world');
  });

  test('should convert already kebab-case string', () => {
    expect(toKebabCase('hello-world')).toBe('hello-world');
  });

  test('should handle string starting with uppercase', () => {
    expect(toKebabCase('HelloWorld')).toBe('hello-world');
  });

  test('should handle all uppercase', () => {
    expect(toKebabCase('HELLOWORLD')).toBe('helloworld');
  });

  test('should handle string ending with uppercase', () => {
    expect(toKebabCase('helloWorldX')).toBe('hello-world-x');
  });

  test('should handle numbers at word boundaries', () => {
    expect(toKebabCase('hello1World2Test')).toBe('hello1-world2-test');
  });

  test('should handle special characters between words', () => {
    // Special characters are preserved; only letters/numbers/separators control word boundaries
    expect(toKebabCase('hello@world#test')).toBe('hello@world#test');
  });

  test('should handle tabs and newlines', () => {
    expect(toKebabCase('hello\tworld\ntest')).toBe('hello-world-test');
  });

  test('should handle string with only uppercase', () => {
    expect(toKebabCase('ABC')).toBe('abc');
  });

  test('should handle string with uppercase and separators', () => {
    expect(toKebabCase('Hello_World-Test')).toBe('hello-world-test');
  });

  test('should normalize multiple separators to single hyphen', () => {
    expect(toKebabCase('hello---world___test')).toBe('hello-world-test');
  });

  test('should handle mixed case with numbers', () => {
    expect(toKebabCase('HTTPSConnection2Fast')).toBe('h-t-t-p-s-connection2-fast');
  });
});

describe('toSnakeCase', () => {
  test('should convert camelCase to snake_case', () => {
    expect(toSnakeCase('helloWorld')).toBe('hello_world');
  });

  test('should convert kebab-case to snake_case', () => {
    expect(toSnakeCase('hello-world')).toBe('hello_world');
  });

  test('should convert space-separated to snake_case', () => {
    expect(toSnakeCase('hello world')).toBe('hello_world');
  });

  test('should convert multiple uppercase letters', () => {
    // Validates handling of consecutive capitals: inserts underscore before each capital
    expect(toSnakeCase('helloWORLD')).toBe('hello_w_o_r_l_d');
  });

  test('should convert to lowercase', () => {
    expect(toSnakeCase('HELLO')).toBe('hello');
  });

  test('should handle single character', () => {
    expect(toSnakeCase('a')).toBe('a');
  });

  test('should handle empty string', () => {
    expect(toSnakeCase('')).toBe('');
  });

  test('should convert consecutive spaces', () => {
    // Edge case: multiple spaces treated as delimiters, normalized to single underscore
    expect(toSnakeCase('hello   world')).toBe('hello_world');
  });

  test('should convert mixed separators', () => {
    expect(toSnakeCase('helloWorld-test foo')).toBe('hello_world_test_foo');
  });

  test('should handle numbers', () => {
    expect(toSnakeCase('hello123World')).toBe('hello123_world');
  });

  test('should convert already snake_case string', () => {
    expect(toSnakeCase('hello_world')).toBe('hello_world');
  });

  test('should handle string starting with uppercase', () => {
    expect(toSnakeCase('HelloWorld')).toBe('hello_world');
  });

  test('should handle all uppercase', () => {
    expect(toSnakeCase('HELLOWORLD')).toBe('helloworld');
  });

  test('should handle string ending with uppercase', () => {
    expect(toSnakeCase('helloWorldX')).toBe('hello_world_x');
  });

  test('should handle numbers at word boundaries', () => {
    expect(toSnakeCase('hello1World2Test')).toBe('hello1_world2_test');
  });

  test('should handle special characters between words', () => {
    // Special characters are preserved; only letters/numbers/separators control word boundaries
    expect(toSnakeCase('hello@world#test')).toBe('hello@world#test');
  });

  test('should handle tabs and newlines', () => {
    expect(toSnakeCase('hello\tworld\ntest')).toBe('hello_world_test');
  });

  test('should handle string with only uppercase', () => {
    expect(toSnakeCase('ABC')).toBe('abc');
  });

  test('should handle string with uppercase and separators', () => {
    expect(toSnakeCase('Hello-World_Test')).toBe('hello_world_test');
  });

  test('should normalize multiple separators to single underscore', () => {
    expect(toSnakeCase('hello---world___test')).toBe('hello_world_test');
  });

  test('should handle mixed case with numbers', () => {
    expect(toSnakeCase('HTTPSConnection2Fast')).toBe('h_t_t_p_s_connection2_fast');
  });
});

describe('toTitleCase', () => {
  test('should convert lowercase to Title Case', () => {
    expect(toTitleCase('hello world')).toBe('Hello World');
  });

  test('should capitalize first letter of each word', () => {
    expect(toTitleCase('the quick brown fox')).toBe('The Quick Brown Fox');
  });

  test('should handle already Title Case', () => {
    expect(toTitleCase('Hello World')).toBe('Hello World');
  });

  test('should convert camelCase to Title Case', () => {
    // Validates word boundary detection: only first character before uppercase letters is capitalized
    expect(toTitleCase('helloWorld')).toBe('HelloWorld');
  });

  test('should handle single character', () => {
    expect(toTitleCase('a')).toBe('A');
  });

  test('should handle empty string', () => {
    expect(toTitleCase('')).toBe('');
  });

  test('should capitalize after hyphens', () => {
    expect(toTitleCase('hello-world')).toBe('Hello-World');
  });

  test('should capitalize after underscores', () => {
    expect(toTitleCase('hello_world')).toBe('Hello_World');
  });

  test('should handle numbers', () => {
    expect(toTitleCase('123 hello')).toBe('123 Hello');
  });

  test('should handle special characters', () => {
    expect(toTitleCase('hello@world')).toBe('Hello@World');
  });

  test('should handle multiple spaces', () => {
    expect(toTitleCase('hello   world')).toBe('Hello   World');
  });

  test('should convert all uppercase', () => {
    expect(toTitleCase('HELLO WORLD')).toBe('Hello World');
  });

  test('should handle single word', () => {
    expect(toTitleCase('hello')).toBe('Hello');
  });

  test('should handle numbers only', () => {
    expect(toTitleCase('123')).toBe('123');
  });

  test('should capitalize after multiple separators', () => {
    expect(toTitleCase('hello---world')).toBe('Hello---World');
  });

  test('should preserve mixed separators', () => {
    expect(toTitleCase('hello-world_test foo')).toBe('Hello-World_Test Foo');
  });

  test('should handle single letter words', () => {
    expect(toTitleCase('a b c d')).toBe('A B C D');
  });

  test('should handle tabs and newlines', () => {
    expect(toTitleCase('hello\tworld\ntest')).toBe('Hello\tWorld\nTest');
  });

  test('should not capitalize after numbers', () => {
    expect(toTitleCase('123hello 456world')).toBe('123hello 456world');
  });

  test('should handle consecutive capitals', () => {
    // Consecutive capitals are preserved as uppercase until lowercasing
    expect(toTitleCase('HTTPSConnection')).toBe('HTTPSConnection');
  });

  test('should handle numbers in middle of word', () => {
    expect(toTitleCase('hello123world')).toBe('Hello123world');
  });

  test('should preserve consecutive spaces', () => {
    expect(toTitleCase('hello    world')).toBe('Hello    World');
  });

  test('should handle mixed case input', () => {
    // Mixed case is preserved; separators determine word boundaries
    expect(toTitleCase('hElLo WoRLd')).toBe('HElLo WoRLd');
  });

  test('should handle string starting with separator', () => {
    expect(toTitleCase('-hello-world')).toBe('-Hello-World');
  });

  test('should handle string ending with separator', () => {
    expect(toTitleCase('hello-world-')).toBe('Hello-World-');
  });

  test('should capitalize after special character followed by letter', () => {
    expect(toTitleCase('hello.world')).toBe('Hello.World');
  });

  test('should handle very long strings', () => {
    expect(toTitleCase('the quick brown fox jumps over the lazy dog')).toBe('The Quick Brown Fox Jumps Over The Lazy Dog');
  });
});
