"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Architecture', 'Interior', 'Construction', '3D Design', 'Commercial', 'Residential'];

const mockProjects = [
  {
    id: 1,
    title: 'Modern Villa Redefined',
    location: 'Ranchi',
    type: 'Residential',
    service: 'Architecture & Interior',
    description: 'A complete end-to-end design and build for a luxury 4BHK villa featuring open-plan living and smart automation.',
    image: '/generated/hero_exterior_1.png',
    categories: ['Architecture', 'Interior', 'Residential']
  },
  {
    id: 2,
    title: 'Corporate Headquarters',
    location: 'Godda',
    type: 'Commercial',
    service: 'Construction & Interior',
    description: 'A 5-story commercial building built from the ground up, featuring acoustic ceilings, glass facades, and modular workstations.',
    image: '/generated/srv_construction.png',
    categories: ['Construction', 'Interior', 'Commercial']
  },
  {
    id: 3,
    title: 'Minimalist Duplex',
    location: 'Deoghar',
    type: 'Residential',
    service: '3D Design & Interior',
    description: 'Photorealistic 3D visualization leading to execution of a warm, minimalist aesthetic duplex with bespoke furniture.',
    image: '/generated/srv_interior.png',
    categories: ['3D Design', 'Interior', 'Residential']
  }
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = mockProjects.filter(project => 
    activeFilter === 'All' || project.categories.includes(activeFilter)
  );

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-4 tracking-tight uppercase">
              Featured Work
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Explore some of our recent architecture, interior, and construction projects across Eastern India.
            </p>
          </div>
          
          <Link href="/portfolio" className="group flex items-center text-accent font-black tracking-widest uppercase text-sm hover:text-primary transition-colors">
            VIEW ALL PROJECTS
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all",
                activeFilter === cat 
                  ? "bg-primary text-white" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group flex flex-col bg-white border border-gray-100 rounded-3xl overflow-hidden m3-elevation-1 hover:m3-elevation-3 transition-all duration-500 hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-white/90 backdrop-blur-sm text-primary font-bold hover:bg-white border-none uppercase tracking-widest text-[9px]">
                    {project.type}
                  </Badge>
                  <Badge className="bg-accent text-primary font-bold hover:bg-accent border-none uppercase tracking-widest text-[9px]">
                    {project.service}
                  </Badge>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-gray-500 text-xs font-bold uppercase tracking-widest mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  {project.location}
                </div>
                <h3 className="text-xl font-black text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>
                <Link href="/portfolio" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-primary group-hover:text-accent transition-colors">
                  View Details
                  <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
