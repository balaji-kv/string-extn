
/**
 * Calculates the similarity between two strings using the Levenshtein distance algorithm.
 * 
 * @param a - The first string to compare
 * @param b - The second string to compare
 * @returns A similarity score between 0 and 1, where 1 means the strings are identical and 0 means completely different
 * 
 * @example
 * similarity("hello", "hello") // returns 1 (identical)
 * similarity("hello", "hallo") // returns 0.8 (one character different)
 * similarity("abc", "def") // returns 0 (completely different)
 * similarity("", "") // returns 0 (one or both strings empty)
 * 
 * @note Uses dynamic programming to compute the Levenshtein distance (edit distance) and converts it to a similarity score.
 *       The algorithm accounts for three operations: insertion, deletion, and substitution.
 */
export function similarity(a: string, b: string): number {
  if (a === b) return 1;
  if (!a.length || !b.length) return 0;

  const rows = b.length + 1;
  const cols = a.length + 1;

  const matrix: number[][] = [];
  for (let i = 0; i < rows; i++) {
    matrix.push(Array(cols).fill(0) as number[]);
  }

  // Initialize matrix
  for (let i = 0; i < rows; i++) {
    (matrix[i] as number[])[0] = i;
  }

  for (let j = 0; j < cols; j++) {
    (matrix[0] as number[])[j] = j;
  }

  // Compute distances
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = b[i - 1] === a[j - 1] ? 0 : 1;
      const currentRow = matrix[i] as number[];
      const prevRow = matrix[i - 1] as number[];
      
      currentRow[j] = Math.min(
        prevRow[j]! + 1,     // deletion
        currentRow[j - 1]! + 1,     // insertion
        prevRow[j - 1]! + cost // substitution
      );
    }
  }

  const distance = (matrix[b.length] as number[])[a.length]!;
  return 1 - distance / Math.max(a.length, b.length);
}
