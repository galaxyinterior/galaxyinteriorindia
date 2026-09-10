"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface LocationContextType {
  location: string | null;
  setLocation: (loc: string) => void;
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [location, setLocationState] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLocation = localStorage.getItem("galaxy_user_location");
    if (savedLocation) {
      setLocationState(savedLocation);
    } else {
      const timer = setTimeout(() => {
        setIsModalOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const setLocation = (newLocation: string) => {
    setLocationState(newLocation);
    localStorage.setItem("galaxy_user_location", newLocation);
    setIsModalOpen(false);
  };

  // Only render context children when mounted to avoid hydration mismatch if location is needed immediately,
  // but since we are just wrapping layout, we can just render children.
  
  return (
    <LocationContext.Provider value={{ location, setLocation, isModalOpen, setIsModalOpen }}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}
