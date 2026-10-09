import type { Metadata } from 'next';
import { HubCatalog } from '@/components/HubCatalog';
import { Terminal, Shield, Zap, Lock, Code2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'DevTools Hub - High-Performance, Privacy-First Web Utility Suite',
  description:
    'An ultra-lightweight, 100% in-memory web utility suite for software engineers. JSON tools, JWT decoder, Base64, SHA-256 hash generator, UUID v4, regex tester, and Unix timestamps with zero server exfiltration.',
  keywords: [
    'developer tools',
    'devtools hub',
    'json formatter online',
    'jwt decoder online',
    'sha256 generator',
    'uuid v4 generator',
    'base64 encode decode',
    'unix timestamp converter',
    'sql formatter',
    'regex tester'
  ],
  alternates: {
    canonical: 'https://devtools-hub.vercel.app',
  },
  openGraph: {
    title: 'DevTools Hub - Developer Utilities (Zero Exfiltration)',
    description: '20 verified high-intent utilities built for performance and security. In-memory execution.',
    url: 'https://devtools-hub.vercel.app',
    siteName: 'DevTools Hub',
    type: 'website',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevTools Hub',
    url: 'https://devtools-hub.vercel.app',
    description: 'Ultra-lightweight, privacy-first web utility suite for software engineers.',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://devtools-hub.vercel.app/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HubCatalog />
    </div>
  );
}
