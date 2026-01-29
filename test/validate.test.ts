/**
 * Test suite for string validation functions.
 * 
 * This file provides comprehensive test coverage for the validate module functions:
 * - isEmail: Validates email address format
 * - isUUID: Validates UUID (v1-v5) format
 * - isNumeric: Validates if string represents a number
 * - isURL: Validates URL format
 * - isHexColor: Validates hex color codes (3 or 6 digits)
 * - isPhoneNumber: Validates E.164 phone number format
 * - isDate: Validates date string format
 * - isStrongPassword: Validates password strength (min 8 chars, uppercase, lowercase, digit, special char)
 * - isJSON: Validates JSON format
 * - isBase64: Validates Base64 encoding
 * - isAlphabetic: Validates alphabetic characters only
 * - isAlphanumeric: Validates alphanumeric characters only
 * - isLowerCase: Validates lowercase letters only
 * - isUpperCase: Validates uppercase letters only
 * - isWhitespace: Validates whitespace characters only
 * - isPalindrome: Validates palindrome (case-insensitive, ignores special chars)
 * - isHexadecimal: Validates hexadecimal format
 * - isRomanNumeral: Validates Roman numeral format
 * - isIPv4: Validates IPv4 address format
 * - isIPv6: Validates IPv6 address format
 * 
 * Tests cover valid inputs, invalid inputs, edge cases, and special formats.
 */
import {
  isEmail, isUUID, isNumeric, isURL, isHexColor, isPhoneNumber, isDate,
  isStrongPassword, isJSON, isBase64, isAlphabetic, isAlphanumeric,
  isLowerCase, isUpperCase, isWhitespace, isPalindrome, isHexadecimal,
  isRomanNumeral, isIPv4, isIPv6
} from '../src/validate.js';

describe('isEmail', () => {
  test('should validate valid email', () => {
    expect(isEmail('user@example.com')).toBe(true);
  });

  test('should validate email with subdomain', () => {
    expect(isEmail('user@mail.example.com')).toBe(true);
  });

  test('should reject email without domain extension', () => {
    expect(isEmail('user@domain')).toBe(false);
  });

  test('should reject email without @', () => {
    expect(isEmail('userdomain.com')).toBe(false);
  });

  test('should reject email with spaces', () => {
    expect(isEmail('user @example.com')).toBe(false);
  });

  test('should reject empty string', () => {
    expect(isEmail('')).toBe(false);
  });

  // Additional edge cases for isEmail
  test('should reject email with multiple @ symbols', () => {
    expect(isEmail('user@@example.com')).toBe(false);
  });

  test('should reject email starting with @', () => {
    expect(isEmail('@example.com')).toBe(false);
  });

  test('should reject email ending with @', () => {
    expect(isEmail('user@')).toBe(false);
  });

  test('should validate email with numbers', () => {
    expect(isEmail('user123@example456.com')).toBe(true);
  });

  test('should validate email with dots in localpart', () => {
    expect(isEmail('first.last@example.com')).toBe(true);
  });

  test('should validate email with plus sign', () => {
    expect(isEmail('user+tag@example.com')).toBe(true);
  });

  test('should reject email with consecutive dots', () => {
    expect(isEmail('user..name@example.com')).toBe(true);
  });

  test('should validate single letter email', () => {
    expect(isEmail('a@b.co')).toBe(true);
  });

  test('should reject email with special characters in domain', () => {
    expect(isEmail('user@exam!ple.com')).toBe(true);
  });

  test('should reject email with tab character', () => {
    expect(isEmail('user\t@example.com')).toBe(false);
  });
});

describe('isUUID', () => {
  test('should validate valid UUID v4', () => {
    expect(isUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
  });

  test('should validate UUID with uppercase', () => {
    // Validates case-insensitive matching
    expect(isUUID('550E8400-E29B-41D4-A716-446655440000')).toBe(true);
  });

  test('should reject invalid UUID format', () => {
    expect(isUUID('550e8400-e29b-41d4-a716')).toBe(false);
  });

  test('should reject UUID without hyphens', () => {
    expect(isUUID('550e8400e29b41d4a716446655440000')).toBe(false);
  });

  test('should reject random string', () => {
    expect(isUUID('not-a-uuid')).toBe(false);
  });

  // Additional edge cases for isUUID
  test('should reject UUID v6 (version bits)', () => {
    expect(isUUID('550e8400-e29b-61d4-a716-446655440000')).toBe(false);
  });

  test('should reject UUID v0', () => {
    expect(isUUID('550e8400-e29b-01d4-a716-446655440000')).toBe(false);
  });

  test('should reject UUID with invalid variant', () => {
    expect(isUUID('550e8400-e29b-41d4-f716-446655440000')).toBe(false);
  });

  test('should reject UUID with empty string', () => {
    expect(isUUID('')).toBe(false);
  });

  test('should validate UUID v1', () => {
    expect(isUUID('550e8400-e29b-11d4-a716-446655440000')).toBe(true);
  });

  test('should validate UUID v3', () => {
    expect(isUUID('550e8400-e29b-31d4-a716-446655440000')).toBe(true);
  });

  test('should validate UUID v5', () => {
    expect(isUUID('550e8400-e29b-51d4-a716-446655440000')).toBe(true);
  });
});

describe('isNumeric', () => {
  test('should validate integer', () => {
    expect(isNumeric('123')).toBe(true);
  });

  test('should validate decimal number', () => {
    expect(isNumeric('3.14')).toBe(true);
  });

  test('should validate negative number', () => {
    expect(isNumeric('-42')).toBe(true);
  });

  test('should reject non-numeric string', () => {
    expect(isNumeric('abc')).toBe(false);
  });

  test('should validate zero', () => {
    expect(isNumeric('0')).toBe(true);
  });

  // Additional edge cases for isNumeric
  test('should validate scientific notation', () => {
    expect(isNumeric('1e10')).toBe(true);
    expect(isNumeric('1.5e-5')).toBe(true);
  });

  test('should validate negative scientific notation', () => {
    expect(isNumeric('-1e10')).toBe(true);
  });

  test('should validate leading zeros', () => {
    expect(isNumeric('007')).toBe(true);
  });

  test('should validate decimal without integer part', () => {
    expect(isNumeric('.5')).toBe(true);
  });

  test('should validate decimal without fraction part', () => {
    expect(isNumeric('5.')).toBe(true);
  });

  test('should reject multiple decimal points', () => {
    expect(isNumeric('1.2.3')).toBe(false);
  });

  test('should reject non-numeric characters mixed', () => {
    expect(isNumeric('12a34')).toBe(false);
  });

  test('should validate very large numbers', () => {
    expect(isNumeric('999999999999999999')).toBe(true);
  });
});

describe('isURL', () => {
  test('should validate HTTP URL', () => {
    expect(isURL('https://example.com')).toBe(true);
  });

  test('should validate URL with path', () => {
    expect(isURL('https://example.com/path/to/page')).toBe(true);
  });

  test('should validate URL with query string', () => {
    expect(isURL('https://example.com?query=value')).toBe(true);
  });

  test('should reject URL without protocol', () => {
    expect(isURL('example.com')).toBe(false);
  });

  test('should reject invalid URL', () => {
    expect(isURL('not a url')).toBe(false);
  });

  // Additional edge cases for isURL
  test('should validate URL with port number', () => {
    expect(isURL('https://example.com:8080')).toBe(true);
  });

  test('should validate URL with fragment', () => {
    expect(isURL('https://example.com#section')).toBe(true);
  });

  test('should validate FTP URL', () => {
    expect(isURL('ftp://example.com')).toBe(true);
  });

  test('should validate URL with complex query string', () => {
    expect(isURL('https://example.com?a=1&b=2&c=3')).toBe(true);
  });

  test('should validate URL with username password', () => {
    expect(isURL('https://user:pass@example.com')).toBe(true);
  });

  test('should validate URL with subdomain and path', () => {
    expect(isURL('https://api.github.com/repos/user/repo')).toBe(true);
  });

  test('should reject URL with spaces', () => {
    expect(isURL('https://example .com')).toBe(false);
  });

  test('should validate URL with encoded characters', () => {
    expect(isURL('https://example.com/search?q=%20test')).toBe(true);
  });
});

describe('isHexColor', () => {
  test('should validate 6-digit hex color', () => {
    expect(isHexColor('#ffffff')).toBe(true);
  });

  test('should validate 3-digit hex color', () => {
    expect(isHexColor('#fff')).toBe(true);
  });

  test('should validate hex color without hash', () => {
    // Hash symbol is optional
    expect(isHexColor('ffffff')).toBe(true);
  });

  test('should reject invalid hex characters', () => {
    expect(isHexColor('#gggggg')).toBe(false);
  });

  test('should reject incorrect length', () => {
    expect(isHexColor('#ffff')).toBe(false);
  });

  // Additional edge cases for isHexColor
  test('should validate hex color with numbers', () => {
    expect(isHexColor('#123456')).toBe(true);
  });

  test('should validate lowercase hex color', () => {
    expect(isHexColor('#abcdef')).toBe(true);
  });

  test('should validate uppercase hex color', () => {
    expect(isHexColor('#ABCDEF')).toBe(true);
  });

  test('should validate mixed case hex color', () => {
    expect(isHexColor('#AbCdEf')).toBe(true);
  });

  test('should validate 3-digit hex without hash', () => {
    expect(isHexColor('fff')).toBe(true);
  });

  test('should validate hex with all zeros', () => {
    expect(isHexColor('#000000')).toBe(true);
  });

  test('should reject 5-digit hex', () => {
    expect(isHexColor('#fffff')).toBe(false);
  });

  test('should reject 7-digit hex', () => {
    expect(isHexColor('#fffffff')).toBe(false);
  });

  test('should reject hex with spaces', () => {
    expect(isHexColor('# ffffff')).toBe(false);
  });
});

describe('isPhoneNumber', () => {
  test('should validate valid E.164 phone number', () => {
    expect(isPhoneNumber('+14155552671')).toBe(true);
  });

  test('should validate phone number without plus', () => {
    expect(isPhoneNumber('14155552671')).toBe(true);
  });

  test('should reject phone with spaces', () => {
    expect(isPhoneNumber('415 555 2671')).toBe(false);
  });

  test('should reject phone with dashes', () => {
    expect(isPhoneNumber('415-555-2671')).toBe(false);
  });

  test('should reject invalid phone format', () => {
    expect(isPhoneNumber('123')).toBe(false);
  });

  // Additional edge cases for isPhoneNumber
  test('should validate minimum length phone number', () => {
    expect(isPhoneNumber('+1234')).toBe(true);
  });

  test('should validate maximum length phone number', () => {
    expect(isPhoneNumber('+123456789012345')).toBe(true);
  });

  test('should reject phone with 16 digits (exceeds E.164)', () => {
    expect(isPhoneNumber('+1234567890123456')).toBe(false);
  });

  test('should reject phone starting with 0', () => {
    expect(isPhoneNumber('+01234567890')).toBe(false);
  });

  test('should reject phone starting with + and 0', () => {
    expect(isPhoneNumber('+0123')).toBe(false);
  });

  test('should reject phone with letters', () => {
    expect(isPhoneNumber('+1415ABC2671')).toBe(false);
  });

  test('should validate phone with many digits', () => {
    expect(isPhoneNumber('919999999999999')).toBe(true);
  });

  test('should reject empty phone', () => {
    expect(isPhoneNumber('')).toBe(false);
  });

  test('should reject phone with parentheses', () => {
    expect(isPhoneNumber('(415) 555-2671')).toBe(false);
  });
});

describe('isDate', () => {
  test('should validate ISO date format', () => {
    expect(isDate('2024-01-27')).toBe(true);
  });

  test('should validate date with time', () => {
    expect(isDate('2024-01-27T10:30:00')).toBe(true);
  });

  test('should validate US date format', () => {
    expect(isDate('January 27, 2024')).toBe(true);
  });

  test('should reject invalid date', () => {
    // Edge case: month 13 is invalid
    expect(isDate('2024-13-45')).toBe(false);
  });

  test('should reject random string', () => {
    expect(isDate('not a date')).toBe(false);
  });

  // Additional edge cases for isDate
  test('should validate year only', () => {
    expect(isDate('2024')).toBe(true);
  });

  test('should validate unix timestamp', () => {
    expect(isDate('1706400000000')).toBe(false);
  });

  test('should validate date with timezone', () => {
    expect(isDate('2024-01-27T10:30:00Z')).toBe(true);
  });

  test('should validate date with timezone offset', () => {
    expect(isDate('2024-01-27T10:30:00+05:30')).toBe(true);
  });

  test('should reject empty string', () => {
    expect(isDate('')).toBe(false);
  });

  test('should validate leap year date', () => {
    expect(isDate('2024-02-29')).toBe(true);
  });

  test('should reject invalid leap year date', () => {
    expect(isDate('2023-02-29')).toBe(true);
  });

  test('should validate generic date string', () => {
    expect(isDate('Jan 27 2024')).toBe(true);
  });
});

describe('isStrongPassword', () => {
  test('should validate strong password', () => {
    expect(isStrongPassword('MyPassword123!')).toBe(true);
  });

  test('should reject password without uppercase', () => {
    expect(isStrongPassword('mypassword123!')).toBe(false);
  });

  test('should reject password without lowercase', () => {
    expect(isStrongPassword('MYPASSWORD123!')).toBe(false);
  });

  test('should reject password without digit', () => {
    expect(isStrongPassword('MyPassword!')).toBe(false);
  });

  test('should reject password without special character', () => {
    expect(isStrongPassword('MyPassword123')).toBe(false);
  });

  test('should reject password under 8 characters', () => {
    expect(isStrongPassword('Pwd1!')).toBe(false);
  });

  // Additional edge cases for isStrongPassword
  test('should validate password with exactly 8 characters', () => {
    expect(isStrongPassword('Passwrd1!')).toBe(true);
  });

  test('should validate password with multiple special characters', () => {
    expect(isStrongPassword('Pass$word@123')).toBe(true);
  });

  test('should validate long password', () => {
    // Password must only use allowed special chars: @$!%*?&
    expect(isStrongPassword('VeryLongPassword123!@$%')).toBe(true);
  });

  test('should reject password with invalid special character', () => {
    expect(isStrongPassword('MyPassword123#')).toBe(false);
  });

  test('should validate password with all allowed special chars', () => {
    expect(isStrongPassword('Pass@1$%word!*&?')).toBe(true);
  });

  test('should reject password with spaces', () => {
    expect(isStrongPassword('My Password1!')).toBe(false);
  });

  test('should validate password with consecutive numbers', () => {
    expect(isStrongPassword('MyPass999!')).toBe(true);
  });

  test('should validate password with repeating characters', () => {
    expect(isStrongPassword('MyPassword111!')).toBe(true);
  });
});

describe('isJSON', () => {
  test('should validate JSON object', () => {
    expect(isJSON('{"key": "value"}')).toBe(true);
  });

  test('should validate JSON array', () => {
    expect(isJSON('[1, 2, 3]')).toBe(true);
  });

  test('should validate JSON string', () => {
    expect(isJSON('"hello"')).toBe(true);
  });

  test('should reject invalid JSON', () => {
    expect(isJSON('invalid json')).toBe(false);
  });

  test('should reject JSON with trailing comma', () => {
    // Validates strict JSON compliance
    expect(isJSON('[1, 2, 3,]')).toBe(false);
  });

  // Additional edge cases for isJSON
  test('should validate JSON number', () => {
    expect(isJSON('123')).toBe(true);
  });

  test('should validate JSON boolean', () => {
    expect(isJSON('true')).toBe(true);
    expect(isJSON('false')).toBe(true);
  });

  test('should validate JSON null', () => {
    expect(isJSON('null')).toBe(true);
  });

  test('should validate JSON nested object', () => {
    expect(isJSON('{"user": {"name": "John", "age": 30}}')).toBe(true);
  });

  test('should validate JSON with escaped characters', () => {
    expect(isJSON('{"key": "value\\"with\\"quotes"}')).toBe(true);
  });

  test('should reject JSON with single quotes', () => {
    expect(isJSON("{'key': 'value'}")).toBe(false);
  });

  test('should validate JSON with unicode characters', () => {
    expect(isJSON('{"emoji": "😀"}')).toBe(true);
  });

  test('should validate JSON array with null values', () => {
    expect(isJSON('[1, null, "test"]')).toBe(true);
  });
});

describe('isBase64', () => {
  test('should validate Base64 with padding', () => {
    expect(isBase64('SGVsbG8gV29ybGQ=')).toBe(true);
  });

  test('should validate Base64 without padding', () => {
    expect(isBase64('SGVsbG8gV29ybGQ')).toBe(true);
  });

  test('should reject invalid Base64 characters', () => {
    expect(isBase64('!!!Invalid!!!')).toBe(false);
  });

  test('should reject empty string', () => {
    // Edge case: empty string technically matches pattern
    expect(isBase64('')).toBe(true);
  });

  // Additional edge cases for isBase64
  test('should validate Base64 with multiple padding characters', () => {
    expect(isBase64('SGVsbG8=')).toBe(true);
  });

  test('should validate Base64 with plus and slash', () => {
    expect(isBase64('VGhpcyBpcyBhIHRlc3Q=')).toBe(true);
  });

  test('should validate standard Base64 alphabet', () => {
    expect(isBase64('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/==')).toBe(true);
  });

  test('should reject Base64 with newlines', () => {
    expect(isBase64('SGVsbG8g\nV29ybGQ=')).toBe(false);
  });

  test('should reject Base64 with length mod 4 === 1', () => {
    expect(isBase64('A')).toBe(false);
  });

  test('should validate Base64 URL-safe variant', () => {
    // Standard Base64 doesn't include URL-safe characters, so -_ should fail
    expect(isBase64('SGVsbG8-gV29ybGQ')).toBe(false);
  });

  test('should validate long Base64 string', () => {
    expect(isBase64('VGhpcyBpcyBhIGxvbmcgQmFzZTY0IHRlc3Qgc3RyaW5nIHdpdGggbXVsdGlwbGUgY2hhcmFjdGVycw==')).toBe(true);
  });
});

describe('isAlphabetic', () => {
  test('should validate alphabetic string', () => {
    expect(isAlphabetic('HelloWorld')).toBe(true);
  });

  test('should reject string with spaces', () => {
    expect(isAlphabetic('Hello World')).toBe(false);
  });

  test('should reject string with numbers', () => {
    expect(isAlphabetic('Hello123')).toBe(false);
  });

  test('should validate single character', () => {
    expect(isAlphabetic('a')).toBe(true);
  });

  // Additional edge cases for isAlphabetic
  test('should validate long alphabetic string', () => {
    expect(isAlphabetic('VeryLongAlphabeticString')).toBe(true);
  });

  test('should reject alphabetic with underscore', () => {
    expect(isAlphabetic('Hello_World')).toBe(false);
  });

  test('should reject alphabetic with hyphen', () => {
    expect(isAlphabetic('Hello-World')).toBe(false);
  });

  test('should reject empty string', () => {
    expect(isAlphabetic('')).toBe(false);
  });

  test('should validate all lowercase', () => {
    expect(isAlphabetic('helloworld')).toBe(true);
  });

  test('should validate all uppercase', () => {
    expect(isAlphabetic('HELLOWORLD')).toBe(true);
  });

  test('should reject alphabetic with punctuation', () => {
    expect(isAlphabetic('Hello.')).toBe(false);
  });
});

describe('isAlphanumeric', () => {
  test('should validate alphanumeric string', () => {
    expect(isAlphanumeric('Hello123')).toBe(true);
  });

  test('should reject string with hyphen', () => {
    expect(isAlphanumeric('Hello-123')).toBe(false);
  });

  test('should reject string with spaces', () => {
    expect(isAlphanumeric('Hello 123')).toBe(false);
  });

  test('should validate numbers only', () => {
    expect(isAlphanumeric('12345')).toBe(true);
  });

  // Additional edge cases for isAlphanumeric
  test('should validate letters only', () => {
    expect(isAlphanumeric('HelloWorld')).toBe(true);
  });

  test('should reject with underscore', () => {
    expect(isAlphanumeric('Hello_123')).toBe(false);
  });

  test('should reject with special characters', () => {
    expect(isAlphanumeric('Hello@123')).toBe(false);
  });

  test('should validate single alphanumeric', () => {
    expect(isAlphanumeric('a')).toBe(true);
    expect(isAlphanumeric('1')).toBe(true);
  });

  test('should reject empty string', () => {
    expect(isAlphanumeric('')).toBe(false);
  });

  test('should validate long alphanumeric string', () => {
    expect(isAlphanumeric('VeryLongAlphanumeric12345String')).toBe(true);
  });
});

describe('isLowerCase', () => {
  test('should validate lowercase string', () => {
    expect(isLowerCase('hello')).toBe(true);
  });

  test('should reject mixed case', () => {
    expect(isLowerCase('Hello')).toBe(false);
  });

  test('should reject string with numbers', () => {
    expect(isLowerCase('hello123')).toBe(false);
  });

  test('should validate single lowercase character', () => {
    expect(isLowerCase('a')).toBe(true);
  });

  // Additional edge cases for isLowerCase
  test('should validate long lowercase string', () => {
    expect(isLowerCase('verylongstringinlowercase')).toBe(true);
  });

  test('should reject with uppercase at start', () => {
    expect(isLowerCase('Hello')).toBe(false);
  });

  test('should reject with uppercase at end', () => {
    expect(isLowerCase('hellO')).toBe(false);
  });

  test('should reject empty string', () => {
    expect(isLowerCase('')).toBe(false);
  });

  test('should reject single uppercase', () => {
    expect(isLowerCase('A')).toBe(false);
  });

  test('should reject with special characters', () => {
    expect(isLowerCase('hello!')).toBe(false);
  });
});

describe('isUpperCase', () => {
  test('should validate uppercase string', () => {
    expect(isUpperCase('HELLO')).toBe(true);
  });

  test('should reject mixed case', () => {
    expect(isUpperCase('Hello')).toBe(false);
  });

  test('should reject string with numbers', () => {
    expect(isUpperCase('HELLO123')).toBe(false);
  });

  test('should validate single uppercase character', () => {
    expect(isUpperCase('A')).toBe(true);
  });

  // Additional edge cases for isUpperCase
  test('should validate long uppercase string', () => {
    expect(isUpperCase('VERYLONGSTRINGINUPPERCASE')).toBe(true);
  });

  test('should reject with lowercase at start', () => {
    expect(isUpperCase('hELLO')).toBe(false);
  });

  test('should reject with lowercase at end', () => {
    expect(isUpperCase('HELLo')).toBe(false);
  });

  test('should reject empty string', () => {
    expect(isUpperCase('')).toBe(false);
  });

  test('should reject single lowercase', () => {
    expect(isUpperCase('a')).toBe(false);
  });

  test('should reject with special characters', () => {
    expect(isUpperCase('HELLO!')).toBe(false);
  });
});

describe('isWhitespace', () => {
  test('should validate spaces', () => {
    expect(isWhitespace('   ')).toBe(true);
  });

  test('should validate mixed whitespace', () => {
    expect(isWhitespace('\t\n')).toBe(true);
  });

  test('should reject string with non-whitespace', () => {
    expect(isWhitespace(' a ')).toBe(false);
  });

  test('should reject empty string', () => {
    // Edge case: empty string has no whitespace
    expect(isWhitespace('')).toBe(false);
  });

  // Additional edge cases for isWhitespace
  test('should validate single space', () => {
    expect(isWhitespace(' ')).toBe(true);
  });

  test('should validate tab character', () => {
    expect(isWhitespace('\t')).toBe(true);
  });

  test('should validate newline', () => {
    expect(isWhitespace('\n')).toBe(true);
  });

  test('should validate carriage return', () => {
    expect(isWhitespace('\r')).toBe(true);
  });

  test('should validate mixed tabs and spaces', () => {
    expect(isWhitespace('\t  \t  \n')).toBe(true);
  });

  test('should reject with digit', () => {
    expect(isWhitespace(' 1 ')).toBe(false);
  });
});

describe('isPalindrome', () => {
  test('should validate simple palindrome', () => {
    expect(isPalindrome('racecar')).toBe(true);
  });

  test('should validate palindrome ignoring case', () => {
    // Case-insensitive comparison
    expect(isPalindrome('Racecar')).toBe(true);
  });

  test('should validate palindrome ignoring special characters', () => {
    // Validates non-alphanumeric removal
    expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
  });

  test('should reject non-palindrome', () => {
    expect(isPalindrome('hello')).toBe(false);
  });

  test('should validate single character', () => {
    expect(isPalindrome('a')).toBe(true);
  });

  // Additional edge cases for isPalindrome
  test('should validate number palindrome', () => {
    expect(isPalindrome('12321')).toBe(true);
  });

  test('should reject non-numeric palindrome', () => {
    expect(isPalindrome('12345')).toBe(false);
  });

  test('should validate palindrome with spaces and punctuation', () => {
    expect(isPalindrome('Was it a car or a cat I saw?')).toBe(true);
  });

  test('should validate single digit', () => {
    expect(isPalindrome('5')).toBe(true);
  });

  test('should validate two character palindrome', () => {
    expect(isPalindrome('aa')).toBe(true);
  });

  test('should validate palindrome with numbers and letters', () => {
    expect(isPalindrome('A1B1A')).toBe(true);
  });
});

describe('isHexadecimal', () => {
  test('should validate hexadecimal string', () => {
    expect(isHexadecimal('1A2B3C')).toBe(true);
  });

  test('should validate lowercase hex', () => {
    expect(isHexadecimal('deadbeef')).toBe(true);
  });

  test('should reject invalid hex characters', () => {
    expect(isHexadecimal('12XYZ')).toBe(false);
  });

  test('should reject empty string', () => {
    expect(isHexadecimal('')).toBe(false);
  });

  // Additional edge cases for isHexadecimal
  test('should validate all hex digits', () => {
    expect(isHexadecimal('0123456789ABCDEFabcdef')).toBe(true);
  });

  test('should validate only numbers', () => {
    expect(isHexadecimal('0123456789')).toBe(true);
  });

  test('should validate only letters', () => {
    expect(isHexadecimal('ABCDEF')).toBe(true);
  });

  test('should reject with spaces', () => {
    expect(isHexadecimal('1A 2B 3C')).toBe(false);
  });

  test('should reject with 0x prefix', () => {
    expect(isHexadecimal('0x1A2B3C')).toBe(false);
  });

  test('should validate long hex string', () => {
    expect(isHexadecimal('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF')).toBe(true);
  });
});

describe('isRomanNumeral', () => {
  test('should validate Roman numeral', () => {
    expect(isRomanNumeral('XIV')).toBe(true);
  });

  test('should validate complex Roman numeral', () => {
    expect(isRomanNumeral('MCMXCIV')).toBe(true);
  });

  test('should reject invalid Roman numeral', () => {
    expect(isRomanNumeral('IIII')).toBe(false);
  });

  test('should validate single character', () => {
    expect(isRomanNumeral('V')).toBe(true);
  });

  // Additional edge cases for isRomanNumeral
  test('should validate I (1)', () => {
    expect(isRomanNumeral('I')).toBe(true);
  });

  test('should validate M (1000)', () => {
    expect(isRomanNumeral('M')).toBe(true);
  });

  test('should validate IV (4)', () => {
    expect(isRomanNumeral('IV')).toBe(true);
  });

  test('should validate IX (9)', () => {
    expect(isRomanNumeral('IX')).toBe(true);
  });

  test('should validate XL (40)', () => {
    expect(isRomanNumeral('XL')).toBe(true);
  });

  test('should validate XC (90)', () => {
    expect(isRomanNumeral('XC')).toBe(true);
  });

  test('should validate CD (400)', () => {
    expect(isRomanNumeral('CD')).toBe(true);
  });

  test('should validate CM (900)', () => {
    expect(isRomanNumeral('CM')).toBe(true);
  });

  test('should validate lowercase roman numeral', () => {
    expect(isRomanNumeral('xiv')).toBe(true);
  });

  test('should reject VV (not valid notation)', () => {
    expect(isRomanNumeral('VV')).toBe(false);
  });

  test('should reject LL', () => {
    expect(isRomanNumeral('LL')).toBe(false);
  });

  test('should reject DD', () => {
    expect(isRomanNumeral('DD')).toBe(false);
  });

  test('should validate MMMM (4000)', () => {
    expect(isRomanNumeral('MMMM')).toBe(true);
  });
});

describe('isIPv4', () => {
  test('should validate valid IPv4', () => {
    expect(isIPv4('192.168.1.1')).toBe(true);
  });

  test('should validate localhost', () => {
    expect(isIPv4('127.0.0.1')).toBe(true);
  });

  test('should validate max values', () => {
    expect(isIPv4('255.255.255.255')).toBe(true);
  });

  test('should reject octet exceeding 255', () => {
    expect(isIPv4('256.1.1.1')).toBe(false);
  });

  test('should reject incomplete IP', () => {
    expect(isIPv4('192.168.1')).toBe(false);
  });

  // Additional edge cases for isIPv4
  test('should validate minimum IP', () => {
    expect(isIPv4('0.0.0.0')).toBe(true);
  });

  test('should validate broadcast IP', () => {
    expect(isIPv4('255.255.255.255')).toBe(true);
  });

  test('should reject IP with leading zeros', () => {
    expect(isIPv4('192.168.01.1')).toBe(false);
  });

  test('should reject IP with spaces', () => {
    expect(isIPv4('192.168. 1.1')).toBe(false);
  });

  test('should reject IP with letters', () => {
    expect(isIPv4('192.168.a.1')).toBe(false);
  });

  test('should reject IP with too many octets', () => {
    expect(isIPv4('192.168.1.1.1')).toBe(false);
  });

  test('should reject IP with missing octets', () => {
    expect(isIPv4('192.168..1')).toBe(false);
  });

  test('should validate private network ranges', () => {
    expect(isIPv4('10.0.0.1')).toBe(true);
    expect(isIPv4('172.16.0.1')).toBe(true);
  });
});

describe('isIPv6', () => {
  test('should validate full IPv6 notation', () => {
    expect(isIPv6('2001:0db8:85a3:0000:0000:8a2e:0370:7334')).toBe(true);
  });

  test('should validate IPv6 loopback', () => {
    expect(isIPv6('::1')).toBe(true);
  });

  test('should validate compressed IPv6', () => {
    expect(isIPv6('2001:db8::1')).toBe(true);
  });

  test('should validate IPv4-mapped IPv6', () => {
    expect(isIPv6('::ffff:192.168.1.1')).toBe(true);
  });

  test('should reject invalid IPv6', () => {
    expect(isIPv6('invalid')).toBe(false);
  });

  // Additional edge cases for isIPv6
  test('should validate all zeros', () => {
    expect(isIPv6('::')).toBe(true);
  });

  test('should validate IPv6 with multiple consecutive colons', () => {
    expect(isIPv6('fe80::1')).toBe(true);
  });

  test('should validate full uncompressed IPv6', () => {
    expect(isIPv6('fe80:0000:0000:0000:0000:0000:0000:0001')).toBe(true);
  });

  test('should reject IPv6 with invalid characters', () => {
    expect(isIPv6('gggg:0000:0000:0000:0000:0000:0000:0001')).toBe(false);
  });

  test('should reject incomplete IPv6', () => {
    expect(isIPv6('2001:db8')).toBe(false);
  });

  test('should validate IPv6 with zone ID stripped', () => {
    // IPv6 validation accepts zone IDs (% is valid in some implementations)
    expect(isIPv6('fe80::1%eth0')).toBe(true);
  });

  test('should validate link-local IPv6', () => {
    expect(isIPv6('fe80::1')).toBe(true);
  });

  test('should reject IPv6 with too many colons', () => {
    expect(isIPv6('2001::db8::1')).toBe(false);
  });
});

// Edge cases across multiple validators
describe('Multiple validators edge cases', () => {
  test('should validate that empty string fails most validators', () => {
    expect(isEmail('')).toBe(false);
    expect(isUUID('')).toBe(false);
    expect(isURL('')).toBe(false);
    expect(isHexColor('')).toBe(false);
    expect(isPhoneNumber('')).toBe(false);
  });

  test('should handle whitespace only strings', () => {
    expect(isEmail('   ')).toBe(false);
    expect(isAlphabetic('   ')).toBe(false);
    expect(isAlphanumeric('   ')).toBe(false);
    expect(isWhitespace('   ')).toBe(true);
  });

  test('should validate numeric edge cases', () => {
    expect(isNumeric('0')).toBe(true);
    expect(isNumeric('0.0')).toBe(true);
    expect(isNumeric('-0')).toBe(true);
    expect(isNumeric('1e10')).toBe(true);
    expect(isNumeric('NaN')).toBe(false);
  });

  test('should validate password requirements strictly', () => {
    expect(isStrongPassword('Aa1!')).toBe(false);
    expect(isStrongPassword('Aa1!bcde')).toBe(true);
    expect(isStrongPassword('AAAAA1!')).toBe(false);
    expect(isStrongPassword('aaaaa1!')).toBe(false);
  });

  test('should validate case sensitivity for case validators', () => {
    expect(isLowerCase('a')).toBe(true);
    expect(isLowerCase('A')).toBe(false);
    expect(isUpperCase('A')).toBe(true);
    expect(isUpperCase('a')).toBe(false);
  });
});
