"use client";

import React from 'react';
import Image from 'next/image';

const facilities = [
  { name: 'False Ceiling Work', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop' },
  { name: 'Wallpaper Work', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop' },
  { name: 'Wooden Flooring', image: 'https://images.unsplash.com/photo-1581858326451-932d56a31f03?q=80&w=600&auto=format&fit=crop' },
  { name: 'Tiles Work', image: 'https://images.unsplash.com/photo-1523413363574-c30aa1c2a516?q=80&w=600&auto=format&fit=crop' },
  { name: 'Furniture & Carpentry', image: 'https://images.unsplash.com/photo-1533090368676-1fd25485ce69?q=80&w=600&auto=format&fit=crop' },
  { name: 'Modular Kitchen', image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=600&auto=format&fit=crop' },
  { name: 'PVC Panelling & Ceiling', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=600&auto=format&fit=crop' },
  { name: 'Glass Work', image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?q=80&w=600&auto=format&fit=crop' },
  { name: 'ACP Cladding Work', image: 'https://images.unsplash.com/photo-1518112166137-85f9979a42be?q=80&w=600&auto=format&fit=crop' },
  { name: 'LED Profile Lighting', image: 'https://images.unsplash.com/photo-1565814329452-e1efa11c5b89?q=80&w=600&auto=format&fit=crop' },
  { name: 'Complete Home Interior (2D/3D)', image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?q=80&w=600&auto=format&fit=crop' },
  { name: 'Renovation & Remodeling', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=600&auto=format&fit=crop' },
  { name: 'Electric & Plumbing', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=600&auto=format&fit=crop' },
];

export default function DesigningFacilities() {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-primary tracking-tight font-display mb-4">
            OUR <span className="text-accent">DESIGNING FACILITIES</span>
          </h2>
          <p className="text-lg text-primary/70 max-w-3xl mx-auto">
            Comprehensive interior and exterior solutions tailored to elevate your living and working spaces.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {facilities.map((facility, index) => (
            <div 
              key={index}
              className="group relative rounded-2xl overflow-hidden aspect-square bg-muted cursor-pointer shadow-md hover:shadow-xl transition-all duration-500"
            >
              <Image 
                src={facility.image}
                alt={facility.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                unoptimized // Bypasses next/image optimization for external URLs in static export
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-end">
                <h3 className="text-white font-bold text-sm md:text-base leading-snug tracking-wide group-hover:-translate-y-2 transition-transform duration-300 uppercase">
                  {facility.name}
                </h3>
                <div className="h-1 w-8 bg-accent mt-2 rounded-full transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
