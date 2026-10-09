export interface ToolMeta {
  id: string;
  slug: string;
  name: string;
  shortDesc: string;
  description: string;
  category: 'json-data' | 'crypto-security' | 'encoding' | 'web-system' | 'text-code';
  categoryLabel: string;
  iconName: string;
  keywords: string[];
  features: string[];
  faqs: { question: string; answer: string }[];
  usageSnippet?: string;
  relatedToolSlugs: string[];
}

export interface CategoryMeta {
  id: string;
  name: string;
  description: string;
  iconName: string;
}

export const CATEGORIES: CategoryMeta[] = [
  {
    id: 'json-data',
    name: 'JSON & Data Transformation',
    description: 'Format, validate, coerce, and serialize data structures with zero server exposure.',
    iconName: 'Braces',
  },
  {
    id: 'crypto-security',
    name: 'Cryptography & Security',
    description: 'Cryptographically secure generation, digest hashing, and JWT inspection in your browser.',
    iconName: 'ShieldCheck',
  },
  {
    id: 'encoding',
    name: 'Encoding & Decoding',
    description: 'Full UTF-8 byte stream Base64, URL component, and XML/HTML entity conversion.',
    iconName: 'Binary',
  },
  {
    id: 'web-system',
    name: 'Web, System & Time',
    description: 'High-precision epoch timestamps, cron schedule interpreters, and HTTP status diagnostics.',
    iconName: 'Clock',
  },
  {
    id: 'text-code',
    name: 'Text, Code & Formatting',
    description: 'Real-time side-by-side diffing, JavaScript regex grouping, and code minifiers.',
    iconName: 'FileCode2',
  },
];

export const TOOLS: ToolMeta[] = [
  // Category A: JSON & Data Transformation
  {
    id: 'json-formatter',
    slug: 'json-formatter',
    name: 'JSON Formatter & Validator',
    shortDesc: 'Beautify, indent, minify, and validate JSON payloads with pinpoint syntax error diagnostics.',
    description: 'Fast, secure, client-side JSON formatter and validator. Indent with 2 spaces, 4 spaces, or tabs, pinpoint exact line/column parsing issues, analyze payload byte statistics, and export valid JSON.',
    category: 'json-data',
    categoryLabel: 'JSON & Data Transformation',
    iconName: 'Braces',
    keywords: ['json formatter', 'json validator', 'beautify json', 'prettify json', 'json lint', 'parse json online'],
    features: [
      '2 spaces, 4 spaces, or Tab indentation formatting',
      'Pinpoint syntax error locator with line and column highlighting',
      'One-click minifier and payload reduction calculator',
      'Direct .json file export and clipboard sync',
      '100% private in-memory processing without server upload'
    ],
    faqs: [
      {
        question: 'Is my JSON data uploaded to an external server?',
        answer: 'No. DevTools Hub executes all parsing, linting, and formatting entirely within your browser runtime using native V8 JSON engines. No network packets containing your payload leave your machine.'
      },
      {
        question: 'How does the syntax error locator work?',
        answer: 'DevTools Hub catches parse exceptions and resolves character offsets to specific line and column coordinates, displaying the problematic fragment for immediate correction.'
      }
    ],
    relatedToolSlugs: ['json-to-csv', 'json-minifier', 'json-to-typescript']
  },
  {
    id: 'json-to-csv',
    slug: 'json-to-csv',
    name: 'JSON to CSV Converter',
    shortDesc: 'Flatten arrays and nested JSON objects into RFC 4180 compliant CSV format with live table preview.',
    description: 'Convert JSON arrays or nested object structures into clean CSV data. Features automatic nested key flattening, custom delimiter selection (comma, semicolon, tab), live grid preview, and instant CSV export.',
    category: 'json-data',
    categoryLabel: 'JSON & Data Transformation',
    iconName: 'FileSpreadsheet',
    keywords: ['json to csv', 'convert json to csv', 'flatten json', 'json export csv', 'excel from json'],
    features: [
      'Automatic flattening of deep nested objects into dot-notation headers',
      'Custom delimiter options: Comma (,), Semicolon (;), Tab (\\t)',
      'Interactive responsive tabular preview with pagination',
      'Direct .csv file download and instant clipboard copy',
      'Handles heterogeneous object arrays seamlessly'
    ],
    faqs: [
      {
        question: 'How are nested objects handled in the CSV?',
        answer: 'Nested properties are flattened using dot notation (e.g. user.address.city) so each scalar property receives its own tabular column without data truncation.'
      },
      {
        question: 'Can I export large datasets without browser freeze?',
        answer: 'Yes. Chunked array parsing generates CSV streams efficiently in client memory without thread blocking.'
      }
    ],
    relatedToolSlugs: ['csv-to-json', 'json-formatter', 'json-minifier']
  },
  {
    id: 'csv-to-json',
    slug: 'csv-to-json',
    name: 'CSV to JSON Converter',
    shortDesc: 'Parse CSV files and tabular text into structured JSON arrays with automatic type coercion.',
    description: 'High-speed CSV to JSON parser with header row detection, auto-type coercion for numbers and booleans, quote escaping, and formatted JSON output.',
    category: 'json-data',
    categoryLabel: 'JSON & Data Transformation',
    iconName: 'FileJson',
    keywords: ['csv to json', 'convert csv to json', 'csv parser', 'csv to json online', 'excel data to json'],
    features: [
      'Automatic delimiter detection (comma, semicolon, pipe, tab)',
      'Smart type coercion for integers, floats, booleans, and nulls',
      'Customizable header detection and key trimming',
      'Instant toggle between minified or beautified JSON output',
      'Direct .json file download'
    ],
    faqs: [
      {
        question: 'Does this tool preserve quotes and commas within cells?',
        answer: 'Yes. DevTools Hub adheres to RFC 4180 standards for quoted fields containing internal commas, escaped quotes, and newlines.'
      },
      {
        question: 'Will numbers like "0123" be coerced into integers?',
        answer: 'Leading-zero strings can be preserved as strings or converted depending on the strict type coercion toggle.'
      }
    ],
    relatedToolSlugs: ['json-to-csv', 'json-formatter', 'json-to-typescript']
  },
  {
    id: 'json-to-typescript',
    slug: 'json-to-typescript',
    name: 'JSON to TypeScript Interface',
    shortDesc: 'Generate clean TypeScript interfaces, type aliases, and optional field signatures from JSON.',
    description: 'Transform arbitrary JSON samples into clean, idiomatic TypeScript interfaces or type aliases. Automatically extracts nested types, detects optional fields across array items, and respects camelCase or PascalCase conventions.',
    category: 'json-data',
    categoryLabel: 'JSON & Data Transformation',
    iconName: 'Code2',
    keywords: ['json to typescript', 'json to ts', 'generate typescript types from json', 'json schema to ts', 'typescript interface generator'],
    features: [
      'Automatic type inference for primitives, unions, arrays, and nested records',
      'Configurable Root Interface name and export style',
      'Option to toggle between "interface" and "type" aliases',
      'Optional property detection across array iterations',
      'One-click copy and TypeScript file export'
    ],
    faqs: [
      {
        question: 'How are arrays of diverse objects typed?',
        answer: 'The generator inspects all objects within an array, computing union types for differing property types and marking omitted properties with optional question marks (?).'
      },
      {
        question: 'Does it create sub-interfaces for nested objects?',
        answer: 'Yes. Nested objects are decomposed into named, modular sub-interfaces for maximum code maintainability.'
      }
    ],
    relatedToolSlugs: ['json-formatter', 'csv-to-json', 'json-minifier']
  },
  {
    id: 'json-minifier',
    slug: 'json-minifier',
    name: 'JSON Minifier & Compressor',
    shortDesc: 'Strip whitespace, carriage returns, and indentation from JSON payloads with byte reduction metrics.',
    description: 'Compress and minify JSON payloads for optimal network transmission, database storage, or environment variables. Displays real-time byte count metrics, gzip estimation, and percentage reduction.',
    category: 'json-data',
    categoryLabel: 'JSON & Data Transformation',
    iconName: 'Minimize2',
    keywords: ['json minifier', 'compress json', 'minify json online', 'json payload compressor', 'reduce json size'],
    features: [
      'Instant whitespace, newline, and indentation stripping',
      'Byte reduction telemetry: Raw bytes vs Minified bytes and % saved',
      'Strict syntax validation prior to compression to avoid malformed output',
      'Instant clipboard copy and .min.json file download',
      'Zero round-trip latency; 100% client-side'
    ],
    faqs: [
      {
        question: 'Does minification alter JSON values?',
        answer: 'No. Only non-significant whitespace outside of string literals is removed. String contents, escape sequences, and numeric values remain identical.'
      },
      {
        question: 'Can this help reduce HTTP payload costs?',
        answer: 'Yes. Removing indentation typically reduces payload sizes by 25% to 50% before HTTP compression.'
      }
    ],
    relatedToolSlugs: ['json-formatter', 'json-to-csv', 'code-minifier']
  },

  // Category B: Cryptography & Security Utilities
  {
    id: 'uuid-generator',
    slug: 'uuid-generator',
    name: 'UUID v4 & Bulk Generator',
    shortDesc: 'Generate RFC 4122 compliant UUID v4 identifiers in bulk with hyphen, uppercase, and validation controls.',
    description: 'Generate single or bulk RFC 4122 version 4 UUIDs using browser-native crypto.randomUUID(). Features bulk quantity controls (1 to 500), uppercase toggles, hyphen removal, and an integrated UUID validator.',
    category: 'crypto-security',
    categoryLabel: 'Cryptography & Security',
    iconName: 'Fingerprint',
    keywords: ['uuid generator', 'uuid v4', 'guid generator', 'bulk uuid', 'rfc 4122 uuid', 'validate uuid'],
    features: [
      'RFC 4122 v4 compliant via CSPRNG crypto.randomUUID()',
      'Bulk generation up to 500 UUIDs in a single click',
      'Formatting toggles: Hyphenated vs Clean, Uppercase vs Lowercase, Braces wrapping',
      'Built-in UUID regex validation engine with version identification',
      'Instant copy individual, all, or export as .txt list'
    ],
    faqs: [
      {
        question: 'Are the generated UUIDs truly cryptographically unique?',
        answer: 'Yes. Generation utilizes the browser native crypto.randomUUID() engine backed by the operating system cryptographic entropy source, yielding an astronomically negligible collision probability.'
      },
      {
        question: 'Can I generate GUIDs for Microsoft environments?',
        answer: 'Yes. By enabling the uppercase and optional braces toggles, output matches standard Windows GUID formats.'
      }
    ],
    relatedToolSlugs: ['password-generator', 'hash-generator', 'jwt-decoder']
  },
  {
    id: 'password-generator',
    slug: 'password-generator',
    name: 'Secure Password & Passphrase Generator',
    shortDesc: 'Generate cryptographically strong passwords and multi-word passphrases with entropy metrics.',
    description: 'Generate high-entropy random passwords and memorable multi-word passphrases using Web Crypto CSPRNG (crypto.getRandomValues). Includes character set toggles, ambiguous character exclusion, and Shannon entropy scoring.',
    category: 'crypto-security',
    categoryLabel: 'Cryptography & Security',
    iconName: 'KeyRound',
    keywords: ['password generator', 'secure password generator', 'passphrase generator', 'password entropy', 'random password generator online'],
    features: [
      'CSPRNG backed by native crypto.getRandomValues',
      'Entropy calculation in bits with estimated crack-time ratings',
      'Exclusion rule for ambiguous glyphs (O vs 0, l vs 1, I)',
      'Multi-word passphrase mode with customizable delimiters',
      'Zero storage, zero logging, strictly non-retained in memory'
    ],
    faqs: [
      {
        question: 'Is any password sent across the internet?',
        answer: 'Never. The generator operates entirely inside your local browser tab using client-side JavaScript. No keys, passwords, or seeds are transmitted or stored.'
      },
      {
        question: 'What is Shannon entropy?',
        answer: 'Shannon entropy measures the uncertainty or unpredictability of the password in bits. DevTools Hub calculates entropy based on character set pool size and password length.'
      }
    ],
    relatedToolSlugs: ['uuid-generator', 'hash-generator', 'jwt-decoder']
  },
  {
    id: 'hash-generator',
    slug: 'hash-generator',
    name: 'Hash Generator (SHA-256, SHA-512, SHA-384, SHA-1)',
    shortDesc: 'Compute one-way cryptographic hash digests client-side using the native Web Crypto API.',
    description: 'Compute cryptographic hashes across SHA-256, SHA-512, SHA-384, and SHA-1 algorithms directly in your browser. Features real-time calculation, HEX and Base64 output formats, and hash comparison verification. (One-way hashing, not encryption).',
    category: 'crypto-security',
    categoryLabel: 'Cryptography & Security',
    iconName: 'Hash',
    keywords: ['sha256 generator', 'hash generator', 'sha512 generator', 'sha1 hash', 'online hash calculator', 'web crypto hash'],
    features: [
      'Native crypto.subtle.digest implementation for maximum throughput',
      'Simultaneous multi-algorithm computation (SHA-256, SHA-512, SHA-384, SHA-1)',
      'Side-by-side hash comparison for checksum and integrity verification',
      'HEX and Base64 digest representations',
      'Explicit educational notices clarifying hashing vs encryption'
    ],
    faqs: [
      {
        question: 'Is hashing the same as encryption?',
        answer: 'No. Hashing is a one-way deterministic mathematical function that produces a fixed-size digest from arbitrary input. Unlike encryption, a hash cannot be reversed or decrypted back to its original plain text.'
      },
      {
        question: 'Why is SHA-1 marked with a caution badge?',
        answer: 'SHA-1 has proven theoretical and practical collision vulnerabilities. It is provided for legacy checksum verification, but SHA-256 or SHA-512 should be chosen for secure applications.'
      }
    ],
    relatedToolSlugs: ['uuid-generator', 'password-generator', 'jwt-decoder']
  },
  {
    id: 'jwt-decoder',
    slug: 'jwt-decoder',
    name: 'JWT Decoder & Inspector',
    shortDesc: 'Decode JSON Web Tokens, inspect claims, translate timestamps, and verify expiration countdowns.',
    description: 'Inspect and debug JWT headers and payload claims without sharing sensitive security tokens. Features automated human-readable time conversion for iat, exp, and nbf claims with a live expiry countdown timer.',
    category: 'crypto-security',
    categoryLabel: 'Cryptography & Security',
    iconName: 'ShieldAlert',
    keywords: ['jwt decoder', 'decode jwt online', 'jwt inspector', 'jwt token viewer', 'json web token debugger'],
    features: [
      'Visual breakdown: Header (Algorithm & Token Type), Payload (Claims), and Signature',
      'Automatic epoch timestamp conversion for "exp", "iat", and "nbf" with local time labels',
      'Real-time live token expiry countdown or expired state indicator',
      'Strict client-side decoding with zero network exfiltration',
      'Prominent disclaimer: Client-side inspection only; does not verify signature authenticity'
    ],
    faqs: [
      {
        question: 'Does this tool verify the JWT signature?',
        answer: 'No. Signature verification requires validating against a private secret or asymmetric public key. DevTools Hub inspects the decoded header and claims payload client-side for debugging purposes.'
      },
      {
        question: 'Is my bearer token logged or cached?',
        answer: 'No. DevTools Hub operates strictly within volatile React memory. The token is never written to localStorage, cookies, or remote analytics.'
      }
    ],
    relatedToolSlugs: ['base64-encoder-decoder', 'hash-generator', 'timestamp-converter']
  },

  // Category C: Encoding & Decoding
  {
    id: 'base64-encoder-decoder',
    slug: 'base64-encoder-decoder',
    name: 'Base64 String & Text Encoder/Decoder',
    shortDesc: 'Encode and decode Base64 with full UTF-8 Unicode byte stream support and URL-safe switching.',
    description: 'Client-side Base64 string encoder and decoder. Supports comprehensive UTF-8 multi-byte characters (emojis, international alphabets) via TextEncoder/TextDecoder, standard RFC 4648 mode, and URL-safe Base64URL translation.',
    category: 'encoding',
    categoryLabel: 'Encoding & Decoding',
    iconName: 'Binary',
    keywords: ['base64 encoder', 'base64 decoder', 'base64 utf8', 'base64url', 'convert base64 online'],
    features: [
      'Full UTF-8 byte stream architecture preventing Latin-1 / ASCII truncation errors',
      'Base64URL mode switch (- and _ characters instead of + and /)',
      'Instant encode/decode swap with live byte size calculation',
      'Invalid Base64 character detector and error reporter',
      'Direct file drag & drop or text input'
    ],
    faqs: [
      {
        question: 'Why do standard atob/btoa functions fail on emojis?',
        answer: 'The legacy browser atob and btoa functions only support Latin-1 binary characters. DevTools Hub routes input through UTF-8 TextEncoder and TextDecoder byte streams, preventing character corruption.'
      },
      {
        question: 'What is Base64URL format?',
        answer: 'Base64URL replaces "+" with "-" and "/" with "_", and omits padding "=" characters, making strings safe for URL paths and query parameters.'
      }
    ],
    relatedToolSlugs: ['url-encoder-decoder', 'html-entity-encoder', 'jwt-decoder']
  },
  {
    id: 'url-encoder-decoder',
    slug: 'url-encoder-decoder',
    name: 'URL & URI Component Encoder/Decoder',
    shortDesc: 'Safely encode or decode URL components, full URIs, and query strings with parameter tables.',
    description: 'Encode and decode URI components and full URLs with high precision. Switch between encodeURIComponent and encodeURI modes, resolve percent-encoded strings, and view extracted query parameters.',
    category: 'encoding',
    categoryLabel: 'Encoding & Decoding',
    iconName: 'Link',
    keywords: ['url encoder', 'url decoder', 'encodeuricomponent online', 'url percent encoding', 'decode url parameters'],
    features: [
      'Dual mode: encodeURIComponent (query values) vs encodeURI (full URLs)',
      'Automated percent-encoding breakdown for special characters',
      'Query string breakdown into key-value parameter pairs',
      'One-click swap between encoded and decoded states',
      'Zero remote telemetry or link crawling'
    ],
    faqs: [
      {
        question: 'What is the difference between encodeURI and encodeURIComponent?',
        answer: 'encodeURI preserves structural URI characters such as "://", "/", "?", and "&". In contrast, encodeURIComponent escapes all delimiters, making it suitable for individual query string parameters.'
      },
      {
        question: 'Does this handle spaces as "+" or "%20"?',
        answer: 'Standard URI encoding uses "%20", with an option to convert spaces to "+" for application/x-www-form-urlencoded compliance.'
      }
    ],
    relatedToolSlugs: ['base64-encoder-decoder', 'url-parser', 'html-entity-encoder']
  },
  {
    id: 'html-entity-encoder',
    slug: 'html-entity-encoder',
    name: 'HTML Entity Encoder/Decoder',
    shortDesc: 'Escape and unescape HTML, XML, and special unicode entities to prevent XSS and formatting bugs.',
    description: 'Transform special characters into HTML entities (named, decimal, and hexadecimal) and reverse them back to plain text. Essential for preventing Cross-Site Scripting (XSS) when rendering untrusted code in markup.',
    category: 'encoding',
    categoryLabel: 'Encoding & Decoding',
    iconName: 'Code',
    keywords: ['html entity encoder', 'html escape', 'html unescape', 'xml entity encoder', 'prevent xss html encode'],
    features: [
      'Named entities (&amp;, &lt;, &gt;, &quot;, &apos;)',
      'Decimal (&#38;) and Hexadecimal (&#x26;) numeric entity modes',
      'Full Unicode character set escaping',
      'Instant bidirectional swap and clipboard copy',
      'Sanitization preview workbench'
    ],
    faqs: [
      {
        question: 'Why should I encode HTML entities?',
        answer: 'Encoding reserved HTML characters prevents web browsers from interpreting user strings as executable markup, mitigating XSS attacks and rendering artifacts.'
      },
      {
        question: 'Can I decode numeric HTML entities like &#65;?',
        answer: 'Yes. DevTools Hub parses named entities, decimal numeric entities, and hexadecimal entity encodings.'
      }
    ],
    relatedToolSlugs: ['base64-encoder-decoder', 'url-encoder-decoder', 'text-diff-checker']
  },

  // Category D: Web, System & Time
  {
    id: 'timestamp-converter',
    slug: 'timestamp-converter',
    name: 'Unix Timestamp Converter',
    shortDesc: 'Convert epoch seconds and milliseconds to ISO 8601, UTC, and local date formats in real time.',
    description: 'High-precision bidirectional Unix epoch timestamp converter. Convert between seconds, milliseconds, ISO 8601 strings, UTC format, and local machine timezone with a real-time running clock.',
    category: 'web-system',
    categoryLabel: 'Web, System & Time',
    iconName: 'Clock',
    keywords: ['unix timestamp converter', 'epoch to date', 'epoch converter', 'timestamp to human date', 'iso 8601 converter'],
    features: [
      'Live synchronized current Unix epoch ticker in seconds and milliseconds',
      'Bidirectional conversion: Timestamp -> Human Date, and Human Date -> Timestamp',
      'Full timezone display matrix: UTC, Local, Relative (e.g. "3 hours ago")',
      'Support for seconds (10 digits), milliseconds (13 digits), and microseconds',
      'ISO 8601 and RFC 2822 parsing'
    ],
    faqs: [
      {
        question: 'What is a Unix epoch timestamp?',
        answer: 'A Unix timestamp represents the number of seconds that have elapsed since midnight UTC on January 1, 1970 (not counting leap seconds).'
      },
      {
        question: 'How do I know if my timestamp is in seconds or milliseconds?',
        answer: 'Timestamps in seconds currently have 10 digits (e.g. 1774880000), while timestamps in milliseconds have 13 digits. DevTools Hub automatically detects the length.'
      }
    ],
    relatedToolSlugs: ['cron-expression-generator', 'url-parser', 'jwt-decoder']
  },
  {
    id: 'cron-expression-generator',
    slug: 'cron-expression-generator',
    name: 'Cron Expression Parser & Explainer',
    shortDesc: 'Break down standard 5-part cron syntax into human-readable English with upcoming run schedules.',
    description: 'Parse, describe, and construct standard 5-part cron expressions (Minute, Hour, Day of Month, Month, Day of Week). Generates an unambiguous human-readable English breakdown and forecasts the next 5 execution timestamps.',
    category: 'web-system',
    categoryLabel: 'Web, System & Time',
    iconName: 'CalendarClock',
    keywords: ['cron expression generator', 'cron parser', 'crontab generator', 'cron schedule explainer', 'cron next runs'],
    features: [
      'Visual breakdown of all 5 cron fields (Minute, Hour, Day of Month, Month, Day of Week)',
      'Clear human-readable English description of schedules',
      'Calculation of next 5 scheduled execution dates and times',
      'Preset library for common schedules (Every 5 min, Hourly, Daily at Midnight, Weekly)',
      'Interactive selector to build expressions without memorizing syntax'
    ],
    faqs: [
      {
        question: 'Which cron dialect does this tool support?',
        answer: 'DevTools Hub adheres to the standard 5-part POSIX crontab specification (Minute, Hour, Day of Month, Month, Day of Week).'
      },
      {
        question: 'How are special characters (*, /, -, ,) interpreted?',
        answer: 'Asterisks denote every interval, slashes denote step values, dashes denote ranges, and commas allow distinct values.'
      }
    ],
    relatedToolSlugs: ['timestamp-converter', 'url-parser', 'http-status-codes']
  },
  {
    id: 'url-parser',
    slug: 'url-parser',
    name: 'URL Parser & Query String Builder',
    shortDesc: 'Deconstruct URLs into protocol, host, path, port, hash, and interactive query parameter tables.',
    description: 'Deep URL analyzer and query parameter editor. Inspect protocol, hostname, port, pathname, hash, and modify query parameter key-value pairs with instant bidirectional URL reconstruction.',
    category: 'web-system',
    categoryLabel: 'Web, System & Time',
    iconName: 'Globe',
    keywords: ['url parser', 'query string builder', 'parse url online', 'url query parameter editor', 'url breakdown'],
    features: [
      'Structural breakdown: Protocol, Hostname, Port, Path, Hash, Search',
      'Interactive Query Parameter table: Add, edit, remove, and sort parameters',
      'Live synchronized URL reconstruction as you type',
      'Validation for malformed or non-standard URIs',
      'Copy clean URL, path only, or JSON query parameters'
    ],
    faqs: [
      {
        question: 'Can I add multiple parameters with the same key?',
        answer: 'Yes. URL search parameters allow duplicate keys (such as array queries ?tag=react&tag=nextjs), which DevTools Hub fully supports.'
      },
      {
        question: 'Are special characters automatically encoded when building URLs?',
        answer: 'Yes. Parameters added through the builder are encoded safely to prevent query string syntax breakage.'
      }
    ],
    relatedToolSlugs: ['url-encoder-decoder', 'http-status-codes', 'timestamp-converter']
  },
  {
    id: 'http-status-codes',
    slug: 'http-status-codes',
    name: 'HTTP Status Code Reference',
    shortDesc: 'Searchable index of 1xx–5xx HTTP status codes with semantic definitions and developer fixes.',
    description: 'Comprehensive, searchable reference directory of RFC standard HTTP response status codes (1xx Informational, 2xx Success, 3xx Redirection, 4xx Client Error, 5xx Server Error). Includes causes, caching behavior, and header recommendations.',
    category: 'web-system',
    categoryLabel: 'Web, System & Time',
    iconName: 'Network',
    keywords: ['http status codes', 'http status code reference', '404 not found', '500 internal server error', 'http codes guide'],
    features: [
      'Comprehensive catalog of RFC 7231, RFC 6585, RFC 7540 status codes',
      'Real-time filter by code, status message, category, or keyword',
      'Detailed breakdown: Semantic meaning, common causes, and developer remediation',
      'Caching specifications and idempotency flags for each status',
      'Quick-copy status constants for TypeScript and Node.js'
    ],
    faqs: [
      {
        question: 'What is the difference between 301 and 302 redirects?',
        answer: 'A 301 Moved Permanently status indicates search engines and browsers should permanently update their link targets, while 302 Found is temporary and preserves the original URL in indices.'
      },
      {
        question: 'When should I use 401 Unauthorized vs 403 Forbidden?',
        answer: 'Return 401 when authentication is missing or invalid. Return 403 when the user is authenticated but lacks required permission scopes for the resource.'
      }
    ],
    relatedToolSlugs: ['url-parser', 'url-encoder-decoder', 'cron-expression-generator']
  },

  // Category E: Text, Code & Formatting
  {
    id: 'text-diff-checker',
    slug: 'text-diff-checker',
    name: 'Text Diff Checker',
    shortDesc: 'Compare text and code with unified and split side-by-side diffing and line change highlights.',
    description: 'Compare text, JSON, configuration files, and code snippets with precision line-by-line diffing. Features side-by-side split and unified views, whitespace toggle, and added/removed line statistics.',
    category: 'text-code',
    categoryLabel: 'Text, Code & Formatting',
    iconName: 'GitCompare',
    keywords: ['text diff checker', 'diff online', 'compare text', 'side by side diff', 'code diff viewer', 'compare files'],
    features: [
      'Split side-by-side and unified stacked diff display modes',
      'Line-by-line addition, deletion, and modification highlighting',
      'Toggle ignore whitespace changes and case sensitivity',
      'Metrics dashboard: Total lines added, deleted, and unchanged',
      'Fast client-side Myers diff algorithm without data exfiltration'
    ],
    faqs: [
      {
        question: 'Are my confidential files or diffs stored?',
        answer: 'No. Diff computation runs entirely within your browser thread using an in-memory diff engine. No data is sent across the wire.'
      },
      {
        question: 'Can I compare large files?',
        answer: 'Yes. The algorithm handles multi-thousand line files smoothly without server timeouts.'
      }
    ],
    relatedToolSlugs: ['regex-tester', 'sql-formatter', 'code-minifier']
  },
  {
    id: 'regex-tester',
    slug: 'regex-tester',
    name: 'Regex Tester & Explainer',
    shortDesc: 'Test regular expressions with JavaScript engine, flag toggles, captured groups, and live match indexing.',
    description: 'Test, validate, and debug regular expressions in real time using the native ECMAScript RegExp engine. Features interactive flag toggles (g, i, m, s, u), capture group inspection, match positions, and syntax error diagnostics.',
    category: 'text-code',
    categoryLabel: 'Text, Code & Formatting',
    iconName: 'Regex',
    keywords: ['regex tester', 'regex debugger', 'javascript regular expression', 'regex online tester', 'regex capture groups'],
    features: [
      'Native ECMAScript RegExp execution with comprehensive flag controls (g, i, m, s, u)',
      'Visual match highlighting with start/end character index tracking',
      'Capture groups and named group extraction table',
      'Instant syntax validation with error message locator',
      'Cheat sheet and preset library (email, url, ipv4, dates, uuid)'
    ],
    faqs: [
      {
        question: 'Which regular expression engine is used?',
        answer: 'DevTools Hub runs the native JavaScript V8 regular expression engine, guaranteeing exact parity with browser and Node.js execution.'
      },
      {
        question: 'Can catastrophic backtracking freeze the page?',
        answer: 'Input length and execution are guarded to minimize risk, but standard regex best practices should be used when crafting complex nested quantifiers.'
      }
    ],
    relatedToolSlugs: ['text-diff-checker', 'sql-formatter', 'code-minifier']
  },
  {
    id: 'sql-formatter',
    slug: 'sql-formatter',
    name: 'SQL Formatter & Beautifier',
    shortDesc: 'Format, indent, and beautify SQL queries with keyword capitalization and dialect alignment.',
    description: 'Format unorganized SQL statements into clean, structured, readable queries. Capitalizes SQL keywords (SELECT, FROM, WHERE, JOIN), organizes subqueries, and indents clauses cleanly.',
    category: 'text-code',
    categoryLabel: 'Text, Code & Formatting',
    iconName: 'Database',
    keywords: ['sql formatter', 'format sql query', 'sql beautifier online', 'capitalize sql keywords', 'sql indent'],
    features: [
      'Automatic uppercase capitalization for ANSI and standard SQL keywords',
      'Configurable 2-space or 4-space indentation for clauses and JOINs',
      'Commas before or after clause styling options',
      'Minify SQL into a single line for migration scripts or CLI inputs',
      'Direct copy and .sql file download'
    ],
    faqs: [
      {
        question: 'Does this formatter change the logic of my query?',
        answer: 'No. The formatter purely reorganizes whitespace, line breaks, and keyword casing without altering identifiers, operators, or string literals.'
      },
      {
        question: 'Which SQL dialects are supported?',
        answer: 'Standard SQL, PostgreSQL, MySQL, SQLite, BigQuery, and SQL Server queries format cleanly using the standard clause parser.'
      }
    ],
    relatedToolSlugs: ['text-diff-checker', 'code-minifier', 'json-formatter']
  },
  {
    id: 'code-minifier',
    slug: 'code-minifier',
    name: 'CSS & JavaScript Minifier',
    shortDesc: 'Minify CSS and JavaScript by stripping comments and whitespace with payload savings metrics.',
    description: 'Quickly strip comments, carriage returns, unnecessary whitespace, and redundant characters from CSS and JavaScript files. Calculate exact byte reductions and download compressed code.',
    category: 'text-code',
    categoryLabel: 'Text, Code & Formatting',
    iconName: 'FileCode',
    keywords: ['css minifier', 'javascript minifier', 'js minifier online', 'minify css online', 'strip comments code'],
    features: [
      'Multi-language switcher: CSS and JavaScript',
      'Strips multi-line (/* */) and single-line (//) comments',
      'Removes redundant spaces, newlines, and trailing semicolons',
      'Calculates original size, minified size, and percentage reduction',
      'Instant download as .min.css or .min.js'
    ],
    faqs: [
      {
        question: 'Is this safe for production bundles?',
        answer: 'Yes for rapid optimization and quick payload reductions. For enterprise dead-code elimination and variable mangling, modern bundlers (such as Terser or esbuild) can be used alongside DevTools Hub.'
      },
      {
        question: 'Does minifying break CSS calc() expressions?',
        answer: 'The parser protects spaces around addition and subtraction operators inside CSS calc() functions where space is required by CSS specs.'
      }
    ],
    relatedToolSlugs: ['json-minifier', 'text-diff-checker', 'sql-formatter']
  }
];

export function getToolBySlug(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(categoryId: string): ToolMeta[] {
  return TOOLS.filter((t) => t.category === categoryId);
}
