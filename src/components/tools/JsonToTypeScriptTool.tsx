'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { AlertCircle, Code2, ArrowRight } from 'lucide-react';

export const JsonToTypeScriptTool: React.FC = () => {
  const [jsonInput, setJsonInput] = useState<string>(`{
  "id": "usr_99812",
  "username": "dev_operator",
  "email": "operator@infra.io",
  "isActive": true,
  "roles": ["admin", "maintainer"],
  "profile": {
    "displayName": "Dev Operator",
    "avatarUrl": null,
    "githubId": 120938
  },
  "quota": {
    "storageGb": 250,
    "bandwidthTb": 10.5
  }
}`);
  const [rootName, setRootName] = useState<string>('RootObject');
  const [exportType, setExportType] = useState<'interface' | 'type'>('interface');
  const [tsOutput, setTsOutput] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const generateTypes = () => {
    if (!jsonInput.trim()) {
      setError(null);
      setTsOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const generatedTypes: { name: string; content: string }[] = [];

      const inferType = (val: any, fieldName: string): string => {
        if (val === null) return 'null | any';
        if (Array.isArray(val)) {
          if (val.length === 0) return 'any[]';
          const innerType = inferType(val[0], `${fieldName}Item`);
          return `${innerType}[]`;
        }
        if (typeof val === 'object') {
          const subTypeName = capitalize(fieldName);
          buildInterface(val, subTypeName);
          return subTypeName;
        }
        if (typeof val === 'string') return 'string';
        if (typeof val === 'number') return 'number';
        if (typeof val === 'boolean') return 'boolean';
        return 'any';
      };

      const buildInterface = (obj: any, name: string) => {
        if (typeof obj !== 'object' || obj === null) return;
        const lines: string[] = [];

        Object.keys(obj).forEach((key) => {
          const val = obj[key];
          const inferred = inferType(val, key);
          const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
          lines.push(`  ${safeKey}: ${inferred};`);
        });

        const declaration =
          exportType === 'interface'
            ? `export interface ${name} {\n${lines.join('\n')}\n}`
            : `export type ${name} = {\n${lines.join('\n')}\n};`;

        // Avoid duplicates if already generated
        if (!generatedTypes.some((t) => t.name === name)) {
          generatedTypes.push({ name, content: declaration });
        }
      };

      if (Array.isArray(parsed)) {
        if (parsed.length > 0 && typeof parsed[0] === 'object') {
          buildInterface(parsed[0], rootName);
          const arrayDef =
            exportType === 'interface'
              ? `export type ${rootName}List = ${rootName}[];`
              : `export type ${rootName}List = ${rootName}[];`;
          generatedTypes.push({ name: `${rootName}List`, content: arrayDef });
        } else {
          generatedTypes.push({
            name: rootName,
            content: `export type ${rootName} = any[];`,
          });
        }
      } else if (typeof parsed === 'object' && parsed !== null) {
        buildInterface(parsed, rootName);
      } else {
        throw new Error('JSON root must be an Object or an Array.');
      }

      // Reverse so dependencies render before root or in logical order
      const fullCode = generatedTypes.map((t) => t.content).join('\n\n');
      setTsOutput(fullCode);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Invalid JSON syntax');
      setTsOutput('');
    }
  };

  const handleDownload = () => {
    if (!tsOutput) return;
    const blob = new Blob([tsOutput], { type: 'text/typescript;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${rootName.toLowerCase()}.types.ts`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="JSON to TypeScript Interface"
          badge="Type Inferencer"
          onClear={() => {
            setJsonInput('');
            setTsOutput('');
            setError(null);
          }}
          onCopy={tsOutput ? () => navigator.clipboard.writeText(tsOutput) : undefined}
          onDownload={tsOutput ? handleDownload : undefined}
          onSample={() => {
            setJsonInput(`{
  "apiStatus": "ok",
  "statusCode": 200,
  "data": {
    "user": {
      "id": 48201,
      "email": "sarah@cloudnative.dev",
      "permissions": ["read:logs", "write:deployments"]
    },
    "tokensRemaining": 48900
  }
}`);
            setError(null);
          }}
          customActions={
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={rootName}
                onChange={(e) => setRootName(e.target.value || 'Root')}
                placeholder="Root Interface"
                className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 text-xs rounded px-2 py-1 w-28 outline-none"
              />

              <select
                value={exportType}
                onChange={(e) => setExportType(e.target.value as any)}
                className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 text-xs rounded px-2 py-1 outline-none"
              >
                <option value="interface">Interface</option>
                <option value="type">Type Alias</option>
              </select>

              <button
                type="button"
                onClick={generateTypes}
                className="flex items-center gap-1 px-3 py-1 rounded bg-terminal-emerald text-black font-semibold hover:bg-emerald-400 text-xs transition-colors"
              >
                <span>Generate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          }
        />

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Input JSON Data</span>
              <span>{jsonInput.length} chars</span>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              rows={16}
              placeholder="Paste JSON sample here..."
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>TypeScript Output</span>
              <span>{tsOutput.length} chars</span>
            </div>
            <textarea
              value={tsOutput}
              readOnly
              rows={16}
              placeholder="Inferred TypeScript interfaces will appear here..."
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
