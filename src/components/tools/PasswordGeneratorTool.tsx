'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { KeyRound, Shield, RefreshCw, Copy, Check, Sliders, AlertTriangle } from 'lucide-react';

export const PasswordGeneratorTool: React.FC = () => {
  const [mode, setMode] = useState<'password' | 'passphrase'>('password');
  const [length, setLength] = useState<number>(24);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(true);

  // Passphrase options
  const [wordsCount, setWordsCount] = useState<number>(5);
  const [delimiter, setDelimiter] = useState<string>('-');

  const [password, setPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const wordlist = [
    'quantum', 'gravity', 'kernel', 'cluster', 'matrix', 'beacon', 'entropy', 'orbit',
    'tensor', 'plasma', 'nebula', 'cipher', 'vector', 'vertex', 'aurora', 'syntax',
    'socket', 'packet', 'router', 'gateway', 'binary', 'daemon', 'ledger', 'shield',
    'harbor', 'shadow', 'summit', 'falcon', 'timber', 'glacier', 'horizon', 'granite'
  ];

  const generatePassword = () => {
    if (mode === 'passphrase') {
      const selectedWords: string[] = [];
      const array = new Uint32Array(wordsCount);
      crypto.getRandomValues(array);
      for (let i = 0; i < wordsCount; i++) {
        selectedWords.push(wordlist[array[i] % wordlist.length]);
      }
      setPassword(selectedWords.join(delimiter));
      return;
    }

    let upper = 'ABCDEFGHJKLMNPQRSTUVWXYZ'; // Ambiguous excluded initially or dynamically
    let lower = 'abcdefghijkmnopqrstuvwxyz';
    let nums = '23456789';
    let syms = '!@#$%^&*()-_=+[]{}|;:,.<>?';

    if (!excludeAmbiguous) {
      upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      lower = 'abcdefghijklmnopqrstuvwxyz';
      nums = '0123456789';
      syms = '!@#$%^&*()-_=+[]{}|;:,.<>/?`~';
    }

    let charPool = '';
    if (includeUpper) charPool += upper;
    if (includeLower) charPool += lower;
    if (includeNumbers) charPool += nums;
    if (includeSymbols) charPool += syms;

    if (!charPool) {
      charPool = lower;
    }

    const randomBuffer = new Uint32Array(length);
    crypto.getRandomValues(randomBuffer);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charPool[randomBuffer[i] % charPool.length];
    }

    setPassword(result);
  };

  React.useEffect(() => {
    generatePassword();
  }, [mode, length, wordsCount, delimiter, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  // Shannon entropy calculation
  const calculateEntropy = (str: string): number => {
    if (!str) return 0;
    let poolSize = 0;
    if (/[a-z]/.test(str)) poolSize += 26;
    if (/[A-Z]/.test(str)) poolSize += 26;
    if (/[0-9]/.test(str)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(str)) poolSize += 32;
    if (poolSize === 0) poolSize = 26;
    return Math.round(str.length * Math.log2(poolSize));
  };

  const entropyBits = calculateEntropy(password);

  const getStrengthLabel = (bits: number) => {
    if (bits < 45) return { label: 'Weak', color: 'text-rose-400', bar: 'bg-rose-500 w-1/4' };
    if (bits < 65) return { label: 'Moderate', color: 'text-terminal-amber', bar: 'bg-terminal-amber w-2/4' };
    if (bits < 90) return { label: 'Strong', color: 'text-emerald-400', bar: 'bg-emerald-500 w-3/4' };
    return { label: 'Very Strong (Cryptographic Grade)', color: 'text-terminal-emerald', bar: 'bg-terminal-emerald w-full' };
  };

  const strength = getStrengthLabel(entropyBits);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="Cryptographic Password & Passphrase Generator"
          badge="CSPRNG"
          onClear={() => setPassword('')}
          onCopy={password ? () => navigator.clipboard.writeText(password) : undefined}
          customActions={
            <button
              type="button"
              onClick={generatePassword}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-terminal-emerald text-black font-semibold hover:bg-emerald-400 text-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          }
        />

        {/* Display Banner */}
        <div className="p-6 bg-[#080a0d] border-b border-[#262d3a] flex flex-col items-center justify-center text-center">
          <div className="w-full max-w-2xl px-4 py-3 bg-[#12161c] border border-[#262d3a] rounded-lg font-mono text-base sm:text-lg text-white break-all tracking-wider selection:bg-terminal-emerald/30 shadow-inner">
            {password || 'Click Regenerate to create a secure key'}
          </div>

          {/* Strength Bar */}
          <div className="w-full max-w-2xl mt-4 space-y-1.5">
            <div className="flex justify-between font-mono text-xs text-carbon-400">
              <span className="flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-terminal-emerald" />
                Entropy: <strong className="text-white">{entropyBits} bits</strong>
              </span>
              <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
            </div>
            <div className="w-full h-1.5 bg-[#1c212a] rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-300 ${strength.bar}`} />
            </div>
          </div>
        </div>

        {/* Configuration Controls */}
        <div className="p-6 space-y-6 font-mono text-xs">
          {/* Mode Switcher */}
          <div className="flex items-center gap-3">
            <span className="text-carbon-400 uppercase tracking-wider text-[11px]">Generator Mode:</span>
            <div className="inline-flex rounded-md p-1 bg-[#12161c] border border-[#262d3a]">
              <button
                type="button"
                onClick={() => setMode('password')}
                className={`px-3 py-1 rounded transition-colors ${
                  mode === 'password'
                    ? 'bg-terminal-emerald text-black font-semibold'
                    : 'text-carbon-300 hover:text-white'
                }`}
              >
                Random String
              </button>
              <button
                type="button"
                onClick={() => setMode('passphrase')}
                className={`px-3 py-1 rounded transition-colors ${
                  mode === 'passphrase'
                    ? 'bg-terminal-emerald text-black font-semibold'
                    : 'text-carbon-300 hover:text-white'
                }`}
              >
                Multi-word Passphrase
              </button>
            </div>
          </div>

          {mode === 'password' ? (
            <div className="space-y-4">
              {/* Length Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-carbon-300">
                  <span>Character Length:</span>
                  <span className="text-white font-bold">{length} characters</span>
                </div>
                <input
                  type="range"
                  min={8}
                  max={64}
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value, 10))}
                  className="w-full accent-terminal-emerald bg-[#1c212a]"
                />
              </div>

              {/* Character Rules */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <label className="flex items-center gap-2 p-2.5 rounded bg-[#12161c] border border-[#262d3a] cursor-pointer hover:border-[#363f52]">
                  <input
                    type="checkbox"
                    checked={includeUpper}
                    onChange={(e) => setIncludeUpper(e.target.checked)}
                    className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
                  />
                  <span className="text-carbon-200">Uppercase (A-Z)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded bg-[#12161c] border border-[#262d3a] cursor-pointer hover:border-[#363f52]">
                  <input
                    type="checkbox"
                    checked={includeLower}
                    onChange={(e) => setIncludeLower(e.target.checked)}
                    className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
                  />
                  <span className="text-carbon-200">Lowercase (a-z)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded bg-[#12161c] border border-[#262d3a] cursor-pointer hover:border-[#363f52]">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => setIncludeNumbers(e.target.checked)}
                    className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
                  />
                  <span className="text-carbon-200">Numbers (0-9)</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded bg-[#12161c] border border-[#262d3a] cursor-pointer hover:border-[#363f52]">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => setIncludeSymbols(e.target.checked)}
                    className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
                  />
                  <span className="text-carbon-200">Symbols (!@#$)</span>
                </label>

                <label className="col-span-2 flex items-center gap-2 p-2.5 rounded bg-[#12161c] border border-[#262d3a] cursor-pointer hover:border-[#363f52]">
                  <input
                    type="checkbox"
                    checked={excludeAmbiguous}
                    onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                    className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
                  />
                  <span className="text-carbon-200">Exclude Ambiguous (0, O, I, l)</span>
                </label>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-carbon-300">
                  <span>Number of Words:</span>
                  <span className="text-white font-bold">{wordsCount} words</span>
                </div>
                <input
                  type="range"
                  min={3}
                  max={10}
                  value={wordsCount}
                  onChange={(e) => setWordsCount(parseInt(e.target.value, 10))}
                  className="w-full accent-terminal-emerald bg-[#1c212a]"
                />
              </div>

              <div className="flex items-center gap-3">
                <span className="text-carbon-300">Word Delimiter:</span>
                <input
                  type="text"
                  maxLength={3}
                  value={delimiter}
                  onChange={(e) => setDelimiter(e.target.value)}
                  className="w-16 bg-[#1c212a] border border-[#262d3a] text-white rounded px-2.5 py-1 text-center outline-none"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
