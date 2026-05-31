"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const residentialCategories = ["All", "Living Room", "Bedroom", "Kitchen", "Exterior", "3D Renders"];

const commercialCategories = ["All", "Corporate Office", "Retail Shop", "Hotel & Restaurant", "Clinic & Hospital", "3D Workspace Renders"];

const residentialProjects = [
  { title: "Modern Luxury Villa", category: "Exterior", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop" },
  { title: "Gold & White Living Room", category: "Living Room", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop" },
  { title: "Master Suite Interior", category: "Bedroom", img: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop" },
  { title: "Italian Style Kitchen", category: "Kitchen", img: "https://images.unsplash.com/photo-1613082374567-52aefdea4f3a?q=80&w=600&auto=format&fit=crop" },
  { title: "Minimalist Facade", category: "Exterior", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=600&auto=format&fit=crop" },
  { title: "3D Apartment Render", category: "3D Renders", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop" },
  { title: "Classic Dining Space", category: "Living Room", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop" },
  { title: "Smart Wardrobe Setup", category: "Bedroom", img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=600&auto=format&fit=crop" },
];

const commercialProjects = [
  { title: "Executive Board Room", category: "Corporate Office", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop" },
  { title: "Creative Workspace Hub", category: "Corporate Office", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop" },
  { title: "Luxury Glass Showroom", category: "Retail Shop", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=600&auto=format&fit=crop" },
  { title: "Boutique Apparel Store", category: "Retail Shop", img: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=600&auto=format&fit=crop" },
  { title: "Fine Dining Lounge", category: "Hotel & Restaurant", img: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop" },
  { title: "Modern Hospital Lobby", category: "Clinic & Hospital", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=600&auto=format&fit=crop" },
  { title: "Office Tower 3D Concept", category: "3D Workspace Renders", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop" },
  { title: "Smart Diagnostic Lab", category: "Clinic & Hospital", img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=600&auto=format&fit=crop" }
];

export default function PortfolioPage() {
  const [gallerySegment, setGallerySegment] = useState<"residential" | "commercial">("residential");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = gallerySegment === "commercial" ? commercialCategories : residentialCategories;
  const projects = gallerySegment === "commercial" ? commercialProjects : residentialProjects;

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const handleSegmentChange = (segment: "residential" | "commercial") => {
    setGallerySegment(segment);
    setActiveCategory("All");
  };

  return (
    <div className="bg-[#051124] text-white min-h-screen">
      
      {/* Gallery Header */}
      <section className="py-24 bg-galaxy-dark text-white border-b border-white/5 relative overflow-hidden bg-logo-radial">
        <div className="container mx-auto px-4 text-center space-y-4">
          <Badge className="rounded-full bg-accent/15 text-accent border border-accent/20 font-black tracking-[0.25em] px-5 py-1.5 uppercase text-[9px]">
            Portfolio Display
          </Badge>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter font-display text-white">
            Our <span className="text-gold">Designs Gallery</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/50 text-sm font-medium">
            Explore our state-of-the-art designs created for both luxury residential architectures and premium enterprise commercial spaces.
          </p>

          {/* Segment Selector Toggle */}
          <div className="flex justify-center pt-8">
            <div className="bg-[#08162d] border border-white/10 p-1 rounded-full flex items-center gap-1 shadow-lg">
              <button
                type="button"
                onClick={() => handleSegmentChange("residential")}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                  gallerySegment === "residential"
                    ? "bg-gold-gradient text-primary shadow-[0_0_12px_rgba(212,175,55,0.4)]"
                    : "text-white/60 hover:text-white"
                )}
              >
                🏠 Residential Spaces
              </button>
              <button
                type="button"
                onClick={() => handleSegmentChange("commercial")}
                className={cn(
                  "px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2",
                  gallerySegment === "commercial"
                    ? "bg-accent text-primary shadow-[0_0_12px_rgba(255,207,51,0.4)]"
                    : "text-white/60 hover:text-white"
                )}
              >
                🏢 Commercial Spaces
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Category Tab Switcher Row */}
      <section className="py-8 bg-[#051124] border-b border-white/5 sticky top-16 z-40 backdrop-blur-md bg-opacity-95">
        <div className="container mx-auto px-4 overflow-x-auto scrollbar-none">
          <div className="flex justify-center gap-3 min-w-max pb-2">
            {categories.map(cat => (
              <Button 
                key={cat} 
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-full px-6 text-[10px] font-black uppercase tracking-widest transition-all border-white/10 h-10",
                  activeCategory === cat 
                    ? gallerySegment === "commercial"
                      ? "bg-accent text-primary hover:bg-accent/90"
                      : "bg-gold-gradient text-primary border-none"
                    : "bg-[#08162d]/50 text-white/70 hover:bg-white/5 hover:text-white"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Photo Grid */}
      <section className="py-20 bg-[#051124]">
        <div className="container mx-auto px-4">
          {filteredProjects.length === 0 ? (
            <div className="py-20 text-center text-white/40 uppercase tracking-widest font-black text-sm">
              No designs matching this category yet
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <div key={idx} className="group animate-fade-up space-y-4">
                  <Card className="rounded-[24px] border-none overflow-hidden bg-[#08162d] shadow-xl relative aspect-[4/3]">
                    <Image 
                      src={project.img} 
                      alt={project.title} 
                      fill 
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#051124] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300"></div>
                  </Card>
                  
                  <div className="space-y-1.5 pl-2 text-left">
                    <span className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full border bg-opacity-10",
                      gallerySegment === "commercial" 
                        ? "text-accent border-accent/25 bg-accent" 
                        : "text-gold border-gold/25 bg-gold"
                    )}>
                      {project.category}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-accent transition-colors pt-1 capitalize font-sans leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  );
}