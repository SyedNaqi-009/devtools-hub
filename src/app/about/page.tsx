import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Terminal, Cpu, Zap, Shield, CheckCircle2, Award, Users, Code, Lock } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About DevTools Hub | Engineering Philosophy & Author Profile',
  description: 'Built for software engineers, DevOps specialists, and security researchers who require high-performance, in-browser web utilities with zero telemetry or data exfiltration.',
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
            Ultra-fast, dependable developer utilities built on Next.js 14, native Web APIs, and the Carbon Engineering aesthetic.
          </p>
        </div>

        {/* Mission Statement */}
        <section className="space-y-4 text-sm text-carbon-200 leading-relaxed">
          <h2 className="text-xl font-mono font-bold text-white">Our Mission</h2>
          <p>
            Developer tools on the web frequently suffer from bloated bundles, intrusive popups, deceptive download buttons, and questionable privacy models that transmit user code, private keys, or JSON payloads to remote servers.
          </p>
          <p>
            <strong>DevTools Hub</strong> was engineered to solve this problem. Every tool on this platform executes <strong>100% inside your local web browser</strong> using native V8 JavaScript engines, Web Crypto APIs, and the Myers diffing algorithm. Zero bytes of your input data ever leave your machine.
          </p>

          <h2 className="text-xl font-mono font-bold text-white pt-4">Engineering Standards</h2>
          <div className="space-y-3 font-mono text-xs">
            <div className="p-3.5 rounded bg-[#0d1015] border border-[#262d3a] flex items-start gap-2.5">
              <Lock className="w-4 h-4 text-terminal-emerald shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Strict Client Isolation:</strong> Every hashing, formatting, encoding, and regex operation executes in volatile browser memory. We maintain zero backend logging pipelines.
              </div>
            </div>
            <div className="p-3.5 rounded bg-[#0d1015] border border-[#262d3a] flex items-start gap-2.5">
              <Zap className="w-4 h-4 text-terminal-amber shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Zero Token Waste:</strong> No heavy external web fonts, no unoptimized raster graphics, and no intrusive popups or deceptive advertisements.
              </div>
            </div>
            <div className="p-3.5 rounded bg-[#0d1015] border border-[#262d3a] flex items-start gap-2.5">
              <Code className="w-4 h-4 text-terminal-cyan shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Standard Specifications:</strong> Compliant with RFC 8259 (JSON), RFC 4180 (CSV), RFC 4122 (UUID v4), RFC 4648 (Base64), and RFC 7519 (JWT).
              </div>
            </div>
          </div>

          <h2 className="text-xl font-mono font-bold text-white pt-4">Team & Maintainer Transparency</h2>
          <p>
            DevTools Hub is developed and maintained by independent systems engineers dedicated to building clean, accessible open-source developer tooling. 
            For technical inquiries, feature suggestions, or security vulnerability reports, please visit our{' '}
            <Link href="/contact" className="text-terminal-emerald hover:underline">
              Contact Page
            </Link>{' '}
            or review our{' '}
            <Link href="/privacy" className="text-terminal-emerald hover:underline">
              Privacy Policy
            </Link>.
          </p>

          <div className="pt-6 border-t border-[#262d3a] flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-terminal-emerald text-black font-mono text-xs font-bold hover:bg-emerald-400 transition-colors"
            >
              <span>Explore All 20 Utilities</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#12161c] text-white border border-[#262d3a] font-mono text-xs font-bold hover:bg-[#1c212a] transition-colors"
            >
              <span>Read Technical Articles</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
