
"use client";

import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Building, PencilRuler, Box, Hammer, Home, 
  Layers, Paintbrush, Palette, Grid3X3, Waves, 
  Wrench, Zap, CookingPot, ChevronRight, LayoutGrid,
  FileText, Calculator, Map, CheckCircle2
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const services = [
  { 
    name: 'Architectural Plan', 
    slug: 'architectural-plan', 
    icon: <PencilRuler />, 
    desc: 'Architectural & Structural Planning with Vastu compliance.',
    image: '/generated/legacy_villa.png',
    imageHint: 'architectural blueprints'
  },
  { 
    name: '2D Plan', 
    slug: '2d-plan', 
    icon: <LayoutGrid />, 
    desc: 'Detailed Floor Plans and Working Drawings for execution.',
    image: '/2dplan.jpg',
    imageHint: '2d floor plan'
  },
  { 
    name: '3D Design', 
    slug: '3d-design', 
    icon: <Box />, 
    desc: 'Ultra-realistic 3D Renders and Exterior Elevation designs.',
    image: '/generated/srv_3d_design.png',
    imageHint: '3d interior design'
  },
  { 
    name: 'Construction', 
    slug: 'construction', 
    icon: <Hammer />, 
    desc: 'End-to-end luxury home construction services.',
    image: '/generated/srv_construction.png',
    imageHint: 'construction site'
  },
  { 
    name: 'Interior Projects', 
    slug: 'interior-projects', 
    icon: <Home />, 
    desc: 'Bespoke interior execution for elite homes.',
    image: '/generated/srv_interior.png',
    imageHint: 'luxury interior design'
  },
];

const planningCategories = [
    {
        title: "Architectural & Structural Planning",
        icon: <Building className="w-6 h-6" />,
        image: "/generated/legacy_villa.png",
        imageHint: "architectural structural",
        points: ["Complete Architectural Layout Design", "Space Utilization Planning", "Structural Analysis & RCC Design", "Vastu-Based Planning (Optional)"]
    },
    {
        title: "Detailed Drawings & Documentation",
        icon: <FileText className="w-6 h-6" />,
        image: "/2dplan.jpg",
        imageHint: "blueprint drawings",
        points: ["2D Floor Plans (Fully Detailed)", "Working Drawings for Site Execution", "Sectional & Elevation Drawings", "Furniture Layout Plans"]
    },
    {
        title: "3D Visualization & Design",
        icon: <Box className="w-6 h-6" />,
        image: "/generated/srv_3d_design.png",
        imageHint: "3d visualization",
        points: ["3D Exterior Elevation Design", "3D Interior Visualization (Ultra-Realistic)", "Walkthrough Design (Optional Premium)"]
    },
    {
        title: "Technical Layout Planning",
        icon: <Zap className="w-6 h-6" />,
        image: "/generated/hero_interior_1.png",
        imageHint: "electrical technical",
        points: ["Electrical Layout with Load Planning", "Plumbing & Drainage Layout", "Lighting Design Planning", "False Ceiling Layout"]
    },
    {
        title: "Cost & Project Planning",
        icon: <Calculator className="w-6 h-6" />,
        image: "/generated/srv_construction.png",
        imageHint: "budget calculation",
        points: ["BOQ (Bill of Quantities)", "Accurate Cost Estimation", "Material Specification Planning", "Project Timeline Planning"]
    }
];

const facilities = [
  { name: 'False Ceiling', slug: 'false-ceiling', icon: <Layers />, image: '/generated/fac_false_ceiling.png', imageHint: 'false ceiling' },
  { name: 'Wallpaper', slug: 'wallpaper', icon: <Paintbrush />, image: '/generated/fac_wallpaper.png', imageHint: 'interior wallpaper' },
  { name: 'Putty/Painting', slug: 'putty-painting', icon: <Palette />, image: '/generated/fac_putty_painting.png', imageHint: 'wall painting' },
  { name: 'Tiles Flooring', slug: 'tiles-flooring', icon: <Grid3X3 />, image: '/generated/fac_tiles_flooring.png', imageHint: 'tiles flooring' },
  { name: 'Wooden Flooring', slug: 'wooden-flooring', icon: <Waves />, image: '/generated/fac_wooden_flooring.png', imageHint: 'wooden flooring' },
  { name: 'Wall Panelling', slug: 'wall-panelling', icon: <Layers />, image: '/generated/fac_wall_panelling.png', imageHint: 'wall panelling' },
  { name: 'Wooden Work', slug: 'wooden-work', icon: <Hammer />, image: '/generated/fac_wooden_work.png', imageHint: 'wooden furniture' },
  { name: 'PVC Work', slug: 'pvc-work', icon: <Wrench />, image: '/generated/fac_pvc_work.png', imageHint: 'pvc wall' },
  { name: 'Automation Lighting', slug: 'automation-lighting', icon: <Zap />, image: '/generated/hero_interior_1.png', imageHint: 'smart lighting' },
  { name: 'Modular Kitchen', slug: 'modular-kitchen', icon: <CookingPot />, image: '/generated/kitchen_offer_bg.png', imageHint: 'modular kitchen' },
];

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero */}
      <section className="relative py-32 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 z-0"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <Badge className="mb-6 rounded-full bg-accent text-primary font-bold tracking-[0.2em] px-6 py-2 uppercase border-none shadow-lg">
            GALAXY EXPERTISE
          </Badge>
          <h1 className="font-display text-5xl md:text-8xl font-bold tracking-tighter mb-6 leading-none uppercase text-shadow-lg">
            Bespoke <span className="text-accent italic">Services</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-white/70 font-medium">
            From architectural blueprints to the final touch of paint, we deliver excellence in Godda and Ranchi.
          </p>
        </div>
      </section>

      {/* Design & Planning Phase Sections */}
      <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
              <div className="text-center mb-24">
                <Badge className="mb-4 bg-primary text-white font-bold px-4 py-1">PHASE 1</Badge>
                <h2 className="text-4xl md:text-6xl font-bold text-primary mb-6 uppercase tracking-tighter">DESIGN & PLANNING SERVICES</h2>
                <p className="text-xl italic text-gray-500 font-medium">“Strong planning is the foundation of perfect execution”</p>
              </div>

              <div className="space-y-32">
                  {planningCategories.map((cat, idx) => (
                      <div key={idx} className={cn(
                          "grid lg:grid-cols-2 gap-12 lg:gap-24 items-center",
                          idx % 2 === 1 && "lg:flex-row-reverse"
                      )}>
                          <div className={cn(
                              "relative aspect-video rounded-[3rem] overflow-hidden glass-card p-4 group",
                              idx % 2 === 1 ? "lg:order-last" : ""
                          )}>
                              <Image 
                                src={cat.image || ''} 
                                alt={cat.title} 
                                fill 
                                className="object-cover rounded-[2.5rem] transition-transform duration-700 group-hover:scale-110" 
                                data-ai-hint={cat.imageHint}
                              />
                          </div>
                          <div className={cn(
                              "space-y-8 animate-fade-up",
                              idx % 2 === 1 ? "lg:text-right" : "lg:text-left"
                          )}>
                              <div className={cn(
                                  "w-16 h-16 bg-primary text-white rounded-3xl flex items-center justify-center shadow-2xl mb-8",
                                  idx % 2 === 1 ? "lg:ml-auto" : "lg:mr-auto"
                              )}>
                                  {cat.icon}
                              </div>
                              <h3 className="text-3xl md:text-5xl font-bold text-primary leading-tight tracking-tight">{cat.title}</h3>
                              <ul className={cn(
                                  "space-y-6",
                                  idx % 2 === 1 ? "lg:items-end flex flex-col" : "flex flex-col"
                              )}>
                                  {cat.points.map((p, pIdx) => (
                                      <li key={pIdx} className="flex gap-4 text-gray-700 text-lg group items-center">
                                          {idx % 2 === 0 && <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />}
                                          <span className="font-medium">{p}</span>
                                          {idx % 2 === 1 && <CheckCircle2 className="w-6 h-6 text-accent shrink-0" />}
                                      </li>
                                  ))}
                              </ul>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </section>

      {/* Main Services Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16 border-b-4 border-primary pb-4">
            <h2 className="text-3xl md:text-5xl font-bold text-primary flex items-center gap-4 uppercase tracking-tighter">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl md:text-2xl">1</div>
               CORE SERVICES
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((item) => (
              <Link href={`/services/${item.slug}`} key={item.slug} className="group">
                <Card className="glass-card h-full hover:bg-primary hover:text-white transition-all duration-500 overflow-hidden border-none shadow-xl">
                  <div className="relative aspect-video w-full overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                      data-ai-hint={item.imageHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent" />
                  </div>
                  <CardContent className="p-8">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-primary transition-colors">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{item.name}</h3>
                    <p className="text-gray-500 group-hover:text-white/70 mb-8 line-clamp-2">{item.desc}</p>
                    <div className="flex items-center gap-2 font-bold text-primary group-hover:text-accent transition-colors">
                      LEARN MORE <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-16 border-b-4 border-accent pb-4">
            <h2 className="text-3xl md:text-5xl font-bold text-primary flex items-center gap-4 uppercase tracking-tighter">
               <div className="w-10 h-10 md:w-12 md:h-12 bg-accent text-primary rounded-full flex items-center justify-center text-xl md:text-2xl">2</div>
               FACILITIES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {facilities.map((item) => (
              <Link href={`/services/${item.slug}`} key={item.slug} className="group">
                <Card className="relative bg-white border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 rounded-[2.5rem] overflow-hidden aspect-square">
                   <Image 
                    src={item.image} 
                    alt={item.name} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    data-ai-hint={item.imageHint}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-14 h-14 bg-white/90 text-primary rounded-full flex items-center justify-center mb-4 shadow-xl group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-white text-lg uppercase tracking-wider text-shadow">{item.name}</h3>
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] flex items-center gap-1">
                        VIEW DETAILS <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
