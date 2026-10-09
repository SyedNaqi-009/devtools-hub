'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { Globe, Plus, Trash2, ArrowRight, AlertCircle, Copy } from 'lucide-react';

interface QueryParam {
  key: string;
  value: string;
}

export const UrlParserTool: React.FC = () => {
  const [fullUrl, setFullUrl] = useState<string>(
    'https://api.cloudservices.io:8443/v1/clusters/deployment?env=production&nodes=16&autoScale=true#telemetry-anchor'
  );
  const [protocol, setProtocol] = useState<string>('https:');
  const [hostname, setHostname] = useState<string>('api.cloudservices.io');
  const [port, setPort] = useState<string>('8443');
  const [pathname, setPathname] = useState<string>('/v1/clusters/deployment');
  const [hash, setHash] = useState<string>('#telemetry-anchor');
  const [params, setParams] = useState<QueryParam[]>([
    { key: 'env', value: 'production' },
    { key: 'nodes', value: '16' },
    { key: 'autoScale', value: 'true' },
  ]);
  const [error, setError] = useState<string | null>(null);

  // Parse URL string into parts
  const parseUrl = (urlString: string) => {
    setFullUrl(urlString);
    if (!urlString.trim()) {
      setError(null);
      return;
    }

    try {
      const parsed = new URL(urlString);
      setProtocol(parsed.protocol);
      setHostname(parsed.hostname);
      setPort(parsed.port);
      setPathname(parsed.pathname);
      setHash(parsed.hash);

      const queryList: QueryParam[] = [];
      parsed.searchParams.forEach((value, key) => {
        queryList.push({ key, value });
      });
      setParams(queryList);
      setError(null);
    } catch (err: any) {
      setError('Invalid URL structure. Ensure it begins with a valid protocol (e.g. https://).');
    }
  };

  // Reconstruct full URL from broken parts
  const rebuildUrl = (
    proto: string,
    host: string,
    prt: string,
    path: string,
    queryParams: QueryParam[],
    hsh: string
  ) => {
    try {
      const urlObj = new URL(`${proto}//${host}${prt ? `:${prt}` : ''}${path}`);
      queryParams.forEach(({ key, value }) => {
        if (key.trim()) {
          urlObj.searchParams.append(key, value);
        }
      });
      if (hsh) {
        urlObj.hash = hsh.startsWith('#') ? hsh : `#${hsh}`;
      }
      setFullUrl(urlObj.toString());
      setError(null);
    } catch (err) {
      // ignore transient editing errors
    }
  };

  const handleParamChange = (index: number, field: 'key' | 'value', val: string) => {
    const updated = [...params];
    updated[index][field] = val;
    setParams(updated);
    rebuildUrl(protocol, hostname, port, pathname, updated, hash);
  };

  const addParam = () => {
    const updated = [...params, { key: '', value: '' }];
    setParams(updated);
  };

  const removeParam = (index: number) => {
    const updated = params.filter((_, i) => i !== index);
    setParams(updated);
    rebuildUrl(protocol, hostname, port, pathname, updated, hash);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="URL Parser & Query String Builder"
          badge="WHATWG URL"
          onClear={() => {
            setFullUrl('');
            setProtocol('https:');
            setHostname('');
            setPort('');
            setPathname('/');
            setHash('');
            setParams([]);
            setError(null);
          }}
          onCopy={() => navigator.clipboard.writeText(fullUrl)}
          onSample={() => {
            parseUrl('https://console.aws.amazon.com/ec2/home?region=us-east-1#Instances:sort=instanceId');
          }}
        />

        {/* Live URL Input Bar */}
        <div className="p-4 border-b border-[#262d3a]">
          <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
            <span>Complete URL String</span>
            <span>{fullUrl.length} characters</span>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={fullUrl}
              onChange={(e) => parseUrl(e.target.value)}
              placeholder="Paste or edit URL here..."
              className="w-full bg-[#12161c] border border-[#262d3a] text-terminal-emerald font-mono text-xs rounded p-2.5 outline-none focus:border-terminal-emerald"
            />
          </div>

          {error && (
            <div className="mt-2 text-rose-400 font-mono text-xs flex items-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Structural Parts Grid */}
        <div className="p-4 bg-[#090b0e] border-b border-[#262d3a] font-mono text-xs">
          <div className="text-carbon-400 uppercase text-[10px] tracking-wider mb-3">
            Component Decomposition
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <span className="text-carbon-500 text-[10px] block mb-1">Protocol / Scheme</span>
              <input
                type="text"
                value={protocol}
                onChange={(e) => {
                  setProtocol(e.target.value);
                  rebuildUrl(e.target.value, hostname, port, pathname, params, hash);
                }}
                className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2 outline-none focus:border-terminal-emerald"
              />
            </div>
            <div>
              <span className="text-carbon-500 text-[10px] block mb-1">Host / Domain</span>
              <input
                type="text"
                value={hostname}
                onChange={(e) => {
                  setHostname(e.target.value);
                  rebuildUrl(protocol, e.target.value, port, pathname, params, hash);
                }}
                className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2 outline-none focus:border-terminal-emerald"
              />
            </div>
            <div>
              <span className="text-carbon-500 text-[10px] block mb-1">Port</span>
              <input
                type="text"
                value={port}
                onChange={(e) => {
                  setPort(e.target.value);
                  rebuildUrl(protocol, hostname, e.target.value, pathname, params, hash);
                }}
                placeholder="e.g. 443"
                className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2 outline-none focus:border-terminal-emerald"
              />
            </div>
            <div>
              <span className="text-carbon-500 text-[10px] block mb-1">Hash / Anchor</span>
              <input
                type="text"
                value={hash}
                onChange={(e) => {
                  setHash(e.target.value);
                  rebuildUrl(protocol, hostname, port, pathname, params, e.target.value);
                }}
                className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2 outline-none focus:border-terminal-emerald"
              />
            </div>
            <div className="sm:col-span-2 md:col-span-4">
              <span className="text-carbon-500 text-[10px] block mb-1">Pathname</span>
              <input
                type="text"
                value={pathname}
                onChange={(e) => {
                  setPathname(e.target.value);
                  rebuildUrl(protocol, hostname, port, e.target.value, params, hash);
                }}
                className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2 outline-none focus:border-terminal-emerald"
              />
            </div>
          </div>
        </div>

        {/* Query Parameter Builder Table */}
        <div className="p-4 font-mono text-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-carbon-300 font-semibold uppercase text-[11px] tracking-wider">
              Query Parameters ({params.length})
            </span>
            <button
              type="button"
              onClick={addParam}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c212a] hover:bg-[#262d3a] text-terminal-emerald border border-[#262d3a] text-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Parameter</span>
            </button>
          </div>

          <div className="space-y-2">
            {params.map((p, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={p.key}
                  onChange={(e) => handleParamChange(idx, 'key', e.target.value)}
                  placeholder="Key (e.g. limit)"
                  className="flex-1 bg-[#12161c] border border-[#262d3a] text-white rounded p-2 outline-none focus:border-terminal-emerald"
                />
                <span className="text-carbon-500">=</span>
                <input
                  type="text"
                  value={p.value}
                  onChange={(e) => handleParamChange(idx, 'value', e.target.value)}
                  placeholder="Value (e.g. 50)"
                  className="flex-1 bg-[#12161c] border border-[#262d3a] text-white rounded p-2 outline-none focus:border-terminal-emerald"
                />
                <button
                  type="button"
                  onClick={() => removeParam(idx)}
                  className="p-2 rounded text-carbon-400 hover:text-rose-400 hover:bg-rose-950/30 border border-[#262d3a] transition-colors"
                  title="Remove query param"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
            {params.length === 0 && (
              <div className="text-carbon-500 text-xs italic py-2">
                No query parameters present. Click &quot;Add Parameter&quot; to build query pairs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
