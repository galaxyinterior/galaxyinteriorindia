"use client";

import { usePathname } from "next/navigation";
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/layout/whatsapp-button';
import CtaSection from '@/components/layout/cta-section';
import ThreeBackground from '@/components/layout/three-background';
import ModeNotchSwitch from '@/components/layout/mode-notch-switch';
import { useMode } from '@/context/ModeContext';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin-galaxy');
  const { mode, setMode } = useMode();

  if (isAdmin) {
    return <main className="flex-1 h-screen overflow-hidden flex flex-col">{children}</main>;
  }

  return (
    <>
      <ThreeBackground />
      <Header />
      <main className="flex-1">{children}</main>
      <ModeNotchSwitch mode={mode} onChange={setMode} />
      <CtaSection />
      <Footer />
      <WhatsAppButton />
    </>
  );
}
