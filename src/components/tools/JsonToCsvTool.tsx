'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { AlertCircle, Table, ArrowRight, Download, FileSpreadsheet } from 'lucide-react';

export const JsonToCsvTool: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(`[
  { "id": 101, "name": "Alice Miller", "email": "alice@example.com", "role": "Engineer", "active": true },
  { "id": 102, "name": "Bob Chen", "email": "bob@example.com", "role": "DevOps", "active": false },
  { "id": 103, "name": "Carol Vance", "email": "carol@example.com", "role": "Security", "active": true }
]`);
  const [delimiter, setDelimiter] = useState<',' | ';' | '\t'>(',');
  const [flattenNested, setFlattenNested] = useState<boolean>(true);
  const [csvOutput, setCsvOutput] = useState<string>('');
  const [previewRows, setPreviewRows] = useState<string[][]>([]);
  const [error, setError] = useState<string | null>(null);

  // Flatten nested object helper
  const flattenObject = (obj: any, prefix = ''): Record<string, any> => {
    return Object.keys(obj).reduce((acc: any, k: string) => {
      const pre = prefix.length ? `${prefix}.` : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = Array.isArray(obj[k]) ? JSON.stringify(obj[k]) : obj[k];
      }
      return acc;
    }, {});
  };

  const convertJsonToCsv = () => {
    if (!jsonInput.trim()) {
      setError(null);
      setCsvOutput('');
      setPreviewRows([]);
      return;
    }

    try {
      let parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        if (typeof parsed === 'object' && parsed !== null) {
          parsed = [parsed];
        } else {
          throw new Error('Input must be a JSON array of objects or a single JSON object.');
        }
      }

      if (parsed.length === 0) {
        throw new Error('JSON array is empty.');
      }

      const processedItems: any[] = (parsed as any[]).map((item: any) =>
        flattenNested && typeof item === 'object' && item !== null ? flattenObject(item) : item
      );

      // Extract all unique headers across all objects
      const headersSet = new Set<string>();
      processedItems.forEach((item: any) => {
        if (typeof item === 'object' && item !== null) {
          Object.keys(item).forEach((k) => headersSet.add(k));
        }
      });
      const headers = Array.from(headersSet);

      const escapeCell = (val: any) => {
        if (val === null || val === undefined) return '';
        const str = String(val);
        if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
          return `"${str.replace(/"/g, '""')}"`;
        }
        return str;
      };

      const rows: string[][] = [headers];
      const csvLines: string[] = [headers.map(escapeCell).join(delimiter)];

      for (const item of processedItems) {
        const row = headers.map((header) => {
          const val = item ? item[header] : '';
          return val === undefined || val === null ? '' : String(val);
        });
        rows.push(row);
        csvLines.push(row.map(escapeCell).join(delimiter));
      }

      setCsvOutput(csvLines.join('\n'));
      setPreviewRows(rows);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to convert JSON to CSV');
      setCsvOutput('');
      setPreviewRows([]);
    }
  };

  const handleDownload = () => {
    if (!csvOutput) return;
    const blob = new Blob([csvOutput], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'exported-data.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      {/* Workbench Card */}
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="JSON to CSV Converter"
          badge="RFC 4180"
          onClear={() => {
            setJsonInput('');
            setCsvOutput('');
            setPreviewRows([]);
            setError(null);
          }}
          onCopy={csvOutput ? () => navigator.clipboard.writeText(csvOutput) : undefined}
          onDownload={csvOutput ? handleDownload : undefined}
          onSample={() => {
            setJsonInput(`[
  { "orderId": 901, "customer": { "name": "Jane Doe", "tier": "Enterprise" }, "amount": 1490.50, "fulfilled": true },
  { "orderId": 902, "customer": { "name": "Mark Smith", "tier": "Startup" }, "amount": 340.00, "fulfilled": false }
]`);
            setError(null);
          }}
          customActions={
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-carbon-300 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={flattenNested}
                  onChange={(e) => setFlattenNested(e.target.checked)}
                  className="rounded border-[#262d3a] bg-[#12161c] text-terminal-emerald focus:ring-0"
                />
                <span>Flatten Objects</span>
              </label>

              <select
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value as any)}
                className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 text-xs rounded px-2 py-1 outline-none"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="&#9;">Tab (\t)</option>
              </select>

              <button
                type="button"
                onClick={convertJsonToCsv}
                className="flex items-center gap-1 px-3 py-1 rounded bg-terminal-emerald text-black font-semibold hover:bg-emerald-400 text-xs transition-colors"
              >
                <span>Convert</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          }
        />

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Input JSON (Array of Objects)</span>
              <span>{jsonInput.length} chars</span>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={14}
              placeholder="Paste JSON array here..."
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Output CSV (Raw View)</span>
              <span>{csvOutput.length} chars</span>
            </div>
            <textarea
              value={csvOutput}
              readOnly
              rows={14}
              placeholder="Converted CSV output will appear here..."
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

        {/* Live Tabular Grid Preview */}
        {previewRows.length > 0 && (
          <div className="border-t border-[#262d3a] p-4 bg-[#090b0e]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-carbon-300 flex items-center gap-1.5">
                <Table className="w-3.5 h-3.5 text-terminal-emerald" />
                Live Table Preview ({previewRows.length - 1} records)
              </span>
            </div>
            <div className="overflow-x-auto max-h-64 border border-[#262d3a] rounded">
              <table className="w-full text-left font-mono text-xs text-carbon-200">
                <thead className="bg-[#161b22] text-white uppercase text-[11px] border-b border-[#262d3a]">
                  <tr>
                    {previewRows[0].map((header, i) => (
                      <th key={i} className="px-3 py-2 font-medium">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1c212a]">
                  {previewRows.slice(1, 11).map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-[#12161c]">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="px-3 py-2 whitespace-nowrap">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {previewRows.length > 11 && (
              <div className="text-[10px] font-mono text-carbon-500 mt-1">
                Showing first 10 rows preview. Full {previewRows.length - 1} rows exported in CSV.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
