"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Building2, 
  Map, 
  Layout, 
  Box, 
  Sofa, 
  PencilRuler, 
  Zap, 
  Droplet, 
  Ruler, 
  ArrowRight,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";

const facilities = [
  {
    title: "Architectural Planning",
    description: "Comprehensive architectural blueprints that blend structural integrity with modern aesthetics, ensuring every inch of your space is optimized for its purpose.",
    icon: Building2,
  },
  {
    title: "Site Analysis",
    description: "Detailed evaluation of your property's topography, climate, and constraints to create a design that harmonizes perfectly with its surroundings.",
    icon: Map,
  },
  {
    title: "2D Floor Plan",
    description: "Meticulously crafted 2D layouts providing a clear, top-down view of spatial arrangements, room dimensions, and traffic flow.",
    icon: Layout,
  },
  {
    title: "3D Elevation",
    description: "Stunning 3D exterior visualizations that give you a realistic preview of your building's facade, materials, and overall curb appeal before construction begins.",
    icon: Box,
  },
  {
    title: "3D Interior Design",
    description: "Immersive 3D interior renders showcasing textures, lighting, furniture placement, and color schemes, allowing you to experience your future home.",
    icon: Sofa,
  },
  {
    title: "Structural Plan",
    description: "Robust engineering plans detailing the framework, load-bearing walls, and foundation requirements to ensure lifelong safety and stability.",
    icon: PencilRuler,
  },
  {
    title: "Electrical Plan",
    description: "Strategic layout of wiring, outlets, and lighting fixtures designed for safety, energy efficiency, and modern smart-home compatibility.",
    icon: Zap,
  },
  {
    title: "Plumbing Plan",
    description: "Efficient water supply and drainage blueprints, thoughtfully designed to prevent leaks and ensure optimal water pressure throughout the building.",
    icon: Droplet,
  },
  {
    title: "Interior Layout Project",
    description: "A cohesive master plan that ties together all interior elements—from spatial zoning to bespoke furniture alignment—creating a unified living experience.",
    icon: Ruler,
  }
];

export default function DesignFacilitiesPage() {
  return (
    <div className="min-h-screen pt-24 pb-20 bg-[#020813]">
      
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-galaxy-dark py-20 px-6 sm:px-12 lg:px-24 border-b border-white/5">
        <div className="absolute inset-0 bg-logo-radial opacity-30 mix-blend-screen pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest">
              Our Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter leading-tight">
              Premium <span className="text-accent">Design</span> Facilities
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
              From the first sketch to the final 3D render, our comprehensive design services ensure your vision is meticulously planned, structurally sound, and visually breathtaking.
            </p>
            <div className="pt-4 flex gap-4">
              <a href="tel:+919631980881">
                <Button className="bg-accent text-primary hover:bg-white hover:text-primary rounded-full px-8 py-6 font-bold tracking-wider m3-transition shadow-[0_0_20px_rgba(255,207,51,0.2)]">
                  <Phone className="w-4 h-4 mr-2" />
                  ENQUIRE NOW
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-24 py-24">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Our Design Process</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            We offer an end-to-end design facility that covers every technical and aesthetic aspect of your project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-accent/50 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500" />
              
              <div className="w-14 h-14 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform duration-300">
                <facility.icon className="w-6 h-6 text-accent" />
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 relative z-10">{facility.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed relative z-10">
                {facility.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-6 sm:px-12 my-12">
        <div className="bg-gradient-to-br from-accent/20 to-transparent border border-accent/30 rounded-[32px] p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-logo-radial opacity-50 mix-blend-overlay" />
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-black text-white">Ready to start designing?</h3>
            <p className="text-gray-300 max-w-xl mx-auto">
              Get in touch with our expert architects and designers today to bring your dream space to life.
            </p>
            <a href="tel:+919631980881" className="inline-block mt-4">
              <Button className="bg-white text-primary hover:bg-accent rounded-full px-8 py-6 font-bold tracking-wider m3-transition">
                CONTACT US <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </a>
          </div>
        </div>
      </div>

    </div>
  );
}
