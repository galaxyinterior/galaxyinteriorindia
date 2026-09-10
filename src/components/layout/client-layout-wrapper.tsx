"use client";

import { usePathname } from "next/navigation";
import Header from '@/components/layout/header';
import MobileHeader from '@/components/layout/mobile-header';
import Footer from '@/components/layout/footer';
import WhatsAppButton from '@/components/layout/whatsapp-button';
import MobileWhatsAppButton from '@/components/layout/mobile-whatsapp-button';
import CtaSection from '@/components/layout/cta-section';
import ThreeBackground from '@/components/layout/three-background';
import LocationModal from '@/components/layout/location-modal';
import DesigningFacilities from '@/components/layout/designing-facilities';
import SiteSwitcher from '@/components/layout/site-switcher';
import { useMode } from '@/context/ModeContext';

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin-galaxy');
  const isDashboard = pathname?.startsWith('/consult-online');
  const isLogin = pathname === '/login';
  const { mode, setMode } = useMode();

  if (isAdmin || isDashboard || isLogin) {
    return <main className="flex-1 min-h-screen flex flex-col">{children}</main>;
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

      <DesigningFacilities />
      <CtaSection />
      <Footer />
      
      {/* Responsive WhatsApp CTA Buttons */}
      <div className="hidden lg:block">
        <WhatsAppButton />
      </div>
      <div className="block lg:hidden">
        <MobileWhatsAppButton />
      </div>

      <LocationModal />
      <SiteSwitcher isCommercial={false} />
    </>
  );
}
