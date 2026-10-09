'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { AlertCircle, CheckCircle2, Minimize2, FileCode, Sliders } from 'lucide-react';

export const JsonFormatterTool: React.FC = () => {
  const [input, setInput] = useState<string>('{\n  "service": "DevTools Hub",\n  "status": "operational",\n  "uptime": 99.99,\n  "features": ["zero-exfiltration", "in-memory-v8"],\n  "nodes": [{"id": 1, "region": "us-east"}, {"id": 2, "region": "eu-central"}]\n}');
  const [indent, setIndent] = useState<'2' | '4' | 'tab'>('2');
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);
  const [stats, setStats] = useState<{ rawBytes: number; formattedBytes: number; keysCount: number } | null>(null);

  const formatJson = () => {
    if (!input.trim()) {
      setError(null);
      setStats(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const space = indent === 'tab' ? '\t' : parseInt(indent, 10);
      const formatted = JSON.stringify(parsed, null, space);
      setInput(formatted);
      setError(null);

      // Compute statistics
      const rawBytes = new Blob([input]).size;
      const formattedBytes = new Blob([formatted]).size;
      const countKeys = (obj: any): number => {
        if (typeof obj !== 'object' || obj === null) return 0;
        let count = Object.keys(obj).length;
        for (const key of Object.keys(obj)) {
          if (typeof obj[key] === 'object') {
            count += countKeys(obj[key]);
          }
        }
        return count;
      };
      setStats({ rawBytes, formattedBytes, keysCount: countKeys(parsed) });
    } catch (err: any) {
      const msg = err.message || 'Invalid JSON syntax';
      let line: number | undefined;
      let column: number | undefined;

      // Extract line and column info if available in V8 error message
      const matchPos = msg.match(/position\s+(\d+)/i);
      if (matchPos && matchPos[1]) {
        const pos = parseInt(matchPos[1], 10);
        const upToPos = input.slice(0, pos);
        const lines = upToPos.split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }
      setError({ message: msg, line, column });
    }
  };

  const minifyJson = () => {
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setInput(minified);
      setError(null);
      setStats({
        rawBytes: new Blob([input]).size,
        formattedBytes: new Blob([minified]).size,
        keysCount: stats?.keysCount || 0,
      });
    } catch (err: any) {
      setError({ message: err.message || 'Cannot minify invalid JSON' });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([input], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'formatted-output.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Workbench Card */}
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="JSON Workbench"
          badge="Live Parser"
          onClear={() => {
            setInput('');
            setError(null);
            setStats(null);
          }}
          onCopy={() => navigator.clipboard.writeText(input)}
          onDownload={handleDownload}
          onSample={() => {
            setInput('{\n  "timestamp": 1728511200,\n  "agent": "DevToolsHub/1.0",\n  "system": {\n    "environment": "production",\n    "ssl": true,\n    "version": "1.0.0"\n  },\n  "metrics": [\n    {"name": "cpu_utilization", "value": 0.24},\n    {"name": "memory_allocated_mb", "value": 512}\n  ]\n}');
            setError(null);
          }}
          customActions={
            <div className="flex items-center gap-1.5">
              <select
                value={indent}
                onChange={(e) => setIndent(e.target.value as any)}
                className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 text-xs rounded px-2 py-1 outline-none focus:border-terminal-emerald"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
                <option value="tab">Tab Indent</option>
              </select>
              <button
                type="button"
                onClick={formatJson}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-terminal-emerald text-black font-semibold hover:bg-emerald-400 transition-colors"
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>Format</span>
              </button>
              <button
                type="button"
                onClick={minifyJson}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c212a] text-carbon-200 hover:text-white border border-[#262d3a] transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Minify</span>
              </button>
            </div>
          }
        />

        <div className="p-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            rows={16}
            placeholder="Paste raw or unformatted JSON here..."
            className="w-full carbon-editor p-3 rounded-md resize-y"
            spellCheck={false}
          />

          {/* Error Banner */}
          {error && (
            <div className="mt-3 p-3 rounded-md bg-rose-950/30 border border-rose-800 text-rose-300 font-mono text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
              <div>
                <p className="font-semibold text-rose-200">Syntax Error Encountered</p>
                <p className="mt-0.5">{error.message}</p>
                {error.line && error.column && (
                  <p className="text-[11px] text-rose-400 mt-1">
                    Location: Line {error.line}, Column {error.column}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Success / Stats Telemetry */}
          {stats && !error && (
            <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Payload Size</div>
                <div className="text-white font-semibold mt-0.5">{stats.formattedBytes} bytes</div>
              </div>
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Total Keys</div>
                <div className="text-terminal-emerald font-semibold mt-0.5">{stats.keysCount}</div>
              </div>
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Indentation</div>
                <div className="text-white font-semibold mt-0.5">{indent === 'tab' ? 'Tabs' : `${indent} Spaces`}</div>
              </div>
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Integrity</div>
                <div className="text-terminal-emerald font-semibold mt-0.5 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Valid RFC 8259
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
