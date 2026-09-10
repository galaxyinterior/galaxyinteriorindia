import React from 'react';

const stats = [
  { value: '500+', label: 'Projects Completed' },
  { value: '10+', label: 'Years of Experience' },
  { value: '9+', label: 'Cities Served' },
  { value: '100%', label: 'End-to-End Design & Build' },
];

export default function TrustStrip() {
  return (
    <section className="bg-primary border-y border-white/5 relative z-20">
      <div className="container mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="text-3xl md:text-5xl font-black text-accent mb-2 tracking-tighter drop-shadow-[0_0_15px_rgba(255,207,51,0.2)] group-hover:scale-105 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-xs md:text-sm text-white/70 font-bold uppercase tracking-widest leading-snug">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
