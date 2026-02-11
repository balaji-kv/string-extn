/**
 * Repeats a string using a fast doubling technique.
 *
 * @param input - The string to repeat.
 * @param count - The number of times to repeat the string.
 * @returns The repeated string, or an empty string when count is not positive or not finite.
 *
 * Special behavior: Non-integer counts are floored; non-finite or non-positive counts return "".
 */
export function fastRepeat(input: string, count: number): string {
  if (!Number.isFinite(count) || count <= 0) return "";
  let remaining = Math.floor(count);
  let result = "";
  let current = input;

  while (remaining > 0) {
    if (remaining & 1) result += current;
    current += current;
    remaining >>= 1;
  }
  return result;
}

/**
 * Pads the left side of a string to a target length using a fast repeat.
 *
 * @param input - The string to pad.
 * @param length - The desired total length of the result.
 * @param char - The padding character (defaults to a space).
 * @returns The padded string, or the original string if already long enough.
 *
 * Special behavior: Uses code unit length and does not trim or normalize input.
 */
export function fastPadLeft(
  input: string,
  length: number,
  char = " "
): string {
  if (input.length >= length) return input;
  return fastRepeat(char, length - input.length) + input;
}
