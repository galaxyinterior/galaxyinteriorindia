import React from 'react';
import LogoLoop from '@/components/ui/LogoLoop';

const partnerLogos = [
  { src: "/partner_logos/skydecor.png", alt: "Skydecor" },
  { src: "/partner_logos/Havells_Logo.svg.png", alt: "Havells" },
  { src: "/partner_logos/godrej.png", alt: "Godrej" },
  { src: "/partner_logos/Pidilite_logo.svg.png", alt: "Pidilite" },
  { src: "/partner_logos/Panasonic_logo.svg.png", alt: "Panasonic" },
  { src: "/partner_logos/Century_Plyboards.svg.png", alt: "Century Ply" },
  { src: "/partner_logos/Greenply_logo.svg.png", alt: "Greenply" },
  { src: "/partner_logos/kajaria.png", alt: "Kajaria" },
  { src: "/partner_logos/somany.png", alt: "Somany" },
  { src: "/partner_logos/Ultratech_Cement_Logo.svg.png", alt: "UltraTech" }
];

export default function TrustedPartners() {
  return (
    <section className="py-16 bg-white border-y border-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-xl md:text-3xl font-bold text-gray-800 uppercase tracking-tight mb-2">
          Trusted Materials & Brand Partners
        </h2>
        <p className="text-sm text-gray-500 max-w-xl mx-auto">
          We use high-quality, industry-leading materials to ensure the longevity and excellence of your project.
        </p>
      </div>

      <div className="w-full relative opacity-70 hover:opacity-100 transition-opacity duration-500 grayscale hover:grayscale-0">
        <LogoLoop
          logos={partnerLogos}
          speed={50}
          direction="left"
          logoHeight={60}
          gap={80}
          hoverSpeed={20}
          fadeOut
          fadeOutColor="#ffffff"
          scaleOnHover={true}
        />
      </div>
    </section>
  );
}
