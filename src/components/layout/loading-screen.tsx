"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function LoadingScreen() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // When route changes, show loader
    setLoading(true);
    setFadeOut(false);
    
    // Play the sketching animation for 1.8 seconds, then fade out
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setLoading(false), 500); // Wait for fade out CSS transition
    }, 1800);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  if (!loading) return null;

  return (
    <div className={`fixed inset-0 z-[99999] bg-galaxy-dark flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Furniture Sketch Animation */}
      <div className="relative w-48 h-48 flex items-center justify-center mb-4">
        <svg 
          viewBox="0 0 100 100" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-32 h-32 text-accent animate-sketch drop-shadow-lg"
        >
          {/* Architectural Drawing of a House / Villa Facade */}
          {/* Roof */}
          <path d="M 10 45 L 50 15 L 90 45" />
          {/* Walls */}
          <path d="M 20 40 L 20 85 L 80 85 L 80 40" />
          {/* Door */}
          <path d="M 40 85 L 40 55 L 60 55 L 60 85" />
          {/* Window Left */}
          <path d="M 25 55 L 35 55 L 35 65 L 25 65 Z" />
          {/* Window Right */}
          <path d="M 65 55 L 75 55 L 75 65 L 65 65 Z" />
          {/* Chimney */}
          <path d="M 70 30 L 70 15 L 80 15 L 80 35" />
          {/* Foundation Line */}
          <path d="M 5 85 L 95 85" />
        </svg>
      </div>
      
      {/* Brand & Loading Text */}
      <div className="text-center overflow-hidden h-8">
         <h2 className="text-white font-display uppercase tracking-[0.4em] font-bold text-xl animate-slide-up">
           Galaxy Interior
         </h2>
      </div>
      <div className="flex gap-1 mt-4">
         <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "0ms" }}></div>
         <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "150ms" }}></div>
         <div className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce" style={{ animationDelay: "300ms" }}></div>
      </div>

      <style jsx>{`
        .animate-sketch path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: sketch 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transform: translateY(100%);
        }
        @keyframes sketch {
          0% { stroke-dashoffset: 300; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes slideUp {
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
