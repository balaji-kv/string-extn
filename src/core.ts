/**
 * Removes leading and trailing whitespace from a string.
 * 
 * @param str - The string to trim.
 * @returns A new string with whitespace removed from both ends.
 * 
 * @example
 * trim('  hello world  ') // => 'hello world'
 */
export function trim(str: string): string {
  return str.trim();
}

/**
 * Pads a string to a specified length by appending characters to the end.
 * 
 * @param str - The string to pad.
 * @param length - The target length for the padded string.
 * @param char - The character to pad with. Defaults to a space (' ').
 * @returns A new string padded to the specified length, or the original string if already longer.
 * 
 * @example
 * pad('hello', 10, '-') // => 'hello-----'
 * pad('hello', 8) // => 'hello   '
 */
export function pad(str: string, length: number, char = ' '): string {
  return str.padEnd(length, char);
}

/**
 * Extracts a section of a string.
 * 
 * @param str - The string to slice.
 * @param start - The starting index (inclusive). Negative indices count from the end.
 * @param end - The ending index (exclusive). Negative indices count from the end. Optional.
 * @returns A new string containing the extracted section.
 * 
 * @example
 * slice('hello', 1, 4) // => 'ell'
 * slice('hello', 2) // => 'llo'
 * slice('hello', -3) // => 'llo'
 */
export function slice(str: string, start: number, end?: number): string {
  return str.slice(start, end);
}

/**
 * Repeats a string a specified number of times.
 * 
 * @param str - The string to repeat.
 * @param times - The number of times to repeat the string. Must be a non-negative integer.
 * @returns A new string with the original string repeated.
 * 
 * @example
 * repeat('ab', 3) // => 'ababab'
 * repeat('x', 5) // => 'xxxxx'
 */
export function repeat(str: string, times: number): string {
  return str.repeat(times);
}

/**
 * Truncates a string to a maximum length and appends a suffix if truncated.
 * 
 * @param input - The string to truncate.
 * @param maxLength - The maximum length of the string (not including the suffix).
 * @param suffix - The suffix to append if truncated. Defaults to '…'.
 * @returns The original string if its length is <= maxLength, or the truncated string with suffix appended.
 * 
 * @example
 * truncate('hello world', 5) // => 'hello…'
 * truncate('hi', 10) // => 'hi'
 * truncate('hello world', 5, '...') // => 'he...'
 */
export function truncate(
  input: string,
  maxLength: number,
  suffix = "..."
): string {
  if (input.length <= maxLength) return input;
  // slice first maxLength chars, then append suffix (tests expect suffix appended)
  return input.slice(0, Math.max(0, maxLength)) + suffix;
}


/**
 * Reverses the order of characters in a string.
 * 
 * @param str - The string to reverse.
 * @returns A new string with characters in reverse order.
 * 
 * @note This function splits the string into individual characters and reverses them.
 * For Unicode-aware reversal that handles complex grapheme clusters (like emojis with modifiers),
 * use {@link reverseUnicode} from the unicode module instead.
 * 
 * @example
 * reverse('hello') // => 'olleh'
 * reverse('12345') // => '54321'
 */
export function reverse(str: string): string {
  return str.split('').reverse().join('');
}
