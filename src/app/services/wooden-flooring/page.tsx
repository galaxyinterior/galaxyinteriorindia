"use client";
import ServiceLayout from '../ServiceLayout';

export default function WoodenFlooringPage() {
  return (
    <ServiceLayout 
      title="Wooden Flooring"
      category="Facility"
      description="Add timeless warmth and elegance to your home with our premium wooden flooring solutions. We offer engineered wood, laminates, and solid hardwood flooring installed with expert precision."
      image="/generated/fac_wooden_flooring.png"
      imageHint="premium hardwood flooring"
      points={[
        "Solid Hardwood Flooring",
        "Engineered & Laminated Wood",
        "Water & Scratch Resistant Options",
        "Acoustic Underlay Installations"
      ]}
    />
  );
}
