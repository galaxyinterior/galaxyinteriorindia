"use client";

import { X } from "lucide-react";
import { useLocation } from "@/context/LocationContext";

export default function LocationModal() {
  const { isModalOpen, setIsModalOpen, setLocation } = useLocation();

  if (!isModalOpen) return null;

  const locations = [
    { name: "Jharkhand", image: "/jharkhand_icon.jpg" },
    { name: "Bihar", image: "/bihar_icon.jpg" },
    { name: "Kolkata", image: "/kolkata_icon.jpg" },
    { name: "Patna", image: "/patna_icon.jpg" },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
      <div className="bg-white rounded-[24px] p-8 w-full max-w-[480px] shadow-2xl relative animate-in zoom-in-95 duration-500">

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#F05A28] mb-3">Select Your Area</h2>
          <p className="text-gray-500 text-[15px] leading-relaxed max-w-[320px] mx-auto">
            Choose your location to see customized offerings and accurate contact details.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {locations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => {
                setLocation(loc.name);
                setIsModalOpen(false);
              }}
              className="bg-white border border-gray-200 hover:border-[#F05A28] hover:shadow-[0_4px_20px_rgba(240,90,40,0.1)] transition-all duration-300 rounded-xl p-6 flex flex-col items-center justify-center group"
            >
              <div className="transform group-hover:scale-110 transition-transform duration-300 mb-3 w-16 h-16 flex items-center justify-center overflow-hidden mix-blend-multiply">
                <img src={loc.image} alt={loc.name} className="w-full h-full object-contain" />
              </div>
              <span className="text-gray-900 font-bold text-[15px]">
                {loc.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
