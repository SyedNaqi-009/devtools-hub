'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { FileCode, Minimize2, TrendingDown, Check } from 'lucide-react';

export const CodeMinifierTool: React.FC = () => {
  const [lang, setLang] = useState<'css' | 'js'>('css');
  const [inputCode, setInputCode] = useState<string>(`/* DevTools Hub Theme Stylesheet */
:root {
  --primary-color: #10b981; /* Terminal Emerald */
  --bg-dark: #0b0d10;
  --font-family: 'Inter', sans-serif;
}

.terminal-window {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  background-color: var(--bg-dark);
  border: 1px solid #262d3a;
  border-radius: 8px;
}

.terminal-window:hover {
  border-color: var(--primary-color);
  box-shadow: 0 0 15px rgba(16, 185, 129, 0.2);
}`);

  const [outputCode, setOutputCode] = useState<string>('');
  const [metrics, setMetrics] = useState<{ rawBytes: number; minBytes: number; pct: number } | null>(null);

  const minifyCss = (code: string) => {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '') // strip multiline comments
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // remove space around separators
      .replace(/;}/g, '}') // remove trailing semicolon
      .trim();
  };

  const minifyJs = (code: string) => {
    return code
      .replace(/\/\*[\s\S]*?\*\//g, '') // strip multiline comments
      .replace(/(^|[^:])\/\/.*/g, '$1') // strip singleline comments
      .replace(/\s+/g, ' ') // collapse whitespace
      .replace(/\s*([\{\}\(\)\[\]\=\+\-\*\/\;\,\:])\s*/g, '$1')
      .trim();
  };

  const runMinification = () => {
    if (!inputCode.trim()) {
      setOutputCode('');
      setMetrics(null);
      return;
    }

    const minified = lang === 'css' ? minifyCss(inputCode) : minifyJs(inputCode);
    setOutputCode(minified);

    const rawBytes = new Blob([inputCode]).size;
    const minBytes = new Blob([minified]).size;
    const pct = rawBytes > 0 ? Math.round(((rawBytes - minBytes) / rawBytes) * 100) : 0;
    setMetrics({ rawBytes, minBytes, pct });
  };

  React.useEffect(() => {
    runMinification();
  }, [inputCode, lang]);

  const handleDownload = () => {
    if (!outputCode) return;
    const ext = lang === 'css' ? 'min.css' : 'min.js';
    const mime = lang === 'css' ? 'text/css' : 'application/javascript';
    const blob = new Blob([outputCode], { type: `${mime};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `compressed-asset.${ext}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="CSS & JavaScript Code Minifier"
          badge="Zero Build Step"
          onClear={() => {
            setInputCode('');
            setOutputCode('');
            setMetrics(null);
          }}
          onCopy={outputCode ? () => navigator.clipboard.writeText(outputCode) : undefined}
          onDownload={outputCode ? handleDownload : undefined}
          onSample={() => {
            if (lang === 'css') {
              setInputCode(`.btn { padding: 10px 20px; color: #fff; background: #000; }`);
            } else {
              setInputCode(
                `// Math utilities\nfunction calculateAverage(list) {\n  let total = 0;\n  for (let i = 0; i < list.length; i++) {\n    total += list[i];\n  }\n  return total / list.length;\n}`
              );
            }
          }}
          customActions={
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-md p-0.5 bg-[#1c212a] border border-[#262d3a]">
                <button
                  type="button"
                  onClick={() => {
                    setLang('css');
                    setInputCode(`.header { color: #fff; margin: 0; }`);
                  }}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    lang === 'css'
                      ? 'bg-terminal-emerald text-black font-semibold'
                      : 'text-carbon-300 hover:text-white'
                  }`}
                >
                  CSS
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setLang('js');
                    setInputCode(`function add(a, b) {\n  // Sum two numbers\n  return a + b;\n}`);
                  }}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    lang === 'js'
                      ? 'bg-terminal-emerald text-black font-semibold'
                      : 'text-carbon-300 hover:text-white'
                  }`}
                >
                  JavaScript
                </button>
              </div>

              <button
                type="button"
                onClick={runMinification}
                className="flex items-center gap-1 px-3 py-1 rounded bg-terminal-emerald text-black font-semibold hover:bg-emerald-400 text-xs transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Minify</span>
              </button>
            </div>
          }
        />

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Source Code ({lang.toUpperCase()})</span>
              <span>{inputCode.length} chars</span>
            </div>
            <textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              rows={15}
              placeholder={`Paste ${lang.toUpperCase()} code here...`}
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Minified Output</span>
              <span>{outputCode.length} chars</span>
            </div>
            <textarea
              value={outputCode}
              readOnly
              rows={15}
              placeholder="Minified single-line code will appear here..."
              className="w-full carbon-editor p-3 rounded-md bg-[#090b0e] text-terminal-emerald"
              spellCheck={false}
            />
          </div>
        </div>

        {metrics && (
          <div className="border-t border-[#262d3a] p-4 bg-[#090b0e]">
            <div className="grid grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Uncompressed</div>
                <div className="text-white font-semibold mt-1 text-sm">{metrics.rawBytes} bytes</div>
              </div>
              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Minified</div>
                <div className="text-terminal-emerald font-semibold mt-1 text-sm">{metrics.minBytes} bytes</div>
              </div>
              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a]">
                <div className="text-carbon-400 text-[10px] uppercase">Bandwidth Reduction</div>
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
