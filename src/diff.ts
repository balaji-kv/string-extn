/**
 * Compares two strings and returns the character differences between them.
 * 
 * @param a - The first string to compare
 * @param b - The second string to compare
 * @returns An array of character differences, where characters prefixed with '-' are in string a but not in b,
 *          and characters prefixed with '+' are in string b but not in a
 * 
 * @example
 * diff("abc", "bcd") // returns ["-a", "+d"]
 * diff("hello", "hallo") // returns ["-e", "+a"]
 * 
 * @note Duplicates are removed as the comparison uses sets of unique characters
 */
export function diff(a: string, b: string): string[] {
  const aSet = new Set(a.split(""));
  const bSet = new Set(b.split(""));

  return [
    ...[...aSet].filter(x => !bSet.has(x)).map(x => `-${x}`),
    ...[...bSet].filter(x => !aSet.has(x)).map(x => `+${x}`)
  ];
}
