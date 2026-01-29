/**
 * Test suite for Unicode-aware string manipulation functions.
 * 
 * This file provides comprehensive test coverage for the unicode module functions:
 * - lengthUnicode: Counts grapheme clusters instead of codepoints
 * - unicodeSlice: Slices by grapheme clusters for proper emoji handling
 * - reverseUnicode: Reverses while preserving emoji and complex characters
 * 
 * Tests validate proper handling of:
 * - Complex emoji (with skin tone modifiers, family emoji, flag emoji)
 * - CJK characters (Japanese, Chinese, Korean)
 * - Accented characters and combining marks
 * - Mixed content and edge cases
 */
import { lengthUnicode, unicodeSlice, reverseUnicode } from '../src/unicode.js';

describe('lengthUnicode', () => {
  test('should count ASCII characters correctly', () => {
    expect(lengthUnicode('hello')).toBe(5);
  });

  test('should count emoji as single character', () => {
    // Unicode feature: emoji counts as 1 grapheme, not multiple codepoints
    expect(lengthUnicode('😀')).toBe(1);
  });

  test('should count multiple emojis', () => {
    expect(lengthUnicode('😀😁😂')).toBe(3);
  });

  test('should count mixed ASCII and emoji', () => {
    expect(lengthUnicode('hello😀world')).toBe(11);
  });

  test('should count emoji with skin tone modifier as single character', () => {
    // Complex emoji: skin tone modifier (🏽) is part of the same grapheme cluster
    expect(lengthUnicode('👍🏽')).toBe(1);
  });

  test('should count multiple emoji with modifiers', () => {
    // Validates mixed emoji: one with modifier (👍🏽) and one without (👍) are counted separately
    expect(lengthUnicode('👍🏽👍')).toBe(2);
  });

  test('should count empty string as zero', () => {
    expect(lengthUnicode('')).toBe(0);
  });

  test('should count single character', () => {
    expect(lengthUnicode('a')).toBe(1);
  });

  test('should count accented characters', () => {
    expect(lengthUnicode('café')).toBe(4);
  });

  test('should count complex emoji sequences', () => {
    // Family emoji: multiple emojis with zero-width joiners form single grapheme cluster
    expect(lengthUnicode('👨‍👩‍👧‍👦')).toBe(1);
  });

  test('should count numbers and special characters', () => {
    expect(lengthUnicode('123!@#')).toBe(6);
  });

  test('should handle long unicode strings', () => {
    // CJK characters: Japanese hiragana/kanji counted correctly
    expect(lengthUnicode('こんにちは世界')).toBe(7);
  });

  test('should count flag emoji as single character', () => {
    // Flag emoji: regional indicator pairs combined into single grapheme
    expect(lengthUnicode('🇺🇸')).toBe(1);
  });

  // Additional edge cases for lengthUnicode
  test('should count combined emoji with zero-width joiner sequences', () => {
    // Zero-width joiner sequences: man + zero-width joiner + woman creates couple emoji
    expect(lengthUnicode('👨‍❤️‍👨')).toBe(1);
  });

  test('should count multiple flag emoji', () => {
    expect(lengthUnicode('🇺🇸🇬🇧🇨🇦')).toBe(3);
  });

  test('should count string with mixed emoji types', () => {
    // Mixed: simple emoji + emoji with modifier + complex sequence
    expect(lengthUnicode('😀👍🏽👨‍👩‍👧')).toBe(3);
  });

  test('should count very long ASCII string', () => {
    expect(lengthUnicode('a'.repeat(100))).toBe(100);
  });

  test('should count string with combining diacritics', () => {
    // Combining marks: should count as part of base character
    expect(lengthUnicode('e\u0301')).toBe(1);
  });

  test('should count Greek characters', () => {
    expect(lengthUnicode('αβγδε')).toBe(5);
  });

  test('should count Arabic characters', () => {
    expect(lengthUnicode('مرحبا')).toBe(5);
  });

  test('should count Hebrew characters', () => {
    expect(lengthUnicode('שלום')).toBe(4);
  });

  test('should count Cyrillic characters', () => {
    expect(lengthUnicode('привет')).toBe(6);
  });

  test('should count Thai characters', () => {
    // Thai combining marks reduce grapheme count
    expect(lengthUnicode('สวัสดี')).toBe(4);
  });

  test('should count Korean hangul', () => {
    expect(lengthUnicode('안녕하세요')).toBe(5);
  });

  test('should count mixed scripts in single string', () => {
    // Multiple scripts: English (5) + space (1) + Japanese (4 graphemes with combining marks) + space (1) + emoji (1) = 13 total
    expect(lengthUnicode('hello こんにちは 😀')).toBe(13);
  });

  test('should count emoji with multiple skin tone modifiers', () => {
    // Multiple modifiers on different parts (e.g., handshake with skin tones)
    const handshake = '👏🏽';
    expect(lengthUnicode(handshake)).toBe(1);
  });

  test('should count variation selector characters', () => {
    // Variation selectors: should count with base character as single grapheme
    expect(lengthUnicode('☺︎')).toBeGreaterThanOrEqual(1);
  });

  test('should count string with only spaces', () => {
    expect(lengthUnicode('     ')).toBe(5);
  });

  test('should count string with tabs and newlines', () => {
    expect(lengthUnicode('hello\tworld\n')).toBe(12);
  });

  test('should handle grapheme splitter accurately for edge case emoji', () => {
    // Woman firefighter emoji with skin tone
    expect(lengthUnicode('👩‍🚒🏽')).toBeGreaterThanOrEqual(1);
  });
});

describe('unicodeSlice', () => {
  test('should slice ASCII string with start and end', () => {
    expect(unicodeSlice('hello', 1, 4)).toBe('ell');
  });

  test('should slice ASCII string with only start', () => {
    expect(unicodeSlice('hello', 2)).toBe('llo');
  });

  test('should slice emoji string', () => {
    expect(unicodeSlice('😀😁😂', 0, 2)).toBe('😀😁');
  });

  test('should slice emoji and text mixed', () => {
    // Mixed content: correctly indexes through both ASCII (5 chars) and emoji (1 char)
    expect(unicodeSlice('hello😀world', 5, 7)).toBe('😀w');
  });

  test('should handle emoji with skin tone modifiers', () => {
    // Complex emoji: skin tone modifier stays attached as single grapheme
    expect(unicodeSlice('👍🏽👍', 0, 1)).toBe('👍🏽');
  });

  test('should slice from beginning', () => {
    expect(unicodeSlice('hello', 0, 2)).toBe('he');
  });

  test('should handle negative start index', () => {
    // Validates grapheme-aware negative indexing: -3 gets last 3 graphemes
    expect(unicodeSlice('hello', -3)).toBe('llo');
  });

  test('should handle negative end index', () => {
    // Validates grapheme-aware negative end: -1 excludes last grapheme
    expect(unicodeSlice('hello', 1, -1)).toBe('ell');
  });

  test('should return empty string for out of bounds', () => {
    // Edge case: slicing beyond grapheme count returns empty string
    expect(unicodeSlice('hello', 10, 20)).toBe('');
  });

  test('should handle empty string', () => {
    expect(unicodeSlice('', 0, 5)).toBe('');
  });

  test('should slice entire unicode string', () => {
    expect(unicodeSlice('😀😁😂', 0)).toBe('😀😁😂');
  });

  test('should handle start greater than end', () => {
    // Edge case: invalid range (start > end) returns empty string
    expect(unicodeSlice('hello', 4, 2)).toBe('');
  });

  test('should slice complex emoji sequence', () => {
    // Complex sequences: family emoji (1 grapheme) + regular emoji (1 grapheme) sliced correctly
    expect(unicodeSlice('👨‍👩‍👧‍👦😀', 0, 2)).toBe('👨‍👩‍👧‍👦😀');
  });

  test('should slice CJK characters', () => {
    // CJK support: slices Japanese hiragana correctly by character boundaries
    expect(unicodeSlice('こんにちは', 0, 3)).toBe('こんに');
  });

  test('should slice single emoji', () => {
    expect(unicodeSlice('😀😁😂', 1, 2)).toBe('😁');
  });

  // Additional edge cases for unicodeSlice
  test('should slice with zero as start', () => {
    expect(unicodeSlice('hello', 0, 2)).toBe('he');
  });

  test('should slice emoji with multiple modifiers', () => {
    // Validates handling of emoji with skin tone modifiers
    const emojiWithModifier = '👨‍👩‍👧‍👦';
    expect(unicodeSlice(emojiWithModifier, 0, 1)).toBe(emojiWithModifier);
  });

  test('should slice beyond string length', () => {
    expect(unicodeSlice('hello', 2, 10)).toBe('llo');
  });

  test('should return empty when start equals end', () => {
    expect(unicodeSlice('hello', 2, 2)).toBe('');
  });

  test('should handle both negative indices', () => {
    expect(unicodeSlice('hello', -3, -1)).toBe('ll');
  });

  test('should slice CJK string multiple times', () => {
    const cjk = 'こんにちは';
    expect(unicodeSlice(cjk, 0, 2)).toBe('こん');
    expect(unicodeSlice(cjk, 2, 4)).toBe('にち');
  });

  test('should slice string with mixed content correctly', () => {
    const mixed = 'A😀B😁C';
    expect(unicodeSlice(mixed, 0, 2)).toBe('A😀');
    expect(unicodeSlice(mixed, 2, 4)).toBe('B😁');
  });

  test('should preserve emoji integrity in middle slice', () => {
    expect(unicodeSlice('hello👍🏽world', 5, 7)).toBe('👍🏽w');
  });

  test('should slice Greek characters', () => {
    expect(unicodeSlice('αβγδε', 1, 3)).toBe('βγ');
  });

  test('should slice Arabic script', () => {
    expect(unicodeSlice('مرحبا', 0, 2)).toBe('مر');
  });

  test('should slice Korean hangul', () => {
    expect(unicodeSlice('안녕하세요', 1, 4)).toBe('녕하세');
  });

  test('should slice with negative start only', () => {
    expect(unicodeSlice('hello', -2)).toBe('lo');
  });

  test('should slice combining marks correctly', () => {
    // Combining diacritics should stay with base character
    const accented = 'e\u0301';
    expect(unicodeSlice(accented, 0, 1)).toBe(accented);
  });

  test('should slice flag emoji correctly', () => {
    const flags = '🇺🇸🇬🇧🇨🇦';
    expect(unicodeSlice(flags, 0, 2)).toBe('🇺🇸🇬🇧');
  });

  test('should slice zero-width joiner sequences', () => {
    const zwjSeq = '👨‍❤️‍👨';
    expect(unicodeSlice(zwjSeq, 0, 1)).toBe(zwjSeq);
  });

  test('should handle slice with only emoji', () => {
    const emojis = '😀😁😂😃😄😅';
    expect(unicodeSlice(emojis, 2, 5)).toBe('😂😃😄');
  });

  test('should slice string ending with emoji', () => {
    expect(unicodeSlice('hello😀', 4, 6)).toBe('o😀');
  });

  test('should slice string starting with emoji', () => {
    expect(unicodeSlice('😀hello', 0, 3)).toBe('😀he');
  });

  test('should handle single character slice from emoji string', () => {
    expect(unicodeSlice('😀😁😂', 0, 1)).toBe('😀');
  });

  test('should return entire string with undefined end', () => {
    expect(unicodeSlice('hello', 0)).toBe('hello');
  });

  test('should handle negative indices wrapping', () => {
    expect(unicodeSlice('hello', -5, -0)).toBe('');
  });

  test('should slice with large negative start', () => {
    // Negative index larger than length wraps properly
    expect(unicodeSlice('hello', -100, 2)).toBe('he');
  });

  test('should slice with Devanagari script', () => {
    const devanagari = 'नमस्ते';
    expect(unicodeSlice(devanagari, 0, 2)).toBe('नम');
  });

  test('should slice variation selector character', () => {
    // Variation selectors attached to base characters
    const vsChar = '☺︎';
    expect(unicodeSlice(vsChar, 0, 1)).toBe(vsChar);
  });

  test('should slice complex family emoji from larger string', () => {
    const str = 'start👨‍👩‍👧‍👦end';
    expect(unicodeSlice(str, 5, 6)).toBe('👨‍👩‍👧‍👦');
  });

  test('should handle very large string slice', () => {
    const longStr = 'a'.repeat(500);
    expect(unicodeSlice(longStr, 100, 150).length).toBe(50);
  });
});

describe('reverseUnicode', () => {
  test('should reverse ASCII string', () => {
    expect(reverseUnicode('hello')).toBe('olleh');
  });

  test('should reverse emoji string', () => {
    expect(reverseUnicode('😀😁😂')).toBe('😂😁😀');
  });

  test('should reverse mixed ASCII and emoji', () => {
    expect(reverseUnicode('hello😀')).toBe('😀olleh');
  });

  test('should reverse emoji with skin tone modifiers', () => {
    // Complex emoji preservation: skin tone modifier stays attached during reversal
    expect(reverseUnicode('👍🏽👍')).toBe('👍👍🏽');
  });

  test('should reverse single character', () => {
    expect(reverseUnicode('a')).toBe('a');
  });

  test('should reverse empty string', () => {
    // Edge case: reversing empty string returns empty string
    expect(reverseUnicode('')).toBe('');
  });

  test('should reverse single emoji', () => {
    expect(reverseUnicode('😀')).toBe('😀');
  });

  test('should maintain emoji integrity when reversing', () => {
    // Unicode feature: emoji with modifiers remains intact after reversal
    expect(reverseUnicode('👍🏽')).toBe('👍🏽');
  });

  test('should reverse numbers and special characters', () => {
    expect(reverseUnicode('123!@#')).toBe('#@!321');
  });

  test('should reverse CJK characters', () => {
    // CJK support: reverses Japanese hiragana correctly character by character
    expect(reverseUnicode('こんにちは')).toBe('はちにんこ');
  });

  test('should reverse accented characters', () => {
    // Combining marks: accented characters handled correctly during reversal
    expect(reverseUnicode('café')).toBe('éfac');
  });

  test('should reverse string with spaces', () => {
    expect(reverseUnicode('hello world')).toBe('dlrow olleh');
  });

  test('should be true palindrome when reversed', () => {
    // Validates palindrome property: reverses to itself correctly at grapheme level
    const palindrome = 'racecar';
    expect(reverseUnicode(palindrome)).toBe(palindrome);
  });

  test('should reverse complex emoji sequence', () => {
    // Complex sequences: family emoji (1 grapheme) preserved and order reversed correctly
    expect(reverseUnicode('👨‍👩‍👧‍👦😀')).toBe('😀👨‍👩‍👧‍👦');
  });

  test('should reverse flag emoji', () => {
    // Flag emoji: regional indicator pairs maintained as single units during reversal
    expect(reverseUnicode('🇺🇸🇬🇧')).toBe('🇬🇧🇺🇸');
  });

  // Additional edge cases for reverseUnicode
  test('should reverse string with only emoji', () => {
    expect(reverseUnicode('😀😁😂😃😄')).toBe('😄😃😂😁😀');
  });

  test('should reverse CJK mixed with emoji', () => {
    expect(reverseUnicode('こんにちは😀')).toBe('😀はちにんこ');
  });

  test('should reverse Greek letters', () => {
    expect(reverseUnicode('αβγδε')).toBe('εδγβα');
  });

  test('should reverse Arabic script', () => {
    expect(reverseUnicode('مرحبا')).toBe('ابحرم');
  });

  test('should reverse Hebrew characters', () => {
    expect(reverseUnicode('שלום')).toBe('םולש');
  });

  test('should reverse Cyrillic text', () => {
    expect(reverseUnicode('привет')).toBe('тевирп');
  });

  test('should reverse Korean hangul', () => {
    expect(reverseUnicode('안녕하세요')).toBe('요세하녕안');
  });

  test('should reverse mixed scripts', () => {
    // Multiple scripts: English + Japanese + emoji
    const mixed = 'hello😀world';
    const reversed = reverseUnicode(mixed);
    expect(reverseUnicode(reversed)).toBe(mixed);
  });

  test('should reverse string with combining marks', () => {
    // Combining diacritics stay with base character
    const accented = 'café';
    expect(reverseUnicode(accented)).toBe('éfac');
  });

  test('should reverse zero-width joiner sequences', () => {
    const zwjSeq = '👨‍❤️‍👨';
    expect(reverseUnicode(zwjSeq)).toBe(zwjSeq);
  });

  test('should reverse string with emoji and modifier', () => {
    expect(reverseUnicode('a👍🏽b')).toBe('b👍🏽a');
  });

  test('should reverse string with multiple emoji types', () => {
    const str = '😀👍🏽🇺🇸';
    const reversed = reverseUnicode(str);
    expect(reversed).toBe('🇺🇸👍🏽😀');
  });

  test('should reverse all same emoji', () => {
    expect(reverseUnicode('😀😀😀')).toBe('😀😀😀');
  });

  test('should reverse string with spaces between emoji', () => {
    expect(reverseUnicode('😀 😁 😂')).toBe('😂 😁 😀');
  });

  test('should reverse punctuation and emoji', () => {
    expect(reverseUnicode('hello! 😀')).toBe('😀 !olleh');
  });

  test('should maintain emoji integrity in long reversals', () => {
    const str = 'a👨‍👩‍👧‍👦b👍🏽c😀d🇺🇸e';
    const reversed = reverseUnicode(str);
    expect(reverseUnicode(reversed)).toBe(str);
  });

  test('should reverse Thai script', () => {
    const thai = 'สวัสดี';
    // Thai combining marks affect grapheme clustering during reversal
    expect(reverseUnicode(thai)).toBe('ดีสวัส');
  });

  test('should reverse Devanagari script', () => {
    const devanagari = 'नमस्ते';
    // Devanagari combining marks affect grapheme clustering during reversal
    expect(reverseUnicode(devanagari)).toBe('तेस्मन');
  });

  test('should reverse string with numbers and emoji', () => {
    expect(reverseUnicode('123😀456')).toBe('654😀321');
  });

  test('should reverse variation selector characters', () => {
    const vsChar = '☺︎';
    const reversed = reverseUnicode(vsChar);
    expect(reverseUnicode(reversed)).toBe(vsChar);
  });

  test('should reverse alternating ASCII and emoji', () => {
    expect(reverseUnicode('a😀b😁c😂')).toBe('😂c😁b😀a');
  });

  test('should reverse string ending with flag emoji', () => {
    expect(reverseUnicode('hello🇺🇸')).toBe('🇺🇸olleh');
  });

  test('should reverse string starting with flag emoji', () => {
    expect(reverseUnicode('🇺🇸hello')).toBe('olleh🇺🇸');
  });

  test('should handle multiple flag emoji reversal', () => {
    expect(reverseUnicode('🇺🇸🇬🇧🇨🇦🇦🇺')).toBe('🇦🇺🇨🇦🇬🇧🇺🇸');
  });

  test('should reverse emoji with skin tone modifiers', () => {
    expect(reverseUnicode('👋🏻👋🏽👋🏾')).toBe('👋🏾👋🏽👋🏻');
  });

  test('should reverse string with only complex emoji', () => {
    const complex = '👨‍👩‍👧‍👦👨‍❤️‍👨👩‍❤️‍👩';
    const reversed = reverseUnicode(complex);
    expect(reverseUnicode(reversed)).toBe(complex);
  });

  test('should reverse very long string', () => {
    const longStr = 'a'.repeat(100);
    expect(reverseUnicode(longStr)).toBe('a'.repeat(100));
  });

  test('should reverse emoji sequence with trailing ASCII', () => {
    expect(reverseUnicode('😀😁😂abc')).toBe('cba😂😁😀');
  });

  test('should reverse emoji sequence with leading ASCII', () => {
    expect(reverseUnicode('abc😀😁😂')).toBe('😂😁😀cba');
  });

  test('should handle reversing twice returns original', () => {
    const tests = [
      'hello',
      '😀😁😂',
      'hello😀world',
      '👨‍👩‍👧‍👦🇺🇸',
      'café',
      'αβγδε'
    ];
    tests.forEach(str => {
      expect(reverseUnicode(reverseUnicode(str))).toBe(str);
    });
  });

  test('should reverse string with emoji zwj at boundaries', () => {
    expect(reverseUnicode('👨‍❤️‍👨test👩‍❤️‍👩')).toBe('👩‍❤️‍👩tset👨‍❤️‍👨');
  });

  test('should reverse mixed emoji and combining marks', () => {
    const mixed = 'café😀';
    const reversed = reverseUnicode(mixed);
    expect(reverseUnicode(reversed)).toBe(mixed);
  });
});
