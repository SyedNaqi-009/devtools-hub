'use client';

import React, { useState } from 'react';
import { Copy, Check, Trash2, Download, RefreshCw, FileText } from 'lucide-react';

interface ToolWorkbenchHeaderProps {
  title: string;
  badge?: string;
  onClear?: () => void;
  onCopy?: () => void;
  onDownload?: () => void;
  onSample?: () => void;
  customActions?: React.ReactNode;
}

export const ToolWorkbenchHeader: React.FC<ToolWorkbenchHeaderProps> = ({
  title,
  badge,
  onClear,
  onCopy,
  onDownload,
  onSample,
  customActions,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-[#12161c] border-b border-[#262d3a] rounded-t-lg">
      <div className="flex items-center gap-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-carbon-200">
          {title}
        </span>
        {badge && (
          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono uppercase bg-[#1c212a] border border-[#262d3a] text-terminal-emerald">
            {badge}
          </span>
        )}
      </div>

      <div className="flex items-center gap-1.5 font-mono text-xs">
        {onSample && (
          <button
            onClick={onSample}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c212a] hover:bg-[#262d3a] text-carbon-200 hover:text-white border border-[#262d3a] transition-colors"
            title="Load sample input"
          >
            <FileText className="w-3.5 h-3.5 text-terminal-amber" />
            <span>Sample</span>
          </button>
        )}

        {customActions}

        {onClear && (
          <button
            onClick={onClear}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c212a] hover:bg-rose-950/40 text-carbon-300 hover:text-rose-400 border border-[#262d3a] hover:border-rose-900 transition-colors"
            title="Clear workbench"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}

        {onCopy && (
          <button
            onClick={handleCopy}
            type="button"
            className={`flex items-center gap-1 px-2.5 py-1 rounded border transition-colors ${
              copied
                ? 'bg-terminal-emerald/20 text-terminal-emerald border-terminal-emerald'
                : 'bg-[#1c212a] hover:bg-[#262d3a] text-carbon-200 hover:text-white border-[#262d3a]'
            }`}
            title="Copy to clipboard"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-terminal-emerald" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        )}

        {onDownload && (
          <button
            onClick={onDownload}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-terminal-emerald/10 hover:bg-terminal-emerald/20 text-terminal-emerald border border-terminal-emerald/40 transition-colors"
            title="Download file"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>
        )}
      </div>
    </div>
  );
};
