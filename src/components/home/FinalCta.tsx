import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, ArrowRight, Calculator } from 'lucide-react';
import Antigravity from '@/components/ui/Antigravity';
import SpecularButton from '@/components/ui/SpecularButton';

export default function FinalCta() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-40 pointer-events-none" />
      
      <div className="absolute inset-0 z-0">
        <Antigravity
          count={800}
          magnetRadius={10}
          ringRadius={7}
          waveSpeed={0.4}
          waveAmplitude={0.4}
          particleSize={0.9}
          lerpSpeed={0.05}
          color="#ffffff"
          autoAnimate={true}
          particleVariance={1}
          rotationSpeed={0.4}
        />
      </div>
      
      <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight tracking-tight">
          Let's Build Something You'll Love Coming Home To.
        </h2>
        <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
          Whether you're planning a new home, renovating an existing space, or building a commercial property, let's discuss your project.
        </p>
        
        <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
          <SpecularButton 
            href="/contact" 
            size="lg" 
            radius={9999}
            className="w-full sm:w-auto uppercase tracking-widest text-xs rounded-full"
            baseColor="#0f172a" // Primary base
            tintOpacity={0.1}
          >
            Get Free Consultation
            <ArrowRight className="w-4 h-4 ml-2" />
          </SpecularButton>
          
          <SpecularButton 
            href="/pricing" 
            size="lg" 
            radius={9999}
            className="w-full sm:w-auto uppercase tracking-widest text-xs rounded-full"
            baseColor="#333333" 
            tintOpacity={0.1}
            textColor="#ffffff"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Calculate Project Cost
          </SpecularButton>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6">
          <a href="https://wa.me/919631980881" target="_blank" rel="noopener noreferrer" className="flex items-center text-white/80 hover:text-[#25D366] transition-colors text-sm font-bold uppercase tracking-widest group">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-[#25D366]/20 transition-colors">
              <MessageCircle className="w-4 h-4" />
            </div>
            WhatsApp Us
          </a>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-white/20" />
          <a href="tel:+919631980881" className="flex items-center text-white/80 hover:text-accent transition-colors text-sm font-bold uppercase tracking-widest group">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3 group-hover:bg-accent/20 transition-colors">
              <Phone className="w-4 h-4" />
            </div>
            Call Now
          </a>
        </div>
      </div>
    </section>
  );
}
