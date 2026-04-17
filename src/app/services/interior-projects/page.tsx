
"use client";
import ServiceLayout from '../ServiceLayout';

export default function InteriorProjectsPage() {
  return (
    <ServiceLayout 
      title="Interior Projects"
      category="Service"
      description="Turn your empty shell into a luxury haven. Our interior project management handles everything from false ceilings to bespoke modular furniture, ensuring a cohesive and premium look for your home."
      image="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1000"
      imageHint="luxury home interior"
      points={[
        "Complete Interior Execution",
        "Bespoke Furniture Design",
        "Material Selection Assistance",
        "Site Management & Logistics",
        "Turnkey Decor Solutions"
      ]}
      brands={["Century Ply", "Hettich", "Godrej"]}
    />
  );
}
