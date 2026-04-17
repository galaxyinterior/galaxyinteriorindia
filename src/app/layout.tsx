import type { Metadata } from 'next';
import { Poppins, Playfair_Display } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import ClientLayoutWrapper from '@/components/layout/client-layout-wrapper';
import LoadingScreen from '@/components/layout/loading-screen';
import { Suspense } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair-display',
});

const siteUrl = 'https://galaxy-interior.com';

export const metadata: Metadata = {
  title: {
    default: 'Galaxy Interior | Best Interior Designer in Godda & Ranchi',
    template: '%s | Galaxy Interior',
  },
  description: 'Galaxy Interior offers premium architecture, construction, and interior design services in Godda, Ranchi, and across Jharkhand. Shaping Dreams, Crafting Spaces.',
  keywords: ['Interior Designer Godda', 'Interior Designer Ranchi', 'Home Interior Design Jharkhand', 'Modular Kitchen Godda', 'Architecture Godda', 'Construction Godda', 'Galaxy Interior', 'Galaxy Homes Design'],
  authors: [{ name: 'Galaxy Interior' }],
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'Galaxy Interior | Shaping Dreams, Crafting Spaces',
    description: 'Premium architecture, construction, and interior design services in Jharkhand.',
    url: siteUrl,
    siteName: 'Galaxy Interior',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Galaxy Interior | Luxury Architecture & Interiors',
    description: 'Transforming spaces into luxury residences in Godda and Ranchi.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          poppins.variable,
          playfairDisplay.variable
        )}
      >
        <Suspense fallback={null}>
          <LoadingScreen />
        </Suspense>
        <div className="relative flex min-h-screen flex-col">
          <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
        </div>
        <Toaster />
      </body>
    </html>
  );
}
