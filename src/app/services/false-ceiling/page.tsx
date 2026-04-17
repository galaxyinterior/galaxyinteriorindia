"use client";
import ServiceLayout from '../ServiceLayout';

export default function FalseCeilingPage() {
  return (
    <ServiceLayout 
      title="False Ceiling"
      category="Facility"
      description="Transform the look of your interiors with our premium false ceiling designs. We offer modern gypsum and POP false ceilings combined with elegant concealed lighting that adds a luxurious aura to your space."
      image="/generated/fac_false_ceiling.png"
      imageHint="luxurious false ceiling design"
      points={[
        "Custom Gypsum & POP Designs",
        "Cove Lighting & LED Integration",
        "Acoustic & Soundproof Ceilings",
        "Moisture Resistant Options"
      ]}
    />
  );
}
