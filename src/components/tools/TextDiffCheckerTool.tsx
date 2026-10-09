'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { diffLines, Change } from 'diff';
import { GitCompare, Sliders } from 'lucide-react';

export const TextDiffCheckerTool: React.FC = () => {
  const [originalText, setOriginalText] = useState<string>(`// Server Configuration
const config = {
  port: 8080,
  host: "0.0.0.0",
  timeoutSeconds: 30,
  tls: {
    enabled: true,
    cert: "/etc/ssl/cert.pem"
  },
  cors: ["https://example.com"]
};`);

  const [modifiedText, setModifiedText] = useState<string>(`// Server Configuration (Updated)
const config = {
  port: 8443,
  host: "0.0.0.0",
  timeoutSeconds: 60,
  maxConcurrency: 1000,
  tls: {
    enabled: true,
    cert: "/etc/ssl/live/fullchain.pem"
  },
  cors: ["https://example.com", "https://admin.example.com"]
};`);

  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(false);

  const diffResult = diffLines(originalText, modifiedText, {
    ignoreWhitespace,
  });

  const additions = diffResult.filter((c) => c.added).reduce((acc, c) => acc + (c.count || 0), 0);
  const deletions = diffResult.filter((c) => c.removed).reduce((acc, c) => acc + (c.count || 0), 0);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="Text & Code Diff Checker"
          badge="Myers Diff Engine"
          onClear={() => {
            setOriginalText('');
            setModifiedText('');
          }}
          onSample={() => {
            setOriginalText('version = "1.0.0"\nenable_debug = true\ncache_ttl = 300');
            setModifiedText('version = "1.1.0"\nenable_debug = false\ncache_ttl = 600\nreplication = 2');
          }}
          customActions={
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-md p-0.5 bg-[#1c212a] border border-[#262d3a]">
                <button
                  type="button"
                  onClick={() => setViewMode('split')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    viewMode === 'split'
                      ? 'bg-terminal-emerald text-black font-semibold'
                      : 'text-carbon-300 hover:text-white'
                  }`}
                >
                  Split View
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('unified')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    viewMode === 'unified'
                      ? 'bg-terminal-emerald text-black font-semibold'
                      : 'text-carbon-300 hover:text-white'
                  }`}
                >
                  Unified
                </button>
              </div>

              <label className="flex items-center gap-1.5 text-xs font-mono text-carbon-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={ignoreWhitespace}
                  onChange={(e) => setIgnoreWhitespace(e.target.checked)}
                  className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
                />
                <span>Ignore Whitespace</span>
              </label>
            </div>
          }
        />

        {/* Input Text Areas */}
        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 border-b border-[#262d3a]">
          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Original (Base Version)</span>
              <span>{originalText.split('\n').length} lines</span>
            </div>
            <textarea
              value={originalText}
              onChange={(e) => setOriginalText(e.target.value)}
              rows={10}
              placeholder="Paste original content here..."
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Modified (Comparison Target)</span>
              <span>{modifiedText.split('\n').length} lines</span>
            </div>
            <textarea
              value={modifiedText}
              onChange={(e) => setModifiedText(e.target.value)}
              rows={10}
              placeholder="Paste modified content here..."
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>
        </div>

        {/* Diff Telemetry Stats */}
        <div className="p-3 bg-[#12161c] border-b border-[#262d3a] flex items-center gap-4 font-mono text-xs">
          <span className="text-carbon-400">Change Metrics:</span>
          <span className="text-emerald-400 font-semibold">+{additions} lines added</span>
          <span className="text-rose-400 font-semibold">-{deletions} lines deleted</span>
        </div>

        {/* Diff Rendering Container */}
        <div className="p-4 bg-[#090b0e] overflow-x-auto">
          <div className="font-mono text-xs rounded border border-[#262d3a] divide-y divide-[#1c212a]">
            {diffResult.map((part, index) => {
              const lines = part.value.replace(/\n$/, '').split('\n');
              return lines.map((line, lIdx) => {
                let bgClass = 'bg-[#090b0e] text-carbon-300';
                let prefix = ' ';
                let indicatorColor = 'text-carbon-500';

                if (part.added) {
                  bgClass = 'bg-emerald-950/30 text-emerald-300';
                  prefix = '+';
                  indicatorColor = 'text-emerald-500 font-bold';
                } else if (part.removed) {
                  bgClass = 'bg-rose-950/30 text-rose-300';
                  prefix = '-';
                  indicatorColor = 'text-rose-500 font-bold';
                }

                return (
                  <div key={`${index}-${lIdx}`} className={`flex px-3 py-1 items-start ${bgClass}`}>
                    <span className={`w-6 select-none ${indicatorColor}`}>{prefix}</span>
                    <pre className="font-mono text-xs whitespace-pre-wrap break-all flex-1">{line}</pre>
                  </div>
                );
              });
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
