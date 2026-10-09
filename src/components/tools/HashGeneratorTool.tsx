'use client';

import React, { useState, useEffect } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { Hash, Copy, Check, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const HashGeneratorTool: React.FC = () => {
  const [inputText, setInputText] = useState<string>('DevTools Hub: High-performance, privacy-first web utilities.');
  const [outputFormat, setOutputFormat] = useState<'hex' | 'base64'>('hex');
  const [hashes, setHashes] = useState<{ [algo: string]: string }>({});
  const [verifyHash, setVerifyHash] = useState<string>('');
  const [matchedAlgo, setMatchedAlgo] = useState<string | null>(null);

  const algorithms = [
    { id: 'SHA-256', name: 'SHA-256', bits: 256, secure: true, desc: 'Industry standard for TLS, signatures, and blockchain.' },
    { id: 'SHA-512', name: 'SHA-512', bits: 512, secure: true, desc: 'Maximum 512-bit collision resistance.' },
    { id: 'SHA-384', name: 'SHA-384', bits: 384, secure: true, desc: 'High-security truncated SHA-2 family digest.' },
    { id: 'SHA-1', name: 'SHA-1', bits: 160, secure: false, desc: 'Legacy digest. Theoretical collision risks; use for checksums only.' },
  ];

  const computeHashes = async () => {
    if (!inputText) {
      setHashes({});
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);
    const newHashes: { [algo: string]: string } = {};

    for (const algo of algorithms) {
      try {
        const buffer = await crypto.subtle.digest(algo.id, data);
        if (outputFormat === 'hex') {
          const hashArray = Array.from(new Uint8Array(buffer));
          newHashes[algo.id] = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        } else {
          // Base64
          const hashBytes = Array.from(new Uint8Array(buffer));
          const binary = hashBytes.map((b) => String.fromCharCode(b)).join('');
          newHashes[algo.id] = btoa(binary);
        }
      } catch (err) {
        newHashes[algo.id] = 'Error computing digest in this browser environment.';
      }
    }

    setHashes(newHashes);
  };

  useEffect(() => {
    computeHashes();
  }, [inputText, outputFormat]);

  useEffect(() => {
    if (!verifyHash.trim()) {
      setMatchedAlgo(null);
      return;
    }

    const cleanVerify = verifyHash.trim().toLowerCase();
    let found: string | null = null;
    for (const [algo, hashVal] of Object.entries(hashes)) {
      if (hashVal.toLowerCase() === cleanVerify) {
        found = algo;
        break;
      }
    }
    setMatchedAlgo(found);
  }, [verifyHash, hashes]);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="Cryptographic Hash Generator"
          badge="Web Crypto Subtle"
          onClear={() => {
            setInputText('');
            setVerifyHash('');
          }}
          onSample={() => {
            setInputText('Verify integrity of release payload: devtools-hub-v1.0.tar.gz');
          }}
          customActions={
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-carbon-400">Digest Format:</span>
              <select
                value={outputFormat}
                onChange={(e) => setOutputFormat(e.target.value as any)}
                className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 text-xs rounded px-2 py-1 outline-none"
              >
                <option value="hex">Hexadecimal (HEX)</option>
                <option value="base64">Base64</option>
              </select>
            </div>
          }
        />

        {/* Input Text Area */}
        <div className="p-4 border-b border-[#262d3a]">
          <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
            <span>Plaintext Input Payload</span>
            <span>{inputText.length} characters ({new Blob([inputText]).size} bytes)</span>
          </div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={4}
            placeholder="Type or paste text to compute cryptographic hash digests..."
            className="w-full carbon-editor p-3 rounded-md resize-y"
            spellCheck={false}
          />

          <div className="mt-2 text-[11px] font-mono text-carbon-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-terminal-emerald" />
            <span>
              <strong>Cryptographic Distinction:</strong> Hashing is a one-way deterministic mathematical digest. It is NOT encryption and cannot be reversed or decrypted.
            </span>
          </div>
        </div>

        {/* Calculated Digests Table */}
        <div className="p-4 space-y-4">
          <div className="text-xs font-mono font-semibold uppercase text-carbon-200 tracking-wider">
            Simultaneous Cryptographic Digests
          </div>

          <div className="space-y-3">
            {algorithms.map((algo) => {
              const hashValue = hashes[algo.id] || 'Computing...';
              return (
                <div
                  key={algo.id}
                  className="p-3 rounded-lg bg-[#12161c] border border-[#262d3a] hover:border-[#363f52] transition-colors"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5 font-mono">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{algo.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#1c212a] text-carbon-400 border border-[#262d3a]">
                        {algo.bits} bits
                      </span>
                      {algo.secure ? (
                        <span className="text-[10px] text-terminal-emerald flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Secure
                        </span>
                      ) : (
                        <span className="text-[10px] text-terminal-amber flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Legacy Checksum
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => navigator.clipboard.writeText(hashValue)}
                      className="text-xs text-carbon-400 hover:text-terminal-emerald flex items-center gap-1"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </button>
                  </div>

                  <div className="font-mono text-xs text-terminal-emerald break-all bg-[#090b0e] p-2 rounded border border-[#1c212a] selection:bg-terminal-emerald/30">
                    {hashValue}
                  </div>
                  <div className="mt-1 text-[10px] font-mono text-carbon-400">{algo.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Hash Verification / Checksum Matcher */}
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] p-4 font-mono text-xs">
        <h3 className="font-semibold uppercase tracking-wider text-carbon-200 mb-2 flex items-center gap-2">
          <Hash className="w-4 h-4 text-terminal-emerald" />
          Digest Comparison & Checksum Matcher
        </h3>
        <p className="text-carbon-400 text-xs mb-3">
          Paste an expected hash checksum below to verify whether it matches the current input payload.
        </p>
        <input
          type="text"
          value={verifyHash}
          onChange={(e) => setVerifyHash(e.target.value)}
          placeholder="Paste hash digest here to check against computed hashes..."
          className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2.5 outline-none focus:border-terminal-emerald"
        />

        {verifyHash && (
          <div className="mt-3">
            {matchedAlgo ? (
              <div className="p-3 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-terminal-emerald shrink-0" />
                <span>
                  <strong>MATCH VERIFIED:</strong> Input digest exactly matches the computed <strong>{matchedAlgo}</strong> hash.
                </span>
              </div>
            ) : (
              <div className="p-3 rounded bg-rose-950/30 border border-rose-800 text-rose-300 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>No match. Digest does not match any computed algorithm for the current input.</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
