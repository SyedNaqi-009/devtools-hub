'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { AlertCircle, ArrowRight, Code } from 'lucide-react';

export const CsvToJsonTool: React.FC = () => {
  const [csvInput, setCsvInput] = useState<string>(`id,name,role,salary,remote
1,Marcus Aurelius,Lead Architect,165000,true
2,Ada Lovelace,Cryptographer,178000,true
3,Alan Turing,Systems Analyst,192000,false`);
  const [hasHeaders, setHasHeaders] = useState<boolean>(true);
  const [autoCoerce, setAutoCoerce] = useState<boolean>(true);
  const [jsonOutput, setJsonOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // RFC 4180 CSV line parser
  const parseCsv = (text: string) => {
    const lines: string[][] = [];
    let row: string[] = [];
    let inQuotes = false;
    let currentCell = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentCell += '"';
          i++; // skip escaped quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentCell.trim());
        currentCell = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        row.push(currentCell.trim());
        if (row.some((cell) => cell.length > 0)) {
          lines.push(row);
        }
        row = [];
        currentCell = '';
      } else {
        currentCell += char;
      }
    }

    if (currentCell.length > 0 || row.length > 0) {
      row.push(currentCell.trim());
      if (row.some((cell) => cell.length > 0)) {
        lines.push(row);
      }
    }

    return lines;
  };

  const coerceValue = (val: string) => {
    if (!autoCoerce) return val;
    if (val === '') return null;
    if (val.toLowerCase() === 'true') return true;
    if (val.toLowerCase() === 'false') return false;
    if (val.toLowerCase() === 'null') return null;
    if (!isNaN(Number(val)) && val.trim() !== '') {
      return Number(val);
    }
    return val;
  };

  const convertCsvToJson = () => {
    if (!csvInput.trim()) {
      setError(null);
      setJsonOutput('');
      return;
    }

    try {
      const parsedRows = parseCsv(csvInput.trim());
      if (parsedRows.length === 0) {
        throw new Error('CSV input is empty.');
      }

      let result: any[];

      if (hasHeaders) {
        const headers = parsedRows[0];
        const dataRows = parsedRows.slice(1);
        result = dataRows.map((row) => {
          const obj: Record<string, any> = {};
          headers.forEach((h, idx) => {
            obj[h || `col_${idx}`] = coerceValue(row[idx] ?? '');
          });
          return obj;
        });
      } else {
        result = parsedRows.map((row) => row.map(coerceValue));
      }

      setJsonOutput(JSON.stringify(result, null, 2));
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to parse CSV');
      setJsonOutput('');
    }
  };

  const handleDownload = () => {
    if (!jsonOutput) return;
    const blob = new Blob([jsonOutput], { type: 'application/json;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'converted-dataset.json');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="CSV to JSON Converter"
          badge="Coercion Engine"
          onClear={() => {
            setCsvInput('');
            setJsonOutput('');
            setError(null);
          }}
          onCopy={jsonOutput ? () => navigator.clipboard.writeText(jsonOutput) : undefined}
          onDownload={jsonOutput ? handleDownload : undefined}
          onSample={() => {
            setCsvInput(`product_code,sku_name,stock_qty,unit_price,is_active
SKU-9901,Mechanical Keyboard ANSI,120,89.99,true
SKU-9902,USB-C Braided Cable 2M,450,14.50,true
SKU-9903,Desk Mat 900x400 Stealth,0,29.00,false`);
            setError(null);
          }}
          customActions={
            <div className="flex items-center gap-2">
              <label className="text-xs font-mono text-carbon-300 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasHeaders}
                  onChange={(e) => setHasHeaders(e.target.checked)}
                  className="rounded border-[#262d3a] bg-[#12161c] text-terminal-emerald focus:ring-0"
                />
                <span>Header Row</span>
              </label>

              <label className="text-xs font-mono text-carbon-300 flex items-center gap-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoCoerce}
                  onChange={(e) => setAutoCoerce(e.target.checked)}
                  className="rounded border-[#262d3a] bg-[#12161c] text-terminal-emerald focus:ring-0"
                />
                <span>Coerce Types</span>
              </label>

              <button
                type="button"
                onClick={convertCsvToJson}
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
              <span>Input CSV</span>
              <span>{csvInput.length} chars</span>
            </div>
            <textarea
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              rows={15}
              placeholder="Paste raw CSV content with or without quotes..."
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Output JSON</span>
              <span>{jsonOutput.length} chars</span>
            </div>
            <textarea
              value={jsonOutput}
              readOnly
              rows={15}
              placeholder="Structured JSON array will appear here..."
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
