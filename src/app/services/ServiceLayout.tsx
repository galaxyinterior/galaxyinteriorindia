
"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface ServicePageProps {
  title: string;
  category: "Service" | "Facility";
  description: string;
  image: string;
  imageHint: string;
  points: string[];
  brands?: string[];
}

export default function ServiceLayout({ title, category, description, image, imageHint, points, brands }: ServicePageProps) {
  return (
    <div className="bg-white">
      {/* Page Header */}
      <section className="py-24 bg-galaxy-dark text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-accent/10 -skew-x-12 translate-x-1/2"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-2 text-accent font-bold uppercase tracking-widest text-xs mb-4">
            <Link href="/services" className="hover:underline">Services</Link>
            <ChevronRight className="w-3 h-3" />
            <span>{title}</span>
          </div>
          <Badge className="mb-6 bg-primary text-white font-bold tracking-widest px-4 py-1">{category}</Badge>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter uppercase">{title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="relative aspect-square rounded-[3rem] overflow-hidden glass-card p-2">
              <Image src={image} alt={title} fill className="object-cover rounded-[2.8rem]" data-ai-hint={imageHint} />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-primary mb-8">Redefining Excellence</h2>
              <p className="text-lg text-gray-600 mb-12 leading-relaxed">{description}</p>
              
              <div className="space-y-6 mb-12">
                {points.map((point, idx) => (
                  <div key={idx} className="flex gap-4 items-center">
                    <div className="bg-accent/20 p-2 rounded-full">
                      <CheckCircle2 className="text-primary w-5 h-5 shrink-0" />
                    </div>
                    <span className="text-lg font-medium text-gray-700">{point}</span>
                  </div>
                ))}
              </div>

              {brands && (
                <div className="p-8 bg-gray-50 rounded-3xl border-l-8 border-accent">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">Trusted Brands We Use</p>
                  <div className="flex flex-wrap gap-4">
                    {brands.map(brand => (
                      <span key={brand} className="px-4 py-2 bg-white rounded-full text-sm font-bold text-primary shadow-sm">{brand}</span>
                    ))}
                  </div>
                </div>
              )}

              <Button asChild size="lg" className="mt-12 rounded-full px-12 h-14 font-bold uppercase tracking-widest shadow-xl">
                <Link href="/contact">Enquire for {title}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
