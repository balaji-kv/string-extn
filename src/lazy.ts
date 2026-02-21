export class LazyString {
  private input: string;
  private operations: ((s: string) => string)[] = [];

  /**
   * Create a new lazy wrapper for the provided input.
   * @param input The string to wrap for lazy operations.
   */
  constructor(input: string) {
    this.input = input;
  }

  /**
   * Register a transformation to run later during execution.
   * @param fn A function that receives the current value and returns the next value.
   * @returns The same lazy instance for further chaining.
   */
  map(fn: (input: string) => string): this {
    this.operations.push(fn);
    return this;
  }

  /**
   * Register a trim operation that removes surrounding whitespace.
   * @returns The same lazy instance for further chaining.
   */
  trim(): this {
    return this.map(s => s.trim());
  }

  /**
   * Register an uppercase conversion using default locale rules.
   * @returns The same lazy instance for further chaining.
   */
  toUpper(): this {
    return this.map(s => s.toUpperCase());
  }

  /**
   * Register a lowercase conversion using default locale rules.
   * @returns The same lazy instance for further chaining.
   */
  toLower(): this {
    return this.map(s => s.toLowerCase());
  }

  /**
   * Execute all registered operations in order and return the result.
   * @returns The final transformed string.
   */
  execute(): string {
    return this.operations.reduce(
      (acc, fn) => fn(acc),
      this.input
    );
  }
}

/**
 * Create a new `LazyString` instance for the provided input.
 * @param input The string to wrap for lazy operations.
 * @returns A new `LazyString` instance.
 */
export function lazy(input: string): LazyString {
  return new LazyString(input);
}