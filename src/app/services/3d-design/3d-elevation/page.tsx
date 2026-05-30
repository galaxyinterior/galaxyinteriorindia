"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CheckCircle2,
  Layers,
  Sun,
  Palette,
  Camera,
  Home,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GALLERY = [
  {
    src: "/generated/3d_split_elevation_hero.png",
    label: "Blueprint → Luxury Villa Render",
  },
  {
    src: "/generated/3d_split_villa_exterior.png",
    label: "Blueprint → Modern Bungalow",
  },
  {
    src: "/generated/elevation_gallery_2.png",
    label: "Premium Villa — Night View",
  },
];

const FEATURES = [
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Multiple View Angles",
    desc: "Front, side, rear and bird's-eye elevation views delivered for complete spatial understanding.",
  },
  {
    icon: <Sun className="w-5 h-5" />,
    title: "Dusk & Daylight Renders",
    desc: "We render your home under golden-hour sunlight and dramatic night lighting to show every mood.",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Material & Colour Simulation",
    desc: "Choose from stone cladding, paint tones, wood textures — visualised before purchase.",
  },
  {
    icon: <Camera className="w-5 h-5" />,
    title: "Ultra-HD Output",
    desc: "All renders are delivered in Ultra HD resolution suitable for presentations, printing, and approvals.",
  },
  {
    icon: <Home className="w-5 h-5" />,
    title: "Landscape & Site Context",
    desc: "We include surrounding landscape, driveway, garden, and boundary wall in the scene.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Fast Turnaround",
    desc: "Initial concept renders delivered within 3–5 working days. Revisions included.",
  },
];

const POINTS = [
  "Front, Side & Rear Elevation Renders",
  "Dusk, Day & Night Lighting Modes",
  "Stone, Tile, Paint & Glass Material Options",
  "Landscape, Garden & Driveway Included",
  "Unlimited Colour Variations",
  "High-Resolution Output (4K+)",
  "Revisions Until You're Satisfied",
  "PDF & Image File Delivery",
];

export default function ThreeDElevationPage() {
  return (
    <div className="bg-[#051124] min-h-screen text-white">
      {/* Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden border-b border-white/10">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/3d_split_elevation_hero.png"
            alt="3D Elevation Design"
            fill
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/70 via-[#051124]/80 to-[#051124]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-5xl py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-accent/80 font-bold uppercase tracking-widest text-[10px] mb-6">
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services/3d-design" className="hover:text-accent transition-colors">3D Design</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-accent">3D Elevation</span>
          </div>

          <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-md text-[10px] uppercase">
            Exterior Visualization
          </Badge>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight mb-6 uppercase leading-none">
            3D <span className="text-gold italic">Elevation</span> Design
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/60 font-semibold leading-relaxed mb-10">
            See every detail of your home's exterior before construction begins. Photorealistic renders with materials, lighting, and landscape — all visualised with architectural precision.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="rounded-full px-6 md:px-10 h-11 md:h-14 text-xs md:text-sm font-black uppercase tracking-[0.15em] bg-accent hover:bg-accent/90 text-primary shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
              <Link href="/contact?service=3D%20Elevation">Get a Free Quote</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6 md:px-10 h-11 md:h-14 text-xs md:text-sm font-black uppercase tracking-[0.15em] border-white/20 hover:border-accent text-white hover:text-accent bg-transparent transition-all">
              <Link href="/services/3d-design">← Back to 3D Design</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 rounded-full bg-white/5 text-accent font-black tracking-[0.20em] px-5 py-2 border border-accent/20 text-[10px] uppercase">
              Our Work
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Elevation <span className="text-gold italic">Gallery</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {GALLERY.map((img, i) => (
              <div
                key={i}
                className="group relative rounded-[24px] overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/10"
              >
                <div className="relative h-64 w-full">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="bg-[#08162d] px-5 py-4 border-t border-white/10">
                  <p className="text-sm font-bold text-white/80">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#08162d]/50 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              What's <span className="text-gold italic">Included</span>
            </h2>
            <p className="text-white/50 mt-4 text-sm font-semibold max-w-lg mx-auto">
              Every 3D Elevation Design package by Galaxy Interior includes these professional deliverables.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="bg-[#08162d] rounded-[24px] border border-white/10 hover:border-accent/30 p-7 flex gap-5 items-start transition-all duration-300 hover:shadow-xl hover:shadow-accent/5 hover:scale-[1.02]"
              >
                <div className="bg-accent/10 text-accent w-11 h-11 rounded-2xl flex items-center justify-center shrink-0">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-black text-white text-base uppercase tracking-tight mb-1">{f.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Checklist */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-[32px] overflow-hidden aspect-square border border-white/10">
              <Image
                src="/generated/elevation_gallery_2.png"
                alt="3D Elevation render night"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051124]/60 to-transparent" />
            </div>
            <div>
              <Badge className="mb-4 rounded-full bg-white/5 text-accent font-black tracking-[0.20em] px-5 py-2 border border-accent/20 text-[10px] uppercase">
                Deliverables
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8">
                Everything You <span className="text-gold italic">Receive</span>
              </h2>
              <ul className="space-y-3">
                {POINTS.map((p) => (
                  <li key={p} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/20 transition-all">
                    <div className="bg-accent/15 p-1.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-semibold text-white/80">{p}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-10 rounded-full px-6 md:px-10 h-11 md:h-14 text-xs md:text-sm font-black uppercase tracking-[0.15em] bg-accent hover:bg-accent/90 text-primary shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
                <Link href="/contact?service=3D%20Elevation">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
