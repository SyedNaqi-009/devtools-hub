import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Shield, Lock, EyeOff, Server, HardDrive, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy & Zero-Exfiltration Architecture | DevTools Hub',
  description: 'DevTools Hub data protection manifesto: Strict in-memory client-side execution, zero server logging, zero third-party telemetry.',
  alternates: {
    canonical: 'https://devtools-hub.vercel.app/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} />

      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800 text-terminal-emerald font-mono text-xs mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Zero-Data-Exfiltration Guarantee</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            Privacy Architecture & Security Manifesto
          </h1>
          <p className="text-carbon-300 text-sm mt-2 leading-relaxed">
            Effective Date: October 2026 &bull; Strict Client-Isolated Web Architecture
          </p>
        </div>

        {/* Core Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-lg bg-[#0d1015] border border-[#262d3a] space-y-2">
            <div className="flex items-center gap-2 text-terminal-emerald font-bold">
              <EyeOff className="w-4 h-4" />
              <span>Zero Analytics Exfiltration</span>
            </div>
            <p className="text-carbon-300 font-sans text-xs leading-relaxed">
              We do not track, capture, record, or transmit strings, keys, JSON payloads, or cryptographic tokens you enter into the tools.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0d1015] border border-[#262d3a] space-y-2">
            <div className="flex items-center gap-2 text-terminal-emerald font-bold">
              <HardDrive className="w-4 h-4" />
              <span>Volatile React Memory Only</span>
            </div>
            <p className="text-carbon-300 font-sans text-xs leading-relaxed">
              Payloads live entirely in volatile browser memory. Closing the browser tab or hitting clear wipes all data permanently.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0d1015] border border-[#262d3a] space-y-2">
            <div className="flex items-center gap-2 text-terminal-emerald font-bold">
              <Server className="w-4 h-4" />
              <span>No Backend Processing</span>
            </div>
            <p className="text-carbon-300 font-sans text-xs leading-relaxed">
              Every utility runs using native browser engines (Web Crypto API, TextEncoder, RegExp, V8). Zero API routes touch your raw payload.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0d1015] border border-[#262d3a] space-y-2">
            <div className="flex items-center gap-2 text-terminal-emerald font-bold">
              <Lock className="w-4 h-4" />
              <span>No Ad Trackers or Spyware</span>
            </div>
            <p className="text-carbon-300 font-sans text-xs leading-relaxed">
              Zero third-party advertising scripts, zero tracking pixels, and zero profiling beacons.
            </p>
          </div>
        </div>

        {/* Detailed Sections */}
        <section className="space-y-4 text-sm text-carbon-200 leading-relaxed border-t border-[#262d3a] pt-6">
          <h2 className="text-xl font-mono font-bold text-white">1. Client-Side Cryptographic Primitives</h2>
          <p>
            When utilizing tools such as the <strong>Hash Generator</strong>, <strong>UUID Generator</strong>, or <strong>Secure Password Generator</strong>, 
            random numbers and digests are sourced exclusively from the operating system cryptographic entropy pool via the W3C standard{' '}
            <code className="text-terminal-emerald font-mono bg-[#12161c] px-1 py-0.5 rounded">window.crypto</code> API.
          </p>

          <h2 className="text-xl font-mono font-bold text-white pt-4">2. JWT Token & Credential Safety</h2>
          <p>
            The <strong>JWT Decoder</strong> does not require, accept, or verify server private keys. It performs client-side base64url deserialization only. 
            However, as a best practice, developers are encouraged to use test or expired tokens rather than active production master tokens.
          </p>

          <h2 className="text-xl font-mono font-bold text-white pt-4">3. Local Storage & Cookies</h2>
          <p>
            DevTools Hub does not place persistent tracking cookies or store sensitive payloads in <code className="text-terminal-emerald font-mono bg-[#12161c] px-1 py-0.5 rounded">localStorage</code> or <code className="text-terminal-emerald font-mono bg-[#12161c] px-1 py-0.5 rounded">sessionStorage</code>. 
            All state is local component memory.
          </p>
        </section>
      </div>
    </div>
  );
}
