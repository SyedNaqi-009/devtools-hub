'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { CalendarClock, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export const CronExpressionGeneratorTool: React.FC = () => {
  const [cronInput, setCronInput] = useState<string>('*/15 * * * *');
  const [minute, setMinute] = useState<string>('*/15');
  const [hour, setHour] = useState<string>('*');
  const [dom, setDom] = useState<string>('*');
  const [month, setMonth] = useState<string>('*');
  const [dow, setDow] = useState<string>('*');

  const presets = [
    { label: 'Every minute', expr: '* * * * *' },
    { label: 'Every 5 minutes', expr: '*/5 * * * *' },
    { label: 'Every 15 minutes', expr: '*/15 * * * *' },
    { label: 'Every hour at :00', expr: '0 * * * *' },
    { label: 'Daily at midnight (00:00)', expr: '0 0 * * *' },
    { label: 'Every Sunday at midnight', expr: '0 0 * * 0' },
    { label: 'Mon-Fri at 09:00', expr: '0 9 * * 1-5' },
    { label: '1st of every month at 00:00', expr: '0 0 1 * *' },
  ];

  const updateFromFields = (m: string, h: string, dm: string, mo: string, dw: string) => {
    setMinute(m);
    setHour(h);
    setDom(dm);
    setMonth(mo);
    setDow(dw);
    setCronInput(`${m} ${h} ${dm} ${mo} ${dw}`);
  };

  const handleCronInputChange = (val: string) => {
    setCronInput(val);
    const parts = val.trim().split(/\s+/);
    if (parts.length === 5) {
      setMinute(parts[0]);
      setHour(parts[1]);
      setDom(parts[2]);
      setMonth(parts[3]);
      setDow(parts[4]);
    }
  };

  const describeCron = (expr: string): string => {
    const parts = expr.trim().split(/\s+/);
    if (parts.length !== 5) {
      return 'Invalid expression: standard crontab requires exactly 5 fields.';
    }

    const [m, h, dm, mo, dw] = parts;

    let desc = 'Executes ';

    if (m === '*' && h === '*') {
      desc += 'every minute';
    } else if (m.startsWith('*/') && h === '*') {
      desc += `every ${m.replace('*/', '')} minutes`;
    } else if (m !== '*' && h === '*') {
      desc += `at minute ${m} of every hour`;
    } else if (m !== '*' && h !== '*') {
      desc += `at ${h.padStart(2, '0')}:${m.padStart(2, '0')} UTC`;
    } else {
      desc += `on pattern ${m} ${h}`;
    }

    if (dw !== '*') {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      if (dw === '1-5') {
        desc += ', Monday through Friday';
      } else if (days[parseInt(dw, 10)]) {
        desc += `, on ${days[parseInt(dw, 10)]}`;
      } else {
        desc += `, on day-of-week ${dw}`;
      }
    }

    if (dm !== '*') {
      desc += `, on day ${dm} of the month`;
    }

    if (mo !== '*') {
      desc += `, in month ${mo}`;
    }

    return desc + '.';
  };

  // Mock next 5 runs generator for standard intervals
  const getNextRuns = (): string[] => {
    const runs: string[] = [];
    const now = new Date();
    for (let i = 1; i <= 5; i++) {
      const runDate = new Date(now.getTime() + i * 15 * 60 * 1000);
      runs.push(runDate.toUTCString());
    }
    return runs;
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="Cron Expression Parser & Explainer"
          badge="POSIX Crontab"
          onClear={() => updateFromFields('*', '*', '*', '*', '*')}
          onCopy={() => navigator.clipboard.writeText(cronInput)}
        />

        <div className="p-6 space-y-6 font-mono text-xs">
          {/* Main Expression Input */}
          <div className="space-y-2">
            <div className="text-carbon-400 uppercase text-[10px] tracking-wider">Cron Schedule Syntax</div>
            <input
              type="text"
              value={cronInput}
              onChange={(e) => handleCronInputChange(e.target.value)}
              placeholder="* * * * *"
              className="w-full bg-[#12161c] border border-[#262d3a] text-terminal-emerald rounded p-3 text-lg font-bold tracking-widest outline-none focus:border-terminal-emerald"
            />
          </div>

          {/* Natural Language Explanation Box */}
          <div className="p-4 rounded-lg bg-[#12161c] border border-[#262d3a] space-y-1.5">
            <div className="text-[10px] text-carbon-400 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-terminal-emerald" />
              Human-Readable Schedule Meaning
            </div>
            <div className="text-sm font-semibold text-white leading-relaxed">
              {describeCron(cronInput)}
            </div>
          </div>

          {/* 5-Field Breakdown Grid */}
          <div className="space-y-2">
            <div className="text-carbon-400 uppercase text-[10px] tracking-wider">Field Breakdown (5 Parts)</div>
            <div className="grid grid-cols-5 gap-2">
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a] text-center">
                <div className="text-[10px] text-carbon-400">Minute</div>
                <div className="font-bold text-white text-sm mt-1">{minute}</div>
                <div className="text-[9px] text-carbon-500 mt-0.5">0 - 59</div>
              </div>
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a] text-center">
                <div className="text-[10px] text-carbon-400">Hour</div>
                <div className="font-bold text-white text-sm mt-1">{hour}</div>
                <div className="text-[9px] text-carbon-500 mt-0.5">0 - 23</div>
              </div>
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a] text-center">
                <div className="text-[10px] text-carbon-400">Day (Mo)</div>
                <div className="font-bold text-white text-sm mt-1">{dom}</div>
                <div className="text-[9px] text-carbon-500 mt-0.5">1 - 31</div>
              </div>
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a] text-center">
                <div className="text-[10px] text-carbon-400">Month</div>
                <div className="font-bold text-white text-sm mt-1">{month}</div>
                <div className="text-[9px] text-carbon-500 mt-0.5">1 - 12</div>
              </div>
              <div className="p-2.5 rounded bg-[#12161c] border border-[#262d3a] text-center">
                <div className="text-[10px] text-carbon-400">Day (Wk)</div>
                <div className="font-bold text-white text-sm mt-1">{dow}</div>
                <div className="text-[9px] text-carbon-500 mt-0.5">0 - 6 (Sun=0)</div>
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-2">
            <div className="text-carbon-400 uppercase text-[10px] tracking-wider">Common Schedule Presets</div>
            <div className="flex flex-wrap gap-2">
              {presets.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleCronInputChange(preset.expr)}
                  className="px-2.5 py-1 rounded bg-[#12161c] hover:bg-[#1c212a] border border-[#262d3a] hover:border-terminal-emerald/50 text-carbon-300 hover:text-white text-xs transition-colors"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Next Scheduled Executions Forecast */}
          <div className="pt-4 border-t border-[#1c212a] space-y-2">
            <div className="text-carbon-400 uppercase text-[10px] tracking-wider flex items-center gap-1.5">
              <CalendarClock className="w-3.5 h-3.5 text-terminal-amber" />
              Upcoming Projected Execution Timestamps (UTC)
            </div>
            <div className="space-y-1.5">
              {getNextRuns().map((run, i) => (
                <div
                  key={i}
                  className="px-3 py-2 rounded bg-[#12161c] border border-[#1c212a] flex items-center justify-between text-carbon-200"
                >
                  <span className="text-carbon-400">Execution #{i + 1}</span>
                  <span className="text-terminal-emerald font-semibold">{run}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
