/**
 * Test suite for template string interpolation in template.ts.
 */
import { template } from '../src/template.js';

describe('template', () => {
  test('should replace simple placeholders', () => {
    expect(template('Hello {{name}}', { name: 'Ada' })).toBe('Hello Ada');
  });

  test('should trim whitespace around keys', () => {
    // Confirms key trimming inside {{ }}.
    expect(template('Hello {{  name  }}', { name: 'Ada' })).toBe('Hello Ada');
  });

  test('should replace multiple different placeholders', () => {
    const result = template('Hi {{first}} {{last}}', {
      first: 'Ada',
      last: 'Lovelace'
    });
    expect(result).toBe('Hi Ada Lovelace');
  });

  test('should replace repeated placeholders', () => {
    expect(template('{{word}} {{word}}', { word: 'echo' })).toBe('echo echo');
  });

  test('should return empty string for missing variables', () => {
    // Missing keys (undefined) render as empty string.
    expect(template('Hello {{missing}}', {})).toBe('Hello ');
  });

  test('should not replace when no placeholders', () => {
    // Ensures non-template input is left untouched.
    expect(template('No variables here', { any: 'value' })).toBe('No variables here');
  });

  test('should handle empty input string', () => {
    expect(template('', { name: 'Ada' })).toBe('');
  });

  test('should coerce non-string values', () => {
    // Validates String() coercion for numbers and other types.
    expect(template('Count: {{count}}', { count: 5 })).toBe('Count: 5');
  });

  test('should preserve falsy values except undefined', () => {
    // Ensures 0/false are rendered, while undefined is treated as missing.
    expect(template('Zero={{zero}}, False={{flag}}', { zero: 0, flag: false }))
      .toBe('Zero=0, False=false');
  });

  test('should convert null to string', () => {
    // Confirms null is rendered via String().
    expect(template('Value={{value}}', { value: null })).toBe('Value=null');
  });

  test('should treat undefined as missing', () => {
    // Undefined values render as empty string.
    expect(template('Value={{value}}', { value: undefined })).toBe('Value=');
  });

  test('should support empty key placeholders', () => {
    // Allows {{}} to map to an empty-string key.
    expect(template('Value={{}}', { '': 'empty' })).toBe('Value=empty');
  });

  test('should ignore unmatched braces', () => {
    // Unmatched braces should be left as-is.
    expect(template('Hello {{name', { name: 'Ada' })).toBe('Hello {{name');
  });

  test('should handle nested braces literally', () => {
    // Documents how the non-greedy match handles nested braces.
    expect(template('A {{b{{c}}}}', { 'b{{c': 'X' })).toBe('A X}}');
  });
});
