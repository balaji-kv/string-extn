/**
 * Test suite for chainable string manipulation utilities in chain.ts.
 *
 * Covers StringChain methods and chain() factory behavior.
 */
import { chain, StringChain } from '../src/chain.js';

describe('chain', () => {
	test('should create a StringChain instance with input', () => {
		const instance = chain('hello');
		expect(instance).toBeInstanceOf(StringChain);
		expect(instance.valueOf()).toBe('hello');
	});

	test('should not mutate original input string', () => {
		const input = '  test  ';
		const instance = chain(input);
		instance.trim();
		expect(input).toBe('  test  ');
	});

	test('should support implicit string coercion', () => {
		expect(String(chain('hello'))).toBe('hello');
	});
});

describe('StringChain.trim', () => {
	test('should trim whitespace from both ends', () => {
		expect(chain('  hello  ').trim().valueOf()).toBe('hello');
	});

	test('should trim tabs and newlines', () => {
		// Ensures non-space whitespace is trimmed.
		expect(chain('\t\nhello world\n\t').trim().valueOf()).toBe('hello world');
	});

	test('should handle string with only whitespace', () => {
		// Verifies full trimming when the input is only whitespace.
		expect(chain('   \t\n').trim().valueOf()).toBe('');
	});

	test('should handle empty string', () => {
		expect(chain('').trim().valueOf()).toBe('');
	});

	test('should not trim internal whitespace', () => {
		expect(chain('  hello   world  ').trim().valueOf()).toBe('hello   world');
	});

	test('should trim unicode non-breaking spaces', () => {
		// Confirms trimming behavior for non-breaking space characters.
		expect(chain('\u00A0hello\u00A0').trim().valueOf()).toBe('hello');
	});
});

describe('StringChain.toUpper', () => {
	test('should convert to upper case', () => {
		expect(chain('abc').toUpper().valueOf()).toBe('ABC');
	});

	test('should handle mixed alphanumeric input', () => {
		expect(chain('AbC123').toUpper().valueOf()).toBe('ABC123');
	});

	test('should leave non-letters unchanged', () => {
		expect(chain('123!@').toUpper().valueOf()).toBe('123!@');
	});

	test('should handle accented characters', () => {
		// Validates Unicode case conversion.
		expect(chain('éü').toUpper().valueOf()).toBe('ÉÜ');
	});

	test('should handle empty string', () => {
		expect(chain('').toUpper().valueOf()).toBe('');
	});
});

describe('StringChain.toLower', () => {
	test('should convert to lower case', () => {
		expect(chain('ABC').toLower().valueOf()).toBe('abc');
	});

	test('should handle mixed alphanumeric input', () => {
		expect(chain('AbC123').toLower().valueOf()).toBe('abc123');
	});

	test('should leave non-letters unchanged', () => {
		expect(chain('123!@').toLower().valueOf()).toBe('123!@');
	});

	test('should handle accented characters', () => {
		// Validates Unicode case conversion.
		expect(chain('ÉÜ').toLower().valueOf()).toBe('éü');
	});

	test('should handle empty string', () => {
		expect(chain('').toLower().valueOf()).toBe('');
	});
});

describe('StringChain.replace', () => {
	test('should replace first occurrence with string search', () => {
		expect(chain('foo foo').replace('foo', 'bar').valueOf()).toBe('bar foo');
	});

	test('should return same string when search is not found', () => {
		expect(chain('abc').replace('z', 'x').valueOf()).toBe('abc');
	});

	test('should handle empty search string', () => {
		// Mirrors JS replace behavior when search is an empty string.
		expect(chain('abc').replace('', 'X').valueOf()).toBe('Xabc');
	});

	test('should handle empty replacement', () => {
		expect(chain('abc').replace('b', '').valueOf()).toBe('ac');
	});

	test('should support replacement patterns like $&', () => {
		// Ensures replacement tokens are honored.
		expect(chain('a').replace('a', '$&$&').valueOf()).toBe('aa');
	});

	test('should replace first regex match by default', () => {
		// Confirms non-global regex replaces only the first match.
		expect(chain('a1b2').replace(/\d/, 'X').valueOf()).toBe('aXb2');
	});

	test('should replace all regex matches with global flag', () => {
		// Confirms global regex replaces all matches.
		expect(chain('a1b2').replace(/\d/g, 'X').valueOf()).toBe('aXbX');
	});

	test('should handle capturing groups in replacement', () => {
		// Checks capture group substitution in replacements.
		expect(chain('foo123').replace(/foo(\d+)/, 'bar$1').valueOf()).toBe('bar123');
	});

	test('should handle zero-width regex', () => {
		// Confirms zero-width matches are inserted at the expected position.
		expect(chain('abc').replace(/^/, 'X').valueOf()).toBe('Xabc');
	});

	test('should handle unicode regex matches', () => {
		// Ensures regex replacement works with emoji characters.
		expect(chain('😀a').replace(/😀/, 'X').valueOf()).toBe('Xa');
	});
});

describe('StringChain.reverse', () => {
	test('should reverse a basic string', () => {
		expect(chain('abc').reverse().valueOf()).toBe('cba');
	});

	test('should handle empty string', () => {
		expect(chain('').reverse().valueOf()).toBe('');
	});

	test('should handle single character', () => {
		expect(chain('a').reverse().valueOf()).toBe('a');
	});

	test('should reverse strings with spaces', () => {
		expect(chain(' a ').reverse().valueOf()).toBe(' a ');
	});

	test('should reverse emoji (surrogate pairs) correctly', () => {
		// Verifies reversal handles surrogate pairs as single code points.
		expect(chain('😀👍').reverse().valueOf()).toBe('👍😀');
	});

	test('should reverse combining marks by code points', () => {
		// Documents code-point reversal for combining mark sequences.
		const input = 'e\u0301';
		expect(chain(input).reverse().valueOf()).toBe('\u0301e');
	});
});

describe('StringChain.valueOf and StringChain.toString', () => {
	test('should return current value after chaining', () => {
		const result = chain('  AbC ').trim().toLower().reverse().valueOf();
		expect(result).toBe('cba');
	});

	test('toString should match valueOf', () => {
		const instance = chain('Test').toUpper();
		expect(instance.toString()).toBe(instance.valueOf());
	});

	test('should work in template literals', () => {
		const instance = chain('hello').toUpper();
		expect(`${instance}`).toBe('HELLO');
	});
});

describe('StringChain chaining behavior', () => {
	test('should allow method chaining and return this', () => {
		const instance = chain('abc');
		expect(instance.trim()).toBe(instance);
		expect(instance.toUpper()).toBe(instance);
		expect(instance.toLower()).toBe(instance);
		expect(instance.replace('a', 'b')).toBe(instance);
		expect(instance.reverse()).toBe(instance);
	});

	test('should apply operations in order', () => {
		const result = chain('  AbC  ')
			.trim()
			.replace('b', 'x')
			.toUpper()
			.reverse()
			.valueOf();
		expect(result).toBe('CXA');
	});
});
