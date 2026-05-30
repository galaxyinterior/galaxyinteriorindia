"use client";

import React, { useState } from "react";
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

export default function MobileWhatsAppButton() {
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div className="fixed bottom-3 right-3 z-50 flex flex-col items-end lg:hidden">
      {/* Floating Card Popover constrained for mobile screen widths */}
      <div 
        className={`w-52 bg-[#061226]/95 border border-accent/20 rounded-[18px] p-2.5 shadow-xl flex flex-col gap-2 transition-all duration-300 transform mb-3 ${
          isToggled 
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto" 
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/5 pb-1.5 px-1">
          <span className="text-gold text-[8.5px] font-black uppercase tracking-wider">Quick Connect</span>
          <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-ping"></span>
        </div>

        {/* WhatsApp Option */}
        <Link
          href="https://wa.me/919631980881"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 p-2 rounded-[12px] bg-white/[0.03] border border-white/5 hover:bg-[#25D366] hover:border-[#25D366] text-white transition-all shadow-sm"
          onClick={() => setIsToggled(false)}
        >
          <div className="h-7 w-7 rounded-full bg-[#25D366]/10 flex items-center justify-center">
            <WhatsAppLogo className="h-4 w-4 text-[#25D366]" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-wide">WhatsApp Chat</span>
            <span className="text-[7.5px] text-white/50 font-medium">Chat with design expert</span>
          </div>
        </Link>

        {/* Direct Call Owner - PRIMARY */}
        <Link
          href="tel:+919631980881"
          className="flex items-center gap-2.5 p-2 rounded-[12px] bg-white/[0.03] border border-white/5 hover:bg-accent text-white hover:text-primary transition-all shadow-sm"
          onClick={() => setIsToggled(false)}
        >
          <div className="h-7 w-7 rounded-full bg-accent/10 flex items-center justify-center">
            <Phone className="h-3.5 w-3.5 text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black tracking-wide">Owner</span>
            <span className="text-[7.5px] text-white/50 font-medium">+91 96319 80881</span>
          </div>
        </Link>

        {/* Direct Call General Manager - SECONDARY */}
        <Link
          href="tel:+919122795726"
          className="flex items-center gap-2.5 p-1.5 rounded-[10px] bg-white/[0.02] border border-white/5 text-white/50 transition-all"
          onClick={() => setIsToggled(false)}
        >
          <div className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center">
            <Phone className="h-3 w-3 text-white/30" />
          </div>
          <div className="flex flex-col">
            <span className="text-[8.5px] font-bold tracking-wide text-white/40">General Manager</span>
            <span className="text-[7px] text-white/25 font-medium">+91 91227 95726</span>
          </div>
        </Link>
      </div>

      {/* Main Hub Floating Anchor Button */}
      <button
        onClick={() => setIsToggled(!isToggled)}
        className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white shadow-lg border border-white/20 transition-all hover:scale-105 active:scale-95 duration-300 relative"
      >
        <span className="absolute inset-0 rounded-[14px] bg-[#25D366] opacity-35 animate-ping"></span>
        <WhatsAppLogo className="h-5.5 w-5.5 relative z-10" />
      </button>
    </div>
  );
}
