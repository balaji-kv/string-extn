/**
 * Replace {{key}} placeholders in a template string with values from a map.
 * @param input The template string containing {{key}} placeholders.
 * @param variables A map of placeholder keys to values.
 * @returns The rendered string with placeholders replaced.
 * @remarks Keys are trimmed inside braces. Missing values (undefined) become an empty string.
 */
export function template(
  input: string,
  variables: Record<string, any>
): string {
  return input.replace(/\{\{(.*?)\}\}/g, (_, key) => {
    const value = variables[key.trim()];
    return value !== undefined ? String(value) : "";
  });
}