import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Terminal, Cpu, Zap, Shield, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About DevTools Hub | High-Performance Engineering Utility Suite',
  description: 'Built for developers, DevOps teams, and security researchers who need fast, zero-bloat web utilities without ads or data collection.',
  alternates: {
    canonical: 'https://devtools-hub.vercel.app/about',
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <Breadcrumbs items={[{ label: 'About' }]} />

      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12161c] border border-[#262d3a] font-mono text-xs text-terminal-emerald mb-3">
            <Terminal className="w-3.5 h-3.5" />
            <span>Mission Brief & Engineering Standards</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            About DevTools Hub
          </h1>
          <p className="text-carbon-300 text-sm mt-2 leading-relaxed">
            Ultra-fast, dependable developer utilities built on Next.js 14, Web APIs, and the Carbon Engineering aesthetic.
          </p>
        </div>

        <section className="space-y-4 text-sm text-carbon-200 leading-relaxed">
          <h2 className="text-xl font-mono font-bold text-white">The Problem with Web Tools Today</h2>
          <p>
            Most online developer tool websites are plagued with invasive banner ads, slow bloated bundles, third-party user tracking, 
            and questionable privacy guarantees where proprietary source code or bearer tokens might be intercepted by external servers.
          </p>

          <h2 className="text-xl font-mono font-bold text-white pt-4">Our Core Philosophy</h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded bg-[#0d1015] border border-[#262d3a] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-terminal-emerald shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Zero Token Waste:</strong> No heavy web fonts, no bloated third-party analytics libraries, and zero 3D canvas overhead.
              </div>
            </div>
            <div className="p-3.5 rounded bg-[#0d1015] border border-[#262d3a] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-terminal-emerald shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Strict Client Isolation:</strong> Every calculation (JSON formatting, Myers text diffing, UUID generation, SHA digests) executes locally in your browser.
              </div>
            </div>
            <div className="p-3.5 rounded bg-[#0d1015] border border-[#262d3a] flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-terminal-emerald shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Zero Fake Ads:</strong> Complete software tools without deceptive clickbait placeholders or empty wireframe ad slots.
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#262d3a]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-emerald text-black font-mono text-xs font-bold hover:bg-emerald-400 transition-colors"
            >
              <span>Explore All 20 Utilities</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
