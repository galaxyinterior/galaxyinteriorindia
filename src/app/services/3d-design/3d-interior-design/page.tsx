"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  CheckCircle2,
  Sofa,
  Lightbulb,
  PaintBucket,
  LayoutDashboard,
  BedDouble,
  UtensilsCrossed,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const GALLERY = [
  {
    src: "/generated/3d_split_interior_hero.png",
    label: "Blueprint → Luxury Living Room",
  },
  {
    src: "/generated/3d_split_bedroom.png",
    label: "Blueprint → Master Bedroom",
  },
  {
    src: "/generated/3d_split_kitchen.png",
    label: "Blueprint → Modular Kitchen",
  },
];

const ROOMS = [
  { icon: <Sofa className="w-5 h-5" />, name: "Living Room" },
  { icon: <BedDouble className="w-5 h-5" />, name: "Master Bedroom" },
  { icon: <BedDouble className="w-5 h-5" />, name: "Kids / Guest Room" },
  { icon: <UtensilsCrossed className="w-5 h-5" />, name: "Kitchen" },
  { icon: <LayoutDashboard className="w-5 h-5" />, name: "Dining Area" },
  { icon: <PaintBucket className="w-5 h-5" />, name: "Pooja / Study Room" },
];

const FEATURES = [
  {
    icon: <Sofa className="w-5 h-5" />,
    title: "Furniture Placement",
    desc: "Accurately modelled furniture matched to your chosen style, scaled to your actual room dimensions.",
  },
  {
    icon: <Lightbulb className="w-5 h-5" />,
    title: "Lighting Mood Design",
    desc: "See warm, cool, and accent lighting scenarios before wiring — no surprises on site.",
  },
  {
    icon: <PaintBucket className="w-5 h-5" />,
    title: "Material & Texture Mapping",
    desc: "Marble, wood, fabric, tiles — every surface material visualised with photorealistic accuracy.",
  },
  {
    icon: <LayoutDashboard className="w-5 h-5" />,
    title: "Room Layout Optimisation",
    desc: "We test multiple layout options in 3D and present the best space utilisation for your room.",
  },
  {
    icon: <BedDouble className="w-5 h-5" />,
    title: "All Rooms Covered",
    desc: "From living rooms and bedrooms to kitchens and pooja rooms — every space designed.",
  },
  {
    icon: <UtensilsCrossed className="w-5 h-5" />,
    title: "Kitchen & Wardrobe Details",
    desc: "Detailed render of modular kitchen layouts and full wardrobe interior configurations.",
  },
];

const POINTS = [
  "Room-by-Room 3D Renders (All Rooms)",
  "Furniture, Fixtures & Décor in 3D",
  "Lighting Mood — Warm, Cool & Accent",
  "Texture & Material Selection Guide",
  "False Ceiling Design Included",
  "Colour Palette Consultation",
  "High-Resolution Output (4K+)",
  "Revisions Until Approved",
];

export default function ThreeDInteriorDesignPage() {
  return (
    <div className="bg-[#051124] min-h-screen text-white">
      {/* Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/3d_split_interior_hero.png"
            alt="3D Interior Design"
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
            <span className="text-accent">3D Interior Design</span>
          </div>

          <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-md text-[10px] uppercase">
            Interior Visualization
          </Badge>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight mb-6 uppercase leading-none">
            3D <span className="text-gold italic">Interior</span> Design
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/60 font-semibold leading-relaxed mb-10">
            Walk through your home virtually before a single piece of furniture is placed. Ultra-realistic renders that help you finalise every room's look, feel, and finish with total confidence.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="rounded-full px-6 md:px-10 h-11 md:h-14 text-xs md:text-sm font-black uppercase tracking-[0.15em] bg-accent hover:bg-accent/90 text-primary shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
              <Link href="/contact?service=3D%20Interior%20Design">Get a Free Quote</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-6 md:px-10 h-11 md:h-14 text-xs md:text-sm font-black uppercase tracking-[0.15em] border-white/20 hover:border-accent text-white hover:text-accent bg-transparent transition-all">
              <Link href="/services/3d-design">← Back to 3D Design</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Rooms We Cover */}
      <section className="py-14 border-b border-white/10 bg-[#08162d]/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-6">
            Rooms We Design in 3D
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {ROOMS.map((r) => (
              <div
                key={r.name}
                className="flex items-center gap-2 bg-white/5 border border-white/10 hover:border-accent/40 hover:bg-accent/5 rounded-full px-5 py-2.5 text-sm font-bold text-white/70 hover:text-white transition-all duration-200"
              >
                <span className="text-accent">{r.icon}</span>
                {r.name}
              </div>
            ))}
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
              Interior <span className="text-gold italic">Gallery</span>
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
              Every 3D Interior Design project by Galaxy Interior comes with these professional deliverables.
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
                <Link href="/contact?service=3D%20Interior%20Design">Start Your Project</Link>
              </Button>
            </div>
            <div className="relative rounded-[32px] overflow-hidden aspect-square border border-white/10">
              <Image
                src="/generated/interior_gallery_1.png"
                alt="Luxury bedroom interior render"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051124]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
