"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone } from "lucide-react";

const WhatsAppLogo = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    {...props}
    viewBox="0 0 448 512"
    fill="currentColor"
  >
    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
  </svg>
);

export default function WhatsAppButton() {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isPopoverHovered, setIsPopoverHovered] = useState(false);
  const [isToggled, setIsToggled] = useState(false);

  const isOpen = isButtonHovered || isPopoverHovered || isToggled;

  const handleClose = () => {
    setIsButtonHovered(false);
    setIsPopoverHovered(false);
    setIsToggled(false);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-col items-end">
      {/* Floating Card Popover */}
      <div 
        onMouseEnter={() => setIsPopoverHovered(true)}
        onMouseLeave={() => setIsPopoverHovered(false)}
        className={`w-68 bg-[#061226]/95 backdrop-blur-md border border-accent/20 rounded-[28px] p-4 m3-elevation-4 flex flex-col gap-3 transition-all duration-300 transform mb-4 ${
          isOpen 
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-2 px-1">
          <span className="text-gold text-[10px] font-black uppercase tracking-wider">Quick Connect</span>
          <span className="h-2 w-2 rounded-full bg-green-500 animate-ping"></span>
        </div>

        {/* WhatsApp Option */}
        <Link
          href="https://wa.me/919631980881"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3.5 p-3 rounded-[20px] bg-white/[0.03] border border-white/5 hover:bg-[#25D366] hover:border-[#25D366] text-white hover:text-white transition-all group/item shadow-sm"
          onClick={handleClose}
        >
          <div className="h-10 w-10 rounded-full bg-[#25D366]/10 group-hover/item:bg-white/10 flex items-center justify-center transition-colors">
            <WhatsAppLogo className="h-5.5 w-5.5 text-[#25D366] group-hover/item:text-white transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wide">WhatsApp Chat</span>
            <span className="text-[9px] text-white/50 group-hover/item:text-white/80 font-medium">Chat with design expert</span>
          </div>
        </Link>

        {/* Direct Call Godda */}
        <Link
          href="tel:+919122795726"
          className="flex items-center gap-3.5 p-3 rounded-[20px] bg-white/[0.03] border border-white/5 hover:bg-accent hover:border-accent text-white hover:text-primary transition-all group/item shadow-sm"
          onClick={handleClose}
        >
          <div className="h-10 w-10 rounded-full bg-accent/10 group-hover/item:bg-white/10 flex items-center justify-center transition-colors">
            <Phone className="h-4.5 w-4.5 text-accent group-hover/item:text-primary transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wide">Call Godda Office</span>
            <span className="text-[9px] text-white/50 group-hover/item:text-primary/80 font-medium">+91 91227 95726</span>
          </div>
        </Link>

        {/* Direct Call Ranchi */}
        <Link
          href="tel:+919631980881"
          className="flex items-center gap-3.5 p-3 rounded-[20px] bg-white/[0.03] border border-white/5 hover:bg-accent hover:border-accent text-white hover:text-primary transition-all group/item shadow-sm"
          onClick={handleClose}
        >
          <div className="h-10 w-10 rounded-full bg-accent/10 group-hover/item:bg-white/10 flex items-center justify-center transition-colors">
            <Phone className="h-4.5 w-4.5 text-accent group-hover/item:text-primary transition-colors" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-wide">Call Ranchi Office</span>
            <span className="text-[9px] text-white/50 group-hover/item:text-primary/80 font-medium">+91 96319 80881</span>
          </div>
        </Link>
      </div>

      {/* Main Hub Floating Anchor Button - M3 Large FAB Geometry */}
      <button
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        onClick={() => setIsToggled(!isToggled)}
        className="flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-[20px] md:rounded-[24px] bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white m3-elevation-3 hover:m3-elevation-4 border-2 border-white/20 transition-all hover:scale-105 active:scale-95 duration-300 relative animate-fade-in"
      >
        <span className="absolute inset-0 rounded-[20px] md:rounded-[24px] bg-[#25D366] opacity-35 animate-ping"></span>
        <WhatsAppLogo className="h-7 w-7 md:h-8 md:w-8 relative z-10 animate-fade-in" />
      </button>
    </div>
  );
}