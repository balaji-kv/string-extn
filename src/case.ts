/**
 * Converts a string to camelCase format.
 * 
 * @param input - The input string to convert (can be kebab-case, snake_case, or space-separated)
 * @returns The string converted to camelCase (first letter lowercase, subsequent words capitalized)
 * 
 * @example
 * toCamelCase("hello-world") // returns "helloWorld"
 * toCamelCase("hello_world") // returns "helloWorld"
 * toCamelCase("hello world") // returns "helloWorld"
 */
export function toCamelCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""))
    .replace(/^(.)/, (m) => m.toLowerCase());
}

/**
 * Converts a string to kebab-case format.
 * 
 * @param input - The input string to convert (can be camelCase, snake_case, or space-separated)
 * @returns The string converted to kebab-case (lowercase with hyphens between words)
 * 
 * @example
 * toKebabCase("helloWorld") // returns "hello-world"
 * toKebabCase("hello_world") // returns "hello-world"
 * toKebabCase("hello world") // returns "hello-world"
 */
export function toKebabCase(input: string): string {
  // If the input is all uppercase (acronym style), just lowercase it
  const compact = input.replace(/[_\s-]+/g, "");
  if (compact && compact === compact.toUpperCase()) {
    return input.replace(/[_\s]+/g, "-").toLowerCase();
  }
  // insert hyphen before every uppercase letter, treat underscores/spaces as separators
  return input
    .replace(/([A-Z])/g, "-$1")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$|^-/g, "")
    .toLowerCase();
}

/**
 * Converts a string to snake_case format.
 * 
 * @param input - The input string to convert (can be camelCase, kebab-case, or space-separated)
 * @returns The string converted to snake_case (lowercase with underscores between words)
 * 
 * @example
 * toSnakeCase("helloWorld") // returns "hello_world"
 * toSnakeCase("hello-world") // returns "hello_world"
 * toSnakeCase("hello world") // returns "hello_world"
 */
export function toSnakeCase(input: string): string {
  const compact = input.replace(/[-\s_]+/g, "");
  if (compact && compact === compact.toUpperCase()) {
    return input.replace(/[-\s]+/g, "_").toLowerCase();
  }
  return input
    .replace(/([A-Z])/g, "_$1")
    .replace(/[-\s]+/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase();
}

/**
 * Converts a string to Title Case format.
 * 
 * @param input - The input string to convert
 * @returns The string converted to Title Case (first letter of each word capitalized, rest lowercase)
 * 
 * @example
 * toTitleCase("hello world") // returns "Hello World"
 * toTitleCase("helloWorld") // returns "HelloWorld"
 * toTitleCase("hello-world") // returns "Hello-World"
 */
export function toTitleCase(input: string): string {
  // Preserve separators and multiple spaces; capitalize first char of each word
  const parts = input.split(/([^A-Za-z0-9]+)/);
  return parts
    .map((tok) => {
      if (/^[A-Za-z0-9_]+$/.test(tok)) {
        // if token is all uppercase, downcase then capitalize
        if (tok === tok.toUpperCase()) tok = tok.toLowerCase();
        return tok.charAt(0).toUpperCase() + tok.slice(1);
      }
      return tok;
    })
    .join("");
}
