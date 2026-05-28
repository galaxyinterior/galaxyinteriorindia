"use client";

import React from "react";
import { Home, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModeNotchSwitchProps {
  mode: "residential" | "commercial";
  onChange: (mode: "residential" | "commercial") => void;
}

export default function ModeNotchSwitch({ mode, onChange }: ModeNotchSwitchProps) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-[#061226]/90 backdrop-blur-md border border-accent/30 rounded-full p-1.5 shadow-[0_8px_32px_rgba(255,207,51,0.15)] flex items-center gap-1.5 max-w-[95vw] sm:max-w-md m3-transition m3-elevation-3 hover:border-accent/40">
      {/* Residential Option */}
      <button
        onClick={() => onChange("residential")}
        className={cn(
          "flex items-center justify-center gap-2 px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest m3-transition relative overflow-hidden m3-state-layer",
          mode === "residential"
            ? "bg-accent text-primary shadow-[0_0_15px_rgba(255,207,51,0.3)] font-black"
            : "text-white/60 hover:text-white"
        )}
      >
        <Home className="w-3.5 h-3.5" />
        <span>Residential</span>
      </button>

      {/* Commercial Option */}
      <button
        onClick={() => onChange("commercial")}
        className={cn(
          "flex items-center justify-center gap-2 px-5 py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest m3-transition relative overflow-hidden m3-state-layer",
          mode === "commercial"
            ? "bg-accent text-primary shadow-[0_0_15px_rgba(255,207,51,0.3)] font-black"
            : "text-white/60 hover:text-white"
        )}
      >
        <Building2 className="w-3.5 h-3.5" />
        <span>Commercial</span>
      </button>
    </div>
  );
}
