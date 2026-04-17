"use client";

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const categories = ["All", "Living Room", "Bedroom", "Kitchen", "Exterior", "3D Renders"];

const projects = [
  { title: "Modern Luxury Villa", category: "Exterior", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop" },
  { title: "Gold & White Living Room", category: "Living Room", img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop" },
  { title: "Master Suite Interior", category: "Bedroom", img: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?q=80&w=600&auto=format&fit=crop" },
  { title: "Italian Style Kitchen", category: "Kitchen", img: "https://images.unsplash.com/photo-1613082374567-52aefdea4f3a?q=80&w=600&auto=format&fit=crop" },
  { title: "Minimalist Facade", category: "Exterior", img: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?q=80&w=600&auto=format&fit=crop" },
  { title: "3D Apartment Render", category: "3D Renders", img: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=600&auto=format&fit=crop" },
  { title: "Classic Dining Space", category: "Living Room", img: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop" },
  { title: "Smart Wardrobe Setup", category: "Bedroom", img: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=600&auto=format&fit=crop" },
];

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="bg-white">
      <section className="py-24 bg-galaxy-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-6 rounded-none bg-primary text-galaxy-dark font-bold tracking-[0.3em] px-6 py-2">GALLERY</Badge>
          <h1 className="text-5xl md:text-8xl font-bold mb-8 tracking-tighter">Our Projects</h1>
          <p className="max-w-2xl mx-auto text-white/60 text-lg">A showcase of luxury and excellence in Godda and Ranchi.</p>
        </div>
      </section>

      <section className="py-12 bg-white sticky top-20 z-40 border-b">
        <div className="container mx-auto px-4 overflow-x-auto">
          <div className="flex justify-center gap-4 min-w-max">
            {categories.map(cat => (
              <Button 
                key={cat} 
                variant={activeCategory === cat ? "default" : "outline"}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "rounded-none px-8 font-bold uppercase tracking-widest transition-all",
                  activeCategory === cat ? "bg-primary text-galaxy-dark" : "text-galaxy-dark hover:bg-primary/10"
                )}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div key={idx} className="group animate-fade-up">
                <Card className="rounded-none border-none shadow-none overflow-hidden mb-4">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={project.img} alt={project.title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
                  </div>
                </Card>
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em]">{project.category}</span>
                  <h3 className="text-xl font-bold text-galaxy-dark">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}