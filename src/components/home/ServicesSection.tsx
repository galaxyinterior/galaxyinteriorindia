import React from 'react';
import { Compass, Eye, Hammer, PaintBucket, Sofa } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

const serviceCategories = [
  {
    title: 'Architecture & Planning',
    icon: Compass,
    items: ['Architectural Planning', 'Structural Planning', '2D Floor Plans', 'Electrical Layout', 'Plumbing Layout', 'Lighting Planning', 'BOQ & Cost Estimation']
  },
  {
    title: 'Design & Visualization',
    icon: Eye,
    items: ['3D Exterior Design', '3D Interior Design', '3D Walkthrough', 'False Ceiling Design']
  },
  {
    title: 'Construction',
    icon: Hammer,
    items: ['Residential Construction', 'Commercial Construction', 'Civil Work', 'Project Execution']
  },
  {
    title: 'Interiors',
    icon: PaintBucket,
    items: ['Interior Execution', 'Modular Kitchen', 'Flooring', 'Painting', 'Wallpaper', 'Wall Panelling', 'Wooden/PVC Work', 'Lighting']
  },
  {
    title: 'Custom Furniture',
    icon: Sofa,
    items: ['Custom Furniture', 'Wardrobes', 'Beds', 'Sofas', 'Dining', 'Custom Interior Furniture']
  }
];

export default function ServicesSection() {
  return (
    <section className="bg-[#f8fafc] relative pt-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl text-center z-10 relative">
        <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 tracking-tight uppercase">
          Complete Project Ecosystem
        </h2>
        <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          All the services you need to build or renovate your space, managed under a single unified team.
        </p>
      </div>

      <div className="w-full relative mt-10">
        <ScrollStack
          useWindowScroll={true}
          itemDistance={120}
          itemStackDistance={40}
          baseScale={0.8}
          itemScale={0.03}
          blurAmount={2}
          className="w-full px-6"
        >
          {serviceCategories.map((category, index) => (
            <ScrollStackItem key={index}>
              <div className="bg-white border-2 border-gray-100 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 group items-start md:items-center">
                <div className="w-24 h-24 shrink-0 rounded-[28px] bg-primary/5 flex items-center justify-center group-hover:bg-accent/10 transition-colors shadow-sm border border-primary/10">
                  <category.icon className="w-10 h-10 text-primary group-hover:text-accent transition-colors" />
                </div>
                <div className="flex-1 w-full">
                  <h3 className="text-2xl font-black text-primary mb-6 uppercase tracking-tight">
                    {category.title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                    {category.items.map((item, idx) => (
                      <div key={idx} className="flex items-center text-base text-gray-600 font-medium">
                        <span className="w-2 h-2 rounded-full bg-accent mr-3 flex-shrink-0 shadow-sm" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
