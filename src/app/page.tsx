"use client";

import React from 'react';
import ConsultationPopup from '@/components/home/ConsultationPopup';

// Newly created home components
import HeroSection from '@/components/home/HeroSection';
import TrustStrip from '@/components/home/TrustStrip';
import ProcessSection from '@/components/home/ProcessSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import PricingTeaser from '@/components/home/PricingTeaser';
import FurnitureSection from '@/components/home/FurnitureSection';
import TrustedPartners from '@/components/home/TrustedPartners';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import ServiceAreas from '@/components/home/ServiceAreas';
import FinalCta from '@/components/home/FinalCta';
import DriftWall from '@/components/ui/DriftWall';

export default function HomePage() {
  return (
    <div className="bg-transparent relative">
      <ConsultationPopup />
      
      {/* Global DriftWall Background */}
      <div className="fixed inset-0 -z-50 opacity-30 pointer-events-none mix-blend-luminosity">
        <DriftWall
          columns={6}
          speed={20}
          tilt={15}
          turn={-15}
        />
      </div>
      
      <main className="w-full overflow-hidden">
        <HeroSection />
        <TrustStrip />
        <ProcessSection />
        <ServicesSection />
        <ProjectsSection />
        <PricingTeaser />
        <FurnitureSection />
        <WhyChooseUs />
        <TrustedPartners />
        <TestimonialsSection />
        <ServiceAreas />
        <FinalCta />
      </main>
    </div>
  );
}
