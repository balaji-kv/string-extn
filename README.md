# string-extn

A lightweight, TypeScript-first library for **safe and functional string manipulation**. It provides **core string utilities, functional programming helpers, and Unicode-safe operations**, designed for **Node.js and browser environments**.

---

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Core Functions](#core-functions)
  - [Functional Programming](#functional-programming)
  - [Case Conversion](#case-conversion)
  - [String Comparison & Similarity](#string-comparison--similarity)
  - [String Masking & Redaction](#string-masking--redaction)
  - [URL & Filename Safe Conversion](#url--filename-safe-conversion)
  - [String Validation](#string-validation)
  - [Unicode Operations](#unicode-operations)
- [Examples](#examples)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Features

### ✨ Core String Operations
- **trim** - Remove leading/trailing whitespace
- **pad** - Pad strings to a fixed length with custom characters
- **slice** - Extract string substrings with flexible indexing
- **repeat** - Repeat strings multiple times
- **truncate** - Truncate strings with ellipsis
- **reverse** - Reverse string character order

### 🔧 Functional Programming Helpers
- **map** - Transform each character with a function
- **filter** - Keep only characters matching a predicate
- **reduce** - Accumulate values by processing characters
- **compose** - Chain multiple functions for complex transformations

### 🔤 Case Conversion
- **toCamelCase** - Convert to camelCase from kebab-case, snake_case, or spaces
- **toKebabCase** - Convert to kebab-case from camelCase, snake_case, or spaces
- **toSnakeCase** - Convert to snake_case from camelCase, kebab-case, or spaces
- **toPascalCase** - Convert to PascalCase from any format

### 🔍 String Comparison & Similarity
- **diff** - Find character differences between two strings
- **similarity** - Calculate similarity score (0-1) using Levenshtein distance

### 🎭 String Masking & Redaction
- **mask** - Mask sensitive information keeping only last N characters visible
- **redact** - Redact portions matching regex patterns

### 🌐 URL & Filename Safe Conversion
- **slugify** - Convert to URL-friendly slug format
- **filenameSafe** - Remove invalid filesystem characters

### ✔️ String Validation (20 validators)
- Email, UUID, Numeric, URL, Hex Color, Phone Number, Date
- Strong Password, JSON, Base64, Alphabetic, Alphanumeric
- Case validators, Whitespace, Palindrome, Hexadecimal, Roman Numeral
- IPv4, IPv6 validation

### 🌍 Unicode-Safe Operations
- **lengthUnicode** - Count Unicode grapheme clusters (handles emoji with modifiers)
- **unicodeSlice** - Slice strings while respecting grapheme boundaries
- **reverseUnicode** - Reverse strings with proper emoji and combining mark support

---

## Installation

```bash
npm install string-extn
```

Or with Yarn:

```bash
yarn add string-extn
```

---

## Quick Start

### Core Functions

```typescript
import { trim, pad, slice, repeat, truncate, reverse } from 'string-extn';

trim('  hello world  ');              // "hello world"
pad('abc', 5, '-');                  // "abc--"
slice('hello', 1, 4);                // "ell"
repeat('ha', 3);                     // "hahaha"
truncate('This is a long string', 10, '...'); // "This is a ..."
reverse('hello');                    // "olleh"
```

### Functional Programming

```typescript
import { map, filter, reduce, compose } from 'string-extn';

map('abc', c => c.toUpperCase());     // "ABC"
filter('abcdef', c => 'aeiou'.includes(c)); // "ae"
reduce('abc', (acc, c) => acc + c.charCodeAt(0), 0); // 294

const shout = compose(s => s + '!', s => s.toUpperCase());
shout('hello'); // "HELLO!"
```

### Unicode-Safe Operations

```typescript
import { lengthUnicode, unicodeSlice, reverseUnicode } from 'string-extn';

const emojiStr = '👍🏽👍';
lengthUnicode(emojiStr);          // 2 (counts emoji with skin tone as 1)
unicodeSlice(emojiStr, 0, 1);     // "👍🏽"
reverseUnicode(emojiStr);         // "👍👍🏽"
```

---

## API Reference

### Core Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| `trim` | `trim(str: string): string` | Removes leading/trailing whitespace |
| `pad` | `pad(str: string, length: number, char?: string): string` | Pads string to fixed length |
| `slice` | `slice(str: string, start: number, end?: number): string` | Returns substring |
| `repeat` | `repeat(str: string, times: number): string` | Repeats string N times |
| `truncate` | `truncate(str: string, max: number): string` | Truncates with ellipsis (...) |
| `reverse` | `reverse(str: string): string` | Reverses string characters |

### Functional Programming

| Function | Signature | Description |
|----------|-----------|-------------|
| `map` | `map(str: string, fn: (c: string) => string): string` | Transforms each character |
| `filter` | `filter(str: string, fn: (c: string) => boolean): string` | Filters characters by predicate |
| `reduce` | `reduce<T>(str: string, fn: (acc: T, c: string) => T, initial: T): T` | Reduces string to accumulator value |
| `compose` | `compose(...fns: Function[]): (value: any) => any` | Composes functions right-to-left |

### Case Conversion

| Function | Signature | Description |
|----------|-----------|-------------|
| `toCamelCase` | `toCamelCase(input: string): string` | Converts to camelCase |
| `toKebabCase` | `toKebabCase(input: string): string` | Converts to kebab-case |
| `toSnakeCase` | `toSnakeCase(input: string): string` | Converts to snake_case |
| `toPascalCase` | `toPascalCase(input: string): string` | Converts to PascalCase |

### String Comparison & Similarity

| Function | Signature | Description |
|----------|-----------|-------------|
| `diff` | `diff(a: string, b: string): string[]` | Returns character differences between two strings |
| `similarity` | `similarity(a: string, b: string): number` | Returns similarity score (0-1) using Levenshtein distance |

### String Masking & Redaction

| Function | Signature | Description |
|----------|-----------|-------------|
| `mask` | `mask(input: string, visible?: number, maskChar?: string): string` | Masks string keeping last N characters visible |
| `redact` | `redact(input: string, patterns: RegExp[]): string` | Redacts portions matching regex patterns |

### URL & Filename Safe Conversion

| Function | Signature | Description |
|----------|-----------|-------------|
| `slugify` | `slugify(input: string): string` | Converts to URL-friendly slug format |
| `filenameSafe` | `filenameSafe(input: string): string` | Removes invalid filesystem characters |

### String Validation

| Function | Input | Returns | Purpose |
|----------|-------|---------|---------|
| `isEmail` | string | boolean | Validates email address format |
| `isUUID` | string | boolean | Validates UUID format (v1-v5) |
| `isNumeric` | string | boolean | Validates numeric strings |
| `isURL` | string | boolean | Validates URL format |
| `isHexColor` | string | boolean | Validates hex color codes |
| `isPhoneNumber` | string | boolean | Validates E.164 phone numbers |
| `isDate` | string | boolean | Validates date strings |
| `isStrongPassword` | string | boolean | Validates strong password criteria |
| `isJSON` | string | boolean | Validates JSON format |
| `isBase64` | string | boolean | Validates Base64 encoding |
| `isAlphabetic` | string | boolean | Validates alphabetic strings only |
| `isAlphanumeric` | string | boolean | Validates alphanumeric strings |
| `isLowerCase` | string | boolean | Validates lowercase strings |
| `isUpperCase` | string | boolean | Validates uppercase strings |
| `isWhitespace` | string | boolean | Validates whitespace-only strings |
| `isPalindrome` | string | boolean | Validates palindrome strings |
| `isHexadecimal` | string | boolean | Validates hexadecimal format |
| `isRomanNumeral` | string | boolean | Validates Roman numeral format |
| `isIPv4` | string | boolean | Validates IPv4 addresses |
| `isIPv6` | string | boolean | Validates IPv6 addresses |

### Unicode Operations

| Function | Signature | Description |
|----------|-----------|-------------|
| `lengthUnicode` | `lengthUnicode(str: string): number` | Counts Unicode grapheme clusters |
| `unicodeSlice` | `unicodeSlice(str: string, start: number, end?: number): string` | Slices by grapheme boundaries |
| `reverseUnicode` | `reverseUnicode(str: string): string` | Reverses with emoji/modifier support |

---

## Examples

### Example 1: Text Processing Pipeline

```typescript
import { trim, map, filter } from 'string-extn';

const input = '  HELLO WORLD  ';
const result = trim(input)
  .toLowerCase()
  .split(' ')
  .map(word => filter(word, c => 'aeiou'.includes(c)))
  .join(',');

console.log(result); // "e,o"
```

### Example 2: Case Conversion

```typescript
import { toCamelCase, toKebabCase, toSnakeCase, toPascalCase } from 'string-extn';

const text = 'hello-world-example';

console.log(toCamelCase(text));    // "helloWorldExample"
console.log(toKebabCase('helloWorld')); // "hello-world"
console.log(toSnakeCase('helloWorld')); // "hello_world"
console.log(toPascalCase(text));   // "HelloWorldExample"
```

### Example 3: String Similarity & Diff

```typescript
import { similarity, diff } from 'string-extn';

const str1 = 'hello';
const str2 = 'hallo';

console.log(similarity(str1, str2)); // 0.8 (80% similar - one character different)
console.log(diff('abc', 'bcd'));    // ["-a", "+d"]
```

### Example 4: Masking Sensitive Data

```typescript
import { mask, redact } from 'string-extn';

// Mask credit card
const cardNumber = '4532111111111111';
console.log(mask(cardNumber, 4)); // "············1111"

// Redact email patterns
const text = 'Contact john@example.com or jane@test.org';
console.log(redact(text, [/@\w+\.\w+/g])); // "Contact [REDACTED] or [REDACTED]"
```

### Example 5: URL & Filename Safe Conversion

```typescript
import { slugify, filenameSafe } from 'string-extn';

console.log(slugify('Hello World! Welcome'));    // "hello-world-welcome"
console.log(slugify('Café au Lait'));            // "cafe-au-lait"
console.log(filenameSafe('File<>Name?.txt'));    // "FileName.txt"
```

### Example 6: String Validation

```typescript
import { 
  isEmail, isURL, isStrongPassword, isIPv4, 
  isPalindrome, isJSON 
} from 'string-extn';

console.log(isEmail('user@example.com'));        // true
console.log(isURL('https://example.com'));       // true
console.log(isStrongPassword('MyPass@123'));     // true
console.log(isIPv4('192.168.1.1'));             // true
console.log(isPalindrome('A man a plan a canal Panama')); // true
console.log(isJSON('{"key":"value"}'));         // true
```

### Example 7: Emoji Handling with Unicode

```typescript
import { lengthUnicode, unicodeSlice, reverseUnicode } from 'string-extn';

const message = 'Hello 👨‍👩‍👧‍👦 World 🇺🇸';

console.log(lengthUnicode(message));  // Correctly counts family emoji as 1
console.log(unicodeSlice(message, 6, 8)); // "👨‍👩‍👧‍👦 "
console.log(reverseUnicode(message)); // Preserves emoji integrity
```

### Example 3: Function Composition

```typescript
import { compose } from 'string-extn';

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const addPrefix = (s: string) => 'Hello, ' + s;
const addExclamation = (s: string) => s + '!';

const greet = compose(addExclamation, addPrefix, capitalize);
console.log(greet('world')); // "Hello, World!"
```

---

## Testing

### Run the Test Suite

```bash
npm test
```

### Build the Library

```bash
npm run build
```

This generates compiled JavaScript in the `dist/` folder.

### Link Locally for Testing

```bash
# In the string-extn folder
npm link

# In your test project folder
npm link string-extn
```

---

### Development Commands

```bash
npm install     # Install dependencies
npm run build   # Build the library
npm test        # Run tests
npm link        # Link for local testing
```

---

## License

MIT © Balaji Katta Venkatarathnam

