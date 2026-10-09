'use client';

import React from 'react';
import dynamic from 'next/dynamic';

// Dynamically import tools from ./tools/ with SSR disabled for pure client-side sandbox execution
const JsonFormatterTool = dynamic(() => import('./tools/JsonFormatterTool').then(mod => mod.JsonFormatterTool), { ssr: false });
const JsonToCsvTool = dynamic(() => import('./tools/JsonToCsvTool').then(mod => mod.JsonToCsvTool), { ssr: false });
const CsvToJsonTool = dynamic(() => import('./tools/CsvToJsonTool').then(mod => mod.CsvToJsonTool), { ssr: false });
const JsonToTypeScriptTool = dynamic(() => import('./tools/JsonToTypeScriptTool').then(mod => mod.JsonToTypeScriptTool), { ssr: false });
const JsonMinifierTool = dynamic(() => import('./tools/JsonMinifierTool').then(mod => mod.JsonMinifierTool), { ssr: false });

const UuidGeneratorTool = dynamic(() => import('./tools/UuidGeneratorTool').then(mod => mod.UuidGeneratorTool), { ssr: false });
const PasswordGeneratorTool = dynamic(() => import('./tools/PasswordGeneratorTool').then(mod => mod.PasswordGeneratorTool), { ssr: false });
const HashGeneratorTool = dynamic(() => import('./tools/HashGeneratorTool').then(mod => mod.HashGeneratorTool), { ssr: false });
const JwtDecoderTool = dynamic(() => import('./tools/JwtDecoderTool').then(mod => mod.JwtDecoderTool), { ssr: false });

const Base64EncoderDecoderTool = dynamic(() => import('./tools/Base64EncoderDecoderTool').then(mod => mod.Base64EncoderDecoderTool), { ssr: false });
const UrlEncoderDecoderTool = dynamic(() => import('./tools/UrlEncoderDecoderTool').then(mod => mod.UrlEncoderDecoderTool), { ssr: false });
const HtmlEntityEncoderTool = dynamic(() => import('./tools/HtmlEntityEncoderTool').then(mod => mod.HtmlEntityEncoderTool), { ssr: false });

const TimestampConverterTool = dynamic(() => import('./tools/TimestampConverterTool').then(mod => mod.TimestampConverterTool), { ssr: false });
const CronExpressionGeneratorTool = dynamic(() => import('./tools/CronExpressionGeneratorTool').then(mod => mod.CronExpressionGeneratorTool), { ssr: false });
const UrlParserTool = dynamic(() => import('./tools/UrlParserTool').then(mod => mod.UrlParserTool), { ssr: false });
const HttpStatusCodesTool = dynamic(() => import('./tools/HttpStatusCodesTool').then(mod => mod.HttpStatusCodesTool), { ssr: false });

const TextDiffCheckerTool = dynamic(() => import('./tools/TextDiffCheckerTool').then(mod => mod.TextDiffCheckerTool), { ssr: false });
const RegexTesterTool = dynamic(() => import('./tools/RegexTesterTool').then(mod => mod.RegexTesterTool), { ssr: false });
const SqlFormatterTool = dynamic(() => import('./tools/SqlFormatterTool').then(mod => mod.SqlFormatterTool), { ssr: false });
const CodeMinifierTool = dynamic(() => import('./tools/CodeMinifierTool').then(mod => mod.CodeMinifierTool), { ssr: false });

interface ToolRendererProps {
  slug: string;
}

export const ToolRenderer: React.FC<ToolRendererProps> = ({ slug }) => {
  switch (slug) {
    case 'json-formatter':
      return <JsonFormatterTool />;
    case 'json-to-csv':
      return <JsonToCsvTool />;
    case 'csv-to-json':
      return <CsvToJsonTool />;
    case 'json-to-typescript':
      return <JsonToTypeScriptTool />;
    case 'json-minifier':
      return <JsonMinifierTool />;

    case 'uuid-generator':
      return <UuidGeneratorTool />;
    case 'password-generator':
      return <PasswordGeneratorTool />;
    case 'hash-generator':
      return <HashGeneratorTool />;
    case 'jwt-decoder':
      return <JwtDecoderTool />;

    case 'base64-encoder-decoder':
      return <Base64EncoderDecoderTool />;
    case 'url-encoder-decoder':
      return <UrlEncoderDecoderTool />;
    case 'html-entity-encoder':
      return <HtmlEntityEncoderTool />;

    case 'timestamp-converter':
      return <TimestampConverterTool />;
    case 'cron-expression-generator':
      return <CronExpressionGeneratorTool />;
    case 'url-parser':
      return <UrlParserTool />;
    case 'http-status-codes':
      return <HttpStatusCodesTool />;

    case 'text-diff-checker':
      return <TextDiffCheckerTool />;
    case 'regex-tester':
      return <RegexTesterTool />;
    case 'sql-formatter':
      return <SqlFormatterTool />;
    case 'code-minifier':
      return <CodeMinifierTool />;

    default:
      return (
        <div className="p-8 text-center font-mono text-carbon-400 bg-[#0d1015] rounded-lg border border-[#262d3a]">
          Tool component not found for &quot;{slug}&quot;
        </div>
      );
  }
};
