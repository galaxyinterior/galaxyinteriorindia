import React from 'react';
import { ShieldCheck, Target, Cuboid, Users, Gem, Clock, Wrench, MapPin } from 'lucide-react';

const reasons = [
  { title: 'Design-to-Build Service', icon: Target, desc: 'We handle everything from initial architectural blueprints to the final touch of paint.' },
  { title: 'Transparent Estimation', icon: Calculator, desc: 'No hidden costs. We provide detailed BOQs and clear pricing models upfront.' },
  { title: '3D Visualization', icon: Cuboid, desc: 'See your space in photorealistic 3D before we even start the execution.' },
  { title: 'Experienced Team', icon: Users, desc: 'Our team comprises seasoned architects, structural engineers, and interior designers.' },
  { title: 'Quality Materials', icon: Gem, desc: 'We only partner with trusted brands to ensure the structural integrity of your project.' },
  { title: 'Project Coordination', icon: Clock, desc: 'We manage all vendors and contractors so you do not have to worry about timelines.' },
  { title: 'Custom Solutions', icon: Wrench, desc: 'Every project is tailored exactly to your lifestyle, needs, and aesthetic preferences.' },
  { title: 'Local Support', icon: MapPin, desc: 'Strong presence across Jharkhand and Bihar ensuring fast on-site execution.' },
];

import { Calculator } from 'lucide-react'; // Fix import

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 tracking-tight uppercase">
            Why Choose Galaxy Interior?
          </h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col">
              <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center mb-4 text-primary">
                <reason.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2 uppercase tracking-tight">{reason.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
