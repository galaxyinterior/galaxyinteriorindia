"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  RefreshCw, 
  Wrench, 
  Trash2, 
  PaintBucket, 
  Hammer, 
  CheckCircle2,
  ArrowRight,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Structural Audits",
    description: "Assessing the current condition of the building to safely plan the renovation.",
    icon: RefreshCw,
  },
  {
    title: "Demolition & Disposal",
    description: "Safe dismantling of old structures and responsible disposal of debris.",
    icon: Trash2,
  },
  {
    title: "Plumbing & Electrical Repair",
    description: "Updating outdated wiring and piping to modern safety and efficiency standards.",
    icon: Wrench,
  },
  {
    title: "Modern Finishes",
    description: "Applying fresh paint, new flooring, and updated fixtures to breathe new life into the space.",
    icon: PaintBucket,
  },
  {
    title: "Structural Modifications",
    description: "Knocking down walls or adding extensions to completely change the layout.",
    icon: Hammer,
  }
];

export default function RenovationPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24 bg-[#f8fafc] border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest">
              <RefreshCw className="w-4 h-4" />
              Our Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tighter leading-tight uppercase">
              Smart <span className="text-accent">Renovations</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Breathe new life into your old space. We upgrade, remodel, and transform outdated structures into modern, functional masterpieces.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <a href="tel:+919631980881">
                <Button className="w-full sm:w-auto bg-accent text-primary hover:bg-primary hover:text-white rounded-full px-8 py-6 font-black tracking-widest uppercase text-xs shadow-lg m3-transition">
                  <Phone className="w-4 h-4 mr-2" />
                  Enquire Now
                </Button>
              </a>
              <Link href="/portfolio">
                <Button variant="outline" className="w-full sm:w-auto border-gray-300 text-primary hover:border-accent rounded-full px-8 py-6 font-black tracking-widest uppercase text-xs m3-transition">
                  View Makeovers
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-video lg:aspect-square rounded-[32px] overflow-hidden shadow-2xl">
            <Image 
              src="/generated/hero_exterior_1.png" 
              alt="Renovated Home" 
              fill 
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">Our Renovation Process</h2>
          <div className="w-16 h-1 bg-accent mx-auto"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Renovating requires careful planning to avoid damaging existing structures while completely transforming the look and feel.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-100 rounded-[24px] p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                <feature.icon className="w-6 h-6 text-primary group-hover:text-accent" />
              </div>
              
              <h3 className="text-xl font-bold text-primary mb-3 uppercase tracking-tight">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Included Items List */}
      <div className="bg-gray-50 py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-primary mb-6 uppercase tracking-tight">What We Remodel?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Whether it's a single room or a complete building overhaul, we can upgrade it.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Full Home Remodels', 'Kitchen Upgrades', 'Bathroom Renovations', 'Office Space Conversions', 'Facade / Exterior Makeovers', 'Roofing & Waterproofing Upgrades', 'Flooring Replacement', 'Electrical & Plumbing Rewiring'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="font-bold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
             <Image 
              src="/generated/srv_interior.png" 
              alt="Remodeled Interior" 
              fill 
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 my-24">
        <div className="bg-primary rounded-[32px] p-12 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-logo-radial opacity-20 mix-blend-screen" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Time for an upgrade?</h3>
            <p className="text-white/70 max-w-xl mx-auto">
              Schedule an inspection so we can assess your space and provide a remodeling estimate.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button className="bg-accent text-primary hover:bg-white rounded-full px-10 py-7 font-black tracking-widest uppercase text-xs shadow-lg m3-transition">
                  Get Renovation Estimate <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
