import React from 'react';
import { Metadata } from 'next';
import ConsultationPopup from '@/components/home/ConsultationPopup';
import ProcessSection from '@/components/home/ProcessSection';
import ServicesSection from '@/components/home/ServicesSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import FinalCta from '@/components/home/FinalCta';
import Aurora from '@/components/ui/aurora';
import Link from 'next/link';
import { ArrowRight, Calculator, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';

const VALID_CITIES = [
  'godda', 'ranchi', 'bhagalpur', 'banka', 'deoghar', 
  'hazaribagh', 'dumka', 'kishanganj', 'purnea', 'kolkata', 'patna'
];

interface Props {
  params: {
    city: string;
  };
}

// Generate static params for these SEO pages so they build quickly
export async function generateStaticParams() {
  return VALID_CITIES.map((city) => ({
    city: city,
  }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = decodeURIComponent(params.city);
  const formattedCity = city.charAt(0).toUpperCase() + city.slice(1).toLowerCase();

  // Validate city
  if (!VALID_CITIES.includes(city.toLowerCase())) {
    return {
      title: 'Service Areas | Galaxy Interior',
    };
  }

  return {
    title: `Best Interior Designer & Construction Company in ${formattedCity} | Galaxy Interior`,
    description: `Looking for top-tier architecture, interior design, and construction services in ${formattedCity}? Galaxy Interior provides turnkey residential and commercial solutions.`,
    keywords: [
      `Interior Designer ${formattedCity}`,
      `Construction Company ${formattedCity}`,
      `Architect ${formattedCity}`,
      `Home Renovation ${formattedCity}`,
      `Turnkey Construction ${formattedCity}`
    ]
  };
}

export default function LocationPage({ params }: Props) {
  const cityRaw = decodeURIComponent(params.city).toLowerCase();
  
  if (!VALID_CITIES.includes(cityRaw)) {
    notFound();
  }

  const city = cityRaw.charAt(0).toUpperCase() + cityRaw.slice(1);

  return (
    <div className="bg-transparent relative">
      <ConsultationPopup />
      
      <main className="w-full overflow-hidden">
        {/* Dynamic Hero Section tailored to the city */}
        <section className="relative h-screen w-full overflow-hidden bg-gray-50 flex items-center">
          <div className="absolute inset-0 z-0">
            <Aurora
              colorStops={["#ffffff", "#D4AF37", "#f8fafc"]}
              blend={0.6}
              amplitude={1.2}
              speed={0.8}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent pointer-events-none" />
          </div>

          <div className="relative z-10 w-full px-6 md:px-24">
            <div className="max-w-4xl text-left animate-fade-up">
              <div className="mb-4 inline-flex items-center gap-2 text-accent font-bold tracking-[0.2em] text-xs md:text-sm uppercase bg-primary/5 px-4 py-1.5 rounded-full backdrop-blur-md border border-primary/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                <MapPin className="w-4 h-4" />
                Proudly Serving {city}
              </div>
              
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-[1.1] drop-shadow-xl mb-6">
                Premium Interior & Construction in <span className="text-accent drop-shadow-[0_0_25px_rgba(212,175,55,0.2)]">{city}</span>.
              </h1>

              <p className="text-base md:text-xl text-primary/80 max-w-2xl mb-10 font-medium leading-relaxed drop-shadow-sm">
                Galaxy Interior brings world-class architecture, custom furniture, and turnkey construction right to your doorstep in {city}. Design and build your dream space with the experts.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-primary text-white font-black px-8 py-6 rounded-full tracking-widest text-xs uppercase m3-transition shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                    Book Consultation in {city}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-primary/20 hover:border-accent text-primary hover:text-accent bg-white/50 backdrop-blur-md font-black px-8 py-6 rounded-full tracking-widest text-xs uppercase m3-transition">
                    <Calculator className="w-4 h-4 mr-2" />
                    Estimate Budget
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Reusing Premium Core Sections to Make it a Full Landing Page */}
        <ServicesSection />
        <WhyChooseUs />
        <ProcessSection />
        <ProjectsSection />
        <TestimonialsSection />
        <FinalCta />
        
      </main>
    </div>
  );
}
