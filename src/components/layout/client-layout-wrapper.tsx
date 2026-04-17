"use client";

import { usePathname } from "next/navigation";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/layout/whatsapp-button';
import CtaSection from '@/components/layout/cta-section';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin-galaxy');

  if (isAdmin) {
    return <main className="flex-1 h-screen overflow-hidden flex flex-col">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <CtaSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
