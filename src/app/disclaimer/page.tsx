import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer & Technical Notice | DevTools Hub',
  description: 'Technical notice, cryptographic disclaimers, and warranty limitations for DevTools Hub.',
  alternates: {
    canonical: 'https://devtools-hub.vercel.app/disclaimer',
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-800 text-terminal-amber font-mono text-xs mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Technical Disclaimers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            Disclaimer & Technical Notice
          </h1>
          <p className="text-carbon-300 text-sm mt-2 leading-relaxed">
            Important information regarding client-side processing, cryptographic functions, and validation tools.
          </p>
        </div>

        <section className="space-y-6 text-sm text-carbon-200 leading-relaxed">
          <div className="p-4 rounded-lg bg-[#0d1015] border border-amber-800/40 space-y-2">
            <h2 className="text-base font-mono font-bold text-amber-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-terminal-amber" />
              1. Cryptographic Hashes vs. Encryption
            </h2>
            <p className="text-xs text-carbon-300 leading-relaxed">
              Utilities such as the <strong>Hash Generator</strong> compute one-way mathematical digests (SHA-256, SHA-512, SHA-384, SHA-1). 
              Hashing is <strong>not encryption</strong> and cannot be decrypted back to plaintext. Hashing sensitive passwords without key derivation functions (like Argon2 or bcrypt) is insecure.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-[#0d1015] border border-amber-800/40 space-y-2">
            <h2 className="text-base font-mono font-bold text-amber-200 flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-terminal-amber" />
              2. JWT Decoding vs. Cryptographic Verification
            </h2>
            <p className="text-xs text-carbon-300 leading-relaxed">
              The <strong>JWT Decoder</strong> performs base64url decoding to allow inspection of payload claims and headers. 
              <strong>It does NOT cryptographically verify signatures</strong> without your application&apos;s secret key or public certificate. 
              Never rely on client-side decoding alone to authenticate authorization privileges.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-mono font-bold text-white mb-2">3. Educational and Debugging Intent</h2>
            <p>
              The tools, code generators, and blog articles provided on DevTools Hub are developed for educational, testing, and debugging assistance. 
              Before deploying automatically generated code (such as TypeScript interfaces or SQL queries) into mission-critical production environments, 
              engineers should perform independent testing and peer review.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-mono font-bold text-white mb-2">4. External Links and Third-Party Standards</h2>
            <p>
              DevTools Hub references standard specifications published by organizations such as the IETF (RFCs), W3C, and WHATWG. 
              We do not claim affiliation with or endorsement by these standards bodies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-mono font-bold text-white mb-2">5. No Guarantee of Monopolistic or Financial Outcome</h2>
            <p>
              Use of the tools, performance optimization minifiers, or technical guides does not guarantee specific ranking outcomes, security certifications, or economic results.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
