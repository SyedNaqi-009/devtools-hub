'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { TOOLS, CATEGORIES, ToolMeta } from '@/lib/tools-data';
import { ToolIcon } from '@/components/ui/ToolIcon';
import { Search, Terminal, Shield, Cpu, ArrowRight, Zap, Lock, Code2, Sparkles } from 'lucide-react';

export const HubCatalog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative pt-6 pb-12 border-b border-[#262d3a]">
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12161c] border border-[#262d3a] font-mono text-xs text-terminal-emerald">
            <span className="w-2 h-2 rounded-full bg-terminal-emerald animate-ping" />
            <span>20 Verified High-Intent Utilities &bull; Production Grade</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-tight leading-tight">
            High-Performance Developer Utilities. <br />
            <span className="text-terminal-emerald">Zero Data Exfiltration.</span>
          </h1>

          <p className="text-base sm:text-lg text-carbon-300 font-sans max-w-3xl leading-relaxed">
            DevTools Hub is an engineered web workbench for software engineers, security analysts, and IT professionals. 
            All parsing, hashing, conversion, and formatting routines execute strictly inside your local browser memory via Web Crypto, V8, and native Web APIs.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-mono text-carbon-400">
            <div className="flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-terminal-emerald" />
              <span>Strictly In-Memory Execution</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-terminal-amber" />
              <span>Sub-Millisecond Processing</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-terminal-cyan" />
              <span>Zero Tracking & No Ad Clutter</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Category Filter Toolbar */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 font-mono">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="w-4 h-4 text-carbon-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter utilities by keyword (e.g., JWT, diff, regex, sha256)..."
              className="w-full bg-[#12161c] border border-[#262d3a] rounded-lg pl-10 pr-4 py-2.5 text-xs text-white placeholder-carbon-400 outline-none focus:border-terminal-emerald transition-colors"
            />
          </div>

          <div className="text-xs text-carbon-400 flex items-center justify-end">
            <span>Showing <strong className="text-white">{filteredTools.length}</strong> of 20 utilities</span>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 font-mono text-xs">
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-terminal-emerald text-black font-semibold'
                : 'bg-[#12161c] text-carbon-300 hover:text-white border border-[#262d3a]'
            }`}
          >
            All Categories (20)
          </button>
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-md whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-terminal-emerald text-black font-semibold'
                    : 'bg-[#12161c] text-carbon-300 hover:text-white border border-[#262d3a]'
                }`}
              >
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </section>

      {/* Categorized Tools Grid */}
      {selectedCategory === 'all' && !searchQuery ? (
        <div className="space-y-12">
          {CATEGORIES.map((cat) => {
            const catTools = TOOLS.filter((t) => t.category === cat.id);
            return (
              <section key={cat.id} id={cat.id} className="space-y-4 scroll-mt-24">
                <div className="border-b border-[#262d3a] pb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded bg-[#12161c] border border-[#262d3a] flex items-center justify-center text-terminal-emerald">
                      <ToolIcon name={cat.iconName} className="w-4 h-4" />
                    </div>
                    <div>
                      <h2 className="text-base sm:text-lg font-mono font-bold text-white">
                        {cat.name}
                      </h2>
                      <p className="text-xs text-carbon-400 font-sans">{cat.description}</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-carbon-500">{catTools.length} tools</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {catTools.map((tool) => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
          {filteredTools.length === 0 && (
            <div className="col-span-full py-12 text-center font-mono text-xs text-carbon-400 bg-[#12161c] rounded-lg border border-[#262d3a]">
              No tools matching &quot;{searchQuery}&quot;. Try searching for JSON, UUID, JWT, Base64, or Hash.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ToolCard: React.FC<{ tool: ToolMeta }> = ({ tool }) => {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="group p-5 rounded-lg bg-[#0d1015] border border-[#262d3a] hover:border-terminal-emerald transition-all duration-200 flex flex-col justify-between hover:shadow-glow"
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="w-9 h-9 rounded-md bg-[#12161c] border border-[#262d3a] flex items-center justify-center text-terminal-emerald group-hover:scale-105 transition-transform">
            <ToolIcon name={tool.iconName} className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono text-carbon-400 bg-[#12161c] border border-[#262d3a] px-2 py-0.5 rounded">
            {tool.categoryLabel.split(' ')[0]}
          </span>
        </div>

        <div>
          <h3 className="font-mono text-sm font-bold text-white group-hover:text-terminal-emerald transition-colors">
            {tool.name}
          </h3>
          <p className="text-xs text-carbon-300 font-sans mt-1 line-clamp-2 leading-relaxed">
            {tool.shortDesc}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-2 border-t border-[#1c212a] flex items-center justify-between text-xs font-mono text-carbon-400 group-hover:text-terminal-emerald transition-colors">
        <span>Launch Workbench</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
