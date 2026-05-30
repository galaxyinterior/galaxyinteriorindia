"use client";

import React from "react";
import { Home, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface MobileModeNotchSwitchProps {
  mode: "residential" | "commercial";
  onChange: (mode: "residential" | "commercial") => void;
}

export default function MobileModeNotchSwitch({ mode, onChange }: MobileModeNotchSwitchProps) {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#061226]/90 backdrop-blur-md border border-accent/25 rounded-full p-1 shadow-[0_4px_20px_rgba(255,207,51,0.12)] flex items-center gap-1 max-w-[90vw] lg:hidden">
      {/* Residential Button */}
      <button
        onClick={() => onChange("residential")}
        className={cn(
          "flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all relative overflow-hidden",
          mode === "residential"
            ? "bg-accent text-primary shadow-sm font-black"
            : "text-white/60 hover:text-white"
        )}
      >
        <Home className="w-3 h-3" />
        <span>Residential</span>
      </button>

      {/* Commercial Button */}
      <button
        onClick={() => onChange("commercial")}
        className={cn(
          "flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-wider transition-all relative overflow-hidden",
          mode === "commercial"
            ? "bg-accent text-primary shadow-sm font-black"
            : "text-white/60 hover:text-white"
        )}
      >
        <Building2 className="w-3 h-3" />
        <span>Commercial</span>
      </button>
    </div>
  );
}
