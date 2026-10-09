'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { FileCode2, AlertCircle, CheckCircle2 } from 'lucide-react';

interface MatchItem {
  match: string;
  index: number;
  groups: string[];
}

export const RegexTesterTool: React.FC = () => {
  const [pattern, setPattern] = useState<string>('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [flags, setFlags] = useState<{ [f: string]: boolean }>({
    g: true,
    i: true,
    m: false,
    s: false,
  });
  const [testString, setTestString] = useState<string>(
    'Reach out at dev@example.com or support@company.org. You can also contact admin@infra.net for server alerts.'
  );
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const presets = [
    { label: 'Email Address', pat: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})', flags: 'gi' },
    { label: 'IPv4 Address', pat: '\\b(?:[0-9]{1,3}\\.){3}[0-9]{1,3}\\b', flags: 'g' },
    { label: 'URL Pattern', pat: 'https?:\\/\\/[\\w\\.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+', flags: 'gi' },
    { label: 'UUID v4', pat: '[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}', flags: 'gi' },
  ];

  const testRegex = () => {
    if (!pattern.trim()) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const activeFlags = Object.entries(flags)
        .filter(([_, active]) => active)
        .map(([f]) => f)
        .join('');

      const regex = new RegExp(pattern, activeFlags);
      const results: MatchItem[] = [];

      if (activeFlags.includes('g')) {
        let match: RegExpExecArray | null;
        let iterationGuard = 0;
        while ((match = regex.exec(testString)) !== null) {
          iterationGuard++;
          if (iterationGuard > 1000) break; // Infinite loop guard
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          results.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(results);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid regular expression syntax');
      setMatches([]);
    }
  };

  React.useEffect(() => {
    testRegex();
  }, [pattern, flags, testString]);

  const toggleFlag = (flag: string) => {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }));
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="ECMAScript Regular Expression Engine"
          badge="V8 Regex"
          onClear={() => {
            setPattern('');
            setTestString('');
            setMatches([]);
            setError(null);
          }}
          onCopy={() => navigator.clipboard.writeText(`/${pattern}/${Object.entries(flags).filter(([_, a]) => a).map(([f]) => f).join('')}`)}
          onSample={() => {
            setPattern('(?<protocol>https?):\\/\\/(?<domain>[a-zA-Z0-9.-]+)(?<path>\\/[^\\s]*)?');
            setTestString('Visits: https://devtools-hub.dev/tools/regex-tester and http://localhost:3000/docs');
          }}
        />

        {/* Pattern Input and Flags */}
        <div className="p-4 border-b border-[#262d3a] bg-[#12161c] space-y-3 font-mono text-xs">
          <div className="text-carbon-400 uppercase text-[10px] tracking-wider">Regular Expression Pattern</div>
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2">
            <span className="text-terminal-emerald text-base font-bold">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="e.g. ([a-z]+)@([a-z]+)"
              className="flex-1 bg-[#1c212a] border border-[#262d3a] text-white rounded p-2.5 outline-none focus:border-terminal-emerald"
            />
            <span className="text-terminal-emerald text-base font-bold">/</span>

            {/* Flags */}
            <div className="flex items-center gap-1 bg-[#1c212a] border border-[#262d3a] rounded p-1">
              {['g', 'i', 'm', 's'].map((flag) => (
                <button
                  key={flag}
                  type="button"
                  onClick={() => toggleFlag(flag)}
                  className={`px-2 py-0.5 rounded text-xs transition-colors ${
                    flags[flag]
                      ? 'bg-terminal-emerald text-black font-bold'
                      : 'text-carbon-400 hover:text-white'
                  }`}
                  title={`Flag ${flag}`}
                >
                  {flag}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-carbon-500 text-[10px]">Presets:</span>
            {presets.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setPattern(p.pat)}
                className="px-2 py-0.5 rounded bg-[#1c212a] text-carbon-300 hover:text-white border border-[#262d3a] text-[10px]"
              >
                {p.label}
              </button>
            ))}
          </div>

          {error && (
            <div className="p-2 rounded bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Test String Area */}
        <div className="p-4 border-b border-[#262d3a]">
          <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
            <span>Test Text Input</span>
            <span>{testString.length} chars</span>
          </div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            rows={6}
            placeholder="Enter text to match against regex pattern..."
            className="w-full carbon-editor p-3 rounded-md resize-y"
            spellCheck={false}
          />
        </div>

        {/* Matches & Group Breakdown */}
        <div className="p-4 font-mono text-xs space-y-3">
          <div className="flex items-center justify-between text-carbon-300 uppercase text-[11px] tracking-wider">
            <span>Matched Occurrences ({matches.length})</span>
            {matches.length > 0 && <span className="text-terminal-emerald">Match Found</span>}
          </div>

          {matches.length > 0 ? (
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {matches.map((item, idx) => (
                <div key={idx} className="p-3 rounded bg-[#12161c] border border-[#262d3a] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-terminal-emerald font-bold">
                      Match #{idx + 1}: &quot;{item.match}&quot;
                    </span>
                    <span className="text-carbon-400 text-[10px]">Index: {item.index}</span>
                  </div>

                  {item.groups.length > 0 && (
                    <div className="pt-1.5 border-t border-[#1c212a] space-y-1">
                      <div className="text-[10px] text-carbon-500 uppercase">Captured Groups:</div>
                      {item.groups.map((grp, gIdx) => (
                        <div key={gIdx} className="text-[11px] text-carbon-300 pl-2 border-l border-[#262d3a]">
                          Group {gIdx + 1}: <span className="text-white">&quot;{grp}&quot;</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-carbon-500 text-xs py-2">
              No matches found in the current test string.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
