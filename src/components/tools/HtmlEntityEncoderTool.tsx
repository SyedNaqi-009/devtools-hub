'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { ArrowLeftRight, Code, Shield } from 'lucide-react';

export const HtmlEntityEncoderTool: React.FC = () => {
  const [inputText, setInputText] = useState<string>(`<div class="card" id="user-profile">\n  <h3>Welcome, User & Co.</h3>\n  <p>Status: "Active" & 'Verified' (Cost: < $100 & > $50)</p>\n</div>`);
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [entityType, setEntityType] = useState<'named' | 'decimal' | 'hex'>('named');

  const encodeHtml = (str: string, type: 'named' | 'decimal' | 'hex') => {
    return str.replace(/[&<>"']/g, (char) => {
      if (type === 'named') {
        switch (char) {
          case '&': return '&amp;';
          case '<': return '&lt;';
          case '>': return '&gt;';
          case '"': return '&quot;';
          case "'": return '&#39;';
          default: return char;
        }
      } else if (type === 'decimal') {
        return `&#${char.charCodeAt(0)};`;
      } else {
        return `&#x${char.charCodeAt(0).toString(16)};`;
      }
    });
  };

  const decodeHtml = (str: string) => {
    return str
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&apos;/g, "'")
      .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
      .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
  };

  React.useEffect(() => {
    if (!inputText) {
      setOutputText('');
      return;
    }

    if (mode === 'encode') {
      setOutputText(encodeHtml(inputText, entityType));
    } else {
      setOutputText(decodeHtml(inputText));
    }
  }, [inputText, mode, entityType]);

  const swapInputs = () => {
    if (outputText) {
      setInputText(outputText);
      setMode(mode === 'encode' ? 'decode' : 'encode');
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="HTML Entity Encoder/Decoder"
          badge="XSS Mitigation"
          onClear={() => {
            setInputText('');
            setOutputText('');
          }}
          onCopy={outputText ? () => navigator.clipboard.writeText(outputText) : undefined}
          onSample={() => {
            if (mode === 'encode') {
              setInputText('<script>alert("XSS & Injection Vulnerability Test")</script>');
            } else {
              setInputText('&lt;script&gt;alert(&quot;XSS &amp; Injection Vulnerability Test&quot;)&lt;/script&gt;');
            }
          }}
          customActions={
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-md p-0.5 bg-[#1c212a] border border-[#262d3a]">
                <button
                  type="button"
                  onClick={() => setMode('encode')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    mode === 'encode'
                      ? 'bg-terminal-emerald text-black font-semibold'
                      : 'text-carbon-300 hover:text-white'
                  }`}
                >
                  Escape
                </button>
                <button
                  type="button"
                  onClick={() => setMode('decode')}
                  className={`px-2.5 py-1 text-xs rounded transition-colors ${
                    mode === 'decode'
                      ? 'bg-terminal-emerald text-black font-semibold'
                      : 'text-carbon-300 hover:text-white'
                  }`}
                >
                  Unescape
                </button>
              </div>

              {mode === 'encode' && (
                <select
                  value={entityType}
                  onChange={(e) => setEntityType(e.target.value as any)}
                  className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 text-xs rounded px-2 py-1 outline-none"
                >
                  <option value="named">Named (&amp;lt;, &amp;gt;)</option>
                  <option value="decimal">Decimal (&amp;#60;)</option>
                  <option value="hex">Hexadecimal (&amp;#x3c;)</option>
                </select>
              )}

              <button
                type="button"
                onClick={swapInputs}
                className="p-1.5 rounded bg-[#1c212a] hover:bg-[#262d3a] text-carbon-300 hover:text-white border border-[#262d3a]"
                title="Swap Inputs"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>
          }
        />

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>{mode === 'encode' ? 'Raw Markup / Special Characters' : 'Escaped HTML Entities'}</span>
              <span>{inputText.length} chars</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={14}
              placeholder="Paste markup or text here..."
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>{mode === 'encode' ? 'Escaped Entity Output' : 'Unescaped Plaintext'}</span>
              <span>{outputText.length} chars</span>
            </div>
            <textarea
              value={outputText}
              readOnly
              rows={14}
              placeholder="Result will appear here..."
              className="w-full carbon-editor p-3 rounded-md bg-[#090b0e] text-terminal-emerald"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
