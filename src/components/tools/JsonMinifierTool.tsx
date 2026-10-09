'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { AlertCircle, Minimize2, CheckCircle2, TrendingDown } from 'lucide-react';

export const JsonMinifierTool: React.FC = () => {
  const [input, setInput] = useState<string>(`{
  "database": "postgres_cluster_01",
  "pool": {
    "min": 5,
    "max": 50,
    "idleTimeoutMillis": 30000
  },
  "replicas": [
    { "host": "10.0.1.20", "role": "primary" },
    { "host": "10.0.1.21", "role": "standby" }
  ],
  "monitoring": {
    "enabled": true,
    "intervalSeconds": 15
  }
}`);
  const [output, setOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<{ rawBytes: number; minBytes: number; pct: number } | null>(null);

  const handleMinify = () => {
    if (!input.trim()) {
      setOutput('');
      setMetrics(null);
      setError(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);

      const rawBytes = new Blob([input]).size;
      const minBytes = new Blob([minified]).size;
      const pct = rawBytes > 0 ? Math.round(((rawBytes - minBytes) / rawBytes) * 100) : 0;

      setMetrics({ rawBytes, minBytes, pct });
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Cannot minify invalid JSON syntax');
      setOutput('');
      setMetrics(null);
    }
  };

  const handleDownload = () => {
    if (!output) return;
    const blob = new Blob([output], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'minified-payload.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="JSON Minifier & Compressor"
          badge="Payload Reducer"
          onClear={() => {
            setInput('');
            setOutput('');
            setError(null);
            setMetrics(null);
          }}
          onCopy={output ? () => navigator.clipboard.writeText(output) : undefined}
          onDownload={output ? handleDownload : undefined}
          onSample={() => {
            setInput(`{
  "api": "v2",
  "tags": ["cloud", "performance", "benchmarking"],
  "stats": {
    "hits": 149202,
    "latency_p99": 4.12
  }
}`);
            setError(null);
          }}
          customActions={
            <button
              type="button"
              onClick={handleMinify}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-terminal-emerald text-black font-semibold hover:bg-emerald-400 text-xs transition-colors"
            >
              <Minimize2 className="w-3.5 h-3.5" />
              <span>Minify JSON</span>
            </button>
          }
        />

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Formatted Input</span>
              <span>{input.length} chars</span>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              rows={14}
              placeholder="Paste JSON to minify..."
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Minified Output</span>
              <span>{output.length} chars</span>
            </div>
            <textarea
              value={output}
              readOnly
              rows={14}
              placeholder="Minified single-line JSON will appear here..."
              className="w-full carbon-editor p-3 rounded-md bg-[#090b0e] text-terminal-emerald"
              spellCheck={false}
            />
          </div>
        </div>

        {error && (
          <div className="mx-4 mb-4 p-3 rounded-md bg-rose-950/30 border border-rose-800 text-rose-300 font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {metrics && (
          <div className="border-t border-[#262d3a] p-4 bg-[#090b0e]">
            <div className="grid grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Original Payload</div>
                <div className="text-white font-semibold mt-1 text-sm">{metrics.rawBytes} bytes</div>
              </div>
              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Minified Payload</div>
                <div className="text-terminal-emerald font-semibold mt-1 text-sm">{metrics.minBytes} bytes</div>
              </div>
              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Size Reduction</div>
                <div className="text-terminal-amber font-semibold mt-1 text-sm flex items-center gap-1">
                  <TrendingDown className="w-4 h-4" />
                  <span>{metrics.pct}% Saved</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
