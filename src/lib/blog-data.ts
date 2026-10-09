export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  readTime: string;
  publishedDate: string;
  category: string;
  keywords: string[];
  toolLink: {
    slug: string;
    label: string;
  };
  content: string; // Rich Markdown/HTML-compatible content structure
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'how-to-format-and-validate-json-online',
    title: 'How to Format and Validate JSON: Syntax Rules, Common Errors, and Best Practices',
    excerpt: 'A comprehensive guide to JSON RFC 8259 syntax specifications, debugging syntax errors with line/column parsing, and formatting minified payloads securely.',
    readTime: '6 min read',
    publishedDate: '2026-10-01',
    category: 'Data & Serialization',
    keywords: ['format json online', 'validate json', 'json syntax error', 'json beautifier', 'rfc 8259'],
    toolLink: {
      slug: 'json-formatter',
      label: 'Open JSON Formatter & Validator',
    },
    content: `
### Understanding RFC 8259 JSON Syntax

JavaScript Object Notation (JSON) is a lightweight, text-based data interchange format standardized under **RFC 8259** and **ECMA-404**. While simple on the surface, JSON has rigid syntactic requirements that frequently trip up engineers and automated pipelines:

1. **Strict Double Quotes**: All keys and string values must be wrapped in standard ASCII double quotes (\`"\`). Single quotes (\`'\`) or backticks (\`\`\`) cause immediate parse failure.
2. **Trailing Commas Are Forbidden**: Unlike modern JavaScript or TypeScript, JSON strictly prohibits trailing commas after the last element of an array or property in an object.
3. **Restricted Value Types**: JSON supports only six primitive and structured types: \`string\`, \`number\`, \`boolean\` (\`true\`/\`false\`), \`null\`, \`object\`, and \`array\`. \`undefined\`, functions, Symbols, and BigInts cannot be serialized into JSON.

\`\`\`json
{
  "serviceName": "api-gateway",
  "port": 8080,
  "isActive": true,
  "rateLimit": null,
  "allowedOrigins": [
    "https://example.com",
    "https://admin.example.com"
  ]
}
\`\`\`

### Common Parsing Errors & How to Debug Them

When parsing fails in Node.js or browser V8 engines (\`JSON.parse\`), developers often see cryptic error messages such as:
- \`Unexpected token ' in JSON at position 12\` — Indicates unquoted keys or single quotes.
- \`Unexpected token } in JSON at position 98\` — Usually caused by a trailing comma before the closing brace.
- \`Unexpected number in JSON at position 45\` — Caused by numbers with leading zeros (e.g., \`0123\`) or unquoted hex values.

To resolve these errors quickly, a dedicated validator identifies the exact character offset, converting it into line and column coordinates so you can fix malformed configurations immediately.

### Security Concerns: Public Formatters vs. In-Memory Processing

Many third-party JSON formatters upload payloads to remote logging services, which risks leaking confidential API keys, customer PII, or internal tokens. When validating production data, always ensure your formatting utility executes **100% in-browser memory** without network exfiltration.
    `,
  },
  {
    slug: 'json-vs-yaml-data-serialization-guide',
    title: 'JSON vs YAML: Architecture, Syntax Comparison, and Configuration Use Cases',
    excerpt: 'Detailed technical analysis of JSON vs YAML: parser complexity, human readability, schema safety, and when to choose each for APIs, Kubernetes, and CI/CD pipelines.',
    readTime: '7 min read',
    publishedDate: '2026-10-02',
    category: 'Architecture',
    keywords: ['json vs yaml', 'yaml syntax', 'kubernetes config json or yaml', 'data serialization formats'],
    toolLink: {
      slug: 'json-formatter',
      label: 'Format & Inspect JSON Structures',
    },
    content: `
### The Serialization Dilemma

Modern systems engineering relies heavily on serialization formats for data transfer and declarative configuration. The two dominant choices are **JSON (JavaScript Object Notation)** and **YAML (YAML Ain't Markup Language)**. Choosing between them requires understanding their trade-offs in readability, parsing performance, and security.

### Structural Comparison

| Feature | JSON (RFC 8259) | YAML (1.2 Spec) |
| :--- | :--- | :--- |
| **Primary Use Case** | Web APIs, network interchange | Infrastructure as Code (K8s, Docker, CI/CD) |
| **Syntactic Boundary** | Braces \`{}\`, brackets \`[]\`, commas | Significant indentation (whitespace-sensitive) |
| **Comments Support** | None (by standard spec) | Native (\`# comment\`) |
| **Parsing Speed** | Extremely high (native V8/SIMD) | Slower, complex multi-pass AST parsing |
| **Security Surface** | Extremely low risk | Higher risk (custom tags, reference anchors, billion laughs attacks) |

### When to Use JSON

- **High-Throughput Network Payloads**: JSON parsers are implemented natively in C/C++ inside browsers and runtimes. Parsing JSON is orders of magnitude faster than parsing YAML.
- **Strict Data Contracts**: Lack of ambiguous type coercion (such as YAML interpreting \`no\` or \`on\` as booleans) makes JSON ideal for cross-language APIs.

### When to Use YAML

- **Human-Authored Infrastructure Files**: Kubernetes manifests, GitHub Actions workflows, and Prometheus alert rules benefit significantly from comment support and clean, brace-free layout.

\`\`\`yaml
# Kubernetes Deployment Example
apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-service
spec:
  replicas: 3
  template:
    spec:
      containers:
        - name: app
          image: registry.example.com/auth:v1.2
\`\`\`
    `,
  },
  {
    slug: 'how-to-convert-json-to-csv',
    title: 'How to Convert JSON to CSV: Flattening Nested Objects and RFC 4180 Rules',
    excerpt: 'Step-by-step technical guide for converting nested and array-based JSON structures into clean RFC 4180 CSV tables for Excel, analytics, and databases.',
    readTime: '5 min read',
    publishedDate: '2026-10-03',
    category: 'Data & Serialization',
    keywords: ['json to csv', 'convert json to csv', 'flatten nested json', 'rfc 4180 csv export'],
    toolLink: {
      slug: 'json-to-csv',
      label: 'Convert JSON to CSV Online',
    },
    content: `
### Tabular vs Hierarchical Structures

JSON is inherently hierarchical, allowing arbitrarily deep object nesting and arrays. CSV (Comma-Separated Values), on the other hand, is flat and strictly two-dimensional (rows and columns). Transforming JSON into CSV requires two critical steps:

1. **Object Flattening**: Resolving nested keys into single column headers using dot notation.
2. **Escaping Special Characters**: Adhering to the **RFC 4180** standard for commas, newlines, and quotes within cells.

### Flattening Nested Properties

Consider this nested user record:

\`\`\`json
[
  {
    "id": 101,
    "user": {
      "name": "Sarah Connor",
      "contact": { "email": "sarah@cyberdyne.org" }
    },
    "roles": ["admin", "auditor"]
  }
]
\`\`\`

When converted to CSV, nested keys are flattened using dot notation:

\`\`\`csv
id,user.name,user.contact.email,roles
101,"Sarah Connor","sarah@cyberdyne.org","[""admin"",""auditor""]"
\`\`\`

### RFC 4180 Escaping Rules

- If a cell contains a delimiter (e.g., comma \`,\`), a newline (\`\\n\`), or quotation marks (\`"\`), the entire cell must be enclosed in double quotes.
- Internal quotation marks must be escaped by doubling them (e.g., \`"Hello ""World"""\`).

Our built-in **JSON to CSV Converter** automates this entire flattening and escaping workflow in client memory with an interactive table preview.
    `,
  },
  {
    slug: 'base64-encoding-explained-utf8-unicode',
    title: 'Base64 Encoding Explained: Binary Streams, UTF-8 Support, and Base64URL',
    excerpt: 'Understand how Base64 converts 8-bit binary streams into 6-bit ASCII radix-64 glyphs, why legacy atob/btoa fails on UTF-8, and how URL-safe Base64 operates.',
    readTime: '6 min read',
    publishedDate: '2026-10-04',
    category: 'Encoding & Cryptography',
    keywords: ['base64 encoding explained', 'base64 utf-8', 'base64url', 'atob btoa unicode'],
    toolLink: {
      slug: 'base64-encoder-decoder',
      label: 'Open Base64 Encoder/Decoder',
    },
    content: `
### What is Base64 Encoding?

Base64 is a binary-to-text encoding scheme defined in **RFC 4648**. It represents binary data in an ASCII string format by translating 24 bits of input (three 8-bit bytes) into four 6-bit numbers, which are then mapped to a 64-character alphabet:

- Uppercase letters: \`A-Z\` (indices 0–25)
- Lowercase letters: \`a-z\` (indices 26–51)
- Digits: \`0-9\` (indices 52–61)
- Symbols: \`+\` and \`/\` (indices 62 and 63)
- Padding character: \`=\` (used when input bytes are not divisible by 3)

### Why Legacy \`btoa\` and \`atob\` Break on Unicode

Many JavaScript developers encounter the infamous runtime error:
\`\`\`
Uncaught DOMException: Failed to execute 'btoa' on 'Window': The string to be encoded contains characters outside of the Latin1 range.
\`\`\`

The native browser \`btoa\` function expects 1-byte Latin-1 characters (code points 0–255). Modern applications frequently handle multi-byte Unicode strings (emojis, international characters, accented glyphs). 

To encode UTF-8 correctly, the string must first be transformed into a \`Uint8Array\` byte stream using \`TextEncoder\`:

\`\`\`typescript
// Production UTF-8 Base64 Encoding
function encodeUtf8Base64(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
\`\`\`

### Base64 vs. Base64URL

Standard Base64 contains \`+\` and \`/\`, which have reserved meanings in URL paths and query strings (e.g. \`+\` represents a space). **Base64URL** resolves this by:
- Replacing \`+\` with \`-\` (minus)
- Replacing \`/\` with \`_\` (underscore)
- Omitting trailing \`=\` padding characters
    `,
  },
  {
    slug: 'how-to-decode-and-inspect-jwt-tokens',
    title: 'How to Decode and Inspect JWT Tokens: Claims, Expiry Timestamps, and Security Risks',
    excerpt: 'Detailed breakdown of JSON Web Tokens (RFC 7519): Header, Payload, Signature, standard claims (iat, exp, nbf), and why client-side inspection requires caution.',
    readTime: '7 min read',
    publishedDate: '2026-10-05',
    category: 'Security & Auth',
    keywords: ['decode jwt', 'jwt inspector', 'jwt claims meaning', 'jwt exp claim timestamp', 'json web token structure'],
    toolLink: {
      slug: 'jwt-decoder',
      label: 'Inspect JWTs in JWT Decoder',
    },
    content: `
### Anatomy of a JSON Web Token (RFC 7519)

A JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. Every JWT consists of three distinct parts separated by dots (\`.\`):

\`\`\`
header.payload.signature
\`\`\`

1. **Header**: Contains metadata describing the cryptographic algorithm (\`alg\`, e.g., \`HS256\`, \`RS256\`) and token type (\`typ: "JWT"\`).
2. **Payload**: Contains the claims — statements about the entity (typically user identity, role assignments, and permission scopes) along with issuance metadata.
3. **Signature**: A cryptographic hash or digital signature generated by hashing the header and payload with a private secret or signing key.

### Standard Registered Claims

- **\`sub\` (Subject)**: The unique principal identifier (e.g. \`user_10928\`).
- **\`iss\` (Issuer)**: The URI or identifier of the authentication server that issued the token.
- **\`exp\` (Expiration Time)**: A Unix epoch timestamp after which the token MUST NOT be accepted.
- **\`iat\` (Issued At)**: The Unix timestamp recording when the token was created.
- **\`nbf\` (Not Before)**: The earliest time at which the token may be honored.

\`\`\`json
{
  "sub": "usr_99812",
  "name": "Marcus Aurelius",
  "roles": ["administrator"],
  "iat": 1728511200,
  "exp": 1728514800
}
\`\`\`

### Crucial Security Warning: Decoding vs. Verifying

Decoding a JWT extracts the payload data so developers can inspect claims, scopes, and expiration dates. However, **decoding does not verify that the token has not been tampered with**. 

Signature verification requires checking the signature against the issuing server's public key (for asymmetric algorithms like RS256/ES256) or shared secret (for HS256). Never grant administrative authorization based solely on decoded claims without full signature verification.
    `,
  },
  {
    slug: 'how-unix-timestamps-and-epoch-time-work',
    title: 'How Unix Timestamps Work: The 1970 Epoch, Leap Seconds, and the Year 2038 Problem',
    excerpt: 'An engineer guide to Unix epoch time, milliseconds vs seconds representations, timezones, and the impending 32-bit integer Year 2038 overflow.',
    readTime: '6 min read',
    publishedDate: '2026-10-06',
    category: 'Web, System & Time',
    keywords: ['unix timestamp', 'epoch time explained', 'year 2038 problem', 'convert epoch to date'],
    toolLink: {
      slug: 'timestamp-converter',
      label: 'Open Unix Timestamp Converter',
    },
    content: `
### What is the Unix Epoch?

The **Unix epoch** is the number of seconds that have elapsed since **January 1, 1970, at 00:00:00 Coordinated Universal Time (UTC)**, excluding leap seconds. This system, originally devised for the Unix operating system in the early 1970s, has become the global standard for timestamp coordination across distributed databases, logging platforms, and network protocols.

### 10-Digit Seconds vs. 13-Digit Milliseconds

When building web applications, a common source of bugs is mixing second-precision and millisecond-precision timestamps:

- **10 Digits (Seconds)**: Standard POSIX format used in Linux systems, databases, and JWTs (e.g. \`1728511200\`).
- **13 Digits (Milliseconds)**: Default format used in JavaScript (\`Date.now()\`, \`new Date().getTime()\`), Java, and Python high-resolution timers (e.g. \`1728511200000\`).

Passing a 10-digit timestamp into JavaScript's \`new Date(timestamp)\` will result in dates in January 1970 because JavaScript expects milliseconds. You must multiply by 1000 before parsing.

### The Year 2038 Problem (Y2038)

Legacy 32-bit operating systems and database columns store Unix epoch time as a signed 32-bit integer (\`int32\`). The maximum value of a signed 32-bit integer is:

\`\`\`
2^31 - 1 = 2,147,483,647 seconds
\`\`\`

This corresponds to **January 19, 2038, at 03:14:07 UTC**. At the next second, the value overflows to \`-2,147,483,648\`, resetting the system clock to December 13, 1901. Modern 64-bit systems (\`int64\`) eliminate this limitation, providing timestamp headroom for over 292 billion years.
    `,
  },
  {
    slug: 'sha256-vs-sha512-cryptographic-hash-functions',
    title: 'SHA-256 vs SHA-512: Cryptographic Architecture, Performance, and Security Profiles',
    excerpt: 'Detailed comparison of SHA-256 and SHA-512: Merkle-Damgard design, bit operations on 64-bit CPU architectures, collision resistance, and usage guidelines.',
    readTime: '6 min read',
    publishedDate: '2026-10-07',
    category: 'Encoding & Cryptography',
    keywords: ['sha256 vs sha512', 'cryptographic hash functions', 'sha2 family comparison', 'web crypto hash'],
    toolLink: {
      slug: 'hash-generator',
      label: 'Calculate SHA Hashes in Hash Generator',
    },
    content: `
### The SHA-2 Algorithm Family

The **Secure Hash Algorithm 2 (SHA-2)** family was designed by the National Security Agency (NSA) and published by NIST in 2001 under FIPS PUB 180-4. The two primary algorithms in this standard are **SHA-256** and **SHA-512**. Both are one-way cryptographic hash functions based on the Davies-Meyer compression construction and Merkle-Damgård structure.

### Technical Comparison

| Dimension | SHA-256 | SHA-512 |
| :--- | :--- | :--- |
| **Output Digest Length** | 256 bits (32 bytes / 64 hex characters) | 512 bits (64 bytes / 128 hex characters) |
| **Internal Word Size** | 32-bit words | 64-bit words |
| **Rounds** | 64 rounds | 80 rounds |
| **Collision Resistance** | 128 bits | 256 bits |
| **Optimal CPU Architecture** | 32-bit architectures / Embedded | 64-bit modern server CPUs |

### The 64-Bit Performance Paradox

Intuitively, one might assume that SHA-256 is faster than SHA-512 because it generates a smaller digest. However, on modern 64-bit desktop and server processors, **SHA-512 is frequently faster than SHA-256** when processing large volumes of data. 

Because SHA-512 operates natively on 64-bit words, each algorithmic round processes 8 bytes per word instead of 4 bytes. As a result, it processes 1024-bit input blocks in 80 rounds, compared to SHA-256 processing 512-bit input blocks in 64 rounds.

### Hashing vs. Encryption

Remember: **Hashing is one-way deterministic computation**. It cannot be decrypted back into plain text. For password storage, neither raw SHA-256 nor SHA-512 should be used directly; instead, slow key derivation functions like Argon2, bcrypt, or PBKDF2 must be applied to prevent GPU-accelerated brute-force attacks.
    `,
  },
  {
    slug: 'how-cron-expressions-work-schedule-guide',
    title: 'How Cron Expressions Work: 5-Part POSIX Crontab Syntax and Common Presets',
    excerpt: 'Demystifying the 5-field cron expression syntax (minute, hour, day, month, weekday), special operators (*, /, -, ,), and common schedule configurations.',
    readTime: '5 min read',
    publishedDate: '2026-10-08',
    category: 'Web, System & Time',
    keywords: ['how cron works', 'cron expression syntax', 'crontab schedule generator', '5 field cron format'],
    toolLink: {
      slug: 'cron-expression-generator',
      label: 'Build and Explain Cron Expressions',
    },
    content: `
### The 5-Part POSIX Cron Syntax

Cron is the standard background job scheduler found in Unix-like operating systems. A standard cron expression consists of five space-separated fields representing specific units of time:

\`\`\`
┌───────────── Minute (0 - 59)
│ ┌───────────── Hour (0 - 23)
│ │ ┌───────────── Day of Month (1 - 31)
│ │ │ ┌───────────── Month (1 - 12)
│ │ │ │ ┌───────────── Day of Week (0 - 6, 0 = Sunday)
│ │ │ │ │
* * * * *
\`\`\`

### Special Characters and Operators

- **Asterisk (\`*\`)**: Wildcard matching any allowed value for that field (e.g., \`* * * * *\` runs every minute).
- **Comma (\`,\`)**: Defines an explicit list of discrete values (e.g., \`0 9,17 * * *\` runs at 9:00 AM and 5:00 PM).
- **Dash (\`-\`)**: Specifies an inclusive range of values (e.g., \`0 9 * * 1-5\` runs Monday through Friday at 9:00 AM).
- **Slash (\`/\`)**: Specifies step intervals (e.g., \`*/15 * * * *\` runs every 15 minutes).

### Essential Production Presets

\`\`\`text
0 0 * * *       # Daily at midnight (00:00 UTC)
0 9 * * 1-5     # Mon-Fri at 09:00 AM
*/5 * * * *     # Every 5 minutes
0 0 1 * *       # First day of every month at midnight
0 2 * * 0       # Weekly backup every Sunday at 02:00 AM
\`\`\`

Use our interactive **Cron Expression Parser & Explainer** to verify your crontab expressions and forecast upcoming scheduled runs.
    `,
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
