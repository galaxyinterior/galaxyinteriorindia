"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Sofa, 
  PaintBucket, 
  Hammer, 
  Lightbulb, 
  Palette, 
  CheckCircle2,
  ArrowRight,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Space Planning",
    description: "Maximizing functionality and flow in every room, ensuring your space is as practical as it is beautiful.",
    icon: Palette,
  },
  {
    title: "Custom Furniture",
    description: "Bespoke wardrobes, modular kitchens, and living room units crafted to fit your specific dimensions and style.",
    icon: Sofa,
  },
  {
    title: "Material Selection",
    description: "Curating premium finishes, from Italian marble to high-grade laminates, ensuring durability and luxury.",
    icon: PaintBucket,
  },
  {
    title: "Lighting Design",
    description: "Strategic ambient, task, and accent lighting plans to elevate the mood and highlight architectural features.",
    icon: Lightbulb,
  },
  {
    title: "Flawless Execution",
    description: "Our in-house team of carpenters, painters, and technicians ensure perfectly finished interiors on time.",
    icon: Hammer,
  }
];

export default function InteriorProjectPage() {
  return (
    <div className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-6 sm:px-12 lg:px-24 bg-[#f8fafc] border-b border-gray-100 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest">
              <Sofa className="w-4 h-4" />
              Our Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tighter leading-tight uppercase">
              Bespoke <span className="text-accent">Interior</span> Projects
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl leading-relaxed">
              Transform your bare shell into a luxurious, fully-functional living or working space. We handle end-to-end interior design and execution.
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
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-video lg:aspect-square rounded-[32px] overflow-hidden shadow-2xl">
            <Image 
              src="/generated/srv_interior.png" 
              alt="Luxury Interior Design" 
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
          <h2 className="text-3xl md:text-4xl font-black text-primary uppercase tracking-tight">Our Interior Approach</h2>
          <div className="w-16 h-1 bg-accent mx-auto"></div>
          <p className="text-gray-500 max-w-2xl mx-auto">
            We don't just decorate; we engineer spaces for living. Every material, color, and texture is chosen with purpose.
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
            <h2 className="text-3xl font-black text-primary mb-6 uppercase tracking-tight">What's Included?</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">Our turnkey interior projects cover absolutely everything required to make your space move-in ready.</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['Modular Kitchens', 'Wardrobes & Storage', 'False Ceilings', 'Flooring & Tiling', 'Painting & Wallpapers', 'Electrical & Lighting', 'Plumbing Fixtures', 'Custom Furniture'].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent" />
                  <span className="font-bold text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative w-full aspect-video rounded-3xl overflow-hidden shadow-xl">
             <Image 
              src="/generated/kitchen_offer_bg.png" 
              alt="Modular Kitchen" 
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
            <h3 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tight">Ready to transform your home?</h3>
            <p className="text-white/70 max-w-xl mx-auto">
              Schedule a free consultation with our interior designers to discuss your floor plan and vision.
            </p>
            <div className="mt-8">
              <Link href="/contact">
                <Button className="bg-accent text-primary hover:bg-white rounded-full px-10 py-7 font-black tracking-widest uppercase text-xs shadow-lg m3-transition">
                  Book Free Consultation <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
