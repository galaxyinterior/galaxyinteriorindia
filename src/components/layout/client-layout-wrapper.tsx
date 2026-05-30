"use client";

import { usePathname } from "next/navigation";
import Header from '@/components/layout/header';
import MobileHeader from '@/components/layout/mobile-header';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/layout/whatsapp-button';
import MobileWhatsAppButton from '@/components/layout/mobile-whatsapp-button';
import CtaSection from '@/components/layout/cta-section';
import ThreeBackground from '@/components/layout/three-background';
import ModeNotchSwitch from '@/components/layout/mode-notch-switch';
import MobileModeNotchSwitch from '@/components/layout/mobile-mode-notch-switch';
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
      
      {/* Responsive Header Layouts */}
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="block lg:hidden">
        <MobileHeader />
      </div>

      <main className="flex-1">{children}</main>
      
      {/* Responsive Notch Switches */}
      <div className="hidden lg:block">
        <ModeNotchSwitch mode={mode} onChange={setMode} />
      </div>
      <div className="block lg:hidden">
        <MobileModeNotchSwitch mode={mode} onChange={setMode} />
      </div>

      <CtaSection />
      <Footer />
      
      {/* Responsive WhatsApp CTA Buttons */}
      <div className="hidden lg:block">
        <WhatsAppButton />
      </div>
      <div className="block lg:hidden">
        <MobileWhatsAppButton />
      </div>
    </>
  );
}
