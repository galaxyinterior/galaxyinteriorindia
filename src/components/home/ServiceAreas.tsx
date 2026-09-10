import React from 'react';
import { MapPin } from 'lucide-react';

const locations = [
  "Ranchi", "Godda", "Bhagalpur", "Banka", "Deoghar", 
  "Hazaribagh", "Dumka", "Kishanganj", "Purnea", "Patna", "Kolkata"
];

export default function ServiceAreas() {
  return (
    <section className="py-24 bg-[#f8fafc] border-b border-gray-200">
      <div className="container mx-auto px-6 max-w-5xl text-center">
        <h2 className="text-2xl md:text-4xl font-black text-primary mb-4 tracking-tight uppercase">
          Serving Eastern India
        </h2>
        <p className="text-gray-500 mb-10 max-w-2xl mx-auto">
          We bring our architectural and construction expertise to multiple cities across Jharkhand, Bihar, and West Bengal.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          {locations.map((loc) => (
            <div key={loc} className="flex items-center gap-2 bg-white px-5 py-3 rounded-full border border-gray-100 shadow-sm m3-elevation-1">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="font-bold text-primary text-sm uppercase tracking-widest">{loc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
