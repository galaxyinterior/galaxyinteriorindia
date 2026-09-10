"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calculator } from 'lucide-react';
import Aurora from '@/components/ui/aurora';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { AnimatePresence, motion } from 'framer-motion';

export default function HeroSection() {
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const q = query(collection(db, "slideshow"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSlides = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setSlides(fetchedSlides);
      setLoading(false);
    }, (error) => {
      console.warn("Firestore connection error in HeroSection:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
    }, 6000); // 6 seconds per slide
    return () => clearInterval(interval);
  }, [slides.length]);

  if (loading) {
    return (
      <section className="relative h-screen w-full bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      </section>
    );
  }

  // Fallback to Aurora if no slides exist in the database
  if (slides.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-50 flex items-center">
        <div className="absolute inset-0 z-0">
          <Aurora
            colorStops={["#ffffff", "#D4AF37", "#f8fafc"]}
            blend={0.6}
            amplitude={1.2}
            speed={0.8}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent pointer-events-none" />
        </div>
        <div className="relative z-10 w-full px-6 md:px-24">
          <div className="max-w-4xl text-left animate-fade-up">
            <div className="mb-4 inline-block">
              <span className="text-accent font-bold tracking-[0.2em] text-xs md:text-sm uppercase bg-primary/5 px-4 py-1.5 rounded-full backdrop-blur-md border border-primary/10 shadow-[0_0_15px_rgba(212,175,55,0.1)]">
                Architecture • Interiors • Construction
              </span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-primary leading-[1.1] drop-shadow-xl mb-6">
              Design. Build. <span className="text-accent drop-shadow-[0_0_25px_rgba(212,175,55,0.2)]">Live Better.</span>
            </h1>
            <p className="text-base md:text-xl text-primary/80 max-w-2xl mb-10 font-medium leading-relaxed drop-shadow-sm">
              From architectural planning and 3D visualization to construction, interiors and custom furniture — Galaxy Interior manages your complete project under one roof.
            </p>
            <HeroButtons />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black flex items-center">
      {/* Slides Backgrounds */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {/* Desktop Image */}
            <Image
              src={slides[currentSlide].url}
              alt={slides[currentSlide].heading || 'Slide image'}
              fill
              className="object-cover hidden md:block"
              priority
              unoptimized
            />
            {/* Mobile Image */}
            <Image
              src={slides[currentSlide].mobileUrl || slides[currentSlide].url}
              alt={slides[currentSlide].heading || 'Slide image'}
              fill
              className="object-cover md:hidden"
              priority
              unoptimized
            />
            {/* Overlay Gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Content */}
      <div className="relative z-10 w-full px-6 md:px-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl text-left"
          >
            {slides[currentSlide].price && (
              <div className="mb-4 inline-block">
                <span className="text-accent font-bold tracking-[0.2em] text-xs md:text-sm uppercase bg-white/10 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 shadow-lg text-white">
                  {slides[currentSlide].price}
                </span>
              </div>
            )}
            
            {slides[currentSlide].heading && (
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] drop-shadow-2xl mb-6">
                {slides[currentSlide].heading}
              </h1>
            )}

            {slides[currentSlide].subheading && (
              <p className="text-base md:text-xl text-white/90 max-w-2xl mb-10 font-medium leading-relaxed drop-shadow-md">
                {slides[currentSlide].subheading}
              </p>
            )}

            <HeroButtons darkTheme={true} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Dots */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? "bg-accent w-8" : "bg-white/50 w-2 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}

import SpecularButton from '@/components/ui/SpecularButton';

// Extracted buttons component to reuse in both light and dark backgrounds
function HeroButtons({ darkTheme = false }: { darkTheme?: boolean }) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      <SpecularButton 
        href="/contact"
        size="lg" 
        radius={9999}
        className="w-full sm:w-auto uppercase tracking-widest text-xs rounded-full"
        baseColor="#d4af37" // Accent base
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
        textColor={darkTheme ? "#ffffff" : "#ffffff"}
      >
        <Calculator className="w-4 h-4 mr-2" />
        Calculate Your Budget
      </SpecularButton>
    </div>
  );
}
