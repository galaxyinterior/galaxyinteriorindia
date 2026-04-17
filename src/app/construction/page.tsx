"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Building, ShieldCheck, HardHat, FileText, Layout } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const steps = [
  { title: "Planning", desc: "Detailed analysis and conceptual design.", image: "/generated/proc_planning.png" },
  { title: "Architecture", desc: "Finalizing floor plans and 3D elevations.", image: "/generated/hero_exterior_1.png" },
  { title: "Material Selection", desc: "Choosing premium brands for long life.", image: "/generated/fac_tiles_flooring.png" },
  { title: "Supervision", desc: "Expert on-site management and quality checks.", image: "/generated/srv_construction.png" },
  { title: "Interior Finishing", desc: "Luxury final touches for a ready home.", image: "/generated/hero_interior_1.png" },
];

export default function ConstructionPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[500px] flex items-center justify-center text-center overflow-hidden">
        <Image 
          src="/generated/legacy_villa.png" 
          alt="Construction" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-galaxy-dark/70" />
        <div className="relative z-10 container mx-auto px-4">
          <Badge className="mb-6 rounded-none bg-primary text-galaxy-dark font-bold tracking-[0.3em] px-6 py-2">BUILD WITH CONFIDENCE</Badge>
          <h1 className="text-5xl md:text-8xl font-bold text-white mb-6">Home Construction</h1>
          <p className="max-w-2xl mx-auto text-white/80 text-lg">End-to-End Home Construction Service for Luxury Villas and Residences.</p>
        </div>
      </section>

      {/* Process */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold text-galaxy-dark mb-6">Our Construction Process</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">We follow a transparent and rigorous process to ensure your home is built to the highest standards.</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gray-100 -z-10" />
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white outline outline-4 outline-primary flex items-center justify-center mb-6 shadow-2xl relative z-10 overflow-hidden bg-gray-100 group-hover:scale-110 transition-transform">
                  {step.image && <Image src={step.image} alt={step.title} fill className="object-cover" />}
                </div>
                <h3 className="text-xl font-bold text-galaxy-dark mb-2">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Construction */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <Badge className="mb-4 rounded-none bg-galaxy-dark text-white font-bold tracking-widest px-4 py-1">WHY GALAXY HOMES</Badge>
            <h2 className="text-4xl md:text-6xl font-bold text-galaxy-dark mb-8 leading-tight">Superior Quality, Unmatched Durability</h2>
            <div className="space-y-6">
              {[
                "Vastu Compliant Architectural Planning",
                "Use of Premium Materials (UltraTech, Tata Steel, Kajaria)",
                "Experienced Civil Engineers & Site Supervisors",
                "Fixed Timelines & Transparent Costing",
                "5-Year Construction Warranty"
              ].map((text, idx) => (
                <div key={idx} className="flex gap-4 items-center">
                  <CheckCircle2 className="text-primary w-6 h-6 shrink-0" />
                  <span className="text-lg font-medium text-gray-700">{text}</span>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="mt-12 rounded-none px-12">
              <Link href="/contact">START YOUR PROJECT</Link>
            </Button>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden shadow-2xl">
             <Image 
              src="/generated/srv_construction.png" 
              alt="Construction Site" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}