"use client";

import * as React from 'react';
import Link from 'next/link';
import {
  CookingPot,
  Utensils,
  LayoutGrid,
  BedDouble,
  Home,
  BookOpen,
  Bath,
  Briefcase,
  Maximize,
  Tv,
  Square,
  Layers,
  Palette,
  DoorOpen,
  Sparkles,
  Lamp,
  Baby,
  Building2,
  Mountain,
  GlassWater,
  Wine,
} from 'lucide-react';
import { Card } from '@/components/ui/card';

const designCategories = [
  { name: 'Modular Kitchen', href: '/design-ideas/modular-kitchen', icon: <CookingPot /> },
  { name: 'Living Room', href: '/design-ideas/living-room', icon: <Home /> },
  { name: 'Master Bedroom', href: '/design-ideas/master-bedroom', icon: <BedDouble /> },
  { name: 'Dining Room', href: '/design-ideas/dining-room', icon: <Utensils /> },
  { name: 'Wardrobe', href: '/design-ideas/wardrobe', icon: <LayoutGrid /> },
  { name: 'Bathroom', href: '/design-ideas/bathroom', icon: <Bath /> },
  { name: 'Home Office', href: '/design-ideas/home-office', icon: <Briefcase /> },
  { name: 'Study Room', href: '/design-ideas/study-room', icon: <BookOpen /> },
  { name: 'Guest Bedroom', href: '/design-ideas/guest-bedroom', icon: <BedDouble /> },
  { name: 'Pooja Room', href: '/design-ideas/pooja-room', icon: <Sparkles /> },
  { name: 'TV Unit', href: '/design-ideas/tv-unit', icon: <Tv /> },
  { name: 'False Ceiling', href: '/design-ideas/false-ceiling', icon: <Layers /> },
  { name: 'Kids Bedroom', href: '/design-ideas/kids-bedroom', icon: <Baby /> },
  { name: 'Foyer', href: '/design-ideas/foyer', icon: <DoorOpen /> },
  { name: 'Space Saving Furniture', href: '/design-ideas/space-saving-furniture', icon: <Maximize /> },
  { name: 'Balcony', href: '/design-ideas/balcony', icon: <Mountain /> },
  { name: 'Tiles', href: '/design-ideas/tiles', icon: <Square /> },
  { name: 'Kitchen Sinks', href: '/design-ideas/kitchen-sinks', icon: <GlassWater /> },
  { name: 'Doors', href: '/design-ideas/doors', icon: <DoorOpen /> },
  { name: 'Windows', href: '/design-ideas/windows', icon: <Square /> },
  { name: 'Staircase', href: '/design-ideas/staircase', icon: <Layers /> },
  { name: 'Flooring', href: '/design-ideas/flooring', icon: <Layers /> },
  { name: 'Wall Decor', href: '/design-ideas/wall-decor', icon: <Palette /> },
  { name: 'Crockery Units', href: '/design-ideas/crockery-units', icon: <Building2 /> },
  { name: 'Wall Paint', href: '/design-ideas/wall-paint', icon: <Palette /> },
  { name: 'Home Bar', href: '/design-ideas/home-bar', icon: <Wine /> },
  { name: 'Wallpaper', href: '/design-ideas/wallpaper', icon: <Lamp /> },
];

export default function DesignIdeasPage() {
  return (
    <>
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-gray-800">
            Home Interior Design Ideas
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-600">
            Browse thousands of home interior design ideas and get inspired to create the home of your dreams.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
            {designCategories.map((category) => (
              <Link href={category.href} key={category.name}>
                <Card className="p-4 sm:p-6 flex flex-col items-center justify-center text-center rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full">
                  <div className="text-primary mb-3">
                    {category.icon && React.cloneElement(category.icon, { className: 'h-8 w-8 sm:h-10 sm:w-10' })}
                  </div>
                  <h3 className="font-bold text-sm sm:text-lg text-gray-800">{category.name} Designs</h3>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

    