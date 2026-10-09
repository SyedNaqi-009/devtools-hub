import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS, getBlogPostBySlug } from '@/lib/blog-data';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { AdSenseSlot } from '@/components/AdSenseSlot';
import { Calendar, Clock, ArrowLeft, ArrowRight, Wrench, Share2 } from 'lucide-react';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug);
  if (!post) {
    return {
      title: 'Article Not Found | DevTools Hub',
    };
  }

  const pageUrl = `https://devtools-hub.vercel.app/blog/${post.slug}`;

  return {
    title: `${post.title} | DevTools Hub Blog`,
    description: post.excerpt,
    keywords: post.keywords,
    authors: [{ name: 'DevTools Hub Engineering Team' }],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: pageUrl,
      type: 'article',
      publishedTime: post.publishedDate,
      authors: ['DevTools Hub Engineering Team'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  // Article JSON-LD Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedDate,
    author: {
      '@type': 'Organization',
      name: 'DevTools Hub Engineering Team',
      url: 'https://devtools-hub.vercel.app',
    },
    publisher: {
      '@type': 'Organization',
      name: 'DevTools Hub',
      logo: {
        '@type': 'ImageObject',
        url: 'https://devtools-hub.vercel.app/favicon.ico',
      },
    },
    keywords: post.keywords.join(', '),
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      <article className="space-y-8">
        {/* Article Header */}
        <header className="border-b border-[#262d3a] pb-6 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-carbon-400">
            <span className="px-2.5 py-1 rounded bg-[#12161c] border border-[#262d3a] text-terminal-emerald font-semibold">
              {post.category}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {post.publishedDate}
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-mono font-bold text-white tracking-tight leading-snug">
            {post.title}
          </h1>

          <p className="text-base text-carbon-300 font-sans leading-relaxed">
            {post.excerpt}
          </p>

          {/* Direct Tool Callout Pill */}
          <div className="p-3 rounded-lg bg-[#12161c] border border-terminal-emerald/30 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs text-white">
              <Wrench className="w-4 h-4 text-terminal-emerald" />
              <span>Interactive Utility: <strong>{post.toolLink.label}</strong></span>
            </div>
            <Link
              href={`/tools/${post.toolLink.slug}`}
              className="px-3 py-1 rounded bg-terminal-emerald text-black text-xs font-mono font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1"
            >
              <span>Launch Tool</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* In-Article Top Ad Placement */}
        <AdSenseSlot slotId="article-top-banner" format="horizontal" />

        {/* Article Body Content */}
        <div className="text-carbon-200 text-sm leading-relaxed space-y-6">
          {post.content.split('### ').map((section, idx) => {
            if (!section.trim()) return null;
            const lines = section.split('\n');
            const heading = lines[0];
            const body = lines.slice(1).join('\n');

            return (
              <section key={idx} className="space-y-3">
                <h2 className="text-xl font-mono font-bold text-white pt-2">
                  {heading}
                </h2>
                <div
                  className="space-y-4 whitespace-pre-line leading-relaxed text-carbon-300"
                  dangerouslySetInnerHTML={{
                    __html: body
                      .replace(/```([a-z]*)\n([\s\S]*?)```/g, '<pre class="p-4 rounded-md bg-[#090b0e] border border-[#262d3a] font-mono text-xs text-terminal-emerald overflow-x-auto my-3">$2</pre>')
                      .replace(/`([^`]+)`/g, '<code class="bg-[#12161c] px-1 py-0.5 rounded font-mono text-terminal-emerald text-xs">$1</code>')
                      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white">$1</strong>')
                  }}
                />
              </section>
            );
          })}
        </div>

        {/* Mid-Article Ad Placement */}
        <AdSenseSlot slotId="article-middle-banner" format="rectangle" />

        {/* Interactive Utility Callout Banner */}
        <div className="p-6 rounded-lg bg-[#0d1015] border border-terminal-emerald/40 space-y-3 font-mono text-xs">
          <div className="text-sm font-bold text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-terminal-emerald" />
            <span>Try the Live Utility in Your Browser</span>
          </div>
          <p className="text-carbon-300 font-sans text-xs">
            DevTools Hub tools execute 100% in-browser memory without network tracking or logging.
          </p>
          <div className="pt-2">
            <Link
              href={`/tools/${post.toolLink.slug}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded bg-terminal-emerald text-black font-bold hover:bg-emerald-400 transition-colors"
            >
              <span>{post.toolLink.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Navigation Footer */}
        <footer className="pt-8 border-t border-[#262d3a] flex items-center justify-between font-mono text-xs">
          <Link
            href="/blog"
            className="text-carbon-300 hover:text-terminal-emerald flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>

          <Link
            href="/"
            className="text-carbon-300 hover:text-terminal-emerald transition-colors"
          >
            <span>Explore All 20 Utilities &rarr;</span>
          </Link>
        </footer>

        {/* Bottom Ad Placement */}
        <AdSenseSlot slotId="article-bottom-banner" format="horizontal" />
      </article>
    </div>
  );
}
