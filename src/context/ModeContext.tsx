"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Mode = "residential" | "commercial";

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("residential");

  // Load from localStorage on mount safely (client-side only)
  useEffect(() => {
    const savedMode = localStorage.getItem("galaxy-interior-mode");
    if (savedMode === "residential" || savedMode === "commercial") {
      setModeState(savedMode);
    }
  }, []);

  const setMode = (newMode: Mode) => {
    setModeState(newMode);
    localStorage.setItem("galaxy-interior-mode", newMode);
  };

  const toggleMode = () => {
    const newMode = mode === "residential" ? "commercial" : "residential";
    setMode(newMode);
  };

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (context === undefined) {
    throw new Error("useMode must be used within a ModeProvider");
  }
  return context;
}
