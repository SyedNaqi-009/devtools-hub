'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Terminal, Shield, Cpu, Search, Menu, X, Command } from 'lucide-react';
import { TOOLS } from '@/lib/tools-data';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const pathname = usePathname();

  const filteredTools = quickSearch.trim()
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(quickSearch.toLowerCase()) ||
          t.keywords.some((k) => k.toLowerCase().includes(quickSearch.toLowerCase()))
      ).slice(0, 6)
    : [];

  return (
    <header className="sticky top-0 z-50 bg-[#0b0d10]/95 backdrop-blur border-b border-[#262d3a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-md bg-[#12161c] border border-[#262d3a] flex items-center justify-center text-terminal-emerald group-hover:border-terminal-emerald transition-colors shadow-glow">
              <Terminal className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono font-bold text-base tracking-tight text-white flex items-center gap-1.5">
                DEVTOOLS<span className="text-terminal-emerald">HUB</span>
              </span>
              <span className="block text-[10px] text-carbon-400 font-mono tracking-wider uppercase">
                ENGINEERING SUITE
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1 text-sm font-mono">
            <Link
              href="/"
              className={`px-3 py-1.5 rounded transition-colors ${
                pathname === '/'
                  ? 'text-terminal-emerald bg-[#161b22]'
                  : 'text-carbon-300 hover:text-white hover:bg-[#12161c]'
              }`}
            >
              /all-tools
            </Link>
            <Link
              href="/privacy"
              className={`px-3 py-1.5 rounded transition-colors ${
                pathname === '/privacy'
                  ? 'text-terminal-emerald bg-[#161b22]'
                  : 'text-carbon-300 hover:text-white hover:bg-[#12161c]'
              }`}
            >
              /privacy-policy
            </Link>
            <Link
              href="/about"
              className={`px-3 py-1.5 rounded transition-colors ${
                pathname === '/about'
                  ? 'text-terminal-emerald bg-[#161b22]'
                  : 'text-carbon-300 hover:text-white hover:bg-[#12161c]'
              }`}
            >
              /about
            </Link>
          </nav>
        </div>

        {/* Global Quick Search */}
        <div className="relative flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <Search className="w-4 h-4 text-carbon-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search 20 utilities (e.g. JWT, SHA256, Diff)..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
              className="w-full bg-[#12161c] border border-[#262d3a] rounded-md pl-9 pr-8 py-1.5 text-xs font-mono text-white placeholder-carbon-400 focus:outline-none focus:border-terminal-emerald transition-colors"
            />
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-mono text-carbon-400 border border-[#262d3a] px-1 rounded bg-[#0b0d10]">
              ESC
            </div>
          </div>

          {/* Quick Search Dropdown */}
          {searchFocused && filteredTools.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-[#12161c] border border-[#262d3a] rounded-md shadow-2xl p-1.5 z-50">
              <div className="text-[10px] font-mono uppercase text-carbon-400 px-2 py-1">
                Matching Utilities
              </div>
              {filteredTools.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-[#1c212a] text-xs font-mono text-carbon-100 hover:text-terminal-emerald transition-colors"
                >
                  <span>{tool.name}</span>
                  <span className="text-[10px] text-carbon-400">{tool.categoryLabel}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Right Status Badge & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded bg-[#12161c] border border-[#262d3a] text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-terminal-emerald animate-pulse" />
            <span className="text-carbon-300">Zero Server Exfiltration</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded text-carbon-300 hover:text-white hover:bg-[#12161c] border border-[#262d3a]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#262d3a] bg-[#0b0d10] px-4 py-3 space-y-2 font-mono text-sm">
          <div className="pb-2">
            <input
              type="text"
              placeholder="Search tools..."
              value={quickSearch}
              onChange={(e) => setQuickSearch(e.target.value)}
              className="w-full bg-[#12161c] border border-[#262d3a] rounded px-3 py-2 text-xs text-white"
            />
          </div>
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-carbon-200 hover:bg-[#12161c]"
          >
            All 20 Utilities
          </Link>
          <Link
            href="/privacy"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-carbon-200 hover:bg-[#12161c]"
          >
            Privacy Architecture
          </Link>
          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded text-carbon-200 hover:bg-[#12161c]"
          >
            About DevTools Hub
          </Link>
        </div>
      )}
    </header>
  );
};
