'use client';

import React, { useState } from 'react';
import { ToolWorkbenchHeader } from '../ToolWorkbenchHeader';
import { ShieldAlert, AlertCircle, Clock, CheckCircle2, Lock } from 'lucide-react';

export const JwtDecoderTool: React.FC = () => {
  const [tokenInput, setTokenInput] = useState<string>(
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFsZXggVmFuY2UiLCJyb2xlIjoiU2VjdXJpdHkgRW5naW5lZXIiLCJpYXQiOjE3Mjg1MTEyMDAsImV4cCI6MTc5MTU4OTYwMCwiaXNzIjoiZGV2dG9vbHMtaHViLmNsb3VkIn0.dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'
  );
  const [headerJson, setHeaderJson] = useState<string>('');
  const [payloadJson, setPayloadJson] = useState<string>('');
  const [signatureRaw, setSignatureRaw] = useState<string>('');
  const [claimsMeta, setClaimsMeta] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState<string | null>(null);

  // Safe base64url decode
  const base64UrlDecode = (str: string) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  };

  const decodeJwt = () => {
    if (!tokenInput.trim()) {
      setHeaderJson('');
      setPayloadJson('');
      setSignatureRaw('');
      setClaimsMeta({});
      setError(null);
      return;
    }

    try {
      const parts = tokenInput.trim().split('.');
      if (parts.length !== 3) {
        throw new Error('JWT must contain exactly 3 segments separated by dots (header.payload.signature).');
      }

      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));

      setHeaderJson(JSON.stringify(decodedHeader, null, 2));
      setPayloadJson(JSON.stringify(decodedPayload, null, 2));
      setSignatureRaw(parts[2]);

      // Parse standard timestamp claims (iat, exp, nbf)
      const meta: { [key: string]: string } = {};
      const nowSec = Math.floor(Date.now() / 1000);

      if (decodedPayload.exp) {
        const expDate = new Date(decodedPayload.exp * 1000);
        const diff = decodedPayload.exp - nowSec;
        const expired = diff <= 0;
        meta['exp'] = `${expDate.toUTCString()} (${expired ? 'EXPIRED' : `Expires in ${Math.round(diff / 60)} minutes`})`;
      }

      if (decodedPayload.iat) {
        const iatDate = new Date(decodedPayload.iat * 1000);
        meta['iat'] = `${iatDate.toUTCString()} (Issued at)`;
      }

      if (decodedPayload.nbf) {
        const nbfDate = new Date(decodedPayload.nbf * 1000);
        meta['nbf'] = `${nbfDate.toUTCString()} (Not valid before)`;
      }

      setClaimsMeta(meta);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to decode JWT string.');
      setHeaderJson('');
      setPayloadJson('');
      setSignatureRaw('');
      setClaimsMeta({});
    }
  };

  React.useEffect(() => {
    decodeJwt();
  }, [tokenInput]);

  return (
    <div className="space-y-6">
      {/* Explicit Security Notice */}
      <div className="p-3.5 rounded-lg bg-amber-950/30 border border-amber-800 text-amber-200 font-mono text-xs flex items-start gap-2.5">
        <ShieldAlert className="w-4 h-4 text-terminal-amber shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-100">CLIENT-SIDE INSPECTION ONLY:</span> This tool decodes
          base64url payload representations in your local browser tab for developer debugging. It does{' '}
          <strong>NOT</strong> cryptographically verify signature authenticity without secrets or public keys.
          Never paste confidential production secrets into untrusted tools.
        </div>
      </div>

      <div className="rounded-lg border border-[#262d3a] bg-[#0d1015] overflow-hidden">
        <ToolWorkbenchHeader
          title="JWT Token Inspector"
          badge="RFC 7519"
          onClear={() => setTokenInput('')}
          onCopy={tokenInput ? () => navigator.clipboard.writeText(tokenInput) : undefined}
          onSample={() => {
            setTokenInput(
              'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFwaS1rZXktMDIifQ.eyJpc3MiOiJodHRwczovL2F1dGguZGV2dG9vbHMuaW8iLCJzdWIiOiJkZXZlbG9wZXJfMDM5MSIsImF1ZCI6WyJodHRwczovL2FwaS5kZXZ0b29scy5pbyJdLCJpYXQiOjE3Mjg1MTEyMDAsImV4cCI6MTgwMDAwMDAwMCwiZW1haWwiOiJkZXZAY2xvdWQub3JnIiwicm9sZXMiOlsic3lzYWRtaW4iLCJkZXZlbG9wZXIiXX0.p_rN_q2y8Pz'
            );
          }}
        />

        {/* Input JWT */}
        <div className="p-4 border-b border-[#262d3a]">
          <div className="text-xs font-mono text-carbon-400 mb-1.5 flex justify-between">
            <span>Encoded JSON Web Token (JWT)</span>
            <span>{tokenInput.length} characters</span>
          </div>
          <textarea
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            rows={4}
            placeholder="Paste your JWT here (header.payload.signature)..."
            className="w-full carbon-editor p-3 rounded-md break-all resize-y text-terminal-amber"
            spellCheck={false}
          />
        </div>

        {error && (
          <div className="m-4 p-3 rounded-md bg-rose-950/30 border border-rose-800 text-rose-300 font-mono text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Breakdown Sections */}
        {!error && headerJson && (
          <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4 font-mono text-xs">
            {/* Header */}
            <div className="space-y-2">
              <div className="text-carbon-300 font-bold uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span className="text-terminal-rose">Header (Algorithm & Token Type)</span>
                <span className="text-carbon-500">Segment 1</span>
              </div>
              <textarea
                readOnly
                value={headerJson}
                rows={6}
                className="w-full carbon-editor p-3 rounded-md bg-[#090b0e] text-rose-300"
              />
            </div>

            {/* Signature */}
            <div className="space-y-2">
              <div className="text-carbon-300 font-bold uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span className="text-terminal-cyan">Signature (Cryptographic Digest)</span>
                <span className="text-carbon-500">Segment 3</span>
              </div>
              <div className="p-3 rounded-md bg-[#090b0e] border border-[#262d3a] break-all text-terminal-cyan text-xs h-[148px] overflow-y-auto">
                {signatureRaw}
              </div>
            </div>

            {/* Payload Claims */}
            <div className="lg:col-span-2 space-y-2">
              <div className="text-carbon-300 font-bold uppercase tracking-wider text-[11px] flex items-center justify-between">
                <span className="text-terminal-purple">Payload (Decoded Claims & Data)</span>
                <span className="text-carbon-500">Segment 2</span>
              </div>
              <textarea
                readOnly
                value={payloadJson}
                rows={10}
                className="w-full carbon-editor p-3 rounded-md bg-[#090b0e] text-purple-300"
              />
            </div>
          </div>
        )}

        {/* Claims Timeline breakdown */}
        {Object.keys(claimsMeta).length > 0 && (
          <div className="border-t border-[#262d3a] p-4 bg-[#090b0e] font-mono text-xs">
            <div className="text-carbon-300 font-semibold uppercase tracking-wider text-[11px] mb-2 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-terminal-emerald" />
              Claim Timestamps Converted to UTC
            </div>
            <div className="space-y-1.5">
              {Object.entries(claimsMeta).map(([k, val]) => (
                <div key={k} className="flex items-center justify-between p-2 rounded bg-[#12161c] border border-[#1c212a]">
                  <span className="text-terminal-amber font-bold">{k.toUpperCase()}</span>
                  <span className="text-carbon-200">{val}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
