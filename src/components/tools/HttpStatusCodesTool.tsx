'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { Network, Search, Copy, Check, ExternalLink } from 'lucide-react';

interface StatusCode {
  code: number;
  phrase: string;
  category: '1xx' | '2xx' | '3xx' | '4xx' | '5xx';
  description: string;
  cause: string;
  caching: string;
}

const STATUS_CODES: StatusCode[] = [
  { code: 100, phrase: 'Continue', category: '1xx', description: 'Client should proceed with the request body.', cause: 'Initial handshake with Expect: 100-continue header.', caching: 'Non-cacheable' },
  { code: 101, phrase: 'Switching Protocols', category: '1xx', description: 'Server agrees to switch protocols specified in Upgrade request header.', cause: 'WebSocket handshake upgrades.', caching: 'Non-cacheable' },
  { code: 200, phrase: 'OK', category: '2xx', description: 'Standard response for successful HTTP requests.', cause: 'Successful GET, POST, or PUT response.', caching: 'Cacheable by default' },
  { code: 201, phrase: 'Created', category: '2xx', description: 'Request succeeded and a new resource was created.', cause: 'Successful POST payload creating a database record.', caching: 'Cacheable with Location' },
  { code: 204, phrase: 'No Content', category: '2xx', description: 'Request succeeded with no response body to return.', cause: 'Successful DELETE action or background updates.', caching: 'Cacheable' },
  { code: 301, phrase: 'Moved Permanently', category: '3xx', description: 'Target resource has been assigned a new permanent URI.', cause: 'Permanent domain migration or canonical redirects.', caching: 'Cacheable by default' },
  { code: 302, phrase: 'Found', category: '3xx', description: 'Target resource resides temporarily under a different URI.', cause: 'Temporary authentication or maintenance routing.', caching: 'Non-cacheable by default' },
  { code: 304, phrase: 'Not Modified', category: '3xx', description: 'Resource has not been modified since the specified version.', cause: 'If-None-Match or If-Modified-Since validation success.', caching: 'Cache control refresh' },
  { code: 307, phrase: 'Temporary Redirect', category: '3xx', description: 'Redirect with strict HTTP method preservation.', cause: 'Preserves POST method across redirect destination.', caching: 'Non-cacheable' },
  { code: 308, phrase: 'Permanent Redirect', category: '3xx', description: 'Permanent redirect with strict HTTP method preservation.', cause: 'Modern replacement for 301 preserving method.', caching: 'Cacheable' },
  { code: 400, phrase: 'Bad Request', category: '4xx', description: 'Server cannot process request due to client error.', cause: 'Malformed JSON payload, invalid query parameters.', caching: 'Non-cacheable' },
  { code: 401, phrase: 'Unauthorized', category: '4xx', description: 'Authentication is required and has failed or not been provided.', cause: 'Missing Bearer token or expired API key.', caching: 'Non-cacheable' },
  { code: 403, phrase: 'Forbidden', category: '4xx', description: 'Server understood request but refuses authorization.', cause: 'User is authenticated but lacks required RBAC scope.', caching: 'Non-cacheable' },
  { code: 404, phrase: 'Not Found', category: '4xx', description: 'Origin server did not find a current representation for target.', cause: 'Non-existent route, deleted resource ID.', caching: 'Cacheable with headers' },
  { code: 405, phrase: 'Method Not Allowed', category: '4xx', description: 'Target resource does not support the request HTTP method.', cause: 'POST sent to a GET-only API endpoint.', caching: 'Cacheable' },
  { code: 409, phrase: 'Conflict', category: '4xx', description: 'Request conflicts with current state of the target resource.', cause: 'Concurrent write collisions or duplicate unique key in DB.', caching: 'Non-cacheable' },
  { code: 422, phrase: 'Unprocessable Entity', category: '4xx', description: 'Request was well-formed but contains semantic errors.', cause: 'Validation schema failure (e.g. invalid email format).', caching: 'Non-cacheable' },
  { code: 429, phrase: 'Too Many Requests', category: '4xx', description: 'User has sent too many requests in a given amount of time.', cause: 'Rate limiting middleware triggered.', caching: 'Non-cacheable (Check Retry-After)' },
  { code: 500, phrase: 'Internal Server Error', category: '5xx', description: 'Server encountered an unexpected condition preventing request fulfillment.', cause: 'Unhandled backend exceptions, crashed processes.', caching: 'Non-cacheable' },
  { code: 502, phrase: 'Bad Gateway', category: '5xx', description: 'Gateway/proxy received an invalid response from upstream server.', cause: 'Reverse proxy (NGINX/Cloudflare) backend app failure.', caching: 'Non-cacheable' },
  { code: 503, phrase: 'Service Unavailable', category: '5xx', description: 'Server is currently unable to handle request due to overload or maintenance.', cause: 'Out of memory, server maintenance, autoscaling lag.', caching: 'Non-cacheable (Check Retry-After)' },
  { code: 504, phrase: 'Gateway Timeout', category: '5xx', description: 'Server acting as gateway did not receive timely response from upstream.', cause: 'Slow database query or deadlocked upstream service.', caching: 'Non-cacheable' },
];

export const HttpStatusCodesTool: React.FC = () => {
  const [filter, setFilter] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCodes = STATUS_CODES.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.code.toString().includes(filter) ||
      item.phrase.toLowerCase().includes(filter.toLowerCase()) ||
      item.description.toLowerCase().includes(filter.toLowerCase()) ||
      item.cause.toLowerCase().includes(filter.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getBadgeColor = (category: string) => {
    switch (category) {
      case '1xx': return 'text-terminal-cyan border-cyan-800 bg-cyan-950/20';
      case '2xx': return 'text-terminal-emerald border-emerald-800 bg-emerald-950/20';
      case '3xx': return 'text-terminal-amber border-amber-800 bg-amber-950/20';
      case '4xx': return 'text-orange-400 border-orange-800 bg-orange-950/20';
      case '5xx': return 'text-terminal-rose border-rose-800 bg-rose-950/20';
      default: return 'text-white border-[#262d3a] bg-[#12161c]';
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="HTTP Status Code Reference"
          badge="RFC 7231 / 6585"
          onClear={() => {
            setFilter('');
            setSelectedCategory('all');
          }}
        />

        {/* Search and Category Filters */}
        <div className="p-4 bg-[#12161c] border-b border-[#262d3a] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-carbon-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Filter by code, name, or cause (e.g. 404, rate limit, redirect)..."
              className="w-full bg-[#1c212a] border border-[#262d3a] text-white rounded pl-8 pr-3 py-1.5 outline-none focus:border-terminal-emerald text-xs"
            />
          </div>

          <div className="flex items-center gap-1.5">
            {['all', '1xx', '2xx', '3xx', '4xx', '5xx'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded text-xs transition-colors uppercase ${
                  selectedCategory === cat
                    ? 'bg-terminal-emerald text-black font-semibold'
                    : 'bg-[#1c212a] text-carbon-300 hover:text-white border border-[#262d3a]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status Codes Table */}
        <div className="p-4 space-y-3 font-mono">
          <div className="text-[11px] text-carbon-400 uppercase tracking-wider mb-2">
            Showing {filteredCodes.length} Status Codes
          </div>

          <div className="grid grid-cols-1 gap-3">
            {filteredCodes.map((item) => (
              <div
                key={item.code}
                className="p-3.5 rounded-lg bg-[#12161c] border border-[#262d3a] hover:border-[#363f52] transition-colors"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-0.5 rounded text-sm font-bold border ${getBadgeColor(item.category)}`}>
                      {item.code}
                    </span>
                    <span className="text-white font-semibold text-sm">{item.phrase}</span>
                  </div>

                  <span className="text-[10px] text-carbon-400 bg-[#1c212a] px-2 py-0.5 rounded border border-[#262d3a]">
                    {item.caching}
                  </span>
                </div>

                <div className="text-xs text-carbon-200 leading-relaxed mb-2">
                  {item.description}
                </div>

                <div className="text-[11px] text-carbon-400 bg-[#090b0e] p-2 rounded border border-[#1c212a]">
                  <strong className="text-carbon-300">Typical Cause:</strong> {item.cause}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
