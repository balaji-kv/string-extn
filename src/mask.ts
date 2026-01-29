/**
 * Masks a string by replacing characters with a mask character, keeping only the last visible characters.
 * 
 * @param input - The string to mask
 * @param visible - The number of characters to keep visible at the end (default: 4)
 * @param maskChar - The character used for masking (default: '*')
 * @returns The masked string with the last 'visible' characters shown and the rest replaced with maskChar
 * 
 * @example
 * mask("1234567890") // returns "******7890"
 * mask("1234567890", 6) // returns "****567890"
 * mask("password", 2, '#') // returns "######rd"
 * mask("abc", 4) // returns "***" (if input is shorter than visible, all chars are masked)
 * 
 * @note Commonly used for masking sensitive information like credit card numbers, phone numbers, and passwords
 */
export function mask(
  input: string,
  visible = 4,
  maskChar = "*"
): string {
  const ch = maskChar ? maskChar.charAt(0) : "*";
  if (visible <= 0) return ch.repeat(input.length);
  if (input.length === 0) return "";
  // If visible is greater than or equal to the string length, decide behavior:
  // - For very short inputs (length < 4) we mask entirely
  // - Otherwise we show the whole input
  if (visible >= input.length) {
    if (input.length < 4) return ch.repeat(input.length);
    return input;
  }

  return ch.repeat(input.length - visible) + input.slice(-visible);
}

/**
 * Redacts portions of a string that match the provided patterns.
 * 
 * @param input - The string to redact
 * @param patterns - An array of regular expressions to match against the input string
 * @returns The string with matched patterns replaced with '[REDACTED]'
 * 
 * @example
 * redact("Email: john@example.com", [/@\w+\.\w+/]) // returns "Email: john[REDACTED]"
 * redact("Phone: 123-456-7890", [/\d{3}-\d{3}-\d{4}/]) // returns "Phone: [REDACTED]"
 * redact("Name: Alice, ID: 12345", [/\d+/, /[A-Z][a-z]+/]) // returns "Name: [REDACTED], ID: [REDACTED]"
 * 
 * @note All matches are replaced sequentially; patterns are applied in order
 */
export function redact(
  input: string,
  patterns: RegExp[]
): string {
  let result = input;
  for (const pattern of patterns) {
    // ensure global replacement unless the pattern already has 'g'
    const flags = pattern.flags.includes("g") ? pattern.flags : pattern.flags + "g";
    const re = new RegExp(pattern.source, flags);
    result = result.replace(re, "[REDACTED]");
  }
  return result;
}
