'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { ArrowLeftRight, Binary, AlertCircle, FileText } from 'lucide-react';

export const Base64EncoderDecoderTool: React.FC = () => {
  const [inputText, setInputText] = useState<string>('Hello DevTools Hub! 🚀 Unicode UTF-8 test: café, élève, 日本語, العربية');
  const [outputText, setOutputText] = useState<string>('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [urlSafe, setUrlSafe] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Full UTF-8 byte stream handlers
  const utf8EncodeBase64 = (str: string, isUrlSafe: boolean) => {
    const bytes = new TextEncoder().encode(str);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    let base64 = btoa(binary);
    if (isUrlSafe) {
      base64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }
    return base64;
  };

  const utf8DecodeBase64 = (base64Str: string) => {
    let base64 = base64Str.trim().replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder().decode(bytes);
  };

  const processData = () => {
    if (!inputText) {
      setOutputText('');
      setError(null);
      return;
    }

    try {
      if (mode === 'encode') {
        const encoded = utf8EncodeBase64(inputText, urlSafe);
        setOutputText(encoded);
        setError(null);
      } else {
        const decoded = utf8DecodeBase64(inputText);
        setOutputText(decoded);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Invalid Base64 sequence for decoding.');
      setOutputText('');
    }
  };

  React.useEffect(() => {
    processData();
  }, [inputText, mode, urlSafe]);

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
          title="Base64 String & Text Encoder/Decoder"
          badge="UTF-8 Unicode"
          onClear={() => {
            setInputText('');
            setOutputText('');
            setError(null);
          }}
          onCopy={outputText ? () => navigator.clipboard.writeText(outputText) : undefined}
          onSample={() => {
            if (mode === 'encode') {
              setInputText('Authorization: Bearer token_secret_99410');
            } else {
              setInputText('QXV0aG9yaXphdGlvbjogQmVhcmVyIHRva2VuX3NlY3JldF85OTQxMA==');
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

              <label className="flex items-center gap-1.5 text-xs font-mono text-carbon-300 cursor-pointer">
                <input
                  type="checkbox"
                  checked={urlSafe}
                  onChange={(e) => setUrlSafe(e.target.checked)}
                  className="rounded border-[#262d3a] bg-[#1c212a] text-terminal-emerald focus:ring-0"
                />
                <span>Base64URL</span>
              </label>

              <button
                type="button"
                onClick={swapInputs}
                className="p-1.5 rounded bg-[#1c212a] hover:bg-[#262d3a] text-carbon-300 hover:text-white border border-[#262d3a]"
                title="Swap Input and Output"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" />
              </button>
            </div>
          }
        />

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>{mode === 'encode' ? 'Plaintext / UTF-8 Source' : 'Base64 Encoded Input'}</span>
              <span>{inputText.length} chars</span>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={14}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 to decode...'}
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>{mode === 'encode' ? 'Base64 Result' : 'Decoded Plaintext (UTF-8)'}</span>
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
