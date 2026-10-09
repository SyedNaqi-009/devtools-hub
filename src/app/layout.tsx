import type { Metadata, Viewport } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#0b0d10',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://devtools-hub.vercel.app'),
  title: {
    default: 'DevTools Hub - High-Performance, Privacy-First Web Utility Suite',
    template: '%s | DevTools Hub',
  },
  description:
    'Ultra-lightweight, high-performance, 100% in-memory web utility suite for software engineers, students, and IT professionals. Zero data exfiltration.',
  keywords: [
    'developer tools',
    'web utilities',
    'json formatter',
    'jwt decoder',
    'sha256 hash generator',
    'uuid generator',
    'base64 encode decode',
    'unix timestamp converter',
    'sql formatter',
    'diff checker',
    'regex tester',
  ],
  authors: [{ name: 'DevTools Hub Engineering Team' }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-[#0b0d10]">
      <body className="min-h-screen flex flex-col bg-[#0b0d10] text-[#f1f5f9] antialiased">
        <Header />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
