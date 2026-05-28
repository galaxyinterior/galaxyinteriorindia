"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Box, Sofa, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const types = [
  {
    slug: "3d-elevation",
    label: "3D Elevation Design",
    tagline: "Exterior Visualization",
    icon: <Box className="w-7 h-7" />,
    description:
      "See your dream home's exterior before a single brick is laid. We craft photorealistic 3D elevation renders showcasing every facade detail — from stone cladding and glass panels to landscape lighting.",
    image: "/generated/3d_split_elevation_hero.png",
    highlights: [
      "Front, Side & Rear Elevation Views",
      "Dusk & Daylight Renders",
      "Material & Colour Simulation",
      "Landscape & Surroundings",
    ],
  },
  {
    slug: "3d-interior-design",
    label: "3D Interior Design",
    tagline: "Interior Visualization",
    icon: <Sofa className="w-7 h-7" />,
    description:
      "Walk through your future home virtually before execution. Our ultra-realistic interior 3D renders cover every room — living room, bedroom, kitchen, and more — with true-to-life lighting, furniture, and textures.",
    image: "/generated/3d_split_interior_hero.png",
    highlights: [
      "Room-by-Room 3D Renders",
      "Furniture & Fixture Placement",
      "Texture & Material Mapping",
      "Lighting Mood Simulation",
    ],
  },
];

export default function ThreeDDesignPage() {
  return (
    <div className="bg-[#051124] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative py-28 md:py-36 overflow-hidden border-b border-white/10">
        {/* Full-bleed split hero background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/3d_split_interior_hero.png"
            alt="3D Design"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/60 via-[#051124]/70 to-[#051124]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-accent/80 font-bold uppercase tracking-widest text-[10px] mb-6">
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-accent">3D Design</span>
          </div>
          <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-md text-[10px] uppercase">
            Visualization Services
          </Badge>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight mb-6 uppercase leading-none text-white">
            3D <span className="text-gold italic">Design</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/60 font-semibold leading-relaxed">
            From blueprint sketch to photorealistic render — experience your dream space before it&apos;s built.
          </p>
        </div>
      </section>

      {/* Concept Strip */}
      <section className="py-10 border-b border-white/10 bg-[#08162d]/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="relative rounded-[20px] overflow-hidden flex-1 h-48 border border-white/10">
              <Image
                src="/generated/3d_split_elevation_hero.png"
                alt="Blueprint to render concept"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#08162d]/80" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-3">Our Process</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-3 tracking-tight">
                Blueprint → <span className="text-gold italic">Reality</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                We begin with architectural sketches and wireframe models, then evolve them into stunning photorealistic renders — so you see every detail before execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Type Cards */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">Choose Your Service</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Two Types of <span className="text-gold italic">3D Design</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {types.map((type, idx) => (
              <Link
                key={type.slug}
                href={`/services/3d-design/${type.slug}`}
                className="group relative rounded-[32px] overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/10"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Split image */}
                <div className="relative h-80 w-full overflow-hidden">
                  <Image
                    src={type.image}
                    alt={type.label}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-[#051124]/30 to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-accent text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {type.tagline}
                    </span>
                  </div>
                  {/* Blueprint label overlay */}
                  <div className="absolute bottom-4 left-5 right-5 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                    <span className="bg-[#1a2d4d]/90 text-[#5b9bd5] text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#5b9bd5]/30">Wireframe</span>
                    <span className="text-white/40 text-[9px] font-black uppercase tracking-widest flex items-center gap-1">→</span>
                    <span className="bg-accent/20 text-accent text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-full border border-accent/30">Photorealistic Render</span>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-[#08162d] p-8 relative">
                  {/* Icon */}
                  <div className="absolute -top-6 right-8 bg-accent text-primary w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30">
                    {type.icon}
                  </div>

                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 mt-2">
                    {type.label}
                  </h2>
                  <p className="text-white/60 text-sm leading-relaxed mb-6">
                    {type.description}
                  </p>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-8">
                    {type.highlights.map((h) => (
                      <li key={h} className="flex items-center gap-2.5 text-sm text-white/80 font-semibold">
                        <Check className="w-4 h-4 text-accent shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center gap-2 text-accent font-black uppercase tracking-wider text-xs group-hover:gap-4 transition-all duration-300">
                    Explore {type.label}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Strip */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">Sketch to Reality</p>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              Our <span className="text-gold italic">Work</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { src: "/generated/3d_split_living_room.png", label: "Living Room" },
              { src: "/generated/3d_split_bedroom.png", label: "Bedroom" },
              { src: "/generated/3d_split_kitchen.png", label: "Kitchen" },
              { src: "/generated/3d_split_villa_exterior.png", label: "Villa Exterior" },
            ].map((img) => (
              <div
                key={img.src}
                className="group relative rounded-[20px] overflow-hidden border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-[1.03]"
              >
                <div className="relative h-40 md:h-52 w-full">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 text-xs font-black text-white uppercase tracking-wider">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/50 text-sm font-semibold mb-4 uppercase tracking-widest">Not sure which one?</p>
          <h3 className="text-3xl font-black uppercase text-white mb-6">
            Talk to Our <span className="text-gold italic">Design Team</span>
          </h3>
          <Button asChild className="rounded-full px-10 h-14 font-black uppercase tracking-[0.15em] bg-accent hover:bg-accent/90 text-primary shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
            <Link href="/contact?services=3D%20Elevation,3D%20Interior%20Design">Get a Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
