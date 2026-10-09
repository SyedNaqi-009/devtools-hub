'use client';

import React, { useState } from 'react';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Mail, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <div className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12161c] border border-[#262d3a] font-mono text-xs text-terminal-emerald mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>Developer Support & Inquiries</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-mono font-bold text-white tracking-tight">
            Contact DevTools Hub
          </h1>
          <p className="text-carbon-300 text-sm mt-2 leading-relaxed">
            Have a question, discovered an edge-case bug, or want to suggest a new utility? We welcome direct engineering feedback.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-5 rounded-lg bg-[#0d1015] border border-[#262d3a] space-y-3">
            <div className="flex items-center gap-2 text-terminal-emerald font-bold">
              <Mail className="w-4 h-4" />
              <span>Direct Support Email</span>
            </div>
            <p className="text-carbon-300 font-sans text-xs leading-relaxed">
              For general inquiries, bug reports, or partnership opportunities:
            </p>
            <div className="pt-2">
              <a
                href="mailto:syednaqi.0355@gmail.com"
                className="text-white hover:text-terminal-emerald text-sm font-bold transition-colors"
              >
                syednaqi.0355@gmail.com
              </a>
            </div>
          </div>

          <div className="p-5 rounded-lg bg-[#0d1015] border border-[#262d3a] space-y-3">
            <div className="flex items-center gap-2 text-terminal-amber font-bold">
              <Clock className="w-4 h-4" />
              <span>Response Time & Availability</span>
            </div>
            <p className="text-carbon-300 font-sans text-xs leading-relaxed">
              We aim to respond to technical inquiries and verified security reports within 24–48 business hours.
            </p>
            <div className="text-carbon-400 text-[11px] pt-1">
              Monday &ndash; Friday &bull; UTC Timezone
            </div>
          </div>
        </div>

        {/* Contact Submission Form */}
        <div className="p-6 rounded-lg bg-[#0d1015] border border-[#262d3a] space-y-4">
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-terminal-emerald" />
            Send a Technical Inquiry
          </h2>
          <p className="text-xs text-carbon-400 font-sans">
            Please provide accurate details regarding the utility name, expected behavior, and browser version when submitting bug reports.
          </p>

          {submitted ? (
            <div className="p-4 rounded bg-emerald-950/40 border border-emerald-800 text-emerald-300 font-mono text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-terminal-emerald" />
              <span>Thank you! Your inquiry has been received. You can also reach us directly at syednaqi.0355@gmail.com.</span>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-4 font-mono text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-carbon-300 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Vance"
                    className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2.5 outline-none focus:border-terminal-emerald"
                  />
                </div>
                <div>
                  <label className="block text-carbon-300 mb-1">Your Email</label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2.5 outline-none focus:border-terminal-emerald"
                  />
                </div>
              </div>

              <div>
                <label className="block text-carbon-300 mb-1">Subject / Tool Inquiry</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Feature request for JSON to TypeScript tool"
                  className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2.5 outline-none focus:border-terminal-emerald"
                />
              </div>

              <div>
                <label className="block text-carbon-300 mb-1">Message</label>
                <textarea
                  rows={5}
                  required
                  placeholder="Describe your question, issue, or suggestion in detail..."
                  className="w-full bg-[#12161c] border border-[#262d3a] text-white rounded p-2.5 outline-none focus:border-terminal-emerald font-sans text-xs"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded bg-terminal-emerald text-black font-bold hover:bg-emerald-400 transition-colors"
              >
                Submit Inquiry
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
