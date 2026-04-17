"use client";
import ServiceLayout from '../ServiceLayout';

export default function PvcWorkPage() {
  return (
    <ServiceLayout 
      title="PVC Work"
      category="Facility"
      description="Upgrade your interiors quickly and beautifully with our modern PVC solutions. Ideal for wall cladding and ceilings, our PVC works are highly durable, moisture-resistant, and available in endless textures."
      image="/generated/fac_pvc_work.png"
      imageHint="modern pvc wall cladding"
      points={[
        "PVC Wall Cladding",
        "PVC False Ceilings",
        "Damp-Proof Solutions",
        "Quick & Clean Installation"
      ]}
    />
  );
}
