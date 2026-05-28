"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Map, Sofa, Zap, Wrench, ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const subServices = [
  {
    slug: "floor-plan",
    label: "2D Floor Plan",
    tagline: "Dimensional Layouts",
    icon: <Map className="w-7 h-7" />,
    description:
      "Accurate spatial configurations showing wall thickness, room sizes, and openings mapped out to structural perfection. The baseline for your entire project.",
    image: "/generated/2d_floor_plan.png",
    highlights: [
      "Vastu-Compliant Zoning",
      "Precise Wall Dimensions",
      "Door & Window Coordinates",
      "Area Square-Foot Analysis",
    ],
  },
  {
    slug: "furniture-plan",
    label: "2D Furniture Plan",
    tagline: "Ergonomic Layouts",
    icon: <Sofa className="w-7 h-7" />,
    description:
      "Optimize your living experience with scaled furniture sizing and circulation clearance grids. Ensures every piece of furniture fits naturally without cluttering.",
    image: "/generated/2d_furniture_plan.png",
    highlights: [
      "Ergonomic Clearances",
      "Traffic Circulation Maps",
      "Seating & Dining Layouts",
      "Storage Zone Allocations",
    ],
  },
  {
    slug: "electrical-plan",
    label: "2D Electrical Plan",
    tagline: "Conduit & Conduit Mapping",
    icon: <Zap className="w-7 h-7" />,
    description:
      "Detailed power socket, lighting, switchboard, and air conditioner loop mapping for flawless installations. Avoid post-plastering alterations.",
    image: "/generated/2d_electrical_plan.png",
    highlights: [
      "Switchboard Coordinate Maps",
      "Load Capacity Planning",
      "Appliance Power Points",
      "Automation Conduit Routes",
    ],
  },
  {
    slug: "plumbing-plan",
    label: "2D Plumbing Plan",
    tagline: "Supply & Drainage Routes",
    icon: <Wrench className="w-7 h-7" />,
    description:
      "Water supply routes, sewerage drainage slopes, and appliance tap locations carefully detailed to prevent leakages and ensure optimal pressure.",
    image: "/generated/2d_plumbing_plan.png",
    highlights: [
      "Drainage Gradients & Slopes",
      "Hot/Cold Water Piping",
      "Sanitary Outlet Coordinates",
      "Trap & Vent Placements",
    ],
  },
];

export default function TwoDPlanDashboardPage() {
  return (
    <div className="bg-[#051124] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative py-28 md:py-36 overflow-hidden border-b border-white/10">
        {/* Full-bleed blueprint background overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/2d_floor_plan.png"
            alt="2D Floor Plan Blueprint"
            fill
            className="object-cover opacity-20 filter invert"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/60 via-[#051124]/75 to-[#051124]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-accent/80 font-bold uppercase tracking-widest text-[10px] mb-6">
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-accent">2D Plan</span>
          </div>
          <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-md text-[10px] uppercase">
            Technical Mapping & Planning
          </Badge>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight mb-6 uppercase leading-none text-white">
            2D <span className="text-gold italic">Planning</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/60 font-semibold leading-relaxed">
            Precise scale drawings, structural alignments, and coordinate maps that form the absolute bedrock of perfect site execution.
          </p>
        </div>
      </section>

      {/* Concept Strip */}
      <section className="py-10 border-b border-white/10 bg-[#08162d]/50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="relative rounded-[20px] overflow-hidden flex-1 h-48 border border-white/10">
              <Image
                src="/generated/2d_furniture_plan.png"
                alt="Blueprint detailing space mapping"
                fill
                className="object-cover filter brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#08162d]/85" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-accent mb-3">Foundational Architecture</p>
              <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-3 tracking-tight">
                Zero Mistakes, <span className="text-gold italic">100% Precision</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed">
                By laying out walls, seating arrangements, electrical conduits, and plumbing lines to accurate scale beforehand, we eliminate raw material wastage and site rework completely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">Our Deliverables</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Four Pillars of <span className="text-gold italic">2D Planning</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {subServices.map((service, idx) => (
              <Link
                key={service.slug}
                href={`/services/2d-plan/${service.slug}`}
                className="group relative rounded-[32px] overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-accent/10 flex flex-col"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                {/* Image Section */}
                <div className="relative h-72 w-full overflow-hidden bg-[#0a1f3d]">
                  <Image
                    src={service.image}
                    alt={service.label}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-[#051124]/30 to-transparent" />
                  {/* Tag */}
                  <div className="absolute top-5 left-5">
                    <span className="bg-accent text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                      {service.tagline}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="bg-[#08162d] p-8 relative flex-1 flex flex-col justify-between">
                  <div>
                    {/* Icon */}
                    <div className="absolute -top-6 right-8 bg-accent text-primary w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30">
                      {service.icon}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 mt-2">
                      {service.label}
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-8">
                      {service.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5 text-sm text-white/80 font-semibold">
                          <Check className="w-4 h-4 text-accent shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-accent font-black uppercase tracking-wider text-xs group-hover:gap-4 transition-all duration-300 mt-4">
                    Explore Detailed {service.label}
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Blueprint Comparison strip */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">Scale Renderings</p>
            <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white">
              Blueprint <span className="text-gold italic">Gallery</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {subServices.map((img) => (
              <div
                key={img.slug}
                className="group relative rounded-[20px] overflow-hidden border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-[1.03] bg-[#0c2242] p-2"
              >
                <div className="relative h-40 md:h-52 w-full rounded-[14px] overflow-hidden bg-white/5 p-2">
                  <Image
                    src={img.image}
                    alt={img.label}
                    fill
                    className="object-contain p-2 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 text-[10px] font-black text-white uppercase tracking-wider bg-[#051124]/80 px-2 py-0.5 rounded">{img.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-white/10">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/50 text-sm font-semibold mb-4 uppercase tracking-widest">Ready to layout your house?</p>
          <h3 className="text-3xl font-black uppercase text-white mb-6">
            Get Professional <span className="text-gold italic">2D Blueprints</span>
          </h3>
          <Button asChild className="rounded-full px-10 h-14 font-black uppercase tracking-[0.15em] bg-accent hover:bg-accent/90 text-primary shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
            <Link href="/contact?services=2D%20Floor%20Plan,Furniture%20Layout%20Plan,Electrical%20Layout,Plumbing%20Layout">Request Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
