import React from 'react';
import { ClipboardList, Map, PenTool, Box, Calculator, Hammer, Key } from 'lucide-react';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';

const processSteps = [
  { id: '01', title: 'Consultation', desc: 'We meet to understand your vision, requirements, and budget constraints.', icon: ClipboardList },
  { id: '02', title: 'Site Visit', desc: 'Our experts assess the site conditions and take precise measurements.', icon: Map },
  { id: '03', title: 'Planning', desc: 'We develop a comprehensive floor plan and structural layout.', icon: PenTool },
  { id: '04', title: '3D Design', desc: 'Experience your future space with photorealistic 3D renderings.', icon: Box },
  { id: '05', title: 'Estimate', desc: 'Receive a transparent and detailed cost breakdown before we start.', icon: Calculator },
  { id: '06', title: 'Execution', desc: 'Our skilled craftsmen and engineers bring the design to reality.', icon: Hammer },
  { id: '07', title: 'Handover', desc: 'A thorough final inspection followed by handing over the keys to your new space.', icon: Key },
];

export default function ProcessSection() {
  return (
    <section className="bg-white relative pt-24 overflow-hidden">
      <div className="container mx-auto px-6 max-w-6xl text-center z-10 relative">
        <h2 className="text-3xl md:text-5xl font-black text-primary mb-6 tracking-tight">
          From First Sketch to Final Handover.
        </h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          You don't need to coordinate multiple contractors, designers, and vendors. Galaxy Interior brings planning, design, construction, interiors, and finishing together under one roof.
        </p>
      </div>

      {/* Adding negative margin top to pull the cards up smoothly, and adequate padding bottom */}
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
          {processSteps.map((step) => (
            <ScrollStackItem key={step.id}>
              <div className="bg-white border-2 border-gray-100 rounded-[40px] p-8 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-full max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 group">
                <div className="w-24 h-24 shrink-0 rounded-full bg-primary/5 flex flex-col items-center justify-center group-hover:bg-accent transition-colors shadow-sm border border-primary/10 group-hover:border-accent">
                  <span className="text-accent group-hover:text-white font-black text-xl mb-1 transition-colors">{step.id}</span>
                  <step.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                </div>
                <div className="text-center md:text-left flex-1">
                  <h3 className="text-2xl font-black text-primary uppercase tracking-widest mb-3">{step.title}</h3>
                  <p className="text-gray-500 text-lg md:text-xl font-medium leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
}
