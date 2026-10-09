# DevTools Hub

> **Production-grade, privacy-first web utility suite for software engineers, security analysts, and IT professionals.** Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and native Web APIs.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![Zero Server Exfiltration](https://img.shields.io/badge/Security-100%25%20In--Memory-10b981?style=flat)](https://devtools-hub.vercel.app/privacy)

---

## 🛠️ The 20 Verified High-Intent Utilities

### Category A: JSON & Data Transformation
1. **JSON Formatter & Validator** (`/tools/json-formatter`): Indentation controls (2/4 spaces, tabs), minify, real-time syntax error locator (line/col parsing), export `.json`.
2. **JSON to CSV Converter** (`/tools/json-to-csv`): Array/nested object flattening, delimiter selector, live table preview, direct `.csv` file download.
3. **CSV to JSON Converter** (`/tools/csv-to-json`): RFC 4180 header detection, auto-type coercion (numbers/booleans), raw JSON output.
4. **JSON to TypeScript Interface** (`/tools/json-to-typescript`): Automatic type inference, interface/type export, optional field detection.
5. **JSON Minifier** (`/tools/json-minifier`): Whitespace stripper, payload size comparison (raw vs minified bytes, savings percentage).

### Category B: Cryptography & Security Utilities
6. **UUID v4 & Bulk Generator** (`/tools/uuid-generator`): RFC 4122 compliant via `crypto.randomUUID()`, bulk generation (1-500), hyphenated/uppercase toggles, UUID validator.
7. **Secure Password & Passphrase Generator** (`/tools/password-generator`): Cryptographically secure CSPRNG (`crypto.getRandomValues`), Shannon entropy estimator, custom character rules.
8. **Hash Generator (SHA-256, SHA-512, SHA-384, SHA-1)** (`/tools/hash-generator`): Client-side Web Crypto API (`crypto.subtle.digest`), HEX and Base64 output, checksum verification matcher.
9. **JWT Decoder & Inspector** (`/tools/jwt-decoder`): Header & payload breakdown, human-readable claim translation (`iat`, `exp`, `nbf` formatted to local time + expiry countdown). Explicit client-side debugging disclaimer.

### Category C: Encoding & Decoding
10. **Base64 String & Text Encoder/Decoder** (`/tools/base64-encoder-decoder`): Full UTF-8 Unicode support via `TextEncoder`/`TextDecoder`, URL-safe Base64 mode switch.
11. **URL & URI Component Encoder/Decoder** (`/tools/url-encoder-decoder`): Standard encoding (`encodeURIComponent`) vs full URI encoding (`encodeURI`), query string parameter extraction.
12. **HTML Entity Encoder/Decoder** (`/tools/html-entity-encoder`): Escape/unescape special XML/HTML entities (`&`, `<`, `>`, `"`, `'`, Unicode numeric entities).

### Category D: Web, System & Time
13. **Unix Timestamp Converter** (`/tools/timestamp-converter`): Seconds & milliseconds bidirectional converter, UTC & local timezone matrix, ISO 8601 parser, relative time countdown, live ticker.
14. **Cron Expression Parser & Explainer** (`/tools/cron-expression-generator`): Standard 5-part cron breakdown, human-readable schedule description, next 5 scheduled execution timestamps.
15. **URL Parser & Query String Builder** (`/tools/url-parser`): Protocol, host, path, port breakdown, query parameter key-value table editor with synchronized URL construction.
16. **HTTP Status Code Reference** (`/tools/http-status-codes`): Comprehensive, searchable index of 1xx–5xx codes, semantic definitions, common developer causes, and caching behaviors.

### Category E: Text, Code & Formatting
17. **Text Diff Checker** (`/tools/text-diff-checker`): Unified and split side-by-side diffing, line-by-line comparison, syntax-neutral comparison via Myers diff algorithm.
18. **Regex Tester & Explainer** (`/tools/regex-tester`): ECMAScript V8 regex engine, flag selectors (`g`, `i`, `m`, `s`), match index grouping, capture group extraction.
19. **SQL Formatter & Beautifier** (`/tools/sql-formatter`): Keyword capitalization, clause indentation, ANSI/Postgres SQL dialect formatting.
20. **CSS & JS Minifier** (`/tools/code-minifier`): Whitespace and comment elimination, payload reducer telemetry.

---

## 🔒 Privacy & Architecture Guarantees

- **100% Client-Side In-Memory Execution**: No server routes process or store user payloads.
- **Zero-Token Waste**: No heavy web fonts, no external tracking scripts, and no unoptimized 3D or canvas bundles.
- **Pure Web APIs**: Powered by browser-native `crypto.subtle`, `crypto.randomUUID()`, `crypto.getRandomValues()`, `TextEncoder`, and `URL`.

---

## 🚀 Local Development & Production Build

```bash
# Clone the repository
git clone https://github.com/SyedNaqi-009/devtools-hub.git

# Navigate into project directory
cd devtools-hub

# Install dependencies
npm install

# Run development server
npm run dev

# Run production build (Static Optimization & Type Verification)
npm run build
```

---

## 🌐 Deployment Ready (Vercel)

This repository is optimized for one-click deployment on **Vercel** with full Static Site Generation (SSG) for all 20 tool routes, automated sitemaps, robots.txt, and OpenGraph SEO cards.
