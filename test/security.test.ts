/**
 * Test suite for security-related string functions, covering escaping behavior
 * and path sanitization edge cases.
 */
import { escapeHTML, escapeSQL, sanitizePath } from '../src/security.js';

describe('escapeHTML', () => {
  test('should escape basic HTML tags', () => {
    expect(escapeHTML('<div>Hello</div>')).toBe('&lt;div&gt;Hello&lt;/div&gt;');
  });

  test('should escape ampersands in already escaped strings', () => {
    // Existing entities are escaped again because '&' is always replaced.
    const input = '&lt;div&gt;Hi&amp;Bye&lt;/div&gt;';
    const expected = '&amp;lt;div&amp;gt;Hi&amp;amp;Bye&amp;lt;/div&amp;gt;';
    expect(escapeHTML(input)).toBe(expected);
  });

  test('should escape mixed safe and unsafe characters', () => {
    const input = 'Tom & Jerry <b>"best"</b>';
    const expected = 'Tom &amp; Jerry &lt;b&gt;&quot;best&quot;&lt;/b&gt;';
    expect(escapeHTML(input)).toBe(expected);
  });

  test('should handle empty string', () => {
    expect(escapeHTML('')).toBe('');
  });

  test('should handle large input', () => {
    // Large inputs should still be processed correctly.
    const input = 'a'.repeat(5000) + '<&>' + 'b'.repeat(5000);
    const expected = 'a'.repeat(5000) + '&lt;&amp;&gt;' + 'b'.repeat(5000);
    expect(escapeHTML(input)).toBe(expected);
  });

  test('should handle unicode input', () => {
    // Unicode characters should be preserved while HTML-sensitive chars are escaped.
    const input = 'Hello 😊 & 你好 <tag>';
    const expected = 'Hello 😊 &amp; 你好 &lt;tag&gt;';
    expect(escapeHTML(input)).toBe(expected);
  });

  test('should escape single quotes', () => {
    expect(escapeHTML("O'Reilly")).toBe('O&#x27;Reilly');
  });

  test('should be non-idempotent when escaping twice', () => {
    // Escaping twice changes the string because '&' is re-escaped.
    const input = '<span>Fish & Chips</span>';
    const once = escapeHTML(input);
    const twice = escapeHTML(once);
    expect(twice).not.toBe(once);
  });

  test('should leave safe strings unchanged', () => {
    expect(escapeHTML('plain text 123')).toBe('plain text 123');
  });
});

describe('escapeSQL', () => {
  test('should escape single quotes', () => {
    expect(escapeSQL("O'Reilly")).toBe("O\\'Reilly");
  });

  test('should escape double quotes and semicolons', () => {
    expect(escapeSQL('SELECT "name";')).toBe('SELECT \\"name\\"\\;');
  });

  test('should escape backslashes', () => {
    expect(escapeSQL('C:\\path\\file')).toBe('C:\\\\path\\\\file');
  });

  test('should escape mixed unsafe characters', () => {
    // Ensure all SQL-sensitive characters are escaped together.
    const input = "a'\";\\b";
    const expected = "a\\'\\\"\\;\\\\b";
    expect(escapeSQL(input)).toBe(expected);
  });

  test('should handle empty string', () => {
    expect(escapeSQL('')).toBe('');
  });

  test('should leave safe strings unchanged', () => {
    expect(escapeSQL('SELECT name FROM users')).toBe('SELECT name FROM users');
  });
});

describe('sanitizePath', () => {
  test('should return unchanged for safe path', () => {
    expect(sanitizePath('folder/sub')).toBe('folder/sub');
  });

  test('should remove traversal segments', () => {
    // Parent directory traversal segments should be stripped.
    expect(sanitizePath('../etc/passwd')).toBe('etc/passwd');
  });

  test('should remove dot segments', () => {
    // Dot segments are removed without resolving path hierarchy.
    expect(sanitizePath('a/./b/../c')).toBe('a/b/c');
  });

  test('should preserve leading separator', () => {
    // Leading separators are preserved to keep absolute paths absolute.
    expect(sanitizePath('/var/../tmp')).toBe('/var/tmp');
  });

  test('should handle backslash paths', () => {
    expect(sanitizePath('folder\\..\\secret')).toBe('folder\\secret');
  });

  test('should collapse multiple separators', () => {
    expect(sanitizePath('a//b///c')).toBe('a/b/c');
  });

  test('should handle empty input', () => {
    expect(sanitizePath('')).toBe('');
  });

  test('should handle root-only paths', () => {
    expect(sanitizePath('/')).toBe('/');
    expect(sanitizePath('\\')).toBe('\\');
  });

  test('should drop only traversal segments', () => {
    expect(sanitizePath('../..')).toBe('');
  });

  test('should normalize mixed separators to forward slash', () => {
    // Mixed separators normalize to the first detected separator style.
    expect(sanitizePath('a\\b/c')).toBe('a/b/c');
  });
});
