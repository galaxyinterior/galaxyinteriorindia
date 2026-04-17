"use client";
import ServiceLayout from '../ServiceLayout';

export default function WoodenWorkPage() {
  return (
    <ServiceLayout 
      title="Wooden Work"
      category="Facility"
      description="Our skilled craftsmen specialize in bringing customized wooden furniture and structural woodwork to life. We guarantee premium material selection, durability, and a signature finish for wardrobes, doors, and shelving."
      image="/generated/fac_wooden_work.png"
      imageHint="custom wooden furniture"
      points={[
        "Custom Built Wardrobes & Closets",
        "Premium Wooden Doors & Frames",
        "Bespoke TV Units & Shelving",
        "High-Quality Veneer Polish"
      ]}
    />
  );
}
