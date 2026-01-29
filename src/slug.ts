/**
 * Converts a string to a URL-friendly slug format.
 * 
 * @param input - The string to convert to a slug
 * @returns A slug-formatted string (lowercase, hyphen-separated, no special characters or accents)
 * 
 * @example
 * slugify("Hello World") // returns "hello-world"
 * slugify("Café au Lait") // returns "cafe-au-lait" (accents removed)
 * slugify("Hello---World") // returns "hello-world" (multiple hyphens normalized)
 * slugify("---Hello World---") // returns "hello-world" (leading/trailing hyphens removed)
 * 
 * @note Removes diacritical marks and special characters, suitable for URLs and routing
 */
export function slugify(input: string): string {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    // Remove punctuation except common separators (space, hyphen, underscore)
    .replace(/[^a-z0-9\s_-]+/g, "")
    // Normalize separators to single hyphen
    .replace(/[\s_-]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

/**
 * Removes invalid filesystem characters from a string to make it a safe filename.
 * 
 * @param input - The string to make filesystem-safe
 * @returns A filename-safe string with invalid characters removed and whitespace trimmed
 * 
 * @example
 * filenameSafe("My File.txt") // returns "My File.txt"
 * filenameSafe("Document<>?.txt") // returns "Document.txt"
 * filenameSafe("File:Name|Invalid.doc") // returns "FileNameInvalid.doc"
 * filenameSafe("  spaces.txt  ") // returns "spaces.txt" (trimmed)
 * 
 * @note Removes characters: < > : " / \ | ? * and control characters (ASCII 0-31).
 *       Compatible with Windows, Mac, and Linux filesystems.
 */
export function filenameSafe(input: string): string {
  return input.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim();
}
