"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, Check, Sofa, Home, Building, Layers, Calculator } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const packages = [
  {
    slug: "1-room",
    label: "1 Room / Studio Studio Suite",
    price: "₹1.5 Lac*",
    tagline: "Compact Space Optimization",
    icon: <Layers className="w-7 h-7" />,
    description:
      "Perfect for single bedrooms, master bedroom upgrades, cozy studio apartments, or premium home workspaces.",
    image: "/generated/srv_interior.png",
    highlights: [
      "1 Cozy Bed Suite with storage",
      "Sleek wardrobes & dressing tables",
      "Modular switches & LED accent light loops",
      "Premium paint & wall finish prep",
    ],
  },
  {
    slug: "2bhk",
    label: "2 BHK Family Package",
    price: "₹4.2 Lac*",
    tagline: "Balanced Modern Living",
    icon: <Home className="w-7 h-7" />,
    description:
      "Comprehensive spatial fit-out covering living room, smart modular kitchen, master bedroom, and kids/guest room.",
    image: "/generated/interior_gallery_2.png",
    highlights: [
      "Living Room TV panel & false ceilings",
      "Highly durable Modular Kitchen set",
      "2 fully furnished Bedroom suites",
      "Premium bathroom fittings & paint",
    ],
  },
  {
    slug: "3bhk",
    label: "3 BHK Elite Residence",
    price: "₹6.5 Lac*",
    tagline: "Luxurious Large Layouts",
    icon: <Building className="w-7 h-7" />,
    description:
      "Designed for spacious residences and multi-floor duplexes. Complete premium custom fittings, false ceilings, and decor.",
    image: "/generated/3d_split_bedroom.png",
    highlights: [
      "Spacious Living and Dining false ceilings",
      "Premium U/L-shaped modular kitchen setup",
      "3 elegant fully-featured Bedroom units",
      "High-end paint, lighting, and bathroom fixtures",
    ],
  },
  {
    slug: "customized",
    label: "Fully Customized Layout",
    price: "Custom Quote",
    tagline: "Bespoke Architect Planning",
    icon: <Sofa className="w-7 h-7" />,
    description:
      "Tailor-made spaces. Mix-and-match bedrooms, libraries, home cinemas, bars, pooja rooms, and elite modular additions.",
    image: "/generated/interior_gallery_1.png",
    highlights: [
      "Flexible bedroom & bathroom configurations",
      "Integration of premium luxury features",
      "Direct Vastu layout planning sync",
      "1-on-1 consultations with Chief Architect",
    ],
  },
];

export default function InteriorProjectsPage() {
  return (
    <div className="bg-[#051124] min-h-screen text-white">
      {/* Hero Header */}
      <section className="relative py-28 md:py-36 overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src="/generated/interior_gallery_1.png"
            alt="Premium Interior Project"
            fill
            className="object-cover opacity-20 filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#051124]/60 via-[#051124]/75 to-[#051124]" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center gap-2 text-accent/80 font-bold uppercase tracking-widest text-[10px] mb-6">
            <Link href="/services" className="hover:text-accent transition-colors">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-accent">Interior Projects</span>
          </div>
          <Badge className="mb-6 rounded-full bg-accent text-primary font-black tracking-[0.20em] px-6 py-2 border-none shadow-md text-[10px] uppercase">
            Turnkey Executions
          </Badge>
          <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight mb-6 uppercase leading-none text-white">
            Interior <span className="text-gold italic">Projects</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/60 font-semibold leading-relaxed">
            Turn your empty civil shells into a high-end luxury haven. Complete materials, skilled craftsmanship, and transparent pricing under one unified roof.
          </p>
          <Button asChild className="mt-10 rounded-full px-10 h-14 font-black uppercase tracking-[0.15em] bg-accent hover:bg-accent/90 text-primary shadow-lg shadow-accent/20 hover:scale-105 active:scale-95 transition-all">
            <Link href="/services/interior-projects/estimate" className="flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Use Instant Cost Estimate Maker
            </Link>
          </Button>
        </div>
      </section>

      {/* Package Configurations Grid */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.25em] text-white/40 mb-3">Choose Your Configuration</p>
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
              Interior Design <span className="text-gold italic">Packages</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, idx) => (
              <div
                key={pkg.slug}
                className="group relative rounded-[32px] overflow-hidden border border-white/10 hover:border-accent/40 transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl hover:shadow-accent/10 flex flex-col justify-between bg-[#08162d]"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div>
                  {/* Image banner */}
                  <div className="relative h-64 w-full overflow-hidden bg-black/40">
                    <Image
                      src={pkg.image}
                      alt={pkg.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#08162d] via-transparent to-transparent" />
                    
                    {/* Tags */}
                    <div className="absolute top-5 left-5">
                      <span className="bg-accent text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                        {pkg.tagline}
                      </span>
                    </div>

                    <div className="absolute top-5 right-5">
                      <span className="bg-primary border border-accent/30 text-white text-[12px] font-black uppercase tracking-wider px-4 py-1.5 rounded-full shadow-lg">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-8 relative">
                    {/* Floating Icon */}
                    <div className="absolute -top-6 right-8 bg-accent text-primary w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg shadow-accent/30">
                      {pkg.icon}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 mt-2">
                      {pkg.label}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed mb-6">
                      {pkg.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2 mb-4">
                      {pkg.highlights.map((h) => (
                        <li key={h} className="flex items-center gap-2.5 text-sm text-white/80 font-semibold">
                          <Check className="w-4 h-4 text-accent shrink-0" />
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="px-8 pb-8 pt-4">
                  <Button asChild className="w-full rounded-full h-12 font-black uppercase tracking-wider bg-accent hover:bg-accent/90 text-primary transition-all">
                    <Link href={`/services/interior-projects/estimate?type=${pkg.slug}`}>
                      Calculate {pkg.slug === "customized" ? "Bespoke" : pkg.slug.toUpperCase()} Estimate
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust factors */}
      <section className="py-20 bg-[#08162d]/50 border-t border-white/10">
        <div className="container mx-auto px-4 max-w-5xl text-center">
          <Badge className="mb-4 rounded-full bg-white/5 text-accent font-black tracking-[0.20em] px-5 py-2 border border-accent/20 text-[10px] uppercase">
            Galaxy Standards
          </Badge>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white mb-6">
            Transparent Pricing. <span className="text-gold italic">No Hidden Costs.</span>
          </h2>
          <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-10">
            We operate with a fully transparent pricing index using branded materials, structured labor cards, and complete bill of quantities (BOQ) so you know exactly where every rupee goes.
          </p>
          <Button asChild variant="outline" className="rounded-full px-10 h-14 font-black uppercase tracking-[0.15em] border-white/20 hover:border-accent text-white hover:text-accent bg-transparent transition-all">
            <Link href="/services">Browse All Services</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
