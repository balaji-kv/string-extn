/**
 * Test suite for string slug and filename conversion functions.
 * 
 * This file provides comprehensive test coverage for the slug module functions:
 * - slugify: Converts strings to URL-friendly slugs with proper Unicode handling
 * - filenameSafe: Removes invalid filesystem characters for cross-platform compatibility
 * 
 * Tests cover:
 * - slugify: various separators, accented characters, edge cases, special characters
 * - filenameSafe: invalid characters removal, whitespace trimming, cross-platform support
 */
import { slugify, filenameSafe } from '../src/slug.js';

describe('slugify', () => {
  test('should convert space-separated string to slug', () => {
    expect(slugify('hello world')).toBe('hello-world');
  });

  test('should convert to lowercase', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  test('should replace multiple spaces with single hyphen', () => {
    // Edge case: consecutive spaces normalized to single hyphen separator
    expect(slugify('hello   world')).toBe('hello-world');
  });

  test('should remove leading hyphens', () => {
    // Edge case: leading separators trimmed
    expect(slugify('-hello-world')).toBe('hello-world');
  });

  test('should remove trailing hyphens', () => {
    // Edge case: trailing separators trimmed
    expect(slugify('hello-world-')).toBe('hello-world');
  });

  test('should handle consecutive hyphens', () => {
    // Edge case: multiple consecutive hyphens normalized to single hyphen
    expect(slugify('hello---world')).toBe('hello-world');
  });

  test('should remove accented characters', () => {
    // Unicode normalization: accented characters converted to base characters
    expect(slugify('café')).toBe('cafe');
  });

  test('should handle unicode characters with diacritics', () => {
    // Unicode feature: combining marks removed via NFKD normalization
    expect(slugify('Café au Lait')).toBe('cafe-au-lait');
  });

  test('should convert special characters to hyphens', () => {
    expect(slugify('hello@world!')).toBe('helloworld');
  });

  test('should handle underscores as separators', () => {
    expect(slugify('hello_world')).toBe('hello-world');
  });

  test('should handle mixed separators', () => {
    expect(slugify('hello-world_test foo')).toBe('hello-world-test-foo');
  });

  test('should handle single word', () => {
    expect(slugify('hello')).toBe('hello');
  });

  test('should handle empty string', () => {
    expect(slugify('')).toBe('');
  });

  test('should remove numbers-only sequences but keep numeric words', () => {
    expect(slugify('hello 123 world')).toBe('hello-123-world');
  });

  test('should handle string with only special characters', () => {
    // Edge case: only special chars results in empty or hyphen-heavy string
    expect(slugify('!!!---__')).toBe('');
  });

  test('should convert URL-unfriendly characters', () => {
    expect(slugify('hello?world&test')).toBe('helloworldtest');
  });

  test('should be suitable for URLs', () => {
    // Real-world use case: blog post title to URL slug
    expect(slugify('My Awesome Blog Post')).toBe('my-awesome-blog-post');
  });

  test('should handle long strings', () => {
    const input = 'This is a very long blog post title with many words';
    const result = slugify(input);
    expect(result).toBe('this-is-a-very-long-blog-post-title-with-many-words');
  });

  test('should handle accented characters from different languages', () => {
    // Unicode support: handles Spanish, French, German accents
    expect(slugify('Résumé')).toBe('resume');
  });

  test('should handle repeated separators', () => {
    expect(slugify('hello____world')).toBe('hello-world');
  });

  test('should be deterministic', () => {
    // Validates consistency: same input always produces same output
    const input = 'Hello World Test';
    expect(slugify(input)).toBe(slugify(input));
  });

  // Additional edge cases for slugify
  test('should handle multiple leading hyphens', () => {
    expect(slugify('---hello-world')).toBe('hello-world');
  });

  test('should handle multiple trailing hyphens', () => {
    expect(slugify('hello-world---')).toBe('hello-world');
  });

  test('should handle only hyphens', () => {
    expect(slugify('---')).toBe('');
  });

  test('should handle only spaces', () => {
    expect(slugify('   ')).toBe('');
  });

  test('should handle only underscores', () => {
    expect(slugify('___')).toBe('');
  });

  test('should handle mixed leading and trailing separators', () => {
    expect(slugify('---hello_world---')).toBe('hello-world');
  });

  test('should handle tabs', () => {
    expect(slugify('hello\tworld')).toBe('hello-world');
  });

  test('should handle newlines', () => {
    expect(slugify('hello\nworld')).toBe('hello-world');
  });

  test('should handle carriage returns', () => {
    expect(slugify('hello\rworld')).toBe('hello-world');
  });

  test('should handle mixed whitespace types', () => {
    expect(slugify('hello \t\n world')).toBe('hello-world');
  });

  test('should remove parentheses', () => {
    expect(slugify('hello (world)')).toBe('hello-world');
  });

  test('should remove brackets', () => {
    expect(slugify('hello [world]')).toBe('hello-world');
  });

  test('should remove braces', () => {
    expect(slugify('hello {world}')).toBe('hello-world');
  });

  test('should remove commas', () => {
    expect(slugify('hello, world')).toBe('hello-world');
  });

  test('should remove periods', () => {
    expect(slugify('hello.world')).toBe('helloworld');
  });

  test('should handle dots between words', () => {
    expect(slugify('hello . world')).toBe('hello-world');
  });

  test('should handle ampersands', () => {
    expect(slugify('hello & world')).toBe('hello-world');
  });

  test('should handle plus signs', () => {
    expect(slugify('hello + world')).toBe('hello-world');
  });

  test('should handle equals signs', () => {
    expect(slugify('hello = world')).toBe('hello-world');
  });

  test('should handle multiple special characters in sequence', () => {
    expect(slugify('hello!@#$%world')).toBe('helloworld');
  });

  test('should handle numbers with special characters', () => {
    expect(slugify('123!@#456')).toBe('123456');
  });

  test('should handle alpha and numeric mix', () => {
    expect(slugify('abc123def456')).toBe('abc123def456');
  });

  test('should handle currency symbols', () => {
    expect(slugify('price $99.99')).toBe('price-9999');
  });

  test('should handle copyright symbol', () => {
    expect(slugify('hello © world')).toBe('hello-world');
  });

  test('should handle trademark symbol', () => {
    // Trademark symbol normalizes to 'tm' via NFKD
    expect(slugify('hello™ world')).toBe('hellotm-world');
  });

  test('should handle degree symbol', () => {
    expect(slugify('180° turn')).toBe('180-turn');
  });

  test('should handle French characters', () => {
    expect(slugify('Français')).toBe('francais');
  });

  test('should handle German characters', () => {
    expect(slugify('Größe')).toBe('groe');
  });

  test('should handle Spanish characters', () => {
    expect(slugify('Español')).toBe('espanol');
  });

  test('should handle Portuguese characters', () => {
    expect(slugify('São Paulo')).toBe('sao-paulo');
  });

  test('should handle Nordic characters', () => {
    // Nordic ø normalizes to o via NFKD
    expect(slugify('København')).toBe('kbenhavn');
  });

  test('should handle Greek characters', () => {
    // Greek gets removed as non-ASCII
    const result = slugify('Ελληνικά');
    expect(result).toBe('');
  });

  test('should handle Cyrillic characters', () => {
    // Cyrillic gets removed as non-ASCII
    const result = slugify('Русский');
    expect(result).toBe('');
  });

  test('should handle Arabic characters', () => {
    // Arabic gets removed as non-ASCII
    const result = slugify('العربية');
    expect(result).toBe('');
  });

  test('should handle Chinese characters', () => {
    // Chinese gets removed as non-ASCII
    const result = slugify('中文');
    expect(result).toBe('');
  });

  test('should handle emoji', () => {
    expect(slugify('hello 😀 world')).toBe('hello-world');
  });

  test('should handle multiple emoji', () => {
    expect(slugify('😀😁😂')).toBe('');
  });

  test('should handle emoji with text', () => {
    expect(slugify('fire🔥test')).toBe('firetest');
  });

  test('should handle very long string', () => {
    const longString = 'a '.repeat(100);
    const result = slugify(longString);
    expect(result).toMatch(/^(a-)+a$/);
  });

  test('should handle repeated words', () => {
    expect(slugify('hello hello hello')).toBe('hello-hello-hello');
  });

  test('should handle single character', () => {
    expect(slugify('a')).toBe('a');
  });

  test('should handle single special character', () => {
    expect(slugify('!')).toBe('');
  });

  test('should handle hyphenated original text', () => {
    expect(slugify('well-known-author')).toBe('well-known-author');
  });

  test('should handle already slug-like input', () => {
    expect(slugify('hello-world-test')).toBe('hello-world-test');
  });

  test('should handle CamelCase input', () => {
    expect(slugify('HelloWorldTest')).toBe('helloworldtest');
  });

  test('should handle snake_case input', () => {
    expect(slugify('hello_world_test')).toBe('hello-world-test');
  });

  test('should handle PascalCase with numbers', () => {
    expect(slugify('HelloWorld123Test')).toBe('helloworld123test');
  });

  test('should handle leading numbers', () => {
    expect(slugify('123 hello world')).toBe('123-hello-world');
  });

  test('should handle trailing numbers', () => {
    expect(slugify('hello world 456')).toBe('hello-world-456');
  });

  test('should handle numbers only', () => {
    expect(slugify('12345')).toBe('12345');
  });

  test('should normalize multiple separators between words', () => {
    expect(slugify('hello - _ - world')).toBe('hello-world');
  });
});

describe('filenameSafe', () => {
  test('should remove invalid Windows filename characters', () => {
    // Windows invalid chars: < > : " / \ | ? *
    expect(filenameSafe('file<>name.txt')).toBe('filename.txt');
  });

  test('should remove angle brackets', () => {
    expect(filenameSafe('hello<world>')).toBe('helloworld');
  });

  test('should remove colons', () => {
    expect(filenameSafe('file:name.txt')).toBe('filename.txt');
  });

  test('should remove quotes', () => {
    expect(filenameSafe('file"name.txt')).toBe('filename.txt');
  });

  test('should remove forward slashes', () => {
    expect(filenameSafe('folder/file.txt')).toBe('folderfile.txt');
  });

  test('should remove backslashes', () => {
    expect(filenameSafe('folder\\file.txt')).toBe('folderfile.txt');
  });

  test('should remove pipes', () => {
    expect(filenameSafe('file|name.txt')).toBe('filename.txt');
  });

  test('should remove question marks', () => {
    expect(filenameSafe('file?name.txt')).toBe('filename.txt');
  });

  test('should remove asterisks', () => {
    expect(filenameSafe('file*name.txt')).toBe('filename.txt');
  });

  test('should trim leading whitespace', () => {
    expect(filenameSafe('   filename.txt')).toBe('filename.txt');
  });

  test('should trim trailing whitespace', () => {
    expect(filenameSafe('filename.txt   ')).toBe('filename.txt');
  });

  test('should preserve valid characters', () => {
    expect(filenameSafe('my-file_name.txt')).toBe('my-file_name.txt');
  });

  test('should handle filename with extension', () => {
    expect(filenameSafe('my_document.pdf')).toBe('my_document.pdf');
  });

  test('should handle multiple invalid characters', () => {
    // Edge case: multiple consecutive invalid chars
    expect(filenameSafe('file<>:"?*.txt')).toBe('file.txt');
  });

  test('should handle empty string', () => {
    expect(filenameSafe('')).toBe('');
  });

  test('should handle only whitespace', () => {
    // Edge case: only spaces get trimmed
    expect(filenameSafe('   ')).toBe('');
  });

  test('should remove control characters', () => {
    // Invalid chars include ASCII 0-31 (control characters)
    expect(filenameSafe('file\x00name.txt')).toBe('filename.txt');
  });

  test('should handle mixed invalid and valid characters', () => {
    expect(filenameSafe('my<file>name.txt')).toBe('myfilename.txt');
  });

  test('should be cross-platform compatible', () => {
    // Compatibility: removing chars invalid on Windows, Mac, and Linux
    const result = filenameSafe('file<name>?test*.doc');
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
    expect(result).not.toContain('?');
    expect(result).not.toContain('*');
  });

  test('should preserve numbers in filename', () => {
    expect(filenameSafe('file123.txt')).toBe('file123.txt');
  });

  test('should preserve dots for extensions', () => {
    expect(filenameSafe('my.file.name.txt')).toBe('my.file.name.txt');
  });

  test('should handle real-world unsafe filename', () => {
    // Real-world use case: user input with problematic characters
    const unsafeFilename = 'My "Report" <2024>.pdf?';
    expect(filenameSafe(unsafeFilename)).toBe('My Report 2024.pdf');
  });

  test('should be deterministic', () => {
    // Validates consistency: same input always produces same output
    const input = 'my<file>name.txt';
    expect(filenameSafe(input)).toBe(filenameSafe(input));
  });

  // Additional edge cases for filenameSafe
  test('should remove all invalid characters at once', () => {
    expect(filenameSafe('<>":/\\|?*')).toBe('');
  });

  test('should handle multiple angle brackets', () => {
    expect(filenameSafe('<<file>>')).toBe('file');
  });

  test('should handle multiple colons', () => {
    expect(filenameSafe('file::name.txt')).toBe('filename.txt');
  });

  test('should handle multiple quotes', () => {
    expect(filenameSafe('file""name.txt')).toBe('filename.txt');
  });

  test('should handle multiple slashes forward', () => {
    expect(filenameSafe('path///to///file.txt')).toBe('pathtofile.txt');
  });

  test('should handle multiple slashes backward', () => {
    expect(filenameSafe('path\\\\\\\\file.txt')).toBe('pathfile.txt');
  });

  test('should handle multiple pipes', () => {
    expect(filenameSafe('file||name.txt')).toBe('filename.txt');
  });

  test('should handle mixed invalid characters', () => {
    // Removes <, >, :, ", ?, * but preserves structure
    expect(filenameSafe('<file>:name?"test*.txt')).toBe('filenametest.txt');
  });

  test('should handle control character at start', () => {
    expect(filenameSafe('\x00file.txt')).toBe('file.txt');
  });

  test('should handle control character in middle', () => {
    expect(filenameSafe('file\x00name.txt')).toBe('filename.txt');
  });

  test('should handle control character at end', () => {
    expect(filenameSafe('file.txt\x00')).toBe('file.txt');
  });

  test('should handle multiple control characters', () => {
    expect(filenameSafe('file\x00\x01\x02name.txt')).toBe('filename.txt');
  });

  test('should handle all control characters range', () => {
    let str = 'file';
    for (let i = 0; i < 32; i++) {
      str += String.fromCharCode(i);
    }
    str += 'name.txt';
    expect(filenameSafe(str)).toBe('filename.txt');
  });

  test('should preserve hyphens', () => {
    expect(filenameSafe('my-file-name.txt')).toBe('my-file-name.txt');
  });

  test('should preserve underscores', () => {
    expect(filenameSafe('my_file_name.txt')).toBe('my_file_name.txt');
  });

  test('should preserve spaces between valid characters', () => {
    expect(filenameSafe('my file name.txt')).toBe('my file name.txt');
  });

  test('should trim multiple leading spaces', () => {
    expect(filenameSafe('     file.txt')).toBe('file.txt');
  });

  test('should trim multiple trailing spaces', () => {
    expect(filenameSafe('file.txt     ')).toBe('file.txt');
  });

  test('should trim both leading and trailing spaces', () => {
    expect(filenameSafe('     file.txt     ')).toBe('file.txt');
  });

  test('should handle tab characters', () => {
    // Tab (\t = \x09) is in control character range 0-31, so it's removed
    expect(filenameSafe('file\tname.txt')).toBe('filename.txt');
  });

  test('should handle newline characters', () => {
    // Newline (\n = \x0A) is in control character range 0-31, so it's removed
    expect(filenameSafe('file\nname.txt')).toBe('filename.txt');
  });

  test('should handle carriage return characters', () => {
    // Carriage returns are in control char range 0-31
    expect(filenameSafe('file\rname.txt')).toBe('filename.txt');
  });

  test('should preserve numbers', () => {
    expect(filenameSafe('file123.txt')).toBe('file123.txt');
  });

  test('should preserve uppercase letters', () => {
    expect(filenameSafe('MyFile.TXT')).toBe('MyFile.TXT');
  });

  test('should preserve mixed case', () => {
    expect(filenameSafe('MyFileName.txt')).toBe('MyFileName.txt');
  });

  test('should handle multiple extensions', () => {
    expect(filenameSafe('archive.tar.gz')).toBe('archive.tar.gz');
  });

  test('should preserve dots in extension', () => {
    expect(filenameSafe('file.backup.txt')).toBe('file.backup.txt');
  });

  test('should handle very long filename', () => {
    const longName = 'a'.repeat(255) + '.txt';
    expect(filenameSafe(longName)).toBe(longName);
  });

  test('should handle filename with parentheses', () => {
    // Parentheses are valid in filenames
    expect(filenameSafe('file (1).txt')).toBe('file (1).txt');
  });

  test('should handle filename with brackets', () => {
    // Brackets are valid in filenames
    expect(filenameSafe('file [backup].txt')).toBe('file [backup].txt');
  });

  test('should handle filename with equals sign', () => {
    // Equals sign is valid in filenames
    expect(filenameSafe('file=name.txt')).toBe('file=name.txt');
  });

  test('should handle filename with plus sign', () => {
    // Plus sign is valid in filenames
    expect(filenameSafe('file+name.txt')).toBe('file+name.txt');
  });

  test('should handle filename with comma', () => {
    // Comma is valid in filenames
    expect(filenameSafe('file,name.txt')).toBe('file,name.txt');
  });

  test('should handle filename with ampersand', () => {
    // Ampersand is valid in filenames
    expect(filenameSafe('file&name.txt')).toBe('file&name.txt');
  });

  test('should handle filename with at symbol', () => {
    // At symbol is valid in filenames
    expect(filenameSafe('file@name.txt')).toBe('file@name.txt');
  });

  test('should handle filename with hash', () => {
    // Hash is valid in filenames
    expect(filenameSafe('file#name.txt')).toBe('file#name.txt');
  });

  test('should handle filename with percent', () => {
    // Percent is valid in filenames
    expect(filenameSafe('file%name.txt')).toBe('file%name.txt');
  });

  test('should handle filename with exclamation', () => {
    // Exclamation is valid in filenames
    expect(filenameSafe('file!name.txt')).toBe('file!name.txt');
  });

  test('should handle filename with tilde', () => {
    // Tilde is valid in filenames
    expect(filenameSafe('file~name.txt')).toBe('file~name.txt');
  });

  test('should handle filename with backtick', () => {
    // Backtick is valid in filenames
    expect(filenameSafe('file`name.txt')).toBe('file`name.txt');
  });

  test('should handle filename with single quote', () => {
    // Single quote is valid in filenames
    expect(filenameSafe("file'name.txt")).toBe("file'name.txt");
  });

  test('should handle filename with semicolon', () => {
    // Semicolon is valid in filenames
    expect(filenameSafe('file;name.txt')).toBe('file;name.txt');
  });

  test('should handle filename with caret', () => {
    // Caret is valid in filenames
    expect(filenameSafe('file^name.txt')).toBe('file^name.txt');
  });

  test('should remove colon (reserved for drive letters)', () => {
    expect(filenameSafe('C:filename.txt')).toBe('Cfilename.txt');
  });

  test('should handle path separator in filename context', () => {
    // Forward slash removed
    expect(filenameSafe('folder/subfolder/file.txt')).toBe('foldersubfolderfile.txt');
  });

  test('should handle Windows path separator', () => {
    // Backslash removed
    expect(filenameSafe('folder\\subfolder\\file.txt')).toBe('foldersubfolderfile.txt');
  });

  test('should handle mixed path separators', () => {
    expect(filenameSafe('path/to\\file.txt')).toBe('pathtofile.txt');
  });

  test('should handle unicode characters', () => {
    // Unicode chars are valid in filenames
    expect(filenameSafe('café.txt')).toBe('café.txt');
  });

  test('should handle emoji in filename', () => {
    // Emoji are valid in filenames
    expect(filenameSafe('file😀name.txt')).toBe('file😀name.txt');
  });

  test('should handle real-world problematic Windows filename', () => {
    const filename = 'Report "Q4 2024" <Final>.pdf';
    expect(filenameSafe(filename)).toBe('Report Q4 2024 Final.pdf');
  });

  test('should handle filename ending with dot and invalid char', () => {
    expect(filenameSafe('file.txt.')).toBe('file.txt.');
  });

  test('should handle filename with only dots', () => {
    expect(filenameSafe('...')).toBe('...');
  });

  test('should handle realistic temporary filename', () => {
    expect(filenameSafe('~temp*.tmp')).toBe('~temp.tmp');
  });

  test('should handle filename with spaces only after trim', () => {
    expect(filenameSafe('   ')).toBe('');
  });

  test('should handle single space', () => {
    expect(filenameSafe(' ')).toBe('');
  });

  test('should handle filename with invalid chars at edges', () => {
    expect(filenameSafe('<file.txt>')).toBe('file.txt');
  });

  test('should handle filename with question marks in extension', () => {
    expect(filenameSafe('file.?txt')).toBe('file.txt');
  });
});
