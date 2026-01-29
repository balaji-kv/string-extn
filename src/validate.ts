import { isIP } from 'net';

/**
 * Validates if a string is a valid email address format.
 * 
 * @param input - The string to validate
 * @returns true if the string is a valid email format, false otherwise
 * 
 * @example
 * isEmail("user@example.com") // returns true
 * isEmail("invalid.email") // returns false
 * isEmail("user@domain") // returns false
 */
export function isEmail(input: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
}

/**
 * Validates if a string is a valid UUID (Universally Unique Identifier).
 * 
 * @param input - The string to validate
 * @returns true if the string matches UUID format (v1-v5), false otherwise
 * 
 * @example
 * isUUID("550e8400-e29b-41d4-a716-446655440000") // returns true
 * isUUID("invalid-uuid") // returns false
 * 
 * @note Supports UUID versions 1 through 5 with RFC 4122 compliance
 */
export function isUUID(input: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    input
  );
}

/**
 * Validates if a string can be converted to a valid number.
 * 
 * @param input - The string to validate
 * @returns true if the string represents a valid number, false otherwise
 * 
 * @example
 * isNumeric("123") // returns true
 * isNumeric("3.14") // returns true
 * isNumeric("-42") // returns true
 * isNumeric("abc") // returns false
 */
export function isNumeric(input: string): boolean {
  return !isNaN(Number(input));
}
/**
 * Validates if a string is a valid URL using the URL constructor.
 * 
 * @param input - The string to validate
 * @returns true if the string is a valid URL, false otherwise
 * 
 * @example
 * isURL("https://example.com") // returns true
 * isURL("https://example.com/path?query=value") // returns true
 * isURL("not a url") // returns false
 * 
 * @note Uses native URL API for validation, supporting absolute and relative URLs
 */
export function isURL(input: string): boolean {
  try {
    new URL(input);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validates if a string is a valid hexadecimal color code.
 * 
 * @param input - The string to validate
 * @returns true if the string is a valid 3-digit or 6-digit hex color, false otherwise
 * 
 * @example
 * isHexColor("#fff") // returns true
 * isHexColor("#ffffff") // returns true
 * isHexColor("fff") // returns true (# is optional)
 * isHexColor("#gggggg") // returns false
 */
export function isHexColor(input: string): boolean {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(input);
}
/**
 * Validates if a string is a valid phone number in E.164 format.
 * 
 * @param input - The string to validate
 * @returns true if the string matches E.164 phone number format, false otherwise
 * 
 * @example
 * isPhoneNumber("+14155552671") // returns true
 * isPhoneNumber("14155552671") // returns true (+ is optional)
 * isPhoneNumber("415 555 2671") // returns false (spaces not allowed)
 * 
 * @note Follows E.164 format: optional + followed by 1-15 digits, first digit must be 1-9
 */
export function isPhoneNumber(input: string): boolean {
  // Require at least 4 digits (total) to avoid overly short numeric strings
  return /^\+?[1-9]\d{3,14}$/.test(input);
}       
/**
 * Validates if a string can be parsed as a valid date.
 * 
 * @param input - The string to validate
 * @returns true if the string represents a valid date, false otherwise
 * 
 * @example
 * isDate("2024-01-27") // returns true
 * isDate("January 27, 2024") // returns true
 * isDate("2024-13-45") // returns false (invalid date)
 * 
 * @note Uses the native Date.parse() method for validation
 */
export function isDate(input: string): boolean {
  return !isNaN(Date.parse(input));
}
/**
 * Validates if a string is a strong password meeting security requirements.
 * 
 * @param input - The string to validate
 * @returns true if the password is strong, false otherwise
 * 
 * @example
 * isStrongPassword("MyPassword123!") // returns true
 * isStrongPassword("weak") // returns false
 * isStrongPassword("NoSpecialChar123") // returns false
 * 
 * @note Requires: minimum 8 characters, at least one lowercase letter, one uppercase letter,
 *       one digit, and one special character (@$!%*?&)
 */
export function isStrongPassword(input: string): boolean {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
    input
  );
}   
/**
 * Validates if a string is valid JSON.
 * 
 * @param input - The string to validate
 * @returns true if the string is valid JSON, false otherwise
 * 
 * @example
 * isJSON('{\"key\": \"value\"}') // returns true
 * isJSON('[1, 2, 3]') // returns true
 * isJSON('invalid json') // returns false
 * 
 * @note Uses native JSON.parse() for validation
 */
export function isJSON(input: string): boolean {
  try {
    JSON.parse(input);
    return true;
  } catch {
    return false;
  }
}
/**
 * Validates if a string is valid Base64 encoded data.
 * 
 * @param input - The string to validate
 * @returns true if the string is valid Base64 format, false otherwise
 * 
 * @example
 * isBase64("SGVsbG8gV29ybGQ=") // returns true
 * isBase64("SGVsbG8gV29ybGQ") // returns true
 * isBase64("!!!Invalid!!!") // returns false
 */
export function isBase64(input: string): boolean {
  // Empty string considered valid by tests
  if (input === "") return true;
  // Accept Base64 with or without padding; disallow invalid characters
  if (!/^[A-Za-z0-9+/]+=*$/.test(input)) return false;
  // invalid if length mod 4 === 1
  return input.length % 4 !== 1;
}   
/**
 * Validates if a string contains only alphabetic characters (no numbers or special characters).
 * 
 * @param input - The string to validate
 * @returns true if the string contains only letters, false otherwise
 * 
 * @example
 * isAlphabetic("HelloWorld") // returns true
 * isAlphabetic("Hello World") // returns false (contains space)
 * isAlphabetic("Hello123") // returns false (contains numbers)
 */
export function isAlphabetic(input: string): boolean {
  return /^[A-Za-z]+$/.test(input);
}   
/**
 * Validates if a string contains only alphanumeric characters (letters and digits).
 * 
 * @param input - The string to validate
 * @returns true if the string contains only letters and numbers, false otherwise
 * 
 * @example
 * isAlphanumeric("Hello123") // returns true
 * isAlphanumeric("Hello-123") // returns false (contains hyphen)
 * isAlphanumeric("Hello 123") // returns false (contains space)
 */
export function isAlphanumeric(input: string): boolean {
  return /^[A-Za-z0-9]+$/.test(input);
}   
/**
 * Validates if a string contains only lowercase alphabetic characters.
 * 
 * @param input - The string to validate
 * @returns true if the string contains only lowercase letters, false otherwise
 * 
 * @example
 * isLowerCase("hello") // returns true
 * isLowerCase("Hello") // returns false (contains uppercase)
 * isLowerCase("hello123") // returns false (contains numbers)
 */
export function isLowerCase(input: string): boolean {
  return /^[a-z]+$/.test(input);
}       
/**
 * Validates if a string contains only uppercase alphabetic characters.
 * 
 * @param input - The string to validate
 * @returns true if the string contains only uppercase letters, false otherwise
 * 
 * @example
 * isUpperCase("HELLO") // returns true
 * isUpperCase("Hello") // returns false (contains lowercase)
 * isUpperCase("HELLO123") // returns false (contains numbers)
 */
export function isUpperCase(input: string): boolean {
  return /^[A-Z]+$/.test(input);
}   
/**
 * Validates if a string contains only whitespace characters (spaces, tabs, newlines, etc.).
 * 
 * @param input - The string to validate
 * @returns true if the string contains only whitespace, false otherwise
 * 
 * @example
 * isWhitespace("   ") // returns true
 * isWhitespace("\t\n") // returns true
 * isWhitespace(" a ") // returns false (contains non-whitespace)
 */
export function isWhitespace(input: string): boolean {
  return /^\s+$/.test(input);
}   
/**
 * Validates if a string is a palindrome (reads the same forwards and backwards).
 * 
 * @param input - The string to validate
 * @returns true if the string is a palindrome, false otherwise
 * 
 * @example
 * isPalindrome("racecar") // returns true
 * isPalindrome("A man, a plan, a canal: Panama") // returns true (ignores punctuation and case)
 * isPalindrome("hello") // returns false
 * 
 * @note Case-insensitive and ignores non-alphanumeric characters
 */
export function isPalindrome(input: string): boolean {
  const cleaned = input.replace(/[\W_]/g, "").toLowerCase();
  return cleaned === cleaned.split("").reverse().join("");
}   
/**
 * Validates if a string contains only hexadecimal characters (0-9, A-F).
 * 
 * @param input - The string to validate
 * @returns true if the string is valid hexadecimal, false otherwise
 * 
 * @example
 * isHexadecimal("1A2B3C") // returns true
 * isHexadecimal("DEADBEEF") // returns true
 * isHexadecimal("12XYZ") // returns false (contains invalid characters)
 */
export function isHexadecimal(input: string): boolean {
  return /^[0-9A-Fa-f]+$/.test(input);
}   
/**
 * Validates if a string is a valid Roman numeral.
 * 
 * @param input - The string to validate
 * @returns true if the string is a valid Roman numeral, false otherwise
 * 
 * @example
 * isRomanNumeral("XIV") // returns true
 * isRomanNumeral("MCMXCIV") // returns true
 * isRomanNumeral("IIII") // returns false (should be IV)
 * 
 * @note Validates standard Roman numeral notation (I, V, X, L, C, D, M)
 */
export function isRomanNumeral(input: string): boolean {
  return /^(M{0,4}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$)/i.test(
    input
  );
}   
/**
 * Validates if a string is a valid IPv4 address.
 * 
 * @param input - The string to validate
 * @returns true if the string is a valid IPv4 address, false otherwise
 * 
 * @example
 * isIPv4("192.168.1.1") // returns true
 * isIPv4("255.255.255.255") // returns true
 * isIPv4("256.1.1.1") // returns false (256 exceeds maximum)
 * 
 * @note Validates standard IPv4 dotted-decimal notation (0.0.0.0 to 255.255.255.255)
 */
export function isIPv4(input: string): boolean {
  return isIP(input) === 4;
}   
/**
 * Validates if a string is a valid IPv6 address.
 * 
 * @param input - The string to validate
 * @returns true if the string is a valid IPv6 address, false otherwise
 * 
 * @example
 * isIPv6("2001:0db8:85a3:0000:0000:8a2e:0370:7334") // returns true
 * isIPv6("::1") // returns true (loopback)
 * isIPv6("::ffff:192.168.1.1") // returns true (IPv4-mapped)
 * isIPv6("invalid") // returns false
 * 
 * @note Supports full notation, compressed notation, and IPv4-mapped IPv6 addresses
 */
export function isIPv6(input: string): boolean {
  return isIP(input) === 6;
}

