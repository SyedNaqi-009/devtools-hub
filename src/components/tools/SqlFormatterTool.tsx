'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { Database, Minimize2, Check, ArrowRight } from 'lucide-react';

export const SqlFormatterTool: React.FC = () => {
  const [inputSql, setInputSql] = useState<string>(
    `select u.id, u.email, p.plan_name, sum(o.total_cents) as lifetime_spend from users u left join subscriptions s on u.id = s.user_id left join plans p on s.plan_id = p.id left join orders o on u.id = o.user_id where u.is_active = true and u.created_at >= '2024-01-01' group by u.id, u.email, p.plan_name having sum(o.total_cents) > 10000 order by lifetime_spend desc limit 50;`
  );
  const [outputSql, setOutputSql] = useState<string>('');
  const [indentSpaces, setIndentSpaces] = useState<'2' | '4'>('2');

  const sqlKeywords = [
    'SELECT', 'FROM', 'WHERE', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'JOIN',
    'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'UNION ALL', 'UNION', 'INSERT INTO',
    'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'CREATE TABLE', 'ALTER TABLE', 'DROP TABLE',
    'AND', 'OR', 'AS', 'ON', 'IN', 'NOT IN', 'EXISTS', 'NOT EXISTS', 'LIKE', 'ILIKE',
    'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'DESC', 'ASC', 'IS NULL', 'IS NOT NULL'
  ];

  const formatSql = () => {
    if (!inputSql.trim()) {
      setOutputSql('');
      return;
    }

    const spaces = indentSpaces === '2' ? '  ' : '    ';
    let formatted = inputSql.trim();

    // Standard major clause boundaries to split and indent
    const majorClauses = [
      'SELECT', 'FROM', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'FULL JOIN', 'JOIN',
      'WHERE', 'GROUP BY', 'HAVING', 'ORDER BY', 'LIMIT', 'OFFSET', 'VALUES', 'SET'
    ];

    // Regex replace to ensure keywords are uppercase
    sqlKeywords.forEach((kw) => {
      const reg = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(reg, kw);
    });

    // Clean multiple spaces into single space
    formatted = formatted.replace(/\s+/g, ' ');

    // Break lines before major clauses
    majorClauses.forEach((clause) => {
      const reg = new RegExp(`\\s+(${clause})\\s+`, 'g');
      formatted = formatted.replace(reg, `\n$1 `);
    });

    // Break lines before AND / OR in WHERE/HAVING
    formatted = formatted.replace(/\s+(AND|OR)\s+/g, `\n${spaces}$1 `);

    // Break lines on JOIN conditions
    formatted = formatted.replace(/\s+(ON)\s+/g, `\n${spaces}$1 `);

    // Indent sub-clauses
    const lines = formatted.split('\n').map((line) => {
      const trimmed = line.trim();
      const isMajor = majorClauses.some((c) => trimmed.startsWith(c));
      if (!isMajor && trimmed.length > 0) {
        return `${spaces}${trimmed}`;
      }
      return trimmed;
    });

    setOutputSql(lines.join('\n'));
  };

  const minifySql = () => {
    if (!inputSql.trim()) return;
    const minified = inputSql.replace(/\s+/g, ' ').trim();
    setOutputSql(minified);
  };

  React.useEffect(() => {
    formatSql();
  }, [inputSql, indentSpaces]);

  const handleDownload = () => {
    if (!outputSql) return;
    const blob = new Blob([outputSql], { type: 'text/sql;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'formatted-query.sql');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="SQL Formatter & Beautifier"
          badge="ANSI / PostgreSQL"
          onClear={() => {
            setInputSql('');
            setOutputSql('');
          }}
          onCopy={outputSql ? () => navigator.clipboard.writeText(outputSql) : undefined}
          onDownload={outputSql ? handleDownload : undefined}
          onSample={() => {
            setInputSql(
              'insert into audit_logs (actor_id, action, target_type, ip_address, created_at) values (9021, "user_login_success", "auth_session", "192.168.1.1", now());'
            );
          }}
          customActions={
            <div className="flex items-center gap-2">
              <select
                value={indentSpaces}
                onChange={(e) => setIndentSpaces(e.target.value as any)}
                className="bg-[#1c212a] border border-[#262d3a] text-carbon-200 text-xs rounded px-2 py-1 outline-none"
              >
                <option value="2">2 Spaces</option>
                <option value="4">4 Spaces</option>
              </select>

              <button
                type="button"
                onClick={formatSql}
                className="flex items-center gap-1 px-3 py-1 rounded bg-terminal-emerald text-black font-semibold hover:bg-emerald-400 text-xs transition-colors"
              >
                <span>Format</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={minifySql}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#1c212a] text-carbon-300 hover:text-white border border-[#262d3a] text-xs transition-colors"
              >
                <Minimize2 className="w-3.5 h-3.5" />
                <span>Single Line</span>
              </button>
            </div>
          }
        />

        <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Input SQL Query</span>
              <span>{inputSql.length} chars</span>
            </div>
            <textarea
              value={inputSql}
              onChange={(e) => setInputSql(e.target.value)}
              rows={16}
              placeholder="Paste raw SQL statement..."
              className="w-full carbon-editor p-3 rounded-md"
              spellCheck={false}
            />
          </div>

          <div>
            <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
              <span>Formatted SQL</span>
              <span>{outputSql.length} chars</span>
            </div>
            <textarea
              value={outputSql}
              readOnly
              rows={16}
              placeholder="Beautified SQL will appear here..."
              className="w-full carbon-editor p-3 rounded-md bg-[#090b0e] text-terminal-emerald"
              spellCheck={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
