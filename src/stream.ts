
/**
 * Splits a string into an array of fixed-size chunks.
 *
 * @param input - The string to split.
 * @param size - The chunk size in code units; must be a positive, finite number.
 * @returns An array of chunk strings.
 *
 * Special behavior: Throws when size is non-positive or non-finite.
 */
export function chunkString(input: string, size: number): string[] {
  if (!Number.isFinite(size) || size <= 0) {
    throw new Error("Chunk size must be a positive number.");
  }
  const result: string[] = [];
  for (let i = 0; i < input.length; i += size) {
    result.push(input.slice(i, i + size));
  }
  return result;
}


/**
 * Applies a transformer to each chunk and concatenates the results.
 *
 * @param chunks - The list of chunks to transform.
 * @param transformer - The function applied to each chunk.
 * @returns The concatenated transformed result.
 *
 * Special behavior: Preserves chunk order and performs a simple left-to-right join.
 */
export function streamTransform(
  chunks: string[],
  transformer: (chunk: string) => string
): string {
  let result = "";
  for (const chunk of chunks) {
    result += transformer(chunk);
  }
  return result;
}   
