'use client';

import React, { useState, useEffect } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { Clock, RefreshCw, Copy, Check, Globe } from 'lucide-react';

export const TimestampConverterTool: React.FC = () => {
  const [currentEpoch, setCurrentEpoch] = useState<number>(Math.floor(Date.now() / 1000));
  const [timestampInput, setTimestampInput] = useState<string>(Math.floor(Date.now() / 1000).toString());
  const [dateInput, setDateInput] = useState<string>(new Date().toISOString().slice(0, 19));
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');

  // Converted representations
  const [utcDateStr, setUtcDateStr] = useState<string>('');
  const [localDateStr, setLocalDateStr] = useState<string>('');
  const [isoStr, setIsoStr] = useState<string>('');
  const [relativeStr, setRelativeStr] = useState<string>('');

  // Live running clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentEpoch(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateFromTimestamp = (ts: string, currentUnit: 'seconds' | 'milliseconds') => {
    setTimestampInput(ts);
    if (!ts.trim() || isNaN(Number(ts))) {
      setUtcDateStr('Invalid timestamp');
      setLocalDateStr('Invalid timestamp');
      setIsoStr('Invalid timestamp');
      setRelativeStr('Invalid timestamp');
      return;
    }

    const num = Number(ts);
    const ms = currentUnit === 'seconds' ? num * 1000 : num;
    const date = new Date(ms);

    if (isNaN(date.getTime())) {
      setUtcDateStr('Invalid timestamp');
      setLocalDateStr('Invalid timestamp');
      setIsoStr('Invalid timestamp');
      setRelativeStr('Invalid timestamp');
      return;
    }

    setUtcDateStr(date.toUTCString());
    setLocalDateStr(date.toString());
    setIsoStr(date.toISOString());

    // Relative diff
    const diffSec = Math.floor((Date.now() - date.getTime()) / 1000);
    if (Math.abs(diffSec) < 60) {
      setRelativeStr(`${Math.abs(diffSec)} seconds ${diffSec >= 0 ? 'ago' : 'from now'}`);
    } else if (Math.abs(diffSec) < 3600) {
      setRelativeStr(`${Math.floor(Math.abs(diffSec) / 60)} minutes ${diffSec >= 0 ? 'ago' : 'from now'}`);
    } else if (Math.abs(diffSec) < 86400) {
      setRelativeStr(`${Math.floor(Math.abs(diffSec) / 3600)} hours ${diffSec >= 0 ? 'ago' : 'from now'}`);
    } else {
      setRelativeStr(`${Math.floor(Math.abs(diffSec) / 86400)} days ${diffSec >= 0 ? 'ago' : 'from now'}`);
    }
  };

  const updateFromDateInput = (val: string) => {
    setDateInput(val);
    const date = new Date(val);
    if (!isNaN(date.getTime())) {
      const ts = unit === 'seconds' ? Math.floor(date.getTime() / 1000) : date.getTime();
      updateFromTimestamp(ts.toString(), unit);
    }
  };

  useEffect(() => {
    updateFromTimestamp(timestampInput, unit);
  }, [unit]);

  const setNow = () => {
    const now = Date.now();
    const ts = unit === 'seconds' ? Math.floor(now / 1000) : now;
    updateFromTimestamp(ts.toString(), unit);
    setDateInput(new Date(now).toISOString().slice(0, 19));
  };

  return (
    <div className="space-y-6">
      {/* Real-time Epoch Ticker */}
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-[#12161c] border border-[#262d3a] flex items-center justify-center text-terminal-emerald">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] text-carbon-400 uppercase tracking-wider">Current UTC Epoch Ticker</div>
            <div className="text-xl font-bold text-white tracking-wider">{currentEpoch}</div>
          </div>
        </div>

        <button
          type="button"
          onClick={setNow}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c212a] hover:bg-[#262d3a] text-carbon-200 hover:text-white border border-[#262d3a] text-xs transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-terminal-emerald" />
          <span>Sync to Current Instant</span>
        </button>
      </div>

      {/* Main Converter Card */}
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="Unix Epoch Time Matrix"
          badge="POSIX / ISO 8601"
          onClear={() => {
            setTimestampInput('');
            setDateInput('');
          }}
          onSample={() => {
            setTimestampInput('1728511200');
            updateFromTimestamp('1728511200', 'seconds');
          }}
        />

        <div className="p-6 space-y-6 font-mono text-xs">
          {/* Epoch to Date */}
          <div className="space-y-3">
            <div className="text-carbon-300 font-bold uppercase text-[11px]">Convert Unix Timestamp to Calendar Date</div>
            <div className="flex flex-wrap sm:flex-nowrap gap-2">
              <input
                type="text"
                value={timestampInput}
                onChange={(e) => updateFromTimestamp(e.target.value, unit)}
                placeholder="Enter timestamp (e.g. 1728511200)..."
                className="flex-1 bg-[#12161c] border border-[#262d3a] text-white rounded p-2.5 outline-none focus:border-terminal-emerald text-sm"
              />
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value as any)}
                className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 rounded px-3 py-2 outline-none"
              >
                <option value="seconds">Seconds (10 digits)</option>
                <option value="milliseconds">Milliseconds (13 digits)</option>
              </select>
            </div>
          </div>

          {/* Date to Epoch */}
          <div className="space-y-3 pt-2 border-t border-[#1c212a]">
            <div className="text-carbon-300 font-bold uppercase text-[11px]">Convert Calendar Date to Unix Timestamp</div>
            <input
              type="datetime-local"
              step="1"
              value={dateInput}
              onChange={(e) => updateFromDateInput(e.target.value)}
              className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2.5 outline-none focus:border-terminal-emerald text-sm"
            />
          </div>

          {/* Results Matrix */}
          <div className="pt-4 border-t border-[#1c212a] space-y-3">
            <div className="text-carbon-400 font-semibold uppercase text-[10px] tracking-wider">
              Timezone & Format Representations
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-carbon-400">UTC / GMT Date:</span>
                <span className="text-terminal-emerald font-semibold break-all">{utcDateStr}</span>
              </div>

              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-carbon-400">Local Machine Time:</span>
                <span className="text-white font-semibold break-all">{localDateStr}</span>
              </div>

              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-carbon-400">ISO 8601 String:</span>
                <span className="text-terminal-cyan font-semibold break-all">{isoStr}</span>
              </div>

              <div className="p-3 rounded bg-[#12161c] border border-[#262d3a] flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-carbon-400">Relative Time:</span>
                <span className="text-terminal-amber font-semibold">{relativeStr}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
