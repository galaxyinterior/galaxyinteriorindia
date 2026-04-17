"use client";
import ServiceLayout from '../ServiceLayout';

export default function PuttyPaintingPage() {
  return (
    <ServiceLayout 
      title="Putty & Painting"
      category="Facility"
      description="Experience flawless finishes with our superior putty and painting services. We use premium paints and precise application techniques to give your walls an ultra-smooth, vibrant, and long-lasting look."
      image="/generated/fac_putty_painting.png"
      imageHint="smooth interior wall paint"
      points={[
        "Wall Putty & Primer Base",
        "Premium Emulsion & Texture Painting",
        "Weather-Proof Exterior Paint",
        "Stain-Resistant Interior Finishes"
      ]}
    />
  );
}
