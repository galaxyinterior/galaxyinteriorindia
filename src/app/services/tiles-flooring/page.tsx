"use client";
import ServiceLayout from '../ServiceLayout';

export default function TilesFlooringPage() {
  return (
    <ServiceLayout 
      title="Tiles Flooring"
      category="Facility"
      description="Step into luxury with our extensive flooring options. From glossy imported marble to highly durable vitrified and ceramic tiles, we provide impeccable leveling and joint-free installations for flawless surfaces."
      image="/generated/fac_tiles_flooring.png"
      imageHint="glossy marble tiles flooring"
      points={[
        "Vitrified & Ceramic Tiles",
        "Imported Marble Laying",
        "Anti-Skid Bathroom Flooring",
        "Flawless Joint & Grouting"
      ]}
    />
  );
}
