import React from 'react';
import Link from 'next/link';
import { Terminal, Shield, Lock, Cpu, Code2, ExternalLink } from 'lucide-react';
import { CATEGORIES } from '@/lib/tools-data';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#262d3a] bg-[#080a0d] text-carbon-300 font-mono text-xs mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#12161c] border border-[#262d3a] flex items-center justify-center text-terminal-emerald">
                <Terminal className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-white tracking-tight">DEVTOOLS HUB</span>
            </div>
            <p className="text-carbon-400 text-xs leading-relaxed font-sans">
              Ultra-lightweight, zero-telemetry utility workbench for software engineers, security analysts, and IT professionals.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-terminal-emerald pt-2">
              <Lock className="w-3.5 h-3.5" />
              <span>100% Client-Side In-Memory Execution</span>
            </div>
          </div>

          {/* Col 2: Categories */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 text-carbon-200">
              Tool Categories
            </h4>
            <ul className="space-y-2 text-carbon-400">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/#${cat.id}`} className="hover:text-terminal-emerald transition-colors">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources & Guides */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 text-carbon-200">
              Resources & Articles
            </h4>
            <ul className="space-y-2 text-carbon-400">
              <li>
                <Link href="/blog" className="hover:text-terminal-emerald transition-colors">
                  Engineering Blog & Guides
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-terminal-emerald transition-colors">
                  About DevTools Hub
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-terminal-emerald transition-colors">
                  Developer Support & Contact
                </Link>
              </li>
              <li>
                <span className="text-carbon-500">RFC 4122 / 4180 / 4648 Compliant</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Trust & Legal Standards */}
          <div>
            <h4 className="text-white font-semibold text-xs tracking-wider uppercase mb-3 text-carbon-200">
              Trust & Legal
            </h4>
            <div className="space-y-2 text-carbon-400">
              <div>
                <Link href="/privacy" className="hover:text-terminal-emerald transition-colors">
                  Privacy Policy (Zero Exfiltration)
                </Link>
              </div>
              <div>
                <Link href="/terms" className="hover:text-terminal-emerald transition-colors">
                  Terms & Conditions
                </Link>
              </div>
              <div>
                <Link href="/disclaimer" className="hover:text-terminal-emerald transition-colors">
                  Disclaimer & Notices
                </Link>
              </div>
              <div className="pt-2">
                <span className="inline-block px-2 py-0.5 rounded bg-[#12161c] border border-[#262d3a] text-terminal-emerald font-mono text-[10px]">
                  v1.0.0-PROD
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#1c212a] flex flex-col sm:flex-row items-center justify-between gap-4 text-carbon-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} DevTools Hub. Designed with Carbon Engineering standards.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">
              Disclaimer
            </Link>
            <Link href="/sitemap.xml" className="hover:text-white transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
