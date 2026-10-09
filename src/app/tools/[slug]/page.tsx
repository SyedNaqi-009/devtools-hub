import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { TOOLS, getToolBySlug } from '@/lib/tools-data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ToolRenderer } from '@/components/ToolRenderer';
import { ToolSeoFooter } from '@/components/ToolSeoFooter';
import { ToolIcon } from '@/components/ui/ToolIcon';
import { ShieldCheck, Lock, Cpu, Sparkles } from 'lucide-react';

interface ToolPageProps {
  params: {
    slug: string;
  };
}

// Generate static params for all 20 verified utilities
export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

// Generate dynamic SEO metadata with OpenGraph and Twitter cards
export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const tool = getToolBySlug(params.slug);
  if (!tool) {
    return {
      title: 'Tool Not Found - DevTools Hub',
    };
  }

  const siteUrl = 'https://devtools-hub.vercel.app';
  const pageUrl = `${siteUrl}/tools/${tool.slug}`;

  return {
    title: `${tool.name} | DevTools Hub`,
    description: tool.description,
    keywords: tool.keywords,
    authors: [{ name: 'DevTools Hub Engineering Team' }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${tool.name} - Free Online Developer Utility`,
      description: tool.description,
      url: pageUrl,
      siteName: 'DevTools Hub',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${tool.name} - DevTools Hub`,
      description: tool.shortDesc,
    },
  };
}

export default function ToolPage({ params }: ToolPageProps) {
  const tool = getToolBySlug(params.slug);

  if (!tool) {
    notFound();
  }

  // JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: tool.name,
    description: tool.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'All modern web browsers',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    featureList: tool.features,
    browserRequirements: 'Requires JavaScript. Works in Firefox, Chrome, Safari, Edge.',
  };

  const faqJsonLd = tool.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Semantic Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: tool.categoryLabel, href: `/#${tool.category}` },
          { label: tool.name },
        ]}
      />

      {/* Tool Header Section */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#12161c] border border-[#262d3a] flex items-center justify-center text-terminal-emerald shadow-glow">
              <ToolIcon name={tool.iconName} className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
                {tool.name}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-mono text-carbon-400">
                  Category: <span className="text-terminal-emerald">{tool.categoryLabel}</span>
                </span>
                <span className="text-carbon-600">&bull;</span>
                <span className="text-xs font-mono text-carbon-400 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-terminal-emerald" /> 100% In-Memory
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#12161c] border border-[#262d3a] text-xs font-mono text-carbon-300 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-terminal-emerald" />
              <span>Zero Server Exfiltration</span>
            </span>
          </div>
        </div>

        <p className="text-sm font-sans text-carbon-300 max-w-4xl leading-relaxed mt-2">
          {tool.description}
        </p>
      </div>

      {/* Interactive Tool Sandbox Shell */}
      <main className="mb-12">
        <ToolRenderer slug={tool.slug} />
      </main>

      {/* Technical Specifications, FAQs, and Related Tools */}
      <ToolSeoFooter tool={tool} />
    </div>
  );
}
