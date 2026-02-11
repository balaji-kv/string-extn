const ESCAPE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;"
};

/**
 * Escapes HTML-reserved characters to their entity equivalents.
 *
 * @param input - The string to escape.
 * @returns The escaped string with HTML-sensitive characters replaced.
 *
 * Special behavior: Escapes `&`, `<`, `>`, `"`, and `'` characters; does not decode entities.
 */
export function escapeHTML(input: string): string {
  return input.replace(/[&<>"']/g, char => ESCAPE_MAP[char] ?? char);
}

/**
 * Escapes SQL-sensitive characters by prefixing them with a backslash.
 *
 * @param input - The string to escape.
 * @returns The escaped string with `'`, `"`, `;`, and `\` prefixed by `\`.
 *
 * Special behavior: Simple escaping helper; it does not validate SQL or prevent all injection cases.
 */
export function escapeSQL(input: string): string {
  return input.replace(/['";\\]/g, "\\$&");
}

/**
 * Sanitizes a path-like string by removing traversal and dot segments.
 *
 * @param input - The path string to sanitize.
 * @returns The sanitized path with `.` and `..` segments removed.
 *
 * Special behavior: Preserves a leading separator and normalizes repeated separators.
 */
export function sanitizePath(input: string): string {
  const separator = input.includes("/") ? "/" : "\\";
  const hasLeadingSeparator = input.startsWith("/") || input.startsWith("\\");
  const parts = input
    .split(/[\\/]+/)
    .filter(part => part !== "" && part !== "." && part !== "..");

  const sanitized = parts.join(separator);
  return hasLeadingSeparator ? `${separator}${sanitized}` : sanitized;
}
