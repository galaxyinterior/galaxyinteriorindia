"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, CheckCircle2, Map, LayoutGrid, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const SPECS = [
  { label: "Standard Scale", value: "1:50 / 1:100 Metric" },
  { label: "File Formats", value: "PDF, DWG (AutoCAD), PNG" },
  { label: "Turnaround Time", value: "3 - 5 Business Days" },
  { label: "Vastu Compliance", value: "Included (Standard & Premium)" },
];

const FEATURES = [
  {
    icon: <Map className="w-5 h-5" />,
    title: "Vastu-Compliant Zoning",
    desc: "Positioning of main entries, master bedrooms, kitchens, and toilets in accordance with core Vastu principles to invite positive energy.",
  },
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    title: "Exact Wall Thicknesses",
    desc: "Precise drafting of 10-inch external load-bearing masonry walls and 5-inch internal partition walls for accurate carpet-area mapping.",
  },
  {
    icon: <Map className="w-5 h-5" />,
    title: "Window & Door Schedules",
    desc: "Every opening is meticulously dimensioned with designated door-swing clearances and window lintel heights.",
  },
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    title: "Room Spacing Balance",
    desc: "Optimal distribution of square footage between utility zones, circulation corridors, and living spaces.",
  },
  {
    icon: <Map className="w-5 h-5" />,
    title: "Precision Site Orientations",
    desc: "Drafted with precise reference to magnetic north and physical road margins for flawless site alignments.",
  },
  {
    icon: <LayoutGrid className="w-5 h-5" />,
    title: "Municipal Approval Ready",
    desc: "Plans meet standard corporate and municipal drafting guidelines for hassle-free civil approvals.",
  },
];

const DELIVERABLES = [
  "2D Scale-Drawn Floor Plan (1:50 Scale)",
  "Outer Boundary & Wall-to-Wall Inner Dimensions",
  "Door, Window & Ventilator Opening Schedule",
  "Carpet Area vs. Super Built-Up Area Calculations",
  "Staircase Rise, Run, and Landing Coordinates",
  "Vastu Directional Assessment Report",
  "AutoCAD Source File (.DWG Format)",
  "Plot Boundary & Elevation Coordination Outline",
];

export default function FloorPlanPage() {
  return (
    <div className="bg-[#051124] min-h-screen text-white">
      {/* Hero */}
      <section className="relative pt-28 pb-0 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/2d_floor_plan.png"
            alt="2D Floor Plan Overview"
            fill
            className="object-cover opacity-20 filter invert"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/70 via-[#051124]/80 to-[#051124]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 max-w-5xl py-20">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-accent/80 font-bold uppercase tracking-widest text-[10px] mb-6">
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/services/2d-plan" className="hover:text-accent transition-colors">2D Plan</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-accent">2D Floor Plan</span>
          </div>

          <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-md text-[10px] uppercase">
            Architectural Layouts
          </Badge>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight mb-6 uppercase leading-none">
            2D <span className="text-gold italic">Floor</span> Plan
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-white/60 font-semibold leading-relaxed mb-10">
            Create high-accuracy, Vastu-compliant physical maps of your dream home. Our detailed drawings outline every room boundary, wall thickness, and opening to match construction parameters.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild className="rounded-full px-10 h-14 font-black uppercase tracking-[0.15em] bg-accent hover:bg-accent/90 text-primary shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
              <Link href="/contact?service=2D%20Floor%20Plan">Get a Free Quote</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-10 h-14 font-black uppercase tracking-[0.15em] border-white/20 hover:border-accent text-white hover:text-accent bg-transparent transition-all">
              <Link href="/services/2d-plan">← Back to 2D Plan</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Specifications Strip */}
      <section className="py-8 border-b border-white/10 bg-[#08162d]/40">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {SPECS.map((spec) => (
              <div key={spec.label} className="text-center md:text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 mb-1">{spec.label}</p>
                <p className="text-sm font-black text-white">{spec.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Image Blueprint Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 rounded-full bg-white/5 text-accent font-black tracking-[0.20em] px-5 py-2 border border-accent/20 text-[10px] uppercase">
              Physical Mapping
            </Badge>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Blueprint <span className="text-gold italic">Precision</span>
            </h2>
          </div>

          <div className="max-w-4xl mx-auto rounded-[32px] overflow-hidden border border-white/10 bg-[#0a1f3d] p-6 shadow-2xl shadow-black/50">
            <div className="relative aspect-[4/3] w-full bg-white rounded-[20px] overflow-hidden p-4">
              <Image
                src="/generated/2d_floor_plan.png"
                alt="Detailed 2D Floor Plan Drawing"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-6 flex flex-wrap gap-3 justify-center">
              <span className="bg-[#1a2d4d]/90 text-[#5b9bd5] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-[#5b9bd5]/30">AutoCAD Drawing</span>
              <span className="bg-[#1a2d4d]/90 text-accent text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-accent/30">Vastu Orientations Mapped</span>
              <span className="bg-[#1a2d4d]/90 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-400/30">Ready for Execution</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-[#08162d]/50 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              What&apos;s <span className="text-gold italic">Included</span>
            </h2>
            <p className="text-white/50 mt-4 text-sm font-semibold max-w-lg mx-auto">
              Every professional Floor Plan drafted by the Galaxy Interior design studio includes these core architectural standards.
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
                Final Deliverables
              </Badge>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white mb-8">
                Everything You <span className="text-gold italic">Receive</span>
              </h2>
              <ul className="space-y-3">
                {DELIVERABLES.map((p) => (
                  <li key={p} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-accent/20 transition-all">
                    <div className="bg-accent/15 p-1.5 rounded-full shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                    </div>
                    <span className="text-sm font-semibold text-white/80">{p}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-10 rounded-full px-10 h-14 font-black uppercase tracking-[0.15em] bg-accent hover:bg-accent/90 text-primary shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
                <Link href="/contact?service=2D%20Floor%20Plan">Enquire For Floor Plan</Link>
              </Button>
            </div>
            <div className="relative rounded-[32px] overflow-hidden aspect-square border border-white/10">
              <Image
                src="/generated/2d_floor_plan.png"
                alt="Floor plan on site layout context"
                fill
                className="object-cover filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#051124]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
