'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { ArrowLeftRight, Link as LinkIcon, AlertCircle } from 'lucide-react';

export const UrlEncoderDecoderTool: React.FC = () => {
  const [inputText, setInputText] = useState<string>('https://api.example.com/search?query=react 19 & tags=web,crypto&filter=active#results');
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [encodingType, setEncodingType] = useState<'component' | 'full'>('component');
  const [error, setError] = useState<string | null>(null);

  const processUrl = () => {
    if (!inputText) {
      setOutputText('');
      setError(null);
      return;
    }

    try {
      if (mode === 'encode') {
        const res = encodingType === 'component' ? encodeURIComponent(inputText) : encodeURI(inputText);
        setOutputText(res);
        setError(null);
      } else {
        const res = encodingType === 'component' ? decodeURIComponent(inputText) : decodeURI(inputText);
        setOutputText(res);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Malformed URI sequence');
      setOutputText('');
    }
  };

  React.useEffect(() => {
    processUrl();
  }, [inputText, mode, encodingType]);

  const swapInputs = () => {
    if (outputText && !error) {
      setInputText(outputText);
      setMode(mode === 'encode' ? 'decode' : 'encode');
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="URL & URI Component Encoder/Decoder"
          badge="RFC 3986"
          onClear={() => {
            setInputText('');
            setOutputText('');
            setError(null);
          }}
          onCopy={outputText ? () => navigator.clipboard.writeText(outputText) : undefined}
          onSample={() => {
            if (mode === 'encode') {
              setInputText('https://auth.company.com/oauth/callback?code=sec_9910&state=redirect_dashboard/home?user=alice');
            } else {
              setInputText('https%3A%2F%2Fauth.company.com%2Foauth%2Fcallback%3Fcode%3Dsec_9910%26state%3Dredirect_dashboard%2Fhome%3Fuser%3Dalice');
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
                  Encode
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
                  Decode
                </button>
              </div>

              <select
                value={encodingType}
                onChange={(e) => setEncodingType(e.target.value as any)}
                className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 text-xs rounded px-2 py-1 outline-none"
              >
                <option value="component">Component (encodeURIComponent)</option>
                <option value="full">Full URI (encodeURI)</option>
              </select>

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
              <span>{mode === 'encode' ? 'Raw URI / Query String' : 'Percent-Encoded URI'}</span>
              <span>{inputText.length} chars</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={14}
              placeholder={mode === 'encode' ? 'Type or paste URI to encode...' : 'Paste percent-encoded string to decode...'}
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>{mode === 'encode' ? 'Encoded Result' : 'Decoded URI'}</span>
              <span>{outputText.length} chars</span>
            </div>
            <textarea
              value={outputText}
              readOnly
              rows={14}
              placeholder="Conversion result will appear here..."
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
      </div>
    </div>
  );
};
