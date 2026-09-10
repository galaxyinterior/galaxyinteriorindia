import React from 'react';
import Link from 'next/link';
import { Calculator, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PricingTeaser() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 bg-logo-radial opacity-10 mix-blend-screen pointer-events-none" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4 pointer-events-none" />

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-[32px] p-8 md:p-16 text-center">
          <div className="w-20 h-20 mx-auto bg-accent/20 rounded-full flex items-center justify-center mb-8 border border-accent/30">
            <Calculator className="w-10 h-10 text-accent" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight uppercase">
            Know Your <span className="text-accent">Approximate</span> Project Cost
          </h2>
          
          <p className="text-lg text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
            Get an instant estimate based on your requirements. Whether it's a new construction, interior renovation, or architectural planning, our calculator gives you a clear idea of your budget.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/pricing">
              <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-white text-primary font-black px-10 py-7 rounded-full tracking-widest text-xs uppercase m3-transition shadow-[0_0_20px_rgba(255,207,51,0.2)]">
                Calculate Project Cost
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
          
          <p className="text-white/40 text-[10px] mt-8 max-w-xl mx-auto uppercase tracking-widest">
            *Approximate estimate. Final pricing depends on site conditions, materials, specifications, and project requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
