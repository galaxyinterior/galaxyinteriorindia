"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function CtaSection() {
  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-4">
        <div className="bg-primary text-white p-12 md:p-24 relative overflow-hidden text-center rounded-[3rem] shadow-2xl">
          {/* Glassy Decorative Shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 backdrop-blur-2xl -rotate-45 translate-x-1/2 -translate-y-1/2 border border-white/10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 backdrop-blur-xl rotate-12 -translate-x-1/2 translate-y-1/2 rounded-full border border-white/10" />
          
          <div className="relative z-10">
            <Badge className="mb-6 rounded-full bg-accent text-primary font-bold tracking-[0.2em] px-6 py-2 border-none">
              READY TO BUILD?
            </Badge>
            <h2 className="text-4xl md:text-7xl font-bold mb-10 tracking-tight leading-tight text-white">
              Let's craft your <span className="text-accent italic">perfect</span> space together.
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button asChild size="lg" className="rounded-full bg-accent text-primary hover:bg-white transition-all px-12 h-14 font-bold uppercase tracking-widest border-none shadow-xl">
                <Link href="/contact">ENQUIRE NOW</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-white/40 bg-white/5 backdrop-blur-md text-white hover:bg-white hover:text-primary transition-all px-12 h-14 font-bold uppercase tracking-widest">
                <Link href="/portfolio">VIEW PROJECTS</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
