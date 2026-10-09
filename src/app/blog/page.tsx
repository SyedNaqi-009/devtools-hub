import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { BLOG_POSTS } from '@/lib/blog-data';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Engineering Blog & Developer Tutorials | DevTools Hub',
  description:
    'Deep-dive technical guides, specs, and tutorials covering JSON serialization, Base64 UTF-8 encoding, JWT inspection, cryptographic hashing, and POSIX cron scheduling.',
  alternates: {
    canonical: 'https://devtools-hub.vercel.app/blog',
  },
  openGraph: {
    title: 'DevTools Hub Engineering Blog',
    description: 'Practical guides and deep dives on web standards, cryptography, and data formats.',
    url: 'https://devtools-hub.vercel.app/blog',
    siteName: 'DevTools Hub',
    type: 'website',
  },
};

export default function BlogIndexPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      <Breadcrumbs items={[{ label: 'Blog' }]} />

      <div className="space-y-8">
        {/* Header Banner */}
        <div className="border-b border-[#262d3a] pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12161c] border border-[#262d3a] font-mono text-xs text-terminal-emerald mb-3">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Developer Guides & Architecture Reference</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-mono font-bold text-white tracking-tight">
            Engineering Blog & Technical Insights
          </h1>
          <p className="text-carbon-300 text-base max-w-3xl mt-3 leading-relaxed">
            In-depth guides on data serialization, cryptography, encoding standards, and developer productivity. 
            Designed for software engineers seeking accurate specifications and zero fluff.
          </p>
        </div>

        {/* Articles List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="p-6 rounded-lg bg-[#0d1015] border border-[#262d3a] hover:border-terminal-emerald transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-carbon-400">
                  <span className="px-2 py-0.5 rounded bg-[#12161c] border border-[#262d3a] text-terminal-emerald">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.publishedDate}
                    </span>
                  </div>
                </div>

                <h2 className="text-lg font-mono font-bold text-white group-hover:text-terminal-emerald transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>

                <p className="text-xs text-carbon-300 font-sans leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-6 mt-4 border-t border-[#1c212a] flex items-center justify-between font-mono text-xs">
                <Link
                  href={`/tools/${post.toolLink.slug}`}
                  className="text-carbon-400 hover:text-terminal-amber transition-colors flex items-center gap-1 text-[11px]"
                >
                  <span>Tool: {post.toolLink.label}</span>
                </Link>

                <Link
                  href={`/blog/${post.slug}`}
                  className="text-terminal-emerald flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-bold"
                >
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
