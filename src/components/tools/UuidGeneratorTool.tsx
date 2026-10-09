'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { Fingerprint, Check, AlertCircle, Copy, CheckCircle2 } from 'lucide-react';

export const UuidGeneratorTool: React.FC = () => {
  const [count, setCount] = useState<number>(5);
  const [hyphens, setHyphens] = useState<boolean>(true);
  const [uppercase, setUppercase] = useState<boolean>(false);
  const [braces, setBraces] = useState<boolean>(false);
  const [uuids, setUuids] = useState<string[]>([]);
  const [validationInput, setValidationInput] = useState<string>('');
  const [validationResult, setValidationResult] = useState<{ valid: boolean; version?: number } | null>(null);

  const generateUuids = () => {
    const qty = Math.min(Math.max(1, count), 500);
    const results: string[] = [];

    for (let i = 0; i < qty; i++) {
      let id = crypto.randomUUID();
      if (!hyphens) {
        id = id.replace(/-/g, '');
      }
      if (uppercase) {
        id = id.toUpperCase();
      }
      if (braces) {
        id = `{${id}}`;
      }
      results.push(id);
    }

    setUuids(results);
  };

  // Generate initial batch on first render
  React.useEffect(() => {
    generateUuids();
  }, []);

  const validateUuid = (text: string) => {
    const clean = text.trim().replace(/[{}]/g, '');
    const standardRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-5])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const noHyphenRegex = /^[0-9a-f]{8}[0-9a-f]{4}([1-5])[0-9a-f]{3}[89ab][0-9a-f]{3}[0-9a-f]{12}$/i;

    const stdMatch = clean.match(standardRegex);
    if (stdMatch) {
      setValidationResult({ valid: true, version: parseInt(stdMatch[1], 10) });
      return;
    }

    const noHyphenMatch = clean.match(noHyphenRegex);
    if (noHyphenMatch) {
      setValidationResult({ valid: true, version: parseInt(noHyphenMatch[1], 10) });
      return;
    }

    setValidationResult({ valid: false });
  };

  const handleDownload = () => {
    if (uuids.length === 0) return;
    const blob = new Blob([uuids.join('\n')], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `uuids-${uuids.length}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="UUID v4 CSPRNG Generator"
          badge="RFC 4122"
          onClear={() => setUuids([])}
          onCopy={uuids.length > 0 ? () => navigator.clipboard.writeText(uuids.join('\n')) : undefined}
          onDownload={uuids.length > 0 ? handleDownload : undefined}
          customActions={
            <button
              type="button"
              onClick={generateUuids}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-terminal-emerald text-black font-semibold hover:bg-emerald-400 text-xs transition-colors"
            >
              <Fingerprint className="w-3.5 h-3.5" />
              <span>Generate UUIDs</span>
            </button>
          }
        />

        {/* Configuration Toolbar */}
        <div className="p-4 bg-[#12161c] border-b border-[#262d3a] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-2">
            <span className="text-carbon-300">Quantity:</span>
            <input
              type="number"
              min={1}
              max={500}
              value={count}
              onChange={(e) => setCount(parseInt(e.target.value, 10) || 1)}
              className="w-20 bg-[#1c212a] border border-[#262d3a] text-white rounded px-2 py-1 outline-none focus:border-terminal-emerald"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-1.5 text-carbon-300 cursor-pointer">
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
                className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
              />
              <span>Hyphens</span>
            </label>

            <label className="flex items-center gap-1.5 text-carbon-300 cursor-pointer">
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
                className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
              />
              <span>UPPERCASE</span>
            </label>

            <label className="flex items-center gap-1.5 text-carbon-300 cursor-pointer">
              <input
                type="checkbox"
                checked={braces}
                onChange={(e) => setBraces(e.target.checked)}
                className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
              />
              <span>{`{ Braces }`}</span>
            </label>
          </div>
        </div>

        {/* Results Container */}
        <div className="p-4">
          <div className="flex items-center justify-between text-xs font-mono text-carbon-400 mb-2">
            <span>Generated Batch ({uuids.length})</span>
            <span>crypto.randomUUID() Hardware Entropy</span>
          </div>

          <div className="space-y-1.5 max-h-96 overflow-y-auto pr-1">
            {uuids.map((id, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between px-3 py-2 rounded bg-[#12161c] border border-[#262d3a] font-mono text-xs hover:border-terminal-emerald/40 transition-colors group"
              >
                <span className="text-white selection:bg-terminal-emerald/30">{id}</span>
                <button
                  type="button"
                  onClick={() => navigator.clipboard.writeText(id)}
                  className="opacity-0 group-hover:opacity-100 text-carbon-400 hover:text-terminal-emerald p-1 rounded transition-opacity"
                  title="Copy single UUID"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* UUID Validator Workbench */}
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] p-4">
        <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-carbon-200 mb-2 flex items-center gap-2">
          <Fingerprint className="w-4 h-4 text-terminal-amber" />
          RFC 4122 UUID Format Validator
        </h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={validationInput}
            onChange={(e) => {
              setValidationInput(e.target.value);
              validateUuid(e.target.value);
            }}
            placeholder="Paste any UUID to check compliance (e.g. 550e8400-e29b-41d4-a716-446655440000)..."
            className="flex-1 bg-[#12161c] border border-[#262d3a] text-xs font-mono text-white rounded p-2.5 outline-none focus:border-terminal-emerald"
          />
        </div>

        {validationInput && validationResult && (
          <div className="mt-3">
            {validationResult.valid ? (
              <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-terminal-emerald" />
                <span>
                  Valid RFC 4122 Compliant UUID (Version {validationResult.version || 4} Detected)
                </span>
              </div>
            ) : (
              <div className="p-2.5 rounded bg-rose-950/30 border border-rose-800 text-rose-300 font-mono text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>Invalid UUID string. Must match 128-bit hexadecimal standard notation.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
