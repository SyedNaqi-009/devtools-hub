import React from 'react';
import Link from 'next/link';
import { ToolMeta, getToolBySlug } from '@/lib/tools-data';
import { ToolIcon } from '@/components/ui/ToolIcon';
import { HelpCircle, Sparkles, ArrowRight } from 'lucide-react';

interface ToolSeoFooterProps {
  tool: ToolMeta;
}

export const ToolSeoFooter: React.FC<ToolSeoFooterProps> = ({ tool }) => {
  const relatedTools = tool.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((t): t is ToolMeta => !!t);

  return (
    <div className="mt-16 pt-12 border-t border-[#262d3a] space-y-12">
      {/* Key Features Breakdown */}
      <section>
        <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-4">
          <Sparkles className="w-4 h-4 text-terminal-emerald" />
          Technical Capabilities & Feature Specifications
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {tool.features.map((feature, idx) => (
            <div
              key={idx}
              className="p-3 rounded-lg bg-[#12161c] border border-[#262d3a] flex items-start gap-2.5 font-mono text-xs text-carbon-200"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-terminal-emerald mt-1.5 shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Frequently Asked Questions */}
      {tool.faqs.length > 0 && (
        <section>
          <h2 className="text-lg font-mono font-bold text-white flex items-center gap-2 mb-4">
            <HelpCircle className="w-4 h-4 text-terminal-amber" />
            Frequently Asked Technical Questions (FAQ)
          </h2>
          <div className="space-y-4">
            {tool.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="p-4 rounded-lg bg-[#12161c] border border-[#262d3a] space-y-2"
              >
                <h3 className="font-mono text-sm font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="text-xs text-carbon-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Utilities */}
      {relatedTools.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-mono font-semibold uppercase tracking-wider text-carbon-300">
              Related Developer Utilities
            </h2>
            <Link
              href="/"
              className="text-xs font-mono text-terminal-emerald hover:underline flex items-center gap-1"
            >
              <span>View all 20 tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedTools.map((rel) => (
              <Link
                key={rel.id}
                href={`/tools/${rel.slug}`}
                className="group p-4 rounded-lg bg-[#12161c] border border-[#262d3a] hover:border-terminal-emerald transition-all"
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded bg-[#1c212a] border border-[#262d3a] flex items-center justify-center text-terminal-emerald group-hover:scale-105 transition-transform">
                    <ToolIcon name={rel.iconName} className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-mono text-xs font-bold text-white group-hover:text-terminal-emerald transition-colors">
                    {rel.name}
                  </h3>
                </div>
                <p className="text-[11px] text-carbon-400 line-clamp-2 leading-relaxed">
                  {rel.shortDesc}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
