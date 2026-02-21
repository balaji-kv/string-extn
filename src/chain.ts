export class StringChain {
  private value: string;

  /**
   * Create a new chain wrapper for the provided input.
   * @param input The string to wrap for chained operations.
   */
  constructor(input: string) {
    this.value = input;
  }

  /**
   * Trim leading and trailing whitespace from the current value.
   * @returns The same chain instance for further chaining.
   */
  trim(): this {
    this.value = this.value.trim();
    return this;
  }

  /**
   * Convert the current value to uppercase using default locale rules.
   * @returns The same chain instance for further chaining.
   */
  toUpper(): this {
    this.value = this.value.toUpperCase();
    return this;
  }

  /**
   * Convert the current value to lowercase using default locale rules.
   * @returns The same chain instance for further chaining.
   */
  toLower(): this {
    this.value = this.value.toLowerCase();
    return this;
  }

  /**
   * Replace a match in the current value using a string or RegExp search.
   * @param search The string or RegExp pattern to search for.
   * @param replacement The replacement string (supports RegExp replacement tokens).
   * @returns The same chain instance for further chaining.
   */
  replace(search: string | RegExp, replacement: string): this {
    this.value = this.value.replace(search, replacement);
    return this;
  }

  /**
   * Reverse the current value by Unicode code points.
   * @returns The same chain instance for further chaining.
   */
  reverse(): this {
    this.value = [...this.value].reverse().join("");
    return this;
  }

  /**
   * Get the current value as a string.
   * @returns The current chained value.
   */
  valueOf(): string {
    return this.value;
  }

  /**
   * Convert the chain to a string for coercion or display.
   * @returns The current chained value.
   */
  toString(): string {
    return this.value;
  }
}

/**
 * Create a new `StringChain` instance for the provided input.
 * @param input The string to wrap for chained operations.
 * @returns A new `StringChain` instance.
 */
export function chain(input: string): StringChain {
  return new StringChain(input);
}