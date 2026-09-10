"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Building2, Home } from 'lucide-react';

export default function SiteSwitcher({ isCommercial = false }: { isCommercial?: boolean }) {
  const [isHovered, setIsHovered] = useState(false);

  // Define the target links for the two environments
  const residentialLink = "https://galaxyinteriorindia.com";
  const commercialLink = "https://commercial.galaxyinteriorindia.com";

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100]">
      <div 
        className="relative flex items-center bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-full p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Animated active background slider */}
      <div 
        className={cn(
          "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-transform duration-500 ease-out z-0 border border-gray-100",
          isCommercial ? "translate-x-[100%]" : "translate-x-0"
        )}
      />
      
      {/* Residential Button */}
      <a 
        href={residentialLink}
        className={cn(
          "relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 min-w-[110px]",
          !isCommercial ? "text-primary" : "text-primary/50 hover:text-primary/80"
        )}
      >
        <Home className={cn("h-3.5 w-3.5", !isCommercial && "text-accent")} />
        Residential
      </a>

      {/* Commercial Button */}
      <a 
        href={commercialLink}
        className={cn(
          "relative z-10 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors duration-300 min-w-[110px]",
          isCommercial ? "text-primary" : "text-primary/50 hover:text-primary/80"
        )}
      >
        <Building2 className={cn("h-3.5 w-3.5", isCommercial && "text-accent")} />
        Commercial
      </a>
      </div>
    </div>
  );
}
