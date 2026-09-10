"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const furnitureCategories = [
  { name: 'Modular Kitchen', image: '/generated/kitchen_offer_bg.png' },
  { name: 'Wardrobes & Storage', image: '/generated/furniture_wardrobe.png' },
  { name: 'Beds & Bedrooms', image: '/generated/furniture_bed.png' },
  { name: 'Living Room Sofas', image: '/generated/furniture_sofa.png' },
];

export default function FurnitureSection() {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-primary mb-4 tracking-tight uppercase">
              Custom Furniture & Interior Solutions
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Furniture designed as part of your overall interior project. We craft bespoke pieces that perfectly match your space, style, and functional needs.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {furnitureCategories.map((category, index) => (
            <div key={index} className="group relative bg-white rounded-3xl overflow-hidden m3-elevation-1 hover:m3-elevation-3 transition-all duration-500 hover:-translate-y-1">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />
                
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <Link href="/contact" className="inline-flex items-center text-xs font-black uppercase tracking-widest text-accent hover:text-white transition-colors">
                    Enquire Now
                    <ArrowRight className="w-3 h-3 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/contact">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-black px-10 py-7 rounded-full tracking-widest text-xs uppercase m3-transition shadow-lg">
              Discuss Your Interior Needs
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
